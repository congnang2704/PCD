const mongoose = require('mongoose');
const connectDB = require('../config/database');
const NhanSu = require('../models/NhanSu.model');

const nhansuData = [
  {
    hoTen: 'Nguyễn Văn A',
    chucVu: 'Kỹ sư xây dựng',
    ngaySinh: new Date('1985-05-20'),
    gioiTinh: 'Nam',
    namVaoLam: 2010,
    trangThai: 'Đang làm',
    ghiChu: 'Nhân viên gương mẫu',
    avatar: '/uploads/Anh-doanh-nhan-nu-dep-16-min.png'
  },
  {
    hoTen: 'Trần Thị B',
    chucVu: 'Quản lý dự án',
    ngaySinh: new Date('1990-09-15'),
    gioiTinh: 'Nữ',
    namVaoLam: 2015,
    trangThai: 'Đang làm',
    ghiChu: 'Team lead nhiều dự án',
    avatar: '/uploads/Anh-doanh-nhan-nu-dep-16-min.png'
  },
  {
    hoTen: 'Lê Văn C',
    chucVu: 'Nhân viên Marketing',
    ngaySinh: new Date('1988-03-10'),
    gioiTinh: 'Nam',
    namVaoLam: 2012,
    trangThai: 'Đang làm',
    ghiChu: 'Phụ trách digital',
    avatar: '/uploads/Anh-doanh-nhan-nu-dep-16-min.png'
  },
];

const seedNhanSu = async () => {
  try {
    await connectDB();
    console.log('🔗 Đã kết nối database');

    await NhanSu.deleteMany();
    console.log('🗑️ Đã xoá toàn bộ dữ liệu cũ');

    await NhanSu.insertMany(nhansuData);
    console.log('✅ Seed nhân sự thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi seed nhân sự:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedNhanSu();
