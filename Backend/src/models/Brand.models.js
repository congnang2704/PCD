// src/models/Brand.js
import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: '' }, // ví dụ: /uploads/trademark/xxx.png
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Brand', BrandSchema);
