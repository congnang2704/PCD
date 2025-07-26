// Building_Houses.js

import React from "react";
import "./Building_Houses.css";

import building1 from "../../../assets/anh_services/nhatrongoi1.jpg";
import building2 from "../../../assets/anh_services/nhatrongoi2.jpg";
import building3 from "../../../assets/anh_services/nhatrongoi3.jpg";
import building4 from "../../../assets/anh_services/nhatrongoi4.jpg";
import building5 from "../../../assets/anh_services/nhatrongoi5.jpg";
import building6 from "../../../assets/anh_services/nhatrongoi6.jpg";
import ContactForm from "../../view/Mail/ContactFormMail";
import FAQComponent from "../../view/FAQComponent/FAQComponent";

const Building_Houses = () => {
  return (
    <div className="building-container">
      <div className="building-wrapper">
        {/* Tiêu đề */}
        <h1 className="building-title">
          GIỚI THIỆU CÔNG TY TNHH MTV{" "}
          <span className="highlight-blue">PCD NGUYỄN HẢI</span> - DỊCH VỤ XÂY
          NHÀ TRỌN GÓI
        </h1>

        {/* Nội dung mô tả */}
        <div className="building-description">
          <p className="building-text">
            <span className="highlight">Xây nhà trọn gói</span> đang là xu thế
            hiện nay, gia chủ chỉ cần ký hợp đồng thì nhà thầu sẽ thực hiện mọi
            công đoạn xây dựng từ A – Z. Điều này không chỉ giúp cho gia chủ có
            thể thoải mái chờ ngày về nhà mới mà đơn vị thi công cũng dễ dàng
            thực hiện theo tiến độ.
          </p>
          <p className="building-text">
            Dịch vụ thiết kế và xây nhà trọn gói bao gồm các hạng mục thiết kế
            kiến trọn gói, thi công thô, thi công hoàn thiện và thi công nội
            thất với loại hình nhà phố, biệt thự, căn hộ chung cư, tòa nhà văn
            phòng,…. Bên cạnh đó, chúng tôi cung cấp nhân công và vật tư xây
            dựng. Để hiểu rõ hơn về dịch vụ xây nhà trọn gói tại của{" "}
            <span className="highlight">PCD Nguyễn Hải</span> cùng bảng giá chi
            tiết và các mẫu nhà đẹp{" "}
            <span className="highlight">PCD Nguyễn Hải</span> thực hiện trọn
            gói. Mời gia chủ tham khảo bài viết này!
          </p>

          <p className="building-text">
            Hiện nay <span className="highlight">PCD Nguyễn Hải</span> được
            khách hàng tin tưởng chọn lựa vào làm nhà thầu thi công trọn gói cho
            rất nhiều công trình khác nhau. Với chi phí hợp lý cùng đội ngũ nhân
            sự chuyên môn, trách nhiệm{" "}
            <span className="highlight">PCD Nguyễn Hải</span> là điểm tựa vững
            chắc cho khách hàng an tâm chờ chia khóa trao tay mừng tân gia.
          </p>
        </div>

        {/* Hình ảnh công trình hoàn thiện 1 */}
        <div className="building-image-container">
          <img
            src={building1}
            alt="Công trình trọn gói do PCD Nguyễn Hải thực hiện"
            className="building-image"
          />
          <div className="finishing-caption">
            <em>Công trình trọn gói do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* 1 Thiết kế thi công xây nhà trọn gói */}
        <div className="building-description">
          <h2 className="building-subtitle">
            Thiết kế thi công xây nhà trọn gói{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <p className="building-text-description">
            Trước đây, việc xây nhà thông thường sẽ phải qua ít nhất hai đơn vị
            đó là thiết kế và thi công. Thậm chí, nhiều gia chủ còn bỏ qua việc
            thiết kế, chỉ tìm một nhà thầu xây dựng, nên các mẫu nhà truyền
            thống trước đây thường có kiến trúc, công năng giống nhau ở các vùng
            miền mà không có nét đặc sắc riêng biệt.
            <br />
            Ngày nay, dịch vụ nhận thi công xây dựng nhà trọn gói xuất hiện với
            nhiều lợi ích như giúp tiết kiệm thời gian, chi phí, công sức,… Gia
            chủ sẽ không phải lo bất cứ điều gì, từ những việc lớn như giám sát
            công trình hay những việc nhỏ như tự đi mua vật liệu. Thay vào đó,
            đơn vị thầu sẽ thực hiện tất cả và bàn giao một ngôi nhà hoàn chỉnh
            cho mình.
            <br />
            Xây nhà trọn gói, thi công trọn gói hay nhiều người vẫn hay gọi là
            xây nhà chìa khóa trao tay là hình thức xây nhà được chủ đầu tư và
            nhà thầu xây dựng thỏa thuận, ký trong hợp đồng xây dựng trọn gói.
            Cả hai bên sẽ phải thực hiện đúng những điều khoản bên trong hợp
            đồng.
            <br />
            Chủ đầu tư chỉ việc duy nhất là thanh toán theo các điều khoản quy
            định của hợp đồng mà không còn phải lo lắng chi phí phát sinh khác.
            Đối với đơn vị thầu thi công trọn gói, xây nhà trọn gói sẽ thực hiện
            các công việc từ lên ý tưởng thiết kế bản vẽ kiến trúc, bản vẽ 3D
            nội ngoại thất, giấy phép xây dựng, bản vẽ thi công chi tiết đến thi
            công san lấp mặt bằng, thi công phần thô, thi công hoàn thiện và thi
            công nội thất… cho đến khi hoàn thành công trình bàn giao cho chủ
            đầu tư.
          </p>
        </div>
        {/* Để lại thông tin, kiến trúc sư PCD Nguyễn Hải sẽ tư vấn cho bạn nhanh nhất  */}
        <div className="building-description">
          <h2 className="building-subtitle-contact">
            Để lại thông tin, kiến trúc sư PCD Nguyễn Hải sẽ tư vấn cho bạn
            nhanh nhất !
          </h2>
          {/* Form liên hệ */}
          <ContactForm />
        </div>
        {/* Hình ảnh công trình hoàn thiện 2 */}
        <div className="building-image-container">
          <img
            src={building2}
            alt="Công trình trọn gói do PCD Nguyễn Hải thực hiện"
            className="building-image"
          />
          <div className="finishing-caption">
            <em>Công trình trọn gói do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* Những lợi ích khi xây nhà trọn gói tại */}
        <div className="building-description">
          <h2 className="building-subtitle">
            Những lợi ích khi xây nhà trọn gói tại{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <div className="building-description">
            <p className="building-text">
              <span className="highlight-bold">Miễn phí 100% thiết kế:</span>{" "}
              Gia chủ sẽ được miễn phí 100% chi tiết thiết kế cho công trình của
              mình giảm được đến cả hàng chục triệu đồng cho chi phí xây dựng.
              Đây là một khuyến mãi cực lớn mà mọi gia chủ đều không nên bỏ lỡ.
            </p>
            <p className="building-text">
              <span className="highlight-bold">Tiết kiệm chi phí:</span> So với
              sử dụng dịch vụ đơn giản thì việc xây nhà trọn gói giúp gia chủ
              tiết kiệm hơn rất nhiều chi phí. Đặc biệt là về nhân công, vật
              liệu thi công… sẽ rẻ hơn so với chọn lựa tại các đơn vị lẻ bên
              ngoài.
            </p>
            <p className="building-text">
              <span className="highlight-bold">Đúng tiến độ:</span> Trong hợp
              đồng thiết kế thi công, KASAI luôn rõ ràng về thời gian hoàn
              thành. Gia chủ có thể yên tâm chờ đợi công trình hoàn thành đúng
              tiến độ cam kết.
            </p>
            <p className="building-text">
              <span className="highlight-bold">Được bảo hành:</span> Sau khi
              hoàn thành công trình KASAI vẫn có chế độ bảo hành cho công trình
              của gia chủ đến 5 năm. Vì vậy mà chủ đầu tư có thể an tâm sinh
              sống và tận hưởng mọi tiện nghi trong ngôi nhà vừa hoàn thành. nhà
              vừa hoàn thành.
            </p>
          </div>
        </div>

        {/* Form FAQ */}
        <FAQComponent />

        {/* Hình ảnh công trình hoàn thiện 3 */}
        <div className="building-image-container">
          <img
            src={building3}
            alt="Công trình trọn gói do PCD Nguyễn Hải thực hiện"
            className="building-image"
          />
          <div className="finishing-caption">
            <em>Công trình trọn gói do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* Hợp đồng thiết kế xây nhà trọn gói */}
        <div className="building-description">
          <h2 className="building-subtitle">
            Hợp đồng thiết kế xây nhà trọn gói tại{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
          <p className="building-text">
            Khách hàng khi ký hợp đồng thiết kế xây nhà trọn gói tại KASAI sẽ
            được công ty hỗ trợ toàn bộ dịch vụ từ thiết kế đến thi công thô và
            thi công hoàn thiện. Cụ thể là:
          </p>
          <div className="building-description">
            <h3 className="building-subtitle-h3">1. Hợp đồng thiết kế</h3>
            <p className="building-text">
              Trong hợp đồng thiết kế ngôi nhà sẽ có đầy đủ bản vẽ cần thiết của
              một công trình nhà ở. Bao gồm:
            </p>
            <p className="building-text">
              - Phối cảnh 3D ngoại thất: Phối cảnh cổng, tường, sân vườn, mái,
              cột, hệ thống cửa chính và cửa phụ.
            </p>

            <p className="building-text">- Bản vẽ mặt cắt, mặt đứng.</p>
            <p className="building-text">
              - Bản vẽ kết cấu – vật dụng theo từng tầng.
            </p>
            <p className="building-text">
              - Bản vẽ thiết kế kiến trúc chi tiết kết cấu công trình: móng,
              cột, dầm, mái nhà, sân thượng,…
            </p>
            <p className="building-text">
              - Bản vẽ kiến trúc hệ thống điện và công suất điện.
            </p>
            <p className="building-text">- Bản vẽ kiến trúc chiếu sáng.</p>
            <p className="building-text">
              - Bản vẽ kiến trúc hệ thống các dây dẫn tín hiệu Internet, dây cáp
              Tivi,…
            </p>
            <p className="building-text">
              - Bản vẽ kiến trúc cảnh quan sân vườn.
            </p>
          </div>

          <div className="building-description">
            <h3 className="building-subtitle-h3">2. Thi công thô</h3>
            <p className="building-text">
              Sau khi có bản vẽ{" "}
              <span className="highlight-blue">PCD Nguyễn Hải</span> sẽ tiến
              hành thi công công trình với bước đầu tiên là thi công thô bao gồm
              các hạng mục:
            </p>
            <ul className="building-list">
              <li>Móng nhà.</li>
              <li>Hệ thống đà kiềng, cột.</li>
              <li>Xây tô tường bao và tường ngăn phòng.</li>
              <li>
                Sàn bê tông và cán nền các tầng lầu, sân thượng, mái nhà, ban
                công. Đổ bê tông cầu thang.
              </li>
              <li>
                Hệ thống điện, ống nước, cáp âm tường, lắp đặt hệ thống ống
                luồn, hộp đấu nối cho dây điện các loại, hệ thống dây điện.
              </li>
              <li>Hố ga, tầng hầm, bể phốt, bể nước.</li>
              <li>Xây tô mặt tiền, lợp mái nhà (nếu có).</li>
            </ul>
          </div>

          <div className="building-description">
            <h3 className="building-subtitle-h3">3. Thi công hoàn thiện</h3>
            <p className="building-text">
              Cuối cùng sẽ là bước thi công hoàn thiện với để hoàn tất vẻ ngoài
              đẹp đẽ cho ngôi nhà và các tiện ích điện nước.
            </p>
            <ul className="building-list">
              <li>Mặt tiền: ốp đá, trang trí, làm lam khung thép, lan can.</li>
              <li>Cửa: Lắp cửa.</li>
              <li>Sơn: Sơn toàn nhà trong và ngoài.</li>
              <li>Nền: Ốp gạch, lam tường, sàn gỗ.</li>
              <li>
                Lắp đặt điện nước: Công tắc, ổ cấm, đèn chiếu sáng, đèn trang
                trí, thiết bị camera, điều hòa, nước.
              </li>
              <li>Cầu thang: Làm mặt đá, lan can, tay vịn, trang trí.</li>
              <li>Sân trước, sau: Cổng, mái che, khung bảo vệ.</li>
            </ul>
            <h2 className="building-subtitle">
              Những điều cần biết khi xây nhà trọn gói
            </h2>
            <ul className="building-list">
              <li>
                Về công năng ngôi nhà: Gia chủ cần xác định rõ mong muốn của
                mình về công năng của ngôi nhà có bao nhiêu phòng ngủ, diện tích
                các phòng bao nhiêu, có phòng thờ không, phòng khách, phòng bếp
                như thế nào. Khi xác định được thì gia chủ sẽ dễ dàng trao đổi
                với kiến trúc sư và nhanh chóng có được bản vẽ để bắt đầu vào
                xây dựng. .
              </li>
              <li>
                Về chi phí xây dựng: Giá xây nhà trọn gói sẽ có sự thay đổi
                chênh lệch giữa các ngôi nhà dựa trên nhiều yếu tố khác nhau như
                vị trí, số mặt tiền, số tầng, diện tích, thời điểm xây dựng, giá
                vật tư, phong cách thiết kế… Những công trình càng phức tạp thì
                giá sẽ càng cao để đảm bảo chất lượng công trình.
              </li>
              <li>
                Về lựa chọn vật tư: Vật tư sẽ có những loại giá rẻ, loại cao cấp
                gia chủ có thể lựa chọn theo nhu cầu của mình. Hãy ưu tiên về
                chất lượng, độ uy tín của vật tư để đảm bảo công trình được chắc
                chắn và bền vững.
              </li>
            </ul>
          </div>
        </div>
        {/* công trình tiêu biểu */}
        <div className="building-description">
          <h2 className="building-subtitle">
            Các công trình tiêu biểu tại{" "}
            <span className="highlight-blue">PCD Nguyễn Hải</span>
          </h2>
        </div>
        {/* Hình ảnh công trình hoàn thiện 4 */}
        <div className="building-image-container">
          <img
            src={building4}
            alt="Công trình trọn gói do PCD Nguyễn Hải thực hiện"
            className="building-image"
          />
          <div className="finishing-caption">
            <em>Công trình trọn gói do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>

        {/* Hình ảnh công trình hoàn thiện 5 */}
        <div className="building-image-container">
          <img
            src={building5}
            alt="Công trình trọn gói do PCD Nguyễn Hải thực hiện"
            className="building-image"
          />
          <div className="finishing-caption">
            <em>Công trình trọn gói do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>
        {/* Hình ảnh công trình hoàn thiện 6 */}
        <div className="building-image-container">
          <img
            src={building6}
            alt="Công trình trọn gói do PCD Nguyễn Hải thực hiện"
            className="building-image"
          />
          <div className="finishing-caption">
            <em>Công trình trọn gói do PCD Nguyễn Hải thực hiện</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Building_Houses;
