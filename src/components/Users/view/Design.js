import React, { useState } from "react";
import { Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const DesignProcess = () => {
  const [activeTab, setActiveTab] = useState("design");

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          textAlign: "center",
          height: "100%",
        }}
      >
        {/* Tab Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <div
            onClick={() => setActiveTab("design")}
            style={{
              padding: "10px 32px",
              backgroundColor: activeTab === "design" ? "#016bb4" : "#5aa9dd",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          >
            THIẾT KẾ
          </div>
          <div
            onClick={() => setActiveTab("build")}
            style={{
              padding: "10px 32px",
              backgroundColor: activeTab === "build" ? "#016bb4" : "#5aa9dd",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            THI CÔNG TRỌN GÓI
          </div>
        </div>

        {/* Tab Content */}
        <Row gutter={[32, 32]} justify="center">
          {activeTab === "design" ? (
            <>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>📞</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    TRAO ĐỔI TƯ VẤN
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Trao đổi yêu cầu, tư vấn định hướng ý tưởng, phong cách và
                    mức đầu tư.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>📋</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    BÁO GIÁ QUY TRÌNH
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Gửi khách hàng báo giá đúng gói thiết kế, kèm quy trình làm
                    việc cụ thể, chi tiết.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>📐</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    KÝ HỢP ĐỒNG
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Thực hiện các thủ tục hành chính và bắt đầu triển khai công
                    việc theo tiến độ đã thống nhất.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>📦</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    BÀN GIAO & QUYẾT TOÁN
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Sau khi thống nhất hồ sơ báo cáo, khách hàng thanh toán lần
                    cuối và nhận hồ sơ hoàn chỉnh.
                  </Paragraph>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>🤝</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    TRAO ĐỔI TƯ VẤN
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Trao đổi và tư vấn khách hàng về nhu cầu, mong muốn, và định
                    hướng mức đầu tư.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>📝</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    BÁO GIÁ
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Gửi báo giá thi công, chủng loại vật tư và Quy trình thi
                    công để khách hàng nắm được thông tin.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>🏗️</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    KÝ HỢP ĐỒNG
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Hai bên gặp gỡ trao đổi thống nhất các vấn đề về tiến độ,
                    chất lượng, khởi công và các điều khoản hợp đồng.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>🧾</div>
                  <Title level={5} style={{ color: "#016bb4" }}>
                    BÀN GIAO & QUYẾT TOÁN
                  </Title>
                  <Paragraph style={{ color: "#016bb4" }}>
                    Kiểm tra, nghiệm thu và thanh quyết toán hợp đồng. Bảo hành,
                    bảo trì dài hạn theo cam kết.
                  </Paragraph>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default DesignProcess;
