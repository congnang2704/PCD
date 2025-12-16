import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_DanhGia_KH from "./Edit_DanhGia_KH/edit_danhga_kh";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_DanhGia_KH />} />
    </Routes>
  );
};

export default AdminPages;
