// src/controllers/hangmuc.controller.js (ESM)
import mongoose from 'mongoose';
import HangMuc from '../models/HangMuc.js';
import Nhom from '../models/Nhom.js';

const { Types } = mongoose;
const ALLOWED_LOAI = new Set(['thuong-hieu', 'loai', 'khac']);

function normalizeSlug(s = '') {
  return String(s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
const isObjectId = (v='') => mongoose.isValidObjectId(v);

/** POST /api/hangmuc */
export async function taoHangMuc(req, res) {
  try {
    let { nhom, ten, slug, loai = 'thuong-hieu', thuTu = 0 } = req.body || {};

    if (!nhom || !isObjectId(nhom))
      return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu hoặc sai nhom (ObjectId)' });
    if (!ten?.trim())
      return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu tên' });
    if (!ALLOWED_LOAI.has(loai)) loai = 'thuong-hieu';

    const nhomDoc = await Nhom.findById(nhom).lean();
    if (!nhomDoc) return res.status(404).json({ thanhCong: false, thongBao: 'Nhóm không tồn tại' });

    slug = normalizeSlug(slug || ten);
    thuTu = Number.isFinite(+thuTu) ? Number(thuTu) : 0;

    const dup = await HangMuc.findOne({ nhom, slug }).lean();
    if (dup) return res.status(409).json({ thanhCong: false, thongBao: 'Slug đã tồn tại trong Nhóm này' });

    const doc = await HangMuc.create({ nhom, ten: String(ten), slug, loai, thuTu });
    return res.status(201).json({ thanhCong: true, duLieu: doc });
  } catch (e) {
    console.error('taoHangMuc:', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** GET /api/hangmuc?q=&nhom=&phan=&loai=&sort=&page=&limit= */
export async function danhSachHangMuc(req, res) {
  try {
    const {
      q = '',
      nhom,
      phan,
      loai,
      sort = 'order', // order | name | type | -order
      page = 1,
      limit = 100,
    } = req.query;

    const filter = {};
    if (nhom && isObjectId(nhom)) filter.nhom = nhom;
    if (loai && ALLOWED_LOAI.has(loai)) filter.loai = loai;
    if (q?.trim()) {
      const k = String(q).trim();
      filter.$or = [
        { ten:  { $regex: k, $options: 'i' } },
        { slug: { $regex: k, $options: 'i' } },
      ];
    }

    let sortObj = { thuTu: 1, ten: 1 };
    if (sort === 'name') sortObj = { ten: 1, thuTu: 1 };
    else if (sort === 'type') sortObj = { loai: 1, thuTu: 1, ten: 1 };
    else if (sort === '-order') sortObj = { thuTu: -1, ten: 1 };

    const pg  = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(500, Math.max(1, parseInt(limit, 10) || 100));

    const [duLieu, tong] = await Promise.all([
      HangMuc.find(filter)
        .sort(sortObj)
        .skip((pg - 1) * lim)
        .limit(lim)
        .populate({
          path: 'nhom',
          select: 'ten slug phan',
          populate: { path: 'phan', select: 'ten slug' },
        })
        .lean(),
      HangMuc.countDocuments(filter),
    ]);

    // if filter by phan (sau populate)
    const result = (phan && isObjectId(phan))
      ? duLieu.filter(x => String(x?.nhom?.phan?._id) === String(phan))
      : duLieu;

    return res.json({ thanhCong: true, duLieu: result, tong, page: pg, limit: lim });
  } catch (e) {
    console.error('danhSachHangMuc:', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** GET /api/hangmuc/:id */
export async function chiTietHangMuc(req, res) {
  try {
    const raw = req.params.id;
    const id = String(raw || '').trim();
    console.log('[HM DETAIL] id(raw)=', raw, ' id(trimmed)=', id);

    if (!mongoose.isValidObjectId(id)) {
      console.log('[HM DETAIL] invalid objectId');
      return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });
    }

    const _id = new Types.ObjectId(id);
    console.log('[HM DETAIL] db =', mongoose.connection?.name, ' coll =', HangMuc.collection?.name);

    const doc = await HangMuc.findOne({ _id })
      .populate({
        path: 'nhom',
        select: 'ten slug phan',
        populate: { path: 'phan', select: 'ten slug' },
      })
      .lean();

    if (!doc) {
      console.log('[HM DETAIL] not found by _id');
      return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy hạng mục' });
    }

    return res.json({ thanhCong: true, duLieu: doc });
  } catch (e) {
    console.error('chiTietHangMuc:', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi server' });
  }
}

/** PUT /api/hangmuc/:id */
export async function capNhatHangMuc(req, res) {
  try {
    const { id } = req.params;
    if (!isObjectId(id))
      return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });

    let { nhom, ten, slug, loai, thuTu } = req.body || {};
    const found = await HangMuc.findById(id);
    if (!found) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });

    if (nhom != null && String(nhom) !== String(found.nhom)) {
      if (!isObjectId(nhom)) return res.status(400).json({ thanhCong: false, thongBao: 'nhom không hợp lệ' });
      const nhomDoc = await Nhom.findById(nhom).lean();
      if (!nhomDoc) return res.status(404).json({ thanhCong: false, thongBao: 'Nhóm không tồn tại' });
      found.nhom = nhom;
    }

    if (ten  != null) found.ten  = String(ten);
    if (slug != null) found.slug = normalizeSlug(slug || found.ten);
    if (loai != null) found.loai = ALLOWED_LOAI.has(loai) ? loai : found.loai;
    if (thuTu != null) found.thuTu = Number.isFinite(+thuTu) ? Number(thuTu) : found.thuTu;

    const dup = await HangMuc.findOne({
      _id: { $ne: found._id },
      nhom: found.nhom,
      slug: found.slug,
    }).lean();
    if (dup) return res.status(409).json({ thanhCong: false, thongBao: 'Slug đã tồn tại trong Nhóm này' });

    await found.save();
    return res.json({ thanhCong: true, duLieu: found });
  } catch (e) {
    console.error('capNhatHangMuc:', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** DELETE /api/hangmuc/:id */
export async function xoaHangMuc(req, res) {
  try {
    const { id } = req.params;
    if (!isObjectId(id))
      return res.status(400).json({ thanhCong: false, thongBao: 'ID không hợp lệ' });

    const doc = await HangMuc.findByIdAndDelete(id).lean();
    if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });
    return res.json({ thanhCong: true, duLieu: doc });
  } catch (e) {
    console.error('xoaHangMuc:', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** DELETE /api/hangmuc (body: { ids: [] }) */
export async function xoaNhieuHangMuc(req, res) {
  try {
    const ids = (req.body?.ids || []).filter(isObjectId);
    if (!ids.length)
      return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu danh sách ids' });

    const kq = await HangMuc.deleteMany({ _id: { $in: ids } });
    return res.json({ thanhCong: true, duLieu: { deletedCount: kq?.deletedCount || 0 } });
  } catch (e) {
    console.error('xoaNhieuHangMuc:', e);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}
