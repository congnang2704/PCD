require('dotenv/config');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/database');

const Phan = require('../models/Phan');
const Nhom = require('../models/Nhom');
const HangMuc = require('../models/HangMuc');
const VatLieu = require('../models/VatLieu');

(async function seed() {
  try {
    await connectDB();

    const seedPath = path.join(__dirname, '..', 'duLieu', 'vatlieu.seed.json'); // src/scripts/.. => src/duLieu
    const raw = fs.readFileSync(seedPath, 'utf8');
    const data = JSON.parse(raw);

    const phanMap = {};
    for (const p of data.phan || []) {
      const doc = await Phan.findOneAndUpdate(
        { slug: p.slug },
        { $set: p },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      phanMap[p.slug] = doc._id;
    }

    const nhomMap = {};
    for (const n of data.nhom || []) {
      const phanId = phanMap[n.phan];
      if (!phanId) { console.warn('⚠️ Bỏ qua nhóm vì thiếu phần:', n); continue; }
      const doc = await Nhom.findOneAndUpdate(
        { slug: n.slug, phan: phanId },
        { $set: { ...n, phan: phanId } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      nhomMap[n.slug] = doc._id;
    }

    const hangMucMap = {};
    for (const h of data.hangMuc || []) {
      const nhomId = nhomMap[h.nhom];
      if (!nhomId) { console.warn('⚠️ Bỏ qua hạng mục vì thiếu nhóm:', h); continue; }
      const doc = await HangMuc.findOneAndUpdate(
        { slug: h.slug, nhom: nhomId },
        { $set: { ...h, nhom: nhomId } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      hangMucMap[h.slug] = doc._id;
    }

    let count = 0;
    for (const v of data.vatLieu || []) {
      const hm = hangMucMap[v.hangMuc];
      if (!hm) { console.warn('⚠️ Bỏ qua mã vì thiếu hạng mục:', v); continue; }
      await VatLieu.findOneAndUpdate(
        { ma: String(v.ma).toUpperCase(), hangMuc: hm },
        { $setOnInsert: { hangMuc: hm, ma: String(v.ma).toUpperCase() } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      count++;
    }

    console.log(`✅ Seed vật liệu xong! Upsert ${count} vật liệu.`);
  } catch (err) {
    console.error('❌ Lỗi seed vật liệu:', err?.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
