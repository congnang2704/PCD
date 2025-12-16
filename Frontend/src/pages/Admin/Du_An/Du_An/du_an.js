// src/pages/admin/DuAn.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./du_an.css";

/* ========= API BASE + URL helper ========= */
/** 🔧 Dùng domain cố định */
const API_BASE = "https://api.nguyenhai.com.vn";

/** 🎯 Endpoint chuẩn */
const API_PROJECTS = `${API_BASE}/api/projects`;
const API_CATEGORIES = `${API_BASE}/api/categories`;

/** 🔗 Chuẩn hoá URL ảnh/tệp -> tuyệt đối về API_BASE */
/** 🔗 Chuẩn hoá URL ảnh/tệp -> tuyệt đối về API_BASE */
function assetUrl(input) {
  if (!input) return "/no-image.png";

  let s = String(input).trim();

  // 1) Normalize slash (Windows) -> /
  s = s.replace(/\\/g, "/");

  // 2) Nếu là absolute http(s) nhưng là localhost -> đổi origin sang prod
  try {
    if (/^https?:\/\//i.test(s)) {
      const u = new URL(s);
      if (u.hostname === "localhost") {
        u.protocol = "https:";
        u.host = "api.nguyenhai.com.vn";
        // Nếu backend mount uploads ở gốc, xoá /api/ trước uploads
        u.pathname = u.pathname.replace(/\/api\/(uploads\/)/, "/$1");
      }
      s = u.toString();
    }
  } catch {
    // không làm gì, tiếp tục xử lý bên dưới
  }

  // 3) Bỏ "public/" dư thừa
  s = s.replace(/(^|\/)public\/+/i, "$1");

  // 4) Chuẩn hoá "/api/uploads" -> "/uploads"
  s = s.replace(/\/api\/(uploads\/)/i, "/$1");

  // 5) Nếu chưa phải absolute -> ghép với API_BASE
  if (!/^https?:\/\//i.test(s)) {
    // đảm bảo path bắt đầu bằng "/"
    if (!s.startsWith("/")) s = "/" + s;
    s = `${API_BASE}${s}`;
  }

  // 6) Xoá double slash (trừ sau http(s)://)
  s = s.replace(/([^:]\/)\/+/g, "$1");

  return s;
}

/* ========= UI helpers ========= */
const STATUS_MAP = {
  "thiết kế": { label: "Thiết kế", className: "badge blue" },
  "xây dựng": { label: "Xây dựng", className: "badge orange" },
  "hoàn thành": { label: "Hoàn thành", className: "badge green" },
  "đã công bố": { label: "Đã công bố", className: "badge gray" },
};

function fmtMoney(inv) {
  if (!inv) return "";
  if (inv.display) return inv.display;
  if (typeof inv.amount === "number") {
    try {
      return (
        (inv.amount || 0).toLocaleString("vi-VN") + " " + (inv.currency || "")
      );
    } catch {}
  }
  return "";
}

