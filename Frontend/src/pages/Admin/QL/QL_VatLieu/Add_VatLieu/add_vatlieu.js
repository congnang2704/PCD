import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./add_vatlieu.css";

/** 🔧 BASE động: ENV -> window.__API__ -> auto local/prod */
const API = "https://api.nguyenhai.com.vn/api";

/* ========= helpers ========= */
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

export default function Add_VatLieu({ onDone }) {
  const navigate = useNavigate();
  const location = useLocation();
  const phanIdInit = location.state?.phanId || "";
  const nhomIdInit = location.state?.nhomId || "";
  const hmIdInit = location.state?.hmId || "";

  // Cascading data
  const [phan, setPhan] = useState([]);
  const [phanId, setPhanId] = useState("");
  const [nhom, setNhom] = useState([]);
  const [nhomId, setNhomId] = useState("");
  const [hm, setHm] = useState([]);

  // Form data
  const [form, setForm] = useState({
    hangMuc: "",
    ma: "",
    ten: "",
    thuongHieu: "",
    loai: "",
    thuTu: 0,
  });

  // Images selection (multi)
  const [images, setImages] = useState([]); // [{file, url, moTa}]
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ total: 0, done: 0 });
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });

  function showToast(msg, type = "success", duration = 1400, redirect = null) {
    setToast({ open: true, type, msg });
    setTimeout(() => {
      setToast({ open: false, type, msg: "" });
      if (redirect) navigate(redirect, { replace: true });
    }, duration);
  }

  /* ===== Loaders ===== */
  useEffect(() => {
    (async () => {
      const r = await fetch(`${API}/phan`, { credentials: "include" });
      const j = await r.json();
      const list = j.duLieu || [];
      setPhan(list);
      const first = phanIdInit || list?.[0]?._id || "";
      setPhanId((prev) => prev || first);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (!phanId) {
        setNhom([]);
        setNhomId("");
        return;
      }
      const r = await fetch(`${API}/nhom?phan=${phanId}`, {
        credentials: "include",
      });
      const j = await r.json();
      const list = j.duLieu || [];
      setNhom(list);
      const first = nhomIdInit || list?.[0]?._id || "";
      setNhomId((prev) => prev || first);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phanId]);

  useEffect(() => {
    (async () => {
      if (!nhomId) {
        setHm([]);
        setForm((f) => ({ ...f, hangMuc: "" }));
        return;
      }
      const r = await fetch(`${API}/hangmuc?nhom=${nhomId}`, {
        credentials: "include",
      });
      const j = await r.json();
      const list = j.duLieu || [];
      setHm(list);
      const first = hmIdInit || list?.[0]?._id || "";
      setForm((f) => ({ ...f, hangMuc: f.hangMuc || first }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nhomId]);

  /* ===== Image handling ===== */
  function onPickFiles(e) {
    const fl = Array.from(e.target.files || []);
    if (!fl.length) return;
    const next = fl.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      moTa: "",
    }));
    setImages((prev) => [...prev, ...next]);
    e.target.value = "";
  }
  function removeImage(idx) {
    setImages((prev) => {
      const copy = [...prev];
      const x = copy[idx];
      if (x?.url) URL.revokeObjectURL(x.url);
      copy.splice(idx, 1);
      return copy;
    });
  }
  function updateImageCaption(idx, v) {
    setImages((prev) => {
      const copy = [...prev];
      if (copy[idx]) copy[idx].moTa = v;
      return copy;
    });
  }

  const canSubmit = useMemo(() => {
    return form.hangMuc && form.ma.trim();
  }, [form.hangMuc, form.ma]);

  /* ===== Submit (create + upload images in one flow) ===== */
  async function submitAll(e) {
    e.preventDefault();
    if (!canSubmit) return showToast("Chọn Hạng mục & nhập Mã", "error");
    setLoading(true);
    try {
      // 1) Upsert/Create vật liệu
      const payload = {
        hangMuc: form.hangMuc,
        ma: form.ma.trim().toUpperCase(),
        ten: form.ten?.trim() || "",
        thuongHieu: form.thuongHieu?.trim() || "",
        loai: form.loai?.trim() || "",
        thuTu: Number(form.thuTu || 0),
      };
      const res = await fetch(`${API}/vatlieu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false) {
        throw new Error(json?.thongBao || "Lưu vật liệu thất bại");
      }

      // 2) Upload ảnh (nếu có)
      if (images.length) {
        setUploading({ total: images.length, done: 0 });
        for (let i = 0; i < images.length; i++) {
          const it = images[i];
          const fd = new FormData();
          fd.append("file", it.file);
          fd.append("moTa", it.moTa || "");
          const upRes = await fetch(
            `${API}/vatlieu/${encodeURIComponent(payload.ma)}/anh`,
            {
              method: "POST",
              body: fd,
              credentials: "include",
            }
          );
          const upJson = await upRes.json().catch(() => ({}));
          if (!upRes.ok || upJson?.thanhCong === false) {
            throw new Error(
              upJson?.thongBao || `Upload ảnh thất bại tại ảnh #${i + 1}`
            );
          }
          setUploading({ total: images.length, done: i + 1 });
        }
      }

      // 3) Done
      showToast(
        images.length ? "Đã lưu + upload ảnh xong!" : "Đã lưu vật liệu!",
        "success"
      );
      // reset form
      setForm({
        hangMuc: form.hangMuc,
        ma: "",
        ten: "",
        thuongHieu: "",
        loai: "",
        thuTu: 0,
      });
      images.forEach((x) => x.url && URL.revokeObjectURL(x.url));
      setImages([]);
      setUploading({ total: 0, done: 0 });
      onDone && onDone();
    } catch (e2) {
      console.error(e2);
      showToast(e2.message || "Lỗi lưu/upload", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vl-add-vl">
      {/* Toast */}
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="header">
        <h2>Thêm / Upsert Vật liệu</h2>
        <div className="grow" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>

      <form className="card" onSubmit={submitAll}>
        <div className="row gap">
          <select
            className="sel"
            value={phanId}
            onChange={(e) => {
              setPhanId(e.target.value);
              setNhomId("");
            }}
          >
            {phan.map((p) => (
              <option key={p._id} value={p._id}>
                {p.ten}
              </option>
            ))}
          </select>
          <select
            className="sel"
            value={nhomId}
            onChange={(e) => {
              setNhomId(e.target.value);
            }}
          >
            {nhom.map((n) => (
              <option key={n._id} value={n._id}>
                {n.ten}
              </option>
            ))}
          </select>
          <select
            className="sel"
            value={form.hangMuc}
            onChange={(e) => setForm({ ...form, hangMuc: e.target.value })}
          >
            <option value="">-- chọn Hạng mục --</option>
            {hm.map((h) => (
              <option key={h._id} value={h._id}>
                {h.ten}
              </option>
            ))}
          </select>
        </div>

        <div className="grid">
          <div className="field">
            <label>Mã</label>
            <input
              className="inp"
              placeholder="VD: A62YE4DR"
              value={form.ma}
              onChange={(e) =>
                setForm({ ...form, ma: e.target.value.toUpperCase() })
              }
            />
          </div>
          <div className="field">
            <label>Tên</label>
            <input
              className="inp"
              placeholder="Tên vật liệu"
              value={form.ten}
              onChange={(e) => setForm({ ...form, ten: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Thương hiệu</label>
            <input
              className="inp"
              placeholder="VD: INAX"
              value={form.thuongHieu}
              onChange={(e) => setForm({ ...form, thuongHieu: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Loại</label>
            <input
              className="inp"
              placeholder="VD: Gạch ốp, gạch lát…"
              value={form.loai}
              onChange={(e) => setForm({ ...form, loai: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Thứ tự</label>
            <input
              className="inp"
              type="number"
              placeholder="VD: 1"
              value={form.thuTu}
              onChange={(e) => setForm({ ...form, thuTu: e.target.value })}
            />
          </div>
        </div>

        <div className="divider" />

        <div className="upload">
          <div className="upload-header">
            <div className="title">Ảnh vật liệu</div>
            {uploading.total > 0 && (
              <div className="progress">
                Đang upload: {uploading.done}/{uploading.total}
              </div>
            )}
          </div>

          <label className="dropzone">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onPickFiles}
              disabled={loading}
              style={{ display: "none" }}
            />
            <div className="dz-icon">🖼️</div>
            <div>Chọn hoặc kéo-thả ảnh vào đây (nhiều ảnh)</div>
          </label>

          {images.length > 0 && (
            <div className="previews">
              {images.map((img, idx) => (
                <div key={idx} className="pv">
                  <img src={img.url} alt="" />
                  <input
                    className="inp pv-caption"
                    placeholder="Mô tả ảnh (tuỳ chọn)"
                    value={img.moTa}
                    onChange={(e) => updateImageCaption(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn tiny danger"
                    onClick={() => removeImage(idx)}
                  >
                    Xoá
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn outline"
            onClick={() => navigate("/haiadmin/ql-vat-lieu")}
          >
            Huỷ
          </button>
          <button className="btn primary" disabled={loading || !canSubmit}>
            {loading
              ? "Đang lưu…"
              : images.length
              ? "Lưu + Upload ảnh"
              : "Lưu vật liệu"}
          </button>
        </div>
      </form>
    </div>
  );
}
