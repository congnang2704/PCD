import React from "react";
import { Routes, Route } from "react-router-dom";
import Banner from "./Banner/banner";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Banner />} />
    </Routes>
  );
};

export default AdminPages;
