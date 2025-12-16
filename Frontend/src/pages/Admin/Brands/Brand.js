import React from "react";
import { Routes, Route } from "react-router-dom";
import Brand from "./Brand/Brands";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Brand />} />
    </Routes>
  );
};

export default AdminPages;
