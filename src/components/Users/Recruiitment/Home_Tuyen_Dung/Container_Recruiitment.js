import React from "react";
import "./Container_Recruiitment.css";
import PCDImgMarketing from "../../../../assets/tuyen-dung-marketing.png";
import PCDImgKeToan from "../../../../assets/tuyen-dung-nhan-vien-ke-toan.jpg";
import PCDImgKinhTeXD from "../../../../assets/ky-su-xay-dung-kinh-te-la-gi-hinh1.jpg";

const data = [
  {
    id: 1,
    image: PCDImgKeToan,
    title: "Tháng 6 này PCD Nguyễn Hải tuyển dụng 01 nhân viên kế toán",
    desc: "PCD Nguyễn Hải tuyển dụng 01 nhân viên kế toán gia nhập đội ngũ sáng tạo và năng động của chúng tôi...",
    link: "tuyen-dung/pcd-nguyen-hai-tuyen-dung-ke-toan",
  },
  {
    id: 2,
    image: PCDImgKinhTeXD,
    title:
      "Tháng 6 này PCD Nguyễn Hải tuyển dụng 01 nhân viên kinh tế xây dựng",
    desc: "PCD Nguyễn Hải tuyển dụng 01 nhân viên Kinh tế xây dựng có trách nhiệm, chuyên môn vững...",
    link: "/tuyen-dung/pcd-nguyen-hai-tuyen-dung-nhan-vien-kinh-te-xay-dung",
  },
  {
    id: 3,
    image: PCDImgMarketing,
    title: "Tháng 6 này PCD Nguyễn Hải tuyển dụng 01 nhân viên Marketing",
    desc: "PCD Nguyễn Hải tuyển dụng 01 nhân viên Marketing sáng tạo, năng động, đồng hành phát triển thương hiệu trong lĩnh vực xây dựng và kiến trúc....",
    link: "/tuyen-dung/pcd-nguyen-hai-tuyen-dung-nhan-vien-marketing",
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
