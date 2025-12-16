// src/routes/chat.routes.js
import { Router } from 'express';
import { chatWithBot } from '../controllers/chat.controller.js';
import Message from '../models/Message.model.js';

const router = Router();

// GET test
router.get('/', (_req, res) => res.send('Chat API is running! Use POST to /api/chat'));

// POST chat
router.post('/', chatWithBot);

// GET /history — lấy 50 tin mới nhất (đảo ngược cho đúng thứ tự thời gian)
router.get('/history', async (_req, res) => {
  try {
    const items = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    res.json(items.reverse());
  } catch (e) {
    console.error('[chat.history] error:', e);
    res.status(500).json({ error: 'Cannot get history' });
  }
});

export default router;
