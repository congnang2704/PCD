import FormType from '../models/FormType.model.js';
import FormSubmission from '../models/FormSubmission.model.js';
import nodemailer from 'nodemailer';

const pickStr = (v, def = '') => (typeof v === 'string' ? v.trim() : def);

function buildTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE ?? '').toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// GET /api/forms/:slug  -> trả về config FormType
export async function getFormTypeBySlug(req, res) {
  try {
    const { slug } = req.params;
    const form = await FormType.findOne({ slug, is_active: true }).lean();
    if (!form) return res.status(404).json({ success: false, error: 'Form không tồn tại' });
    res.json(form);
  } catch (err) {
    console.error('[GET FORM TYPE]', err);
    res.status(500).json({ success: false, error: 'Lỗi máy chủ' });
  }
}

// POST /api/forms/:slug  -> tạo submission
export async function createFormSubmission(req, res) {
  try {
    const { slug } = req.params;
    const form = await FormType.findOne({ slug, is_active: true }).lean();
    if (!form) return res.status(404).json({ success: false, error: 'Form không tồn tại' });

    const body        = req.body || {};
    const name        = pickStr(body.name);
    const phone       = pickStr(body.phone);
    const email       = pickStr(body.email);
    const projectInfo = pickStr(body.projectInfo);
    const location    = pickStr(body.location);
    const note        = pickStr(body.note);
    const budget      = body.budget && typeof body.budget === 'object'
      ? { type: pickStr(body.budget.type), value: pickStr(body.budget.value) }
      : { type: '', value: '' };

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Vui lòng nhập họ tên và số điện thoại.' });
    }

    const sub = await FormSubmission.create({
      formTypeId: form._id,
      formSlug: slug,
      name, phone, email, projectInfo, location, note, budget,
      answers: body.answers || {},
      source:  body.source  || 'web',
      meta:    body.meta    || {},
    });

    // gửi mail nếu có cấu hình
    const transporter = buildTransport();
    if (transporter) {
      try {
        const TO = (form.emailTo || process.env.MAIL_TO || process.env.SMTP_USER || '').trim();
        if (TO) {
          const subject = `[PCD] ${form.name || 'Form'} - ${name}`;
          const html = `
            <h3>Yêu cầu tư vấn mới</h3>
            <ul>
              <li><b>Họ tên:</b> ${name}</li>
              <li><b>Điện thoại:</b> ${phone}</li>
              <li><b>Email:</b> ${email || '(trống)'}</li>
              <li><b>Địa chỉ - Khu Vực:</b> ${location || '(trống)'}</li>
              <li><b>Thông tin dự án:</b> ${projectInfo || '(trống)'}</li>
              <li><b>Ngân sách:</b> ${budget.type || '-'} / ${budget.value || '-'}</li>
              <li><b>Ghi chú:</b> ${note || '(trống)'}</li>
            </ul>
            <p>Form: ${slug}</p>
          `.trim();
          await transporter.sendMail({
            from: `"PCD Website" <${process.env.SMTP_USER}>`,
            to: TO,
            subject,
            html,
          });
        }
      } catch (mailErr) {
        console.error('[MAIL ERROR]', mailErr?.message || mailErr);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Đã nhận yêu cầu. Chúng tôi sẽ liên hệ sớm!',
      data: { id: sub._id },
    });
  } catch (err) {
    console.error('[CREATE FORM SUBMISSION ERROR]', err);
    res.status(500).json({ success: false, error: 'Lỗi máy chủ' });
  }
}
