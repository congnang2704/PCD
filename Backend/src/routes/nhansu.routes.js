// src/routes/nhansu.routes.js
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import * as nhansuController from '../controllers/nhansu.controller.js';

const router = Router();

// __dirname cho ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== PATH CHUẨN: src/uploads/avatars ==========
const ROOT_DIR = path.resolve(__dirname, '..');               // .../backend/src
const UPLOAD_DIR = path.join(ROOT_DIR, 'uploads', 'avatars'); // .../backend/src/uploads/avatars
console.log('[UPLOAD_DIR]', UPLOAD_DIR);

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const extFromName = path.extname(file.originalname);
    const guessed =
      file.mimetype === 'image/png'  ? '.png'  :
      file.mimetype === 'image/webp' ? '.webp' :
      file.mimetype === 'image/jpeg' ? '.jpg'  : '';
    const ext = (extFromName || guessed || '.jpg').toLowerCase();
    cb(null, `avatar-${Date.now()}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (/^image\/(png|jpe?g|webp)$/i.test(file.mimetype)) cb(null, true);
  else cb(new Error('Chỉ chấp nhận ảnh PNG/JPG/WEBP'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Gắn webPath cho FE
const attachWebPath = (req, _res, next) => {
  if (req.file) req.file.webPath = `/uploads/avatars/${req.file.filename}`;
  next();
};

// Bọc để trả JSON nếu multer lỗi (tránh HTML -> Unexpected '<')
const withUpload = (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });
};

// ===== Routes =====
router.get('/', nhansuController.getAllNhanSu);
router.get('/:id', nhansuController.getNhanSuById);
router.post('/', withUpload, attachWebPath, nhansuController.createNhanSu);
router.put('/:id', withUpload, attachWebPath, nhansuController.updateNhanSu);
router.delete('/:id', nhansuController.deleteNhanSu);

export default router;
