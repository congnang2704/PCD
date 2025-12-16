import React from "react";
import "./NhaTienChe.css";
import ContactForm from "../../view/Mail/ContactFormMail";
import ntc from "../../../../assets/ntc.png";
import ntc1 from "../../../../assets/ntc1.png";
import ntc2 from "../../../../assets/ntc2.png";
import ntc3 from "../../../../assets/ntc3.png";
import PKRNTC from "../../../../assets/photo-1600585154526-990dced4db0d.jpg";

/**
 * Trang dịch vụ: Nhà tiền chế (khung thép)
 * - Các phần: Hero, Giới thiệu, Ưu điểm/Ứng dụng, Yếu tố chi phí,
 *   Bảng giá tham khảo, Công trình tiêu biểu, Quy trình, FAQ, Liên hệ.
 * - Form liên hệ là mockup: gắn handler/onSubmit thật của dự án vào.
 */

const BENEFITS = [
  "Thi công nhanh, rút ngắn tiến độ nhờ gia công sẵn tại nhà máy.",
  "Linh hoạt công năng, dễ mở rộng quy mô trong tương lai.",
  "Tối ưu chi phí nhân công so với xây truyền thống.",
  "Độ bền cao, chịu lực tốt, tuổi thọ công trình dài.",
  "Giảm gián đoạn sản xuất/kinh doanh nhờ lắp dựng nhanh.",
];

const APPLICATIONS = [
  "Nhà ở dân dụng (cấp 4, 1–2 tầng, có gác lửng).",
  "Nhà kho – nhà xưởng sản xuất, logistics.",
  "Showroom, quán cà phê, nhà hàng khung thép.",
  "Văn phòng, công trình công cộng quy mô vừa.",
  "Nông nghiệp: nhà trồng, chuồng trại, kho lạnh.",
];

const COST_FACTORS = [
  "Quy mô – kích thước (dài, rộng, cao, bước cột).",
  "Giải pháp kết cấu (nhịp vượt, tải mái, sàn lửng, cầu trục).",
  "Vật tư: mác thép, tôn/mái/vách, cách nhiệt – chống cháy.",
  "Địa chất – nền móng, vị trí thi công – vận chuyển.",
  "Mức độ hoàn thiện kiến trúc – MEP – nội thất.",
];

const PRICING = [
  {
    group: "Dân dụng (tham khảo)",
    rows: [
      { name: "Mức đầu tư thấp", price: "≈ 2.000.000 – 2.500.000 / m²" },
      { name: "Mức đầu tư khá", price: "≈ 4.000.000 – 5.000.000 / m²" },
      { name: "Mức đầu tư cao", price: "≥ 6.000.000 / m²" },
      { name: "Nhà tiền chế 30 m²", price: "≈ 30 – 50 triệu / căn" },
      { name: "Nhà tiền chế 50 m²", price: "≈ 125 – 150 triệu / căn" },
      { name: "Nhà tiền chế 100 m²", price: "≈ 200 – 300 triệu / căn" },
    ],
  },
  {
    group: "Công nghiệp (tham khảo)",
    rows: [
      { name: "Kho/xưởng đầu tư thấp", price: "≥ 1.200.000 / m²" },
      { name: "Kho/xưởng đầu tư khá", price: "≥ 1.700.000 / m²" },
      { name: "Kho/xưởng đầu tư cao", price: "≥ 2.500.000 / m²" },
      { name: "Kho/xưởng < 1.500 m²", price: "≈ 1.500.000 – 1.800.000 / m²" },
      { name: "Kho/xưởng 2 tầng", price: "≈ 1.800.000 – 2.600.000 / m²" },
    ],
  },
  {
    group: "Mặt bằng thị trường (tham khảo nhanh)",
    rows: [
      {
        name: "Thi công khung nhà thép (tùy hạng mục)",
        price: "≈ 1.300.000 – 3.000.000 / m²",
      },
    ],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Tiếp nhận nhu cầu",
    desc: "Trao đổi mục đích sử dụng, ngân sách, tiến độ; hẹn khảo sát.",
  },
  {
    step: "02",
    title: "Khảo sát & tư vấn sơ bộ",
    desc: "Đo đạc hiện trạng, phác thảo phương án kết cấu – vật tư.",
  },
  {
    step: "03",
    title: "Đề xuất & dự toán",
    desc: "Gửi phương án 2D/3D kèm dự toán chi tiết; chỉnh theo góp ý.",
  },
  {
    step: "04",
    title: "Ký hợp đồng & TKKT",
    desc: "Triển khai hồ sơ bản vẽ, shop-drawing, thống nhất tiến độ.",
  },
  {
    step: "05",
    title: "Gia công kết cấu thép",
    desc: "Sản xuất tại xưởng, QC mối hàn, sơn phủ/mạ kẽm.",
  },
  {
    step: "06",
    title: "Lắp dựng công trình",
    desc: "Vận chuyển, lắp khung – mái – vách; hoàn thiện, nghiệm thu.",
  },
  {
    step: "07",
    title: "Bảo hành – bảo trì",
    desc: "Bảo hành kết cấu; hướng dẫn vận hành & bảo trì định kỳ.",
  },
];

