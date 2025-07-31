import React, { useState } from "react";
import "./Introduction.css";
import { Row, Col, Typography, Statistic, Card, Image, Grid } from "antd";
import {
  ApartmentOutlined,
  ProjectOutlined,
  TeamOutlined,
  RiseOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const bannerImage =
  "https://thicongnhadanang.vn/wp-content/uploads/2025/07/nenNH-2048x1357.jpg";
const mapImage =
  "https://www.shutterstock.com/image-photo/structural-engineer-architect-foreman-worker-600nw-2512597949.jpg";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const IntroductionHome = () => {
  const [showMore, setShowMore] = useState(false);
  const screens = useBreakpoint();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="intro-home">
      <Row>
        <Col span={24} style={{ overflowX: "hidden" }}>
          <div
            style={{
              width: "100%",
              height: screens.xs ? "auto" : "700px",
              overflow: "hidden",
            }}
          >
            <Image
              src={bannerImage}
              preview={false}
              alt="Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        </Col>
      </Row>

      <div className="intro-container">
        <Row gutter={[48, 24]} align="center" className="intro-section">
          <Col xs={24} lg={8} className="intro-text">
            <Title level={2} className="intro-title">
              KIẾN TRÚC NGUYỄN HẢI CO., LTD <br /> XÂY TẦM NHÌN, DỰNG GIÁ TRỊ
            </Title>

            <Paragraph className="intro-paragraph">
              Công ty TNHH MTV PCD Nguyễn Hải là một doanh nghiệp được thành lập
              theo quyết định số 0401518783 ngày 22 tháng 11 năm 2011 của Sở Kế
              Hoạch và Đầu Tư thành phố Đà Nẵng. Công ty được thành lập để hoạt
              động ở lĩnh vực Kiến Trúc & Xây Dựng với mong muốn đáp ứng một
              phần nào cho công cuộc công nghiệp hóa, hiện đại hóa đất nước.
            </Paragraph>

            <div
              className={`intro-paragraph-more ${showMore ? "show" : "hide"}`}
            >
              <Paragraph className="intro-paragraph">
                Bên cạnh việc chính là tạo ra các sản phẩm cho ngành xây dựng,
                công ty còn là nơi hội tụ đông đảo của các Thạc sỹ, Kiến trúc sư
                và Kỹ sư có nhiều đóng góp vào việc giải quyết các vấn đề khoa
                học kỹ thuật & công nghệ trong tất cả các lĩnh vực của xây dựng
                cơ bản như xây dựng Dân dụng và Công nghiệp, Cầu đường, Cảng và
                Công trình biển, Cơ khí xây dựng, Thông gió cấp nhiệt, Cấp thoát
                nước, Hạ tầng kỹ thuật, v.v...
              </Paragraph>
              <Paragraph className="intro-paragraph">
                NGUYỄN HẢI CO., LTD bằng khát vọng tiên phong cùng chiến lược
                đầu tư - phát triển bền vững, phấn đấu trở thành doanh nghiệp
                hàng đầu trong việc cung cấp các dịch vụ: tư vấn thiết kế, tư
                vấn giám sát, tư vấn đấu thầu, tư vấn dự án, thi công xây dựng
                các công trình nội ngoại thất, công trình xây dựng dân dụng và
                công nghiệp, công trình hạ tầng, xây dựng trọn gói… Hướng đến
                phát triển hoạt động đa ngành nghề, đa lĩnh vực.
              </Paragraph>
              <Paragraph className="intro-paragraph">
                Không chỉ hoạt động kinh doanh, công ty còn chú trọng đến việc
                an sinh cộng đồng bằng cách chuyển tải mô hình đô thị hóa “bền
                vững” vào xã hội hiện nay thông qua tất cả các sản phẩm và dịch
                vụ như thiết kế “bền vững”, xây dựng “bền vững”, sản xuất “ bền
                vững”, sử dụng “bền vững” v.v… đúng theo phương châm làm việc
                của công ty là KIẾN TRÚC BỀN VỮNG.
              </Paragraph>
            </div>

            <div onClick={toggleShowMore} className="intro-toggle">
              {showMore ? "Thu gọn" : "Xem thêm"}
            </div>

            <div className="intro-features">
              <Row gutter={[16, 32]}>
                <Col xs={24} md={12} className="feature-item">
                  <HomeOutlined className="feature-icon" />
                  <Title className="feature-title" level={5}>
                    Thiết kế hiện đại
                  </Title>
                  <Paragraph className="feature-paragraph">
                    Những mẫu thiết kế biệt thự, nhà dân,... đều có sự sáng tạo,
                    tinh tế, tối ưu công năng cũng được NGUYỄN HẢI CO., LTD lồng
                    vào sự tinh tế trong từng chi tiết của sản phẩm.
                  </Paragraph>
                </Col>
                <Col xs={24} md={12} className="feature-item">
                  <RiseOutlined className="feature-icon" />
                  <Title className="feature-title" level={5}>
                    Chất lượng uy tín
                  </Title>
                  <Paragraph className="feature-paragraph">
                    NGUYỄN HẢI CO., LTD luôn đặt chất lượng lên hàng đầu, từ
                    khâu thiết kế, thi công, đến hoàn thiện và bảo hành công
                    trình.
                  </Paragraph>
                </Col>
              </Row>
            </div>
          </Col>

          <Col
            xs={24}
            lg={10}
            className="intro-image"
            style={{ display: screens.xs ? "none" : "block" }}
          >
            <Image
              width="100%"
              src={mapImage}
              alt="NGUYỄN HẢI CO., LTD Vietnam"
              preview={false}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center" className="intro-statistics">
          <Col xs={12} sm={5} className="stat-card">
            <Card className="statistic-card">
              <ApartmentOutlined className="stat-icon" />
              <Statistic
                title="Chi nhánh"
                value={1}
                className="statistic-title"
              />
              <Paragraph className="statistic-paragraph">
                NGUYỄN HẢI CO., LTD hiện có một chi nhánh đặt tại Đà Nẵng và
                đang hướng tới mở rộng trong tương lai.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={12} sm={5} className="stat-card">
            <Card className="statistic-card">
              <ProjectOutlined className="stat-icon" />
              <Statistic
                title="Dự án"
                value={5000}
                suffix="+"
                className="statistic-title"
              />
              <Paragraph className="statistic-paragraph">
                Hơn 10 năm thiết kế và xây dựng, NGUYỄN HẢI CO., LTD đã bàn giao
                hàng nghìn công trình lớn nhỏ trên khắp cả nước.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={12} sm={5} className="stat-card">
            <Card className="statistic-card">
              <TeamOutlined className="stat-icon" />
              <Statistic
                title="Nhân viên"
                value={50}
                suffix="+"
                className="statistic-title"
              />
              <Paragraph className="statistic-paragraph">
                Với đội ngũ nhân sự chuyên môn cao, PCD NGUYỄN HẢI CO., LTD tự
                tin mang đến dịch vụ chất lượng vượt trội.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={12} sm={5} className="stat-card">
            <Card className="statistic-card">
              <TeamOutlined className="stat-icon" />
              <Statistic
                title="Khách hàng"
                value={3000}
                suffix="+"
                className="statistic-title"
              />
              <Paragraph className="statistic-paragraph">
                NGUYỄN HẢI CO., LTD đã và đang phục vụ hơn 3000 khách hàng cá
                nhân và doanh nghiệp trên toàn quốc với sự hài lòng và tin tưởng
                cao.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IntroductionHome;
