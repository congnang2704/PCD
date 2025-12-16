// src/utils/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE ?? "false") === "true", // 465=true, 587=false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Gửi OTP đăng nhập
 * @param {string} to - email người nhận
 * @param {string} code - mã OTP (6 ký tự)
 * @param {number} ttlMin - thời hạn hiệu lực (phút)
 */
export async function sendLoginCodeEmail(to, code, ttlMin) {
  const year = new Date().getFullYear();

  const html = `
    <div style="font-family:Arial, sans-serif; padding:20px; background:#f9f9f9; color:#333; max-width:600px; margin:auto; border-radius:8px; border:1px solid #ddd;">
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://nguyenhai.com.vn/static/media/logo_chuan_19062025.27303c779e474d79cc22.png" alt="Logo" style="max-width:120px; margin-bottom:10px;" />
        <h2 style="color:#016bb4;">🔐 Mã đăng nhập của bạn</h2>
      </div>

      <p>Xin chào,</p>
      <p>Đây là mã đăng nhập của bạn. Mã chỉ có hiệu lực trong <b>${ttlMin} phút</b> kể từ khi nhận email này.</p>

      <div style="text-align:center; font-size:28px; font-weight:bold; letter-spacing:6px; color:#016bb4; background:#e6f0fa; padding:12px; border-radius:6px; margin:20px 0;">
        ${code}
      </div>

      <p>Nếu bạn không yêu cầu đăng nhập, vui lòng bỏ qua email này.</p>

      <hr style="margin:30px 0; border:none; border-top:1px solid #ccc;" />

      <div style="font-size:13px; color:#555; line-height:1.5;">
        <p><b>Nguyễn Xuân Hải (Mr.) | Director</b></p>
        <p>📱Liên hệ: 0905402989 | 📧 nguyenhai.deco@gmail.com</p>
        <p>🌐Website: <a href="http://nguyenhai.com.vn" target="_blank">nguyenhai.com.vn</a></p>
        <p>🏢Địa chỉ: 17 Nguyen Cu Trinh St., Hai Chau Dist., Da Nang City</p>
      </div>

      <p style="margin-top:20px; text-align:center; font-size:12px; color:#999;">
        © ${year} NGUYENHAI CO., LTD. All rights reserved.
      </p>
    </div>
  `;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) throw new Error("Thiếu SMTP_FROM hoặc SMTP_USER");

  return transporter.sendMail({
    from,
    to,
    subject: "Mã đăng nhập (OTP) - NGUYENHAI CO., LTD",
    html,
    text: `Mã đăng nhập của bạn: ${code}. Hiệu lực ${ttlMin} phút.`, // fallback text
  });
}
