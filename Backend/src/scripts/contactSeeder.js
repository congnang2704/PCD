const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Contact = require('../models/Contact.model')

const seedContacts = async () => {
  try {
    await connectDB()
    await Contact.deleteMany()

    const contacts = [
      {
        name: 'Nguyễn Văn A',
        phone: '0909999999',
        email: 'a@example.com',
        area_floor: '100m2, 3 tầng',
        location: 'Đà Nẵng',
        budget: '1.7 - 1.9 Tỷ',
        message: 'Muốn thiết kế theo phong cách hiện đại',
        form_type: 'xay-dung'
      },
      {
        name: 'Trần Thị B',
        phone: '0988888888',
        email: 'b@example.com',
        area_floor: '70m2, 2 tầng',
        location: 'Huế',
        budget: 'Dưới 50 Triệu',
        message: 'Tư vấn thêm về phong thủy',
        form_type: 'noi-that'
      }
    ]

    await Contact.insertMany(contacts)
    console.log('✅ Seeded contacts thành công!')
  } catch (err) {
    console.error('❌ Lỗi khi seed contact:', err.message)
  } finally {
    mongoose.disconnect()
  }
}

seedContacts()
