// src/routes/user.routes.js
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from '../controllers/user.controller.js';

const router = Router();

// Routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/add', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);

export default router;
