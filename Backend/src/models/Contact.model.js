import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    area_floor: { type: String },
    location: { type: String },
    budget: { type: String },
    message: { type: String },
    form_type: {
      type: String,
      required: true,
      enum: ['kien-truc', 'noi-that', 'xay-dung'],
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false }
  }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;
