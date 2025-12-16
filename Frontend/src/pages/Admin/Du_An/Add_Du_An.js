import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_Du_An from "./Add_Du_An/add_du_an";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_Du_An />} />
    </Routes>
  );
};

export default AdminPages;
