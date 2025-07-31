import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col, Grid, Radio } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import "./Architec.css";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

// linh anh
import House from "../../../../assets/MT4.png";
import nhaHouse from "../../../../assets/homstay.jpg";
import cttb1House from "../../../../assets/anhcttb.bmp";
import cttb2House from "../../../../assets/v1.png";
import cttb3House from "../../../../assets/v2.png";

import {
  FaUserFriends,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaDraftingCompass,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserFriends />,
    title: "TIẾP NHẬN VÀ TƯ VẤN",
    description:
      "Lắng nghe và tư vấn theo nhu cầu, mong muốn của khách hàng, định hướng phong cách thiết kế và mức đầu tư phù hợp",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "BÁO GIÁ CHI TIẾT",
    description:
      "Gửi báo giá kèm quy trình làm việc rõ ràng, chi tiết theo yêu cầu của khách hàng",
  },
  {
    icon: <FaFileSignature />,
    title: "KÝ HỢP ĐỒNG",
    description:
      "Hai bên thống nhất, ký hợp đồng và bắt đầu triển khai công việc theo tiến độ đã cam kết",
  },
  {
    icon: <FaDraftingCompass />,
    title: "TRIỂN KHAI THIẾT KẾ",
    description:
      "Lên thiết kế mặt bằng công năng, bản vẽ 3D, điều chỉnh theo không gian, phong thủy và kiến trúc tổng thể.",
  },
  {
    icon: <FaCheckCircle />,
    title: "BÀN GIAO & QUYẾT TOÁN",
    description:
      "Khách hàng thanh toán khoản phí còn lại và nhận hồ sơ thi công (kiến trúc, kết cấu, điện nước) đầy đủ.",
  },
];

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
            THIẾT KẾ KIẾN TRÚC
          </h1>
        </div>
        <div className="architec-description">
          <p className="architec-text">
            Với đội ngũ kiến trúc sư và kỹ sư giàu kinh nghiệm, sáng tạo không
            ngừng,
            <span className="highlight-blue"> PCD Nguyễn Hải </span> không chỉ
            mang đến những bản vẽ thiết kế mang tính thẩm mỹ cao mà còn đảm bảo
            tối ưu hóa công năng sử dụng trong từng không gian sống. Mỗi công
            trình là một tác phẩm nghệ thuật được “đo ni đóng giày” theo nhu cầu
            và phong cách riêng của từng gia chủ – từ biệt thự sang trọng, nhà
            phố hiện đại cho đến các mẫu nhà cấp 4 ấm cúng, tiện nghi.
          </p>
          <p className="architec-text">
            Chúng tôi hiểu rằng một ngôi nhà không chỉ là nơi che mưa nắng mà
            còn là tổ ấm – nơi gắn kết yêu thương và thể hiện cá tính của chính
            bạn. Vì vậy, <span className="highlight-blue">PCD Nguyễn Hải</span>{" "}
            luôn đồng hành cùng khách hàng từ bước lên ý tưởng, tư vấn thiết kế
            cho đến thi công hoàn thiện, với cam kết rõ ràng về chất lượng, tiến
            độ và chi phí hợp lý nhất. Hãy để{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span> biến ngôi nhà
            mơ ước của bạn thành hiện thực – đẹp, tiện nghi và trường tồn cùng
            thời gian.
          </p>
        </div>
      </div>

      {/* ảnh và text */}
      <div className="architec-wrapper">
        <div className="architec-image-container">
          <img
            src={House}
            alt="Mẫu biệt thự hiện đại do PCD Nguyễn Hải thiết kế"
            className="architec-image"
          />
        </div>
        <div className="architec-caption">
          <em>Mẫu biệt thự hiện đại do PCD Nguyễn Hải thiết kế</em>
        </div>
      </div>

      {/* text */}
      <div className="architec-description">
        <h2 className="architec-title">
          Tại sao phải thiết kế kiến trúc nhà ở?
        </h2>
        <p className="architec-text">
          Thiết kế kiến trúc nhà ở là quá trình lên bản vẽ chi tiết cho toàn bộ
          ngôi nhà – từ mặt tiền, bố trí không gian chức năng, phân chia các
          phòng, phối màu nội thất đến sắp xếp tổng thể bố cục hợp lý. Một bản
          thiết kế kiến trúc hoàn chỉnh không chỉ đảm bảo yếu tố thẩm mỹ theo
          mong muốn của gia chủ mà còn phải phù hợp với các nguyên tắc phong
          thủy – yếu tố đã trở thành một phần quan trọng trong văn hóa xây dựng
          của người Việt.
        </p>
        <p className="architec-text">
          Bên cạnh đó, các công ty thiết kế chuyên nghiệp còn hỗ trợ gia chủ
          hoàn thiện bộ hồ sơ xin phép xây dựng theo đúng quy định pháp luật,
          giúp tiết kiệm thời gian và tránh những rắc rối không cần thiết trong
          quá trình chuẩn bị thi công. Việc không có bản thiết kế kiến trúc rõ
          ràng sẽ khiến quá trình xây dựng gặp nhiều khó khăn.
        </p>
        <p className="architec-text">
          Thi công có thể xảy ra sai sót, không đúng ý tưởng ban đầu, ảnh hưởng
          đến chất lượng công trình và gây phát sinh chi phí sửa chữa, điều
          chỉnh sau này. Một bản vẽ không đạt chuẩn còn có thể khiến công trình
          mất cân đối, thiếu tính bền vững và không đảm bảo an toàn.
        </p>
        <p className="architec-text">
          Chính vì thế, từ góc độ thẩm mỹ, phong thủy cho đến tính pháp lý, việc
          hợp tác với một công ty thiết kế nhà ở chuyên nghiệp là bước đi quan
          trọng và cần thiết. Đó là nền tảng giúp gia chủ hiện thực hóa giấc mơ
          về một không gian sống đẹp, khoa học, tiện nghi và trường tồn theo
          thời gian.
        </p>
      </div>

      {/* ảnh và text */}
      <div className="architec-wrapper">
        <div className="architec-image-container">
          <img
            src={nhaHouse}
            alt="Mẫu Homestay do PCD Nguyễn Hải thiết kế"
            className="architec-image"
          />
        </div>
        <div className="architec-caption">
          <em>Mẫu Homestay do PCD Nguyễn Hải thiết kế</em>
        </div>
      </div>

      {/* các câu hỏi thường gặp */}
      <FAQComponent />

      {/* text */}
      <div className="benefits-wrapper">
        <h2 className="benefits-title">
          Lợi ích khi thiết kế kiến trúc tại PCD Nguyễn Hải
        </h2>
        <p className="benefits-desc">
          Trên thị trường xây dựng hiện nay, có rất nhiều đơn vị cung cấp dịch
          vụ thiết kế, tư vấn thi công và xây dựng trọn gói “chìa khóa trao
          tay”. Tuy nhiên, <strong>PCD Nguyễn Hải</strong> là một trong những
          công ty thiết kế kiến trúc uy tín hàng đầu, được nhiều khách hàng tin
          tưởng lựa chọn tại Đà Nẵng, Hà Tĩnh, Hải Phòng và nhiều tỉnh thành
          trên toàn quốc.
        </p>

        <h3 className="benefits-subtitle">
          Khi đến với PCD Nguyễn Hải, bạn sẽ nhận được những lợi ích vượt trội
          sau:
        </h3>

        <div className="benefit-item">
          <h4>
            Thiết kế bởi đội ngũ kiến trúc sư giàu kinh nghiệm và chuyên môn cao
          </h4>
          <p>
            Đội ngũ của PCD Nguyễn Hải gồm các kiến trúc sư tốt nghiệp từ những
            trường đại học danh tiếng trong và ngoài nước. Khách hàng sẽ được
            trực tiếp làm việc với kiến trúc sư để giải đáp mọi thắc mắc liên
            quan đến bản vẽ, công năng, bố cục và phong thủy – đảm bảo ngôi nhà
            vừa đẹp, vừa tối ưu.
          </p>
        </div>

        <div className="benefit-item">
          <h4>Chi phí thiết kế hợp lý và minh bạch</h4>
          <p>
            Mỗi công trình sẽ có mức chi phí khác nhau tùy vào diện tích, phong
            cách thiết kế (hiện đại, cổ điển, tối giản...), số tầng và loại vật
            liệu sử dụng. PCD Nguyễn Hải cam kết báo giá rõ ràng, cạnh tranh và
            phân tích kỹ lưỡng cho khách hàng trước khi tiến hành ký hợp đồng.
          </p>
        </div>

        <div className="benefit-item">
          <h4>Hợp đồng rõ ràng – Hồ sơ đầy đủ</h4>
          <p>
            Là đơn vị chuyên nghiệp, PCD Nguyễn Hải luôn thực hiện ký kết hợp
            đồng cụ thể với khách hàng. Hồ sơ thiết kế được bàn giao đầy đủ, bao
            gồm phối cảnh 3D, bản vẽ kiến trúc, kết cấu, điện nước... Mọi điều
            khoản về chi phí, tiến độ và cam kết chất lượng đều được thể hiện
            minh bạch trong hợp đồng.
          </p>
        </div>

        <div className="benefit-item">
          <h4>Hệ thống chi nhánh và hỗ trợ online toàn quốc</h4>
          <p>
            PCD Nguyễn Hải đã mở rộng chi nhánh tại nhiều khu vực, thuận tiện
            cho khách hàng đến tư vấn trực tiếp. Đồng thời, các kênh hỗ trợ trực
            tuyến như Facebook, Email cũng luôn có nhân viên trực 24/7 sẵn sàng
            hỗ trợ, tư vấn mọi lúc, mọi nơi.
          </p>
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
                    Ngân sách thiết kế kiến trúc
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

      <div className="design-process-container">
        <h2 className="process-title">
          Quy trình thiết kế chuyên nghiệp tại PCD Nguyễn Hải
        </h2>

        <div className="process-step">
          <h4>1. Tiếp nhận và tư vấn:</h4>
          <p>
            Khách hàng liên hệ với PCD Nguyễn Hải qua hotline{" "}
            <span className="hotline">0905 402 989</span> hoặc Fanpage Facebook
            "Nguyễn Hải DECO”, để lại thông tin trên website. Nhân viên sẽ lắng
            nghe và tư vấn theo nhu cầu của khách hàng, từ đó định hướng được
            phong cách mà khách hàng muốn thiết kế cũng như mức giá mà khách
            hàng có thể đầu tư.
          </p>
        </div>

        <div className="process-step">
          <h4>2. Báo giá chi tiết</h4>
          <p>
            Sau khi thống nhất được ý tưởng PCD Nguyễn Hải sẽ tiến hành gửi báo
            giá kèm quy trình làm việc đến khách hàng.
          </p>
        </div>

        <div className="process-step">
          <h4>3. Ký hợp đồng</h4>
          <p>
            Khách hàng đồng ý với báo giá thiết kế kiến trúc của PCD Nguyễn Hải
            thì 2 bên tiến hành ký hợp đồng và triển khai công việc theo hợp
            đồng đã cam kết.
          </p>
        </div>

        <div className="process-step">
          <h4>4. Triển khai thiết kế</h4>
          <p>
            Các kiến trúc sư sẽ thiết kế mặt bằng công năng, bản vẽ 3D, các
            thiết kế khác trong công trình theo yêu cầu, ý tưởng sáng tạo nhưng
            tối ưu nhất. Đồng thời có những điều chỉnh về không gian, phong thủy
            để mang lại bản vẽ hoàn hảo nhất.
          </p>
        </div>

        <div className="process-step">
          <h4>5. Bàn giao và quyết toán</h4>
          <p>
            PCD Nguyễn Hải gửi hồ sơ <strong>thiết kế kiến trúc</strong> cho
            khách hàng và thanh lý hợp đồng. Khách hàng thanh toán các khoản phí
            còn lại, nhận hồ sơ thiết kế là hoàn thành.
          </p>
        </div>

        {/* Hình ảnh minh họa quy trình */}
        <div className="process-steps-container">
          {steps.map((step, index) => (
            <div className="step-box" key={index}>
              <div className="step-icon">{step.icon}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* công trình tiêu biểu */}
      <div className="architec-wrapper">
        <div className="architec-header">
          <h1 className="architec-title">
            Các công trình tiêu biểu của PCD Nguyễn Hải
          </h1>
        </div>
        {[cttb1House, cttb2House, cttb3House].map((img, index) => (
          <div className="architec-image-container-tb" key={index}>
            <img
              src={img}
              alt={`Công trình ${index + 1}`}
              className="architec-image-tb"
            />
            <div className="architec-caption-imgtb">
              <em>Công trình {index + 1} do PCD Nguyễn Hải thiết kế</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Architec_Designs;
