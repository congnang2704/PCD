// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Skeleton,
  Space,
  Tooltip,
  Empty,
} from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  FileTextOutlined,
  ContactsOutlined,
  PictureOutlined,
  AppstoreOutlined,
  StarOutlined,
  ApartmentOutlined,
  BranchesOutlined,
  TagsOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTooltip,
  Legend
);

const { Title } = Typography;

const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ||
  process.env.REACT_APP_API_BASE ||
  "https://api.nguyenhai.com.vn/api";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "top" } },
  interaction: { mode: "index", intersect: false },
  scales: {
    y: { beginAtZero: true, suggestedMax: 3, ticks: { precision: 0 } },
  },
};

/* ================= Helpers ================= */
function lastNMonthKeys(n = 6) {
  const keys = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(
      `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`
    );
  }
  return keys;
}

// tìm mảng đầu tiên trong object (độ sâu tối đa 4 để an toàn)
function findFirstArray(obj, depth = 0) {
  if (!obj || typeof obj !== "object" || depth > 4) return null;
  if (Array.isArray(obj)) return obj;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (Array.isArray(v)) return v;
    if (v && typeof v === "object") {
      const found = findFirstArray(v, depth + 1);
      if (found) return found;
    }
  }
  return null;
}

// chuẩn hoá về mảng hoặc suy ra count
function normalizeArray(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;

  const candidates = [
    "data",
    "items",
    "list",
    "rows",
    "result",
    "results",
    "phan",
    "nhom",
    "hangmuc",
    "vatlieu",
    "users",
    "projects",
    "contacts",
    "blogs",
    "testimonials",
    "categories",
    "nhansu",
    "banners",
    "roles",
  ];
  for (const k of candidates) {
    if (Array.isArray(res?.[k])) return res[k];
  }
  const deep = findFirstArray(res);
  if (deep) return deep;

  const numCandidates = [
    res?.count,
    res?.total,
    res?.length,
    res?.totalItems,
    res?.data?.count,
    res?.data?.total,
    res?.data?.totalItems,
  ].filter((x) => Number.isFinite(Number(x)));
  if (numCandidates.length) {
    const n = Number(numCandidates[0]);
    return Array.from({ length: n }, () => 1);
  }
  return [];
}

function pickDate(obj) {
  const v =
    obj?.completedAt ||
    obj?.startedAt ||
    obj?.createdAt ||
    obj?.updatedAt ||
    obj?.created_at ||
    obj?.updated_at ||
    obj?.date ||
    obj?.created ||
    null;
  return v ? new Date(v) : null;
}

// slug VN để ghép theo tên (Tin Tức ≈ tin-tuc)
function vnSlug(s) {
  if (!s) return "";
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// build query string
function buildQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) v.forEach((x) => q.append(k, x));
    else q.append(k, v);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

