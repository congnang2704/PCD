import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const MoneySchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 }, // số tiền chuẩn hoá
    currency: { type: String, default: 'VND' }, // VND, USD...
    display: { type: String, default: '' }, // '5,2 triệu USD'
  },
  { _id: false }
);

const GalleryItemSchema = new mongoose.Schema(
  {
    url: String,
    alt: String,
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    // Cũ
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' }, // ảnh đại diện (đường dẫn public)
    location: { type: String, default: '' },
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],

    // Mới thêm để hiển thị block thông tin
    slug: { type: String, required: true, unique: true, index: true },
    owner: { type: String, default: '' }, // Chủ dự án (VD: MAPEI Italy)
    investment: { type: MoneySchema, default: {} },
    status: {
      // enum tiếng Việt theo yêu cầu của bạn
      type: String,
      enum: ['thiết kế', 'xây dựng', 'hoàn thành', 'đã công bố'],
      default: 'đã công bố',
      index: true,
    },

    // Phục vụ FE/SEO
    services: [{ type: String }], // 'Thi công', 'Thiết kế', ...
    gallery: [GalleryItemSchema], // nhiều ảnh
    seo: { title: String, description: String, keywords: [String] },
  },
  { timestamps: true }
);

projectSchema.index({ name: 'text', description: 'text', location: 'text' });

// Tự sinh slug từ name nếu chưa có
projectSchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
  next();
});

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
