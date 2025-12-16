const mongoose = require('mongoose')
const connectDB = require('../config/database')
const User = require('../models/User.model')
const Role = require('../models/Role.model')

const updateUserRole = async () => {
  try {
    await connectDB()

    const adminRole = await Role.findOne({ name: 'admin' })
    if (!adminRole) throw new Error('Không tìm thấy role admin')

    const user = await User.findOneAndUpdate(
      { email: 'doancongnang2003@gmail.com' },
      { role_id: adminRole._id },
      { new: true }
    )

    console.log('✅ Updated user with role:', user)
  } catch (err) {
    console.error('❌ Lỗi cập nhật user:', err.message)
  } finally {
    mongoose.disconnect()
  }
}

updateUserRole()
