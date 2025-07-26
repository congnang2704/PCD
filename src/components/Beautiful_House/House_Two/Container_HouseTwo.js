import React, { useState } from "react";
import "../House.css";

import house1 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house2 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house3 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house4 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house5 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house6 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house7 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house8 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house9 from "../../../assets/anh_services/nhahoaxuan3.jpg";
import house10 from "../../../assets/anh_services/nhahoaxuan3.jpg";

import ContactForm from "../../view/Mail/ContactFormMail";

const houseData = [
  {
    image: house1,
    title: "Nhà 2 tầng 5x20 phong cách hiện đại tối giản",
    description:
      "Tối ưu công năng sử dụng, mang đến không gian sống hiện đại, tiện nghi.",
  },
  {
    image: house2,
    title: "Thiết kế nhà 2 tầng có sân vườn mát mẻ",
    description: "Không gian mở gần gũi thiên nhiên, phù hợp với gia đình trẻ.",
  },
  {
    image: house3,
    title: "Mẫu nhà 2 tầng 3 phòng ngủ hiện đại",
    description:
      "Thiết kế tinh tế, bố trí thông minh tạo sự thoải mái trong sinh hoạt.",
  },
  {
    image: house4,
    title: "Nhà 2 tầng mái Nhật ấn tượng và tiện nghi",
    description:
      "Mang lại vẻ đẹp sang trọng kết hợp nét kiến trúc truyền thống.",
  },
  {
    image: house5,
    title: "Nhà 2 tầng tông trắng tinh khôi, tinh tế",
    description: "Phong cách tối giản, tận dụng ánh sáng tự nhiên tối đa.",
  },
  {
    image: house6,
    title: "Nhà phố 2 tầng kết hợp kinh doanh",
    description:
      "Thiết kế thông minh kết hợp không gian sinh hoạt và kinh doanh tiện lợi.",
  },
  {
    image: house7,
    title: "Nhà 2 tầng mái bằng hiện đại sang trọng",
    description:
      "Phù hợp khu đô thị và thành phố, không gian rộng rãi, thoáng đãng.",
  },
  {
    image: house8,
    title: "Nhà 2 tầng 2 mặt tiền đẳng cấp",
    description: "Lợi thế 2 mặt tiền giúp đón gió và ánh sáng tối đa.",
  },
  {
    image: house9,
    title: "Nhà ống 2 tầng có ban công thoáng mát",
    description:
      "Ban công rộng kết hợp cây xanh, tạo điểm nhấn thẩm mỹ và thư giãn.",
  },
  {
    image: house10,
    title: "Nhà ống 2 tầng có ban công thoáng mát",
    description:
      "Ban công rộng kết hợp cây xanh, tạo điểm nhấn thẩm mỹ và thư giãn.",
  },
];

const Container_HouseTwo = () => {
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
        MẪU NHÀ 2 TẦNG ĐẸP, HIỆN ĐẠI, TIỆN NGHI CHO GIA ĐÌNH VIỆT
      </h2>
      <p className="house-subtitle">
        Các mẫu nhà 2 tầng được yêu thích nhất với thiết kế tinh tế, công năng
        tối ưu, phù hợp cho thành phố và nông thôn.
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

export default Container_HouseTwo;
