import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_Bai_Viet from "./Add_Bai_Viet/add_bai_viet";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_Bai_Viet />} />
    </Routes>
  );
};

export default AdminPages;
