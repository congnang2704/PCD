// seeders/banner.seeder.js
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Banner from '../models/Banner.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

function slugify(s = '') {
  return String(s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

// ====== CLI flags ======
const args = process.argv.slice(2);
const FLAGS = {
  clear: args.includes('--clear'),
  fromFolder: args.includes('--from-folder'),
  inactive: args.includes('--inactive'),
};
const folderArg = args.find(a => a.startsWith('--folder='));
const customFolder = folderArg ? folderArg.split('=')[1] : null;

// ====== DB connect ======
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  process.env.DATABASE_URL ||
  'mongodb://127.0.0.1:27017/pcd';

// ====== Static mapping (server đã phục vụ /uploads) ======
const UPLOAD_ROOT = path.resolve(__dirname, '../src/uploads');
const DEFAULT_BANNER_DIR = path.join(UPLOAD_ROOT, 'banner');

function toPublicUrl(filename) {
  return `/uploads/banner/${filename}`;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// ====== Default seed data (dùng CDN) ======
const defaultData = [
  {
    title: 'Summer Sale 50%',
    slug: 'summer-sale-2025',
    link: '/sale',
    imageUrl: 'https://cdn.example.com/banners/summer-hero.jpg',
    isActive: true,
    order: 1,
  },
  {
    title: 'New Arrivals',
    slug: 'new-arrivals',
    link: '/new',
    imageUrl: 'https://cdn.example.com/banners/new.jpg',
    isActive: true,
    order: 2,
  },
  {
    title: 'Free Shipping Over $50',
    slug: 'free-shipping-50',
    link: '/shipping',
    imageUrl: 'https://cdn.example.com/banners/ship.jpg',
    isActive: false,
    order: 3,
  },
];

// ====== Build data from local folder ======
function buildFromFolder(dir) {
  ensureDir(dir);
  const files = fs
    .readdirSync(dir)
    .filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f));

  let order = 1;
  const rows = files.map((filename) => {
    const base = path.basename(filename, path.extname(filename));
    const title = base.replace(/[-_]+/g, ' ').trim();
    const slug  = slugify(base);
    return {
      title: title || filename,
      slug,
      link: null,
      imageUrl: toPublicUrl(filename),       // dùng URL public
      imagePath: path.join(dir, filename),   // đường dẫn file thật (để controller xoá khi update)
      isActive: !FLAGS.inactive,             // theo flag
      order: order++,
    };
  });

  return rows;
}

async function run() {
  if (!MONGODB_URI) {
    console.error('❌ Thiếu MONGODB_URI trong .env');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected MongoDB');

  try {
    if (FLAGS.clear) {
      const del = await Banner.deleteMany({});
      console.log(`🧹 Deleted ${del.deletedCount} banners`);
    }

    let payload = [];
    if (FLAGS.fromFolder) {
      const targetDir = customFolder
        ? path.resolve(customFolder)
        : DEFAULT_BANNER_DIR;
      console.log(`📁 Seeding from folder: ${targetDir}`);
      payload = buildFromFolder(targetDir);
    } else {
      console.log('🌐 Seeding using default CDN URLs');
      // clone + apply inactive flag globally nếu có
      payload = defaultData.map((x, i) => ({
        ...x,
        isActive: FLAGS.inactive ? false : x.isActive ?? true,
        order: x.order ?? i + 1,
        slug: x.slug || slugify(x.title || `banner-${i+1}`)
      }));
    }

    if (!payload.length) {
      console.warn('⚠️ Không có dữ liệu để seed.');
      process.exit(0);
    }

    const inserted = await Banner.insertMany(payload, { ordered: true });
    console.log(`🌱 Seeded ${inserted.length} banners`);
  } catch (err) {
    console.error('❌ Seed error:', err?.message || err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected');
  }
}

run().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});

/*
USAGE:
  # 1) Seed mặc định (CDN URLs)
  node seeders/banner.seeder.js

  # 2) Xoá hết trước khi seed mới
  node seeders/banner.seeder.js --clear

  # 3) Seed từ thư mục ảnh local (mặc định: src/uploads/banner)
  node seeders/banner.seeder.js --from-folder

  # 4) Seed từ thư mục ảnh bất kỳ
  node seeders/banner.seeder.js --from-folder --folder="D:/NANG PCD/Dự Án/PCD/Backend/src/uploads/banner"

  # 5) Seed nhưng đặt tất cả là ẨN
  node seeders/banner.seeder.js --inactive
*/
