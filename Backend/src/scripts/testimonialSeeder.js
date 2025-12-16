const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Testimonial = require('../models/Testimonial.model')
const Project = require('../models/Project.model')

const seedTestimonials = async () => {
  try {
    await connectDB()
    await Testimonial.deleteMany()

    // Lấy danh sách project để gán testimonial vào project cụ thể (nếu có)
    const projects = await Project.find().lean()

    const testimonials = [
      {
        name: 'Anh Nam',
        content: 'Dịch vụ tuyệt vời! Đội ngũ làm việc rất chuyên nghiệp và tận tâm.',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        projectId: projects[0]?._id || null
      },
      {
        name: 'Chị Hoa',
        content: 'Ngôi nhà được thiết kế đúng ý tôi, hiện đại và tinh tế!',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        projectId: projects[1]?._id || null
      },
      {
        name: 'Anh Tuấn',
        content: 'Đội ngũ thi công đúng tiến độ, giá cả hợp lý và rất uy tín.',
        avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
        projectId: projects[1]?._id || null // Nếu muốn không gắn với project cụ thể
      }
    ]

    await Testimonial.insertMany(testimonials)

    console.log('✅ Seeded testimonials thành công!')
  } catch (error) {
    console.error('❌ Lỗi khi seed testimonials:', error.message)
  } finally {
    mongoose.disconnect()
  }
}

seedTestimonials()
