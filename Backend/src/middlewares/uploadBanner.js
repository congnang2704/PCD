import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// UPLOAD_ROOT = .../src/uploads
const UPLOAD_ROOT = path.resolve(__dirname, '../uploads');
const BANNER_DIR  = path.join(UPLOAD_ROOT, 'banner');

// đảm bảo tồn tại thư mục
if (!fs.existsSync(BANNER_DIR)) fs.mkdirSync(BANNER_DIR, { recursive: true });

// cấu hình multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, BANNER_DIR),
  filename: (_req, file, cb) => {
    const ext  = (path.extname(file.originalname) || '').toLowerCase();
    const safe = (path.basename(file.originalname, ext) || 'banner')
      .toLowerCase()
      .replace(/[^\w\-]+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safe}${ext}`;
    cb(null, name);
  },
});

function fileFilter(_req, file, cb) {
  const ok = ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(
    (path.extname(file.originalname) || '').toLowerCase()
  );
  if (!ok) return cb(new Error('Chỉ cho phép ảnh .png .jpg .jpeg .webp .gif'));
  cb(null, true);
}

export const uploadBanner = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
