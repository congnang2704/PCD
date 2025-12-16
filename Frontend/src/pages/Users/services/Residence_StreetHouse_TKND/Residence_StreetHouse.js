// src/components/Users/services/Residence_StreetHouse/Residence_StreetHouse.js
import React, { useEffect, useState } from "react";
import "./residence-streethouse.css";
import ContactForm from "../../view/Mail/ContactFormMail";
// ảnh hero
import heroMain from "../../../../assets/streethouse/banner-TKNP.webp";
import MTKTC1 from "../../../../assets/streethouse/unnamed.webp";
import MTKTC2 from "../../../../assets/streethouse/nha2tang.webp";
import MTKTC3 from "../../../../assets/streethouse/3.webp";
import MTKTC4 from "../../../../assets/streethouse/z7290352206978_1240a3c587cca926e8f4c2f606e88724.webp";
import MTKTC5 from "../../../../assets/streethouse/z7290352206983_c3bb3e402c7f041630cea593018a810b.webp";
import MTKTC6 from "../../../../assets/streethouse/z7290352207018_f022f36cef20595e4ae81cdc871dc360.webp";

const BRAND = {
  primary: "#0a6ad6",
  primaryDeep: "#064eac",
  accent: "#d4b263",
  hotline: "0978 999 043",
  hotline1: "0905 402 989",
  hotlineRaw: "0978999043",
  email: "hotro.nguyenhai.com.vn@gmail.com",
  address: "17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng",
};

const galleryItems = [
  {
    title: "Nhà phố 3 tầng – Hòa Xuân",
    size: "5 x 20m",
    style: "Hiện đại tối giản",
    image: MTKTC1,
    desc: "Mặt tiền khối hộp mạnh mẽ, tối ưu ánh sáng và thông gió tự nhiên. Không gian sống mở, liên thông tạo cảm giác rộng rãi cho gia đình trẻ.",
  },

  {
    title: "Nhà phố 2 tầng – Sơn Trà",
    size: "5 x 18m",
    style: "Scandinavian",
    image: MTKTC2,
    desc: "Phong cách Bắc Âu tinh tế, sử dụng tone màu sáng và vật liệu mộc. Giải pháp thông gió chéo giúp nhà luôn thoáng mát.",
  },

  {
    title: "Nhà phố kết hợp kinh doanh – Đà Nẵng",
    size: "4,5 x 22m",
    style: "Hiện đại kính lớn",
    image: MTKTC3,
    desc: "Thiết kế theo mô hình home-office, mặt tiền kính lớn sang trọng. Tầng trệt rộng rãi thuận tiện kinh doanh hoặc làm văn phòng.",
  },

  {
    title: "Nhà phố kết hợp kinh doanh – Kiểu Nhật",
    size: "7 x 20m",
    style: "Modern Zen",
    image: MTKTC4,
    desc: "Phong cách Nhật tối giản, kết hợp không gian xanh và cửa gỗ ấm áp. Rất phù hợp với gia đình yêu sự nhẹ nhàng, yên bình.",
  },

  {
    title: "Nhà vườn 1 tầng – Hòa Quý",
    size: "10 x 20m",
    style: "Sân vườn nghỉ dưỡng",
    image: MTKTC5,
    desc: "Kiểu nhà vườn thoáng rộng, kết nối thiên nhiên tối đa. Phù hợp với gia đình ưa không gian sống chậm, thư thái.",
  },

  {
    title: "Nhà phố 3 tầng – Kinh doanh nhỏ",
    size: "5 x 20m",
    style: "Hiện đại kính lớn",
    image: MTKTC6,
    desc: "Mặt tiền bo cong mềm mại, kết hợp ánh sáng tự nhiên. Không gian đa năng có thể vừa ở vừa kinh doanh nhỏ.",
  },
];

const faqData = [
  {
    q: "Chi phí thiết kế nhà phố tại Đà Nẵng là bao nhiêu?",
    a: "Đơn giá tham khảo từ 150.000 – 350.000 đ/m² tùy gói. Kiến trúc sư sẽ báo giá chính xác sau khi khảo sát thực tế diện tích, địa hình và yêu cầu phong cách của gia chủ.",
  },
  {
    q: "Thời gian hoàn thành hồ sơ thiết kế mất bao lâu?",
    a: "Thông thường từ 15–25 ngày làm việc cho 1 hồ sơ thiết kế nhà phố đầy đủ, tùy quy mô và mức độ chỉnh sửa.",
  },
  {
    q: "Thiết kế có bao gồm phong thủy và điện nước không?",
    a: "Gói thiết kế full bao gồm kiến trúc, kết cấu và điện nước cơ bản. Phong thủy sẽ được tư vấn phù hợp với tuổi và hướng nhà của gia chủ.",
  },
  {
    q: "Tôi có được chỉnh sửa bản vẽ không?",
    a: "Trong quá trình làm việc, anh/chị được xem và góp ý ở các bước concept, mặt bằng công năng và phối cảnh 3D cho đến khi thống nhất phương án cuối cùng.",
  },
  {
    q: "Nguyễn Hải có hỗ trợ xin phép xây dựng và thi công trọn gói không?",
    a: "Chúng tôi có dịch vụ xin phép xây dựng và thi công trọn gói tại Đà Nẵng. Anh/chị có thể chọn theo từng hạng mục tùy nhu cầu.",
  },
];

