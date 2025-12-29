import React from "react";
import { Link } from "react-router-dom";

const HouseCard = ({ house, getImg }) => {
  return (
    <Link to={`/mau-nha-dep/${house.slug}`} className="house-card-link">
      <div className="house-card-modern">
        <img
          src={getImg(house)}
          alt={house.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = "/default.jpg")}
        />

        <div className="house-info">
          <h3>{house.title}</h3>

          <div className="house-meta">
            <span>🏗 2–3 tầng</span>
            <span>📐 80–120m²</span>
            <span className="price">💰 ~1.8–2.3 tỷ</span>
          </div>

          <p>{house.description?.slice(0, 90)}…</p>

          <span className="explore-btn">Khám phá ↗</span>
        </div>
      </div>
    </Link>
  );
};

export default HouseCard;
