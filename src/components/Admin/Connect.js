// src/Controllers/Connect.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./User/UserList"); // Import model
const app = express();

// URL MongoDB Atlas của bạn
const url =
  "mongodb+srv://adminHai:pcdnguyenhai@doancongnang.kex4okd.mongodb.net/database_PCD";

// Kết nối MongoDB
mongoose
  .connect(url)
  .then(() => console.log(" MongoDB Atlas connection established"))
  .catch((error) => console.error("MongoDB Atlas connection error:", error));

// Route kiểm tra kết nối
app.get("/connect", (req, res) => {
  res.send(" Connected to MongoDB Atlas");
});

// Route lấy danh sách người dùng
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Lấy toàn bộ users
    res.json(users); // Trả về JSON cho frontend
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách người dùng" });
  }
});

// Khởi động server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
