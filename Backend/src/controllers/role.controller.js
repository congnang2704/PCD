import Role from '../models/Role.model.js';

// [GET] /roles
export async function getAllRoles(_req, res) {
  try {
    const roles = await Role.find().lean();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [POST] /roles
export async function createRole(req, res) {
  try {
    const { name, description } = req.body;
    const newRole = new Role({ name, description });
    await newRole.save();
    res.status(201).json({ message: 'Tạo role thành công!', role: newRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [PUT] /roles/:id
export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updated = await Role.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Không tìm thấy role!' });

    res.json({ message: 'Cập nhật thành công!', role: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [DELETE] /roles/:id
export async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Role.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy role để xoá!' });

    res.json({ message: 'Xoá role thành công!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
