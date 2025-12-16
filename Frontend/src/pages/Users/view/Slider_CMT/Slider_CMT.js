import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Avatar, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "./Slider_CMT.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Paragraph } = Typography;

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 2 } },
    { breakpoint: 992, settings: { slidesToShow: 1 } },
  ],
  // tùy chọn: bật arrows đẹp (sau khi đã import theme)
  arrows: true,
};

const SliderCMT = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://api.nguyenhai.com.vn/api/testimonials")
      .then((r) => r.json())
      .then((data) =>
        Array.isArray(data) ? setComments(data) : setComments(data?.items || [])
      )
      .catch((err) => console.error("Lấy đánh giá thất bại:", err));
  }, []);

  return (
    <div className="slider-cmt-wrapper">
      <h1 className="slider-h1-wrapper">Khách hàng nói gì về chúng tôi</h1>
      <div className="slider-cmt-container">
        <Slider {...settings}>
          {comments.map((item, idx) => (
            <div className="comment-card" key={item?._id || idx}>
              <div className="comment-box">
                <CommentOutlined
                  style={{ fontSize: 24, color: "#fff", marginBottom: 8 }}
                />
                <Paragraph className="comment-text">{item?.content}</Paragraph>
                <div className="comment-arrow" />
              </div>
              <div className="comment-user">
                <Avatar
                  src={item?.avatar}
                  size={48}
                  alt={item?.name || "Khách hàng"}
                />
                <span className="comment-name">{item?.name || "Ẩn danh"}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderCMT;
