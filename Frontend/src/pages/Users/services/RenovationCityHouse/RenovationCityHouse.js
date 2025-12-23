// src/pages/services/RenovationCityHouse.jsx
import React, { useState, lazy, Suspense } from "react";
import "./renovation-city-house.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// === ẢNH HERO + GALLERY ===
import SCCT1 from "../../../../assets/NT/CTSC1.webp";
import SCCT2 from "../../../../assets/NT/CTSC2.webp";
import SCCT3 from "../../../../assets/NT/CTSC3.webp";
import SCCT4 from "../../../../assets/NT/CTSC4.webp";
import CTNT from "../../../../assets/NT/CTNT.webp";
import CTPB from "../../../../assets/NT/CTPB.webp";
import CTPN from "../../../../assets/NT/CTPN.webp";
import CTPK1 from "../../../../assets/NT/17.webp";
import CTPK2 from "../../../../assets/NT/PK1.webp";
import CTPK3 from "../../../../assets/NT/PK2.webp";
import CTSCN from "../../../../assets/NT/photo-1600585154526-990dced4db0d.webp";

// ✅ Lazy-load ContactForm để giảm JS initial cho trang
const ContactForm = lazy(() =>
  import("../../../../components/Mail/ContactFormMail/ContactFormMail")
);

/* ====== Brand config ====== */
const BRAND = {
  primary: "#0a6ad6",
  primaryDeep: "#064eac",
  accent: "#d4b263",
  hotline: "0978 999 043",
  hotline1: "0905 402 989",
  hotlineRaw: "0978999043",
  email: "hotro.nguyenhai.com.vn@gmail.com",
  address: "17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng",
};

// Ảnh hero chính (LCP)
const HERO_IMAGE = CTSCN;

/* ====== Danh sách công trình ====== */
const WORKS = [
  {
    id: 1,
    img: SCCT1,
    caption:
      "Cải tạo mặt tiền nhà phố 3 tầng – thay mới kiến trúc, tối ưu ánh sáng · Hòa Xuân, Đà Nẵng",
  },
  {
    id: 2,
    img: SCCT2,
    caption:
      "Cải tạo & nâng cấp nội thất – bổ sung công năng, tối ưu không gian sống · Sơn Trà, Đà Nẵng",
  },
  {
    id: 3,
    img: SCCT3,
    caption:
      "Nâng tầng – gia cố móng & kết cấu, mở rộng diện tích sử dụng · Ngũ Hành Sơn",
  },
  {
    id: 4,
    img: SCCT4,
    caption:
      "Cải tạo nhà phố 2 mặt tiền – thay đổi diện mạo, thiết kế lại hệ mặt đứng · Hải Châu",
  },
  {
    id: 5,
    img: CTNT,
    caption:
      "Cải tạo nội thất tổng thể – bố trí lại không gian từng phòng · Liên Chiểu, Đà Nẵng",
  },
  {
    id: 6,
    img: CTPB,
    caption:
      "Cải tạo – nâng cấp phòng bếp, tối ưu ánh sáng & công năng · Ngũ Hành Sơn",
  },
  {
    id: 7,
    img: CTPN,
    caption:
      "Cải tạo phòng ngủ – nâng cấp nội thất & ánh sáng, tối ưu sự riêng tư · Cẩm Lệ, Đà Nẵng",
  },
  {
    id: 8,
    img: CTPK1,
    caption:
      "Cải tạo phòng khách – nâng cấp nội thất gỗ & đá hiện đại · Cẩm Lệ, Đà Nẵng",
  },
  {
    id: 9,
    img: CTPK2,
    caption:
      "Cải tạo phòng khách – thiết kế sáng, cân bằng ánh sáng tự nhiên · Cẩm Lệ, Đà Nẵng",
  },
  {
    id: 10,
    img: CTPK3,
    caption:
      "Cải tạo phòng khách – không gian sang trọng & ấm cúng · Cẩm Lệ, Đà Nẵng",
  },
];

/* ====== UI Components ====== */
function NhrAccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`nhr-acc-item ${open ? "open" : ""}`}>
      <button className="nhr-acc-head" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <svg className="nhr-acc-ico" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="nhr-acc-body">{children}</div>
    </div>
  );
}

function NhrPriceRow({ name, labor, material, note }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{labor}</td>
      <td>{material}</td>
      <td className="nhr-muted">{note}</td>
    </tr>
  );
}

