import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { message } from "antd";
import "./addduan.css";

/** 🔧 Dùng domain cố định */
const API_BASE = "https://api.nguyenhai.com.vn";

/** 🎯 Endpoint chuẩn */
const API_PROJECTS = `${API_BASE}/api/projects`;
const API_CATEGORIES = `${API_BASE}/api/categories`;

const STATUS_OPTIONS = [
  { value: "thiết kế", label: "Thiết kế" },
  { value: "xây dựng", label: "Xây dựng" },
  { value: "hoàn thành", label: "Hoàn thành" },
  { value: "đã công bố", label: "Đã công bố" },
];

export default function AddDuAn() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    owner: "",
    investment: { amount: "", currency: "VND", display: "" },
    status: "đã công bố",
    services: [],
    location: "",
    categoryIds: [],
  });

  const revokeList = useRef([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_CATEGORIES, { credentials: "include" });
        const txt = await res.text();
        const json = (() => {
          try {
            return JSON.parse(txt);
          } catch {
            return [];
          }
        })();
        const cats = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];
        setCategories(cats);
      } catch (e) {
        console.error(e);
        message.warning("Không tải được danh mục");
      }
    })();
    return () => {
      revokeList.current.forEach((u) => URL.revokeObjectURL(u));
      revokeList.current = [];
    };
  }, []);

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
      if (!form.name.trim()) {
        message.error("Vui lòng nhập tên dự án");
        return;
      }
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
      if (Array.isArray(form.categoryIds) && form.categoryIds.length > 0)
        fd.append("categoryIds", form.categoryIds.join(","));

      if (imageFile) fd.append("image", imageFile);
      if (galleryFiles.length)
        galleryFiles.forEach((f) => fd.append("gallery", f));

      const res = await fetch(API_PROJECTS, {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409)
          throw new Error("Slug đã tồn tại. Nhập slug khác hoặc đổi tên.");
        throw new Error(data?.error || "Thêm dự án thất bại");
      }
      message.success("✅ Tạo dự án thành công");
      navigate("/haiadmin/du-an", { replace: true });
    } catch (err) {
      message.error(err.message || "Không thể tạo dự án");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="addduan-container">
      <div className="addduan-header">
        <h2 className="addduan-title">Thêm dự án mới</h2>
        <button
          className="btn ghost"
          onClick={() => navigate("/haiadmin/du-an")}
        >
          ⟵ Quay lại
        </button>
      </div>

      {/* ...UI giữ nguyên như bạn đang có... */}
      <form className="addduan-form" onSubmit={handleSubmit}>
        {/* NAME + SLUG */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Tên dự án
            </label>
            <input
              id="name"
              className="form-input"
              name="name"
              value={form.name}
              onChange={handleBasicChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="slug">
              Đường dẫn (slug)
            </label>
            <input
              id="slug"
              className="form-input"
              name="slug"
              value={form.slug}
              onChange={handleBasicChange}
              placeholder="bỏ trống để tự tạo"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
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
            rows={4}
          />
        </div>

        {/* OWNER/STATUS/LOCATION */}
        <div className="grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="owner">
              Chủ dự án
            </label>
            <input
              id="owner"
              className="form-input"
              name="owner"
              value={form.owner}
              onChange={handleBasicChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tình trạng</label>
            <Select
              options={STATUS_OPTIONS}
              value={statusOption}
              onChange={handleStatusChange}
              classNamePrefix="nh-select"
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
              name="location"
              value={form.location}
              onChange={handleBasicChange}
              placeholder="VD: Đà Nẵng"
            />
          </div>
        </div>

        {/* INVESTMENT */}
        <div className="grid-3">
          <div className="form-group">
            <label className="form-label">Đầu tư (display)</label>
            <input
              className="form-input"
              name="display"
              value={form.investment.display}
              onChange={handleInvestmentChange}
              placeholder="VD: 5,2 triệu USD"
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
            />
          </div>
        </div>

        {/* SERVICES */}
        <div className="form-group">
          <label className="form-label">Dịch vụ (services)</label>
          <CreatableSelect
            isMulti
            value={serviceOptions}
            onChange={handleServicesChange}
            classNamePrefix="nh-select"
            placeholder="Nhập rồi Enter để thêm… (VD: Thi công, Thiết kế)"
          />
        </div>

        {/* IMAGE + GALLERY */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Ảnh đại diện</label>
            <input type="file" accept="image/*" onChange={onPickImage} />
            <div className="img-preview">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  onError={(e) => (e.currentTarget.src = "/no-image.png")}
                />
              ) : (
                <div className="muted">Chưa chọn ảnh</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Thư viện ảnh (gallery)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onPickGallery}
            />
            <div className="gallery-preview">
              {galleryPreviews.length ? (
                galleryPreviews
                  .slice(0, 8)
                  .map((u, i) => (
                    <img
                      key={i}
                      src={u}
                      alt={`gallery-${i}`}
                      onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    />
                  ))
              ) : (
                <div className="muted">Chưa chọn ảnh</div>
              )}
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="form-group">
          <label className="form-label">Danh mục</label>
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategoryOptions}
            onChange={handleCategoryChange}
            className="form-select"
            classNamePrefix="nh-select"
            placeholder="Chọn danh mục…"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit" disabled={saving}>
            {saving ? "Đang tạo…" : "Tạo dự án"}
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
