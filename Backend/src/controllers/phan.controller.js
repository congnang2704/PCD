import Phan from '../models/Phan.js';

/** helper: chuẩn hóa slug nhẹ (có dấu cũng ok) */
function normalizeSlug(s = '') {
  return String(s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Tạo Phần */
export async function taoPhan(req, res) {
  try {
    let { ten, slug, thuTu } = req.body || {};
    if (!ten) return res.status(400).json({ thanhCong: false, thongBao: 'Thiếu tên' });

    slug = slug ? normalizeSlug(slug) : normalizeSlug(ten);
    thuTu = Number.isFinite(+thuTu) ? Number(thuTu) : 0;

    // slug phải unique
    const existed = await Phan.findOne({ slug }).lean();
    if (existed) {
      return res.status(409).json({ thanhCong: false, thongBao: 'Slug đã tồn tại' });
    }

    const doc = await Phan.create({ ten, slug, thuTu });
    return res.status(201).json({ thanhCong: true, duLieu: doc });
  } catch (err) {
    console.error('taoPhan error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/**
 * Danh sách Phần (+ tìm kiếm + phân trang nhẹ)
 * /phan?q=hoan&sort=name|order&page=1&limit=50
 */
export async function danhSachPhan(req, res) {
  try {
    const { q = '', sort = 'order', page = 1, limit = 100 } = req.query;
    const filter = {};

    if (q) {
      const k = String(q).trim();
      filter.$or = [
        { ten: { $regex: k, $options: 'i' } },
        { slug: { $regex: k, $options: 'i' } },
      ];
    }

    const sortObj = sort === 'name' ? { ten: 1, thuTu: 1 } : { thuTu: 1, ten: 1 };

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(500, Math.max(1, parseInt(limit, 10) || 100));

    const [duLieu, tong] = await Promise.all([
      Phan.find(filter).sort(sortObj).skip((pg - 1) * lim).limit(lim).lean(),
      Phan.countDocuments(filter),
    ]);

    return res.json({
      thanhCong: true,
      duLieu,
      tong,
      page: pg,
      limit: lim,
    });
  } catch (err) {
    console.error('danhSachPhan error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** Lấy chi tiết 1 Phần */
export async function chiTietPhan(req, res) {
  try {
    const { id } = req.params;
    const doc = await Phan.findById(id).lean();
    if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });
    return res.json({ thanhCong: true, duLieu: doc });
  } catch (err) {
    console.error('chiTietPhan error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** Cập nhật Phần */
export async function capNhatPhan(req, res) {
  try {
    const { id } = req.params;
    let { ten, slug, thuTu } = req.body || {};

    const found = await Phan.findById(id);
    if (!found) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });

    if (ten != null) found.ten = String(ten);
    if (slug != null) found.slug = normalizeSlug(slug || found.ten);
    if (thuTu != null) found.thuTu = Number.isFinite(+thuTu) ? Number(thuTu) : found.thuTu;

    // không cho trùng slug với thằng khác
    const dup = await Phan.findOne({ slug: found.slug, _id: { $ne: found._id } }).lean();
    if (dup) {
      return res.status(409).json({ thanhCong: false, thongBao: 'Slug đã tồn tại' });
    }

    await found.save();
    return res.json({ thanhCong: true, duLieu: found });
  } catch (err) {
    console.error('capNhatPhan error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}

/** Xóa Phần (hard delete) */
export async function xoaPhan(req, res) {
  try {
    const { id } = req.params;
    const doc = await Phan.findByIdAndDelete(id).lean();
    if (!doc) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy' });
    return res.json({ thanhCong: true, duLieu: doc });
  } catch (err) {
    console.error('xoaPhan error:', err);
    return res.status(500).json({ thanhCong: false, thongBao: 'Lỗi máy chủ' });
  }
}
