import mongoose from 'mongoose';

const PhanSchema = new mongoose.Schema({
  ten:   { type: String, required: true, unique: true, trim: true },  // "Hoàn thiện"
  slug:  { type: String, required: true, unique: true, lowercase: true }, // "hoan-thien"
  thuTu: { type: Number, default: 0 }
}, { timestamps: true });

const Phan = mongoose.models.Phan || mongoose.model('Phan', PhanSchema);
export default Phan;
