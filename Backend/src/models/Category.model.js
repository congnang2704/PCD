import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Bài viết', 'Dịch vụ', 'Dự án', 'Mẫu nhà đẹp'], required: true },
    description: { type: String },
    is_active: { type: Boolean, default: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
