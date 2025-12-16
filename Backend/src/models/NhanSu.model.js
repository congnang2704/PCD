import mongoose from 'mongoose';

const NhanSuSchema = new mongoose.Schema(
  {
    hoTen:     { type: String, required: true, trim: true },
    chucVu:    { type: String, required: true, trim: true },
    ngaySinh:  { type: Date },
    gioiTinh:  { type: String, enum: ['Nam', 'Nữ', 'Khác'], default: 'Nam' },
    namVaoLam: { type: Number, required: true, min: 1900, max: 3000 },
    trangThai: { type: String, enum: ['Đang làm', 'Nghỉ việc'], default: 'Đang làm' },
    ghiChu:    { type: String, trim: true },
    avatar:    { type: String }, // URL/path ảnh đại diện
  },
  { timestamps: true }
);

const NhanSu = mongoose.models.NhanSu || mongoose.model('NhanSu', NhanSuSchema);
export default NhanSu;
