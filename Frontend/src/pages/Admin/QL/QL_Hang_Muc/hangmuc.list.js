import React from "react";
import { Routes, Route } from "react-router-dom";
import HangMuc_List from "./HangMuc_List/hangmuc_list";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<HangMuc_List />} />
    </Routes>
  );
};

export default AdminPages;
