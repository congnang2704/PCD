// File: Featured_Two.js
import React from "react";
import { Row, Col, Typography, Button } from "antd";
import Slider from "react-slick";

const { Title, Paragraph } = Typography;

const projects = [
  {
    title: "Biệt thự xanh hiện đại tại Sơn Trà, Đà Nẵng",
    description:
      "Thiết kế mở với hệ kính lớn, ban công phủ cây xanh và hồ cá trong sân vườn, mang lại cảm giác thư giãn tuyệt đối giữa lòng thành phố biển.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2019/07/bt-lam-e1623397500588.jpg",
    link: "/mau-nha-dep/biet-thu",
  },
  {
    title: "Biệt thự phong cách Nhật tối giản tại Ngũ Hành Sơn, Đà Nẵng",
    description:
      "Không gian sống tối giản, tinh tế với chất liệu gỗ – đá tự nhiên, tạo nên sự cân bằng hài hòa giữa thiên nhiên và con người.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2019/07/hai-dn-e1623397652185.jpg",
    link: "/mau-nha-dep/biet-thu",
  },
  {
    title: "Biệt thự 3 tầng hiện đại tại Hải Châu, Đà Nẵng",
    description:
      "Biệt thự 3 tầng nổi bật với kiến trúc lệch tầng, sân trong và ô thông gió, tận dụng tối đa ánh sáng và gió trời, mang lại không gian sống luôn thông thoáng.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2019/07/bt-a-cong-1-e1623314391576.jpg",
    link: "/mau-nha-dep/biet-thu",
  },
  {
    title: "Biệt thự vườn nghỉ dưỡng tại Hòa Vang, Đà Nẵng",
    description:
      "Kết hợp giữa thiên nhiên và kiến trúc hiện đại, biệt thự vườn sở hữu không gian sống yên bình, thoáng đãng với nhiều cây xanh và hồ nước.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2020/10/L-e1623379147156.jpg",
    link: "/mau-nha-dep/biet-thu",
  },
  {
    title: "Biệt thự kết hợp văn phòng làm việc tại nhà ở Đà Nẵng",
    description:
      "Mô hình biệt thự đa chức năng với khu sinh hoạt và không gian làm việc độc lập, tiện nghi, lý tưởng cho doanh nhân làm việc tại nhà.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2020/10/C-e1623379245176.jpg",
    link: "/mau-nha-dep/biet-thu",
  },
  {
    title: "Biệt thự biển tối giản tại Mỹ Khê, Đà Nẵng",
    description:
      "Thiết kế biệt thự ven biển hiện đại, không gian mở hòa quyện với thiên nhiên, hướng tầm nhìn ra biển xanh và tận dụng tối đa ánh sáng tự nhiên.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2020/10/1-e1623397855888.jpg",
    link: "/mau-nha-dep/biet-thu",
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

const FeaturedTwo = () => {
  return (
    <Row
      gutter={[24, 24]}
      style={{
        borderBottom: "2px solid #016bb4",
        paddingBottom: "20px",
        paddingTop: "20px",
      }}
    >
      <Col xs={24} lg={24}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={18} className="image-section image-section-gt2">
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
          </Col>

          <Col xs={24} lg={6} className="text-section text-section-gt2">
            <div>
              <Title
                level={3}
                style={{ color: "#016bb4", textTransform: "uppercase" }}
              >
                thiết kế biệt thự
              </Title>
              <Paragraph style={{ color: "#016bb4", textAlign: "justify" }}>
                Mỗi mẫu biệt thự do Nguyễn Hải thiết kế và thi công đều mang đến
                một không gian sống đẳng cấp, sang trọng và tiện nghi. Chúng tôi
                chú trọng đến từng chi tiết kiến trúc, từ hình khối mạnh mẽ, hài
                hòa đến vật liệu cao cấp và cách bố trí hợp lý. Dù là biệt thự
                hiện đại, tân cổ điển hay mang phong cách châu Âu tinh tế, mỗi
                công trình đều phản ánh gu thẩm mỹ riêng của gia chủ và đảm bảo
                tỷ lệ hoàn thiện giống bản vẽ thiết kế lên đến 95%. Giải pháp
                thi công được tối ưu hóa để đảm bảo độ bền vững và giá trị lâu
                dài cho ngôi nhà.
              </Paragraph>
              <Button
                type="primary"
                href="/mau-nha-dep/biet-thu"
                style={{ backgroundColor: "#016bb4", border: "none" }}
              >
                Xem tất cả
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FeaturedTwo;
