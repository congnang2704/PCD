import React, { useState } from "react";
import "../Architec_Design/Architec";
import "./Interior.css";
import ContactForm from "../../view/Mail/ContactFormMail";

import { Form, Input, Button, message, Row, Col, Grid, Radio } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";

import {
  FaUserFriends,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaDraftingCompass,
  FaCheckCircle,
} from "react-icons/fa";

// linh anh
import noithat from "../../../../assets/PK.png";
import cttb1House from "../../../../assets/PK3.png";
import cttb2House from "../../../../assets/PK1.png";
import cttb3House from "../../../../assets/PN1V1.png";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

const Architec_Designs = () => {
  const [form] = Form.useForm();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = (values) => {
    const templateParams = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      area: values.area,
      location: values.location,
      budget: values.budget,
      note: values.note || "",
    };

    emailjs
      .send(
        "service_i4rltcy",
        "template_hhuh2rd",
        templateParams,
        "54eQlmIQbspQwiCm4"
      )
      .then(() => {
        setSuccessMessage(
          "🎉 Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất."
        );
        form.resetFields();
        setTimeout(() => setSuccessMessage(""), 15000);
      })
      .catch((error) => {
        console.error("❗ EmailJS Error:", error);
        message.error("🚫 Đã có lỗi xảy ra khi gửi yêu cầu!");
      });
  };
  return (
    <div className="architec-container">
      {/* text */}
      <div className="architec-wrapper">
        <div className="architec-header">
          <h1 className="architec-title">
            GIỚI THIỆU CÔNG TY TNHH MTV{" "}
            <span className="highlight-blue"> PCD NGUYỄN HẢI </span> - DỊCH VỤ
            THIẾT KẾ KIẾN TRÚC NỘI THẤT
          </h1>
        </div>
        <div className="architec-description">
          <h3 className="architec-text">
            Chúng tôi – Công ty TNHH MTV{" "}
            <span className="highlight-blue"> PCD Nguyễn Hải </span> thiết kế
            thi công nội thất Đà Nẵng uy tín – tự hào đã và đang đồng hành cùng
            hàng trăm khách hàng trên hành trình hoàn thiện không gian sống lý
            tưởng.
          </h3>
          <p className="architec-text">
            Với sự kết hợp hài hòa giữa thẩm mỹ và công năng, mỗi thiết kế nội
            thất của chúng tôi không chỉ là một phần trang trí, mà còn là chiếc
            “áo mới” tôn vinh kiến trúc tổng thể của ngôi nhà. Bất kỳ ai bước
            chân vào không gian ấy đều sẽ ấn tượng, trầm trồ trước vẻ đẹp tinh
            tế và sự bố trí hợp lý đến từng chi tiết.
          </p>
          <p className="architec-text">
            Nếu bạn đang mong muốn sở hữu một tổ ấm khang trang, tinh tế và rộng
            rãi, nhưng vẫn tối ưu chi phí thì đừng ngần ngại – hãy liên hệ với{" "}
            <span className="highlight-blue"> PCD Nguyễn Hải </span> ngay hôm
            nay để được tư vấn tận tình và giải pháp thiết kế phù hợp nhất cho
            ngôi nhà của bạn.
          </p>
          <p className="architec-text"></p>
        </div>
      </div>
      <div className="kasai-intro-container">
        <h2 className="kasai-intro-title">
          <span className="highlight-blue"> PCD Nguyễn Hải </span> – 10+ năm
          kinh nghiệm thực tế
        </h2>
        <p className="kasai-intro-text">
          <span className="highlight-blue"> PCD Nguyễn Hải </span> là công ty tư
          vấn thiết kế và xây dựng với trụ sở chính tại
          <strong> 17 Nguyễn Cư Trinh, P. Hòa Cường, TP. Đà Nẵng </strong> cùng
          11 chi nhánh trải dài trên toàn quốc. Được thành lập từ năm 2015 bởi
          anh <strong>Lưu Hồng Lâm</strong>,{" "}
          <span className="highlight-blue"> PCD Nguyễn Hải </span> đã phát triển
          mạnh mẽ từ một công ty nhỏ thành một doanh nghiệp uy tín, được hàng
          ngàn khách hàng tin tưởng trong suốt hơn{" "}
          <strong>10 năm hoạt động</strong>.
        </p>
        <p className="kasai-intro-text">
          Với kinh nghiệm dày dạn,{" "}
          <span className="highlight-blue"> PCD Nguyễn Hải </span> chuyên thực
          hiện các dịch vụ như:
          <strong>
            {" "}
            thiết kế kiến trúc, thiết kế nội thất, thi công thô, thi công hoàn
            thiện
          </strong>{" "}
          và
          <strong> xây dựng trọn gói</strong> cho đa dạng loại hình công trình
          từ nhà dân dụng đến quy mô lớn như:
          <em>
            {" "}
            nhà phố, nhà 2 tầng, 3 tầng, 4 tầng, biệt thự, văn phòng, khách sạn,
            căn hộ...
          </em>
        </p>
      </div>

      {/* ảnh và text */}
      <div className="architec-image-container-tb">
        <img
          src={noithat}
          alt="Mẫu nội thất do PCD Nguyễn Hải thiết kế"
          className="architec-image-tb"
        />
        <div className="architec-caption-imgtb">
          <em>Mẫu nội thất do PCD Nguyễn Hải thiết kế</em>
        </div>
      </div>

      {/* các câu hỏi thường gặp */}
      <FAQComponent />

      {/* text */}
      <div className="pcd-commitment-container">
        <h2 className="pcd-commitment-title">
          PCD Nguyễn Hải – 10+ năm kinh nghiệm & cam kết chất lượng
        </h2>
        <p className="pcd-commitment-intro">
          Suốt hơn 10 năm hoạt động,{" "}
          <span className="highlight-pcd">PCD Nguyễn Hải</span> luôn được khách
          hàng tin tưởng lựa chọn nhờ những cam kết rõ ràng và sự tận tâm trong
          từng dự án:
        </p>

        <div className="pcd-benefit">
          <h4>🔹 Cam kết tối ưu công năng và đảm bảo tính thẩm mỹ</h4>
          <p>
            Đội ngũ kiến trúc sư của{" "}
            <span className="highlight-pcd">PCD Nguyễn Hải</span> không ngừng
            cập nhật xu hướng, sáng tạo và tinh tế trong từng thiết kế. Mỗi bản
            vẽ được nghiên cứu kỹ lưỡng nhằm mang lại không gian sống hiện đại,
            hài hòa, tiện nghi và tối ưu công năng cho khách hàng.
          </p>
        </div>

        <div className="pcd-benefit">
          <h4>🔹 Đảm bảo an toàn và chất lượng công trình</h4>
          <p>
            Chúng tôi lựa chọn vật liệu an toàn, thân thiện với sức khỏe, bền bỉ
            theo thời gian và bố trí không gian phù hợp với kết cấu – đảm bảo
            công trình vững chắc và an toàn tối đa.
          </p>
        </div>

        <div className="pcd-benefit">
          <h4>🔹 Hợp đồng minh bạch – Hồ sơ đầy đủ</h4>
          <p>
            <span className="highlight-pcd">PCD Nguyễn Hải</span> cung cấp hợp
            đồng rõ ràng và hồ sơ thiết kế chi tiết gồm: phối cảnh 3D, mặt bằng,
            vật liệu, chủng loại thiết bị... Tất cả được minh bạch và bảo đảm
            quyền lợi khách hàng.
          </p>
        </div>

        <div className="pcd-benefit">
          <h4>🔹 Chi phí hợp lý, tư vấn tận tâm</h4>
          <p>
            Dựa trên ngân sách và nhu cầu thực tế, kiến trúc sư{" "}
            <span className="highlight-pcd">PCD Nguyễn Hải</span> đưa ra giải
            pháp tối ưu – vừa đáp ứng mong muốn thẩm mỹ, vừa tiết kiệm chi phí
            đầu tư.
          </p>
        </div>

        <h3 className="pcd-process-title">
          Quy trình thiết kế nội thất tại PCD Nguyễn Hải – Uy tín & Chuyên
          nghiệp
        </h3>

        <div className="pcd-process-list">
          <div className="pcd-process-item">
            <strong>1. Tiếp nhận yêu cầu & tư vấn ban đầu:</strong>
            <br />- Liên hệ qua hotline:{" "}
            <span className="highlight-pcd">0905 402 989</span>.
            <br />- Website:{" "}
            <span className="highlight-pcd">
              nguyenhai.com.vn & thicongnhadanang.vn
            </span>
            <br />- Fanpage{" "}
            <span className="highlight-pcd">
              “PCD Nguyễn Hải – Thiết kế & Xây dựng”.
            </span>{" "}
            <br />
            Đội ngũ tư vấn lắng nghe, phân tích nhu cầu, phong cách, công năng
            và ngân sách.
          </div>
          <div className="pcd-process-item">
            <strong>2. Gửi báo giá chi tiết:</strong> Dựa trên ý tưởng đã trao
            đổi, báo giá cụ thể kèm lộ trình sẽ được gửi để khách hàng nắm rõ.
          </div>
          <div className="pcd-process-item">
            <strong>3. Ký kết hợp đồng:</strong> Hai bên thống nhất và ký hợp
            đồng chính thức để triển khai dự án đúng tiến độ, đúng cam kết.
          </div>
          <div className="pcd-process-item">
            <strong>4. Thực hiện thiết kế chi tiết:</strong> Kiến trúc sư tiến
            hành vẽ mặt bằng, phối cảnh 3D, bố trí nội thất và bản vẽ kỹ thuật –
            đảm bảo phù hợp thẩm mỹ và nhu cầu thực tế.
          </div>
          <div className="pcd-process-item">
            <strong>5. Bàn giao hồ sơ & quyết toán:</strong> PCD Nguyễn Hải hoàn
            tất hồ sơ, bàn giao cho khách hàng và tiến hành thanh lý hợp đồng
            sau quyết toán.
          </div>
        </div>
      </div>

      {/* form liên hệ */}
      <div className="form-wrapper">
        <h1 className="form-title-h1">Liên hệ với chúng tôi</h1>
        <Row gutter={32} className="form-container">
          <Col xs={24} md={12} className="form-contact">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                {" "}
                <Input placeholder="Họ và tên" />{" "}
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                {" "}
                <Input placeholder="Số điện thoại" />{" "}
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email hợp lệ!",
                  },
                ]}
              >
                {" "}
                <Input placeholder="Email" />{" "}
              </Form.Item>
              <Form.Item
                name="area"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập diện tích và số tầng!",
                  },
                ]}
              >
                {" "}
                <Input placeholder="Diện tích đất và số tầng muốn xây" />{" "}
              </Form.Item>
              <Form.Item
                name="location"
                rules={[
                  { required: true, message: "Vui lòng nhập địa phương!" },
                ]}
              >
                {" "}
                <Input placeholder="Địa phương muốn xây" />{" "}
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ color: "rgb(9, 108, 181)", fontWeight: 500 }}>
                    Ngân sách thiết kế nội thất
                  </span>
                }
                name="budget"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngân sách thiết kế nội thất!",
                  },
                ]}
              >
                <Radio.Group style={{ width: "100%", fontWeight: 500 }}>
                  <Row gutter={[10, 10]}>
                    <Col span={6}>
                      <Radio value="Dưới 50 Triệu">Dưới 50 Triệu</Radio>
                    </Col>
                    <Col span={6}>
                      <Radio value="50 - 100 Triệu">50 - 100 Triệu</Radio>
                    </Col>
                    <Col span={6}>
                      <Radio value="100 - 150 Triệu">100 - 150 Triệu</Radio>
                    </Col>
                    <Col span={6}>
                      <Radio value="Trên 150 Triệu">Trên 150 Triệu</Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="note">
                {" "}
                <Input.TextArea
                  rows={2}
                  placeholder="Yêu cầu chi tiết nếu có!"
                />{" "}
              </Form.Item>
              {successMessage && (
                <div
                  style={{
                    marginBottom: 16,
                    backgroundColor: "#f6ffed",
                    border: "1px solid #52c41a",
                    color: "#389e0d",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  {successMessage}
                </div>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ background: "#016bb4", border: "none" }}
                >
                  Gửi yêu cầu!
                </Button>
              </Form.Item>
            </Form>
          </Col>

          {screens.md && (
            <Col xs={24} md={12} className="image-container">
              <div style={{ position: "relative" }}>
                <img
                  src="https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2021/2/16/photo1613453220800-1613453220972454302062.png"
                  alt="Representative"
                  className="form-image"
                />
                <div className="social-buttons">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon fb"
                  >
                    {" "}
                    <FacebookFilled style={{ fontSize: "18px" }} />{" "}
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon yt"
                  >
                    {" "}
                    <YoutubeFilled style={{ fontSize: "18px" }} />{" "}
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon tt"
                  >
                    {" "}
                    <TikTokOutlined style={{ fontSize: "18px" }} />{" "}
                  </a>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>

      {/* công trình tiêu biểu */}
      <div className="architec-wrapper">
        <div className="architec-header">
          <h1 className="architec-title">
            Những công trình thiết kế nội thất đẹp tiêu biểu của{" "}
            <span className="highlight-blue"> PCD Nguyễn Hải </span>
          </h1>
        </div>
        {/* cttb1House */}
        <div className="architec-image-container-tb">
          <img
            src={cttb1House}
            alt="Mẫu nội thất do PCD Nguyễn Hải thiết kế"
            className="architec-image-tb"
          />
          <div className="architec-caption-imgtb">
            <em>Mẫu nội thất do PCD Nguyễn Hải thiết kế</em>
          </div>
        </div>

        {/* cttb2House */}
        <div className="architec-image-container-tb">
          <img
            src={cttb2House}
            alt="Mẫu nội thất do PCD Nguyễn Hải thiết kế"
            className="architec-image-tb"
          />
          <div className="architec-caption-imgtb">
            <em>Mẫu nội thất do PCD Nguyễn Hải thiết kế</em>
          </div>
        </div>

        {/* cttb3House */}
        <div className="architec-image-container-tb">
          <img
            src={cttb3House}
            alt="Mẫu nội thất do PCD Nguyễn Hải thiết kế"
            className="architec-image-tb"
          />
          <div className="architec-caption-imgtb">
            <em>Mẫu nội thất do PCD Nguyễn Hải thiết kế</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architec_Designs;
