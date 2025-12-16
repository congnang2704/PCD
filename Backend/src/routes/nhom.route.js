// src/routes/nhom.route.js (ESM)
import express from 'express';
import {
  taoNhom,
  danhSachNhom,
  chiTietNhom,
  capNhatNhom,
  xoaNhom,
} from '../controllers/nhom.controller.js';

const router = express.Router();

// DEBUG: xem request đã vào router chưa
router.use((req, _res, next) => {
  console.log('[NHOM ROUTER]', req.method, req.path);
  next();
});

// Test nhanh xem có match động param không:
router.get('/_test/:id', (req, res) => res.json({ ok: true, id: req.params.id }));
router.get('/_ping', (_req, res) => res.json({ ok: true, who: 'nhom' }));

// CRUD
router.get('/', danhSachNhom);      // GET /api/nhom
router.get('/:id', chiTietNhom);    // GET /api/nhom/:id
router.post('/', taoNhom);
router.put('/:id', capNhatNhom);
router.delete('/:id', xoaNhom);

export default router;
