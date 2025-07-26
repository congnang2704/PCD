import React, { useState } from "react";
import "../House.css";

// Ảnh mẫu (thay đúng đường dẫn ảnh thật)
import house1 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house2 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house3 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house4 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house5 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house6 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house7 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house8 from "../../../assets/anh_services/nhacanhokhachsan.jpg";
import house9 from "../../../assets/anh_services/nhacanhokhachsan.jpg";

import ContactForm from "../../view/Mail/ContactFormMail";

const houseData = [
  {
    image: house1,
    title: "Thiết kế căn hộ cao cấp view thành phố ấn tượng",
    description:
      "Không gian sống tiện nghi, hiện đại và đầy đủ tiện ích cho gia đình trẻ.",
  },
  {
    image: house2,
    title: "Khách sạn mini 5 tầng phong cách hiện đại",
    description: "Thiết kế nhỏ gọn, tối ưu diện tích và công năng sử dụng.",
  },
  {
    image: house3,
    title: "Căn hộ studio 40m2 tiện nghi và ấm cúng",
    description:
      "Phù hợp cho người độc thân hoặc vợ chồng trẻ với thiết kế tinh tế.",
  },
  {
    image: house4,
    title: "Thiết kế khách sạn nghỉ dưỡng 3 sao",
    description: "Mang đến trải nghiệm thoải mái và thư giãn cho du khách.",
  },
  {
    image: house5,
    title: "Căn hộ thông tầng hiện đại sang trọng",
    description:
      "Tối ưu không gian sống với nội thất cao cấp và tiện nghi vượt trội.",
  },
  {
    image: house6,
    title: "Khách sạn phố cổ phong cách Đông Dương",
    description:
      "Kết hợp giữa kiến trúc truyền thống và hiện đại, tạo nên nét đặc trưng riêng.",
  },
  {
    image: house7,
    title: "Thiết kế căn hộ duplex tiện nghi đẳng cấp",
    description:
      "Tận dụng chiều cao để tạo nên không gian sống rộng mở và sang trọng.",
  },
  {
    image: house8,
    title: "Khách sạn mặt biển phong cách nghỉ dưỡng",
    description: "Thiết kế hướng biển, đón gió và ánh sáng tự nhiên tuyệt đẹp.",
  },
  {
    image: house9,
    title: "Căn hộ 2 phòng ngủ dành cho gia đình trẻ",
    description: "Không gian sống tiện nghi, gần gũi và tối ưu chi phí đầu tư.",
  },
];

const Container_HouseHotel = () => {
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
      <h2 className="house-title">MẪU CĂN HỘ & KHÁCH SẠN ĐẸP HIỆN ĐẠI</h2>
      <p className="house-subtitle">
        Tuyển chọn các mẫu căn hộ và khách sạn đẹp, sang trọng, đáp ứng đa dạng
        nhu cầu nghỉ dưỡng và sinh hoạt. Thiết kế tối ưu công năng và thẩm mỹ.
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

export default Container_HouseHotel;
