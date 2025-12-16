import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit_cate.css";

function EditCate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "service",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔄 Load data category theo ID
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.nguyenhai.com.vn/api/categories/${id}`
        );
        if (!res.ok) throw new Error("Không tìm thấy danh mục");
        const data = await res.json();
        setFormData(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Lỗi khi load category:", err);
        navigate("/haiadmin/danh-muc");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

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
      const res = await fetch(
        `https://api.nguyenhai.com.vn/api/categories/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Cập nhật thất bại!");

      navigate("/haiadmin/danh-muc");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật:", err);
      alert("❌ Lỗi khi cập nhật danh mục!");
    }
  };

  if (loading) return <p>⏳ Đang tải dữ liệu...</p>;

  return (
    <div className="edit-cate-container">
      <h2>✏️ Sửa Danh Mục</h2>
      <form className="edit-cate-form" onSubmit={handleSubmit}>
        <label>Tên danh mục:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tên danh mục"
          required
        />

        <label>Slug (đường dẫn):</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="duong-dan"
          required
        />

        <label>Loại danh mục:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Bài viết">Bài viết</option>
          <option value="Dịch vụ">Dịch vụ</option>
          <option value="Dự án">Dự án</option>
          <option value="Mẫu nhà đẹp">Mẫu nhà đẹp</option>
        </select>

        {/* <label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Hiển thị danh mục
        </label> */}

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

export default EditCate;
