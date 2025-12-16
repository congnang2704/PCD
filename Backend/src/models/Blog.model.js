import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    // Core
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: '' },     // tóm tắt
    content: { type: String, required: true },      // HTML/Markdown

    // Ảnh
    cover_image: { type: String, default: '' },     // banner chính
    gallery: [{ type: String }],                    // album ảnh phụ

    // Tác giả & phân loại
    author: { type: String, default: 'Admin' },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],

    // SEO
    tags: [{ type: String }],
    meta_title: { type: String, default: '' },
    meta_description: { type: String, default: '' },

    // Trạng thái
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    is_active: { type: Boolean, default: true },
    published_at: { type: Date, default: null },

    // Metrics
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Auto set published_at khi chuyển sang published
blogSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.published_at) {
    this.published_at = new Date();
  }
  next();
});

// (tùy chọn) Text index cho search
blogSchema.index({ title: 'text', description: 'text', content: 'text', tags: 'text' });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;
