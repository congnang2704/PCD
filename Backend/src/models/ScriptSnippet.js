// src/models/ScriptSnippet.js
import mongoose from 'mongoose';

const ScriptSnippetSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // ví dụ: 'ga4', 'fbpixel', 'custom-head'
    label: { type: String, required: true }, // Tên hiển thị
    code: { type: String, default: '' }, // raw JS/HTML (có thể là <script>…)
    placement: {
      // chèn ở đâu
      type: String,
      enum: ['head', 'body-start', 'body-end'],
      default: 'head',
    },
    enabled: { type: Boolean, default: true },
    env: {
      type: String,
      enum: ['all', 'prod', 'staging', 'dev'],
      default: 'all',
    },
  },
  { timestamps: true }
);

export default mongoose.model('ScriptSnippet', ScriptSnippetSchema);
