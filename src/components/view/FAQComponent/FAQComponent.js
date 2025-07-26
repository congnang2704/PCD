import React, { useState } from "react";
import "./faq.css";

const faqData = [
  {
    id: 1,
    question: "Nhà thầu thi công không giống với thiết kế?",
    answer:
      "Khi lựa chọn dịch vụ thiết kế kiến trúc của PCD Nguyễn Hải, chủ đầu tư hoàn toàn yên tâm về vấn đề đơn vị nhà thầu thi công không giống với bản vẽ. Sau khi hoàn thành bản vẽ thiết kế, PCD Nguyễn Hải sẽ bàn giao hồ sơ với đầy đủ chú thích, vị trí, màu sắc, tên vật liệu,… để đảm bảo thi công đúng bản thiết kế.",
  },
  {
    id: 2,
    question: "Hồ sơ xây dựng nhà hoàn chỉnh gồm những gì?",
    answer:
      "Hồ sơ gồm: Bản vẽ kiến trúc, bản vẽ kết cấu, điện, nước, phối cảnh 3D và dự toán chi tiết.",
  },
  {
    id: 3,
    question: "Thời gian tiến độ thiết kế kiến trúc của PCD Nguyễn Hải",
    answer:
      "Thời gian thiết kế tùy thuộc quy mô và phong cách công trình, thường từ 15 - 30 ngày.",
  },
  {
    id: 4,
    question: "PCD Nguyễn Hải hỗ trợ khách hàng ở xa khi thi công như thế nào?",
    answer:
      "PCD Nguyễn Hải hỗ trợ tư vấn, giám sát từ xa qua Zalo, email, điện thoại và gửi hình ảnh tiến độ thường xuyên.",
  },
  {
    id: 5,
    question: "Hạng mục xây nhà phần thô hoàn thiện gồm những công việc gì?",
    answer:
      "Phần thô gồm xây móng, cột, sàn, tường, mái. Phần hoàn thiện gồm lát gạch, sơn tường, lắp điện nước, thiết bị.",
  },
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Các câu hỏi thường gặp</h2>
      {faqData.map((item, index) => (
        <div key={item.id} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <div className="faq-number">{item.id}</div>
            <div className="faq-text">{item.question}</div>
            <div className="faq-icon">{activeIndex === index ? "▲" : "▼"}</div>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQComponent;
