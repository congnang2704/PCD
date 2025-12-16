// src/scripts/categorySeeder.js
const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Category = require('../models/Category.model')

const seedCategories = async () => {
  try {
    await connectDB()
    await Category.deleteMany()

    const data = [
      // DỊCH VỤ
      { name: 'Thiết kế nội thất', slug: 'thiet-ke-noi-that', type: 'Dịch vụ' },
      { name: 'Thiết kế kiến trúc', slug: 'thiet-ke-kien-truc', type: 'Dịch vụ' },
      { name: 'Thi công công trình thô', slug: 'thi-cong-tho', type: 'Dịch vụ' },
      { name: 'Thi công công trình hoàn thiện', slug: 'thi-cong-hoan-thien', type: 'Dịch vụ' },
      { name: 'Thi công xây nhà trọn gói', slug: 'thi-cong-tron-goi', type: 'Dịch vụ' },

      // MẪU NHÀ ĐẸP
      { name: 'Nhà 2 tầng', slug: 'nha-2-tang', type: 'Mẫu nhà đẹp' },
      { name: 'Nhà 3 tầng', slug: 'nha-3-tang', type: 'Mẫu nhà đẹp' },
      { name: 'Nhà 5 tầng', slug: 'nha-5-tang', type: 'Mẫu nhà đẹp' },
      { name: 'Biệt thự', slug: 'biet-thu', type: 'Mẫu nhà đẹp' },
      { name: 'Căn hộ, khách sạn', slug: 'can-ho-khach-san', type: 'Mẫu nhà đẹp' },
    ]

    await Category.insertMany(data)
    console.log('✅ Seeded categories thành công!')
  } catch (err) {
    console.error('❌ Lỗi khi seed category:', err.message)
  } finally {
    mongoose.disconnect()
  }
}

seedCategories()
