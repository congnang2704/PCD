import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../BlogDetail_DV/BlogDetail_DV.css";
import DQKH from "../../view/DanhGiaKH/DanhGiaKH";
import ContactForm from "../../view/Mail/ContactFormMail";

const API_BASE = "https://api.nguyenhai.com.vn/api/blogs";

/* ===== Helpers siêu nhẹ ===== */
const stripHtml = (html = "") => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
};

// chia đoạn an toàn (fallback nếu html không chuẩn <p>)
const splitIntoParagraphs = (html = "") => {
  const parts = (html || "")
    .split(/<\/p>/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) =>
      s.toLowerCase().startsWith("<p") ? s + "</p>" : `<p>${s}</p>`
    );
  return parts.length ? parts : [html];
};

// unique URL ảnh theo thứ tự
const uniqueImages = (arr = []) => {
  const seen = new Set();
  return arr.filter((src) => {
    if (!src) return false;
    if (seen.has(src)) return false;
    seen.add(src);
    return true;
  });
};

// rải ảnh thưa, không lặp
const distributeEvenly = (numSlots, imgs) => {
  if (!imgs?.length) return Array(numSlots).fill(null);
  const out = Array(numSlots).fill(null);
  const spacing = Math.max(4, Math.floor(numSlots / imgs.length)); // thưa hơn cho mượt mắt
  let imgIndex = 0;
  for (let i = 0; i < numSlots; i++) {
    if (i % spacing === 0 && imgIndex < imgs.length) {
      out[i] = imgs[imgIndex++];
    }
    if (imgIndex >= imgs.length) break;
  }
  return out;
};

