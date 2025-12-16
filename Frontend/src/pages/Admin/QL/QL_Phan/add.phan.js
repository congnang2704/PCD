import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_Phan from "./Add_Phan/add_phan";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_Phan />} />
    </Routes>
  );
};

export default AdminPages;
