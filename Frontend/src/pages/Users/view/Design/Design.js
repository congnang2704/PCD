import "./Design.css";
import React, { useState } from "react";
import { Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const DesignProcess = () => {
  const [activeTab, setActiveTab] = useState("design");

  return (
    <section className="dp-wrap">
      <div className="dp-container">
        {/* Tabs */}
        <div className="tab-buttons" role="tablist" aria-label="Design/Build">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "design"}
            className={`tab-btn left${activeTab === "design" ? " active" : ""}`}
            onClick={() => setActiveTab("design")}
          >
            THIẾT KẾ
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "build"}
            className={`tab-btn right${activeTab === "build" ? " active" : ""}`}
            onClick={() => setActiveTab("build")}
          >
            THI CÔNG TRỌN GÓI
          </button>
        </div>

        {/* Content */}
        <Row gutter={[24, 24]} justify="center">
          {activeTab === "design" ? (
            <>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">📞</div>
                  <Title level={5} className="step-title">
                    TRAO ĐỔI TƯ VẤN
                  </Title>
                  <Paragraph className="step-desc">
                    Trao đổi yêu cầu, tư vấn định hướng ý tưởng, phong cách và
                    mức đầu tư.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">📋</div>
                  <Title level={5} className="step-title">
                    BÁO GIÁ QUY TRÌNH
                  </Title>
                  <Paragraph className="step-desc">
                    Gửi báo giá đúng gói thiết kế, kèm quy trình làm việc cụ
                    thể, chi tiết.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">📐</div>
                  <Title level={5} className="step-title">
                    KÝ HỢP ĐỒNG
                  </Title>
                  <Paragraph className="step-desc">
                    Thực hiện thủ tục và bắt đầu triển khai theo tiến độ đã
                    thống nhất.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">📦</div>
                  <Title level={5} className="step-title">
                    BÀN GIAO & QUYẾT TOÁN
                  </Title>
                  <Paragraph className="step-desc">
                    Nghiệm thu, thanh toán lần cuối và bàn giao hồ sơ hoàn
                    chỉnh.
                  </Paragraph>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">🤝</div>
                  <Title level={5} className="step-title">
                    TRAO ĐỔI TƯ VẤN
                  </Title>
                  <Paragraph className="step-desc">
                    Khảo sát nhu cầu, mong muốn và định hướng mức đầu tư.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">📝</div>
                  <Title level={5} className="step-title">
                    BÁO GIÁ
                  </Title>
                  <Paragraph className="step-desc">
                    Gửi báo giá thi công, chủng loại vật tư và quy trình thi
                    công.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">🏗️</div>
                  <Title level={5} className="step-title">
                    KÝ HỢP ĐỒNG
                  </Title>
                  <Paragraph className="step-desc">
                    Thống nhất tiến độ, chất lượng, khởi công và điều khoản hợp
                    đồng.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="step-card">
                  <div className="step-icon">🧾</div>
                  <Title level={5} className="step-title">
                    BÀN GIAO & QUYẾT TOÁN
                  </Title>
                  <Paragraph className="step-desc">
                    Nghiệm thu, quyết toán và bảo hành/bảo trì theo cam kết.
                  </Paragraph>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </section>
  );
};

export default DesignProcess;
