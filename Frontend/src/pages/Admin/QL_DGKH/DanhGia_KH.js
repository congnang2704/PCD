import React from "react";
import { Routes, Route } from "react-router-dom";
import DanhGia_KH from "./DanhGia_KH/danhga_kh";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<DanhGia_KH />} />
    </Routes>
  );
};

export default AdminPages;
