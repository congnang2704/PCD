import Contact from '../models/Contact.model.js';

// Tạo liên hệ mới
export async function createContact(req, res) {
  try {
    const {
      name,
      phone,
      email,
      area_floor,
      location,
      budget,
      message,
      form_type
    } = req.body;

    if (!name || !phone || !form_type) {
      return res.status(400).json({ error: 'Thiếu dữ liệu bắt buộc!' });
    }

    const contact = new Contact({
      name,
      phone,
      email,
      area_floor,
      location,
      budget,
      message,
      form_type
    });

    await contact.save();
    res.status(201).json({ message: 'Đã lưu liên hệ thành công!', contact });
  } catch (err) {
    console.error('Lỗi khi lưu liên hệ:', err.message);
    res.status(500).json({ error: err.message || 'Lỗi server khi lưu contact' });
  }
}

// Lấy tất cả liên hệ
export async function getAllContacts(_req, res) {
  try {
    // nếu schema của bạn dùng timestamps: { createdAt: 'created_at' } thì sort theo 'created_at' OK
    const contacts = await Contact.find().sort({ created_at: -1 }).lean();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy liên hệ theo id
export async function getContactById(req, res) {
  try {
    const contact = await Contact.findById(req.params.id).lean();
    if (!contact) return res.status(404).json({ error: 'Không tìm thấy liên hệ' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật liên hệ theo id
export async function updateContact(req, res) {
  try {
    const { id } = req.params;

    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Không tìm thấy liên hệ' });
    }

    const fields = [
      'name','phone','email','area_floor','location','budget','message','form_type'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        contact[field] = req.body[field];
      }
    });

    await contact.save();
    res.json({ message: 'Cập nhật liên hệ thành công!', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Xoá liên hệ theo id
export async function deleteContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Không tìm thấy liên hệ' });
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Xoá liên hệ thành công!' });
  } catch (err) {
    console.error('Lỗi khi xoá liên hệ:', err.message);
    res.status(500).json({ error: 'Lỗi server khi xoá liên hệ' });
  }
}
