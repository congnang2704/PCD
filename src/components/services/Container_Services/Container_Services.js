import React from "react";
import "./Container_Services.css";
import { Row, Col, Image, Grid, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ContactForm from "../../view/Mail/ContactFormMail";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

const bannerImage =
  "https://png.pngtree.com/background/20230516/original/pngtree-construction-cranes-at-a-construction-site-under-blue-sky-and-clouds-picture-image_2600880.jpg";

const posts = [
  {
    img: require("../../../assets/anh_services/anh (1).jpg"),
    title: "Công ty thiết kế thi công nội thất Thủ Đức uy tín và Báo giá",
    desc: "Bạn đang tìm kiếm một đơn vị thiết kế thi công nội thất Thủ Đức uy tín để hiện thực hóa không gian sống lý tưởng? Đủ là nhà...",
  },
  {
    img: require("../../../assets/anh_services/anh (2).jpg"),
    title: "Thiết kế thi công nội thất quận 10 uy tín và Báo giá",
    desc: "Đã có gần 7 năm kinh nghiệm, Nguyễn Hải là lựa chọn thiết kế thi công nội thất quận 10, hiện thực hóa ngôi...",
  },
  {
    img: require("../../../assets/anh_services/anh (3).jpg"),
    title: "Công ty thiết kế nội thất quận 8 và thi công trọn gói uy tín",
    desc: "Nguyễn Hải là lựa chọn đáng tin cậy cho những ai đang muốn kiến tạo không gian sống tại quận 8.",
  },
  {
    img: require("../../../assets/anh_services/anh (4).jpg"),
    title: "Thi công nội thất nhà phố tại Đà Nẵng chuyên nghiệp",
    desc: "Đội ngũ thi công giàu kinh nghiệm giúp hoàn thiện nhanh chóng và đạt chuẩn chất lượng cao.",
  },
  {
    img: require("../../../assets/anh_services/anh (5).jpg"),
    title: "Thiết kế nội thất biệt thự cao cấp tại TP.HCM",
    desc: "Mang đến phong cách sống đẳng cấp với thiết kế nội thất biệt thự sang trọng, tinh tế, đầy cảm hứng.",
  },
  {
    img: require("../../../assets/anh_services/anh (6).jpg"),
    title: "Dịch vụ thiết kế và thi công văn phòng hiện đại",
    desc: "Không gian làm việc sáng tạo, năng suất với dịch vụ thiết kế nội thất văn phòng toàn diện từ Nguyễn Hải.",
  },
];

const { useBreakpoint } = Grid;

const Services = () => {
  const screens = useBreakpoint();
  return (
    <div className="services-page">
      {/* banner */}
      <Row>
        <Col span={24}>
          <Image
            className="responsive-banner"
            width="100%"
            height={screens.xs ? "auto" : "700px"}
            src={bannerImage}
            alt="Banner"
            preview={false}
            style={{ display: "block", objectFit: "cover" }}
          />
        </Col>
      </Row>

      {/* services highlight */}
      <div className="services-highlight">
        <h2 className="services-title">DỊCH VỤ</h2>
        <p className="services-desc">
          Để đáp ứng nhu cầu của khách hàng, Nguyễn Hải cung cấp các dịch vụ
          như: Thiết kế kiến trúc, thi công nhà phố, thiết kế và thi công trọn
          gói,… tại Đà Nẵng và nhiều tỉnh thành khác.
        </p>
      </div>

      {/* services list */}
      <div className="services-grid">
        <Row gutter={[24, 24]}>
          {posts.map((post, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <div className="post-card">
                <img src={post.img} alt={post.title} className="post-image" />
                <div className="post-content">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-desc">{post.desc}</p>
                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    className="post-btn"
                  >
                    Khám phá
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* các câu hỏi thường gặp */}
      <FAQComponent />

      {/* form liên hệ */}
      <ContactForm />
    </div>
  );
};

export default Services;
