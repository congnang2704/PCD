import { Router } from 'express';
import Blog from '../../models/Blog.model'; // chú ý đường dẫn tới model Blog

const router = Router();

// API: GET /api/v1/featured-one
router.get('/featured-one', async (req, res) => {
  try {
    // list slug cố định (5 bài bạn đưa)
    const slugs = [
      'tu-van-xay-nha-3-tang-ep-toi-uu-chi-phi-giai-phap-tron-goi',
      'kham-pha-cac-mau-nha-2-tang-ep-tien-nghi-dan-au-xu-huong-nam-nay',
      '50-mau-nha-pho-ep-hien-ai-toi-uu-cong-nang',
      'tong-hop-cac-mau-nha-pho-hien-ai-an-tuong-uoc-ua-chuong-nhat',
      'top-10-mau-nha-pho-san-vuon-khong-gian-xanh-mat-thu-gian',
    ];

    const blogs = await Blog.find(
      {
        slug: { $in: slugs },
        status: 'published',
        is_active: true,
      },
      {
        title: 1,
        slug: 1,
        thumbnail: 1,
        cover_image: 1,
        description: 1,
        published_at: 1,
        created_at: 1,
      }
    )
      .sort({ published_at: -1, created_at: -1 })
      .lean();

    return res.json({ success: true, data: blogs });
  } catch (err) {
    console.error('FeaturedOne error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
