import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit_User from "./Edit_User/edit_user";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Edit_User />} />
    </Routes>
  );
};

export default AdminPages;
