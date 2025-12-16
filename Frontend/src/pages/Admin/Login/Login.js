import React from "react";
import { Routes, Route } from "react-router-dom";
import Login_Form from "./Form-Login/Login_Form";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Login_Form />} />
    </Routes>
  );
};

export default AdminPages;
