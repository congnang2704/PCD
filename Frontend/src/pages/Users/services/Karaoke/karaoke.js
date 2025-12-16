import React from "react";
import "./karaoke.css";

import room1 from "../../../../assets/Karaoke/anh da sua.png";
import room2 from "../../../../assets/Karaoke/z7060936780352_135125a16f598636b5536613ba6712fc.png";
import room3 from "../../../../assets/Karaoke/xong roi.png";
import room4 from "../../../../assets/Karaoke/da-sua-roi.png";
import room5 from "../../../../assets/Karaoke/nhu tren.png";

export default function Karaoke() {
  const HOTLINE = "0978.999.043";

  return (
    <main className="karaoke">
      {/* ===== HERO ===== */}
      <section className="karaoke-hero karaoke-container" id="top">
        <h1>
          <span className="karaoke-txt-gradient">
            {" "}
            Nguyễn Hải Design & Build - Thi Công Trọn Gói Karaoke
          </span>
          <br />
          <span className="karaoke-txt-gradient">
            Chuyên nghiệp – An tâm – Đúng tiến độ
          </span>
        </h1>

        <p className="karaoke-lead">
          Từ mặt bằng thô đến vận hành, chúng tôi{" "}
          <strong>thiết kế – thi công trọn gói</strong>: khảo sát hiện trạng,
          lên concept 2D/3D, bóc tách–dự toán minh bạch,
          <strong> gia công tại 2 xưởng ở Đà Nẵng</strong> và lắp đặt tại công
          trình. Quy trình khép kín giúp{" "}
          <strong>kiểm soát 95% khối lượng</strong>, rút ngắn tiến độ còn
          <strong> khoảng 20–25 ngày/phòng</strong> mà vẫn đảm bảo chuẩn âm học
          (cách âm – tiêu âm – chống rung) và{" "}
          <strong>hệ điện – ánh sáng – PCCC</strong> an toàn. Vật liệu, cấu hình
          âm thanh–ánh sáng được tối ưu theo ngân sách và mô hình kinh doanh để
          phòng hát vào nhịp doanh thu ngay sau bàn giao.
          <strong>
            {" "}
            Bàn giao có checklist nghiệm thu, hướng dẫn vận hành, bảo hành rõ
            ràng
          </strong>{" "}
          và đội ngũ bảo trì/nâng cấp đồng hành lâu dài.
        </p>

        <div className="karaoke-cta-row">
          <a
            href={`tel:${HOTLINE}`}
            className="karaoke-btn karaoke-btn-primary"
          >
            Gọi hotline: {HOTLINE}
          </a>
          <a href="#process" className="karaoke-btn karaoke-btn-outline">
            Xem quy trình
          </a>
          <a href="#pricing" className="karaoke-btn karaoke-btn-link">
            Bảng giá tham khảo ↓
          </a>
        </div>

        <ul className="karaoke-trust">
          <li>
            <b>10+ năm</b> kinh nghiệm
          </li>
          <li>
            <b>2 xưởng</b> gia công tại Đà Nẵng
          </li>
          <li>
            <b>20–25 ngày</b> hoàn thiện/ phòng
          </li>
        </ul>
        <figure className="karaoke-image">
          <img
            className="karaoke-img"
            src={room1}
            alt="Phòng karaoke mẫu tại Đà Nẵng"
            loading="lazy"
          />
          <figcaption className="karaoke-image__cap">
            Phòng karaoke mẫu do Nguyễn Hải Thiết Kế
          </figcaption>
        </figure>
      </section>

      {/* ===== USP ===== */}
      <section className="karaoke-container karaoke-commitments">
        <h2>Vì sao khách hàng ở Đà Nẵng nên chọn chúng tôi?</h2>
        <div className="karaoke-grid karaoke-grid-3">
          <Feature title="Mẫu mới & hợp gu địa phương">
            Bộ thư viện phong cách hiện đại, luxury, neon hiệu ứng theo nhạc để
            bạn duyệt nhanh.
          </Feature>
          <Feature title="Gia công xưởng tại chỗ">
            Chủ động thời gian – chất lượng – chi phí nhờ module hóa & CNC ngay
            tại Đà Nẵng.
          </Feature>
          <Feature title="Kế hoạch chi tiết">
            Timeline – mốc nghiệm thu – checklist an toàn thi công minh bạch
            theo từng hạng mục.
          </Feature>
          <Feature title="Đúng vật liệu đã duyệt">
            Cam kết đúng brand vật liệu, xuất xưởng kèm tem & biên bản nghiệm
            thu.
          </Feature>
          <Feature title="Không phát sinh phi lý">
            Mọi thay đổi đều qua phiếu xác nhận – không phát sinh khi chưa có
            đồng ý bằng văn bản.
          </Feature>
          <Feature title="Bảo hành & hậu mãi">
            Bảo hành kết cấu, điện/đèn; hỗ trợ vận hành lần đầu & tinh chỉnh âm
            sáng.
          </Feature>
        </div>
        <p className="karaoke-note">
          *Hoàn 100% phí thiết kế khi ký hợp đồng thi công trọn gói.
        </p>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="karaoke-container karaoke-process">
        <h2>Quy trình thi công – 6 bước rõ ràng</h2>
        <div className="karaoke-timeline">
          <Step n="01" title="Khảo sát & lấy ý tưởng">
            Đo đạc hiện trạng, phân tích giao thông – âm học, đề xuất concept
            phù hợp vị trí tại Đà Nẵng.
          </Step>
          <Step n="02" title="Thiết kế & chốt vật liệu">
            Lên 2D/3D, bảng vật liệu – mã màu – demo ánh sáng; chốt hồ sơ kỹ
            thuật.
          </Step>
          <Step n="03" title="Dự toán & hợp đồng">
            Bóc tách khối lượng, lịch thanh toán theo mốc; ký hợp đồng & tạm
            ứng.
          </Step>
          <Step n="04" title="Gia công xưởng & chuẩn bị hiện trường">
            Cắt CNC – sơn hoàn thiện – module hóa; chuẩn bị nhân lực, an toàn
            lao động.
          </Step>
          <Step n="05" title="Lắp đặt & nghiệm thu theo mốc">
            Cách âm – điện/đèn – tiêu âm – trang trí; nghiệm thu từng hạng mục.
          </Step>
          <Step n="06" title="Bàn giao – bảo hành – vận hành">
            Bàn giao hồ sơ – hướng dẫn vận hành; chuyển chế độ bảo hành.
          </Step>
        </div>
        <figure className="karaoke-image">
          <img
            className="karaoke-img"
            src={room2}
            alt="Phòng karaoke mẫu tại Đà Nẵng"
            loading="lazy"
          />
          <figcaption className="karaoke-image__cap">
            Phòng karaoke mẫu do Nguyễn Hải Thiết Kế
          </figcaption>
        </figure>
      </section>

      {/* ===== MATERIAL TABLE ===== */}
      <section className="karaoke-container">
        <h2>Bảng vật liệu tiêu chuẩn</h2>
        <div className="karaoke-table-wrap">
          <table className="karaoke-table">
            <thead>
              <tr>
                <th>Hạng mục</th>
                <th>Vật liệu/ Quy cách</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cách âm vách</td>
                <td>
                  Khung sắt hộp mạ kẽm 1.2 ly + cao su 10mm + rockwool
                  40–50kg/m³ + gỗ ép W 10–12mm
                </td>
                <td>Giảm rung truyền, kín khí</td>
              </tr>
              <tr>
                <td>Cách âm trần</td>
                <td>
                  Khung sắt mạ kẽm 1.2 ly + cao su - lưu hóa + gỗ ép W 10mm
                </td>
                <td>Tối ưu theo cao độ trần</td>
              </tr>
              <tr>
                <td>Điện – chiếu sáng</td>
                <td>
                  Dây 1.5–2.5, Aptomat, Led - downlight - mica led, cảm biến
                  (tùy chọn)
                </td>
                <td>Đấu nối theo tiêu chuẩn</td>
              </tr>
              <tr>
                <td>Tiêu âm & trang trí</td>
                <td>
                  MDF - MHF, nỉ - da, PVC giả đá, alu, CNC, sơn & mạ chrome
                  trang trí
                </td>
                <td>Đồng bộ concept</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="karaoke-container karaoke-pricing">
        <h2>Gói & chi phí tham khảo (25 m²/ phòng)</h2>
        <div className="karaoke-grid karaoke-grid-3 karaoke-cards">
          <PriceCard
            title="Phổ biến"
            price="120 – 160 triệu/phòng"
            ribbon="Tiết kiệm"
          >
            Vật liệu chuẩn – hiệu ứng đèn theo nhạc – hoàn thiện gọn gàng, phù
            hợp khởi nghiệp.
          </PriceCard>
          <PriceCard title="Khá VIP" price="175 – 195 triệu/phòng" featured>
            Inox dập chân, PVC giả đá, màn LED P10, mạch LED ma trận; nâng cấp
            cảm giác cao cấp.
          </PriceCard>
          <PriceCard title="VIP" price="Từ 200 triệu/phòng">
            Vật liệu cao cấp – chi tiết chrome – thiết kế điểm nhấn; phù hợp vị
            trí trung tâm Đà Nẵng.
          </PriceCard>
        </div>
        <p className="karaoke-muted karaoke-small">
          Giá mang tính tham khảo tại thời điểm hiện tại. Chúng tôi đo mặt bằng
          & lên hồ sơ để báo giá chính xác.
        </p>
      </section>

      {/* ===== SCOPE / DETAILS ===== */}

      {/* ===== SERVICE AREA ===== */}
      <section className="karaoke-container karaoke-area">
        <h2>Khu vực phục vụ</h2>
        <p className="karaoke-area-p">
          Ưu tiên <strong>Đà Nẵng</strong> và tỉnh lân cận: Quảng Nam... Với
          tỉnh xa, áp dụng phương án <strong>gia công tại xưởng Đà Nẵng</strong>{" "}
          và lắp đặt tại công trình để tối ưu chi phí.
        </p>
        <div className="karaoke-cta-row">
          <a
            href={`tel:${HOTLINE}`}
            className="karaoke-btn karaoke-btn-primary"
          >
            Nhận tư vấn miễn phí
          </a>

          <a href="#faq" className="karaoke-btn karaoke-btn-outline">
            Câu hỏi thường gặp
          </a>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="karaoke-container karaoke-faq">
        <h2>Câu hỏi thường gặp</h2>
        <Details title="Báo giá có bao gồm cách âm, điện & ánh sáng không?">
          Có. Gói trọn gói đã bao gồm cách âm, điện – chiếu sáng cơ bản và trang
          trí theo concept đã duyệt.
        </Details>
        <Details title="Có hỗ trợ xin phép cải tạo mặt bằng tại Đà Nẵng không?">
          Chúng tôi hỗ trợ hồ sơ & quy trình làm việc với ban quản lý/ địa
          phương (nếu cần).
        </Details>
        <Details title="Nếu thay đổi vật liệu giữa chừng thì sao?">
          Mọi thay đổi sẽ có phiếu xác nhận, cập nhật chi phí minh bạch trước
          khi thi công.
        </Details>
      </section>

      {/* ===== CONTACT BANNER ===== */}
      <section className="karaoke-contact-cta">
        <div className="karaoke-container karaoke-contact-inner">
          <div>
            <h3>Bắt đầu lên concept chỉ trong 24–48h</h3>
            <p className="karaoke-muted">
              Gọi ngay để đặt lịch khảo sát miễn phí tại Đà Nẵng.
            </p>
          </div>
          <a
            href={`tel:${HOTLINE}`}
            className="karaoke-btn karaoke-btn-primary karaoke-btn-lg"
          >
            Gọi: {HOTLINE}
          </a>
        </div>
      </section>
      <section class="karaoke-container karaoke-area">
        <h2>Các công trình tiêu biểu của Nguyễn Hải</h2>
        <figure className="karaoke-image">
          <img
            className="karaoke-img"
            src={room3}
            alt="Phòng karaoke mẫu tại Đà Nẵng"
            loading="lazy"
          />
          <figcaption className="karaoke-image__cap">
            Phòng karaoke mẫu do Nguyễn Hải Thiết Kế
          </figcaption>
        </figure>
        <figure className="karaoke-image">
          <img
            className="karaoke-img"
            src={room4}
            alt="Phòng karaoke mẫu tại Đà Nẵng"
            loading="lazy"
          />
          <figcaption className="karaoke-image__cap">
            Phòng karaoke mẫu do Nguyễn Hải Thiết Kế
          </figcaption>
        </figure>
        <figure className="karaoke-image">
          <img
            className="karaoke-img"
            src={room5}
            alt="Phòng karaoke mẫu tại Đà Nẵng"
            loading="lazy"
          />
          <figcaption className="karaoke-image__cap">
            Phòng karaoke mẫu do Nguyễn Hải Thiết Kế
          </figcaption>
        </figure>
      </section>
    </main>
  );
}

/* ---------- Subcomponents ---------- */
function Feature({ title, children }) {
  return (
    <div className="karaoke-feature">
      <div className="karaoke-feature-dot" />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="karaoke-step">
      <div className="karaoke-badge">{n}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Details({ title, children }) {
  return (
    <details className="karaoke-details">
      <summary>{title}</summary>
      <div className="karaoke-details-body">{children}</div>
    </details>
  );
}

function PriceCard({ title, price, children, ribbon, featured }) {
  return (
    <article className={`karaoke-price-card ${featured ? "is-featured" : ""}`}>
      {ribbon && <div className="karaoke-ribbon">{ribbon}</div>}
      <h3>{title}</h3>
      <div className="karaoke-price">{price}</div>
      <p>{children}</p>
    </article>
  );
}
