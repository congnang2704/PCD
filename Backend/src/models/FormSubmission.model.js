import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema(
  {
    formTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormType', index: true },
    formSlug:   { type: String, index: true },

    // Flatten các field thường dùng để lọc/CRM nhanh
    name:        String,
    phone:       String,
    email:       String,
    location:    String,
    note:        String,
    projectInfo: String,
    budget: {
      type:  { type: String, default: '' },          // 'thi-cong' | 'cai-tao' | 'tk-xay-dung' | 'tk-noi-that'
      value: { type: String, default: '' }
    },

    // Full dữ liệu người dùng gửi
    answers: { type: Object, default: {} },

    // Metadata
    source: { type: String, default: 'web' },
    meta:   { type: Object, default: {} }
  },
  { timestamps: true }
);

FormSubmissionSchema.index({ formSlug: 1, createdAt: -1 });

export default mongoose.models.FormSubmission ||
  mongoose.model('FormSubmission', FormSubmissionSchema);
