import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import { GlobalOutlined, MailOutlined } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../../../assets/logo_chuan_19062025.png";
import "./footer_home.css";
import { FaPhoneAlt } from "react-icons/fa";
import { TiTick, TiTickOutline } from "react-icons/ti";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterHome = () => (
  <Footer className="footer-home">
    <Row gutter={[48, 48]} justify="center">
      {/* Logo và mô tả */}
      <Col xs={24} md={8} className="footer-section logo-description">
        <Space direction="vertical" size="large" className="logo-space">
          <div>
            <img src={logo} alt="Logo" className="footer-logo" />
            <Title level={5} className="footer-title">
              Công ty TNHH Thiết kế và Xây dựng NGUYỄN HẢI
            </Title>
            <Text className="footer-text">
              NGUYỄN HẢI CO., LTD đơn vị thiết kế thi công trọn gói miền Trung
              và miền Nam
            </Text>
            <Title level={5} className="footer-title">
              Thông tin liên hệ
            </Title>
            <div className="footer-contact-list">
              <Space align="start">
                <FaLocationDot className="footer-icon" />
                <Text className="footer-contact">
                  Trụ sở chính: 17 Nguyễn Cư Trinh, Phường Hòa Cường, Thành phố
                  Đà Nẵng
                </Text>
              </Space>
              <Space align="start">
                <FaPhoneAlt className="footer-icon" />
                <Text className="footer-contact">Điện thoại: 0905 402 989</Text>
              </Space>
              <Space align="start">
                <MailOutlined className="footer-icon" />
                <Text className="footer-contact">
                  Email: nguyenhai.deco@gmail.com
                </Text>
              </Space>
              <Space align="start">
                <GlobalOutlined className="footer-icon" />
                <Text className="footer-contact">
                  Website: thicongnhadanang.vn
                </Text>
              </Space>
              <Space align="start">
                <GlobalOutlined className="footer-icon" />
                <Text className="footer-contact">
                  Website: nguyenhai.com.vn
                </Text>
              </Space>
            </div>
          </div>
        </Space>
      </Col>

      {/* Dịch vụ và mẫu nhà */}
      <Col xs={24} md={5} className="footer-section services-houses">
        <Space direction="vertical" size="small">
          <div>
            <Title level={5} className="footer-title">
              Dịch vụ
            </Title>
            <Link href="/dich-vu/thiet-ke-noi-that" className="footer-link">
              <TiTick className="footer-icon" />
              Thiết kế nội thất
            </Link>
            <Link href="/dich-vu/thiet-ke-kien-truc" className="footer-link">
              <TiTick className="footer-icon" />
              Thiết kế kiến trúc
            </Link>
            <Link href="/dich-vu/thi-cong-tho" className="footer-link">
              <TiTick className="footer-icon" />
              Thi công công trình thô
            </Link>
            <Link href="/dich-vu/thi-cong-hoan-thien" className="footer-link">
              <TiTick className="footer-icon" />
              Thi công công trình hoàn thiện
            </Link>
            <Link href="/dich-vu/xay-nha-tron-goi" className="footer-link">
              <TiTick className="footer-icon" />
              Thi công xây nhà trọn gói
            </Link>
          </div>

          <div>
            <Title level={5} className="footer-title">
              Mẫu nhà đẹp
            </Title>
            <Link href="/mau-nha-dep/nha-2-tang" className="footer-link">
              <TiTick className="footer-icon" />
              Nhà 2 tầng
            </Link>
            <Link href="/mau-nha-dep/nha-3-tang" className="footer-link">
              <TiTick className="footer-icon" />
              Nhà 3 tầng
            </Link>
            <Link href="/mau-nha-dep/nha-5-tang" className="footer-link">
              <TiTick className="footer-icon" />
              Nhà 5 tầng
            </Link>
            <Link href="/mau-nha-dep/biet-thu" className="footer-link">
              <TiTick className="footer-icon" />
              Biệt thự
            </Link>
            <Link href="/mau-nha-dep/khach-san" className="footer-link">
              <TiTick className="footer-icon" />
              Căn hộ, khách sạn
            </Link>
          </div>
        </Space>
      </Col>

      {/* Chính sách và thông tin thêm */}
      <Col xs={24} md={5} className="footer-section policy-info">
        <Space direction="vertical" size="large" className="footer-info-space">
          <div>
            <Title level={5} className="footer-title">
              Chính sách
            </Title>
            <Link href="/chinh-sach-bao-mat" className="footer-link">
              Chính sách bảo mật
            </Link>
            <Link href="/chinh-sach-bao-hanh" className="footer-link">
              Chính sách bảo hành
            </Link>
          </div>
          <div>
            <Title level={5} className="footer-title">
              PCD NGUYỄN HẢI CO., LTD
            </Title>
            <Link href="/gioi-thieu" className="footer-link">
              Về chúng tôi
            </Link>
            <Link href="/nhan-su" className="footer-link">
              Nhân sự Nguyễn Hải
            </Link>
            <Link href="/dich-vu" className="footer-link">
              Dịch vụ
            </Link>
            <Link href="/tuyen-dung" className="footer-link">
              Tuyển dụng
            </Link>
            <Link href="/lien-he" className="footer-link">
              Liên hệ
            </Link>
          </div>
        </Space>
      </Col>
    </Row>

    <div className="footer-bottom">
      <Text className="footer-bottom-text">
        SINCE 2012 PCD NGUYEN HAI CO., LTD <br /> Design & Build
      </Text>
    </div>
  </Footer>
);

export default FooterHome;
