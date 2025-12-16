import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Phan from "./Edit_Phan/edit_phan";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Phan />} />
    </Routes>
  );
};

export default AdminPages;
