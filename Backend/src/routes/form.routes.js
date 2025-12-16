// src/routes/form.routes.js
import { Router } from 'express';
import { getFormTypeBySlug, createFormSubmission } from '../controllers/form.controller.js';

const router = Router();

// GET config form theo slug
router.get('/:slug', getFormTypeBySlug);

// POST submit form theo slug
router.post('/:slug', createFormSubmission);

export default router; // <-- QUAN TRỌNG: export default chính router
