import React, { useMemo, useState, useRef, useEffect } from "react";
import "./Interior.css";

import { Form, Input, Button, Row, Col, Grid, Radio, message } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";

import Turnstile from "react-turnstile";

import FAQComponent from "../../view/FAQComponent/FAQComponent";

// assets
import noithat from "../../../../assets/mau noi that.jpg";
import cttb1House from "../../../../assets/PK3.png";
import cttb2House from "../../../../assets/PK1.png";
import cttb3House from "../../../../assets/PN1V1.png";

import cttb4House from "../../../../assets/TKNT/1.webp";
import cttb5House from "../../../../assets/TKNT/2.webp";
import cttb6House from "../../../../assets/TKNT/3.webp";
import cttb7House from "../../../../assets/TKNT/4.webp";
import cttb8House from "../../../../assets/TKNT/5.webp";
import cttb9House from "../../../../assets/TKNT/6.webp";
import cttb10House from "../../../../assets/TKNT/7.webp";
import cttb11House from "../../../../assets/TKNT/12.webp";
import cttb12House from "../../../../assets/TKNT/17.webp";
import cttb13House from "../../../../assets/TKNT/30.webp";

import TKCL from "../../../../assets/banner/hero.webp";

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

const Interior = () => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cfToken, setCfToken] = useState(""); // token Turnstile

  // Map khung ngân sách -> số tiền ước lượng để đẩy vào Google Ads
  const budgetValue = useMemo(() => {
    const b = form.getFieldValue("budget");
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
  }, [form]);

  const onFinish = async (values) => {
    if (submitting) return;

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

      // window.location.href = "/thank-you";
    } catch (error) {
      console.error("❗ Lỗi khi gửi dữ liệu:", error);
      message.error("🚫 Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  // ===== SLIDER CÔNG TRÌNH NỘI THẤT =====
  const portfolioItems = [
    {
      src: cttb4House,
      alt: "Nội thất phòng khách – Nguyễn Hải",
      caption:
        "Phòng khách sang trọng, đường nét tinh giản – tối ưu ánh sáng tự nhiên.",
    },
    {
      src: cttb5House,
      alt: "Không gian bếp – ăn",
      caption:
        "Không gian bếp – ăn hiện đại, tủ bếp cao cấp, điểm nhấn mặt đá marble sang trọng.",
    },
    {
      src: cttb6House,
      alt: "Nội thất phòng ngủ – Nguyễn Hải",
      caption:
        "Phòng ngủ thư giãn với tone kem – ánh sáng mềm mại, nội thất ấm áp.",
    },
    {
      src: cttb7House,
      alt: "Phòng khách phong cách nhiệt đới",
      caption:
        "Phòng khách phong cách nhiệt đới – không gian xanh hài hòa và thoải mái.",
    },
    {
      src: cttb8House,
      alt: "Nội thất phòng ngủ – Nguyễn Hải",
      caption:
        "Phòng ngủ ấm áp với gỗ tự nhiên – thiết kế tinh tế, mang cảm giác thư giãn.",
    },
    {
      src: cttb9House,
      alt: "Nội thất phòng khách – Nguyễn Hải",
      caption:
        "Phòng khách hiện đại, tối ưu ánh sáng – vật liệu đá marble tạo điểm nhấn sang trọng.",
    },
    {
      src: cttb10House,
      alt: "Nội thất phòng khách – Nguyễn Hải",
      caption:
        "Không gian khách tinh tế – phối màu pastel nhẹ nhàng, phong cách hiện đại trẻ trung.",
    },
    {
      src: cttb11House,
      alt: "Không gian khách – bếp – ăn",
      caption:
        "Không gian liên thông khách – bếp – ăn, bố trí khoa học, ánh sáng ấm áp.",
    },
    {
      src: cttb12House,
      alt: "Nội thất phòng khách – Nguyễn Hải",
      caption:
        "Phòng khách hiện đại với cầu thang kính – không gian mở, sang trọng và ấn tượng.",
    },
    {
      src: cttb13House,
      alt: "Không gian bếp – ăn",
      caption:
        "Không gian bếp – ăn phong cách luxury – ánh sáng vàng nổi bật và vật liệu cao cấp.",
    },
    {
      src: cttb1House,
      alt: "Nội thất phòng khách – Nguyễn Hải",
      caption:
        "Phòng khách hiện đại, gam màu xám sang trọng – điểm nhấn décor nghệ thuật.",
    },
    {
      src: cttb2House,
      alt: "Không gian khách – bếp – ăn",
      caption:
        "Không gian bếp – ăn thoáng sáng – tủ bếp kính hiện đại, mặt đá marble tinh tế.",
    },
    {
      src: cttb3House,
      alt: "Nội thất phòng ngủ – Nguyễn Hải",
      caption:
        "Phòng ngủ tối giản – tone beige trung tính, phù hợp xu hướng nội thất hiện đại.",
    },
  ];

  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalItem, setModalItem] = useState(null);

  // cuộn tới card theo index khi bấm dot
  const scrollToSlide = (index) => {
    const el = cardRefs.current[index];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveSlide(index);
    }
  };

  // lắng nghe scroll để set active dot
  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    const handleScroll = () => {
      const cards = cardRefs.current;
      if (!cards?.length) return;

      const sliderRect = sliderEl.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;

      let nearest = 0;
      let minDelta = Infinity;

      cards.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const delta = Math.abs(center - sliderCenter);
        if (delta < minDelta) {
          minDelta = delta;
          nearest = idx;
        }
      });

      setActiveSlide(nearest);
    };

    sliderEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => sliderEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="interior">
      {/* ===== HERO: THIẾT KẾ NỘI THẤT ===== */}
      <section className="section-interior interior-hero">
        <div className="interior-hero-grid">
          <div className="interior-hero-left">
            <div className="interior-hero-eyebrow">
              THIẾT KẾ NỘI THẤT CAO CẤP
            </div>
            <h1 className="interior-hero-title">
              Biến không gian sống thành <br />
              <span className="highlight-blue">tác phẩm nội thất đẳng cấp</span>
            </h1>
            <p className="interior-hero-subtitle">
              Nguyễn Hải Design &amp; Build – đồng hành từ ý tưởng đến thi công,
              giúp anh/chị sở hữu không gian sống đẹp chuẩn xu hướng thế giới,
              tối ưu công năng và ngân sách.
            </p>

            <ul className="interior-hero-list">
              <li>Thiết kế 3D chi tiết từng không gian trước khi thi công.</li>
              <li>
                Phong cách đa dạng: Modern, Minimal, Luxury, Tân cổ điển, v.v.
              </li>
              <li>
                Dự toán rõ ràng – hạn chế tối đa phát sinh trong quá trình thi
                công.
              </li>
              <li>Đồng bộ thiết kế &amp; thi công – giống bản vẽ 95–99%.</li>
            </ul>

            <div className="interior-hero-actions">
              <a href="#interior-form" className="interior-btn-primary">
                Nhận tư vấn thiết kế miễn phí
              </a>
              <a href={`tel:${HOTLINE_1}`} className="interior-btn-outline">
                Gọi nhanh: {HOTLINE_1}
              </a>
            </div>
          </div>

          <div className="interior-hero-right">
            <div className="interior-hero-image-wrap">
              <img
                src={noithat}
                alt="Thiết kế nội thất do Nguyễn Hải thực hiện"
                className="interior-hero-image"
              />
              <div className="interior-hero-badge">
                Kiến tạo không gian nâng tầm giá trị
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GIỚI THIỆU NGẮN GỌN ===== */}
      <section className="section-interior interior-section interior-about">
        <h2 className="interior-block-title">
          Nguyễn Hải – Đơn vị thiết kế &amp; thi công nội thất trọn gói tại Đà
          Nẵng
        </h2>
        <p className="interior-text">
          Chúng tôi – <span className="highlight-blue">Nguyễn Hải</span>, đơn vị
          thiết kế &amp; thi công nội thất uy tín hàng đầu tại Đà Nẵng, đã đồng
          hành cùng hàng trăm khách hàng trên hành trình kiến tạo không gian
          sống lý tưởng, chuẩn phong cách – trọn công năng.
        </p>
        <p className="interior-text">
          Với triết lý{" "}
          <strong>“Mỗi công trình là một tác phẩm nghệ thuật”</strong>, Nguyễn
          Hải luôn đặt thẩm mỹ – công năng – giá trị bền vững làm kim chỉ nam.
          Mỗi bản thiết kế là sự kết hợp giữa xu hướng nội thất thế giới và
          phong cách sống riêng của gia chủ.
        </p>
        <p className="interior-text">
          Đội ngũ <strong>kiến trúc sư – kỹ sư – thợ thi công</strong> giàu kinh
          nghiệm, liên tục cập nhật xu hướng nội thất mới, ứng dụng vật liệu
          hiện đại, đảm bảo công trình đẹp – bền – dễ sử dụng và dễ bảo trì.
        </p>
      </section>

      {/* ===== CÁC DỊCH VỤ THIẾT KẾ NỘI THẤT (CARD + HOTLINE) ===== */}
      <section className="section-interior interior-section">
        <h2 className="interior-block-title">
          Dịch vụ thiết kế nội thất trọn gói tại{" "}
          <span className="highlight-blue">Nguyễn Hải</span>
        </h2>
        <p className="interior-block-subtitle">
          Tùy nhu cầu sử dụng &amp; loại hình công trình, anh/chị có thể chọn
          gói dịch vụ phù hợp. Tất cả đều được thiết kế đồng bộ từ ý tưởng đến
          thi công.
        </p>

        <div className="interior-service-grid">
          {/* Nhà phố */}
          <article className="interior-service-card interior-service-card-hot">
            <div className="interior-service-label">NHÀ PHỐ</div>
            <h3 className="interior-service-title">Nội thất nhà phố</h3>
            <ul className="interior-service-list">
              <li>Thiết kế phòng khách, bếp, phòng ngủ, phòng thờ.</li>
              <li>
                Tối ưu diện tích hẹp, tận dụng ánh sáng &amp; gió tự nhiên.
              </li>
              <li>Phù hợp nhà phố 1–5 tầng, nhà ống, nhà liền kề.</li>
            </ul>
            <p className="interior-service-hotline">
              📞 Hotline:
              <a href={`tel:${HOTLINE_1}`}> {HOTLINE_1}</a> –{" "}
              <a href={`tel:${HOTLINE_2}`}>{HOTLINE_2}</a>
            </p>
            <div className="interior-service-actions">
              <a href="#interior-form" className="interior-btn-small-primary">
                Nhận tư vấn gói nhà phố
              </a>
              <a
                href={`tel:${HOTLINEGOINGAY}`}
                className="interior-btn-small-ghost"
              >
                Gọi ngay
              </a>
            </div>
          </article>

          {/* Căn hộ / chung cư */}
          <article className="interior-service-card">
            <div className="interior-service-label">CĂN HỘ</div>
            <h3 className="interior-service-title">
              Nội thất căn hộ – chung cư
            </h3>
            <ul className="interior-service-list">
              <li>Thiết kế tối giản – hiện đại – đa công năng.</li>
              <li>Giải pháp lưu trữ thông minh, tiết kiệm diện tích.</li>
              <li>Đồng bộ màu sắc, vật liệu, ánh sáng theo concept.</li>
            </ul>
            <p className="interior-service-hotline">
              📞 Hotline:
              <a href={`tel:${HOTLINE_1}`}> {HOTLINE_1}</a> –{" "}
              <a href={`tel:${HOTLINE_2}`}>{HOTLINE_2}</a>
            </p>
            <div className="interior-service-actions">
              <a href="#interior-form" className="interior-btn-small-primary">
                Tư vấn nội thất căn hộ
              </a>
              <a
                href={`tel:${HOTLINEGOINGAY}`}
                className="interior-btn-small-ghost"
              >
                Gọi ngay
              </a>
            </div>
          </article>

          {/* Biệt thự / Villa */}
          <article className="interior-service-card">
            <div className="interior-service-label">BIỆT THỰ</div>
            <h3 className="interior-service-title">
              Nội thất biệt thự &amp; villa cao cấp
            </h3>
            <ul className="interior-service-list">
              <li>Thiết kế Luxury, Tân cổ điển, Indochine, v.v.</li>
              <li>Không gian mở, kết nối cảnh quan – sân vườn.</li>
              <li>Vật liệu cao cấp, chi tiết hoàn thiện tinh xảo.</li>
            </ul>
            <p className="interior-service-hotline">
              📞 Hotline:
              <a href={`tel:${HOTLINE_1}`}> {HOTLINE_1}</a> –{" "}
              <a href={`tel:${HOTLINE_2}`}>{HOTLINE_2}</a>
            </p>
            <div className="interior-service-actions">
              <a href="#interior-form" className="interior-btn-small-primary">
                Tư vấn nội thất biệt thự
              </a>
              <a
                href={`tel:${HOTLINEGOINGAY}`}
                className="interior-btn-small-ghost"
              >
                Gọi ngay
              </a>
            </div>
          </article>

          {/* Văn phòng / showroom */}
          <article className="interior-service-card">
            <div className="interior-service-label">THƯƠNG MẠI</div>
            <h3 className="interior-service-title">
              Nội thất văn phòng, showroom, spa
            </h3>
            <ul className="interior-service-list">
              <li>Thiết kế chuẩn nhận diện thương hiệu.</li>
              <li>Tối ưu trải nghiệm khách hàng &amp; công năng sử dụng.</li>
              <li>Bố trí ánh sáng – trưng bày – quầy lễ tân khoa học.</li>
            </ul>
            <p className="interior-service-hotline">
              📞 Hotline:
              <a href={`tel:${HOTLINE_1}`}> {HOTLINE_1}</a> –{" "}
              <a href={`tel:${HOTLINE_2}`}>{HOTLINE_2}</a>
            </p>
            <div className="interior-service-actions">
              <a href="#interior-form" className="interior-btn-small-primary">
                Tư vấn nội thất thương mại
              </a>
              <a
                href={`tel:${HOTLINEGOINGAY}`}
                className="interior-btn-small-ghost"
              >
                Gọi ngay
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ===== PHONG CÁCH NỘI THẤT ===== */}
      <section className="section-interior interior-section">
        <h2 className="interior-block-title">
          Phong cách nội thất theo xu hướng thế giới
        </h2>
        <p className="interior-block-subtitle">
          Nguyễn Hải tư vấn &amp; thiết kế theo gu thẩm mỹ riêng của gia chủ,
          nhưng vẫn bảo đảm tính thời thượng và tính ứng dụng cao.
        </p>

        <div className="interior-style-grid">
          <div className="interior-style-card">
            <h3>Modern – Hiện đại</h3>
            <p>
              Đường nét dứt khoát, màu trung tính, điểm nhấn tinh tế, phù hợp
              gia đình trẻ yêu sự phóng khoáng.
            </p>
            <p className="interior-style-hotline">
              📞{" "}
              <a href={`tel:${HOTLINEGOINGAY}`}>Gọi tư vấn phong cách Modern</a>
            </p>
          </div>
          <div className="interior-style-card">
            <h3>Minimal – Tối giản</h3>
            <p>
              Ít nhưng chất, hạn chế đồ đạc, ưu tiên ánh sáng tự nhiên, đem lại
              không gian gọn gàng – thư thái.
            </p>
            <p className="interior-style-hotline">
              📞{" "}
              <a href={`tel:${HOTLINEGOINGAY}`}>
                Gọi tư vấn phong cách Minimal
              </a>
            </p>
          </div>
          <div className="interior-style-card">
            <h3>Luxury – Sang trọng</h3>
            <p>
              Vật liệu cao cấp, ánh kim, kính – đá – gỗ, chú trọng cảm giác đẳng
              cấp &amp; khác biệt cho gia chủ.
            </p>
            <p className="interior-style-hotline">
              📞{" "}
              <a href={`tel:${HOTLINEGOINGAY}`}>Gọi tư vấn phong cách Luxury</a>
            </p>
          </div>
          <div className="interior-style-card">
            <h3>Tân cổ điển</h3>
            <p>
              Họa tiết tinh tế, phào chỉ, màu sắc ấm, giữ nét sang trọng cổ điển
              nhưng không bị nặng nề.
            </p>
            <p className="interior-style-hotline">
              📞{" "}
              <a href={`tel:${HOTLINEGOINGAY}`}>Gọi tư vấn phong cách Tân cổ</a>
            </p>
          </div>
          <div className="interior-style-card">
            <h3>Indochine</h3>
            <p>
              Sự giao thoa Á – Âu, tre mây – gỗ – gạch bông, phù hợp nhà phố và
              biệt thự yêu nét hoài cổ.
            </p>
            <p className="interior-style-hotline">
              📞{" "}
              <a href={`tel:${HOTLINEGOINGAY}`}>
                Gọi tư vấn phong cách Indochine
              </a>
            </p>
          </div>
          <div className="interior-style-card">
            <h3>Scandinavian – Bắc Âu</h3>
            <p>
              Màu sáng, gỗ tự nhiên, điểm nhấn vải linen, mang lại cảm giác ấm
              áp và gần gũi thiên nhiên.
            </p>
            <p className="interior-style-hotline">
              📞{" "}
              <a href={`tel:${HOTLINEGOINGAY}`}>Gọi tư vấn phong cách Bắc Âu</a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== CAM KẾT & QUY TRÌNH (giữ khối đẹp cũ) ===== */}
      <section className="section-interior interior-commit">
        <h2 className="interior-commit-title">
          Vì sao khách hàng luôn chọn{" "}
          <span className="highlight-blue">Nguyễn Hải</span>
        </h2>
        <p className="interior-commit-intro">
          Trải qua hơn một thập kỷ đồng hành cùng khách hàng,{" "}
          <span className="highlight-blue">Nguyễn Hải</span> đã khẳng định vị
          thế bằng hàng trăm công trình nội thất đẹp chuẩn thiết kế – bền vững
          theo thời gian. Mỗi dự án là một lời cam kết về uy tín, chất lượng và
          sự tận tâm trong từng chi tiết.
        </p>

        <div className="interior-benefit">
          <h4>🔹 Tối ưu công năng &amp; đảm bảo tính thẩm mỹ</h4>
          <p>
            Đội ngũ kiến trúc sư luôn cập nhật xu hướng mới, cân bằng giữa công
            năng – thẩm mỹ – ngân sách, không vẽ cho đẹp mà khó sử dụng.
          </p>
        </div>

        <div className="interior-benefit">
          <h4>🔹 Thi công đúng bản vẽ – vật liệu rõ ràng</h4>
          <p>
            Hồ sơ thiết kế chi tiết: 3D, mặt bằng, vật liệu, chủng loại thiết
            bị; bám sát khi thi công để công trình “lên hình” đúng như phối
            cảnh.
          </p>
        </div>

        <div className="interior-benefit">
          <h4>🔹 Hợp đồng minh bạch – tiến độ rõ ràng</h4>
          <p>
            Điều khoản, vật tư, hạng mục, thời gian triển khai được ghi rõ trong
            hợp đồng – hạn chế tối đa phát sinh và chậm tiến độ.
          </p>
        </div>

        <div className="interior-benefit">
          <h4>🔹 Đồng hành sau bàn giao – bảo hành uy tín</h4>
          <p>
            Hỗ trợ chỉnh sửa, bảo hành theo quy định; tư vấn nâng cấp, cải tạo
            khi gia chủ có nhu cầu thay đổi trong tương lai.
          </p>
        </div>

        <h2 className="interior-process-title">
          Quy trình thiết kế nội thất – Uy tín &amp; Chuyên nghiệp
        </h2>
        <div className="interior-process-list">
          <div className="interior-process-item">
            <span className="highlight-blue">
              1. Tiếp nhận yêu cầu &amp; tư vấn:
            </span>{" "}
            Khảo sát nhu cầu sử dụng, phong cách yêu thích, ngân sách, hiện
            trạng công trình.{" "}
            <strong>
              Hotline:
              <a href={`tel:${HOTLINE_1}`}> {HOTLINE_1}</a> –{" "}
              <a href={`tel:${HOTLINE_2}`}>{HOTLINE_2}</a>
            </strong>
          </div>
          <div className="interior-process-item">
            <span className="highlight-blue">
              2. Lên mặt bằng &amp; gửi báo giá
            </span>{" "}
            Đề xuất phương án bố trí công năng và báo giá thiết kế nội thất chi
            tiết từng hạng mục.
          </div>
          <div className="interior-process-item">
            <span className="highlight-blue">3. Ký kết hợp đồng</span> Thống
            nhất phong cách, vật liệu chính, hạng mục thiết kế – ký hợp đồng
            chính thức.
          </div>
          <div className="interior-process-item">
            <span className="highlight-blue">
              4. Thiết kế 3D &amp; hoàn thiện hồ sơ kỹ thuật
            </span>{" "}
            Triển khai phối cảnh 3D từng không gian; sau khi duyệt sẽ triển khai
            bản vẽ kỹ thuật chi tiết để thi công.
          </div>
          <div className="interior-process-item">
            <span className="highlight-blue">
              5. Bàn giao hồ sơ &amp; đồng hành thi công
            </span>{" "}
            Bàn giao đầy đủ file thiết kế; đội ngũ Nguyễn Hải có thể trực tiếp
            thi công hoặc hỗ trợ giám sát theo nhu cầu.
          </div>
        </div>
      </section>

      {/* ===== CÔNG TRÌNH NỘI THẤT TIÊU BIỂU (SLIDER) ===== */}
      <section className="section-interior interior-section">
        <h2 className="interior-block-title">
          Công trình thiết kế nội thất tiêu biểu{" "}
          <span className="highlight-blue">Nguyễn Hải</span>
        </h2>
        <p className="interior-block-subtitle">
          Một vài không gian nội thất tiêu biểu đã được Nguyễn Hải thực hiện cho
          nhà phố, căn hộ và biệt thự – tối ưu công năng, đẹp chuẩn xu hướng.
        </p>

        {/* SLIDER */}
        <div className="interior-portfolio-slider" ref={sliderRef}>
          <div className="interior-portfolio-track">
            {portfolioItems.map((item, index) => (
              <article
                key={index}
                className="interior-portfolio-card"
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => setModalItem(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="interior-portfolio-image"
                />
                <div className="interior-portfolio-caption">{item.caption}</div>
              </article>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="interior-slider-dots">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                "interior-slider-dot" +
                (index === activeSlide ? " interior-slider-dot--active" : "")
              }
              onClick={() => scrollToSlide(index)}
              aria-label={`Xem công trình ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* MODAL FULL MÀN HÌNH */}
      {modalItem && (
        <div className="interior-modal" onClick={() => setModalItem(null)}>
          <div
            className="interior-modal-backdrop"
            onClick={() => setModalItem(null)}
          />
          <div
            className="interior-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="interior-modal-close"
              onClick={() => setModalItem(null)}
            >
              ✕
            </button>
            <img
              src={modalItem.src}
              alt={modalItem.alt}
              className="interior-modal-image"
            />
            <div className="interior-modal-caption">{modalItem.caption}</div>
          </div>
        </div>
      )}

      {/* ===== FAQ ===== */}
      <section className="section-interior interior-section">
        <FAQComponent />
      </section>

      {/* ===== FORM LIÊN HỆ ===== */}
      <section className="section-interior interior-form" id="interior-form">
        <h1 className="interior-form-title">
          Liên hệ tư vấn thiết kế nội thất
        </h1>
        <Row gutter={32} className="interior-form-container">
          <Col xs={24} md={12} className="interior-form-left">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <div className="contact-info-box">
                <h3 className="contact-subtitle">
                  Hãy để lại thông tin, đội ngũ{" "}
                  <span className="highlight-blue">Nguyễn Hải</span> sẽ liên hệ
                  tư vấn miễn phí cho anh/chị.
                </h3>
              </div>

              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
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
                rules={[
                  { required: true, message: "Vui lòng nhập địa phương!" },
                ]}
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
                rules={[
                  { required: true, message: "Vui lòng chọn ngân sách!" },
                ]}
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

              {/* Turnstile CAPTCHA */}
              <div style={{ marginBottom: 16, textAlign: "center" }}>
                <Turnstile
                  sitekey={TURNSTILE_SITE_KEY}
                  onVerify={(token) => setCfToken(token)}
                  onExpire={() => setCfToken("")}
                  options={{ theme: "light" }}
                />
              </div>

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
              <div className="interior-form-image-box">
                <img
                  src={mapImage}
                  alt="Nguyễn Hải Design & Build"
                  className="interior-form-image"
                />
                <div className="interior-socials">
                  <a
                    href="https://www.facebook.com/nguyenhaidesignandbuild"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interior-social-icon fb"
                  >
                    <FacebookFilled />
                  </a>
                  <a
                    href="https://www.youtube.com/@thicongnhadanang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interior-social-icon yt"
                  >
                    <YoutubeFilled />
                  </a>
                  <a
                    href="https://www.tiktok.com/@nguyenhai22.11.2012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interior-social-icon tt"
                  >
                    <TikTokOutlined />
                  </a>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </section>

      {/* CTA cuối trang – chốt khách gọi nội thất */}
      <section className="interior-bottom-cta">
        <div className="interior-bottom-cta-inner">
          <div className="interior-bottom-cta-left">
            <p className="interior-bottom-cta-eyebrow">
              THIẾT KẾ NỘI THẤT – GỌI LÀ ĐƯỢC TƯ VẤN NGAY
            </p>
            <h2 className="interior-bottom-cta-title">
              Gửi mặt bằng – nhận tư vấn định hướng nội thất hoàn toàn miễn phí.
            </h2>
            <p className="interior-bottom-cta-text">
              Chỉ cần gửi sơ đồ / mặt bằng / nhu cầu cơ bản, đội ngũ kiến trúc
              sư <span className="highlight-blue">Nguyễn Hải</span> sẽ gợi ý bố
              trí không gian, phong cách phù hợp và báo giá thiết kế – thi công
              rõ ràng, <strong>không lo phát sinh.</strong>
            </p>
          </div>

          <div className="interior-bottom-cta-right">
            <a href="tel:0978999043" className="interior-bottom-cta-btn">
              Gọi ngay · 0978 999 043
            </a>
            <p className="interior-bottom-cta-note">
              Hoặc nhắn Zalo, gửi mặt bằng / nhu cầu – chúng tôi sẽ chủ động
              liên hệ lại để tư vấn chi tiết cho anh/chị.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interior;
