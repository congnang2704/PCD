import React, { useState } from "react";
import "../House.css";

import house1 from "../../../../assets/nhatrongoi3.jpg";
import house2 from "../../../../assets/nhatrongoi3.jpg";
import house3 from "../../../../assets/nhatrongoi3.jpg";
import house4 from "../../../../assets/nhatrongoi3.jpg";
import house5 from "../../../../assets/nhatrongoi3.jpg";
import house6 from "../../../../assets/nhatrongoi3.jpg";
import house7 from "../../../../assets/nhatrongoi3.jpg";
import house8 from "../../../../assets/nhatrongoi3.jpg";

import ContactForm from "../../view/Mail/ContactFormMail";

const houseData = [
  {
    image: house1,
    title: "Biệt thự hiện đại 3 tầng đẳng cấp",
    description:
      "Không gian sang trọng, tiện nghi và đẳng cấp cho gia đình thượng lưu.",
  },
  {
    image: house2,
    title: "Biệt thự vườn mái Thái thoáng mát",
    description:
      "Thiết kế kết hợp thiên nhiên, tạo không gian sống thư giãn và trong lành.",
  },
  {
    image: house3,
    title: "Mẫu biệt thự cổ điển 2 tầng sang trọng",
    description:
      "Vẻ đẹp quý phái và đậm chất châu Âu cổ điển, bền vững với thời gian.",
  },
  {
    image: house4,
    title: "Biệt thự phố 3 tầng mặt tiền rộng",
    description:
      "Tối ưu diện tích đất phố, đầy đủ tiện nghi và không gian xanh.",
  },
  {
    image: house5,
    title: "Biệt thự mini hiện đại 150m2",
    description: "Thiết kế gọn gàng, tinh tế và phù hợp khu dân cư hiện đại.",
  },
  {
    image: house6,
    title: "Biệt thự nghỉ dưỡng có hồ bơi",
    description:
      "Không gian thư giãn tuyệt đối, lý tưởng cho nghỉ ngơi cuối tuần.",
  },
  {
    image: house7,
    title: "Mẫu biệt thự sân vườn xanh mát",
    description:
      "Không gian trong lành, gần gũi thiên nhiên, phù hợp gia đình 3 thế hệ.",
  },
  {
    image: house8,
    title: "Biệt thự mái Nhật phong cách Á Đông",
    description:
      "Tinh tế trong từng chi tiết, kết hợp văn hóa truyền thống và hiện đại.",
  },
];

const Container_HouseVilla = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(houseData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = houseData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="house-container">
      <h2 className="house-title">MẪU BIỆT THỰ ĐẸP – SANG TRỌNG VÀ ĐẲNG CẤP</h2>
      <p className="house-subtitle">
        Bộ sưu tập biệt thự hiện đại, biệt thự vườn, biệt thự nghỉ dưỡng… dành
        cho khách hàng yêu thích không gian sống đẳng cấp và tiện nghi.
      </p>

      <div className="house-grid">
        {currentItems.map((house, index) => (
          <div className="house-card-modern" key={index}>
            <img
              src={house.image}
              alt={house.title}
              className="house-img-modern"
            />
            <div className="house-info">
              <h3 className="house-title-modern">{house.title}</h3>
              <p className="house-desc">{house.description}</p>
              <button className="explore-btn">
                Khám phá <span className="arrow-icon">↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="page"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          « Trước
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`page ${currentPage === idx + 1 ? "active" : ""}`}
            onClick={() => handlePageClick(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="page"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Tiếp »
        </button>
      </div>

      <h4 className="house-contact-heading">
        Để lại thông tin, kiến trúc sư <b>PCD Nguyễn Hải</b> sẽ tư vấn cho bạn
        nhanh nhất!
      </h4>
      <ContactForm />
    </div>
  );
};

export default Container_HouseVilla;
