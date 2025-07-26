import React from "react";
import "../Rough_Construction/Rough.css";
import ContactForm from "../../view/Mail/ContactFormMail";

// linh anh
import thicongtho from "../../../assets/anh_services/anh (1).jpg";
import cttb1House from "../../../assets/anh_services/anh (7).jpg";
import cttb2House from "../../../assets/anh_services/anh (2).jpg";
import cttb3House from "../../../assets/anh_services/anh (6).jpg";
import cttb4House from "../../../assets/anh_services/nhahoaxuan1.jpg";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

const Rough = () => {
  return (
    <div className="rough-container">
      {/* text */}
      <div className="rough-wrapper">
        <div className="rough-header">
          <h1 className="rough-title">
            GIỚI THIỆU CÔNG TY TNHH MTV{" "}
            <span className="highlight-blue">PCD NGUYỄN HẢI</span> - DỊCH VỤ THI
            CÔNG THÔ
          </h1>
        </div>
        <div className="rough-description">
          <h3 className="rough-text">
            Xây nhà phần thô là giai đoạn đầu tiên và đóng vai trò quan trọng
            trong việc dựng xây nhà bao gồm các hạng mục thi công móng, xây và
            trát trường toàn nhà,… Trong giai đoạn này, ngôi nhà sẽ trông như
            một “bức tranh” chưa hoàn thiện, với tường xám bê tông. Trong nội
            dung bài viết dưới đây{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span> gửi đến gia
            chủ bảng báo giá xây dựng phần thô chi tiết nhất. Mời mọi người cùng
            tham khảo bài viết!
          </h3>
          <h2 className="kasai-intro-title">
            Dịch vụ thi công nhà phần thô của{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <p className="rough-text">
            <span className="highlight-blue">PCD Nguyễn Hải</span> cung cấp dịch
            vụ thi công phần thô nhà phố, biệt thự, căn hộ chung cư, tòa nhà văn
            phòng,.. tại các tỉnh miền Trung (Đà Nẵng, Huế, Quảng Trị, Quảng
            Bình, Hà Tĩnh, Tp.Vinh, Thanh Hóa. Quảng Nam, Quảng Ngãi) và miền
            Nam (TPHCM).
          </p>
          <p className="rough-text">
            Với nhiều năm hoạt động,{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span> đã thực hiện
            hơn 400 dự án thi công phần thô và hoàn thành bàn giao tới khách
            hàng. Với thi công thô, chúng tôi áp dụng các giải pháp & kỹ thuật
            thi công mới nhất theo tiêu chuẩn. Nhằm mang lại công trình chất
            lượng nhất, bền vững và an toàn. Cùng với đó, đội ngũ kỹ sư của
            chúng tôi giàu kinh nghiệm, tận tâm và linh hoạt trong việc tối ưu
            hóa quá trình xây dựng, từ việc chọn vật liệu đến phương pháp thi
            công.
          </p>
        </div>
      </div>

      {/* ảnh và text */}
      <div className="rough-image-container-tb">
        <img
          src={thicongtho}
          alt="Mẫu nội thất do PCD Nguyễn Hải thiết kế"
          className="rough-image-tb"
        />
        <div className="rough-caption-imgtb">
          <em>Mẫu nội thất do PCD Nguyễn Hải thiết kế</em>
        </div>
      </div>

      {/* text */}
      <div className="rough-commitment-container">
        <p className="rough-commitment-intro">
          <span className="highlight-pcd">PCD Nguyễn Hải</span> đảm bảo sự bền
          vững và độ ổn định cao cho từng công trình, từ việc kiểm soát chất
          lượng thi công, đáp ứng thời gian, ngân sách đã thống nhất với chủ đầu
          tư. Chúng tôi cam kết công trình hoàn thành đúng tiến độ bàn giao như
          đã thống nhất với chủ đầu tư.
        </p>
      </div>

      {/* form liên hệ */}
      <ContactForm />

      {/* text */}
      <div className="rough-description">
        <h2 className="kasai-intro-title">
          Điều kiện và các yếu tố ảnh hưởng đến giá thi công nhà phần thô
        </h2>
        <p className="rough-text">
          Dưới đây là các yếu tố ảnh hưởng đến thi công nhà phần thô:
          <br />
          - Nhà có 06 diện tích sàn trở lên.
          <br />
          - Nhà có công năng đặc biệt như: hầm, thang máy, hồ bơi,…
          <br />
          - Vị trí nhà nằm trong hẻm nhỏ, kiệt ảnh hưởng đến việc tập kết vật
          liệu và di chuyển vật liệu.
          <br />
          - Nhà có 2 mặt tiền trở lên.
          <br />
          - Nhà thiết kế phong cách tân cổ điển, cổ điển thì phần đắp phù điêu
          hoa văn sẽ tính giá riêng.
          <br />- Nhà có diện tích sàn quá nhỏ.
        </p>
      </div>

      {/* text */}
      <div className="rough-description">
        <h2 className="kasai-intro-title">Hợp đồng xây dựng nhà phần thô</h2>
        <p className="rough-text">
          Trong hợp đồng xây dựng nhà phần thô của{" "}
          <span className="highlight-blue">PCD Nguyễn Hải</span> bao gồm những
          nội dung chi tiết như sau:
          <br />
          - Nội dung và khối lượng công việc gồm các hạng mục và thời gian thi
          công.
          <br />- Các giải pháp và kỹ thuật thi công của{" "}
          <span className="highlight-blue">PCD Nguyễn Hải</span>.
          <br />
          - Giá hợp đồng và cách thức thanh toán theo từng giai đoạn.
          <br />
          - Quyền và trách nhiệm của 2 bên.
          <br />
          - Công việc nghiệm thu và bàn giao.
          <br />
          - Chính sách bảo hành chi tiết.
          <br />- Cuối cùng là bảng thống kế bảng vật tư xây thô.
        </p>
      </div>

      {/* các câu hỏi thường gặp */}
      <FAQComponent />

      {/* công trình tiêu biểu */}
      <div className="rough-wrapper">
        <div className="rough-header">
          <h1 className="rough-title">
            Những công trình thi công thô tiêu biểu của{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h1>
        </div>
        {/* cttb1House */}
        <div className="rough-image-container-tb">
          <img
            src={cttb1House}
            alt="Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng"
            className="rough-image-tb"
          />
          <div className="rough-caption-imgtb">
            <em>Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng</em>
          </div>
        </div>

        {/* cttb2House */}
        <div className="rough-image-container-tb">
          <img
            src={cttb2House}
            alt="Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng"
            className="rough-image-tb"
          />
          <div className="rough-caption-imgtb">
            <em>Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng</em>
          </div>
        </div>

        {/* cttb3House */}
        <div className="rough-image-container-tb">
          <img
            src={cttb3House}
            alt="Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng"
            className="rough-image-tb"
          />
          <div className="rough-caption-imgtb">
            <em>Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng</em>
          </div>
        </div>
        {/* cttb4House */}
        <div className="rough-image-container-tb">
          <img
            src={cttb4House}
            alt="Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng"
            className="rough-image-tb"
          />
          <div className="rough-caption-imgtb">
            <em>Hình ảnh công trình thi công thô do PCD Nguyễn Hải xây dựng</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rough;
