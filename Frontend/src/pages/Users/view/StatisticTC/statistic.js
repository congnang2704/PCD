import React, { useMemo, useRef } from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  ApartmentOutlined,
  ProjectOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./statistic.css";

const DEFAULT_ITEMS = [
  {
    key: "branch",
    icon: <ApartmentOutlined className="stat-icon" />,
    title: "Chi nhánh",
    value: 1,
    desc: "NGUYỄN HẢI CO., LTD hiện có một chi nhánh đặt tại Đà Nẵng và đang hướng tới mở rộng trong tương lai.",
  },
  {
    key: "projects",
    icon: <ProjectOutlined className="stat-icon" />,
    title: "Dự án",
    value: 5000,
    suffix: "+",
    desc: "Hơn 10 năm thiết kế và xây dựng, NGUYỄN HẢI CO., LTD đã bàn giao hàng nghìn công trình lớn nhỏ trên khắp cả nước.",
  },
  {
    key: "staff",
    icon: <TeamOutlined className="stat-icon" />,
    title: "Nhân viên",
    value: 20,
    suffix: "+",
    desc: "Với đội ngũ nhân sự chuyên môn cao, PCD NGUYỄN HẢI CO., LTD tự tin mang đến dịch vụ chất lượng vượt trội.",
  },
  {
    key: "customers",
    icon: <TeamOutlined className="stat-icon" />,
    title: "Khách hàng",
    value: 3000,
    suffix: "+",
    desc: "NGUYỄN HẢI CO., LTD đã và đang phục vụ hơn 3000 khách hàng trên toàn quốc với sự hài lòng và tin tưởng cao.",
  },
];

export default function StatisticSection({
  items = DEFAULT_ITEMS,
  className = "",
}) {
  const railRef = useRef(null);
  const scrollBy = (dir = 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: rail.clientWidth * 0.9 * dir, behavior: "smooth" });
  };

  const cards = useMemo(
    () =>
      items.map((it) => (
        <div className="stat-slide" key={it.key}>
          <Card className="statistic-card" bordered={false}>
            {it.icon}
            <Statistic
              title={it.title}
              value={it.value}
              suffix={it.suffix}
              className="statistic-title"
            />
            {it.desc ? <p className="statistic-paragraph">{it.desc}</p> : null}
          </Card>
        </div>
      )),
    [items]
  );

  return (
    <div className="stat-wrap">
      <h1 className="stat-wrap-title">
        Nguyễn Hải – Xây dựng từ chất lượng, lớn mạnh từ niềm tin
      </h1>

      {/* Desktop/Grid */}
      <div className={`stat-grid ${className}`}>
        <Row gutter={[24, 24]} justify="center" align="stretch">
          {items.map((it) => (
            <Col
              key={it.key}
              xs={24}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              className="stat-col"
            >
              <Card className="statistic-card" bordered={false}>
                {it.icon}
                <Statistic
                  title={it.title}
                  value={it.value}
                  suffix={it.suffix}
                  className="statistic-title"
                />
                {it.desc ? (
                  <p className="statistic-paragraph">{it.desc}</p>
                ) : null}
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Mobile/Slider */}
      <div className="stat-slider">
        <button
          className="stat-nav prev"
          aria-label="Prev"
          onClick={() => scrollBy(-1)}
        >
          ‹
        </button>
        <div className="stat-rail" ref={railRef}>
          {cards}
        </div>
        <button
          className="stat-nav next"
          aria-label="Next"
          onClick={() => scrollBy(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