const FAQ = [
  {
    q: "Nhà tiền chế có nóng không? Khắc phục thế nào?",
    a: "Dùng tôn cách nhiệt, bông khoáng/PU, sơn phản xạ nhiệt và thông gió tự nhiên/cưỡng bức sẽ giúp nhà mát đáng kể.",
  },
  {
    q: "Kết cấu thép có an toàn cháy nổ?",
    a: "Tăng an toàn bằng sơn chống cháy, bọc vật liệu chống cháy, thiết kế thoát nạn và hệ PCCC phù hợp tiêu chuẩn.",
  },
  {
    q: "Thời gian thi công bao lâu?",
    a: "Các công trình 100–300 m² thường vài tuần đến 1–2 tháng nhờ kết cấu lắp dựng nhanh. Quy mô lớn phụ thuộc hồ sơ & vật tư.",
  },
  {
    q: "Có thể mở rộng sau này?",
    a: "Có. Nhà tiền chế rất linh hoạt, dễ nối dài khung, thêm sàn lửng/phòng khi có nhu cầu.",
  },
];

/** Công trình nhà tiền chế tiêu biểu (dùng ảnh thật của bạn) */
const PROJECTS = [
  {
    title: "Phòng karaoke nhà tiền chế",
    img: PKRNTC,
    caption: "Phòng karaoke nhà tiền chế do Nguyễn Hải thiết kế",
    wide: true,
  },
  {
    title: "Nhà tiền chế 1 tầng",
    img: ntc,
    caption: "Nhà tiền chế 1 tầng do Nguyễn Hải thiết kế",
  },
  {
    title: "Showroom nhà tiền chế",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    caption: "Không gian trưng bày, lắp dựng nhanh do Nguyễn Hải thiết kế",
  },
  {
    title: "Kho logistics tiền chế",
    img: ntc1,
    caption:
      "Kho logistics tiền chế - Kết cấu khẩu độ lớn – tiến độ gấp do Nguyễn Hải thiết kế",
    wide: true,
  },
  {
    title: "Văn phòng nhà tiền chế",
    img: ntc2,
    caption:
      "Văn phòng nhà tiền chế - Cải tạo mở rộng tầng lửng do Nguyễn Hải thiết kế",
  },
  {
    title: "Nhà tiền chế 2 tầng",
    img: ntc3,
    caption: "Nhà tiền chế 2 tầng do Nguyễn Hải thiết kế",
  },
];