/* ========= Component ========= */
export default function DuAn() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [resP, resC] = await Promise.all([
          fetch(API_PROJECTS, { credentials: "include" }),
          fetch(API_CATEGORIES, { credentials: "include" }),
        ]);

        // Parse an toàn: nếu backend không trả JSON thì vẫn không vỡ
        const txtP = await resP.text();
        const txtC = await resC.text();
        const dataP = (() => {
          try {
            return JSON.parse(txtP);
          } catch {
            return { data: [] };
          }
        })();
        const dataC = (() => {
          try {
            return JSON.parse(txtC);
          } catch {
            return [];
          }
        })();

        if (!resP.ok)
          throw new Error(dataP?.error || "Lấy danh sách dự án thất bại");

        const catArr = Array.isArray(dataC?.data)
          ? dataC.data
          : Array.isArray(dataC)
          ? dataC
          : [];

        setProjects(Array.isArray(dataP?.data) ? dataP.data : []);
        setCategories(catArr);
      } catch (e) {
        console.error(e);
        setErrMsg(e.message || "Có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getCategoryNames = (categoryIds) => {
    if (!categoryIds || categoryIds.length === 0) return "Chưa có danh mục";
    return categoryIds
      .map((cat) => {
        if (typeof cat === "string") {
          const found = categories.find((c) => c._id === cat);
          return found ? found.name : "Không xác định";
        }
        return cat?.name || "Không xác định";
      })
      .join(", ");
  };

  const onDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    try {
      const res = await fetch(`${API_PROJECTS}/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const txt = await res.text();
      let j;
      try {
        j = JSON.parse(txt);
      } catch {
        j = {};
      }
      if (!res.ok) throw new Error(j?.error || "Xoá thất bại");
      setProjects((prev) => prev.filter((p) => p._id !== selectedId));
      setConfirmOpen(false);
      setSelectedId(null);
    } catch (e) {
      alert("Lỗi xoá: " + (e.message || "unknown"));
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const loc = (p.location || "").toLowerCase();
      const status = (p.status || "").toLowerCase();
      return name.includes(q) || loc.includes(q) || status.includes(q);
    });
  }, [projects, search]);

  const gotoAdd = () => navigate("/haiadmin/add-du-an");
  const gotoEdit = (p) => navigate(`/haiadmin/edit-du-an/${p._id}`);

  return (
    <div className="duan-wrap">
      <div className="duan-header">
        <div>
          <h2>Quản trị Dự án</h2>
        </div>
        <div className="duan-actions">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Tìm theo tên / vị trí / trạng thái…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn primary" onClick={gotoAdd}>
            ➕ Thêm dự án
          </button>
        </div>
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="sk-img" />
              <div className="sk-line" />
              <div className="sk-line short" />
            </div>
          ))}
        </div>
      ) : errMsg ? (
        <div className="error-box">⚠️ {errMsg}</div>
      ) : filtered.length === 0 ? (
        <div className="empty-box">
          <img src="/empty-state.svg" alt="empty" />
          <p>Chưa có dự án nào phù hợp</p>
        </div>
      ) : (
        <div className="duan-table-wrap">
          <table className="duan-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dự án</th>
                <th>Ảnh</th>
                <th>Vị trí</th>
                <th>Đầu tư</th>
                <th>Trạng thái</th>
                <th>Danh mục</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => {
                const badge = STATUS_MAP[p.status] || STATUS_MAP["đã công bố"];
                return (
                  <tr key={p._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="title-col">
                        <div className="name">{p.name}</div>
                        <div className="desc">
                          {(p.description || "").slice(0, 100)}
                        </div>
                        <div className="slug">/{p.slug}</div>
                      </div>
                    </td>
                    <td>
                      {p.image ? (
                        <img
                          className="thumb-imgduan"
                          src={assetUrl(p.image)}
                          alt={p.name}
                          loading="lazy"
                          onError={(e) =>
                            (e.currentTarget.src = "/no-image.png")
                          }
                        />
                      ) : (
                        <span className="muted">Chưa có</span>
                      )}
                    </td>
                    <td>{p.location || <span className="muted">—</span>}</td>
                    <td>
                      {fmtMoney(p.investment) || (
                        <span className="muted">—</span>
                      )}
                    </td>
                    <td>
                      <span className={badge.className}>{badge.label}</span>
                    </td>
                    <td>{getCategoryNames(p.categoryIds)}</td>
                    <td className="actions-col">
                      <button className="btn text" onClick={() => gotoEdit(p)}>
                        ✏️ Sửa
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => onDeleteClick(p._id)}
                      >
                        🗑️ Xoá
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Gallery xem nhanh */}
          <div className="gallery-hint">
            <h4>📷 Thư viện ảnh (nhanh)</h4>
            <div className="grid">
              {filtered.slice(0, 6).map((p) => (
                <div className="g-item" key={p._id}>
                  <div className="g-title">{p.name}</div>
                  <div className="g-photos">
                    {(Array.isArray(p.gallery)
                      ? p.gallery.slice(0, 4)
                      : []
                    ).map((g, i) => {
                      const url = typeof g === "string" ? g : g?.url;
                      return url ? (
                        <img
                          key={i}
                          src={assetUrl(url)}
                          alt={(typeof g === "object" && g?.alt) || p.name}
                          loading="lazy"
                          onError={(e) =>
                            (e.currentTarget.src = "/no-image.png")
                          }
                        />
                      ) : (
                        <div key={i} className="muted small">
                          N/A
                        </div>
                      );
                    })}
                    {(!p.gallery || p.gallery.length === 0) && (
                      <div className="muted small">Chưa có ảnh</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xoá */}
      {confirmOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Bạn chắc chắn xoá dự án này?</h3>
            <div className="modal-actions">
              <button className="btn danger" onClick={onConfirmDelete}>
                ✅ Xoá
              </button>
              <button className="btn" onClick={() => setConfirmOpen(false)}>
                ❌ Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
