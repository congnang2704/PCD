import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./Form_User/UserList";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
    </Routes>
  );
};

export default AdminPages;
