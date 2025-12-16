import React from "react";
import { Routes, Route } from "react-router-dom";
import Phan_List from "./Phan_List/phan_list";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Phan_List />} />
    </Routes>
  );
};

export default AdminPages;
