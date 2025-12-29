import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Button, Radio, Row, Col, message } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
  MailOutlined,
  GlobalOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
} from "@ant-design/icons";
import TurnstileField from "../../common/TurnstileField";
import "./Contact_Us.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import LazyMap from "../../Map/LazyMap";

const PHONE_RE = /^(0|\+84)(\d{9})$/;
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

const GOOGLE_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.65756103426105!2d108.21857909058232!3d16.038432872637518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ebcbd51bd5%3A0x8e876b8c5e887aad!2zQ8O0bmcgdHkgVE5ISCBNVFYgUENEIE5HVVnhu4ROIEjhuqJJ!5e0!3m2!1svi!2s!4v1766976670520!5m2!1svi!2s";

const COMPANY_LEGAL_NAME = "CÔNG TY TNHH MỘT THÀNH VIÊN PCD NGUYỄN HẢI";
const COMPANY_TAX_ID = "0401518783";
const COMPANY_BIZ_CERT_NO = "";
const PRIVACY_POLICY_URL = "https://nguyenhai.com.vn/chinh-sach-bao-mat";

const WEBSITE_1 = "https://nguyenhai.com.vn";
const WEBSITE_2 = "https://thicongnhadanang.vn";

function ContactUsForm() {
  const [form] = Form.useForm();
  const [successMsgVisible, setSuccessMsgVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cfToken, setCfToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  // ✅ hiển thị link gọn (không làm dài quá trên mobile)
  const privacyDisplay = useMemo(() => {
    try {
      return (PRIVACY_POLICY_URL || "").replace(/^https?:\/\//, "");
    } catch {
      return PRIVACY_POLICY_URL;
    }
  }, []);

  const budgetToValue = useCallback((b) => {
    switch (b) {
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
  }, []);

  const onFinish = useCallback(
    async (values) => {
      if (submitting) return;

      if (!cfToken) {
        message.error("Vui lòng xác nhận bảo mật trước khi gửi form!");
        return;
      }
      if (!TURNSTILE_SITE_KEY) {
        message.error(
          "Thiếu TURNSTILE sitekey (REACT_APP_TURNSTILE_SITE_KEY)!"
        );
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
          form_type: "xay-dung",
          turnstile_token: cfToken,
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
          const errText = await response.text().catch(() => "");
          throw new Error(
            `API ${response.status}: ${errText || "Gửi thất bại"}`
          );
        }

        if (window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-17496261728/Cf4vCIHqlo0bEOCI75ZB",
            value: budgetToValue(values.budget),
            currency: "VND",
          });
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit_success",
          form_name: "Contact_Us_Form",
          budget: values.budget,
          location: values.location,
        });

        setSuccessMsgVisible(true);
        message.success("🎉 Đã nhận thông tin! Chúng tôi sẽ liên hệ sớm nhất.");

        form.resetFields();
        setCfToken("");
        setTurnstileResetKey((k) => k + 1);

        setTimeout(() => setSuccessMsgVisible(false), 15000);
      } catch (error) {
        if (process.env.NODE_ENV !== "production")
          console.error("❗ Lỗi gửi form:", error);
        message.error("🚫 Đã có lỗi xảy ra khi gửi yêu cầu!");
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, cfToken, budgetToValue, form]
  );

  return (
    <div className="contact-us-container">
      <div className="contact-us-header-new">
        <h1 className="contact-title-big">LIÊN HỆ NGUYỄN HẢI</h1>
        <p className="contact-subtitle-big">
          Chúng tôi luôn sẵn sàng hỗ trợ quý khách – Tư vấn hoàn toàn miễn phí
        </p>
      </div>

      <div className="contact-us-body">
        <div className="contact-us-center">
          {/* ... giữ nguyên block mô tả ... */}
          <div className="contact-description-block">
            <h2 className="contact-title">
              ✨ NGUYỄN HẢI – KIẾN TẠO KHÔNG GIAN, NÂNG TẦM GIÁ TRỊ ✨
            </h2>

            <p className="contact-paragraph">
              Là một trong những đơn vị{" "}
              <strong>Thiết kế – Thi công trọn gói</strong> uy tín hàng đầu tại
              Miền Trung, Nguyễn Hải luôn tự hào mang đến những công trình
              <strong> bền vững</strong>, <strong>thẩm mỹ</strong> và{" "}
              <strong>tối ưu công năng</strong>.
            </p>

            <p className="contact-paragraph">
              Chúng tôi tin rằng mỗi ngôi nhà không chỉ là nơi để ở, mà là một
              hành trình xây dựng hạnh phúc. Cam kết đồng hành cùng bạn từ những
              bước đầu tiên của ý tưởng đến khi hoàn thiện ngôi nhà mơ ước.
            </p>

            <p className="contact-paragraph">
              Hơn 13 năm hoạt động, Nguyễn Hải luôn nỗ lực phát triển để trở
              thành người bạn đồng hành đáng tin cậy. Chúng tôi rất mong được
              lắng nghe và hỗ trợ bạn trong hành trình xây dựng tổ ấm. Hãy liên
              hệ với chúng tôi ngay hôm nay!
            </p>
          </div>

          <div className="contact-us-address">
            {/* ✅ LEGAL BOX */}
            <div className="contact-legal-box">
              <strong>THÔNG TIN PHÁP LÝ</strong>

              <div className="legal-list">
                <div className="legal-item">
                  <IdcardOutlined className="legal-icon" />
                  <div className="legal-label">Tên pháp lý</div>
                  <div className="legal-value">{COMPANY_LEGAL_NAME}</div>
                </div>

                <div className="legal-item">
                  <SafetyCertificateOutlined className="legal-icon" />
                  <div className="legal-label">MST/Mã số DN</div>
                  <div className="legal-value">{COMPANY_TAX_ID}</div>
                </div>

                {!!COMPANY_BIZ_CERT_NO && (
                  <div className="legal-item">
                    <LockOutlined className="legal-icon" />
                    <div className="legal-label">GCN ĐKDN</div>
                    <div className="legal-value">{COMPANY_BIZ_CERT_NO}</div>
                  </div>
                )}

                <div className="legal-item">
                  <LockOutlined className="legal-icon" />
                  <div className="legal-label">Chính sách</div>
                  <div className="legal-value">
                    <a
                      className="legal-link"
                      href={PRIVACY_POLICY_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {privacyDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ VĂN PHÒNG */}
            <div className="contact-legal-box">
              <strong>VĂN PHÒNG LÀM VIỆC</strong>

              <div className="contact-row">
                <FaLocationDot className="contacts-icon" />
                <span>17 Nguyễn Cư Trinh, P. Hòa Cường, Đà Nẵng</span>
              </div>

              <div className="contact-row">
                <FaPhoneAlt className="contacts-icon" />
                <span>0978 999 043 – 0905 402 989</span>
              </div>

              <div className="contact-row">
                <MailOutlined className="contacts-icon" />
                <span>hotro.nguyenhai.com.vn@gmail.com</span>
              </div>

              {/* ✅ thêm separator cho đẹp + wrap chuẩn */}
              <div className="contact-row web-row">
                <GlobalOutlined className="contacts-icon" />
                <a href={WEBSITE_1} target="_blank" rel="noreferrer noopener">
                  nguyenhai.com.vn
                </a>
                <span className="sep">|</span>
                <a href={WEBSITE_2} target="_blank" rel="noreferrer noopener">
                  thicongnhadanang.vn
                </a>
              </div>
            </div>
          </div>

          {/* ... giữ nguyên phần social ... */}
          <div className="contact-social-icons">
            <a
              href="https://www.facebook.com/nguyenhaidesignandbuild"
              className="icon"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FacebookFilled />
            </a>

            <a
              href="https://www.youtube.com/@thicongnhadanang"
              className="icon"
              target="_blank"
              rel="noreferrer noopener"
            >
              <YoutubeFilled />
            </a>

            <a
              href="https://www.tiktok.com/@nguyenhai22.11.2012"
              className="icon"
              target="_blank"
              rel="noreferrer noopener"
            >
              <TikTokOutlined />
            </a>
          </div>
        </div>

        {/* ... giữ nguyên cột form ... */}
        <div className="contact-us-right">
          <div className="contact-info-box">
            <h3 className="contact-title">
              Hãy để lại thông tin tại form liên hệ nhé!
            </h3>
            <h3 className="contact-subtitle">
              Chúng tôi sẽ tư vấn miễn phí cho bạn
            </h3>
          </div>

          <Form
            name="contactForm"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            validateTrigger={["onBlur", "onSubmit"]}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>

            <Row gutter={10}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập SĐT!" },
                    {
                      validator: (_, v) =>
                        !v || PHONE_RE.test(v)
                          ? Promise.resolve()
                          : Promise.reject(
                              "SĐT không hợp lệ (0/+84 và 10 số)."
                            ),
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
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
              name="area_floor"
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
              name="budget"
              label={<span className="budget-label">Ngân sách</span>}
              rules={[{ required: true, message: "Vui lòng chọn ngân sách!" }]}
            >
              <Radio.Group className="budget-radio-group">
                <Radio value="1.5 - 1.6 Tỷ">1.5 - 1.6 Tỷ</Radio>
                <Radio value="1.7 - 1.9 Tỷ">1.7 - 1.9 Tỷ</Radio>
                <Radio value="2 - 2.4 Tỷ">2 - 2.4 Tỷ</Radio>
                <Radio value="Trên 2.5 Tỷ">Trên 2.5 Tỷ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="message">
              <Input.TextArea rows={3} placeholder="Ghi chú thêm..." />
            </Form.Item>

            <div className="turnstile-wrapper">
              <TurnstileField
                key={turnstileResetKey}
                siteKey={TURNSTILE_SITE_KEY}
                onToken={setCfToken}
                action="contact_us_xaydung"
                theme="light"
              />
            </div>

            {successMsgVisible && (
              <div className="success-box">
                🎉 Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
                className="contact-submit-btn"
              >
                {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <LazyMap src={GOOGLE_MAP_EMBED} height={500} rootMargin="400px" />
    </div>
  );
}

export default React.memo(ContactUsForm);
