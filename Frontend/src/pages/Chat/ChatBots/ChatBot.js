import React, { useEffect, useState } from "react";
import { PhoneFilled, MessageOutlined } from "@ant-design/icons";
import "./ChatBot.css";
import iconsZalo from "../../../assets/zalo_icon.png";
import iconsFacebook from "../../../assets/logofb.png";

export default function ChatBot() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  // SỐ ĐIỆN THOẠI CHUẨN QUỐC TẾ
  const PHONE_NUMBER = "+84905402989";
  const ZALO_URL = "https://zalo.me/0978999043";
  const FACEBOOK_URL = "https://www.facebook.com/nguyenhaidesignandbuild";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handle = () => {
      if (mq.matches) setIsFabOpen(false);
    };
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const trackEvent = (action, label) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "contact_fab_click",
      action,
      label,
    });

    if (window.gtag) {
      window.gtag("event", action, {
        event_category: "Contact FAB",
        event_label: label,
      });
    }
  };

  const openPhone = () => {
    trackEvent("click_call", PHONE_NUMBER);

    // BẮN CHUYỂN ĐỔI GOOGLE ADS - NHẤP ĐỂ GỌI
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17496261728/E5fKCLL228gbEOCI75ZB", // SEND_TO của ní
        value: 1.0,
        currency: "VND",
        event_callback: () => {
          window.location.href = `tel:${PHONE_NUMBER}`;
        },
      });
    } else {
      // fallback nếu gtag chưa load
      window.location.href = `tel:${PHONE_NUMBER}`;
    }

    return false;
  };

  const openZalo = () => {
    trackEvent("click_zalo", ZALO_URL);
    window.open(ZALO_URL, "_blank");
  };

  const openFacebook = () => {
    trackEvent("click_facebook", FACEBOOK_URL);
    window.open(FACEBOOK_URL, "_blank");
  };

  const toggleFabMenu = () => {
    setIsFabOpen((prev) => !prev);
  };

  return (
    <>
      <div className="contact-fab">
        <div className={`fab-menu ${isFabOpen ? "show" : ""}`}>
          <button
            className="fab-item fab-facebook"
            onClick={openFacebook}
            title="Facebook"
            aria-label="Facebook"
          >
            <img src={iconsFacebook} alt="Facebook" className="fab-img" />
          </button>

          <button
            className="fab-item fab-zalo"
            onClick={openZalo}
            title="Zalo"
            aria-label="Zalo"
          >
            <img src={iconsZalo} alt="Zalo" className="fab-img" />
          </button>

          <button
            className="fab-item fab-phone"
            onClick={openPhone}
            title="Gọi điện"
            aria-label="Gọi điện"
          >
            <PhoneFilled />
          </button>
        </div>

        <button
          className={`fab-toggle ${isFabOpen ? "open" : ""}`}
          onClick={toggleFabMenu}
          aria-label="Liên hệ nhanh"
          title="Liên hệ nhanh"
        >
          <MessageOutlined className="fab-toggle-icon" />
        </button>
      </div>
    </>
  );
}
