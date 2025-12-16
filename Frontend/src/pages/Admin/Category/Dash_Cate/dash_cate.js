import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dash_cate.css";

function DashCategory() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCateId, setSelectedCateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.nguyenhai.com.vn/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("❌ Lỗi khi gọi API categories:", err));
  }, []);

  const handleEdit = (cate) => {
    navigate(`/haiadmin/edit-danh-muc/${cate._id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedCateId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `https://api.nguyenhai.com.vn/api/categories/${selectedCateId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Xoá thất bại!");

      setCategories((prev) =>
        prev.filter((item) => item._id !== selectedCateId)
      );
    } catch (err) {
      console.error("❌ Lỗi khi xoá:", err);
    } finally {
      setShowConfirmModal(false);
      setSelectedCateId(null);
    }
  };

  const filtered = categories.filter((cate) =>
    cate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dash-cate-container">
      <div className="dash-cate-header">
        <h2>📂 Danh sách Danh mục Dịch vụ</h2>
        <div className="cate-actions">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm danh mục..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn add-btn"
            onClick={() => navigate("/haiadmin/add-danh-muc")}
          >
            ➕ Thêm danh mục
          </button>
        </div>
      </div>

      <table className="cate-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cate, index) => (
            <tr key={cate._id}>
              <td>{index + 1}</td>
              <td>{cate.name}</td>
              <td>{cate.type}</td>
              <td>
                {cate.is_active ? (
                  <span className="status active">Hoạt động</span>
                ) : (
                  <span className="status inactive">Ẩn</span>
                )}
              </td>
              <td>{new Date(cate.created_at).toLocaleString("vi-VN")}</td>
              <td>
                <button
                  className="btn edit-btn"
                  onClick={() => handleEdit(cate)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteClick(cate._id)}
                >
                  🗑️ Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xác nhận xoá */}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Bạn có chắc muốn xoá danh mục này không?</h3>
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

export default DashCategory;
