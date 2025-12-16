// Building_Houses.js
import React, { Suspense, lazy, memo } from "react";
import { useState } from "react";
import "./Building_Houses.css";

import building1 from "../../../../assets/XNTG/5.webp";
import building2 from "../../../../assets/XNTG/4.webp";
import building3 from "../../../../assets/XNTG/1.webp";
import building4 from "../../../../assets/XNTG/2.webp";
import building5 from "../../../../assets/XNTG/3.webp";
import building6 from "../../../../assets/XNTG/6.webp";
import building7 from "../../../../assets/XNTG/5.webp";

/**
 * 🚀 TỐI ƯU: Lazy-load Form + FAQ
 */
const ContactForm = lazy(() => import("../../view/Mail/ContactFormMail"));
const FAQComponent = lazy(() => import("../../view/FAQComponent/FAQComponent"));

/**
 * Component ảnh tối ưu
 */
const BuildingImage = ({ src, alt, caption, priority = false }) => {
  return (
    <figure className="building-image-container">
      <img
        src={src}
        alt={alt}
        className="building-image"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {caption && (
        <figcaption className="building-caption">
          <em>{caption}</em>
        </figcaption>
      )}
    </figure>
  );
};

// Component CARD cho công trình tiêu biểu + zoom ảnh
const PortfolioCard = ({ src, title, tag }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="portfolio-card" onClick={() => setOpen(true)}>
        <div className="portfolio-image-wrap">
          <img src={src} alt={title} />
          <div className="portfolio-overlay">
            <h3>{title}</h3>
            <span>{tag}</span>
            <div className="portfolio-btn">Phóng to ảnh</div>
          </div>
        </div>
      </div>

      {/* MODAL PHÓNG TO */}
      {open && (
        <div className="portfolio-modal" onClick={() => setOpen(false)}>
          {/* NGỪNG BUBBLE ĐỂ CLICK TRONG ẢNH KHÔNG ĐÓNG */}
          <div
            className="portfolio-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={title} />
            <p>{title}</p>
          </div>
        </div>
      )}
    </>
  );
};

