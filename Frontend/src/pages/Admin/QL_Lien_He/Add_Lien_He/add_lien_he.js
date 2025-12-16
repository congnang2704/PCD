import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Lien_He/lien_he.css";

function AddLienHe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [areaFloor, setAreaFloor] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [formType, setFormType] = useState("kien-truc");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !formType.trim()) {
      setError("Tên, Số điện thoại và Loại form là bắt buộc!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://api.nguyenhai.com.vn/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          area_floor: areaFloor,
          location,
          budget,
          form_type: formType,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Thêm liên hệ thất bại!");
      }

      alert("Thêm liên hệ thành công!");
      navigate("/haiadmin/ql-lien-he");
    } catch (err) {
      setError(err.message || "Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm Liên Hệ Mới</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Điện thoại:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>

        <label>
          Diện tích / Số tầng:
          <input
            type="text"
            value={areaFloor}
            onChange={(e) => setAreaFloor(e.target.value)}
          />
        </label>

        <label>
          Địa điểm:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Ngân sách:
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>

        <label>
          Loại form:
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            required
          >
            <option value="kien-truc">Kiến trúc</option>
            <option value="noi-that">Nội thất</option>
            <option value="xay-dung">Xây dựng</option>
          </select>
        </label>

        <label>
          Nội dung:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
        </label>

        <button type="submit" disabled={loading} className="btn save-btn">
          {loading ? "Đang thêm..." : "Thêm liên hệ"}
        </button>
      </form>
    </div>
  );
}

export default AddLienHe;
