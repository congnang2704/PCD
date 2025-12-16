import React, { useEffect, useState } from "react";
import "./UserList.css";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  const handleAddUser = () => navigate("/haiadmin/add-user");

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => navigate(`/haiadmin/edit-user/${user._id}`);

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `https://api.nguyenhai.com.vn/api/users/${userToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userToDelete));
      } else {
        alert("❌ Xoá thất bại");
      }
    } catch (err) {
      console.error("❌ Lỗi khi xoá:", err);
    } finally {
      setShowConfirmModal(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
    fetch("https://api.nguyenhai.com.vn/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("❌ Lỗi khi gọi API:", err));
  }, []);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Danh sách người dùng</h2>
        <div className="user-list-controls">
          <button className="btn-add add-user-btn" onClick={handleAddUser}>
            ➕ Thêm User
          </button>
          <input
            type="text"
            className="user-search-input"
            placeholder="🔍 Tìm kiếm tên hoặc email..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Avatar</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img src={user.avatar} alt="avatar" className="user-avatar" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className="role-badge">
                  {user.role_id?.name || "Không rõ"}
                </span>
              </td>
              <td>{new Date(user.created_at).toLocaleString("vi-VN")}</td>
              <td>
                <button
                  className="btn edit-btn"
                  onClick={() => handleEdit(user)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  🗑️ Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>⚠️ Xác nhận xoá</h3>
            <p>Bạn có chắc muốn xoá user này không?</p>
            <div className="modal-actions">
              <button className="btn delete-btn" onClick={confirmDelete}>
                ✅ Xoá
              </button>
              <button
                className="btn cancel-btn"
                onClick={() => setShowConfirmModal(false)}
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

export default UserList;
