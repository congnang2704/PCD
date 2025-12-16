import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Project from '../models/Project.model.js';
import Category from '../models/Category.model.js';
import slugify from '../utils/slugify.js';

async function seedProjects() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');

    await Project.deleteMany();

    const categories = await Category.find().lean();
    const getCategoryIdsByNames = (...names) => {
      const matched = categories.filter((c) =>
        names.some((n) => c.name.toLowerCase().includes(n.toLowerCase()))
      );
      return matched.map((c) => c._id);
    };

    const projects = [
      {
        name: 'CÔNG TRÌNH NHÀ PHỐ 3 TẦNG CỦA NHÀ ANH TÀI',
        slug: slugify('CÔNG TRÌNH NHÀ PHỐ 3 TẦNG CỦA NHÀ ANH TÀI'),
        description:
          'Ngôi nhà được Nguyễn Hải thiết kế & thi công chuẩn chỉnh từ ngoại thất đến từng chi tiết nhỏ...',
        image: '', // sẽ upload qua API
        location: 'TP. HUẾ',
        categoryIds: getCategoryIdsByNames('Thi công công trình hoàn thiện', 'Nhà 3 tầng'),
        status: 'đã công bố',
      },
      {
        name: 'NHÀ ANH DUY – SIÊU PHẨM THIẾT KẾ & THI CÔNG BỞI NGUYỄN HẢI TẠI ĐÀ NẴNG',
        slug: slugify('NHÀ ANH DUY – SIÊU PHẨM THIẾT KẾ & THI CÔNG BỞI NGUYỄN HẢI TẠI ĐÀ NẴNG'),
        description:
          'Phong cách hiện đại, tối giản nhưng tinh tế...',
        image: '',
        location: 'TP. Đà Nẵng',
        categoryIds: getCategoryIdsByNames('Thi công xây nhà trọn gói', 'Nhà 3 tầng'),
        status: 'đã công bố',
      },
    ];

    await Project.insertMany(projects);
    console.log('✅ Seeded projects thành công!');
  } catch (err) {
    console.error('❌ Lỗi khi seed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProjects();
