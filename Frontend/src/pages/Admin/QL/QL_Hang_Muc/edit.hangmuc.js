import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_HangMuc from "./Edit_HangMuc/edit_hangmuc";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_HangMuc />} />
    </Routes>
  );
};

export default AdminPages;
