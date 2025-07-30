import React from "react";
import "./ke_toan.css";

const JobPost_KeToan = () => {
  return (
    <div className="job-container">
      <div className="job-box">
        <h1 className="job-title">
          PCD NGUYỄN HẢI TUYỂN DỤNG 01 NHÂN VIÊN KẾ TOÁN
        </h1>

        <Section
          title="✅ Yêu cầu tuyển dụng 01 Nhân viên Kế toán"
          items={[
            "Tốt nghiệp Cao đẳng trở lên chuyên ngành Tài chính – Kế toán, Kế toán – Kiểm toán.",
            "Ít nhất 1 năm kinh nghiệm ở vị trí tương đương.",
            "Nhanh nhẹn, chăm chỉ, có tinh thần trách nhiệm cao.",
            "Thành thạo các kỹ năng văn phòng.",
            "Ưu tiên ứng viên có kinh nghiệm tại nhiều mô hình doanh nghiệp & nộp sớm.",
          ]}
        />

        <Section
          title="🛠 Mô tả công việc"
          items={[
            "Thu thập, nhập liệu sổ sách kế toán theo hướng dẫn.",
            "Kiểm tra, đối chiếu chứng từ kế toán.",
            "Theo dõi & quản lý công nợ khách hàng.",
            "Báo cáo công việc định kỳ theo yêu cầu cấp trên.",
            "Thực hiện các công việc khác theo phân công.",
          ]}
        />

        <Section
          title="🎁 Quyền lợi được hưởng"
          items={[
            "Lương thỏa thuận theo năng lực.",
            "Môi trường thân thiện, chuyên nghiệp, thoải mái.",
            "Cơ hội học tập, thăng tiến và phát triển lâu dài.",
            "Chế độ thưởng hấp dẫn, xét tăng lương định kỳ.",
          ]}
        />

        <Section
          title="📄 Hồ sơ bao gồm"
          items={[
            "Thư xin việc, CV, Sơ yếu lý lịch.",
            "Hộ khẩu, CCCD, Giấy khai sinh (bản công chứng).",
            "Giấy khám sức khỏe (trong vòng 6 tháng).",
            "Bằng cấp, chứng chỉ liên quan.",
          ]}
        />

        <Section
          title="📬 Cách thức ứng tuyển"
          items={[
            "Gửi email: nguyenhai.deco@gmail.com",
            "Tiêu đề: Ứng tuyển Nhân viên Kế toán – [Họ tên]",
            "Nộp trực tiếp: 17 Nguyễn Cư Trinh, Hải Châu, Đà Nẵng",
            " Mr. Hải – 090.540.2989",
            "Website: thicongnhadanang.vn",
            "Website: nguyenhai.com.vn",
          ]}
        />
        <div className="job-footer">
          🌟 Gia nhập PCD Nguyễn Hải – Cơ hội phát triển vững chắc cho tương lai
          kế toán của bạn!
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, items }) => (
  <div className="job-section">
    <h2>{title}</h2>
    <ul>
      {items.map((item, index) => {
        if (item.startsWith("Gửi email:")) {
          const email = item.replace("Gửi email:", "").trim();
          return (
            <li key={index}>
              Gửi email:{" "}
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </li>
          );
        }

        if (item.startsWith("Liên hệ:")) {
          const phoneMatch = item.match(/(\d{3}\.\d{3}\.\d{4})/);
          if (phoneMatch) {
            return (
              <li key={index}>
                Liên hệ:{" "}
                <a
                  href={`tel:${phoneMatch[1].replace(/\./g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item}
                </a>
              </li>
            );
          }
        }

        if (item.startsWith("Website:")) {
          const url = item.replace("Website:", "").trim();
          return (
            <li key={index}>
              Website:{" "}
              <a
                href={`https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
            </li>
          );
        }

        return <li key={index}> {item}</li>;
      })}
    </ul>
  </div>
);

export default JobPost_KeToan;
