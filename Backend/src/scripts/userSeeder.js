const mongoose = require('mongoose');
const connectDB = require('../config/database');
const User = require('../models/User.model');

const seedUser = async () => {
  try {
    await connectDB();

    const users = [
      {
        name: 'Doan Cong Nang',
        email: 'doancongnang2003@gmail.com',
        password: '123456',
        role_id: null,
        avatar: 'https://i.pravatar.cc/150?u=nang'
      },
      {
        name: 'Nguyễn Hải',
        email: 'nguyenhai.deco@gmail.com',
        password: 'nguyenhai123',
        role_id: '688d728b45442ca7b40feb3d',
        avatar: 'https://i.pravatar.cc/150?u=admin'
      },
      {
        name: 'Văn Hải',
        email: 'levanhai@gmail.com',
        password: 'vanhai123',
        role_id: '688d728b45442ca7b40feb3e',
        avatar: 'https://i.pravatar.cc/150?u=editor'
      },
      {
        name: 'Công Năng',
        email: 'congnang@gmail.com',
        password: 'nang123456',
        role_id: '688d728b45442ca7b40feb3f',
        avatar: 'https://i.pravatar.cc/150?u=viewer'
      }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const newUser = new User(userData);
        await newUser.save();
        console.log(`✅ Created: ${userData.email}`);
      } else {
        console.log(`⚠️ Skipped (already exists): ${userData.email}`);
      }
    }

  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedUser();
