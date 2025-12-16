import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { message } from "antd";
import "./editduan.css";

/* ========= API BASE + URL helper ========= */
/** 🔧 Dùng domain cố định */
const API_BASE = "https://api.nguyenhai.com.vn";

/** 🎯 Endpoint chuẩn */
const API_PROJECT = (id) => `${API_BASE}/api/projects/${id}`;
const API_PROJECTS = `${API_BASE}/api/projects`;
const API_CATEGORIES = `${API_BASE}/api/categories`;

/** 🔗 Chuẩn hoá URL ảnh/tệp -> tuyệt đối về API_BASE */
function assetUrl(input) {
  if (!input) return "/no-image.png";
  let s = String(input).trim();

  // Normalize slash (Windows)
  s = s.replace(/\\/g, "/");

  // Nếu absolute URL nhưng là localhost -> đổi sang prod
  try {
    if (/^https?:\/\//i.test(s)) {
      const u = new URL(s);
      if (u.hostname === "localhost") {
        u.protocol = "https:";
        u.host = "api.nguyenhai.com.vn";
        u.pathname = u.pathname.replace(/\/api\/(uploads\/)/, "/$1");
      }
      s = u.toString();
    }
  } catch {}

  // Bỏ "public/" dư
  s = s.replace(/(^|\/)public\/+/i, "$1");
  // Chuẩn "/api/uploads" -> "/uploads"
  s = s.replace(/\/api\/(uploads\/)/i, "/$1");

  // Nếu chưa absolute -> ghép với API_BASE
  if (!/^https?:\/\//i.test(s)) {
    if (!s.startsWith("/")) s = "/" + s;
    s = `${API_BASE}${s}`;
  }

  // Xoá double slash (trừ sau http(s)://)
  s = s.replace(/([^:]\/)\/+/g, "$1");
  return s;
}

const STATUS_OPTIONS = [
  { value: "thiết kế", label: "Thiết kế" },
  { value: "xây dựng", label: "Xây dựng" },
  { value: "hoàn thành", label: "Hoàn thành" },
  { value: "đã công bố", label: "Đã công bố" },
];

