import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import { StarFilled } from "@ant-design/icons";
import logo from "../../../assets/logo_chuan_19062025.png";
import "./footer_home.css";

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
                <StarFilled className="footer-icon" />
                <Text className="footer-contact">
                  Trụ sở chính: 17 Nguyễn Cư Trinh, Phường Hòa Cường, Thành phố
                  Đà Nẵng
                </Text>
              </Space>
              <Space align="start">
                <StarFilled className="footer-icon" />
                <Text className="footer-contact">
                  Điện thoại: 0905 402 989 - 0905 402 989
                </Text>
              </Space>
              <Space align="start">
                <StarFilled className="footer-icon" />
                <Text className="footer-contact">
                  Email: nguyenhai.deco@gmail.com
                </Text>
              </Space>
              <Space align="start">
                <StarFilled className="footer-icon" />
                <Text className="footer-contact">
                  Website: thicongnhadanang.vn
                </Text>
              </Space>
              <Space align="start">
                <StarFilled className="footer-icon" />
                <Text className="footer-contact">
                  Website: nguyenhai.com.vn
                </Text>
              </Space>
            </div>
          </div>
        </Space>
      </Col>

      {/* Dịch vụ và mẫu nhà */}
      <Col xs={24} md={6} className="footer-section services-houses">
        <Space direction="vertical" size="small">
          <div>
            <Title level={5} className="footer-title">
              Dịch vụ
            </Title>
            <Link href="/dich-vu/thiet-ke-noi-that" className="footer-link">
              Thiết kế nội thất
            </Link>
            <Link href="/dich-vu/thiet-ke-kien-truc" className="footer-link">
              Thiết kế kiến trúc
            </Link>
            <Link href="/dich-vu/thi-cong-tho" className="footer-link">
              Thi công công trình thô
            </Link>
            <Link href="/dich-vu/thi-cong-hoan-thien" className="footer-link">
              Thi công công trình hoàn thiện
            </Link>
            <Link href="/dich-vu/xay-nha-tron-goi" className="footer-link">
              Thi công xây nhà trọn gói
            </Link>
          </div>

          <div>
            <Title level={5} className="footer-title">
              Mẫu nhà đẹp
            </Title>
            <Link href="/mau-nha-dep/nha-2-tang" className="footer-link">
              Nhà 2 tầng
            </Link>
            <Link href="/mau-nha-dep/nha-3-tang" className="footer-link">
              Nhà 3 tầng
            </Link>
            <Link href="/mau-nha-dep/nha-5-tang" className="footer-link">
              Nhà 5 tầng
            </Link>
            <Link href="/mau-nha-dep/biet-thu" className="footer-link">
              Biệt thự
            </Link>
            <Link href="/mau-nha-dep/khach-san" className="footer-link">
              Căn hộ, khách sạn
            </Link>
          </div>
        </Space>
      </Col>

      {/* Chính sách và thông tin thêm */}
      <Col xs={24} md={4} className="footer-section policy-info">
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
              NGUYỄN HẢI CO., LTD Running
            </Title>
            <Link href="/gioi-thieu" className="footer-link">
              Về chúng tôi
            </Link>
            <Link href="/lich-su" className="footer-link">
              Lịch sử hình thành
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
        Since 2012 NGUYEN HAI CO., LTD Design & Build - nguyenhai.com.vn
      </Text>
    </div>
  </Footer>
);

export default FooterHome;
