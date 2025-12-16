import React from "react";
import { Routes, Route } from "react-router-dom";
import Nhom_List from "./Nhom_List/nhom_list";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Nhom_List />} />
    </Routes>
  );
};

export default AdminPages;
