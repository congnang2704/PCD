import React, { useState } from "react";
import "../House.css";

import house1 from "../../../../assets/nhatrongoi4.jpg";
import house2 from "../../../../assets/nhatrongoi4.jpg";
import house3 from "../../../../assets/nhatrongoi4.jpg";
import house4 from "../../../../assets/nhatrongoi4.jpg";
import house5 from "../../../../assets/nhatrongoi4.jpg";
import house6 from "../../../../assets/nhatrongoi4.jpg";
import house7 from "../../../../assets/nhatrongoi4.jpg";
import house8 from "../../../../assets/nhatrongoi4.jpg";
import house9 from "../../../../assets/nhatrongoi4.jpg";

import ContactForm from "../../view/Mail/ContactFormMail";

const houseData = [
  {
    image: house1,
    title: "Nhà phố 3 tầng 5x20 hiện đại tinh tế",
    description:
      "Thiết kế tối giản nhưng hiện đại, phù hợp với không gian thành thị.",
  },
  {
    image: house2,
    title: "Mẫu nhà 3 tầng 1 tum có giếng trời",
    description:
      "Không gian xanh thông thoáng nhờ hệ thống giếng trời khoa học.",
  },
  {
    image: house3,
    title: "Thiết kế nhà 3 tầng mái bằng trẻ trung",
    description: "Phong cách năng động, hiện đại, tận dụng ánh sáng tối đa.",
  },
  {
    image: house4,
    title: "Nhà ống 3 tầng kết hợp văn phòng",
    description: "Thiết kế thông minh, vừa ở vừa kinh doanh hiệu quả.",
  },
  {
    image: house5,
    title: "Mẫu nhà 3 tầng mái Nhật đẳng cấp",
    description:
      "Sự kết hợp giữa truyền thống và hiện đại tạo nên không gian sang trọng.",
  },
  {
    image: house6,
    title: "Nhà 3 tầng 2 mặt tiền thoáng đãng",
    description: "Đón gió và ánh sáng từ nhiều hướng, lý tưởng cho lô góc.",
  },
  {
    image: house7,
    title: "Biệt thự mini 3 tầng sang trọng",
    description:
      "Thiết kế đẳng cấp, không gian sống tiện nghi cho gia đình đông người.",
  },
  {
    image: house8,
    title: "Nhà 3 tầng phong cách tân cổ điển",
    description:
      "Vẻ đẹp mềm mại, sang trọng với họa tiết tinh tế và bố cục chặt chẽ.",
  },
  {
    image: house9,
    title: "Nhà 3 tầng 4 phòng ngủ cho gia đình lớn",
    description:
      "Không gian rộng rãi, thiết kế tối ưu cho 2 – 3 thế hệ cùng chung sống.",
  },
];

const Container_HouseThree = () => {
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
        MẪU NHÀ 3 TẦNG ĐẸP, HIỆN ĐẠI, ĐÁP ỨNG MỌI NHU CẦU GIA ĐÌNH
      </h2>
      <p className="house-subtitle">
        Khám phá những mẫu nhà 3 tầng lý tưởng cho cả thành thị và nông thôn với
        thiết kế tối ưu công năng, hiện đại và sang trọng.
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

export default Container_HouseThree;
