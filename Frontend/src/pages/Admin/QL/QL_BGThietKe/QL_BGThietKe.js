import React, { useMemo, useState, useEffect } from "react";
import "./QL_BGThietKe.css";

/* ===== Utils ===== */
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const num = (v) => (isNaN(+v) ? 0 : +v);
function formatDateVN(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("vi-VN");
  } catch {
    return iso;
  }
}

/* ===== Constant options ===== */
const LOAI_CONG_TRINH = [
  "Nhà phố 1 mặt tiền",
  "Nhà phố 2 mặt tiền",
  "Biệt thự hiện đại",
  "Biệt thự cổ điển",
  "Bar/ Nhà hàng/ Cafe",
];
const TRANG_THAI = ["Xây mới", "Cải tạo"];
const LOAI_HOP_DONG = ["Thiết kế mới", "Thiết kế cải tạo", "Thiết kế sân vườn"];

const CHECKLIST = {
  "Thiết kế mới": [
    "3D nội thất",
    "3D ngoại thất",
    "Bản vẽ kiến trúc",
    "Bản vẽ kết cấu",
    "Bản vẽ điện nước",
    "Hồ sơ xin phép xây dựng",
  ],
  "Thiết kế cải tạo": [
    "3D nội thất",
    "3D ngoại thất",
    "Bản vẽ kiến trúc",
    "Bản vẽ kết cấu",
    "Bản vẽ điện nước",
    "Hồ sơ xin phép xây dựng",
  ],
  "Thiết kế sân vườn": [
    "Bản vẽ sân vườn bố trí cây xanh chi tiết hồ bơi bể cá",
    "Bản vẽ hàng rào cổng ngõ, mái che gara",
    "Bản vẽ điện nước sân vườn",
  ],
};

const TITLE_BY_TYPE = {
  "Thiết kế mới": "Thiết kế mới",
  "Thiết kế cải tạo": "Thiết kế cải tạo",
  "Thiết kế sân vườn": "Thiết kế sân vườn",
};

/* ==================== Chuyển số thành chữ ==================== */
function numberToVietnameseWords(numInput) {
  let num = Math.floor(numInput);
  if (!num || num === 0) return "không đồng./.";

  const dv = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const hang = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ"];

  function docBaSo(n) {
    let tr = Math.floor(n / 100);
    let ch = Math.floor((n % 100) / 10);
    let dvn = n % 10;
    let str = "";
    if (tr > 0) {
      str += dv[tr] + " trăm ";
      if (ch === 0 && dvn > 0) str += "linh ";
    }
    if (ch > 1) {
      str += dv[ch] + " mươi ";
      if (dvn === 1) str += "mốt ";
      else if (dvn === 5) str += "lăm ";
      else if (dvn > 0) str += dv[dvn] + " ";
    } else if (ch === 1) {
      str += "mười ";
      if (dvn === 1) str += "một ";
      else if (dvn === 5) str += "lăm ";
      else if (dvn > 0) str += dv[dvn] + " ";
    } else if (dvn > 0) {
      str += dv[dvn] + " ";
    }
    return str.trim();
  }

  let i = 0,
    result = "";
  while (num > 0) {
    const block = num % 1000;
    if (block !== 0) {
      const blockStr = docBaSo(block);
      result = (blockStr + " " + hang[i] + " " + result).trim();
    }
    num = Math.floor(num / 1000);
    i++;
  }
  const text = result.replace(/\s+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1) + " đồng./.";
}

