import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Du_An from "./Edit_Du_An/edit_du_an";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Du_An />} />
    </Routes>
  );
};

export default AdminPages;
