// src/pages/Users/Beautiful_House/House_Two/Container_HouseTwo.js
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useDeferredValue,
  useCallback,
  Suspense,
} from "react";
import { Link } from "react-router-dom";
import "./HouseTwo.css";

import {
  CATEGORY_NAME,
  HOTLINE,
  HOTLINE_RAW,
} from "../../../../api/houseTwo/constants";

import {
  stripHtml,
  normalizeImg,
  getCateNames,
  withinDays,
} from "../../../../api/houseTwo/houseTwo.utils";

import { fetchHouseTwoPosts } from "../../../../api/houseTwo/houseTwo.api";

// ✅ Lazy load ContactForm để giảm JS + giảm warn Turnstile trên trang listing
const ContactForm = React.lazy(() =>
  import("../../../../components/Mail/ContactFormMail/ContactFormMail")
);

function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function Container_HouseTwo() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const gridRef = useRef(null);
  const topRef = useRef(null);

  // ✅ mount ContactForm khi user kéo gần tới section liên hệ
  const contactMountRef = useRef(null);
  const [showContact, setShowContact] = useState(false);

  // ✅ tối ưu gõ search: debounce + deferred để UI mượt khi list dài
  const debouncedQ = useDebouncedValue(q, 220);
  const deferredQ = useDeferredValue(debouncedQ);

  const cacheKey = useMemo(() => `house-two:${CATEGORY_NAME}`, []);

  const loadData = useCallback(
    async ({ signal } = {}) => {
      setLoading(true);
      setErr("");

      // Ưu tiên cache để render nhanh
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        try {
          const cached = JSON.parse(cachedRaw);
          if (Array.isArray(cached)) {
            setHouses(cached);
            setLoading(false);
          }
        } catch {}
      }

      try {
        const filtered = await fetchHouseTwoPosts({ signal });
        setHouses(filtered);
        setCurrentPage(1);
        sessionStorage.setItem(cacheKey, JSON.stringify(filtered));
      } catch (e) {
        if (e?.name !== "AbortError") {
          // ✅ gọn console ở PROD
          if (process.env.NODE_ENV !== "production") {
            console.error("Lỗi tải dữ liệu:", e);
          }

          if (!sessionStorage.getItem(cacheKey)) {
            setErr("Không tải được dữ liệu. Vui lòng thử lại.");
            setHouses([]);
          }
        }
      } finally {
        if (!sessionStorage.getItem(cacheKey)) setLoading(false);
      }
    },
    [cacheKey]
  );

  // ================== FETCH DATA ==================
  useEffect(() => {
    const ac = new AbortController();
    loadData({ signal: ac.signal });
    return () => ac.abort();
  }, [loadData]);

  // ✅ Observe CONTACT: chỉ mount ContactForm khi gần tới
  useEffect(() => {
    const el = contactMountRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowContact(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ================== STATIC DATA ==================
  const packages = useMemo(
    () => [
      {
        name: "Gói Thiết kế Kiến trúc",
        tag: "Phổ biến",
        priceHint: "từ 120.000 – 180.000 đ/m²",
        note: "Tập trung công năng + mặt tiền hiện đại, hồ sơ đủ để thi công chuẩn – hạn chế phát sinh.",
        deliverables: [
          "Khảo sát – tư vấn công năng & ngân sách",
          "Phối cảnh 3D mặt tiền",
          "Mặt bằng công năng các tầng",
          "Hồ sơ kiến trúc cơ bản (kích thước, cửa, vật liệu chính)",
          "Khái toán sơ bộ theo phương án",
        ],
        timeline: "15–20 ngày",
      },
      {
        name: "Gói Thiết kế Nội thất",
        tag: "Đồng bộ thẩm mỹ",
        priceHint: "từ 180.000 – 260.000 đ/m² sàn",
        priceSub: "(Tuỳ vào diện tích và phong cách)",
        note: "Thiết kế theo xu hướng hiện đại (warm minimal / modern luxury), tối ưu lưu trữ & ánh sáng.",
        deliverables: [
          "3D phòng khách/bếp/ăn/phòng ngủ/WC…",
          "Bản vẽ chi tiết đồ nội thất",
          "Bảng vật liệu & mã hoàn thiện",
          "Hỗ trợ phối hợp thi công/giám sát tác giả",
        ],
        timeline: "15–25 ngày",
      },
      {
        name: "Gói Thiết kế Trọn gói",
        tag: "Ưu chuộng",
        priceHint: "Tối ưu chi phí tổng – đồng bộ nội thất",
        note: "Full kiến trúc + nội thất + hỗ trợ kỹ thuật thi công. Đồng bộ từ concept → vật liệu → chi phí.",
        deliverables: [
          "Toàn bộ hồ sơ kiến trúc + nội thất",
          "Đề xuất kết cấu & MEP sơ bộ theo phương án",
          "Khái toán chi phí theo vật liệu",
          "Hỗ trợ chọn nhà thầu/giám sát tác giả đến khi bàn giao",
        ],
        timeline: "25–35 ngày",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Đơn giá thiết kế nhà 2 tầng tính như thế nào?",
        a: "Theo diện tích sàn, mức độ phức tạp và phong cách. Sau khi nhận brief, KTS gửi báo giá chi tiết và lộ trình triển khai.",
      },
      {
        q: "Có ưu đãi phí thiết kế khi ký hợp đồng thi công không?",
        a: "Có. Ký HĐ phần thô + hoàn thiện: giảm 50% phí thiết kế. Ký trọn gói (kèm nội thất): giảm 100% phí thiết kế (điều kiện áp dụng theo hợp đồng).",
      },
      {
        q: "Ở tỉnh khác có nhận thiết kế không?",
        a: "Có. Nhận thiết kế toàn quốc, hỗ trợ làm việc online, bàn giao hồ sơ rõ ràng và tư vấn thi công/giám sát từ xa.",
      },
      {
        q: "Thời gian thiết kế nhà 2 tầng bao lâu?",
        a: "Thông thường 15–30 ngày tùy quy mô, phong cách và số vòng chỉnh sửa. Tiến độ cụ thể ghi rõ trong hợp đồng.",
      },
    ],
    []
  );

  // ================== SEO JSON-LD (tránh chèn lặp) ==================
  useEffect(() => {
    document.title =
      "Mẫu nhà 2 tầng đẹp – Hiện đại, tiện nghi | Nguyễn Hải Design & Build";

    const ids = [
      "faq-jsonld-house-two",
      "service-jsonld-house-two",
      "breadcrumb-jsonld-house-two",
    ];
    ids.forEach((id) => {
      const old = document.getElementById(id);
      if (old) old.remove();
    });

    const faqJson = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    };

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

    const makeScript = (id, json) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = id;
      s.text = JSON.stringify(json);
      return s;
    };

    const s1 = makeScript("faq-jsonld-house-two", faqJson);
    const s2 = makeScript("service-jsonld-house-two", serviceJson);
    const s3 = makeScript("breadcrumb-jsonld-house-two", breadcrumbJson);

    document.head.appendChild(s1);
    document.head.appendChild(s2);
    document.head.appendChild(s3);

    return () => {
      [s1, s2, s3].forEach((el) => el?.remove?.());
    };
  }, [faqs, packages]);

  // ================== COMPUTED LISTS ==================
  const decorated = useMemo(() => {
    return houses.map((h, idx) => {
      const cate = getCateNames(h)[0] || "Nhà 2 tầng";
      const date = h.published_at || h.created_at;
      const isNew = withinDays(date, 60) && idx < 6;
      const score =
        (isNew ? 50 : 0) +
        (stripHtml(h.description).length > 90 ? 10 : 0) +
        (stripHtml(h.title).length > 12 ? 5 : 0);
      return { ...h, cate, isNew, score };
    });
  }, [houses]);

  const featured = useMemo(() => {
    const list = [...decorated].sort((a, b) => (b.score || 0) - (a.score || 0));
    return list.slice(0, 3);
  }, [decorated]);

  // ✅ HERO ảnh: ưu tiên LCP -> KHÔNG lazy,
  const heroImage = useMemo(() => {
    const top = featured?.[0] || decorated?.[0];
    return top ? normalizeImg(top, 1200) : "";
  }, [featured, decorated]);

  const filteredList = useMemo(() => {
    const s = String(deferredQ || "")
      .trim()
      .toLowerCase();
    let list = decorated;

    if (filter === "Mới nhất") {
      list = list.filter((x) => withinDays(x.published_at || x.created_at, 60));
    } else if (filter === "Nổi bật") {
      list = [...list]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 60);
    }

    if (!s) return list;
    return list.filter((x) => {
      const hay = `${x.title} ${stripHtml(x.description)} ${
        x.cate
      }`.toLowerCase();
      return hay.includes(s);
    });
  }, [decorated, deferredQ, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = useMemo(
    () => filteredList.slice(startIndex, startIndex + itemsPerPage),
    [filteredList, startIndex, itemsPerPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredQ, filter]);

  const scrollToGrid = useCallback(() => {
    const el = gridRef.current || document.querySelector(".house-grid");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePageClick = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        scrollToGrid();
      }
    },
    [totalPages, scrollToGrid]
  );

  const getPageWindow = (current, total, windowSize = 7) => {
    if (total <= windowSize)
      return Array.from({ length: total }, (_, i) => i + 1);
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const renderSkeletons = (n = 9) =>
    Array.from({ length: n }).map((_, i) => (
      <div className="house-card-modern v2 skeleton" key={`sk-${i}`}>
        <div className="skeleton-img" />
        <div className="skeleton-lines">
          <div />
          <div />
          <div className="short" />
        </div>
      </div>
    ));

  // ================== ARTICLE ==================
  const article = useMemo(
    () => ({
      intro:
        "Nhà 2 tầng là lựa chọn “đúng tầm” cho đa số gia đình Việt: diện tích sử dụng tăng gấp đôi trên cùng nền đất, công năng linh hoạt, chi phí kiểm soát tốt và thời gian thi công hợp lý. Dưới đây là các mẫu nhà 2 tầng do Nguyễn Hải Design & Build thiết kế theo xu hướng quốc tế: warm minimal, modern luxury, thoáng xanh và tân cổ điển tinh gọn.",
      whatIs:
        "Nhà 2 tầng là kiểu nhà gồm 1 tầng trệt và 1 tầng lầu; nhiều công trình có thể bổ sung tum/sân thượng để tăng không gian thờ, giặt phơi, kho hoặc thư giãn. Kiểu nhà này phù hợp nhà phố vì tối ưu diện tích, tăng riêng tư và đáp ứng tốt nhu cầu gia đình 2–6 thành viên.",
      types: {
        structure: [
          {
            t: "Nhà 2 tầng 1 tum",
            d: "Bổ sung tum/sân thượng làm phòng thờ, kho, giặt phơi hoặc phòng đa năng.",
          },
          {
            t: "Nhà 2 tầng chữ L",
            d: "Tạo khoảng sân – tăng thoáng; phù hợp khu đất rộng hoặc cần khoảng lùi.",
          },
          {
            t: "Nhà 2 tầng chữ U",
            d: "Có khoảng lõm làm sân vườn/hồ cá – thiên về nghỉ dưỡng, cần diện tích đất tốt.",
          },
          {
            t: "Nhà ống 2 tầng (mặt tiền hẹp)",
            d: "Phổ biến 4–5m; cần tối ưu giếng trời, thông gió và lấy sáng.",
          },
        ],
        style: [
          "Hiện đại tối giản (Minimal / Warm Minimal)",
          "Thô mộc ấm áp (Organic / Rustic Modern)",
          "Thoáng xanh (Biophilic)",
          "Tân cổ điển tinh gọn (Neo-classic Light)",
        ],
      },
      pros: [
        {
          t: "Tối ưu diện tích & công năng",
          d: "Tăng diện tích sử dụng mà không cần đất quá lớn.",
        },
        {
          t: "Tăng riêng tư",
          d: "Tách rõ sinh hoạt chung (tầng 1) và nghỉ ngơi (tầng 2).",
        },
        {
          t: "Linh hoạt không gian",
          d: "Dễ bổ sung phòng làm việc, phòng đa năng, sân thượng thư giãn.",
        },
        {
          t: "Tối ưu chi phí",
          d: "Phù hợp gia đình trẻ; ngân sách kiểm soát theo mức hoàn thiện.",
        },
      ],
      trends: [
        {
          t: "Warm Minimal",
          d: "Tối giản nhưng ấm — tone be/kem, gỗ sáng, ánh sáng vàng nhẹ.",
        },
        {
          t: "Biophilic (thoáng xanh)",
          d: "Cây xanh ở ban công/giếng trời giúp tăng chất lượng sống.",
        },
        {
          t: "Vật liệu bền vững",
          d: "Đá – gỗ – kim loại sơn tĩnh điện; ưu tiên ít bảo trì, dễ vệ sinh.",
        },
        {
          t: "Mặt tiền tinh gọn",
          d: "Mảng khối rõ, lam chắn nắng, kính lớn nhưng kiểm soát nhiệt.",
        },
        {
          t: "Không gian đa năng",
          d: "Lưu trữ thông minh, phòng linh hoạt: làm việc/đọc sách/đồ chơi.",
        },
      ],
      notes: [
        "Chốt công năng trước khi chốt 3D: số phòng, nhu cầu, thói quen sinh hoạt.",
        "Xác định ngân sách sớm để chọn phong cách & vật liệu phù hợp, tránh phát sinh.",
        "Ưu tiên lấy sáng & thông gió: giếng trời, cửa sổ, khoảng lùi, cây xanh.",
        "Vật liệu quyết định độ bền: chọn nhóm bền – dễ vệ sinh – ít bảo trì.",
      ],
    }),
    []
  );

  const hasResult = !loading && filteredList.length > 0;

  return (
    <div className="house-two-v2" ref={topRef}>
      <a className="skip-link" href="#mau-tieu-bieu">
        Bỏ qua đến danh sách mẫu nhà
      </a>

      <div className="house-container">
        {/* HERO */}
        <section
          className="hero-two glass"
          aria-label="Giới thiệu mẫu nhà 2 tầng"
        >
          <div className="hero-two__content">
            <p className="hero-kicker">
              Xu hướng thiết kế 2025 • Warm Minimal • Modern Luxury
            </p>
            <h1 className="hero-title">
              Mẫu nhà 2 tầng đẹp hiện đại, tiện nghi
            </h1>
            <p className="hero-sub">{article.intro}</p>

            <div className="hero-cta">
              <a className="btn-primary" href="#mau-tieu-bieu">
                Xem mẫu nổi bật <span aria-hidden>↗</span>
              </a>
              <a
                className="btn-outline"
                href={`tel:${HOTLINE_RAW}`}
                rel="nofollow"
              >
                Gọi tư vấn {HOTLINE}
              </a>
            </div>

            <div className="hero-metrics" role="list" aria-label="Lợi ích">
              <div className="metric" role="listitem">
                <div className="metric-k">Tối ưu</div>
                <div className="metric-v">Công năng</div>
              </div>
              <div className="metric" role="listitem">
                <div className="metric-k">Rõ ràng</div>
                <div className="metric-v">Hồ sơ</div>
              </div>
              <div className="metric" role="listitem">
                <div className="metric-k">Hạn chế</div>
                <div className="metric-v">Phát sinh</div>
              </div>
            </div>
            <div className="hero-trust" aria-label="Cam kết nhanh">
              <span className="trust-pill">🏗️ Hơn 10 năm kinh nghiệm</span>
              <span className="trust-pill">📄 Hồ sơ rõ ràng</span>
              <span className="trust-pill">🛠️ Hỗ trợ thi công/giám sát</span>
              <span className="trust-pill">⚡ Tư vấn nhanh trong ngày</span>
            </div>
          </div>

          <div
            className="hero-two__visual"
            aria-hidden={heroImage ? "false" : "true"}
          >
            <div className="hero-poster">
              {heroImage && (
                <img
                  className="hero-poster__img"
                  src={heroImage}
                  alt="Mẫu nhà 2 tầng đẹp – Nguyễn Hải Design & Build"
                  loading="eager"
                  decoding="async"
                  width="1200"
                  height="750"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="hero-poster__overlay">
                <div className="poster-badge">Bộ sưu tập</div>
                <div className="poster-title">
                  Nhà 2 tầng • Nhà phố • Mái thái
                </div>
                <div className="poster-sub">Ảnh/3D lấy từ bài viết nổi bật</div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK NAV */}
        <nav className="quick-nav" aria-label="Điều hướng nhanh">
          <a href="#mau-tieu-bieu">Mẫu tiêu biểu</a>
          <a href="#bai-viet">Cẩm nang</a>
          <a href="#ly-do">Lý do</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#bang-gia">Bảng giá</a>
          <a href="#faq">FAQ</a>
          <a href="#house-contact">Liên hệ</a>
        </nav>

        {/* CARDS */}
        <section
          id="mau-tieu-bieu"
          className="cards-section"
          aria-label="Danh sách mẫu nhà 2 tầng"
        >
          <div className="sec-head">
            <h2 className="house-title v2">Mẫu nhà 2 tầng đẹp</h2>
            <p className="muted">
              Bộ sưu tập cập nhật theo xu hướng thế giới: mặt tiền tinh gọn, vật
              liệu tự nhiên, ánh sáng – thông gió tối ưu, nội thất đồng bộ.
            </p>

            <div className="toolbar" role="search" aria-label="Tìm kiếm và lọc">
              <div className="searchbox">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm theo tên mẫu, phong cách, mô tả…"
                  aria-label="Tìm kiếm mẫu nhà 2 tầng"
                />
                {q && (
                  <button
                    className="xbtn"
                    onClick={() => setQ("")}
                    aria-label="Xoá tìm kiếm"
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="chips" role="tablist" aria-label="Bộ lọc">
                {["Tất cả", "Mới nhất", "Nổi bật"].map((x) => (
                  <button
                    key={x}
                    className={`chip ${filter === x ? "active" : ""}`}
                    onClick={() => setFilter(x)}
                    type="button"
                    role="tab"
                    aria-selected={filter === x}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            {!loading && (
              <div className="result-hint" aria-live="polite">
                {filteredList.length > 0 ? (
                  <span>
                    Có <strong>{filteredList.length}</strong> mẫu phù hợp
                  </span>
                ) : (
                  <span>Không tìm thấy mẫu phù hợp</span>
                )}
              </div>
            )}
          </div>

          {err && (
            <div className="errbox" role="alert">
              <p className="err">{err}</p>
              <button
                className="btn-primary"
                type="button"
                onClick={() => loadData({ signal: undefined })}
              >
                Thử lại
              </button>
            </div>
          )}

          <div
            className="house-grid"
            ref={gridRef}
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? (
              renderSkeletons(9)
            ) : currentItems.length ? (
              currentItems.map((house) => (
                <article
                  className="house-card-modern hoverable v2"
                  key={house._id}
                >
                  <div className="media">
                    <Link
                      to={`/mau-nha-dep/${house.slug}`}
                      className="media-link"
                      aria-label={`Xem ${house.title}`}
                    >
                      {house.isNew && <span className="ribbon">New</span>}

                      <img
                        src={normalizeImg(house, 800)}
                        alt={house.title}
                        className="house-img-modern"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/1200x800?text=Nguyen+Hai+Design";
                        }}
                      />

                      <div className="overlay" aria-hidden="true">
                        <div className="overlay-actions">
                          <span className="overlay-btn">Xem chi tiết ↗</span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="house-info">
                    <div className="meta">
                      <span className="cate-chip">{house.cate}</span>
                      {withinDays(
                        house.published_at || house.created_at,
                        30
                      ) && <span className="cate-chip soft">Hot</span>}
                    </div>

                    <h3 className="house-title-modern lc-2">{house.title}</h3>

                    <p className="house-desc lc-3">
                      {stripHtml(house.description) ||
                        "Thiết kế tối ưu công năng, mặt tiền hiện đại, không gian thông thoáng – phù hợp gia đình Việt."}
                    </p>

                    <Link
                      to={`/mau-nha-dep/${house.slug}`}
                      className="explore-btn"
                    >
                      Xem chi tiết <span className="arrow-icon">↗</span>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty" role="status" aria-live="polite">
                <div className="empty-title">Không có kết quả</div>
                <div className="muted">
                  Thử đổi bộ lọc, hoặc xoá từ khoá tìm kiếm để xem tất cả mẫu
                  nhà.
                </div>
                <div className="empty-actions">
                  <button
                    className="btn-outline"
                    type="button"
                    onClick={() => setQ("")}
                  >
                    Xoá tìm kiếm
                  </button>
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => setFilter("Tất cả")}
                  >
                    Về “Tất cả”
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {hasResult && (
            <div
              className="pagination"
              role="navigation"
              aria-label="Phân trang"
            >
              <button
                className="page"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                type="button"
              >
                « Trước
              </button>

              {currentPage > 1 && totalPages > 7 && (
                <button
                  className="page ghost"
                  onClick={() => handlePageClick(1)}
                  type="button"
                >
                  1
                </button>
              )}
              {currentPage > 4 && totalPages > 7 && (
                <span className="dots">…</span>
              )}

              {getPageWindow(currentPage, totalPages, 7).map((page) => (
                <button
                  key={page}
                  className={`page ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageClick(page)}
                  type="button"
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages - 3 && totalPages > 7 && (
                <span className="dots">…</span>
              )}
              {currentPage < totalPages && totalPages > 7 && (
                <button
                  className="page ghost"
                  onClick={() => handlePageClick(totalPages)}
                  type="button"
                >
                  {totalPages}
                </button>
              )}

              <button
                className="page"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                type="button"
              >
                Tiếp »
              </button>
            </div>
          )}
        </section>

        {/* ================= CẨM NANG ================= */}
        <section id="bai-viet" className="article-section">
          <div className="sec-head">
            <h2 className="house-title v2">Cẩm nang nhà 2 tầng</h2>
            <p className="muted">
              Tóm tắt các ý quan trọng để bạn chọn đúng kiểu nhà – đúng phong
              cách – đúng ngân sách.
            </p>
          </div>

          <section className="article-card">
            <h3>1. Nhà 2 tầng là gì?</h3>
            <p className="muted">{article.whatIs}</p>

            <div className="article-grid">
              <div className="article-box">
                <h4>Phân loại theo kết cấu</h4>
                <ul>
                  {article.types.structure.map((x) => (
                    <li key={x.t}>
                      <strong>{x.t}:</strong> {x.d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="article-box">
                <h4>Phân loại theo phong cách</h4>
                <ul>
                  {article.types.style.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="article-card">
            <h3>2. Ưu điểm nổi bật của nhà 2 tầng</h3>
            <div className="article-bento">
              {article.pros.map((x) => (
                <div className="bento" key={x.t}>
                  <h4>{x.t}</h4>
                  <p className="muted">{x.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="article-card">
            <h3>3. Xu hướng thiết kế nhà 2 tầng năm 2025</h3>
            <div className="article-bento">
              {article.trends.map((x) => (
                <div className="bento" key={x.t}>
                  <h4>{x.t}</h4>
                  <p className="muted">{x.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="article-card">
            <h3>4. Lưu ý quan trọng khi thiết kế nhà 2 tầng</h3>
            <ul className="article-notes">
              {article.notes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <div className="article-cta">
              <a
                className="btn-primary"
                href={`tel:${HOTLINE_RAW}`}
                rel="nofollow"
              >
                📞 Tư vấn nhanh {HOTLINE}
              </a>
              <a className="btn-outline" href="#house-contact">
                Nhận báo giá & tư vấn
              </a>
            </div>
          </section>
        </section>

        {/* LÝ DO */}
        <section id="ly-do" className="usp-section">
          <article className="article-card">
            <h3 className="sec-title">
              Vì sao chọn Nguyễn Hải Design &amp; Build?
            </h3>
            <div className="usp-grid">
              <div className="usp-card hoverable">
                <h4>Tư vấn đúng nhu cầu & ngân sách</h4>
                <p>Phương án sát thực tế, hạn chế phát sinh khi thi công.</p>
              </div>
              <div className="usp-card hoverable">
                <h4>Thiết kế theo xu hướng quốc tế</h4>
                <p>
                  Warm minimal, modern luxury, vật liệu tự nhiên – tinh gọn.
                </p>
              </div>
              <div className="usp-card hoverable">
                <h4>Minh bạch chi phí</h4>
                <p>Khái toán rõ ràng – vật liệu, khối lượng đối soát.</p>
              </div>
              <div className="usp-card hoverable">
                <h4>Hỗ trợ thi công/giám sát</h4>
                <p>Bám sát thiết kế tới khi bàn giao, kiểm soát chất lượng.</p>
              </div>
            </div>
          </article>
        </section>

        {/* QUY TRÌNH */}
        <section id="quy-trinh" className="process-section">
          <article className="article-card">
            <h3 className="sec-title">Quy trình 6 bước</h3>
            <ol className="process-steps">
              <li data-step="1">
                Tư vấn & lấy brief{" "}
                <span className="sub">
                  Nhu cầu, ngân sách, phong cách, thời gian.
                </span>
              </li>
              <li data-step="2">
                Khảo sát hiện trạng{" "}
                <span className="sub">Đo đạc, pháp lý, hướng nắng – gió.</span>
              </li>
              <li data-step="3">
                Bố trí mặt bằng{" "}
                <span className="sub">Chốt công năng tối ưu + lưu trữ.</span>
              </li>
              <li data-step="4">
                Phối cảnh 3D{" "}
                <span className="sub">Khối, vật liệu, ánh sáng, màu sắc.</span>
              </li>
              <li data-step="5">
                Hồ sơ kỹ thuật{" "}
                <span className="sub">
                  Triển khai chi tiết để thi công chuẩn.
                </span>
              </li>
              <li data-step="6">
                Bàn giao & hỗ trợ thi công{" "}
                <span className="sub">
                  Giám sát tác giả – hạn chế phát sinh.
                </span>
              </li>
            </ol>
          </article>
        </section>

        {/* BẢNG GIÁ */}
        <section id="bang-gia" className="price-section">
          <article className="article-card">
            <h3 className="sec-title">Bảng giá thiết kế tham khảo</h3>
            <p className="muted">
              Đơn giá thay đổi theo diện tích, độ phức tạp, vật liệu và số vòng
              chỉnh sửa. KTS sẽ bóc tách chi tiết sau khi tiếp nhận nhu cầu.
            </p>

            <div className="price-grid">
              {packages.map((pk) => (
                <article key={pk.name} className="price-card neo">
                  {pk.tag && <span className="badge">{pk.tag}</span>}
                  <h4>{pk.name}</h4>
                  <div className="price-hint">{pk.priceHint}</div>
                  <div className="price-hint">{pk.priceSub}</div>
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

            <div className="article-cta-deal">
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
            </div>
          </article>
        </section>

        {/* FAQ */}
        <section id="faq" className="faq-section">
          <article className="article-card">
            <h3 className="sec-title">Câu hỏi thường gặp</h3>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q} className="faq-item hoverable">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </article>
        </section>

        {/* CONTACT */}
        <section
          id="house-contact"
          className="contact-section"
          ref={contactMountRef}
        >
          <article className="article-card">
            <div className="contact-wrap">
              {showContact ? (
                <Suspense
                  fallback={
                    <div className="contact-skeleton" aria-busy="true">
                      Đang tải form liên hệ…
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              ) : (
                <div className="contact-skeleton">
                  Kéo xuống thêm chút để mở form liên hệ…
                </div>
              )}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
