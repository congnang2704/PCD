import React from "react";
import "./NV_KinhTe_XD.css";

const JobPost_KinhTeXD = () => {
  return (
    <div className="job-container">
      <div className="job-box">
        <h1 className="job-title">
          PCD NGUYỄN HẢI TUYỂN DỤNG 01 NHÂN VIÊN KINH TẾ XÂY DỰNG
        </h1>

        <Section
          title="📝 Mô tả nhiệm vụ"
          items={[
            "Lập kế hoạch và dự toán dự án, bao gồm thời gian, nguồn lực và tài chính.",
            "Quản lý chi phí thực tế, đề xuất giải pháp tiết kiệm chi phí.",
            "Thẩm định dự án, phân tích rủi ro tài chính và đưa ra khuyến nghị.",
            "Giám sát thi công đảm bảo đúng thiết kế và tiêu chuẩn kỹ thuật.",
            "Quản lý hợp đồng xây dựng, hồ sơ nghiệm thu và thanh quyết toán.",
            "Phối hợp làm việc với nhà thầu, chủ đầu tư và cơ quan quản lý.",
          ]}
        />

        <Section
          title="📌 Yêu cầu công việc"
          items={[
            "Ứng viên có từ 1 năm kinh nghiệm trở lên.",
            "Trung thực, nhanh nhẹn, có trách nhiệm và chí cầu tiến.",
            "Thành thạo Word, Excel, Autocad, MS Office, phần mềm tiến độ.",
            "Sẵn sàng đi công tác xa nhà dài ngày.",
          ]}
        />

        <Section
          title="🎁 Quyền lợi"
          items={[
            "Lương cơ bản: 6.000.000 – 10.000.000 đ/tháng.",
            "Môi trường làm việc thoải mái, năng động.",
            "Cơ hội thăng tiến và học tập nâng cao chuyên môn.",
            "Chế độ thưởng hấp dẫn.",
          ]}
        />

        <Section
          title="📄 Hồ sơ bao gồm"
          items={[
            "Thư xin việc, sơ yếu lý lịch, CV.",
            "Hộ khẩu hoặc CCCD bản công chứng.",
            "Giấy khám sức khỏe (trong 6 tháng).",
            "Bằng cấp, chứng chỉ liên quan.",
          ]}
        />

        <Section
          title="🛡 Trách nhiệm"
          items={[
            "Thực hiện đúng quy định, định hướng và mục tiêu công ty.",
            "Tuân thủ nội quy và sự chỉ đạo của cấp trên.",
            "Bảo mật công nghệ, công thức và thông tin nội bộ.",
          ]}
        />

        <Section
          title="📬 Cách thức ứng tuyển"
          items={[
            "Gửi email: nguyenhai.deco@gmail.com",
            "Nộp trực tiếp tại: 17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng",
            "Liên hệ: A Hải – 090.540.2989",
            "Website: thicongnhadanang.vn",
            "Website: nguyenhai.com.vn",
          ]}
        />

        <div className="job-footer">
          🌟 Gia nhập PCD Nguyễn Hải – Bước tiến vững chắc trong ngành Kinh tế
          Xây dựng!
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
        if (item.startsWith("Liên hệ:")) {
          const phoneMatch = item.match(/(\\d{3}\\.\\d{3}\\.\\d{4})/);
          if (phoneMatch) {
            return (
              <li key={index}>
                Liên hệ:{" "}
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

export default JobPost_KinhTeXD;
