import React, { useEffect, useState } from "react";
import "./lien_he.css";

function LienHe() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // lưu id cần xoá
  const [message, setMessage] = useState(""); // thông báo sau khi xoá

  const fetchContacts = async () => {
    try {
      const res = await fetch("https://api.nguyenhai.com.vn/api/contacts");
      if (!res.ok) throw new Error("Lỗi tải danh sách liên hệ");
      const data = await res.json();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://api.nguyenhai.com.vn/api/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xoá thất bại");
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setFilteredContacts((prev) => prev.filter((c) => c._id !== id));
      setMessage("✅ Xoá liên hệ thành công!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("❌ " + err.message);
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  if (loading)
    return <p className="loading">⏳ Đang tải danh sách liên hệ...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="lienhe-container">
      {/* Thông báo */}
      {message && <div className="alert-popup">{message}</div>}

      <div className="header-actions">
        <h2>Danh sách Liên Hệ</h2>
        <button
          className="btn btn-add"
          onClick={() => (window.location.href = "/haiadmin/add-ql-lien-he")}
        >
          + Thêm mới
        </button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc email..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredContacts.length === 0 ? (
        <p>Không tìm thấy liên hệ phù hợp.</p>
      ) : (
        <table className="lienhe-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Diện tích & số tầng</th>
              <th>Địa phương</th>
              <th>Ngân sách</th>
              <th>Loại form</th>
              <th>Nội dung</th>
              <th>Ngày gửi</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(
              ({
                _id,
                name,
                email,
                phone,
                area_floor,
                location,
                budget,
                form_type,
                message,
                created_at,
              }) => (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone || "-"}</td>
                  <td>{area_floor || "-"}</td>
                  <td>{location || "-"}</td>
                  <td>{budget || "-"}</td>
                  <td>{form_type || "-"}</td>
                  <td className="message-cell" title={message}>
                    {message?.length > 50
                      ? message.slice(0, 50) + "..."
                      : message}
                  </td>
                  <td>{new Date(created_at).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        (window.location.href = `/haiadmin/edit-ql-lien-he/${_id}`)
                      }
                      className="btn btn-edit"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(_id)}
                      className="btn btn-delete"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {/* Modal xác nhận */}
      {confirmDeleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bạn có chắc muốn xoá?</h3>
            <div className="modal-actions">
              <button
                className="btn btn-cancel"
                onClick={() => setConfirmDeleteId(null)}
              >
                Huỷ
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LienHe;
