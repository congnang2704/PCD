import React from "react";
import about_us from "../../../../assets/anh_abouts/anh_cong_ty.jpg";
import ContactForm from "../../view/Mail/ContactFormMail";
import "./Container_History.css";

const Container_History = () => {
  return (
    <div className="container-abouts">
      <h2>
        LỊCH SỬ HÌNH THÀNH VÀ PHÁT TRIỂN CỦA CÔNG TY TNHH MTV PCD NGUYỄN HẢI
      </h2>

      <p>
        Công ty TNHH MTV PCD Nguyễn Hải được chính thức thành lập vào ngày{" "}
        <strong>22 tháng 11 năm 2011</strong> theo quyết định số{" "}
        <strong>0401518783</strong> do Sở Kế hoạch và Đầu tư thành phố Đà Nẵng
        cấp. Khởi đầu với quy mô nhỏ và đội ngũ nhân sự khiêm tốn, công ty đã
        từng bước xây dựng nền tảng vững chắc trong lĩnh vực thiết kế kiến trúc
        và thi công xây dựng tại khu vực miền Trung.
      </p>
      <div className="image-with-caption">
        <img
          src={about_us}
          alt="CÔNG TY TNHH MTV PCD NGUYỄN HẢI CO., LTD - TRỤ SỞ CHÍNH"
          className="responsive-image"
        />
        <div className="caption">
          CÔNG TY TNHH MTV PCD NGUYỄN HẢI CO., LTD - TRỤ SỞ CHÍNH
        </div>
      </div>

      <p>
        Những năm đầu hoạt động, PCD Nguyễn Hải chủ yếu đảm nhận các công trình
        nhà dân dụng quy mô vừa và nhỏ. Tuy nhiên, với định hướng phát triển rõ
        ràng và chiến lược đầu tư bài bản, công ty đã nhanh chóng tạo được uy
        tín trên thị trường nhờ vào sự chuyên nghiệp, chất lượng thi công và
        tinh thần trách nhiệm trong từng dự án.
      </p>

      <p>
        Giai đoạn từ <strong>2015 đến 2020</strong> đánh dấu bước chuyển mình
        mạnh mẽ của công ty. PCD Nguyễn Hải đã mở rộng quy mô hoạt động, đồng
        thời nâng cao năng lực đội ngũ nhân sự thông qua việc tuyển dụng thêm
        nhiều kiến trúc sư, kỹ sư, chuyên gia quy hoạch dày dạn kinh nghiệm.
        Công ty bắt đầu tiếp cận các công trình quy mô lớn như biệt thự, tòa nhà
        văn phòng, khách sạn, công trình công cộng, và các khu đô thị quy hoạch
        mới.
      </p>

      <p>
        Song song đó, PCD Nguyễn Hải cũng không ngừng đầu tư vào công nghệ – từ
        phần mềm thiết kế kiến trúc hiện đại cho đến ứng dụng các công nghệ thi
        công tiên tiến – nhằm tối ưu chất lượng và tiến độ dự án. Công ty đã xây
        dựng hệ thống quản lý dự án chuyên nghiệp, đảm bảo quy trình làm việc
        khoa học, hiệu quả và minh bạch với đối tác, khách hàng.
      </p>

      <p>
        Bước sang <strong>giai đoạn 2021 đến nay</strong>, công ty tiếp tục
        khẳng định vị thế trên thị trường xây dựng, từng bước vươn ra thị trường
        quốc tế thông qua các hợp đồng tư vấn thiết kế với đối tác từ Lào,
        Campuchia và Nhật Bản. Đồng thời, PCD Nguyễn Hải cũng mở rộng lĩnh vực
        hoạt động sang tư vấn đầu tư, quản lý dự án, khảo sát và quy hoạch xây
        dựng với quy mô toàn quốc.
      </p>

      <p>
        Đến thời điểm hiện tại, PCD Nguyễn Hải tự hào là đơn vị thiết kế và xây
        dựng chuyên nghiệp, uy tín tại Việt Nam, với hàng trăm công trình đã
        hoàn thiện và đi vào sử dụng. Mỗi công trình là một dấu ấn, là sự kết
        tinh của sáng tạo, tâm huyết và tinh thần trách nhiệm cao với khách hàng
        và cộng đồng.
      </p>

      <p>
        Trong tương lai, PCD Nguyễn Hải sẽ tiếp tục nỗ lực phát triển, nâng cao
        năng lực cạnh tranh, hội nhập sâu rộng vào thị trường quốc tế và không
        ngừng đổi mới để xứng đáng với sự tin tưởng của khách hàng và đối tác
        trong suốt hơn một thập kỷ qua.
      </p>
      {/* Form mail liên hệ */}
      <ContactForm />
    </div>
  );
};

export default Container_History;
