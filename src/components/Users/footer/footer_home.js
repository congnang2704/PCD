import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import { StarFilled } from "@ant-design/icons";
import logo from "../../../assets/logo_chuan_19062025.png";
import "./footer_home.css";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerStyle = {
  backgroundColor: "#016bb4",
  padding: "40px 20px 20px 20px",
};

const titleStyle = {
  color: "#fff",
  marginBottom: "16px",
  textTransform: "uppercase",
};

const textStyle = {
  color: "#fff",
  marginBottom: "8px",
  display: "block",
};

const linkStyle = {
  marginBottom: "8px",
  display: "block",
};

const contactTextStyle = {
  color: "#fff",
};

const contactIconStyle = {
  color: "#fff",
};

const FooterHome = () => (
  <Footer style={footerStyle} className="footer-home">
    <Row gutter={[48, 48]} justify="center">
      {/* Logo và mô tả */}
      <Col xs={24} md={8}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <img
              src={logo}
              alt="Logo"
              style={{
                maxWidth: "250px",
                height: "auto",
                borderRadius: 10,
                marginBottom: "20px",
              }}
            />
            <Title level={5} style={titleStyle}>
              Công ty TNHH Thiết kế và Xây dựng NGUYỄN HẢI
            </Title>
            <Text style={textStyle}>
              NGUYỄN HẢI CO., LTD đơn vị thiết kế thi công trọn gói miền Trung
              và miền Nam
            </Text>
            <Title level={5} style={titleStyle}>
              Thông tin liên hệ
            </Title>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Địa chỉ: Trụ sở chính */}
              <Space align="start">
                <StarFilled style={{ ...contactIconStyle, marginTop: "4px" }} />
                <Text style={contactTextStyle}>
                  Trụ sở chính: 17 Nguyễn Cư Trinh, Phường Hòa Cường, Thành phố
                  Đà Nẵng
                </Text>
              </Space>
              {/* ĐT: liên hệ 0935 123 456 */}
              <Space align="start">
                <StarFilled
                  style={{
                    ...contactIconStyle,
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                />
                <Text style={contactTextStyle}>
                  Điện thoại: 0905 402 989 - 0905 402 989
                </Text>
              </Space>
              {/* Mail thicongnhadanang.vn@gmail.com */}
              <Space align="start">
                <StarFilled style={{ ...contactIconStyle, marginTop: "4px" }} />
                <Text style={contactTextStyle}>
                  Email: thicongnhadanang.vn@gmail.com
                </Text>
              </Space>
              {/* Web thicongnhadanang.vn */}
              <Space align="start">
                <StarFilled
                  style={{
                    ...contactIconStyle,
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                />
                <Text style={contactTextStyle}>
                  Website: thicongnhadanang.vn
                </Text>
              </Space>
              {/* web nguyenhai.com.vn */}
              <Space align="start">
                <StarFilled
                  style={{
                    ...contactIconStyle,
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                />
                <Text style={contactTextStyle}>Website: nguyenhai.com.vn</Text>
              </Space>
            </div>
          </div>
        </Space>
      </Col>

      {/* Dịch vụ và mẫu nhà */}
      <Col xs={24} md={6}>
        <Space direction="vertical" size="small">
          <div>
            <Title level={5} style={titleStyle}>
              Dịch vụ
            </Title>
            <Link href="/dich-vu/thiet-ke-noi-that" style={linkStyle}>
              Thiết kế nội thất
            </Link>
            <Link href="/dich-vu/thiet-ke-kien-truc" style={linkStyle}>
              Thiết kế kiến trúc
            </Link>
            <Link href="/dich-vu/thi-cong-tho" style={linkStyle}>
              Thi công công trình thô
            </Link>
            <Link href="/dich-vu/thi-cong-hoan-thien" style={linkStyle}>
              Thi công công trình hoàn thiện
            </Link>
            <Link href="/dich-vu/xay-nha-tron-goi" style={linkStyle}>
              Thi công xây nhà trọn gói
            </Link>
          </div>

          <div>
            <Title level={5} style={titleStyle}>
              Mẫu nhà đẹp
            </Title>
            <Link href="/mau-nha-dep/nha-2-tang" style={linkStyle}>
              Nhà 2 tầng
            </Link>
            <Link href="/mau-nha-dep/nha-3-tang" style={linkStyle}>
              Nhà 3 tầng
            </Link>
            <Link href="/mau-nha-dep/nha-5-tang" style={linkStyle}>
              Nhà 5 tầng
            </Link>
            <Link href="/mau-nha-dep/biet-thu" style={linkStyle}>
              Biệt thự
            </Link>
            <Link href="/mau-nha-dep/khach-san" style={linkStyle}>
              Căn hộ, khách sạn
            </Link>
          </div>
        </Space>
      </Col>

      {/* Chính sách và thông tin thêm */}
      <Col xs={24} md={4}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={5} style={titleStyle}>
              Chính sách
            </Title>
            <Link href="/chinh-sach-bao-mat" style={linkStyle}>
              Chính sách bảo mật
            </Link>
            <Link href="/chinh-sach-bao-hanh" style={linkStyle}>
              Chính sách bảo hành
            </Link>
          </div>
          <div>
            <Title level={5} style={titleStyle}>
              NGUYỄN HẢI CO., LTD Running
            </Title>
            <Link href="/gioi-thieu" style={linkStyle}>
              Về chúng tôi
            </Link>
            <Link href="/lich-su" style={linkStyle}>
              Lịch sử hình thành
            </Link>
            <Link href="/dich-vu" style={linkStyle}>
              Dịch vụ
            </Link>
            <Link href="/tuyen-dung" style={linkStyle}>
              Tuyển dụng
            </Link>
            <Link href="/lien-he" style={linkStyle}>
              Liên hệ
            </Link>
          </div>
        </Space>
      </Col>
    </Row>

    <div style={{ marginTop: "20px", paddingTop: "10px", textAlign: "center" }}>
      <Text style={{ color: "#fff" }}>
        Since 2012 NGUYEN HAI CO., LTD Design & Build - nguyenhai.com.vn
      </Text>
    </div>
  </Footer>
);

export default FooterHome;
