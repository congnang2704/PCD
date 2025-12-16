import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add_nhom.css";

const BASE = "https://api.nguyenhai.com.vn/api";

// slugify nhẹ cho tiếng Việt
function toSlug(s = "") {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Add_Nhom({ onDone }) {
  const [phan, setPhan] = useState([]);
  const [form, setForm] = useState({ phan: "", ten: "", slug: "", thuTu: 0 });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // load danh sách phần
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE}/phan`, { credentials: "include" });
      const json = await res.json();
      setPhan(json.duLieu || []);
    })();
  }, []);

  // cập nhật tên → gợi ý slug
  function onChangeTen(v) {
    setForm((prev) => ({ ...prev, ten: v, slug: prev.slug ? prev.slug : toSlug(v) }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.phan || !form.ten || !form.slug) return alert("Chọn Phần, nhập Tên & Slug");

    setLoading(true);
    try {
      const payload = { ...form, thuTu: Number(form.thuTu || 0) };
      const res = await fetch(`${BASE}/nhom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.thanhCong === false) throw new Error(json?.thongBao || "Tạo Nhóm thất bại");

      // reset form
      setForm({ phan: "", ten: "", slug: "", thuTu: 0 });

      // thông báo đẹp
      const toast = document.createElement("div");
      toast.className = "toast-success";
      toast.innerText = "✅ Tạo Nhóm thành công!";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 400);
        nav("/haiadmin/ql-nhom"); // chuyển về list
      }, 1200);

      onDone && onDone();
    } catch (e) {
      console.error(e);
      alert(e.message || "Lỗi tạo Nhóm");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="vl-add-nhom" onSubmit={submit}>
      <div className="title">➕ Thêm Nhóm</div>

      <select
        className="sel"
        value={form.phan}
        onChange={(e) => setForm({ ...form, phan: e.target.value })}
      >
        <option value="">-- chọn Phần --</option>
        {phan.map((p) => (
          <option key={p._id} value={p._id}>
            {p.ten}
          </option>
        ))}
      </select>

      <input
        className="inp"
        placeholder="Tên nhóm"
        value={form.ten}
        onChange={(e) => onChangeTen(e.target.value)}
      />

      <input
        className="inp"
        placeholder="Slug nhóm"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: toSlug(e.target.value) })}
      />

      <input
        className="inp"
        type="number"
        placeholder="Thứ tự"
        value={form.thuTu}
        onChange={(e) => setForm({ ...form, thuTu: e.target.value })}
      />

      <div className="actions">
        <button
          type="button"
          className="btn secondary"
          onClick={() => nav("/haiadmin/ql-nhom")}
        >
          ⬅ Quay lại
        </button>
        <button className="btn primary" disabled={loading}>
          {loading ? "Đang lưu..." : "💾 Lưu"}
        </button>
      </div>
    </form>
  );
}
