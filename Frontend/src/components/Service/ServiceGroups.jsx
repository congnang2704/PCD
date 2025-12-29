import React from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SERVICE_GROUPS } from "../../data/Services/services.config";

export default function ServiceGroups() {
  const navigate = useNavigate();

  return (
    <section className="svc-section">
      <div className="svc-section-head">
        <h2>Dịch vụ nổi bật</h2>
        <p>
          Chọn đúng nhu cầu — xem chi tiết từng dịch vụ và nhận báo giá nhanh.
        </p>
      </div>

      <Row gutter={[16, 16]}>
        {SERVICE_GROUPS.map((g) => (
          <Col xs={24} md={8} key={g.key}>
            <div className="svc-group-card">
              <div className="svc-group-top">
                <div className="svc-group-badge" aria-hidden="true">
                  {g.badge}
                </div>
                <div>
                  <div className="svc-group-title">{g.title}</div>
                  <div className="svc-group-sub">{g.subtitle}</div>
                </div>
              </div>

              <div className="svc-group-list">
                {g.items.map((it) => (
                  <button
                    key={it.path}
                    className="svc-item"
                    onClick={() => navigate(it.path)}
                    type="button"
                  >
                    <div className="svc-item-name">{it.title}</div>
                    <div className="svc-item-desc">{it.desc}</div>
                  </button>
                ))}
              </div>

              <div className="svc-group-actions">
                <Button type="primary" onClick={() => navigate("/lien-he")}>
                  Nhận báo giá
                </Button>
                <Button onClick={() => navigate("/du-an")}>Xem dự án</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
