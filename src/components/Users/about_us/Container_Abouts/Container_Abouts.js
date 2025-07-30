import React from "react";
import missionImg from "../../../../assets/anh_banner.jpg";
import about_us from "../../../../assets/anh_cong_ty.jpg";
import missionThietKeImg from "../../../../assets/thiet_ke_nha.jpg";
import missionThietKeImg1 from "../../../../assets/homstay.jpg";
import "./Container_Abouts.css";
import ContactForm from "../../view/Mail/ContactFormMail";

const Container_Abouts = () => {
  return (
    <div className="container-abouts">
      <div className="container-abouts">
        <h2>GIỚI THIỆU CÔNG TY TNHH MTV PCD NGUYỄN HẢI</h2>
        <p>
          Công ty TNHH MTV PCD Nguyễn Hải được thành lập theo quyết định số
          0401518783 ngày 22 tháng 11 năm 2011 của Sở Kế Hoạch và Đầu Tư thành
          phố Đà Nẵng. Công ty hoạt động trong lĩnh vực Kiến Trúc & Xây Dựng
          dưới hình thức là anh em cùng nhau làm và với mong muốn góp phần vào
          công cuộc công nghiệp hóa, hiện đại hóa đất nước.
        </p>
        <p>
          Với đội ngũ Thạc sĩ, Kiến trúc sư, Kỹ sư giàu kinh nghiệm, công ty
          giải quyết hiệu quả các vấn đề khoa học kỹ thuật và công nghệ trong
          xây dựng Dân dụng, Công nghiệp, Cầu đường, Cảng biển, Cơ khí, Hạ tầng,
          v.v...
        </p>
        <p>
          Ngoài kinh doanh, công ty còn chú trọng phát triển bền vững, thể hiện
          qua mô hình thiết kế, xây dựng, sản xuất và sử dụng “bền vững”, đúng
          với phương châm: <strong>KIẾN TRÚC BỀN VỮNG</strong>.
        </p>
      </div>

      <div className="container-abouts">
        <p>
          <strong>VĂN PHÒNG LÀM VIỆC:</strong>
        </p>
        <ul>
          <li>Địa chỉ: 17 Nguyễn Cư Trinh, P. Hòa Cường, Tp. Đà Nẵng</li>
          <li>Điện thoại: 0905.402.989</li>
          <li>Email: nguyenhai.deco@gmail.com</li>
          <li>
            Website:{" "}
            <a href="http://thicongnhadanang.vn/">thicongnhadanang.vn</a>
          </li>
          <li>
            Website: <a href="http://nguyenhai.com.vn/">nguyenhai.com.vn</a>
          </li>
        </ul>
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
      </div>

      <div className="container-abouts">
        <h3>Sứ mệnh của Nguyễn Hải</h3>

        <p>
          Công ty TNHH MTV PCD Nguyễn Hải mang trong mình sứ mệnh trở thành một
          trong những doanh nghiệp thiết kế kiến trúc và xây dựng hàng đầu trong
          nước và khu vực. Để thực hiện điều này, công ty không ngừng đầu tư
          phát triển đội ngũ nhân sự trẻ trung, năng động, giàu kinh nghiệm và
          chuyên môn cao.
        </p>
        <p>
          Công ty luôn cập nhật các xu hướng thiết kế hiện đại, công nghệ thi
          công tiên tiến nhằm mang đến các công trình chất lượng cao, tối ưu
          công năng và mang đậm bản sắc kiến trúc Việt.
        </p>
        <p>
          Đồng thời, Nguyễn Hải cũng từng bước mở rộng mạng lưới hoạt động trên
          toàn quốc và hướng đến tiếp cận các thị trường quốc tế tiềm năng.
        </p>
      </div>

      <div className="container-abouts">
        <h3>Tầm nhìn</h3>
        <p>
          Trong những năm tới, Công ty TNHH MTV PCD Nguyễn Hải đặt mục tiêu trở
          thành doanh nghiệp hàng đầu trong lĩnh vực tư vấn thiết kế, tư vấn
          giám sát, tư vấn đấu thầu, quản lý dự án và thi công công trình xây
          dựng.
        </p>
        <p>
          Từ năm 2025, công ty định hướng chuyển đổi mô hình hoạt động sang
          Nguyễn Hải Group – mô hình đa ngành nghề, đa lĩnh vực, đặc biệt mở
          rộng sang lĩnh vực quản lý và đầu tư vốn.
        </p>
        <p>
          Để hiện thực hóa tầm nhìn này, công ty đã và đang xây dựng trụ sở
          chính quy mô 7 tầng, tích hợp Showroom, nhiều phòng ban chức năng và
          không gian làm việc mở nhằm phục vụ tốt nhất cho toàn bộ nhân viên và
          khách hàng.
        </p>
        <div className="image-with-caption">
          <img
            src={missionImg}
            alt="TẦM NHÌN - SỨ MỆNH CỦA PCD NGUYỄN HẢI CO., LTD"
            className="responsive-image"
          />
          <div className="caption">
            TẦM NHÌN - SỨ MỆNH CỦA PCD NGUYỄN HẢI CO., LTD
          </div>
        </div>
      </div>

      <div className="container-abouts">
        <p>
          Năm 2020, dịch bệnh COVID xuất hiện và kéo theo nhiều hệ lụy khác cho
          toàn xã hội. Nhìn những đoàn người lao động từ miền Nam lũ lượt kéo
          nhau về giữa tâm điểm dịch bệnh, chúng tôi đã đặt ra câu hỏi: Tại sao
          người miền Trung lại phải vất vả đi làm ăn xa nhiều như thế? Phải làm
          gì để giải quyết phần nào nhu cầu lao động cho người dân địa phương?
          Từ trăn trở đó, NGUYỄN HẢI CO., LTD đặt thêm một sứ mệnh mới lên mình,
          đó là tạo môi trường làm việc lớn để giúp nhiều người dân địa phương
          có việc làm tại quê nhà. Tất cả mọi người trong cộng đồng NGUYỄN HẢI
          CO., LTD sẽ có một công việc phù hợp, một môi trường phát triển ngay
          tại quê hương mình, từ đó có một cuộc sống đủ đầy và hạnh phúc.
        </p>
      </div>

      <div className="container-abouts">
        <h3>Lập Quy hoạch xây dựng</h3>
        <p>
          Lập Quy hoạch xây dựng là một trong những lĩnh vực hoạt động chủ chốt
          của Công ty TNHH MTV PCD Nguyễn Hải. Với đội ngũ kiến trúc sư và
          chuyên gia quy hoạch giàu kinh nghiệm, công ty đã và đang tham gia
          thực hiện nhiều đồ án quy hoạch quan trọng, góp phần định hướng phát
          triển không gian đô thị và nông thôn một cách hiệu quả và bền vững.
        </p>
        <p>Công ty cung cấp các dịch vụ lập quy hoạch ở nhiều cấp độ như:</p>
        <p>
          - Quy hoạch chung: Xây dựng định hướng tổng thể phát triển không gian
          đô thị, tổ chức các khu chức năng, hệ thống hạ tầng kỹ thuật và xã
          hội, đảm bảo sự phát triển đồng bộ cho các đô thị từ loại đặc biệt đến
          loại V.
        </p>
        <p>
          - Quy hoạch chi tiết: Tổ chức không gian cụ thể cho từng khu vực như
          khu dân cư, khu công nghiệp, khu đô thị mới, khu du lịch... nhằm đảm
          bảo khai thác hiệu quả quỹ đất và đáp ứng yêu cầu phát triển thực tế.
        </p>
        <p>
          - Quy hoạch điểm dân cư nông thôn: Thiết kế các khu dân cư tập trung
          tại nông thôn, trung tâm xã nhằm nâng cao chất lượng sống, cải thiện
          hạ tầng cơ sở, góp phần xây dựng nông thôn mới văn minh, hiện đại.
        </p>
        <p>
          Bằng việc áp dụng công nghệ hiện đại và phương pháp tiếp cận linh
          hoạt, Nguyễn Hải luôn cam kết mang đến các giải pháp quy hoạch tối ưu,
          phù hợp với điều kiện địa phương và định hướng phát triển kinh tế - xã
          hội lâu dài.
        </p>
        <div className="image-with-caption">
          <img
            src={missionThietKeImg1}
            alt="LẬP QUY HOẠCH XÂY DỰNG CỦA PCD NGUYỄN HẢI CO., LTD"
            className="responsive-image"
          />
          <div className="caption">
            LẬP QUY HOẠCH XÂY DỰNG CỦA PCD NGUYỄN HẢI CO., LTD
          </div>
        </div>
      </div>

      <div className="container-abouts">
        <h3>Khảo sát xây dựng</h3>
        <p>
          Khảo sát xây dựng là bước khởi đầu quan trọng trong quá trình thiết kế
          và thi công công trình. Công ty TNHH MTV PCD Nguyễn Hải cung cấp dịch
          vụ khảo sát chuyên sâu với độ chính xác cao nhằm đảm bảo nền tảng vững
          chắc cho mọi dự án xây dựng.
        </p>
        <p>
          Với đội ngũ kỹ sư, chuyên gia kỹ thuật được đào tạo bài bản cùng thiết
          bị khảo sát hiện đại, công ty thực hiện các loại hình khảo sát sau:
        </p>
        <p>
          - Khảo sát địa hình: Đo đạc địa hình hiện trạng, lập bản đồ địa hình
          phục vụ thiết kế quy hoạch và kỹ thuật xây dựng.
        </p>
        <p>
          - Khảo sát địa chất công trình: Phân tích đặc điểm địa chất của nền
          đất, đánh giá khả năng chịu tải, dự báo biến dạng nền móng và đề xuất
          giải pháp xử lý.
        </p>
        <p>
          - Khảo sát hiện trạng công trình: Đánh giá kết cấu, vật liệu, mức độ
          an toàn và tính ổn định của công trình hiện hữu để phục vụ cải tạo
          hoặc mở rộng.
        </p>
        <p>
          - Khảo sát môi trường xây dựng: Kiểm tra điều kiện môi trường khu vực
          xây dựng để đảm bảo tuân thủ các quy định về bảo vệ môi trường và an
          toàn lao động.
        </p>
        <p>
          PCD Nguyễn Hải cam kết mang đến dịch vụ khảo sát chính xác, nhanh
          chóng và đáp ứng đầy đủ yêu cầu kỹ thuật – pháp lý cho các công trình
          từ nhỏ đến quy mô lớn.
        </p>
        <div className="image-with-caption">
          <img
            src={missionThietKeImg}
            alt="Khảo sát xây dựng của Nguyễn Hải"
            className="responsive-image"
          />
          <div className="caption">
            KHẢO SÁT XÂY DỰNG – PCD NGUYỄN HẢI CO., LTD
          </div>
        </div>
      </div>

      <div className="container-abouts">
        <h3>DỊCH VỤ PCD NGUYỄN HẢI CUNG CẤP</h3>
        <p>
          Hiện nay PCD Nguyễn Hải cung cấp dịch vụ thiết kế và thi công nhà ở.
          Cụ thể
        </p>
        <h3>Dịch vụ thiết kế</h3>
        <p>Dịch vụ thiết kế của PCD Nguyễn Hải bao gồm:</p>
        <ul>
          <li>Thiết kế kiến trúc</li>
          <li>Thiết kế nội thất</li>
          <li>
            Thiết kế trọn gói gồm thiết kế kiến trúc và thiết kế nội thất.
          </li>
        </ul>
        <p>
          Các mẫu thiết kế nhà phố và biệt thự, khách sạn của PCD Nguyễn Hải nổi
          bật và luôn có điểm nhấn riêng theo cá tính của gia chủ. Chính vì vậy
          mà khách hàng sẽ được là chính mình trong ngôi nhà của mình mà vẫn vô
          cùng thu hút. Hãy liên hệ ngay PCD Nguyễn Hải để được tư vấn thiết kế
          nhà ở hiện đại, thông minh và tinh tế.
        </p>
        <h3>Dịch vụ thi công</h3>
        <p>
          Ngoài thiết kế thì PCD Nguyễn Hải cũng nhận thi công trực tiếp các dự
          án công trình tại khắp các tỉnh thành. Hiện nay PCD Nguyễn Hải đang
          cung cấp các dịch vụ gồm:
        </p>
        <ul>
          <li>Thi công thô</li>
          <li>Thi công hoàn thiện</li>
          <li>Xây dựng trọn gói</li>
        </ul>
        <p>
          <strong>PCD Nguyễn Hải</strong> không ngừng phấn đấu để phát triển về
          cả chất lượng và niềm tin của khách hàng đối với các sản phẩm thiết
          kế, thi công của mình. Hãy liên hệ PCD Nguyễn Hải để được đồng hành
          cùng bạn trên hành trình xây dựng tổ ấm nhé!
        </p>
        {/* Form mail liên hệ */}
        <ContactForm />
      </div>
    </div>
  );
};

export default Container_Abouts;
