import React, { useEffect, useMemo, useState } from "react";
import "./Container_Services.css";
import { Grid } from "antd";
import { useNavigate } from "react-router-dom";

import ContactForm from "../../../../components/Mail/ContactFormMail/ContactFormMail";
import FAQComponent from "../../view/FAQComponent/FAQComponent";
import DQKH from "../../view/DanhGiaKH/DanhGiaKH";

import Hero from "../../../../components/Service/Hero";
import ServiceGroups from "../../../../components/Service/ServiceGroups";
import Process from "../../../../components/Service/Process";
import Packages from "../../../../components/Service/Packages";
import BlogGrid from "../../../../components/Service/BlogGrid";

const { useBreakpoint } = Grid;

const API_BLOGS = "https://api.nguyenhai.com.vn/api/blogs";

// 5 category theo tên
const ALLOWED_CATEGORY_NAMES = [
  "Thiết kế kiến trúc",
  "Thi công công trình thô",
  "Thi công công trình hoàn thiện",
  "Thi công xây nhà trọn gói",
  "Thiết kế nội thất",
];

const norm = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const ALLOWED_SET = new Set(ALLOWED_CATEGORY_NAMES.map(norm));

const getPostImage = (p) =>
  p?.cover_image || p?.avatar_blog || p?.thumbnail || "/default.jpg";

const getPostCateNames = (p) =>
  (p?.categoryIds || []).map((c) => c?.name || c?.title || "").filter(Boolean);

export default function Services() {
  useBreakpoint(); // giữ cho consistent nếu bạn cần screens sau này
  const navigate = useNavigate();

  const [sourcePosts, setSourcePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cateFilter, setCateFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const cacheKey = "svc-blogs:v3";
        const cacheTsKey = cacheKey + ":ts";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(cacheTsKey) || 0);
        const cached = sessionStorage.getItem(cacheKey);

        if (cached && now - last < 60 * 1000) {
          if (alive) {
            setSourcePosts(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        const q = buildQuery({
          status: "published",
          sort: "-published_at,-created_at",
          limit: 300,
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
            (p) =>
              (p?.status || "").toLowerCase() === "published" &&
              p?.is_active !== false
          )
          .filter((p) =>
            getPostCateNames(p).some((n) => ALLOWED_SET.has(norm(n)))
          )
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
          setSourcePosts(filtered);
          sessionStorage.setItem(cacheKey, JSON.stringify(filtered));
          sessionStorage.setItem(cacheTsKey, String(now));
        }
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Lỗi khi load blogs:", err);
        if (alive) setSourcePosts([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  const filteredByCate = useMemo(() => {
    if (cateFilter === "ALL") return sourcePosts;
    const key = norm(cateFilter);
    return sourcePosts.filter((p) =>
      getPostCateNames(p).some((n) => norm(n) === key)
    );
  }, [sourcePosts, cateFilter]);

  useEffect(() => setCurrentPage(1), [cateFilter]);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredByCate.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const onScrollToPosts = () => {
    const el = document.getElementById("svc-posts");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onOpenPost = (slug) => navigate(`/dich-vu/${slug}`);

  return (
    <div className="svc-page">
      <Hero onScrollToPosts={onScrollToPosts} />

      <div className="svc-container">
        <ServiceGroups />
        <BlogGrid
          loading={loading}
          currentPosts={currentPosts}
          filteredTotal={filteredByCate.length}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          cateFilter={cateFilter}
          setCateFilter={setCateFilter}
          allowedCategories={ALLOWED_CATEGORY_NAMES}
          getPostImage={getPostImage}
          onOpenPost={onOpenPost}
        />
        <Process />

        <Packages />

        <FAQComponent />
        <ContactForm />
        <DQKH />
      </div>
    </div>
  );
}
