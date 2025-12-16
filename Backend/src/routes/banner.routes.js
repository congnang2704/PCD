import { Router } from 'express';
import { list, getBySlug, create, update, remove, toggle } from '../controllers/banner.controller.js';
import { uploadBanner } from '../middlewares/uploadBanner.js';

const router = Router();

/** Public/Private list:
 *  - GET /api/banners               -> tất cả (admin)
 *  - GET /api/banners?active=true   -> chỉ banner đang bật (website)
 */
router.get('/', list);
router.get('/:slug', getBySlug);

// multipart/form-data: field 'image'
router.post('/', uploadBanner.single('image'), create);
router.put('/:id', uploadBanner.single('image'), update);
router.patch('/:id/toggle', toggle);

router.delete('/:id', remove);

export default router;
