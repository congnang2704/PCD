import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add_cate.css";

function AddCate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "service",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .normalize("NFD") // remove accents
        .replace(/[\u0300-\u036f]/g, "") // remove diacritics
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .trim()
        .replace(/\s+/g, "-"); // replace spaces with dashes

      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api.nguyenhai.com.vn/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("❌ Thêm danh mục thất bại!");

      navigate("/haiadmin/danh-muc");
    } catch (err) {
      console.error("❌ Lỗi khi thêm danh mục:", err);
    }
  };

  return (
    <div className="add-cate-container">
      <h2>📁 Thêm Danh Mục Mới</h2>
      <form className="add-cate-form" onSubmit={handleSubmit}>
        <label>Tên danh mục:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên danh mục..."
          required
        />

        <label>Slug (đường dẫn):</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug-duong-dan"
          required
        />

        <label>Loại danh mục:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Bài viết">Bài viết</option>
          <option value="Dịch vụ">Dịch vụ</option>
          <option value="Dự án">Dự án</option>
          <option value="Mẫu nhà đẹp">Mẫu nhà đẹp</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Hiển thị danh mục
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-luu save-btn">
            ✅ Lưu
          </button>
          <button
            type="button"
            className="btn-huy cancel-btn"
            onClick={() => navigate("/haiadmin/danh-muc")}
          >
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCate;
