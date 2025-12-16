// banner.js
import React, { useEffect, useMemo, useState } from "react";
import "./banner.css";

/** API endpoints */
const API_BASE = "https://api.nguyenhai.com.vn";
const API = `${API_BASE}/api/banners`;

/** Chuẩn hoá URL ảnh local /uploads → full URL */
function assetUrl(input) {
  if (!input) return "/no-image.png";
  const s = String(input).trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/uploads")) return `${API_BASE}${s}`;
  if (s.startsWith("uploads")) return `${API_BASE}/${s}`;
  return `${API_BASE}/${s.replace(/^\/+/, "")}`;
}

export default function AdminBannerManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    slug: "",
    link: "",
    imageUrl: "",
    isActive: true,
    order: 0,
  });
  const [file, setFile] = useState(null); // File ảnh upload
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  async function fetchList() {
    setLoading(true);
    setError("");
    try {
      // Admin cần tất cả → không truyền ?active
      const res = await fetch(API);
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Fetch failed");
      // sort theo order asc, sau đó createdAt desc (server đã sort, nhưng chắc cú)
      const list = Array.isArray(data.data) ? data.data.slice() : [];
      list.sort(
        (a, b) =>
          (a.order ?? 0) - (b.order ?? 0) ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );
      setItems(list);
    } catch (e) {
      setError(e.message || "Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        (it.title || "").toLowerCase().includes(q) ||
        (it.slug || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  function resetForm() {
    setSelected(null);
    setForm({
      title: "",
      slug: "",
      link: "",
      imageUrl: "",
      isActive: true,
      order: 0,
    });
    setFile(null);
  }

  function openCreate() {
    resetForm();
    setShowForm(true);
  }

  function openEdit(doc) {
    setSelected(doc);
    setForm({
      title: doc.title || "",
      slug: doc.slug || "",
      link: doc.link || "",
      imageUrl: doc.imageUrl || "",
      isActive: !!doc.isActive,
      order: Number.isFinite(+doc.order) ? +doc.order : 0,
    });
    setFile(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    resetForm();
  }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function onFileChange(e) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    // nếu chọn file thì có thể xoá imageUrl để đỡ nhầm
    // setForm((s) => ({ ...s, imageUrl: "" }));
  }

  function validate(values, hasFile, isEdit) {
    const errs = {};
    if (!values.title?.trim()) errs.title = "Bắt buộc nhập title";
    if (!values.slug?.trim()) errs.slug = "Bắt buộc nhập slug";
    if (values.slug && !/^[a-z0-9-]{3,120}$/.test(values.slug))
      errs.slug = "slug không hợp lệ";
    // Tạo mới: yêu cầu hoặc URL hoặc file
    if (!isEdit && !hasFile && !values.imageUrl?.trim())
      errs.image = "Chọn file hoặc nhập Image URL";
    // Nếu có URL thì phải http(s)
    if (values.imageUrl && !/^https?:\/\//.test(values.imageUrl))
      errs.imageUrl = "Image URL phải là http(s)";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const errs = validate(form, !!file, !!selected?._id);
      if (Object.keys(errs).length) {
        throw new Error(Object.values(errs).join("; "));
      }

      // Luôn dùng FormData để server chấp ảnh nếu có
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("slug", form.slug.trim());
      if (form.link !== undefined) fd.append("link", form.link?.trim() || "");
      if (form.order !== undefined) fd.append("order", String(form.order ?? 0));
      fd.append("isActive", form.isActive ? "true" : "false");
      // Nếu không có file mà có imageUrl → gửi imageUrl để server dùng URL ngoài
      if (!file && form.imageUrl?.trim()) {
        fd.append("imageUrl", form.imageUrl.trim());
      }
      if (file) fd.append("image", file); // field name "image" theo API

      let res, data;
      if (selected?._id) {
        res = await fetch(`${API}/${selected._id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch(API, {
          method: "POST",
          body: fd,
        });
      }

      data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Lưu thất bại");

      await fetchList();
      closeForm();
    } catch (e) {
      setError(e.message || "Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Xoá thất bại");
      setItems((list) => list.filter((x) => x._id !== id));
      setConfirmId(null);
    } catch (e) {
      setError(e.message || "Có lỗi khi xoá");
    }
  }

  async function toggleActive(banner) {
    setError("");
    try {
      const res = await fetch(`${API}/${banner._id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Cập nhật thất bại");
      setItems((list) =>
        list.map((x) =>
          x._id === banner._id ? { ...x, isActive: !x.isActive } : x
        )
      );
    } catch (e) {
      setError(e.message || "Có lỗi khi đổi trạng thái");
    }
  }

  async function updateOrder(row, nextOrder) {
    try {
      const res = await fetch(`${API}/${row._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: Number.isFinite(+nextOrder) ? +nextOrder : 0,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Lưu thứ tự thất bại");
      // reload cho chắc
      await fetchList();
    } catch (e) {
      setError(e.message || "Có lỗi khi lưu thứ tự");
    }
  }

  return (
    <div className="banner-page">
      <h1 className="banner-title">Banner Manager</h1>
      <div className="banner-toolbar">
        <div className="banner-toolbar-left">
          <input
            placeholder="Tìm theo tiêu đề/slug..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="banner-input"
          />
          <button onClick={openCreate} className="btn-primary" data-cta>
            + Thêm banner
          </button>
        </div>
        {loading && <span>Đang tải…</span>}
      </div>

      {error && <div className="banner-error">{error}</div>}

      <div className="banner-table-wrap">
        <table className="banner-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Link</th>
              <th>Thứ tự</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it._id}>
                <td data-label="Ảnh">
                  {it.imageUrl ? (
                    <img
                      src={assetUrl(it.imageUrl)}
                      alt={it.title}
                      className="banner-thumb"
                    />
                  ) : (
                    <span>(no image)</span>
                  )}
                </td>
                <td data-label="Title">{it.title}</td>
                <td data-label="Slug">
                  <code>{it.slug}</code>
                </td>
                <td data-label="Link">{it.link || <span>(null)</span>}</td>
                <td data-label="Thứ tự">
                  <input
                    type="number"
                    min={0}
                    className="banner-input small"
                    defaultValue={Number.isFinite(+it.order) ? +it.order : 0}
                    onBlur={(e) => updateOrder(it, e.target.value)}
                  />
                </td>
                <td data-label="Trạng thái">
                  {it.isActive ? (
                    <span className="badge badge-on">Đang hiện</span>
                  ) : (
                    <span className="badge badge-off">Đang ẩn</span>
                  )}
                </td>
                <td data-label="Hành động" className="row-actions">
                  <button
                    className="btn-sua btn-danger"
                    onClick={() => openEdit(it)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => toggleActive(it)}
                    title={
                      it.isActive
                        ? "Ẩn khỏi trang chủ"
                        : "Hiển thị trên trang chủ"
                    }
                  >
                    {it.isActive ? "Ẩn" : "Hiện"}
                  </button>
                  <button
                    className="btn-danger btn-xoa"
                    onClick={() => setConfirmId(it._id)}
                  >
                    Xoá
                  </button>
                  {confirmId === it._id && (
                    <div className="confirm-box">
                      <span>Xoá banner này?</span>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(it._id)}
                      >
                        Xoá
                      </button>
                      <button
                        className="btn"
                        onClick={() => setConfirmId(null)}
                      >
                        Huỷ
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-backdrop" onClick={closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selected?._id ? "Cập nhật banner" : "Tạo banner"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Title *</label>
              <input
                className="banner-input"
                name="title"
                value={form.title}
                onChange={onChange}
              />

              <label>Slug *</label>
              <input
                className="banner-input"
                name="slug"
                value={form.slug}
                onChange={onChange}
                placeholder="vd: summer-sale-2025"
              />

              <label>Link</label>
              <input
                className="banner-input"
                name="link"
                value={form.link}
                onChange={onChange}
                placeholder="/sale hoặc https://..."
              />

              <div className="form-row" style={{ display: "grid", gap: 8 }}>
                <div>
                  <label>Image URL (tuỳ chọn nếu không upload)</label>
                  <input
                    className="banner-input"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={onChange}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label>Hoặc Upload ảnh</label>
                  <input type="file" accept="image/*" onChange={onFileChange} />
                </div>
              </div>

              {(file || form.imageUrl) && (
                <img
                  src={
                    file ? URL.createObjectURL(file) : assetUrl(form.imageUrl)
                  }
                  alt="preview"
                  className="banner-preview"
                />
              )}

              <div className="form-row">
                <label>Thứ tự</label>
                <input
                  type="number"
                  min={0}
                  className="banner-input small"
                  name="order"
                  value={form.order}
                  onChange={onChange}
                />
              </div>

              <div className="form-row">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={!!form.isActive}
                    onChange={onChange}
                  />
                  Hiển thị trên trang chủ
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn" onClick={closeForm}>
                  Huỷ
                </button>
                <button type="submit" className="btn-primary" data-cta>
                  {saving ? "Đang lưu…" : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
