import React, { useMemo, useState } from "react";
import {
  FacebookFilled,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

import "./Architec.css";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  message,
  Carousel,
  Modal,
} from "antd";
import {
  FaUserFriends,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaDraftingCompass,
  FaCheckCircle,
  FaHome,
  FaBuilding,
  FaRecycle,
  FaRegSmileBeam,
} from "react-icons/fa";

import Turnstile from "react-turnstile";

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

/* ẢNH INTRO BÊN PHẢI */
const mapImage = TKCL;

const PHONE_RE = /^(0|\+84)(\d{9})$/;
// Turnstile notes const
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

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
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cfToken, setCfToken] = useState("");

  // state cho lightbox preview
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const budgetValue = useMemo(() => {
    const b = form.getFieldValue("budget");
    switch (b) {
      case "Dưới 50 Triệu":
        return 30000000;
      case "50 - 100 Triệu":
        return 75000000;
      case "100 - 150 Triệu":
        return 125000000;
      case "Trên 150 Triệu":
        return 160000000;
      default:
        return 1000000;
    }
  }, [form]);

  const onFinish = async (values) => {
    if (submitting) return;

    // ❗ BẮT BUỘC phải xác nhận Turnstile trước khi gửi
    if (!cfToken) {
      message.error("Vui lòng xác nhận bảo mật trước khi gửi form!");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        area_floor: values.area_floor,
        location: values.location,
        budget: values.budget,
        message: values.message || "",
        form_type: "kien-truc",
        turnstile_token: cfToken, // gửi token xuống backend
      };

      const res = await fetch("https://api.nguyenhai.com.vn/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let err = "";
        try {
          err = await res.text();
        } catch {}
        throw new Error(`API ${res.status}: ${err || "Gửi thất bại"}`);
      }

      // Google Ads Conversion
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-17496261728/Cf4vCIHqlo0bEOCI75ZB",
          value: budgetValue,
          currency: "VND",
        });
      }

      // GTM / dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit_success",
        form_name: "ContactForm_KienTruc",
        budget: values.budget,
        location: values.location,
      });

      setSuccessMessage(
        "🎉 Gửi yêu cầu thành công! Kiến trúc sư Nguyễn Hải sẽ liên hệ tư vấn thiết kế trong thời gian sớm nhất."
      );
      message.success("Đã nhận thông tin, cảm ơn anh/chị!");
      form.resetFields();
      setCfToken(""); // reset token cho lần gửi sau
    } catch (e) {
      console.error("❗ Lỗi khi gửi dữ liệu:", e);
      message.error("🚫 Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

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
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-sky-700">
            Phong cách kiến trúc được khách hàng yêu thích
          </h2>
          <p className="text-[15px] text-slate-600 max-w-2xl">
            Tùy gu thẩm mỹ &amp; công năng sử dụng,{" "}
            <span className="font-semibold text-sky-700">PCD Nguyễn Hải</span>{" "}
            có thể phát triển nhiều <strong>phong cách kiến trúc nhà ở</strong>{" "}
            khác nhau – hoặc kết hợp linh hoạt để ra chất riêng của gia đình
            anh/chị.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-1.5">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Hiện đại – Modern
              </h3>
              <p className="text-[14px] text-slate-600">
                Đường nét khỏe, ít chi tiết, dễ thi công, phù hợp gia đình trẻ
                yêu thích sự tối giản nhưng tinh tế.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-1.5">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Tân cổ điển – Neo Classic
              </h3>
              <p className="text-[14px] text-slate-600">
                Sang trọng, mềm mại với phào chỉ, cột, mái vòm vừa phải – phù
                hợp biệt thự &amp; nhà phố 2–4 tầng.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-1.5">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Indochine – Đông Dương
              </h3>
              <p className="text-[14px] text-slate-600">
                Kết hợp chất Á Đông &amp; hiện đại, gỗ, gạch bông, màu trung
                tính – rất hợp homestay &amp; villa nghỉ dưỡng và nhà ở cao cấp.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-1.5">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Tối giản – Minimal / Scandinavian
              </h3>
              <p className="text-[14px] text-slate-600">
                Ưu tiên ánh sáng tự nhiên, màu trắng – gỗ – xám; không gian gọn
                gàng, dễ dọn dẹp &amp; sử dụng lâu dài.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-1.5">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Japandi / Nhật – Bắc Âu
              </h3>
              <p className="text-[14px] text-slate-600">
                Ấm áp, nhiều gỗ, đường nét mộc mạc nhưng tinh tế – rất hợp nhà
                phố &amp; biệt thự gia đình trẻ.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-1.5">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Tropical / Resort
              </h3>
              <p className="text-[14px] text-slate-600">
                Nhiều mảng xanh, hiên, sân trong; tối ưu thông gió &amp; nắng
                gió – phù hợp villa, homestay, nhà vườn.
              </p>
            </div>
          </div>
        </section>

        {/* ================= WHAT YOU GET ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-sky-700">
            Sau khi hoàn thành, anh/chị nhận được những gì?
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Trọn bộ hồ sơ thiết kế kiến trúc nhà ở
              </h3>
              <ul className="space-y-1.5 text-[14px] text-slate-600">
                <li>
                  • Mặt bằng các tầng, mái, sân thượng, sân vườn (nếu có).
                </li>
                <li>
                  • Mặt đứng, mặt cắt thể hiện rõ tỷ lệ, cao độ, hình khối kiến
                  trúc.
                </li>
                <li>
                  • Chi tiết cầu thang, vệ sinh, ban công, lan can, mái che…
                </li>
                <li>
                  • Phối cảnh 3D mặt tiền (và các góc chính, nếu có trong gói
                  thiết kế).
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Tài liệu hỗ trợ thi công &amp; pháp lý (tuỳ gói)
              </h3>
              <ul className="space-y-1.5 text-[14px] text-slate-600">
                <li>• File mềm (PDF/CAD) + bản in (nếu anh/chị yêu cầu).</li>
                <li>
                  • Hồ sơ kèm theo để{" "}
                  <strong>xin phép xây dựng, hoàn công</strong> (nếu chọn gói
                  tương ứng).
                </li>
                <li>
                  • Tư vấn thêm về vật liệu, giải pháp thi công phù hợp với hồ
                  sơ kiến trúc.
                </li>
                <li>
                  • Có thể nâng cấp sang gói thi công trọn gói bất cứ lúc nào.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= EXTRA SERVICES ================= */}
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-sky-700">
            Dịch vụ kiến trúc bổ sung tại PCD Nguyễn Hải
          </h2>
          <p className="text-[15px] text-slate-600 max-w-3xl">
            Không chỉ dừng ở việc vẽ bản vẽ,{" "}
            <span className="font-semibold text-sky-700">PCD Nguyễn Hải</span>{" "}
            còn đồng hành cùng anh/chị trong các công việc{" "}
            <strong>liên quan đến kiến trúc &amp; pháp lý ngôi nhà</strong>.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Thiết kế kiến trúc + nội thất concept
              </h3>
              <p className="text-[14px] text-slate-600">
                Phát triển song song mặt bằng kiến trúc &amp; concept nội thất
                chính, giúp anh/chị hình dung rõ cách bố trí đồ nội thất, hệ tủ
                bếp, tủ quần áo, kệ tivi, bàn ghế… ngay từ đầu.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Thiết kế kiến trúc cho nhà cho thuê, homestay, shophouse
              </h3>
              <p className="text-[14px] text-slate-600">
                Tối ưu số phòng, luồng giao thông, không gian chung – riêng để
                vừa đảm bảo trải nghiệm khách, vừa tối ưu doanh thu cho chủ nhà.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Thiết kế + hồ sơ xin phép xây dựng / hoàn công
              </h3>
              <p className="text-[14px] text-slate-600">
                Chuẩn bị bộ hồ sơ phù hợp quy định địa phương, hỗ trợ anh/chị
                trong quá trình xin phép xây dựng, hoàn công, làm việc với ngân
                hàng (nếu cần).
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 space-y-2">
              <h3 className="text-[15px] font-semibold text-sky-700">
                Tư vấn cải tạo nhà cũ, nâng tầng, làm mới mặt tiền
              </h3>
              <p className="text-[14px] text-slate-600">
                Kiến trúc sư xem hiện trạng (qua hình ảnh, hồ sơ cũ), tư vấn
                phương án cải tạo hợp lý để ngôi nhà đẹp hơn, sáng hơn mà vẫn
                đảm bảo kết cấu &amp; tối ưu chi phí.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CONTACT FORM ================= */}
        <section
          id="form-lien-he"
          className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-50 p-6 md:p-8 lg:p-10 space-y-5"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-sky-700">
              Gửi thông tin để kiến trúc sư tư vấn phương án thiết kế phù hợp
            </h2>
            <p className="text-[15px] text-slate-600 max-w-2xl">
              Anh/chị chỉ cần để lại thông tin cơ bản. Nếu có sẵn{" "}
              <span className="font-semibold">
                sổ đỏ, mặt bằng hiện trạng hoặc hình ảnh nhà đang ở
              </span>
              , hãy ghi chú trong form – đội ngũ{" "}
              <span className="font-semibold text-sky-700">PCD Nguyễn Hải</span>{" "}
              sẽ liên hệ để trao đổi kỹ hơn về{" "}
              <strong>phương án kiến trúc</strong>.
            </p>
          </div>

          {/* form liên hệ */}
          <div className="grid gap-8 md:grid-cols-[1.2fr,0.9fr] items-stretch">
            {/* Form */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 md:p-6">
              <div className="mb-4 rounded-2xl border border-dashed border-sky-300 bg-sky-50/80 px-4 py-3 flex items-start gap-2">
                <FaRegSmileBeam className="mt-0.5 text-sky-600" />
                <h3 className="m-0 text-[14px] font-semibold text-sky-900">
                  Hãy để lại thông tin ở form dưới đây,
                  <br />
                  <span className="font-normal text-sky-800">
                    chúng tôi sẽ gọi tư vấn miễn phí &amp; gợi ý{" "}
                    <strong>phương án thiết kế kiến trúc</strong> phù hợp để
                    anh/chị tham khảo trước khi quyết định.
                  </span>
                </h3>
              </div>

              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                >
                  <Input placeholder="Họ và tên" autoComplete="name" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      validator: (_, v) =>
                        !v || PHONE_RE.test(v)
                          ? Promise.resolve()
                          : Promise.reject(
                              "SĐT không hợp lệ (0/ +84 và 10 số)."
                            ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Số điện thoại"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input placeholder="Email" autoComplete="email" />
                </Form.Item>

                <Form.Item
                  name="area_floor"
                  label="Diện tích & số tầng dự kiến"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập diện tích và số tầng!",
                    },
                  ]}
                >
                  <Input placeholder="Ví dụ: 5x20m, 3 tầng + tum" />
                </Form.Item>

                <Form.Item
                  name="location"
                  label="Khu vực / Địa phương"
                  rules={[
                    { required: true, message: "Vui lòng nhập khu vực!" },
                  ]}
                >
                  <Input placeholder="Ví dụ: Hòa Xuân – Cẩm Lệ – Đà Nẵng" />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-sky-800 font-semibold">
                      Ngân sách dự kiến cho thiết kế kiến trúc
                    </span>
                  }
                  name="budget"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngân sách!" },
                  ]}
                >
                  <Radio.Group className="w-full font-medium">
                    <Row gutter={[8, 8]}>
                      <Col xs={12} sm={12} md={6}>
                        <Radio value="Dưới 50 Triệu">Dưới 50 Triệu</Radio>
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <Radio value="50 - 100 Triệu">50 - 100 Triệu</Radio>
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <Radio value="100 - 150 Triệu">100 - 150 Triệu</Radio>
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <Radio value="Trên 150 Triệu">Trên 150 Triệu</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>

                <Form.Item name="message" label="Ghi chú (nếu có)">
                  <Input.TextArea
                    rows={3}
                    placeholder="Ví dụ: Đất 2 mặt tiền, thích phong cách hiện đại/Indochine, cần 3 phòng ngủ, có phòng làm việc..."
                  />
                </Form.Item>

                {/* 🔒 Turnstile CAPTCHA */}
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <Turnstile
                    sitekey={TURNSTILE_SITE_KEY}
                    onVerify={(token) => setCfToken(token)}
                    onExpire={() => setCfToken("")}
                    options={{ theme: "light" }}
                  />
                </div>

                {successMessage && (
                  <div className="mb-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    {successMessage}
                  </div>
                )}

                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={submitting}
                    disabled={submitting}
                    className="h-11 rounded-full !bg-sky-600 hover:!bg-sky-700 border-0 font-semibold"
                  >
                    {submitting
                      ? "Đang gửi..."
                      : "Gửi yêu cầu tư vấn thiết kế kiến trúc"}
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* Side visual NEW */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 md:p-6 hidden md:flex flex-col gap-4 h-full justify-center">
              {/* ẢNH */}
              <div className="relative w-full h-[350px] rounded-3xl overflow-hidden shadow-xl bg-white flex items-center justify-center">
                <img
                  src={mapImage}
                  alt="Đại diện Nguyễn Hải Design & Build"
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* KHỐI DƯỚI: BOX THÔNG TIN + SOCIAL */}
              <div className="relative w-full">
                {/* BOX THÔNG TIN + CTA */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg px-5 py-4">
                  <p className="font-semibold text-slate-900 text-[15px]">
                    PCD Nguyễn Hải · Thiết kế Kiến trúc Nhà phố &amp; Biệt thự
                  </p>

                  <p className="text-[13px] text-slate-600 mt-0.5">
                    Hotline: 0978 999 043 · 0905 402 989
                  </p>

                  <div className="flex gap-2 mt-3">
                    <a
                      href="tel:0978999043"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-[13px] font-semibold text-white rounded-full shadow-md bg-[#096cb5] hover:bg-[#075a91] transition-all"
                    >
                      Gọi ngay
                    </a>

                    <a
                      href="https://zalo.me/0978999043"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-[13px] font-semibold rounded-full border border-[#096cb5] text-[#096cb5] bg-white hover:bg-[#096cb51a] transition-all"
                    >
                      Nhắn Zalo
                    </a>
                  </div>
                </div>

                {/* SOCIAL ICONS – NGOÀI BÊN PHẢI */}
                <div className="hidden lg:flex flex-col gap-2 absolute -right-6 top-1/2 -translate-y-1/2">
                  <a
                    href="https://www.facebook.com/nguyenhaidesignandbuild"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-[#1877F2]"
                  >
                    <FacebookFilled style={{ fontSize: 18 }} />
                  </a>

                  <a
                    href="https://www.youtube.com/@thicongnhadanang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-[#FF0000]"
                  >
                    <YoutubeFilled style={{ fontSize: 18 }} />
                  </a>

                  <a
                    href="https://www.tiktok.com/@nguyenhai22.11.2012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-black"
                  >
                    <TikTokOutlined style={{ fontSize: 18 }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section
          id="quy-trinh-thiet-ke"
          className="bg-slate-50 rounded-3xl border border-slate-200 p-6 md:p-8 space-y-5"
        >
          <h2 className="text-xl md:text-2xl font-bold text-sky-700 text-center">
            Quy trình thiết kế kiến trúc nhà ở tại PCD Nguyễn Hải
          </h2>

          <p className="text-[15px] text-slate-600 max-w-3xl mx-auto text-center">
            Quy trình rõ ràng, minh bạch. Anh/chị luôn biết hồ sơ thiết kế đang
            ở bước nào và khi nào sẽ nhận được bản vẽ kiến trúc hoàn thiện.
          </p>

          <div className="space-y-3 text-[15px] leading-relaxed text-slate-700">
            <div>
              <h4 className="font-semibold text-sky-800">
                1. Tiếp nhận nhu cầu &amp; tư vấn định hướng kiến trúc
              </h4>
              <p>
                Kiến trúc sư trao đổi cùng anh/chị qua điện thoại, Zalo hoặc gặp
                trực tiếp tại văn phòng để nắm nhu cầu, số lượng thành viên,
                thói quen sinh hoạt, phong cách mong muốn, ngân sách dự kiến…
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sky-800">
                2. Đề xuất sơ bộ &amp; báo giá thiết kế chi tiết
              </h4>
              <p>
                Dựa trên hiện trạng đất và nhu cầu, chúng tôi đưa ra định hướng
                bố trí mặt bằng sơ bộ, tư vấn số tầng, giải pháp cầu thang,
                giếng trời, ánh sáng… kèm bảng báo giá chi tiết cho hồ sơ kiến
                trúc.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sky-800">
                3. Ký hợp đồng thiết kế kiến trúc
              </h4>
              <p>
                Khi hai bên thống nhất, PCD Nguyễn Hải lập hợp đồng thiết kế
                kiến trúc: thể hiện rõ phạm vi mặt bằng, mặt đứng, mặt cắt, phối
                cảnh 3D (nếu có), thời gian thực hiện, tiến độ thanh toán và
                quyền lợi của anh/chị.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sky-800">
                4. Thiết kế chi tiết &amp; chỉnh sửa theo góp ý
              </h4>
              <p>
                Chúng tôi triển khai mặt bằng chi tiết, mặt đứng, mặt cắt, phối
                cảnh 3D… và gửi anh/chị duyệt. Nếu có góp ý điều chỉnh, kiến
                trúc sư sẽ trao đổi và tinh chỉnh đến khi anh/chị thật sự hài
                lòng với phương án kiến trúc.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sky-800">
                5. Bàn giao hồ sơ &amp; hỗ trợ trong quá trình thi công
              </h4>
              <p>
                Sau khi hoàn thiện, PCD Nguyễn Hải bàn giao trọn bộ hồ sơ kiến
                trúc (và các hồ sơ liên quan nếu có). Đội ngũ kỹ sư có thể tiếp
                tục đồng hành tư vấn hoặc thi công trọn gói để đảm bảo công
                trình xây đúng bản vẽ.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 min-w-[180px] max-w-[220px] bg-sky-700 text-slate-50 rounded-2xl p-4 text-center shadow-md"
              >
                <div className="text-2xl mb-2 flex justify-center">
                  {step.icon}
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] mb-1">
                  {step.title}
                </h4>
                <p className="text-[13px] leading-relaxed opacity-95">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

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
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 2 },
                },
                {
                  breakpoint: 640,
                  settings: { slidesToShow: 1 },
                },
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
                          {/* <p className="text-[12px] text-slate-200">
                            {project.location}
                          </p> */}
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

            {/* Prev / Next buttons */}
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
        <section className="architec-cta-final">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/95 border border-sky-100 rounded-3xl shadow-lg px-6 py-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                Thiết kế kiến trúc nhà ở · Gọi là được tư vấn ngay
              </p>
              <h2 className="text-lg md:text-xl font-bold text-sky-700">
                Gửi mặt bằng – nhận tư vấn định hướng kiến trúc miễn phí.
              </h2>
              <p className="text-[14px] text-slate-600 max-w-xl">
                Một cuộc trao đổi ngắn với kiến trúc sư{" "}
                <span className="font-semibold text-sky-700">
                  PCD Nguyễn Hải
                </span>{" "}
                có thể giúp anh/chị tránh được rất nhiều{" "}
                <strong>sai lầm khi quyết định kiến trúc ngôi nhà</strong>. Cứ
                hỏi kỹ trước, rồi hãy bắt đầu xây.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a
                href="tel:0978999043"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg bg-gradient-to-r from-sky-600 to-sky-900 hover:from-sky-700 hover:to-sky-950 transition-transform duration-150 hover:-translate-y-0.5"
              >
                Gọi ngay · 0978 999 043
              </a>
              <p className="text-[12px] text-slate-500 md:text-right">
                Hoặc nhắn Zalo, gửi sổ đỏ / mặt bằng / nhu cầu – chúng tôi sẽ
                chủ động liên hệ tư vấn kiến trúc.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Architec_Designs;
