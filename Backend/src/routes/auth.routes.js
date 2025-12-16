// auth.routes.js (ESM version)
import { Router } from 'express';
import { startMagic, verifyMagic } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/magic/start', startMagic);
router.post('/auth/magic/verify', verifyMagic);
router.post('/auth/magic/resend', startMagic);

export default router; 
