import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edit_user.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    role_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // 🔄 Gọi API lấy thông tin user theo ID
    fetch(`https://api.nguyenhai.com.vn/api/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy user hoặc lỗi server!");
        }
        return res.json();
      })
      .then((data) => {
        const preparedUser = {
          ...data,
          role_id: data.role_id?._id || "", // Lấy đúng ID của vai trò
        };
        setUser(preparedUser);
      })
      .catch((err) => console.error("❌ Lỗi khi lấy user:", err));

    // 🔄 Gọi API lấy danh sách roles
    fetch("https://api.nguyenhai.com.vn/api/roles")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Lỗi khi lấy danh sách vai trò!");
        }
        return res.json();
      })
      .then((data) => setRoles(data))
      .catch((err) => console.error("❌ Lỗi khi lấy roles:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.nguyenhai.com.vn/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert("✅ Cập nhật thành công!");
        navigate("/haiadmin/users");
      } else {
        throw new Error("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("❌ Cập nhật thất bại!");
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Chỉnh sửa người dùng</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label>Tên:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label>Mật khẩu:</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "😎"}
          </span>
        </div>

        <label>Avatar URL:</label>
        <input
          type="text"
          name="avatar"
          value={user.avatar}
          onChange={handleChange}
        />

        <label>Vai trò:</label>
        <select
          name="role_id"
          value={user.role_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn vai trò --</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn save-btn">
          💾 Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default EditUser;
