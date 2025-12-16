import React from "react";
import { Routes, Route } from "react-router-dom";
import VatLieu_List from "./VatLieu_List/vatlieu_list";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<VatLieu_List />} />
    </Routes>
  );
};

export default AdminPages;
