// src/pages/admin/Brands.js
import React, { useEffect, useMemo, useState } from "react";
import "./Brands.css";

/** ====== API BASE ====== */
const API_BASE = "https://api.nguyenhai.com.vn/api/brands";
const API_ORIGIN = "https://api.nguyenhai.com.vn";

/** ====== helpers ====== */
async function fetchJson(url, options) {
  const res = await fetch(url, { credentials: "include", ...options });
  const ct = res.headers.get("content-type") || "";
  let data = null;
  try {
    data = ct.includes("application/json")
      ? await res.json()
      : await res.text();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

function assetUrl(p) {
  if (!p) return "/no-image.png";
  let s = String(p).trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(s)) return s;
  return `${API_ORIGIN}${s.startsWith("/") ? s : `/${s}`}`;
}

/** ====== Main component ====== */
export default function Brands() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    is_active: true,
    imageFile: null,
    preview: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmDel, setConfirmDel] = useState({
    open: false,
    id: null,
    name: "",
  });

  const totalActive = useMemo(
    () => items.filter((x) => x.is_active).length,
    [items]
  );

  async function load() {
    setLoading(true);
    setErr("");
    const { ok, data } = await fetchJson(API_BASE, { method: "GET" });
    if (!ok) {
      setErr(data?.error || "Tải dữ liệu thất bại");
    } else {
      setItems(Array.isArray(data?.data) ? data.data : []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ name: "", is_active: true, imageFile: null, preview: "" });
    setShowModal(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm({
      name: item?.name || "",
      is_active: !!item?.is_active,
      imageFile: null,
      preview: item?.image ? assetUrl(item.image) : "",
    });
    setShowModal(true);
  }

  function onPickImage(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setForm((f) => ({ ...f, imageFile: null, preview: "" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imageFile: file, preview: url }));
  }

  async function onSubmit(e) {
    e?.preventDefault();
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên thương hiệu");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("is_active", String(!!form.is_active));
      if (form.imageFile) fd.append("image", form.imageFile);

      let res;
      if (editing) {
        res = await fetch(`${API_BASE}/${editing._id}`, {
          method: "PUT",
          body: fd,
          credentials: "include",
        });
      } else {
        res = await fetch(API_BASE, {
          method: "POST",
          body: fd,
          credentials: "include",
        });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Lưu thất bại");

      setShowModal(false);
      setForm({ name: "", is_active: true, imageFile: null, preview: "" });
      await load();
    } catch (e) {
      alert(e.message || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(item) {
    const target = !item.is_active;
    const res = await fetch(`${API_BASE}/${item._id}/active`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ is_active: target }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || "Đổi trạng thái thất bại");
      return;
    }
    setItems((arr) =>
      arr.map((x) => (x._id === item._id ? { ...x, is_active: target } : x))
    );
  }

  async function doDelete() {
    if (!confirmDel.id) return;
    const res = await fetch(`${API_BASE}/${confirmDel.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || "Xoá thất bại");
      return;
    }
    setConfirmDel({ open: false, id: null, name: "" });
    await load();
  }

  return (
    <div className="brands-page">
      <div className="brands-header">
        <div className="brands-title">
          <h1>Quản lý Thương hiệu</h1>
          <p>
            Tổng: <b>{items.length}</b> • Đang hiển thị: <b>{totalActive}</b>
          </p>
        </div>
        <div className="brands-actions">
          <button
            className="brands-btn brands-btn-primary"
            onClick={openCreate}
          >
            + Thêm thương hiệu
          </button>
          <button className="brands-btn brands-btn-ghost" onClick={load}>
            ⟳ Tải lại
          </button>
        </div>
      </div>

      {err && <div className="brands-error">⚠ {err}</div>}
      {loading ? (
        <div className="brands-loading">Đang tải danh sách...</div>
      ) : (
        <div className="brands-table">
          <div className="brands-thead">
            <div className="brands-col-logo">Logo</div>
            <div className="brands-col-name">Tên thương hiệu</div>
            <div className="brands-col-status">Trạng thái</div>
            <div className="brands-col-actions">Thao tác</div>
          </div>
          <div className="brands-tbody">
            {items.map((it) => (
              <div className="brands-row" key={it._id}>
                <div className="brands-col-logo">
                  <img
                    className="brands-logo"
                    src={assetUrl(it.image)}
                    alt={it.name}
                    onError={(e) => (e.currentTarget.src = "/no-image.png")}
                  />
                </div>
                <div className="brands-col-name">
                  <div className="brands-name">{it.name}</div>
                  <div className="brands-id">ID: {it._id}</div>
                </div>
                <div className="brands-col-status">
                  <span
                    className={`brands-badge ${
                      it.is_active ? "brands-badge-on" : "brands-badge-off"
                    }`}
                  >
                    {it.is_active ? "Hiển thị" : "Ẩn"}
                  </span>
                </div>
                <div className="brands-col-actions">
                  <button
                    className="brands-btn brands-btn-small"
                    onClick={() => toggleActive(it)}
                  >
                    {it.is_active ? "Ẩn" : "Hiện"}
                  </button>
                  <button
                    className="brands-btn brands-btn-small brands-btn-secondary"
                    onClick={() => openEdit(it)}
                  >
                    Sửa
                  </button>
                  <button
                    className="brands-btn brands-btn-small brands-btn-danger"
                    onClick={() =>
                      setConfirmDel({ open: true, id: it._id, name: it.name })
                    }
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="brands-empty">Chưa có thương hiệu nào.</div>
            )}
          </div>
        </div>
      )}

      {/* ===== Modal Create/Edit ===== */}
      {showModal && (
        <div
          className="brands-modal-backdrop"
          onMouseDown={() => !submitting && setShowModal(false)}
        >
          <div
            className="brands-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="brands-modal-header">
              <h3>{editing ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu"}</h3>
              <button
                className="brands-modal-close"
                onClick={() => !submitting && setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <form className="brands-modal-body" onSubmit={onSubmit}>
              <label className="brands-form-field">
                <span className="brands-form-label">Tên thương hiệu *</span>
                <input
                  className="brands-form-input"
                  type="text"
                  placeholder="VD: Gucci"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                />
              </label>

              <div className="brands-form-grid-2">
                <label className="brands-form-field">
                  <span className="brands-form-label">Trạng thái</span>
                  <label className="brands-switch">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, is_active: e.target.checked }))
                      }
                    />
                    <span className="brands-slider" />
                    <span className="brands-switch-text">
                      {form.is_active ? "Hiển thị" : "Ẩn"}
                    </span>
                  </label>
                </label>

                <label className="brands-form-field">
                  <span className="brands-form-label">Logo (PNG/JPG)</span>
                  <input
                    className="brands-form-input"
                    type="file"
                    accept="image/*"
                    onChange={onPickImage}
                  />
                </label>
              </div>

              <div className="brands-preview-wrap">
                {form.preview ? (
                  <img
                    className="brands-preview-img"
                    src={form.preview}
                    alt="preview"
                  />
                ) : editing && editing.image ? (
                  <img
                    className="brands-preview-img"
                    src={assetUrl(editing.image)}
                    alt="preview"
                  />
                ) : (
                  <div className="brands-preview-placeholder">
                    Chưa chọn ảnh
                  </div>
                )}
              </div>

              <div className="brands-modal-footer">
                <button
                  type="button"
                  className="brands-btn brands-btn-ghost"
                  onClick={() => !submitting && setShowModal(false)}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="brands-btn brands-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Confirm Delete ===== */}
      {confirmDel.open && (
        <div
          className="brands-modal-backdrop"
          onMouseDown={() => setConfirmDel({ open: false, id: null, name: "" })}
        >
          <div
            className="brands-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="brands-modal-header">
              <h3>Xoá thương hiệu</h3>
              <button
                className="brands-modal-close"
                onClick={() =>
                  setConfirmDel({ open: false, id: null, name: "" })
                }
              >
                ✕
              </button>
            </div>
            <div className="brands-modal-body">
              Bạn chắc chắn muốn xoá <b>{confirmDel.name}</b>? Hành động này
              không thể hoàn tác.
            </div>
            <div className="brands-modal-footer">
              <button
                className="brands-btn brands-btn-ghost"
                onClick={() =>
                  setConfirmDel({ open: false, id: null, name: "" })
                }
              >
                Huỷ
              </button>
              <button
                className="brands-btn brands-btn-danger"
                onClick={doDelete}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
