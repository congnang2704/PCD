import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';

// 👉 tái dùng đúng connectDB của server
import connectDB from '../config/database.js';
import FormType from '../models/FormType.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  try {
    // dùng cùng logic/biến với server
    await connectDB();
    console.log('✅ Mongo connected (via connectDB)');

    const slug = 'tu-van-khach-hang';
    await FormType.deleteOne({ slug });

    await FormType.create({
      name: 'Tư vấn khách hàng',
      slug,
      description: 'Form thu thập thông tin khách hàng để tư vấn',
      emailTo: process.env.MAIL_TO || '',
      submitText: 'Gửi yêu cầu',
      fields: [
        { key: 'full_name',    label: 'Họ và tên',       type: 'text',  placeholder: 'Nguyễn Văn A', required: true, width: 'full', order: 1 },
        { key: 'phone',        label: 'Số điện thoại',   type: 'phone', placeholder: '09xx...',       required: true, width: '1/2',  order: 2 },
        { key: 'email',        label: 'Email',           type: 'email', placeholder: 'name@email.com',                width: '1/2',  order: 3 },
        { key: 'project_info', label: 'Thông tin dự án', type: 'text',  placeholder: 'VD: 100m2 - 3 tầng',            width: 'full', order: 4 },
        { key: 'location',     label: 'Địa chỉ - Khu vực',         type: 'text',  placeholder: 'Đà Nẵng, TP.HCM…',              width: 'full', order: 5 },
        {
          key: 'budget_type', label: 'Loại ngân sách', type: 'select', required: true, width: 'full', order: 6,
          options: [
            { label: 'Ngân sách thi công',            value: 'thi-cong'   },
            { label: 'Ngân sách cải tạo',             value: 'cai-tao'    },
            { label: 'Ngân sách thiết kế xây dựng',   value: 'tk-xay-dung'},
            { label: 'Ngân sách thiết kế nội thất',   value: 'tk-noi-that'}
          ]
        },
        {
          key: 'budget_construction', label: 'Ngân sách', type: 'select', required: true, width: 'full', order: 7,
          options: [
            { label: 'Dưới 1 Tỷ',  value: 'duoi-1-ty'  },
            { label: '1 - 5 Tỷ',   value: '1-5-ty'     },
            { label: '5 - 10 Tỷ',  value: '5-10-ty'    },
            { label: 'Trên 10 Tỷ', value: 'tren-10-ty' }
          ],
          visibleIf: [{ whenField: 'budget_type', operator: 'in', value: ['thi-cong', 'cai-tao'] }]
        },
        {
          key: 'budget_design', label: 'Ngân sách', type: 'select', required: true, width: 'full', order: 8,
          options: [
            { label: 'Dưới 50 Triệu',   value: 'duoi-50-trieu'  },
            { label: '50 - 100 Triệu',  value: '50-100-trieu'   },
            { label: '100 - 150 Triệu', value: '100-150-trieu'  },
            { label: 'Trên 150 Triệu',  value: 'tren-150-trieu' }
          ],
          visibleIf: [{ whenField: 'budget_type', operator: 'in', value: ['tk-xay-dung', 'tk-noi-that'] }]
        },
        { key: 'note', label: 'Ghi chú thêm', type: 'textarea', placeholder: 'Yêu cầu thêm…', width: 'full', order: 9 }
      ]
    });

    console.log('✅ Seeded: tu-van-khach-hang');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Mongo disconnected');
  }
}

run();
