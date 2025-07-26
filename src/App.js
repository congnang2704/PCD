import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// home
import HomePages from "./pages/Pages_Home/home_pages";
// giới thiêu
import AboutUs from "./components/about_us/about_us";
import History from "./components/about_us/history";
// dịch vụ
import Services from "./components/services/Services";
import Services_Architec from "./components/services/Architec_Design";
import Services_Interior from "./components/services/Interior_Design";
import Rough_Construction from "./components/services/Rough_Construction";
import Finishing_Constructions from "./components/services/Finishing_Construction";
import Building_House from "./components/services/Building_House";
// mẫu nhà đẹp
import House_Models from "./components/Beautiful_House/House_Model";
import House_Two from "./components/Beautiful_House/House_Two";
import House_Three from "./components/Beautiful_House/House_Three";
import House_Five from "./components/Beautiful_House/House_Five";
import House_Villa from "./components/Beautiful_House/House_Villa";
import House_Hotel from "./components/Beautiful_House/House__Hotel";
//liên hệ
import Contact_Us from "./components/Contact_Us/Contact_Us";
//tuyển dụng
import Recruitment from "./components/Recruiitment/Recruiitment";
// chính sách bảo mật
import SecurityPolicy from "./components/Policy/Security";
// chính sách bảo hành
import WarrantyPolicy from "./components/Policy/Warranty";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />

      {/* click here to see the about us page about us & history */}
      <Route path="/gioi-thieu" element={<AboutUs />} />
      <Route path="/lich-su" element={<History />} />

      {/* click here to see the dịch vụ page & sub pages */}
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
        path="/dich-vu/thi-cong-hoan-thien"
        element={<Finishing_Constructions />}
      />
      <Route path="/dich-vu/xay-nha-tron-goi" element={<Building_House />} />

      {/* click here to see the mẫu nhà đẹp page & sub pages */}
      <Route path="/mau-nha-dep" element={<House_Models />} />
      <Route path="/mau-nha-dep/nha-2-tang" element={<House_Two />} />
      <Route path="/mau-nha-dep/nha-3-tang" element={<House_Three />} />
      <Route path="/mau-nha-dep/nha-5-tang" element={<House_Five />} />
      <Route path="/mau-nha-dep/biet-thu" element={<House_Villa />} />
      <Route path="/mau-nha-dep/khach-san" element={<House_Hotel />} />

      {/* click here to see the liên hệ */}
      <Route path="/lien-he" element={<Contact_Us />} />
      {/* click here to see the tuyển dụng */}
      <Route path="/tuyen-dung" element={<Recruitment />} />
      {/* click chính sách bảo mật */}
      <Route path="/chinh-sach-bao-mat" element={<SecurityPolicy />} />
      {/* click chính sách bảo hành */}
      <Route path="/chinh-sach-bao-hanh" element={<WarrantyPolicy />} />
    </Routes>
  );
}

export default App;
