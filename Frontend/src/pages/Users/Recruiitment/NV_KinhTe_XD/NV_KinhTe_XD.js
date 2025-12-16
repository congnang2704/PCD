import React from "react";
import "./NV_KinhTe_XD.css";

const NV_KinhTe_XD = () => {
  return (
    <div className="job-container">
      <div className="job-box">
        <h1 className="job-title">
          🌟 TUYỂN DỤNG – KỸ SƯ DỰ TOÁN / QS (QUANTITY SURVEYOR) 🌟
        </h1>

        <p className="job-intro">
          👉 Bạn đam mê lĩnh vực dự toán, muốn phát triển sự nghiệp trong ngành
          xây dựng – thi công nội thất? Hãy gia nhập{" "}
          <strong>Công ty TNHH MTV PCD Nguyễn Hải</strong> để cùng chúng tôi
          kiến tạo những công trình chất lượng!
        </p>

        <Section
          title="🔹 MÔ TẢ CÔNG VIỆC"
          items={[
            "Bóc tách khối lượng từ bản vẽ thiết kế, lập dự toán, báo giá cho các dự án xây dựng và nội thất.",
            "Lập hồ sơ thanh toán, quyết toán, nghiệm thu với chủ đầu tư, thầu phụ.",
            "Kiểm tra, giám sát khối lượng thi công thực tế so với hợp đồng và bản vẽ.",
            "Phân tích, kiểm soát chi phí công trình nhằm đảm bảo hiệu quả tài chính.",
            "Phối hợp với phòng Kế toán/Kinh doanh để lập ngân sách, báo giá và kiểm soát chi phí.",
            "Cập nhật đơn giá vật tư, nhân công, định mức xây dựng theo quy định hiện hành.",
            "Thực hiện các công việc khác theo phân công của cấp trên.",
          ]}
        />

        <Section
          title="🔹 YÊU CẦU ỨNG VIÊN"
          items={[
            "Tốt nghiệp Cao đẳng/Đại học chuyên ngành Xây dựng, Kinh tế xây dựng, Dự toán hoặc liên quan.",
            "Có ít nhất 1–2 năm kinh nghiệm trong công tác dự toán, bóc tách khối lượng (ưu tiên trong xây dựng, nội thất).",
            "Thành thạo AutoCAD, Excel và phần mềm dự toán (G8, Delta, Acitt, hoặc tương đương).",
            "Hiểu biết về quy định pháp luật xây dựng, định mức, đơn giá.",
            "Kỹ năng phân tích, làm việc độc lập và làm việc nhóm.",
            "Trung thực, cẩn thận, chịu được áp lực công việc.",
          ]}
        />

        <Section
          title="🔹 QUYỀN LỢI ĐƯỢC HƯỞNG"
          items={[
            "Mức lương: Lương thoả thuận (tùy năng lực & kinh nghiệm).",
            "Thưởng theo dự án, thưởng lễ Tết, hiệu quả công việc.",
            "Được tham gia BHXH, BHYT, BHTN đầy đủ.",
            "Môi trường làm việc chuyên nghiệp, đồng nghiệp thân thiện.",
            "Cơ hội thăng tiến lên vị trí Trưởng nhóm/Trưởng phòng QS.",
          ]}
        />

        <Section
          title="📩 Ứng tuyển ngay hôm nay!"
          items={[
            "Email: hotro.nguyenhai.com.vn@gmail.com",
            "Thời gian làm việc: Từ sáng thứ 2 đến sáng thứ 7.",
            "Địa chỉ: 17 Nguyễn Cư Trinh, P. Hòa Cường, Tp. Đà Nẵng.",
            "Zalo hỗ trợ: 0978.999.043",
          ]}
        />

        <div className="badges">
          <span className="badge">⏱️ Toàn thời gian</span>
          <span className="badge">📍 Đà Nẵng</span>
          <span className="badge">🏗️ QS/Dự toán</span>
        </div>

        <div className="job-footer">
          🌟 Gia nhập <strong>PCD Nguyễn Hải</strong> – đồng hành nâng tầm sự
          nghiệp dự toán của bạn!
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable Section ---------- */
const Section = ({ title, items }) => (
  <div className="job-section">
    <h2>{title}</h2>
    <ul>
      {items.map((item, idx) => {
        // Email clickable
        if (item.startsWith("Email:")) {
          const email = item.replace("Email:", "").trim();
          return (
            <li key={idx}>
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

        // Phone/Zalo clickable
        if (item.toLowerCase().includes("zalo")) {
          const digits = item.match(/\d+/g)?.join("") || "";
          return (
            <li key={idx}>
              <a
                href={`tel:${digits}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item}
              </a>
            </li>
          );
        }

        return <li key={idx}>{item}</li>;
      })}
    </ul>
  </div>
);

export default NV_KinhTe_XD;
