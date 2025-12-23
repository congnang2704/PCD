import React, { useState } from "react";
import {
  FacebookFilled,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

import "./Architec.css";
import { Carousel, Modal } from "antd";
import {
  FaUserFriends,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaDraftingCompass,
  FaCheckCircle,
  FaHome,
  FaBuilding,
  FaRecycle,
} from "react-icons/fa";

import FAQComponent from "../../view/FAQComponent/FAQComponent";
import DQKH from "../../view/DanhGiaKH/DanhGiaKH";

import House from "../../../../assets/13.jpg";
import nhaHouse from "../../../../assets/nha2.jpg";
import cttb1House from "../../../../assets/TKKT/4.webp";
import cttb2House from "../../../../assets/TKKT/nha4.webp";
import cttb3House from "../../../../assets/TKKT/asadasdsa.webp";
import cttb4House from "../../../../assets/TKKT/13.webp";
import cttb5House from "../../../../assets/TKKT/4.webp";
import cttb6House from "../../../../assets/TKKT/nhatrongoi1.webp";
import cttb7House from "../../../../assets/TKKT/nhahoaxuan3.webp";

import TKCL from "../../../../assets/banner/hero.webp";

// ✅ NEW: import component form đã tách
import ContactForm_KienTruc from "../../../../components/Mail/Mail_TKKT/FormMail_KienTruc";

/* ẢNH INTRO BÊN PHẢI */
const mapImage = TKCL;

const steps = [
  {
    icon: <FaUserFriends />,
    title: "Tiếp nhận & lắng nghe",
    description:
      "Kiến trúc sư trao đổi trực tiếp để hiểu rõ nhu cầu, thói quen sinh hoạt & mong muốn về ngôi nhà tương lai.",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "Đề xuất & báo giá thiết kế",
    description:
      "Đề xuất định hướng kiến trúc, phong cách và giải pháp mặt bằng – gửi báo giá thiết kế rõ ràng, minh bạch.",
  },
  {
    icon: <FaFileSignature />,
    title: "Ký hợp đồng thiết kế",
    description:
      "Thống nhất phạm vi hồ sơ thiết kế kiến trúc, tiến độ, quyền lợi hai bên – ký hợp đồng & bắt đầu triển khai.",
  },
  {
    icon: <FaDraftingCompass />,
    title: "Thiết kế chi tiết",
    description:
      "Triển khai mặt bằng, mặt đứng, mặt cắt, phối cảnh 3D & hoàn thiện hồ sơ kiến trúc theo góp ý của gia đình.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Bàn giao & đồng hành",
    description:
      "Bàn giao trọn bộ hồ sơ kiến trúc. Có thể tiếp tục đồng hành cùng anh/chị trong giai đoạn thi công (nếu cần).",
  },
];

// 🧩 Các gói thiết kế kiến trúc
const designPackages = [
  {
    name: "Gói Cơ Bản",
    subtitle: "Hồ sơ kiến trúc đủ dùng thi công",
    priceNote:
      "Đơn giá tham khảo · Anh/chị liên hệ để được báo giá theo diện tích",
    bestFor:
      "Phù hợp gia đình muốn tối ưu chi phí nhưng vẫn cần hồ sơ rõ ràng để thi công.",
    items: [
      "Mặt bằng các tầng, mái, sân thượng.",
      "Mặt đứng, mặt cắt cơ bản thể hiện hình khối.",
      "Chi tiết cầu thang, vệ sinh, ban công ở mức thi công được.",
      "File PDF + tư vấn online trong quá trình thi công.",
    ],
    tag: "Tiết kiệm",
  },
  {
    name: "Gói Nâng Cao",
    subtitle: "Thêm phối cảnh 3D & tư vấn vật liệu",
    priceNote: "Đề xuất khi anh/chị xây nhà ở chính, muốn đầu tư bài bản hơn.",
    bestFor:
      "Phù hợp gia đình muốn hình dung rõ ngôi nhà tương lai & hạn chế tối đa phát sinh khi thi công.",
    items: [
      "Toàn bộ hồ sơ như Gói Cơ Bản.",
      "Phối cảnh 3D mặt tiền (1–2 phương án).",
      "Gợi ý vật liệu chính phù hợp ngân sách.",
      "Hỗ trợ chỉnh sửa phương án đến khi chốt.",
    ],
    tag: "Được chọn nhiều",
  },
  {
    name: "Gói Chi Tiết / Full",
    subtitle: "Kiến trúc chi tiết, hỗ trợ pháp lý & nâng cấp nội thất",
    priceNote:
      "Tùy quy mô & phạm vi, PCD Nguyễn Hải sẽ báo giá riêng theo từng công trình.",
    bestFor:
      "Phù hợp nhà ở lâu dài, biệt thự, villa nghỉ dưỡng hoặc nhà kết hợp kinh doanh/cho thuê.",
    items: [
      "Hồ sơ kiến trúc chi tiết đầy đủ.",
      "Phối cảnh 3D nhiều góc nhìn (theo gói).",
      "Tư vấn xin phép xây dựng/hoàn công (tuỳ nhu cầu).",
      "Có thể nâng cấp sang gói nội thất & thi công trọn gói.",
    ],
    tag: "Đề xuất cho biệt thự",
  },
];

// 📸 Portfolio – dùng cho slider
const portfolioProjects = [
  {
    image: cttb1House,
    title:
      "Cải tạo mặt tiền nhà phố 3 tầng – thay mới kiến trúc, tối ưu ánh sáng",
    location: "Hòa Xuân, Đà Nẵng",
  },
  {
    image: cttb2House,
    title:
      "Cải tạo & nâng cấp nội thất – bổ sung công năng, tối ưu không gian sống",
    location: "Sơn Trà, Đà Nẵng",
  },
  {
    image: cttb3House,
    title:
      "Nâng tầng – gia cố móng & kết cấu, mở rộng diện tích sử dụng cho gia đình trẻ",
    location: "Ngũ Hành Sơn, Đà Nẵng",
  },
  {
    image: cttb4House,
    title:
      "Biệt thự hiện đại 3 tầng – hình khối mạnh, nhiều mảng kính nhưng vẫn riêng tư",
    location: "Hải Châu, Đà Nẵng",
  },
  {
    image: cttb5House,
    title:
      "Homestay nghỉ dưỡng – tối ưu số phòng & trải nghiệm khách lưu trú dài ngày",
    location: "Gần Hội An, Quảng Nam",
  },
  {
    image: cttb6House,
    title:
      "Nhà phố kết hợp kinh doanh – mặt tiền thu hút, lối đi riêng cho không gian ở",
    location: "Liên Chiểu, Đà Nẵng",
  },
  {
    image: cttb7House,
    title:
      "Nhà phố kết hợp kinh doanh – mặt tiền thu hút, lối đi riêng cho không gian ở",
    location: "Liên Chiểu, Đà Nẵng",
  },
];

const Architec_Designs = () => {
  // state cho lightbox preview
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const openPreview = (index) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  };

  const handlePrev = () => {
    setPreviewIndex(
      (prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length
    );
  };

  const handleNext = () => {
    setPreviewIndex((prev) => (prev + 1) % portfolioProjects.length);
  };

  return (
    <div className="architec-gradient-bg min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-10 lg:py-14 space-y-14">
        {/* ================= HERO ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-xs font-bold tracking-[0.18em] uppercase text-sky-700">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              Dịch vụ thiết kế kiến trúc nhà phố &amp; biệt thự · Đà Nẵng
            </div>
            <p className="text-[12px] text-right text-slate-500">
              Công ty TNHH MTV PCD Nguyễn Hải · Thiết kế kiến trúc nhà ở <br />{" "}
              Địa chỉ: 17 Nguyễn Cư Trinh, Đà Nẵng
            </p>
          </div>

          <div className="grid gap-8 lg:gap-10 md:grid-cols-[1.5fr,1fr] items-center">
            {/* Left */}
            <div className="space-y-5">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-slate-900 ">
                Thiết kế kiến trúc nhà phố, biệt thự
                <br />
                <span className="block text-[18px] sm:text-[20px] mt-1 text-sky-700">
                  Tối ưu công năng – đẹp bền vững – dễ thi công.
                </span>
              </h1>

              <p className="text-[15px] leading-relaxed text-slate-600">
                Tại{" "}
                <span className="font-semibold text-sky-800">
                  PCD Nguyễn Hải
                </span>
                , chúng tôi tập trung vào{" "}
                <strong>thiết kế kiến trúc nhà ở</strong> bài bản: tổ chức mặt
                bằng, chiều cao tầng, mặt tiền, ánh sáng, thông gió… để ngôi nhà
                vừa đẹp vừa ở sướng – không chỉ đẹp trên phối cảnh 3D.
              </p>

              <ul className="space-y-2 text-[14px] text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    Thiết kế dựa trên thói quen sinh hoạt &amp; số lượng thành
                    viên – không copy mẫu đại trà trên mạng.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    Hồ sơ kiến trúc đầy đủ: mặt bằng, mặt đứng, mặt cắt, chi
                    tiết cấu tạo… phù hợp thi công ngoài thực tế.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    Có thể bổ sung{" "}
                    <strong>hồ sơ xin phép xây dựng, hoàn công</strong> &amp; tư
                    vấn thi công nếu anh/chị có nhu cầu.
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:0978999043"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Gọi kiến trúc sư · 0978 999 043
                </a>
                <a
                  href="#form-lien-he"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-800 bg-white hover:bg-slate-50"
                >
                  Gửi mặt bằng / nhu cầu thiết kế để được tư vấn
                </a>
              </div>

              <p className="text-[13px] text-slate-500">
                Anh/chị chỉ cần gửi thông tin đất &amp; nhu cầu sử dụng,{" "}
                <span className="font-semibold text-sky-700">Nguyễn Hải</span>{" "}
                sẽ phác thảo hướng <strong>thiết kế kiến trúc nhà</strong> phù
                hợp để tham khảo trước khi quyết định.
              </p>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-xl border border-sky-100">
                <img
                  src={House}
                  alt="Biệt thự hiện đại do PCD Nguyễn Hải thiết kế kiến trúc"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 left-4 bg-slate-900/90 text-slate-50 text-xs sm:text-[13px] px-3 py-2 rounded-2xl shadow-lg">
                Biệt thự hiện đại – hồ sơ kiến trúc do{" "}
                <span className="font-semibold">PCD Nguyễn Hải</span> thực hiện.
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY DESIGN ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 grid gap-8 lg:gap-10 md:grid-cols-[1.6fr,1.1fr] items-start">
          {/* Left text */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-7 space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-sky-700">
              Tại sao phải thiết kế kiến trúc trước khi xây nhà?
            </h2>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              Thiết kế kiến trúc là{" "}
              <strong>bộ bản vẽ xương sống của ngôi nhà</strong> – từ mặt bằng,
              mặt đứng, mặt cắt đến cửa, cầu thang, giếng trời, ánh sáng, thông
              gió. Không có hồ sơ kiến trúc tốt, ngôi nhà rất dễ bị:
            </p>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li>
                • Sai công năng – phòng dư chỗ không dùng, chỗ cần lại thiếu.
              </li>
              <li>• Mặt tiền mất cân đối, nhà xây xong vẫn không “đã mắt”.</li>
              <li>
                • Thi công phát sinh liên tục, đập phá sửa lại – chi phí đội lên
                rất nhiều.
              </li>
              <li>
                • Khó xin phép xây dựng, khó hoàn công &amp; làm việc với ngân
                hàng.
              </li>
            </ul>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              Một <strong>hồ sơ thiết kế kiến trúc chuẩn</strong> giúp anh/chị
              kiểm soát được chi phí, tiến độ và chất lượng thi công. Khi kết
              hợp với đơn vị <strong>vừa thiết kế vừa am hiểu thi công</strong>{" "}
              như{" "}
              <span className="font-semibold text-sky-700">PCD Nguyễn Hải</span>
              , khoảng cách giữa bản vẽ &amp; công trình thực tế được rút ngắn
              tối đa.
            </p>
          </div>

          {/* Right box + image */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-900 mb-2">
                Khi anh/chị có hồ sơ kiến trúc đầy đủ:
              </h3>
              <ul className="space-y-1.5 text-[14px] text-emerald-900/90">
                <li>
                  ✓ Biết rõ mình sắp xây ngôi nhà như thế nào, bố trí ra sao.
                </li>
                <li>
                  ✓ Dễ so sánh &amp; làm việc với các đội thi công, tránh nói
                  miệng.
                </li>
                <li>
                  ✓ Hạn chế tối đa tranh cãi giữa chủ nhà – kiến trúc sư – thầu
                  thi công.
                </li>
                <li>
                  ✓ Tự tin hơn khi làm việc với ngân hàng, cơ quan nhà nước liên
                  quan đến hồ sơ nhà ở.
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-lg border border-slate-100">
              <img
                src={nhaHouse}
                alt="Mẫu nhà ở, homestay do PCD Nguyễn Hải thiết kế kiến trúc"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="px-4 py-3 text-center text-[13px] bg-slate-900 text-slate-100">
                <em>
                  Hồ sơ kiến trúc homestay nghỉ dưỡng – tối ưu công năng kinh
                  doanh &amp; trải nghiệm khách.
                </em>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-sky-700">
              Dịch vụ thiết kế kiến trúc tại PCD Nguyễn Hải
            </h2>
            <p className="text-[15px] text-slate-600 max-w-2xl">
              Chúng tôi nhận{" "}
              <strong>thiết kế kiến trúc nhà phố, biệt thự, homestay</strong>{" "}
              với nhiều quy mô khác nhau – ưu tiên công năng sống thật, sự bền
              vững và khả năng thi công ngoài công trình.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-700 mb-1">
                <FaHome />
              </div>
              <h3 className="text-[15px] font-semibold text-sky-700">
                Thiết kế kiến trúc nhà phố &amp; nhà liền kề
              </h3>
              <p className="text-[14px] text-slate-600">
                Tối ưu mặt bằng cho đất ống, đất nở hậu, đất méo… đảm bảo thông
                thoáng, nhiều ánh sáng nhưng vẫn riêng tư và thuận tiện sinh
                hoạt.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-sky-200 shadow-lg p-5 space-y-2 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-sky-600 to-sky-400" />
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-700 mb-1">
                <FaBuilding />
              </div>
              <h3 className="text-[15px] font-semibold text-sky-700">
                Thiết kế kiến trúc biệt thự &amp; villa nghỉ dưỡng
              </h3>
              <p className="text-[14px] text-slate-600">
                Nhấn mạnh hình khối, cảnh quan, trục nhìn và sự riêng tư – tạo
                nên không gian sống sang trọng nhưng không phô trương.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-700 mb-1">
                <FaRecycle />
              </div>
              <h3 className="text-[15px] font-semibold text-sky-700">
                Thiết kế cải tạo, nâng tầng &amp; làm mới mặt tiền
              </h3>
              <p className="text-[14px] text-slate-600">
                Thiết kế lại kiến trúc nhà cũ, nhà xuống cấp, mở rộng thêm
                phòng, thêm tầng, đổi hoàn toàn mặt tiền nhưng vẫn đảm bảo kết
                cấu &amp; an toàn.
              </p>
            </div>
          </div>
        </section>

        {/* ================= PACKAGES ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-sky-700">
              Các gói thiết kế kiến trúc tại PCD Nguyễn Hải
            </h2>
            <p className="text-[15px] text-slate-600 max-w-2xl">
              Tùy nhu cầu &amp; mức độ đầu tư, anh/chị có thể chọn{" "}
              <strong>gói thiết kế kiến trúc</strong> phù hợp. Mức phí sẽ được
              báo rõ ràng theo m² và phạm vi hồ sơ.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {designPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-3xl border shadow-md p-5 flex flex-col h-full ${
                  idx === 1
                    ? "border-sky-300 shadow-lg shadow-sky-50"
                    : "border-slate-100"
                }`}
              >
                {pkg.tag && (
                  <div className="absolute -top-3 left-4 inline-flex items-center rounded-full bg-sky-600 text-[11px] font-semibold text-white px-3 py-1 shadow-md">
                    {pkg.tag}
                  </div>
                )}

                <h3 className="text-[15px] font-semibold text-sky-700 mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[13px] text-slate-600 mb-2">
                  {pkg.subtitle}
                </p>

                <p className="text-[12px] text-slate-500 italic mb-3">
                  {pkg.priceNote}
                </p>

                <p className="text-[13px] text-emerald-800 font-medium mb-2">
                  {pkg.bestFor}
                </p>

                <ul className="text-[13px] text-slate-600 space-y-1.5 mb-4">
                  {pkg.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>

                <div className="mt-auto pt-1">
                  <a
                    href="#form-lien-he"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-semibold border border-sky-500 text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors"
                  >
                    Hỏi thêm về gói {pkg.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STYLES ================= */}
        {/* ... (GIỮ NGUYÊN phần còn lại của bạn) ... */}

        {/* ================= WHAT YOU GET ================= */}
        {/* ... (GIỮ NGUYÊN) ... */}

        {/* ================= EXTRA SERVICES ================= */}
        {/* ... (GIỮ NGUYÊN) ... */}

        {/* ✅ NEW: FORM đã tách ra components */}
        <ContactForm_KienTruc mapImage={mapImage} />

        {/* ================= REVIEWS ================= */}
        <section className="space-y-5">
          <DQKH />
        </section>

        {/* ================= PORTFOLIO SLIDER ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-5">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-sky-700">
              Một số công trình thiết kế kiến trúc tiêu biểu của PCD Nguyễn Hải
            </h2>
            <p className="text-[15px] text-slate-600 max-w-2xl mx-auto">
              Mỗi công trình là một câu chuyện riêng. Điều chúng tôi giữ lại cho
              tất cả khách hàng là:{" "}
              <strong className="text-sky-700">
                một bộ hồ sơ kiến trúc phù hợp với gia đình, với ngân sách và
                với cách anh/chị muốn sống trong ngôi nhà đó.
              </strong>
            </p>
          </div>

          <div className="from-slate-50 to-slate-100 rounded-3xl px-2 sm:px-4 py-6 sm:py-8">
            <Carousel
              dots
              autoplay
              adaptiveHeight
              slidesToShow={3}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 1 } },
              ]}
            >
              {portfolioProjects.map((project, index) => (
                <div key={index} className="px-2">
                  <button
                    type="button"
                    onClick={() => openPreview(index)}
                    className="w-full text-left"
                  >
                    <div className="overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-white h-full">
                      <div className="relative h-[320px] sm:h-[340px]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <p className="text-[13px] sm:text-[14px] text-slate-50 font-medium">
                            {project.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Lightbox / Preview modal */}
        <Modal
          open={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={null}
          centered
          width={900}
          styles={{ body: { padding: 0, backgroundColor: "#020617" } }}
          className="portfolio-preview-modal"
        >
          <div className="relative bg-slate-900 text-slate-100">
            <img
              src={portfolioProjects[previewIndex].image}
              alt={portfolioProjects[previewIndex].title}
              className="w-full max-h-[80vh] object-contain bg-black"
            />

            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-slate-100 flex items-center justify-center text-lg"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-slate-100 flex items-center justify-center text-lg"
            >
              ›
            </button>
          </div>
        </Modal>

        {/* ================= FAQ ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-4">
          <FAQComponent />
        </section>

        {/* ================= CTA FINAL ================= */}
        {/* ... (GIỮ NGUYÊN CTA FINAL của bạn) ... */}
      </main>
    </div>
  );
};

export default Architec_Designs;
