import React, { useState, useEffect, useMemo } from "react";
import "../House.css";
import ContactForm from "../../view/Mail/ContactFormMail";
import { Link } from "react-router-dom";

// 5 category name cần lấy
const ALLOWED_CATEGORY_NAMES = [
  "Nhà 3 tầng",
  "Nhà 2 tầng",
  "Nhà 5 tầng",
  "Biệt thự",
  "Căn hộ, khách sạn",
];

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";

/* ================= Helpers ================= */
const norm = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
const ALLOWED_SET = new Set(ALLOWED_CATEGORY_NAMES.map(norm));

const getImg = (p) =>
  p?.cover_image || p?.avatar_blog || p?.thumbnail || "/default.jpg";

const getCateNames = (p) =>
  (p?.categoryIds || []).map((c) => c?.name || c?.title || "").filter(Boolean);

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

const Container_HouseModel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        // cache 60s để quay lại trang không phải load lại
        const cacheKey = "house-list:v2";
        const cacheTsKey = cacheKey + ":ts";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(cacheTsKey) || 0);
        const cached = sessionStorage.getItem(cacheKey);
        if (cached && now - last < 60 * 1000) {
          if (alive) {
            setHouses(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        // gọi API "bản nhẹ": không kéo content
        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 400, // đủ rộng để cover các nhóm
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

        // chỉ giữ bài thuộc 5 nhóm + đang hiển thị
        const filtered = list
          .filter(
            (p) =>
              (p?.status || "").toLowerCase() === "published" &&
              p?.is_active !== false
          )
          .filter((p) => getCateNames(p).some((n) => ALLOWED_SET.has(norm(n))))
          .map((p) => ({
            _id: p._id,
            slug: p.slug,
            title: p.title || "",
            description: p.description || "", // không stripHtml(content) cho nhẹ
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
          sessionStorage.setItem(cacheTsKey, String(now));
        }
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Lỗi khi load houses:", err);
        if (alive) {
          setHouses([]);
          setCurrentPage(1);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  const totalPages = Math.ceil(houses.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = useMemo(
    () => houses.slice(startIndex, startIndex + itemsPerPage),
    [houses, startIndex, itemsPerPage]
  );

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="house-container">
      <h2 className="house-title">
        999+ MẪU NHÀ ĐẸP, HIỆN ĐẠI, ĐÓN ĐẦU XU HƯỚNG
      </h2>
      <p className="house-subtitle">
        Các mẫu nhà 2–5 tầng, biệt thự, căn hộ/khách sạn… thiết kế hiện đại, tối
        ưu công năng.
      </p>

      <div className="house-grid">
        {loading ? (
          <div style={{ textAlign: "center", width: "100%" }}>⏳ Đang tải…</div>
        ) : (
          currentItems.map((house) => (
            <Link to={`/mau-nha-dep/${house.slug}`} className="">
              <div className="house-card-modern" key={house._id}>
                <img
                  src={getImg(house)}
                  alt={house.title}
                  className="house-img-modern"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/default.jpg")}
                />
                <div className="house-info">
                  <h3 className="house-title-modern">{house.title}</h3>
                  {house.description && (
                    <p className="house-desc">
                      {(house.description || "").slice(0, 110)}…
                    </p>
                  )}
                  <Link
                    to={`/mau-nha-dep/${house.slug}`}
                    className="explore-btn"
                  >
                    Khám phá <span className="arrow-icon">↗</span>
                  </Link>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && houses.length > itemsPerPage && (
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

      <h4 className="house-contact-heading">
        Để lại thông tin, kiến trúc sư PCD Nguyễn Hải sẽ tư vấn cho bạn nhanh
        nhất!
      </h4>
      <ContactForm />
    </div>
  );
};

export default Container_HouseModel;
