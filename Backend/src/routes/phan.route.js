// src/routes/phan.route.js  (CommonJS -> đổi nếu bạn đang ESM)
import express from 'express';
import {
  taoPhan,
  danhSachPhan,
  chiTietPhan,
  capNhatPhan,
  xoaPhan,
} from '../controllers/phan.controller.js';

const router = express.Router();

router.get('/', danhSachPhan);       // GET /api/phan
router.post('/', taoPhan);           // POST /api/phan
router.get('/:id', chiTietPhan);     // GET /api/phan/:id
router.put('/:id', capNhatPhan);     // PUT /api/phan/:id
router.delete('/:id', xoaPhan);      // DELETE /api/phan/:id

export default router;
