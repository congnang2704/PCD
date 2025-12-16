import mongoose from 'mongoose';

const HangMucSchema = new mongoose.Schema({
  nhom:  { type: mongoose.Schema.Types.ObjectId, ref: 'Nhom', required: true },
  ten:   { type: String, required: true, trim: true },   // "Kimgress" | "Eurotile"
  slug:  { type: String, required: true, lowercase: true },
  loai:  { type: String, enum: ['thuong-hieu', 'loai', 'khac'], default: 'khac' },
  thuTu: { type: Number, default: 0 }
}, { timestamps: true });

HangMucSchema.index({ nhom: 1, slug: 1 }, { unique: true });

const HangMuc = mongoose.models.HangMuc || mongoose.model('HangMuc', HangMucSchema);
export default HangMuc;
