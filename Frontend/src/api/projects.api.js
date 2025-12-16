// src/api/projects.api.js

export const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ||
  process.env.REACT_APP_API_BASE ||
  "https://api.nguyenhai.com.vn";

export const API_PROJECTS = `${API_BASE}/api/projects`;

/* ---------------- fetchJson (có timeout) ---------------- */
async function fetchJson(url, { timeout = 10000, signal } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeout);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, json };
  } finally {
    clearTimeout(t);
  }
}

/* ---------------- normalize response (siêu chịu đòn) ---------------- */
function pickArrayCandidate(json) {
  // các kiểu hay gặp
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json)) return json;

  // data nằm sâu
  if (Array.isArray(json?.data?.list)) return json.data.list;
  if (Array.isArray(json?.data?.items)) return json.data.items;
  if (Array.isArray(json?.data?.projects)) return json.data.projects;

  // top-level khác tên
  if (Array.isArray(json?.list)) return json.list;
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(json?.projects)) return json.projects;

  return [];
}

function pickMeta(json) {
  return (
    json?.meta ||
    json?.pagination ||
    json?.data?.meta ||
    json?.data?.pagination ||
    {}
  );
}

function toNumber(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function normalizeProjectsResponse(json, fallbackPage = 1, fallbackLimit = 9) {
  const list = pickArrayCandidate(json);
  const meta = pickMeta(json);

  const total =
    toNumber(json?.total, 0) ||
    toNumber(meta?.total, 0) ||
    toNumber(meta?.totalItems, 0) ||
    toNumber(meta?.count, 0) ||
    list.length;

  const page =
    toNumber(json?.page, 0) ||
    toNumber(meta?.page, 0) ||
    toNumber(meta?.currentPage, 0) ||
    fallbackPage;

  const limit =
    toNumber(json?.limit, 0) ||
    toNumber(meta?.limit, 0) ||
    toNumber(meta?.perPage, 0) ||
    toNumber(meta?.pageSize, 0) ||
    fallbackLimit;

  const totalPages =
    toNumber(json?.totalPages, 0) ||
    toNumber(meta?.totalPages, 0) ||
    toNumber(meta?.pages, 0) ||
    Math.max(1, Math.ceil(total / limit));

  return { list, total, page, limit, totalPages };
}

/* ---------------- API: phân trang ?page&limit ---------------- */
export async function fetchProjectsPage({
  page = 1,
  limit = 9,
  timeout = 10000,
  signal,
} = {}) {
  const url = new URL(API_PROJECTS);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const { ok, status, json } = await fetchJson(url.toString(), {
    timeout,
    signal,
  });

  // nếu server trả lỗi, trả list rỗng + status để bạn debug
  const norm = normalizeProjectsResponse(json, page, limit);
  return { ok, status, ...norm, raw: json };
}

/* alias đúng theo tên bạn đang import */
export const getProjectsPage = fetchProjectsPage;

/* ---------------- API: home featured ---------------- */
export async function getFeaturedProjects({
  limit = 8,
  timeout = 10000,
  signal,
} = {}) {
  // gọi page 1, lấy nhiều hơn 1 chút để sort/slice an toàn
  const { list } = await fetchProjectsPage({
    page: 1,
    limit: Math.max(limit, 8),
    timeout,
    signal,
  });

  const normalized = (list || [])
    .filter((p) => !!p?.name)
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0)
    )
    .slice(0, limit);

  return { list: normalized };
}
