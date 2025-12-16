// IntroductionHome.jsx
import React, { useState } from "react";
import "./Introduction.css";
import { Row, Col } from "antd";
import { HomeOutlined, RiseOutlined } from "@ant-design/icons";

/* ẢNH BANNER NỘI BỘ (STATIC) */
import banner3 from "../../../../assets/banner/2.webp";
import TKCL from "../../../../assets/banner/hero.webp";

/* ẢNH INTRO BÊN PHẢI */
const mapImage = TKCL;

const HERO_BANNER = {
  image: banner3,
  title: "Thiết kế & Thi công nhà đẹp Đà Nẵng – Nguyễn Hải Design & Build",
};

const IntroductionHome = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="intro-home" aria-labelledby="nh-home-title">
      {/* ===== HERO – LCP chính ===== */}
      <div className="intro-slider-wrap">
        <div className="intro-slide">
          <img
            src={HERO_BANNER.image}
            alt={HERO_BANNER.title}
            className="intro-slide-image"
            loading="eager"
            decoding="async"
            width={1580}
            height={691}
          />
        </div>
      </div>

      {/* ===== INTRO TEXT + IMAGE ===== */}
      <div className="intro-container">
        <Row gutter={[32, 24]} align="middle" className="intro-section">
          {/* LEFT TEXT */}
          <Col xs={24} lg={12} className="intro-text">
            <header>
              <h1 id="nh-home-title" className="home-hero__intro-title">
                NGUYỄN HẢI DESIGN &amp; BUILD
              </h1>
              <p className="home-hero__intro-subtitle">
                "KIẾN TẠO KHÔNG GIAN, NÂNG TẦM GIÁ TRỊ"
              </p>
            </header>

            <p className="intro-paragraph">
              Công ty TNHH MTV PCD Nguyễn Hải là một doanh nghiệp được thành lập
              theo quyết định số 0401518783 ngày 22 tháng 11 năm 2011 của Sở Kế
              Hoạch và Đầu Tư thành phố Đà Nẵng. Công ty hoạt động ở lĩnh vực
              Kiến Trúc &amp; Xây Dựng với mong muốn góp phần cho công cuộc công
              nghiệp hóa, hiện đại hóa đất nước.
            </p>

            <div
              className={`intro-paragraph-more ${showMore ? "show" : "hide"}`}
            >
              <p className="intro-paragraph">
                Bên cạnh việc chính là tạo ra các sản phẩm cho ngành xây dựng,
                công ty còn là nơi hội tụ đông đảo Thạc sỹ, Kiến trúc sư và Kỹ
                sư…
              </p>
              <p className="intro-paragraph">
                NGUYỄN HẢI CO., LTD theo đuổi chiến lược phát triển bền vững,
                cung cấp dịch vụ thiết kế – thi công – giám sát – đấu thầu – dự
                án, nội ngoại thất, công trình dân dụng – công nghiệp.
              </p>
              <p className="intro-paragraph">
                Chúng tôi luôn hướng đến giá trị cộng đồng và mô hình "kiến trúc
                bền vững".
              </p>
            </div>

            <button
              onClick={() => setShowMore((s) => !s)}
              className="intro-toggle"
            >
              {showMore ? "Thu gọn" : "Xem thêm"}
            </button>

            {/* FEATURES */}
            <div className="intro-features">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12} className="feature-item">
                  <HomeOutlined className="feature-icon" />
                  <h3 className="feature-title">Thiết kế hiện đại</h3>
                  <p className="feature-paragraph">
                    Mẫu nhà/biệt thự sáng tạo, tinh tế, tối ưu công năng.
                  </p>
                </Col>
                <Col xs={24} md={12} className="feature-item">
                  <RiseOutlined className="feature-icon" />
                  <h3 className="feature-title">Chất lượng uy tín</h3>
                  <p className="feature-paragraph">
                    Đảm bảo chất lượng từ thiết kế, thi công đến bảo hành.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>

          {/* RIGHT IMAGE */}
          <Col xs={24} lg={12} className="intro-image">
            <img
              src={mapImage}
              alt="NGUYỄN HẢI CO., LTD"
              className="intro-image-img"
              loading="lazy"
              decoding="async"
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default IntroductionHome;
