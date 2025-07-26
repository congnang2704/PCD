import React from "react";
import { Row, Col, Typography, Button } from "antd";
import Slider from "react-slick";
import "./FeaturedProjects.css";

const { Title, Paragraph } = Typography;

const projects = [
  {
    title: "Không gian sống hiện đại, xanh, thoáng tại C’s House, Hà Nội",
    description:
      "Một ngôi nhà đẹp không nhất thiết phải lớn, nhưng nhất định phải đủ đầy ánh sáng, gió trời, khoảng xanh và mang lại cảm giác thư thái...",
    image:
      "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    link: "/du-an/1",
  },
  {
    title: "Biệt thự phong cách Nhật Bản tại Đà Nẵng",
    description:
      "Không gian sống tối giản nhưng đầy tinh tế, đậm chất Nhật Bản hiện đại...",
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    link: "/du-an/2",
  },
  {
    title: "Nhà phố 3 tầng thông thoáng tại Huế",
    description:
      "Công trình mang phong cách hiện đại, tập trung ánh sáng và gió trời...",
    image:
      "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    link: "/du-an/3",
  },
  {
    title: "Thiết kế nhà vườn rộng rãi tại Đồng Nai",
    description:
      "Không gian sống chan hòa với thiên nhiên, tối ưu diện tích cây xanh...",
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    link: "/du-an/4",
  },
  {
    title: "Nhà hiện đại kết hợp văn phòng làm việc",
    description:
      "Không gian kép tiện nghi – một phần sinh hoạt, một phần làm việc chuyên nghiệp...",
    image:
      "https://images.pexels.com/photos/221506/pexels-photo-221506.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    link: "/du-an/5",
  },
  {
    title: "Biệt thự biển tối giản và xanh mát",
    description:
      "Không gian sống mở, kết hợp thiên nhiên và ánh sáng biển cả...",
    image:
      "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    link: "/du-an/6",
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

const FeaturedProjects = () => {
  return (
    <div className="featured-projects-section container-wrapper">
      {/* giới thiệu 1 */}
      <Row
        gutter={[24, 24]}
        style={{
          borderBottom: "2px solid #016bb4",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <Col xs={24} lg={6}>
          <Title level={3} style={{ color: "#016bb4" }}>
            Công trình thiết kế
          </Title>
          <Paragraph style={{ color: "#016bb4", fontWeight: "bold" }}>
            Mỗi năm, PCD Nguyễn Hải thực hiện hàng trăm công trình thiết kế ở
            mọi miền đất nước. Phong cách thiết kế chính của PCD Nguyễn Hải là
            hiện đại - tối giản - tiện nghi - thông thoáng. Ngoài ra, những ý
            tưởng và sở thích của gia chủ cũng được ưu tiên hàng đầu, để tạo nên
            một công trình nhà ở độc bản, mang đậm dấu ấn cá nhân.
          </Paragraph>
          <Button
            type="primary"
            href="/du-an"
            style={{ backgroundColor: "#016bb4", border: "none" }}
          >
            Xem tất cả
          </Button>
        </Col>

        <Col xs={24} lg={18}>
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
                        <Paragraph style={{ color: "#fff" }}>
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
                      <Paragraph>{project.description}</Paragraph>
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
      {/* giới thiệu 2 */}
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
            {/* Hình ảnh bên trái */}
            <Col xs={24} lg={18}>
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
                          <Paragraph>{project.description}</Paragraph>
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
                            <Paragraph style={{ color: "#fff" }}>
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

            {/* Chữ bên phải */}
            <Col xs={24} lg={6}>
              <div>
                <Title level={3} style={{ color: "#016bb4" }}>
                  Công trình thiết kế
                </Title>
                <Paragraph style={{ color: "#016bb4", fontWeight: "bold" }}>
                  Tất cả công trình thi công do PCD Nguyễn Hải thực hiện đều đảm
                  bảo những giải pháp mới và tối ưu nhất nhằm mang đến một sản
                  phẩm kiên cố, bền vững. Mặc dù thi công nhà phố nhưng từ hạng
                  mục lớn nhỏ đều được áp dụng kỹ thuật thi công nhà cao tầng
                  Coteccons. Hơn thế nữa, các công trình được thiết kế - thi
                  công trọn gói sẽ giống với bản vẽ thiết kế ít nhất 95%.
                </Paragraph>
                <Button
                  type="primary"
                  href="/du-an"
                  style={{ backgroundColor: "#016bb4", border: "none" }}
                >
                  Xem tất cả
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* giới thiệu 3 */}
      <Row
        gutter={[24, 24]}
        style={{
          borderBottom: "2px solid #016bb4",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <Col xs={24} lg={6}>
          <Title level={3} style={{ color: "#016bb4" }}>
            Công trình thiết kế
          </Title>
          <Paragraph style={{ color: "#016bb4", fontWeight: "bold" }}>
            Với thiết kế ấn tượng, không gian sang trọng và sự chỉn chu trong
            từng chi tiết, biệt thự PCD Nguyễn Hải luôn khiến khách hàng ao ước
            được sở hữu. Dù bạn yêu thích vẻ đẹp hiện đại tinh giản, sự thanh
            lịch của tân cổ điển hay nét quyến rũ cổ điển mang hơi thở châu Âu,
            PCD Nguyễn Hải đều có thể biến ý tưởng thành hiện thực một cách
            nhanh chóng, chuyên nghiệp và đậm chất riêng
          </Paragraph>
          <Button
            type="primary"
            href="/du-an"
            style={{ backgroundColor: "#016bb4", border: "none" }}
          >
            Xem tất cả
          </Button>
        </Col>

        <Col xs={24} lg={18}>
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
                        <Paragraph style={{ color: "#fff" }}>
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
                      <Paragraph>{project.description}</Paragraph>
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
    </div>
  );
};

export default FeaturedProjects;
