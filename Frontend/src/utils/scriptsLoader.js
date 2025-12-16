// src/utils/scriptsLoader.js
const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ||
  window.__API_BASE__ ||
  "https://api.nguyenhai.com.vn";

function injectHTML(html, where = "head") {
  // chấp nhận cả <script>… hoặc thẻ <noscript> v.v.
  const container = document.createElement("div");
  container.innerHTML = html;

  const parent =
    where === "head"
      ? document.head
      : where === "body-start"
      ? document.body
      : document.body;

  // body-start: chèn đầu body
  const insertBefore = where === "body-start" ? document.body.firstChild : null;

  // di chuyển tất cả node con vào DOM thật
  Array.from(container.childNodes).forEach((node) => {
    if (insertBefore) parent.insertBefore(node, insertBefore);
    else parent.appendChild(node);
  });
}

export async function loadRemoteScripts(env = "prod") {
  try {
    const res = await fetch(`${API_BASE}/api/scripts/public?env=${env}`, {
      credentials: "omit",
      cache: "no-store",
    });
    const list = await res.json();
    list.forEach(({ code, placement }) => {
      if (!code) return;
      injectHTML(code, placement);
    });
  } catch (e) {
    // optional: fallback từ localStorage cache
    const cache = localStorage.getItem("__scripts_cache__");
    if (cache) {
      try {
        const list = JSON.parse(cache);
        list.forEach(({ code, placement }) => injectHTML(code, placement));
      } catch {}
    }
  }
}
