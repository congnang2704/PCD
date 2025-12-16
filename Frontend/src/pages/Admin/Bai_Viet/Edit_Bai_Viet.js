import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Bai_Viet from "./Edit_Bai_Viet/edit_bai_viet";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Bai_Viet />} />
    </Routes>
  );
};

export default AdminPages;
