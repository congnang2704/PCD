import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add_user.css";

function AddUser() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    role_id: "",
  });

  useEffect(() => {
    fetch("https://api.nguyenhai.com.vn/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("❌ Lỗi load roles:", err));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    role_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.nguyenhai.com.vn/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Thêm thất bại!");

      await res.json();
      alert("✅ Thêm user thành công!");
      navigate("/haiadmin/users");
    } catch (error) {
      console.error("❌ Lỗi khi thêm user:", error);
      alert("❌ Lỗi khi thêm user!");
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-h2">
        <h2 className="user-list-title"> Thêm người dùng mới</h2>
      </div>

      <form className="add-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên người dùng"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email người dùng"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
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

        <select
          name="role_id"
          value={formData.role_id}
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

        <div className="modal-actions">
          <button type="submit" className="btn-luu save-btn">
            ✅ Lưu
          </button>
          <button
            type="button"
            className="btn-huy cancel-btn"
            onClick={() => navigate("/haiadmin/users")}
          >
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
