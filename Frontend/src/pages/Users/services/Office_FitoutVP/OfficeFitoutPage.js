import React from "react";
import "./OfficeFitoutPage.css";

/* ẢNH DEMO: thay bằng ảnh dự án thực tế của bạn */
import heroImg from "../../../../assets/VP-TK_TC1.jpg";
import prj2 from "../../../../assets/VP-TK_TC2.jpg";
import prj1 from "../../../../assets/VP-TK_TC3.jpg";
import prj3 from "../../../../assets/VP-TK_TC4.jpg";
import FAQComponent from "../../view/FAQComponent/FAQComponent";
import ContactForm from "../../view/Mail/ContactFormMail";
import DuAnTC from "../../view/DuAnTC/duantc";

/* ============== CONFIG (đổi theo brand của bạn) ============== */
const BRAND = "Nguyễn Hải";
const PHONE = "0978 999 043";
const EMAIL = "hotro.nguyenhai.com.vn@gmail.com";
const ADDRESS = "17 Nguyễn Cư Trinh, Đà Nẵng";
const CTA_ZALO_LINK = "https://zalo.me/0978999043";

/* ================= ICONS (inline SVG, không cần thư viện) ================= */
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const IconLayout = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M3 10h18M10 3v18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const IconMoney = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="6"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M6 12h1M17 12h1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IconHelmet = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 14a9 9 0 0118 0v3H3v-3z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 5v5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IconDesign = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 20l7-7M14 3l7 7-7 7-7-7 7-7z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IconTool = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 7l3-3 3 3-3 3-3-3zM3 21l7-7"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M3 21h4l9-9-4-4-9 9v4z" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const IconRefresh = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 12a8 8 0 10-2.34 5.66"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 8v4h-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IconCable = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 8h4v4H5V8zm10 4h4v4h-4v-4z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M9 10h6M7 20h10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IconStar = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const IconStep = ({ n }) => (
  <div className="of-step-icon">{String(n).padStart(2, "0")}</div>
);

