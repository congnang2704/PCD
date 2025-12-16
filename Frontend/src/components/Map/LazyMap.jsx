import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Lazy-load Google Map:
 * - Mặc định KHÔNG load iframe -> giảm JS/INP + giảm request
 * - Tự load khi phần map vào viewport (IntersectionObserver)
 * - Hoặc người dùng bấm "Tải bản đồ"
 */
const LazyMap = React.memo(function LazyMap({
  src,
  title = "Google Map",
  height = 500,
  rootMargin = "300px",
}) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const frameStyle = useMemo(
    () => ({ border: 0, width: "100%", height }),
    [height]
  );

  useEffect(() => {
    if (shouldLoad) return;

    const el = ref.current;
    if (!el) return;

    // Nếu browser không hỗ trợ IntersectionObserver -> để click load
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad, rootMargin]);

  return (
    <div className="contact-us-map" ref={ref}>
      {!shouldLoad ? (
        <div className="map-skeleton" style={{ height }}>
          <div className="map-skeleton-inner">
            <div className="map-skeleton-title">Bản đồ Google Maps</div>
            <div className="map-skeleton-desc">
              Nhấn để tải bản đồ (giảm lag/INP trên di động).
            </div>

            <button
              type="button"
              className="map-load-btn"
              onClick={() => setShouldLoad(true)}
            >
              Tải bản đồ
            </button>
          </div>
        </div>
      ) : (
        <iframe
          title={title}
          src={src}
          style={frameStyle}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
});

export default LazyMap;
