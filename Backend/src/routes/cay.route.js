// src/routes/cay.route.js
import { Router } from 'express';
import { cayVatLieu } from '../controllers/cay.controller.js';

const router = Router();

// GET /api/cay?phan=hoan-thien&kemVatLieu=1
router.get('/', cayVatLieu);

export default router;
