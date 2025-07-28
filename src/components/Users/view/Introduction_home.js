import React, { useState } from "react";
import { Row, Col, Typography, Statistic, Card, Image, Grid } from "antd";
import {
  ApartmentOutlined,
  SmileOutlined,
  TeamOutlined,
  GlobalOutlined,
  RiseOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const bannerImage =
  "https://png.pngtree.com/background/20230516/original/pngtree-construction-cranes-at-a-construction-site-under-blue-sky-and-clouds-picture-image_2600880.jpg";
const mapImage =
  "https://www.shutterstock.com/image-photo/structural-engineer-architect-foreman-worker-600nw-2512597949.jpg";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const contentStyle = {
  padding: "50px",
  fontFamily: "Arial, sans-serif",
};

const sectionStyle = {
  marginBottom: "50px",
};

const statisticCardStyle = {
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  border: "none",
  height: "100%",
};

const statisticParagraphStyle = {
  minHeight: "72px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconStyle = {
  fontSize: "24px",
  marginBottom: "10px",
};

const IntroductionHome = () => {
  const [showMore, setShowMore] = useState(false);
  const screens = useBreakpoint();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const paragraphStyle = {
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "8px 0",
  };

  const hiddenParagraphStyle = {
    ...paragraphStyle,
    opacity: showMore ? 1 : 0,
    visibility: showMore ? "visible" : "hidden",
    height: showMore ? "auto" : "0",
    transition: "all 0.3s ease-in-out",
    marginBottom: showMore ? "16px" : "0",
  };

  const featuresStyle = {
    marginTop: "30px",
    transition: "transform 0.3s ease-in-out",
    transform: showMore ? "translateY(20px)" : "translateY(0)",
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Image
            className="responsive-banner"
            width="100%"
            height={screens.xs ? "auto" : "700px"}
            src={bannerImage}
            alt="Company Team"
            preview={false}
            style={{ display: "block", objectFit: "cover" }}
          />
        </Col>
      </Row>

      <div style={{ ...contentStyle, maxWidth: "1500px", margin: "0 auto" }}>
        <Row gutter={[48, 24]} align="center" style={sectionStyle}>
          <Col xs={24} lg={8}>
            <Title
              level={2}
              style={{
                color: "#016bb4",
                fontSize: "24px",
                marginBottom: "16px",
              }}
            >
              KIẾN TRÚC NGUYỄN HẢI CO., LTD <br /> XÂY TẦM NHÌN, DỰNG GIÁ TRỊ
            </Title>

            <Paragraph style={paragraphStyle}>
              Công ty TNHH MTV PCD Nguyễn Hải là một doanh nghiệp được thành lập
              theo quyết định số 0401518783 ngày 22 tháng 11 năm 2011 của Sở Kế
              Hoạch và Đầu Tư thành phố Đà Nẵng Công ty được thành lập để hoạt
              động ở lĩnh vực Kiến Trúc & Xây Dựng với mong muốn đáp ứng một
              phần nào cho công cuộc công nghiệp hóa, hiện đại hóa đất nước.
            </Paragraph>

            <div style={hiddenParagraphStyle}>
              <Paragraph style={paragraphStyle}>
                Bên cạnh việc chính là tạo ra các sản phẩm cho ngành xây dựng,
                công ty còn là nơi hội tụ đông đảo của các Thạc sỹ, Kiến trúc sư
                và Kỹ sư có nhiều đóng góp vào việc giải quyết các vấn đề khoa
                học kỹ thuật & công nghệ trong tất cả các lĩnh vực của xây dựng
                cơ bản như xây dựng Dân dụng và Công nghiệp, Cầu đường, Cảng và
                Công trình biển, Cơ khí xây dựng, Thông gió cấp nhiệt, Cấp thoát
                nước, Hạ tầng kỹ thuật, v.v...
              </Paragraph>
              <Paragraph style={paragraphStyle}>
                NGUYỄN HẢI CO., LTD bằng khát vọng tiên phong cùng chiến lược
                đầu tư - phát triển bền vững, phấn đấu trở thành doanh nghiệp
                hàng đầu trong việc cung cấp các dịch vụ: tư vấn thiết kế, tư
                vấn giám sát, tư vấn đấu thầu, tư vấn dự án, thi công xây dựng
                các công trình nội ngoại thất, công trình xây dựng dân dụng và
                công nghiệp, công trình hạ tầng, xây dựng trọn gói… Hướng đến
                phát triển hoạt động đa ngành nghề, đa lĩnh vực.
              </Paragraph>
              <Paragraph style={paragraphStyle}>
                Không chỉ hoạt động kinh doanh, công ty còn chú trọng đến việc
                an sinh cộng đồng bằng cách chuyển tải mô hình đô thị hóa “bền
                vững” vào xã hội hiện nay thông qua tất cả các sản phẩm và dịch
                vụ như thiết kế “bền vững”, xây dựng “bền vững”, sản xuất “ bền
                vững”, sử dụng “bền vững” v.v… đúng theo phương châm làm việc
                của công ty là KIẾN TRÚC BỀN VỮNG.
              </Paragraph>
            </div>

            <div
              onClick={toggleShowMore}
              style={{
                color: "#016bb4",
                cursor: "pointer",
                marginTop: "16px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "bold",
              }}
            >
              {showMore ? "Thu gọn" : "Xem thêm"}
            </div>

            <div style={featuresStyle}>
              <Row gutter={[16, 32]}>
                <Col xs={24} md={12}>
                  <Row gutter={16} align="top">
                    <Col>
                      <HomeOutlined
                        style={{ ...iconStyle, color: "#016bb4" }}
                      />
                    </Col>
                    <Col flex={1}>
                      <Title level={5}>Thiết kế hiện đại</Title>
                      <Paragraph style={paragraphStyle}>
                        Những mẫu thiết kế biệt thự, nhà dân,... đều có sự sáng
                        tạo, tinh tế, tối ưu công năng cũng được NGUYỄN HẢI CO.,
                        LTD lồng vào sự tinh tế trong từng chi tiết của sản
                        phẩm.
                      </Paragraph>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12}>
                  <Row gutter={16} align="top">
                    <Col>
                      <RiseOutlined
                        style={{ ...iconStyle, color: "#016bb4" }}
                      />
                    </Col>
                    <Col flex={1}>
                      <Title level={5}>Chất lượng uy tín</Title>
                      <Paragraph style={paragraphStyle}>
                        NGUYỄN HẢI CO., LTD luôn đặt chất lượng lên hàng đầu, từ
                        khâu thiết kế, thi công, đến hoàn thiện và bảo hành công
                        trình.
                      </Paragraph>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>

          <Col
            xs={24}
            lg={10}
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

        <Row gutter={[16, 16]} justify="center">
          <Col xs={12} sm={5}>
            <Card style={statisticCardStyle}>
              <ApartmentOutlined
                style={{ color: "#016bb4", fontSize: "24px" }}
              />
              <Statistic
                title="Chi nhánh"
                value={12}
                suffix="+"
                valueStyle={{ color: "#016bb4", fontWeight: "bold" }}
              />
              <Paragraph style={statisticParagraphStyle}>
                NGUYỄN HẢI CO., LTD hiện đã có nhiều chi nhánh trên toàn quốc
              </Paragraph>
            </Card>
          </Col>
          <Col xs={12} sm={5}>
            <Card style={statisticCardStyle}>
              <SmileOutlined style={{ color: "#016bb4", fontSize: "24px" }} />
              <Statistic
                title="Dự án"
                value={4000}
                suffix="+"
                valueStyle={{ color: "#016bb4", fontWeight: "bold" }}
              />
              <Paragraph style={statisticParagraphStyle}>
                Trong 10 năm thiết kế và xây dựng, NGUYỄN HẢI CO., LTD đã bàn
                giao...
              </Paragraph>
            </Card>
          </Col>
          <Col xs={12} sm={5}>
            <Card style={statisticCardStyle}>
              <TeamOutlined style={{ color: "#016bb4", fontSize: "24px" }} />
              <Statistic
                title="Nhân viên"
                value={300}
                suffix="+"
                valueStyle={{ color: "#016bb4", fontWeight: "bold" }}
              />
              <Paragraph style={statisticParagraphStyle}>
                Với đội ngũ nhân sự chuyên môn cao, NGUYỄN HẢI CO., LTD tự
                tin...
              </Paragraph>
            </Card>
          </Col>
          <Col xs={12} sm={5}>
            <Card style={statisticCardStyle}>
              <GlobalOutlined style={{ color: "#016bb4", fontSize: "24px" }} />
              <Statistic
                title="Tỉnh thành"
                value={63}
                suffix="+"
                valueStyle={{ color: "#016bb4", fontWeight: "bold" }}
              />
              <Paragraph style={statisticParagraphStyle}>
                NGUYỄN HẢI CO., LTD giúp khách hàng trên khắp các tỉnh thành
                có...
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IntroductionHome;
