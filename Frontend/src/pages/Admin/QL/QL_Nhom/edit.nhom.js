import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Nhom from "./Edit_Nhom/edit_nhom";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Nhom />} />
    </Routes>
  );
};

export default AdminPages;
