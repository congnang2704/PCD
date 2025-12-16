import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_Nhom from "./Add_Nhom/add_nhom";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_Nhom />} />
    </Routes>
  );
};

export default AdminPages;
