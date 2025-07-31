import React from "react";
import about_us from "../../../../assets/nenNH.jpg";
import ContactForm from "../../view/Mail/ContactFormMail";
import "./Container_NhanSu.css";

const Container_History = () => {
  return (
    <>
      <div className="image-with-caption-banner" />
      <div className="container-abouts">
        <h2>BỘ PHẬN NHÂN SỰ CỦA CÔNG TY TNHH MTV PCD NGUYỄN HẢI</h2>

        {/* Form mail liên hệ */}
        <ContactForm />
      </div>
    </>
  );
};

export default Container_History;
