import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "../House.css";
import ContactForm from "../../view/Mail/ContactFormMail";

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";
const CATEGORY_NAME = "Nhà 2 tầng";

const HOTLINE = "0905 402 989";
const HOTLINE_RAW = "0905402989";

/* ============ Helpers ============ */
const stripHtml = (html = "") => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
};

/* Chuẩn hoá ảnh đa định dạng/đường dẫn */
const normalizeImg = (p) => {
  let cand =
    p?.cover_image ??
    p?.avatar_blog ??
    p?.thumbnail ??
    p?.image ??
    p?.images ??
    "";
  if (Array.isArray(cand)) cand = cand[0];
  if (cand && typeof cand === "object") {
    cand = cand.url || cand.src || cand.path || cand.href || cand.link || "";
  }
  let u = String(cand || "").trim();
  if (!u) return "https://placehold.co/800x500?text=Nguyen+Hai+Design";
  if (u.startsWith("//")) u = "https:" + u;
  if (u.startsWith("/")) u = "https://api.nguyenhai.com.vn" + u;
  u = u.replace(/^http:\/\//i, "https://");
  return u;
};

const getCateNames = (p) =>
  (p?.categoryIds || []).map((c) => c?.name || c?.title).filter(Boolean);

const buildQuery = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) v.forEach((x) => q.append(k, x));
    else q.append(k, v);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
};