const Residence_StreetHouse = () => {
  useEffect(() => {
    document.title =
      "Thiết kế nhà phố đẹp Đà Nẵng | KIẾN TẠO KHÔNG GIAN, NÂNG TẦM GIÁ TRỊ";
  }, []);

  const [activeFaq, setActiveFaq] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null); // trạng thái ảnh lightbox

  // mở lightbox
  const openLightbox = (src) => {
    setLightboxImg(src);
  };

  const closeLightbox = () => {
    setLightboxImg(null);
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bạn có thể thay bằng gọi API gửi lead
    alert(
      "Cảm ơn anh/chị đã để lại thông tin. Kiến trúc sư của chúng tôi sẽ liên hệ trong thời gian sớm nhất!"
    );
  };

  return (
    <div className="streethouse-page">
      {/* ===== HERO ===== */}
      <section className="streethouse-hero" id="top">
        <div className="streethouse-hero-inner container">
          <div className="streethouse-hero-text">
            <p className="hero-tag">Dịch vụ thiết kế nhà phố tại Đà Nẵng</p>
            <h1>Thiết Kế Nhà Phố Đẹp Đà Nẵng</h1>
            <p className="hero-slogan">KIẾN TẠO KHÔNG GIAN, NÂNG TẦM GIÁ TRỊ</p>
            <p className="hero-desc">
              Đội ngũ kiến trúc sư Nguyễn Hải đồng hành từ ý tưởng đến hồ sơ kỹ
              thuật, tối ưu công năng – thẩm mỹ – chi phí thi công cho nhà phố
              tại Đà Nẵng.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href={`tel:0978999043`}>
                Tư Vấn Miễn Phí: 0978 999 043
              </a>
              <button
                className="btn-ghost"
                type="button"
                onClick={() => scrollToId("gallery")}
              >
                Xem mẫu nhà phố
              </button>
            </div>
          </div>

          <div className="streethouse-hero-images">
            <figure className="hero-main-img">
              <img
                src={heroMain}
                alt="Thiết kế Nhà Phố Đẹp Đà Nẵng - Nguyễn Hải Design & Build"
                width={1400}
                height={900}
                loading="eager"
                decoding="async"
              />
            </figure>

            <figure className="hero-secondary-img">
              {/* nếu sau này ní muốn thêm ảnh phụ thì đặt src vào đây */}
            </figure>

            <div className="hero-badge">
              <span>10+</span>
              <p>
                Năm kinh nghiệm
                <br />
                thiết kế & thi công
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LÝ DO THIẾT KẾ NHÀ PHỐ ===== */}
      <section className="section container" id="reasons">
        <h2 className="section-title">
          Vì sao nên chọn Nguyễn Hải là đơn vị thiết kế nhà phố?
        </h2>
        <p className="section-intro">
          Thiết kế bài bản ngay từ đầu giúp anh/chị tránh phát sinh, tối ưu diện
          tích và tạo nên không gian sống thật sự khác biệt giữa lòng Đà Nẵng.
        </p>
        <div className="reason-grid">
          <div className="reason-card">
            <div className="icon">🏙️</div>
            <h3>Tối ưu diện tích nhà ống</h3>
            <p>
              Bố trí không gian khoa học cho mặt tiền hẹp, chiều sâu lớn – hạn
              chế cảm giác bí bách, thiếu sáng.
            </p>
          </div>
          <div className="reason-card">
            <div className="icon">🌞</div>
            <h3>Ánh sáng & thông gió tự nhiên</h3>
            <p>
              Thiết kế giếng trời, cửa sổ, ban công và khoảng lùi hợp lý giúp
              nhà luôn thoáng mát.
            </p>
          </div>
          <div className="reason-card">
            <div className="icon">🧭</div>
            <h3>Phong thủy hài hòa</h3>
            <p>
              Tư vấn hướng, vị trí bếp, phòng ngủ, cầu thang… theo tuổi và nhu
              cầu của gia chủ.
            </p>
          </div>
          <div className="reason-card">
            <div className="icon">💰</div>
            <h3>Kiểm soát chi phí thi công</h3>
            <p>
              Có bản vẽ chi tiết giúp bóc tách khối lượng rõ ràng, dễ so sánh
              báo giá, tránh đội chi phí.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PHONG CÁCH THIẾT KẾ ===== */}
      <section className="section section-soft" id="styles">
        <div className="container">
          <h2 className="section-title">
            Phong cách thiết kế nhà phố phổ biến
          </h2>
          <p className="section-intro">
            Nguyễn Hải phát triển nhiều phong cách khác nhau, phù hợp gu thẩm mỹ
            và ngân sách của từng gia đình.
          </p>
          <div className="style-grid">
            <div className="style-card">
              <h3>Nhà phố hiện đại</h3>
              <p>
                Đường nét đơn giản, mảng khối rõ, ưu tiên kính lớn và ban công
                thoáng, phù hợp gia đình trẻ.
              </p>
            </div>
            <div className="style-card">
              <h3>Nhà phố tân cổ điển</h3>
              <p>
                Mặt tiền sang trọng với phào chỉ, cột, mái vòm nhẹ – phù hợp vị
                trí mặt tiền đẹp, nhu cầu nổi bật.
              </p>
            </div>
            <div className="style-card">
              <h3>Nhà phố Scandinavian</h3>
              <p>
                Tông màu sáng, vật liệu tự nhiên, ít chi tiết – mang lại cảm
                giác nhẹ nhàng, thư giãn.
              </p>
            </div>
            <div className="style-card">
              <h3>Nhà phố kết hợp kinh doanh</h3>
              <p>
                Tầng trệt dành cho cửa hàng, showrom hoặc văn phòng; các tầng
                trên là không gian ở tiện nghi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUY TRÌNH ===== */}
      <section className="section container" id="process">
        <h2 className="section-title">Quy trình thiết kế nhà phố</h2>
        <p className="section-intro">
          Quy trình 6 bước rõ ràng giúp anh/chị dễ theo dõi, đồng hành cùng kiến
          trúc sư trong từng giai đoạn.
        </p>
        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Tư vấn & lấy yêu cầu</h3>
              <p>
                Trao đổi nhu cầu, phong cách mong muốn, số lượng phòng và mức
                chi phí dự kiến.
              </p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Khảo sát hiện trạng</h3>
              <p>
                Đo đạc, chụp ảnh lô đất, kiểm tra hạ tầng, quy hoạch khu vực tại
                Đà Nẵng.
              </p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Mặt bằng công năng</h3>
              <p>
                Bố trí phòng khách, bếp, phòng ngủ, vệ sinh, cầu thang, sân
                thượng… tối ưu diện tích.
              </p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Thiết kế 3D</h3>
              <p>
                Lên phối cảnh 3D mặt tiền và nội thất giúp anh/chị hình dung rõ
                ngôi nhà tương lai.
              </p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">05</div>
            <div className="step-content">
              <h3>Hồ sơ kỹ thuật chi tiết</h3>
              <p>
                Hoàn thiện hồ sơ kiến trúc, kết cấu, điện nước để đội thi công
                triển khai dễ dàng.
              </p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">06</div>
            <div className="step-content">
              <h3>Bàn giao & hỗ trợ thi công</h3>
              <p>
                Bàn giao hồ sơ, hỗ trợ giải đáp trong quá trình thi công; có thể
                nâng cấp lên gói thi công trọn gói.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BẢNG GIÁ ===== */}
      <section className="section section-soft" id="pricing">
        <div className="container">
          <h2 className="section-title">
            Bảng giá thiết kế nhà phố tại Đà Nẵng
          </h2>
          <p className="section-intro">
            Đơn giá dưới đây mang tính tham khảo. Mỗi khu đất và yêu cầu thiết
            kế sẽ có mức chi phí phù hợp riêng.
          </p>

          <div className="pricing-table-wrapper">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Hạng mục</th>
                  <th>Đơn giá tham khảo</th>
                  <th>Mô tả</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thiết kế ngoại thất</td>
                  <td>150.000 – 180.000 đ/m²</td>
                  <td>Phối cảnh mặt tiền + hồ sơ bản vẽ kiến trúc cơ bản.</td>
                </tr>
                <tr>
                  <td>Thiết kế nội thất</td>
                  <td>180.000 – 250.000 đ/m²</td>
                  <td>
                    3D nội thất + bản vẽ kỹ thuật thi công từng không gian.
                  </td>
                </tr>
                <tr>
                  <td>Hồ sơ thiết kế full</td>
                  <td>250.000 – 350.000 đ/m²</td>
                  <td>
                    Gồm kiến trúc, kết cấu, điện nước – phù hợp thi công trọn
                    gói, hạn chế phát sinh.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="pricing-note">
              <strong>Ghi chú:</strong> Đơn giá trên chỉ mang tính tham khảo.
              Kiến trúc sư sẽ báo giá chính xác sau khi khảo sát thực tế diện
              tích, địa hình và yêu cầu phong cách của gia chủ.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section container" id="gallery">
        <h2 className="section-title">
          Một số mẫu thiết kế & thi công nhà phố đẹp tại Đà Nẵng
        </h2>
        <p className="section-intro">
          Một số mẫu nhà phố Nguyễn Hải đã tư vấn và thiết kế, giúp anh/chị dễ
          hình dung phong cách phù hợp với mình.
        </p>
        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <article className="gallery-card" key={idx}>
              <div
                className="gallery-img-dv-tknd"
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={() => openLightbox(item.image)}
              />
              <div className="gallery-body">
                <h3>{item.title}</h3>
                <p className="gallery-meta">
                  Phong cách: <strong>{item.style}</strong>
                </p>
                <p className="gallery-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== LIGHTBOX  ===== */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <img
            src={lightboxImg}
            alt="Preview"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>
        </div>
      )}

      {/* ===== CAM KẾT ===== */}
      <section className="section section-soft" id="commit">
        <div className="container">
          <h2 className="section-title">Cam kết từ Nguyễn Hải</h2>
          <div className="commit-grid">
            <div className="commit-card">
              <h3>Công năng thông minh</h3>
              <p>
                Mỗi mét vuông đều được tính toán kỹ, đảm bảo vừa đẹp vừa tiện
                nghi cho sinh hoạt hàng ngày.
              </p>
            </div>
            <div className="commit-card">
              <h3>Hồ sơ dễ thi công</h3>
              <p>
                Bản vẽ rõ ràng, chi tiết; đội thi công dễ đọc – hạn chế hiểu
                nhầm, giảm rủi ro phát sinh.
              </p>
            </div>
            <div className="commit-card">
              <h3>Đồng hành trọn vẹn</h3>
              <p>
                Kiến trúc sư theo sát từ lúc lên ý tưởng đến khi hoàn thiện, hỗ
                trợ tư vấn trong suốt quá trình.
              </p>
            </div>
            <div className="commit-card">
              <h3>Linh hoạt ngân sách</h3>
              <p>
                Đề xuất nhiều phương án vật liệu & giải pháp thi công để phù hợp
                với khả năng đầu tư của anh/chị.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section container" id="faq">
        <h2 className="section-title">Câu hỏi thường gặp</h2>
        <div className="faq-list">
          {faqData.map((item, idx) => {
            const isActive = activeFaq === idx;
            return (
              <div className={`faq-item ${isActive ? "active" : ""}`} key={idx}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() =>
                    setActiveFaq((prev) => (prev === idx ? null : idx))
                  }
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">{isActive ? "−" : "+"}</span>
                </button>
                {isActive && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FORM LIÊN HỆ ===== */}
      <ContactForm />

      {/* ===== LIÊN HỆ & BẢN ĐỒ ===== */}
      <section className="section container" id="contact-info">
        <h2 className="section-title">Thông tin về chúng tôi</h2>
        <div className="contact-info-grid">
          <div>
            <h3>Nguyễn Hải Design &amp; Build</h3>
            <p>
              <strong>Địa chỉ:</strong> 17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà
              Nẵng.
            </p>
            <p>
              <strong>Điện thoại:</strong>{" "}
              <a href="tel:0978999043" className="link-strong">
                0978 999 043
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:hotro.nguyenhai.com.vn@gmail.com"
                className="link-strong"
              >
                hotro.nguyenhai.com.vn@gmail.com
              </a>
            </p>
            <p>
              <strong>Thời gian làm việc:</strong> 8h00 – 17h30, Thứ 2 – Thứ 7.
            </p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Bản đồ Nguyễn Hải Design & Build"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5198370690014!2d108.21867999999999!3d16.0384921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ebcbd51bd5%3A0x8e876b8c5e887aad!2zQ8O0bmcgdHkgVE5ISCBNVFYgUENEIE5HVVnhu4ROIEjhuqJJ!5e0!3m2!1svi!2s!4v1763026919138!5m2!1svi!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ====================== CTA STREET HOUSE ====================== */}
      <section className="rs-section rs-cta" id="contact">
        <div className="rs-container rs-cta__box">
          <div className="rs-cta__content">
            <div className="rs-eyebrow rs-eyebrow--light">BẮT ĐẦU NGAY</div>

            <h2 className="rs-sec-title">
              Thiết kế nhà phố đẹp – tối ưu công năng & thẩm mỹ
            </h2>

            <p>Nhận bản vẽ &amp; báo giá chi tiết hoàn toàn miễn phí.</p>
          </div>

          <div className="rs-cta__actions">
            <a
              className="rs-btn rs-btn--primary"
              href={`tel:${BRAND.hotlineRaw}`}
            >
              Gọi: {BRAND.hotline}
            </a>

            <a
              className="rs-btn rs-btn--ghost"
              href={`https://zalo.me/${BRAND.hotlineRaw}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Residence_StreetHouse;
