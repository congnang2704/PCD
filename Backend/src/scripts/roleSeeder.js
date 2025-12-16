const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Role = require('../models/Role.model')

const seedRoles = async () => {
  try {
    await connectDB()

    // Xoá roles cũ (nếu có)
    await Role.deleteMany({})

    const roles = [
      { name: 'admin', description: 'Full quyền' },
      { name: 'editor', description: 'Chỉnh sửa nội dung' },
      { name: 'viewer', description: 'Chỉ xem' }
    ]

    await Role.insertMany(roles)
    console.log('✅ Seeded roles thành công!')
  } catch (err) {
    console.error('❌ Lỗi khi seed roles:', err.message)
  } finally {
    mongoose.disconnect()
  }
}

seedRoles()
