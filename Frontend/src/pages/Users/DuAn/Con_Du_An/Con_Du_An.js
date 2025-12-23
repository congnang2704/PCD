// src/pages/Users/DuAn/Con_Du_An/Con_Du_An.js
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  Suspense,
  lazy,
  startTransition,
} from "react";
import "./Con_Du_An.css";
import { API_BASE, getProjectsPage } from "../../../../api/projects.api";

// Lazy import ContactForm (nhưng còn thêm bước: chỉ mount khi scroll gần cuối)
const ContactForm = lazy(() =>
  import("../../../../components/Mail/ContactFormMail/ContactFormMail")
);

function assetUrl(input) {
  if (!input) return "/no-image.png";
  let s = String(input).trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(s)) return s;

  const idx = s.toLowerCase().lastIndexOf("uploads/");
  if (idx !== -1) s = s.substring(idx);

  if (s.startsWith("/uploads")) return `${API_BASE}${s}`;
  if (s.startsWith("uploads")) return `${API_BASE}/${s}`;
  return `${API_BASE}/${s.replace(/^\/+/, "")}`;
}

/** Sort dự án mới nhất trước (updatedAt > createdAt) */
function sortNewestFirst(list = []) {
  return [...list].sort(
    (a, b) =>
      new Date(b.updatedAt || b.createdAt || b.date || 0) -
      new Date(a.updatedAt || a.createdAt || a.date || 0)
  );
}

/** Chuẩn hoá gallery kiểu: string / array / object / json-string */
function normalizeGallery(raw, projectName = "") {
  const result = [];
  const pushUrl = (u, alt) => {
    if (!u) return;
    result.push({ url: u, alt: alt || projectName || "" });
  };

  if (!raw) return result;

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((u) => pushUrl(u, projectName));
        return result;
      }
      if (parsed && typeof parsed === "object" && parsed.url) {
        pushUrl(parsed.url, parsed.alt || projectName);
        return result;
      }
    } catch {
      raw
        .split(/[,\n;]/)
        .map((x) => x.trim())
        .filter(Boolean)
        .forEach((u) => pushUrl(u, projectName));
      return result;
    }
  }

  if (Array.isArray(raw)) {
    raw.forEach((g) => {
      if (!g) return;
      if (typeof g === "string") pushUrl(g, projectName);
      else if (g.url) pushUrl(g.url, g.alt || projectName);
    });
    return result;
  }

  if (raw && typeof raw === "object" && raw.url) {
    pushUrl(raw.url, raw.alt || projectName);
  }

  return result;
}

function extractImagesFromProject(p) {
  if (!p) return [];
  const list = [];
  const name = p.name || "";

  ["image", "cover", "thumbnail", "thumb", "mainImage", "coverImage"].forEach(
    (field) => {
      if (p[field]) list.push({ url: p[field], alt: name });
    }
  );

  ["gallery", "images", "photos", "imgs"].forEach((field) => {
    if (p[field]) list.push(...normalizeGallery(p[field], name));
  });

  const seen = new Set();
  const unique = [];
  for (const it of list) {
    const abs = assetUrl(it.url);
    if (seen.has(abs)) continue;
    seen.add(abs);
    unique.push({ ...it, url: abs });
  }
  return unique;
}

/** ✅ Chỉ load ContactForm khi người dùng scroll gần cuối */
function LazyContactFormOnView() {
  const [show, setShow] = useState(false);
  const holderRef = useRef(null);

  useEffect(() => {
    if (show) return;
    const el = holderRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" } // nhìn thấy trước khi tới form
    );

    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={holderRef}>
      {show ? (
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      ) : (
        // giữ chỗ để tránh CLS (form thường cao)
        <div style={{ minHeight: 420 }} />
      )}
    </div>
  );
}

