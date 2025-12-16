import mongoose from 'mongoose';

const magicTokenSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, lowercase: true, trim: true },
  code_hash: { type: String, required: true },
  expire_at: { type: Date, required: true },
  used: { type: Boolean, default: false }
}, { timestamps: true });

// TTL index: tự xoá document khi qua expire_at
magicTokenSchema.index({ expire_at: 1 }, { expireAfterSeconds: 0 });

// Giữ nguyên tên model 'magic_tokens' để không đổi collection
const MagicToken =
  mongoose.models['magic_tokens'] || mongoose.model('magic_tokens', magicTokenSchema);
export default MagicToken;
