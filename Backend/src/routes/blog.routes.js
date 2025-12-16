import { Router } from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
  publishBlog,
} from '../controllers/blog.controller.js';

const router = Router();

// Create
router.post('/', createBlog);

// Read
router.get('/', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);

// Update
router.put('/:id', updateBlog);

// Delete
router.delete('/:id', deleteBlog);

// Toggle active
router.patch('/:id/status', updateBlogStatus);

// Publish / Unpublish
router.patch('/:id/publish', publishBlog);

export default router;
