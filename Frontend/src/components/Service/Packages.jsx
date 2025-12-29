import React from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const navigate = useNavigate();

  const packs = [
    {
      tag: "Gói Thiết kế",
      title: "Thiết kế Nguyễn Hải",
      desc: "Dành cho anh/chị muốn có bản vẽ “chuẩn thi công”: bố trí công năng tối ưu, thẩm mỹ đúng gu, hồ sơ rõ để kiểm soát chi phí và hạn chế phát sinh.",
      items: [
        "3D phối cảnh (mặt tiền / nội thất) bám đúng nhu cầu & phong cách",
        "Hồ sơ thi công cơ bản: kiến trúc + kết cấu + điện nước (MEP)",
        "Tư vấn vật liệu, giải pháp thi công & dự toán sơ bộ để chốt ngân sách",
      ],
      ctaPrimary: "Nhận tư vấn thiết kế",
      ctaSecondary: "Xem mẫu thiết kế",
      secondaryPath: "/mau-nha-dep",
    },
    {
      tag: "Gói Thi công",
      title: "Thi công Nguyễn Hải",
      desc: "Dành cho anh/chị đã có bản vẽ và cần đội thi công uy tín: làm đúng kỹ thuật, giám sát chặt, nghiệm thu theo mốc rõ ràng để yên tâm tiến độ – chất lượng.",
      items: [
        "Thi công phần thô vững chắc: móng – khung – xây tô – chống thấm",
        "Thi công hoàn thiện đẹp & bền: ốp lát – trần – sơn – thiết bị",
        "Giám sát & nghiệm thu theo giai đoạn, báo cáo tiến độ minh bạch",
      ],
      hot: true,
      ctaPrimary: "Nhận báo giá thi công",
      ctaSecondary: "Xem dự án thực tế",
      secondaryPath: "/du-an",
    },
    {
      tag: "Gói Trọn gói",
      title: "Trọn gói Nguyễn Hải",
      desc: "Dành cho anh/chị muốn “chìa khóa trao tay”: một đầu mối từ thiết kế → dự toán → thi công → bàn giao. Tối ưu thời gian, kiểm soát ngân sách, hạn chế rủi ro.",
      items: [
        "Thiết kế tối ưu + dự toán chi tiết theo hạng mục, rõ vật tư",
        "Thi công trọn gói bám tiến độ, kiểm soát chất lượng từng mốc",
        "Bàn giao đúng chuẩn + bảo hành minh bạch + hỗ trợ sau hoàn công",
      ],
      ctaPrimary: "Nhận báo giá trọn gói",
      ctaSecondary: "Xem bảng giá",
      secondaryPath: "/bang-gia",
    },
  ];

  return (
    <section className="svc-section">
      <div className="svc-section-head">
        <h2>Gợi ý gói dịch vụ</h2>
        <p>
          Chọn gói phù hợp nhu cầu — đội ngũ tư vấn sẽ báo giá nhanh theo hiện
          trạng và ngân sách.
        </p>
      </div>

      <Row gutter={[16, 16]}>
        {packs.map((p) => (
          <Col xs={24} md={8} key={p.title}>
            <div className={`svc-pack ${p.hot ? "hot" : ""}`}>
              <div className="svc-pack-tag">{p.tag}</div>
              <div className="svc-pack-title">{p.title}</div>
              <div className="svc-pack-desc">{p.desc}</div>

              <ul className="svc-pack-list">
                {p.items.map((x) => (
                  <li key={x}>✅ {x}</li>
                ))}
              </ul>

              <div className="svc-pack-actions">
                <Button type="primary" onClick={() => navigate("/lien-he")}>
                  {p.ctaPrimary}
                </Button>

                <Button onClick={() => navigate(p.secondaryPath)}>
                  {p.ctaSecondary}
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
