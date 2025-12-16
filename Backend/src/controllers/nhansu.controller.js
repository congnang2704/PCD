import NhanSu from '../models/NhanSu.model.js';

/* ---------- Utils ---------- */
const ALLOW_FIELDS = [
  'hoTen', 'chucVu', 'ngaySinh', 'gioiTinh', 'namVaoLam', 'trangThai', 'ghiChu',
];

function normalizeAvatarPath(a) {
  if (!a) return null;
  let s = String(a).trim().replace(/\\/g, '/'); // fix backslash

  if (/^https?:\/\//i.test(s)) return s;            // full URL
  if (s.startsWith('/uploads/')) return s;          // /uploads/...
  if (s.startsWith('uploads/')) return `/${s}`;     // uploads/... -> thêm /
  if (!s.includes('/')) return `/uploads/avatars/${s}`; // chỉ filename
  const idx = s.indexOf('uploads/');
  if (idx >= 0) return `/${s.slice(idx)}`;
  return `/uploads/avatars/${s.split('/').pop()}`;
}

const pickNhanSu = (body = {}) => {
  const data = {};
  for (const k of ALLOW_FIELDS) {
    if (body[k] !== undefined && body[k] !== null && body[k] !== '') data[k] = body[k];
  }
  if (data.ngaySinh) {
    const d = new Date(data.ngaySinh);
    if (!isNaN(d)) data.ngaySinh = d; else delete data.ngaySinh;
  }
  if (data.namVaoLam !== undefined) {
    const n = Number(data.namVaoLam);
    if (Number.isFinite(n)) data.namVaoLam = n; else delete data.namVaoLam;
  }
  if (data.gioiTinh && !['Nam', 'Nữ', 'Khác'].includes(data.gioiTinh)) delete data.gioiTinh;
  if (data.trangThai && !['Đang làm', 'Nghỉ việc'].includes(data.trangThai)) delete data.trangThai;
  return data;
};

/* ---------- Handlers ---------- */

// GET /nhansu
export async function getAllNhanSu(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)));
    const skip = (page - 1) * limit;

    const where = {};
    if (req.query.q) where.hoTen = { $regex: req.query.q, $options: 'i' };
    if (req.query.status) where.trangThai = req.query.status;

    const [items, total] = await Promise.all([
      NhanSu.find(where).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      NhanSu.countDocuments(where),
    ]);

    const normalized = items.map(it => ({ ...it, avatar: normalizeAvatarPath(it.avatar) }));

    res.status(200).json({
      success: true,
      data: normalized,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET /nhansu/:id
export async function getNhanSuById(req, res) {
  try {
    const nhanSu = await NhanSu.findById(req.params.id).lean();
    if (!nhanSu) return res.status(404).json({ success: false, message: 'Không tìm thấy nhân sự' });
    nhanSu.avatar = normalizeAvatarPath(nhanSu.avatar);
    res.status(200).json({ success: true, data: nhanSu });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// POST /nhansu
export async function createNhanSu(req, res) {
  try {
    const data = pickNhanSu(req.body);
    if (req.file?.webPath) data.avatar = normalizeAvatarPath(req.file.webPath);
    else if (data.avatar)   data.avatar = normalizeAvatarPath(data.avatar);
    const doc = await NhanSu.create(data);
    res.status(201).json({ success: true, message: 'Tạo nhân sự thành công', data: doc });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}

// PUT /nhansu/:id
export async function updateNhanSu(req, res) {
  try {
    const data = pickNhanSu(req.body);
    if (req.file?.webPath) data.avatar = normalizeAvatarPath(req.file.webPath);
    else if (data.avatar)   data.avatar = normalizeAvatarPath(data.avatar);

    const doc = await NhanSu.findByIdAndUpdate(req.params.id, data, {
      new: true, runValidators: true,
    });
    if (!doc) return res.status(404).json({ success: false, message: 'Không tìm thấy nhân sự' });
    res.json({ success: true, message: 'Cập nhật thành công', data: doc });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}

// DELETE /nhansu/:id
export async function deleteNhanSu(req, res) {
  try {
    const deleted = await NhanSu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Không tìm thấy nhân sự' });
    res.status(200).json({ success: true, message: 'Xoá thành công' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
