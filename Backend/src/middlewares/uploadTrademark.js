// src/middlewares/uploadTrademark.js
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const TRADEMARK_DIR = 'D:\\NANG PCD\\Dự Án\\PCD\\Backend\\src\\uploads\\trademark';

// đảm bảo tồn tại
if (!fs.existsSync(TRADEMARK_DIR)) {
  fs.mkdirSync(TRADEMARK_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, TRADEMARK_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${base}_${Date.now()}${ext}`);
  },
});

export const uploadTrademark = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
