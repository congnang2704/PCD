// src/pages/admin/hopdong/QL_HDThietKe_XinPhep.jsx
import React, { useMemo, useState } from "react";
import "./QL_HDThietKe.css";
import logoUrl from "../../../../assets/logonang.jpg";

// Định dạng VND & viết số tiền bằng chữ (rút gọn, đủ dùng tới nghìn tỷ)
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
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
  function doc3(x) {
    const tr = Math.floor(x / 100),
      ch = Math.floor((x % 100) / 10),
      dvn = x % 10;
    let s = "";
    if (tr) s += cs[tr] + " trăm";
    if (ch > 1) {
      s += (s ? " " : "") + cs[ch] + " mươi";
      if (dvn === 1) s += " mốt";
      else if (dvn === 5) s += " lăm";
      else if (dvn) s += " " + cs[dvn];
    } else if (ch === 1) {
      s += (s ? " " : "") + "mười";
      if (dvn === 5) s += " lăm";
      else if (dvn) s += " " + cs[dvn];
    } else if (dvn) {
      if (tr) s += (s ? " " : "") + "lẻ";
      s += (tr ? " " : "") + (dvn === 5 && tr ? "năm" : cs[dvn]);
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
  const out = parts.join(" ").replace(/\s+/g, " ");
  return out.charAt(0).toUpperCase() + out.slice(1) + " đồng chẵn";
}

export default function QL_HDThietKe_XinPhep() {
  // Thông tin hợp đồng/2 bên
  const [contractNo, setContractNo] = useState(""); // số HĐ (phần trước /HĐTK/2025)
  const [signDate, setSignDate] = useState(""); // ngày ký
  const [benA, setBenA] = useState({
    name: "",
    cccd: "",
    address: "",
    phone: "",
  });
  // Giá trị HĐ & chia 50/50 theo mẫu Word
  const [contractValue, setContractValue] = useState(15000000);

  const year = useMemo(
    () =>
      signDate ? new Date(signDate).getFullYear() : new Date().getFullYear(),
    [signDate]
  );
  const dateVN = useMemo(() => {
    if (!signDate) return "........, ngày ..... tháng ..... năm ......";
    const d = new Date(signDate),
      dd = String(d.getDate()).padStart(2, "0"),
      mm = String(d.getMonth() + 1).padStart(2, "0"),
      yyyy = d.getFullYear();
    return `Đà Nẵng, ngày ${dd} tháng ${mm} năm ${yyyy}`;
  }, [signDate]);

  const p1 = Math.round(contractValue * 0.5);
  const p2 = contractValue - p1;
  const words = useMemo(
    () => numberToVietnamese(contractValue),
    [contractValue]
  );

  return (
    <div className="hd">
      {/* Sidebar nhập liệu */}
      <aside className="hd__side">
        <div className="hd-brand">
          NGUYEN HAI
          <br />
          design & build
        </div>

        <label className="hd-label">Số hợp đồng (phần trước)</label>
        <input
          className="hd-input"
          placeholder="Số ..."
          value={contractNo}
          onChange={(e) => setContractNo(e.target.value)}
        />

        <label className="hd-label">Ngày ký</label>
        <input
          className="hd-input"
          type="date"
          value={signDate}
          onChange={(e) => setSignDate(e.target.value)}
        />

        <label className="hd-label">Giá trị hợp đồng (trọn gói)</label>
        <input
          className="hd-input"
          inputMode="numeric"
          value={contractValue}
          onChange={(e) =>
            setContractValue(
              Number((e.target.value || "").replace(/[^0-9]/g, "")) || 0
            )
          }
        />

        <hr className="hd-hr" />

        <label className="hd-label">BÊN A – Họ tên</label>
        <input
          className="hd-input"
          value={benA.name}
          onChange={(e) => setBenA({ ...benA, name: e.target.value })}
        />
        <label className="hd-label">CCCD</label>
        <input
          className="hd-input"
          value={benA.cccd}
          onChange={(e) => setBenA({ ...benA, cccd: e.target.value })}
        />
        <label className="hd-label">Địa chỉ thường trú</label>
        <input
          className="hd-input"
          value={benA.address}
          onChange={(e) => setBenA({ ...benA, address: e.target.value })}
        />
        <label className="hd-label">Điện thoại</label>
        <input
          className="hd-input"
          value={benA.phone}
          onChange={(e) =>
            setBenA({
              ...benA,
              phone: e.target.value.replace(/[^0-9. +()-]/g, ""),
            })
          }
        />

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

      {/* Khu in */}
      <main className="hd__body">
        {/* Quốc hiệu */}
        <section className="hd-section-high">
          <img className="hd-logo-img" src={logoUrl} alt="Logo" />
          <div className="hd-high-title">
            <div className="hd-high-line1">
              CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="hd-high-line2">Độc lập - Tự do - Hạnh phúc</div>
          </div>
        </section>

        {/* Tiêu đề hợp đồng */}
        <header className="hd-header">
          <h1 className="hd-title">HỢP ĐỒNG</h1>
          <div className="hd-subtitle">
            “Về Xin phép xây dựng &amp; Tư vấn thiết kế kiến trúc”
          </div>
          <div className="hd-meta">
            Số: {`${contractNo || "..."}/HĐTK/${year}`}
          </div>
        </header>

        {/* Căn cứ pháp lý */}
        <section className="hd-section">
          <div className="hd-text-cc">
            Căn cứ Bộ Luật dân sự số 33/2005/QH11 ngày 14/6/2005...
          </div>
          <div className="hd-text-cc">
            Căn cứ Luật Xây dựng số 16/2003/QH11 ngày 26/11/2003...
          </div>
          <div className="hd-text-cc">
            Căn cứ Thông tư số 06/2007/TT-BXD ngày 25/7/2007...
          </div>
          <div className="hd-text-cc">
            Căn cứ Nghị định số 12/2009/NĐ-CP ngày 12/02/2009...
          </div>
          <div className="hd-text-cc">
            Căn cứ Nghị định số 209/2004/NĐ-CP ngày 16/12/2004... và Nghị định
            49/2008/NĐ-CP...
          </div>
          <div className="hd-text-cc">Căn cứ thỏa thuận giữa hai bên.</div>
          <div className="hd-date-top">{dateVN}</div>
        </section>

        {/* Thông tin 2 bên */}
        <section className="hd-section hd-parties">
          <div className="hd-card">
            <div className="hd-card__title">
              1. Bên giao thầu (gọi tắt là bên A)
            </div>
            <div className="hd-card__line">
              Họ và tên Ông/Bà: {benA.name || ".........."}
            </div>
            <div className="hd-card__line">
              CCCD: {benA.cccd || ".........."}
            </div>
            <div className="hd-card__line">
              Địa chỉ thường trú: {benA.address || ".........."}
            </div>
            <div className="hd-card__line">
              Điện thoại: {benA.phone || ".........."}
            </div>
          </div>

          <div className="hd-card">
            <div className="hd-card__title">
              2. Bên nhận thầu (gọi tắt là bên B)
            </div>
            <div className="hd-card__line">Công ty TNHH MTV PCD NGUYỄN HẢI</div>
            <div className="hd-card__line">
              Người đại diện: Nguyễn Xuân Hải – Chức vụ: Giám đốc
            </div>
            <div className="hd-card__line">
              Địa chỉ: 17 Nguyễn Cư Trinh, P.Hoà Cường Bắc, Q.Hải Châu, TP.Đà
              Nẵng
            </div>
            <div className="hd-card__line">Điện thoại: 0905402989</div>
            <div className="hd-card__line">Mã số thuế: 0401518783</div>
            <div className="hd-card__line">
              Tài khoản NH: 2009206118400 – Agribank CN Chợ Mới Nam Đà Nẵng
            </div>
          </div>
        </section>

        {/* Điều I: Nội dung công việc */}
        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU I: NỘI DUNG CÔNG VIỆC</h3>
          <p className="hd-text">
            Bên A thuê Bên B triển khai dịch vụ thiết kế mới kiến trúc (kèm xin
            giấy phép xây dựng). Diện tích thiết kế dự kiến do hai bên thống
            nhất; số m² thực tế xác định theo hồ sơ cuối cùng để thi công.
          </p>
          <ul className="hd-ol">
            <li>
              Giai đoạn 1 (10 ngày): Hồ sơ thiết kế sơ bộ – mặt bằng tổng thể,
              mặt bằng công trình, bố trí nội thất.
            </li>
            <li>
              Giai đoạn 2 (10 ngày): Phối cảnh tổng thể công trình – hình ảnh
              phối cảnh mặt ngoài.
            </li>
            <li>
              Giai đoạn 3 (10 ngày): Hồ sơ thiết kế kỹ thuật thi công sau khi
              thống nhất phương án.
            </li>
            <li>
              Xin giấy phép xây dựng triển khai song song trong thời gian trên.
            </li>
          </ul>
          <p className="hd-text">
            Tổng thời gian hoàn thành tối đa: 30 ngày kể từ thời điểm ký hợp
            đồng.
          </p>
        </section>

        {/* Điều II */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU II: CHẤT LƯỢNG VÀ CÁC YÊU CẦU KỸ THUẬT, MỸ THUẬT
          </h3>
          <p className="hd-text">
            Bên B thực hiện theo tiêu chuẩn, quy định, quy phạm chuyên ngành
            hiện hành của Nhà nước.
          </p>
        </section>

        {/* Điều III */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU III: THỜI GIAN, TIẾN ĐỘ THỰC HIỆN
          </h3>
          <ul className="hd-ol">
            <li>Thời gian bắt đầu: kể từ khi hợp đồng được ký kết.</li>
            <li>
              Tiến độ tính trên cơ sở Bên A thống nhất phương án; thay đổi
              phương án (không quá 3 lần) sẽ xem xét điều chỉnh tiến độ.
            </li>
          </ul>
        </section>

        {/* Điều IV: Giá trị HĐ */}
        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU IV: GIÁ TRỊ HỢP ĐỒNG</h3>
          <p className="hd-text">
            Giá trị hợp đồng trọn gói: <b>{VND.format(contractValue)}</b> (
            <i>{words}</i>).
          </p>
          <p className="hd-text">
            Khi phát sinh thay đổi thiết kế theo yêu cầu của Bên A sau khi đã
            bàn giao hồ sơ chi tiết, giá trị hợp đồng sẽ được hai bên xem xét
            điều chỉnh phù hợp.
          </p>
        </section>

        {/* Điều V: Thanh toán 50/50 */}
        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU V: THỂ THỨC THANH TOÁN</h3>
          <table className="hd-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>Lần</th>
                <th>Tiến độ</th>
                <th style={{ width: 220 }}>Giá trị thanh toán</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="hd-tac">Lần 1</td>
                <td>Ngay sau khi ký hợp đồng</td>
                <td className="hd-tar">{VND.format(p1)} (50%)</td>
              </tr>
              <tr>
                <td className="hd-tac">Lần 2</td>
                <td>Hoàn thành toàn bộ nội dung Điều I</td>
                <td className="hd-tar">{VND.format(p2)} (50%)</td>
              </tr>
            </tbody>
          </table>
          <p className="hd-note">
            Hình thức thanh toán: Tiền mặt hoặc chuyển khoản. Đồng tiền: VND.
          </p>
        </section>

        {/* Điều VI - X (rút gọn đúng tinh thần bản Word) */}
        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU VI: TRANH CHẤP VÀ GIẢI QUYẾT TRANH CHẤP
          </h3>
          <p className="hd-text">
            Tranh chấp trước hết được thương lượng; nếu không thành, các bên đưa
            ra Tòa án kinh tế TP. Đà Nẵng để giải quyết.
          </p>
        </section>

        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU VII: BẤT KHẢ KHÁNG</h3>
          <p className="hd-text">
            Sự kiện bất khả kháng (thiên tai, hỏa hoạn, chiến tranh, thay đổi
            chính sách...) được thông báo trong 7 ngày; thời gian thực hiện được
            kéo dài tương ứng.
          </p>
        </section>

        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU VIII: TẠM DỪNG, HỦY BỎ HỢP ĐỒNG
          </h3>
          <p className="hd-text">
            Một bên có thể tạm dừng do lỗi bên kia hoặc do bất khả kháng và phải
            thông báo bằng văn bản; mức đền bù do hai bên thỏa thuận.
          </p>
        </section>

        <section className="hd-section">
          <h3 className="hd-section__title">
            ĐIỀU IX: QUYỀN VÀ NGHĨA VỤ CÁC BÊN
          </h3>
          <ul className="hd-ol">
            <li>
              Bên A: Cung cấp hồ sơ, thông tin; tạm ứng và thanh toán đúng hạn;
              thực hiện nghĩa vụ Chủ đầu tư.
            </li>
            <li>Bên B: Thực hiện đúng nội dung và tiến độ đã thống nhất.</li>
          </ul>
        </section>

        <section className="hd-section">
          <h3 className="hd-section__title">ĐIỀU X: ĐIỀU KHOẢN CHUNG</h3>
          <ul className="hd-ol">
            <li>
              Hợp đồng lập 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01
              bản.
            </li>
            <li>Hợp đồng có hiệu lực kể từ ngày ký.</li>
          </ul>
        </section>

        {/* Ký tên */}
        <section className="hd-sign">
          <div className="hd-date">{dateVN}</div>
          <div className="hd-signGrid">
            <div className="hd-signCol">
              <div className="hd-signTitle">ĐẠI DIỆN BÊN A</div>
              <div className="hd-signBox"></div>
              <div className="hd-signSub">
                {(benA.name || "..........").toUpperCase()}
              </div>
            </div>
            <div className="hd-signCol">
              <div className="hd-signTitle">ĐẠI DIỆN BÊN B</div>
              <div className="hd-signBox">Giám đốc</div>
              <div className="hd-signSub">NGUYỄN XUÂN HẢI</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
