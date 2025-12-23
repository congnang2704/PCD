// ContactFormMail.js
import React, { useMemo, useState } from "react";
import { Form, Input, Button, message, Row, Col, Grid, Radio } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import TurnstileField from "../../common/TurnstileField";

import "./ContactFormMail.css";
import TKCL from "../../../assets/banner/hero.webp";

/* ẢNH INTRO BÊN PHẢI */
const mapImage = TKCL;

const { useBreakpoint } = Grid;

// 👉 Phone regex
const PHONE_RE = /^(0|\+84)(\d{9})$/;

// 👉 lấy TURNSTILE KEY từ .env
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cfToken, setCfToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0); // ✅ reset Turnstile an toàn

  // ✅ Watch budget để value cập nhật realtime (không bị “đứng” như getFieldValue trong useMemo)
  const budget = Form.useWatch("budget", form);

  // 👉 map ngân sách -> value Google Ads
  const budgetValue = useMemo(() => {
    switch (budget) {
      case "1.5 - 1.6 Tỷ":
        return 1550000000;
      case "1.7 - 1.9 Tỷ":
        return 1800000000;
      case "2 - 2.4 Tỷ":
        return 2200000000;
      case "Trên 2.5 Tỷ":
        return 2500000000;
      default:
        return 1000000;
    }
  }, [budget]);

  const onFinish = async (values) => {
    if (submitting) return;

    // ❗ nếu chưa verify Turnstile → không cho submit
    if (!cfToken) {
      message.error("Vui lòng xác nhận bảo mật trước khi gửi form!");
      return;
    }

    // ❗ nếu thiếu sitekey → báo rõ
    if (!TURNSTILE_SITE_KEY) {
      message.error("Thiếu TURNSTILE sitekey (REACT_APP_TURNSTILE_SITE_KEY)!");
      return;
    }

    setSubmitting(true);

    const templateParams = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      area: values.area,
      location: values.location,
      budget: values.budget,
      note: values.note || "",
      turnstile_token: cfToken,
    };

    try {
      // Gửi EmailJS + API song song
      await Promise.all([
        emailjs.send(
          "service_i4rltcy",
          "template_hhuh2rd",
          templateParams,
          "54eQlmIQbspQwiCm4"
        ),

        fetch("https://api.nguyenhai.com.vn/api/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            email: values.email,
            area_floor: values.area,
            location: values.location,
            budget: values.budget,
            message: values.note || "",
            form_type: "xay-dung",
            turnstile_token: cfToken,
          }),
        }).then((res) => {
          if (!res.ok) throw new Error("Gửi API thất bại");
        }),
      ]);

      // Google Ads conversion
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-17496261728/Cf4vCIHqlo0bEOCI75ZB",
          value: budgetValue,
          currency: "VND",
        });
      }

      // Push dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit_success",
        form_name: "ContactForm_XayDung",
        budget: values.budget,
        location: values.location,
      });

      // UI feedback
      setSuccessMessage(
        "🎉 Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất."
      );
      message.success("Đã nhận thông tin! Cảm ơn bạn.");

      form.resetFields();

      // ✅ reset turnstile token + ép Turnstile render lại sạch
      setCfToken("");
      setTurnstileResetKey((k) => k + 1);

      setTimeout(() => setSuccessMessage(""), 15000);
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
    <div className="form-wrapper">
      <div className="form-background-overlay">
        <h1 className="form-title-h1">Liên hệ với chúng tôi</h1>

        <Row gutter={32} className="form-container">
          {/* FORM BÊN TRÁI */}
          <Col xs={24} md={12} className="form-contact">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <div className="contact-info-box">
                <h3 className="contact-subtitle">
                  Để lại thông tin dưới đây <br /> Nguyễn Hải Design &amp; Build
                  sẽ gọi lại tư vấn chi tiết cho bạn
                </h3>
              </div>

              {/* Họ tên */}
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input placeholder="Họ và tên" autoComplete="name" />
              </Form.Item>

              {/* Số điện thoại */}
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    validator: (_, v) =>
                      !v || PHONE_RE.test(v)
                        ? Promise.resolve()
                        : Promise.reject("Số điện thoại không hợp lệ!"),
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" inputMode="tel" />
              </Form.Item>

              {/* Email */}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Email" autoComplete="email" />
              </Form.Item>

              {/* Diện tích */}
              <Form.Item
                name="area"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập diện tích và số tầng!",
                  },
                ]}
              >
                <Input placeholder="Diện tích đất và số tầng muốn xây" />
              </Form.Item>

              {/* Địa phương */}
              <Form.Item
                name="location"
                rules={[
                  { required: true, message: "Vui lòng nhập địa phương!" },
                ]}
              >
                <Input placeholder="Địa phương muốn xây" />
              </Form.Item>

              {/* Ngân sách */}
              <Form.Item
                label={
                  <span style={{ color: "rgb(9, 108, 181)", fontWeight: 500 }}>
                    Ngân sách
                  </span>
                }
                name="budget"
                rules={[
                  { required: true, message: "Vui lòng chọn ngân sách!" },
                ]}
              >
                <Radio.Group style={{ width: "100%" }}>
                  <Row gutter={[10, 10]}>
                    <Col span={12} md={6}>
                      <Radio value="1.5 - 1.6 Tỷ">1.5 - 1.6 Tỷ</Radio>
                    </Col>
                    <Col span={12} md={6}>
                      <Radio value="1.7 - 1.9 Tỷ">1.7 - 1.9 Tỷ</Radio>
                    </Col>
                    <Col span={12} md={6}>
                      <Radio value="2 - 2.4 Tỷ">2 - 2.4 Tỷ</Radio>
                    </Col>
                    <Col span={12} md={6}>
                      <Radio value="Trên 2.5 Tỷ">Trên 2.5 Tỷ</Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>

              {/* Ghi chú */}
              <Form.Item name="note">
                <Input.TextArea
                  rows={2}
                  placeholder="Yêu cầu chi tiết nếu có!"
                />
              </Form.Item>

              {/* 🔒 TURNSTILE CAPTCHA */}
              <div className="turnstile-slot">
                <TurnstileField
                  siteKey={TURNSTILE_SITE_KEY}
                  onToken={setCfToken}
                  action="contactform_xaydung"
                  theme="light"
                />
              </div>

              {/* Success message */}
              {successMessage && (
                <div
                  style={{
                    marginBottom: 16,
                    backgroundColor: "#f6ffed",
                    border: "1px solid #52c41a",
                    color: "#389e0d",
                    padding: "10px 16px",
                    borderRadius: 6,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {successMessage}
                </div>
              )}

              {/* Submit */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={submitting}
                  disabled={submitting}
                  style={{ background: "#016bb4", border: "none" }}
                >
                  {submitting ? "Đang gửi..." : "Gửi yêu cầu!"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {/* ẢNH + BOX THÔNG TIN + SOCIAL BÊN PHẢI */}
          <Col xs={24} md={12} className="form-side form-side--responsive">
            <div className="side-card">
              {/* ẢNH */}
              <div className="side-image-block">
                <img
                  src={mapImage}
                  alt="Đại diện Nguyễn Hải Design & Build"
                  className="side-image"
                  loading={screens.md ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              {/* BOX THÔNG TIN + CTA */}
              <div className="side-info">
                <p className="side-info-title">
                  PCD Nguyễn Hải · Thiết kế Kiến trúc Nhà phố &amp; Biệt thự
                </p>
                <p className="side-info-subtitle">
                  Hotline: 0978 999 043 · 0905 402 989
                </p>

                <div className="side-actions">
                  <a
                    href="tel:0978999043"
                    className="side-btn side-btn-primary"
                  >
                    Gọi ngay
                  </a>
                  <a
                    href="https://zalo.me/0978999043"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="side-btn side-btn-outline"
                  >
                    Nhắn Zalo
                  </a>
                </div>
              </div>

              {/* SOCIAL ICONS */}
              <div className="side-social">
                <a
                  href="https://www.facebook.com/nguyenhaidesignandbuild"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-social-icon fb"
                >
                  <FacebookFilled />
                </a>

                <a
                  href="https://www.youtube.com/@thicongnhadanang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-social-icon yt"
                >
                  <YoutubeFilled />
                </a>

                <a
                  href="https://www.tiktok.com/@nguyenhai22.11.2012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-social-icon tt"
                >
                  <TikTokOutlined />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