const BlogDetail_MND = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== 1) Load bài theo slug – projection + SWR-lite + Abort ===== */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      setLoading(true);

      // a) Show cache ngay (UI instant)
      const cacheKey = `mnd:post:${slug}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (alive) {
            setBlog(parsed);
            setLoading(false);
          }
        } catch {}
      }

      // b) Revalidate nền với fields tối thiểu
      try {
        const fields = [
          "title",
          "slug",
          "author",
          "content", // cần render body
          "cover_image",
          "thumbnail",
          "gallery",
          "created_at",
          "updated_at",
          "categoryIds._id", // chỉ _id để lọc related
        ].join(",");

        const res = await fetch(
          `${API_BASE}/slug/${slug}?fields=${encodeURIComponent(fields)}`,
          { headers: { Accept: "application/json" }, signal: ac.signal }
        );
        const fresh = await res.json();
        if (alive && fresh) {
          setBlog(fresh);
          sessionStorage.setItem(cacheKey, JSON.stringify(fresh));
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error("Load blog error:", err);
        if (!cached && alive) setBlog(null);
      } finally {
        if (!cached && alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ac.abort();
    };
  }, [slug]);

  /* ===== 2) Tính sections (hooks luôn đặt trước render-return) ===== */
  const sections = useMemo(() => {
    if (!blog) return [];
    const paragraphs = splitIntoParagraphs(blog.content || "");

    // pool ảnh (unique, giữ thứ tự): gallery -> cover -> thumbnail
    const imgsUnique = uniqueImages([
      ...(Array.isArray(blog?.gallery) ? blog.gallery : []),
      blog?.cover_image,
      blog?.thumbnail,
    ]);

    const numSections = Math.ceil(paragraphs.length / 2);
    const imgPlan = distributeEvenly(numSections, imgsUnique);

    const out = [];
    for (let i = 0; i < paragraphs.length; i += 2) {
      const textHtml = paragraphs.slice(i, i + 2).join("");
      const sectionIndex = Math.floor(i / 2);
      const img = imgPlan[sectionIndex] || null;
      out.push({ textHtml, img });
    }
    return out;
  }, [blog]);

  /* ===== 3) Load related – fields + sort + limit, lọc client theo cate ===== */
  useEffect(() => {
    if (
      !blog ||
      !Array.isArray(blog?.categoryIds) ||
      !blog.categoryIds.length
    ) {
      setRelatedPosts([]);
      return;
    }

    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        const cateIds = blog.categoryIds
          .map((c) => c?._id || c)
          .filter(Boolean);

        // gọi bản nhẹ: không content
        const q = new URLSearchParams({
          status: "published",
          sort: "-published_at,-created_at",
          limit: "120",
          fields:
            "title,slug,thumbnail,cover_image,description,categoryIds._id,published_at,created_at,is_active,status",
        });

        const res = await fetch(`${API_BASE}?${q.toString()}`, {
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

        const related = list
          .filter(
            (b) =>
              b.slug !== blog.slug &&
              (b?.status || "").toLowerCase() === "published" &&
              b?.is_active !== false
          )
          .filter((b) =>
            (b?.categoryIds || []).some((c) => cateIds.includes(c?._id || c))
          )
          .sort(
            (a, b) =>
              new Date(b.published_at || b.created_at || 0) -
              new Date(a.published_at || a.created_at || 0)
          )
          .slice(0, 6);

        if (alive) setRelatedPosts(related);
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Load related error:", err);
        if (alive) setRelatedPosts([]);
      }
    })();

    return () => {
      alive = false;
      ac.abort();
    };
  }, [blog]);

  /* ===== 4) Render sau khi hooks đã định nghĩa xong ===== */
  if (loading && !blog) return <p className="loading">Đang tải bài viết…</p>;
  if (!blog) return <p className="loading">Không tìm thấy bài viết.</p>;

  const hero = blog.cover_image || blog.thumbnail || "/default.jpg";

  const relatedModels = [
    {
      title: "Nhà 2 tầng",
      to: "/mau-nha-dep/nha-2-tang",
      img: "https://i.pinimg.com/736x/8b/3d/79/8b3d79d5f22e60e04dee309724997dc7.jpg",
    },
    {
      title: "Nhà 3 tầng",
      to: "/mau-nha-dep/nha-3-tang",
      img: "https://lh3.googleusercontent.com/d/1lmiSE0yBFS-KEqvtEKjxYAQubrnjmyDU",
    },
    {
      title: "Nhà 5 tầng",
      to: "/mau-nha-dep/nha-5-tang",
      img: "https://i.pinimg.com/1200x/b1/f5/87/b1f5877908bcf91dfe75d955d10970dc.jpg",
    },
    {
      title: "Biệt thự",
      to: "/mau-nha-dep/biet-thu",
      img: "https://lh3.googleusercontent.com/d/1Hg72JQFY0hY-GU2C56UGALezFKMvYmLF",
    },
    {
      title: "Căn hộ",
      to: "/mau-nha-dep/khach-san",
      img: "https://i.pinimg.com/736x/20/44/d9/2044d9e6805c57dbd5e79df5ef8b112f.jpg",
    },
  ];

  return (
    <div className="blog-detail">
      {/* HERO */}
      <div className="hero">
        <img className="blog-detail-image" src={hero} alt={blog.title} />
      </div>

      {/* META */}
      <header className="meta">
        <h1>{blog.title}</h1>
        <p className="sub">
          🖊 {blog.author || "Nguyễn Hải"} · 📅{" "}
          {new Date(
            blog.created_at || blog.updated_at || Date.now()
          ).toLocaleDateString("vi-VN")}
        </p>
      </header>

      {/* CONTENT + ảnh xen kẽ (nhẹ) */}
      <article className="content">
        {sections.length ? (
          sections.map((s, idx) => (
            <section
              key={idx}
              className={`bd-section ${idx % 2 ? "reverse" : ""}`}
            >
              <div
                className="bd-text"
                dangerouslySetInnerHTML={{ __html: s.textHtml }}
              />
              {s.img && (
                <figure
                  className="bd-figure"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img
                    src={s.img}
                    alt={`Hình ảnh công trình của công ty Nguyễn Hải ${
                      idx + 1
                    }`}
                    title="Hình ảnh công trình của công ty Nguyễn Hải"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => (e.currentTarget.src = "/default.jpg")}
                    itemProp="contentUrl"
                  />
                  <figcaption className="bd-figcaption" itemProp="caption">
                    Hình ảnh công trình của công ty Nguyễn Hải
                  </figcaption>
                </figure>
              )}
            </section>
          ))
        ) : (
          <div
            className="bd-text only"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        )}
      </article>

      {/* MẪU NHÀ LIÊN QUAN (static) */}
      <section className="services-related">
        <h2>Mẫu nhà liên quan</h2>
        <div className="cards-grid">
          {relatedModels.map((m) => (
            <Link to={m.to} className="card" key={m.to}>
              <div className="card-img">
                <img src={m.img} alt={m.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h3>{m.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DQKH />

      {/* NAV */}
      <div className="nav-row">
        <Link to="/mau-nha-dep" className="back-btn">
          ← Quay lại
        </Link>
      </div>

      {/* RELATED POSTS từ cùng category */}
      {relatedPosts.length > 0 && (
        <section className="related">
          <h2>Bài viết liên quan</h2>
          <div className="cards-grid">
            {relatedPosts.map((item) => {
              const img = item.cover_image || item.thumbnail || "/default.jpg";
              return (
                <article key={item._id} className="card">
                  <div className="card-img">
                    <img src={img} alt={item.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3 className="line-2">{item.title}</h3>
                    <p className="muted line-2">
                      {item.description
                        ? stripHtml(item.description).slice(0, 80) + "…"
                        : "Chi tiết nội dung…"}
                    </p>
                    <button
                      className="ghost-btn"
                      onClick={() => navigate(`/mau-nha-dep/${item.slug}`)}
                    >
                      ➜ Khám phá
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <ContactForm />
    </div>
  );
};

export default BlogDetail_MND;
