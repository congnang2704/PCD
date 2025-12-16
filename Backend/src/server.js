// src/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

/* ============== __dirname (ESM) ============== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============== APP KHỞI TẠO ============== */
const app = express();
app.set('trust proxy', 1);

// CORS + JSON (payload lớn)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* =========================================================
   STATIC /uploads (nội bộ dự án) + STATIC trademark (ổ D:)
   ========================================================= */
// Trỏ tới .../src/uploads (bên trong có /duan, /banner, ...)
const UPLOAD_ROOT = path.resolve(__dirname, 'uploads');
try {
  if (!fs.existsSync(UPLOAD_ROOT)) fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
  const DUAN_DIR   = path.join(UPLOAD_ROOT, 'duan');
  const BANNER_DIR = path.join(UPLOAD_ROOT, 'banner');
  if (!fs.existsSync(DUAN_DIR))   fs.mkdirSync(DUAN_DIR, { recursive: true });
  if (!fs.existsSync(BANNER_DIR)) fs.mkdirSync(BANNER_DIR, { recursive: true });
} catch (e) {
  // console.error('[UPLOAD DIR ERROR]', e?.message || e);
}

// ✅ Static local uploads
app.use(
  '/uploads',
  express.static(UPLOAD_ROOT, {
    maxAge: '7d',
    index: false,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=604800, must-revalidate');
    },
  })
);

// ✅ Static riêng cho thư mục trademark ở Windows (ổ D:)
const TRADEMARK_DIR = 'D:\\NANG PCD\\Dự Án\\PCD\\Backend\\src\\uploads\\trademark';
try {
  if (!fs.existsSync(TRADEMARK_DIR)) fs.mkdirSync(TRADEMARK_DIR, { recursive: true });
} catch (e) {
  // console.error('[TRADEMARK DIR ERROR]', e?.message || e);
}

app.use(
  '/uploads/trademark',
  express.static(TRADEMARK_DIR, {
    maxAge: '7d',
    index: false,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=604800, must-revalidate');
    },
  })
);

/* ============== HEALTHCHECK ============== */
const STARTED_AT = new Date().toISOString();
app.get('/', (_req, res) => res.type('text/plain').send('PCD API is running'));
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.get('/api/_ping', (_req, res) => res.json({ ok: true }));
app.get('/api/_whoami', (_req, res) =>
  res.json({ ok: true, pid: process.pid, cwd: process.cwd(), file: __filename, started: STARTED_AT })
);

/* ===== Helper: import ESM/CJS an toàn (relative -> từ file này) ===== */
async function i(relPath) {
  const url = new URL(relPath, import.meta.url);
  const mod = await import(url.href);
  return mod?.default ?? mod;
}

