// File: Featured_Two.js
import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import Slider from "react-slick";

const { Title, Paragraph } = Typography;

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";
const API_CATES = "https://api.nguyenhai.com.vn/api/categories";
const DETAIL_BASE = "/mau-nha-dep";

/* ================= Helpers ================= */
const normalizeVN = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const titleLooksLikeVilla = (title = "") => {
  const t = normalizeVN(title);
  return (
    t.includes("biet thu") ||
    t.includes("villa") ||
    t.includes("vilaa") || // phòng sai chính tả nhẹ
    t.includes(" bt ") ||
    t.endsWith(" bt") ||
    t.startsWith("bt ")
  );
};

const buildQuery = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) v.forEach((x) => q.append(k, x));
    else q.append(k, v);
  });
  const str = q.toString();
  return str ? `?${str}` : "";
};

// fallback cực hạn (gần như không đụng tới vì đã xin fields gọn)
const stripHtml = (html = "") => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").trim();
};
const firstImageFromContent = (html = "") => {
  const m = /<img[^>]*src=["']([^"']+)["'][^>]*>/i.exec(html || "");
  return m?.[1] || "";
};

/* ================= Slider ================= */
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 450,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
};

const FeaturedTwo = () => {
  const [blogs, setBlogs] = useState([]);
  const [bietThuIds, setBietThuIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  /* ====== 1) Lấy ID danh mục "Biệt thự" – nhẹ tối đa + cache 60s ====== */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        const cacheKey = "cate-bietthu:v1";
        const cacheTsKey = cacheKey + ":ts";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(cacheTsKey) || 0);
        const cached = sessionStorage.getItem(cacheKey);

        if (cached && now - last < 60 * 1000) {
          const ids = JSON.parse(cached);
          if (alive) setBietThuIds(new Set(ids));
        }

        // Gọi API với projection nhỏ nhất có thể
        const r = await fetch(
          API_CATES + buildQuery({ limit: 200, fields: "name,slug,_id" }),
          { signal: ac.signal }
        );
        const raw = await r.json();
        const cates = Array.isArray(raw) ? raw : raw?.data || raw?.items || [];
        const ids = cates
          .filter(
            (c) =>
              (c.slug || "").toLowerCase() === "biet-thu" ||
              normalizeVN(c.name || "") === "biet thu"
          )
          .map((c) => String(c._id));

        if (alive) {
          setBietThuIds(new Set(ids));
          sessionStorage.setItem(cacheKey, JSON.stringify(ids));
          sessionStorage.setItem(cacheTsKey, String(now));
        }
      } catch (e) {
        if (e.name !== "AbortError") console.error("Load categories error:", e);
      }
    })();

    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  /* ====== 2) Lấy blogs – chỉ xin trường nhẹ, limit, sort + cache 60s ====== */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const cacheKey = "blogs-bietthu-featured:v2";
        const cacheTsKey = cacheKey + ":ts";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(cacheTsKey) || 0);
        const cached = sessionStorage.getItem(cacheKey);

        if (cached && now - last < 60 * 1000) {
          if (alive) {
            setBlogs(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        // Xin bản dữ liệu nhẹ: chỉ bài đã public, sort mới nhất, limit đủ để lọc
        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 120, // đủ để sau đó lọc 6 bài Biệt thự
          fields:
            "title,slug,thumbnail,cover_image,description,categoryIds,is_active,status,published_at,created_at",
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

        // Chuẩn hoá tối thiểu – không parse content nặng
        const mapped = list.map((b) => {
          const img =
            b.cover_image ||
            b.thumbnail ||
            (b.content ? firstImageFromContent(b.content) : "") ||
            "/default.jpg";

          return {
            _id: b._id,
            slug: b.slug,
            title: b.title || "",
            description:
              b.description ||
              (b.content ? stripHtml(b.content).slice(0, 160) : ""),
            image: img,
            status: (b.status || "").toLowerCase(),
            is_active: b.is_active !== false,
            created_at: b.created_at || b.createdAt,
            published_at: b.published_at || b.publishedAt,
            categoryIds: b.categoryIds || [],
          };
        });

        if (alive) {
          setBlogs(mapped);
          sessionStorage.setItem(cacheKey, JSON.stringify(mapped));
          sessionStorage.setItem(cacheTsKey, String(now));
        }
      } catch (e) {
        if (e.name !== "AbortError") console.error("Load blogs error:", e);
        if (alive) setBlogs([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  /* ====== 3) Check thuộc danh mục Biệt thự ====== */
  const inBietThu = (b) => {
    const cats = Array.isArray(b.categoryIds) ? b.categoryIds : [];
    if (!cats.length) return false;
    return cats.some((c) => {
      if (!c) return false;
      if (typeof c === "string") return bietThuIds.has(String(c));
      const byId = bietThuIds.has(String(c._id));
      const bySlug = (c.slug || "").toLowerCase() === "biet-thu";
      const byName = normalizeVN(c.name || "") === "biet thu";
      return byId || bySlug || byName;
    });
  };

  /* ====== 4) Lọc 6 bài Biệt thự mới nhất ====== */
  const items = useMemo(() => {
    const filtered = blogs.filter((b) => {
      const live = b.status === "published" && b.is_active;
      const byCate = inBietThu(b);
      const byTitle = titleLooksLikeVilla(b.title);
      return live && (byCate || byTitle);
    });

    return filtered
      .sort((a, b) => {
        const A = new Date(a.published_at || a.created_at || 0).getTime();
        const B = new Date(b.published_at || b.created_at || 0).getTime();
        return B - A;
      })
      .slice(0, 6);
  }, [blogs, bietThuIds]);

  const CardLink = ({ slug, children }) => (
    <a
      href={`${DETAIL_BASE}/${slug}`}
      className="project-card-link"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      aria-label="Xem chi tiết bài viết"
    >
      {children}
    </a>
  );

  return (
    <Row
      gutter={[24, 24]}
      style={{
        borderBottom: "2px solid #016bb4",
        paddingBottom: 20,
        paddingTop: 20,
      }}
    >
      <Col xs={24} lg={24}>
        <Row gutter={[24, 24]} align="middle">
          {/* Hình ảnh (trái trên desktop) */}
          <Col xs={24} lg={18} className="image-section image-section-gt2">
            {/* Mobile slider */}
            <div className="project-slider-mobile">
              {loading ? (
                <Paragraph style={{ padding: 12 }}>Đang tải…</Paragraph>
              ) : items.length ? (
                <Slider {...sliderSettings}>
                  {items.map((p) => (
                    <CardLink slug={p.slug} key={p._id}>
                      <div className="project-card" role="article">
                        <img
                          src={p.image || "/default.jpg"}
                          alt={p.title || "Biệt thự"}
                          className="project-image"
                          loading="lazy"
                          onError={(e) =>
                            (e.currentTarget.src = "/default.jpg")
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <div className="overlay">
                          <div className="overlay-text">
                            <Title level={5}>{p.title}</Title>
                            <Paragraph style={{ textAlign: "justify" }}>
                              {(p.description || "").slice(0, 140)}
                            </Paragraph>
                            <span
                              className="view-more"
                              style={{ display: "inline-block" }}
                            >
                              Xem thêm →
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardLink>
                  ))}
                </Slider>
              ) : (
                <Paragraph style={{ padding: 12 }}>
                  Chưa có bài phù hợp.
                </Paragraph>
              )}
            </div>

            {/* Desktop grid */}
            <div className="project-list-desktop">
              <Row gutter={[16, 16]}>
                {(loading ? Array.from({ length: 6 }) : items).map((p, idx) => (
                  <Col xs={12} lg={8} key={p?._id || idx}>
                    <CardLink slug={p?.slug || ""}>
                      <div className="project-card" role="article">
                        <img
                          src={p?.image || "/default.jpg"}
                          alt={p?.title || "Biệt thự"}
                          className="project-image"
                          loading="lazy"
                          onError={(e) =>
                            (e.currentTarget.src = "/default.jpg")
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <div className="overlay">
                          <div className="overlay-text">
                            <Title level={5}>
                              {loading ? "Đang tải..." : p?.title || "Biệt thự"}
                            </Title>
                            <Paragraph
                              style={{ color: "#fff", textAlign: "justify" }}
                            >
                              {loading
                                ? "Vui lòng đợi một chút…"
                                : (p?.description || "").slice(0, 140)}
                            </Paragraph>
                            {!loading && (
                              <span
                                className="view-more"
                                style={{ display: "inline-block" }}
                              >
                                Xem thêm →
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardLink>
                  </Col>
                ))}
                {!loading && items.length === 0 && (
                  <Col span={24}>
                    <Paragraph>Chưa có bài phù hợp.</Paragraph>
                  </Col>
                )}
              </Row>
            </div>
          </Col>

          {/* Text (phải trên desktop) */}
          <Col xs={24} lg={6} className="text-section text-section-gt2">
            <div>
              <Title
                level={3}
                style={{ color: "#016bb4", textTransform: "uppercase" }}
              >
                thiết kế biệt thự
              </Title>
              <Paragraph style={{ textAlign: "justify" }}>
                Mỗi mẫu biệt thự do Nguyễn Hải thiết kế và thi công đều mang đến
                một không gian sống đẳng cấp, sang trọng và tiện nghi. Chúng tôi
                chú trọng đến từng chi tiết kiến trúc, từ hình khối mạnh mẽ, vật
                liệu cao cấp đến bố cục hợp lý. Cam kết chất lượng & độ bền
                vững.
              </Paragraph>
              <Button
                type="primary"
                href="/mau-nha-dep/biet-thu"
                style={{ backgroundColor: "#016bb4", border: "none" }}
              >
                Xem tất cả
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FeaturedTwo;
