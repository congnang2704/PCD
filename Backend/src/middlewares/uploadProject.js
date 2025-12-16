import multer from 'multer';
import fs from 'fs';
import path from 'path';
import slugify from '../utils/slugify.js';
import Project from '../models/Project.model.js';

// ROOT upload: .../src/uploads/duan
const UPLOAD_ROOT = path.resolve('src', 'uploads', 'duan');

// Tạo thư mục an toàn
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// Tạo storage động theo slug
const storage = multer.diskStorage({
  async destination(req, _file, cb) {
    try {
      let slug = String(req.body.slug || '').trim();

      // Nếu PUT theo id mà không gửi slug -> lấy từ DB
      if (!slug && req.method === 'PUT' && req.params?.id) {
        const cur = await Project.findById(req.params.id).select('slug').lean();
        if (cur?.slug) slug = cur.slug;
      }

      // Nếu vẫn chưa có slug -> dựng từ name (khi tạo mới)
      if (!slug && req.body.name) {
        slug = slugify(req.body.name);
        // để controller còn save lại đúng slug này
        req.body.slug = slug;
      }

      const dest = path.join(UPLOAD_ROOT, slug || 'unknown');
      ensureDir(dest);
      cb(null, dest);
    } catch (e) {
      cb(e);
    }
  },

  filename(_req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safe = slugify(base, 'file');
    const name = `${safe}-${Date.now()}${ext.toLowerCase()}`;
    cb(null, name);
  },
});

export const uploadProject = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB/ảnh
    files: 30,
  },
});
