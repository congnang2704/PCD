import React, { useMemo, useState } from "react";
import "./register.css";

const API_ADD_USER = "https://api.nguyenhai.com.vn/api/users/add";
const DEFAULT_VIEWER_ROLE_ID = "688d728b45442ca7b40feb3f"; // viewer

export default function Register({
  defaultRoleId = DEFAULT_VIEWER_ROLE_ID,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const passwordScore = useMemo(() => {
    const p = form.password || "";
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    // normalize 0..6 -> 0..3
    return Math.min(3, Math.floor(score / 2));
  }, [form.password]);

  const passwordLabel = ["Yếu", "Vừa", "Khá", "Mạnh"][passwordScore] || "Yếu";

  const validate = () => {
    if (!form.name.trim()) return "Vui lòng nhập họ tên";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email không hợp lệ";
    if (form.password.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
    if (form.password !== form.confirmPassword)
      return "Xác nhận mật khẩu không khớp";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }
    setLoading(true);
    setMsg({ type: "", text: "" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      avatar:
        form.avatar.trim() ||
        `https://i.pravatar.cc/150?u=${encodeURIComponent(
          form.email.trim().toLowerCase()
        )}`,
      role_id: defaultRoleId,
    };

    try {
      const res = await fetch(API_ADD_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Đăng ký thất bại");

      setMsg({
        type: "success",
        text: "Tạo tài khoản thành công! Bạn có thể đăng nhập.",
      });
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
      });
      if (typeof onSuccess === "function") onSuccess(data?.user);
    } catch (error) {
      setMsg({ type: "error", text: error.message || "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper fancy-bg">
      <form className="register-form glass" onSubmit={onSubmit}>
        <div className="register-head">
          <h2 className="register-title">Tạo tài khoản</h2>
          <p className="register-subtitle">
            Hãy tham gia cùng chúng tôi chỉ trong vài giây ✨
          </p>
        </div>

        <div className="register-input-field">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Họ và Tên</label>
        </div>

        <div className="register-input-field">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Địa chỉ Email</label>
        </div>

        <div className="register-input-field has-toggle">
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder=" "
            minLength={6}
            required
          />
          <label>Mật khẩu (min 6)</label>
          <button
            type="button"
            className="register-eye"
            aria-label={showPwd ? "Hide password" : "Show password"}
            title={showPwd ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            onClick={() => setShowPwd((s) => !s)}
          >
            {showPwd ? (
              /* eye-off */
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M2 2l20 20M10.58 10.58A3 3 0 0012 15a3 3 0 001.42-.38M9.88 5.51A9.77 9.77 0 0112 5c5 0 9 4 10 7- .37 1.02-1.02 2.1-1.96 3.12M6.1 6.1C3.82 7.64 2.36 9.7 2 12c.29 1.62 3.21 6 10 6 1.3 0 2.5-.2 3.6-.56"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              /* eye */
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              </svg>
            )}
          </button>

          {/* Strength meter */}
          <div className={`register-strength s-${passwordScore}`}>
            <span />
            <span />
            <span />
            <div className="register-strength-label">{passwordLabel}</div>
          </div>
        </div>

        <div className="register-input-field has-toggle">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Nhập lại mật khẩu</label>
          <button
            type="button"
            className="register-eye"
            aria-label={showConfirm ? "Hide password" : "Show password"}
            title={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            onClick={() => setShowConfirm((s) => !s)}
          >
            {showConfirm ? (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M2 2l20 20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="register-input-field">
          <input
            type="url"
            name="avatar"
            value={form.avatar}
            onChange={onChange}
            placeholder=" "
          />
          <label>Đường dẫn Avatar (nếu có không bắt buộc)</label>
        </div>

        {msg.text && (
          <div
            className={`register-message ${
              msg.type === "error" ? "error" : "success"
            }`}
            role="alert"
          >
            {msg.text}
          </div>
        )}

        <button className="register-btn" type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo tài khoản"}
        </button>

        <div className="register-footer">
          <p>
            Bạn đã có tài khoản? <a href="/haiadmin/login">Đăng Nhập</a>
          </p>
        </div>
      </form>
    </div>
  );
}
