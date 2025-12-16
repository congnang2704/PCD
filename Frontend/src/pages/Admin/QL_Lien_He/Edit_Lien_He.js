import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_Lien_He from "./Edit_Lien_He/edit_lien_he";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_Lien_He />} />
    </Routes>
  );
};

export default AdminPages;
