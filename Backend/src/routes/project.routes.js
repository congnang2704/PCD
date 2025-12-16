// src/routes/project.routes.js
import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { uploadProject } from '../middlewares/uploadProject.js';

const router = Router();

/* ========== helper: chuẩn hoá files cho controller ========== */
/**
 * - Bảo đảm:
 *   req.files.image   => Array<File> (0..1)
 *   req.files.gallery => Array<File> (0..n)
 * - Dù FE dùng fields, single/array hay gallery[]
 */
function normalizeFiles(req, _res, next) {
  // Nếu dùng .fields(), multer đưa vào req.files = { image: [..], gallery: [..] }
  // Nếu dùng .single('image'), multer đưa vào req.file
  // Nếu dùng .array('gallery'), multer đưa vào req.files = [..] (array trần)

  // ép về object
  if (!req.files || Array.isArray(req.files)) {
    req.files = {};
  }

  // gộp từ các kiểu đặt tên khác nhau
  // image
  if (!Array.isArray(req.files.image)) {
    // nếu trước đó dùng .single('image')
    if (req.file && req.file.fieldname === 'image') {
      req.files.image = [req.file];
    } else if (!req.files.image) {
      req.files.image = [];
    }
  }

  // gallery: hỗ trợ cả 'gallery' và 'gallery[]'
  const g = [];
  if (Array.isArray(req.files.gallery)) g.push(...req.files.gallery);
  if (Array.isArray(req.files['gallery[]'])) g.push(...req.files['gallery[]']);
  // nếu trước đó dùng .array('gallery'), một số cấu hình có thể đưa thẳng vào req.files (array trần) – đã convert ở trên bằng object
  req.files.gallery = g;

  // done
  return next();
}

/* ================== routes ================== */
router.get('/_ping', (_req, res) => res.json({ ok: true, via: 'projects.router' }));

router.get('/', getAllProjects);
router.get('/:id', getProjectById);

/**
 * Tạo mới
 * - Nhận: image (<=1), gallery / gallery[] (<=30)
 * - KHÔNG tự set Content-Type ở FE (để browser tự thêm boundary)
 */
router.post(
  '/',
  uploadProject.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 30 },
    { name: 'gallery[]', maxCount: 30 }, // phòng FE gửi kiểu array[]
  ]),
  normalizeFiles,
  createProject
);

/**
 * Cập nhật
 */
router.put(
  '/:id',
  uploadProject.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 30 },
    { name: 'gallery[]', maxCount: 30 },
  ]),
  normalizeFiles,
  editProject
);

router.delete('/:id', deleteProject);

export default router;
