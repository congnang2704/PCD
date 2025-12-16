import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dgkh.css";

function DanhGiaKH() {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    setLoading(true);
    fetch("https://api.nguyenhai.com.vn/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi tải đánh giá khách hàng");
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const filtered = testimonials.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item) => {
    navigate(`/haiadmin/edit-danh-gia/${item._id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `https://api.nguyenhai.com.vn/api/testimonials/${selectedId}`, // 👈 thêm /api
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) {
        const msg =
          (await res.json().catch(() => ({})))?.message || "Xoá thất bại!";
        throw new Error(msg);
      }

      setTestimonials((prev) => prev.filter((item) => item._id !== selectedId));
    } catch (err) {
      alert("❌ Lỗi xoá đánh giá: " + err.message);
    } finally {
      setShowConfirmModal(false);
      setSelectedId(null);
    }
  };

  if (loading) return <p>⏳ Đang tải đánh giá khách hàng...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!filtered.length) return <p>Không có đánh giá phù hợp.</p>;

  return (
    <div className="danhgia-kh-container">
      <div className="danhgia-kh-header">
        <h2>📝 Danh sách Đánh Giá Khách Hàng</h2>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên hoặc nội dung..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      <table className="danhgia-kh-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Avatar</th>
            <th>Tên Khách Hàng</th>
            <th>Nội Dung Đánh Giá</th>
            <th>Rating</th>
            <th>Ngày Đánh Giá</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name || "Avatar"}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontSize: "0.8rem",
                    }}
                  >
                    N/A
                  </div>
                )}
              </td>
              <td>{item.name || "Khách hàng"}</td>
              <td>{item.content || "Không có nội dung"}</td>
              <td>
                {item.rating !== undefined
                  ? [...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < item.rating ? "#ffc107" : "#e4e5e9",
                          fontSize: "1.2rem",
                        }}
                      >
                        ★
                      </span>
                    ))
                  : "Chưa đánh giá"}
              </td>
              <td>
                {item.created_at
                  ? new Date(item.created_at).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Không rõ"}
              </td>
              <td>
                <button
                  className="btn edit-btn"
                  onClick={() => handleEdit(item)}
                  title="Sửa đánh giá"
                >
                  ✏️
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteClick(item._id)}
                  title="Xoá đánh giá"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Bạn có chắc muốn xoá đánh giá này không?</h3>
            <div style={{ marginTop: "20px" }}>
              <button className="btn delete-btn" onClick={confirmDelete}>
                ✅ Xoá
              </button>
              <button
                className="btn cancel-btn"
                onClick={() => setShowConfirmModal(false)}
                style={{ marginLeft: "10px" }}
              >
                ❌ Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DanhGiaKH;
