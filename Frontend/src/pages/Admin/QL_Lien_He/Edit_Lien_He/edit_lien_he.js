import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Lien_He/lien_he.css";

function EditLienHe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    area_floor: "",
    location: "",
    budget: "",
    message: "",
    form_type: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Lấy dữ liệu liên hệ theo ID
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`https://api.nguyenhai.com.vn/api/contacts/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy liên hệ");

        const data = await res.json();
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          area_floor: data.area_floor || "",
          location: data.location || "",
          budget: data.budget || "",
          message: data.message || "",
          form_type: data.form_type || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  // Hàm thay đổi giá trị form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit cập nhật liên hệ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Tên, Email và Nội dung là bắt buộc!");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`https://api.nguyenhai.com.vn/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại!");

      navigate("/haiadmin/ql-lien-he");
    } catch (err) {
      setError(err.message || "Lỗi server");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="loading">⏳ Đang tải thông tin liên hệ...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="form-container">
      <h2>Sửa Liên Hệ</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên người liên hệ"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email liên hệ"
            required
          />
        </label>

        <label>
          Điện thoại:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Số điện thoại (không bắt buộc)"
          />
        </label>

        <label>
          Diện tích & số tầng:
          <input
            type="text"
            name="area_floor"
            value={form.area_floor}
            onChange={handleChange}
            placeholder="VD: 100m2, 3 tầng"
          />
        </label>

        <label>
          Địa điểm:
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Địa điểm xây dựng"
          />
        </label>

        <label>
          Ngân sách:
          <input
            type="text"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="VD: Dưới 50 Triệu"
          />
        </label>

        <label>
          Nội dung:
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Nội dung liên hệ"
            required
          />
        </label>

        <label>
          Loại Form:
          <select
            name="form_type"
            value={form.form_type}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn loại form --</option>
            <option value="kien-truc">Kiến trúc</option>
            <option value="noi-that">Nội thất</option>
            <option value="xay-dung">Xây dựng</option>
          </select>
        </label>

        <button type="submit" disabled={saving} className="btn save-btn">
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}

export default EditLienHe;