export default function NhaTienChe() {
  return (
    <main className="ntc-root">
      {/* HERO */}
      <section className="ntc-hero">
        <div className="ntc-container">
          <h1 className="ntc-hero-title">
            Thiết kế & Thi công <br />
            <span className="ntc-hero-highlight">
              Nhà Tiền Chế (Khung Thép)
            </span>
          </h1>

          <p className="ntc-hero-desc">
            Giải pháp bền vững – thi công nhanh – tối ưu chi phí. Phù hợp nhà ở
            dân dụng, kho xưởng, showroom, văn phòng, công trình nông nghiệp…
          </p>

          <div className="ntc-hero-cta">
            <a href="#contact" className="ntc-btn ntc-btn-primary">
              Nhận báo giá miễn phí
            </a>
            <a href="#pricing" className="ntc-btn ntc-btn-ghost">
              Xem bảng giá tham khảo
            </a>
          </div>
        </div>
        <div className="ntc-hero-glow" aria-hidden />
      </section>

      {/* INTRO */}
      <section className="ntc-section">
        <div className="ntc-container ntc-grid-2">
          <div>
            <h2 className="ntc-h2">Nhà tiền chế là gì?</h2>
            <p className="ntc-p">
              Nhà tiền chế (nhà thép tiền chế) là công trình sử dụng kết cấu
              thép, được thiết kế – gia công sẵn tại nhà máy theo bản vẽ kỹ
              thuật, sau đó vận chuyển đến công trường để lắp dựng. Cách làm này
              giúp rút ngắn thời gian thi công, kiểm soát chất lượng và linh
              hoạt mở rộng công năng.
            </p>
            <ul className="ntc-list">
              <li>
                Ba phần chính: móng, khung kết cấu (cột – dầm – xà gồ), mái/vách
                – cửa.
              </li>
              <li>
                Thông số quan trọng: chiều rộng, chiều dài, chiều cao, bước cột,
                độ dốc mái, tải trọng mái.
              </li>
            </ul>
          </div>

          <div className="ntc-card">
            <h3 className="ntc-h3">Ưu điểm nổi bật</h3>
            <ul className="ntc-bullets">
              {BENEFITS.map((b) => (
                <li key={b}>
                  <span className="ntc-dot" />
                  {b}
                </li>
              ))}
            </ul>

            <h3 className="ntc-h3 ntc-mt24">Ứng dụng phổ biến</h3>
            <ul className="ntc-bullets">
              {APPLICATIONS.map((a) => (
                <li key={a}>
                  <span className="ntc-dot" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COST FACTORS */}
      <section className="ntc-section ntc-section-gray">
        <div className="ntc-container">
          <h2 className="ntc-h2">Yếu tố ảnh hưởng chi phí</h2>
          <p className="ntc-p">
            Các yếu tố dưới đây quyết định sự chênh lệch đơn giá giữa các công
            trình:
          </p>

          <div className="ntc-grid-3 ntc-mt24">
            {COST_FACTORS.map((f) => (
              <div key={f} className="ntc-card">
                <div className="ntc-card-title">{f}</div>
              </div>
            ))}
          </div>
          <div className="ntc-note">
            * Báo giá chính xác cần bản vẽ, yêu cầu vật tư – hoàn thiện, điều
            kiện nền móng & vị trí thi công.
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="ntc-section">
        <div className="ntc-container">
          <h2 className="ntc-h2">Bảng giá tham khảo</h2>
          <p className="ntc-p">
            Đơn giá thay đổi theo quy mô – vật tư – mức hoàn thiện. Liên hệ để
            nhận dự toán chi tiết.
          </p>

          <div className="ntc-grid-3 ntc-mt24">
            {PRICING.map((g) => (
              <div key={g.group} className="ntc-price">
                <div className="ntc-price-header">{g.group}</div>
                <ul className="ntc-price-body">
                  {g.rows.map((r) => (
                    <li key={r.name} className="ntc-price-row">
                      <span>{r.name}</span>
                      <strong>{r.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="ntc-note">
            * “Mặt bằng thị trường” là khoảng đơn giá khung thép theo hạng mục –
            có thể cao/thấp hơn tùy phạm vi công việc.
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ntc-section ntc-section-gray">
        <div className="ntc-container">
          <h2 className="ntc-h2">Quy trình triển khai</h2>
          <div className="ntc-grid-3 ntc-mt24">
            {PROCESS.map((p) => (
              <div key={p.step} className="ntc-card">
                <div className="ntc-step">{p.step}</div>
                <div className="ntc-card-title">{p.title}</div>
                <div className="ntc-p">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ntc-section">
        <div className="ntc-container">
          <h2 className="ntc-h2">Câu hỏi thường gặp</h2>
          <div className="ntc-faq ntc-mt24">
            {FAQ.map((f, i) => (
              <details key={i} className="ntc-faq-item">
                <summary className="ntc-faq-q">
                  {f.q}
                  <span className="ntc-faq-plus">＋</span>
                </summary>
                <p className="ntc-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="ntc-section ntc-section-gradient">
        <ContactForm />
      </section>

      {/* PROJECTS */}
      <section className="ntc-section">
        <div className="ntc-container">
          <h2 className="ntc-h2">Công trình nhà tiền chế tiêu biểu</h2>
          <p className="ntc-p">
            Một số dự án nhà tiền chế đã triển khai: karaoke, nhà ở dân dụng,
            showroom, kho xưởng, văn phòng…
          </p>

          <div className="ntc-proj-grid ntc-mt24">
            {PROJECTS.map((p, i) => (
              <figure
                key={p.title + i}
                className={`ntc-proj-card ${p.wide ? "is-wide" : ""}`}
                title={p.title}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="ntc-proj-img"
                />
                <figcaption className="ntc-proj-cap">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
