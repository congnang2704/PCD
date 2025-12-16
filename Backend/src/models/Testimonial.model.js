import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true }, // tên khách hàng
    content:  { type: String, required: true }, // nội dung đánh giá
    avatar:   { type: String },
    position: { type: String },
    rating:   { type: Number, default: 5 },     // 1–5
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

const Testimonial =
  mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
