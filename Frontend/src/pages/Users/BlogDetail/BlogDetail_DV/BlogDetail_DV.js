import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BlogDetail_DV.css";
import DQKH from "../../view/DanhGiaKH/DanhGiaKH";
import ContactForm from "../../../../components/Mail/ContactFormMail/ContactFormMail";

const API_BASE = "https://api.nguyenhai.com.vn/api/blogs";

/* ========= helpers ========= */
const stripHtml = (html = "") => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
};

// lấy tất cả ảnh <img src="..."> trong content
const extractContentImages = (html = "") => {
  const out = [];
  const re = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) if (m[1]) out.push(m[1]);
  return out;
};

const uniqueInOrder = (arr = []) => {
  const seen = new Set();
  return arr.filter((u) => (u && !seen.has(u) ? (seen.add(u), true) : false));
};

// rải ảnh vào giữa các section
const buildImagePlan = (numSections, imgs) => {
  const plan = Array(numSections).fill(null);
  if (!imgs.length || numSections <= 0) return plan;
  const MIN_SPACING = 3;
  const slots = Math.min(
    imgs.length,
    Math.max(1, Math.ceil(numSections / MIN_SPACING))
  );
  const spacing = Math.max(MIN_SPACING, Math.floor(numSections / slots));
  let pos = Math.min(1, Math.max(0, numSections - 1));
  let i = 0;
  while (i < imgs.length && pos < numSections) {
    plan[pos] = imgs[i++];
    pos += spacing;
  }
  return plan;
};

