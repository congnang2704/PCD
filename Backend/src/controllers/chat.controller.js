// src/controllers/chat.controller.js  (ESM)
import dotenv from 'dotenv';
import axios from 'axios';
import Message from '../models/Message.model.js';

dotenv.config();

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('No GEMINI_API_KEY in env');

  const body = {
    contents: [{ parts: [{ text: prompt }]}],
    // có thể bổ sung: generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-goog-api-key': apiKey
  };

  const resp = await axios.post(GEMINI_ENDPOINT, body, { headers, timeout: 20000 });
  return resp.data;
}

export async function chatWithBot(req, res) {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Lưu message user (best-effort)
    try { await Message.create({ sender: 'user', text: message }); }
    catch (e) { console.warn('Cannot save user message:', e.message); }

    // Gọi Gemini
    let geminiData;
    try {
      geminiData = await callGemini(message);
    } catch (err) {
      console.error('Gemini call error:', err.response?.data || err.message || err);
      const msg = err.response?.data?.error?.message || err.message || 'Error calling Gemini';
      return res.status(502).json({ error: 'Giải pháp AI lỗi: ' + msg });
    }

    // Parse response an toàn
    let replyText = '';
    try {
      const cand = geminiData?.candidates?.[0];
      const parts =
        cand?.content?.parts ??
        (Array.isArray(cand?.content) ? cand.content : null);

      if (Array.isArray(parts)) {
        replyText = parts.map(p => (p?.text ?? '')).join('');
      } else if (typeof cand?.content === 'string') {
        replyText = cand.content;
      } else if (typeof cand?.content === 'object' && cand?.content) {
        replyText = cand.content.text || JSON.stringify(cand.content);
      }

      // fallback kiểu cũ nếu có
      if (!replyText && geminiData?.output?.length > 0) {
        const outParts = geminiData.output[0]?.content;
        if (Array.isArray(outParts)) replyText = outParts.map(p => p?.text ?? '').join('');
        else if (typeof outParts === 'string') replyText = outParts;
      }

      if (!replyText) replyText = 'Xin lỗi, AI không trả lời được câu hỏi này.';
    } catch (parseErr) {
      console.warn('Parse Gemini response fail:', parseErr.message);
      replyText = 'Xin lỗi, mình không đọc được câu trả lời từ AI.';
    }

    // Lưu reply bot (best-effort)
    try { await Message.create({ sender: 'bot', text: replyText }); }
    catch (e) { console.warn('Cannot save bot message:', e.message); }

    return res.json({ reply: replyText, source: 'gemini' });
  } catch (error) {
    console.error('chatWithBot error:', error);
    return res.status(500).json({ error: 'Server lỗi nội bộ' });
  }
}
