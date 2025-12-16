import React from "react";
import "./Container_Recruiitment.css";
import PCDImgMarketing from "../../../../assets/tuyen-dung-marketing.png";
import PCDImgKeToan from "../../../../assets/tuyen-dung-nhan-vien-ke-toan.jpg";
import PCDImgKinhTeXD from "../../../../assets/ky-su-xay-dung-kinh-te-la-gi-hinh1.jpg";
import PCDImgKienTrucSu from "../../../../assets/img-ky-su.jpg";

// status: "open" (còn tuyển) | "closed" (đã đóng)
const data = [
  {
    id: 1,
    image: PCDImgKinhTeXD,
    status: "open",
    title: "PCD Nguyễn Hải tuyển 03 Kỹ sư QS / Kinh tế xây dựng (ĐANG TUYỂN)",
    desc: "Bóc tách khối lượng, lập dự toán – thanh quyết toán, kiểm soát chi phí, phối hợp kế toán/kinh doanh…",
    link: "/tuyen-dung/pcd-nguyen-hai-tuyen-dung-ky-su-qs",
  },
  {
    id: 2,
    image: PCDImgKienTrucSu,
    status: "open",
    title: "PCD Nguyễn Hải tuyển 03 Kiến trúc sư Thiết kế (ĐANG TUYỂN)",
    desc: "Lên ý tưởng – triển khai bản vẽ, phối hợp nội thất/kỹ thuật, tư vấn khách hàng, giám sát tác giả…",
    link: "/tuyen-dung/pcd-nguyen-hai-tuyen-dung-kien-truc-su",
  },
  {
    id: 3,
    image: PCDImgKeToan,
    status: "closed",
    title: "PCD Nguyễn Hải tuyển 03 Nhân viên Kế toán (ĐANG TUYỂN)",
    desc: "Tuyển 03 Nhân viên Kế toán nội bộ: hạch toán, báo cáo thu–chi, theo dõi công nợ, phối hợp các phòng ban…",
    link: "/tuyen-dung/pcd-nguyen-hai-tuyen-dung-ke-toan",
  },
  {
    id: 4,
    image: PCDImgMarketing,
    status: "closed",
    title: "PCD Nguyễn Hải tuyển 03 Nhân viên Marketing (ĐÃ ĐÓNG)",
    desc: "Vị trí đã đủ người. Cảm ơn bạn đã quan tâm – theo dõi để nhận thông báo đợt tuyển mới!",
    link: "/tuyen-dung/pcd-nguyen-hai-tuyen-dung-nhan-vien-marketing",
  },
];

const Container_Recruiitment = () => {
  return (
    <div className="recruitment-wrapper">
      <h2 className="recruitment-heading">PCD NGUYỄN HẢI TUYỂN DỤNG</h2>

      <div className="recruitment-grid">
        {data.map((item) => {
          const isClosed = item.status === "closed";
          return (
            <a
              href={item.link}
              className={`recruitment-card ${isClosed ? "is-closed" : ""}`}
              key={item.id}
              target="_self"
              rel="noopener noreferrer"
            >
              <div className="recruitment-media">
                <img
                  src={item.image}
                  alt={item.title}
                  className="recruitment-image"
                  loading="lazy"
                />
                <span
                  className={`recruitment-badge ${
                    isClosed ? "badge-closed" : "badge-open"
                  }`}
                >
                  {isClosed ? "ĐÃ ĐÓNG" : "ĐANG TUYỂN"}
                </span>
              </div>

              <div className="recruitment-info">
                <h3 className="recruitment-title">{item.title}</h3>
                <p className="recruitment-desc">{item.desc}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Container_Recruiitment;
