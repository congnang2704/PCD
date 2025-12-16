import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  danhSachVatLieu,
  upsertVatLieu,
  chiTietTheoMa,
  uploadAnhVatLieu,
  xoaAnhVatLieu,
  chiTietVatLieu,
  capNhatVatLieu,
  xoaVatLieu,
} from '../controllers/vatlieu.controller.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_ROOT = path.resolve(__dirname, '..', 'uploads');

function safeName(name = '') {
  return String(name)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g,'d').replace(/Đ/g,'D')
    .replace(/[^a-zA-Z0-9._-]+/g,'-')
    .replace(/-+/g,'-').replace(/^-+|-+$/g,'');
}

/* Multer */
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const ma = (req.params.ma || 'MISC').toUpperCase();
    const dest = path.resolve(UPLOAD_ROOT, 'vatlieu', ma);
    try { if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true }); } catch {}
    cb(null, dest);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const base = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${safeName(base)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => file.mimetype?.startsWith('image/')
    ? cb(null, true)
    : cb(new Error('Chỉ nhận image/*')),
});

/* LOG từng request trong router này */
router.use((req, _res, next) => {
  console.log('[VATLIEU ROUTER]', req.method, req.originalUrl);
  next();
});

/* PING */
router.get('/_ping', (_req, res) => res.json({ ok: true, who: 'vatlieu' }));

/* List + Upsert */
router.get('/', danhSachVatLieu);
router.post('/', upsertVatLieu);

/* _id — đặt TRƯỚC (regex 24 hex) */
router.get('/:id([a-fA-F0-9]{24})', chiTietVatLieu);
router.put('/:id([a-fA-F0-9]{24})', capNhatVatLieu);
router.delete('/:id([a-fA-F0-9]{24})', xoaVatLieu);

/* Theo mã (prefix /ma) */
router.get('/ma/:ma', chiTietTheoMa);
router.post('/ma/:ma/anh', upload.single('file'), uploadAnhVatLieu);
router.delete('/ma/:ma/anh/:idAnh', xoaAnhVatLieu);

// legacy support (nếu FE còn gọi /:ma/anh)
router.post('/:ma/anh', upload.single('file'), uploadAnhVatLieu);
router.delete('/:ma/anh/:idAnh', xoaAnhVatLieu);


export default router;
