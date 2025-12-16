import React, { useEffect, useMemo, useState } from "react";
import "./Container_Services.css";
import { Row, Col, Image, Grid, Button, Pagination, Space } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ContactForm from "../../view/Mail/ContactFormMail";
import FAQComponent from "../../view/FAQComponent/FAQComponent";
import bannerImage from "../../../../assets/banner/2.webp";
import { useNavigate } from "react-router-dom";
import DQKH from "../../view/DanhGiaKH/DanhGiaKH";

const { useBreakpoint } = Grid;

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";

// 5 category theo tên (chuẩn hóa để so khớp nhanh)
const ALLOWED_CATEGORY_NAMES = [
  "Thiết kế kiến trúc",
  "Thi công công trình thô",
  "Thi công công trình hoàn thiện",
  "Thi công xây nhà trọn gói",
  "Thiết kế nội thất",
];
const norm = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
const ALLOWED_SET = new Set(ALLOWED_CATEGORY_NAMES.map(norm));

// Helpers nhỏ gọn, tránh đụng content
const getPostImage = (p) =>
  p?.cover_image || p?.avatar_blog || p?.thumbnail || "/default.jpg";

const getPostCateNames = (p) =>
  (p?.categoryIds || []).map((c) => c?.name || c?.title || "").filter(Boolean);

const Services = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [sourcePosts, setSourcePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter theo danh mục (ALL = tất cả 5)
  const [cateFilter, setCateFilter] = useState("ALL");

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // util build query
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

  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        // Cache 60s để quay lại trang không phải load lại
        const cacheKey = "svc-blogs:v2";
        const cacheTsKey = cacheKey + ":ts";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(cacheTsKey) || 0);
        const cached = sessionStorage.getItem(cacheKey);
        if (cached && now - last < 60 * 1000) {
          if (alive) {
            setSourcePosts(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        // Gọi API bản "nhẹ": không kéo content
        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 300, // đủ rộng để bao phủ 5 nhóm DV
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

        // Chỉ lấy blog thuộc 5 danh mục định nghĩa + active
        const filtered = list
          .filter(
            (p) =>
              (p?.status || "").toLowerCase() === "published" &&
              p?.is_active !== false
          )
          .filter((p) =>
            getPostCateNames(p).some((n) => ALLOWED_SET.has(norm(n)))
          )
          .map((p) => ({
            _id: p._id,
            slug: p.slug,
            title: p.title || "",
            // description đã có sẵn -> không stripHtml(content)
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
          setSourcePosts(filtered);
          sessionStorage.setItem(cacheKey, JSON.stringify(filtered));
          sessionStorage.setItem(cacheTsKey, String(now));
        }
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Lỗi khi load blogs:", err);
        if (alive) setSourcePosts([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  // posts sau khi áp filter danh mục
  const filteredByCate = useMemo(() => {
    if (cateFilter === "ALL") return sourcePosts;
    const key = norm(cateFilter);
    return sourcePosts.filter((p) =>
      getPostCateNames(p).some((n) => norm(n) === key)
    );
  }, [sourcePosts, cateFilter]);

  // reset về trang 1 khi đổi filter
  useEffect(() => {
    setCurrentPage(1);
  }, [cateFilter]);

  // phân trang client (vì API chưa hỗ trợ filter-by-cate)
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredByCate.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className="services-page">
      {/* Banner */}
      <Row>
        <Col span={24}>
          <Image
            className="responsive-banner"
            width="100%"
            height={screens.xs ? "auto" : "700px"}
            src={bannerImage}
            alt="Banner"
            preview={false}
            style={{ display: "block", objectFit: "cover", maxWidth: "100%" }}
          />
        </Col>
      </Row>

      {/* Highlight */}
      <div className="services-highlight">
        <h2 className="services-title">DỊCH VỤ</h2>
        <p className="services-desc">
          Để đáp ứng nhu cầu của khách hàng, Nguyễn Hải cung cấp các dịch vụ
          như: Thiết kế kiến trúc, thi công nhà phố, thiết kế và thi công trọn
          gói,… tại Đà Nẵng và nhiều tỉnh thành khác.
        </p>
      </div>

      {/* Filter theo danh mục */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "8px 0 16px",
        }}
      >
        <Space wrap>
          <Button
            type={cateFilter === "ALL" ? "primary" : "default"}
            onClick={() => setCateFilter("ALL")}
          >
            Tất cả
          </Button>
          {ALLOWED_CATEGORY_NAMES.map((name) => (
            <Button
              key={name}
              type={cateFilter === name ? "primary" : "default"}
              onClick={() => setCateFilter(name)}
            >
              {name}
            </Button>
          ))}
        </Space>
      </div>

      {/* Post List */}
      <div className="services-grid">
        <Row gutter={[24, 24]}>
          {loading ? (
            <Col span={24}>
              <p style={{ textAlign: "center" }}>⏳ Đang tải bài viết…</p>
            </Col>
          ) : currentPosts.length === 0 ? (
            <Col span={24}>
              <p style={{ textAlign: "center" }}>Không có bài viết.</p>
            </Col>
          ) : (
            currentPosts.map((post) => (
              <Col xs={24} sm={12} md={8} key={post._id}>
                <div
                  className="post-card"
                  onClick={() => navigate(`/dich-vu/${post.slug}`)}
                >
                  <img
                    src={getPostImage(post)}
                    alt={post.title}
                    className="post-image"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = "/default.jpg")}
                  />
                  <div className="post-content">
                    <h4 className="post-title">{post.title}</h4>
                    {post.description && (
                      <p className="post-desc">
                        {(post.description || "").slice(0, 90)}…
                      </p>
                    )}
                    <Button
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      className="post-btn"
                      onClick={() => navigate(`/dich-vu/${post.slug}`)}
                    >
                      Khám phá
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>

        {/* Pagination */}
        {!loading && filteredByCate.length > postsPerPage && (
          <Pagination
            current={currentPage}
            pageSize={postsPerPage}
            total={filteredByCate.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="custom-pagination"
            style={{ marginTop: 16, textAlign: "center" }}
          />
        )}
      </div>

      {/* FAQ + Đánh giá + Contact */}
      <FAQComponent />
      <DQKH />
      <ContactForm />
    </div>
  );
};

export default Services;
