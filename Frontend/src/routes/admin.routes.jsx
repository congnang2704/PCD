import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ===== AUTH =====
import Login_Form from "../pages/Admin/Login/Login";
import Register_Form from "../pages/Admin/Register/Register";

// ===== LAYOUT + GUARD =====
import PrivateRoute from "../pages/Admin/Pages_Admin/PrivateRoute";
import LayoutDashboard from "../pages/Admin/Pages_Admin/Admin_pages";
import DashboardAdmin from "../pages/Admin/Dashboard/Dashboard_Admin";

// ===== USERS =====
import UserList from "../pages/Admin/User/User";
import Add_User from "../pages/Admin/User/Add_User";
import Edit_User from "../pages/Admin/User/Edit_User";

// ===== CATEGORY =====
import Dash_Cate from "../pages/Admin/Category/Category";
import Add_Cate from "../pages/Admin/Category/Add_Cate";
import Edit_Cate from "../pages/Admin/Category/Edit_Cate";

// ===== BLOG =====
import Bai_Viet from "../pages/Admin/Bai_Viet/Bai_Viet";
import Add_Bai_Viet from "../pages/Admin/Bai_Viet/Add_Bai_Viet";
import Edit_Bai_Viet from "../pages/Admin/Bai_Viet/Edit_Bai_Viet";

// ===== DỰ ÁN =====
import Du_An from "../pages/Admin/Du_An/Du_An";
import Add_Du_An from "../pages/Admin/Du_An/Add_Du_An";
import Edit_Du_An from "../pages/Admin/Du_An/Edit_Du_An";

// ===== ĐÁNH GIÁ =====
import Danh_Gia from "../pages/Admin/QL_DGKH/DanhGia_KH";
import Add_Danh_Gia from "../pages/Admin/QL_DGKH/AddDanhGia_KH";
import Edit_Danh_Gia from "../pages/Admin/QL_DGKH/EditDanhGia_KH";

// ===== LIÊN HỆ =====
import QL_Lien_He from "../pages/Admin/QL_Lien_He/Lien_He";
import Add_QL_Lien_He from "../pages/Admin/QL_Lien_He/Add_Lien_He";
import Edit_QL_Lien_He from "../pages/Admin/QL_Lien_He/Edit_Lien_He";

// ===== NHÂN SỰ =====
import QL_Nhan_Su from "../pages/Admin/Nhan_Su/Nhan_Su";
import Add_QL_Nhan_Su from "../pages/Admin/Nhan_Su/Add_Nhan_Su";
import Edit_QL_Nhan_Su from "../pages/Admin/Nhan_Su/Edit_Nhan_Su";

// ===== KHÁC =====
import QL_Chat_Bot from "../pages/Admin/ChatBot/ChatBot";
import QL_Banner from "../pages/Admin/Banner/Banner";

// ===== QL VẬT LIỆU =====
import QLVatLieuDashboard from "../pages/Admin/QL/QL_Dashboard/QL_Dashboard";
import Phan_List from "../pages/Admin/QL/QL_Phan/phan.list";
import Add_Phan from "../pages/Admin/QL/QL_Phan/add.phan";
import Edit_Phan from "../pages/Admin/QL/QL_Phan/edit.phan";

import HangMuc_List from "../pages/Admin/QL/QL_Hang_Muc/hangmuc.list";
import Add_HangMuc from "../pages/Admin/QL/QL_Hang_Muc/add.hangmuc";
import Edit_HangMuc from "../pages/Admin/QL/QL_Hang_Muc/edit.hangmuc";

import Nhom_List from "../pages/Admin/QL/QL_Nhom/nhom.list";
import Add_Nhom from "../pages/Admin/QL/QL_Nhom/add.nhom";
import Edit_Nhom from "../pages/Admin/QL/QL_Nhom/edit.nhom";

