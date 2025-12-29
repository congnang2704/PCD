import React from "react";

const HouseFilter = ({ onChange }) => {
  return (
    <div className="house-filter">
      <select onChange={(e) => onChange("category", e.target.value)}>
        <option value="">Loại nhà</option>
        <option value="Nhà 2 tầng">Nhà 2 tầng</option>
        <option value="Nhà 3 tầng">Nhà 3 tầng</option>
        <option value="Biệt thự">Biệt thự</option>
        <option value="Căn hộ, khách sạn">Căn hộ / Khách sạn</option>
      </select>

      <select onChange={(e) => onChange("style", e.target.value)}>
        <option value="">Phong cách</option>
        <option value="Hiện đại">Hiện đại</option>
        <option value="Tân cổ điển">Tân cổ điển</option>
        <option value="Luxury">Luxury</option>
      </select>
    </div>
  );
};

export default HouseFilter;
