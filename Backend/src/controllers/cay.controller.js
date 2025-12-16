// src/controllers/cay.controller.js
import Phan from '../models/Phan.js';
import Nhom from '../models/Nhom.js';
import HangMuc from '../models/HangMuc.js';
import VatLieu from '../models/VatLieu.js';

const abs = (req, rel) =>
  `${req.protocol}://${req.get('host')}${rel.startsWith('/') ? '' : '/'}${rel}`;

export async function cayVatLieu(req, res) {
  const kemVatLieu = String(req.query.kemVatLieu || '0') === '1';
  const phanSlug = req.query.phan;

  const dsPhan = await Phan.find(phanSlug ? { slug: phanSlug } : {})
    .sort({ thuTu: 1 })
    .lean();
  const idsPhan = dsPhan.map(p => p._id);

  const dsNhom = await Nhom.find({ phan: { $in: idsPhan } })
    .sort({ thuTu: 1 })
    .lean();
  const idsNhom = dsNhom.map(n => n._id);

  const dsHangMuc = await HangMuc.find({ nhom: { $in: idsNhom } })
    .sort({ thuTu: 1 })
    .lean();
  const idsHangMuc = dsHangMuc.map(h => h._id);

  let vatLieuTheoHangMuc = {};
  if (kemVatLieu) {
    const items = await VatLieu.find({ hangMuc: { $in: idsHangMuc } }).lean();
    vatLieuTheoHangMuc = items.reduce((acc, it) => {
      const anh = (it.anh || []).map(a => ({ ...a, duongDan: abs(req, a.duongDan) }));
      (acc[it.hangMuc] ||= []).push({ ...it, anh });
      return acc;
    }, {});
  }

  const hangMucTheoNhom = dsHangMuc.reduce((acc, h) => {
    (acc[String(h.nhom)] ||= []).push({
      ...h,
      vatLieu: kemVatLieu ? (vatLieuTheoHangMuc[String(h._id)] || []) : undefined
    });
    return acc;
  }, {});

  const nhomTheoPhan = dsNhom.reduce((acc, n) => {
    (acc[String(n.phan)] ||= []).push({
      ...n,
      hangMuc: hangMucTheoNhom[String(n._id)] || []
    });
    return acc;
  }, {});

  const cay = dsPhan.map(p => ({ ...p, nhom: nhomTheoPhan[String(p._id)] || [] }));
  res.json({ thanhCong: true, cay });
}
