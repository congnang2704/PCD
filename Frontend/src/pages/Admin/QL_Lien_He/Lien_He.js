import React from "react";
import { Routes, Route } from "react-router-dom";
import Lien_He from "./Lien_He/lien_he";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Lien_He />} />
    </Routes>
  );
};

export default AdminPages;
