import React from "react";
import { Routes, Route } from "react-router-dom";
import Dash_Cate from "./Dash_Cate/dash_cate";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Dash_Cate />} />
    </Routes>
  );
};

export default AdminPages;
