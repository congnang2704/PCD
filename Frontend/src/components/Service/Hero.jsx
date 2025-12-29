import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { TRUST_POINTS } from "../../data/Services/services.config";

export default function Hero({ onScrollToPosts }) {
  const navigate = useNavigate();

  return (
    <section className="svc-hero">
      <div className="svc-hero-inner">
        <div className="svc-hero-left">
          <div className="svc-hero-badge">Nguyễn Hải Design & Build</div>

          <h1 className="svc-hero-title">
            Thiết kế – Thi công – Xây dựng trọn gói
            <span> tại Đà Nẵng</span>
          </h1>

          <p className="svc-hero-sub">
            Tối ưu công năng · Bám ngân sách · Minh bạch hạng mục · Đúng tiến độ
          </p>

          <Space wrap className="svc-hero-cta">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/lien-he")}
            >
              Nhận tư vấn / Báo giá nhanh
            </Button>
            <Button size="large" onClick={() => navigate("/du-an")}>
              Xem dự án thực tế
            </Button>
            <Button
              size="large"
              className="svc-ghost"
              onClick={onScrollToPosts}
            >
              Xem bài viết dịch vụ
            </Button>
          </Space>

          <div className="svc-trust">
            {TRUST_POINTS.map((t, idx) => (
              <div className="svc-trust-item" key={idx}>
                <span className="svc-trust-ico" aria-hidden="true">
                  {t.icon}
                </span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="svc-hero-right" aria-hidden="true">
          <div className="svc-hero-card">
            <div className="svc-mini-title">Quy trình nhanh</div>

            <div className="svc-mini-steps">
              <div className="svc-mini-step">
                <b>1</b>
                <span>Tiếp thu</span>
              </div>
              <div className="svc-mini-step">
                <b>2</b>
                <span>Khảo sát</span>
              </div>
              <div className="svc-mini-step">
                <b>3</b>
                <span>Thiết kế</span>
              </div>
              <div className="svc-mini-step">
                <b>4</b>
                <span>Báo giá</span>
              </div>
              <div className="svc-mini-step">
                <b>5</b>
                <span>Thi công</span>
              </div>
              <div className="svc-mini-step">
                <b>6</b>
                <span>Bàn giao</span>
              </div>
            </div>

            <div className="svc-mini-note">
              * Tư vấn miễn phí – đề xuất phương án phù hợp nhu cầu & ngân sách.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