/* ===== Component ===== */
export default function QL_BGThietKe() {
  // Form state
  const [ma, setMa] = useState("");
  const [ngay, setNgay] = useState(""); // yyyy-mm-dd
  const [tongSan, setTongSan] = useState(0);
  const [sanVuon, setSanVuon] = useState(0);
  const [sanThuong, setSanThuong] = useState(0);
  const [diaChi, setDiaChi] = useState("");
  const [loaiCongTrinh, setLoaiCongTrinh] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [loaiHopDong, setLoaiHopDong] = useState("");
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [giaTriDenNgay, setGiaTriDenNgay] = useState(""); // yyyy-mm-dd

  const [vat, setVat] = useState(true);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Bảng 6 dòng
  const initialRows = useMemo(
    () => [
      { name: "Tổng diện tích sàn", dvt: "m²", qty: 0, price: 0 },
      { name: "Diện tích sân vườn", dvt: "m²", qty: 0, price: 0 },
      { name: "Diện tích sân thượng", dvt: "m²", qty: 0, price: 0 },
      { name: "", dvt: "", qty: 0, price: 0 },
      { name: "", dvt: "", qty: 0, price: 0 },
      { name: "", dvt: "", qty: 0, price: 0 },
    ],
    []
  );
  const [rows, setRows] = useState(initialRows);

  // Đồng bộ 3 input vào bảng
  useEffect(() => {
    setRows((prev) => {
      const next = [...prev];
      next[0] = { ...next[0], qty: num(tongSan) };
      next[1] = { ...next[1], qty: num(sanVuon) };
      next[2] = { ...next[2], qty: num(sanThuong) };
      return next;
    });
  }, [tongSan, sanVuon, sanThuong]);

  const checklist = CHECKLIST[loaiHopDong] || [];

  const calc = useMemo(() => {
    const withTotal = rows.map((r) => ({
      ...r,
      total: num(r.qty) * num(r.price),
    }));
    const sub = withTotal.reduce((s, r) => s + r.total, 0);
    const subAfterDiscount = Math.max(
      0,
      sub - (isDiscount ? num(discount) : 0)
    );
    const vatAmount = vat ? Math.round(subAfterDiscount * 0.1) : 0;
    const grand = subAfterDiscount + vatAmount;
    return { withTotal, sub, subAfterDiscount, vatAmount, grand };
  }, [rows, vat, isDiscount, discount]);

  const titleGroup = loaiHopDong
    ? TITLE_BY_TYPE[loaiHopDong]
    : "Thiết kế cải tạo";

  // Ngày góc phải
  const dnDate = ngay ? new Date(ngay) : new Date();
  const cityDate = `Đà Nẵng, ngày ${String(dnDate.getDate()).padStart(
    2,
    "0"
  )} tháng ${String(dnDate.getMonth() + 1).padStart(
    2,
    "0"
  )} năm ${dnDate.getFullYear()}`;

  const handleRowChange = (idx, key, val) => {
    setRows((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        [key]: key === "name" || key === "dvt" ? val : num(val),
      };
      return next;
    });
  };

  const handleReset = () => {
    setMa("");
    setNgay("");
    setTongSan(0);
    setSanVuon(0);
    setSanThuong(0);
    setDiaChi("");
    setLoaiCongTrinh("");
    setTrangThai("");
    setLoaiHopDong("");
    setNguoiNhan("");
    setGiaTriDenNgay("");
    setVat(true);
    setIsDiscount(false);
    setDiscount(0);
    setRows(initialRows);
  };

  const handleDeleteEmpty = () => {
    const kept = rows.filter((r) => r.name?.trim() || r.total > 0);
    const padded = [...kept];
    while (padded.length < 6)
      padded.push({ name: "", dvt: "", qty: 0, price: 0 });
    setRows(padded.slice(0, 6));
  };

  const printDoc = () => window.print();

  return (
    <div className="bgtk">
      {/* LEFT FORM */}
      <aside className="bgtk__sidebar">
        <div className="bgtk__field">
          <label className="bgtk__label">Mã báo giá thiết kế</label>
          <input
            className="bgtk__input"
            value={ma}
            onChange={(e) => setMa(e.target.value)}
          />
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">Ngày báo giá</label>
          <input
            className="bgtk__input"
            type="date"
            value={ngay}
            onChange={(e) => setNgay(e.target.value)}
          />
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">Tổng diện tích sàn</label>
          <input
            className="bgtk__input"
            type="number"
            value={tongSan}
            onChange={(e) => setTongSan(e.target.value)}
          />
        </div>
        <div className="bgtk__field">
          <label className="bgtk__label">Diện tích sân vườn</label>
          <input
            className="bgtk__input"
            type="number"
            value={sanVuon}
            onChange={(e) => setSanVuon(e.target.value)}
          />
        </div>
        <div className="bgtk__field">
          <label className="bgtk__label">Diện tích sân thượng</label>
          <input
            className="bgtk__input"
            type="number"
            value={sanThuong}
            onChange={(e) => setSanThuong(e.target.value)}
          />
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">Địa chỉ công trình</label>
          <textarea
            className="bgtk__textarea"
            rows={2}
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
          />
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">— Chọn loại công trình —</label>
          <select
            className="bgtk__select"
            value={loaiCongTrinh}
            onChange={(e) => setLoaiCongTrinh(e.target.value)}
          >
            <option value="">--- Chọn loại công trình ---</option>
            {LOAI_CONG_TRINH.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">— Trạng thái —</label>
          <select
            className="bgtk__select"
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
          >
            <option value="">--- Trạng thái ---</option>
            {TRANG_THAI.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">— Loại hợp đồng —</label>
          <select
            className="bgtk__select"
            value={loaiHopDong}
            onChange={(e) => setLoaiHopDong(e.target.value)}
          >
            <option value="">--- Chọn loại hợp đồng ---</option>
            {LOAI_HOP_DONG.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">Người nhận báo giá</label>
          <input
            className="bgtk__input"
            value={nguoiNhan}
            onChange={(e) => setNguoiNhan(e.target.value)}
          />
        </div>

        <div className="bgtk__field">
          <label className="bgtk__label">Giá trị đến ngày</label>
          <input
            className="bgtk__input"
            type="date"
            value={giaTriDenNgay}
            onChange={(e) => setGiaTriDenNgay(e.target.value)}
          />
        </div>

        <div className="bgtk__row">
          <label className="bgtk__checkbox">
            <input
              type="checkbox"
              checked={vat}
              onChange={(e) => setVat(e.target.checked)}
            />{" "}
            VAT (10%)
          </label>
          <label className="bgtk__checkbox">
            <input
              type="checkbox"
              checked={isDiscount}
              onChange={(e) => setIsDiscount(e.target.checked)}
            />{" "}
            Giảm giá
          </label>
          <button className="bgtk__link" onClick={handleReset}>
            Reset
          </button>
        </div>

        {isDiscount && (
          <div className="bgtk__field">
            <label className="bgtk__label">Số tiền giảm (VND)</label>
            <input
              className="bgtk__input"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        )}

        <div className="bgtk__row bgtk__actions">
          <button className="bgtk__btn" onClick={printDoc}>
            Print
          </button>
          <button
            className="bgtk__btn bgtk__btn--danger"
            onClick={handleDeleteEmpty}
          >
            Xóa dòng
          </button>
        </div>
      </aside>

      {/* RIGHT DOC */}
      <section className="bgtk__paper">
        <h1 className="bgtk__title">BÁO GIÁ THIẾT KẾ</h1>

        <header className="bgtk__head">
          <div className="bgtk__headLeft">
            <p className="bgtk__p">
              Số: <span className="bgtk__dot">{ma || "…"}</span>
            </p>
            <p className="bgtk__p">
              Kính gửi: <b>{nguoiNhan || "Công ty …"}</b>
            </p>
            <p className="bgtk__p">
              Chúng tôi: CÔNG TY TNHH MTV PCD NGUYỄN HẢI
            </p>
            <p className="bgtk__p">
              Địa chỉ: 17 Nguyễn Cư Trinh, P. Hòa Cường, Tp. Đà Nẵng
            </p>
            <p className="bgtk__p">
              Trân trọng báo giá thiết kế công trình:
              <span className="bgtk__dot">{loaiCongTrinh || "…"}</span> — Trạng
              thái:
              <span className="bgtk__dot">{trangThai || "…"}</span>
            </p>
            <p className="bgtk__p">
              Địa chỉ: <span className="bgtk__dot">{diaChi || "…"}</span>
            </p>
          </div>
          <div className="bgtk__headRight">{cityDate}</div>
        </header>

        {/* checklist */}
        {loaiHopDong && (
          <ul className="bgtk__checklist">
            {checklist.map((it) => (
              <li className="bgtk__li" key={it}>
                ■ {it}
              </li>
            ))}
          </ul>
        )}

        {/* table */}
        <table className="bgtk__table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>STT</th>
              <th style={{ width: 160 }}>{titleGroup}</th>
              <th style={{ width: 50 }}>ĐVT</th>
              <th style={{ width: 120 }}>Khối lượng (m²)</th>
              <th style={{ width: 120 }}>Đơn giá</th>
              <th style={{ width: 140 }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {calc.withTotal.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    className="bgtk__cell"
                    value={r.name}
                    onChange={(e) => handleRowChange(i, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="bgtk__cell bgtk__cell--center"
                    value={r.dvt}
                    onChange={(e) => handleRowChange(i, "dvt", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bgtk__cell bgtk__cell--right"
                    value={r.qty}
                    onChange={(e) => handleRowChange(i, "qty", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bgtk__cell bgtk__cell--right"
                    value={r.price}
                    onChange={(e) =>
                      handleRowChange(i, "price", e.target.value)
                    }
                  />
                </td>
                <td className="bgtk__td-right">{VND.format(r.total)}</td>
              </tr>
            ))}
            <tr className="bgtk__sum">
              <td colSpan={5}>TỔNG</td>
              <td className="bgtk__td-right">{VND.format(calc.sub)}</td>
            </tr>
            {isDiscount && (
              <tr className="bgtk__sum">
                <td colSpan={5}>Giảm giá</td>
                <td className="bgtk__td-right">
                  - {VND.format(num(discount))}
                </td>
              </tr>
            )}
            {vat && (
              <tr className="bgtk__sum">
                <td colSpan={5}>Thuế VAT (10%)</td>
                <td className="bgtk__td-right">{VND.format(calc.vatAmount)}</td>
              </tr>
            )}
            <tr className="bgtk__grand">
              <td colSpan={5}>TỔNG CỘNG</td>
              <td className="bgtk__td-right">{VND.format(calc.grand)}</td>
            </tr>
          </tbody>
        </table>

        <div className="bgtk__note">
          <p className="bgtk__p">
            <b>Bằng chữ:</b> {numberToVietnameseWords(calc.grand)}
          </p>

          <p className="bgtk__p bgtk__mt8">
            <b>Ghi chú:</b>
          </p>
          <ul className="bgtk__rules">
            <li className="bgtk__li">Diện tích trên đây là tạm tính.</li>
            <li className="bgtk__li">
              Trong trường hợp diện tích quá nhỏ, giá trị hợp đồng tối thiểu là
              15.000.000 đồng.
            </li>
            <li className="bgtk__li">
              Hạng mục không liệt kê hoặc có khối lượng bằng 0 được hiểu là
              không thực hiện.
            </li>
            <li className="bgtk__li">
              Báo giá có giá trị đến hết ngày:{" "}
              {giaTriDenNgay ? formatDateVN(giaTriDenNgay) : "…"}
            </li>
          </ul>
        </div>

        <div className="bgtk__sign">
          <div className="bgtk__signCol">
            <p className="bgtk__p">
              <b>ĐẠI DIỆN BÊN A</b>
            </p>
            <p className="bgtk__p bgtk__sub">Chủ đầu tư hoặc người đại diện</p>
            <div className="bgtk__line" />
          </div>
          <div className="bgtk__signCol">
            <p className="bgtk__p">
              <b>ĐẠI DIỆN BÊN B</b>
            </p>
            <p className="bgtk__p bgtk__sub">Giám đốc</p>
            <div className="bgtk__line" />
            <p className="bgtk__p bgtk__name">NGUYỄN XUÂN HẢI</p>
          </div>
        </div>
      </section>
    </div>
  );
}
