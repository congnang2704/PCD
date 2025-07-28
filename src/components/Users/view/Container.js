import React, { useState } from "react";
import { Row, Col, Typography, Statistic, Card, Image, Grid } from "antd"; // Import Grid
import {
  ApartmentOutlined,
  SmileOutlined,
  TeamOutlined,
  GlobalOutlined,
  RiseOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import DesignProcess from "./Design";
import IntroductionHome from "./Introduction_home";
import FeaturedProjects from "./FeaturedProjects/FeaturedProjects";
import SliderCMT from "./Slider_CMT/Slider_CMT";
import ContactForm from "./Mail/ContactFormMail";
import FAQComponent from "./FAQComponent/FAQComponent";

const { useBreakpoint } = Grid;
const Container = () => {
  const [showMore, setShowMore] = useState(false);
  const screens = useBreakpoint();
  const [activeTab, setActiveTab] = useState("design");

  return (
    <div>
      {/* Giới thiệu nhỏ của trang home Wrapper for the rest of the content */}
      <IntroductionHome />
      {/* Thiết kế & Thi công trọn gói */}
      <DesignProcess />
      {/* Công trình thiết kê và công trình tiêu biểu */}
      <FeaturedProjects />
      {/* Slider CMT */}
      <SliderCMT />
      {/* Form mail liên hệ */}
      <ContactForm />
      {/* các câu hỏi thường gặp */}
      <FAQComponent />
    </div>
  );
};

export default Container;
