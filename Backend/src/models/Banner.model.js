import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^[a-z0-9-]{3,120}$/,
    },
    link: { type: String, default: null },

    // Ảnh: cho phép dùng URL ngoài HOẶC file nội bộ (/uploads/banner/...)
    imageUrl: { type: String, default: null }, // http(s) hoặc /uploads/...
    imagePath: { type: String, default: null }, // đường dẫn vật lý để có thể xoá file khi update

    // Hiển thị/Ẩn
    isActive: { type: Boolean, default: true },

    // Thứ tự hiển thị (nhỏ -> đứng trước)
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Đảm bảo ít nhất 1 trong 2 nguồn ảnh
BannerSchema.path('imageUrl').validate(function () {
  return !!this.imageUrl || !!this.imagePath;
}, 'Thiếu ảnh: imageUrl hoặc imagePath');

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
export default Banner;
