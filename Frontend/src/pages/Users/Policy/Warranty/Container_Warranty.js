import React from "react";
import "./Container_Warranty.css";

const Container_Warranty = () => {
  return (
    <div className="warranty-container">
      <h2 className="warranty-title">
        Chính sách bảo hành công trình của PCD NGUYỄN HẢI
      </h2>

      <p className="warranty-text">
        Điều khoản chính sách bảo hành của <strong>PCD NGUYỄN HẢI</strong> chính
        là sự cam kết cho sự tận tâm và trách nhiệm của chúng tôi đối với mọi
        công trình, mang lại sự an tâm và hài lòng của quý khách hàng khi lựa
        chọn dịch vụ của chúng tôi để xây dựng ngôi nhà của mình.
      </p>

      <h3 className="warranty-heading">1. Chính sách bảo hành</h3>
      <p className="warranty-text">
        Hiện tại, <strong>PCD NGUYỄN HẢI</strong> đang thực hiện chính sách:
      </p>
      <ul className="warranty-list">
        <li className="warranty-item">
          Bảo hành <strong>10 năm</strong> đối với phần kết cấu.
        </li>
        <li className="warranty-item">
          Bảo hành <strong>05 năm</strong> đối với phần chống thấm cho toàn bộ
          các công trình.
        </li>
      </ul>
      <p className="warranty-note">
        <strong>Lưu ý:</strong> Các hạng mục bảo hành chi tiết trong phần thô,
        phần hoàn thiện và nội thất của mỗi công trình sẽ được gửi kèm theo từng
        hợp đồng thi công cho khách hàng.
      </p>

      <h3 className="warranty-heading">2. Phương thức bảo hành</h3>
      <ul className="warranty-list">
        <li className="warranty-item">
          Khách hàng thông báo đến chúng tôi về bất kỳ lỗi hoặc hư hỏng nào
          trong thời gian bảo hành theo quy định của hợp đồng.
        </li>
        <li className="warranty-item">
          Kỹ sư của <strong>PCD NGUYỄN HẢI</strong> sẽ tiến hành kiểm sát trực
          tiếp tại công trình và xác định xem vấn đề có nằm trong phạm vi công
          trình hay không.
        </li>
        <li className="warranty-item">
          Việc sửa chữa các lỗi này sẽ được tiến hành trong vòng không quá{" "}
          <strong>7 ngày</strong> kể từ khi nhận được thông báo từ phía chủ đầu
          tư.
        </li>
      </ul>

      <h3 className="warranty-heading">3. Trường hợp miễn trừ bảo hành</h3>
      <ul className="warranty-list">
        <li className="warranty-item">
          Các yếu tố cơ sở hạ tầng nằm ngoài phạm vi công trình: bao gồm vỉa hè,
          ống cống, đồng hồ điện, đồng hồ nước và các phần không thuộc phạm vi
          thi công.
        </li>
        <li className="warranty-item">
          Sự cố, lỗi do bất cẩn hoặc sử dụng không đúng cách.
        </li>
        <li className="warranty-item">
          Các lỗi và hư hỏng xuất phát từ hành động của khách hàng, không phải
          do lỗi kỹ thuật từ chúng tôi.
        </li>
        <li className="warranty-item">
          Thiệt hại do các yếu tố bất khả kháng: thiên tai như bão, lụt, động
          đất, sự kiện xã hội, hỏa hoạn lan từ khu vực xung quanh,...
        </li>
      </ul>
    </div>
  );
};

export default Container_Warranty;
