import React, { useState } from "react";
import "../House.css";

import house2 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house3 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house4 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house1 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house5 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house6 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house7 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house8 from "../../../assets/anh_services/nhatrongoi6.jpg";
import house9 from "../../../assets/anh_services/nhatrongoi6.jpg";

import ContactForm from "../../view/Mail/ContactFormMail";

const houseData = [
  {
    image: house1,
    title: "Nhà phố 5 tầng hiện đại 5x20m",
    description:
      "Không gian sống tiện nghi, phong cách hiện đại giữa lòng đô thị.",
  },
  {
    image: house2,
    title: "Mẫu nhà 5 tầng 2 mặt tiền sang trọng",
    description:
      "Thiết kế tối ưu cho lô đất góc, đón ánh sáng và gió tự nhiên.",
  },
  {
    image: house3,
    title: "Thiết kế nhà 5 tầng 6x18m có gara ô tô",
    description:
      "Công năng đầy đủ, tích hợp không gian để xe an toàn và tiện lợi.",
  },
  {
    image: house4,
    title: "Nhà 5 tầng kết hợp kinh doanh và sinh hoạt",
    description:
      "Giải pháp lý tưởng cho gia đình muốn mở shop hoặc văn phòng tại gia.",
  },
  {
    image: house5,
    title: "Mẫu biệt thự mini 5 tầng đẳng cấp",
    description:
      "Thiết kế tinh tế, hiện đại, phù hợp cho gia đình nhiều thế hệ.",
  },
  {
    image: house6,
    title: "Nhà 5 tầng mái bằng phong cách tối giản",
    description:
      "Tối ưu hóa không gian sử dụng, chi phí hợp lý cho gia đình trẻ.",
  },
  {
    image: house7,
    title: "Nhà phố 5 tầng có thang máy tiện nghi",
    description:
      "Thiết kế thông minh, thuận tiện cho người lớn tuổi và trẻ nhỏ.",
  },
  {
    image: house8,
    title: "Thiết kế nhà ống 5 tầng hiện đại độc đáo",
    description:
      "Mặt tiền ấn tượng, không gian mở với hệ giếng trời và ban công rộng.",
  },
  {
    image: house9,
    title: "Nhà 5 tầng 5 phòng ngủ cho gia đình đông người",
    description:
      "Không gian sinh hoạt chung và riêng được bố trí hợp lý, tiện nghi.",
  },
];

const Container_HouseFour = () => {
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
        MẪU NHÀ 5 TẦNG ĐẸP – GIẢI PHÁP KHÔNG GIAN CHO CUỘC SỐNG HIỆN ĐẠI
      </h2>
      <p className="house-subtitle">
        Tuyển chọn các mẫu nhà 5 tầng nổi bật với thiết kế sang trọng, tối ưu
        diện tích và công năng cho mọi gia đình Việt.
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

export default Container_HouseFour;
