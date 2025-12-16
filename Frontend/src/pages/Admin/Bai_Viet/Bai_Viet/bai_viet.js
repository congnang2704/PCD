// src/pages/admin/blogs/bai_viet.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./bai_viet.css";

const API_BASE = "https://api.nguyenhai.com.vn/api/blogs";

/* ================= Utils ================= */
function toLocalISO(dt) {
  if (!dt) return "";
  try {
    return new Date(dt).toLocaleString("vi-VN");
  } catch {
    return "";
  }
}
const buildQuery = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    qs.append(k, v);
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
};
const readJson = async (url, signal) => {
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Fetch ${res.status}`);
  return res.json().catch(() => ({}));
};

/** SWR-lite: cache 30s theo query (an toàn quota) */
const swrGet = async (cacheKey, url, signal, setter) => {
  const tsKey = `${cacheKey}:ts`;
  const now = Date.now();
  const last = Number(sessionStorage.getItem(tsKey) || 0);
  const cached = sessionStorage.getItem(cacheKey);

  if (cached && now - last < 30_000) {
    try {
      setter(JSON.parse(cached));
    } catch {}
  }

  const fresh = await readJson(url, signal);
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(fresh));
    sessionStorage.setItem(tsKey, String(Date.now()));
  } catch (err) {
    // Tránh crash khi vượt quota
    console.warn("sessionStorage quota exceeded, skip cache.", err);
  }
  setter(fresh);
};

/* ================= Page ================= */
const BaiViet = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(false);

  // Phân trang
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce 300ms cho ô search
  const [qDeb, setQDeb] = useState("");
  const debTimer = useRef(null);
  useEffect(() => {
    clearTimeout(debTimer.current);
    debTimer.current = setTimeout(() => setQDeb(q.trim()), 300);
    return () => clearTimeout(debTimer.current);
  }, [q]);

  // Query string gọn (KHÔNG dùng fields để tránh BE không hỗ trợ)
  const queryString = useMemo(() => {
    const base = {
      page,
      limit,
      q: qDeb || undefined,
      status: status || undefined,
      active: active || undefined,
      sort: "-published_at,-created_at",
    };
    return buildQuery(base).slice(1); // bỏ dấu ?
  }, [page, limit, qDeb, status, active]);

  const abortRef = useRef(null);

  const fetchData = async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    try {
      const url = `${API_BASE}?${queryString}`;
      const cacheKey = `bv:${queryString}`;

      const put = (data) => {
        // Chuẩn hoá các kiểu đáp ứng khác nhau
        let list = [];
        let pages = 1;

        if (Array.isArray(data)) {
          list = data;
          pages = 1;
        } else {
          list =
            data?.items ??
            data?.data ??
            data?.results ??
            (Array.isArray(data) ? data : []);
          const total =
            data?.pagination?.total ??
            data?.total ??
            (Array.isArray(list) ? list.length : 0);
          pages =
            data?.pagination?.pages ??
            data?.pages ??
            Math.max(1, Math.ceil(total / limit));
        }

        setItems(Array.isArray(list) ? list : []);
        setTotalPages(pages || 1);
      };

      await swrGet(cacheKey, url, ac.signal, put);
    } catch (e) {
      if (e.name !== "AbortError") console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  /* ============== Actions ============== */
  const handleDelete = async (id) => {
    if (!window.confirm("Xoá bài viết này?")) return;
    const prev = items;
    setItems((arr) => arr.filter((x) => x._id !== id));
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchData(); // refetch để tránh hụt dòng
    } catch (e) {
      alert("Xoá thất bại!");
      console.error(e);
      setItems(prev);
    }
  };

  const toggleActive = async (id, current) => {
    const prev = items;
    setItems((arr) =>
      arr.map((x) => (x._id === id ? { ...x, is_active: !current } : x))
    );
    try {
      const res = await fetch(`${API_BASE}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !current }),
      });
      if (!res.ok) throw new Error("Toggle failed");
    } catch (e) {
      console.error(e);
      setItems(prev);
    }
  };

  const publish = async (id, publish) => {
    const prev = items;
    setItems((arr) =>
      arr.map((x) =>
        x._id === id ? { ...x, status: publish ? "published" : "draft" } : x
      )
    );
    try {
      const res = await fetch(`${API_BASE}/${id}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish }),
      });
      if (!res.ok) throw new Error("Publish failed");
    } catch (e) {
      console.error(e);
      setItems(prev);
    }
  };

  return (
    <div className="bv-container">
      <div className="bv-header">
        <h1 className="header-title-h1">Bài viết</h1>
        <div className="bv-actions">
          <Link to="/haiadmin/add-bai-viet" className="btn primary">
            + Thêm bài viết
          </Link>
        </div>
      </div>

      <div className="bv-filters">
        <input
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          placeholder="Tìm theo tiêu đề…"
        />
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="draft">Nháp</option>
          <option value="published">Đã xuất bản</option>
        </select>
        <select
          value={active}
          onChange={(e) => {
            setPage(1);
            setActive(e.target.value);
          }}
        >
          <option value="">Active?</option>
          <option value="true">Đang bật</option>
          <option value="false">Đang tắt</option>
        </select>
        <button
          className="btn-loc"
          onClick={() => {
            setPage(1);
            fetchData(); // revalidate ngay
          }}
        >
          Lọc
        </button>
      </div>

      <div className="bv-table-wrap">
        <table className="bv-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tiêu đề</th>
              <th>Trạng thái</th>
              <th>Active</th>
              <th>Danh mục</th>
              <th>Tạo lúc</th>
              <th width="1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="center">
                  Đang tải…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="center">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              items.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="thumb">
                      {b.cover_image ? (
                        <img src={b.cover_image} alt={b.title} loading="lazy" />
                      ) : (
                        <div className="noimg">No image</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="title">
                      <div className="t1">{b.title}</div>
                      <div className="slug">/{b.slug}</div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        b.status === "published" ? "green" : "gray"
                      }`}
                    >
                      {b.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`chip ${b.is_active ? "on" : "off"}`}
                      onClick={() => toggleActive(b._id, b.is_active)}
                    >
                      {b.is_active ? "Bật" : "Tắt"}
                    </button>
                  </td>
                  <td className="cats">
                    {(b.categoryIds || []).map((c, idx) => (
                      <span key={idx} className="cat-badge">
                        {c?.name || c?.title || c}
                      </span>
                    ))}
                  </td>
                  <td>{toLocalISO(b.created_at)}</td>
                  <td className="row-actions">
                    <button
                      className="btn-pub ghost"
                      onClick={() => publish(b._id, b.status !== "published")}
                    >
                      {b.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="btn-sua"
                      onClick={() =>
                        navigate(`/haiadmin/edit-bai-viet/${b._id}`)
                      }
                    >
                      Sửa
                    </button>
                    <button
                      className="btn-xoa danger"
                      onClick={() => handleDelete(b._id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ← Trước
        </button>
        <span>
          Trang {page}/{totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Sau →
        </button>
      </div>
    </div>
  );
};

export default BaiViet;
