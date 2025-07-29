import React from "react";
import { Row, Col, Typography, Button } from "antd";
import Slider from "react-slick";
import "../FeaturedProjects.css";

const { Title, Paragraph } = Typography;

const projects = [
  {
    title: "Nhà phố 3 tầng xanh mát, hiện đại tại Đà Nẵng",
    description:
      "Thiết kế nhà 3 tầng tập trung vào việc tối ưu ánh sáng tự nhiên, gió trời và không gian xanh, mang đến trải nghiệm sống thoáng đãng và thư thái giữa lòng đô thị.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2020/10/CH-e1623381609830.jpg",
    link: "/mau-nha-dep/nha-3-tang",
  },
  {
    title: "Nhà 3 tầng phong cách Nhật Bản tại Đà Nẵng",
    description:
      "Công trình mang hơi hướng Nhật Bản hiện đại, với thiết kế tối giản nhưng tinh tế, chú trọng đến sự yên tĩnh và hài hòa trong từng không gian sống.",
    image: "https://thicongnhadanang.vn/wp-content/uploads/2020/10/LQN.jpg",
    link: "/mau-nha-dep/nha-3-tang",
  },
  {
    title: "Nhà phố 3 tầng thông thoáng, đón nắng gió tại Huế",
    description:
      "Căn nhà phố được thiết kế với khoảng mở linh hoạt, giúp đón gió và ánh sáng tự nhiên xuyên suốt ba tầng, đảm bảo sự thoải mái và tiết kiệm năng lượng.",
    image: "https://thicongnhadanang.vn/wp-content/uploads/2020/10/HQB.jpg",
    link: "/mau-nha-dep/nha-3-tang",
  },
  {
    title: "Nhà 3 tầng sân vườn thoáng rộng tại Đồng Nai",
    description:
      "Thiết kế kết hợp giữa nhà phố và vườn cây xanh, giúp không gian sống chan hòa với thiên nhiên, tạo sự thư giãn và thoải mái cho gia đình nhiều thế hệ.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2020/10/CH-e1623381609830.jpg",
    link: "/mau-nha-dep/nha-3-tang",
  },
  {
    title: "Nhà 3 tầng kết hợp không gian làm việc tiện nghi",
    description:
      "Mẫu nhà phố ba tầng được tích hợp văn phòng làm việc tại gia, đảm bảo tính riêng tư và hiệu quả, đồng thời vẫn giữ được nét ấm cúng của không gian sống.",
    image: "https://thicongnhadanang.vn/wp-content/uploads/2020/10/ATU.jpg",
    link: "/mau-nha-dep/nha-3-tang",
  },
  {
    title: "Nhà phố 3 tầng ven biển với không gian mở",
    description:
      "Thiết kế mở hướng biển giúp tối ưu tầm nhìn, đón gió và ánh sáng, mang lại cảm giác mát mẻ và sang trọng cho không gian sống ba tầng gần biển.",
    image: "https://thicongnhadanang.vn/wp-content/uploads/2020/10/TH.jpg",
    link: "/mau-nha-dep/nha-3-tang",
  },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const FeaturedOne = () => {
  return (
    <Row
      gutter={[24, 24]}
      style={{
        borderBottom: "2px solid #016bb4",
        paddingBottom: "20px",
        paddingTop: "20px",
      }}
    >
      <Col xs={24} lg={6} className="text-section">
        <Title
          level={3}
          style={{ color: "#016bb4", textTransform: "uppercase" }}
        >
          Công trình thiết kế
        </Title>
        <Paragraph style={{ color: "#016bb4", textAlign: "justify" }}>
          Mỗi năm, PCD Nguyễn Hải thực hiện hàng trăm công trình thiết kế nhà
          phố 3 tầng ở khắp các tỉnh thành. Những mẫu nhà 3 tầng do PCD Nguyễn
          Hải thiết kế mang phong cách hiện đại, tối giản, tiện nghi và luôn đảm
          bảo sự thông thoáng trong không gian sống. Đặc biệt, mỗi công trình
          đều được chăm chút tỉ mỉ theo ý tưởng và sở thích riêng của gia chủ,
          tạo nên một ngôi nhà độc bản, đậm dấu ấn cá nhân và tối ưu công năng
          sử dụng cho cả gia đình.
        </Paragraph>
        <Button
          type="primary"
          href="/mau-nha-dep/nha-3-tang"
          style={{ backgroundColor: "#016bb4", border: "none" }}
        >
          Xem tất cả
        </Button>
      </Col>

      <Col xs={24} lg={18} className="image-section">
        <div className="project-list-desktop">
          <Row gutter={[16, 16]}>
            {projects.map((project, index) => (
              <Col xs={12} lg={8} key={index}>
                <div className="project-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="overlay">
                    <div className="overlay-text">
                      <Title level={5}>{project.title}</Title>
                      <Paragraph
                        style={{ color: "#fff", textAlign: "justify" }}
                      >
                        {project.description}
                      </Paragraph>
                      <a href={project.link} className="view-more">
                        Xem thêm →
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="project-slider-mobile">
          <Slider {...sliderSettings}>
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="overlay">
                  <div className="overlay-text">
                    <Title level={5}>{project.title}</Title>
                    <Paragraph style={{ textAlign: "justify" }}>
                      {project.description}
                    </Paragraph>
                    <a href={project.link} className="view-more">
                      Xem thêm →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Col>
    </Row>
  );
};

export default FeaturedOne;
