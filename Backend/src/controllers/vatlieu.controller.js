import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import VatLieu from '../models/VatLieu.js';

const abs = (req, rel) =>
  `${req.protocol}://${req.get('host')}${rel.startsWith('/') ? '' : '/'}${rel}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_ROOT = path.resolve(__dirname, '..', 'uploads');

/* ========== LIST (đã có) ========== */
export async function danhSachVatLieu(req, res) {
  const { hangMuc, q, page = 1, limit = 20 } = req.query;
  const filter = hangMuc ? { hangMuc } : {};
  let query = VatLieu.find(filter).populate({
    path: 'hangMuc',
    populate: { path: 'nhom', populate: { path: 'phan' } }
  });

  if (q) {
    query = VatLieu.find({ ...filter, $text: { $search: q } }).populate({
      path: 'hangMuc',
      populate: { path: 'nhom', populate: { path: 'phan' } }
    });
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    query.sort({ updatedAt: -1 }).skip(skip).limit(Number(limit)),
    VatLieu.countDocuments(q ? { ...filter, $text: { $search: q } } : filter)
  ]);

  const duLieu = items.map((v) => ({
    ...v.toObject(),
    anh: (v.anh || []).map((a) => ({
      ...(a.toObject?.() || a),
      duongDan: abs(req, a.duongDan)
    }))
  }));

  res.json({ thanhCong: true, page: Number(page), limit: Number(limit), tong: total, duLieu });
}

/* ========== UPSERT (đã có) ========== */
export async function upsertVatLieu(req, res) {
  const { hangMuc, ma, ten, thuongHieu, loai, thongSo, tuKhoa, thuTu } = req.body || {};
  if (!hangMuc || !ma) {
    return res.status(400).json({ thanhCong: false, thongBao: 'Cần hangMuc & ma' });
  }

  const doc = await VatLieu.findOneAndUpdate(
    { hangMuc, ma: String(ma).toUpperCase() },
    { $set: { ten, thuongHieu, loai, thongSo, tuKhoa, thuTu: Number(thuTu || 0) } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(201).json({ thanhCong: true, duLieu: doc });
}

/* ========== THEO MÃ (đã có) ========== */
export async function chiTietTheoMa(req, res) {
  const ma = (req.params.ma || '').toUpperCase();
  const doc = await VatLieu.findOne({ ma }).populate({
    path: 'hangMuc',
    populate: { path: 'nhom', populate: { path: 'phan' } }
  });
  if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });

  const out = doc.toObject();
  out.anh = (out.anh || []).map((a) => ({ ...a, duongDan: abs(req, a.duongDan) }));
  res.json({ thanhCong: true, duLieu: out });
}

/* ========== ẢNH (đã có) ========== */
export async function uploadAnhVatLieu(req, res) {
  const ma = (req.params.ma || '').toUpperCase();
  if (!req.file) return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu file' });

  const doc = await VatLieu.findOne({ ma });
  if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không có vật liệu' });

  const rel = `/uploads/vatlieu/${ma}/${path.basename(req.file.path)}`;
  doc.anh.push({ duongDan: rel, moTa: req.body?.moTa || '' });
  await doc.save();

  const out = doc.toObject();
  out.anh = (out.anh || []).map((a) => ({ ...a, duongDan: abs(req, a.duongDan) }));

  res.status(201).json({
    thanhCong: true,
    thongBao: 'Đã upload',
    duLieu: out,
    uploaded: {
      url: abs(req, rel),
      duongDanTuongDoi: rel,
      kichThuoc: req.file.size,
      loai: req.file.mimetype
    }
  });
}

export async function xoaAnhVatLieu(req, res) {
  const ma = (req.params.ma || '').toUpperCase();
  const { idAnh } = req.params;

  const doc = await VatLieu.findOne({ ma });
  if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không có vật liệu' });

  const img = doc.anh.id(idAnh);
  if (!img) return res.status(404).json({ thanhCong: false, thongBao: 'Không có ảnh' });

  const relUnderUploads = img.duongDan.replace(/^\/uploads\//, '');
  const absPath = path.join(UPLOAD_ROOT, relUnderUploads);
  try { await fs.unlink(absPath); } catch {}

  img.deleteOne();
  await doc.save();

  const out = doc.toObject();
  out.anh = (out.anh || []).map((a) => ({ ...a, duongDan: abs(req, a.duongDan) }));

  res.json({ thanhCong: true, thongBao: 'Đã xoá ảnh', duLieu: out });
}

/* ========================================================= */
/* ========== 3 HÀM THEO _ID — THÊM MỚI Ở ĐÂY ============== */
/* ========================================================= */
export async function chiTietVatLieu(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });
  }
  const doc = await VatLieu.findById(id).populate({
    path: 'hangMuc',
    populate: { path: 'nhom', populate: { path: 'phan' } }
  });
  if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });

  const out = doc.toObject();
  out.anh = (out.anh || []).map((a) => ({ ...a, duongDan: abs(req, a.duongDan) }));
  res.json({ thanhCong: true, duLieu: out });
}

export async function capNhatVatLieu(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });
  }
  const { hangMuc, ma, ten, thuongHieu, loai, thuTu, thongSo, tuKhoa } = req.body || {};

  const found = await VatLieu.findById(id);
  if (!found) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });

  if (hangMuc != null) found.hangMuc = hangMuc;
  if (ma != null)       found.ma = String(ma).toUpperCase();
  if (ten != null)      found.ten = ten;
  if (thuongHieu != null) found.thuongHieu = thuongHieu;
  if (loai != null)     found.loai = loai;
  if (thuTu != null)    found.thuTu = Number(thuTu || 0);
  if (thongSo != null)  found.thongSo = thongSo;
  if (tuKhoa != null)   found.tuKhoa = tuKhoa;

  await found.save();
  const out = found.toObject();
  out.anh = (out.anh || []).map((a) => ({ ...a, duongDan: abs(req, a.duongDan) }));
  res.json({ thanhCong: true, duLieu: out });
}

export async function xoaVatLieu(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });
  }
  const doc = await VatLieu.findByIdAndDelete(id);
  if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });
  res.json({ thanhCong: true, duLieu: doc });
}
