import React from 'react';
import Slider from 'react-slick';
import { Avatar, Typography } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import './Slider_CMT.css';

const { Paragraph } = Typography;

const comments = [
  {
    name: "Vy Phan (vợ Anh Dũng Quảng Nam)",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Cảm ơn đội ngũ NGUYỄN HẢI CO., LTD đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và NGUYỄN HẢI CO., LTD ngày càng phát triển hơn",
    link: "#"
  },
  {
    name: "Anh Thành - Đồng Nai",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "Trả hàng cho anh em NGUYỄN HẢI CO., LTD, cảm ơn tất cả anh em NGUYỄN HẢI CO., LTD đã thiết kế, tư vấn và hỗ trợ gia đình trong suốt quá trình thi công để hoàn thành ngôi nhà mơ ước của gia đình mình!",
    link: "#"
  },
  {
    name: "Chị Hiền (Anh Phong - Hải Dương)",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "Hôm nay là mình lên nhà mới, công việc cũng đã hoàn tất mình xin gửi lời cảm ơn đến toàn thể gđ NGUYỄN HẢI CO., LTD ạ! Thật sự thiết kế rất ưng ý vợ chồng mình",
    link: "#"
  },
  {
    name: "Anh Bình (Bình Dương)",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    content: "Dịch vụ tuyệt vời, đội ngũ nhiệt tình và chuyên nghiệp. Tôi rất hài lòng với thiết kế của NGUYỄN HẢI CO., LTD!",
    link: "#"
  },
  {
    name: "Chị Mai (TP.HCM)",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    content: "Từ lúc tư vấn đến khi bàn giao nhà đều rất nhanh chóng và chuyên nghiệp. Cảm ơn NGUYỄN HẢI CO., LTD rất nhiều!",
    link: "#"
  }
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
        slidesToShow: 1
      }
    }
  ]
};

const SliderCMT = () => {
  return (
    <div className="slider-cmt-wrapper">
      <div className="slider-cmt-container">
        <Slider {...settings}>
          {comments.map((item, index) => (
            <div className="comment-card" key={index}>
              <div className="comment-box">
                <CommentOutlined style={{ fontSize: 24, color: '#fff' }} />
                <Paragraph className="comment-text">{item.content}</Paragraph>
                <a href={item.link} className="comment-link">Xem thêm</a>
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
