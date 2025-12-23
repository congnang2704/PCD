import React, { useMemo, useState } from "react";
import "./InteriorContactForm.css";

import { Form, Input, Button, Row, Col, Grid, Radio, message } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";

import TurnstileField from "../../common/TurnstileField"; // chỉnh path

// assets
import TKCL from "../../../assets/banner/hero.webp";

/* ẢNH FORM BÊN PHẢI */
const mapImage = TKCL;

const PHONE_RE = /^(0|\+84)(\d{9})$/; // 0xxxxxxxxx hoặc +84xxxxxxxxx (10 số)

// lấy site key từ .env
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

// hook breakpoint
const { useBreakpoint } = Grid;

// Hotline dùng chung
const HOTLINE_1 = "0978 999 043";
const HOTLINE_2 = "0905 402 989";
const HOTLINEGOINGAY = "0978999043";

export default function InteriorContactForm() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cfToken, setCfToken] = useState(""); // token Turnstile
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  // Map khung ngân sách -> số tiền ước lượng để đẩy vào Google Ads
  const budget = Form.useWatch("budget", form);

  const budgetValue = useMemo(() => {
    switch (budget) {
      case "Dưới 50 Triệu":
        return 30000000;
      case "50 - 100 Triệu":
        return 75000000;
      case "100 - 150 Triệu":
        return 125000000;
      case "Trên 150 Triệu":
        return 160000000;
      default:
        return 1000000;
    }
  }, [budget]);

  const onFinish = async (values) => {
    if (submitting) return;

    if (!TURNSTILE_SITE_KEY) {
      message.error("Thiếu TURNSTILE sitekey (REACT_APP_TURNSTILE_SITE_KEY)!");
      return;
    }

    // bắt buộc phải xác nhận Turnstile
    if (!cfToken) {
      message.error("Vui lòng xác nhận bảo mật trước khi gửi form!");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        area_floor: values.area_floor,
        location: values.location,
        budget: values.budget,
        message: values.message || "",
        form_type: "noi-that",
        turnstile_token: cfToken, // gửi token xuống backend
      };

      const response = await fetch(
        "https://api.nguyenhai.com.vn/api/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let errTxt = "";
        try {
          errTxt = await response.text();
        } catch {}
        throw new Error(`API ${response.status}: ${errTxt || "Gửi thất bại"}`);
      }

      // 🔥 BẮN GOOGLE ADS CONVERSION
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-17496261728/Cf4vCIHqlo0bEOCI75ZB",
          value: budgetValue,
          currency: "VND",
        });
      }

      // (Optional) cho GTM/Facebook đọc
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit_success",
        form_name: "ContactForm_NoiThat",
        budget: values.budget,
        location: values.location,
      });

      setSuccessMessage(
        "🎉 Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất."
      );
      message.success("Đã nhận thông tin! Cảm ơn bạn.");

      form.resetFields();
      setCfToken(""); // reset captcha cho lần sau
      setTurnstileResetKey((k) => k + 1); // reset Turnstile

      setTimeout(() => setSuccessMessage(""), 15000); // xóa thông báo sau 15s
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("❗ Lỗi gửi form:", error);
      }
      message.error("🚫 Đã có lỗi xảy ra khi gửi yêu cầu!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-interior interior-form" id="interior-form">
      <h1 className="interior-form-title">Liên hệ tư vấn thiết kế nội thất</h1>

      <Row gutter={32} className="interior-form-container">
        <Col xs={24} md={12} className="interior-form-left">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="contact-info-box">
              <h3 className="contact-subtitle-h3">
                Hãy để lại thông tin, đội ngũ{" "}
                <span className="highlight-blue">Nguyễn Hải</span> sẽ liên hệ tư
                vấn miễn phí cho anh/chị.
              </h3>
            </div>

            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Họ và tên" autoComplete="name" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  validator: (_, v) =>
                    !v || PHONE_RE.test(v)
                      ? Promise.resolve()
                      : Promise.reject("SĐT không hợp lệ (0/ +84 và 10 số)."),
                },
              ]}
            >
              <Input
                placeholder="Số điện thoại"
                inputMode="tel"
                autoComplete="tel"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email hợp lệ!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Email" autoComplete="email" />
            </Form.Item>

            <Form.Item
              name="area_floor"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập diện tích và số tầng!",
                },
              ]}
            >
              <Input placeholder="Diện tích & loại không gian cần thiết kế (VD: Nhà phố 3 tầng, căn hộ 2PN…)" />
            </Form.Item>

            <Form.Item
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa phương!" }]}
            >
              <Input placeholder="Địa phương / Khu vực công trình" />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "rgb(9, 108, 181)", fontWeight: 500 }}>
                  Ngân sách dự kiến cho thiết kế nội thất
                </span>
              }
              name="budget"
              rules={[{ required: true, message: "Vui lòng chọn ngân sách!" }]}
            >
              <Radio.Group style={{ width: "100%", fontWeight: 500 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <Radio value="Dưới 50 Triệu">Dưới 50 Triệu</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="50 - 100 Triệu">50 - 100 Triệu</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="100 - 150 Triệu">100 - 150 Triệu</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="Trên 150 Triệu">Trên 150 Triệu</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="message">
              <Input.TextArea
                rows={3}
                placeholder="Anh/chị có thể mô tả thêm về phong cách yêu thích, hiện trạng công trình…"
              />
            </Form.Item>

            <TurnstileField
              key={turnstileResetKey}
              siteKey={TURNSTILE_SITE_KEY}
              onToken={setCfToken}
              action="contact_noithat"
              theme="light"
            />

            {successMessage && (
              <div className="interior-success">{successMessage}</div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
                disabled={submitting}
                style={{ background: "#016bb4", border: "none" }}
              >
                {submitting ? "Đang gửi..." : "Gửi yêu cầu thiết kế nội thất"}
              </Button>
            </Form.Item>
          </Form>
        </Col>

        {screens.md && (
          <Col xs={24} md={12} className="interior-form-image-wrap">
            <div className="icf-right">
              {/* Card ảnh */}
              <div className="icf-right-media">
                <img
                  src={mapImage}
                  alt="Nguyễn Hải Design & Build"
                  className="icf-right-img"
                  loading="lazy"
                  decoding="async"
                />

                {/* Social dọc bên phải giống mẫu */}
                <div className="icf-right-socials">
                  <a
                    href="https://www.facebook.com/nguyenhaidesignandbuild"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icf-social-btn fb"
                    aria-label="Facebook"
                  >
                    <FacebookFilled />
                  </a>
                  <a
                    href="https://www.youtube.com/@thicongnhadanang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icf-social-btn yt"
                    aria-label="Youtube"
                  >
                    <YoutubeFilled />
                  </a>
                  <a
                    href="https://www.tiktok.com/@nguyenhai22.11.2012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icf-social-btn tt"
                    aria-label="TikTok"
                  >
                    <TikTokOutlined />
                  </a>
                </div>
              </div>

              {/* Card info dưới ảnh giống mẫu kiến trúc */}
              <div className="icf-right-info">
                <div className="icf-right-title">
                  PCD Nguyễn Hải · Thiết kế Nội thất Nhà phố &amp; Căn hộ
                </div>

                <div className="icf-right-hotline">
                  Hotline: <a href={`tel:${HOTLINEGOINGAY}`}>{HOTLINE_1}</a> ·{" "}
                  <a href="tel:0905402989">{HOTLINE_2}</a>
                </div>

                <div className="icf-right-actions">
                  <a className="icf-btn-primary" href={`tel:${HOTLINEGOINGAY}`}>
                    Gọi ngay
                  </a>
                  <a
                    className="icf-btn-outline"
                    href="https://zalo.me/0978999043"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nhắn Zalo
                  </a>
                </div>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </section>
  );
}
