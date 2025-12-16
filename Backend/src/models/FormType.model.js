import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema(
  { label: String, value: String },
  { _id: false }
);

const VisibleIfSchema = new mongoose.Schema(
  {
    whenField: String,                                // ví dụ 'budget_type'
    operator: { type: String, enum: ['eq', 'in'], default: 'eq' },
    value: mongoose.Schema.Types.Mixed                // string | string[]
  },
  { _id: false }
);

const FieldSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },           // full_name, phone, ...
    label: { type: String, required: true },
    type: { type: String, default: 'text' },         // text|email|phone|textarea|select|radio
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    width: { type: String, enum: ['full', '1/2', '1/3'], default: 'full' },
    order: { type: Number, default: 0 },
    options: [OptionSchema],
    visibleIf: [VisibleIfSchema]                     // điều kiện hiển thị (optional)
  },
  { _id: false }
);

const FormTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true }, // ví dụ: tu-van-khach-hang
    description: { type: String, default: '' },
    fields: [FieldSchema],
    submitText: { type: String, default: 'Gửi' },
    emailTo: { type: String, default: '' },          // nếu set thì gửi mail vào đây
    is_active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.FormType || mongoose.model('FormType', FormTypeSchema);
