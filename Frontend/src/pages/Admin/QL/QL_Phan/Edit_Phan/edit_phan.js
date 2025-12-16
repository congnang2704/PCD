import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit_phan.css";

const BASE = "https://api.nguyenhai.com.vn/api";

// slugify nhẹ có hỗ trợ tiếng Việt
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

export default function Edit_Phan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ ten: "", slug: "", thuTu: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slugDirty, setSlugDirty] = useState(false); // đã sửa slug thủ công hay chưa

  // Load chi tiết
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${BASE}/phan/${id}`, {
          credentials: "include",
        });
        const json = await res.json();
        const item = json.duLieu || json.data || json;
        if (!ignore && item && item._id) {
          setForm({
            ten: item.ten || "",
            slug: item.slug || "",
            thuTu: item.thuTu ?? 0,
          });
          setSlugDirty(Boolean(item.slug)); // có slug sẵn coi như đã cố định
        }
      } catch (e) {
        console.error(e);
        alert("Không tải được chi tiết Phần.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => (ignore = true);
  }, [id]);

  // Đồng bộ slug theo Tên nếu chưa “dirty”
  function onChangeTen(v) {
    setForm((prev) => {
      const next = { ...prev, ten: v };
      if (!slugDirty) {
        next.slug = toSlug(v);
      }
      return next;
    });
  }

  // Người dùng sửa slug thủ công
  function onChangeSlug(v) {
    const cleaned = toSlug(v);
    setForm((prev) => ({ ...prev, slug: cleaned }));
    // nếu người dùng xóa trắng slug → bật auto-sync trở lại
    setSlugDirty(cleaned.length > 0);
  }

  function resetSlug() {
    setForm((prev) => ({ ...prev, slug: toSlug(prev.ten) }));
    setSlugDirty(false); // cho phép tiếp tục auto-sync theo tên
  }

  async function save(e) {
    e.preventDefault();
    if (!form.ten || !form.slug) return alert("Nhập Tên và Slug nha!");
    setSaving(true);
    try {
      const payload = { ...form, thuTu: Number(form.thuTu || 0) };
      const res = await fetch(`${BASE}/phan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("PUT /phan/:id fail");
      navigate("/haiadmin/ql-phan");
    } catch (e) {
      console.error(e);
      alert("Lưu thất bại. Kiểm tra API PUT /phan/:id");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="edit-phan">
      <div className="edit-phan__header">
        <h2>Sửa Phần</h2>
        <div className="gap" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>

      <form className="edit-phan__card" onSubmit={save}>
        {loading ? (
          <div className="loading">
            <div className="spinner" /> Đang tải dữ liệu…
          </div>
        ) : (
          <>
            <div className="grid">
              <div className="field">
                <label>Tên</label>
                <input
                  className="inp"
                  value={form.ten}
                  onChange={(e) => onChangeTen(e.target.value)}
                  placeholder="VD: Hoàn thiện"
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
                  placeholder="VD: hoan-thien"
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
                onClick={() => navigate("/haiadmin/ql-phan")}
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
