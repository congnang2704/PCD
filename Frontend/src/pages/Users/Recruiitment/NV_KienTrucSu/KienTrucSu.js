import React from "react";
import "../Ke_Toan/ke_toan.css"; // hoặc "./ke_toan.css" nếu bạn dùng chung stylesheet

const KienTrucSu = () => {
  return (
    <div className="job-container">
      <div className="job-box">
        <h1 className="job-title">🌟 [TUYỂN DỤNG KIẾN TRÚC SƯ THIẾT KẾ] 🌟</h1>

        <p className="job-intro">
          🌿 <strong>Công ty TNHH MTV PCD Nguyễn Hải</strong> – đơn vị chuyên
          thiết kế & thi công kiến trúc – nội thất tại Đà Nẵng, đang tìm kiếm
          người đồng hành sáng tạo cho đội ngũ kiến trúc sư của chúng tôi.
          <br />✨ Nếu bạn là người yêu thích thiết kế, đam mê sáng tạo không
          gian sống, và mong muốn phát triển sự nghiệp trong môi trường chuyên
          nghiệp, đây chính là cơ hội dành cho bạn!
        </p>

        <Section
          title="💼 Vị trí: KIẾN TRÚC SƯ THIẾT KẾ"
          items={[
            "Bạn sẽ tham gia vào các dự án thiết kế – thi công đa dạng, làm việc trực tiếp với khách hàng và phối hợp các bộ phận để tạo nên sản phẩm chất lượng.",
          ]}
        />

        <Section
          title="🗓 NHIỆM VỤ CHÍNH"
          items={[
            "Lên ý tưởng, phác thảo và triển khai các bản vẽ kiến trúc.",
            "Phối hợp cùng team nội thất, kỹ sư, nhà thầu để đảm bảo tính khả thi của dự án.",
            "Tư vấn và làm việc trực tiếp với khách hàng, biến mong muốn thành không gian thực tế.",
            "Tham gia giám sát tác giả, theo dõi thi công đúng thiết kế.",
            "Đóng góp xây dựng môi trường làm việc sáng tạo – chuyên nghiệp – thân thiện.",
          ]}
        />

        <Section
          title="✅ YÊU CẦU"
          items={[
            "Đã hoàn thành khóa thực tập kiến trúc sư.",
            "Thành thạo các phần mềm: AutoCAD, SketchUp, Revit, Enscape, Lumion, Photoshop.",
            "Tư duy sáng tạo, có tinh thần trách nhiệm, khả năng làm việc nhóm tốt.",
            "Ưu tiên ứng viên mới ra trường, nhiệt huyết, cầu tiến, mong muốn phát triển lâu dài.",
          ]}
        />

        <Section
          title="🎁 QUYỀN LỢI"
          items={[
            "Mức lương: Thỏa thuận theo năng lực & kinh nghiệm.",
            "Chế độ đầy đủ: BHXH, BHYT, BHTN theo quy định pháp luật.",
            "Phúc lợi hấp dẫn: Thưởng theo dự án, KPI, lễ tết.",
            "Cơ hội thăng tiến: Tham gia nhiều dự án thực tế quy mô đa dạng.",
            "Môi trường làm việc trẻ trung, năng động, nhiều cơ hội học hỏi.",
          ]}
        />

        <Section
          title="⏰ THỜI GIAN LÀM VIỆC"
          items={[
            "Giờ hành chính: Thứ 2 – Thứ 7 sáng (nghỉ chiều Thứ 7 & Chủ nhật).",
          ]}
        />

        <Section
          title="📩 CÁCH ỨNG TUYỂN"
          items={[
            "Gửi CV & Portfolio về email: hotro.nguyenhai.com.vn@gmail.com",
            "Tiêu đề email: [Vị trí ứng tuyển] – [Họ tên]",
            "📞 Hotline: 0377 564 971",
            "🏢 Địa chỉ: 17 Nguyễn Cư Trinh, P. Hòa Cường, Tp. Đà Nẵng",
          ]}
        />

        <div className="badges">
          <span className="badge">📍 Đà Nẵng</span>
          <span className="badge">🧩 Kiến trúc sư</span>
          <span className="badge">⏱️ Toàn thời gian</span>
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
        if (item.includes("email:")) {
          const email = item.split("email:")[1]?.trim();
          return (
            <li key={idx}>
              Gửi CV &amp; Portfolio về email:{" "}
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

        // Hotline clickable
        if (item.startsWith("📞 Hotline:")) {
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

export default KienTrucSu;
