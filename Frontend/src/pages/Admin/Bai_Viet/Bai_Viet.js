import React from "react";
import { Routes, Route } from "react-router-dom";
import Bai_Viet from "./Bai_Viet/bai_viet";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Bai_Viet />} />
    </Routes>
  );
};

export default AdminPages;
