import React, { useState } from "react";
import "./DanhGiaKH.css";

function DanhGiaKH() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !content.trim() || rating === 0) {
      setError("Vui lòng nhập đầy đủ tên, nội dung và chọn đánh giá sao.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://api.nguyenhai.com.vn/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, rating }),
      });

      if (!res.ok) {
        throw new Error("Gửi đánh giá thất bại. Thử lại sau nhé.");
      }

      // reset form
      setName("");
      setContent("");
      setRating(0);
      setHover(0);

      // show modal thank you
      setShowThankYou(true);
    } catch (err) {
      setError(err.message || "Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  // đóng modal thank you
  const closeThankYou = () => setShowThankYou(false);

  return (
    <>
      <div className="form-container-danhgia">
        <h2>Gửi Đánh Giá Khách Hàng</h2>

        {error && <p className="error-text-danhgia">{error}</p>}

        <form onSubmit={handleSubmit} className="form-danhgia">
          <label>
            Tên khách hàng:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
              required
            />
          </label>

          <label>
            Nội dung đánh giá:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết đánh giá của bạn ở đây..."
              rows={5}
              required
            />
          </label>

          <label className="rating-label-danhgia">
            Đánh giá:
            <div className="star-rating-danhgia">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    star <= (hover || rating) ? "filled" : ""
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${star} sao`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setRating(star);
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn submit-btn-danhgia"
          >
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      </div>

      {showThankYou && (
        <div className="modal-overlay-danhgia" onClick={closeThankYou}>
          <div
            className="modal-content-danhgia"
            onClick={(e) => e.stopPropagation()}
          >
            <p>🎉 Cảm ơn bạn đã đánh giá nha &lt;3</p>
            <button className="btn close-btn-danhgia" onClick={closeThankYou}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DanhGiaKH;