const Building_Houses = () => {
  return (
    <main className="building-container">
      <div className="building-wrapper">
        {/* =============== HERO: DỊCH VỤ XÂY NHÀ TRỌN GÓI =============== */}
        <section className="building-hero">
          <div className="building-hero-grid">
            {/* Hero text */}
            <div className="building-hero-left">
              <p className="building-hero-eyebrow">DỊCH VỤ XÂY NHÀ TRỌN GÓI</p>
              <h1 className="building-hero-title">
                Xây nhà trọn gói{" "}
                <span className="highlight-blue">PCD Nguyễn Hải</span> –
                <br />
                Chìa khóa trao tay, an tâm đón nhà mới
              </h1>
              <p className="building-hero-subtitle">
                Từ <strong>thiết kế – xin phép – thi công – hoàn thiện</strong>,
                đội ngũ PCD Nguyễn Hải đồng hành cùng anh/chị xuyên suốt, cam
                kết{" "}
                <strong>đúng tiến độ · đúng ngân sách · đúng chất lượng</strong>
                .
              </p>

              <ul className="building-hero-list">
                <li>
                  Miễn phí 100% thiết kế khi ký hợp đồng thi công trọn gói.
                </li>
                <li>Minh bạch chi phí, hợp đồng rõ ràng, hạn chế phát sinh.</li>
                <li>Đội ngũ KTS – kỹ sư nhiều năm kinh nghiệm tại Đà Nẵng.</li>
              </ul>

              <div className="building-hero-actions">
                <a href="#form-tron-goi" className="hero-btn hero-btn-primary">
                  Nhận tư vấn &amp; báo giá trọn gói
                </a>
                <a href="tel:0978999043" className="hero-btn hero-btn-outline">
                  Gọi ngay: 0978 999 043
                </a>
              </div>

              <div className="building-hero-note">
                <span>✓</span> Đã đồng hành cùng{" "}
                <strong>100+ gia chủ nhà phố &amp; biệt thự</strong> tại Đà Nẵng
                và khu vực miền Trung.
              </div>
            </div>

            {/* Hero image */}
            <div className="building-hero-right">
              <div className="building-hero-image-wrapper">
                <img
                  src={building1}
                  alt="Phối cảnh công trình xây nhà trọn gói do Nguyễn Hải thực hiện"
                  className="building-hero-image"
                  loading="eager"
                  decoding="async"
                />
                <div className="building-hero-badge">
                  Xây nhà trọn gói · Chìa khóa trao tay
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="building-stats">
            <div className="building-stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Công trình đã hoàn thành</span>
            </div>
            <div className="building-stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Năm kinh nghiệm thực chiến</span>
            </div>
            <div className="building-stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">
                Cam kết: Tiến độ · Chất lượng · Chi phí
              </span>
            </div>
          </div>
        </section>

        {/* =============== GIỚI THIỆU DỊCH VỤ =============== */}
        <section className="building-description building-about">
          <h2 className="building-subtitle">
            Xây nhà trọn gói là gì? Vì sao nên chọn{" "}
            <span className="highlight-blue">Nguyễn Hải</span>?
          </h2>

          <p className="building-text">
            <span className="highlight">Xây nhà trọn gói</span> đang là xu thế
            hiện nay, gia chủ chỉ cần ký hợp đồng thì nhà thầu sẽ thực hiện mọi
            công đoạn xây dựng từ A – Z. Điều này giúp gia chủ có thể thoải mái
            chờ ngày về nhà mới trong khi đơn vị thi công chủ động theo tiến độ.
          </p>

          <p className="building-text">
            Dịch vụ thiết kế và xây nhà trọn gói bao gồm các hạng mục thiết kế
            kiến trúc, thi công thô, thi công hoàn thiện và thi công nội thất
            cho nhà phố, biệt thự, căn hộ chung cư, tòa nhà văn phòng,… Đồng
            thời, chúng tôi cung cấp trọn gói nhân công và vật tư xây dựng.
          </p>

          <p className="building-text">
            Hiện nay <span className="highlight">Nguyễn Hải</span> được khách
            hàng tin tưởng chọn làm nhà thầu thi công trọn gói cho rất nhiều
            công trình. Với chi phí hợp lý cùng đội ngũ nhân sự chuyên môn,{" "}
            <span className="highlight">Nguyễn Hải</span> là điểm tựa vững chắc
            để anh/chị an tâm chờ{" "}
            <strong>“chìa khóa trao tay, mừng tân gia”</strong>.
          </p>
        </section>

        {/* =============== GÓI DỊCH VỤ TRỌN GÓI (SO SÁNH) =============== */}
        <section className="building-description building-packages">
          <h2 className="building-subtitle">
            Gói dịch vụ xây nhà trọn gói tại{" "}
            <span className="highlight-blue">Nguyễn Hải</span>
          </h2>
          <p className="building-text building-text-center">
            Tùy ngân sách &amp; mong muốn hoàn thiện, anh/chị có thể chọn gói
            phù hợp. Tất cả đều{" "}
            <strong>
              trọn gói từ thiết kế đến thi công – không lo phát sinh
            </strong>
            .
          </p>

          <div className="package-grid">
            {/* Gói tiêu chuẩn */}
            <article className="package-card">
              <div className="package-label">GÓI TIÊU CHUẨN</div>
              <h3>Nhà phố cơ bản</h3>
              <p className="package-price">Từ ~6,5 triệu/m²</p>
              <ul>
                <li>Thiết kế kiến trúc cơ bản.</li>
                <li>Thi công phần thô + hoàn thiện tiêu chuẩn.</li>
                <li>Vật tư phổ thông, đảm bảo chất lượng.</li>
                <li>Phù hợp nhà phố 1–3 tầng.</li>
              </ul>

              <div className="package-actions">
                <a href="#form-tron-goi" className="package-btn-main">
                  Nhận báo giá gói tiêu chuẩn
                </a>
              </div>
            </article>

            {/* Gói phổ biến */}
            <article className="package-card package-card-popular">
              <div className="package-label package-label-popular">
                GÓI PHỔ BIẾN
              </div>
              <h3>Nhà phố hiện đại</h3>
              <p className="package-price">Từ ~7,0 – 8,0 triệu/m²</p>
              <ul>
                <li>Thiết kế kiến trúc + nội thất 3D.</li>
                <li>Thi công trọn gói hoàn thiện, tối ưu công năng.</li>
                <li>Vật tư khá – tốt, thẩm mỹ cao, bền lâu.</li>
                <li>Phù hợp gia đình trẻ, nhà phố 2–4 tầng.</li>
              </ul>

              <div className="package-tag">Khách hàng chọn nhiều nhất</div>

              <div className="package-actions">
                <a
                  href="#form-tron-goi"
                  className="package-btn-main package-btn-main-hot"
                >
                  Đăng ký tư vấn gói phổ biến
                </a>
                <a href="tel:0978999043" className="package-btn-ghost">
                  Gọi ngay: 0978 999 043
                </a>
              </div>
            </article>

            {/* Gói cao cấp */}
            <article className="package-card">
              <div className="package-label">GÓI CAO CẤP</div>
              <h3>Biệt thự &amp; nhà cao cấp</h3>
              <p className="package-price">Từ ~9,0 triệu/m² trở lên</p>
              <ul>
                <li>Thiết kế kiến trúc – nội thất cao cấp.</li>
                <li>Vật tư cao cấp, chi tiết hoàn thiện tinh xảo.</li>
                <li>Quản lý dự án, giám sát kỹ thuật riêng.</li>
                <li>Phù hợp biệt thự, nhà vườn, villa nghỉ dưỡng.</li>
              </ul>

              <div className="package-actions">
                <a href="#form-tron-goi" className="package-btn-main">
                  Nhận báo giá gói cao cấp
                </a>
              </div>
            </article>
          </div>

          <div className="package-note">
            <strong>Lưu ý:</strong> Đơn giá trên chỉ mang tính{" "}
            <span className="highlight-blue">tham khảo</span>. Để có báo giá{" "}
            <strong>chính xác – sát thực tế – không phát sinh</strong>, đội ngũ{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span> sẽ trực tiếp{" "}
            <strong>
              khảo sát hiện trạng, đo đạc diện tích, tư vấn vật tư & phong cách
            </strong>
            , sau đó lập <strong>dự toán chi tiết</strong> theo đúng nhu cầu của
            anh/chị.
          </div>
        </section>

        {/* =============== LỢI ÍCH / USP =============== */}
        <section className="building-description building-benefits">
          <h2 className="building-subtitle">
            Lợi ích khi xây nhà trọn gói tại{" "}
            <span className="highlight-blue">Nguyễn Hải</span>
          </h2>

          <div className="building-benefit-grid">
            <article className="benefit-card">
              <h3>Miễn phí 100% thiết kế</h3>
              <p>
                Miễn phí toàn bộ chi phí thiết kế kiến trúc – nội thất khi ký
                hợp đồng thi công trọn gói, giúp tiết kiệm đến hàng chục triệu
                đồng.
              </p>
            </article>

            <article className="benefit-card">
              <h3>Tiết kiệm chi phí tổng thể</h3>
              <p>
                Vật tư, nhân công được tối ưu theo năng lực thi công của Nguyễn
                Hải, hạn chế phát sinh nhờ bóc tách khối lượng &amp; lập dự toán
                ngay từ đầu.
              </p>
            </article>

            <article className="benefit-card">
              <h3>Đúng tiến độ, rõ ràng hợp đồng</h3>
              <p>
                Hợp đồng nêu rõ thời gian thi công từng giai đoạn, mốc thanh
                toán &amp; điều khoản phạt – thưởng tiến độ, giúp anh/chị dễ
                dàng kiểm soát.
              </p>
            </article>

            <article className="benefit-card">
              <h3>Bảo hành sau bàn giao</h3>
              <p>
                Bảo hành kết cấu lên đến 5 năm, hoàn thiện 1 năm. Đội ngũ kỹ
                thuật luôn sẵn sàng hỗ trợ khi công trình có vấn đề phát sinh.
              </p>
            </article>
          </div>
        </section>

        {/* =============== CAM KẾT CHẤT LƯỢNG & BẢO HÀNH =============== */}
        <section className="building-description building-commitments">
          <h2 className="building-subtitle">
            Cam kết chất lượng &amp; bảo hành của{" "}
            <span className="highlight-blue">Nguyễn Hải</span>
          </h2>

          <div className="commit-grid">
            <article className="commit-card">
              <h3>Cam kết đúng bản vẽ</h3>
              <p>
                Thi công theo đúng hồ sơ thiết kế đã duyệt. Mọi thay đổi đều có
                biên bản và sự đồng ý của chủ đầu tư.
              </p>
            </article>
            <article className="commit-card">
              <h3>Minh bạch chi phí</h3>
              <p>
                Bảng dự toán rõ ràng, báo cáo khối lượng theo giai đoạn. Không
                “độn giá vật tư” hay thu thêm ngoài hợp đồng.
              </p>
            </article>
            <article className="commit-card">
              <h3>An toàn &amp; vệ sinh công trình</h3>
              <p>
                Tuân thủ quy định an toàn lao động, che chắn khu vực thi công,
                dọn dẹp sạch sẽ trước khi bàn giao.
              </p>
            </article>
            <article className="commit-card">
              <h3>Đồng hành sau bàn giao</h3>
              <p>
                Hỗ trợ kiểm tra – bảo dưỡng định kỳ, xử lý nhanh khi anh/chị cần
                tư vấn cải tạo hoặc nâng cấp công trình.
              </p>
            </article>
          </div>
        </section>

        {/* =============== QUY TRÌNH A–Z =============== */}
        <section className="building-description building-process">
          <h2 className="building-subtitle">
            Quy trình xây nhà trọn gói từ A–Z tại{" "}
            <span className="highlight-blue">Nguyễn Hải</span>
          </h2>

          <p className="building-text building-text-center process-intro">
            Quy trình được chuẩn hóa theo 6 bước rõ ràng, giúp anh/chị theo dõi
            dễ dàng từ lúc lên ý tưởng đến khi nhận nhà và bảo hành sau bàn
            giao.
          </p>

          <div className="process-grid">
            <article className="process-card">
              <div className="process-step-stt">1</div>
              <h3 className="process-title">
                Tiếp nhận nhu cầu &amp; khảo sát hiện trạng
              </h3>
              <p className="process-desc">
                Trao đổi mong muốn, phong cách, ngân sách; khảo sát đất, đo đạc
                hiện trạng để đưa ra phương án tối ưu.
              </p>
            </article>

            <article className="process-card">
              <div className="process-step-stt">2</div>
              <h3 className="process-title">
                Lên concept &amp; phương án mặt bằng
              </h3>
              <p className="process-desc">
                Kiến trúc sư đề xuất bố trí công năng, mặt tiền sơ bộ để gia chủ
                duyệt trước khi triển khai chi tiết.
              </p>
            </article>

            <article className="process-card">
              <div className="process-step-stt">3</div>
              <h3 className="process-title">
                Thiết kế chi tiết &amp; lập dự toán trọn gói
              </h3>
              <p className="process-desc">
                Hoàn thiện bản vẽ kiến trúc, kết cấu, điện nước, nội thất 3D,
                kèm dự toán chi tiết từng hạng mục.
              </p>
            </article>

            <article className="process-card">
              <div className="process-step-stt">4</div>
              <h3 className="process-title">Ký hợp đồng thi công trọn gói</h3>
              <p className="process-desc">
                Thống nhất vật tư, tiến độ, điều khoản bảo hành – thanh toán và
                ký hợp đồng chính thức.
              </p>
            </article>

            <article className="process-card">
              <div className="process-step-stt">5</div>
              <h3 className="process-title">
                Thi công &amp; giám sát chất lượng
              </h3>
              <p className="process-desc">
                Thi công phần móng, khung, hoàn thiện, lắp đặt nội thất theo bản
                vẽ; giám sát kỹ thuật chặt chẽ.
              </p>
            </article>

            <article className="process-card">
              <div className="process-step-stt">6</div>
              <h3 className="process-title">
                Nghiệm thu – bàn giao – bảo hành
              </h3>
              <p className="process-desc">
                Kiểm tra chất lượng, hoàn thiện các hạng mục cuối cùng, bàn giao
                chìa khóa và bắt đầu giai đoạn bảo hành.
              </p>
            </article>
          </div>
        </section>

        {/* =============== HỢP ĐỒNG THIẾT KẾ & THI CÔNG =============== */}
        <section className="building-description building-contract">
          <h2 className="building-subtitle">
            Hợp đồng thiết kế &amp; thi công trọn gói tại{" "}
            <span className="highlight-blue">Nguyễn Hải</span>
          </h2>

          <p className="building-text building-text-center">
            Khách hàng khi ký hợp đồng thiết kế xây nhà trọn gói tại{" "}
            <span className="highlight-blue">Nguyễn Hải</span> sẽ được hỗ trợ
            toàn bộ dịch vụ từ thiết kế đến thi công thô và thi công hoàn thiện,
            theo 3 nhóm hạng mục chính dưới đây:
          </p>

          <div className="contract-grid">
            {/* Card 1 */}
            <article className="contract-card">
              <h3>1. Hợp đồng thiết kế</h3>
              <p className="contract-intro">
                Bản vẽ đầy đủ cho một công trình nhà ở, làm cơ sở xin phép và
                thi công:
              </p>
              <ul className="building-list">
                <li>
                  Phối cảnh 3D ngoại thất: cổng, tường, sân vườn, mái, cột, hệ
                  thống cửa.
                </li>
                <li>Bản vẽ mặt cắt, mặt đứng công trình.</li>
                <li>Bản vẽ kết cấu, bố trí vật dụng theo từng tầng.</li>
                <li>
                  Bản vẽ chi tiết kết cấu móng, cột, dầm, mái, sân thượng, v.v.
                </li>
                <li>Bản vẽ hệ thống điện, chiếu sáng, internet, tivi,…</li>
                <li>Bản vẽ kiến trúc cảnh quan sân vườn.</li>
              </ul>
            </article>

            {/* Card 2 */}
            <article className="contract-card">
              <h3>2. Thi công phần thô</h3>
              <p className="contract-intro">
                Thực hiện toàn bộ khung chịu lực và hệ thống kỹ thuật cơ bản:
              </p>
              <ul className="building-list">
                <li>Móng nhà, đà kiềng, cột, dầm.</li>
                <li>
                  Xây tô tường bao, tường ngăn phòng; đổ bê tông sàn, cầu thang.
                </li>
                <li>
                  Lắp đặt hệ thống điện nước âm tường, ống kỹ thuật, hố ga, bể
                  phốt, bể nước.
                </li>
                <li>Xây tô mặt tiền, lợp mái (nếu có).</li>
              </ul>
            </article>

            {/* Card 3 */}
            <article className="contract-card">
              <h3>3. Thi công hoàn thiện</h3>
              <p className="contract-intro">
                Hoàn thiện thẩm mỹ và tiện ích sử dụng trước khi bàn giao:
              </p>
              <ul className="building-list">
                <li>Ốp lát gạch, sàn gỗ, lam trang trí, trần thạch cao.</li>
                <li>
                  Lắp đặt cửa, lan can, tay vịn, các hạng mục sắt – inox – kính.
                </li>
                <li>
                  Sơn nước trong ngoài, hoàn thiện mặt tiền, ốp đá, lam che
                  nắng.
                </li>
                <li>
                  Lắp thiết bị điện, đèn, vệ sinh, máy nước nóng, điều hòa,
                  camera (theo thỏa thuận).
                </li>
                <li>Sân vườn, cổng, hàng rào, mái che, hạng mục phụ trợ.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* =============== NHỮNG ĐIỀU CẦN LƯU Ý =============== */}
        <section className="building-description building-notes">
          <h2 className="building-subtitle">
            Những điều anh/chị cần lưu ý khi xây nhà trọn gói
          </h2>
          <ul className="building-list">
            <li>
              <strong>Về công năng:</strong> xác định rõ số phòng ngủ, phòng
              thờ, phòng làm việc, bếp – ăn, gara… để kiến trúc sư tối ưu ngay
              từ đầu.
            </li>
            <li>
              <strong>Về chi phí:</strong> giá xây nhà trọn gói phụ thuộc diện
              tích, số tầng, vị trí, phong cách, thời điểm xây dựng &amp; loại
              vật tư; công trình càng phức tạp thì đơn giá càng cao.
            </li>
            <li>
              <strong>Về vật tư:</strong> ưu tiên thương hiệu rõ ràng, xuất xứ
              minh bạch để đảm bảo tuổi thọ công trình và giảm chi phí sửa chữa
              về sau.
            </li>
          </ul>
        </section>

        {/* =============== FORM TƯ VẤN TRỌN GÓI =============== */}
        <section
          className="building-description building-form-section"
          id="form-tron-goi"
        >
          <Suspense
            fallback={
              <div className="building-lazy-fallback">
                Đang tải form tư vấn...
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </section>

        {/* =============== FAQ =============== */}
        <section className="building-description building-faq-section">
          <Suspense
            fallback={
              <div className="building-lazy-fallback">
                Đang tải câu hỏi thường gặp...
              </div>
            }
          >
            <FAQComponent />
          </Suspense>
        </section>

        {/* =============== CÔNG TRÌNH TIÊU BIỂU =============== */}
        <section className="building-description building-portfolio">
          <h2 className="building-subtitle">
            Một số công trình xây nhà trọn gói{" "}
            <span className="highlight-blue">Nguyễn Hải</span> đã thực hiện
          </h2>

          <div className="building-portfolio-grid">
            <PortfolioCard
              src={building2}
              title="Nhà phố 3 tầng hiện đại"
              tag="Phong cách Địa Trung Hải"
            />
            <PortfolioCard
              src={building3}
              title="Nhà phố 4 tầng"
              tag="Kiến trúc hiện đại bo cong"
            />
            <PortfolioCard
              src={building4}
              title="Nhà phố 3 tầng"
              tag="Hoàn thiện nội thất"
            />
            <PortfolioCard
              src={building5}
              title="Biệt thự phong cách Địa Trung Hải"
              tag="Thiết kế kiến trúc"
            />
            <PortfolioCard
              src={building6}
              title="Nhà phố lệch tầng hiện đại"
              tag="Thiết kế – Thi công trọn gói"
            />
            <PortfolioCard
              src={building7}
              title="Biệt thự hiện đại có hồ bơi"
              tag="Thi công trọn gói"
            />
          </div>
        </section>

        {/* =============== CTA CHỐT CUỐI TRANG =============== */}
        <section className="building-bottom-cta">
          <div className="bottom-cta-content">
            <h2>
              Sẵn sàng bắt đầu{" "}
              <span className="highlight-blue">ngôi nhà mơ ước</span> của
              anh/chị?
            </h2>
            <p>
              Gửi bản vẽ hiện có hoặc chia sẻ nhu cầu, đội ngũ{" "}
              <strong>PCD Nguyễn Hải</strong> sẽ tư vấn phương án &amp; báo giá
              trọn gói rõ ràng – miễn phí khảo sát tại Đà Nẵng.
            </p>
            <div className="bottom-cta-actions">
              <a href="#form-tron-goi" className="hero-btn hero-btn-primary">
                Gửi yêu cầu tư vấn ngay
              </a>
              <a href="tel:0978999043" className="hero-btn hero-btn-outline">
                Gọi hotline 0978 999 043
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default memo(Building_Houses);
