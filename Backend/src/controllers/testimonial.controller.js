import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.model.js';

export async function getAllTestimonials(_req, res) {
  try {
    const testimonials = await Testimonial.find().sort({ created_at: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTestimonialById(req, res) {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createTestimonial(req, res) {
  try {
    const { name, content, avatar, position, rating, projectId } = req.body;
    if (!name || !content) {
      return res.status(400).json({ message: 'Tên và nội dung là bắt buộc' });
    }
    const newTestimonial = new Testimonial({ name, content, avatar, position, rating, projectId });
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateTestimonial(req, res) {
  try {
    const { name, content, avatar, position, rating, projectId } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Không tìm thấy đánh giá' });

    testimonial.name = name || testimonial.name;
    testimonial.content = content || testimonial.content;
    testimonial.avatar = avatar || testimonial.avatar;
    testimonial.position = position || testimonial.position;
    testimonial.rating = rating !== undefined ? rating : testimonial.rating;
    testimonial.projectId = projectId || testimonial.projectId;

    const updated = await testimonial.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteTestimonial(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    res.json({ message: 'Xoá đánh giá thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
