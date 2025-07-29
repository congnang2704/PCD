import React from "react";
import { Row, Col, Typography, Button } from "antd";
import Slider from "react-slick";
import "../FeaturedProjects.css";

const { Title, Paragraph } = Typography;

const projects = [
  {
    title: "Không gian nội thất sang trọng hòa mình với thiên nhiên",
    description:
      "Không gian mở với nội thất gỗ cao cấp và ánh sáng tự nhiên, tạo cảm giác sang trọng và gần gũi.",
    image: "https://thicongnhadanang.vn/wp-content/uploads/2025/07/CFF.6.jpg",
    link: "/dich-vu/thiet-ke-noi-that",
  },
  {
    title: "Không gian bếp hiện đại tại nhà phố Sơn – Thanh Hóa",
    description:
      "Căn bếp nổi bật với hệ tủ bếp cao cấp, bàn đảo tiện nghi, và sự kết nối mở với khu vực ăn uống, tạo nên không gian sống linh hoạt và ấm cúng.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2025/07/son-thanh-hoa.3-e1753498892396.jpg",
    link: "/dich-vu/thiet-ke-noi-that",
  },
  {
    title: "Phòng ngủ master tại Sơn – Thanh Hóa tinh tế, nhẹ nhàng",
    description:
      "Thiết kế tối giản với tone trung tính, ánh sáng dịu nhẹ và nội thất gỗ tự nhiên mang đến sự thư thái và riêng tư tuyệt đối cho gia chủ.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2025/07/son-thanh-hoa.4-e1753499160317.jpg",
    link: "/dich-vu/thiet-ke-noi-that",
  },
  {
    title: "Phòng làm việc tại nhà anh Tài – Đà Nẵng",
    description:
      "Không gian làm việc tại gia được bố trí thông minh, tận dụng ánh sáng tự nhiên và hệ tủ lưu trữ tiện dụng, phù hợp với phong cách sống hiện đại.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2025/07/Nha.-anh-.-tai-2-e1753674722365.jpg",
    link: "/dich-vu/thiet-ke-noi-that",
  },
  {
    title: "Nội thất phòng ngủ trẻ em tại Homestay chị Thủy",
    description:
      "Phòng ngủ trẻ em thiết kế theo phong cách vui tươi, sử dụng màu sắc sinh động và nội thất đa năng, hỗ trợ phát triển sáng tạo cho bé.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2025/07/HOMESTAY-CHI-THUY-4-e1753691107530-768x646.jpg",
    link: "/dich-vu/thiet-ke-noi-that",
  },
  {
    title: "Góc thư giãn đọc sách tại nhà chị Dương – Đà Nẵng",
    description:
      "Một không gian nhỏ yên tĩnh được thiết kế tinh tế với kệ sách và ghế thư giãn, lý tưởng để đọc sách hay thư giãn cuối ngày.",
    image:
      "https://thicongnhadanang.vn/wp-content/uploads/2025/07/Duong-NA.2-e1753688223506.jpg",
    link: "/dich-vu/thiet-ke-noi-that",
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

const Featured_Three = () => {
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
          Với phong cách thiết kế tinh tế, không gian nội thất do PCD Nguyễn Hải
          thực hiện luôn toát lên vẻ sang trọng và đẳng cấp. Từng đường nét,
          chất liệu và bố cục đều được chăm chút kỹ lưỡng để hài hòa giữa công
          năng và thẩm mỹ. Dù bạn yêu thích sự hiện đại tối giản, nét nhẹ nhàng
          của phong cách Bắc Âu, hay vẻ đẹp tinh tế của tân cổ điển, PCD Nguyễn
          Hải đều có thể hiện thực hóa không gian sống mơ ước của bạn một cách
          chuyên nghiệp, sáng tạo và đầy dấu ấn cá nhân.
        </Paragraph>
        <Button
          type="primary"
          href="/dich-vu/thiet-ke-noi-that"
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

export default Featured_Three;
