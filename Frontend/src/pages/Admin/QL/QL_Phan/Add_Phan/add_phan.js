import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add_phan.css";

const API = "https://api.nguyenhai.com.vn/api";

// slugify nhẹ
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

export default function Add_Phan({ onDone }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ten: "", slug: "", thuTu: 0 });
  const [loading, setLoading] = useState(false);
  const [slugDirty, setSlugDirty] = useState(false);

  // toast
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });

  function showToast(msg, type = "success", duration = 1200, redirect = null) {
    setToast({ open: true, type, msg });
    setTimeout(() => {
      setToast({ open: false, type, msg: "" });
      if (redirect) navigate(redirect);
    }, duration);
  }

  function onChangeTen(v) {
    setForm((prev) => {
      const next = { ...prev, ten: v };
      if (!slugDirty) next.slug = toSlug(v);
      return next;
    });
  }

  function onChangeSlug(v) {
    const cleaned = toSlug(v);
    setForm((prev) => ({ ...prev, slug: cleaned }));
    setSlugDirty(cleaned.length > 0);
  }

  function resetSlug() {
    setForm((prev) => ({ ...prev, slug: toSlug(prev.ten) }));
    setSlugDirty(false);
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.ten?.trim())
      return showToast("Nhập Tên giúp mình nha!", "error", 1500);
    if (!form.slug?.trim()) {
      const auto = toSlug(form.ten);
      if (!auto)
        return showToast("Tên chưa hợp lệ để tạo slug.", "error", 1500);
      setForm((prev) => ({ ...prev, slug: auto }));
    }

    setLoading(true);
    try {
      const payload = { ...form, thuTu: Number(form.thuTu || 0) };
      const res = await fetch(`${API}/phan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false) {
        throw new Error(json?.thongBao || "Tạo Phần thất bại");
      }

      setForm({ ten: "", slug: "", thuTu: 0 });
      setSlugDirty(false);
      onDone && onDone();

      // ✅ báo thành công + chuyển trang
      showToast("Tạo Phần thành công!", "success", 1200, "/haiadmin/ql-phan");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi tạo Phần", "error", 1600);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Toast overlay */}
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast-card ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <form className="vl-add-phan" onSubmit={submit}>
        <div className="title">Thêm Phần</div>

        <div className="field">
          <label>Tên</label>
          <input
            className="inp-phan"
            placeholder="VD: Hoàn thiện"
            value={form.ten}
            onChange={(e) => onChangeTen(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="row">
            <span>Slug</span>
            <button
              type="button"
              className="link"
              onClick={resetSlug}
              title="Đặt lại slug theo tên"
            >
              Đặt lại slug
            </button>
          </label>
          <input
            className="inp-phan"
            placeholder="VD: hoan-thien"
            value={form.slug}
            onChange={(e) => onChangeSlug(e.target.value)}
          />
          {!slugDirty && (
            <small className="hint">Slug đang tự đồng bộ theo tên</small>
          )}
          {slugDirty && (
            <small className="hint">Bạn đã sửa slug thủ công</small>
          )}
        </div>

        <div className="field">
          <label>Thứ tự</label>
          <input
            className="inp-phan"
            type="number"
            placeholder="VD: 1"
            value={form.thuTu}
            onChange={(e) => setForm({ ...form, thuTu: e.target.value })}
          />
        </div>

        <button className="btn-luu" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </form>
    </>
  );
}
