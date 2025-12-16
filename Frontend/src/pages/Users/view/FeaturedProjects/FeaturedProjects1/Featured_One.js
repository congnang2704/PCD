import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import Slider from "react-slick";
import "../FeaturedProjects.css";

const { Title, Paragraph } = Typography;

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";
const API_CATES = "https://api.nguyenhai.com.vn/api/categories";
const DETAIL_BASE = "/mau-nha-dep";

/* ================= Helpers ================= */
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
const normalizeVN = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

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

/* Fallback theo tiêu đề */
const TITLE_PATTERNS = [
  "nha 2 tang",
  "2 tang",
  "nha hai tang",
  "nha 3 tang",
  "3 tang",
  "nha ba tang",
  "nha 5 tang",
  "5 tang",
  "nha nam tang",
];
const TARGET_SLUGS = new Set(["nha-2-tang", "nha-3-tang", "nha-5-tang"]);
const TARGET_NAMES_NORM = new Set(
  ["Nhà 2 tầng", "Nhà 3 tầng", "Nhà 5 tầng"].map(normalizeVN)
);
const titleLooksLikeFloor = (title = "") =>
  TITLE_PATTERNS.some((p) => normalizeVN(title).includes(p));

/* Slider */
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

export default function FeaturedOne() {
  const [blogs, setBlogs] = useState([]);
  const [targetCateIds, setTargetCateIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  /* ====== Load categories (id 3 danh mục mục tiêu) – nhẹ + cache 60s ====== */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        const cacheKey = "cates-target-v2";
        const cacheTsKey = cacheKey + ":ts";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(cacheTsKey) || 0);
        const cached = sessionStorage.getItem(cacheKey);

        if (cached && now - last < 60 * 1000) {
          const ids = JSON.parse(cached);
          if (alive) setTargetCateIds(new Set(ids));
        }

        const r = await fetch(
          API_CATES + buildQuery({ limit: 200, fields: "name,slug,_id" }),
          { signal: ac.signal }
        );
        const raw = await r.json();
        const cates = Array.isArray(raw) ? raw : raw?.data || raw?.items || [];
        const ids = cates
          .filter(
            (c) =>
              TARGET_SLUGS.has((c.slug || "").toLowerCase()) ||
              TARGET_NAMES_NORM.has(normalizeVN(c.name || ""))
          )
          .map((c) => String(c._id));

        if (alive) {
          setTargetCateIds(new Set(ids));
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

  /* ====== Load blogs – fields + limit + sort + status + cache 60s ====== */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const cacheKey = "blogs-featured-v3";
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

        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 120, // đủ để lọc được 6 bài đúng nhóm
          fields:
            "title,slug,thumbnail,cover_image,description,categoryIds,is_active,status,published_at,created_at",
        });

        const res = await fetch(API_BLOGS + q, {
          headers: { Accept: "application/json" },
          signal: ac.signal,
        });
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.data)
          ? data.data
          : [];

        const mapped = list.map((b) => {
          const image =
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
            image,
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

  /* ====== Check blog thuộc 3 danh mục mục tiêu ====== */
  const blogInTargetCates = (b) => {
    const cats = Array.isArray(b.categoryIds) ? b.categoryIds : [];
    if (!cats.length) return false;
    return cats.some((c) => {
      if (!c) return false;
      if (typeof c === "string") return targetCateIds.has(String(c));
      const byId = targetCateIds.has(String(c._id));
      const bySlug = c.slug && TARGET_SLUGS.has(String(c.slug).toLowerCase());
      const byName =
        c.name && TARGET_NAMES_NORM.has(normalizeVN(String(c.name)));
      return byId || bySlug || byName;
    });
  };

  /* ====== Lấy 6 bài mới nhất thuộc nhóm ====== */
  const items = useMemo(() => {
    const filtered = blogs.filter((b) => {
      const isLive = b.status === "published" && b.is_active;
      const byCate = blogInTargetCates(b);
      const byTitle = titleLooksLikeFloor(b.title);
      return isLive && (byCate || byTitle);
    });

    return filtered
      .sort((a, b) => {
        const A = new Date(a.published_at || a.created_at || 0).getTime();
        const B = new Date(b.published_at || b.created_at || 0).getTime();
        return B - A;
      })
      .slice(0, 6);
  }, [blogs, targetCateIds]);

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
      {/* Cột text trái */}
      <Col xs={24} lg={6} className="text-section">
        <Title
          level={3}
          style={{ color: "#016bb4", textTransform: "uppercase" }}
        >
          Thiết kế nhà phố
        </Title>
        <Paragraph style={{ textAlign: "justify" }}>
          Mỗi năm, Nguyễn Hải thực hiện hàng trăm công trình thiết kế nhà phố ở
          khắp các tỉnh thành. Những mẫu nhà phố do Nguyễn Hải thiết kế đa phong
          cách (hiện đại, cổ điển) và luôn đảm bảo sự thông thoáng. Mỗi công
          trình đều được chăm chút tỉ mỉ theo ý tưởng riêng của gia chủ, tối ưu
          công năng và dấu ấn cá nhân.
        </Paragraph>
        <Button
          type="primary"
          href="/mau-nha-dep"
          style={{ backgroundColor: "#016bb4", border: "none" }}
        >
          Xem tất cả
        </Button>
      </Col>

      {/* Cột hình phải */}
      <Col xs={24} lg={18} className="image-section">
        {/* Desktop grid */}
        <div className="project-list-desktop">
          <Row gutter={[16, 16]}>
            {(loading ? Array.from({ length: 6 }) : items).map((p, idx) => (
              <Col xs={12} lg={8} key={p?._id || idx}>
                <CardLink slug={p?.slug || ""}>
                  <article className="project-card">
                    <img
                      src={p?.image || "/default.jpg"}
                      alt={p?.title || "mẫu nhà"}
                      className="project-image"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = "/default.jpg")}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="overlay">
                      <div className="overlay-text">
                        <Title level={5}>
                          {loading ? "Đang tải..." : p?.title || "Mẫu nhà"}
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
                  </article>
                </CardLink>
              </Col>
            ))}
            {!loading && items.length === 0 && (
              <Col span={24}>
                <Paragraph>Chưa có bài viết phù hợp.</Paragraph>
              </Col>
            )}
          </Row>
        </div>

        {/* Mobile slider */}
        <div className="project-slider-mobile">
          {loading ? (
            <Paragraph style={{ padding: 12 }}>Đang tải…</Paragraph>
          ) : items.length ? (
            <Slider {...sliderSettings}>
              {items.map((p) => (
                <CardLink slug={p.slug} key={p._id}>
                  <article className="project-card">
                    <img
                      src={p.image || "/default.jpg"}
                      alt={p.title || "mẫu nhà"}
                      className="project-image"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = "/default.jpg")}
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
                  </article>
                </CardLink>
              ))}
            </Slider>
          ) : (
            <Paragraph style={{ padding: 12 }}>
              Chưa có bài viết phù hợp.
            </Paragraph>
          )}
        </div>
      </Col>
    </Row>
  );
}
