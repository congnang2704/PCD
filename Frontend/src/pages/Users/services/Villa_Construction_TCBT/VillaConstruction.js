// src/components/Users/services/Villa_Construction/VillaConstruction.js
import React, { useEffect, useState } from "react";
import "./villa-construction.css";
import ContactForm from "../../../../components/Mail/ContactFormMail/ContactFormMail";

import BTSV from "../../../../assets/BTSV.png";
import NTBT from "../../../../assets/NTBT.png";
import BTHBT from "../../../../assets/BTHBT.png";
import BT2T from "../../../../assets/BT2T.png";

const BRAND = {
  primary: "#0a6ad6",
  primaryDeep: "#064eac",
  accent: "#d4b263",
  hotline: "0905 402 989",
  hotlineRaw: "0905402989",
  email: "hotro.nguyenhai.com.vn@gmail.com",
  address: "17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng",
};

const faqs = [
  {
    q: "Thời gian thi công một căn biệt thự 2–3 tầng mất bao lâu?",
    a: "Thông thường từ 8–14 tháng tùy quy mô, mức độ hoàn thiện và điều kiện mặt bằng. Sau khi khảo sát thực tế, chúng tôi sẽ gửi timeline chi tiết cho từng giai đoạn.",
  },
  {
    q: "Chi phí thi công biệt thự được tính như thế nào?",
    a: "Chi phí được tính dựa trên diện tích sàn, kết cấu, phong cách, mức độ hoàn thiện, hệ thống smart home, sân vườn – hồ bơi… Giá sẽ được kiến trúc sư báo chính xác sau khi khảo sát và chốt hồ sơ thiết kế.",
  },
  {
    q: "Nếu tôi đã có bản vẽ thiết kế, Nguyễn Hải có nhận thi công không?",
    a: "Hoàn toàn có. Đội ngũ kỹ sư sẽ rà soát lại hồ sơ, tư vấn những hạng mục cần tối ưu và lập dự toán chi tiết trước khi ký hợp đồng thi công.",
  },
  {
    q: "Trong quá trình thi công tôi muốn điều chỉnh thiết kế thì sao?",
    a: "Các điều chỉnh nhỏ về vật liệu, màu sắc, layout nội thất vẫn có thể tối ưu trong quá trình thi công. Những thay đổi lớn về kết cấu sẽ được kỹ sư đánh giá lại để đảm bảo an toàn và tránh phát sinh không cần thiết.",
  },
  {
    q: "Nguyễn Hải có hỗ trợ xin phép xây dựng và hoàn công không?",
    a: "Chúng tôi hỗ trợ trọn gói: hồ sơ xin phép xây dựng, hồ sơ kết cấu, giám sát tác giả đến hoàn công – hoàn thiện hồ sơ pháp lý cho công trình biệt thự.",
  },
];

const villaProjects = [
  {
    title: "Biệt thự 3 tầng tân cổ điển sang trọng",
    meta: "Diện tích ~280–300m² · Góc hai mặt tiền",
    desc: "Phong cách tân cổ điển nhẹ với hệ cột tròn, mái bằng và các cửa vòm lớn. Mặt tiền trắng sang trọng, ban công nhiều cây xanh, phù hợp gia đình yêu sự tinh tế và thoáng sáng.",
    img: "https://i.pinimg.com/1200x/ee/c3/db/eec3db64f583afe8be25350058947b94.jpg?auto=format&q=90&w=1920",
  },

  {
    title: "Biệt thự sân vườn nghỉ dưỡng",
    meta: "Diện tích ~450–520m² · Hồ bơi · Sân vườn 2 mặt",
    desc: "Biệt thự phong cách resort với hồ bơi lớn, sân vườn rộng, nhiều mảng xanh và khu thư giãn ngoài trời. Thiết kế Tropical – Modern tạo cảm giác nghỉ dưỡng ngay tại nhà.",
    img: BTSV,
  },

  {
    title: "Biệt thự đường cong V’s Villa",
    meta: "3 tầng · Hình khối cong nghệ thuật",
    desc: "Ấn tượng với đường cong mềm mại xuyên suốt mặt tiền, hệ kính lớn và hồ bơi cạnh nhà. Không gian mở, nhiều ánh sáng, phù hợp gia chủ thích sự độc đáo và hiện đại.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Biệt thự Modern Luxury",
    meta: "2–3 tầng · Hồ bơi · Phong cách hiện đại",
    desc: "Biệt thự hiện đại với hình khối vuông vức, vật liệu gỗ – đá – kính sang trọng. Tông màu be – trắng tinh tế, kết hợp hồ bơi tạo không gian sống đẳng cấp và thư giãn.",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
  },
];

