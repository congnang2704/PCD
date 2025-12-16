import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_DanhGia_KH from "./Add_DanhGia_KH/add_danhga_kh";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_DanhGia_KH />} />
    </Routes>
  );
};

export default AdminPages;
