import React from "react";
import "./Container_Security.css";

const Container_Security = () => {
  return (
    <div className="security-container">
      <h2 className="security-title">
        Chính sách bảo mật thông tin khách hàng của PCD NGUYỄN HẢI
      </h2>

      <p className="security-paragraph">
        <strong>PCD NGUYỄN HẢI</strong> cam kết bảo mật thông tin của khách hàng
        là ưu tiên hàng đầu và là nghĩa vụ quan trọng để đảm bảo quyền riêng tư
        của bạn khi sử dụng dịch vụ của chúng tôi. Chính sách này bao gồm các
        nội dung như sau:
      </p>

      <h3 className="security-subtitle">1. Mục đích thu thập thông tin</h3>
      <ul className="security-list">
        <li className="security-item">
          Giúp chúng tôi hiểu rõ nhu cầu của khách hàng để tùy chỉnh và cung cấp
          các giải pháp thiết kế & thi công phù hợp.
        </li>
        <li className="security-item">
          Tối ưu hóa trải nghiệm trên website bằng cách sử dụng dữ liệu để cải
          thiện giao diện, cung cấp nội dung phù hợp hơn, phát triển dịch vụ và
          tăng cường tương tác.
        </li>
        <li className="security-item">
          Hỗ trợ khách hàng nhanh chóng, phản hồi yêu cầu và duy trì mối quan hệ
          bền vững với khách hàng.
        </li>
      </ul>

      <h3 className="security-subtitle">2. Phương thức thu thập thông tin</h3>
      <ul className="security-list">
        <li className="security-item">
          Khách hàng cung cấp thông tin qua các form gồm: họ tên, số điện thoại,
          email, địa chỉ, yêu cầu tư vấn.
        </li>
        <li className="security-item">
          Sử dụng cookies và mã theo dõi để phân tích hành vi người dùng, từ đó
          nâng cao trải nghiệm sử dụng website.
        </li>
      </ul>

      <h3 className="security-subtitle">3. Vị trí của thông tin cá nhân</h3>
      <p className="security-paragraph">
        <strong>PCD NGUYỄN HẢI</strong> có trụ sở tại Đà Nẵng và các chi nhánh
        khác. Thông tin cá nhân có thể được lưu trữ tại các hệ thống nội bộ,
        luôn đảm bảo theo đúng quy định pháp luật và chính sách quyền riêng tư
        này.
      </p>
      <p className="security-paragraph">
        Thông tin chỉ được sử dụng trong nội bộ công ty để phục vụ hợp đồng và
        cung cấp dịch vụ.
      </p>

      <h3 className="security-subtitle">
        4. Cách thức bảo vệ thông tin cá nhân
      </h3>
      <p className="security-paragraph">
        Hệ thống bảo mật của <strong>PCD NGUYỄN HẢI</strong> được xây dựng với
        tường lửa, kiểm soát truy cập và mã hóa dữ liệu. Chúng tôi tuân thủ đầy
        đủ các quy định pháp luật liên quan và cam kết sử dụng thông tin đúng
        mục đích.
      </p>

      <h3 className="security-subtitle">5. Truy cập và lựa chọn</h3>
      <p className="security-paragraph">
        Quý khách có thể xem và chỉnh sửa thông tin cá nhân hoặc liên hệ để được
        hỗ trợ. Các dịch vụ tư vấn cho phép quý khách tùy chọn cung cấp thông
        tin. Việc không cung cấp thông tin có thể ảnh hưởng đến một số tiện ích
        của dịch vụ.
      </p>

      <h3 className="security-subtitle">6. Thời gian lưu trữ thông tin</h3>
      <p className="security-paragraph">
        Thông tin sẽ được lưu giữ trong thời gian hoạt động của dịch vụ hoặc đến
        khi có yêu cầu hủy từ phía khách hàng.
      </p>

      <h3 className="security-subtitle">7. Liên hệ và điều chỉnh chính sách</h3>
      <p className="security-paragraph">
        Nếu quý khách có bất kỳ thắc mắc nào về quyền riêng tư, vui lòng liên hệ
        với chúng tôi qua:
      </p>
      <ul className="security-list">
        <li className="security-item">
          <strong>Email:</strong> hotro.nguyenhai.com.vn@gmail.com
        </li>
        <li className="security-item">
          <strong>Hotline:</strong> 0905 402 989
        </li>
      </ul>
      <p className="security-paragraph">
        Chính sách bảo mật có thể được điều chỉnh bất kỳ lúc nào. Hãy kiểm tra
        thường xuyên để cập nhật những thay đổi mới nhất.
      </p>
    </div>
  );
};

export default Container_Security;
