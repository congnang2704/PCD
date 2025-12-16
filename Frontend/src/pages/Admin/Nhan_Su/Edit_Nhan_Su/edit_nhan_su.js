import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../nhansu.css";

const API_BASE = "https://api.nguyenhai.com.vn/api/nhansu";

const toInputDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};
const toISODate = (d) => (d ? new Date(d).toISOString() : null);

export default function EditNhanSu() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    hoTen: "",
    chucVu: "",
    ngaySinh: "",
    gioiTinh: "Nam",
    namVaoLam: new Date().getFullYear(),
    trangThai: "Đang làm",
    ghiChu: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");

  const onChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const onFile = (f) => {
    const file = f?.target?.files?.[0];
    setAvatarFile(file || null);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${id}`);
      const json = await res.json();
      if (!json?.success) throw new Error("Không tìm thấy nhân sự");
      const v = json.data;
      setForm({
        hoTen: v.hoTen || "",
        chucVu: v.chucVu || "",
        ngaySinh: toInputDate(v.ngaySinh),
        gioiTinh: v.gioiTinh || "Nam",
        namVaoLam: v.namVaoLam || new Date().getFullYear(),
        trangThai: v.trangThai || "Đang làm",
        ghiChu: v.ghiChu || "",
      });
      setPreview(v.avatar || "/default-avatar.png");
    } catch (e) {
      console.error(e);
      // alert("Không tải được thông tin nhân sự.");
      nav("/haiadmin/ql-nhan-su");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.hoTen?.trim() || !form.chucVu?.trim()) {
      alert("Họ tên và Chức vụ là bắt buộc.");
      return;
    }
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "ngaySinh" && v) fd.append(k, toISODate(v));
      else fd.append(k, v ?? "");
    });
    if (avatarFile) fd.append("avatar", avatarFile);

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        body: fd,
      });
      const json = await res.json();
      if (json?.success) {
        // alert("Cập nhật thành công!");
        nav("/haiadmin/ql-nhan-su");
      } else {
        throw new Error(json?.error || "Cập nhật thất bại");
      }
    } catch (e) {
      console.error(e);
      alert("Có lỗi khi cập nhật.");
    }
  };

  if (loading) return <div className="ns-loading">Đang tải…</div>;

  return (
    <div className="ns-wrap">
      <div className="ns-topbar">
        <h1>Sửa nhân sự</h1>
        <div className="ns-actions">
          <button className="ns-btn ghost" onClick={() => nav(-1)}>
            ← Quay lại
          </button>
        </div>
      </div>

      <div className="ns-card">
        <form className="ns-form" onSubmit={onSubmit}>
          <div className="ns-grid">
            <div className="ns-col">
              <label>Họ tên *</label>
              <input
                className="ns-input"
                value={form.hoTen}
                onChange={(e) => onChange("hoTen", e.target.value)}
                required
              />

              <label>Chức vụ *</label>
              <input
                className="ns-input"
                value={form.chucVu}
                onChange={(e) => onChange("chucVu", e.target.value)}
                required
              />

              <label>Ngày sinh</label>
              <input
                type="date"
                className="ns-input"
                value={form.ngaySinh}
                onChange={(e) => onChange("ngaySinh", e.target.value)}
              />

              <label>Giới tính</label>
              <select
                className="ns-select"
                value={form.gioiTinh}
                onChange={(e) => onChange("gioiTinh", e.target.value)}
              >
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
            </div>

            <div className="ns-col">
              <label>Năm vào làm *</label>
              <input
                type="number"
                className="ns-input"
                min="1900"
                max="3000"
                value={form.namVaoLam}
                onChange={(e) => onChange("namVaoLam", Number(e.target.value))}
                required
              />

              <label>Trạng thái</label>
              <select
                className="ns-select"
                value={form.trangThai}
                onChange={(e) => onChange("trangThai", e.target.value)}
              >
                <option>Đang làm</option>
                <option>Nghỉ việc</option>
              </select>

              <label>Ghi chú</label>
              <textarea
                className="ns-textarea"
                rows={5}
                value={form.ghiChu}
                onChange={(e) => onChange("ghiChu", e.target.value)}
              />
            </div>

            <div className="ns-col">
              <label>Avatar</label>
              <div className="ns-avatar-uploader">
                <div className="ns-avatar preview">
                  <img
                    src={preview || "/default-avatar.png"}
                    alt="avatar"
                    onError={(e) =>
                      (e.currentTarget.src = "/default-avatar.png")
                    }
                  />
                </div>
                <input type="file" accept="image/*" onChange={onFile} />
                <small className="ns-hint">PNG/JPG/WEBP &lt;= 5MB</small>
              </div>
            </div>
          </div>

          <div className="ns-form-actions">
            <button className="ns-btn" type="submit">
              Lưu thay đổi
            </button>
            <button
              className="ns-btn ghost"
              type="button"
              onClick={() => nav(-1)}
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
