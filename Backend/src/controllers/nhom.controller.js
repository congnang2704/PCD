// src/controllers/nhom.controller.js (ESM)
import mongoose from 'mongoose';
import Nhom from '../models/Nhom.js';
import Phan from '../models/Phan.js';

function normalizeSlug(s = '') {
  return String(s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// POST /api/nhom
export async function taoNhom(req, res) {
  try {
    let { phan, ten, slug, thuTu } = req.body || {};
    if (!phan) return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu phan (ObjectId)' });
    if (!ten)  return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu tên' });

    const phanDoc = await Phan.findById(phan).lean();
    if (!phanDoc) return res.status(404).json({ thanhCong: false, thongBao: 'Phần không tồn tại' });

    slug = slug ? normalizeSlug(slug) : normalizeSlug(ten);
    thuTu = Number.isFinite(+thuTu) ? Number(thuTu) : 0;

    const existed = await Nhom.findOne({ phan, slug }).lean();
    if (existed) return res.status(409).json({ thanhCong: false, thongBao: 'Slug đã tồn tại trong Phần này' });

    const doc = await Nhom.create({ phan, ten, slug, thuTu });
    return res.status(201).json({ thanhCong: true, duLieu: doc });
  } catch (err) {
    console.error('taoNhom error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/**
 * GET /api/nhom?q=&phan=&sort=&page=&limit=
 */
export async function danhSachNhom(req, res) {
  try {
    const { phan, q = '', sort = 'order', page = 1, limit = 100 } = req.query;

    const filter = {};
    if (phan) filter.phan = phan;
    if (q) {
      const k = String(q).trim();
      filter.$or = [
        { ten:  { $regex: k, $options: 'i' } },
        { slug: { $regex: k, $options: 'i' } },
      ];
    }

    const sortObj = sort === 'name' ? { ten: 1, thuTu: 1 } : { thuTu: 1, ten: 1 };
    const pg  = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(500, Math.max(1, parseInt(limit, 10) || 100));

    const [duLieu, tong] = await Promise.all([
      Nhom.find(filter)
          .sort(sortObj)
          .skip((pg - 1) * lim)
          .limit(lim)
          .populate('phan', 'ten slug')
          .lean(),
      Nhom.countDocuments(filter),
    ]);

    return res.json({ thanhCong: true, duLieu, tong, page: pg, limit: lim });
  } catch (err) {
    console.error('danhSachNhom error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

// GET /api/nhom/:id
export async function chiTietNhom(req, res) {
  try {
    const { id } = req.params;
    console.log('[chiTietNhom] id =', id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });
    }

    const doc = await Nhom.findById(id).populate('phan', 'ten slug').lean();
    if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy nhóm' });

    return res.json({ thanhCong: true, duLieu: doc });
  } catch (e) {
    console.error('chiTietNhom', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi server' });
  }
}

// PUT /api/nhom/:id
export async function capNhatNhom(req, res) {
  try {
    const { id } = req.params;
    let { phan, ten, slug, thuTu } = req.body || {};

    const found = await Nhom.findById(id);
    if (!found) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });

    if (phan != null && String(phan) !== String(found.phan)) {
      const phanDoc = await Phan.findById(phan).lean();
      if (!phanDoc) return res.status(404).json({ thanhCong: false, thongBao: 'Phần không tồn tại' });
      found.phan = phan;
    }
    if (ten  != null) found.ten  = String(ten);
    if (slug != null) found.slug = normalizeSlug(slug || found.ten);
    if (thuTu != null) found.thuTu = Number.isFinite(+thuTu) ? Number(thuTu) : found.thuTu;

    const dup = await Nhom.findOne({
      _id: { $ne: found._id },
      phan: found.phan,
      slug: found.slug
    }).lean();
    if (dup) return res.status(409).json({ thanhCong: false, thongBao: 'Slug đã tồn tại trong Phần này' });

    await found.save();
    return res.json({ thanhCong: true, duLieu: found });
  } catch (err) {
    console.error('capNhatNhom error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

// DELETE /api/nhom/:id
export async function xoaNhom(req, res) {
  try {
    const { id } = req.params;
    const doc = await Nhom.findByIdAndDelete(id).lean();
    if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });
    return res.json({ thanhCong: true, duLieu: doc });
  } catch (err) {
    console.error('xoaNhom error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}
