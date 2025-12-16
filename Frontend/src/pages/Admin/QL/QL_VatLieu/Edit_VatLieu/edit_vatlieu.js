import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./edit_vatlieu.css";

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
const isObjectId = (v = "") => /^[a-f\d]{24}$/i.test(v);
function safeUpper(v = "") {
  return String(v || "")
    .trim()
    .toUpperCase();
}

export default function Edit_VatLieu() {
  const { id } = useParams(); // /haiadmin/edit-vat-lieu/:id
  const navigate = useNavigate();
  const location = useLocation();

  const phanIdFromState = location.state?.phanId || "";
  const nhomIdFromState = location.state?.nhomId || "";
  const hmIdFromState = location.state?.hmId || "";

  // Cascading options
  const [phanOptions, setPhanOptions] = useState([]);
  const [phanId, setPhanId] = useState("");

  const [nhomOptions, setNhomOptions] = useState([]);
  const [nhomId, setNhomId] = useState("");

  const [hmOptions, setHmOptions] = useState([]);

  // Form data
  const [form, setForm] = useState({
    hangMuc: "",
    ma: "",
    ten: "",
    thuongHieu: "",
    loai: "",
    thuTu: 0,
    thongSo: "",
    tuKhoa: "",
  });

  const [originalMa, setOriginalMa] = useState(""); // khoá upload
  const maDirty = useMemo(
    () => safeUpper(form.ma) !== originalMa,
    [form.ma, originalMa]
  );

  // Images local state for upload
  const [images, setImages] = useState([]); // [{file, url, moTa}]
  const [uploading, setUploading] = useState({ total: 0, done: 0 });

  // UI
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

  /* =================== Loaders =================== */
  useEffect(() => {
    (async () => {
      if (!isObjectId(id)) {
        showToast(
          "ID không hợp lệ. Quay lại danh sách.",
          "error",
          1200,
          "/haiadmin/ql-vat-lieu"
        );
        return;
      }
      try {
        const [phanRes, vlRes] = await Promise.all([
          fetchJson(`${API}/phan`, { credentials: "include" }),
          fetchJson(`${API}/vatlieu/${id}`, { credentials: "include" }),
        ]);

        // fallback theo mã nếu BE 404 theo _id
        let detail = vlRes;
        if (vlRes.status === 404) {
          const fb = await fetchJson(`${API}/vatlieu/ma/${id}`, {
            credentials: "include",
          });
          if (fb.ok && fb.data?.duLieu) detail = fb;
        }
        if (detail.status === 404) {
          showToast(
            detail.data?.thongBao || "Không tìm thấy Vật liệu",
            "error",
            1400,
            "/haiadmin/ql-vat-lieu"
          );
          return;
        }
        if (!detail.ok)
          throw new Error(detail.data?.thongBao || "Lỗi lấy chi tiết");

        const phanList = phanRes.data?.duLieu || [];
        setPhanOptions(phanList);

        const d = detail.data?.duLieu || {};
        const phanIdDoc = d?.hangMuc?.nhom?.phan?._id || "";
        const nhomIdDoc = d?.hangMuc?.nhom?._id || "";
        const hmIdDoc = d?.hangMuc?._id || "";

        const chosenPhan =
          phanIdFromState || phanIdDoc || phanList?.[0]?._id || "";
        setPhanId(chosenPhan);

        setForm({
          hangMuc: hmIdFromState || hmIdDoc || "",
          ma: d?.ma || "",
          ten: d?.ten || "",
          thuongHieu: d?.thuongHieu || "",
          loai: d?.loai || "",
          thuTu: d?.thuTu ?? 0,
          thongSo:
            typeof d?.thongSo === "string"
              ? d.thongSo
              : d?.thongSo
              ? JSON.stringify(d.thongSo, null, 2)
              : "",
          tuKhoa: Array.isArray(d?.tuKhoa)
            ? d.tuKhoa.join(", ")
            : d?.tuKhoa || "",
        });
        setOriginalMa(safeUpper(d?.ma || ""));

        if (chosenPhan) {
          const nhomRes = await fetchJson(`${API}/nhom?phan=${chosenPhan}`, {
            credentials: "include",
          });
          const nhoms = nhomRes.data?.duLieu || [];
          setNhomOptions(nhoms);
          const chosenNhom =
            nhomIdFromState || nhomIdDoc || nhoms?.[0]?._id || "";
          setNhomId(chosenNhom);

          if (chosenNhom) {
            const hmRes = await fetchJson(`${API}/hangmuc?nhom=${chosenNhom}`, {
              credentials: "include",
            });
            const hms = hmRes.data?.duLieu || [];
            setHmOptions(hms);
            const chosenHm = hmIdFromState || hmIdDoc || hms?.[0]?._id || "";
            setForm((prev) => ({ ...prev, hangMuc: chosenHm }));
          }
        }
      } catch (e) {
        console.error(e);
        showToast(
          e.message || "Không tải được dữ liệu",
          "error",
          1400,
          "/haiadmin/ql-vat-lieu"
        );
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Đổi phần -> load nhóm
  useEffect(() => {
    (async () => {
      if (!phanId) {
        setNhomOptions([]);
        setNhomId("");
        setHmOptions([]);
        setForm((f) => ({ ...f, hangMuc: "" }));
        return;
      }
      try {
        const { data } = await fetchJson(`${API}/nhom?phan=${phanId}`, {
          credentials: "include",
        });
        const list = data?.duLieu || [];
        setNhomOptions(list);
        const keepOrFirst =
          list.find((x) => x._id === nhomId)?._id || list?.[0]?._id || "";
        setNhomId(keepOrFirst);
      } catch (e) {
        console.error(e);
        showToast("Lỗi tải danh sách Nhóm", "error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phanId]);

  // Đổi nhóm -> load hạng mục
  useEffect(() => {
    (async () => {
      if (!nhomId) {
        setHmOptions([]);
        setForm((f) => ({ ...f, hangMuc: "" }));
        return;
      }
      try {
        const { data } = await fetchJson(`${API}/hangmuc?nhom=${nhomId}`, {
          credentials: "include",
        });
        const list = data?.duLieu || [];
        setHmOptions(list);
        setForm((prev) => ({
          ...prev,
          hangMuc:
            list.find((x) => x._id === prev.hangMuc)?._id ||
            list?.[0]?._id ||
            "",
        }));
      } catch (e) {
        console.error(e);
        showToast("Lỗi tải danh sách Hạng mục", "error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nhomId]);

  /* ============ Form handlers ============ */
  function setField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  /* ============ Save / Delete ============ */
  async function save(e, { back = false } = {}) {
    e.preventDefault();
    if (!form.hangMuc) return showToast("Vui lòng chọn Hạng mục", "error");
    if (!form.ma?.trim()) return showToast("Nhập Mã vật liệu", "error");

    setSaving(true);
    try {
      const payload = {
        hangMuc: form.hangMuc,
        ma: safeUpper(form.ma),
        ten: form.ten?.trim() || "",
        thuongHieu: form.thuongHieu?.trim() || "",
        loai: form.loai?.trim() || "",
        thuTu: Number(form.thuTu || 0),
        thongSo: form.thongSo || "",
        tuKhoa: form.tuKhoa || "",
      };
      const res = await fetch(`${API}/vatlieu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Cập nhật thất bại");

      setOriginalMa(safeUpper(payload.ma));

      if (back)
        showToast("Đã lưu thay đổi!", "success", 900, "/haiadmin/ql-vat-lieu");
      else showToast("Đã lưu thay đổi!", "success");
    } catch (e2) {
      console.error(e2);
      showToast(e2.message || "Lỗi lưu", "error");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!window.confirm("Xoá vật liệu này?")) return;
    try {
      const res = await fetch(`${API}/vatlieu/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Xoá thất bại");
      showToast("Đã xoá!", "success", 900, "/haiadmin/ql-vat-lieu");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi xoá", "error");
    }
  }

  /* ============ Images ============ */
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
  function removeLocal(idx) {
    setImages((prev) => {
      const cp = [...prev];
      const it = cp[idx];
      if (it?.url) URL.revokeObjectURL(it.url);
      cp.splice(idx, 1);
      return cp;
    });
  }

  async function uploadAll() {
    if (maDirty)
      return showToast(
        "Bạn vừa đổi Mã. Hãy Lưu trước khi upload ảnh!",
        "error"
      );
    if (!images.length) return;
    setUploading({ total: images.length, done: 0 });
    try {
      for (let i = 0; i < images.length; i++) {
        const it = images[i];
        const fd = new FormData();
        fd.append("file", it.file);
        fd.append("moTa", it.moTa || "");
        // 🔴 FIX: dùng prefix /ma
        const upRes = await fetch(
          `${API}/vatlieu/ma/${encodeURIComponent(originalMa)}/anh`,
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
      // clear & reload
      images.forEach((x) => x.url && URL.revokeObjectURL(x.url));
      setImages([]);
      await reloadDetailOnly();
      showToast("Upload ảnh xong!", "success");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi upload ảnh", "error");
    } finally {
      setUploading({ total: 0, done: 0 });
    }
  }

  async function deleteImage(idAnh) {
    if (maDirty)
      return showToast("Bạn vừa đổi Mã. Hãy Lưu trước khi xoá ảnh!", "error");
    if (!window.confirm("Xoá ảnh này?")) return;
    try {
      // 🔴 FIX: dùng prefix /ma
      const res = await fetch(
        `${API}/vatlieu/ma/${encodeURIComponent(originalMa)}/anh/${idAnh}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.thanhCong === false)
        throw new Error(json?.thongBao || "Xoá ảnh thất bại");
      await reloadDetailOnly();
      showToast("Đã xoá ảnh!", "success");
    } catch (e) {
      console.error(e);
      showToast(e.message || "Lỗi xoá ảnh", "error");
    }
  }

  async function reloadDetailOnly() {
    try {
      const vlRes = await fetchJson(`${API}/vatlieu/${id}`, {
        credentials: "include",
      });
      const d = vlRes.data?.duLieu || {};
      setForm((prev) => ({
        ...prev,
        ma: d.ma || prev.ma,
        ten: d.ten ?? prev.ten,
        thuongHieu: d.thuongHieu ?? prev.thuongHieu,
        loai: d.loai ?? prev.loai,
        thuTu: d.thuTu ?? prev.thuTu,
        thongSo:
          typeof d?.thongSo === "string"
            ? d.thongSo
            : d?.thongSo
            ? JSON.stringify(d.thongSo, null, 2)
            : prev.thongSo,
        tuKhoa: Array.isArray(d?.tuKhoa)
          ? d.tuKhoa.join(", ")
          : d?.tuKhoa ?? prev.tuKhoa,
      }));
      setOriginalMa(safeUpper(d?.ma || ""));
      setServerImages(d?.anh || []);
    } catch (e) {
      console.error(e);
    }
  }

  const [serverImages, setServerImages] = useState([]);
  useEffect(() => {
    if (!loading) {
      (async () => {
        const vlRes = await fetchJson(`${API}/vatlieu/${id}`, {
          credentials: "include",
        });
        setServerImages(vlRes.data?.duLieu?.anh || []);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const nhomLabel = useMemo(
    () => nhomOptions.find((n) => n._id === nhomId)?.ten || "-",
    [nhomOptions, nhomId]
  );
  const hmLabel = useMemo(
    () => hmOptions.find((h) => h._id === form.hangMuc)?.ten || "-",
    [hmOptions, form.hangMuc]
  );

  return (
    <div className="vl-edit-vl">
      {/* Toast */}
      {toast.open && (
        <div className="toast-overlay">
          <div className={`toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
          </div>
        </div>
      )}

      <div className="header">
        <h2>Sửa Vật liệu</h2>
        <div className="grow" />
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
        <button className="btn danger" onClick={onDelete}>
          Xoá
        </button>
      </div>

      <form className="card" onSubmit={(e) => save(e, { back: false })}>
        {loading ? (
          <div className="loading">
            <div className="spinner" /> Đang tải dữ liệu…
          </div>
        ) : (
          <>
            {/* Cascading selects */}
            <div className="row gap">
              <select
                className="sel"
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

              <select
                className="sel"
                value={nhomId}
                onChange={(e) => setNhomId(e.target.value)}
              >
                <option value="">-- chọn Nhóm --</option>
                {nhomOptions.map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.ten}
                  </option>
                ))}
              </select>

              <select
                className="sel"
                value={form.hangMuc}
                onChange={(e) => setField("hangMuc", e.target.value)}
              >
                <option value="">-- chọn Hạng mục --</option>
                {hmOptions.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.ten}
                  </option>
                ))}
              </select>

              <div className="ctx-hint">
                <div>
                  Nhóm: <b>{nhomLabel}</b>
                </div>
                <div>
                  Hạng mục: <b>{hmLabel}</b>
                </div>
              </div>
            </div>

            {/* Grid form */}
            <div className="grid">
              <div className="field">
                <label>Mã</label>
                <input
                  className="inp"
                  value={form.ma}
                  onChange={(e) => setField("ma", e.target.value.toUpperCase())}
                />
                {maDirty && (
                  <small className="hint error">
                    Bạn đổi Mã — cần “Lưu” trước khi upload/xoá ảnh
                  </small>
                )}
              </div>

              <div className="field">
                <label>Tên</label>
                <input
                  className="inp"
                  value={form.ten}
                  onChange={(e) => setField("ten", e.target.value)}
                  placeholder="VD: Gạch lát 60x60"
                />
              </div>

              <div className="field">
                <label>Thương hiệu</label>
                <input
                  className="inp"
                  value={form.thuongHieu}
                  onChange={(e) => setField("thuongHieu", e.target.value)}
                  placeholder="VD: INAX"
                />
              </div>

              <div className="field">
                <label>Loại</label>
                <input
                  className="inp"
                  value={form.loai}
                  onChange={(e) => setField("loai", e.target.value)}
                  placeholder="VD: Gạch ốp, gạch lát…"
                />
              </div>

              <div className="field">
                <label>Thứ tự</label>
                <input
                  className="inp"
                  type="number"
                  value={form.thuTu}
                  onChange={(e) => setField("thuTu", e.target.value)}
                  placeholder="VD: 1"
                />
              </div>

              <div className="field span-2">
                <label>Thông số (text/JSON)</label>
                <textarea
                  className="ta"
                  rows={5}
                  value={form.thongSo}
                  onChange={(e) => setField("thongSo", e.target.value)}
                  placeholder='VD: {"kho":"60x60","mau":"trang"}'
                />
              </div>

              <div className="field span-2">
                <label>Từ khoá (phân tách bằng dấu phẩy)</label>
                <input
                  className="inp"
                  value={form.tuKhoa}
                  onChange={(e) => setField("tuKhoa", e.target.value)}
                  placeholder="gach, 60x60, men-bong"
                />
              </div>
            </div>

            <div className="actions">
              <button
                type="button"
                className="btn outline"
                onClick={() => navigate("/haiadmin/ql-vat-lieu")}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn ghost"
                disabled={saving}
                onClick={(e) => save(e, { back: true })}
              >
                {saving ? "Đang lưu…" : "Lưu & quay lại"}
              </button>
              <button className="btn primary" disabled={saving}>
                {saving ? "Đang lưu…" : "Lưu"}
              </button>
            </div>

            <div className="divider" />

            {/* Images manager */}
            <div className="upload">
              <div className="upload-header">
                <div className="title">Ảnh vật liệu</div>
                {uploading.total > 0 && (
                  <div className="progress">
                    Đang upload: {uploading.done}/{uploading.total}
                  </div>
                )}
              </div>

              <div className="server-images">
                {(serverImages || []).length === 0 && (
                  <div className="empty">Chưa có ảnh nào</div>
                )}
                {(serverImages || []).length > 0 && (
                  <div className="imgs">
                    {serverImages.map((a) => (
                      <div key={a._id} className="img-item">
                        <a
                          href={a.duongDan}
                          target="_blank"
                          rel="noreferrer"
                          title={a.moTa || ""}
                        >
                          <img
                            src={a.duongDan}
                            alt={a.moTa || ""}
                            onError={(ev) => {
                              ev.currentTarget.src = "/noimg.png";
                            }}
                          />
                        </a>
                        <div className="row">
                          <div className="cap" title={a.moTa || ""}>
                            {a.moTa || "-"}
                          </div>
                          <button
                            type="button"
                            className="btn tiny danger"
                            disabled={maDirty}
                            onClick={() => deleteImage(a._id)}
                            title={
                              maDirty
                                ? "Lưu mã mới trước khi xoá ảnh"
                                : "Xoá ảnh"
                            }
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label
                className={`dropzone ${maDirty ? "disabled" : ""}`}
                title={
                  maDirty ? "Lưu mã mới trước khi upload" : "Chọn ảnh để upload"
                }
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={maDirty}
                  style={{ display: "none" }}
                  onChange={onPickFiles}
                />
                <div className="dz-icon">🖼️</div>
                <div>
                  {maDirty
                    ? "Bạn đã đổi Mã — vui lòng LƯU trước"
                    : "Chọn hoặc kéo-thả ảnh vào đây (nhiều ảnh)"}
                </div>
              </label>

              {images.length > 0 && (
                <>
                  <div className="previews">
                    {images.map((img, idx) => (
                      <div key={idx} className="pv">
                        <img src={img.url} alt="" />
                        <input
                          className="inp pv-caption"
                          placeholder="Mô tả ảnh (tuỳ chọn)"
                          value={img.moTa}
                          onChange={(e) => {
                            const v = e.target.value;
                            setImages((prev) => {
                              const cp = [...prev];
                              if (cp[idx]) cp[idx].moTa = v;
                              return cp;
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="btn tiny danger"
                          onClick={() => removeLocal(idx)}
                        >
                          Xoá
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="actions right">
                    <button
                      type="button"
                      className="btn primary"
                      disabled={uploading.total > 0 || maDirty}
                      onClick={uploadAll}
                    >
                      {uploading.total > 0
                        ? `Đang upload ${uploading.done}/${uploading.total}…`
                        : "Tải ảnh lên"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
