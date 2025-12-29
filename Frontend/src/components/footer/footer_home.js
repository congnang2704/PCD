import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { GlobalOutlined, MailOutlined } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import logo from "../../assets/logopcdnguyenhai.webp";
import "./footer_home.css";

const { Footer } = Layout;
const { Text } = Typography;

const FooterHome = () => (
  <Footer className="footer-home" role="contentinfo">
    <div className="footer-container">
      <Row gutter={[24, 16]} justify="space-between" align="top">
        {/* Cột 1 */}
        <Col xs={24} md={10} className="footer-col">
          <div className="footer-stack">
            <img
              src={logo}
              alt="Logo Nguyễn Hải"
              className="footer-logo"
              width={220}
              height={58}
              decoding="async"
              // Nếu footer đôi khi lọt viewport (màn nhỏ / trang ngắn) thì eager sẽ giảm rủi ro CLS.
              // Nếu chắc chắn footer luôn dưới fold, bạn có thể đổi lại "lazy".
              loading="eager"
              fetchpriority="low"
            />

            <h2 className="footer-heading">
              CÔNG TY TNHH THIẾT KẾ VÀ XÂY DỰNG NGUYỄN HẢI
            </h2>

            <p className="footer-subtitle">
              KIẾN TẠO KHÔNG GIAN, NÂNG TẦM GIÁ TRỊ
            </p>

            <p className="footer-text">
              Nguyễn Hải – đơn vị thiết kế và thi công trọn gói uy tín tại miền
              Trung.
            </p>
          </div>
        </Col>

        {/* Cột 2 */}
        <Col xs={24} sm={12} md={7} className="footer-col">
          <h2 className="footer-heading">THÔNG TIN LIÊN HỆ</h2>

          <div className="footer-list">
            <div className="footer-item">
              <span className="footer-icon-wrap">
                <FaLocationDot className="footer-icon" />
              </span>
              <Text className="footer-link-text">
                17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng
              </Text>
            </div>

            <div className="footer-item">
              <span className="footer-icon-wrap">
                <FaPhoneAlt className="footer-icon" />
              </span>
              <a className="footer-anchor" href="tel:0978999043">
                0978 999 043
              </a>
              <span className="footer-sep">-</span>
              <a className="footer-anchor" href="tel:0905402989">
                0905 402 989
              </a>
            </div>

            <div className="footer-item">
              <span className="footer-icon-wrap">
                <MailOutlined className="footer-icon antd-icon" />
              </span>
              <a
                className="footer-anchor"
                href="mailto:hotro.nguyenhai.com.vn@gmail.com"
              >
                hotro.nguyenhai.com.vn@gmail.com
              </a>
            </div>

            <div className="footer-item">
              <span className="footer-icon-wrap">
                <GlobalOutlined className="footer-icon antd-icon" />
              </span>
              <a
                href="https://thicongnhadanang.vn"
                className="footer-anchor"
                target="_blank"
                rel="noreferrer"
              >
                thicongnhadanang.vn
              </a>
            </div>

            <div className="footer-item">
              <span className="footer-icon-wrap">
                <GlobalOutlined className="footer-icon antd-icon" />
              </span>
              <a
                href="https://nguyenhai.com.vn"
                className="footer-anchor"
                target="_blank"
                rel="noreferrer"
              >
                nguyenhai.com.vn
              </a>
            </div>
          </div>
        </Col>

        {/* Cột 3 */}
        <Col xs={24} sm={12} md={7} className="footer-col">
          <h2 className="footer-heading">CHÍNH SÁCH</h2>

          <div className="footer-links">
            <a href="/chinh-sach-bao-mat" className="footer-link">
              Chính sách bảo mật
            </a>
            <a href="/chinh-sach-bao-hanh" className="footer-link">
              Chính sách bảo hành
            </a>
          </div>

          <div className="footer-links">
            <a href="/gioi-thieu" className="footer-link">
              Về chúng tôi
            </a>
            <a href="/nhan-su" className="footer-link">
              Nhân sự Nguyễn Hải
            </a>
            <a href="/lien-he" className="footer-link">
              Liên hệ
            </a>
          </div>
        </Col>
      </Row>

      <div className="footer-bottom">
        <Text className="footer-bottom-text">
          SINCE 2012 · PCD NGUYEN HAI CO., LTD <br /> Design &amp; Build
        </Text>
      </div>
    </div>
  </Footer>
);

export default React.memo(FooterHome);
