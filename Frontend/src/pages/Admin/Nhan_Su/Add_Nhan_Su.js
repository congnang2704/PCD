import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_Nhan_Su from "./Add_Nhan_Su/add_nhan_su";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_Nhan_Su />} />
    </Routes>
  );
};

export default AdminPages;
