import React, { useState } from "react";
import { Form, Input, Button, Radio, Row, Col, message } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
  MailOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import "./Contact_Us.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const Container_Contacts = () => {
  const [form] = Form.useForm();
  const [successMsgVisible, setSuccessMsgVisible] = useState(false);

  const onFinish = async (values) => {
    const templateParams = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      area: values.area,
      location: values.location,
      budget: values.budget,
      note: values.note || "",
    };

    try {
      await emailjs.send(
        "service_i4rltcy",
        "template_hhuh2rd",
        templateParams,
        "54eQlmIQbspQwiCm4"
      );

      form.resetFields();
      setSuccessMsgVisible(true);
      setTimeout(() => {
        setSuccessMsgVisible(false);
      }, 15000); // 15 giây
    } catch (error) {
      message.error("🚫 Gửi yêu cầu thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="contact-us-container">
      {/* Banner */}
      <div className="contact-us-header" />

      <div className="contact-us-body">
        <div className="contact-us-center">
          <h2>NGUYỄN HẢI</h2>
          <p className="contact-us-description">
            Nói đến các công ty Thiết kế thi công trọn gói thì NGUYỄN HẢI luôn
            là một trong những đơn vị uy tín dẫn đầu tại Miền Trung. Với nhiều
            năm kinh nghiệm, NGUYỄN HẢI luôn mong muốn mang lại cho khách hàng
            giá trị đích thực, phù hợp kiến trúc tại địa phương với tính thẩm mỹ
            và chất lượng xây dựng với chi phí hợp lí.
          </p>
          <p className="contact-us-address">
            <strong>VĂN PHÒNG LÀM VIỆC:</strong>
            <br />
            <FaLocationDot className="footer-icon" /> Địa chỉ: 17 Nguyễn Cư
            Trinh, P. Hòa Cường, Tp. Đà Nẵng
            <br />
            <FaPhoneAlt className="footer-icon" /> Điện thoại: 0905.402.989
            <br /> <MailOutlined className="footer-icon" /> Email:{" "}
            <a
              className="contact-us-email"
              href="mailto:nguyenhai.deco@gmail.com"
            >
              thicongnhadanang.vn@gmail.com
            </a>
            <br />
            <GlobalOutlined className="footer-icon" /> Website:{" "}
            <a
              className="contact-us-website"
              href="https://thicongnhadanang.vn"
              target="_blank"
              rel="noreferrer"
            >
              thicongnhadanang.vn
            </a>
            <br />
            <GlobalOutlined className="footer-icon" /> Website:{" "}
            <a
              className="contact-us-website"
              href="https://nguyenhai.com.vn"
              target="_blank"
              rel="noreferrer"
            >
              nguyenhai.com.vn
            </a>
          </p>

          <div className="contact-social-icons">
            <a
              href="https://facebook.com"
              className="icon"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookFilled />
            </a>
            <a
              href="https://youtube.com"
              className="icon"
              target="_blank"
              rel="noreferrer"
            >
              <YoutubeFilled />
            </a>
            <a
              href="https://tiktok.com"
              className="icon"
              target="_blank"
              rel="noreferrer"
            >
              <TikTokOutlined />
            </a>
          </div>
        </div>

        <div className="contact-us-right">
          <h2 className="form-title">Thông tin tư vấn khách hàng</h2>

          <Form
            name="contactForm"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={() =>
              message.error("🚫 Vui lòng điền đầy đủ thông tin trước khi gửi!")
            }
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Email không hợp lệ!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="area"
              rules={[{ required: true, message: "Vui lòng nhập diện tích!" }]}
            >
              <Input placeholder="VD: 100m2 - 3 tầng" />
            </Form.Item>

            <Form.Item
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
            >
              <Input placeholder="VD: Đà Nẵng, TP.HCM..." />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "rgb(9, 108, 181)", fontWeight: 500 }}>
                  Ngân sách
                </span>
              }
              name="budget"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngân sách thiết kế nội thất!",
                },
              ]}
            >
              <Radio.Group className="budget-radio-group">
                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    <Radio value="1.5 - 1.6 Tỷ">1.5 - 1.6 Tỷ</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value="1.7 - 1.9 Tỷ">1.7 - 1.9 Tỷ</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value="2 - 2.4 Tỷ">2 - 2.4 Tỷ</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value="Trên 2.5 Tỷ">Trên 2.5 Tỷ</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="note">
              <Input.TextArea
                rows={3}
                placeholder="Ghi chú thêm về yêu cầu của bạn..."
              />
            </Form.Item>

            {/* Thông báo thành công */}
            {successMsgVisible && (
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
                🎉 Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#016bb4", border: "none" }}
                block
              >
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Google Map */}
      <div className="contact-us-map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5193957187444!2d108.21655737579178!3d16.03851504025814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ebcdea2721%3A0x6cc7a70c8e235968!2zMTcgTmd1eeG7hW4gQ8awIFRyaW5oLCBIb8OgIEPGsOG7nW5nIELhuq9jLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1753498896204!5m2!1svi!2s"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Container_Contacts;
