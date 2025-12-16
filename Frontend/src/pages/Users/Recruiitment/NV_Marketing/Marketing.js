import React from "react";
// import "./NV_Marketing.css";

const JobPost_Marketing = () => {
  return (
    <div className="job-container">
      <div className="job-box">
        <h1 className="job-title">
          PCD NGUYỄN HẢI TUYỂN DỤNG 01 NHÂN VIÊN MARKETING ONLINE
        </h1>

        <Section
          title="📌 Yêu cầu ứng viên"
          items={[
            "Am hiểu về Marketing, Truyền thông, hoặc có kiến thức liên quan đến xây dựng, kiến trúc.",
            "Hiểu biết về quy trình thiết kế, thi công, và các yếu tố liên quan đến xây dựng.",
            "Thành thạo Facebook Ads, Google Ads, Zalo Ads, TikTok Ads,...",
            "Sử dụng được các phần mềm thiết kế cơ bản (Photoshop, Canva, etc.).",
            "Kỹ năng giao tiếp, trình bày và thuyết phục khách hàng tốt.",
            "Nhanh nhẹn, chăm chỉ, ham học hỏi, có tinh thần trách nhiệm.",
            "Thành thạo các kỹ năng văn phòng.",
          ]}
        />

        <Section
          title="🛠 Mô tả công việc"
          items={[
            "Phân tích nhu cầu, xu hướng khách hàng trong ngành xây dựng.",
            "Phát triển các kênh truyền thông online, duy trì nội dung hấp dẫn.",
            "Viết nội dung và quản lý chiến dịch quảng cáo trên Facebook, Google, v.v.",
            "Theo dõi hiệu quả, tối ưu chiến dịch marketing.",
            "Báo cáo kết quả định kỳ.",
            "Phối hợp với các bộ phận liên quan.",
            "Thực hiện các công việc khác theo chỉ đạo.",
          ]}
        />

        <Section
          title="🎁 Quyền lợi"
          items={[
            "Lương cơ bản theo thỏa thuận.",
            "Hưởng thêm % hoa hồng theo hợp đồng.",
            "Môi trường làm việc thoải mái, năng động.",
            "Cơ hội thăng tiến và học tập chuyên sâu.",
            "Chế độ thưởng hấp dẫn.",
          ]}
        />

        <Section
          title="📄 Hồ sơ bao gồm"
          items={[
            "Thư xin việc, sơ yếu lý lịch, CV.",
            "Hộ khẩu, giấy khai sinh, CCCD bản công chứng.",
            "Giấy khám sức khỏe (trong 6 tháng).",
            "Bằng cấp, chứng chỉ liên quan.",
          ]}
        />

        <Section
          title="📬 Cách thức ứng tuyển"
          items={[
            "Gửi email: hotro.nguyenhai.com.vn@gmail.com",
            "Nộp trực tiếp tại: 17 Nguyễn Cư Trinh, TP. Đà Nẵng",
            "Liên hệ phỏng vấn: A Hải – 090.540.2989",
            "Website: thicongnhadanang.vn",
            "Website: nguyenhai.com.vn",
          ]}
        />

        <div className="job-footer">
          🌟 Gia nhập PCD Nguyễn Hải – Bùng nổ sáng tạo cùng Marketing xây dựng!
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
              Gửi email: <a href={`mailto:${email}`}>{email}</a>
            </li>
          );
        }
        if (item.startsWith("Liên hệ")) {
          const phoneMatch = item.match(/(\\d{3,4}\\.\\d{3}\\.\\d{3,4})/);
          if (phoneMatch) {
            return (
              <li key={index}>
                {" "}
                <a href={`tel:${phoneMatch[1].replace(/\\./g, "")}`}>{item}</a>
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

export default JobPost_Marketing;
