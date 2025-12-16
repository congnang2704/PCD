import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./phan_list.css";

const BASE = "https://api.nguyenhai.com.vn/api";

export default function Phan_List() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("order"); // order | name

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/phan`, { credentials: "include" });
      const json = await res.json();
      setRows(json.duLieu || []);
    } catch (e) {
      console.error(e);
      alert("Lỗi tải danh sách Phần");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // filter + sort client-side (nhanh gọn)
  const view = useMemo(() => {
    let list = [...rows];
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      list = list.filter(
        (x) =>
          x.ten?.toLowerCase().includes(k) ||
          x.slug?.toLowerCase().includes(k) ||
          String(x.thuTu ?? "").includes(k)
      );
    }
    if (sort === "name") {
      list.sort((a, b) => (a.ten || "").localeCompare(b.ten || ""));
    } else {
      list.sort((a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0));
    }
    return list;
  }, [rows, q, sort]);

  return (
    <div className="phan-page">
      <div className="phan-header">
        <h2>Bộ sưu tập Phần</h2>
        <div className="phan-actions">
          <div className="left">
            <input
              className="inp"
              placeholder="Tìm theo tên / slug / thứ tự…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select
              className="sel"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              title="Sắp xếp"
            >
              <option value="order">Sắp xếp theo Thứ tự</option>
              <option value="name">Sắp xếp theo Tên (A→Z)</option>
            </select>
            <button className="btn ghost" onClick={load} disabled={loading}>
              {loading ? "Đang tải..." : "Tải lại"}
            </button>
            <button className="btn ghost" onClick={() => navigate(-1)}>
              ← Quay lại
            </button>
          </div>

          <button
            className="btn primary"
            onClick={() => navigate("/haiadmin/add-phan")}
          >
            + Thêm phần
          </button>
        </div>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: 56 }}>#</th>
              <th>Tên</th>
              <th>Slug</th>
              <th style={{ width: 120 }}>Thứ tự</th>
              <th style={{ width: 280 }}>ID</th>
              <th style={{ width: 160 }}>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="loading-cell">
                  <div className="spinner" />
                  Đang tải dữ liệu…
                </td>
              </tr>
            )}

            {!loading && view.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-cell">
                  <div className="empty">
                    <div className="empty-title">
                      Chưa có phần nào khớp bộ lọc
                    </div>
                    <div className="empty-sub">
                      Thử đổi từ khóa khác hoặc nhấn “Tải lại”.
                    </div>
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
                    <span className="pill">{r.thuTu ?? 0}</span>
                  </td>
                  <td>
                    <code className="mono">{r._id}</code>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn tiny outline"
                        onClick={() =>
                          navigate(`/haiadmin/edit-phan/${r._id}`, {
                            state: { editId: r._id },
                          })
                        }
                        title="Sửa (dùng lại form Thêm)"
                      >
                        Sửa
                      </button>
                      <button
                        className="btn tiny danger"
                        onClick={async () => {
                          if (!window.confirm(`Xóa phần “${r.ten}”?`)) return;
                          try {
                            await fetch(`${BASE}/phan/${r._id}`, {
                              method: "DELETE",
                              credentials: "include",
                            });
                            await load();
                          } catch (e) {
                            console.error(e);
                            alert(
                              "Xóa thất bại. Kiểm tra API DELETE /phan/:id."
                            );
                          }
                        }}
                      >
                        Xóa
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
