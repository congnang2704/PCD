import React from "react";
import { Routes, Route } from "react-router-dom";
import Add_User from "./Add_User/add_user";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Add_User />} />
    </Routes>
  );
};

export default AdminPages;
