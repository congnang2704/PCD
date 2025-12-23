// src/pages/Users/Services/Finishing_Constructions/Finishing_Constructions.js
import React, { useEffect, useMemo } from "react";
import "./Finishing_Constructions.css";
import ContactForm from "../../../../components/Mail/ContactFormMail/ContactFormMail";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

// Hình ảnh minh họa
import finishing1 from "../../../../assets/66224913_2415374148698163_4452022022242828288_o.jpg";
import finishing2 from "../../../../assets/nhahoanthien.jpg";
import finishing3 from "../../../../assets/8.jpg";
import finishing4 from "../../../../assets/13.jpg";
import finishing5 from "../../../../assets/11.jpg";

const HOTLINE = "0905 402 989";
const HOTLINE_RAW = "0905402989";

export default function Finishing_Constructions() {
  useEffect(() => {
    document.title =
      "Thi công hoàn thiện nhà ở – Minh bạch chi phí | Nguyễn Hải Design & Build";
  }, []);

  const images = useMemo(
    () => [
      {
        src: finishing3,
        cap: "Nhà 2 tầng hiện đại – Hoàn thiện mặt tiền lam gỗ",
        alt: "Công trình nhà 2 tầng hiện đại – thi công hoàn thiện mặt tiền lam gỗ",
      },
      {
        src: finishing4,
        cap: "Biệt thự hiện đại – Thi công hoàn thiện đồng bộ kiến trúc",
        alt: "Thi công hoàn thiện biệt thự hiện đại – kiến trúc và vật liệu đồng bộ",
      },
      {
        src: finishing5,
        cap: "Nhà vườn hiện đại – Hoàn thiện theo phong cách nghỉ dưỡng",
        alt: "Công trình nhà vườn hiện đại – thi công hoàn thiện phong cách nghỉ dưỡng",
      },
    ],
    []
  );

  return (
    <div className="finishing-page">
      <a className="finishing-skip" href="#gioi-thieu">
        Bỏ qua đến nội dung
      </a>

      <div className="finishing-container">
        {/* HERO */}
        <header className="finishing-hero" aria-label="Thi công hoàn thiện">
          <div className="finishing-hero__content">
            <p className="finishing-kicker">
              Thi công hoàn thiện • Chuẩn thiết kế • Kiểm soát phát sinh
            </p>

            <h1 className="finishing-title">
              Thi công hoàn thiện nhà ở
              <br />
              <span className="highlight-blue">
                Đúng bản vẽ – đúng vật liệu – rõ chi phí
              </span>
            </h1>

            <p className="finishing-lead">
              Hoàn thiện là giai đoạn “đẹp – ở được – bền lâu”. Nguyễn Hải
              Design &amp; Build tập trung thi công theo hồ sơ, chốt vật liệu rõ
              ràng, nghiệm thu theo hạng mục để hạn chế phát sinh và đảm bảo
              chất lượng bàn giao.
            </p>

            <div className="finishing-cta">
              <a className="btn-primary" href="#bao-gia">
                Nhận báo giá hoàn thiện
              </a>
              <a
                className="btn-outline"
                href={`tel:${HOTLINE_RAW}`}
                rel="nofollow"
              >
                Gọi tư vấn {HOTLINE}
              </a>
            </div>

            {/* LẤP KHOẢNG TRẮNG + tạo điểm nhấn */}
            <div className="finishing-trust" role="list" aria-label="Cam kết">
              <div className="trust-pill" role="listitem">
                ✔ Báo giá theo hạng mục
              </div>
              <div className="trust-pill" role="listitem">
                ✔ Chốt vật liệu trước thi công
              </div>
              <div className="trust-pill" role="listitem">
                ✔ Có giám sát kỹ thuật
              </div>
              <div className="trust-pill" role="listitem">
                ✔ Nghiệm thu theo checklist
              </div>
            </div>

            <div className="finishing-stats" aria-label="Lợi ích nổi bật">
              <div className="stat">
                <div className="stat-k">Minh bạch</div>
                <div className="stat-v">Chi phí</div>
              </div>
              <div className="stat">
                <div className="stat-k">Rõ ràng</div>
                <div className="stat-v">Vật liệu</div>
              </div>
              <div className="stat">
                <div className="stat-k">Hạn chế</div>
                <div className="stat-v">Phát sinh</div>
              </div>
            </div>
          </div>

          <div className="finishing-hero__media" aria-hidden="false">
            <figure className="finishing-hero__figure">
              <img
                src={finishing2}
                alt="Thi công hoàn thiện nhà ở – Nguyễn Hải Design & Build"
                className="finishing-hero__img"
                loading="eager"
                decoding="async"
                width="1200"
                height="750"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <figcaption className="finishing-hero__caption">
                Thi công hoàn thiện nhà phố hiện đại – Nguyễn Hải Design & Build
              </figcaption>
              <span className="finishing-hero-badge">Công trình thực tế</span>
            </figure>
          </div>
        </header>

        {/* GIỚI THIỆU */}
        <section id="gioi-thieu" className="finishing-card">
          {/* QUICK NAV */}
          <nav className="finishing-nav" aria-label="Điều hướng nhanh">
            <a href="#gioi-thieu">Giới thiệu</a>
            <a href="#phat-sinh">Vì sao hay phát sinh</a>
            <a href="#hang-muc">Hạng mục</a>
            <a href="#quy-trinh">Quy trình</a>
            <a href="#cong-trinh">Công trình</a>
            <a href="#bao-gia">Báo giá</a>
            <a href="#lien-he">Liên hệ</a>
          </nav>
          <h2 className="finishing-subtitle">
            Hoàn thiện nhà là gì? Vì sao giai đoạn này quan trọng?
          </h2>

          <p className="finishing-text">
            Thi công hoàn thiện là giai đoạn sau phần thô, bao gồm toàn bộ công
            việc giúp công trình <strong>đưa vào sử dụng thực tế</strong>: sơn
            bả, ốp lát, trần, cửa, điện nước, thiết bị vệ sinh, hoàn thiện mặt
            tiền và các chi tiết thẩm mỹ. Đây là phần quyết định trực tiếp đến
            <strong> trải nghiệm sống</strong> và <strong>tính thẩm mỹ</strong>{" "}
            của ngôi nhà.
          </p>

          <div className="finishing-note">
            Mục tiêu của Nguyễn Hải: thi công đúng hồ sơ + chốt vật liệu trước +
            nghiệm thu theo hạng mục → hạn chế phát sinh, bàn giao đúng tiến độ.
          </div>
        </section>

        {/* Ảnh minh hoạ */}
        <div className="finishing-image-container">
          <img
            src={finishing1}
            alt="Công trình hoàn thiện do Nguyễn Hải Design & Build thực hiện"
            className="finishing-image"
            loading="lazy"
            decoding="async"
          />
          <div className="finishing-caption">
            <em>
              Công trình hoàn thiện do Nguyễn Hải Design & Build thực hiện
            </em>
          </div>
        </div>

        {/* PHÁT SINH */}
        <section id="phat-sinh" className="finishing-card">
          <h2 className="finishing-subtitle">
            Vì sao thi công hoàn thiện hay “đội chi phí”?
          </h2>

          <div className="risk-grid">
            <div className="risk-item">
              <h3>❌ Thiếu hồ sơ chi tiết</h3>
              <p>
                Không có bản vẽ triển khai rõ → thợ làm theo kinh nghiệm → dễ
                sai và sửa lại.
              </p>
            </div>

            <div className="risk-item">
              <h3>❌ Không chốt vật liệu</h3>
              <p>
                Đổi mẫu gạch/sơn/thiết bị giữa chừng → giá thay đổi, tiến độ
                chậm.
              </p>
            </div>

            <div className="risk-item">
              <h3>❌ Báo giá không theo hạng mục</h3>
              <p>
                Thiếu hạng mục nhỏ (len chân tường, phụ kiện, chống thấm…) →
                phát sinh liên tục.
              </p>
            </div>

            <div className="risk-item">
              <h3>❌ Thiếu giám sát kỹ thuật</h3>
              <p>
                Làm không đúng quy trình → lỗi ẩn sau bàn giao (thấm, nứt, bong
                tróc…).
              </p>
            </div>
          </div>
        </section>

        {/* HẠNG MỤC */}
        <section
          id="hang-muc"
          className="finishing-card"
          aria-label="Hạng mục thi công hoàn thiện"
        >
          <h2 className="finishing-subtitle">Hạng mục thi công hoàn thiện</h2>

          <p className="finishing-text" style={{ marginBottom: 10 }}>
            Nguyễn Hải bóc tách theo <strong>checklist hạng mục</strong> để báo
            giá rõ ràng, hạn chế phát sinh. Anh/chị chỉ cần chọn{" "}
            <strong>phạm vi</strong> và <strong>mức vật liệu</strong>— bên mình
            chốt mẫu trước khi thi công.
          </p>

          <div
            className="finishing-scope"
            role="list"
            aria-label="Checklist hạng mục"
          >
            <article className="scope-item" role="listitem">
              <h3>🏠 Mặt tiền & ngoại thất</h3>
              <p>
                Lam, khung thép trang trí, lan can, ốp điểm nhấn, mái che (nếu
                có).
              </p>
              <ul>
                <li>Chốt vật liệu & màu trước</li>
                <li>Thi công theo chi tiết mặt đứng</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>🧱 Ốp lát & hoàn thiện sàn</h3>
              <p>Gạch nền, ốp WC/bếp, đá cầu thang, sàn gỗ (tuỳ gói).</p>
              <ul>
                <li>Chốt mẫu + ron + nẹp</li>
                <li>Checklist chống thấm trước khi ốp lát</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>🎛 Trần & hoàn thiện thạch cao</h3>
              <p>
                Trần phẳng/giật cấp/trang trí, xử lý mối nối, sơn hoàn thiện.
              </p>
              <ul>
                <li>Đảm bảo phẳng – không nứt mối nối</li>
                <li>Phối đèn theo layout</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>🎨 Sơn bả & hoàn thiện tường</h3>
              <p>Bả matit, sơn nội/ngoại thất theo hệ sơn đã chốt.</p>
              <ul>
                <li>Chốt hệ sơn + quy trình thi công</li>
                <li>Nghiệm thu bề mặt trước khi lăn màu</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>🛡 Chống thấm</h3>
              <p>WC, ban công, sàn mái, bồn hoa, tường ngoài.</p>
              <ul>
                <li>Thi công đúng lớp – đúng vật liệu</li>
                <li>Test ngâm nước/kiểm tra trước khi hoàn thiện</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>⚡ Điện – nước & thiết bị</h3>
              <p>
                Đi ống âm, lắp thiết bị, test vận hành (áp lực nước, tải điện).
              </p>
              <ul>
                <li>Test trước khi đóng trần/ốp lát</li>
                <li>Bàn giao checklist & vị trí thiết bị</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>🚪 Cửa & phụ kiện</h3>
              <p>Cửa phòng, cửa sổ, cửa chính (tuỳ lựa chọn).</p>
              <ul>
                <li>Chốt kích thước – phụ kiện – màu</li>
                <li>Lắp đặt chuẩn, đóng mở êm</li>
              </ul>
            </article>

            <article className="scope-item" role="listitem">
              <h3>🌤 Giếng trời/ô thông tầng</h3>
              <p>Khung thép, kính cường lực, lấy sáng & thông gió.</p>
              <ul>
                <li>Chống dột – thoát nước tốt</li>
                <li>An toàn lan can/kính</li>
              </ul>
            </article>
          </div>

          <div className="finishing-note" style={{ marginTop: 12 }}>
            ✅ <strong>Báo giá minh bạch:</strong> mỗi hạng mục đều có “khối
            lượng + vật liệu + đơn giá”. Anh/chị muốn hoàn thiện phần nào, bên
            mình bóc tách đúng phần đó — không bị “đội” vì thiếu mục nhỏ.
          </div>

          <div className="finishing-cta" style={{ marginTop: 14 }}>
            <a className="btn-primary" href="#bao-gia">
              Nhận báo giá theo checklist
            </a>
            <a className="btn-outline" href="#lien-he">
              Gửi form để chốt vật liệu
            </a>
          </div>
        </section>

        {/* Ảnh minh hoạ */}
        <div className="finishing-image-container">
          <img
            src={finishing2}
            alt="Công trình hoàn thiện do Nguyễn Hải Design & Build thực hiện"
            className="finishing-image"
            loading="lazy"
            decoding="async"
          />
          <div className="finishing-caption">
            <em>
              Công trình hoàn thiện do Nguyễn Hải Design & Build thực hiện
            </em>
          </div>
        </div>

        {/* QUY TRÌNH */}
        <section id="quy-trinh" className="finishing-card">
          <h2 className="finishing-subtitle">
            Quy trình thi công hoàn thiện (6 bước)
          </h2>

          <ol className="finishing-process-steps">
            <li>
              <strong>Tiếp nhận nhu cầu</strong>
              <span>
                Nhận hồ sơ thiết kế/phạm vi cần hoàn thiện, nhu cầu &amp; ngân
                sách.
              </span>
            </li>
            <li>
              <strong>Khảo sát hiện trạng</strong>
              <span>
                Kiểm tra phần thô, hệ thống điện nước, chống thấm, sai số thi
                công.
              </span>
            </li>
            <li>
              <strong>Chốt vật liệu</strong>
              <span>
                Gạch, sơn, thiết bị, cửa… chốt mẫu/brand trước khi vào thi công.
              </span>
            </li>
            <li>
              <strong>Bóc tách &amp; báo giá</strong>
              <span>
                Báo giá theo hạng mục/khối lượng, rõ phạm vi – điều kiện – tiến
                độ.
              </span>
            </li>
            <li>
              <strong>Thi công &amp; giám sát</strong>
              <span>
                Thi công theo quy trình, nghiệm thu từng hạng mục quan trọng.
              </span>
            </li>
            <li>
              <strong>Bàn giao &amp; bảo hành</strong>
              <span>
                Nghiệm thu tổng, bàn giao hồ sơ cơ bản và cam kết bảo hành theo
                hạng mục.
              </span>
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="finishing-card">
          <FAQComponent />
        </section>

        {/* LIÊN HỆ */}
        <section id="lien-he" className="finishing-card">
          <div className="finishing-form-wrap">
            <ContactForm />
          </div>
        </section>

        {/* CÔNG TRÌNH TIÊU BIỂU */}
        <section id="cong-trinh" className="finishing-card">
          <h2 className="finishing-subtitle">
            Công trình tiêu biểu – Thi công hoàn thiện
          </h2>
          <p className="finishing-text">
            Một số hình ảnh công trình (thực tế/3D minh hoạ) để anh/chị tham
            khảo phong cách hoàn thiện và chất lượng bàn giao.
          </p>

          <div className="gallery-grid">
            {images.map((it, idx) => (
              <figure className="gallery-item" key={idx}>
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{it.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* BÁO GIÁ */}
        <section
          id="bao-gia"
          className="finishing-card finishing-quote"
          aria-label="Nhận báo giá thi công hoàn thiện"
        >
          <h2 className="finishing-subtitle">
            Nhận báo giá hoàn thiện trong 5–15 phút
          </h2>

          <p className="finishing-text">
            Anh/chị chỉ cần gửi <strong>3 thông tin</strong> là Nguyễn Hải có
            thể lên <strong>báo giá theo hạng mục</strong> (rõ vật liệu – rõ
            khối lượng – rõ tiến độ): <strong>diện tích</strong>,{" "}
            <strong>phạm vi hoàn thiện</strong> và{" "}
            <strong>mức vật liệu mong muốn</strong>.
          </p>

          {/* điểm chốt */}
          <div
            className="finishing-offer"
            role="list"
            aria-label="Lợi ích khi nhận báo giá"
          >
            <div className="offer-item" role="listitem">
              ✅ Báo giá theo checklist – hạn chế phát sinh
            </div>
            <div className="offer-item" role="listitem">
              ✅ Chốt mẫu vật liệu trước thi công (gạch/sơn/thiết bị)
            </div>
            <div className="offer-item" role="listitem">
              ✅ Có kỹ thuật giám sát & nghiệm thu theo hạng mục
            </div>
            <div className="offer-item" role="listitem">
              ✅ Tư vấn tối ưu chi phí theo ngân sách (không “vẽ” thêm)
            </div>
          </div>

          {/* khan hiếm nhẹ + cam kết */}
          <div className="finishing-note" style={{ marginTop: 12 }}>
            📌 <strong>Lưu ý:</strong> Lịch thi công mỗi tuần có giới hạn.
            Anh/chị để lại form sớm để được{" "}
            <strong>ưu tiên khảo sát & giữ lịch</strong>.
          </div>

          <div className="finishing-cta" style={{ marginTop: 14 }}>
            <a
              className="btn-primary"
              href={`tel:${HOTLINE_RAW}`}
              rel="nofollow"
              aria-label={`Gọi tư vấn ${HOTLINE}`}
            >
              📞 Gọi chốt nhanh {HOTLINE}
            </a>

            <a
              className="btn-outline"
              href="#lien-he"
              aria-label="Gửi form nhận báo giá hoàn thiện"
            >
              📝 Nhận báo giá chi tiết
            </a>
          </div>

          <p className="finishing-micro" aria-live="polite">
            ⏱ Phản hồi nhanh trong giờ hành chính • Báo giá minh bạch theo hạng
            mục • Có cam kết vật liệu
          </p>
        </section>
      </div>
    </div>
  );
}
