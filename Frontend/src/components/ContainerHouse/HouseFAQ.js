import React from "react";

const HouseFAQ = () => {
  return (
    <div className="house-faq">
      <h3>Câu hỏi thường gặp khi xây nhà</h3>

      <details>
        <summary>Nhà 4x20 xây hết bao nhiêu tiền?</summary>
        <p>Chi phí dao động từ 1.6 – 2.3 tỷ tùy vật liệu & thời điểm.</p>
      </details>

      <details>
        <summary>Có thiết kế theo đất méo không?</summary>
        <p>Có. Nguyễn Hải chuyên xử lý đất méo, đất xéo.</p>
      </details>

      <details>
        <summary>Có thi công trọn gói không?</summary>
        <p>Có. Chúng tôi nhận thiết kế & thi công trọn gói.</p>
      </details>
    </div>
  );
};

export default HouseFAQ;