import VatLieu_List from "../pages/Admin/QL/QL_VatLieu/vatlieu.list";
import Add_VatLieu from "../pages/Admin/QL/QL_VatLieu/add.vatlieu";
import Edit_VatLieu from "../pages/Admin/QL/QL_VatLieu/edit.vatlieu";

import QL_HDThietKe from "../pages/Admin/QL/QL_HDThietKe/Thietke";
import QL_BGThietKe from "../pages/Admin/QL/QL_BGThietKe/BGThietKe";
import AdminTrackingCodes from "../pages/Admin/TrackingCodes/AdminTrackingCodes";
import QL_ThuongHieu from "../pages/Admin/Brands/Brand";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/haiadmin/login" element={<Login_Form />} />
      <Route path="/haiadmin/register" element={<Register_Form />} />

      {/* ADMIN */}
      <Route
        path="/haiadmin"
        element={
          <PrivateRoute>
            <LayoutDashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardAdmin />} />

        <Route path="users" element={<UserList />} />
        <Route path="add-user" element={<Add_User />} />
        <Route path="edit-user/:id" element={<Edit_User />} />

        <Route path="danh-muc" element={<Dash_Cate />} />
        <Route path="add-danh-muc" element={<Add_Cate />} />
        <Route path="edit-danh-muc/:id" element={<Edit_Cate />} />

        <Route path="bai-viet" element={<Bai_Viet />} />
        <Route path="add-bai-viet" element={<Add_Bai_Viet />} />
        <Route path="edit-bai-viet/:id" element={<Edit_Bai_Viet />} />

        <Route path="du-an" element={<Du_An />} />
        <Route path="add-du-an" element={<Add_Du_An />} />
        <Route path="edit-du-an/:id" element={<Edit_Du_An />} />

        <Route path="danh-gia" element={<Danh_Gia />} />
        <Route path="add-danh-gia" element={<Add_Danh_Gia />} />
        <Route path="edit-danh-gia/:id" element={<Edit_Danh_Gia />} />

        <Route path="ql-lien-he" element={<QL_Lien_He />} />
        <Route path="add-ql-lien-he" element={<Add_QL_Lien_He />} />
        <Route path="edit-ql-lien-he/:id" element={<Edit_QL_Lien_He />} />

        <Route path="ql-nhan-su" element={<QL_Nhan_Su />} />
        <Route path="add-ql-nhan-su" element={<Add_QL_Nhan_Su />} />
        <Route path="edit-ql-nhan-su/:id" element={<Edit_QL_Nhan_Su />} />

        <Route path="ql-chat" element={<QL_Chat_Bot />} />
        <Route path="ql-banner" element={<QL_Banner />} />

        <Route path="ql-vatlieu" element={<QLVatLieuDashboard />} />
        <Route path="ql-phan" element={<Phan_List />} />
        <Route path="add-phan" element={<Add_Phan />} />
        <Route path="edit-phan/:id" element={<Edit_Phan />} />

        <Route path="ql-hang-muc" element={<HangMuc_List />} />
        <Route path="add-hang-muc" element={<Add_HangMuc />} />
        <Route path="edit-hang-muc/:id" element={<Edit_HangMuc />} />

        <Route path="ql-nhom" element={<Nhom_List />} />
        <Route path="add-nhom" element={<Add_Nhom />} />
        <Route path="edit-nhom/:id" element={<Edit_Nhom />} />

        <Route path="ql-vat-lieu" element={<VatLieu_List />} />
        <Route path="add-vat-lieu" element={<Add_VatLieu />} />
        <Route path="edit-vat-lieu/:id" element={<Edit_VatLieu />} />

        <Route path="tracking-codes" element={<AdminTrackingCodes />} />
        <Route path="ql-hd-thiet-ke" element={<QL_HDThietKe />} />
        <Route path="ql-bg-thiet-ke" element={<QL_BGThietKe />} />
        <Route path="ql-thuonghieu" element={<QL_ThuongHieu />} />
      </Route>
    </Routes>
  );
}
