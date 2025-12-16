// src/controllers/auth.controller.js (ESM)
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import MagicToken from '../models/MagicToken.model.js';
import User from '../models/User.model.js';
import Role from '../models/Role.model.js';
import { sendLoginCodeEmail } from '../utils/mailer.js';

const TOKEN_TTL_MIN = 10;

// OTP 6 số
const gen6 = () => (Math.floor(100000 + Math.random() * 900000)).toString();

// Mật khẩu random (ổn hơn dùng Math.random)
const genRandomPwd = () =>
  crypto.randomBytes(8).toString('base64url') + crypto.randomBytes(8).toString('base64url');

/** Lấy role mặc định:
 *  - ưu tiên env DEFAULT_ROLE_ID
 *  - nếu không có thì tìm role name='viewer'
 */
async function getDefaultRoleId() {
  if (process.env.DEFAULT_ROLE_ID) return process.env.DEFAULT_ROLE_ID;
  const viewer = await Role.findOne({ name: /viewer/i }).lean();
  if (viewer?._id) return viewer._id;
  throw new Error(
    'Không tìm thấy role mặc định. Hãy set DEFAULT_ROLE_ID trong .env hoặc tạo role "viewer".'
  );
}

/** POST /api/auth/magic/start  -> luôn gửi OTP (kể cả email chưa đăng ký) */
export async function startMagic(req, res) {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ ok: false, message: 'Thiếu email' });

    // Vô hiệu OTP cũ để tránh đụng nhau
    await MagicToken.updateMany({ email, used: false }, { $set: { used: true } });

    const code = gen6();
    const code_hash = await bcrypt.hash(code, 10);
    const expire_at = new Date(Date.now() + TOKEN_TTL_MIN * 60 * 1000);
    await MagicToken.create({ email, code_hash, expire_at });

    try {
      await sendLoginCodeEmail(email, code, TOKEN_TTL_MIN);
      return res.json({ ok: true, message: 'Đã gửi mã đăng nhập vào email.' });
    } catch (mailErr) {
      console.error('[MAIL SEND ERROR]', mailErr);
      // Cho phép dev test khi SMTP lỗi (log OTP ra console)
      console.warn('[DEV] OTP cho', email, 'là:', code);
      return res.status(500).json({ ok: false, message: 'Không gửi được email OTP. Kiểm tra cấu hình SMTP.' });
    }
  } catch (e) {
    console.error('startMagic error:', e);
    return res.status(500).json({ ok: false, message: 'Lỗi server' });
  }
}

/** POST /api/auth/magic/verify  -> nếu chưa có user thì tạo mới */
export async function verifyMagic(req, res) {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const code = (req.body.code || '').trim();
    if (!email || !code) return res.status(400).json({ ok: false, message: 'Thiếu email hoặc mã' });

    const token = await MagicToken.findOne({ email, used: false }).sort({ createdAt: -1 });
    if (!token) return res.status(400).json({ ok: false, message: 'Mã không hợp lệ hoặc đã hết hạn' });
    if (new Date() > token.expire_at) return res.status(400).json({ ok: false, message: 'Mã đã hết hạn' });

    const ok = await bcrypt.compare(code, token.code_hash);
    if (!ok) return res.status(400).json({ ok: false, message: 'Mã không đúng' });

    token.used = true;
    await token.save();

    // Tìm user, nếu không có thì tạo mới
    let user = await User.findOne({ email }).populate('role_id', 'name').lean();

    if (!user) {
      const defaultRoleId = await getDefaultRoleId();
      const randPwdPlain = genRandomPwd();
      const avatarUrl = `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`;
      const guessName = email.split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      // NOTE: Giữ nguyên theo schema hiện tại (đang lưu plain).
      // Khuyến nghị: chuyển sang lưu hash bcrypt trong lần refactor sau.
      const newUser = await new User({
        name: guessName || 'New User',
        email,
        password: randPwdPlain,
        avatar: avatarUrl,
        role_id: defaultRoleId,
        created_at: new Date()
      }).save();

      user = await User.findById(newUser._id).populate('role_id', 'name').lean();
    }

    if (!process.env.JWT_SECRET) {
      console.error('[CONFIG] Thiếu JWT_SECRET trong .env');
      return res.status(500).json({ ok: false, message: 'Thiếu cấu hình máy chủ (JWT_SECRET).' });
    }

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Ẩn password
    const { password, ...safeUser } = user;
    return res.json({ ok: true, token: accessToken, user: safeUser });
  } catch (e) {
    console.error('verifyMagic error:', e);
    return res.status(500).json({ ok: false, message: e.message || 'Lỗi server' });
  }
}
