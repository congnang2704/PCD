// src/controllers/project.controller.js
import mongoose from 'mongoose';
import path from 'path';
import Project from '../models/Project.model.js';
import slugify from '../utils/slugify.js';

const toPublicPath = (absFilePath) => {
  const idx = absFilePath.lastIndexOf(`${path.sep}uploads${path.sep}`);
  if (idx === -1) return '';
  const rel = absFilePath.substring(idx).split(path.sep).join('/');
  return '/' + rel;
};

const VN_STATUS = new Set(['thiết kế', 'xây dựng', 'hoàn thành', 'đã công bố']);

const toArray = (val) => {
  if (val == null) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === 'string') {
    if (!val.trim()) return [];
    return val.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [val];
};

const parseServices = (body) => {
  if (Array.isArray(body['services[]'])) return body['services[]'].filter(Boolean);
  if (Array.isArray(body.services)) return body.services.filter(Boolean);
  if (typeof body.services === 'string' && body.services.trim().startsWith('[')) {
    try { return JSON.parse(body.services).filter(Boolean); } catch {}
  }
  if (typeof body.services === 'string' && body.services.trim()) return [body.services.trim()];
  return [];
};

// GET /api/projects
export async function getAllProjects(_req, res) {
  try {
    const projects = await Project.find().populate('categoryIds', 'name').lean();
    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// GET /api/projects/:id
export async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'ID không hợp lệ' });
    }
    const project = await Project.findById(id).populate('categoryIds', 'name').lean();
    if (!project) {
      return res.status(404).json({ success: false, error: 'Dự án không tồn tại' });
    }
    res.status(200).json({ data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// POST /api/projects  (multipart/form-data)
export async function createProject(req, res) {
  try {
    const body = req.body || {};
    const files = req.files || {};

    // name bắt buộc
    if (!body.name || !String(body.name).trim()) {
      return res.status(400).json({ success: false, error: "Thiếu 'name' dự án" });
    }

    // slug
    const slug = (body.slug && String(body.slug).trim()) || slugify(String(body.name));
    body.slug = slug;

    // categoryIds
    const catIds = toArray(body.categoryIds).map((id) => new mongoose.Types.ObjectId(id));
    body.categoryIds = catIds;

    // services
    body.services = parseServices(body);

    // status
    body.status = VN_STATUS.has(body.status) ? body.status : 'đã công bố';

    // investment
    const inv = {
      display: body['investment.display'] || '',
      currency: body['investment.currency'] || 'VND',
      amount: undefined,
    };
    if (body['investment.amount'] !== undefined && body['investment.amount'] !== '') {
      const n = Number(body['investment.amount']);
      if (!Number.isNaN(n)) inv.amount = n;
    }
    body.investment = {
      display: inv.display,
      currency: inv.currency,
      ...(inv.amount !== undefined ? { amount: inv.amount } : {}),
    };

    // image & gallery
    const imageFile = Array.isArray(files.image) ? files.image[0] : null;
    const galleryFiles = Array.isArray(files.gallery) ? files.gallery : [];

    if (imageFile) body.image = toPublicPath(imageFile.path);
    if (galleryFiles.length) {
      body.gallery = galleryFiles.map((f, i) => ({
        url: toPublicPath(f.path),
        alt: body.name || '',
        order: i,
      }));
    }

    const newProject = await Project.create(body);
    return res.status(201).json({
      success: true,
      message: 'Tạo dự án mới thành công!',
      data: newProject,
    });
  } catch (err) {
    if (err?.code === 11000 && err?.keyPattern?.slug) {
      return res.status(409).json({ success: false, error: 'Slug đã tồn tại. Vui lòng đổi tên/slug.' });
    }
    if (err?.name === 'ValidationError' || err?.name === 'CastError') {
      return res.status(400).json({ success: false, error: err.message });
    }
    console.error('Create Project Error:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

// PUT /api/projects/:id  (multipart/form-data)
export async function editProject(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'ID không hợp lệ' });
    }

    const update = { ...req.body };

    // categoryIds
    if (Object.prototype.hasOwnProperty.call(req.body, 'categoryIds')) {
      if (Array.isArray(req.body.categoryIds)) {
        update.categoryIds = req.body.categoryIds.map((x) => new mongoose.Types.ObjectId(x));
      } else if (typeof req.body.categoryIds === 'string') {
        update.categoryIds = req.body.categoryIds
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .map((x) => new mongoose.Types.ObjectId(x));
      } else if (req.body.categoryIds == null) {
        update.categoryIds = [];
      } else {
        return res.status(400).json({ success: false, error: 'categoryIds phải là mảng hoặc chuỗi' });
      }
    }

    // auto slug khi đổi name
    if (!update.slug && update.name) {
      update.slug = slugify(update.name);
    }

    // Files
    const files = req.files || {};
    const imageFile = Array.isArray(files.image) ? files.image[0] : null;
    const galleryFiles = Array.isArray(files.gallery) ? files.gallery : [];

    if (imageFile) update.image = toPublicPath(imageFile.path);
    if (galleryFiles.length) {
      const gallery = galleryFiles.map((f, i) => ({
        url: toPublicPath(f.path),
        alt: update.name || '',
        order: i,
      }));
      update.gallery = gallery; // hoặc append tuỳ nhu cầu
    }

    const updatedProject = await Project.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Dự án không tồn tại' });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật dự án thành công!',
      data: updatedProject,
    });
  } catch (err) {
    console.error('Update Project Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// DELETE /api/projects/:id
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'ID không hợp lệ' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, error: 'Dự án không tồn tại' });
    }

    res.status(200).json({
      success: true,
      message: 'Xoá dự án thành công!',
      data: deletedProject,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