const splitIntoParagraphs = (html = "") => {
  if (!html) return [];
  const hasP = /<\/p>/i.test(html);
  if (hasP) {
    return html
      .replace(/<p[^>]*>/gi, "<p>")
      .split(/<\/p>/i)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (s.startsWith("<p>") ? s + "</p>" : `<p>${s}</p>`));
  }
  return html
    .split(/(?:\r?\n){2,}|<br\s*\/?>\s*<br\s*\/?>/gi)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `<p>${s}</p>`);
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* ===== 1) Load bài viết theo slug – bản nhẹ + SWR-lite ===== */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      setLoading(true);

      // a) show cache ngay (UI instant)
      const cacheKey = `blog:${slug}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (alive) {
            setPost(parsed);
            setLoading(false);
          }
        } catch {}
      }

      // b) luôn revalidate (fetch mới) với projection tối thiểu
      try {
        const fields = [
          "title",
          "slug",
          "author",
          "content", // cần để render body
          "cover_image",
          "thumbnail",
          "gallery",
          "created_at",
          "updated_at",
          "categoryIds._id", // chỉ id để query related
        ].join(",");

        const res = await fetch(
          `${API_BASE}/slug/${slug}?fields=${encodeURIComponent(fields)}`,
          {
            signal: ac.signal,
            headers: { Accept: "application/json" },
          }
        );
        const fresh = await res.json();
        if (alive && fresh) {
          setPost(fresh);
          sessionStorage.setItem(cacheKey, JSON.stringify(fresh));
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error("Load post error:", err);
        if (!cached && alive) setPost(null);
      } finally {
        if (!cached && alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ac.abort();
    };
  }, [slug]);

  /* ===== (Hooks trước, render check sau) – TÍNH TOÁN UI PHỤ THUỘC POST ===== */
  const allImages = useMemo(() => {
    if (!post) return [];
    const fromContent = extractContentImages(post.content || "");
    return uniqueInOrder([
      ...fromContent, // ưu tiên ảnh inline
      ...(Array.isArray(post?.gallery) ? post.gallery : []),
      post?.cover_image,
      post?.thumbnail,
    ]).filter(Boolean);
  }, [post]);

  const hero = allImages[0] || "/default.jpg";

  const sections = useMemo(() => {
    if (!post) return [];
    const paragraphs = splitIntoParagraphs(post.content || "");
    if (!paragraphs.length) return [];
    const numSections = Math.ceil(paragraphs.length / 2);
    const plan = buildImagePlan(numSections, allImages.slice(1)); // bỏ hero
    const out = [];
    for (let i = 0; i < numSections; i++) {
      const textHtml = paragraphs.slice(i * 2, i * 2 + 2).join("");
      out.push({ textHtml, img: plan[i] || null });
    }
    return out;
  }, [post, allImages]);

  const remainingImages = useMemo(() => {
    if (!post) return [];
    const used = new Set(sections.map((s) => s.img).filter(Boolean));
    return allImages.slice(1).filter((u) => u && !used.has(u));
  }, [post, allImages, sections]);

  /* ===== 2) Load related – chỉ khi đã có post/categoryIds; fields + sort + limit ===== */
  useEffect(() => {
    if (
      !post ||
      !Array.isArray(post?.categoryIds) ||
      !post.categoryIds.length
    ) {
      setRelatedPosts([]);
      return;
    }

    let alive = true;
    const ac = new AbortController();

    (async () => {
      try {
        const cateIds = post.categoryIds
          .map((c) => c?._id || c)
          .filter(Boolean);

        const q = new URLSearchParams({
          status: "published",
          sort: "-published_at,-created_at",
          limit: "120",
          fields:
            "title,slug,thumbnail,cover_image,description,categoryIds._id,published_at,created_at,is_active,status",
        });

        const res = await fetch(`${API_BASE}?${q.toString()}`, {
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

        const related = list
          .filter(
            (b) =>
              b.slug !== post.slug &&
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
  }, [post]);

  /* ===== 3) Render (sau khi đã khai báo hooks ở trên) ===== */
  if (loading && !post) return <p className="loading">⏳ Đang tải bài viết…</p>;
  if (!post) return <p className="loading">Không tìm thấy bài viết.</p>;

  const relatedServices = [
    {
      title: "Thiết kế nội thất",
      to: "/dich-vu/thiet-ke-noi-that",
      img: "https://lh3.googleusercontent.com/d/1CRcydhADRMXJs2L6GECXKuxwMdZTbZU9",
    },
    {
      title: "Thiết kế kiến trúc",
      to: "/dich-vu/thiet-ke-kien-truc",
      img: "https://lh3.googleusercontent.com/d/1Vduz3ZmkNJVc-sjXZ8Szlo5H3BuRnUEG",
    },
    {
      title: "Thi công công trình thô",
      to: "/dich-vu/thi-cong-tho",
      img: "https://lh3.googleusercontent.com/d/18cr9Kxk9H45Gzntb8SUyL-wC9f9-MInE",
    },
    {
      title: "Thi công công trình hoàn thiện",
      to: "/dich-vu/thi-cong-hoan-thien",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Xây nhà trọn gói",
      to: "/dich-vu/xay-nha-tron-goi",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="blog-detail">
      {/* HERO */}
      <div className="hero">
        <img
          src={hero}
          alt={post.title}
          loading="eager"
          onError={(e) => (e.currentTarget.src = "/default.jpg")}
        />
      </div>

      {/* TITLE + META */}
      <header className="meta">
        <h1>{post.title}</h1>
        <p className="sub">
          🖊 {post.author || "Nguyễn Hải"} · 📅{" "}
          {new Date(
            post.created_at || post.updated_at || Date.now()
          ).toLocaleDateString("vi-VN")}
        </p>
      </header>

      {/* CONTENT + ảnh xen kẽ */}
      <article className="content">
        {sections.length ? (
          sections.map((s, idx) => (
            <section key={idx} className="bd-section">
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
                    sizes="(min-width: 900px) 80ch, 100vw"
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
            className="bd-text"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </article>

      {/* GALLERY */}
      {remainingImages.length > 0 && (
        <section className="media-gallery">
          <h2>Thư viện hình ảnh</h2>
          <div className="media-grid">
            {remainingImages.map((src, i) => (
              <button
                key={i}
                className="media-thumb"
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
                aria-label={`Xem ảnh ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`gallery ${i + 1}`}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/default.jpg")}
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* DỊCH VỤ LIÊN QUAN */}
      <section className="services-related">
        <h2>Một số dịch vụ liên quan</h2>
        <div className="cards-grid">
          {relatedServices.map((sv) => (
            <Link to={sv.to} className="card" key={sv.to}>
              <div className="card-img">
                <img src={sv.img} alt={sv.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h3>{sv.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DQKH />

      {/* NAV + RELATED POSTS */}
      <div className="nav-row">
        <Link to="/dich-vu" className="back-btn">
          ← Quay lại
        </Link>
      </div>

      {relatedPosts.length > 0 && (
        <section className="related">
          <h2>Bài viết liên quan</h2>
          <div className="cards-grid">
            {relatedPosts.map((item) => {
              const img = item.cover_image || item.thumbnail || "/default.jpg";
              return (
                <article key={item._id} className="card">
                  <div className="card-img">
                    <img
                      src={img}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = "/default.jpg")}
                    />
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
                      onClick={() => navigate(`/dich-vu/${item.slug}`)}
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

      {/* FORM MAIL */}
      <ContactForm />

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <img
            src={remainingImages[lightboxIndex]}
            alt="preview"
            onError={(e) => (e.currentTarget.src = "/default.jpg")}
          />
          <button
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
