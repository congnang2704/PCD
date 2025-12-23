// export default Container_Abouts;
import React, { useMemo } from "react";
import { Grid } from "antd";

import missionImg from "../../../../assets/tnsm.jpg";
import about_us from "../../../../assets/nenNH.jpg";
import missionThietKeImg1 from "../../../../assets/3-ste.jpg";
import "./Container_Abouts.css";
import ContactForm from "../../../../components/Mail/ContactFormMail/ContactFormMail";
import khaosatthicongImg from "../../../../assets/khaosatthicong.jpg";
import khaosatcaitaoImg from "../../../../assets/khaosatcaitao.jpg";
import quatrinhthicongImg from "../../../../assets/quatrinhthicong.jpg";

// 👉 ẢNH BANNER MỚI: đổi đường dẫn này sang ảnh bạn muốn dùng
import aboutHeroBanner from "../../../../assets/banner/2.webp";

const { useBreakpoint } = Grid;

export default function Container_Abouts() {
  const screens = useBreakpoint();

  const sliderHeight = useMemo(() => {
    if (screens.xs) return 260;
    if (screens.sm) return 420;
    if (screens.md) return 520;
    return 560;
  }, [screens]);

  return (
    <div className="about-theme">
      {/* ===== HERO: DÙNG 1 ẢNH CỐ ĐỊNH ===== */}
      <section className="about-hero" style={{ height: sliderHeight }}>
        <div className="about-hero__slide">
          <img
            src={aboutHeroBanner}
            alt="Nguyễn Hải Design & Build - About Us"
            className="about-hero__img"
            loading="eager"
            style={{ height: sliderHeight }}
          />
        </div>

        <div className="about-hero__overlay">
          <div className="about-hero__content">
            <span className="about-badge">Since 2011</span>
            <h1 className="about-hero__title">Nguyễn Hải Design &amp; Build</h1>
            <p className="about-hero__subtitle">
              Kiến tạo không gian sống chuẩn mực – bền vững – khác biệt.
            </p>
            <a href="#contact" className="about-btn about-btn--primary">
              Liên hệ tư vấn
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="about-stats">
        <div className="about-stats__item">
          <div className="about-stats__num">13+</div>
          <div className="about-stats__label">Năm kinh nghiệm</div>
        </div>
        <div className="about-stats__item">
          <div className="about-stats__num">450+</div>
          <div className="about-stats__label">Công trình hoàn thiện</div>
        </div>
        <div className="about-stats__item">
          <div className="about-stats__num">20+</div>
          <div className="about-stats__label">Tỉnh thành</div>
        </div>
        <div className="about-stats__item">
          <div className="about-stats__num">95</div>
          <div className="about-stats__label">NPS (Khuyến nghị)</div>
        </div>
      </section>

      {/* Intro 2 columns */}
      <section className="about-section">
        <div className="about-grid intro-grid">
          {/* Left: text */}
          <div className="about-card about-card--soft intro-card">
            <div className="intro-head">
              <span className="intro-badge">About</span>
              <h2 className="about-h2 intro-title">Giới thiệu</h2>
            </div>

            <p className="intro-lead">
              Công ty TNHH MTV Nguyễn Hải thành lập ngày 22/11/2011 tại Đà Nẵng.
              Khởi đầu khiêm tốn nhưng kiên định chất lượng, chúng tôi phát
              triển mạnh trong thiết kế kiến trúc &amp; thi công xây dựng tại
              miền Trung và mở rộng hợp tác quốc tế.
            </p>

            <ul className="intro-bullets">
              <li>
                <span className="intro-ico">✓</span> Đội ngũ Thạc sĩ, Kiến trúc
                sư, Kỹ sư giàu kinh nghiệm.
              </li>
              <li>
                <span className="intro-ico">✓</span> Giải bài toán kỹ thuật phức
                tạp dân dụng – công nghiệp – hạ tầng.
              </li>
              <li>
                <span className="intro-ico">✓</span> Quy trình quản trị dự án
                hiện đại, minh bạch &amp; hiệu quả.
              </li>
            </ul>

            <p className="intro-note">
              2015–2020: mở rộng quy mô biệt thự, văn phòng, khách sạn, công
              trình công cộng. <br />
              Từ 2021: hợp tác Mỹ - Hàn - Nhật, nâng cấp quản trị &amp; công
              nghệ thi công.
            </p>
          </div>

          {/* Right: image with frame + ribbon */}
          <figure className="intro-figure">
            <div className="intro-frame">
              <img
                src={about_us}
                alt="CÔNG TY TNHH MTV NGUYỄN HẢI - TRỤ SỞ CHÍNH"
                loading="lazy"
              />
            </div>
            <figcaption className="intro-ribbon">
              CÔNG TY TNHH MTV NGUYỄN HẢI — TRỤ SỞ CHÍNH
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-section">
        <div className="about-grid about-grid--3">
          <div className="about-card">
            <h3 className="about-h3">Sứ mệnh</h3>
            <p>
              Mang đến công trình chất lượng cao, tối ưu công năng và đậm bản
              sắc Việt; tạo môi trường làm việc tốt cho người lao động địa
              phương và đóng góp tích cực cho cộng đồng.
            </p>
          </div>
          <div className="about-card">
            <h3 className="about-h3">Tầm nhìn</h3>
            <p>
              Trở thành tập đoàn đa ngành tiên phong tại miền Trung trong tư vấn
              thiết kế, giám sát, quản lý dự án và thi công, hướng đến Nguyễn
              Hải Group từ 2025 với hệ sinh thái bền vững.
            </p>
          </div>
          <div className="about-card">
            <h3 className="about-h3">Giá trị cốt lõi</h3>
            <ul className="about-bullets">
              <li>Chính trực &amp; Minh bạch</li>
              <li>Sáng tạo &amp; Khác biệt</li>
              <li>Hiệu quả &amp; Bền vững</li>
            </ul>
          </div>
        </div>

        <figure className="about-figure about-figure--wide">
          <img
            src={missionImg}
            alt="TẦM NHÌN - SỨ MỆNH CỦA NGUYỄN HẢI"
            className="about-figure__img"
            loading="lazy"
          />
          <figcaption className="about-figure__cap">
            TẦM NHÌN — SỨ MỆNH CỦA NGUYỄN HẢI
          </figcaption>
        </figure>
      </section>

      {/* Timeline */}
      <section className="about-section">
        <h2 className="about-h2">Cột mốc phát triển</h2>
        <div className="about-timeline">
          <div className="about-timeline__item">
            <div className="about-timeline__dot" />
            <div className="about-timeline__content">
              <h4>2011 — Thành lập</h4>
              <p>Khởi nghiệp tại Đà Nẵng, đặt nền tảng “Design &amp; Build”.</p>
            </div>
          </div>

          <div className="about-timeline__item">
            <div className="about-timeline__dot" />
            <div className="about-timeline__content">
              <h4>2015 – 2020 — Mở rộng</h4>
              <p>
                Tăng trưởng nhân sự &amp; quy mô; triển khai biệt thự, văn
                phòng, khách sạn, công trình công cộng &amp; khu đô thị.
              </p>
            </div>
          </div>

          <div className="about-timeline__item">
            <div className="about-timeline__dot" />
            <div className="about-timeline__content">
              <h4>2021 – Nay — Vươn xa</h4>
              <p>
                Hợp tác Mỹ - Hàn - Nhật, nâng cấp quản trị dự án, chuẩn hoá quy
                trình, tăng cường vật liệu &amp; công nghệ xanh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planning / Services visual */}
      <section className="about-section">
        <h2 className="about-h2">Lập quy hoạch xây dựng</h2>

        <div className="about-grid plan-grid">
          {/* Content card */}
          <div className="about-card plan-card">
            <p className="plan-lead">
              Thực hiện quy hoạch chung, quy hoạch chi tiết, điểm dân cư nông
              thôn… bằng phương pháp tiếp cận linh hoạt và công nghệ hiện đại,
              đảm bảo hiệu quả lâu dài, phù hợp điều kiện địa phương.
            </p>
            <ul className="plan-list">
              <li>
                <span className="plan-ico" aria-hidden="true">
                  ✓
                </span>
                <span>Quy hoạch chung đô thị</span>
              </li>
              <li>
                <span className="plan-ico" aria-hidden="true">
                  ✓
                </span>
                <span>Quy hoạch chi tiết khu chức năng</span>
              </li>
              <li>
                <span className="plan-ico" aria-hidden="true">
                  ✓
                </span>
                <span>Quy hoạch điểm dân cư nông thôn</span>
              </li>
            </ul>
          </div>

          {/* Visual card */}
          <figure className="plan-figure">
            <div className="plan-frame">
              <img
                src={missionThietKeImg1}
                alt="LẬP QUY HOẠCH XÂY DỰNG CỦA NGUYỄN HẢI"
                loading="lazy"
              />
            </div>
            <figcaption className="plan-ribbon">
              LẬP QUY HOẠCH XÂY DỰNG CỦA NGUYỄN HẢI
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Survey gallery */}
      <section className="about-section">
        <h2 className="about-h2">Khảo sát xây dựng</h2>
        <p className="about-lead">
          Bước khởi đầu quyết định chất lượng thiết kế &amp; thi công. Chúng tôi
          khảo sát địa hình, địa chất, hiện trạng và môi trường với thiết bị
          hiện đại &amp; quy trình chuẩn.
        </p>
        <div className="about-gallery">
          <div className="about-thumb">
            <img
              src={khaosatthicongImg}
              alt="Khảo sát thi công"
              loading="lazy"
            />
            <div className="about-thumb__cap">Khảo sát thi công</div>
          </div>
          <div className="about-thumb">
            <img src={khaosatcaitaoImg} alt="Khảo sát cải tạo" loading="lazy" />
            <div className="about-thumb__cap">Khảo sát cải tạo</div>
          </div>
          <div className="about-thumb">
            <img
              src={quatrinhthicongImg}
              alt="Khảo sát quá trình thi công"
              loading="lazy"
            />
            <div className="about-thumb__cap">Khảo sát quá trình thi công</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="about-section">
        <h2 className="about-h2">Dịch vụ</h2>

        {/* Liên hệ + nút hành động */}
        <div id="contact" className="about-card about-contactcard">
          <h3 className="about-h3 about-contact__title">Liên hệ</h3>

          <div className="contact-layout">
            {/* Cột: Thông tin */}
            <ul className="about-contacts contact-list">
              <li>
                <span className="ci ci-pin" aria-hidden="true"></span>
                <span>Địa chỉ: 17 Nguyễn Cư Trinh, Hòa Cường, Đà Nẵng</span>
              </li>
              <li>
                <span className="ci ci-phone" aria-hidden="true"></span>
                <span>
                  Điện thoại: <strong>0978.999.043 - 0905.402.989</strong>
                </span>
              </li>
              <li>
                <span className="ci ci-mail" aria-hidden="true"></span>
                <span>Email: hotro.nguyenhai.com.vn@gmail.com</span>
              </li>
              <li>
                <span className="ci ci-link" aria-hidden="true"></span>
                <span>
                  Website:{" "}
                  <a
                    href="https://thicongnhadanang.vn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    thicongnhadanang.vn
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://nguyenhai.com.vn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    nguyenhai.com.vn
                  </a>
                </span>
              </li>
            </ul>

            {/* Cột: CTA */}
            <div className="contact-actions contact-actions--pretty">
              <a
                className="cta-pill cta-pill--hotline"
                href="tel:0905402989"
                aria-label="Gọi Hotline 0905 402 989"
              >
                <span className="cta-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.6.6 4 .6.6 0 1 .4 1 .9V21c0 .6-.4 1-1 1C10.7 22 2 13.3 2 3c0-.6.4-1 1-1h4.6c.5 0 .9.4.9 1 0 1.4.2 2.8.6 4 .1.4 0 .8-.3 1.1L6.6 10.8z"
                    />
                  </svg>
                </span>
                <span className="cta-text">
                  Gọi Hotline
                  <small>Hỗ trợ ngay</small>
                </span>
                <span className="cta-badge">0905 402 989</span>
              </a>

              <a
                className="cta-pill cta-pill--zalo"
                href="https://zalo.me/0978999043"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat Zalo 0978.999.043"
              >
                <span className="cta-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M4 3h16a1 1 0 011 1v16l-4-3H5a1 1 0 01-1-1V4a1 1 0 010-1zm6.7 11l3.9-6H11l.6-2H18l-4.1 6h3.7l-.6 2h-6.3z"
                    />
                  </svg>
                </span>
                <span className="cta-text">
                  Chat Zalo
                  <small>Phản hồi nhanh</small>
                </span>
                <span className="cta-badge">0978.999.043</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2 cards cân đối, khoảng cách thoáng hơn */}
        <div className="about-grid about-grid--2 svc-grid">
          <div className="about-card about-card--lift svc-card">
            <div className="svc-head">
              <h3 className="about-h3">Thiết kế</h3>
            </div>

            <ul className="about-bullets svc-bullets">
              <li>Kiến trúc – Kết cấu – Điện nước</li>
              <li>Thiết kế nội thất</li>
            </ul>

            <p className="about-note svc-note">
              Mỗi công trình có “dấu vân tay” riêng theo cá tính gia chủ, vẫn
              hài hoà công năng và thẩm mỹ.
            </p>
          </div>

          <div className="about-card about-card--lift svc-card">
            <div className="svc-head">
              <h3 className="about-h3">Thi công</h3>
            </div>

            <ul className="about-bullets svc-bullets">
              <li>Thi công phần thô</li>
              <li>Thi công hoàn thiện</li>
              <li>Xây dựng trọn gói</li>
            </ul>

            <p className="about-note svc-note">
              Cam kết tiến độ, an toàn, kiểm soát chất lượng đa tầng.
            </p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="about-quote">
        <blockquote>
          “Thi công đảm bảo chất lượng Uy Tín và Chuyên Nghiệp. KTS Nhiều Năm
          Kinh Nghiệm.”
        </blockquote>
        <cite>— Nguyễn Hải Design &amp; Build</cite>
      </section>

      {/* Contact */}
      <section className="about-section about-contact">
        <ContactForm />
      </section>
    </div>
  );
}