export default function EditDuAn() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // file previews
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // form state
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    owner: "",
    investment: { amount: "", currency: "VND", display: "" },
    status: "đã công bố",
    services: [],
    image: "",
    gallery: [],
    location: "",
    categoryIds: [],
  });

  const revokeList = useRef([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [cateRes, projRes] = await Promise.all([
          fetch(API_CATEGORIES, { credentials: "include" }),
          fetch(API_PROJECT(id), { credentials: "include" }),
        ]);

        // categories
        const cateTxt = await cateRes.text();
        const cateJson = (() => {
          try {
            return JSON.parse(cateTxt);
          } catch {
            return [];
          }
        })();
        const cats = Array.isArray(cateJson?.data)
          ? cateJson.data
          : Array.isArray(cateJson)
          ? cateJson
          : [];
        setCategories(cats);

        // project
        const projTxt = await projRes.text();
        const projJson = (() => {
          try {
            return JSON.parse(projTxt);
          } catch {
            return {};
          }
        })();
        if (!projRes.ok)
          throw new Error(projJson?.error || "Không lấy được dữ liệu dự án");
        const p = projJson?.data || projJson;

        const imgAbs = p.image ? assetUrl(p.image) : "";
        const galAbs = Array.isArray(p.gallery)
          ? p.gallery.map((g) => assetUrl(typeof g === "string" ? g : g?.url))
          : [];

        setForm({
          name: p.name || "",
          slug: p.slug || "",
          description: p.description || "",
          owner: p.owner || "",
          investment: {
            amount: p?.investment?.amount ?? "",
            currency: p?.investment?.currency || "VND",
            display: p?.investment?.display || "",
          },
          status: p.status || "đã công bố",
          services: Array.isArray(p.services) ? p.services : [],
          image: p.image || "",
          gallery: Array.isArray(p.gallery) ? p.gallery : [],
          location: p.location || "",
          categoryIds: Array.isArray(p.categoryIds)
            ? p.categoryIds
                .map((c) => (typeof c === "string" ? c : c?._id))
                .filter(Boolean)
            : [],
        });

        setImagePreview(imgAbs);
        setGalleryPreviews(galAbs);
      } catch (err) {
        message.error(err.message || "Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      revokeList.current.forEach((u) => URL.revokeObjectURL(u));
      revokeList.current = [];
    };
  }, [id]);

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c._id, label: c.name })),
    [categories]
  );
  const selectedCategoryOptions = categoryOptions.filter((opt) =>
    form.categoryIds.includes(opt.value)
  );

  const serviceOptions = useMemo(
    () =>
      Array.isArray(form.services)
        ? form.services.map((s) => ({ value: s, label: s }))
        : [],
    [form.services]
  );
  const statusOption =
    STATUS_OPTIONS.find((o) => o.value === form.status) || STATUS_OPTIONS[3];

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const handleBasicChange = (e) => setField(e.target.name, e.target.value);
  const handleInvestmentChange = (e) =>
    setForm((f) => ({
      ...f,
      investment: { ...f.investment, [e.target.name]: e.target.value },
    }));
  const handleCategoryChange = (selected) =>
    setField(
      "categoryIds",
      Array.isArray(selected) ? selected.map((x) => x.value) : []
    );
  const handleServicesChange = (selected) =>
    setField(
      "services",
      Array.isArray(selected) ? selected.map((x) => x.value) : []
    );
  const handleStatusChange = (selected) =>
    setField("status", selected?.value || "đã công bố");

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    revokeList.current.push(url);
    setImagePreview(url);
  };
  const onPickGallery = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);
    const urls = files.map((f) => {
      const u = URL.createObjectURL(f);
      revokeList.current.push(u);
      return u;
    });
    setGalleryPreviews(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const fd = new FormData();

      fd.append("name", form.name);
      if (form.slug) fd.append("slug", form.slug);
      if (form.description) fd.append("description", form.description);
      if (form.owner) fd.append("owner", form.owner);
      if (form.location) fd.append("location", form.location);
      if (form.status) fd.append("status", form.status);

      if (form.investment?.display)
        fd.append("investment.display", form.investment.display);
      if (form.investment?.amount !== "" && form.investment?.amount != null)
        fd.append("investment.amount", String(form.investment.amount));
      if (form.investment?.currency)
        fd.append("investment.currency", form.investment.currency);

      if (Array.isArray(form.services))
        form.services.forEach((s) => fd.append("services[]", s));
      if (Array.isArray(form.categoryIds) && form.categoryIds.length)
        fd.append("categoryIds", form.categoryIds.join(","));

      if (imageFile) fd.append("image", imageFile);
      if (galleryFiles.length)
        galleryFiles.forEach((f) => fd.append("gallery", f));

      const res = await fetch(API_PROJECT(id), {
        method: "PUT",
        body: fd,
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Cập nhật thất bại");

      message.success("✅ Cập nhật dự án thành công");
      navigate("/haiadmin/du-an", { replace: true });
    } catch (err) {
      message.error(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="editduan-container">
      <div className="editduan-header">
        <h2 className="editduan-title">Sửa dự án</h2>
        <button
          className="btn ghost"
          onClick={() => navigate("/haiadmin/du-an")}
        >
          ⟵ Quay lại
        </button>
      </div>

      <form className="editduan-form" onSubmit={handleSubmit}>
        {/* ...UI giữ nguyên như bạn đang có... */}
        {/* (Toàn bộ phần JSX bên dưới không đổi gì ngoài việc dùng assetUrl ở chỗ ảnh) */}
        {/* ---- NAME + SLUG ---- */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Tên dự án
            </label>
            <input
              id="name"
              className="form-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleBasicChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="slug">
              Đường dẫn (slug)
            </label>
            <input
              id="slug"
              className="form-input"
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleBasicChange}
              placeholder="tudong-tao-tu-ten-neu-de-trong"
              disabled={loading}
            />
          </div>
        </div>

        {/* ---- DESCRIPTION ---- */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Mô tả
          </label>
          <textarea
            id="description"
            className="form-textarea"
            name="description"
            value={form.description}
            onChange={handleBasicChange}
            disabled={loading}
            rows={4}
          />
        </div>

        {/* ---- OWNER/STATUS/LOCATION ---- */}
        <div className="grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="owner">
              Chủ dự án
            </label>
            <input
              id="owner"
              className="form-input"
              type="text"
              name="owner"
              value={form.owner}
              onChange={handleBasicChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tình trạng</label>
            <Select
              options={STATUS_OPTIONS}
              value={statusOption}
              onChange={handleStatusChange}
              classNamePrefix="nh-select"
              isDisabled={loading}
              placeholder="Chọn trạng thái…"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="location">
              Vị trí
            </label>
            <input
              id="location"
              className="form-input"
              type="text"
              name="location"
              value={form.location}
              onChange={handleBasicChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* ---- INVESTMENT ---- */}
        <div className="grid-3">
          <div className="form-group">
            <label className="form-label">Đầu tư (display)</label>
            <input
              className="form-input"
              name="display"
              value={form.investment.display}
              onChange={handleInvestmentChange}
              placeholder="VD: 5,2 triệu USD"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Số tiền (amount)</label>
            <input
              className="form-input"
              type="number"
              name="amount"
              value={form.investment.amount}
              onChange={handleInvestmentChange}
              placeholder="5200000"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tiền tệ</label>
            <input
              className="form-input"
              name="currency"
              value={form.investment.currency}
              onChange={handleInvestmentChange}
              placeholder="VND / USD"
              disabled={loading}
            />
          </div>
        </div>

        {/* ---- SERVICES ---- */}
        <div className="form-group">
          <label className="form-label">Dịch vụ (services)</label>
          <CreatableSelect
            isMulti
            value={serviceOptions}
            onChange={handleServicesChange}
            classNamePrefix="nh-select"
            isDisabled={loading}
            placeholder="Nhập rồi Enter để thêm… (VD: Thi công, Thiết kế)"
          />
        </div>

        {/* ---- IMAGE + GALLERY ---- */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Ảnh đại diện</label>
            <div className="file-row">
              <input
                type="file"
                accept="image/*"
                onChange={onPickImage}
                disabled={loading}
              />
            </div>
            <div className="img-preview">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  onError={(e) => (e.currentTarget.src = "/no-image.png")}
                />
              ) : form.image ? (
                <img
                  src={assetUrl(form.image)}
                  alt="current"
                  onError={(e) => (e.currentTarget.src = "/no-image.png")}
                />
              ) : (
                <div className="muted">Chưa có ảnh</div>
              )}
            </div>
            {form.image && !imageFile && (
              <div className="hint">
                Đang dùng ảnh hiện tại. Chọn file để thay.
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Thư viện ảnh (gallery)</label>
            <div className="file-row">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onPickGallery}
                disabled={loading}
              />
            </div>
            <div className="gallery-preview">
              {(galleryPreviews.length
                ? galleryPreviews
                : (form.gallery || []).map((g) =>
                    assetUrl(typeof g === "string" ? g : g?.url)
                  )
              )
                .slice(0, 8)
                .map((u, i) => (
                  <img
                    key={i}
                    src={u}
                    alt={`gallery-${i}`}
                    onError={(e) => (e.currentTarget.src = "/no-image.png")}
                  />
                ))}
              {!galleryPreviews.length &&
                (!form.gallery || form.gallery.length === 0) && (
                  <div className="muted">Chưa có ảnh</div>
                )}
            </div>
            {!!galleryFiles.length && (
              <div className="hint">
                Chọn mới sẽ **thay thế** gallery hiện tại.
              </div>
            )}
          </div>
        </div>

        {/* ---- CATEGORIES ---- */}
        <div className="form-group">
          <label className="form-label">Danh mục</label>
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategoryOptions}
            onChange={handleCategoryChange}
            classNamePrefix="nh-select"
            className="form-select"
            isDisabled={loading}
            placeholder="Chọn danh mục…"
          />
        </div>

        {/* ---- ACTIONS ---- */}
        <div className="form-buttons">
          <button
            type="submit"
            className="btn-submit"
            disabled={loading || saving}
          >
            {saving ? "Đang lưu…" : "Cập nhật dự án"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/haiadmin/du-an")}
            disabled={saving}
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}
