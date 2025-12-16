const mongoose = require('mongoose');
const connectDB = require('../config/database');

(async () => {
  try {
    await connectDB();
    const coll = mongoose.connection.db.collection('nhansus');

    const indexes = await coll.indexes();
    const emailIdx = indexes.find(i => i.name === 'email_1');
    if (emailIdx) {
      await coll.dropIndex('email_1');
      console.log('✅ Dropped index email_1');
    } else {
      console.log('ℹ️ Không thấy index email_1');
    }
  } catch (e) {
    console.error('❌ Drop index lỗi:', e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
