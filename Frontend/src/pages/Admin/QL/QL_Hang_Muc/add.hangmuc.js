import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_HangMuc from "./Add_HangMuc/add_hangmuc";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_HangMuc />} />
    </Routes>
  );
};

export default AdminPages;
