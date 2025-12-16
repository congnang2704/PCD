import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../nhansu.css";

// ===== API Origin =====
const ORIGIN = (
  process.env.REACT_APP_API_ORIGIN || "https://api.nguyenhai.com.vn/"
).replace(/\/$/, "");

const API_BASE = `${ORIGIN}/api/nhansu`;

// ===== Helpers =====
const fmtDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${dd}/${m}/${y}`;
};

// Chuẩn hoá đường dẫn avatar: filename | uploads/... | /uploads/... | http(s):// | có backslash
const buildAvatarURL = (a) => {
  if (!a) return "/default-avatar.png";
  let s = String(a).trim().replace(/\\/g, "/");

  // full URL
  if (/^https?:\/\//i.test(s)) return s;

  // bắt đầu bằng /uploads/...  -> ghép ORIGIN
  if (s.startsWith("/uploads/")) return `${ORIGIN}${s}`;

  // bắt đầu bằng uploads/...   -> thêm /
  if (s.startsWith("uploads/")) return `${ORIGIN}/${s}`;

  // chỉ filename
  if (!s.includes("/")) return `${ORIGIN}/uploads/avatars/${s}`;

  // fallback: cố gắng cắt từ 'uploads/' trở đi
  const idx = s.indexOf("uploads/");
  if (idx >= 0) return `${ORIGIN}/${s.slice(idx)}`;

  return "/default-avatar.png";
};

const onImgError = (e) => {
  if (e.currentTarget.dataset.fallback) return;
  e.currentTarget.dataset.fallback = "1";
  e.currentTarget.src = "/default-avatar.png";
};

export default function NhanSuList() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json?.success) setData(json.data || []);
    } catch (e) {
      console.error(e);
      alert("Không tải được danh sách nhân sự.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const t = (q || "").toLowerCase().trim();
    return (data || []).filter((x) => {
      const okText =
        !t ||
        x.hoTen?.toLowerCase().includes(t) ||
        x.chucVu?.toLowerCase().includes(t) ||
        x.ghiChu?.toLowerCase().includes(t);
      const okStatus = status === "all" ? true : x.trangThai === status;
      return okText && okStatus;
    });
  }, [data, q, status]);

  const onDelete = async (id) => {
    if (!window.confirm("Chắc chắn xoá nhân sự này?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json?.success) throw new Error(json?.error || "Xoá thất bại");
      await fetchData();
    } catch (e) {
      console.error(e);
      alert("Xoá thất bại!");
    }
  };

  return (
    <div className="ns-wrap">
      <div className="ns-topbar">
        <h1>Nhân sự</h1>
        <div className="ns-actions">
          <input
            className="ns-input"
            placeholder="Tìm theo tên/chức vụ/ghi chú…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="ns-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            title="Lọc trạng thái"
          >
            <option value="all">Tất cả</option>
            <option value="Đang làm">Đang làm</option>
            <option value="Nghỉ việc">Nghỉ việc</option>
          </select>
          <button
            className="ns-btn"
            onClick={() => nav("/haiadmin/add-ql-nhan-su")}
          >
            + Thêm nhân sự
          </button>
        </div>
      </div>

      {loading ? (
        <div className="ns-loading">Đang tải…</div>
      ) : (
        <div className="ns-card">
          <table className="ns-table">
            <thead>
              <tr>
                <th style={{ width: 62 }}>Ảnh</th>
                <th>Họ tên</th>
                <th>Chức vụ</th>
                <th>Năm vào làm</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Trạng thái</th>
                <th style={{ width: 140 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="ns-empty">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filtered.map((x) => (
                  <tr key={x._id}>
                    <td>
                      <div className="ns-avatar">
                        <img
                          src={buildAvatarURL(x.avatar)}
                          alt={x.hoTen || "Avatar"}
                          loading="lazy"
                          onError={onImgError}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="ns-name">{x.hoTen}</div>
                      {x.ghiChu && <div className="ns-note">{x.ghiChu}</div>}
                    </td>
                    <td>{x.chucVu}</td>
                    <td>{x.namVaoLam}</td>
                    <td>{x.gioiTinh}</td>
                    <td>{fmtDate(x.ngaySinh)}</td>
                    <td>
                      <span
                        className={
                          x.trangThai === "Đang làm"
                            ? "ns-badge green"
                            : "ns-badge gray"
                        }
                      >
                        {x.trangThai}
                      </span>
                    </td>
                    <td>
                      <div className="ns-row-actions">
                        <button
                          className="ns-btn ghost"
                          onClick={() =>
                            nav(`/haiadmin/edit-ql-nhan-su/${x._id}`)
                          }
                        >
                          Sửa
                        </button>
                        <button
                          className="ns-btn danger"
                          onClick={() => onDelete(x._id)}
                        >
                          Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
