import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./vatlieu_list.css";

/** 🔧 BASE động: ENV -> window.__API__ -> auto local/prod */
const API = "https://api.nguyenhai.com.vn/api";

/* ========= helpers ========= */
async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  let data;
  if (ct.includes("application/json")) {
    data = JSON.parse(text);
  } else {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }
  return { ok: res.ok, status: res.status, data };
}

export default function VatLieu_List() {
  const navigate = useNavigate();

  // cascading filters
  const [phan, setPhan] = useState([]);
  const [phanId, setPhanId] = useState("");

  const [nhom, setNhom] = useState([]);
  const [nhomId, setNhomId] = useState("");

  const [hm, setHm] = useState([]);
  const [hmId, setHmId] = useState("");

  // data + ui
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("order"); // order | name | code | newest
  const [loading, setLoading] = useState(false);

  // toast
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });
  function showToast(msg, type = "success", duration = 1400) {
    setToast({ open: true, type, msg });
    setTimeout(() => setToast({ open: false, type, msg: "" }), duration);
  }

  /* ====== Loaders ====== */
  async function loadPhan() {
    try {
      const { data } = await fetchJson(`${API}/phan`, {
        credentials: "include",
      });
      const list = data?.duLieu || [];
      setPhan(list);
      setPhanId((prev) => prev || list?.[0]?._id || "");
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải danh sách Phần", "error");
    }
  }
  async function loadNhom(pid) {
    if (!pid) {
      setNhom([]);
      setNhomId("");
      return;
    }
    try {
      const { data } = await fetchJson(`${API}/nhom?phan=${pid}`, {
        credentials: "include",
      });
      const list = data?.duLieu || [];
      setNhom(list);
      setNhomId(
        (prev) => list.find((x) => x._id === prev)?._id || list?.[0]?._id || ""
      );
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải danh sách Nhóm", "error");
    }
  }
  async function loadHM(nid) {
    if (!nid) {
      setHm([]);
      setHmId("");
      return;
    }
    try {
      const { data } = await fetchJson(`${API}/hangmuc?nhom=${nid}`, {
        credentials: "include",
      });
      const list = data?.duLieu || [];
      setHm(list);
      setHmId(
        (prev) => list.find((x) => x._id === prev)?._id || list?.[0]?._id || ""
      );
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải Hạng mục", "error");
    }
  }
  async function loadVL(extra = {}) {
    if (!hmId) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const url = new URL(`${API}/vatlieu`);
      url.searchParams.set("hangMuc", hmId);
      if (q.trim()) url.searchParams.set("q", q.trim());
      if (extra.sort) url.searchParams.set("sort", extra.sort);
      const { data } = await fetchJson(url.toString(), {
        credentials: "include",
      });
      setRows(data?.duLieu || []);
    } catch (e) {
      console.error(e);
      showToast("Lỗi tải Vật liệu", "error");
    } finally {
      setLoading(false);
    }
  }

  /* ====== Effects ====== */
  useEffect(() => {
    loadPhan();
  }, []);
  useEffect(() => {
    if (phanId) loadNhom(phanId);
  }, [phanId]);
  useEffect(() => {
    if (nhomId) loadHM(nhomId);
  }, [nhomId]);
  useEffect(() => {
    if (hmId) loadVL({ sort });
  }, [hmId, sort]);

  // debounce search 300ms
  useEffect(() => {
    const t = setTimeout(() => {
      if (hmId) loadVL({ sort });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  /* ====== Client sort fallback (nếu BE không sort) ====== */
  const view = useMemo(() => {
    let list = [...rows];
    if (sort === "name")
      list.sort((a, b) => (a.ten || "").localeCompare(b.ten || ""));
    else if (sort === "code")
      list.sort((a, b) => (a.ma || "").localeCompare(b.ma || ""));
    else if (sort === "newest")
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    else list.sort((a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0));
    return list;
  }, [rows, sort]);

  /* ====== Actions ====== */
  function goAdd() {
    navigate("/haiadmin/add-vat-lieu", { state: { phanId, nhomId, hmId } });
  }
  function goEdit(row) {
    navigate(`/haiadmin/edit-vat-lieu/${row._id}`, {
      state: { phanId, nhomId, hmId },
    });
  }
  async function onDelete(row) {
    if (!window.confirm(`Xoá vật liệu “${row.ten || row.ma}”?`)) return;
    try {
      const res = await fetch(`${API}/vatlieu/${row._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Xoá thất bại");
      showToast("Đã xoá!", "success");
      await loadVL({ sort });
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi xoá", "error");
    }
  }

  return (
    <div className="vl-vl-list">
      {/* Toast */}
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="header">
        <h2>Vật liệu</h2>
        <div className="grow" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
        <button className="btn primary" onClick={goAdd}>
          + Thêm vật liệu
        </button>
      </div>

      <div className="filters">
        <select
          className="sel"
          value={phanId}
          onChange={(e) => {
            setPhanId(e.target.value);
            setNhomId("");
            setHmId("");
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
          onChange={(e) => {
            setNhomId(e.target.value);
            setHmId("");
          }}
        >
          {nhom.map((n) => (
            <option key={n._id} value={n._id}>
              {n.ten}
            </option>
          ))}
        </select>

        <select
          className="sel"
          value={hmId}
          onChange={(e) => setHmId(e.target.value)}
        >
          {hm.map((h) => (
            <option key={h._id} value={h._id}>
              {h.ten}
            </option>
          ))}
        </select>

        <input
          className="inp"
          placeholder="Tìm mã / tên…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="sel"
          title="Sắp xếp"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="order">Sắp theo Thứ tự</option>
          <option value="name">Sắp theo Tên (A→Z)</option>
          <option value="code">Sắp theo Mã</option>
          <option value="newest">Mới nhất</option>
        </select>

        <button
          className="btn ghost"
          onClick={() => hmId && loadVL({ sort })}
          disabled={loading}
        >
          {loading ? "Đang tải…" : "Tải lại"}
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 120 }}>Mã</th>
              <th>Tên</th>
              <th>Hạng mục</th>
              <th style={{ width: 260 }}>Ảnh</th>
              <th style={{ width: 160 }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={`sk-${i}`} className="skeleton">
                  <td colSpan={5}>
                    <div className="sk-line" />
                  </td>
                </tr>
              ))}

            {!loading && view.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  <div className="empty-title">
                    Không có vật liệu nào khớp bộ lọc
                  </div>
                  <div className="empty-sub">
                    Đổi từ khóa, chọn Hạng mục khác hoặc bấm “Tải lại”.
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              view.map((r) => (
                <tr key={r._id}>
                  <td className="code">{r.ma || "-"}</td>
                  <td className="bold">{r.ten || "-"}</td>
                  <td className="muted">{r.hangMuc?.ten || "-"}</td>
                  <td>
                    <div className="thumbs">
                      {(r.anh || []).slice(0, 4).map((a) => (
                        <a
                          key={a._id}
                          className="thumb-wrap"
                          href={a.duongDan}
                          target="_blank"
                          rel="noreferrer"
                          title={a.moTa || ""}
                        >
                          <img
                            className="thumb"
                            src={a.duongDan}
                            alt={a.moTa || ""}
                            onError={(ev) => {
                              ev.currentTarget.src = "/noimg.png";
                            }}
                          />
                        </a>
                      ))}
                      {(r.anh || []).length > 4 && (
                        <div className="thumb more">
                          +{(r.anh || []).length - 4}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn tiny outline"
                        onClick={() => goEdit(r)}
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
