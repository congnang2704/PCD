// src/components/Users/services/Building_Permit/BuildingPermitService.js
import React, { useEffect, useState, useRef } from "react";
import "./building-permit-service.css";

const BRAND = {
  primary: "#0a6ad6",
  primaryDeep: "#064eac",
  accent: "#d4b263",
  hotline: "0978 999 043",
  hotlineRaw: "0978999043",
  address: "17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng",
};

const faqItems = [
  {
    q: "Xin giấy phép xây dựng mất bao lâu?",
    a: "Thông thường từ 15–30 ngày làm việc kể từ khi nộp đủ hồ sơ hợp lệ. Với những hồ sơ phức tạp hoặc cần giải trình thêm, thời gian có thể kéo dài hơn. Nguyễn Hải sẽ theo dõi sát và cập nhật tiến độ cho anh/chị.",
  },
  {
    q: "Phí xin giấy phép xây dựng khoảng bao nhiêu?",
    a: "Chi phí phụ thuộc vào quy mô công trình, khu vực, mức độ phức tạp hồ sơ và việc có cần xử lý thêm các vấn đề như quy hoạch, chỉ giới, nhà liền kề hay không. Anh/chị có thể gọi 0905 402 989 để được báo phí chi tiết theo trường hợp cụ thể.",
  },
  {
    q: "Đã lỡ xây rồi mới nhớ ra chưa xin phép thì phải làm sao?",
    a: "Trong một số trường hợp vẫn có thể hoàn thiện hồ sơ và xin phép bổ sung/hoàn công. Tuy nhiên cần xem kỹ hiện trạng và hồ sơ đất. Anh/chị nên liên hệ sớm để được tư vấn hướng xử lý phù hợp, tránh bị phạt hoặc buộc tháo dỡ.",
  },
  {
    q: "Sửa nhà nhỏ, làm nội thất bên trong có cần xin phép không?",
    a: "Nếu chỉ sửa chữa bên trong, không thay đổi kết cấu chịu lực, không làm thay đổi mặt đứng công trình và không ảnh hưởng đến môi trường, an toàn công trình lân cận thì thường không cần xin phép. Nếu có đục tường, đổ sàn, làm thêm tum, thay đổi mặt tiền… thì nên kiểm tra kỹ.",
  },
  {
    q: "Tôi ở tỉnh khác nhưng xây nhà tại Đà Nẵng có dùng dịch vụ được không?",
    a: "Hoàn toàn được. Anh/chị có thể gửi hồ sơ đất, nhu cầu công trình qua Zalo/Email. Đội ngũ Nguyễn Hải sẽ thay mặt anh/chị làm việc với cơ quan quản lý tại Đà Nẵng và cập nhật tiến độ thường xuyên.",
  },
];

