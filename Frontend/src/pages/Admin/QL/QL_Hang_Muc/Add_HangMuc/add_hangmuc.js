import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./add_hangmuc.css";

const API = "https://api.nguyenhai.com.vn/api";

/* ========= helpers ========= */
async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!ct.includes("application/json")) {
    try {
      const data = JSON.parse(text);
      return { ok: res.ok, status: res.status, data };
    } catch {
      throw new Error(`Không nhận JSON từ ${url}. Status ${res.status}.`);
    }
  }
  const data = JSON.parse(text);
  return { ok: res.ok, status: res.status, data };
}

function toSlug(s = "") {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Add_HangMuc() {
  const navigate = useNavigate();
  const location = useLocation();

  // lấy preset từ list-page
  const phanIdFromState = location.state?.phanId || "";
  const nhomIdFromState = location.state?.nhomId || "";
  const cloneFrom = location.state?.cloneFrom || null;

  // data
  const [phanOptions, setPhanOptions] = useState([]);
  const [phanId, setPhanId] = useState("");
  const [nhomOptions, setNhomOptions] = useState([]);

  // form
  const [form, setForm] = useState({
    nhom: "",
    ten: "",
    slug: "",
    loai: "thuong-hieu",
    thuTu: 0,
  });
  const [slugDirty, setSlugDirty] = useState(false);

  // ui
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });

  function showToast(msg, type = "success", duration = 1400, redirect = null) {
    setToast({ open: true, type, msg });
    setTimeout(() => {
      setToast({ open: false, type, msg: "" });
      if (redirect) navigate(redirect);
    }, duration);
  }

  /* ====== Loaders ====== */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchJson(`${API}/phan`, {
          credentials: "include",
        });
        const list = data?.duLieu || [];
        setPhanOptions(list);

        // chọn phần
        const firstPhan = phanIdFromState || list?.[0]?._id || "";
        setPhanId(firstPhan);

        // nếu cloneFrom: preset form
        if (cloneFrom) {
          const {
            ten = "",
            slug = "",
            loai = "thuong-hieu",
            thuTu = 0,
          } = cloneFrom || {};
          setForm((prev) => ({
            ...prev,
            ten,
            slug,
            loai,
            thuTu: thuTu ?? 0,
          }));
          setSlugDirty(Boolean(slug));
        }
      } catch (e) {
        console.error(e);
        showToast("Lỗi tải danh sách Phần", "error");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (!phanId) {
        setNhomOptions([]);
        setForm((f) => ({ ...f, nhom: "" }));
        return;
      }
      try {
        const { data } = await fetchJson(`${API}/nhom?phan=${phanId}`, {
          credentials: "include",
        });
        const list = data?.duLieu || [];
        setNhomOptions(list);

        // pick nhom theo ưu tiên: state -> current -> first
        const firstNhom = nhomIdFromState || form.nhom || list?.[0]?._id || "";
        setForm((prev) => ({ ...prev, nhom: firstNhom }));
      } catch (e) {
        console.error(e);
        showToast("Lỗi tải danh sách Nhóm", "error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phanId]);

  /* ====== Auto-sync slug ====== */
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

  /* ====== Submit ====== */
  async function submit(e, { goBackAfter = false } = {}) {
    e.preventDefault();
    if (!form.nhom?.trim()) return showToast("Vui lòng chọn Nhóm", "error");
    if (!form.ten?.trim()) return showToast("Vui lòng nhập Tên", "error");
    const slugNow = form.slug?.trim() || toSlug(form.ten);
    if (!slugNow) return showToast("Slug chưa hợp lệ", "error");

    setSaving(true);
    try {
      const payload = {
        nhom: form.nhom,
        ten: form.ten.trim(),
        slug: slugNow,
        loai: form.loai || "thuong-hieu",
        thuTu: Number(form.thuTu || 0),
      };
      const res = await fetch(`${API}/hangmuc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false) {
        throw new Error(json?.thongBao || "Tạo Hạng mục thất bại");
      }
      if (goBackAfter) {
        showToast("Đã tạo hạng mục!", "success", 900, "/haiadmin/ql-hang-muc");
      } else {
        showToast("Đã tạo hạng mục!", "success");
        // reset nếu không quay lại
        setForm({
          nhom: form.nhom,
          ten: "",
          slug: "",
          loai: "thuong-hieu",
          thuTu: 0,
        });
        setSlugDirty(false);
      }
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi tạo Hạng mục", "error");
    } finally {
      setSaving(false);
    }
  }

  const nhomLabel = useMemo(
    () => nhomOptions.find((n) => n._id === form.nhom)?.ten || "-",
    [nhomOptions, form.nhom]
  );

  return (
    <div className="vl-add-hm">
      {/* Toast */}
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="header">
        <h2>Thêm Hạng mục</h2>
        <div className="grow" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>

      <form
        className="card"
        onSubmit={(e) => submit(e, { goBackAfter: false })}
      >
        {loading ? (
          <div className="loading">
            <div className="spinner" /> Đang tải…
          </div>
        ) : (
          <>
            <div className="grid">
              <div className="field">
                <label>Phần</label>
                <select
                  className="inp"
                  value={phanId}
                  onChange={(e) => setPhanId(e.target.value)}
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
                <label>Nhóm</label>
                <select
                  className="inp"
                  value={form.nhom}
                  onChange={(e) => setForm({ ...form, nhom: e.target.value })}
                >
                  <option value="">-- chọn Nhóm --</option>
                  {nhomOptions.map((n) => (
                    <option key={n._id} value={n._id}>
                      {n.ten}
                    </option>
                  ))}
                </select>
                <small className="hint">Đang chọn: {nhomLabel}</small>
              </div>

              <div className="field">
                <label>Tên</label>
                <input
                  className="inp"
                  value={form.ten}
                  onChange={(e) => onChangeTen(e.target.value)}
                  placeholder="VD: Gạch lát nền 60x60"
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
                  placeholder="vd: gach-lat-nen-60x60"
                />
                {!slugDirty && (
                  <small className="hint">Slug đang tự đồng bộ theo tên</small>
                )}
                {slugDirty && (
                  <small className="hint">Bạn đã sửa slug thủ công</small>
                )}
              </div>

              <div className="field">
                <label>Loại</label>
                <select
                  className="inp"
                  value={form.loai}
                  onChange={(e) => setForm({ ...form, loai: e.target.value })}
                >
                  <option value="thuong-hieu">Thương hiệu</option>
                  <option value="loai">Loại</option>
                  <option value="khac">Khác</option>
                </select>
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
                onClick={() => navigate("/haiadmin/ql-hang-muc")}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn ghost"
                disabled={saving}
                onClick={(e) => submit(e, { goBackAfter: true })}
                title="Lưu & quay lại danh sách"
              >
                {saving ? "Đang lưu…" : "Lưu & quay lại"}
              </button>
              <button className="btn primary" disabled={saving}>
                {saving ? "Đang lưu…" : "Lưu"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
