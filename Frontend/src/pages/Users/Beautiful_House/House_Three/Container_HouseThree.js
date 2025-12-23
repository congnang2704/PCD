import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "../House.css";
import ContactForm from "../../../../components/Mail/ContactFormMail/ContactFormMail";

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";
const CATEGORY_NAME = "Nhà 3 tầng";

/* ============ Helpers ============ */
const stripHtml = (html = "") => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
};

const getImg = (p) =>
  p?.cover_image || p?.avatar_blog || p?.thumbnail || "/default.jpg";

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

const Container_HouseThree = () => {
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

      // 1) Hiện cache ngay (perceived instant)
      const cacheKey = `house-three:${CATEGORY_NAME}`;
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

      // 2) Revalidate nền – API nhẹ (fields + status + sort + limit)
      try {
        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 400, // đủ rộng để lọc 1 category
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
            setErr("Không tải được dữ liệu.");
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

  const handlePageClick = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  return (
    <div className="house-container">
      <h2 className="house-title">MẪU NHÀ 3 TẦNG ĐẸP, HIỆN ĐẠI</h2>
      <p className="house-subtitle">
        Tuyển chọn các mẫu nhà 3 tầng tối ưu công năng, thẩm mỹ chuẩn.
      </p>

      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Đang tải…</p>
      ) : err ? (
        <p style={{ textAlign: "center", color: "#b91c1c" }}>{err}</p>
      ) : houses.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Chưa có bài thuộc danh mục “{CATEGORY_NAME}”.
        </p>
      ) : (
        <>
          <div className="house-grid">
            {currentItems.map((house) => (
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
                      {stripHtml(house.description).slice(0, 110)}…
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
            ))}
          </div>

          <div className="pagination">
            <button
              className="page"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              « Trước
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`page ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Tiếp »
            </button>
          </div>
        </>
      )}

      <h4 className="house-contact-heading">
        Để lại thông tin, KTS PCD Nguyễn Hải sẽ tư vấn nhanh nhất!
      </h4>
      <ContactForm />
    </div>
  );
};

export default Container_HouseThree;
