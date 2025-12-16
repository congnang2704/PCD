import mongoose from 'mongoose';

const AnhSchema = new mongoose.Schema({
  duongDan: { type: String, required: true }, // "/uploads/vatlieu/<MA>/<file>.jpg"
  moTa:     { type: String, default: '' }
}, { _id: true });

const VatLieuSchema = new mongoose.Schema({
  hangMuc:    { type: mongoose.Schema.Types.ObjectId, ref: 'HangMuc', required: true },
  ma:         { type: String, required: true, trim: true, uppercase: true, index: true }, // "A62YE4DR"
  ten:        { type: String },
  thuongHieu: { type: String },
  loai:       { type: String }, // "gach/san_go/..."
  anh:        { type: [AnhSchema], default: [] },
  thongSo:    { type: Object, default: {} },
  tuKhoa:     { type: [String], default: [] }
}, { timestamps: true });

VatLieuSchema.index({ hangMuc: 1, ma: 1 }, { unique: true });
VatLieuSchema.index({ ma: 'text', ten: 'text', tuKhoa: 'text' });

const VatLieu = mongoose.models.VatLieu || mongoose.model('VatLieu', VatLieuSchema);
export default VatLieu;
