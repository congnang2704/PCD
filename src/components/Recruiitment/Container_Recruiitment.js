import React from "react";
import "./Container_Recruiitment.css";
import PCDImg from "../../assets/anh_services/anh (1).jpg";

const data = [
  {
    id: 1,
    image: PCDImg,
    title: "PCD Nguyễn Hải tuyển dụng 01 kỹ sư thiết kế kết cấu công trình",
    desc: "Tháng 6 này PCD Nguyễn Hải tuyển dụng 01 kỹ sư thiết kế cấu gia nhập đội...",
    link: "/tuyen-dung/ky-su-thiet-ke-ket-cau", // 👈 Link riêng
  },
  {
    id: 2,
    image: PCDImg,
    title: "Tuyển dụng giám sát công trình có kinh nghiệm",
    desc: "PCD Nguyễn Hải cần tuyển gấp 01 giám sát có kinh nghiệm thi công...",
    link: "/tuyen-dung/giam-sat-cong-trinh", // 👈 Link riêng
  },
  {
    id: 3,
    image: PCDImg,
    title: "Tuyển kế toán công trình nội bộ",
    desc: "Chúng tôi đang tìm kiếm 01 kế toán công trình làm việc tại văn phòng...",
    link: "/tuyen-dung/ke-toan-noi-bo", // 👈 Link riêng
  },
];

const Container_Recruiitment = () => {
  return (
    <div className="recruitment-wrapper">
      <h2 className="recruitment-heading">PCD NGUYỄN HẢI TUYỂN DỤNG</h2>

      <div className="recruitment-grid">
        {data.map((item) => (
          <a
            href={item.link}
            className="recruitment-card"
            key={item.id}
            target="_self"
            rel="noopener noreferrer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="recruitment-image"
            />
            <div className="recruitment-info">
              <h3 className="recruitment-title">{item.title}</h3>
              <p className="recruitment-desc">{item.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Container_Recruiitment;
