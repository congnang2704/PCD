// src/controllers/scriptSnippet.controller.js
import ScriptSnippet from '../models/ScriptSnippet.js';

export async function getPublicScripts(req, res) {
  // có thể lọc theo ENV từ header query ?env=prod
  const env = (req.query.env || 'all').toLowerCase();
  const cond = { enabled: true, $or: [{ env: 'all' }, { env }] };
  const docs = await ScriptSnippet.find(cond).sort({ updatedAt: 1 }).lean();
  // chỉ public các field cần thiết
  res.json(
    docs.map((d) => ({
      key: d.key,
      code: d.code,
      placement: d.placement,
      updatedAt: d.updatedAt,
    }))
  );
}

export async function listAll(req, res) {
  const docs = await ScriptSnippet.find().sort({ updatedAt: -1 }).lean();
  res.json(docs);
}

export async function upsertOne(req, res) {
  const { key } = req.params;
  const { label, code, placement, enabled, env } = req.body;
  const doc = await ScriptSnippet.findOneAndUpdate(
    { key },
    { $set: { label, code, placement, enabled, env } },
    { new: true, upsert: true }
  );
  res.json(doc);
}

export async function deleteOne(req, res) {
  const { key } = req.params;
  await ScriptSnippet.deleteOne({ key });
  res.json({ ok: true });
}
