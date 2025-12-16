import React from "react";
import { useNavigate } from "react-router-dom";
import "./QL_Dashboard.css";

export default function QLVatLieuDashboard() {
  const navigate = useNavigate();

  const sections = [
    {
      key: "phan",
      title: "Phần",
      desc: "Quản lý các Phần lớn (ví dụ: Hoàn thiện, Nội thất...).",
      addPath: "/haiadmin/add-phan",
      listPath: "/haiadmin/ql-phan",
    },
    {
      key: "nhom",
      title: "Nhóm",
      desc: "Quản lý Nhóm thuộc mỗi Phần.",
      addPath: "/haiadmin/add-nhom",
      listPath: "/haiadmin/ql-nhom",
    },
    {
      key: "hangmuc",
      title: "Hạng mục",
      desc: "Quản lý Hạng mục thuộc mỗi Nhóm.",
      addPath: "/haiadmin/add-hang-muc",
      listPath: "/haiadmin/ql-hang-muc",
    },
    {
      key: "vatlieu",
      title: "Vật liệu",
      desc: "Quản lý danh sách Vật liệu theo Hạng mục.",
      addPath: "/haiadmin/add-vat-lieu",
      listPath: "/haiadmin/ql-vat-lieu",
    },

    // Card riêng cho Hợp đồng Thiết Kế
    {
      key: "hdthietke",
      title: "Hợp đồng Thiết Kế",
      desc: "Tạo & in Hợp đồng Thiết Kế, lập Báo giá thiết kế.",
      createPath: "/haiadmin/ql-hd-thiet-ke",
      addDesign: "/haiadmin/ql-bg-thiet-ke", // 👈 camelCase
    },
  ];

  const go = (path) => path && navigate(path);

  return (
    <div className="vl-landing">
      <div className="vl-landing__head">
        <h2>Quản lý Vật liệu</h2>
        <p className="muted">
          Chọn một phần để thao tác. Mỗi phần có 2 tác vụ: <b>Thêm</b> và{" "}
          <b>Danh sách / Sửa</b>.
        </p>
      </div>

      <div className="vl-landing__grid">
        {sections.map((s) => (
          <div key={s.key} className="card">
            <div className="card__title">{s.title}</div>
            <div className="card__desc">{s.desc}</div>

            <div className="card__actions">
              {s.key === "hdthietke" ? (
                <>
                  <button
                    className="btn primary"
                    onClick={() => go(s.createPath)}
                  >
                    Tạo hợp đồng thiết kế
                  </button>
                  <button
                    className="btn outline"
                    onClick={() => go(s.addDesign)}
                  >
                    Báo giá thiết kế
                  </button>
                </>
              ) : (
                <>
                  <button className="btn primary" onClick={() => go(s.addPath)}>
                    + Thêm {s.title.toLowerCase()}
                  </button>
                  <button
                    className="btn outline"
                    onClick={() => go(s.listPath)}
                  >
                    Danh sách / Sửa
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
