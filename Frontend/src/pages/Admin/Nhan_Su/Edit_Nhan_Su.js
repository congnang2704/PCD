import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Nhan_Su from "./Edit_Nhan_Su/edit_nhan_su";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Nhan_Su />} />
    </Routes>
  );
};

export default AdminPages;
