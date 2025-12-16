// src/controllers/category.controller.js
import Category from '../models/Category.model.js';

/** GET /api/categories */
export async function getAllCategories(_req, res) {
  try {
    const categories = await Category.find().sort({ created_at: -1 }).lean();
    res.status(200).json(categories);
  } catch (err) {
    console.error('getAllCategories error:', err);
    res.status(500).json({ message: err.message });
  }
}

/** GET /api/categories/:id */
export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id).lean();
    if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    res.status(200).json(category);
  } catch (err) {
    console.error('getCategoryById error:', err);
    res.status(500).json({ message: err.message });
  }
}

/** POST /api/categories */
export async function createCategory(req, res) {
  try {
    const { name, slug, type, is_active } = req.body;

    if (!name || !slug || !type) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const newCategory = new Category({
      name,
      slug,
      type,
      is_active: typeof is_active === 'boolean' ? is_active : true,
      created_at: new Date(),
    });

    await newCategory.save();
    res.status(201).json({ message: '✅ Tạo danh mục thành công', category: newCategory });
  } catch (err) {
    console.error('createCategory error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

/** PUT /api/categories/:id */
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, slug, type, is_active } = req.body;

    const updatedData = {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(type && { type }),
      ...(typeof is_active === 'boolean' && { is_active }),
      updated_at: new Date(),
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục để cập nhật' });
    }

    res.status(200).json({ message: '✅ Cập nhật danh mục thành công', category: updatedCategory });
  } catch (err) {
    console.error('updateCategory error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

/** DELETE /api/categories/:id */
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục để xoá' });
    }

    res.status(200).json({ message: '✅ Xoá danh mục thành công' });
  } catch (err) {
    console.error('deleteCategory error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}
