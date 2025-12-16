import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./nhom_list.css";

/** BASE động: Vite -> CRA -> window.location */
const API = "https://api.nguyenhai.com.vn/api";

export default function Nhom_List() {
  const navigate = useNavigate();
  const location = useLocation();
  const phanIdFromState = location.state?.phanId || ""; // giữ phần được chọn khi quay lại

  const [phanOptions, setPhanOptions] = useState([]);
  const [phanId, setPhanId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI filter/sort
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("order"); // order | name

  /** tải danh sách Phần */
  async function loadPhan() {
    try {
      const res = await fetch(`${API}/phan`, { credentials: "include" });
      const json = await res.json();
      const list = json.duLieu || [];
      setPhanOptions(list);

      // chọn ưu tiên: state -> hiện tại -> phần đầu tiên
      const firstId = list?.[0]?._id || "";
      setPhanId((prev) => phanIdFromState || prev || firstId);
    } catch (e) {
      console.error(e);
      alert("Lỗi tải danh sách Phần");
    }
  }

  /** tải Nhóm theo phần */
  async function loadNhom(id) {
    if (!id) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/nhom?phan=${id}`, {
        credentials: "include",
      });
      const json = await res.json();
      setRows(json.duLieu || []);
    } catch (e) {
      console.error(e);
      alert("Lỗi tải danh sách Nhóm");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phanId) loadNhom(phanId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phanId]);

  /** filter + sort client-side */
  const view = useMemo(() => {
    let list = [...rows];
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      list = list.filter(
        (x) =>
          x.ten?.toLowerCase().includes(k) ||
          x.slug?.toLowerCase().includes(k) ||
          x.phan?.ten?.toLowerCase().includes(k) ||
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
    <div className="nhom-page">
      <div className="nhom-header">
        <h2>Bộ sưu tập Nhóm</h2>

        <div className="nhom-actions">
          <div className="left">
            <select
              className="sel"
              value={phanId}
              onChange={(e) => setPhanId(e.target.value)}
              title="Chọn Phần"
            >
              {phanOptions.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.ten}
                </option>
              ))}
            </select>

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
              <option value="order">Sắp theo Thứ tự</option>
              <option value="name">Sắp theo Tên (A→Z)</option>
            </select>

            <button
              className="btn ghost"
              onClick={() => loadNhom(phanId)}
              disabled={loading}
            >
              {loading ? "Đang tải..." : "Tải lại"}
            </button>

            <button className="btn ghost" onClick={() => navigate(-1)}>
              ← Quay lại
            </button>
          </div>

          <button
            className="btn primary"
            onClick={() =>
              navigate("/haiadmin/add-nhom", { state: { phanId } })
            }
          >
            + Thêm nhóm
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
              <th>Phần</th>
              <th style={{ width: 120 }}>Thứ tự</th>
              <th style={{ width: 160 }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="loading-cell">
                  <div className="spinner" /> Đang tải dữ liệu…
                </td>
              </tr>
            )}

            {!loading && view.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-cell">
                  <div className="empty">
                    <div className="empty-title">
                      Chưa có nhóm nào khớp bộ lọc
                    </div>
                    <div className="empty-sub">
                      Hãy đổi từ khóa, chọn Phần khác hoặc nhấn “Tải lại”.
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
                  <td className="muted">{r.phan?.ten || "-"}</td>
                  <td>
                    <span className="pill">{r.thuTu ?? 0}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn tiny outline"
                        onClick={() => navigate(`/haiadmin/edit-nhom/${r._id}`)} // dùng đúng _id NHÓM
                      >
                        Sửa
                      </button>
                      <button
                        className="btn tiny danger"
                        onClick={async () => {
                          if (!window.confirm(`Xóa nhóm “${r.ten}”?`)) return;
                          try {
                            await fetch(`${API}/nhom/${r._id}`, {
                              method: "DELETE",
                              credentials: "include",
                            });
                            await loadNhom(phanId);
                          } catch (e) {
                            console.error(e);
                            alert(
                              "Xóa thất bại. Kiểm tra API DELETE /nhom/:id."
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
