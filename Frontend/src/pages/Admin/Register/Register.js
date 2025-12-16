import React from "react";
import { Routes, Route } from "react-router-dom";
import Register_Form from "./Register/Register_From";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Register_Form />} />
    </Routes>
  );
};

export default AdminPages;
