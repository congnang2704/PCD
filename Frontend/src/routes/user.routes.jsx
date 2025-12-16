import React from "react";
import { Routes, Route } from "react-router-dom";

// home
import HomePages from "../pages/Users/Pages_Home/home_pages";

// giới thiệu
import AboutUs from "../pages/Users/about_us/about_us";
import Nhan_Su from "../pages/Users/about_us/Nhan_Su";

// dịch vụ
import Services from "../pages/Users/services/Services";
import Services_Architec from "../pages/Users/services/Architec_Design";
import Services_Interior from "../pages/Users/services/Interior_Design";
import Rough_Construction from "../pages/Users/services/Rough_Construction";
import Finishing_Constructions from "../pages/Users/services/Finishing_Construction";
import Building_House from "../pages/Users/services/Building_House";
import BuildingPermit from "../pages/Users/services/BuildingPermit";
import Villa_Construction from "../pages/Users/services/Villa_Construction";
import Residence_StreetHouse from "../pages/Users/services/residence_StreetHouse";
import OfficeFitoutPage from "../pages/Users/services/OfficeFitoutPage";
import NhaTienChe from "../pages/Users/services/NhaTienChe";
import RenovationCityHouse from "../pages/Users/services/RenovationCityHouse";
import Karaoke from "../pages/Users/services/Karaoke";

// mẫu nhà đẹp
import House_Models from "../pages/Users/Beautiful_House/House_Model";
import House_Two from "../pages/Users/Beautiful_House/House_Two";
import House_Three from "../pages/Users/Beautiful_House/House_Three";
import House_Five from "../pages/Users/Beautiful_House/House_Five";
import House_Villa from "../pages/Users/Beautiful_House/House_Villa";
import House_Hotel from "../pages/Users/Beautiful_House/House_Hotel";

// liên hệ
import Contact_Us from "../pages/Users/Contact_Us/Contact_Us";

// dự án
import DuAn from "../pages/Users/DuAn/DuAn";

// bảng giá
import BangGia from "../pages/Users/BangGia/banggia";
import BG_ThietKe from "../pages/Users/BangGia/bg.thietke";
import BG_ThiCong from "../pages/Users/BangGia/bg.thicong";

// form nhập liệu
import FormType from "../pages/Users/FormType/FormType";

// tuyển dụng
import Recruitment from "../pages/Users/Recruiitment/Recruiitment";
import JobPost_KeToan from "../pages/Users/Recruiitment/KeToan";
import JobPost_KinhTeXD from "../pages/Users/Recruiitment/KinhTeXD";
import JobPost_Marketing from "../pages/Users/Recruiitment/Marketing";
import JobPost_KientrucSu from "../pages/Users/Recruiitment/KienTrucSu";

// chính sách
import SecurityPolicy from "../pages/Users/Policy/Security";
import WarrantyPolicy from "../pages/Users/Policy/Warranty";

// blog detail
import BlogDetail from "../pages/Users/BlogDetail/BlogDetail_DV";
import BlogDetail_MND from "../pages/Users/BlogDetail/BlogDetail_MND";

export default function UserRoutes() {
  return (
    <Routes>
      {/* Người dùng */}
      <Route path="/" element={<HomePages />} />
      <Route path="/nguyenhai.com.vn" element={<HomePages />} />

      {/* Giới thiệu */}
      <Route path="/gioi-thieu" element={<AboutUs />} />
      <Route path="/nhan-su" element={<Nhan_Su />} />

      {/* Dịch vụ */}
      <Route path="/dich-vu" element={<Services />} />
      <Route
        path="/dich-vu/thiet-ke-kien-truc"
        element={<Services_Architec />}
      />
      <Route
        path="/dich-vu/thiet-ke-noi-that"
        element={<Services_Interior />}
      />
      <Route path="/dich-vu/thi-cong-tho" element={<Rough_Construction />} />
      <Route
        path="/dich-vu/thiet-ke-thi-cong-van-phong"
        element={<OfficeFitoutPage />}
      />
      <Route path="/dich-vu/thi-cong-tron-goi-karaoke" element={<Karaoke />} />
      <Route path="/dich-vu/nha-tien-che" element={<NhaTienChe />} />
      <Route
        path="/dich-vu/thi-cong-hoan-thien"
        element={<Finishing_Constructions />}
      />
      <Route
        path="/dich-vu/cai-tao-nha-cua"
        element={<RenovationCityHouse />}
      />
      <Route path="/dich-vu/xay-nha-tron-goi" element={<Building_House />} />
      <Route
        path="/dich-vu/xin-giay-phep-xay-dung"
        element={<BuildingPermit />}
      />
      <Route
        path="/dich-vu/thi-cong-biet-thu"
        element={<Villa_Construction />}
      />
      <Route
        path="/dich-vu/thiet-ke-nha-dep"
        element={<Residence_StreetHouse />}
      />

      {/* Chi tiết bài viết dịch vụ */}
      <Route path="/dich-vu/:slug" element={<BlogDetail />} />

      {/* Mẫu nhà đẹp */}
      <Route path="/mau-nha-dep" element={<House_Models />} />
      <Route path="/mau-nha-dep/nha-2-tang" element={<House_Two />} />
      <Route path="/mau-nha-dep/nha-3-tang" element={<House_Three />} />
      <Route path="/mau-nha-dep/nha-5-tang" element={<House_Five />} />
      <Route path="/mau-nha-dep/biet-thu" element={<House_Villa />} />
      <Route path="/mau-nha-dep/khach-san" element={<House_Hotel />} />

      {/* Chi tiết bài viết mẫu nhà đẹp */}
      <Route path="/mau-nha-dep/:slug" element={<BlogDetail_MND />} />

      {/* Liên hệ */}
      <Route path="/lien-he" element={<Contact_Us />} />

      {/* FormType */}
      <Route path="/formtype" element={<FormType />} />

      {/* Bảng giá */}
      <Route path="/bang-gia" element={<BangGia />} />
      <Route path="/bang-gia-thiet-ke" element={<BG_ThietKe />} />
      <Route path="/bang-gia-thi-cong" element={<BG_ThiCong />} />

      {/* Dự án */}
      <Route path="/du-an" element={<DuAn />} />

      {/* Tuyển dụng */}
      <Route path="/tuyen-dung" element={<Recruitment />} />
      <Route
        path="/tuyen-dung/pcd-nguyen-hai-tuyen-dung-ke-toan"
        element={<JobPost_KeToan />}
      />
      <Route
        path="/tuyen-dung/pcd-nguyen-hai-tuyen-dung-ky-su-qs"
        element={<JobPost_KinhTeXD />}
      />
      <Route
        path="/tuyen-dung/pcd-nguyen-hai-tuyen-dung-nhan-vien-marketing"
        element={<JobPost_Marketing />}
      />
      <Route
        path="/tuyen-dung/pcd-nguyen-hai-tuyen-dung-kien-truc-su"
        element={<JobPost_KientrucSu />}
      />

      {/* Chính sách */}
      <Route path="/chinh-sach-bao-mat" element={<SecurityPolicy />} />
      <Route path="/chinh-sach-bao-hanh" element={<WarrantyPolicy />} />
    </Routes>
  );
}
