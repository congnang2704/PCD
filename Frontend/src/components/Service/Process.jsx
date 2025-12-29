import React from "react";
import { Steps } from "antd";

export default function Process() {
  return (
    <section className="svc-section">
      <div className="svc-section-head">
        <h2>Quy trình 6 bước (rõ ràng – minh bạch)</h2>
        <p>Giúp khách hàng kiểm soát chất lượng, tiến độ và ngân sách.</p>
      </div>

      <div className="svc-process">
        <Steps
          responsive
          items={[
            {
              title: "Tiếp nhận",
              description: "Nhu cầu · ngân sách · phong cách",
            },
            {
              title: "Khảo sát",
              description: "Hiện trạng · đo đạc · tư vấn",
            },
            {
              title: "Thiết kế",
              description: "2D/3D · hồ sơ kỹ thuật",
            },
            {
              title: "Báo giá",
              description: "Bóc tách · hạng mục rõ",
            },
            {
              title: "Thi công",
              description: "Giám sát · nghiệm thu mốc",
            },
            {
              title: "Bàn giao",
              description: "Bảo hành · hỗ trợ",
            },
          ]}
        />
      </div>
    </section>
  );
}
