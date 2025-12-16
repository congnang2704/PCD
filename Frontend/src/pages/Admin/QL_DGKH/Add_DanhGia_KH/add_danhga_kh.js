import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDanhGiaKH() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0); // default 0 sao
  const [hover, setHover] = useState(0); // để highlight khi hover sao
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || rating === 0) {
      setError("Vui lòng nhập đầy đủ tên, nội dung và chọn số sao.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.nguyenhai.com.vn/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, rating }),
      });

      if (!res.ok) {
        throw new Error("Thêm đánh giá thất bại!");
      }

      navigate("/haiadmin/danh-gia");
    } catch (err) {
      setError(err.message || "Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm Đánh Giá Khách Hàng</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên khách hàng:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên khách hàng"
            required
          />
        </label>

        <label>
          Nội dung đánh giá:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết đánh giá ở đây..."
            rows={5}
            required
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Đánh giá (rating):
          <div style={{ display: "flex", flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: star <= (hover || rating) ? "#fcc729ff" : "#e4e5e9",
                  userSelect: "none",
                }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${star} sao`}
              >
                ★
              </span>
            ))}
          </div>
        </label>

        <button type="submit" disabled={loading} className="btn save-btn">
          {loading ? "Đang lưu..." : "Lưu đánh giá"}
        </button>
      </form>
    </div>
  );
}

export default AddDanhGiaKH;