export default function BuildingPermitService() {
  const [activeFaq, setActiveFaq] = useState(0);

  // GÓI DỊCH VỤ – SLIDER
  const [activePackage, setActivePackage] = useState(1); // mặc định gói 2
  const packagesRef = useRef(null);
  const TOTAL_PACKAGES = 3;

  const scrollToPackage = (index, behavior = "smooth") => {
    setActivePackage(index);
    const container = packagesRef.current;
    if (!container) return;

    const card = container.children[index];
    if (!card) return;

    // Tính toán vị trí cần scroll ngang để card nằm giữa
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const currentScrollLeft = container.scrollLeft;

    const offset =
      cardRect.left -
      containerRect.left -
      (containerRect.width - cardRect.width) / 2;

    container.scrollTo({
      left: currentScrollLeft + offset,
      behavior,
    });
  };

  const handlePrevPackage = () => {
    const nextIndex = (activePackage - 1 + TOTAL_PACKAGES) % TOTAL_PACKAGES;
    scrollToPackage(nextIndex);
  };

  const handleNextPackage = () => {
    const nextIndex = (activePackage + 1) % TOTAL_PACKAGES;
    scrollToPackage(nextIndex);
  };

  // Lúc load mobile lần đầu thì đưa thẳng gói 2 vào giữa
  useEffect(() => {
    scrollToPackage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title =
      "Dịch vụ xin giấy phép xây dựng tại Đà Nẵng | Nguyễn Hải Design & Build";
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="permit-page">
      {/* HERO */}
      <section className="permit-hero">
        <div className="container permit-hero-inner">
          <div className="permit-hero-text">
            <span className="permit-hero-tag">
              Dịch vụ xin giấy phép xây dựng · Đà Nẵng
            </span>
            <h1>Dịch vụ xin giấy phép xây dựng tại Đà Nẵng</h1>
            <p className="permit-hero-slogan">
              Nhanh, đúng quy hoạch – giúp anh/chị yên tâm trước khi khởi công
            </p>
            <p className="permit-hero-desc">
              Nguyễn Hải Design &amp; Build hỗ trợ trọn gói thủ tục xin giấy
              phép xây dựng nhà phố, biệt thự, cải tạo – nâng tầng tại Đà Nẵng.
              Kiểm tra nhanh quy hoạch, chiều cao, mật độ xây dựng và chuẩn bị
              hồ sơ đúng quy định.
            </p>

            <ul className="permit-hero-benefits">
              <li>Kiểm tra khu đất xây được mấy tầng, mật độ bao nhiêu.</li>
              <li>
                Hồ sơ đúng quy hoạch từng quận/huyện, hạn chế tối đa bị trả lại.
              </li>
              <li>
                Có thể kết hợp thiết kế &amp; thi công trọn gói nếu anh/chị cần.
              </li>
            </ul>

            <div className="permit-hero-actions">
              <a
                href={`tel:${BRAND.hotlineRaw}`}
                className="permit-btn-primary"
              >
                Gọi ngay {BRAND.hotline}
              </a>
              <button
                className="permit-btn-ghost"
                onClick={() => scrollToId("permit-process")}
              >
                Xem quy trình thực hiện
              </button>
            </div>

            <p className="permit-hero-hotline-note">
              Hoặc nhắn Zalo <strong>{BRAND.hotline}</strong>, gửi ảnh sổ đỏ để
              chúng tôi kiểm tra giúp anh/chị.
            </p>
          </div>

          <div className="permit-hero-side">
            <div className="permit-hero-card">
              <p className="permit-hero-card-title">
                Không chắc nhà mình có cần xin phép?
              </p>
              <p className="permit-hero-card-desc">
                Gọi trực tiếp <strong>{BRAND.hotline}</strong>, kiến trúc sư
                Nguyễn Hải sẽ giải thích rõ trong 5–10 phút, hoàn toàn miễn phí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK: CÓ CẦN XIN PHÉP KHÔNG */}
      <section className="section" id="permit-need-check">
        <div className="container">
          <h2 className="section-title-per">
            Nhà anh/chị có cần xin giấy phép xây dựng không?
          </h2>
          <p className="section-intro-per">
            Một vài trường hợp thường gặp để anh/chị tự kiểm tra nhanh. Nếu vẫn
            chưa chắc, cứ gọi trực tiếp cho chúng tôi.
          </p>

          <div className="permit-check-grid">
            <div className="permit-check-card">
              <h3>Thường phải xin phép</h3>
              <ul>
                <li>Xây mới nhà ở trong khu đô thị tại Đà Nẵng.</li>
                <li>
                  Nâng tầng, làm thêm tum, thay đổi kết cấu chịu lực (đổ sàn,
                  đập tường…).
                </li>
                <li>
                  Cải tạo làm thay đổi mặt đứng công trình nhìn ra đường chính.
                </li>
                <li>
                  Công trình có quy mô lớn, nằm trong khu quy hoạch/khu đô thị
                  mới.
                </li>
              </ul>
            </div>

            <div className="permit-check-card">
              <h3>Có thể không cần xin phép</h3>
              <ul>
                <li>
                  Sửa chữa nhỏ bên trong không ảnh hưởng kết cấu, không thay đổi
                  mặt tiền.
                </li>
                <li>Cải tạo nội thất, sơn sửa, thay gạch, thay thiết bị.</li>
                <li>
                  Một số nhà ở dưới 7 tầng trong khu nông thôn chưa có quy hoạch
                  chi tiết.
                </li>
              </ul>
            </div>
          </div>

          <p className="permit-note">
            <strong>
              Nếu anh/chị tick trên 2 mục trong cột “Thường phải xin phép”
            </strong>
            , khả năng rất cao là bắt buộc phải xin giấy phép trước khi xây. Hãy
            gọi <a href={`tel:${BRAND.hotlineRaw}`}>{BRAND.hotline}</a> để được
            kiểm tra chính xác theo từng trường hợp.
          </p>
        </div>
      </section>

      {/* ĐIỀU KIỆN CẤP PHÉP */}
      <section className="section section-soft" id="permit-conditions">
        <div className="container">
          <h2 className="section-title-per">
            Điều kiện cơ bản để được cấp giấy phép xây dựng
          </h2>
          <p className="section-intro-per">
            Dưới đây là những nguyên tắc quan trọng mà hồ sơ xin phép cần đáp
            ứng. Nguyễn Hải sẽ giúp anh/chị kiểm tra từng mục dựa trên khu đất
            và nhu cầu thực tế.
          </p>

          <div className="permit-conditions-grid">
            <div className="permit-condition-card">
              <h3>Phù hợp quy hoạch</h3>
              <p>
                Công trình phải nằm trong khu vực được phép xây dựng, tuân thủ
                chỉ giới, lộ giới, mật độ xây dựng và chiều cao theo quy hoạch
                từng quận/huyện tại Đà Nẵng.
              </p>
            </div>

            <div className="permit-condition-card">
              <h3>Có thiết kế xây dựng</h3>
              <p>
                Bản vẽ phải thể hiện rõ mặt bằng, mặt đứng, mặt cắt, móng và đấu
                nối hạ tầng kỹ thuật (điện, nước, thoát nước…) theo đúng quy
                định.
              </p>
            </div>

            <div className="permit-condition-card">
              <h3>Đảm bảo an toàn &amp; môi trường</h3>
              <p>
                Công trình không được gây nguy hiểm cho nhà lân cận, đảm bảo an
                toàn kết cấu, phòng cháy chữa cháy và các yêu cầu về bảo vệ môi
                trường.
              </p>
            </div>

            <div className="permit-condition-card">
              <h3>Hồ sơ đầy đủ, hợp lệ</h3>
              <p>
                Bộ hồ sơ phải được lập đúng mẫu, đủ chữ ký, đóng dấu của đơn vị
                thiết kế có chức năng và kiến trúc sư có chứng chỉ hành nghề.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HỒ SƠ CẦN CHUẨN BỊ */}
      <section className="section" id="permit-documents">
        <div className="container">
          <h2 className="section-title-per">
            Hồ sơ xin giấy phép xây dựng gồm gì?
          </h2>
          <p className="section-intro-per">
            Anh/chị không cần ghi nhớ hết, chỉ cần chuẩn bị trước một số giấy tờ
            cơ bản. Các phần còn lại Nguyễn Hải sẽ hỗ trợ hoàn thiện.
          </p>

          <div className="permit-doc-grid">
            <div className="permit-doc-card">
              <h3>Nhà ở riêng lẻ, nhà phố, biệt thự</h3>
              <ul>
                <li>Giấy chứng nhận quyền sử dụng đất (Sổ đỏ).</li>
                <li>
                  Bản vẽ thiết kế xin phép: mặt bằng, mặt đứng, mặt cắt, mặt
                  bằng móng…
                </li>
                <li>
                  Ảnh hiện trạng khu đất, nhà cũ (nếu cải tạo hoặc nâng tầng).
                </li>
                <li>
                  Cam kết đảm bảo an toàn cho nhà liền kề (trường hợp đào móng
                  sâu, xây sát ranh).
                </li>
              </ul>
            </div>

            <div className="permit-doc-card">
              <h3>Công trình quy mô lớn / đặc thù</h3>
              <ul>
                <li>Giấy chứng nhận quyền sử dụng đất, hồ sơ pháp lý dự án.</li>
                <li>
                  Bản vẽ thiết kế cơ sở, báo cáo kinh tế – kỹ thuật hoặc báo cáo
                  nghiên cứu khả thi (tùy loại công trình).
                </li>
                <li>
                  Hồ sơ môi trường, PCCC và các văn bản chấp thuận liên quan
                  (nếu có).
                </li>
              </ul>
            </div>
          </div>

          <p className="permit-note">
            Anh/chị chỉ cần chuẩn bị <strong>Sổ đỏ + nhu cầu xây dựng</strong>,
            các phần kỹ thuật và hồ sơ còn lại đội ngũ Nguyễn Hải sẽ lo trọn
            gói. Gọi ngay{" "}
            <a href={`tel:${BRAND.hotlineRaw}`}>{BRAND.hotline}</a> để được
            check hồ sơ miễn phí.
          </p>
        </div>
      </section>

      {/* LỖI THƯỜNG GẶP */}
      <section className="section section-soft" id="permit-errors">
        <div className="container">
          <h2 className="section-title-per">
            Những lỗi thường gặp khiến hồ sơ bị trả lại
          </h2>
          <p className="section-intro-per">
            Rất nhiều hồ sơ treo 1–2 tháng chỉ vì vài chi tiết nhỏ. Nguyễn Hải
            luôn kiểm tra trước để hạn chế tối đa việc phải bổ sung, chỉnh sửa
            nhiều lần.
          </p>

          <div className="permit-errors-grid">
            <div className="permit-error-card">
              <h3>Bản vẽ chưa khớp quy hoạch</h3>
              <p>
                Chỉ giới xây dựng, lộ giới, khoảng lùi, chiều cao xin vượt quá
                quy định của khu vực hoặc không phù hợp quy hoạch chi tiết.
              </p>
            </div>
            <div className="permit-error-card">
              <h3>Thông tin đất không thống nhất</h3>
              <p>
                Diện tích, kích thước thửa đất trên sổ đỏ khác với thực tế,
                nhưng chưa được xử lý và giải trình rõ trong hồ sơ.
              </p>
            </div>
            <div className="permit-error-card">
              <h3>Thiếu hồ sơ nhà liền kề</h3>
              <p>
                Không có bản cam kết bảo đảm an toàn hoặc biện pháp thi công khi
                đào móng sâu, xây sát tường chung với nhà bên cạnh.
              </p>
            </div>
            <div className="permit-error-card">
              <h3>Không cập nhật quy định mới</h3>
              <p>
                Sử dụng mẫu đơn, tiêu chuẩn cũ; không cập nhật các nghị định,
                quy định mới của địa phương nên hồ sơ dễ bị yêu cầu chỉnh sửa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section className="section" id="permit-process">
        <div className="container">
          <h2 className="section-title-per">
            Quy trình xin giấy phép xây dựng tại Nguyễn Hải
          </h2>
          <p className="section-intro-per">
            Quy trình rõ ràng, anh/chị chỉ cần làm 2 việc: cung cấp giấy tờ và
            duyệt phương án – mọi bước còn lại chúng tôi sẽ thực hiện.
          </p>

          <div className="permit-process-grid">
            {[
              "Gọi hotline 0905 402 989 – mô tả nhu cầu, gửi thông tin khu đất.",
              "Kiểm tra quy hoạch, chỉ giới, mật độ, chiều cao cho phép tại khu vực.",
              "Lên phương án mặt bằng, mặt đứng phù hợp nhu cầu và đúng quy định.",
              "Hoàn thiện bộ hồ sơ thiết kế xin phép và các giấy tờ pháp lý liên quan.",
              "Thay mặt anh/chị nộp hồ sơ, theo dõi, giải trình khi cơ quan yêu cầu.",
              "Nhận giấy phép xây dựng, tư vấn bước tiếp theo: thiết kế chi tiết và thi công.",
            ].map((text, idx) => (
              <div className="permit-process-step" key={idx}>
                <div className="permit-step-number">{idx + 1}</div>
                <p className="permit-step-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SO SÁNH TỰ LÀM VS THUÊ */}
      <section className="section section-soft" id="permit-compare">
        <div className="container">
          <h2 className="section-title-per">
            Tự đi xin giấy phép hay thuê Nguyễn Hải?
          </h2>
          <p className="section-intro-per">
            Anh/chị có thể tự làm, nhưng việc có người am hiểu quy hoạch &amp;
            thủ tục đồng hành sẽ giúp tiết kiệm rất nhiều thời gian và chi phí.
          </p>

          <div className="permit-compare-table">
            <div className="permit-compare-header">
              <div>Tiêu chí</div>
              <div>Tự đi xin</div>
              <div>Nhờ chúng tôi</div>
            </div>

            <div className="permit-compare-row">
              <div>Thời gian đi lại, bổ sung hồ sơ</div>
              <div>Nhiều lần, dễ thiếu sót</div>
              <div>Đã có kinh nghiệm, hạn chế đi lại cho chủ nhà</div>
            </div>
            <div className="permit-compare-row">
              <div>Nguy cơ hồ sơ bị trả lại</div>
              <div>Khá cao nếu không rõ quy định</div>
              <div>
                Kiểm tra trước, điều chỉnh phương án cho phù hợp ngay từ đầu
              </div>
            </div>
            <div className="permit-compare-row">
              <div>Tận dụng số tầng &amp; diện tích được phép xây</div>
              <div>Thường xin “an toàn”, chưa tối ưu</div>
              <div>
                Tối đa hóa quyền lợi trong khung quy hoạch cho phép của khu vực
              </div>
            </div>
            <div className="permit-compare-row">
              <div>Liên kết với thiết kế &amp; thi công</div>
              <div>Tách rời, khó kiểm soát tổng thể</div>
              <div>
                Đồng bộ: xin phép – thiết kế chi tiết – thi công – hoàn công
              </div>
            </div>
          </div>

          <p className="permit-note">
            Nếu anh/chị vẫn phân vân có nên tự làm hay thuê dịch vụ, hãy gọi{" "}
            <a href={`tel:${BRAND.hotlineRaw}`}>{BRAND.hotline}</a>. Chúng tôi
            sẽ phân tích rõ ưu – nhược điểm theo trường hợp cụ thể, hoàn toàn
            không ép dùng dịch vụ.
          </p>
        </div>
      </section>

      {/* MINI CASE STUDY */}
      <section className="section" id="permit-cases">
        <div className="container">
          <h2 className="section-title-per">
            Một vài trường hợp thực tế tại Đà Nẵng
          </h2>
          <p className="section-intro-per">
            Mỗi khu vực có một bộ quy định và cách xử lý khác nhau. Dưới đây là
            vài ví dụ đơn giản để anh/chị dễ hình dung.
          </p>

          <div className="permit-cases-grid">
            <div className="permit-case-card">
              <h3>Nhà phố Hòa Xuân nâng tầng</h3>
              <p>
                Khu vực giới hạn chiều cao, chủ nhà muốn nâng thêm 1 tầng + tum
                sân thượng. Đội ngũ Nguyễn Hải kiểm tra quy hoạch, điều chỉnh
                lại chiều cao tầng, mái, khoảng lùi và xin phép phù hợp, vẫn đảm
                bảo đủ không gian sử dụng cho gia đình.
              </p>
            </div>
            <div className="permit-case-card">
              <h3>Biệt thự góc hai mặt tiền tại Nam Việt Á</h3>
              <p>
                Gia chủ muốn tận dụng tối đa diện tích xây dựng nhưng vẫn giữ
                khoảng lùi và không vượt chỉ giới. Chúng tôi bố trí hình khối
                hợp lý, tối ưu công năng, đồng thời đảm bảo hồ sơ xin phép đáp
                ứng đầy đủ quy định khu vực.
              </p>
            </div>
            <div className="permit-case-card">
              <h3>Cải tạo mặt tiền nhà trong phố cũ</h3>
              <p>
                Chủ nhà muốn thay đổi hoàn toàn mặt tiền, mở rộng cửa kính và
                làm ban công mới. Hồ sơ cần xử lý kỹ về kết cấu và an toàn nhà
                liền kề. Nguyễn Hải dựng lại phương án, bổ sung biện pháp thi
                công và hoàn thiện hồ sơ xin phép đúng yêu cầu cơ quan quản lý.
              </p>
            </div>
          </div>

          <p className="permit-note">
            Nếu anh/chị thấy tình huống của mình giống một trong các case trên,
            hãy gọi <a href={`tel:${BRAND.hotlineRaw}`}>{BRAND.hotline}</a> để
            được tư vấn ngay.
          </p>
        </div>
      </section>

      {/* GÓI DỊCH VỤ */}
      <section className="section section-soft" id="permit-packages">
        <div className="container">
          <h2 className="section-title-per">Các gói dịch vụ tại Nguyễn Hải</h2>
          <p className="section-intro-per">
            Linh hoạt theo nhu cầu – từ chỉ xin phép đến trọn gói xin phép,
            thiết kế và thi công.
          </p>

          <div className="permit-packages-slider">
            <button
              type="button"
              className="permit-packages-nav permit-packages-nav-prev"
              onClick={handlePrevPackage}
              aria-label="Gói trước"
            >
              ‹
            </button>

            <div className="permit-packages-grid" ref={packagesRef}>
              {/* Gói 1 – Cơ bản nhưng có giá trị thực tế */}
              <div
                className={
                  "permit-package-card" +
                  (activePackage === 0 ? " permit-package-card-active" : "")
                }
                onClick={() => scrollToPackage(0)}
              >
                <h3>Gói 1 – Xin phép + Kiểm tra quy hoạch & pháp lý</h3>
                <p>
                  Phù hợp với anh/chị lần đầu xây nhà, cần được kiểm tra quy
                  hoạch, mật độ, tầng cao và tư vấn pháp lý trước khi tiến hành
                  thiết kế – xin phép.
                </p>
                <ul>
                  <li>
                    Kiểm tra quy hoạch, chỉ giới xây dựng, lộ giới khu đất.
                  </li>
                  <li>
                    Đánh giá khả năng xây dựng theo luật và quy định tại Đà
                    Nẵng.
                  </li>
                  <li>
                    Lập hồ sơ xin phép xây dựng và theo dõi đến khi có kết quả.
                  </li>
                </ul>
                <a
                  href={`tel:${BRAND.hotlineRaw}`}
                  className="permit-cta-btn permit-cta-phone"
                >
                  Gọi tư vấn gói 1: {BRAND.hotline}
                </a>
              </div>

              {/* Gói 2 – Gói nổi bật */}
              <div
                className={
                  "permit-package-card permit-package-highlight" +
                  (activePackage === 1 ? " permit-package-card-active" : "")
                }
                onClick={() => scrollToPackage(1)}
              >
                <div className="permit-package-label">Được chọn nhiều</div>
                <h3>Gói 2 – Thiết kế cơ bản + Hồ sơ xin phép xây dựng</h3>
                <p>
                  Dành cho anh/chị muốn có phương án mặt bằng – mặt đứng tối ưu
                  công năng và đúng quy hoạch trước khi xin phép xây dựng.
                </p>
                <ul>
                  <li>Khảo sát hiện trạng & tư vấn phương án thiết kế.</li>
                  <li>
                    Lập bản vẽ thiết kế cơ bản: mặt bằng, mặt đứng, mặt cắt đúng
                    quy định.
                  </li>
                  <li>
                    Hoàn thiện hồ sơ xin phép và theo dõi đến khi ra giấy phép.
                  </li>
                </ul>
                <a
                  href={`tel:${BRAND.hotlineRaw}`}
                  className="permit-cta-btn permit-cta-phone"
                >
                  Gọi tư vấn gói 2: {BRAND.hotline}
                </a>
              </div>

              {/* Gói 3 – Premium */}
              <div
                className={
                  "permit-package-card" +
                  (activePackage === 2 ? " permit-package-card-active" : "")
                }
                onClick={() => scrollToPackage(2)}
              >
                <h3>
                  Gói 3 – Thiết kế chi tiết + Thi công trọn gói + Hoàn công
                </h3>
                <p>
                  Gói Premium “Chìa khóa trao tay”: bao gồm toàn bộ quy trình
                  xin phép – thiết kế – thi công – hoàn công, đảm bảo đồng bộ
                  chất lượng và chi phí.
                </p>
                <ul>
                  <li>
                    Thiết kế kiến trúc – nội thất chi tiết đầy đủ hồ sơ kỹ
                    thuật.
                  </li>
                  <li>
                    Thi công trọn gói, báo cáo tiến độ minh bạch từng giai đoạn.
                  </li>
                  <li>
                    Hỗ trợ hồ sơ hoàn công và hoàn thiện pháp lý sau bàn giao.
                  </li>
                </ul>
                <a
                  href={`tel:${BRAND.hotlineRaw}`}
                  className="permit-cta-btn permit-cta-phone"
                >
                  Gọi tư vấn gói 3: {BRAND.hotline}
                </a>
              </div>
            </div>

            <button
              type="button"
              className="permit-packages-nav permit-packages-nav-next"
              onClick={handleNextPackage}
              aria-label="Gói tiếp"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="permit-faq">
        <div className="container">
          <h2 className="section-title-per">Câu hỏi thường gặp</h2>
          <p className="section-intro-per">
            Nếu anh/chị vẫn còn băn khoăn, hãy tham khảo thêm một số câu hỏi
            sau. Hoặc đơn giản hơn là gọi hotline để được tư vấn nhanh.
          </p>

          <div className="permit-faq-list">
            {faqItems.map((item, idx) => {
              const open = idx === activeFaq;
              return (
                <div
                  key={idx}
                  className={
                    "permit-faq-item" + (open ? " permit-faq-item-active" : "")
                  }
                >
                  <button
                    className="permit-faq-question"
                    onClick={() =>
                      setActiveFaq((prev) => (prev === idx ? -1 : idx))
                    }
                  >
                    <span>{item.q}</span>
                    <span className="permit-faq-toggle">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && <div className="permit-faq-answer">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA CUỐI TRANG */}
      <section className="permit-cta-final">
        <div className="container permit-cta-final-inner">
          <div className="permit-cta-final-left">
            <p className="permit-cta-final-sub">
              CẦN XIN GIẤY PHÉP XÂY DỰNG TẠI ĐÀ NẴNG?
            </p>

            <h2 className="permit-cta-final-title">
              Đừng để sai sót giấy phép làm chậm tiến độ.
            </h2>

            <p className="permit-cta-final-desc">
              Chỉ một cuộc gọi có thể giúp anh/chị tránh rủi ro pháp lý, bị yêu
              cầu bổ sung hồ sơ hoặc phải chỉnh sửa bản vẽ. Nguyễn Hải hỗ trợ
              kiểm tra quy hoạch – tư vấn phương án xây dựng – và đồng hành A→Z
              từ xin phép, thiết kế đến thi công trọn gói.
            </p>
          </div>

          <div className="permit-cta-final-right">
            <a
              href={`tel:${BRAND.hotlineRaw}`}
              className="permit-cta-btn permit-cta-phone-big"
            >
              Gọi ngay {BRAND.hotline}
            </a>
            <p className="permit-cta-final-note">
              Hoặc nhắn Zalo {BRAND.hotline} – gửi ảnh sổ đỏ, <br />
              Chúng tôi kiểm tra quy hoạch & tư vấn hoàn toàn miễn phí.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
