import fs from "fs";
import path from "path";
import Banner from "../models/Banner.model.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_ROOT = path.resolve(__dirname, "../uploads");
const BANNER_DIR = path.join(UPLOAD_ROOT, "banner");

function toPublicUrl(filename) {
  // FE đang dùng helper assetUrl => nhận '/uploads/...'
  return `/uploads/banner/${filename}`; // để server static map sẵn
}

function safeUnlink(absPath) {
  try {
    if (absPath && fs.existsSync(absPath)) fs.unlinkSync(absPath);
  } catch {}
}

/** GET /api/banners
 *  - ?active=1|true  -> chỉ trả banner đang bật (dùng cho website)
 *  - ?active=0|false -> chỉ banner tắt
 *  - không query      -> tất cả (dùng cho admin)
 */
export async function list(req, res) {
  try {
    const { active } = req.query;
    const filter = {};
    if (typeof active !== "undefined") {
      const expect = String(active).toLowerCase();
      filter.isActive = expect === "1" || expect === "true";
    }
    const items = await Banner.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}

// GET /api/banners/:slug
export async function getBySlug(req, res) {
  try {
    const item = await Banner.findOne({ slug: req.params.slug }).lean();
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}

// POST /api/banners  (multipart/form-data)
// fields: title, slug, link, order, isActive
// file:   image
export async function create(req, res) {
  try {
    const { title, slug, link, order, isActive } = req.body;

    if (!title || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu title/slug" });
    }

    let imageUrl = null;
    let imagePath = null;

    if (req.file) {
      const filename = req.file.filename;
      imageUrl = toPublicUrl(filename); // /uploads/banner/...
      imagePath = path.join(BANNER_DIR, filename); // đường dẫn file thực tế
    } else if (req.body.imageUrl) {
      // fallback: vẫn cho phép dùng URL ngoài khi cần
      imageUrl = req.body.imageUrl;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu ảnh (image)" });
    }

    const doc = await Banner.create({
      title,
      slug,
      link: link || null,
      imageUrl,
      imagePath,
      isActive:
        typeof isActive === "undefined"
          ? true
          : ["1", "true", true, "on"].includes(isActive),
      order: Number.isFinite(+order) ? +order : 0,
    });

    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}

// PUT /api/banners/:id  (multipart/form-data) - có thể thay ảnh
export async function update(req, res) {
  try {
    const { title, slug, link, order, isActive } = req.body;

    const doc = await Banner.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Not found" });

    // nếu upload file mới -> xóa file cũ (nếu file cũ là local)
    if (req.file) {
      const filename = req.file.filename;
      const newUrl = toPublicUrl(filename);
      const newPath = path.join(BANNER_DIR, filename);

      // chỉ xóa khi file cũ nằm trong thư mục banner (tránh xoá link ngoài)
      if (doc.imagePath && doc.imagePath.startsWith(BANNER_DIR)) {
        safeUnlink(doc.imagePath);
      }

      doc.imageUrl = newUrl;
      doc.imagePath = newPath;
    } else if (req.body.imageUrl) {
      // chuyển sang dùng URL ngoài
      if (doc.imagePath && doc.imagePath.startsWith(BANNER_DIR)) {
        safeUnlink(doc.imagePath);
      }
      doc.imageUrl = req.body.imageUrl;
      doc.imagePath = null;
    }

    if (typeof title !== "undefined") doc.title = title;
    if (typeof slug !== "undefined") doc.slug = slug;
    if (typeof link !== "undefined") doc.link = link || null;
    if (typeof order !== "undefined")
      doc.order = Number.isFinite(+order) ? +order : doc.order;
    if (typeof isActive !== "undefined") {
      doc.isActive = ["1", "true", true, "on"].includes(isActive);
    }

    await doc.save();
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}

// PATCH /api/banners/:id/toggle  { isActive: true/false }
export async function toggle(req, res) {
  try {
    const { isActive } = req.body;
    const doc = await Banner.findByIdAndUpdate(
      req.params.id,
      { isActive: ["1", "true", true, "on"].includes(isActive) },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}

// DELETE /api/banners/:id
export async function remove(req, res) {
  try {
    const doc = await Banner.findByIdAndDelete(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Not found" });

    // xóa file vật lý nếu là file local
    if (doc.imagePath && doc.imagePath.startsWith(BANNER_DIR)) {
      safeUnlink(doc.imagePath);
    }
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}
