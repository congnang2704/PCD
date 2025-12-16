import React from "react";
import { Routes, Route } from "react-router-dom";
import QL_BGThietKe from "./QL_BGThietKe";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<QL_BGThietKe />} />
    </Routes>
  );
};

export default AdminPages;
