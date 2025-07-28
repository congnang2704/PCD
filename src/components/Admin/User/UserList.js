// src/components/admin/UserList.js
import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "mongodb+srv://adminHai:pcdnguyenhai@doancongnang.kex4okd.mongodb.net/database_PCD/users"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Lỗi gọi API:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách người dùng</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