export default function Container_HouseTwo() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    let alive = true;
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setErr("");

      const cacheKey = `house-two:${CATEGORY_NAME}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (alive) {
            setHouses(parsed);
            setLoading(false);
          }
        } catch {}
      }

      try {
        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 400,
          fields:
            "title,slug,thumbnail,cover_image,avatar_blog,description,is_active,status,categoryIds.name,categoryIds.title,published_at,created_at",
        });

        const res = await fetch(API_BLOGS + q, {
          signal: ac.signal,
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.data)
          ? data.data
          : [];

        const filtered = list
          .filter(
            (post) =>
              (post?.status || "").toLowerCase() === "published" &&
              post?.is_active !== false
          )
          .filter((post) => getCateNames(post).includes(CATEGORY_NAME))
          .map((p) => ({
            _id: p._id,
            slug: p.slug,
            title: p.title || "",
            description: p.description || "",
            cover_image: p.cover_image,
            avatar_blog: p.avatar_blog,
            thumbnail: p.thumbnail,
            categoryIds: p.categoryIds || [],
            published_at: p.published_at || p.publishedAt,
            created_at: p.created_at || p.createdAt,
          }))
          .sort(
            (a, b) =>
              new Date(b.published_at || b.created_at || 0) -
              new Date(a.published_at || a.created_at || 0)
          );

        if (alive) {
          setHouses(filtered);
          setCurrentPage(1);
          sessionStorage.setItem(cacheKey, JSON.stringify(filtered));
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Lỗi tải dữ liệu:", e);
          if (!cached && alive) {
            setErr("Không tải được dữ liệu. Vui lòng thử lại sau.");
            setHouses([]);
          }
        }
      } finally {
        if (!cached && alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(houses.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = useMemo(
    () => houses.slice(startIndex, startIndex + itemsPerPage),
    [houses, startIndex, itemsPerPage]
  );

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    const grid = document.querySelector(".house-grid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ===== Price content (đầy đủ & rõ ràng hơn) ===== */
  const packages = [
    {
      name: "Gói Thiết kế Kiến trúc",
      tag: "Phổ biến",
      priceHint: "từ 120.000 – 180.000 đ/m²",
      note: "Hồ sơ phối cảnh 3D mặt tiền – mặt bằng công năng – triển khai kiến trúc cơ bản theo phong cách Hiện đại / Luxury / Tân cổ.",
      deliverables: [
        "Khảo sát – tư vấn công năng & ngân sách",
        "Phối cảnh 3D mặt tiền",
        "Mặt bằng công năng các tầng",
        "Hồ sơ kiến trúc cơ bản (kích thước, cửa, vật liệu chính)",
        "Danh mục vật liệu gợi ý & khái toán sơ bộ",
      ],
      timeline: "15–20 ngày",
    },
    {
      name: "Gói Thiết kế Nội thất",
      tag: "Phòng khách – bếp – ngủ",
      priceHint: "từ 180.000 – 260.000 đ/m² sàn",
      note: "Phối cảnh 3D các phòng, bốc tách vật liệu – chủng loại – kích thước đồ; hồ sơ thi công nội thất.",
      deliverables: [
        "3D phòng khách/bếp/ăn/phòng ngủ/WC…",
        "Bản vẽ chi tiết đồ nội thất",
        "Bảng vật liệu & mã hoàn thiện",
        "Phối hợp thi công/giám sát tác giả",
      ],
      timeline: "15–25 ngày",
    },
    {
      name: "Gói Thiết kế Trọn gói",
      tag: "Ưu chuộng",
      priceHint: "Tối ưu chi phí tổng – bao gồm nội thất",
      note: "Full hồ sơ kiến trúc + nội thất + hỗ trợ kỹ thuật trong quá trình thi công. Đồng bộ thẩm mỹ – quản trị chi phí.",
      deliverables: [
        "Toàn bộ hồ sơ kiến trúc + nội thất",
        "Đề xuất kết cấu & MEP sơ bộ theo phương án",
        "Lập khái toán chi phí theo vật liệu",
        "Hỗ trợ chọn nhà thầu/giám sát tác giả đến khi bàn giao",
      ],
      timeline: "25–35 ngày",
    },
  ];

  /* ===== FAQ ===== */
  const faqs = [
    {
      q: "Đơn giá thiết kế tính như thế nào?",
      a: "Theo diện tích sàn, độ phức tạp và phong cách (Hiện đại/Luxury/Tân cổ…). Sau khi nắm nhu cầu – công năng – diện tích, KTS sẽ gửi báo giá chi tiết.",
    },
    {
      q: "Ký hợp đồng thi công có ưu đãi phí thiết kế không?",
      a: "Có. Ký HĐ phần thô + hoàn thiện: giảm 50% phí thiết kế. Ký trọn gói (kèm nội thất): giảm 100% phí thiết kế. Áp dụng khi thực hiện đầy đủ hạng mục theo hợp đồng.",
    },
    {
      q: "Ở tỉnh khác có nhận thiết kế không?",
      a: "Có, nhận thiết kế toàn quốc và hỗ trợ thi công/giám sát từ xa. Với gói trọn gói tại miền Trung & miền Nam có thể triển khai thi công theo lịch.",
    },
    {
      q: "Thời gian thiết kế nhà 2 tầng bao lâu?",
      a: "Thông thường 15–30 ngày cho hồ sơ thiết kế tùy quy mô & số lần chỉnh sửa. Tiến độ cụ thể sẽ được ghi trong hợp đồng.",
    },
  ];

  /* ===== JSON-LD (FAQ + Service + Breadcrumb) ===== */
  useEffect(() => {
    const scripts = [];

    const faqJson = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    };
    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.id = "faq-jsonld-house-two";
    s1.text = JSON.stringify(faqJson);
    scripts.push(s1);

    const serviceJson = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Thiết kế nhà 2 tầng",
      areaServed: "Đà Nẵng và toàn quốc",
      provider: { "@type": "Organization", name: "Nguyễn Hải Design & Build" },
      offers: packages.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.note,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "VND",
        },
      })),
    };
    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.id = "service-jsonld-house-two";
    s2.text = JSON.stringify(serviceJson);
    scripts.push(s2);

    const breadcrumbJson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: "https://nguyenhai.com.vn",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Mẫu nhà đẹp",
          item: "https://nguyenhai.com.vn/mau-nha-dep",
        },
        { "@type": "ListItem", position: 3, name: "Nhà 2 tầng" },
      ],
    };
    const s3 = document.createElement("script");
    s3.type = "application/ld+json";
    s3.id = "breadcrumb-jsonld-house-two";
    s3.text = JSON.stringify(breadcrumbJson);
    scripts.push(s3);

    scripts.forEach((el) => document.head.appendChild(el));
    return () => scripts.forEach((el) => el && el.remove());
    // eslint-disable-next-line
  }, []);

  /* Skeleton khi loading */
  const renderSkeletons = (n = 6) =>
    Array.from({ length: n }).map((_, i) => (
      <div className="house-card-modern skeleton" key={`sk-${i}`}>
        <div className="skeleton-img" />
        <div className="skeleton-lines">
          <div />
          <div />
          <div className="short" />
        </div>
      </div>
    ));

  return (
    <div className="house-container">
      {/* Cards */}
      <section id="mau-tieu-bieu" className="cards-section">
        <h1 className="house-title">MẪU NHÀ 2 TẦNG ĐẸP, HIỆN ĐẠI, TIỆN NGHI</h1>
        {err && (
          <p style={{ textAlign: "center", color: "#b91c1c", padding: 16 }}>
            {err}
          </p>
        )}
        <div className="house-grid">
          {loading
            ? renderSkeletons(6)
            : currentItems.map((house, idx) => {
                const cate = getCateNames(house)[0] || "Nhà phố";
                const isNew =
                  idx < 3 &&
                  Date.now() -
                    new Date(house.published_at || house.created_at).getTime() <
                    1000 * 60 * 60 * 24 * 60;
                return (
                  <article
                    className="house-card-modern hoverable"
                    key={house._id}
                  >
                    <div className="media">
                      <Link to={`/mau-nha-dep/${house.slug}`}>
                        {isNew && <span className="ribbon">New</span>}
                        <img
                          src={normalizeImg(house)}
                          alt={house.title}
                          className="house-img-modern"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/800x500?text=Nguyen+Hai+Design";
                          }}
                        />
                      </Link>
                    </div>

                    <div className="house-info">
                      <div className="meta">
                        <span className="cate-chip">{cate}</span>
                      </div>
                      <h3 className="house-title-modern lc-2">{house.title}</h3>
                      {house.description && (
                        <p className="house-desc lc-3">
                          {stripHtml(house.description)}
                        </p>
                      )}
                      <Link
                        to={`/mau-nha-dep/${house.slug}`}
                        className="explore-btn"
                      >
                        Khám phá <span className="arrow-icon">↗</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
        </div>

        {/* Pagination */}
        {!loading && houses.length > 0 && (
          <div className="pagination">
            <button
              className="page"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              « Trước
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  className={`page ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="page"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Tiếp »
            </button>
          </div>
        )}
      </section>

      {/* Lý do */}
      <section id="ly-do" className="usp-section">
        <h3 className="sec-title">
          Vì sao chọn Nguyễn Hải Design &amp; Build?
        </h3>
        <div className="usp-grid">
          <div className="usp-card hoverable">
            <h4>Tư vấn đúng nhu cầu & ngân sách</h4>
            <p>Phương án sát mong muốn, hạn chế phát sinh.</p>
          </div>
          <div className="usp-card hoverable">
            <h4>Cá nhân hoá từng không gian</h4>
            <p>Tối ưu theo thói quen sử dụng của gia đình.</p>
          </div>
          <div className="usp-card hoverable">
            <h4>Minh bạch & đồng bộ chi phí</h4>
            <p>Khái toán rõ ràng – vật liệu, khối lượng đối soát.</p>
          </div>
          <div className="usp-card hoverable">
            <h4>Hỗ trợ thi công/giám sát</h4>
            <p>Bám sát thiết kế tới khi bàn giao.</p>
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section id="quy-trinh" className="process-section">
        <h3 className="sec-title">Quy trình 6 bước</h3>
        <ol className="process-steps">
          <li data-step="1">
            Tư vấn & lấy brief
            <span className="sub">
              Thu thập nhu cầu, ngân sách, phong cách.
            </span>
          </li>
          <li data-step="2">
            Khảo sát hiện trạng
            <span className="sub">Đo đạc, đánh giá pháp lý & hạ tầng.</span>
          </li>
          <li data-step="3">
            Bố trí mặt bằng
            <span className="sub">Chốt phương án công năng tối ưu.</span>
          </li>
          <li data-step="4">
            Phối cảnh 3D
            <span className="sub">Lên hình khối, vật liệu, màu sắc.</span>
          </li>
          <li data-step="5">
            Hồ sơ kỹ thuật
            <span className="sub">Triển khai bản vẽ chi tiết thi công.</span>
          </li>
          <li data-step="6">
            Bàn giao & hỗ trợ thi công
            <span className="sub">Giám sát tác giả, kiểm soát chất lượng.</span>
          </li>
        </ol>
      </section>

      {/* Pricing */}
      <section id="bang-gia" className="price-section">
        <h3 className="sec-title">Bảng giá thiết kế tham khảo</h3>
        <p className="muted">
          Đơn giá có thể thay đổi theo diện tích, mức độ phức tạp, vật liệu và
          số lần chỉnh sửa. KTS sẽ bóc tách chi tiết sau khi tiếp nhận nhu cầu.
        </p>

        <div className="price-grid">
          {packages.map((pk) => (
            <article key={pk.name} className="price-card neo">
              {pk.tag && <span className="badge">{pk.tag}</span>}
              <h4>{pk.name}</h4>
              <div className="price-hint">{pk.priceHint}</div>
              <p className="note">{pk.note}</p>
              <ul>
                {pk.deliverables.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div className="timeline">
                ⏱ Thời gian dự kiến: <strong>{pk.timeline}</strong>
              </div>
              <a
                href={`tel:${HOTLINE_RAW}`}
                className="explore-btn call-btn"
                aria-label={`Gọi tư vấn ${HOTLINE}`}
                rel="nofollow"
              >
                📞 Gọi tư vấn {HOTLINE}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Phạm vi hồ sơ */}
      <section id="pham-vi" className="scope-section">
        <h3 className="sec-title">Phạm vi hồ sơ bàn giao</h3>
        <div className="scope-grid">
          <div className="scope-card">
            <h4>Kiến trúc</h4>
            <ul>
              <li>Mặt bằng công năng các tầng</li>
              <li>Phối cảnh 3D mặt tiền</li>
              <li>Mặt đứng, mặt cắt, chi tiết kiến trúc</li>
              <li>Gợi ý vật liệu & màu sắc</li>
            </ul>
          </div>
          <div className="scope-card">
            <h4>Kết cấu & MEP (sơ bộ)</h4>
            <ul>
              <li>Đề xuất giải pháp kết cấu phù hợp</li>
              <li>Gợi ý tuyến điện – nước – chiếu sáng</li>
              <li>Nguyên tắc thông gió – chiếu sáng tự nhiên</li>
            </ul>
          </div>
          <div className="scope-card">
            <h4>Nội thất</h4>
            <ul>
              <li>3D các không gian chính</li>
              <li>Bản vẽ đồ rời & đồ gắn</li>
              <li>Bảng vật liệu, mã hoàn thiện</li>
              <li>Phối hợp thi công/giám sát tác giả</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ưu đãi */}
      <section id="uu-dai" className="deal-section">
        <h3 className="sec-title">Ưu đãi phí thiết kế</h3>
        <div className="deal-cards">
          <div className="deal-card glass">
            <div className="deal-percent">-50%</div>
            <p>
              Giảm <strong>50% phí thiết kế</strong> khi ký hợp đồng{" "}
              <em>thi công phần thô + hoàn thiện</em>.
            </p>
          </div>
          <div className="deal-card glass">
            <div className="deal-percent">-100%</div>
            <p>
              Giảm <strong>100% phí thiết kế</strong> khi ký{" "}
              <em>trọn gói bao gồm nội thất</em>.
            </p>
          </div>
        </div>
        <p className="muted sm">
          Điều kiện: thực hiện đầy đủ hạng mục theo HĐ.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <h3 className="sec-title">Câu hỏi thường gặp</h3>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item hoverable">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <div id="house-contact">
        <ContactForm />
      </div>
    </div>
  );
}
