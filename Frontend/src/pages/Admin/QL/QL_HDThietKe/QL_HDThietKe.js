import React, { useMemo, useState, useEffect } from "react";
import "./QL_HDThietKe.css";
import logoUrl from "../../../../assets/logonang.jpg";

/**
 * QL_HDThietKe.js – Trang Hợp đồng Thiết kế
 * - 3 mẫu: Thiết kế mới / Cải tạo / Sân vườn
 * - I. Nội dung công việc: checklist động theo mẫu
 * - II. Giá trị hợp đồng: 8 dòng (Tên mục, ĐVT, Diện tích, Đơn giá) → auto Thành tiền
 * - Tính: Tổng, (tuỳ chọn) Giảm giá, VAT 10%, Tổng thanh toán + Viết bằng chữ
 * - Lịch thanh toán 30/30/30/10 theo Tổng thanh toán
 * - Print: chỉ in phần .hd__body; ẨN những dòng/khối không có dữ liệu
 */

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

// hiển thị trong câu: "ký hợp đồng ____ công trình..."
const TYPE_PHRASE = {
  "thiet-ke-moi": "thiết kế mới",
  "cai-tao": "thiết kế cải tạo",
  "san-vuon": "thiết kế sân vườn",
};

/* ===== helper: số → chữ tiếng Việt (đủ tới nghìn tỷ) ===== */
function numberToVietnamese(n) {
  n = Math.round(Number(n) || 0);
  if (n === 0) return "Không đồng";

  const dv = [
    "",
    " nghìn",
    " triệu",
    " tỷ",
    " nghìn tỷ",
    " triệu tỷ",
    " tỷ tỷ",
  ];
  const cs = [
    "không",
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

  function doc3(so) {
    const tram = Math.floor(so / 100);
    const chuc = Math.floor((so % 100) / 10);
    const donvi = so % 10;
    let s = "";
    if (tram) s += cs[tram] + " trăm";
    if (chuc > 1) {
      s += (s ? " " : "") + cs[chuc] + " mươi";
      if (donvi === 1) s += " mốt";
      else if (donvi === 5) s += " lăm";
      else if (donvi) s += " " + cs[donvi];
    } else if (chuc === 1) {
      s += (s ? " " : "") + "mười";
      if (donvi === 5) s += " lăm";
      else if (donvi) s += " " + cs[donvi];
    } else if (donvi) {
      if (tram) s += (s ? " " : "") + "lẻ";
      s += (tram ? " " : "") + (donvi === 5 && tram ? "năm" : cs[donvi]);
    }
    return s.trim();
  }

  const parts = [];
  let i = 0;
  while (n > 0 && i < dv.length) {
    const block = n % 1000;
    if (block) parts.unshift(doc3(block) + dv[i]);
    n = Math.floor(n / 1000);
    i++;
  }
  const collapsed = parts.join(" ").split(" ").filter(Boolean).join(" ");
  const out = collapsed.charAt(0).toUpperCase() + collapsed.slice(1);
  return out + " đồng chẵn";
}

/* ===== Prefill 3 dòng đầu phần II ===== */
const PREFILL = {
  "thiet-ke-moi": [
    "Diện tích thiết kế chính",
    "Diện tích sân vườn",
    "Diện tích sân thượng",
  ],
  "cai-tao": [
    "Diện tích thiết kế cải tạo",
    "Diện tích hạng mục bổ sung",
    "Diện tích mái/ban công (nếu có)",
  ],
  "san-vuon": [
    "Diện tích thiết kế chính",
    "Diện tích sân vườn",
    "Diện tích hồ bơi/tiểu cảnh",
  ],
};

/* ===== Checklist phần I theo mẫu ===== */
const CHECKLIST = {
  "thiet-ke-moi": [
    "3D nội thất",
    "3D ngoại thất",
    "Bản vẽ kiến trúc",
    "Bản vẽ nội thất",
    "Bản vẽ kết cấu",
    "Bản vẽ điện nước",
    "Hồ sơ xin phép xây dựng",
    "Bản vẽ khái toán",
  ],
  "cai-tao": [
    "3D nội thất",
    "3D ngoại thất",
    "Bản vẽ kiến trúc",
    "Bản vẽ nội thất",
    "Bản vẽ kết cấu",
    "Bản vẽ điện nước",
    "Hồ sơ xin phép xây dựng",
  ],
  "san-vuon": [
    "Bản vẽ sân vườn bố trí cây xanh chi tiết hồ bơi bể cá",
    "Bản vẽ hàng rào cổng ngõ, mái che gara",
    "Bản vẽ điện nước sân vườn",
  ],
};

export default function QL_HDThietKe() {
  /* ===== Sidebar state ===== */
  const [contractId, setContractId] = useState("");
  const [type, setType] = useState("thiet-ke-moi");
  const [range, setRange] = useState("over20");
  const [signDate, setSignDate] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [benA, setBenA] = useState({
    name: "",
    rep: "",
    address: "",
    phone: "",
    cccd: "",
  });
  const typePhrase = useMemo(() => TYPE_PHRASE[type] || "..........", [type]);
  const [vatOn, setVatOn] = useState(true);
  const [discountOn, setDiscountOn] = useState(false);
  const [discountType, setDiscountType] = useState("percent"); // percent|amount
  const [discountVal, setDiscountVal] = useState(0);

  /* ===== II. Bảng giá trị HĐ ===== */
  const baseRows = useMemo(() => {
    const pre = PREFILL[type] || [];
    return Array.from({ length: 8 }).map((_, i) => ({
      name: pre[i] || "",
      unit: "m²",
      area: "",
      price: "",
    }));
  }, [type]);

  const [rows, setRows] = useState(baseRows);
  useEffect(() => setRows(baseRows), [baseRows]);

  const amounts = rows.map(
    (r) => (Number(r.area) || 0) * (Number(r.price) || 0)
  );
  const subTotal = amounts.reduce((a, b) => a + b, 0);

  const discount = useMemo(() => {
    if (!discountOn) return 0;
    if (discountType === "percent")
      return Math.round((subTotal * (Number(discountVal) || 0)) / 100);
    return Math.min(subTotal, Math.round(Number(discountVal) || 0));
  }, [discountOn, discountType, discountVal, subTotal]);

  const taxable = Math.max(0, subTotal - discount);
  const vat = vatOn ? Math.round(taxable * 0.1) : 0;
  const grandTotal = taxable + vat;

  const amountInWords = useMemo(
    () => numberToVietnamese(grandTotal),
    [grandTotal]
  );

  const onChangeRow = (i, field, value) => {
    setRows((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r))
    );
  };

  /* ===== Print rules: ẩn dòng trống ===== */
  const rowHasInput = (r) =>
    (Number(r.area) || 0) > 0 || (Number(r.price) || 0) > 0;
  const hasAnyRowToPrint = useMemo(() => rows.some(rowHasInput), [rows]);
  const showDiscountRow = discountOn && discount > 0;
  const showVatRow = vatOn && vat > 0;

  /* ===== 30/30/30/10 ===== */
  const pay = useMemo(() => {
    const t = grandTotal;
    return {
      p1: Math.round(t * 0.3),
      p2: Math.round(t * 0.3),
      p3: Math.round(t * 0.3),
      p4: t - Math.round(t * 0.9),
    };
  }, [grandTotal]);

  /* ===== Utils ===== */
  function formatSignDateVN() {
    if (!signDate) return "........, ngày ..... tháng ..... năm ......";
    const d = new Date(signDate);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `Đà Nẵng, ngày ${dd} tháng ${mm} năm ${yyyy}`;
  }
  const contractYear = React.useMemo(() => {
    const d = signDate ? new Date(signDate) : new Date();
    return d.getFullYear();
  }, [signDate]);

  /* ===== Render ===== */
  return (
    <div className="hd">
      {/* Sidebar */}
      <aside className="hd__side">
        <div className="hd-brand">
          NGUYEN HAI
          <br />
          design & build
        </div>

        <label className="hd-label">Mã số hợp đồng</label>
        <input
          className="hd-input"
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          placeholder="MS-..."
        />

        <label className="hd-label">Loại hợp đồng</label>
        <select
          className="hd-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="thiet-ke-moi">Thiết kế mới</option>
          <option value="cai-tao">Thiết kế cải tạo</option>
          <option value="san-vuon">Thiết kế sân vườn</option>
        </select>

        <label className="hd-label">Khoản giá trị</label>
        <select
          className="hd-input"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="over20">Hợp đồng trên 20 triệu</option>
          <option value="under20">Hợp đồng dưới 20 triệu</option>
        </select>

        <label className="hd-label">Ngày ký</label>
        <input
          className="hd-input"
          type="date"
          value={signDate}
          onChange={(e) => setSignDate(e.target.value)}
        />

        <label className="hd-label">Thời hạn thiết kế (số ngày)</label>
        <input
          className="hd-input"
          inputMode="numeric"
          value={durationDays}
          onChange={(e) =>
            setDurationDays(e.target.value.replace(/[^0-9]/g, ""))
          }
        />

        <label className="hd-label">Chủ đầu tư</label>
        <input
          className="hd-input"
          value={benA.name}
          onChange={(e) => setBenA({ ...benA, name: e.target.value })}
        />
        <label className="hd-label">Đại diện</label>
        <input
          className="hd-input"
          value={benA.rep}
          onChange={(e) => setBenA({ ...benA, rep: e.target.value })}
        />
        <label className="hd-label">Địa chỉ liên hệ</label>
        <input
          className="hd-input"
          value={benA.address}
          onChange={(e) => setBenA({ ...benA, address: e.target.value })}
        />
        <label className="hd-label">Số điện thoại</label>
        <input
          className="hd-input"
          value={benA.phone}
          onChange={(e) =>
            setBenA({ ...benA, phone: e.target.value.replace(/[^0-9+]/g, "") })
          }
        />
        <label className="hd-label">Căn Cước Công Dân</label>
        <input
          className="hd-input"
          value={benA.cccd}
          onChange={(e) => setBenA({ ...benA, cccd: e.target.value })}
        />

        <div className="hd-row hd-row--gap">
          <label className="hd-check">
            <input
              type="checkbox"
              checked={vatOn}
              onChange={(e) => setVatOn(e.target.checked)}
            />{" "}
            VAT 10%
          </label>
          <label className="hd-check">
            <input
              type="checkbox"
              checked={discountOn}
              onChange={(e) => setDiscountOn(e.target.checked)}
            />{" "}
            Giảm giá
          </label>
        </div>

        {discountOn && (
          <div className="hd-discount">
            <select
              className="hd-input"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="percent">Giảm theo %</option>
              <option value="amount">Giảm theo VND</option>
            </select>
            <input
              className="hd-input"
              inputMode="numeric"
              placeholder={discountType === "percent" ? "%" : "VND"}
              value={discountVal}
              onChange={(e) =>
                setDiscountVal(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>
        )}

        <div className="hd-actions">
          <button
            className="hd-btn hd-btn--ghost"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
          <button className="hd-btn" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </aside>

      {/* Body (printable zone) */}
      <main className="hd__body">
        <section className="hd-section-high">
          <img className="hd-logo-img" src={logoUrl} alt="Logo" />
          <div className="hd-high-title">
            <div className="hd-high-line1">
              CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="hd-high-line2">Độc lập - Tự do - Hạnh phúc</div>
          </div>
        </section>
        <header className="hd-header">
          <h1 className="hd-title">HỢP ĐỒNG THIẾT KẾ</h1>
          <div className="hd-meta">
            Số: {`${contractId || "..."}/HĐTK/${contractYear}`}
          </div>
        </header>

        <section className="hd-section">
          <div className="hd-text-cc">
            Căn cứ Bộ Luật dân sự số 33/2005/QH11 ngày 14/6/2005 của Quốc hội
            nước Cộng hòa xã hội chủ nghĩa Việt Nam;
          </div>
          <div className="hd-text-cc">
            Căn cứ Luật Xây dựng số 16/2003/QH11 ngày 26/11/2003 của Quốc hội
            khóa XI, kỳ họp thứ 4;
          </div>
          <div className="hd-text-cc">
            Căn cứ Thông tư số 06/2007/TT-BXD ngày 25/7/2007 của Bộ Xây dựng
            hướng dẫn hợp đồng trong hoạt động xây dựng;{" "}
          </div>
          <div className="hd-text-cc">
            Căn cứ Nghị định số 12/2009/NĐ-CP ngày 12/02/2009 của Chính phủ về
            quản lý dự án đầu tư xây dựng công trình;
          </div>
          <div className="hd-text-cc">
            Căn cứ Nghị định số 209/2004/NĐ-CP ngày 16/12/2004 của Chính phủ về
            quản lý chất lượng công trình xây dựng; Căn cứ Nghị định số
            49/2008/NĐ-CP ngày 18/4/2008 của Chính phủ về sửa đổi, bổ sung một
            số điều của Nghị định số 209/2004/NĐ-CP ngày 16/12/2004;
          </div>
          <div className="hd-text-cc">Căn cứ thỏa thuận giữa hai bên.</div>
          <div className="hd-date-top">{formatSignDateVN()}</div>
        </section>

        {/* Parties */}
        <section className="hd-section hd-parties">
          <div className="hd-card">
            <div className="hd-card__title">
              1. Bên giao thầu (gọi tắt là bên A)
            </div>
            <div className="hd-card__line">
              - Họ và tên Ông/Bà: {benA.rep || ".........."}
            </div>
            <div className="hd-card__line">
              - Căn cước công dân: {benA.cccd || ".........."}
            </div>
            <div className="hd-card__line">
              - Số điện thoại: {benA.phone || ".........."}
            </div>
            <div className="hd-card__line">
              - Địa chỉ: {benA.address || ".........."}
            </div>
          </div>
          <div className="hd-card">
            <div className="hd-card__title">
              2. Bên nhận thầu (gọi tắt là bên B)
            </div>
            <div className="hd-card-tine">Công ty TNHH MTV PCD NGUYỄN HẢI</div>
            <div className="hd-card__line">
              - Người đại diện là Ông: <strong>Nguyễn Xuân Hải</strong> - Chức
              vụ: <strong>Giám đốc</strong>
            </div>
            <div className="hd-card__line">
              - Địa chỉ: 17 Nguyễn Cư Trinh, Phường Hòa Cường, Thành phố Đà
              Nẵng.
            </div>
            <div className="hd-card__line">- Điện thoại: 0905 402 989</div>

            <div className="hd-card__line">- Mã số thuế: 0401518783</div>
            <div className="hd-card__line">
              - Tài khoản ngân hàng: 2009206118400 Nguyễn Xuân Hải – NN&PTNT
              Agribank – CN Chợ Mới nam Đà Nẵng
            </div>
            <div className="hd-card__line">
              - Email: hotro@nguyenhai.com.vn - nguyenhai.com.vn
            </div>
          </div>
        </section>

        <section className="hd-section">
          <div className="hd-text-title">
            HAI BÊN THOẢ THUẬN KÝ KẾT <br /> HỢP ĐỒNG XÂY DỰNG VỚI NHỮNG ĐIỀU
            KHOẢN SAU
          </div>
          <div className="hd-title-text">
            Bên A đồng ý cho bên B thực hiện Thiết kế công trình “ Bên A” với
            điều khoản dưới đây:
          </div>
          <div className="hd-title-text">
            Sau khi bàn bạc thảo luận, hai bên thống nhất đồng ý ký hợp đồng với
            điều khoản sau:
          </div>
        </section>

        {/* I. Nội dung công việc */}
        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU I: NỘI DUNG CÔNG VIỆC</h3>

          <div className="hd-text">
            Bên A thuê bên B triển khai dịch vụ {typePhrase} kiến trúc tại địa
            chỉ:{" "}
            <strong>
              {benA.address || "................................"}
            </strong>
          </div>

          <div className="hd-text">
            - Diện tích thiết kế: dự kiến{" "}
            <strong>
              {rows.reduce((sum, r) => sum + (Number(r.area) || 0), 0)} m²
            </strong>
            , số m² thực tế sẽ được xác định theo bản vẽ cuối cùng để thi công.
          </div>

          <div className="hd-text">- Nội dung công việc:</div>

          {/* A. Lập hồ sơ thiết kế */}
          <div className="hd-text hd-bold">A. Lập hồ sơ thiết kế:</div>
          <div className="hd-text">
            - Nội dung công việc được phát triển theo từng giai đoạn như sau:
          </div>

          <div className="hd-text hd-underline">
            Giai đoạn 1: Hồ sơ thiết kế (10 ngày)
          </div>
          <div className="hd-ol">
            <p>- Mặt bằng tổng thể</p>
            <p>- Các mặt bằng công trình</p>
            <p>- Mặt bằng bố trí nội thất</p>
          </div>

          <div className="hd-text hd-underline">
            Giai đoạn 2: Phối cảnh tổng thể (10 ngày)
          </div>
          <div className="hd-ol">
            <p> - Hình ảnh phối cảnh mặt ngoài công trình</p>
          </div>

          <div className="hd-text hd-underline">
            Giai đoạn 3: Hồ sơ thiết kế kỹ thuật thi công (10 ngày)
          </div>
          <div className="hd-ol">
            <p>
              - Xin giấy phép xây dựng sẽ được triển khai song song, đồng bộ
              trong thời gian thiết kế.
            </p>
          </div>

          {/* 1. Phần kiến trúc */}
          <div className="hd-text hd-bold">1. Phần kiến trúc:</div>
          <div className="hd-ol">
            <p>- Phối cảnh 3D tổng thể công trình</p>
            <p>- Mặt bằng các tầng</p>
            <p>- Các mặt đứng, mặt cắt chi tiết công trình</p>
            <p>
              - Mô tả vật liệu sử dụng, màu sơn tường các mặt đứng bên ngoài
            </p>
          </div>

          {/* 2. Phần kết cấu */}
          <div className="hd-text hd-bold">
            2. Phần kết cấu và khái toán công trình:
          </div>
          <div className="hd-ol">
            <p>- Thống kê toàn bộ vật liệu sử dụng cho thi công</p>
            <p>
              - Lập khái toán theo quy cách vật liệu và báo giá sau khi thống
              nhất với Bên A
            </p>
          </div>

          <div className="hd-text hd-bold hd-i">
            Tổng thời gian hoàn thành hợp đồng: tối đa 30 ngày kể từ ngày ký hợp
            đồng.
          </div>
        </section>

        {/* II. Chất lượng và yêu cầu kỹ thuật */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU II: CHẤT LƯỢNG VÀ CÁC YÊU CẦU KỸ THUẬT, MỸ THUẬT
          </h3>
          <div className="hd-text">
            - Bên B thực hiện dịch vụ thiết kế để thi công kiến trúc tuân thủ
            theo các tiêu chuẩn, quy định, quy phạm chuyên ngành của Nhà nước.
          </div>
        </section>

        {/* III. Thời gian và tiến độ */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU III: THỜI GIAN, TIẾN ĐỘ THỰC HIỆN
          </h3>

          <div className="hd-sub">3.1. Thời gian thực hiện:</div>
          <div className="hd-text">
            - Thời gian bắt đầu: kể từ khi hợp đồng được ký kết.
          </div>

          <div className="hd-sub">3.2. Thời gian triển khai dịch vụ:</div>
          <div className="hd-text">
            - Bên A thống nhất với Bên B nội dung phương án thiết kế.
          </div>
          <div className="hd-text">
            - Không có sự thay đổi phương án thiết kế của Bên A khi phương án sơ
            bộ hoặc các phần khác đã được hai bên thống nhất (thay đổi không quá
            3 lần).
          </div>
          <div className="hd-text">
            - Không bao gồm thời gian chờ thống nhất phương án giữa các bên.
          </div>
          <div className="hd-text">
            - Khi có sự thay đổi trong thiết kế theo yêu cầu của Bên A, thời
            gian tiến hành dịch vụ hợp đồng sẽ được hai bên xem xét và thống
            nhất lại.
          </div>
        </section>

        {/* IV. Giá trị hợp đồng (tự lấy từ bảng II) */}
        <section
          className={`hd-section ${grandTotal > 0 ? "" : "hd-print-hide"}`}
        >
          <h3 className="hd-section__title">
            ĐIỀU IV: GIÁ TRỊ HỢP ĐỒNG {typePhrase}
          </h3>

          <div className="hd-sub">4.1. Giá trị hợp đồng {typePhrase}:</div>

          <div className="hd-tableWrap">
            <table className="hd-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>STT</th>
                  <th>{typePhrase}</th>
                  <th style={{ width: 70 }}>ĐVT</th>
                  <th style={{ width: 100 }}>Diện tích</th>
                  <th style={{ width: 150 }}>Đơn giá</th>
                  <th style={{ width: 160 }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={rowHasInput(r) ? "" : "hd-print-hide"}>
                    <td className="hd-tac">{i + 1}</td>
                    <td>
                      <input
                        className="hd-cell"
                        value={r.name}
                        placeholder="Nhập hạng mục"
                        onChange={(e) => onChangeRow(i, "name", e.target.value)}
                      />
                    </td>
                    <td className="hd-tac">
                      <input
                        className="hd-cell hd-cell--center"
                        value={r.unit}
                        onChange={(e) => onChangeRow(i, "unit", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="hd-cell hd-cell--right"
                        value={r.area}
                        placeholder="0"
                        inputMode="decimal"
                        onChange={(e) =>
                          onChangeRow(
                            i,
                            "area",
                            e.target.value.replace(/[^0-9.]/g, "")
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="hd-cell hd-cell--right"
                        value={r.price}
                        placeholder="0"
                        inputMode="numeric"
                        onChange={(e) =>
                          onChangeRow(
                            i,
                            "price",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                      />
                    </td>
                    <td className="hd-tar hd-bold">
                      {VND.format(amounts[i] || 0).replace("₫", "VNĐ")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {showDiscountRow && (
                  <tr>
                    <td colSpan={5} className="hd-tar">
                      Giảm giá{" "}
                      {discountType === "percent"
                        ? `(${discountVal || 0}%)`
                        : ""}
                    </td>
                    <td className="hd-tar">
                      {VND.format(discount).replace("₫", "VNĐ")}
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={5} className="hd-tar hd-bold">
                    TỔNG
                  </td>
                  <td className="hd-tar hd-bold">
                    {VND.format(subTotal).replace("₫", "VNĐ")}
                  </td>
                </tr>
                {showVatRow && (
                  <tr>
                    <td colSpan={5} className="hd-tar">
                      Thuế VAT (10%)
                    </td>
                    <td className="hd-tar">
                      {VND.format(vat).replace("₫", "VNĐ")}
                    </td>
                  </tr>
                )}
                <tr className={grandTotal > 0 ? "" : "hd-print-hide"}>
                  <td colSpan={5} className="hd-tar hd-bold">
                    Tổng giá trị thanh toán
                  </td>
                  <td className="hd-tar hd-bold">
                    {VND.format(grandTotal).replace("₫", "VNĐ")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="hd-text">
            - Giá trị hợp đồng trọn gói:{" "}
            <strong>{VND.format(grandTotal).replace("₫", "VNĐ")}</strong> (Bằng
            chữ: <em>{amountInWords}</em>)
          </div>

          <div className="hd-sub">4.2. Điều khoản thay đổi:</div>
          <div className="hd-text">
            - Sau khi Bên A đã thống nhất phương án thiết kế công trình hoặc các
            hạng mục công trình với Bên B và Bên B đã giao các bản vẽ chi tiết
            cho Bên A, nếu Bên A có yêu cầu thay đổi thiết kế dẫn đến phát sinh
            công việc thì giá trị hợp đồng sẽ được xem xét và điều chỉnh phù hợp
            với khối lượng phát sinh.
          </div>
        </section>

        {/* V. Thể thức thanh toán */}
        <section
          className={`hd-section ${hasAnyRowToPrint ? "" : "hd-print-hide"}`}
        >
          <h3 className="hd-section__title">ĐIỀU V: THỂ THỨC THANH TOÁN</h3>

          <div className="hd-sub">5.1. Phương thức thanh toán:</div>
          {/* <div className="hd-text">- Thanh toán chia thành 2 lần như sau:</div> */}

          <div className="hd-text">
            Số tiền lần 1:{" "}
            <strong>
              {VND.format(Math.round(grandTotal * 0.5)).replace("₫", "VNĐ")}
            </strong>{" "}
            (Bằng chữ:{" "}
            <em>{numberToVietnamese(Math.round(grandTotal * 0.5))}</em>)
          </div>
          <div className="hd-text">
            Số tiền lần 2:{" "}
            <strong>
              {VND.format(grandTotal - Math.round(grandTotal * 0.5)).replace(
                "₫",
                "VNĐ"
              )}
            </strong>{" "}
            (Bằng chữ:{" "}
            <em>
              {numberToVietnamese(grandTotal - Math.round(grandTotal * 0.5))}
            </em>
            )
          </div>

          <div className="hd-sub">
            5.2. Hình thức thanh toán: Tiền mặt hoặc chuyển khoản.
          </div>
          <div className="hd-sub">
            5.3. Đồng tiền thanh toán: Tiền Việt Nam (VNĐ).
          </div>
        </section>

        {/* VI. Tranh chấp */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU VI: TRANH CHẤP VÀ GIẢI QUYẾT TRANH CHẤP
          </h3>
          <div className="hd-text">
            - Trong trường hợp xảy ra tranh chấp hợp đồng, các bên phải có trách
            nhiệm cùng nhau thương lượng giải quyết.
          </div>
          <div className="hd-text">
            - Trường hợp không đạt được thỏa thuận giữa các bên, việc giải quyết
            tranh chấp thông qua Tòa án kinh tế thành phố Đà Nẵng. Phán quyết
            chung thẩm của Tòa là phán quyết cuối cùng để giải quyết tranh chấp.
          </div>
        </section>

        {/* VII. Bất khả kháng */}
        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU VII: BẤT KHẢ KHÁNG</h3>
          <div className="hd-sub">7.1. Sự kiện bất khả kháng:</div>
          <div className="hd-text">
            - Sự kiện bất khả kháng là sự kiện xảy ra mang tính khách quan và
            nằm ngoài tầm kiểm soát của các bên như động đất, bão, lũ lụt, lốc,
            sóng thần, lở đất, hỏa hoạn, chiến tranh hoặc có nguy cơ xảy ra
            chiến tranh,... và các thảm họa khác chưa lường hết được, sự thay
            đổi chính sách của nhà nước.
          </div>
          <div className="hd-text">
            - Việc một bên không hoàn thành nghĩa vụ của mình do sự kiện bất khả
            kháng sẽ không phải là cơ sở để bên kia chấm dứt hợp đồng. Tuy nhiên
            bên bị ảnh hưởng bởi sự kiện bất khả kháng có nghĩa vụ phải:
          </div>
          <div className="hd-text">
            + Tiến hành các biện pháp ngăn ngừa hợp lý và biện pháp thay thế để
            hạn chế tối đa ảnh hưởng.
          </div>
          <div className="hd-text">
            + Thông báo ngay cho bên kia trong vòng 7 ngày kể từ khi xảy ra sự
            kiện bất khả kháng.
          </div>

          <div className="hd-sub">7.2. Ảnh hưởng đến tiến độ hợp đồng:</div>
          <div className="hd-text">
            - Trong trường hợp xảy ra sự kiện bất khả kháng, thời gian thực hiện
            hợp đồng sẽ được kéo dài tương ứng với thời gian diễn ra sự kiện bất
            khả kháng mà bên bị ảnh hưởng không thể thực hiện nghĩa vụ.
          </div>
        </section>

        {/* VIII. Tạm dừng, hủy bỏ */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU VIII: TẠM DỪNG, HỦY BỎ HỢP ĐỒNG
          </h3>
          <div className="hd-sub">8.1. Các trường hợp tạm dừng hợp đồng:</div>
          <div className="hd-text">
            - Lỗi do một trong hai bên gây ra mà không thể thỏa thuận được.
          </div>
          <div className="hd-text">- Các trường hợp bất khả kháng.</div>
          <div className="hd-text">
            - Các trường hợp khác do hai bên thỏa thuận.
          </div>

          <div className="hd-sub">8.2. Trách nhiệm khi tạm dừng:</div>
          <div className="hd-text">
            - Một bên có quyền quyết định tạm dừng hợp đồng do lỗi của bên kia,
            nhưng phải thông báo bằng văn bản và cùng bàn bạc giải quyết để tiếp
            tục thực hiện hợp đồng.
          </div>
          <div className="hd-text">
            - Trường hợp bên tạm dừng không thông báo mà gây thiệt hại thì phải
            bồi thường cho bên bị thiệt hại.
          </div>
          <div className="hd-text">
            - Thời gian và mức đền bù do tạm dừng hợp đồng sẽ do hai bên thỏa
            thuận.
          </div>
        </section>

        {/* IX. Quyền và nghĩa vụ */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU IX: QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN
          </h3>

          <div className="hd-sub">9.1. Quyền và nghĩa vụ của Bên A:</div>
          <div className="hd-text">
            - Cung cấp đầy đủ tài liệu và hồ sơ đất đai liên quan đến công trình
            xây dựng.
          </div>
          <div className="hd-text">
            - Cung cấp thông tin, số liệu về công trình khi có yêu cầu từ Bên B.
          </div>
          <div className="hd-text">
            - Thực hiện nghĩa vụ tạm ứng và thanh toán theo đúng quy trình tài
            chính trong hợp đồng.
          </div>
          <div className="hd-text">
            - Thực hiện nghĩa vụ của Chủ đầu tư theo quy định của pháp luật.
          </div>

          <div className="hd-sub">9.2. Quyền và nghĩa vụ của Bên B:</div>
          <div className="hd-text">
            - Thực hiện hợp đồng theo đúng nội dung và tiến độ đã thống nhất.
          </div>
        </section>

        {/* X. Điều khoản chung */}
        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU X: ĐIỀU KHOẢN CHUNG</h3>
          <div className="hd-text">
            - Hai bên cam kết thực hiện tốt các điều khoản đã thỏa thuận trong
            hợp đồng.
          </div>
          <div className="hd-text">
            - Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, mỗi
            bên giữ 01 bản.
          </div>
          <div className="hd-text">- Hợp đồng có hiệu lực kể từ ngày ký.</div>
        </section>

        <section className="hd-sign">
          <div className="hd-date">{formatSignDateVN()}</div>
          <div className="hd-signGrid">
            <div className="hd-signCol">
              <div className="hd-signTitle">ĐẠI DIỆN BÊN A</div>
              <div className="hd-signBox"></div>
              {/* tên đại diện bên A */}
              <div className="hd-signSub">
                {(benA.rep || "").trim() || ".........."}
              </div>
            </div>

            <div className="hd-signCol">
              <div className="hd-signTitle">ĐẠI DIỆN BÊN B</div>
              <div className="hd-signBox">Giám đốc</div>
              {/* tên đại diện bên B */}
              <div className="hd-signSub">NGUYỄN XUÂN HẢI</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
