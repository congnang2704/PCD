import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_VatLieu from "./Add_VatLieu/add_vatlieu";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_VatLieu />} />
    </Routes>
  );
};

export default AdminPages;