export default function OfficeFitoutPage() {
  return (
    <main className="of-wrap">
      {/* ========== HERO ========== */}
      <section className="of-hero">
        <img
          className="of-hero-img"
          src={heroImg}
          alt="Thiết kế & Thi công Văn phòng"
        />
        <div className="of-hero-overlay" />
        <div className="of-hero-content">
          <div className="of-chipbar">
            <span className="of-chip">
              <IconStar /> Top ngành xây dựng
            </span>
            <span className="of-chip">
              <IconCheck /> Hơn 10+ năm kinh nghiệm
            </span>
            <span className="of-chip">
              <IconCheck /> Trọn gói – một đầu mối
            </span>
          </div>

          <h1>
            Thiết kế & Thi công <span>Văn Phòng Chuyên Nghiệp</span>
          </h1>
          <p>
            Tối ưu không gian – tăng hiệu suất làm việc. {BRAND} đồng hành từ ý
            tưởng đến hoàn thiện.
          </p>

          <div className="of-hero-cta">
            <a className="of-btn of-btn--solid" href="#contact">
              Tư vấn miễn phí
            </a>
            <a className="of-btn of-btn--ghost" href="#portfolio">
              Xem dự án mẫu
            </a>
          </div>

          <div className="of-hero-badges">
            <span>
              <IconCheck />
              Đúng tiến độ
            </span>
            <span>
              <IconCheck />
              Chi phí minh bạch
            </span>
            <span>
              <IconCheck />
              Bảo hành rõ ràng
            </span>
          </div>
        </div>
        <div className="of-decor of-decor--dots" aria-hidden />
      </section>

      {/* ========== NEW: NỘI DUNG CHUYÊN MÔN – NGUYỄN HẢI (REFINED) ========== */}
      <section className="of-section" id="danang-office-design">
        <div className="of-container">
          <header className="of-rich-head">
            <p className="of-lead">
              Nhu cầu thiết kế – thi công văn phòng ngày càng tăng khi văn phòng
              được xem là “ngôi nhà thứ hai”.
              <strong> Nguyễn Hải</strong> cung cấp giải pháp{" "}
              <em>thiết kế & thi công trọn gói</em>, tối ưu công năng – thẩm mỹ
              – ngân sách cho doanh nghiệp tại Đà Nẵng.
            </p>
          </header>

          <div className="of-rich">
            <p className="of-lead">
              Nhân sự dành ít nhất 8 giờ mỗi ngày tại văn phòng. Không gian ngột
              ngạt, thiếu sáng – thông gió, tiện nghi kém sẽ ảnh hưởng trực tiếp
              đến tinh thần, cảm hứng và hiệu suất làm việc.{" "}
              <strong className="rich-strong">Thiết kế văn phòng</strong> là
              bước quan trọng trước thi công, giúp tạo nên môi trường phù hợp
              tính chất công việc và văn hóa doanh nghiệp.
            </p>

            <h3 className="of-h3">
              <span className="of-h3-num">01</span>Thiết kế văn phòng là gì? Vì
              sao cần?
            </h3>
            <div className="of-note of-note--striped">
              <p className="of-lead">
                Tương tự thiết kế nhà ở hay công trình dân dụng,{" "}
                <strong className="rich-strong">
                  thiết kế tòa nhà/văn phòng
                </strong>{" "}
                là quá trình lên
                <em> phương án không gian – kỹ thuật – vật liệu</em> và hồ sơ
                bản vẽ cho môi trường làm việc. Tại <strong>{BRAND}</strong>,
                chúng tôi tập trung 4 trụ cột:{" "}
                <em>công năng • thẩm mỹ • ngân sách • tiến độ</em>.
              </p>
            </div>

            <h3 className="of-h3">
              <span className="of-h3-num">02</span> Những lưu ý quan trọng khi
              thiết kế văn phòng tại Đà Nẵng
            </h3>

            <div className="of-callout of-callout--icon">
              <div className="of-callout-icon">☯</div>
              <div>
                <h4 className="of-callout-title">Phong thuỷ tổng thể</h4>
                <p className="of-lead">
                  Bố trí lối đi, vị trí bàn lãnh đạo – khu làm việc, hướng sáng
                  – thông gió hợp lý giúp doanh nghiệp
                  <em> hanh thông – phát triển</em>. Phong thuỷ được xét ngay từ
                  giai đoạn concept để tránh sửa đổi về sau.
                </p>
              </div>
            </div>

            <div className="of-grid-2">
              <div className="of-note">
                <h4>Công năng cơ bản</h4>
                <ul className="of-list of-list--check">
                  <li>Phòng giám đốc / quản lý</li>
                  <li>Khu làm việc nhân viên (open space / module)</li>
                  <li>Phòng họp, khu tiếp khách</li>
                  <li>Khu vệ sinh – kho – circulations (lưu thông)</li>
                </ul>
                <p className="of-muted">
                  Xu hướng hiện nay còn có: lễ tân, pantry/sảnh thư giãn, phone
                  booth, phòng nghỉ trưa…
                </p>
              </div>

              <div className="of-note">
                <h4>Ánh sáng & cây xanh</h4>
                <p>
                  Tận dụng ánh sáng tự nhiên, bổ sung chiếu sáng nhân tạo đúng{" "}
                  <em>lux</em> cho từng khu chức năng; kết hợp cây xanh và vật
                  liệu ấm để tăng tập trung & tinh thần tích cực.
                </p>
              </div>
            </div>

            <div className="of-note of-note--budget">
              <h4>Chi phí thiết kế & thi công</h4>
              <p>
                Chủ đầu tư nên có kế hoạch tài chính rõ ngay từ đầu để hạn chế
                phát sinh.
                <strong> {BRAND}</strong> cung cấp dự toán minh bạch theo hạng
                mục, kèm tư vấn vật liệu thay thế để đảm bảo chất lượng trong
                ngân sách.
              </p>
            </div>

            <div className="of-inline-cta">
              <a className="of-btn of-btn--solid" href="#contact">
                Nhận tư vấn & báo giá
              </a>
              <a className="of-btn of-btn--ghost-dark" href="#portfolio">
                Xem dự án đã thực hiện
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY US ========== */}
      <section className="of-section">
        <div className="of-container">
          <div className="of-section-head">
            <h2 className="of-title">VÌ SAO CHỌN CHÚNG TÔI</h2>
            <p className="of-sub">
              Giải quyết các vấn đề thường gặp khi làm văn phòng mới hoặc cải
              tạo.
            </p>
            <span className="of-divider" />
          </div>

          <div className="of-grid-3">
            <div className="of-card of-card--glass">
              <div className="of-card-ico">
                <IconLayout />
              </div>
              <h3>Bố cục khoa học</h3>
              <p>
                Layout thông minh (open space, focus room, meeting), lưu thông –
                ánh sáng – âm học hợp lý.
              </p>
            </div>
            <div className="of-card of-card--glass">
              <div className="of-card-ico">
                <IconMoney />
              </div>
              <h3>Tối ưu chi phí</h3>
              <p>
                Dự toán rõ ràng, so khớp vật tư – hạng mục; tư vấn vật liệu thay
                thế trong ngân sách.
              </p>
            </div>
            <div className="of-card of-card--glass">
              <div className="of-card-ico">
                <IconHelmet />
              </div>
              <h3>Thi công trọn gói</h3>
              <p>
                Kiến trúc – M&E – nội thất – mạng – điều hòa – PCCC (liên kết),
                một đầu mối quản lý chất lượng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="of-section of-section--alt" id="services">
        <div className="of-container">
          <div className="of-section-head">
            <h2 className="of-title">DỊCH VỤ CHO VĂN PHÒNG</h2>
            <span className="of-divider" />
          </div>

          <div className="of-grid-4">
            <div className="of-service">
              <div className="of-service-ico">
                <IconDesign />
              </div>
              <h4>Thiết kế nội thất văn phòng</h4>
              <p>
                Concept, 3D, hồ sơ kỹ thuật, vật liệu & màu sắc theo nhận diện
                thương hiệu.
              </p>
            </div>
            <div className="of-service">
              <div className="of-service-ico">
                <IconTool />
              </div>
              <h4>Thi công trọn gói</h4>
              <p>
                Thô – hoàn thiện – nội thất; checklist chất lượng & an toàn công
                trường.
              </p>
            </div>
            <div className="of-service">
              <div className="of-service-ico">
                <IconRefresh />
              </div>
              <h4>Cải tạo & nâng cấp</h4>
              <p>
                Cải tạo nhanh ngoài giờ/cuối tuần; hạn chế gián đoạn hoạt động
                doanh nghiệp.
              </p>
            </div>
            <div className="of-service">
              <div className="of-service-ico">
                <IconCable />
              </div>
              <h4>Hệ thống phụ trợ</h4>
              <p>
                Mạng, điện nhẹ, chiếu sáng, điều hòa, âm trần; phối hợp nghiệm
                thu đồng bộ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PORTFOLIO ========== */}
      <section className="of-section of-section--alt" id="portfolio">
        <div className="of-container">
          <DuAnTC />
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="of-section of-section--alt">
        <div className="of-container">
          <div className="of-section-head">
            <h2 className="of-title">Quy trình thực hiện</h2>
            <span className="of-divider" />
          </div>

          <div className="of-steps">
            <div className="of-step">
              <IconStep n={1} />
              <div>
                <h4>Khảo sát – Brief</h4>
                <p>
                  Đo đạc, lấy yêu cầu, ngân sách & timeline; phân tích văn hoá
                  doanh nghiệp.
                </p>
              </div>
            </div>
            <div className="of-step">
              <IconStep n={2} />
              <div>
                <h4>Thiết kế concept</h4>
                <p>Layout, moodboard, phối cảnh 3D; chốt vật liệu chủ đạo.</p>
              </div>
            </div>
            <div className="of-step">
              <IconStep n={3} />
              <div>
                <h4>Hồ sơ kỹ thuật</h4>
                <p>
                  Bản vẽ chi tiết – khối lượng – dự toán; kế hoạch thi công &
                  nghiệm thu.
                </p>
              </div>
            </div>
            <div className="of-step">
              <IconStep n={4} />
              <div>
                <h4>Thi công – Bàn giao</h4>
                <p>
                  Kiểm soát tiến độ, an toàn, chất lượng; bàn giao & bảo hành
                  định kỳ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQComponent />

      {/* Form liên hệ */}
      <section className="of-section of-section--alt" id="contactForm">
        <div className="of-container">
          <ContactForm />
        </div>
      </section>

      {/* ========== SHOWCASE ẢNH LỚN ========== */}
      <section className="of-section of-section--alt" id="showcase-large">
        <div className="of-container">
          <div className="sg-wrap">
            <header class="sg-header">
              <h1 class="sg-title">
                Những công trình thiết kế thi công văn phòng đẹp tiêu biểu của
                <span class="sg-blue"> Nguyễn Hải </span>
              </h1>
            </header>
            {[
              {
                img: prj1,
                cap: "Công trình thiết kế thi công văn phòng đẹp Nguyễn Hải thiết kế",
              },
              {
                img: prj2,
                cap: "Công trình thiết kế thi công văn phòng đẹp Nguyễn Hải thiết kế",
              },
              {
                img: prj3,
                cap: "Công trình thiết kế thi công văn phòng đẹp Nguyễn Hải thiết kế",
              },
            ].map((g, i) => (
              <figure className="sg-item" key={i}>
                <div className="sg-frame">
                  <img
                    className="sg-img"
                    src={g.img}
                    alt={g.cap}
                    loading="lazy"
                  />
                </div>
                <figcaption className="sg-cap">{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
