import React from "react";
import "./ke_toan.css";

const JobPost_KeToan = () => {
  return (
    <div className="job-container">
      <div className="job-box">
        <h1 className="job-title">
          🌟 TUYỂN DỤNG – NHÂN VIÊN KẾ TOÁN NỘI BỘ 🌟
        </h1>
        <p className="job-intro">
          Bạn yêu thích công việc kế toán, mong muốn làm việc trong môi trường
          năng động, ổn định? 👉 Hãy gia nhập{" "}
          <strong>Công ty TNHH MTV PCD Nguyễn Hải</strong> để phát triển sự
          nghiệp cùng chúng tôi!
        </p>

        <Section
          title="🔹 MÔ TẢ CÔNG VIỆC"
          items={[
            "Thực hiện ghi chép, hạch toán và quản lý các nghiệp vụ kế toán nội bộ hàng ngày.",
            "Lập chứng từ, sổ sách kế toán và lưu trữ chứng từ theo quy định.",
            "Lập báo cáo tài chính nội bộ, báo cáo thu – chi định kỳ, báo cáo quản trị theo yêu cầu.",
            "Theo dõi công nợ phải thu – phải trả, quản lý hóa đơn, hợp đồng và chứng từ liên quan.",
            "Phối hợp với các phòng ban để kiểm soát chi phí, ngân sách, dòng tiền.",
            "Hỗ trợ công tác quyết toán thuế, làm việc với cơ quan chức năng khi cần.",
            "Thực hiện các công việc kế toán – tài chính khác theo yêu cầu của cấp trên.",
          ]}
        />

        <Section
          title="🔹 YÊU CẦU ỨNG VIÊN"
          items={[
            "Tốt nghiệp Cao đẳng/Đại học chuyên ngành Kế toán, Kiểm toán, Tài chính.",
            "Có tối thiểu 1 năm kinh nghiệm trong lĩnh vực kế toán (ưu tiên kế toán xây dựng).",
            "Ứng viên chưa có nhiều kinh nghiệm vẫn có thể ứng tuyển – sẽ được đào tạo.",
            "Nắm vững nghiệp vụ kế toán, tài chính, am hiểu các quy định pháp luật hiện hành.",
            "Thành thạo Word, Excel, MS Office và phần mềm kế toán (Misa, Fast, Bravo… là lợi thế).",
            "Trung thực, cẩn thận, trách nhiệm và có tinh thần cầu tiến.",
            "Kỹ năng giao tiếp, làm việc nhóm tốt, chịu được áp lực công việc.",
          ]}
        />

        <Section
          title="🔹 QUYỀN LỢI ĐƯỢC HƯỞNG"
          items={[
            "Mức lương: Lương thoả thuận (tùy năng lực & kinh nghiệm).",
            "Thưởng lễ, Tết, hiệu suất công việc.",
            "Được tham gia BHXH, BHYT, BHTN đầy đủ theo quy định pháp luật.",
            "Được đào tạo, hướng dẫn nâng cao chuyên môn và cơ hội thăng tiến rõ ràng.",
            "Môi trường làm việc thân thiện, chuyên nghiệp, đồng nghiệp nhiệt tình.",
          ]}
        />

        <Section
          title="📩 Ứng tuyển ngay hôm nay!"
          items={[
            "Email: hotro.nguyenhai.com.vn@gmail.com",
            "Địa chỉ: 17 Nguyễn Cư Trinh, P. Hòa Cường, Tp. Đà Nẵng",
            "Hoặc nhắn tin qua Zalo (0978.999.043) để được hỗ trợ nhanh chóng.",
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
        // Email clickable
        if (item.startsWith("Email:")) {
          const email = item.replace("Email:", "").trim();
          return (
            <li key={index}>
              Email:{" "}
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

        // Zalo/phone clickable
        if (item.includes("Zalo") || item.match(/\d{3}\.\d{3}\.\d{3}/)) {
          const phone = item.match(/\d+/g)?.join("");
          return (
            <li key={index}>
              <a
                href={`tel:${phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item}
              </a>
            </li>
          );
        }

        return <li key={index}>{item}</li>;
      })}
    </ul>
  </div>
);

export default JobPost_KeToan;
