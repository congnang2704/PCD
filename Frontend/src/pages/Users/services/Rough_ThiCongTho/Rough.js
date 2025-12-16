import React, { useEffect, useRef } from "react";
import "./Rough.css";
import ContactForm from "../../view/Mail/ContactFormMail";

// ảnh
import thicongtho from "../../../../assets/anh (1).jpg";
import cttb1House from "../../../../assets/anh (7).jpg";
import cttb2House from "../../../../assets/anh (2).jpg";
import cttb3House from "../../../../assets/anh (6).jpg";
import cttb4House from "../../../../assets/nhahoaxuan1.jpg";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

const Rough = () => {
  // === Scroll-reveal (không dùng lib) ===
  const rootRef = useRef(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const root = rootRef.current || document;
    const items = root.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <div className="rough-container" ref={rootRef}>
      {/* ===== HERO ===== */}
      <section className="rough-hero" data-reveal>
        <div className="rough-hero-grid">
          {/* Left */}
          <div className="rough-hero-left">
            <p className="rough-hero-eyebrow">DỊCH VỤ THI CÔNG PHẦN THÔ</p>
            <h1 className="rough-hero-title">
              Thi công phần thô nhà phố & biệt thự chuẩn kỹ thuật,
              <span className="highlight-brand">
                {" "}
                bền vững – đúng tiến độ – minh bạch chi phí
              </span>
            </h1>
            <p className="rough-hero-sub">
              PCD <strong>Nguyễn Hải</strong> đồng hành cùng anh/chị từ móng,
              cột, dầm, sàn, tường… đến khi hoàn tất bộ khung vững chắc cho ngôi
              nhà. Kỹ sư giám sát trực tiếp, báo cáo tiến độ và hình ảnh công
              trình rõ ràng từng giai đoạn.
            </p>

            <div className="rough-hero-actions">
              <a
                href="tel:0978999043"
                className="rough-hero-btn rough-hero-btn-main"
              >
                Gọi ngay 0978 999 043
              </a>
              <a
                href="#contact"
                className="rough-hero-btn rough-hero-btn-ghost"
              >
                Nhận báo giá chi tiết
              </a>
            </div>
            <p className="rough-hero-note">
              Tư vấn miễn phí • Khảo sát tận nơi tại Đà Nẵng và khu vực lân cận
            </p>
          </div>

          {/* Right stats */}
          <div className="rough-hero-right">
            <div className="rough-hero-stat-card">
              <div className="rough-hero-stat-number">10+</div>
              <div className="rough-hero-stat-label">
                năm kinh nghiệm thực tế
              </div>
            </div>
            <div className="rough-hero-stat-card">
              <div className="rough-hero-stat-number">400+</div>
              <div className="rough-hero-stat-label">
                công trình phần thô đã thi công
              </div>
            </div>
            <div className="rough-hero-stat-card rough-hero-stat-card-hot">
              <div className="rough-hero-stat-number">100%</div>
              <div className="rough-hero-stat-label">
                nghiệm thu kết cấu đạt yêu cầu kỹ thuật
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTRO: THI CÔNG PHẦN THÔ LÀ GÌ? ===== */}
      <section className="rough-card glass" data-reveal id="intro">
        <h2 className="rough-section-title">
          Thi công phần thô là gì? Vì sao quan trọng?
        </h2>

        <p className="rough-text">
          Xây nhà phần thô là giai đoạn đầu tiên và đóng vai trò cực kỳ quan
          trọng trong việc dựng hình ngôi nhà: móng, cột, dầm, sàn, tường, cầu
          thang, mái… Đây là “bộ khung xương” quyết định độ bền vững của công
          trình. Trong giai đoạn này, nhà vẫn còn tường xám bê tông, chưa hoàn
          thiện thẩm mỹ.
        </p>

        <p className="rough-text">
          Trong nội dung dưới đây,{" "}
          <span className="highlight-brand">Nguyễn Hải</span> gửi đến gia chủ
          tổng quan về <strong>dịch vụ thi công phần thô</strong> và{" "}
          <strong>bảng giá tham khảo</strong>, giúp anh/chị dễ hình dung chi phí
          đầu tư, hạn chế phát sinh và lựa chọn được đơn vị thi công uy tín.
        </p>

        <h2 className="rough-section-title" style={{ marginTop: 10 }}>
          Dịch vụ thi công nhà phần thô của{" "}
          <span className="highlight-brand">Nguyễn Hải</span>
        </h2>

        <p className="rough-text">
          <span className="highlight-brand">Nguyễn Hải</span> cung cấp dịch vụ
          thi công phần thô cho{" "}
          <strong>nhà phố, biệt thự, căn hộ, khách sạn, văn phòng…</strong> tại
          các tỉnh miền Trung (Đà Nẵng, Huế, Quảng Trị, Quảng Bình, Hà Tĩnh, TP.
          Vinh, Thanh Hóa, Quảng Nam, Quảng Ngãi) và một số khu vực miền Nam
          (TP. HCM).
        </p>

        <p className="rough-text">
          Với nhiều năm hoạt động,{" "}
          <span className="highlight-brand">Nguyễn Hải</span> đã thực hiện hơn{" "}
          <strong>400 công trình thi công phần thô</strong> và hoàn thành bàn
          giao cho khách hàng. Chúng tôi áp dụng các giải pháp & kỹ thuật mới
          nhất theo tiêu chuẩn, tối ưu từ vật liệu đến phương án thi công, cùng
          đội ngũ kỹ sư – đội thợ lành nghề, chuyên nghiệp và tận tâm.
        </p>
      </section>

      {/* ===== BẢNG GIÁ THAM KHẢO ===== */}
      <section
        className="rough-card rough-pricing glass"
        data-reveal
        id="pricing"
      >
        <h2 className="rough-section-title">
          Bảng giá thi công nhà phần thô – tham khảo
        </h2>
        <p className="rough-text">
          Đơn giá phần thô sẽ phụ thuộc vào diện tích, địa chất, vị trí lô đất
          và tiêu chuẩn vật tư. Dưới đây là mức giá{" "}
          <strong>ước tính tham khảo</strong> cho nhà phố & biệt thự phổ biến
          hiện nay:
        </p>

        <div className="rough-pricing-grid">
          <article className="rough-price-card">
            <div className="rough-price-label">GÓI PHỔ THÔNG</div>
            <h3 className="rough-price-title">Nhà phố 1–3 tầng</h3>
            <p className="rough-price-range">Từ ~3,2 – 3,5 triệu/m²</p>
            <ul className="rough-price-list">
              <li>
                Thi công phần móng, cột, dầm, sàn, tường bao – tường ngăn.
              </li>
              <li>
                Bê tông thương phẩm, cốt thép đúng chủng loại theo thiết kế.
              </li>
              <li>Nhân công lắp dựng coppha, cốt thép, đổ bê tông & xây tô.</li>
              <li>Phù hợp nhà phố tiêu chuẩn, mặt bằng thuận tiện thi công.</li>
            </ul>
          </article>

          <article className="rough-price-card rough-price-card-hot">
            <div className="rough-price-label">GÓI ĐƯỢC CHỌN NHIỀU</div>
            <h3 className="rough-price-title">Nhà phố 3–5 tầng</h3>
            <p className="rough-price-range">Từ ~3,6 – 4,0 triệu/m²</p>
            <ul className="rough-price-list">
              <li>Tăng cường vật tư, giải pháp kết cấu cho nhà cao tầng.</li>
              <li>Thi công cầu thang, sê nô, chống thấm khu vực ướt.</li>
              <li>
                Kỹ sư giám sát riêng, cập nhật nhật ký & hình ảnh công trình.
              </li>
              <li>Phù hợp nhà phố mặt tiền, nhà lô phố trong hẻm.</li>
            </ul>
          </article>

          <article className="rough-price-card">
            <div className="rough-price-label">GÓI CAO CẤP</div>
            <h3 className="rough-price-title">Biệt thự, nhà có tầng hầm</h3>
            <p className="rough-price-range">Từ ~4,2 triệu/m² trở lên</p>
            <ul className="rough-price-list">
              <li>Giải pháp móng, tường vây, tầng hầm theo đúng tiêu chuẩn.</li>
              <li>
                Phối hợp chặt chẽ với đơn vị thiết kế kết cấu & kiến trúc.
              </li>
              <li>
                Áp dụng biện pháp thi công, chống thấm & an toàn nghiêm ngặt.
              </li>
              <li>Phù hợp biệt thự, nhà đất lớn, yêu cầu kỹ thuật cao.</li>
            </ul>
          </article>
        </div>

        <p className="rough-price-note">
          <strong>Lưu ý:</strong> Đơn giá trên chỉ mang tính chất tham khảo.{" "}
          <span className="highlight-brand">Nguyễn Hải</span> sẽ{" "}
          <strong>khảo sát thực tế, xem hồ sơ thiết kế</strong> và gửi{" "}
          <strong>bảng báo giá chi tiết – chính xác cho từng công trình</strong>
          .
        </p>
      </section>

      {/* ===== LỢI ÍCH KHI THI CÔNG PHẦN THÔ TẠI NGUYỄN HẢI ===== */}
      <section
        className="rough-card rough-benefits glass"
        data-reveal
        id="benefits"
      >
        <h2 className="rough-section-title">
          Vì sao nên chọn Nguyễn Hải thi công phần thô?
        </h2>
        <div className="rough-benefit-grid">
          <article className="rough-benefit-card">
            <h3>Đội thi công tay nghề cao</h3>
            <p>
              Đội thợ riêng, gắn bó lâu năm, đã thi công hàng trăm nhà phố &amp;
              biệt thự tại Đà Nẵng và các tỉnh miền Trung. Kỹ thuật ổn định,
              thao tác chuẩn, hạn chế tối đa lỗi hiện trường.
            </p>
          </article>

          <article className="rough-benefit-card">
            <h3>Kỹ sư giám sát trực tiếp</h3>
            <p>
              Mỗi công trình đều có kỹ sư phụ trách, kiểm soát chất lượng kết
              cấu, tiến độ và an toàn lao động. Có nhật ký thi công, hình ảnh
              báo cáo theo từng giai đoạn.
            </p>
          </article>

          <article className="rough-benefit-card">
            <h3>Minh bạch vật tư – không phát sinh mập mờ</h3>
            <p>
              Vật tư phần thô được liệt kê rõ trong hợp đồng và bảng thống kê.
              Thi công đúng chủng loại, đúng khối lượng, không tự ý thay đổi làm
              ảnh hưởng chất lượng nhà.
            </p>
          </article>

          <article className="rough-benefit-card">
            <h3>Cam kết tiến độ &amp; bảo hành phần thô</h3>
            <p>
              Có timeline thi công rõ ràng, quy định mốc nghiệm thu từng hạng
              mục. Sau khi bàn giao,{" "}
              <span className="highlight-brand">Nguyễn Hải</span> tiếp tục đồng
              hành, hỗ trợ xử lý các vấn đề kỹ thuật phần thô theo chính sách
              bảo hành.
            </p>
          </article>
        </div>
      </section>

      {/* ===== HERO IMAGE ===== */}
      <figure className="rough-media" data-reveal>
        <div className="rough-media-frame">
          <img
            src={thicongtho}
            alt="Hình ảnh công trình thi công thô do Nguyễn Hải xây dựng"
            className="rough-media-img"
            loading="lazy"
            decoding="async"
          />
          <div className="rough-media-glow" aria-hidden />
        </div>
        <figcaption className="rough-media-cap">
          <em>Hình ảnh công trình thi công phần thô do Nguyễn Hải thực hiện</em>
        </figcaption>
      </figure>

      {/* ===== COMMITMENT ===== */}
      <section className="rough-card gradient-border" data-reveal>
        <p className="rough-text">
          <span className="highlight-brand">Nguyễn Hải</span> đảm bảo sự bền
          vững và ổn định cao cho từng công trình: kiểm soát chặt chẽ chất lượng
          thi công, tuân thủ tiêu chuẩn kỹ thuật, đáp ứng thời gian và ngân sách
          đã thống nhất. Chúng tôi cam kết{" "}
          <strong>bàn giao đúng tiến độ</strong> và đồng hành cùng gia chủ trong
          suốt vòng đời công trình.
        </p>
      </section>

      {/* ===== QUY TRÌNH THI CÔNG PHẦN THÔ ===== */}
      <section
        className="rough-card rough-process glass"
        data-reveal
        id="process"
      >
        <h2 className="rough-section-title">
          Quy trình thi công phần thô tại Nguyễn Hải
        </h2>
        <ol className="rough-process-list">
          <li className="rough-process-item">
            <span className="rough-step-badge">1</span>
            <div>
              <strong>Khảo sát hiện trạng &amp; tiếp nhận nhu cầu</strong>
              <p>
                Kỹ sư đến trực tiếp công trình để đo đạc, kiểm tra địa chất sơ
                bộ, hiện trạng khu đất, lộ giới, hẻm, khả năng tập kết vật tư…
                Đồng thời lắng nghe mong muốn, quy mô và ngân sách dự kiến của
                gia chủ.
              </p>
            </div>
          </li>
          <li className="rough-process-item">
            <span className="rough-step-badge">2</span>
            <div>
              <strong>Lập phương án thi công &amp; dự toán chi tiết</strong>
              <p>
                Lập bảng khối lượng, vật tư, nhân công, biện pháp kết cấu tương
                ứng với hồ sơ thiết kế. Gửi bảng báo giá chi tiết, thể hiện rõ
                phạm vi công việc &amp; các hạng mục đã bao gồm.
              </p>
            </div>
          </li>
          <li className="rough-process-item">
            <span className="rough-step-badge">3</span>
            <div>
              <strong>Ký hợp đồng &amp; chuẩn bị mặt bằng</strong>
              <p>
                Hai bên thống nhất đơn giá, tiến độ, điều khoản thanh toán và
                bảo hành. Nguyễn Hải triển khai rào chắn, tập kết vật tư, dựng
                lán trại và chuẩn bị nhân sự thi công.
              </p>
            </div>
          </li>
          <li className="rough-process-item">
            <span className="rough-step-badge">4</span>
            <div>
              <strong>Thi công móng – cột – dầm – sàn – tường</strong>
              <p>
                Thi công phần móng, khung kết cấu, tường bao, tường ngăn, cầu
                thang, sê nô, mái bê tông… theo đúng bản vẽ &amp; tiêu chuẩn kỹ
                thuật. Tất cả các giai đoạn quan trọng đều được nghiệm thu và
                ghi nhận nhật ký.
              </p>
            </div>
          </li>
          <li className="rough-process-item">
            <span className="rough-step-badge">5</span>
            <div>
              <strong>Nghiệm thu, bàn giao phần thô &amp; bảo hành</strong>
              <p>
                Tổng kiểm tra, đo đạc đối chiếu với hồ sơ, lập biên bản nghiệm
                thu &amp; bàn giao. Hướng dẫn gia chủ bảo dưỡng bê tông, chống
                thấm và các lưu ý khi thi công hoàn thiện sau này.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* ===== SO SÁNH THỢ LẺ & NGUYỄN HẢI ===== */}
      <section
        className="rough-card rough-compare glass"
        data-reveal
        id="compare"
      >
        <h2 className="rough-section-title">
          So sánh: Thuê thợ lẻ &amp; thi công phần thô tại Nguyễn Hải
        </h2>
        <div className="rough-compare-table-wrapper">
          <table className="rough-compare-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>Thợ tự do</th>
                <th>PCD Nguyễn Hải</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiến độ thi công</td>
                <td>Thường phụ thuộc nhân sự, dễ trễ tiến độ.</td>
                <td>
                  Có kế hoạch &amp; timeline rõ ràng, ràng buộc bằng hợp đồng.
                </td>
              </tr>
              <tr>
                <td>Chất lượng kết cấu</td>
                <td>Dựa vào kinh nghiệm cá nhân, khó kiểm soát.</td>
                <td>
                  Kỹ sư giám sát, thi công đúng bản vẽ &amp; tiêu chuẩn kỹ
                  thuật.
                </td>
              </tr>
              <tr>
                <td>Vật tư phần thô</td>
                <td>Dễ thay đổi chủng loại, khó kiểm chứng.</td>
                <td>
                  Thống kê vật tư rõ ràng trong hợp đồng, nghiệm thu từng đợt.
                </td>
              </tr>
              <tr>
                <td>Phát sinh chi phí</td>
                <td>Dễ phát sinh trong quá trình thi công.</td>
                <td>
                  Dự toán chi tiết từ đầu, phát sinh (nếu có) luôn trao đổi
                  &amp; xác nhận trước.
                </td>
              </tr>
              <tr>
                <td>Bảo hành – hỗ trợ</td>
                <td>Không có hoặc phụ thuộc mối quan hệ cá nhân.</td>
                <td>
                  Có chính sách bảo hành phần thô &amp; đội ngũ hỗ trợ kỹ thuật
                  sau bàn giao.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== CÁC YẾU TỐ ẢNH HƯỞNG GIÁ ===== */}
      <section className="rough-card glass" data-reveal id="factors">
        <h2 className="rough-section-title">
          Điều kiện và các yếu tố ảnh hưởng đến giá thi công nhà phần thô
        </h2>
        <p className="rough-text">
          Dưới đây là những yếu tố chính có thể làm thay đổi đơn giá phần thô:
          <br />– Nhà có <strong>từ 06 sàn trở lên</strong> hoặc chiều cao lớn.
          <br />– Công trình có <strong>tầng hầm, thang máy, hồ bơi…</strong>
          <br />– Vị trí nhà trong hẻm/kiệt nhỏ, xe lớn khó tiếp cận, phải trung
          chuyển vật tư.
          <br />– Nhà có <strong>2 mặt tiền trở lên</strong>, nhiều mảng trang
          trí kiến trúc.
          <br />– Phong cách <strong>tân cổ điển / cổ điển</strong> với nhiều
          hoa văn, phù điêu, phào chỉ phức tạp.
          <br />– Diện tích sàn quá nhỏ (<strong>&lt; 40m²</strong>) hoặc hình
          dáng đất đặc biệt (nở hậu, tóp hậu, xéo góc…).
        </p>
      </section>

      {/* ===== HỢP ĐỒNG ===== */}
      <section className="rough-card glass" data-reveal id="contract">
        <h2 className="rough-section-title">Hợp đồng xây dựng nhà phần thô</h2>
        <p className="rough-text">
          Hợp đồng thi công phần thô của{" "}
          <span className="highlight-brand">Nguyễn Hải</span> được xây dựng rõ
          ràng, minh bạch, bao gồm:
          <br />– Nội dung &amp; khối lượng công việc theo từng hạng mục và thời
          gian thi công tương ứng.
          <br />– Giải pháp &amp; kỹ thuật thi công áp dụng cho từng loại công
          trình.
          <br />– Giá hợp đồng, tiến độ thanh toán theo từng giai đoạn cụ thể.
          <br />– Quyền &amp; trách nhiệm, nghĩa vụ của hai bên trong suốt quá
          trình.
          <br />– Quy định về nghiệm thu, bàn giao công trình và bảo hành.
          <br />– Bảng thống kê vật tư phần thô chi tiết cho gia chủ đối chiếu.
        </p>
      </section>

      {/* ===== FAQ ===== */}
      <div data-reveal>
        <FAQComponent />
      </div>

      {/* ===== CONTACT FORM (giữ component của bạn) ===== */}
      <section
        className="rough-card contact-shell"
        data-reveal
        id="contact"
        aria-labelledby="contact-title"
      >
        <h2 className="rough-section-title" id="contact-title">
          Nhận tư vấn &amp; báo giá thi công phần thô
        </h2>
        <p className="rough-text contact-intro">
          Vui lòng để lại thông tin liên hệ, diện tích dự kiến hoặc gửi kèm bản
          vẽ (nếu có). Đội ngũ{" "}
          <span className="highlight-brand">PCD Nguyễn Hải</span> sẽ liên hệ tư
          vấn phương án kết cấu và báo giá chi tiết, phù hợp ngân sách của
          anh/chị.
        </p>
        <ContactForm />
      </section>

      {/* ===== GALLERY ===== */}
      <section className="rough-card rough-gallery" data-reveal id="gallery">
        <h2 className="rough-section-title">
          Một số công trình thi công phần thô tiêu biểu
        </h2>
        <div className="rough-grid">
          {[cttb1House, cttb2House, cttb3House, cttb4House].map((img, i) => (
            <figure className="rough-card gallery-card" key={i}>
              <div className="gallery-media">
                <img
                  src={img}
                  alt={`Công trình thi công phần thô ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="gallery-cap">
                Hình ảnh công trình thi công phần thô do Nguyễn Hải thực hiện
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== CTA CUỐI TRANG ===== */}
      <section className="rough-cta" data-reveal>
        <div className="rough-cta-content">
          <h2>
            Sẵn sàng bắt đầu phần thô cho ngôi nhà mơ ước của anh/chị cùng{" "}
            <span className="highlight-brand">Nguyễn Hải</span>?
          </h2>
          <p>
            Gửi mặt bằng hiện có hoặc chia sẻ nhu cầu, đội ngũ{" "}
            <span className="highlight-brand">PCD Nguyễn Hải</span> sẽ tư vấn
            phương án kết cấu an toàn, tối ưu chi phí và báo giá trọn gói rõ
            ràng – <strong>miễn phí khảo sát tại Đà Nẵng</strong>.
          </p>
          <div className="rough-cta-actions">
            <a
              href="tel:0978999043"
              className="rough-cta-btn rough-cta-btn-main"
            >
              Gọi ngay 0978 999 043
            </a>
            <a href="#contact" className="rough-cta-btn rough-cta-btn-outline">
              Gửi yêu cầu tư vấn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rough;
