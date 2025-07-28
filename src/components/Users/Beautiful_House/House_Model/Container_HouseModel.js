import React, { useState } from "react";
import "../House.css";

import house1 from "../../../../assets/anh_services/anh (1).jpg";
import house2 from "../../../../assets/anh_services/anh (1).jpg";
import house3 from "../../../../assets/anh_services/anh (1).jpg";
import house4 from "../../../../assets/anh_services/anh (1).jpg";
import house5 from "../../../../assets/anh_services/anh (1).jpg";
import house6 from "../../../../assets/anh_services/anh (1).jpg";
import house7 from "../../../../assets/anh_services/anh (1).jpg";
import house8 from "../../../../assets/anh_services/anh (1).jpg";
import house9 from "../../../../assets/anh_services/anh (1).jpg";
import house10 from "../../../../assets/anh_services/anh (1).jpg";
import house11 from "../../../../assets/anh_services/anh (1).jpg";
import house12 from "../../../../assets/anh_services/anh (1).jpg";

import ContactForm from "../../view/Mail/ContactFormMail";

const houseData = [
  {
    image: house1,
    title: "Mặt bằng nhà phố 5×20 3 tầng hiện đại xanh ngát và tinh tế",
    description:
      "Thiết kế mở đón ánh sáng tự nhiên, không gian sống trong lành giữa lòng thành phố.",
  },
  {
    image: house2,
    title: "Bản vẽ thiết kế nhà 8x20m 2 tầng 1 tum nổi bật từng đường nét",
    description:
      "Phong cách hiện đại kết hợp không gian xanh, phù hợp với gia đình trẻ.",
  },
  {
    image: house3,
    title: "Nhà cấp 4 mái nhật 3 phòng ngủ 150m2 hiện đại sang trọng",
    description:
      "Ngôi nhà mang nét Á Đông truyền thống pha hiện đại, đầy đủ tiện nghi.",
  },
  {
    image: house4,
    title: "Tuyệt tác nông thôn nhà cấp 4 mái Thái 3 phòng ngủ hiện đại",
    description: "Không gian mở thoáng mát, phù hợp vùng quê và ngoại ô.",
  },
  {
    image: house5,
    title: "Thiết kế nhà 5x20m có sân vườn đẹp ấn tượng sống xanh giữa phố",
    description:
      "Kết hợp cây xanh và ánh sáng, mang lại cảm giác thư thái mỗi ngày.",
  },
  {
    image: house6,
    title: "Thiết kế nhà ống có giếng trời diện tích 5x20m 3 tầng hiện đại",
    description:
      "Ngôi nhà mang lại không gian sống hiện đại, tối ưu công năng, phù hợp với gia đình trẻ...",
  },
  {
    image: house7,
    title: "Nhà cấp 4 phong cách châu Âu",
    description:
      "Phong cách tân cổ điển kết hợp hiện đại, tiện nghi và thẩm mỹ cao.",
  },
  {
    image: house8,
    title: "Biệt thự vườn hiện đại 200m2 1 tầng",
    description: "Không gian nghỉ dưỡng lý tưởng cho gia đình 3 thế hệ.",
  },
  {
    image: house9,
    title: "Nhà phố hiện đại 2 mặt tiền 6x20m",
    description: "Thiết kế tối ưu vị trí lô góc, đón ánh sáng và gió tự nhiên.",
  },
  {
    image: house10,
    title: "Thiết kế nhà cấp 4 mái lệch 3 phòng ngủ",
    description: "Kiểu mái sáng tạo và tiết kiệm chi phí xây dựng.",
  },
  {
    image: house11,
    title: "Mẫu nhà mái Nhật sân vườn rộng rãi",
    description: "Kết hợp phong cách Nhật Bản và thiên nhiên xanh mát.",
  },
  {
    image: house12,
    title: "Nhà phố 2 tầng 5x18m phong cách tân cổ điển",
    description:
      "Tôn vinh vẻ đẹp sang trọng, đường nét mềm mại đầy nghệ thuật.",
  },
];

const Container_HouseModel = () => {
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
      <h2 className="house-title">
        999+ MẪU NHÀ ĐẸP, HIỆN ĐẠI, ĐÓN ĐẦU XU HƯỚNG
      </h2>
      <p className="house-subtitle">
        Các mẫu nhà đẹp 2 tầng, 3 tầng ở thành phố, nông thôn với thiết kế hiện
        đại và đầy cuốn hút, kèm full bản vẽ tối ưu công năng, đa dạng phong
        cách cho bạn chọn lựa.
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
        Để lại thông tin, kiến trúc sư PCD Nguyễn Hải sẽ tư vấn cho bạn nhanh
        nhất!
      </h4>
      <ContactForm />
    </div>
  );
};

export default Container_HouseModel;
