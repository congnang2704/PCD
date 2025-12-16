// src/routes/role.routes.js
import { Router } from 'express';
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole
} from '../controllers/role.controller.js';

const router = Router();

router.get('/', getAllRoles);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;
