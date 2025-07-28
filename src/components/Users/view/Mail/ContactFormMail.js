import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col, Grid, Radio } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import "./ContactFormMail.css";

const { useBreakpoint } = Grid;

const ContactForm = () => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = (values) => {
    const templateParams = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      area: values.area,
      location: values.location,
      budget: values.budget,
      note: values.note || "",
    };

    emailjs
      .send(
        "service_i4rltcy",
        "template_hhuh2rd",
        templateParams,
        "54eQlmIQbspQwiCm4"
      )
      .then(() => {
        setSuccessMessage(
          "🎉 Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất."
        );
        form.resetFields();
        setTimeout(() => setSuccessMessage(""), 15000); // 15 seconds
      })
      .catch((error) => {
        console.error("❗ EmailJS Error:", error);
        message.error("🚫 Đã có lỗi xảy ra khi gửi yêu cầu!");
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title-h1">Liên hệ với chúng tôi</h1>
      <Row gutter={32} className="form-container">
        <Col xs={24} md={12}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

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

            <Form.Item
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa phương!" }]}
            >
              <Input placeholder="Địa phương muốn xây" />
            </Form.Item>

            <Form.Item
              label="Ngân sách (*)"
              name="budget"
              rules={[{ required: true, message: "Vui lòng chọn ngân sách!" }]}
            >
              <Radio.Group style={{ width: "100%" }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <Radio value="1.5 - 1.6 tỷ">1.5 - 1.6 tỷ</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="1.7 - 1.9 tỷ">1.7 - 1.9 tỷ</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="2 - 2.4 tỷ">2 - 2.4 tỷ</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="Trên 2.5 tỷ">Trên 2.5 tỷ</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="note">
              <Input.TextArea rows={2} placeholder="Yêu cầu chi tiết nếu có!" />
            </Form.Item>

            {/* ✅ Hiển thị thông báo thành công */}
            {successMessage && (
              <div
                style={{
                  marginBottom: 16,
                  backgroundColor: "#f6ffed",
                  border: "1px solid #52c41a",
                  color: "#389e0d",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  textAlign: "center",
                }}
              >
                {successMessage}
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ background: "#016bb4", border: "none" }}
              >
                Gửi yêu cầu!
              </Button>
            </Form.Item>
          </Form>
        </Col>

        {screens.md && (
          <Col xs={24} md={12} className="image-container">
            <div style={{ position: "relative" }}>
              <img
                src="https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2021/2/16/photo1613453220800-1613453220972454302062.png"
                alt="Representative"
                className="form-image"
              />
              <div className="social-buttons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon fb"
                >
                  <FacebookFilled style={{ fontSize: "18px" }} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon yt"
                >
                  <YoutubeFilled style={{ fontSize: "18px" }} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon tt"
                >
                  <TikTokOutlined style={{ fontSize: "18px" }} />
                </a>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ContactForm;
