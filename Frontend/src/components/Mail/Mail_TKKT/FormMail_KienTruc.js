import React, { useCallback, useState } from "react";
import { Form, Input, Button, Row, Col, Radio, message } from "antd";
import TurnstileField from "../../common/TurnstileField"; // chỉnh path

import { FaRegSmileBeam } from "react-icons/fa";
import {
  FacebookFilled,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

const PHONE_RE = /^(0|\+84)(\d{9})$/;
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

function budgetToValue(b) {
  switch (b) {
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
}

/**
 * Form Mail cho trang Thiết Kế Kiến Trúc (form_type: "kien-truc")
 * Giữ nguyên UI + logic như trong page.
 */
const ContactForm_KienTruc = ({ mapImage }) => {
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cfToken, setCfToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0); // 👈 THÊM NGÀY 20-12

  const onFinish = useCallback(
    async (values) => {
      if (submitting) return;

      if (!TURNSTILE_SITE_KEY) {
        message.error(
          "Thiếu TURNSTILE sitekey (REACT_APP_TURNSTILE_SITE_KEY)!"
        );
        return;
      }

      // ❗ BẮT BUỘC phải xác nhận Turnstile trước khi gửi
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
          form_type: "kien-truc",
          turnstile_token: cfToken, // gửi token xuống backend
        };

        const res = await fetch("https://api.nguyenhai.com.vn/api/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          let err = "";
          try {
            err = await res.text();
          } catch {}
          throw new Error(`API ${res.status}: ${err || "Gửi thất bại"}`);
        }

        // Google Ads Conversion
        if (window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-17496261728/Cf4vCIHqlo0bEOCI75ZB",
            value: budgetToValue(values.budget),
            currency: "VND",
          });
        }

        // GTM / dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit_success",
          form_name: "ContactForm_KienTruc",
          budget: values.budget,
          location: values.location,
        });

        setSuccessMessage(
          "🎉 Gửi yêu cầu thành công! Kiến trúc sư Nguyễn Hải sẽ liên hệ tư vấn thiết kế trong thời gian sớm nhất."
        );
        message.success("Đã nhận thông tin, cảm ơn anh/chị!");

        form.resetFields();
        setCfToken("");
        setTurnstileResetKey((k) => k + 1); // 👈 THÊM DÒNG NÀY NGÀY 20-12

        setTimeout(() => setSuccessMessage(""), 15000); // 👈 THÊM DÒNG NÀY NGÀY 20-12
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("❗ Lỗi gửi form:", error);
        }
        message.error("🚫 Đã có lỗi xảy ra khi gửi yêu cầu!");
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, cfToken, form]
  );

  return (
    <section
      id="form-lien-he"
      className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-5"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-sky-700">
          Gửi thông tin để kiến trúc sư tư vấn phương án thiết kế phù hợp
        </h2>
        <p className="text-[15px] text-slate-600 max-w-2xl">
          Anh/chị chỉ cần để lại thông tin cơ bản. Nếu có sẵn{" "}
          <span className="font-semibold">
            sổ đỏ, mặt bằng hiện trạng hoặc hình ảnh nhà đang ở
          </span>
          , hãy ghi chú trong form – đội ngũ{" "}
          <span className="font-semibold text-sky-700">PCD Nguyễn Hải</span> sẽ
          liên hệ để trao đổi kỹ hơn về <strong>phương án kiến trúc</strong>.
        </p>
      </div>

      {/* form liên hệ */}
      <div className="grid gap-8 md:grid-cols-[1.2fr,0.9fr] items-stretch">
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 md:p-6">
          <div className="mb-4 rounded-2xl border border-dashed border-sky-300 bg-sky-50/80 px-4 py-3 flex items-start gap-2">
            <FaRegSmileBeam className="mt-0.5 text-sky-600" />
            <h3 className="m-0 text-[14px] font-semibold text-sky-900">
              Hãy để lại thông tin ở form dưới đây,
              <br />
              <span className="font-normal text-sky-800">
                chúng tôi sẽ gọi tư vấn miễn phí &amp; gợi ý{" "}
                <strong>phương án thiết kế kiến trúc</strong> phù hợp để anh/chị
                tham khảo trước khi quyết định.
              </span>
            </h3>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Họ và tên" autoComplete="name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
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
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Email" autoComplete="email" />
            </Form.Item>

            <Form.Item
              name="area_floor"
              label="Diện tích & số tầng dự kiến"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập diện tích và số tầng!",
                },
              ]}
            >
              <Input placeholder="Ví dụ: 5x20m, 3 tầng + tum" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Khu vực / Địa phương"
              rules={[{ required: true, message: "Vui lòng nhập khu vực!" }]}
            >
              <Input placeholder="Ví dụ: Hòa Xuân – Cẩm Lệ – Đà Nẵng" />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sky-800 font-semibold">
                  Ngân sách dự kiến cho thiết kế kiến trúc
                </span>
              }
              name="budget"
              rules={[{ required: true, message: "Vui lòng chọn ngân sách!" }]}
            >
              <Radio.Group className="w-full font-medium">
                <Row gutter={[8, 8]}>
                  <Col xs={12} sm={12} md={6}>
                    <Radio value="Dưới 50 Triệu">Dưới 50 Triệu</Radio>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <Radio value="50 - 100 Triệu">50 - 100 Triệu</Radio>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <Radio value="100 - 150 Triệu">100 - 150 Triệu</Radio>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <Radio value="Trên 150 Triệu">Trên 150 Triệu</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="message" label="Ghi chú (nếu có)">
              <Input.TextArea
                rows={3}
                placeholder="Ví dụ: Đất 2 mặt tiền, thích phong cách hiện đại/Indochine, cần 3 phòng ngủ, có phòng làm việc..."
              />
            </Form.Item>

            {/* 🔒 Turnstile CAPTCHA */}
            <TurnstileField
              key={turnstileResetKey} // 👈 BẮT BUỘC THÊM NGÀY 20-12
              siteKey={TURNSTILE_SITE_KEY}
              onToken={setCfToken}
              action="contact_kientruc"
              theme="light"
            />

            {successMessage && (
              <div className="mb-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {successMessage}
              </div>
            )}

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
                disabled={submitting}
                className="h-11 rounded-full !bg-sky-600 hover:!bg-sky-700 border-0 font-semibold"
              >
                {submitting
                  ? "Đang gửi..."
                  : "Gửi yêu cầu tư vấn thiết kế kiến trúc"}
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Side visual NEW */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 md:p-6 hidden md:flex flex-col gap-4 h-full justify-center">
          {/* ẢNH */}
          <div className="relative w-full h-[350px] rounded-3xl overflow-hidden shadow-xl bg-white flex items-center justify-center">
            <img
              src={mapImage}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* KHỐI DƯỚI: BOX THÔNG TIN + SOCIAL */}
          <div className="relative w-full">
            {/* BOX THÔNG TIN + CTA */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg px-5 py-4">
              <p className="font-semibold text-slate-900 text-[15px]">
                PCD Nguyễn Hải · Thiết kế Kiến trúc Nhà phố &amp; Biệt thự
              </p>

              <p className="text-[13px] text-slate-600 mt-0.5">
                Hotline: 0978 999 043 · 0905 402 989
              </p>

              <div className="flex gap-2 mt-3">
                <a
                  href="tel:0978999043"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-[13px] font-semibold text-white rounded-full shadow-md bg-[#096cb5] hover:bg-[#075a91] transition-all"
                >
                  Gọi ngay
                </a>

                <a
                  href="https://zalo.me/0978999043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-[13px] font-semibold rounded-full border border-[#096cb5] text-[#096cb5] bg-white hover:bg-[#096cb51a] transition-all"
                >
                  Nhắn Zalo
                </a>
              </div>
            </div>

            {/* SOCIAL ICONS – NGOÀI BÊN PHẢI */}
            <div className="hidden lg:flex flex-col gap-2 absolute -right-6 top-1/2 -translate-y-1/2">
              <a
                href="https://www.facebook.com/nguyenhaidesignandbuild"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-[#1877F2]"
              >
                <FacebookFilled style={{ fontSize: 18 }} />
              </a>

              <a
                href="https://www.youtube.com/@thicongnhadanang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-[#FF0000]"
              >
                <YoutubeFilled style={{ fontSize: 18 }} />
              </a>

              <a
                href="https://www.tiktok.com/@nguyenhai22.11.2012"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-black"
              >
                <TikTokOutlined style={{ fontSize: 18 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactForm_KienTruc);
