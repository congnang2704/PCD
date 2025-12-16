import React, { useEffect, useMemo, useState } from "react";
import "./Container_NhanSu.css";
import aboutBanner from "../../../../assets/nanhdnen.jpg";

const API = "https://api.nguyenhai.com.vn/api/nhansu";
const API_ORIGIN = (() => {
  try {
    const u = new URL(API);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "";
  }
})();

/* ================= Helpers ================= */
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
function tenureYears(fromYear) {
  if (!fromYear) return "";
  const y = Number(fromYear);
  if (!Number.isFinite(y)) return "";
  const now = new Date().getFullYear();
  const years = Math.max(0, now - y);
  return `${y} – Đến nay (${years} năm)`;
}
function buildAvatarURL(a) {
  if (!a) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  let s = String(a).trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/uploads/")) return `${API_ORIGIN}${s}`;
  if (s.startsWith("uploads/")) return `${API_ORIGIN}/${s}`;
  if (!s.includes("/")) return `${API_ORIGIN}/uploads/avatars/${s}`;
  const idx = s.indexOf("uploads/");
  if (idx >= 0) return `${API_ORIGIN}/${s.slice(idx)}`;
  return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
}
const toYear = (n) => (Number.isFinite(Number(n)) ? Number(n) : NaN);

/* ================ Component ================ */
const Container_NhanSu = () => {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(API);
        const data = await res.json().catch(() => ({}));
        const arr = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        const norm = arr.map((p) => ({
          ...p,
          avatar: buildAvatarURL(p.avatar),
        }));
        if (alive) setList(norm);
      } catch {
        if (alive) setErr("Không tải được danh sách nhân sự.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return list;
    return list.filter((p) => {
      const name = (p.hoTen || "").toLowerCase();
      const role = (p.chucVu || "").toLowerCase();
      return name.includes(k) || role.includes(k);
    });
  }, [list, q]);

  const ordered = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const ya = toYear(a.namVaoLam);
      const yb = toYear(b.namVaoLam);
      const aHas = Number.isFinite(ya);
      const bHas = Number.isFinite(yb);
      if (aHas && bHas) {
        if (ya !== yb) return ya - yb;
      } else if (aHas) return -1;
      else if (bHas) return 1;
      const ca = a.createdAt ? new Date(a.createdAt).getTime() : Infinity;
      const cb = b.createdAt ? new Date(b.createdAt).getTime() : Infinity;
      if (ca !== cb) return ca - cb;
      return (a.hoTen || "").localeCompare(b.hoTen || "");
    });
    return arr;
  }, [filtered]);

  const teamCount = ordered.length;

  return (
    <div className="nhansu-theme">
      <div className="nhansu-wrap">
        {/* ===== INTRO ===== */}
        <section className="nhansu-intro">
          <h2>Về đội ngũ của chúng tôi</h2>
          <p>
            Nguyễn Hải quy tụ các <strong>Kiến trúc sư</strong>,{" "}
            <strong>Kỹ sư</strong> và
            <strong> Chuyên gia quản lý dự án</strong> có kinh nghiệm thực chiến
            ở nhiều loại hình công trình: nhà ở dân dụng, biệt thự, văn phòng,
            khách sạn, công trình công cộng… Chúng tôi coi <em>con người</em> là
            năng lực cốt lõi: chủ động học hỏi, ứng dụng công nghệ, chuẩn hoá
            quy trình để đảm bảo <strong>tiến độ</strong>,{" "}
            <strong>chất lượng</strong> và <strong>an toàn</strong> trên từng dự
            án.
          </p>
          <p>
            Mỗi thành viên được định hướng phát triển rõ ràng, đào tạo liên tục
            và làm việc trong môi trường cởi mở, hợp tác — luôn giữ tinh thần
            dịch vụ: <i>lắng nghe – thấu hiểu – đề xuất giải pháp phù hợp.</i>
          </p>
        </section>

        {/* ===== Toolbar (Search) ===== */}
        <div className="nhansu-toolbar">
          <input
            className="nhansu-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Tìm theo tên hoặc chức vụ · ${teamCount} thành viên`}
            aria-label="Tìm kiếm nhân sự"
          />
        </div>

        {err && <div className="nhansu-error">{err}</div>}

        {/* ===== GRID ===== */}
        <div className="nhansu-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="nhansu-card skeleton" />
              ))
            : ordered.map((p) => {
                const name = p.hoTen || "Không rõ tên";
                const role = p.chucVu || "";
                const avatar =
                  p.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                return (
                  <article
                    key={p._id}
                    className="nhansu-card"
                    onClick={() => setDetail(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setDetail(p)}
                  >
                    <div className="nhansu-photo">
                      <img
                        src={avatar}
                        alt={name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                      />
                      <span className="hello-badge" aria-hidden="true">
                        <span className="wave">👋</span> Chào bạn, mình là{" "}
                        {name}
                      </span>
                      <span className="online-dot" aria-hidden="true" />
                    </div>

                    <div className="nhansu-meta">
                      <h3 className="nhansu-name">{name}</h3>
                      {role ? <div className="nhansu-role">{role}</div> : null}

                      <div className="nhansu-section">
                        TRẢI NGHIỆM CHUYÊN NGHIỆP
                      </div>
                      <div className="nhansu-desc">
                        {tenureYears(p.namVaoLam) || ""}
                        {p.namVaoLam && <br />}
                        {role && ` ${role}`}
                      </div>

                      <div className="nhansu-mini">
                        {p.gioiTinh ? <span>{p.gioiTinh}</span> : null}
                        {p.ngaySinh ? (
                          <span> • {formatDate(p.ngaySinh)}</span>
                        ) : null}
                        {p.trangThai ? <span> • {p.trangThai}</span> : null}
                      </div>

                      <div className="nhansu-more">Xem chi tiết</div>
                    </div>
                  </article>
                );
              })}
        </div>

        {/* ===== MODAL ===== */}
        {detail && (
          <div className="nhansu-modal-mask" onClick={() => setDetail(null)}>
            <div className="nhansu-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="nhansu-close"
                onClick={() => setDetail(null)}
                aria-label="Đóng"
              >
                ×
              </button>

              <div className="nhansu-modal-head">
                <img
                  src={buildAvatarURL(detail.avatar)}
                  alt={detail.hoTen || ""}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                  }}
                />
                <div>
                  <h3>{detail.hoTen}</h3>
                  {detail.chucVu && (
                    <div className="nhansu-role">{detail.chucVu}</div>
                  )}
                </div>
              </div>

              <div className="nhansu-modal-grid">
                <div className="row">
                  <span>Giới tính</span>
                  <strong>{detail.gioiTinh || "-"}</strong>
                </div>
                <div className="row">
                  <span>Ngày sinh</span>
                  <strong>{formatDate(detail.ngaySinh) || "-"}</strong>
                </div>
                <div className="row">
                  <span>Thời gian làm việc</span>
                  <strong>{tenureYears(detail.namVaoLam) || "-"}</strong>
                </div>
                <div className="row">
                  <span>Trạng thái</span>
                  <strong>{detail.trangThai || "-"}</strong>
                </div>
                <div className="row">
                  <span>Ghi chú</span>
                  <strong className="wrap">{detail.ghiChu || "-"}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Container_NhanSu;
