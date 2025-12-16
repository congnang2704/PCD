import React from "react";
import { Routes, Route } from "react-router-dom";
import QL_HDThietKe from "./QL_HDThietKe";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<QL_HDThietKe />} />
    </Routes>
  );
};

export default AdminPages;
