// src/controllers/blog.controller.js
import Blog from '../models/Blog.model.js';
import slugify from '../utils/slugify.js';

// CREATE
export async function createBlog(req, res) {
  try {
    const {
      title,
      slug,                 // optional: nếu không truyền sẽ tự tạo từ title
      description,
      content,
      cover_image,
      gallery,              // array string
      author,
      categoryIds,          // array ObjectId/string
      tags,                 // array string
      meta_title,
      meta_description,
      status,               // 'draft' | 'published'
      is_active             // boolean
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Thiếu title hoặc content' });
    }

    const finalSlug = (slug && slug.trim()) ? slugify(slug) : slugify(title);

    const newBlog = new Blog({
      title,
      slug: finalSlug,
      description: description ?? '',
      content,
      cover_image: cover_image ?? '',
      gallery: Array.isArray(gallery) ? gallery : [],
      author: author ?? 'Admin',
      categoryIds: Array.isArray(categoryIds) ? categoryIds : [],
      tags: Array.isArray(tags) ? tags : [],
      meta_title: meta_title ?? '',
      meta_description: meta_description ?? '',
      status: status ?? 'draft',
      is_active: typeof is_active === 'boolean' ? is_active : true
    });

    await newBlog.save();
    res.status(201).json({ message: '✅ Tạo bài viết thành công', blog: newBlog });
  } catch (err) {
    console.error('❌ Lỗi tạo blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// READ: list + filter + paginate
export async function getAllBlogs(req, res) {
  try {
    const {
      status,        // draft|published
      active,        // true|false
      q,             // keyword in title
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (typeof active !== 'undefined') filter.is_active = active === 'true';
    if (q) filter.title = { $regex: q, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Blog.find(filter)
        .populate('categoryIds')
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Blog.countDocuments(filter)
    ]);

    res.json({
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) {
    console.error('❌ Lỗi lấy danh sách blog:', err);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách blog' });
  }
}

// READ: by ID
export async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate('categoryIds').lean();
    if (!blog) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.status(200).json(blog);
  } catch (err) {
    console.error('❌ Lỗi lấy blog theo ID:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// READ: by slug
export async function getBlogBySlug(req, res) {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('categoryIds').lean();
    if (!blog) return res.status(404).json({ message: 'Không tìm thấy bài viết theo slug' });
    res.status(200).json(blog);
  } catch (err) {
    console.error('❌ Lỗi lấy blog theo slug:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// UPDATE
export async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      content,
      cover_image,
      gallery,
      author,
      categoryIds,
      tags,
      meta_title,
      meta_description,
      status,
      is_active
    } = req.body;

    const updatedData = {
      ...(title && { title }),
      ...(slug && { slug: slugify(slug) }),
      ...(typeof description !== 'undefined' && { description }),
      ...(typeof content !== 'undefined' && { content }),
      ...(typeof cover_image !== 'undefined' && { cover_image }),
      ...(Array.isArray(gallery) && { gallery }),
      ...(author && { author }),
      ...(Array.isArray(categoryIds) && { categoryIds }),
      ...(Array.isArray(tags) && { tags }),
      ...(typeof meta_title !== 'undefined' && { meta_title }),
      ...(typeof meta_description !== 'undefined' && { meta_description }),
      ...(typeof is_active === 'boolean' && { is_active }),
      ...(status && { status }),
      updated_at: new Date()
    };

    if (status === 'published') {
      updatedData.published_at = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết để cập nhật' });
    }

    res.status(200).json({ message: '✅ Cập nhật thành công', blog: updatedBlog });
  } catch (err) {
    console.error('❌ Lỗi cập nhật blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// DELETE
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ message: 'Không tìm thấy bài viết để xoá' });
    res.status(200).json({ message: '🗑️ Xoá thành công' });
  } catch (err) {
    console.error('❌ Lỗi xoá blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// PATCH nhanh: bật/tắt hiển thị
export async function updateBlogStatus(req, res) {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { is_active, updated_at: new Date() },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: 'Không tìm thấy blog' });
    res.json(blog);
  } catch (err) {
    console.error('❌ Lỗi đổi trạng thái:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

// PATCH: publish/unpublish
export async function publishBlog(req, res) {
  try {
    const { id } = req.params;
    const { publish } = req.body; // true -> published, false -> draft

    const update = {
      status: publish ? 'published' : 'draft',
      updated_at: new Date()
    };
    if (publish) update.published_at = new Date();

    const blog = await Blog.findByIdAndUpdate(id, update, { new: true });
    if (!blog) return res.status(404).json({ message: 'Không tìm thấy blog' });

    res.json(blog);
  } catch (err) {
    console.error('❌ Lỗi publish blog:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}
