// src/components/brands.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./brands.css";

/* ====== IMPORT ẢNH NỘI BỘ ====== */
import imgAspT from "../../../../assets/DTTH/aspt_1756354961190.png";
import imgRaymond from "../../../../assets/DTTH/raymon_1756354585739.png";
import imgCadivi from "../../../../assets/DTTH/logo-daycadivi.net__1756279248646.jpg";
import imgAribank from "../../../../assets/DTTH/482243802_1197155455746602_820850584669451954_n_1756279099869.jpg";
import imgBinhMinh from "../../../../assets/DTTH/logo_1756279053605.png";
import imgSongHan from "../../../../assets/DTTH/363849947_745722270894706_5069892081573078988_n_1756278450703.jpg";
import imgHoaPhat from "../../../../assets/DTTH/logo-gang-thep_1756278249457.png";

/* ====== DANH SÁCH TĨNH ====== */
const LOCAL_BRANDS = [
  {
    _id: "aspt",
    name: "Công Ty TNHH MTV Tư vấn & Xây dựng A.S.P.T",
    image: imgAspT,
  },
  {
    _id: "raymond",
    name: "Raymond Architectural Design Office",
    image: imgRaymond,
  },
  { _id: "cadivi", name: "Dây Điện Cadivi", image: imgCadivi },
  { _id: "aribank", name: "Ngân Hàng Aribank", image: imgAribank },
  { _id: "binhminh", name: "Ống Nước Bình Minh", image: imgBinhMinh },
  { _id: "songhan", name: "Bê Tông Sông Hàn", image: imgSongHan },
  { _id: "hoaphat", name: "Thép Hoà Phát", image: imgHoaPhat },
];

export default function BrandsSlider({ title = "Đối tác & Thương hiệu" }) {
  const [items, setItems] = useState([]);
  const wrapRef = useRef(null);
  const timerRef = useRef(null);
  const isHoverRef = useRef(false);

  /* ====== LOAD DATA TĨNH ====== */
  useEffect(() => {
    setItems(LOCAL_BRANDS);
  }, []);

  /* ===== AUTO SCROLL ===== */
  const scrollNext = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;

    const amount = el.clientWidth;
    el.scrollBy({ left: amount, behavior: "smooth" });

    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    if (nearEnd) {
      setTimeout(() => {
        el.scrollTo({ left: 0, behavior: "instant" });
      }, 300);
    }
  }, []);

  const scrollPrev = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  };

  /* ===== AUTO INTERVAL ===== */
  useEffect(() => {
    if (!items.length) return;

    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isHoverRef.current) scrollNext();
    }, 2800);

    return () => clearInterval(timerRef.current);
  }, [items, scrollNext]);

  return (
    <section
      className="home-brands"
      onMouseEnter={() => (isHoverRef.current = true)}
      onMouseLeave={() => (isHoverRef.current = false)}
    >
      <div className="home-brands__head">
        <h2 className="home-brands__title">{title}</h2>
      </div>

      <div className="home-brands__viewport" ref={wrapRef}>
        <div className="home-brands__track">
          {[...items, ...items].map((b, idx) => (
            <div className="brand-card" key={`${b._id}-${idx}`}>
              <div className="brand-card__media">
                <img
                  src={b.image}
                  alt={b.name}
                  className="brand-card__img"
                  draggable="false"
                />
                <div className="brand-card__overlay">
                  <span className="brand-card__name">{b.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
