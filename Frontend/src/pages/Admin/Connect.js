// src/Controllers/Connect.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./User/UserList");

const app = express();
app.use(cors()); // Cho phép frontend gọi API từ domain khác
app.use(express.json()); // Parse body JSON

// URL kết nối MongoDB Atlas
// mongodb+srv://<db_username>:<db_password>@doancongnang.kex4okd.mongodb.net/
const mongoURI =
  "mongodb+srv://adminHai:pcdnguyenhai@doancongnang.kex4okd.mongodb.net/database_PCD";

// Kết nối MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas connection established"))
  .catch((error) => console.error("❌ MongoDB Atlas connection error:", error));

// Route kiểm tra kết nối
app.get("/connect", (req, res) => {
  res.send("✅ Connected to MongoDB Atlas");
});

// Route lấy danh sách người dùng
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian
    res.json(users);
  } catch (err) {
    console.error("❌ Lỗi truy vấn MongoDB:", err);
    res.status(500).json({ error: "Lỗi lấy danh sách người dùng" });
  }
});

// Khởi động server
const PORT = 5000; // đổi từ 3000 sang 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
