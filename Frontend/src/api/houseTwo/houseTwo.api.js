import { API_BLOGS, CATEGORY_NAME } from "./constants";
import { buildQuery, getCateNames } from "./houseTwo.utils";

export async function fetchHouseTwoPosts({ signal } = {}) {
  const qs = buildQuery({
    status: "published",
    sort: "-published_at,-created_at",
    limit: 400,
    fields:
      "title,slug,thumbnail,cover_image,avatar_blog,description,is_active,status,categoryIds.name,categoryIds.title,published_at,created_at",
  });

  const res = await fetch(API_BLOGS + qs, {
    signal,
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

  return filtered;
}
