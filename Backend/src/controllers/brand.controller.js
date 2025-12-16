// src/controllers/brand.controller.js
import Brand from '../models/Brand.models.js';

function toRelativeTrademarkPath(file) {
  if (!file) return '';
  // luôn dùng dấu / cho URL
  return (`/uploads/trademark/${file.filename}`).replace(/\\/g, '/');
}

export async function createBrand(req, res) {
  try {
    const { name, is_active } = req.body;
    const image = req.file ? toRelativeTrademarkPath(req.file) : '';

    const doc = await Brand.create({
      name,
      is_active: is_active !== undefined ? is_active === 'true' || is_active === true : true,
      image, // <= relative path
    });
    res.status(201).json({ ok: true, data: doc });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}

export async function listBrands(req, res) {
  try {
    const { active } = req.query; // ?active=true/false (tùy chọn)
    const filter = {};
    if (active === 'true') filter.is_active = true;
    if (active === 'false') filter.is_active = false;

    const data = await Brand.find(filter).sort({ createdAt: -1 });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function toggleActive(req, res) {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    const doc = await Brand.findByIdAndUpdate(
      id,
      { is_active: is_active === 'true' || is_active === true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, data: doc });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}

export async function updateBrand(req, res) {
  try {
    const { id } = req.params;
    const { name, is_active } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (is_active !== undefined) update.is_active = is_active === 'true' || is_active === true;
    if (req.file) update.image = toRelativeTrademarkPath(req.file);

    const doc = await Brand.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, data: doc });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}

export async function deleteBrand(req, res) {
  try {
    const { id } = req.params;
    const doc = await Brand.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, data: doc });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}
