import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Login_Form.css";
import badgeLogo from "../../../../assets/logonang.jpg";
import { FcGoogle } from "react-icons/fc";
import MagicEmailLogin from "./MagicEmailLogin";

const API_BASE = "https://api.nguyenhai.com.vn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberUser, setRememberUser] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [openMagic, setOpenMagic] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ok = false;
    try {
      ok = !!JSON.parse(localStorage.getItem("user") || "null");
    } catch {}
    if (ok && location.pathname === "/haiadmin/login") {
      navigate("/haiadmin/dashboard", { replace: true });
    }
  }, [navigate, location.pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Đăng nhập thất bại");

      const userData = data.user;
      const roleName = (userData?.role_id?.name || "viewer").toLowerCase();

      // nếu BE sau này cũng trả token thì lưu thêm ở đây:
      // const token = data.token; if (token) (rememberUser ? localStorage : sessionStorage).setItem("token", token);

      (rememberUser ? localStorage : sessionStorage).setItem(
        "user",
        JSON.stringify(userData)
      );

      navigate(
        roleName === "admin" || roleName === "editor"
          ? "/haiadmin/dashboard"
          : "/",
        { replace: true }
      );
    } catch (err) {
      setErrorMsg(err.message || "Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicSuccess = (data) => {
    const { user, token } = data || {};
    if (!user) {
      setErrorMsg("Xác thực OTP thất bại. Vui lòng thử lại.");
      return;
    }

    const store = rememberUser ? localStorage : sessionStorage;
    store.setItem("user", JSON.stringify(user));
    if (token) store.setItem("token", token); // dùng cho API cần Bearer

    const roleName = (user?.role_id?.name || "viewer").toLowerCase();
    setOpenMagic(false);
    navigate(
      roleName === "admin" || roleName === "editor"
        ? "/haiadmin/dashboard"
        : "/",
      { replace: true }
    );
  };

  return (
    <div className="ioc-bg">
      <div className="ioc-center">
        <div className="ioc-box">
          {/* Bên trái: ảnh minh hoạ */}
          <div className="ioc-box-left" aria-hidden="true" />

          {/* Bên phải: form */}
          <div className="ioc-box-right">
            <div className="ioc-brand">
              <img className="ioc-badge" src={badgeLogo} alt="" />
              <div className="ioc-title">
                <div>CÔNG TY TNHH THIẾT KẾ VÀ XÂY DỰNG NGUYỄN HẢI</div>
              </div>
            </div>

            <h2 className="ioc-heading">Đăng Nhập</h2>

            <button
              type="button"
              className="ioc-btn oauth-btn"
              onClick={() => setOpenMagic(true)}
            >
              <span className="btn-icon">
                <FcGoogle size={24} />
              </span>
              Đăng nhập bằng Email
            </button>

            {openMagic && (
              <MagicEmailLogin
                API_BASE={API_BASE}
                onClose={() => setOpenMagic(false)}
                onSuccess={handleMagicSuccess}
              />
            )}

            <div className="ioc-sep">
              <span>Hoặc đăng nhập bằng tài khoản PCD</span>
            </div>

            <form onSubmit={handleLogin} className="ioc-form">
              <label className="ioc-label">Tên đăng nhập</label>
              <div className="ioc-field">
                <span className="ioc-ico">👤</span>
                <input
                  className="ioc-input"
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <label className="ioc-label">Mật khẩu</label>
              <div className="ioc-field">
                <span className="ioc-ico">🔒</span>
                <input
                  className="ioc-input"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="ioc-eye"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>

              <button
                className="ioc-btn primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Đang đăng nhập…" : "Đăng nhập"}
              </button>

              <div className="ioc-actions">
                <Link to="/forgot" className="ioc-link">
                  Quên mật khẩu?
                </Link>
                <Link to="/" className="ioc-link">
                  Quay lại trang chủ
                </Link>
                <label className="ioc-remember">
                  <input
                    type="checkbox"
                    checked={rememberUser}
                    onChange={(e) => setRememberUser(e.target.checked)}
                  />
                  Nhớ tên đăng nhập
                </label>
              </div>

              {errorMsg && <div className="ioc-error">{errorMsg}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
