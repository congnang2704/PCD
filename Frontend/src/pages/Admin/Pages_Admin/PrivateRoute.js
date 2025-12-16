import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ALLOWED_ROLES = new Set(["admin", "editor"]);

const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const user = getCurrentUser();
  const role = user?.role_id?.name
    ? String(user.role_id.name).toLowerCase()
    : "viewer";

  const isAdminRoute = location.pathname.startsWith("/haiadmin");

  // Chỉ chặn khi đi vào khu vực admin
  if (isAdminRoute) {
    // Cho admin/editor vào; viewer (hoặc chưa đăng nhập) thì chặn
    if (ALLOWED_ROLES.has(role)) {
      return children;
    }
    // Không đủ quyền → về trang chủ (ghi nhớ from để dùng sau nếu cần)
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Các route bình thường thì không chặn
  return children;
};

export default PrivateRoute;
