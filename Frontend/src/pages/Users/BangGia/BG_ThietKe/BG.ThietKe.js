import React from "react";
import "./BG.ThietKe.css";
import TabsBG from "../Tabs_BG/Tabs.BG";

const PHONE = "0905402989";
const telHref = `tel:${PHONE}`;

// icon phone SVG nhẹ
function PhoneIcon({ className = "tkp__ctaIcon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.73 21 3 13.27 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

// CTA: chỉ icon + tooltip
function CTA() {
  return (
    <a
      className="tkp__cta tkp__cta--iconOnly"
      href={telHref}
      data-tip="Liên hệ ngay với chúng tôi"
      title="Liên hệ với chúng tôi"
    >
      <span className="tkp__ctaBadge" aria-hidden="true">
        <PhoneIcon />
      </span>
      {/* Nội dung ẩn cho screen reader */}
      <span className="sr-only">Gọi {PHONE}</span>
    </a>
  );
}

const ROWS = [
  { stt: 1, name: "Nhà phố 1 mặt tiền" },
  { stt: 2, name: "Nhà phố 2 mặt tiền" },
  { stt: 3, name: "Nhà biệt thự hiện đại" },
  { stt: 4, name: "Nhà biệt thự cổ điển" },
  { stt: 5, name: "Bar/Nhà hàng/Cafe" },
];

export default function BGThietKe() {
  return (
    <div className="tkp">
      <TabsBG />
      <h1 className="tkp__title">BẢNG GIÁ THIẾT KẾ</h1>

      <div className="tkp__tableWrap">
        <table className="tkp__table">
          <colgroup>
            <col style={{ width: "70px" }} />
            <col />
            <col style={{ width: "180px" }} />
            <col style={{ width: "180px" }} />
            <col style={{ width: "200px" }} />
          </colgroup>

          <thead className="tkp__thead">
            <tr>
              <th className="tkp__th tkp__th--stt">STT</th>
              <th className="tkp__th">HẠNG MỤC</th>
              <th className="tkp__th">THIẾT KẾ MỚI</th>
              <th className="tkp__th">THIẾT KẾ CẢI TẠO</th>
              <th className="tkp__th">THIẾT KẾ SÂN VƯỜN</th>
            </tr>
          </thead>

          <tbody className="tkp__tbody">
            {ROWS.map((r) => (
              <tr className="tkp__tr" key={r.stt}>
                <td className="tkp__td tkp__td--center">{r.stt}</td>
                <td className="tkp__td tkp__td--name">{r.name}</td>
                <td className="tkp__td tkp__td--cta">
                  <CTA />
                </td>
                <td className="tkp__td tkp__td--cta">
                  <CTA />
                </td>
                <td className="tkp__td tkp__td--cta">
                  <CTA />
                </td>
              </tr>
            ))}

            <tr className="tkp__tr tkp__tr--subhead">
              <td className="tkp__td tkp__td--center">6</td>
              <td className="tkp__td tkp__td--name">Hồ sơ bao gồm</td>
              <td className="tkp__td tkp__td--noPad" colSpan={3}>
                <div className="tkp__docs">
                  <div className="tkp__docsCol">
                    <ul className="tkp__docsList">
                      {[
                        "3D nội thất",
                        "3D ngoại thất",
                        "Hồ sơ XPXD",
                        "Bản vẽ nội thất",
                        "Bản vẽ kết cấu",
                        "Bản vẽ kiến trúc",
                        "Bản vẽ khái toán",
                        "Bản vẽ điện nước",
                      ].map((t, i) => (
                        <li className="tkp__docsItem" key={i}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="tkp__docsCol">
                    <ul className="tkp__docsList">
                      {[
                        "3D nội thất",
                        "3D ngoại thất",
                        "Hồ sơ XPXD",
                        "Bản vẽ nội thất",
                        "Bản vẽ kết cấu",
                        "Bản vẽ kiến trúc",
                        "Bản vẽ khái toán",
                      ].map((t, i) => (
                        <li className="tkp__docsItem" key={i}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="tkp__docsCol">
                    <ul className="tkp__docsList">
                      {[
                        "Bản vẽ sân vườn bố trí cây xanh",
                        "Chi tiết hồ bơi bể cá",
                        "Bản vẽ hàng rào cổng mái che gara",
                        "Bản vẽ điện nước sân vườn",
                      ].map((t, i) => (
                        <li className="tkp__docsItem" key={i}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="tkp__footNote">
          * Giá trị hợp đồng tối thiểu là <b>20tr</b> / hồ sơ
        </div>
      </div>
    </div>
  );
}
