export const stripHtml = (html = "") => {
  // an toàn nếu lỡ chạy môi trường không có document
  if (typeof document === "undefined")
    return String(html || "").replace(/<[^>]*>/g, "");
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
};

export const normalizeImg = (p, size = 900) => {
  let cand =
    p?.cover_image ??
    p?.avatar_blog ??
    p?.thumbnail ??
    p?.image ??
    p?.images ??
    "";

  if (Array.isArray(cand)) cand = cand[0];
  if (cand && typeof cand === "object") {
    cand = cand.url || cand.src || cand.path || cand.href || cand.link || "";
  }

  let u = String(cand || "").trim();
  if (!u) return "https://placehold.co/900x600?text=Nguyen+Hai+Design";

  if (u.startsWith("//")) u = "https:" + u;
  if (u.startsWith("/")) u = "https://api.nguyenhai.com.vn" + u;
  u = u.replace(/^http:\/\//i, "https://");

  // nhẹ ảnh
  if (u.includes("api.nguyenhai.com.vn")) {
    const hasQuery = u.includes("?");
    return `${u}${hasQuery ? "&" : "?"}w=${size}&q=70&fm=webp`;
  }
  return u;
};

export const getCateNames = (p) =>
  (p?.categoryIds || []).map((c) => c?.name || c?.title).filter(Boolean);

export const buildQuery = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) v.forEach((x) => q.append(k, x));
    else q.append(k, v);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
};

export const withinDays = (dateLike, days) => {
  const t = new Date(dateLike || 0).getTime();
  if (!t) return false;
  return Date.now() - t < 1000 * 60 * 60 * 24 * days;
};
