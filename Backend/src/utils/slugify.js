// utils/slugify.js
import slugifyLib from 'slugify';

/**
 * Tạo slug “an toàn” cho URL:
 * - Loại dấu tiếng Việt (normalize NFD)
 * - Toàn chữ thường
 * - Loại ký tự đặc biệt, chỉ giữ [a-z0-9-]
 * - Tránh slug rỗng (fallback sang 'item')
 */
export default function slugify(input = '', fallback = 'item') {
  const str = String(input ?? '').trim();
  if (!str) return fallback;

  // Bỏ dấu tiếng Việt
  const noAccents = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Dùng slugify lib
  const slug = slugifyLib(noAccents, {
    lower: true,
    strict: true,   // chỉ giữ [a-z0-9-]
    locale: 'vi',   // hỗ trợ thêm cho tiếng Việt
    trim: true,
  });

  return slug || fallback;
}
