import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Cate from "./Edit_Cate/edit_cate";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Cate />} />
    </Routes>
  );
};

export default AdminPages;
