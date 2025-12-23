import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import { GlobalOutlined, MailOutlined } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import logo from "../../assets/logopcdnguyenhai.webp";
import "./footer_home.css";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterHome = () => (
  <Footer className="footer-home">
    <div className="footer-container">
      <Row gutter={[24, 16]} justify="space-between" align="top">
        {/* Cột 1: Logo & mô tả */}
        <Col xs={24} md={10} className="footer-col">
          <Space direction="vertical" size={12} className="footer-stack">
            <img
              src={logo}
              alt="Logo Nguyễn Hải"
              className="footer-logo"
              width={220}
              height={58}
              decoding="async"
              loading="lazy"
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
          </Space>
        </Col>

        {/* Cột 2: Thông tin liên hệ */}
        <Col xs={24} sm={12} md={7} className="footer-col">
          <h2 className="footer-heading">THÔNG TIN LIÊN HỆ</h2>
          <div className="footer-list">
            <Space align="start" className="footer-item">
              <FaLocationDot className="footer-icon" />
              <Text className="footer-link-text">
                17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng
              </Text>
            </Space>
            <Space align="start" className="footer-item">
              <FaPhoneAlt className="footer-icon" />
              <Text className="footer-link-text">
                0978 999 043 - 0905 402 989
              </Text>
            </Space>
            <Space align="start" className="footer-item">
              <MailOutlined className="footer-icon" />
              <Text className="footer-link-text">
                hotro.nguyenhai.com.vn@gmail.com
              </Text>
            </Space>
            <Space align="start" className="footer-item">
              <GlobalOutlined className="footer-icon" />
              <a href="https://thicongnhadanang.vn" className="footer-anchor">
                thicongnhadanang.vn
              </a>
            </Space>
            <Space align="start" className="footer-item">
              <GlobalOutlined className="footer-icon" />
              <a href="https://nguyenhai.com.vn" className="footer-anchor">
                nguyenhai.com.vn
              </a>
            </Space>
          </div>
        </Col>

        {/* Cột 3: Chính sách & Liên kết */}
        <Col xs={24} sm={12} md={7} className="footer-col">
          <h1 className="footer-heading">CHÍNH SÁCH</h1>
          <div className="footer-links">
            <Link href="/chinh-sach-bao-mat" className="footer-link">
              Chính sách bảo mật
            </Link>
            <Link href="/chinh-sach-bao-hanh" className="footer-link">
              Chính sách bảo hành
            </Link>
          </div>

          <div className="footer-links">
            <Link href="/gioi-thieu" className="footer-link">
              Về chúng tôi
            </Link>
            <Link href="/nhan-su" className="footer-link">
              Nhân sự Nguyễn Hải
            </Link>
            <Link href="/lien-he" className="footer-link">
              Liên hệ
            </Link>
          </div>
        </Col>
      </Row>

      <div className="footer-bottom">
        <Text className="footer-bottom-text">
          SINCE 2012 · PCD NGUYEN HAI CO., LTD <br /> Design & Build
        </Text>
      </div>
    </div>
  </Footer>
);

export default FooterHome;