/* ============== BOOTSTRAP ============== */
async function bootstrap() {
  // 1) Mongo
  try {
    const connectDB = await i('./config/database.js');
    await connectDB();
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Mongo connect fail:', err?.message || err);
  }

  // 2) Routes — import/mount từng file, có log chi tiết
  try {
    const routeDefs = [
      { mount: '/api/users', path: './routes/user.routes.js' },
      { mount: '/api/roles', path: './routes/role.routes.js' },
      { mount: '/api/projects', path: './routes/project.routes.js' },
      { mount: '/api/contacts', path: './routes/contact.routes.js' },
      { mount: '/api/blogs', path: './routes/blog.routes.js' },
      { mount: '/api/testimonials', path: './routes/testimonial.routes.js' },
      { mount: '/api/categories', path: './routes/category.routes.js' },
      { mount: '/api/nhansu', path: './routes/nhansu.routes.js' },
      { mount: '/api/chat', path: './routes/chat.routes.js' },
      { mount: '/api/banners', path: './routes/banner.routes.js' },
      { mount: '/api', path: './routes/auth.routes.js' }, // auth dưới /api

      { mount: '/api/phan', path: './routes/phan.route.js' },
      { mount: '/api/nhom', path: './routes/nhom.route.js' },
      { mount: '/api/hangmuc', path: './routes/hangmuc.route.js', isHangMuc: true },
      { mount: '/api/vatlieu', path: './routes/vatlieu.route.js' },
      { mount: '/api/cay', path: './routes/cay.route.js' },
      { mount: '/api/forms', path: './routes/form.routes.js' },
      { mount: '/api/scripts', path: './routes/scriptSnippet.routes.js' },

      // 👇 Thêm route Brands để quản lý thương hiệu hợp tác
      { mount: '/api/brands', path: './routes/brand.routes.js' },
    ];

    const mounted = [];

    for (const def of routeDefs) {
      try {
        const router = await i(def.path);
        if (!router) throw new Error('Module has no export');

        if (def.isHangMuc) {
          app.get('/api/hangmuc/_ping', (_req, res) => res.json({ ok: true, via: 'server' }));
          app.use(
            def.mount,
            (req, _res, next) => {
              // console.log('[MOUNT /api/hangmuc]', req.method, req.path);
              next();
            },
            router
          );
        } else {
          app.use(def.mount, router);
        }

        mounted.push(`${def.mount} ← ${def.path}`);
        // console.log(`✅ Mounted ${def.mount} ← ${def.path}`);
      } catch (err) {
        // console.error(`❌ Route load fail for ${def.mount} from ${def.path}: ${err?.message || err}`);
        if (err?.stack) console.error(err.stack);
      }
    }

    // Liệt kê routes đã mount
    app.get('/api/_routes', (_req, res) => {
      const routes = [];
      app._router.stack.forEach((m) => {
        if (m.route && m.route.path) {
          routes.push({
            base: '',
            path: m.route.path,
            methods: Object.keys(m.route.methods).join(',').toUpperCase(),
          });
        } else if (m.name === 'router' && m.handle?.stack) {
          const baseRegex = m.regexp?.toString?.() || '';
          const base =
            baseRegex
              .replace(/^\/\^\//, '/')
              .replace(/\\\//g, '/')
              .replace(/\/\?\(\=\[\\\/\]\|\$\)\\\/i|\$\)\//g, '')
              .replace(/\/\?\(\=\[\\\/\]\|\$\)\//g, '')
              .replace(/\.\*\$/g, '')
              .replace(/\$\/i|\$\/|\/i/g, '') || '';
          m.handle.stack.forEach((h) => {
            if (h.route) {
              routes.push({
                base,
                path: h.route.path,
                methods: Object.keys(h.route.methods).join(',').toUpperCase(),
              });
            }
          });
        }
      });
      res.json({ ok: true, mounted, routes });
    });

    console.log('✅ Routes mounting finished');
  } catch (err) {
    console.error('❌ Fatal at routes mounting wrapper:', err?.message || err);
    if (err?.stack) console.error(err.stack);
  }

  // 3) Log mọi request /api chưa match (trước 404)
  app.use('/api', (req, _res, next) => {
    console.log('[API UNMATCHED]', req.method, req.originalUrl);
    next();
  });

  // 4) 404 fallback
  app.use((req, res) => res.status(404).json({ error: 'Not found' }));
}

/* ============== START SERVER (sau bootstrap) ============== */
const PORT = Number(process.env.PORT || process.env.APP_PORT || 8017);
const HOST = process.env.APP_HOST || '0.0.0.0';

(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error('[BOOTSTRAP ERROR]', e?.message || e);
  } finally {
    app.listen(PORT, HOST, () => {
      console.log(`[BOOT] listening on ${HOST}:${PORT}`);
      console.log('[UPLOAD_DIR local]', UPLOAD_ROOT);
      console.log('[UPLOAD_DIR trademark]', TRADEMARK_DIR);
      console.log('[HINT] Ảnh trademark URL: http://localhost:' + PORT + '/uploads/trademark/<filename>');
    });
  }
})();

/* ============== LỖI CHUNG ============== */
process.on('unhandledRejection', (err) => console.error('[UNHANDLED REJECTION]', err));
process.on('uncaughtException', (err) => console.error('[UNCAUGHT EXCEPTION]', err));
