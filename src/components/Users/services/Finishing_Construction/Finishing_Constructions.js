import React from "react";
import "./Finishing_Constructions.css";
import ContactForm from "../../view/Mail/ContactFormMail";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

// Hình ảnh minh họa
import finishing1 from "../../../../assets/anh_services/thicongnhatho.jpg";
import finishing2 from "../../../../assets/anh_services/thicongnhatho2.jpg";
import finishing3 from "../../../../assets/anh_services/thicongnhatho3.jpg";
import finishing4 from "../../../../assets/anh_services/thicongnhatho4.jpg";
import finishing5 from "../../../../assets/anh_services/thicongnhatho5.jpg";

const Finishing_Constructions = () => {
  return (
    <div className="finishing-container">
      <div className="finishing-wrapper">
        {/* Tiêu đề */}
        <div className="finishing-header">
          <h1 className="finishing-title">
            GIỚI THIỆU CÔNG TY TNHH MTV{" "}
            <span className="highlight-blue">
              PCD NGUYỄN HẢI - THI CÔNG HOÀN THIỆN
            </span>
          </h1>
        </div>

        {/* Giới thiệu dịch vụ */}
        <div className="finishing-description">
          <h3 className="finishing-text">
            Giai đoạn hoàn thiện công trình là bước quan trọng để biến ngôi nhà
            từ bản vẽ thành thực tế sống động. Từ sơn tường, lát sàn, lắp đặt hệ
            thống điện nước đến nội thất cơ bản, tất cả đều cần được tính toán
            kỹ lưỡng để tối ưu chi phí mà vẫn đảm bảo chất lượng. Tại{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>, chúng tôi
            cam kết mang đến chất lượng thi công hoàn hảo, tiến độ nhanh chóng
            và sự hài lòng tuyệt đối cho khách hàng.
          </h3>

          <h2 className="finishing-subtitle">
            1. Lý do chọn dịch vụ hoàn thiện của{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <p className="finishing-text">
            Hoàn thiện nhà xây thô là phần việc sau khi hoàn thành quá trình thi
            công nhà phần thô. Đây là phần công đoạn có vai trò quyết định đến
            vẻ đẹp và tính thẩm mỹ của ngôi nhà. Các phần về điện, nước, đóng
            trần, hoàn thiện các góc cạnh, mảng tường, trang trí lắp đặt các vật
            tư trong không gian sống. Hoàn thiện nhà xây thô có thể là bước đầu
            để tạo nên một ngôi nhà đẹp.
            <br /> Chính vì vậy khi thi công phần thô cần được tính toán chi
            tiết theo kế hoạch. Yêu cầu sự kỹ lưỡng, tính chính xác cao thì phần
            hoàn thiện nhà sẽ nhanh và không bị phát sinh thêm những chi phí
            không đáng có.
          </p>
        </div>

        {/* Hình ảnh công trình hoàn thiện 1 */}
        <div className="finishing-image-container">
          <img
            src={finishing1}
            alt="Hoàn thiện công trình do PCD Nguyễn Hải thực hiện"
            className="finishing-image"
          />
          <div className="finishing-caption">
            <em>Hoàn thiện công trình do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* Form liên hệ */}
        <ContactForm />

        {/* 2 các hạng mục công việc để hoàn thiện nhà xây thô */}
        <div className="finishing-description">
          <h2 className="finishing-subtitle">
            2. Các hạng mục công việc để hoàn thiện nhà xây thô{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <p className="finishing-text-description">
            Các hạng mục công việc trong quá trình hoàn thiện nhà xây thô thông
            thường qua các trình tự sau:
            <br />- Trang trí mặt tiền với vật liệu conwood, lam và khung thép
            trang trí, lan can,…
            <br />- Thi công ốp lát gạch nền, sàn gỗ.
            <br />- Lắp đặt cửa nội thất và ngoại thất cho công trình.
            <br />- Công tác sơn bả matit và sơn toàn nhà.
            <br />- Thi công chống thấm tường mặt tiền, bồn hoa, sàn mái, ban
            công, wc.
            <br />- Thi công lắp đặt điện nước âm trần, âm tường, thiết bị vệ
            sinh….
            <br />- Thi công hoàn thiện trần thạch cao, trần trang trí ngôi nhà.
            <br />- Thi công hoàn thiện cầu thang với các hạng mục: ốp đá/mặt gỗ
            cầu thang, lan can cầu thang, tay vịn cầu thang,..
            <br />- Thi công cổng mặt tiền, khung bảo vệ, tấm poly che mưa nắng
            (nếu có).
            <br />- Hoàn thiện ô thông tầng với khung thép. kính cường lực, cửa
            lấy sáng gió.
          </p>
        </div>

        {/* Hình ảnh công trình hoàn thiện 2 */}
        <div className="finishing-image-container">
          <img
            src={finishing2}
            alt="Hoàn thiện công trình do PCD Nguyễn Hải thực hiện"
            className="finishing-image"
          />
          <div className="finishing-caption">
            <em>Hoàn thiện công trình do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>
        {/* 3 Quy trình thi công hoàn thiện của PCD Nguyễn Hải */}
        <div className="finishing-description">
          <h2 className="finishing-subtitle">
            3. Quy trình thi công hoàn thiện của{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <p className="finishing-text-description">
            - Khách hàng nêu nhu cầu và mong muốn xây dựng ngôi nhà, chúng tôi
            sẽ tư vấn thiết kế và gửi báo giá sơ bộ.
            <br /> - Sau khi khách hàng đồng ý, chúng tôi sẽ gửi báo giá chi
            tiết gồm các phần như: Bảng dự toán chi phí về vật tư, nhân công…
            <br /> - Cuối cùng là đi đến ký kết hợp đồng, tiến hành thiết kế và
            thi công.
            <br /> Là đơn vị có nhiều kinh nghiệm, uy tín trong lĩnh vực xây
            dựng chúng tôi luôn chú trọng đến các yêu tố:
            <br /> <span className="highlight-nghien">Tin cậy</span>: Xây dựng
            được những công trình bền vững từ những chiếc cọc nền móng đầu tiên,
            từ những công trình đầu tiên thì mới tạo được niềm tin cho khách
            hàng.
            <br /> <span className="highlight-nghien">Cam kết</span>: Cam kết về
            chất lượng và tiến độ đã trở thành truyền thống của SONG PHÁT
            CONSTRUCTION. Minh bạch: Cụ thể là sự trong sạch và trung thực trong
            quản lý tài chính, hoạt động kinh doanh và các thông tin truyền
            thông đối với Nhà nước, cổ đông và nhân viên Công ty.
            <br /> <span className="highlight-nghien">Chu đáo</span>: Nguyên tắc
            phục vụ chu đáo đã được quán triệt trong toàn thể nhân viên, trở
            thành kim chỉ nam cho mọi hành động.
          </p>
        </div>

        {/* Form FAQ */}
        <FAQComponent />

        {/* công trình tiêu biểu */}
        <div className="finishing-description">
          <h2 className="finishing-subtitle">
            Các công trình tiêu biểu của{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
        </div>

        {/* Hình ảnh công trình hoàn thiện 3 */}
        <div className="finishing-image-container">
          <img
            src={finishing3}
            alt="Hoàn thiện công trình do PCD Nguyễn Hải thực hiện"
            className="finishing-image"
          />
          <div className="finishing-caption">
            <em>Hoàn thiện công trình do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* Hình ảnh công trình hoàn thiện 4 */}
        <div className="finishing-image-container">
          <img
            src={finishing4}
            alt="Hoàn thiện công trình do PCD Nguyễn Hải thực hiện"
            className="finishing-image"
          />
          <div className="finishing-caption">
            <em>Hoàn thiện công trình do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* Hình ảnh công trình hoàn thiện 5 */}
        <div className="finishing-image-container">
          <img
            src={finishing5}
            alt="Hoàn thiện công trình do PCD Nguyễn Hải thực hiện"
            className="finishing-image"
          />
          <div className="finishing-caption">
            <em>Hoàn thiện công trình do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finishing_Constructions;
