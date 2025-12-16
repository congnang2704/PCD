// src/routes/brand.routes.js
import { Router } from 'express';
import { uploadTrademark } from '../middlewares/uploadTrademark.js';
import {
  createBrand,
  listBrands,
  toggleActive,
  updateBrand,
  deleteBrand,
} from '../controllers/brand.controller.js';

const router = Router();

router.get('/', listBrands);
router.post('/', uploadTrademark.single('image'), createBrand); // body: name, is_active?, file: image
router.patch('/:id/active', toggleActive);                      // body: is_active=true/false
router.put('/:id', uploadTrademark.single('image'), updateBrand);
router.delete('/:id', deleteBrand);

export default router;
