// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { loadRemoteScripts } from "./utils/scriptsLoader";

const MODE =
  (typeof import.meta !== "undefined" && import.meta.env?.MODE) ||
  process.env.NODE_ENV ||
  "development";

// Load gtag, Google Ads, Analytics... như ní đang dùng
loadRemoteScripts(MODE === "production" ? "prod" : "dev");

/**
 * Theo dõi tất cả click vào link tel: trên toàn site
 * và bắn Google Ads conversion “Nhấp để gọi”.
 */
function setupClickToCallTracking() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const handleClick = (event) => {
    // Tìm thẻ <a> gần nhất có href bắt đầu bằng "tel:"
    const link = event.target.closest('a[href^="tel:"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Bắn conversion nếu gtag đã sẵn sàng
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17496261728/E5fKCLL228gbEOCI75ZB",
        value: 1.0,
        currency: "VND",
      });
    }
    // Chặn hành vi mặc định để có thời gian gtag gửi dữ liệu
    event.preventDefault();

    setTimeout(() => {
      window.location.href = href;
    }, 200);
  };

  // Dùng event delegation, chỉ gắn 1 listener cho cả document
  document.addEventListener("click", handleClick);
}

// Chỉ chạy trên browser
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupClickToCallTracking);
  } else {
    setupClickToCallTracking();
  }
}

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