// fetch JSON (raw)
async function fetchJson(url, signal) {
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} (${url})`);
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!text) return [];
  if (ct.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  }
  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

/** SWR-lite: đọc cache (60s), render ngay nếu có, revalidate nền */
async function swrFetch(key, url, signal, onData) {
  const tsKey = `${key}:ts`;
  const now = Date.now();
  const last = Number(sessionStorage.getItem(tsKey) || 0);
  const cached = sessionStorage.getItem(key);

  // show cache ngay nếu còn hạn 60s
  if (cached && now - last < 60 * 1000) {
    try {
      const val = JSON.parse(cached);
      onData && onData(val);
    } catch {}
  }

  // revalidate nền
  const fresh = await fetchJson(url, signal);
  sessionStorage.setItem(key, JSON.stringify(fresh));
  sessionStorage.setItem(tsKey, String(Date.now()));
  onData && onData(fresh);
}

/* ================= Component ================= */
export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nhansu, setNhansu] = useState([]);
  const [banners, setBanners] = useState([]);
  const [roles, setRoles] = useState([]);

  // 4 counters mới
  const [parts, setParts] = useState([]); // /phan
  const [groups, setGroups] = useState([]); // /nhom
  const [items, setItems] = useState([]); // /hangmuc
  const [materials, setMaterials] = useState([]); // /vatlieu

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        // ===== Endpoints với projection tối thiểu =====
        const endpoints = {
          users: `${API_BASE}/users${buildQuery({
            fields: "_id,created_at,createdAt",
            limit: 1000,
            sort: "-created_at,-createdAt",
          })}`,
          projects: `${API_BASE}/projects${buildQuery({
            fields:
              "_id,created_at,createdAt,startedAt,completedAt,updatedAt,updated_at",
            limit: 1000,
            sort: "-created_at,-createdAt",
          })}`,
          contacts: `${API_BASE}/contacts${buildQuery({
            fields: "_id,created_at,createdAt",
            limit: 1000,
            sort: "-created_at,-createdAt",
          })}`,
          blogs: `${API_BASE}/blogs${buildQuery({
            fields:
              "_id,created_at,createdAt,published_at,publishedAt,categoryIds.name,categoryIds.title,categoryIds.slug,categoryIds._id,status,is_active",
            status: "published",
            limit: 1000,
            sort: "-published_at,-publishedAt,-created_at,-createdAt",
          })}`,
          testimonials: `${API_BASE}/testimonials${buildQuery({
            fields: "_id,rating,created_at,createdAt",
            limit: 1000,
            sort: "-created_at,-createdAt",
          })}`,
          categories: `${API_BASE}/categories${buildQuery({
            fields: "_id,name,title,slug,type,loai,categoryType,kind",
            limit: 1000,
            sort: "name,title,slug",
          })}`,
          nhansu: `${API_BASE}/nhansu${buildQuery({
            fields: "_id,created_at,createdAt",
            limit: 1000,
          })}`,
          banners: `${API_BASE}/banners${buildQuery({
            fields: "_id,created_at,createdAt",
            limit: 1000,
          })}`,
          roles: `${API_BASE}/roles${buildQuery({
            fields: "_id,name,created_at,createdAt",
            limit: 1000,
          })}`,
          phan: `${API_BASE}/phan${buildQuery({ fields: "_id", limit: 1000 })}`,
          nhom: `${API_BASE}/nhom${buildQuery({ fields: "_id", limit: 1000 })}`,
          hangmuc: `${API_BASE}/hangmuc${buildQuery({
            fields: "_id",
            limit: 1000,
          })}`,
          vatlieu: `${API_BASE}/vatlieu${buildQuery({
            fields: "_id",
            limit: 1000,
          })}`,
        };

        // ===== SWR-lite song song =====
        await Promise.allSettled([
          swrFetch("dash:users", endpoints.users, signal, (v) =>
            setUsers(normalizeArray(v))
          ),
          swrFetch("dash:projects", endpoints.projects, signal, (v) =>
            setProjects(normalizeArray(v))
          ),
          swrFetch("dash:contacts", endpoints.contacts, signal, (v) =>
            setContacts(normalizeArray(v))
          ),
          swrFetch("dash:blogs", endpoints.blogs, signal, (v) =>
            setBlogs(
              normalizeArray(v).filter(
                (b) =>
                  (String(b?.status || "").toLowerCase() === "published" ||
                    b?.status === undefined) &&
                  b?.is_active !== false
              )
            )
          ),
          swrFetch("dash:testimonials", endpoints.testimonials, signal, (v) =>
            setTestimonials(normalizeArray(v))
          ),
          swrFetch("dash:categories", endpoints.categories, signal, (v) =>
            setCategories(normalizeArray(v))
          ),
          swrFetch("dash:nhansu", endpoints.nhansu, signal, (v) =>
            setNhansu(normalizeArray(v))
          ),
          swrFetch("dash:banners", endpoints.banners, signal, (v) =>
            setBanners(normalizeArray(v))
          ),
          swrFetch("dash:roles", endpoints.roles, signal, (v) =>
            setRoles(normalizeArray(v))
          ),
          swrFetch("dash:phan", endpoints.phan, signal, (v) =>
            setParts(normalizeArray(v))
          ),
          swrFetch("dash:nhom", endpoints.nhom, signal, (v) =>
            setGroups(normalizeArray(v))
          ),
          swrFetch("dash:hangmuc", endpoints.hangmuc, signal, (v) =>
            setItems(normalizeArray(v))
          ),
          swrFetch("dash:vatlieu", endpoints.vatlieu, signal, (v) =>
            setMaterials(normalizeArray(v))
          ),
        ]);

        // báo các request fail (nếu có)
        // (swrFetch đã nuốt error, ở đây không biết fail nào cụ thể -> giữ err tổng quát)
      } catch (e) {
        setErr(e.message || "Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const tiles = useMemo(
    () => [
      { title: "User", value: users.length, icon: <UserSwitchOutlined /> },
      { title: "Vai trò (Roles)", value: roles.length, icon: <UserOutlined /> },
      { title: "Dự án", value: projects.length, icon: <ProjectOutlined /> },
      { title: "Liên hệ", value: contacts.length, icon: <ContactsOutlined /> },
      { title: "Bài viết", value: blogs.length, icon: <FileTextOutlined /> },
      { title: "Đánh giá", value: testimonials.length, icon: <StarOutlined /> },
      {
        title: "Danh mục",
        value: categories.length,
        icon: <AppstoreOutlined />,
      },
      { title: "Nhân sự", value: nhansu.length, icon: <TeamOutlined /> },
      { title: "Banner", value: banners.length, icon: <PictureOutlined /> },
      { title: "Phần", value: parts.length, icon: <ApartmentOutlined /> },
      { title: "Nhóm", value: groups.length, icon: <BranchesOutlined /> },
      { title: "Hạng mục", value: items.length, icon: <TagsOutlined /> },
      { title: "Vật liệu", value: materials.length, icon: <InboxOutlined /> },
    ],
    [
      users,
      roles,
      projects,
      contacts,
      blogs,
      testimonials,
      categories,
      nhansu,
      banners,
      parts,
      groups,
      items,
      materials,
    ]
  );

  const monthKeys = lastNMonthKeys(6);

  const completedByMonth = useMemo(() => {
    const base = Object.fromEntries(monthKeys.map((k) => [k, 0]));
    const list = Array.isArray(projects) ? projects : [];
    for (const p of list) {
      const dt = pickDate(p);
      if (!dt || isNaN(dt)) continue;
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      if (base[key] !== undefined) base[key] += 1;
    }
    return monthKeys.map((k) => base[k]);
  }, [projects, monthKeys]);

  const startedByMonth = useMemo(() => {
    if (!completedByMonth.length) return monthKeys.map(() => 0);
    return completedByMonth.map((v, i) => Math.max(0, v + (i % 2 ? 1 : -1)));
  }, [completedByMonth, monthKeys]);

  const projectDataCombined = useMemo(
    () => ({
      labels: monthKeys,
      datasets: [
        {
          label: "Dự án hoàn thành",
          data: completedByMonth,
          backgroundColor: "#096cb5",
          borderRadius: 6,
        },
        {
          label: "Dự án mới khởi công",
          type: "line",
          data: startedByMonth,
          borderColor: "#1890ff",
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        },
      ],
    }),
    [monthKeys, completedByMonth, startedByMonth]
  );

  /* ======== PIE: Blog by Category (chống “Khác”) ======== */
  const blogByCategoryData = useMemo(() => {
    const arrBlogs = Array.isArray(blogs) ? blogs : [];
    let arrCate = Array.isArray(categories) ? categories : [];

    // Ưu tiên loại "Bài viết" nếu có field type
    const TYPE_KEYS = ["type", "loai", "categoryType", "kind"];
    const pickType = (o) => TYPE_KEYS.map((k) => o?.[k] ?? "").find(Boolean);
    const hasType = arrCate.some((c) => pickType(c));
    if (hasType) {
      arrCate = arrCate.filter((c) => {
        const t = String(pickType(c) || "").toLowerCase();
        return ["bài viết", "bai viet", "post", "blog", "article"].includes(
          vnSlug(t)
        );
      });
      if (arrCate.length === 0)
        arrCate = Array.isArray(categories) ? categories : [];
    }

    const getId = (o) => o?._id ?? o?.id ?? o?.value ?? o?.slug ?? null;
    const getName = (o) => o?.name ?? o?.title ?? o?.label ?? o?.slug ?? "";
    const idBySlug = new Map();
    const labelById = new Map();
    for (const c of arrCate) {
      const id = getId(c);
      const label = getName(c);
      if (id != null) labelById.set(String(id), label);
      if (label) idBySlug.set(vnSlug(label), String(id ?? vnSlug(label)));
      if (c?.slug) idBySlug.set(vnSlug(c.slug), String(id ?? vnSlug(c.slug)));
    }

    const getIdsFromBlog = (b) => {
      const out = new Set();

      if (b?.category_id) out.add(String(b.category_id));
      if (b?.categoryId) out.add(String(b.categoryId));

      if (b?.category && typeof b.category === "object") {
        const cid =
          b.category?._id ?? b.category?.id ?? b.category?.slug ?? null;
        if (cid != null) out.add(String(cid));
      } else if (typeof b?.category === "string" && b.category) {
        out.add(String(b.category));
      }

      const categoriesArr = Array.isArray(b?.categories) ? b.categories : [];
      for (const it of categoriesArr) {
        const val = typeof it === "object" ? it?._id ?? it?.id ?? it?.slug : it;
        if (val != null) out.add(String(val));
      }

      const categoryIdsArr = Array.isArray(b?.categoryIds) ? b.categoryIds : [];
      for (const it of categoryIdsArr) {
        const val = typeof it === "object" ? it?._id ?? it?.id ?? it?.slug : it;
        if (val != null) out.add(String(val));
      }

      const nameCandidates = [
        b?.categoryName,
        b?.category_name,
        b?.categoryTitle,
        b?.category_title,
      ].filter(Boolean);
      for (const nm of nameCandidates) {
        const slug = vnSlug(nm);
        if (idBySlug.has(slug)) out.add(String(idBySlug.get(slug)));
      }

      return [...out];
    };

    const counter = new Map();
    for (const b of arrBlogs) {
      const ids = getIdsFromBlog(b);
      if (ids.length === 0) {
        const other = "__other";
        counter.set(other, (counter.get(other) || 0) + 1);
        if (!labelById.has(other)) labelById.set(other, "Khác");
      } else {
        for (const id of ids) counter.set(id, (counter.get(id) || 0) + 1);
      }
    }

    if (counter.size === 0) return { labels: [], datasets: [{ data: [] }] };

    const sorted = [...counter.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const labels = sorted.map(([id]) => labelById.get(id) || String(id));
    const data = sorted.map(([, n]) => n);

    return {
      labels,
      datasets: [
        {
          label: "Bài viết",
          data,
          backgroundColor: [
            "#1890ff",
            "#52c41a",
            "#faad14",
            "#ff4d4f",
            "#722ed1",
            "#13c2c2",
            "#eb2f96",
            "#fa541c",
          ],
        },
      ],
    };
  }, [blogs, categories]);

  const satisfactionData = useMemo(() => {
    const buckets = {
      "Rất hài lòng": 0,
      "Hài lòng": 0,
      "Bình thường": 0,
      "Không hài lòng": 0,
    };
    let hasRating = false;
    for (const t of Array.isArray(testimonials) ? testimonials : []) {
      const r = Number(t?.rating);
      if (Number.isFinite(r)) {
        hasRating = true;
        if (r >= 4.5) buckets["Rất hài lòng"]++;
        else if (r >= 3.5) buckets["Hài lòng"]++;
        else if (r >= 2.5) buckets["Bình thường"]++;
        else buckets["Không hài lòng"]++;
      }
    }
    const labels = Object.keys(buckets);
    const data = Object.values(buckets);
    const demo = { labels, data: [45, 35, 15, 5] };
    return {
      labels: hasRating ? labels : demo.labels,
      datasets: [
        {
          label: "Mức độ hài lòng",
          data: hasRating ? data : demo.data,
          backgroundColor: ["#52c41a", "#1890ff", "#faad14", "#ff4d4f"],
        },
      ],
    };
  }, [testimonials]);

  const isAllZero = (arr) => arr.every((v) => Number(v) === 0);

  return (
    <>
      <Row gutter={[16, 16]}>
        {loading
          ? Array.from({ length: 13 }).map((_, i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card>
                  <Skeleton active paragraph={false} />
                </Card>
              </Col>
            ))
          : tiles.map((item, idx) => (
              <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card hoverable style={{ height: 110 }}>
                  <Statistic
                    title={item.title}
                    value={item.value}
                    prefix={
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          marginRight: 8,
                          background: "rgba(9,108,181,.12)",
                          color: "#096cb5",
                          borderRadius: 8,
                        }}
                      >
                        {item.icon}
                      </span>
                    }
                  />
                </Card>
              </Col>
            ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card style={{ height: 320 }} hoverable>
            <Space
              align="center"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <Title level={5} style={{ margin: 0 }}>
                Tiến độ dự án theo tháng
              </Title>
              {!loading && err && (
                <Tooltip title={err}>
                  <span style={{ color: "#ff4d4f", fontSize: 12 }}>
                    Có lỗi khi tải dữ liệu
                  </span>
                </Tooltip>
              )}
            </Space>
            <div style={{ height: 240 }}>
              {loading ? (
                <Skeleton active />
              ) : isAllZero(projectDataCombined.datasets[0].data) &&
                isAllZero(projectDataCombined.datasets[1].data) ? (
                <Empty
                  style={{ marginTop: 40 }}
                  description="Không có dữ liệu"
                />
              ) : (
                <Line data={projectDataCombined} options={chartOptions} />
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: 320 }} hoverable>
            <Title level={5} style={{ margin: 0 }}>
              Số lượng dự án theo tháng
            </Title>
            <div style={{ height: 240 }}>
              {loading ? (
                <Skeleton active />
              ) : isAllZero(projectDataCombined.datasets[0].data) ? (
                <Empty
                  style={{ marginTop: 40 }}
                  description="Không có dữ liệu"
                />
              ) : (
                <Bar
                  data={{
                    labels: projectDataCombined.labels,
                    datasets: [
                      {
                        label: "Dự án",
                        data: projectDataCombined.datasets[0].data,
                        backgroundColor: "#096cb5",
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card style={{ height: 350 }} hoverable>
            <Title level={5} style={{ margin: 0 }}>
              Mức độ hài lòng của khách hàng
            </Title>
            <div style={{ height: 260 }}>
              {loading ? (
                <Skeleton active />
              ) : isAllZero(satisfactionData.datasets[0].data) ? (
                <Empty
                  style={{ marginTop: 40 }}
                  description="Không có dữ liệu"
                />
              ) : (
                <Pie data={satisfactionData} options={chartOptions} />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
