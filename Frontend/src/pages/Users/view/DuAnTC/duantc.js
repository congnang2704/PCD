// src/pages/Users/view/DuAnTC/duantc.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./duantc.css";
import { API_BASE, getFeaturedProjects } from "../../../../api/projects.api";

/** kiểm tra string có giống đường dẫn ảnh không */
function isLikelyImagePath(str) {
  if (!str || typeof str !== "string") return false;
  const s = str.trim().toLowerCase();
  if (/^https?:\/\//.test(s)) return true;
  if (s.includes("uploads/")) return true;
  if (s.startsWith("/")) return true;
  if (/\.(jpe?g|png|webp|gif|svg)$/i.test(s)) return true;
  return false;
}

/** Chuẩn hoá URL ảnh (GIỮ ĐÚNG để không mất hình) */
function assetUrl(input) {
  if (!input) return "/no-image.png";

  let s = String(input).trim().replace(/\\/g, "/");

  // đã là full link thì giữ nguyên
  if (/^https?:\/\//i.test(s)) return s;

  // nếu path có chứa "uploads/..." ở giữa thì cắt từ đó
  const idx = s.toLowerCase().lastIndexOf("uploads/");
  if (idx !== -1) s = s.substring(idx);

  // Chuẩn các trường hợp bắt đầu /uploads hoặc uploads
  if (s.startsWith("/uploads")) return `${API_BASE}${s}`;
  if (s.startsWith("uploads")) return `${API_BASE}/${s}`;

  // Còn lại: coi như relative path gốc server
  return `${API_BASE}/${s.replace(/^\/+/, "")}`;
}

/** Đệ quy tìm field có url ảnh trong object gallery */
function deepFindImage(obj, depth = 0) {
  if (!obj || depth > 3) return "";

  if (typeof obj === "string") {
    return isLikelyImagePath(obj) ? obj : "";
  }

  if (typeof obj === "object") {
    const directKeys = ["url", "image", "src", "path", "file", "filename"];
    for (const key of directKeys) {
      const v = obj[key];
      if (typeof v === "string" && isLikelyImagePath(v)) return v;
      if (v && typeof v === "object") {
        const fromChild = deepFindImage(v, depth + 1);
        if (fromChild) return fromChild;
      }
    }

    for (const v of Object.values(obj)) {
      if (!v) continue;
      const found = deepFindImage(v, depth + 1);
      if (found) return found;
    }
  }

  return "";
}

function getGalleryUrl(item) {
  if (!item) return "";
  if (typeof item === "string") return isLikelyImagePath(item) ? item : "";
  return deepFindImage(item);
}

/* ====== STATUS COLORS ====== */
const STATUS_STYLE = {
  "thiết kế": "badge-blue",
  "xây dựng": "badge-orange",
  "hoàn thành": "badge-green",
  "đã công bố": "badge-gray",
};

export default function HomeProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const railRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);

        // cache 10 phút
        const cache = localStorage.getItem("cache_projects_featured");
        const cacheTime = localStorage.getItem("cache_projects_featured_time");

        if (
          cache &&
          cacheTime &&
          Date.now() - Number(cacheTime) < 10 * 60 * 1000
        ) {
          if (mounted) {
            setProjects(JSON.parse(cache));
            setLoading(false);
          }
          return;
        }

        const { list } = await getFeaturedProjects({
          limit: 8,
          timeout: 8000,
          signal: controller.signal,
        });

        if (!mounted) return;
        setProjects(list || []);

        localStorage.setItem(
          "cache_projects_featured",
          JSON.stringify(list || [])
        );
        localStorage.setItem(
          "cache_projects_featured_time",
          String(Date.now())
        );
      } catch (e) {
        if (mounted) setProjects([]);
      } finally {
        mounted && setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const scrollByCards = (dir = 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const amount = rail.clientWidth * 0.9 * dir;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    let target = rail.scrollLeft + amount;

    if (target < 0) target = maxScroll;
    else if (target > maxScroll) target = 0;

    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  const hasProjects = projects && projects.length > 0;
  const isInitialLoading = loading && !hasProjects;

  const cards = useMemo(() => {
    const source = isInitialLoading ? Array.from({ length: 8 }) : projects;

    return source.map((p, i) => {
      if (isInitialLoading) {
        return (
          <article key={i} className="hp-card hp-card--mini is-loading">
            <div className="hp-thumb">
              <div className="hp-skel hp-skel-thumb" />
            </div>
            <div className="hp-info">
              <div className="hp-skel hp-skel-line w-70" />
              <div className="hp-skel hp-skel-line w-45" />
              <div className="hp-skel hp-skel-line w-90" />
              <div className="hp-skel hp-skel-line w-60" />
            </div>
          </article>
        );
      }

      // GIỮ Y NGUYÊN logic cover để không mất hình
      const coverRaw =
        p?.image ||
        p?.cover ||
        p?.coverImage ||
        (Array.isArray(p?.gallery) && getGalleryUrl(p.gallery[0])) ||
        "";

      const cover = assetUrl(coverRaw);
      const statusClass =
        STATUS_STYLE[(p?.status || "").toLowerCase()] || "badge-gray";

      return (
        <article
          key={p?._id || i}
          className="hp-card hp-card--mini"
          onClick={() => setSelected(p)}
        >
          <div className="hp-thumb">
            <img
              src={cover}
              alt={p?.name || "project"}
              className="hp-img"
              loading="lazy"
              decoding="async"
              onError={(e) => (e.currentTarget.src = "/no-image.png")}
            />
            {p?.status && (
              <span className={`hp-badge ${statusClass}`}>{p.status}</span>
            )}
          </div>

          <div className="hp-info">
            <h3 className="hp-title">{p.name}</h3>
            <div className="hp-meta">
              <span>📍 {p?.location || "Việt Nam"}</span>
              {p?.owner ? <span>🏢 {p.owner}</span> : null}
            </div>
            <p className="hp-desc">
              {(p?.description || "").slice(0, 90)}
              {p?.description?.length > 90 ? "…" : ""}
            </p>
            <div className="hp-actions">
              <button
                className="hp-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(p);
                }}
              >
                Xem nhanh
              </button>
            </div>
          </div>
        </article>
      );
    });
  }, [projects, isInitialLoading]);

  const [curr, setCurr] = useState(0);
  useEffect(() => setCurr(0), [selected]);

  const slides = useMemo(() => {
    if (!selected) return [];

    const rawCandidates = [];
    const main = selected.image || selected.cover || selected.coverImage || "";
    if (isLikelyImagePath(main)) rawCandidates.push(main);

    if (Array.isArray(selected.gallery)) {
      selected.gallery.forEach((g) => {
        const url = getGalleryUrl(g);
        if (isLikelyImagePath(url)) rawCandidates.push(url);
      });
    }

    const seen = new Set();
    return rawCandidates
      .filter(Boolean)
      .map((u) => assetUrl(u))
      .filter((abs) => {
        if (seen.has(abs)) return false;
        seen.add(abs);
        return true;
      });
  }, [selected]);

  const go = (delta) => {
    if (!slides.length) return;
    setCurr((i) => (i + delta + slides.length) % slides.length);
  };

  return (
    <section className="hp-wrap">
      <div className="hp-head">
        <h2 className="hp-h2">Dự án nổi bật</h2>
      </div>

      <div className="hp-subtitle-row">
        {isInitialLoading ? (
          <div className="hp-loading-chip">
            <span className="hp-loading-dot" />
            Đang tải các dự án thực tế của Nguyễn Hải…
          </div>
        ) : (
          <p className="hp-subtext">
            Một số công trình tiêu biểu mà Nguyễn Hải đã thiết kế & thi công.
          </p>
        )}
      </div>

      <div className="hp-slider">
        <button
          className="hp-nav hp-nav--prev"
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Dự án trước"
        >
          ‹
        </button>

        <div className="hp-rail" ref={railRef}>
          {cards}
        </div>

        <button
          className="hp-nav hp-nav--next"
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Dự án tiếp theo"
        >
          ›
        </button>
      </div>

      <div className="hp-more-row">
        <a className="hp-more-link" href="/du-an" aria-label="Xem tất cả dự án">
          Xem tất cả dự án →
        </a>
      </div>

      {selected && (
        <div className="hp-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="hp-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="hp-modal-close"
              onClick={() => setSelected(null)}
              type="button"
            >
              ✖
            </button>

            <h3 className="hp-modal-title">{selected.name}</h3>

            <div className="hp-modal-meta">
              {selected.status ? (
                <span
                  className={`hp-badge ${
                    STATUS_STYLE[(selected.status || "").toLowerCase()] ||
                    "badge-gray"
                  }`}
                >
                  {selected.status}
                </span>
              ) : null}
              {selected.location ? <span>📍 {selected.location}</span> : null}
              {selected.owner ? <span>🏢 {selected.owner}</span> : null}
            </div>

            {slides.length > 0 ? (
              <>
                <div className="hp-modal-slider">
                  <button
                    className="hp-sbtn prev"
                    onClick={() => go(-1)}
                    type="button"
                  >
                    ‹
                  </button>

                  <img
                    key={curr}
                    className="hp-modal-cover"
                    src={slides[curr]}
                    alt={selected.name}
                    onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    onClick={() => go(1)}
                  />

                  <button
                    className="hp-sbtn next"
                    onClick={() => go(1)}
                    type="button"
                  >
                    ›
                  </button>

                  <div className="hp-slide-indicator">
                    {curr + 1} / {slides.length}
                  </div>
                </div>

                <div className="hp-thumbs">
                  {slides.map((u, i) => (
                    <button
                      key={i}
                      className={`hp-thumb-btn ${
                        i === curr ? "is-active" : ""
                      }`}
                      onClick={() => setCurr(i)}
                      type="button"
                    >
                      <img
                        src={u}
                        alt=""
                        onError={(e) => (e.currentTarget.src = "/no-image.png")}
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="hp-modal-empty">
                Hiện dự án này chưa có hình ảnh để hiển thị.
              </div>
            )}

            <div className="hp-modal-actions">
              <a className="hp-btn" href="/du-an">
                Tới trang dự án
              </a>
              <button
                className="hp-btn ghost"
                onClick={() => setSelected(null)}
                type="button"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
