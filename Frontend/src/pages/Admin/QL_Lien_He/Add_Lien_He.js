import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_Lien_He from "./Add_Lien_He/add_lien_he";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_Lien_He />} />
    </Routes>
  );
};

export default AdminPages;