export default function Con_Du_An() {
  const PAGE_SIZE = 9;
  const API_LIMIT = 200;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [curr, setCurr] = useState(0);
  const startXRef = useRef(null);

  const [thumbReady, setThumbReady] = useState(false);

  // ✅ mở modal bằng transition: click phản hồi nhanh hơn => giảm INP
  const openProject = useCallback((p) => {
    startTransition(() => setSelected(p));
  }, []);

  // load data: sort + phân trang
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const cacheKey = `cache_projects_full_list_v3`; // bump version
        const cacheTimeKey = `${cacheKey}_time`;
        const cache = sessionStorage.getItem(cacheKey);
        const cacheTime = sessionStorage.getItem(cacheTimeKey);

        const isCacheValid =
          cache && cacheTime && Date.now() - Number(cacheTime) < 3 * 60 * 1000;

        let full = [];

        if (isCacheValid) {
          try {
            const parsed = JSON.parse(cache);
            full = sortNewestFirst(
              (parsed?.list || []).filter((p) => !!p?.name)
            );
          } catch {
            sessionStorage.removeItem(cacheKey);
            sessionStorage.removeItem(cacheTimeKey);
            full = [];
          }
        }

        if (!full.length) {
          const res = await getProjectsPage({
            page: 1,
            limit: API_LIMIT,
            timeout: 12000,
            signal: controller.signal,
          });

          full = sortNewestFirst((res?.list || []).filter((p) => !!p?.name));
          sessionStorage.setItem(cacheKey, JSON.stringify({ list: full }));
          sessionStorage.setItem(cacheTimeKey, String(Date.now()));
        }

        if (!mounted) return;

        const total = full.length;
        const tp = Math.max(1, Math.ceil(total / PAGE_SIZE));
        const pageSafe = Math.min(Math.max(1, page), tp);

        const start = (pageSafe - 1) * PAGE_SIZE;
        const paged = full.slice(start, start + PAGE_SIZE);

        setProjects(paged);
        setTotalPages(tp);

        if (page !== pageSafe) setPage(pageSafe);
      } catch {
        if (mounted) {
          setProjects([]);
          setTotalPages(1);
        }
      } finally {
        mounted && setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [page]);

  // ✅ delay thumbs: tránh mở modal bị dựng nhiều DOM ngay lập tức
  useEffect(() => {
    if (!selected) return;
    setThumbReady(false);

    const idle =
      window.requestIdleCallback ||
      ((cb) => window.setTimeout(() => cb({ didTimeout: true }), 120));

    const cancel =
      window.cancelIdleCallback || ((id) => window.clearTimeout(id));

    const id = idle(() => setThumbReady(true), { timeout: 200 });
    return () => cancel(id);
  }, [selected]);

  const imagesByKey = useMemo(() => {
    const map = new Map();
    for (const p of projects) {
      const key = p?._id || p?.id || p?.slug || p?.name;
      map.set(key, extractImagesFromProject(p));
    }
    return map;
  }, [projects]);

  const visibleProjects = useMemo(() => {
    if (loading) return Array.from({ length: PAGE_SIZE }).map(() => null);
    return projects;
  }, [projects, loading]);

  const slides = useMemo(() => {
    if (!selected) return [];
    const key =
      selected?._id || selected?.id || selected?.slug || selected?.name;
    return imagesByKey.get(key) || extractImagesFromProject(selected);
  }, [selected, imagesByKey]);

  useEffect(() => setCurr(0), [selected]);

  // ✅ preload ảnh next/prev để bấm mượt
  useEffect(() => {
    if (!slides.length) return;

    const next = slides[(curr + 1) % slides.length]?.url;
    const prev = slides[(curr - 1 + slides.length) % slides.length]?.url;

    [next, prev].filter(Boolean).forEach((u) => {
      const img = new Image();
      img.decoding = "async";
      img.src = u;
    });
  }, [curr, slides]);

  const closeModal = useCallback(() => setSelected(null), []);

  const go = useCallback(
    (delta) => {
      if (!slides.length) return;
      setCurr((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    },
    [go, closeModal]
  );

  useEffect(() => {
    if (!selected) return;
    window.addEventListener("keydown", onKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, onKeyDown]);

  const onTouchStart = (e) => {
    startXRef.current = e.touches?.[0]?.clientX ?? 0;
  };
  const onTouchEnd = (e) => {
    const end = e.changedTouches?.[0]?.clientX ?? 0;
    const dx = end - (startXRef.current ?? end);
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startXRef.current = null;
  };

  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const thumbs = useMemo(() => slides.slice(0, 12), [slides]);

  return (
    <section className="cda-wrap">
      <div className="cda-hero">
        <h1>Thư viện Dự án</h1>
        <p>Những công trình tiêu biểu do Nguyễn Hải thiết kế & thi công.</p>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          <div className="cda-grid">
            {visibleProjects.map((p, idx) => {
              if (!p) {
                return (
                  <article key={`sk-${idx}`} className="cda-card">
                    <div className="cda-thumb">
                      <div className="thumb-img sk" />
                    </div>
                    <div className="cda-info">
                      <h3 className="cda-title sk-line" />
                      <p className="cda-desc sk-line" />
                    </div>
                  </article>
                );
              }

              const key = p?._id || p?.id || p?.slug || p?.name;
              const imgs = imagesByKey.get(key) || [];
              const cover = imgs[0]?.url || "/no-image.png";
              const isFirstAboveFold = idx === 0 && pageSafe === 1;

              return (
                <article
                  key={p._id || idx}
                  className="cda-card"
                  onClick={() => openProject(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openProject(p);
                  }}
                >
                  <div className="cda-thumb">
                    <img
                      src={cover}
                      alt={p.name}
                      className="thumb-img"
                      width={480}
                      height={300}
                      loading={isFirstAboveFold ? "eager" : "lazy"}
                      fetchpriority={isFirstAboveFold ? "high" : "low"}
                      fetchPriority={isFirstAboveFold ? "high" : "low"}
                      decoding="async"
                      onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    />
                  </div>

                  <div className="cda-info">
                    <h3 className="cda-title">{p.name}</h3>
                    <p className="cda-desc">
                      {(p.description || "").slice(0, 100)}
                      {p.description && p.description.length > 100 ? "…" : ""}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            className="cda-pagination"
            role="navigation"
            aria-label="Phân trang dự án"
          >
            <button
              className="pg-btn"
              type="button"
              disabled={pageSafe <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹ Trước
            </button>

            <span className="pg-status">
              Trang {pageSafe} / {totalPages}
            </span>

            <button
              className="pg-btn"
              type="button"
              disabled={pageSafe >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Sau ›
            </button>
          </div>
        </>
      )}

      {selected && (
        <div className="cda-modal-backdrop" onClick={closeModal}>
          <div
            className="cda-modal"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button className="modal-close" onClick={closeModal} type="button">
              ✖
            </button>

            <h2 className="cda-modal-h2title">{selected.name}</h2>

            <p className="cde-modal-p">
              <b>Vị trí:</b> {selected.location || "Chưa cập nhật"}
            </p>
            <p className="cde-modal-p">
              <b>Chủ đầu tư:</b> {selected.owner || "—"}
            </p>

            {selected.description ? (
              <p className="cde-modal-p">{selected.description}</p>
            ) : null}

            {slides.length > 0 ? (
              <>
                <div
                  className="cda-modal-slider"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  <button
                    className="cda-sbtn prev"
                    aria-label="Ảnh trước"
                    onClick={() => go(-1)}
                    type="button"
                  >
                    ‹
                  </button>

                  <img
                    className="modal-cover"
                    src={slides[curr].url}
                    alt={slides[curr].alt || selected.name}
                    loading="eager"
                    fetchPriority="high"
                    onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    onClick={() => go(1)}
                  />

                  <button
                    className="cda-sbtn next"
                    aria-label="Ảnh sau"
                    onClick={() => go(1)}
                    type="button"
                  >
                    ›
                  </button>

                  <div className="cda-slide-indicator">
                    {curr + 1} / {slides.length}
                  </div>
                </div>

                {thumbReady && (
                  <div className="cda-thumbs">
                    {thumbs.map((it, i) => (
                      <button
                        key={i}
                        className={`cda-thumb-btn ${
                          i === curr ? "is-active" : ""
                        }`}
                        onClick={() => setCurr(i)}
                        aria-label={`Xem ảnh ${i + 1}`}
                        type="button"
                      >
                        <img
                          src={it.url}
                          alt={it.alt || `${selected.name} - ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          width={120}
                          height={80}
                          style={{ objectFit: "cover" }}
                          onError={(e) =>
                            (e.currentTarget.src = "/no-image.png")
                          }
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="cde-modal-p">
                Hiện dự án này chưa có hình ảnh để hiển thị.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ✅ ContactForm chỉ mount khi gần tới cuối trang => giảm INP/#root/html */}
      <LazyContactFormOnView />
    </section>
  );
}
