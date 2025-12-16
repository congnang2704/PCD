import mongoose from 'mongoose';

const NhomSchema = new mongoose.Schema({
  phan:  { type: mongoose.Schema.Types.ObjectId, ref: 'Phan', required: true },
  ten:   { type: String, required: true, trim: true },   // "Gạch"
  slug:  { type: String, required: true, lowercase: true },
  thuTu: { type: Number, default: 0 }
}, { timestamps: true });

NhomSchema.index({ phan: 1, slug: 1 }, { unique: true });

const Nhom = mongoose.models.Nhom || mongoose.model('Nhom', NhomSchema);
export default Nhom;
