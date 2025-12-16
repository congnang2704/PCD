// seeder/blogSeeder.js
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Blog from '../models/Blog.model.js';
import Category from '../models/Category.model.js';
import slugify from '../utils/slugify.js';

const seedBlogs = async () => {
  try {
    await connectDB();
    await Blog.deleteMany();

    // Lấy toàn bộ categories để map theo tên
    const categories = await Category.find().lean();

    const getCategoryIdsByNames = (...names) => {
      const set = new Set(names.map(n => (n || '').trim()));
      return categories
        .filter(cat => set.has(cat.name))
        .map(cat => cat._id);
    };

    const blogs = [
      {
        title: 'Xu hướng thiết kế nhà 2025: Tối giản, xanh và thông minh',
        slug: slugify('Xu hướng thiết kế nhà 2025: Tối giản, xanh và thông minh'),
        description: 'Tổng hợp 5 xu hướng nổi bật trong thiết kế nhà ở năm 2025, tập trung vào sự bền vững và trải nghiệm sống.',
        content:
          '<p>2025 đánh dấu bước chuyển dịch mạnh mẽ sang kiến trúc xanh, tối ưu ánh sáng tự nhiên và vật liệu thân thiện môi trường...</p>',
        cover_image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d35?q=80&w=1200',
        gallery: [
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200',
          'https://images.unsplash.com/photo-1505691723499-9b0f4c66b1c2?q=80&w=1200',
          'https://images.unsplash.com/photo-1505691723515-1b9e8c1d6b75?q=80&w=1200'
        ],
        author: 'Admin',
        categoryIds: getCategoryIdsByNames('Thiết kế kiến trúc', 'Nhà 2 tầng'),
        tags: ['thiết kế', '2025', 'kiến trúc xanh'],
        meta_title: 'Xu hướng thiết kế nhà 2025',
        meta_description: '5 xu hướng thiết kế nhà nổi bật 2025: tối giản, xanh, thông minh…',
        status: 'published',
        is_active: true,
        published_at: new Date(),
        views: 12,
        likes: 3
      },
      {
        title: 'Bí quyết chọn vật liệu bền – đẹp – tối ưu chi phí',
        slug: slugify('Bí quyết chọn vật liệu bền – đẹp – tối ưu chi phí'),
        description: 'Checklist nhanh giúp bạn chọn vật liệu “đáng tiền” cho công trình dân dụng.',
        content:
          '<p>Lựa chọn vật liệu đúng ngay từ đầu giúp tiết kiệm chi phí bảo trì về sau. Ưu tiên các vật liệu có nhãn xanh, chịu thời tiết tốt...</p>',
        cover_image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1200',
        gallery: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200',
          'https://images.unsplash.com/photo-1581093588401-06eb3b5d46b1?q=80&w=1200'
        ],
        author: 'Biên tập PCD',
        categoryIds: getCategoryIdsByNames('Thi công xây nhà trọn gói'),
        tags: ['vật liệu', 'tiết kiệm', 'xây dựng'],
        meta_title: 'Chọn vật liệu bền đẹp',
        meta_description: 'Kinh nghiệm chọn vật liệu xây dựng bền – đẹp – tối ưu chi phí.',
        status: 'draft',
        is_active: true,
        views: 5,
        likes: 1
      },
      {
        title: 'Tối ưu công năng nhà phố hẹp: 6 mẹo “đắt giá”',
        slug: slugify('Tối ưu công năng nhà phố hẹp: 6 mẹo đắt giá'),
        description: 'Giải pháp thông gió, ánh sáng và bố trí nội thất cho mặt tiền hẹp.',
        content:
          '<p>Nhà phố diện tích nhỏ vẫn có thể thoáng và tiện nghi nếu xử lý giếng trời, cầu thang và nội thất đa năng hợp lý...</p>',
        cover_image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200',
        gallery: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200'
        ],
        author: 'PCD Nguyễn Hải',
        categoryIds: getCategoryIdsByNames('Nhà 3 tầng', 'Thiết kế nội thất'),
        tags: ['nhà phố', 'công năng', 'giếng trời'],
        meta_title: 'Tối ưu công năng nhà phố hẹp',
        meta_description: '6 mẹo giúp nhà phố hẹp vẫn thoáng, sáng và tiện nghi.',
        status: 'published',
        is_active: true,
        published_at: new Date(),
        views: 20,
        likes: 6
      }
    ];

    // Chặn insert nếu thiếu categoryIds (tránh orphan)
    const invalid = blogs.filter(b => !Array.isArray(b.categoryIds) || b.categoryIds.length === 0);
    if (invalid.length) {
      console.error('❌ Blog thiếu categoryIds (kiểm tra tên category có khớp DB không):');
      invalid.forEach(b => console.error('-', b.title));
      process.exit(1);
    }

    await Blog.insertMany(blogs);
    console.log('✅ Seed blogs thành công!');
  } catch (err) {
    console.error('❌ Lỗi seed blogs:', err.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedBlogs();
