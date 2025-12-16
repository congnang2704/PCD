import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../BG_ThietKe/BG.ThietKe.css";

/** Helper: chuẩn hoá path để luôn có leading slash */
const norm = (p = "") =>
  ("/" + String(p).replace(/^\/*/, "")).replace(/\/{2,}/g, "/");

/** Helper: match active kể cả khi có sub-route (vd: /bang-gia-thiet-ke/chi-tiet) */
const isActivePath = (pathname, target) => {
  const t = norm(target);
  return pathname === t || pathname.startsWith(t + "/");
};

export default function TabsBG({
  pricePath = "/bang-gia-thiet-ke",
  priceThiCong = "/bang-gia-thi-cong",
  vatLieuPath = "/bang-gia",
  hopDongPath = "/hop-dong",
}) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const go = (p) => nav(norm(p));

  return (
    <div className="bgvl-tabs">
      <button
        type="button"
        className={`tab ${isActivePath(pathname, pricePath) ? "active" : ""}`}
        onClick={() => go(pricePath)}
      >
        Bảng giá thiết kế
      </button>

      <button
        type="button"
        className={`tab ${
          isActivePath(pathname, priceThiCong) ? "active" : ""
        }`}
        onClick={() => go(priceThiCong)}
      >
        Bảng giá thi công
      </button>

      <button
        type="button"
        className={`tab ${isActivePath(pathname, vatLieuPath) ? "active" : ""}`}
        onClick={() => go(vatLieuPath)}
      >
        Diễn giải vật liệu
      </button>

      {/* <button
        type="button"
        className={`tab ${isActivePath(pathname, hopDongPath) ? "active" : ""}`}
        onClick={() => go(hopDongPath)}
      >
        Hợp đồng
      </button> */}
    </div>
  );
}
