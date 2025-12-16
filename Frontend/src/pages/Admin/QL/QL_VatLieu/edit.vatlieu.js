import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_VatLieu from "./Edit_VatLieu/edit_vatlieu";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_VatLieu />} />
    </Routes>
  );
};

export default AdminPages;