/* ======================================================
                      MAIN PAGE
====================================================== */
export default function RenovationCityHouse() {
  /* ===== Lightbox States ===== */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxCaption, setLightboxCaption] = useState("");

  // Gallery dùng luôn WORKS
  const gallery = WORKS;

  return (
    <main className="nhr">
      {/* ====================== HERO ====================== */}
      <section className="nhr-hero">
        <div className="nhr-hero-bg">
          <img
            src={HERO_IMAGE}
            alt="Sau cải tạo - nhà phố"
            loading="eager"
            decoding="async"
            width={1001}
            height={1502}
            className="nhr-hero-main-img"
          />
          <div className="nhr-hero-gradient" />
        </div>

        <div className="nhr-container nhr-hero-inner">
          <div className="nhr-eyebrow">DỊCH VỤ NGUYỄN HẢI</div>

          <h1 className="nhr-hero-title">
            Sửa chữa – Cải tạo <br />
            <span>nhà phố</span> tại Đà Nẵng
          </h1>

          <p className="nhr-hero-sub">
            Biến ngôi nhà cũ thành không gian sống mới – thanh lịch, tiện nghi
            và bền vững. Thiết kế & thi công trọn gói, tối ưu chi phí – đúng
            tiến độ.
          </p>

          <div className="nhr-hero-cta">
            <a
              className="nhr-btn nhr-btn-primary"
              href={`tel:${BRAND.hotlineRaw}`}
            >
              GỌI: {BRAND.hotline}
            </a>
            <a
              className="nhr-btn nhr-btn-glass"
              href={`https://zalo.me/${BRAND.hotlineRaw}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat Zalo
            </a>
          </div>

          <div className="nhr-hero-stats nhr-glass">
            <div>
              <div className="nhr-stat-num">10+</div>
              <div className="nhr-stat-label">năm kinh nghiệm</div>
            </div>
            <div>
              <div className="nhr-stat-num">300+</div>
              <div className="nhr-stat-label">công trình hoàn thiện</div>
            </div>
            <div>
              <div className="nhr-stat-num">5 năm</div>
              <div className="nhr-stat-label">bảo hành kết cấu</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== INTRO ====================== */}
      <section className="nhr-section">
        <div className="nhr-container nhr-grid-2">
          <div>
            <h2 className="nhr-sec-title">
              Tại sao nên cải tạo thay vì xây mới?
            </h2>

            <p className="nhr-lead">
              Khi ngân sách cần tối ưu, cải tạo là giải pháp “thay áo mới” cho
              không gian mà vẫn đảm bảo thẩm mỹ & công năng. Nguyễn Hải đồng
              hành từ khảo sát – thiết kế – thi công – bảo hành.
            </p>

            <ul className="nhr-bullet-list">
              <li>Thiết kế & bố trí lại theo nhu cầu thực tế</li>
              <li>Thay đổi mặt tiền – nâng chất thẩm mỹ</li>
              <li>Mở rộng phòng/tầng – gia cố kết cấu</li>
              <li>Cải tạo điện nước – chống thấm – cách nhiệt</li>
            </ul>
          </div>

          <aside className="nhr-card nhr-glass nhr-note">
            <h3 className="nhr-card-title">Liên hệ nhanh</h3>

            <ul className="nhr-info">
              <li>
                <b>Hotline:</b> {BRAND.hotline} – {BRAND.hotline1}
              </li>
              <li>
                <b>Email:</b> {BRAND.email}
              </li>
              <li>
                <b>Địa chỉ:</b> {BRAND.address}
              </li>
            </ul>

            <a
              className="nhr-btn nhr-btn-block nhr-btn-primary"
              href="#contact"
            >
              Nhận tư vấn miễn phí
            </a>
          </aside>
        </div>

        <div className="nhr-container">
          {/* === KHỐI QUY TRÌNH NGẮN GỌN === */}
          <div className="nhr-card nhr-glass nhr-callout">
            <h3 className="nhr-card-title">Quy trình sửa nhà tại Đà Nẵng</h3>

            <ol className="nhr-steps nhr-steps--inline">
              <li>
                <h4>Bước 1 – Tiếp nhận & tư vấn</h4>
                <p>
                  Nhận thông tin nhu cầu – tư vấn sơ bộ phương án & ngân sách
                  cải tạo.
                </p>
              </li>

              <li>
                <h4>Bước 2 – Khảo sát hiện trạng</h4>
                <p>
                  Đến công trình đo đạc, xem kết cấu, ghi nhận mong muốn của gia
                  chủ.
                </p>
              </li>

              <li>
                <h4>Bước 3 – Ký hợp đồng thiết kế</h4>
                <p>
                  Chốt phong cách – vật liệu – mặt bằng. Ký hợp đồng thiết kế để
                  triển khai bản vẽ phối cảnh & hồ sơ kỹ thuật.
                </p>
              </li>

              <li>
                <h4>Bước 4 – Hoàn thiện hồ sơ thiết kế</h4>
                <p>
                  Bàn giao phối cảnh 3D – hồ sơ kỹ thuật – dự toán chi tiết hạng
                  mục thi công.
                </p>
              </li>

              <li>
                <h4>Bước 5 – Ký hợp đồng thi công</h4>
                <p>
                  Xác nhận vật tư – tiến độ – báo giá cuối cùng. Chuẩn bị nhân
                  lực & vật tư.
                </p>
              </li>

              <li>
                <h4>Bước 6 – Thi công, nghiệm thu & bảo hành</h4>
                <p>
                  Thi công theo hồ sơ thiết kế, nghiệm thu từng giai đoạn, bảo
                  hành kỹ thuật theo cam kết.
                </p>
              </li>
            </ol>

            <h4 className="nhr-subtitle">
              Cam kết thi công nhanh – giá cạnh tranh
            </h4>
            <ul className="nhr-checks">
              <li>Thi công đúng tiến độ đã ký kết.</li>
              <li>Đảm bảo kỹ thuật theo tiêu chuẩn xây dựng Việt Nam.</li>
              <li>Mọi phát sinh được ràng buộc bằng hợp đồng.</li>
              <li>Sử dụng đúng vật liệu theo báo giá đã thống nhất.</li>
              <li>Hạn chế phát sinh chi phí không cần thiết.</li>
              <li>
                Coi ngôi nhà của quý khách như chính nơi an cư của chúng tôi.
              </li>
              <li>
                Đội ngũ thi công &amp; giám sát chuyên nghiệp, trách nhiệm cao.
              </li>
            </ul>
            <p className="nhr-muted nhr-mt8">
              Để báo giá nhanh &amp; chính xác, khi gọi vui lòng chia sẻ:
            </p>

            <ul className="nhr-bullets nhr-bullets--dot">
              <li>Thời gian, địa điểm thực hiện.</li>
              <li>Không gian nhà ở hiện tại.</li>
              <li>Nhu cầu dịch vụ sửa chữa – cải tạo.</li>
              <li>Nhu cầu xuất hóa đơn VAT.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====================== 5 LƯU Ý ====================== */}
      <section className="nhr-section nhr-alt" id="tips">
        <div className="nhr-container">
          <h2 className="nhr-sec-title">
            5 lưu ý để cải tạo hiệu quả & tiết kiệm
          </h2>

          <div className="nhr-accordion">
            <NhrAccordionItem
              title="1) Chọn mẫu thiết kế phù hợp diện tích & kết cấu"
              defaultOpen
            >
              <p>
                Đánh giá hiện trạng và nhu cầu sử dụng để đưa ra phương án cân
                bằng giữa công năng và thẩm mỹ, đặc biệt với nhà phố, diện tích
                nhỏ.
              </p>
            </NhrAccordionItem>

            <NhrAccordionItem title="2) Ưu tiên vật liệu phù hợp ngân sách">
              <p>
                Vật liệu nhẹ, dễ thi công (trần/vách thạch cao, sàn nhựa giả
                gỗ…) giúp tiết kiệm chi phí mà vẫn đảm bảo độ bền và vẻ đẹp.
              </p>
            </NhrAccordionItem>

            <NhrAccordionItem title="3) Minh bạch hạng mục & báo giá">
              <p>
                Đối chiếu khối lượng, điều khoản, bảo hành & tiến độ. Nguyễn Hải
                báo giá rõ theo từng hạng mục – không phát sinh mập mờ.
              </p>
            </NhrAccordionItem>

            <NhrAccordionItem title="4) Chọn nhà thầu uy tín">
              <p>
                Tham khảo portfolio, phản hồi khách hàng, chúng tôi có thể hỗ
                trợ hồ sơ xin phép sửa chữa khi cần.
              </p>
            </NhrAccordionItem>

            <NhrAccordionItem title="5) Dự trù 10–15% chi phí phát sinh">
              <p>
                Giúp xử lý linh hoạt các thay đổi thiết kế hoặc hư hỏng ẩn,
                tránh đội chi phí tổng thể.
              </p>
            </NhrAccordionItem>
          </div>
        </div>
      </section>

      {/* ====================== BẢNG GIÁ ====================== */}
      <section className="nhr-section" id="pricing">
        <div className="nhr-container">
          <h2 className="nhr-sec-title">Bảng giá tham khảo</h2>

          <p className="nhr-muted">
            Giá thay đổi theo hiện trạng & vật tư. Chúng tôi khảo sát trước khi
            báo giá chi tiết.
          </p>

          <div className="nhr-table-wrap nhr-glass">
            <table className="nhr-table">
              <thead>
                <tr>
                  <th>Hạng mục</th>
                  <th>Nhân công (m²)</th>
                  <th>Vật tư</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>

              <tbody>
                <NhrPriceRow
                  name="Đục bỏ nền gạch"
                  labor="Từ 45.000đ"
                  material="–"
                  note="Thi công & dọn dẹp trọn gói"
                />
                <NhrPriceRow
                  name="Phá bỏ tường gạch"
                  labor="Từ 25.000đ"
                  material="–"
                />
                <NhrPriceRow
                  name="Trần thạch cao giật cấp"
                  labor="Từ 40.000đ"
                  material="Từ 95.000đ"
                  note="Khung xương Vĩnh Tường"
                />
                <NhrPriceRow
                  name="Lát gạch sàn"
                  labor="Từ 50.000đ"
                  material="Từ 125.000đ"
                  note="Tuỳ mẫu gạch"
                />
                <NhrPriceRow
                  name="Sơn chống thấm tường"
                  labor="Từ 13.000đ"
                  material="Từ 25.000đ"
                  note="Theo hệ sơn"
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================== QUY TRÌNH RÚT GỌN ====================== */}
      <section className="nhr-section nhr-alt" id="process">
        <div className="nhr-container">
          <h2 className="nhr-sec-title">Quy trình 4 bước chuẩn</h2>

          <ol className="nhr-steps">
            <li>
              <h4>Tiếp nhận</h4>
              <p>Xác định nhu cầu, hạng mục, vị trí, diện tích.</p>
            </li>
            <li>
              <h4>Khảo sát & báo giá</h4>
              <p>Đo đạc – đánh giá kết cấu – gửi báo giá theo hạng mục.</p>
            </li>
            <li>
              <h4>Hợp đồng & hồ sơ</h4>
              <p>Chốt tiến độ, vật tư, bảo hành, hỗ trợ hồ sơ xin phép.</p>
            </li>
            <li>
              <h4>Thi công & bàn giao</h4>
              <p>Giám sát chặt chẽ – nghiệm thu – bàn giao hồ sơ kỹ thuật.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ====================== HẠNG MỤC ====================== */}
      <section className="nhr-section" id="scopes">
        <div className="nhr-container">
          <h2 className="nhr-sec-title">Hạng mục nhận thi công</h2>

          <div className="nhr-tags">
            {[
              "Sửa nhà cấp 4",
              "Cải tạo khách sạn / homestay",
              "Nâng cấp WC, nhà tắm",
              "Phòng khách – bếp – phòng ngủ",
              "Mở rộng – nâng tầng",
              "Cà phê / nhà hàng / showroom",
              "Nhà gác lửng – nhà xưởng – biệt thự",
              "Sơn sửa, thay sàn, chống thấm, cách nhiệt",
            ].map((t) => (
              <span key={t} className="nhr-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== KHU VỰC PHỤC VỤ ====================== */}
      <section className="nhr-section nhr-alt" id="commit">
        <div className="nhr-container nhr-service-head">
          <h2 className="nhr-sec-title">Khu vực phục vụ</h2>
          <p className="nhr-muted">
            Hải Châu, Thanh Khê, Sơn Trà, Liên Chiểu, Cẩm Lệ, Ngũ Hành Sơn & khu
            vực lân cận Đà Nẵng.
          </p>
        </div>

        <div className="nhr-container nhr-service-grid">
          <div className="nhr-card nhr-glass nhr-lift nhr-service-card">
            <div className="nhr-service-icon">⏱</div>
            <h3 className="nhr-card-title">Thi công đúng tiến độ</h3>
            <p>
              Đội ngũ kỹ sư & nhân công giàu kinh nghiệm, quy trình minh bạch,
              cập nhật tiến độ thường xuyên cho gia chủ.
            </p>
          </div>

          <div className="nhr-card nhr-glass nhr-lift nhr-service-card">
            <div className="nhr-service-icon">🏗</div>
            <h3 className="nhr-card-title">Vật tư chính hãng</h3>
            <p>
              Vật liệu có nguồn gốc rõ ràng, chọn lọc theo ngân sách, cân bằng
              giữa độ bền và thẩm mỹ cho từng hạng mục.
            </p>
          </div>

          <div className="nhr-card nhr-glass nhr-lift nhr-service-card">
            <div className="nhr-service-icon">🛡</div>
            <h3 className="nhr-card-title">Bảo hành rõ ràng</h3>
            <p>
              Hậu mãi nhanh, bảo hành kết cấu lên đến 5 năm, hỗ trợ xử lý sự cố
              trong suốt quá trình sử dụng.
            </p>
          </div>
        </div>
      </section>

      {/* ====================== FAQ ====================== */}
      <section className="nhr-section nhr-alt" id="faq">
        <div className="nhr-container">
          <h2 className="nhr-sec-title">Câu hỏi thường gặp</h2>

          <div className="nhr-accordion">
            <NhrAccordionItem title="Cần xin phép khi nâng tầng / thay kết cấu?">
              <p>
                Tùy mức can thiệp. Chúng tôi tư vấn & hỗ trợ hồ sơ xin phép khi
                cần..
              </p>
            </NhrAccordionItem>

            <NhrAccordionItem title="Có dựng 3D trước thi công?">
              <p>
                Có. Dựng phối cảnh 3D thống nhất thẩm mỹ & công năng trước khi
                làm.
              </p>
            </NhrAccordionItem>

            <NhrAccordionItem title="Thời gian thi công bao lâu?">
              <p>
                Phụ thuộc khối lượng, thường 2 – 8 tuần. Ghi rõ tiến độ trong
                hợp đồng.
              </p>
            </NhrAccordionItem>
          </div>
        </div>
      </section>

      {/* ====================== FORM LIÊN HỆ ====================== */}
      <section className="nhr-section nhr-alt" id="lien-he-villa">
        <div className="container">
          <Suspense
            fallback={
              <div className="nhr-form-fallback">Đang tải form liên hệ...</div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* ====================== GALLERY ====================== */}
      <section className="nhr-section" id="villa-works">
        <div className="nhr-container villa-works-wrapper">
          <h3 className="villa-works-title">
            Một số công trình sửa chữa – cải tạo nhà phố Nguyễn Hải đã thực hiện
          </h3>

          <p className="villa-works-intro">
            Hình ảnh thực tế từ các công trình cải tạo mặt tiền, nâng cấp nội
            thất…
          </p>

          <div className="villa-works-slider">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3500 }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1140: { slidesPerView: 3 },
              }}
            >
              {WORKS.map((work, index) => (
                <SwiperSlide key={work.id}>
                  <div
                    className="villa-works-item"
                    onClick={() => {
                      setCurrentIndex(index);
                      setLightboxImage(work.img);
                      setLightboxCaption(work.caption);
                    }}
                  >
                    <div className="villa-works-img-wrapper">
                      <img
                        src={work.img}
                        alt={work.caption}
                        className="villa-works-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="villa-works-overlay" />
                    <div className="villa-works-caption">
                      <p>{work.caption}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ====================== CTA ====================== */}
      <section className="nhr-section nhr-cta" id="contact">
        <div className="nhr-container nhr-cta-box">
          <div>
            <div className="nhr-eyebrow nhr-light">BẮT ĐẦU NGAY</div>

            <h2 className="nhr-sec-title">Làm mới ngôi nhà của bạn hôm nay</h2>
            <p>Khảo sát & báo giá chi tiết hoàn toàn miễn phí.</p>
          </div>

          <div className="nhr-cta-actions">
            <a
              className="nhr-btn nhr-btn-primary"
              href={`tel:${BRAND.hotlineRaw}`}
            >
              Gọi: {BRAND.hotline}
            </a>
            <a
              className="nhr-btn nhr-btn-glass"
              href={`https://zalo.me/${BRAND.hotlineRaw}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </section>

      {/* ====================== LIGHTBOX ====================== */}
      {lightboxImage && (
        <div className="nhr-lightbox" onClick={() => setLightboxImage(null)}>
          {/* Nút Prev */}
          <button
            className="nhr-lightbox-nav nhr-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === 0 ? gallery.length - 1 : prev - 1
              );
              const nextIndex =
                currentIndex === 0 ? gallery.length - 1 : currentIndex - 1;
              setLightboxImage(gallery[nextIndex].img);
              setLightboxCaption(gallery[nextIndex].caption);
            }}
          >
            ‹
          </button>

          {/* Ảnh */}
          <div
            className="nhr-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Preview"
              className="nhr-lightbox-img"
            />

            {/* Caption */}
            {lightboxCaption && (
              <div className="nhr-lightbox-caption">{lightboxCaption}</div>
            )}
          </div>

          {/* Nút Next */}
          <button
            className="nhr-lightbox-nav nhr-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === gallery.length - 1 ? 0 : prev + 1
              );
              const nextIndex =
                currentIndex === gallery.length - 1 ? 0 : currentIndex + 1;
              setLightboxImage(gallery[nextIndex].img);
              setLightboxCaption(gallery[nextIndex].caption);
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