const villaPhotos = [
  {
    title: "Biệt thự 3 tầng hiện đại – Đà Nẵng",
    img: "https://i.pinimg.com/1200x/ee/c3/db/eec3db64f583afe8be25350058947b94.jpg?auto=format&q=90&w=1920",
  },
  {
    title: "Biệt thự sân vườn nghỉ dưỡng ven sông",
    img: BTSV,
  },
  {
    title: "Nội thất biệt thự phong cách Modern Luxury",
    img: NTBT,
  },
  {
    title: "Biệt thự Tropical với hồ bơi tràn",
    img: BTHBT,
  },
  {
    title: "Biệt thự 2 tầng sân vườn rộng",
    img: BT2T,
  },
];

export default function VillaConstruction() {
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    document.title =
      "Thiết kế thi công biệt thự trọn gói Đà Nẵng 2025 | Nguyễn Hải Design & Build";
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="villa-page">
      {/* ===== HERO ===== */}
      <section className="villa-hero">
        <div className="container villa-hero-inner">
          <div className="villa-hero-text">
            <span className="villa-hero-tag">
              Thiết kế & thi công biệt thự trọn gói · Đà Nẵng 2025
            </span>
            <h1>Thiết kế thi công biệt thự trọn gói Đà Nẵng</h1>
            <p className="villa-hero-slogan">
              “Chìa khóa vàng” cho hành trình xây biệt thự mơ ước
            </p>
            <p className="villa-hero-desc">
              Nguyễn Hải Design &amp; Build đồng hành cùng anh/chị từ ý tưởng,
              thiết kế kiến trúc – nội thất đến thi công trọn gói và hoàn thiện
              pháp lý. Mục tiêu cuối cùng: bàn giao tổ ấm sang trọng, an toàn,
              đúng ngân sách và bền vững theo thời gian.
            </p>

            <div className="villa-hero-actions">
              <button
                className="btn-primary"
                onClick={() => scrollToId("bao-gia-villa")}
              >
                Nhận báo giá chi tiết ↗
              </button>
              <button
                className="btn-ghost"
                onClick={() => scrollToId("cong-trinh-villa")}
              >
                Xem công trình đã thi công
              </button>
            </div>

            <div className="villa-hero-hotline">
              <span>Hoặc gọi trực tiếp:</span>
              <a href={`tel:${BRAND.hotlineRaw}`}>{BRAND.hotline}</a>
            </div>
          </div>

          <div className="villa-hero-images">
            <div className="villa-hero-main-img" />
            <div className="villa-hero-secondary-img" />
            <div className="villa-hero-badge">
              <span>50+</span>
              <p>Biệt thự đã thiết kế &amp; thi công tại miền Trung</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ĐỊNH NGHĨA & LỢI ÍCH ===== */}
      <section className="section section-soft" id="xu-huong-villa">
        <div className="container">
          <h2 className="section-title">
            Thiết kế thi công biệt thự trọn gói là gì?
          </h2>
          <p className="section-intro">
            Đây là dịch vụ một đơn vị chịu trách nhiệm từ khâu thiết kế kiến
            trúc – nội thất đến thi công hoàn thiện và bàn giao. Gia chủ chỉ cần
            làm việc với một đầu mối duy nhất, tất cả còn lại chúng tôi lo.
          </p>

          <div className="villa-trend-grid">
            <div className="villa-trend-card">
              <div className="icon">🗝️</div>
              <h3>“Chìa khóa vàng” cho gia chủ bận rộn</h3>
              <p>
                Không phải tự mình chạy vật tư, làm việc với nhiều đội thợ. Mọi
                hạng mục đều có kế hoạch rõ ràng và người phụ trách cụ thể.
              </p>
            </div>
            <div className="villa-trend-card">
              <div className="icon">💰</div>
              <h3>Tối ưu chi phí đầu tư</h3>
              <p>
                Dự toán được khái toán chi tiết ngay từ đầu, kiểm soát chặt chẽ
                vật tư, nhân công và các khoản phát sinh theo hợp đồng.
              </p>
            </div>
            <div className="villa-trend-card">
              <div className="icon">⏱️</div>
              <h3>Tiết kiệm thời gian</h3>
              <p>
                Các giai đoạn thiết kế – thi công – hoàn thiện được sắp xếp liền
                mạch, tránh đứt quãng tiến độ do nhiều bên cùng tham gia.
              </p>
            </div>
            <div className="villa-trend-card">
              <div className="icon">📐</div>
              <h3>Đảm bảo đúng bản vẽ & pháp lý</h3>
              <p>
                Đội ngũ kiến trúc sư, kỹ sư giám sát xuyên suốt, đảm bảo công
                trình đạt 95% so với 3D, song song hồ sơ xin phép &amp; hoàn
                công đầy đủ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LÝ DO & LỢI THẾ ===== */}
      <section className="section" id="ly-do-villa">
        <div className="container">
          <h2 className="section-title">
            Vì sao biệt thự cần đơn vị thi công chuyên nghiệp?
          </h2>
          <p className="section-intro">
            Biệt thự là tài sản giá trị lớn, yêu cầu cao về kết cấu, thẩm mỹ và
            công năng. Một sai lầm nhỏ trong giai đoạn thi công có thể kéo theo
            chi phí sửa chữa rất lớn sau này.
          </p>

          <div className="villa-reason-grid">
            <div className="villa-reason-card">
              <span className="icon">🏗️</span>
              <h3>Kết cấu phức tạp</h3>
              <p>
                Móng, dầm, sàn, console, hồ bơi… phải được tính toán và thi công
                đúng chuẩn để đảm bảo độ bền vững hàng chục năm.
              </p>
            </div>
            <div className="villa-reason-card">
              <span className="icon">🎨</span>
              <h3>Thẩm mỹ đòi hỏi cao</h3>
              <p>
                Các chi tiết đá, kính, gỗ, lan can, phào chỉ… cần thi công đúng
                tỷ lệ để giữ trọn “thần thái” của thiết kế đã duyệt.
              </p>
            </div>
            <div className="villa-reason-card">
              <span className="icon">🔌</span>
              <h3>Hệ kỹ thuật đồng bộ</h3>
              <p>
                Điện – nước – smart home – âm thanh – ánh sáng cần được phối hợp
                chặt chẽ, tránh đục phá nhiều lần gây lãng phí.
              </p>
            </div>
            <div className="villa-reason-card">
              <span className="icon">📅</span>
              <h3>Tiến độ &amp; ngân sách</h3>
              <p>
                Kế hoạch thi công rõ ràng, báo cáo tiến độ định kỳ giúp gia chủ
                chủ động tài chính và thời gian nhận nhà.
              </p>
            </div>
          </div>

          <div className="villa-usp-grid">
            <div className="villa-usp-card">
              <h3>Nguyễn Hải có gì khác biệt?</h3>
              <ul>
                <li>
                  Kiến trúc sư &amp; kỹ sư nhiều năm kinh nghiệm, từng triển
                  khai đa dạng phong cách biệt thự.
                </li>
                <li>
                  Quy trình quản lý chất lượng chặt chẽ theo từng giai đoạn:
                  thiết kế – phần thô – hoàn thiện – nội thất.
                </li>
                <li>
                  Ảnh báo cáo tiến độ, biên bản nghiệm thu chi tiết cho từng
                  hạng mục.
                </li>
              </ul>
            </div>
            <div className="villa-usp-card">
              <h3>Cam kết dành cho chủ biệt thự</h3>
              <ul>
                <li>Thiết kế & thi công bám sát ngân sách đã thống nhất.</li>
                <li>
                  Vật liệu đúng chủng loại, có bảng mẫu & biên bản xác nhận.
                </li>
                <li>
                  Bảo hành kết cấu, chống thấm và hỗ trợ bảo trì trong suốt quá
                  trình sử dụng.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GÓI THI CÔNG ===== */}
      <section className="section section-soft" id="goi-thi-cong-villa">
        <div className="container">
          <h2 className="section-title">Các gói thi công biệt thự</h2>
          <p className="section-intro">
            Tùy ngân sách và nhu cầu, Nguyễn Hải linh hoạt từ gói phần thô đến
            gói thi công trọn gói “xách vali vào ở”.
          </p>

          <div className="villa-package-grid">
            {/* GÓI 1 */}
            <div className="villa-package-card">
              <h3>Gói phần thô &amp; nhân công hoàn thiện</h3>
              <p>
                Phù hợp gia chủ muốn chủ động chọn vật liệu hoàn thiện. Chúng
                tôi đảm nhận toàn bộ kết cấu và nhân công.
              </p>
              <ul>
                <li>Thi công móng, khung, mái, tường, cầu thang.</li>
                <li>Đổ bê tông, xây, tô, chống thấm cơ bản.</li>
                <li>Đảm bảo kết cấu ổn định, chống nứt về sau.</li>
              </ul>

              <div className="villa-package-actions">
                <a
                  href={`tel:${BRAND.hotlineRaw}`}
                  className="villa-cta-btn villa-cta-btn-phone"
                >
                  Gọi tư vấn gói này: {BRAND.hotline}
                </a>
              </div>
            </div>

            {/* GÓI 2 – HIGHLIGHT */}
            <div className="villa-package-card villa-package-highlight">
              <div className="villa-package-label">Được chọn nhiều nhất</div>
              <h3>Gói hoàn thiện tiêu chuẩn</h3>
              <p>
                Cân bằng giữa thẩm mỹ &amp; chi phí, vật liệu phổ biến – dễ bảo
                trì, phù hợp đa số gia đình.
              </p>
              <ul>
                <li>Hoàn thiện sàn, tường, trần, cửa, vệ sinh.</li>
                <li>Lắp đặt hệ thống điện, nước, đèn, thiết bị cơ bản.</li>
                <li>Có thể nâng cấp từng không gian theo nhu cầu.</li>
              </ul>

              <div className="villa-package-actions">
                <a
                  href={`tel:${BRAND.hotlineRaw}`}
                  className="villa-cta-btn villa-cta-btn-phone"
                >
                  Gọi tư vấn gói này: {BRAND.hotline}
                </a>
              </div>
            </div>

            {/* GÓI 3 */}
            <div className="villa-package-card">
              <h3>Gói thi công trọn gói Luxury</h3>
              <p>
                Biệt thự chuẩn resort: nội thất đồng bộ, sân vườn – hồ bơi –
                smart home, bàn giao “xách vali vào ở”.
              </p>
              <ul>
                <li>Thiết kế &amp; thi công nội – ngoại thất đồng bộ.</li>
                <li>Hệ smart home, âm thanh, chiếu sáng cảnh quan.</li>
                <li>Setup đầy đủ đồ rời, decor &amp; styling không gian.</li>
              </ul>

              <div className="villa-package-actions">
                <a
                  href={`tel:${BRAND.hotlineRaw}`}
                  className="villa-cta-btn villa-cta-btn-phone"
                >
                  Gọi tư vấn gói này: {BRAND.hotline}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUY TRÌNH ===== */}
      <section className="section" id="quy-trinh-villa">
        <div className="container">
          <h2 className="section-title">
            Quy trình thiết kế thi công biệt thự
          </h2>
          <p className="section-intro">
            Quy trình chuẩn chuyên nghiệp, tách bạch từng giai đoạn giúp anh/chị
            dễ theo dõi và kiểm soát chất lượng.
          </p>

          <div className="villa-process-timeline">
            {[
              "Gặp gỡ – tư vấn, ghi nhận nhu cầu, phong cách, ngân sách và hiện trạng khu đất.",
              "Báo giá khái toán chi phí thiết kế & thi công, thống nhất phạm vi công việc.",
              "Ký hợp đồng thiết kế, triển khai mặt bằng, phối cảnh 3D, hồ sơ kỹ thuật & xin phép xây dựng.",
              "Ký hợp đồng thi công, bóc tách khối lượng, lập tiến độ chi tiết cho từng hạng mục.",
              "Thi công phần móng, khung kết cấu, sàn, mái, cầu thang và các hạng mục phần thô khác.",
              "Thi công hệ thống kỹ thuật: điện, nước, điều hòa, smart home, chống thấm, trần – tường.",
              "Hoàn thiện nội – ngoại thất, sân vườn, hồ bơi, cổng rào, lắp đặt nội thất rời.",
              "Kiểm tra tổng thể, chạy thử thiết bị, vệ sinh công trình và bàn giao cho gia chủ.",
              "Bảo hành, bảo trì định kỳ theo cam kết, đồng hành cùng gia chủ trong quá trình sử dụng.",
            ].map((text, idx) => (
              <div className="villa-process-step" key={idx}>
                <div className="villa-step-number">{idx + 1}</div>
                <div className="villa-step-content">
                  <h3>Bước {idx + 1}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS / GALLERY ===== */}
      <section className="section section-soft" id="cong-trinh-villa">
        <div className="container">
          <h2 className="section-title">Một số biệt thự tiêu biểu</h2>
          <p className="section-intro">
            Mỗi công trình là một câu chuyện riêng về phong cách sống, thói quen
            sinh hoạt và cá tính của gia chủ – chúng tôi chỉ đơn giản là người
            chuyển những câu chuyện đó thành không gian.
          </p>

          <div className="villa-gallery-grid">
            {villaProjects.map((p, idx) => (
              <div className="villa-gallery-card" key={idx}>
                <div
                  className="villa-gallery-img"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                <div className="villa-gallery-body">
                  <h3>{p.title}</h3>
                  <p className="villa-gallery-meta">{p.meta}</p>
                  <p className="villa-gallery-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section" id="bao-gia-villa">
        <div className="container">
          <h2 className="section-title">
            Bảng giá thiết kế & thi công biệt thự (tham khảo)
          </h2>
          <p className="section-intro">
            Đơn giá thực tế sẽ phụ thuộc vào diện tích, kết cấu, phong cách, vật
            liệu và thời điểm thi công. Dưới đây là khung giá để anh/chị tham
            khảo trước khi làm việc chi tiết với kiến trúc sư.
          </p>

          {/* Bảng giá thiết kế – 3 gói */}
          <div className="villa-pricing-cards">
            <div className="villa-pricing-card-dark">
              <div className="villa-pricing-card-header">
                <p className="villa-pricing-tag">GÓI 1</p>
                <h3>Thiết kế nội thất</h3>
              </div>
              <ul className="villa-pricing-features">
                <li>Phối cảnh 3D nội thất toàn bộ không gian.</li>
                <li>Bản vẽ triển khai chi tiết vật liệu & kích thước.</li>
                <li>Bố trí đèn, trần thạch cao, đồ nội thất.</li>
              </ul>
              <div className="villa-pricing-value">
                <span>≈ 200.000</span>
                <p>VNĐ / m² sàn</p>
              </div>
            </div>

            <div className="villa-pricing-card-dark">
              <div className="villa-pricing-card-header">
                <p className="villa-pricing-tag">GÓI 2</p>
                <h3>Thiết kế kiến trúc</h3>
              </div>
              <ul className="villa-pricing-features">
                <li>Bộ hồ sơ xin phép xây dựng.</li>
                <li>Bộ hồ sơ kiến trúc & mặt bằng công năng.</li>
                <li>Bộ hồ sơ kết cấu & điện nước cơ bản.</li>
              </ul>
              <div className="villa-pricing-value">
                <span>≈ 200.000</span>
                <p>VNĐ / m² sàn</p>
              </div>
            </div>

            <div className="villa-pricing-card-dark">
              <div className="villa-pricing-card-header">
                <p className="villa-pricing-tag">GÓI 3</p>
                <h3>Thiết kế trọn gói</h3>
              </div>
              <ul className="villa-pricing-features">
                <li>Hồ sơ xin phép, kiến trúc, kết cấu, điện nước ME.</li>
                <li>Phối cảnh 3D ngoại thất & nội thất.</li>
                <li>Hồ sơ triển khai thi công nội thất chi tiết.</li>
              </ul>
              <div className="villa-pricing-value">
                <span>≈ 350.000</span>
                <p>VNĐ / m² sàn</p>
              </div>
            </div>
          </div>

          {/* Bảng giá thi công trọn gói – 2 khung giá */}
          <div className="villa-pricing-banners">
            <div className="villa-pricing-banner">
              <p className="villa-pricing-banner-title">
                THI CÔNG TRỌN GÓI PHONG CÁCH HIỆN ĐẠI &amp; TROPICAL
              </p>
              <p className="villa-pricing-banner-range">
                12.000.000 – 15.000.000 VNĐ/m²
              </p>
              <p className="villa-pricing-banner-note">
                Phù hợp biệt thự hiện đại, Tropical, ưu tiên không gian mở và
                thiên nhiên xanh mát.
              </p>
            </div>

            <div className="villa-pricing-banner">
              <p className="villa-pricing-banner-title">
                THI CÔNG TRỌN GÓI PHONG CÁCH LUXURY – INDOCHINE – TÂN CỔ ĐIỂN –
                ĐỊA TRUNG HẢI
              </p>
              <p className="villa-pricing-banner-range">
                15.000.000 – 20.000.000 VNĐ/m²
              </p>
              <p className="villa-pricing-banner-note">
                Sử dụng vật liệu cao cấp, chi tiết trang trí phức tạp, yêu cầu
                tay nghề thợ và thời gian thi công cao hơn.
              </p>
            </div>
          </div>

          {/* Bảng giá tóm tắt theo hạng mục thi công */}
          <div className="villa-pricing-table-wrapper">
            <table className="villa-pricing-table">
              <thead>
                <tr>
                  <th>Hạng mục</th>
                  <th>Mô tả</th>
                  <th>Tư vấn báo giá (miễn phí)</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Gói phần thô</td>
                  <td>
                    Thi công kết cấu, tường, mái, cầu thang, chống thấm cơ bản.
                  </td>
                  <td>
                    <a
                      href={`tel:${BRAND.hotlineRaw}`}
                      className="villa-cta-btn villa-cta-btn-phone"
                    >
                      Gọi: {BRAND.hotline}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>Gói hoàn thiện tiêu chuẩn</td>
                  <td>
                    Hoàn thiện sàn, trần, tường, thiết bị vệ sinh, cửa, hệ thống
                    điện nước theo tiêu chuẩn.
                  </td>
                  <td>
                    <a
                      href={`tel:${BRAND.hotlineRaw}`}
                      className="villa-cta-btn villa-cta-btn-phone"
                    >
                      Gọi: {BRAND.hotline}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>Gói hoàn thiện Luxury</td>
                  <td>
                    Vật liệu cao cấp, nội thất đồng bộ, sân vườn, hồ bơi, smart
                    home, chiếu sáng cảnh quan.
                  </td>
                  <td>
                    <a
                      href={`tel:${BRAND.hotlineRaw}`}
                      className="villa-cta-btn villa-cta-btn-phone"
                    >
                      Gọi: {BRAND.hotline}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="villa-pricing-note">
              <strong>Lưu ý:</strong> Giá thực tế sẽ được kiến trúc sư báo chính
              xác sau khi khảo sát hiện trạng, phong cách mong muốn và hồ sơ
              thiết kế chi tiết.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CAM KẾT ===== */}
      <section className="section section-soft" id="cam-ket-villa">
        <div className="container">
          <h2 className="section-title">Cam kết cho công trình biệt thự</h2>
          <p className="section-intro">
            Chúng tôi hiểu rằng biệt thự không chỉ là tài sản – đó là nơi lưu
            giữ ký ức của cả gia đình. Mỗi công trình đều được chăm chút như
            chính ngôi nhà của mình.
          </p>

          <div className="villa-commit-grid">
            <div className="villa-commit-card">
              <h3>Hợp đồng &amp; chi phí minh bạch</h3>
              <p>
                Hợp đồng rõ ràng, chia nhỏ hạng mục, dễ thay đổi vật liệu và giá
                trị từng phần. Báo cáo tiến độ &amp; chi phí phát sinh (nếu có)
                được cập nhật thường xuyên.
              </p>
            </div>
            <div className="villa-commit-card">
              <h3>Chất lượng thi công</h3>
              <p>
                Đội ngũ kỹ sư giám sát xuyên suốt, áp dụng giải pháp thi công
                tối ưu, đảm bảo công trình bền vững và an toàn theo thời gian.
              </p>
            </div>
            <div className="villa-commit-card">
              <h3>Bảo hành &amp; bảo trì</h3>
              <p>
                Bảo hành kết cấu, chống thấm và hệ thống kỹ thuật theo cam kết.
                Hỗ trợ bảo trì, nâng cấp nội – ngoại thất khi gia chủ có nhu
                cầu.
              </p>
            </div>
            <div className="villa-commit-card">
              <h3>Đồng hành lâu dài</h3>
              <p>
                Tư vấn khai thác, cho thuê, cải tạo – mở rộng trong tương lai
                trên nền hồ sơ thiết kế ban đầu, tiết kiệm chi phí cho gia chủ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq-villa">
        <div className="container">
          <h2 className="section-title">Câu hỏi thường gặp</h2>
          <p className="section-intro">
            Một số thắc mắc phổ biến về chi phí, tiến độ và quy trình. Nếu
            anh/chị vẫn còn băn khoăn, hãy để lại thông tin bên dưới, đội ngũ
            Nguyễn Hải sẽ tư vấn chi tiết hơn.
          </p>

          <div className="villa-faq-list">
            {faqs.map((item, idx) => {
              const open = idx === activeFaq;
              return (
                <div
                  key={idx}
                  className={
                    "villa-faq-item" + (open ? " villa-faq-item-active" : "")
                  }
                >
                  <button
                    className="villa-faq-question"
                    onClick={() =>
                      setActiveFaq((prev) => (prev === idx ? -1 : idx))
                    }
                  >
                    <span>{item.q}</span>
                    <span className="villa-faq-toggle">{open ? "−" : "+"}</span>
                  </button>
                  {open && <div className="villa-faq-answer">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section section-soft" id="lien-he-villa">
        <ContactForm />
      </section>

      {/* ===== PHOTO WALL – CÔNG TRÌNH ĐÃ THIẾT KẾ ===== */}
      <section className="section" id="thu-vien-cong-trinh">
        <div className="container">
          <h2 className="section-title">
            Hình ảnh các công trình do Nguyễn Hải thiết kế
          </h2>
          <p className="section-intro">
            Một vài góc nhìn thực tế từ những căn biệt thự mà Nguyễn Hải Design
            &amp; Build đã đồng hành cùng gia chủ. Anh/chị có thể tham khảo để
            hình dung rõ hơn chất lượng thi công và phong cách thiết kế.
          </p>

          <div className="villa-works-grid">
            {villaPhotos.map((item, idx) => (
              <div className="villa-works-item" key={idx}>
                <img
                  className="villa-works-img"
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="villa-works-overlay" />
                <div className="villa-works-caption">
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BẮT ĐẦU NGAY ===== */}
      <section className="villa-cta-start">
        <div className="container villa-cta-inner">
          <div className="villa-cta-left">
            <p className="villa-cta-sub">BẮT ĐẦU NGAY</p>
            <h2 className="villa-cta-title">
              Thiết kế &amp; thi công biệt thự trọn gói
            </h2>
            <p className="villa-cta-desc">
              Khảo sát khu đất, tư vấn phong cách &amp; báo giá chi tiết hoàn
              toàn miễn phí tại Đà Nẵng và khu vực lân cận.
            </p>
          </div>

          <div className="villa-cta-right">
            <a
              href={`tel:${BRAND.hotlineRaw}`}
              className="villa-cta-btn villa-cta-btn-phone"
            >
              Gọi: {BRAND.hotline}
            </a>
            <a
              href="https://zalo.me/0978999043"
              target="_blank"
              rel="noreferrer"
              className="villa-cta-btn villa-cta-btn-zalo"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
