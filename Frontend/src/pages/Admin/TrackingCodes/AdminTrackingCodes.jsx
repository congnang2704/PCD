// src/pages/admin/TrackingCodes/AdminTrackingCodes.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Select,
  Switch,
  Button,
  Space,
  Typography,
  message,
  Empty,
} from "antd";
const { TextArea } = Input;

const API =
  (import.meta.env?.VITE_API_BASE ||
    process.env.REACT_APP_API_BASE ||
    "https://api.nguyenhai.com.vn") + "/api/scripts";

const PLACEMENTS = [
  { label: "Head (<head>)", value: "head" },
  { label: "Body Start (<body> đầu)", value: "body-start" },
  { label: "Body End (cuối <body>)", value: "body-end" },
];
const ENVS = [
  { label: "Tất cả môi trường", value: "all" },
  { label: "Production", value: "prod" },
  { label: "Staging", value: "staging" },
  { label: "Development", value: "dev" },
];

// Presets
const PRESET_DEFS = {
  ga4: {
    key: "ga4",
    label: "Google Analytics 4",
    placement: "head",
    env: "prod",
    enabled: true,
    code: `<!-- Google tag (GA4: G-EVLVPD169G) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EVLVPD169G"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", "G-EVLVPD169G");
</script>`,
  },
  fbpixel: {
    key: "fbpixel",
    label: "Facebook Pixel",
    placement: "head",
    env: "prod",
    enabled: true,
    code: `<!-- Facebook Pixel -->
<script>
!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
  if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
  t = b.createElement(e); t.async = !0; t.src = v;
  s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
})(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
fbq("init", "1470175027522018");
fbq("track", "PageView");
</script>`,
  },
  cookiehub: {
    key: "cookiehub",
    label: "CookieHub",
    placement: "head",
    env: "all",
    enabled: true,
    code: `<!-- CookieHub -->
<script src="https://cdn.cookiehub.eu/c2/c9e544d5.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  var cpm = {}; window.cookiehub.load(cpm);
});
</script>`,
  },
  googleads: {
    key: "googleads",
    label: "Google Ads",
    placement: "head",
    env: "prod",
    enabled: true,
    code: `<!-- Google Ads (AW-17496261728) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17496261728"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", "AW-17496261728");
</script>`,
  },
  "gtm-nkb5b5sm": {
    key: "gtm-nkb5b5sm",
    label: "Google Tag Manager (NKB5B5SM)",
    placement: "head",
    env: "prod",
    enabled: true,
    code: `<!-- Google Tag Manager (GTM-NKB5B5SM) -->
<script>
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-NKB5B5SM");
</script>`,
  },
  "gtm-wgdwbpb9": {
    key: "gtm-wgdwbpb9",
    label: "Google Tag Manager (WGDWBPB9)",
    placement: "head",
    env: "prod",
    enabled: true,
    code: `<!-- Google Tag Manager (GTM-WGDWBPB9) -->
<script>
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-WGDWBPB9");
</script>`,
  },
  "custom-head": {
    key: "custom-head",
    label: "Custom HEAD",
    placement: "head",
    env: "all",
    enabled: false,
    code: "<!-- Viết code HEAD ở đây -->",
  },
};

export default function AdminTrackingCodes() {
  const [items, setItems] = useState([]); // tất cả snippets trong DB
  const [activeKey, setActiveKey] = useState(""); // snippet đang mở
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    setLoading(true);
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
    // nếu chưa chọn thì auto chọn cái đầu
    if (!activeKey && data?.length) setActiveKey(data[0].key);
    setLoading(false);
  }
  useEffect(() => {
    fetchAll(); /*eslint-disable-next-line*/
  }, []);

  function ensurePreset(key) {
    // nếu chưa có trong DB → add vào state (đợi user bấm Lưu mới PUT)
    const preset = PRESET_DEFS[key];
    if (!preset) return;
    setItems((prev) => {
      if (prev.some((i) => i.key === preset.key)) return prev;
      return [preset, ...prev];
    });
    setActiveKey(preset.key);
  }

  function updateRow(key, patch) {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, ...patch } : i))
    );
  }

  async function saveOne(row) {
    const res = await fetch(`${API}/${encodeURIComponent(row.key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    if (res.ok) {
      message.success(`Đã lưu: ${row.label || row.key}`);
      fetchAll();
    } else {
      message.error("Lưu thất bại");
    }
  }

  const current = items.find((i) => i.key === activeKey);

  return (
    <div>
      {/* Thanh preset: bấm là chỉ hiện đúng block đó (và tạo nếu chưa có) */}
      <Space wrap>
        <Button
          onClick={() => {
            ensurePreset("ga4");
          }}
        >
          + GA4
        </Button>
        <Button
          onClick={() => {
            ensurePreset("fbpixel");
          }}
        >
          + Facebook Pixel
        </Button>
        <Button
          onClick={() => {
            ensurePreset("cookiehub");
          }}
        >
          + CookieHub
        </Button>
        <Button
          onClick={() => {
            ensurePreset("googleads");
          }}
        >
          + Google Ads
        </Button>
        <Button
          onClick={() => {
            ensurePreset("gtm-nkb5b5sm");
          }}
        >
          + GTM NKB5B5SM
        </Button>
        <Button
          onClick={() => {
            ensurePreset("gtm-wgdwbpb9");
          }}
        >
          + GTM WGDWBPB9
        </Button>
        <Button
          onClick={() => {
            ensurePreset("custom-head");
          }}
        >
          + Custom HEAD
        </Button>
      </Space>

      <div style={{ height: 16 }} />

      {/* Nếu chưa chọn gì */}
      {!current && !loading && (
        <Card>
          <Empty description="Chưa chọn preset. Hãy bấm 1 nút ở trên." />
        </Card>
      )}

      {/* Render đúng 1 block đang chọn */}
      {current && (
        <Card
          key={current.key}
          title={current.label || current.key}
          extra={<code>{current.key}</code>}
          loading={loading}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              value={current.label}
              placeholder="Tên hiển thị"
              onChange={(e) =>
                updateRow(current.key, { label: e.target.value })
              }
            />
            <Space wrap>
              <Select
                options={PLACEMENTS}
                value={current.placement}
                onChange={(v) => updateRow(current.key, { placement: v })}
                style={{ minWidth: 220 }}
              />
              <Select
                options={ENVS}
                value={current.env}
                onChange={(v) => updateRow(current.key, { env: v })}
                style={{ minWidth: 180 }}
              />
              <Space>
                Enable{" "}
                <Switch
                  checked={current.enabled}
                  onChange={(v) => updateRow(current.key, { enabled: v })}
                />
              </Space>
              <Button type="primary" onClick={() => saveOne(current)}>
                Lưu
              </Button>
            </Space>
            <TextArea
              rows={10}
              value={current.code}
              placeholder="Dán mã JS/HTML (cho phép <script>…</script>)"
              onChange={(e) => updateRow(current.key, { code: e.target.value })}
            />
            <Typography.Text type="secondary">
              Cập nhật:{" "}
              {new Date(current.updatedAt || Date.now()).toLocaleString()}
            </Typography.Text>
          </Space>
        </Card>
      )}
    </div>
  );
}
