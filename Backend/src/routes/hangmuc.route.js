// src/routes/hangmuc.route.js
import express from 'express';
import mongoose from 'mongoose';
import HangMuc from '../models/HangMuc.js';
import {
  taoHangMuc,
  danhSachHangMuc,
  chiTietHangMuc,
  capNhatHangMuc,
  xoaHangMuc,
  xoaNhieuHangMuc,
} from '../controllers/hangmuc.controller.js';

const router = express.Router();

router.use((req, _res, next) => {
  console.log('[HANGMUC ROUTER]', req.method, req.path);
  next();
});

router.get('/_ping', (_req, res) => res.json({ ok: true, who: 'hangmuc' }));
router.get('/_debug/:id', async (req, res) => {
  const id = String(req.params.id || '').trim();
  res.json({
    ok: true,
    id,
    valid: mongoose.isValidObjectId(id),
    db: mongoose.connection?.name,
    coll: HangMuc.collection?.name,
    now: new Date().toISOString(),
  });
});

// CRUD
router.get('/', danhSachHangMuc);
router.get('/:id', chiTietHangMuc);
router.post('/', taoHangMuc);
router.put('/:id', capNhatHangMuc);
router.delete('/:id', xoaHangMuc);
router.delete('/', xoaNhieuHangMuc);

export default router;
