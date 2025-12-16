import User from '../models/User.model.js';

// ✅ Lấy danh sách user
export async function getAllUsers(_req, res) {
  try {
    const users = await User.find({}, '-password')
      .populate('role_id', 'name description')
      .lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Đăng nhập (plain password theo schema hiện tại)
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() })
      .populate('role_id', 'name')
      .lean();

    if (!user || user.password !== (password || '').trim()) {
      return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi login' });
  }
}

// ✅ Tạo mới user (admin)
export async function createUser(req, res) {
  try {
    const { name, email, password, avatar, role_id } = req.body;
    if (!name || !email || !password || !avatar || !role_id) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const newUser = new User({
      name,
      email: email.trim().toLowerCase(),
      password,
      avatar,
      role_id,
      created_at: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('❌ Lỗi tạo user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// ✅ Update user
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password, avatar, role_id } = req.body;

    const updatedData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }),
      ...(avatar && { avatar }),
      ...(role_id && { role_id }),
      updated_at: new Date(),
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user để cập nhật' });
    }

    res.status(200).json({ message: 'Cập nhật user thành công', user: updatedUser });
  } catch (err) {
    console.error('❌ Lỗi cập nhật user:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

// ✅ Xoá user
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user để xoá' });
    }

    res.status(200).json({ message: 'Xoá user thành công' });
  } catch (err) {
    console.error('❌ Lỗi xoá user:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

// ✅ GET 1 user theo ID
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id)
      .populate('role_id', 'name description')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('❌ Lỗi khi lấy user theo ID:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}
