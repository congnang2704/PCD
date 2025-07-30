import React from "react";
import Slider from "react-slick";
import { Avatar, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "./Slider_CMT.css";

import imgavatar1 from "../../../../assets/anh-doanh-nhan-nu-min-1170x780.jpg.webp";
import imgavatar2 from "../../../../assets/Nam-11-min.jpg.webp";
import imgavatar3 from "../../../../assets/Doanh-nhan-nu-tre-13.jpg";
import imgavatar4 from "../../../../assets/Anh-CV-chuyen-nghiep-min-1.jpg.webp";
import imgavatar5 from "../../../../assets/Anh-doanh-nhan-nu-dep-16-min.jpg";

const { Paragraph } = Typography;

const comments = [
  {
    name: "Chị Lan (Đà Nẵng)",
    avatar: imgavatar1,
    content:
      "Cảm ơn đội ngũ NGUYỄN HẢI CO., LTD đã hỗ trợ vợ chồng tôi có được thiết kế ngôi nhà như ý. Chúc công ty ngày càng phát triển và thành công!",
  },
  {
    name: "Anh Nam (Huế)",
    avatar: imgavatar2,
    content:
      "Gia đình tôi rất hài lòng với ngôi nhà được NGUYỄN HẢI CO., LTD thiết kế và thi công. Đội ngũ làm việc rất chuyên nghiệp và tận tâm.",
  },
  {
    name: "Chị Hồng (Quảng Ngãi)",
    avatar: imgavatar3,
    content:
      "Hôm nay nhận nhà mới, thật sự rất vui và biết ơn NGUYỄN HẢI CO., LTD. Thiết kế đẹp, thi công đúng tiến độ và rất hợp ý gia đình tôi.",
  },
  {
    name: "Anh Minh (Quảng Nam)",
    avatar: imgavatar4,
    content:
      "Tôi đánh giá cao phong cách làm việc chuyên nghiệp và thân thiện của đội ngũ NGUYỄN HẢI CO., LTD. Nhà đẹp, đúng như mong muốn.",
  },
  {
    name: "Chị Thảo (Nha Trang)",
    avatar: imgavatar5,
    content:
      "Từ khâu tư vấn đến khi bàn giao nhà đều rất nhanh gọn và tận tâm. Cảm ơn NGUYỄN HẢI CO., LTD đã giúp tôi thực hiện được ngôi nhà mơ ước!",
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const SliderCMT = () => {
  return (
    <div className="slider-cmt-wrapper">
      <h1 className="slider-h1-wrapper">khách hàng nói gì về chúng tôi</h1>
      <div className="slider-cmt-container">
        <Slider {...settings}>
          {comments.map((item, index) => (
            <div className="comment-card" key={index}>
              <div className="comment-box">
                <CommentOutlined style={{ fontSize: 24, color: "#fff" }} />
                <Paragraph className="comment-text">{item.content}</Paragraph>
                <a href={item.link} className="comment-link">
                  Xem thêm
                </a>
                <div className="comment-arrow" />
              </div>
              <div className="comment-user">
                <Avatar src={item.avatar} size={48} />
                <span className="comment-name">{item.name}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderCMT;
