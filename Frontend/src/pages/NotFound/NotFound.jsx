import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./notfound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  // Admin nếu đúng prefix /haiadmin
  const isAdmin = location.pathname.startsWith("/haiadmin");

  // Đích chuyển hướng
  const HOME_PATH = isAdmin ? "/haiadmin/login" : "/";

  // số giây tự chuyển
  const [seconds, setSeconds] = useState(6);

  const fromPath = useMemo(() => {
    const p = location?.pathname || "";
    return p.length > 72 ? `${p.slice(0, 72)}…` : p;
  }, [location?.pathname]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (seconds <= 0) navigate(HOME_PATH, { replace: true });
  }, [seconds, navigate, HOME_PATH]);

  // Nội dung theo ngữ cảnh
  const brand = "Nguyễn Hải Design & Build";
  const slogan = "Thiết kế – Thi công – Xây dựng trọn gói";

  const title = isAdmin
    ? "Trang quản trị không tồn tại"
    : "Không tìm thấy trang bạn yêu cầu";

  const desc = isAdmin
    ? "Đường dẫn quản trị có thể đã bị đổi hoặc bạn nhập sai."
    : "Có thể bạn đã nhập sai link, hoặc trang đã được cập nhật.";

  const primaryText = isAdmin ? "Về trang đăng nhập" : "Về trang chủ";

  return (
    <main className="nf-wrap">
      <div className="nf-bg-grid" aria-hidden="true" />

      <section className="nf-card" aria-label="404 Not Found">
        {/* LEFT: nhận diện ngành + minh hoạ blueprint */}
        <aside className="nf-illu" aria-hidden="true">
          <div className="nf-illu-top">
            <div className="nf-badge">
              <span className="nf-dot" />
              <span className="nf-badge-text">{brand}</span>
            </div>
            <div className="nf-badge-sub">{slogan}</div>
          </div>

          <div className="nf-blueprint" />
          <div className="nf-mark nf-mark-1" />
          <div className="nf-mark nf-mark-2" />
          <div className="nf-mark nf-mark-3" />

          <div className="nf-tools">
            <div className="nf-tool">
              <span className="nf-tool-ico" aria-hidden="true">
                📐
              </span>
              <div className="nf-tool-text">
                <div className="nf-tool-title">Thiết kế</div>
                <div className="nf-tool-sub">Kiến trúc · Nội thất</div>
              </div>
            </div>

            <div className="nf-tool">
              <span className="nf-tool-ico" aria-hidden="true">
                🧱
              </span>
              <div className="nf-tool-text">
                <div className="nf-tool-title">Thi công</div>
                <div className="nf-tool-sub">Phần thô · Hoàn thiện</div>
              </div>
            </div>

            <div className="nf-tool">
              <span className="nf-tool-ico" aria-hidden="true">
                🏗️
              </span>
              <div className="nf-tool-text">
                <div className="nf-tool-title">Xây dựng</div>
                <div className="nf-tool-sub">Trọn gói · Đúng tiến độ</div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT: thông tin 404 + CTA */}
        <div className="nf-content">
          <div className="nf-topline">
            <div className="nf-code">404</div>
            {!isAdmin ? (
              <div className="nf-pill" title="Thiết kế – Thi công – Xây dựng">
                Design · Build · Construct
              </div>
            ) : null}
          </div>

          <h1 className="nf-title">{title}</h1>

          <p className="nf-desc">
            {desc}{" "}
            <span className="nf-path" title={fromPath || ""}>
              {fromPath || "—"}
            </span>
          </p>

          {!isAdmin ? (
            <div className="nf-promise">
              <div className="nf-promise-item">
                <span aria-hidden="true">✅</span>
                <span>Thiết kế đúng nhu cầu · tối ưu công năng</span>
              </div>
              <div className="nf-promise-item">
                <span aria-hidden="true">✅</span>
                <span>Thi công rõ hạng mục · minh bạch vật tư</span>
              </div>
              <div className="nf-promise-item">
                <span aria-hidden="true">✅</span>
                <span>Bảo hành & hỗ trợ trong suốt quá trình</span>
              </div>
            </div>
          ) : null}

          <div className="nf-actions">
            <Link className="nf-btn nf-primary" to={HOME_PATH}>
              {primaryText}
            </Link>

            {!isAdmin ? (
              <>
                <Link className="nf-btn nf-ghost" to="/bang-gia">
                  Xem bảng giá
                </Link>
                <Link className="nf-btn nf-ghost" to="/lien-he">
                  Nhận tư vấn / Báo giá nhanh
                </Link>
              </>
            ) : (
              <button
                className="nf-btn nf-ghost"
                onClick={() => navigate(-1)}
                type="button"
              >
                Quay lại
              </button>
            )}
          </div>

          <div className="nf-redirect">
            Tự chuyển sau <b>{seconds}s</b> ·{" "}
            <button
              className="nf-linkbtn"
              onClick={() => navigate(HOME_PATH, { replace: true })}
              type="button"
            >
              Chuyển ngay
            </button>
          </div>

          {!isAdmin ? (
            <div className="nf-links">
              <div className="nf-links-title">Gợi ý nhanh</div>
              <div className="nf-links-grid">
                <Link to="/dich-vu">Dịch vụ</Link>
                <Link to="/mau-nha-dep">Mẫu nhà đẹp</Link>
                <Link to="/du-an">Dự án thi công</Link>
                <Link to="/bang-gia">Bảng giá</Link>
                <Link to="/lien-he">Liên hệ</Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
