import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDanhGiaKH() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu đánh giá theo id để edit
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.nguyenhai.com.vn/api/testimonials/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy đánh giá");
        const data = await res.json();
        setName(data.name || "");
        setContent(data.content || "");
        setRating(data.rating || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError("Vui lòng nhập đầy đủ tên khách hàng và nội dung đánh giá.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`https://api.nguyenhai.com.vn/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, rating }),
      });

      if (!res.ok) throw new Error("Cập nhật đánh giá thất bại");

      navigate("/haiadmin/danh-gia"); // quay về list
    } catch (err) {
      setError(err.message || "Lỗi server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>⏳ Đang tải dữ liệu đánh giá...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="form-container">
      <h2>✏️ Sửa Đánh Giá Khách Hàng</h2>
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
                  fontSize: "2rem",
                  color: star <= (hover || rating) ? "#ffc107" : "#e4e5e9",
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

        <button type="submit" disabled={saving} className="btn save-btn">
          {saving ? "Đang cập nhật..." : "Cập nhật đánh giá"}
        </button>
      </form>
    </div>
  );
}

export default EditDanhGiaKH;
