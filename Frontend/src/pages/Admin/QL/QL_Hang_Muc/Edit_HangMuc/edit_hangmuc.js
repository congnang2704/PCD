import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./edit_hangmuc.css";

/** 🔧 BASE động: ENV -> window.__API__ -> auto local/prod */
const API = "https://api.nguyenhai.com.vn/api";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  let data;
  if (ct.includes("application/json")) data = JSON.parse(text);
  else {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }
  return { ok: res.ok, status: res.status, data };
}
const isObjectId = (v = "") => /^[a-f\d]{24}$/i.test(v);
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

export default function Edit_HangMuc() {
  const { id } = useParams(); // match route: /haiadmin/edit-hang-muc/:id (đảm bảo path router đúng tên)
  const navigate = useNavigate();
  const location = useLocation();

  const phanIdFromState = location.state?.phanId || "";
  const nhomIdFromState = location.state?.nhomId || "";

  const [phanOptions, setPhanOptions] = useState([]);
  const [phanId, setPhanId] = useState("");
  const [nhomOptions, setNhomOptions] = useState([]);

  const [form, setForm] = useState({
    nhom: "",
    ten: "",
    slug: "",
    loai: "thuong-hieu",
    thuTu: 0,
  });
  const [slugDirty, setSlugDirty] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });

  function showToast(msg, type = "success", duration = 1400, redirect = null) {
    setToast({ open: true, type, msg });
    setTimeout(() => {
      setToast({ open: false, type, msg: "" });
      if (redirect) navigate(redirect, { replace: true });
    }, duration);
  }

  useEffect(() => {
    (async () => {
      if (!isObjectId(id)) {
        showToast(
          "ID không hợp lệ. Quay lại danh sách.",
          "error",
          1200,
          "/haiadmin/ql-hang-muc"
        );
        return;
      }
      try {
        const [phanRes, hmRes] = await Promise.all([
          fetchJson(`${API}/phan`, { credentials: "include" }),
          fetchJson(`${API}/hangmuc/${id}`, { credentials: "include" }),
        ]);

        if (hmRes.status === 404) {
          showToast(
            hmRes.data?.thongBao || "Không tìm thấy Hạng mục",
            "error",
            1400,
            "/haiadmin/ql-hang-muc"
          );
          return;
        }
        if (!hmRes.ok)
          throw new Error(hmRes.data?.thongBao || "Lỗi lấy chi tiết");

        const phanList = phanRes.data?.duLieu || [];
        setPhanOptions(phanList);

        const hm = hmRes.data?.duLieu;
        const phanIdFromDoc = hm?.nhom?.phan?._id || "";
        const nhomIdFromDoc = hm?.nhom?._id || "";

        const chosenPhan =
          phanIdFromState || phanIdFromDoc || phanList?.[0]?._id || "";
        setPhanId(chosenPhan);

        setForm({
          nhom: nhomIdFromDoc || "",
          ten: hm?.ten || "",
          slug: hm?.slug || "",
          loai: hm?.loai || "thuong-hieu",
          thuTu: hm?.thuTu ?? 0,
        });
        setSlugDirty(Boolean(hm?.slug));

        if (chosenPhan) {
          const nhomRes = await fetchJson(`${API}/nhom?phan=${chosenPhan}`, {
            credentials: "include",
          });
          const nhoms = nhomRes.data?.duLieu || [];
          setNhomOptions(nhoms);
          const chosenNhom =
            nhomIdFromState || nhomIdFromDoc || nhoms?.[0]?._id || "";
          setForm((prev) => ({ ...prev, nhom: chosenNhom }));
        }
      } catch (e) {
        console.error(e);
        showToast(
          e.message || "Không tải được dữ liệu",
          "error",
          1400,
          "/haiadmin/ql-hang-muc"
        );
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
        if (!list.find((x) => x._id === form.nhom)) {
          setForm((prev) => ({ ...prev, nhom: list?.[0]?._id || "" }));
        }
      } catch (e) {
        console.error(e);
        showToast("Lỗi tải danh sách Nhóm", "error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phanId]);

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

  async function save(e, { goBackAfter = false } = {}) {
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
      const res = await fetch(`${API}/hangmuc/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Cập nhật Hạng mục thất bại");
      if (goBackAfter)
        showToast("Đã lưu thay đổi!", "success", 900, "/haiadmin/ql-hang-muc");
      else showToast("Đã lưu thay đổi!", "success");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi lưu", "error");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!window.confirm("Xoá hạng mục này?")) return;
    try {
      const res = await fetch(`${API}/hangmuc/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Xoá thất bại");
      showToast("Đã xoá!", "success", 900, "/haiadmin/ql-hang-muc");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi xoá", "error");
    }
  }

  const nhomLabel = useMemo(
    () => nhomOptions.find((n) => n._id === form.nhom)?.ten || "-",
    [nhomOptions, form.nhom]
  );

  return (
    <div className="vl-edit-hm">
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="header">
        <h2>Sửa Hạng mục</h2>
        <div className="grow" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
        <button className="btn danger" onClick={onDelete} title="Xoá hạng mục">
          Xoá
        </button>
      </div>

      <form className="card" onSubmit={(e) => save(e, { goBackAfter: false })}>
        {loading ? (
          <div className="loading">
            <div className="spinner" /> Đang tải dữ liệu…
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
                onClick={(e) => save(e, { goBackAfter: true })}
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
