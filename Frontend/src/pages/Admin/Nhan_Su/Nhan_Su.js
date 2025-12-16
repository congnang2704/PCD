import React from "react";
import { Routes, Route } from "react-router-dom";
import Nhan_Su from "./Nhan_Su/nhan_su";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Nhan_Su />} />
    </Routes>
  );
};

export default AdminPages;
