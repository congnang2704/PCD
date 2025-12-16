import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./hangmuc_list.css";

/** 🔧 BASE động: ưu tiên ENV -> window.__API__ -> auto local/prod */
const API = "https://api.nguyenhai.com.vn/api";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!ct.includes("application/json")) {
    try {
      const data = JSON.parse(text);
      return { ok: res.ok, status: res.status, data };
    } catch {
      throw new Error(`Không nhận JSON từ ${url}. Status ${res.status}.`);
    }
  }
  const data = JSON.parse(text);
  return { ok: res.ok, status: res.status, data };
}

export default function HangMuc_List() {
  const navigate = useNavigate();
  const location = useLocation();
  const phanIdFromState = location.state?.phanId || "";
  const nhomIdFromState = location.state?.nhomId || "";

  const [phan, setPhan] = useState([]);
  const [phanId, setPhanId] = useState("");
  const [nhom, setNhom] = useState([]);
  const [nhomId, setNhomId] = useState("");
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("order");
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });

  function showToast(msg, type = "success", duration = 1400) {
    setToast({ open: true, type, msg });
    setTimeout(() => setToast({ open: false, type, msg: "" }), duration);
  }

  async function loadPhan() {
    try {
      const { data } = await fetchJson(`${API}/phan`, {
        credentials: "include",
      });
      const list = data?.duLieu || [];
      setPhan(list);
      const first = phanIdFromState || list?.[0]?._id || "";
      setPhanId((prev) => prev || first);
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải danh sách Phần", "error");
    }
  }

  async function loadNhom(phanId) {
    if (!phanId) {
      setNhom([]);
      setNhomId("");
      return;
    }
    try {
      const { data } = await fetchJson(`${API}/nhom?phan=${phanId}`, {
        credentials: "include",
      });
      const list = data?.duLieu || [];
      setNhom(list);
      const first = nhomIdFromState || list?.[0]?._id || "";
      setNhomId((prev) => prev || first);
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải danh sách Nhóm", "error");
    }
  }

  async function loadHangMuc(nhomId) {
    if (!nhomId) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await fetchJson(`${API}/hangmuc?nhom=${nhomId}`, {
        credentials: "include",
      });
      setRows(data?.duLieu || []);
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải Hạng mục", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhan(); /* eslint-disable-next-line */
  }, []);
  useEffect(() => {
    if (phanId) loadNhom(phanId); /* eslint-disable-next-line */
  }, [phanId]);
  useEffect(() => {
    if (nhomId) loadHangMuc(nhomId); /* eslint-disable-next-line */
  }, [nhomId]);

  const view = useMemo(() => {
    let list = [...rows];
    const key = q.trim().toLowerCase();
    if (key) {
      list = list.filter(
        (x) =>
          (x.ten || "").toLowerCase().includes(key) ||
          (x.slug || "").toLowerCase().includes(key) ||
          (x.loai || "").toLowerCase().includes(key) ||
          (x.nhom?.ten || "").toLowerCase().includes(key)
      );
    }
    if (sort === "name")
      list.sort((a, b) => (a.ten || "").localeCompare(b.ten || ""));
    else if (sort === "type")
      list.sort((a, b) => (a.loai || "").localeCompare(b.loai || ""));
    else list.sort((a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0));
    return list;
  }, [rows, q, sort]);

  async function onDelete(row) {
    if (!window.confirm(`Xoá hạng mục “${row.ten}”?`)) return;
    try {
      const res = await fetch(`${API}/hangmuc/${row._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Xoá thất bại");
      showToast("Đã xoá", "success");
      await loadHangMuc(nhomId);
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi xoá", "error");
    }
  }

  return (
    <div className="vl-hm-list">
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="header">
        <h2>Hạng mục vật liệu</h2>
        <div className="grow" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
        <button
          className="btn primary"
          onClick={() =>
            navigate("/haiadmin/add-hang-muc", { state: { phanId, nhomId } })
          }
        >
          + Thêm hạng mục
        </button>
      </div>

      <div className="filters">
        <select
          className="sel"
          value={phanId}
          onChange={(e) => {
            setPhanId(e.target.value);
            setNhomId("");
          }}
        >
          {phan.map((p) => (
            <option key={p._id} value={p._id}>
              {p.ten}
            </option>
          ))}
        </select>

        <select
          className="sel"
          value={nhomId}
          onChange={(e) => setNhomId(e.target.value)}
        >
          {nhom.map((n) => (
            <option key={n._id} value={n._id}>
              {n.ten}
            </option>
          ))}
        </select>

        <input
          className="inp"
          placeholder="Tìm theo tên / slug / loại…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="sel"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          title="Sắp xếp"
        >
          <option value="order">Sắp theo Thứ tự</option>
          <option value="name">Sắp theo Tên (A→Z)</option>
          <option value="type">Sắp theo Loại</option>
        </select>

        <button
          className="btn ghost"
          onClick={() => loadHangMuc(nhomId)}
          disabled={loading}
        >
          {loading ? "Đang tải…" : "Tải lại"}
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 56 }}>#</th>
              <th>Tên</th>
              <th>Slug</th>
              <th>Loại</th>
              <th>Nhóm</th>
              <th style={{ width: 160 }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={`sk-${i}`} className="skeleton">
                  <td colSpan={6}>
                    <div className="sk-line" />
                  </td>
                </tr>
              ))}

            {!loading && view.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">
                  <div className="empty-title">
                    Không có hạng mục nào khớp bộ lọc
                  </div>
                  <div className="empty-sub">
                    Hãy đổi từ khoá, chọn Nhóm khác hoặc nhấn “Tải lại”.
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              view.map((r, idx) => (
                <tr key={r._id}>
                  <td className="muted">{idx + 1}</td>
                  <td className="bold">{r.ten}</td>
                  <td>
                    <span className="tag">{r.slug}</span>
                  </td>
                  <td>
                    <span className="pill">{r.loai || "-"}</span>
                  </td>
                  <td className="muted">{r.nhom?.ten || "-"}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn tiny outline"
                        onClick={() =>
                          navigate(`/haiadmin/edit-hang-muc/${r._id}`, {
                            state: { phanId, nhomId },
                          })
                        }
                      >
                        Sửa
                      </button>
                      <button
                        className="btn tiny danger"
                        onClick={() => onDelete(r)}
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
