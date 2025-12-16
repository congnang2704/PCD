import React from "react";
import "./BG.ThiCong.css";
import TabsBG from "../Tabs_BG/Tabs.BG";

/** Phone contact button (reusable) */
function ContactBtn({
  label = "Liên hệ để nhận báo giá chi tiết",
  phone = "0905402989",
}) {
  return (
    <a
      className="nhp-contact-btn"
      href={`tel:${phone}`}
      aria-label={`Gọi ${phone}`}
      title={label}
    >
      <svg viewBox="0 0 24 24" className="nhp-contact-icon" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.1.37 2.29.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C11.4 22.02 2 12.62 2 1.99a1 1 0 011-1h3.5a1 1 0 011 1c0 1.29.2 2.48.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"></path>
      </svg>
      <span className="nhp-contact-tooltip">Liên hệ ngay</span>
    </a>
  );
}

/** Generic table renderer (scoped classes) */
function DataTable({ columns, rows, compact, sectionTitle, className = "" }) {
  return (
    <div
      className={`nhp-table-wrap ${compact ? "nhp-compact" : ""} ${className}`}
    >
      {sectionTitle ? (
        <div className="nhp-section-cap">{sectionTitle}</div>
      ) : null}
      <div className="nhp-table-scroller">
        <table className="nhp-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={{ width: c.width }}>
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                {columns.map((c) => {
                  const val =
                    typeof c.render === "function"
                      ? c.render(r[c.key], r)
                      : r[c.key];
                  return (
                    <td key={c.key} data-label={c.title}>
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingTable() {
  // ======== 1) BẢNG GIÁ THI CÔNG TRỌN GÓI ========
  const colsBuild = [
    { key: "hang_muc", title: "HẠNG MỤC" },
    { key: "don_gia", title: "ĐƠN GIÁ (m²)" },
    { key: "vat_lieu", title: "CHI TIẾT VẬT LIỆU" },
  ];

  const rowsBuild = [
    /* PHẦN THÔ XÂY MỚI */
    {
      hang_muc: (
        <strong>
          PHẦN THÔ XÂY MỚI
          <br />
          <span className="nhp-muted">Nhà phố / Biệt thự</span>
        </strong>
      ),
      don_gia: (
        <div className="nhp-price-call">
          <div className="nhp-price-row">
            <span>
              <b>Nhà phố</b>{" "}
            </span>
            <ContactBtn />
          </div>
          <div className="nhp-price-row">
            <span>
              <b>Biệt thự</b>{" "}
            </span>
            <ContactBtn />
          </div>
        </div>
      ),
      vat_lieu: (
        <ul className="nhp-bullet">
          <li>Sắt thép: Hòa Phát, Việt Nhật, Việt Úc</li>
          <li>Xi măng: Kim Đỉnh PC 40, Sông Gianh</li>
          <li>Bê tông tươi: Đăng Hải, Dinco</li>
          <li>Vật liệu cấp thoát nước: Bình Minh</li>
          <li>Gạch xây: Tuynel 6 lỗ Đại Hiệp, Điện Ngọc</li>
          <li>Cát xây: Đại Lộc</li>
          <li>Dây điện, ống luồn, dây cáp: Cadivi</li>
        </ul>
      ),
    },

    /* PHẦN THÔ CẢI TẠO */
    {
      hang_muc: (
        <strong>
          PHẦN THÔ CẢI TẠO
          <br />
          <span className="nhp-muted">Nhà phố / Biệt thự</span>
        </strong>
      ),
      don_gia: (
        <div className="nhp-price-call">
          <div className="nhp-price-row">
            <span>
              <b>Nhà phố</b>{" "}
            </span>
            <ContactBtn />
          </div>
          <div className="nhp-price-row">
            <span>
              <b>Biệt thự</b>{" "}
            </span>
            <ContactBtn />
          </div>
        </div>
      ),
      vat_lieu: (
        <ul className="nhp-bullet">
          <li>Gạch ốp lát: Kimgress, Eurotile</li>
          <li>Sàn gỗ công nghiệp</li>
          <li>Thạch cao: Khung nhôm Tika loại 1, Vĩnh Tường</li>
          <li>Trần ban công, trần trang trí: Conwood</li>
          <li>Sơn nước: Toa Nanoshield, Jotun</li>
          <li>Thiết bị đèn điện: Panasonic, Kingled, SAT</li>
          <li>Thiết bị vệ sinh: TOTO, INAX</li>
          <li>Điều hòa: Daikin</li>
          <li>Hệ cửa mặt tiền: Nhôm Xingfa nhập khẩu</li>
          <li>Cầu thang: Ốp đá Granite, lan can kính/ sắt</li>
        </ul>
      ),
    },

    /* HOÀN THIỆN */
    {
      hang_muc: (
        <strong>
          HOÀN THIỆN
          <br />
          <span className="nhp-muted">Nhà phố 1/2 MT – Biệt thự</span>
        </strong>
      ),
      don_gia: (
        <div className="nhp-price-call">
          <div className="nhp-price-row">
            <span>
              <b>Nhà phố 1 MT</b>{" "}
            </span>
            <ContactBtn />
          </div>
          <div className="nhp-price-row">
            <span>
              <b>Nhà phố 2 MT</b>{" "}
            </span>
            <ContactBtn />
          </div>
          <div className="nhp-price-row">
            <span>
              <b>Biệt thự</b>{" "}
            </span>
            <ContactBtn />
          </div>
        </div>
      ),
      vat_lieu: (
        <ul className="nhp-bullet">
          <li>Gạch ốp lát: Kimgress, Eurotile</li>
          <li>Sàn gỗ công nghiệp</li>
          <li>Thạch cao: Khung nhôm Tika loại 1, Vĩnh Tường</li>
          <li>Trần ban công, trần trang trí: Conwood</li>
          <li>Sơn nước: Toa Nanoshield, Jotun</li>
          <li>Thiết bị đèn điện: Panasonic, Kingled, SAT</li>
          <li>Thiết bị vệ sinh: TOTO, INAX</li>
          <li>Điều hòa: Daikin</li>
          <li>Hệ cửa mặt tiền: Nhôm Xingfa nhập khẩu</li>
          <li>Cầu thang: Ốp đá Granite, lan can kính, sắt</li>
        </ul>
      ),
    },

    /* TƯỜNG RÀO */
    {
      hang_muc: <strong>TƯỜNG RÀO</strong>,
      don_gia: (
        <div className="nhp-price-call">
          <div className="nhp-price-row">
            <span>
              <b>Nhà phố</b>{" "}
            </span>
            <ContactBtn />
          </div>
          <div className="nhp-price-row">
            <span>
              <b>Biệt thự</b>{" "}
            </span>
            <ContactBtn />
          </div>
        </div>
      ),
      vat_lieu:
        "Nhà phố: Cao 2.5m, ốp đá 2 mặt, cổng sắt, Conwood. • Biệt thự: Cao 2.5m ốp gạch/đá tự nhiên, cổng sắt, Conwood.",
    },

    /* SÂN VƯỜN */
    {
      hang_muc: <strong>SÂN VƯỜN</strong>,
      don_gia: (
        <div className="nhp-price-call">
          <div className="nhp-price-row">
            <span>
              <b>Nhà phố</b>{" "}
            </span>
            <ContactBtn />
          </div>
          <div className="nhp-price-row">
            <span>
              <b>Biệt thự</b>{" "}
            </span>
            <ContactBtn />
          </div>
        </div>
      ),
      vat_lieu: (
        <ul className="nhp-bullet">
          <li>Nền lát đá sa thạch, bazan</li>
          <li>Bao gồm bồn hoa cây cỏ, hệ thống tưới tiêu</li>
        </ul>
      ),
    },
  ];

  // ======== 2) PHẦN THÔ – HỆ SỐ ========
  const colsCoef = [
    { key: "hang_muc", title: "PHẦN THÔ", width: "40%" },
    { key: "he_so", title: "HỆ SỐ", width: "40%" },
    { key: "lien_he", title: "Liên hệ ngay", width: "20%" },
  ];

  const rowsCoef = [
    /* MÓNG */
    {
      hang_muc: "Móng cọc (đã gồm cọc)",
      he_so: "0.6",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Móng băng 01 phương",
      he_so: "0.4",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Móng băng 02 phương",
      he_so: "0.6",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Móng bè",
      he_so: "1.0",
      lien_he: <ContactBtn />,
    },

    /* MÁI */
    {
      hang_muc: "Sân thượng (không mái che)",
      he_so: "0.3",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Mái nghiêng (đã tính ngói)",
      he_so: "0.9",
      lien_he: <ContactBtn />,
    },

    /* HẦM */
    {
      hang_muc: "Hầm sâu từ 1.0m – 1.3m",
      he_so: "1.5",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Hầm sâu từ 1.3m – 1.7m",
      he_so: "1.7",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Hầm sâu từ 1.7m – 2.0m",
      he_so: "2.0",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Hầm sâu > 2.0m",
      he_so: "2.5",
      lien_he: <ContactBtn />,
    },

    /* ĐỘ CAO TẦNG */
    {
      hang_muc: "Tầng lửng",
      he_so: "0.4",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Từ tầng 04 – tầng 05",
      he_so: "1.2",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Từ tầng 06 – tầng 09",
      he_so: "1.5",
      lien_he: <ContactBtn />,
    },

    /* ĐỊA ĐIỂM */
    {
      hang_muc: "Công trình trong hẻm < 5.5m",
      he_so: "5%",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Công trình ngoài tỉnh",
      he_so: "10%",
      lien_he: <ContactBtn />,
    },
  ];

  // ======== 3) HOÀN THIỆN – HỆ SỐ ========
  const colsFinish = [
    { key: "hang_muc", title: "HOÀN THIỆN", width: "40%" },
    { key: "he_so", title: "HỆ SỐ", width: "40%" },
    { key: "lien_he", title: "Liên hệ", width: "20%" },
  ];
  const rowsFinish = [
    /* Các hạng mục tính theo hệ số */
    { hang_muc: "Sàn gỗ tự nhiên", he_so: "0.4", lien_he: <ContactBtn /> },
    { hang_muc: "Gạch Vietceramic", he_so: "0.4", lien_he: <ContactBtn /> },
    { hang_muc: "Cửa nhôm Newzealand", he_so: "0.5", lien_he: <ContactBtn /> },
    {
      hang_muc: "Trần gỗ, MDF trang trí",
      he_so: "0.4",
      lien_he: <ContactBtn />,
    },
    { hang_muc: "Mái gara, sân thượng", he_so: "0.5", lien_he: <ContactBtn /> },
    { hang_muc: "Tường gạch trang trí", he_so: "0.4", lien_he: <ContactBtn /> },
    { hang_muc: "Tường đá tự nhiên", he_so: "0.7", lien_he: <ContactBtn /> },
    { hang_muc: "Hồ bơi – Hồ cá koi", he_so: "1.5", lien_he: <ContactBtn /> },
    { hang_muc: "Cửa lưới chống muỗi", he_so: "0.2", lien_he: <ContactBtn /> },

    /* Nhóm: Hạng mục không tính theo hệ số */
    {
      hang_muc: <strong>Hạng mục không tính theo hệ số</strong>,
      he_so: "",
      lien_he: "",
    },
    {
      hang_muc: "Điều hòa trung tâm (theo bộ)",
      he_so: "Bộ",
      lien_he: <ContactBtn />,
    },
    {
      hang_muc: "Hệ thống thông minh (theo bộ)",
      he_so: "Bộ",
      lien_he: <ContactBtn />,
    },
    { hang_muc: "Xông hơi", he_so: "Phòng", lien_he: <ContactBtn /> },
    { hang_muc: "TBVS TOTO, INAX", he_so: "Phòng", lien_he: <ContactBtn /> },
    { hang_muc: "TBVS Bravat", he_so: "Phòng", lien_he: <ContactBtn /> },
  ];

  // ======== 4) NỘI THẤT ========
  const colsInterior = [
    { key: "noi_that", title: "NỘI THẤT" },
    { key: "don_gia", title: "ĐƠN GIÁ" },
    { key: "dien_giai", title: "DIỄN GIẢI" },
    { key: "chi_tiet", title: "CHI TIẾT VẬT LIỆU" },
  ];
  const rowsInterior = [
    /* PHÒNG KHÁCH */
    {
      noi_that: <strong>Phòng khách – Loại 1</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "S = 20–30 m²: sofa, bàn, ghế thư giãn, kệ tivi, thảm",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Bộ sofa + bàn trà</li>
          <li>Ghế thư giãn, kệ tivi</li>
          <li>Thảm trang trí đồng bộ</li>
        </ul>
      ),
    },
    {
      noi_that: <strong>Phòng khách – Loại 2</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "S = 40–50 m²: Loại 1 + kệ trang trí, vách gỗ trang trí",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Đầy đủ hạng mục Loại 1</li>
          <li>Thêm kệ trang trí không gian</li>
          <li>Vách gỗ ốp/trang trí điểm nhấn</li>
        </ul>
      ),
    },

    /* PHÒNG BẾP */
    {
      noi_that: <strong>Phòng bếp – Loại 1</strong>,
      don_gia: <ContactBtn />,
      dien_giai:
        "S = 20–30 m²: bếp, đảo bếp, bàn ăn 6 người, đèn ăn, 5 món phụ kiện",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Tủ bếp + mặt đá, chậu & vòi</li>
          <li>Đảo bếp (bar) tiện dụng</li>
          <li>Bàn ăn 6 ghế + đèn thả bàn ăn</li>
          <li>Bộ 5 phụ kiện bếp cơ bản</li>
        </ul>
      ),
    },
    {
      noi_that: <strong>Phòng bếp – Loại 2</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "S = 35–50 m²: Loại 1 + tủ rượu, bàn ăn 10 người",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Đầy đủ hạng mục Loại 1</li>
          <li>Thêm tủ rượu trưng bày</li>
          <li>Bàn ăn lớn 10 ghế</li>
        </ul>
      ),
    },

    /* PHÒNG NGỦ */
    {
      noi_that: <strong>Phòng ngủ – Tiêu chuẩn</strong>,
      don_gia: <ContactBtn />,
      dien_giai:
        "S = 20–25 m²: tủ áo &lt; 3md, giường 1m6, tap, bàn trang điểm, kệ tivi",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Tủ áo (&lt; 3 md) + kệ tivi</li>
          <li>Giường 1.6 m + 2 tap</li>
          <li>Bàn trang điểm</li>
        </ul>
      ),
    },
    {
      noi_that: <strong>Phòng ngủ – Master</strong>,
      don_gia: <ContactBtn />,
      dien_giai:
        "S = 30–40 m²: phòng tiêu chuẩn + phòng thay đồ, sofa thư giãn, giường bọc nệm",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Đầy đủ hạng mục Tiêu chuẩn</li>
          <li>Phòng thay đồ riêng</li>
          <li>Sofa thư giãn, giường bọc nệm</li>
        </ul>
      ),
    },
    {
      noi_that: <strong>Phòng ngủ – VIP</strong>,
      don_gia: <ContactBtn />,
      dien_giai:
        "S = 45–70 m²: phòng master + phòng thay đồ lớn, bar mini, sofa",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Không gian Master mở rộng</li>
          <li>Phòng thay đồ lớn cao cấp</li>
          <li>Bar mini + sofa tiếp khách</li>
        </ul>
      ),
    },

    /* PHÒNG SHC */
    {
      noi_that: <strong>Phòng SHC</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "Sofa, tap, kệ tivi, kệ trang trí, vách sau sofa",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Bộ sofa + tap đồng bộ</li>
          <li>Kệ tivi & kệ trang trí</li>
          <li>Vách ốp sau sofa tạo điểm nhấn</li>
        </ul>
      ),
    },

    /* PHÒNG TẮM */
    {
      noi_that: <strong>Phòng tắm – Loại 1</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "Bệ lavabo &lt; 900mm, gương soi",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Bệ lavabo đá nhân tạo (&lt; 900 mm)</li>
          <li>Gương soi chống ố</li>
          <li>Phụ kiện cơ bản</li>
        </ul>
      ),
    },
    {
      noi_that: <strong>Phòng tắm – Loại 2</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "Bệ lavabo dài &gt; 1m5, gương soi",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Bệ lavabo đá Granite (&gt; 1.5 m)</li>
          <li>Gương soi lớn nguyên tấm</li>
          <li>Tủ dưới lavabo chống ẩm</li>
        </ul>
      ),
    },

    /* GIẶT PHƠI */
    {
      noi_that: <strong>Giặt phơi</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "Hệ tủ cửa đóng kín, bệ giặt tay, thanh treo di động",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Tủ đồ chống ẩm, cửa kín</li>
          <li>Bệ giặt tay bền chắc</li>
          <li>Thanh treo di động Inox</li>
        </ul>
      ),
    },

    /* PHÒNG THỜ */
    {
      noi_that: <strong>Phòng thờ</strong>,
      don_gia: <ContactBtn />,
      dien_giai: "Tủ thờ 2 tầng, vách CNC 2 bên, vách sau bàn thờ",
      chi_tiet: (
        <ul className="nhp-bullet">
          <li>Tủ thờ 2 tầng gỗ tự nhiên</li>
          <li>Vách CNC 2 bên thẩm mỹ</li>
          <li>Vách trang trí sau bàn thờ</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="nhp-wrap">
      <TabsBG />
      <h1 className="nhp-title">BẢNG GIÁ THI CÔNG TRỌN GÓI</h1>

      <DataTable className="nhp-main" columns={colsBuild} rows={rowsBuild} />

      <div className="nhp-note-grid">
        <div>
          <h4 className="nhp-note-title">* Ghi chú</h4>
          <ul className="nhp-bullet">
            <li>Thuế VAT 10%</li>
            <li>Phần xử lý nền móng, mạch nước ngầm, ép cọc</li>
            <li>Phần phá dỡ mặt bằng</li>
            <li>
              Kết cấu móng phức tạp (mái nghiêng, hầm, hồ bơi, bể cá, xông hơi,
              hệ thống thông minh…)
            </li>
          </ul>
        </div>
        <div>
          <h4 className="nhp-note-title">Địa điểm xây dựng</h4>
          <ul className="nhp-bullet">
            <li>Giá trị áp dụng tại thành phố Đà Nẵng</li>
            <li>Công trình nằm ở vị trí đường &gt; 5.5m</li>
          </ul>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <h4 className="nhp-note-title">Chi phí hoàn thiện & nội thất</h4>
          <p>
            Chi phí hoàn thiện và nội thất chỉ là <b>khái toán</b>, đơn giá
            chính xác sẽ phụ thuộc vào chủng loại vật tư được tính thêm vào hệ
            số dưới đây.
          </p>
          <p>
            <b>Cách tính hệ số:</b> Hệ số × đơn giá thô hoặc hoàn thiện × diện
            tích (m²) = thành tiền
          </p>
          <p>
            <b>Ví dụ:</b> Đơn giá mái nghiêng biệt thự = 0.9 × giá tiền × S mái
          </p>
          <p>
            Nếu bạn muốn biết <b>chi tiết hơn</b> có thể <b>liên hệ ngay</b> với
            chúng tôi qua <b>số điện thoại: 0905 402 989</b>
          </p>
        </div>
      </div>

      <DataTable
        className="nhp-phantho-heso"
        sectionTitle="PHẦN THÔ – HỆ SỐ (THAM CHIẾU TÍNH TOÁN)"
        columns={colsCoef}
        rows={rowsCoef}
        compact
      />
      <DataTable
        className="nhp-finish-heso"
        sectionTitle="HOÀN THIỆN – HỆ SỐ (THAM CHIẾU)"
        columns={colsFinish}
        rows={rowsFinish}
        compact
      />
      <DataTable
        className="nhp-interior"
        sectionTitle="NỘI THẤT (THAM KHẢO)"
        columns={colsInterior}
        rows={rowsInterior}
      />

      <div className="nhp-note-grid">
        <div style={{ gridColumn: "1 / -1" }}>
          <ul className="nhp-note-bottom">
            <li>
              Đơn giá nội thất chỉ là tạm tính theo vật liệu cơ bản, tùy theo
              yêu cầu vật liệu của chủ đầu tư
            </li>
            <li>
              Đơn giá trên chưa bao gồm: Thiết bị gia dụng như bếp nấu chậu rửa,
              tủ lạnh, lò vi sóng, tivi, rèm màn, chăn ga gối đệm, tranh, thảm
              và đồ decor trên kệ, đèn chùm trang trí, đèn để bàn.
            </li>
            <li>
              Bảng khái toán này chênh lệch {"<"} 5% so với bảng báo giá chi
              tiết
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
