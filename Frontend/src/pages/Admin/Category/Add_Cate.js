import React from "react";
import { Routes, Route } from "react-router-dom";
import Dash_Cate from "./Add_Cate/add_cate";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Dash_Cate />} />
    </Routes>
  );
};

export default AdminPages;
