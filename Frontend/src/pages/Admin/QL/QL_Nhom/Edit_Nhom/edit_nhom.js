// src/components/Admin/QL_Vat_Lieu/QL_Nhom/Edit_Nhom/edit_nhom.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit_nhom.css";

/* ==== BASE động (Vite/CRA/dev/prod) ==== */
const API = "https://api.nguyenhai.com.vn/api";

/* ==== fetch JSON an toàn (bắt lỗi 404/HTML) ==== */
async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!ct.includes("application/json")) {
    try { // phòng trường hợp BE trả JSON nhưng header sai
      const data = JSON.parse(text);
      return { ok: res.ok, status: res.status, data };
    } catch {
      throw new Error(`Không nhận JSON từ ${url}. Status ${res.status}.`);
    }
  }
  const data = JSON.parse(text);
  return { ok: res.ok, status: res.status, data };
}

// slugify nhẹ hỗ trợ TViệt
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

// kiểm tra ObjectId hợp lệ
const isObjectId = (v = "") => /^[a-f\d]{24}$/i.test(v);

export default function Edit_Nhom() {
  const { id } = useParams(); // /haiadmin/edit-nhom/:id
  const navigate = useNavigate();

  const [phanOptions, setPhanOptions] = useState([]);
  const [form, setForm] = useState({ phan: "", ten: "", slug: "", thuTu: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slugDirty, setSlugDirty] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });
  function showToast(msg, type = "success", duration = 1200, redirect = null) {
    setToast({ open: true, type, msg });
    setTimeout(() => {
      setToast({ open: false, type, msg: "" });
      if (redirect) navigate(redirect, { replace: true });
    }, duration);
  }

  // Load Phần & Nhóm detail
  useEffect(() => {
    let ignore = false;

    (async () => {
      // nếu id sai format thì báo luôn
      if (!isObjectId(id)) {
        showToast(
          "ID không hợp lệ. Quay lại danh sách.",
          "error",
          1400,
          "/haiadmin/ql-nhom"
        );
        return;
      }
      try {
        const [phanRes, nhomRes] = await Promise.all([
          fetchJson(`${API}/phan`, { credentials: "include" }),
          fetchJson(`${API}/nhom/${id}`, { credentials: "include" }),
        ]);

        // handle 404 rõ ràng
        if (nhomRes.status === 404) {
          showToast(
            "Không tìm thấy Nhóm. Có thể bạn dùng _id của Phần.",
            "error",
            1600,
            "/haiadmin/ql-nhom"
          );
          return;
        }
        if (!nhomRes.ok) {
          throw new Error(nhomRes.data?.thongBao || "Lỗi lấy chi tiết Nhóm");
        }

        const phanList = phanRes.data?.duLieu || [];
        const nhom = nhomRes.data?.duLieu || {};

        if (!ignore) {
          setPhanOptions(phanList);
          if (nhom && nhom._id) {
            setForm({
              phan: nhom.phan?._id || "",
              ten: nhom.ten || "",
              slug: nhom.slug || "",
              thuTu: nhom.thuTu ?? 0,
            });
            setSlugDirty(Boolean(nhom.slug));
          } else {
            showToast(
              "Không tìm thấy Nhóm.",
              "error",
              1400,
              "/haiadmin/ql-nhom"
            );
          }
        }
      } catch (e) {
        console.error(e);
        showToast(
          e.message || "Không tải được dữ liệu",
          "error",
          1600,
          "/haiadmin/ql-nhom"
        );
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  // Auto-sync slug theo tên nếu chưa “dirty”
  function onChangeTen(v) {
    setForm((prev) => {
      const next = { ...prev, ten: v };
      if (!slugDirty) next.slug = toSlug(v);
      return next;
    });
  }

  // Người dùng chỉnh slug thủ công
  function onChangeSlug(v) {
    const cleaned = toSlug(v);
    setForm((prev) => ({ ...prev, slug: cleaned }));
    setSlugDirty(cleaned.length > 0); // xóa trắng => bật lại auto-sync
  }

  function resetSlug() {
    setForm((prev) => ({ ...prev, slug: toSlug(prev.ten) }));
    setSlugDirty(false);
  }

  async function save(e) {
    e.preventDefault();
    if (!form.phan) return showToast("Vui lòng chọn Phần", "error", 1500);
    if (!form.ten?.trim()) return showToast("Nhập Tên nhóm", "error", 1500);
    const slugNow = form.slug?.trim() || toSlug(form.ten);
    if (!slugNow) return showToast("Slug chưa hợp lệ", "error", 1500);

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: slugNow,
        thuTu: Number(form.thuTu || 0),
      };
      const res = await fetch(`${API}/nhom/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false) {
        throw new Error(json?.thongBao || "Cập nhật Nhóm thất bại");
      }
      showToast("Đã lưu thay đổi!", "success", 1200, "/haiadmin/ql-nhom");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi lưu Nhóm", "error", 1600);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="edit-nhom">
      {/* Toast overlay */}
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast-card ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="edit-nhom__header">
        <h2>Sửa Nhóm</h2>
        <div className="gap" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>

      <form className="edit-nhom__card" onSubmit={save}>
        {loading ? (
          <div className="loading">
            <div className="spinner" /> Đang tải dữ liệu…
          </div>
        ) : (
          <>
            <div className="grid">
              <div className="field">
                <label>Thuộc Phần</label>
                <select
                  className="inp"
                  value={form.phan}
                  onChange={(e) => setForm({ ...form, phan: e.target.value })}
                >
                  <option value="">-- chọn Phần --</option>
                  {phanOptions.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.ten}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Tên Nhóm</label>
                <input
                  className="inp"
                  value={form.ten}
                  onChange={(e) => onChangeTen(e.target.value)}
                  placeholder="VD: Gạch ốp lát"
                />
              </div>

              <div className="field">
                <label className="row">
                  <span>Slug</span>
                  <button
                    type="button"
                    className="link"
                    onClick={resetSlug}
                    title="Đặt lại slug từ tên"
                  >
                    Đặt lại slug
                  </button>
                </label>
                <input
                  className="inp"
                  value={form.slug}
                  onChange={(e) => onChangeSlug(e.target.value)}
                  placeholder="VD: gach-op-lat"
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
                  className="inp"
                  type="number"
                  value={form.thuTu}
                  onChange={(e) => setForm({ ...form, thuTu: e.target.value })}
                  placeholder="VD: 1"
                />
              </div>
            </div>

            <div className="actions">
              <button
                type="button"
                className="btn outline"
                onClick={() => navigate("/haiadmin/ql-nhom")}
              >
                Hủy
              </button>
              <button className="btn primary" disabled={saving}>
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
