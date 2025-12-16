import React from "react";
import { Routes, Route } from "react-router-dom";
import Du_An from "./Du_An/du_an";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Du_An />} />
    </Routes>
  );
};

export default AdminPages;
