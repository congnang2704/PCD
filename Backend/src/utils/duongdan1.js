// src/utils/duongdan.js
import path from 'path';
import { fileURLToPath } from 'url';

export const BASE = (process.env.APP_BASE_URL || '').replace(/\/+$/, '');

export function urlTuyetDoi(rel = '') {
  if (!rel) return '';
  if (/^https?:\/\//i.test(rel)) return rel;
  return `${BASE}${rel.startsWith('/') ? '' : '/'}${rel}`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ROOT_DIR: .../backend/src
const ROOT_DIR = path.resolve(__dirname);

// Thư mục uploads nằm trong src/uploads
export const UPLOAD_DIR = path.join(ROOT_DIR, 'uploads');

// path trên filesystem: .../src/uploads/<folder>/<file>
export function taoDuongDanFs(folder, filename) {
  return path.join(UPLOAD_DIR, folder, filename);
}

// path cho web: /uploads/<folder>/<file> (dấu / luôn đúng)
export function taoDuongDanUrl(folder, filename) {
  return path.posix.join('/uploads', folder, filename);
}
