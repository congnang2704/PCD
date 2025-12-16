import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Add_Bai_Viet/add_bai_viet.css"; // tái dùng style form & editor
import "./edit_bai_viet.css";

const API_BASE = "https://api.nguyenhai.com.vn/api/blogs";
const CATE_API = "https://api.nguyenhai.com.vn/api/categories";

/* =============================== Mini Modal =============================== */
function CenterModal({ open, title, message, onClose, kind = "info" }) {
  if (!open) return null;

  const colors = {
    info: "#2563eb",
    success: "#16a34a",
    error: "#dc2626",
    warn: "#d97706",
  };
  const bar = colors[kind] || colors.info;

  const wrap = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
  };
  const card = {
    width: "min(520px, 100%)",
    background: "white",
    borderRadius: 14,
    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
    overflow: "hidden",
  };
  const head = {
    padding: "14px 18px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  };
  const badge = {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bar,
  };
  const body = {
    padding: "16px 18px",
    color: "#111827",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  };
  const foot = {
    padding: "12px 18px",
    borderTop: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  };
  const btn = {
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "#111827",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={wrap} onClick={onClose}>
      <div style={card} onClick={(e) => e.stopPropagation()}>
        <div style={head}>
          <div style={badge} />
          <div style={{ fontWeight: 700 }}>{title}</div>
        </div>
        <div style={body}>{message}</div>
        <div style={foot}>
          <button style={btn} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
/* ============================ End Mini Modal ============================== */

/* =============================== Utils =============================== */
// sanitize cơ bản: gỡ script/style, on* attrs, javascript: trong href/src
function sanitizeHtml(html = "") {
  if (!html) return "";
  let safe = String(html);

  // strip script/style blocks
  safe = safe.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1>/gi, "");

  // remove inline event handlers on*, case-insensitive
  safe = safe.replace(/\s(on[a-z]+)\s*=\s*(".*?"|'.*?'|\{[\s\S]*?\})/gi, "");

  // neutralize javascript: in href/src
  safe = safe.replace(
    /\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi,
    ' $1="#"'
  );

  // remove data URLs that could be dangerous except images
  safe = safe.replace(
    /\s(src)\s*=\s*(['"])\s*data:(?!image\/)[\s\S]*?\2/gi,
    ""
  );

  return safe;
}

// chèn HTML tại caret an toàn
function insertHtmlAtCursor(html) {
  try {
    const sel = window.getSelection?.();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node,
      lastNode = null;
    while ((node = el.firstChild)) lastNode = frag.appendChild(node);
    range.insertNode(frag);
    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } catch {}
}

function slugify(text) {
  return (text || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* =============================== Rich Editor =============================== */
const RichEditor = ({ value, onChange }) => {
  const ref = useRef(null);
  const fileInputRef = useRef(null);

  const [html, setHtml] = useState(value || "<p><br/></p>");
  const [focused, setFocused] = useState(false);

  // mount: set nội dung ban đầu
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = html;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // khi parent đổi value trong lúc KHÔNG focus -> sync vào DOM
  useEffect(() => {
    if (!focused && typeof value === "string" && value !== html) {
      const val = value || "<p><br/></p>";
      setHtml(val);
      if (ref.current && ref.current.innerHTML !== val) {
        ref.current.innerHTML = val;
      }
    }
  }, [value, focused, html]);

  const focusEditor = () => ref.current?.focus();

  const exec = (cmd, val = null) => {
    focusEditor();
    try {
      document.execCommand("styleWithCSS", false, true);
      document.execCommand(cmd, false, val);
    } catch {}
    const cur = ref.current?.innerHTML || "";
    setHtml(cur);
    onChange?.(cur);
  };

  const applyFormatBlock = (block) => exec("formatBlock", block);

  const onPaste = (e) => {
    e.preventDefault();
    const cd = e.clipboardData;
    const raw = cd.getData("text/html") || cd.getData("text/plain") || "";
    const clean = sanitizeHtml(raw).replace(/\n/g, "<br>");
    insertHtmlAtCursor(clean);
    const cur = ref.current?.innerHTML || "";
    setHtml(cur);
    onChange?.(cur);
  };

  const onInput = () => {
    const cur = ref.current?.innerHTML || "";
    setHtml(cur);
    onChange?.(cur);
  };

  const addLink = () => {
    const url = prompt("Nhập URL:");
    if (!url) return;
    const safeUrl = /^https?:\/\//i.test(url) ? url : "#";
    exec("createLink", safeUrl);
  };

  const addImageByUrl = () => {
    const url = prompt("Nhập URL ảnh (http/https):");
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) return alert("URL không hợp lệ");
    insertHtmlAtCursor(`<img src="${url}" alt="" />`);
    const cur = ref.current?.innerHTML || "";
    setHtml(cur);
    onChange?.(cur);
  };

  const onPickImage = () => fileInputRef.current?.click();

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      insertHtmlAtCursor(`<img src="${reader.result}" alt="" />`);
      const cur = ref.current?.innerHTML || "";
      setHtml(cur);
      onChange?.(cur);
      e.target.value = "";
    };
    reader.readAsDataURL(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const img = Array.from(e.dataTransfer.files || []).find((f) =>
      f.type.startsWith("image/")
    );
    if (!img) return;
    const reader = new FileReader();
    reader.onload = () => {
      insertHtmlAtCursor(`<img src="${reader.result}" alt="" />`);
      const cur = ref.current?.innerHTML || "";
      setHtml(cur);
      onChange?.(cur);
    };
    reader.readAsDataURL(img);
  };

  const insertTable = () => {
    insertHtmlAtCursor(
      `<table class="re-table"><tbody><tr><td>Ô 1</td><td>Ô 2</td></tr><tr><td>Ô 3</td><td>Ô 4</td></tr></tbody></table>`
    );
    const cur = ref.current?.innerHTML || "";
    setHtml(cur);
    onChange?.(cur);
  };

  const insertShortcode = (type) => {
    const map = {
      note: `<div class="sc-note"><strong>Note:</strong> Nội dung ghi chú…</div>`,
      warn: `<div class="sc-warn"><strong>Warning:</strong> Nội dung cảnh báo…</div>`,
      tip: `<div class="sc-tip"><strong>Tip:</strong> Mẹo nhanh…</div>`,
    };
    insertHtmlAtCursor(map[type]);
    const cur = ref.current?.innerHTML || "";
    setHtml(cur);
    onChange?.(cur);
  };

  const Btn = (props) => <button type="button" className="re-btn" {...props} />;

  return (
    <div className="re">
      <div className="re-toolbar">
        <div className="re-group">
          <select
            className="re-select"
            defaultValue="p"
            onChange={(e) => {
              const v = e.target.value;
              if (v === "p") applyFormatBlock("P");
              else if (v === "h2") applyFormatBlock("H2");
              else if (v === "h3") applyFormatBlock("H3");
              else if (v === "quote") applyFormatBlock("BLOCKQUOTE");
              e.target.value = "p";
            }}
            title="Formats"
          >
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="quote">Blockquote</option>
          </select>
          <Btn title="Bold" onClick={() => exec("bold")}>
            <b>B</b>
          </Btn>
          <Btn title="Italic" onClick={() => exec("italic")}>
            <i>I</i>
          </Btn>
          <Btn
            title="Danh sách chấm"
            onClick={() => exec("insertUnorderedList")}
          >
            •⃝
          </Btn>
          <Btn title="Danh sách số" onClick={() => exec("insertOrderedList")}>
            1.
          </Btn>
          <Btn title="Trích dẫn" onClick={() => applyFormatBlock("BLOCKQUOTE")}>
            “”
          </Btn>
        </div>

        <div className="re-group">
          <Btn title="Căn trái" onClick={() => exec("justifyLeft")}>
            ↤
          </Btn>
          <Btn title="Căn giữa" onClick={() => exec("justifyCenter")}>
            ↔
          </Btn>
          <Btn title="Căn phải" onClick={() => exec("justifyRight")}>
            ↦
          </Btn>
          <Btn title="Canh đều" onClick={() => exec("justifyFull")}>
            ≋
          </Btn>
        </div>

        <div className="re-group">
          <Btn title="Chèn link" onClick={addLink}>
            🔗
          </Btn>
          <Btn title="Bỏ link" onClick={() => exec("unlink")}>
            ⨂
          </Btn>
          <Btn title="Ảnh (URL)" onClick={addImageByUrl}>
            🖼 URL
          </Btn>
          <Btn title="Upload Ảnh" onClick={onPickImage}>
            ⬆️ Ảnh
          </Btn>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="re-hidden"
            onChange={onFileChange}
          />
          <Btn title="Chèn bảng 2x2" onClick={insertTable}>
            ▦
          </Btn>

          <div className="re-dropdown">
            <Btn title="Shortcodes">Shortcodes ▾</Btn>
            <div className="re-menu">
              <button type="button" onClick={() => insertShortcode("note")}>
                Note
              </button>
              <button type="button" onClick={() => insertShortcode("warn")}>
                Warning
              </button>
              <button type="button" onClick={() => insertShortcode("tip")}>
                Tip
              </button>
            </div>
          </div>
        </div>

        <div className="re-group">
          <Btn title="Hoàn tác" onClick={() => exec("undo")}>
            ↶
          </Btn>
          <Btn title="Làm lại" onClick={() => exec("redo")}>
            ↷
          </Btn>
          <Btn title="Xoá định dạng" onClick={() => exec("removeFormat")}>
            ⌫fmt
          </Btn>
        </div>
      </div>

      <div
        ref={ref}
        className="re-editor"
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onInput={onInput}
        onPaste={onPaste}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        aria-label="Soạn nội dung"
      />
      <div className="re-help">
        Mẹo: Kéo-thả ảnh để chèn nhanh. Dùng Shortcodes để thêm
        Note/Warning/Tip.
      </div>
    </div>
  );
};

/* ===================== Compact Multi-Select (name-based) ================== */
const CategoryMultiSelect = ({ categories, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const [kw, setKw] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggle = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const filtered = useMemo(() => {
    const q = kw.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) =>
      [c.name, c.type, c.slug].some((t) => (t || "").toLowerCase().includes(q))
    );
  }, [kw, categories]);

  return (
    <div className="ms" ref={ref}>
      <div
        className={`ms-control ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="ms-value">
          {selected.length === 0 ? (
            <span className="ms-placeholder">Chọn danh mục…</span>
          ) : (
            selected.map((n) => (
              <span
                key={n}
                className="ms-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(n);
                }}
              >
                {n} ✕
              </span>
            ))
          )}
        </div>
        <div className="ms-arrow">▾</div>
      </div>

      {open && (
        <div className="ms-dropdown" onClick={(e) => e.stopPropagation()}>
          <input
            className="ms-search"
            placeholder="Tìm theo tên/type/slug…"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
          />
          <div className="ms-list">
            {filtered.length === 0 ? (
              <div className="ms-empty">Không có danh mục</div>
            ) : (
              filtered.map((c) => {
                const checked = selected.includes(c.name);
                return (
                  <label
                    key={c._id || c.slug || c.name}
                    className={`ms-item ${checked ? "checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(c.name)}
                    />
                    <span className="ms-name">{c.name}</span>
                    <span className="ms-badge">{c.type}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* =============================== Page ===================================== */
const EditBaiViet = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    cover_image: "",
    galleryString: "",
    tagsString: "",
    status: "draft",
    is_active: true,
  });

  const [categories, setCategories] = useState([]);
  const [selectedCateNames, setSelectedCateNames] = useState([]);
  const [preCateIds, setPreCateIds] = useState([]); // fallback nếu API không populate name
  const [loadCateError, setLoadCateError] = useState("");

  // modal state
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    kind: "info",
  });

  // refs upload ảnh (giống trang Add)
  const coverFileRef = useRef(null);
  const galleryFilesRef = useRef(null);

  const pickCover = () => coverFileRef.current?.click();
  const onCoverFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((s) => ({ ...s, cover_image: String(reader.result) }));
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const pickGallery = () => galleryFilesRef.current?.click();
  const onGalleryFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = reject;
        r.readAsDataURL(file);
      });

    const imgs = await Promise.all(files.map((f) => toBase64(f)));

    setForm((s) => {
      const current = s.galleryString
        ? s.galleryString
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean)
        : [];
      const merged = [...current, ...imgs];
      return { ...s, galleryString: merged.join(", ") };
    });

    e.target.value = "";
  };

  const openModal = (opts) => setModal({ open: true, ...opts });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const fetchCategories = useCallback(async () => {
    const ac = new AbortController();
    try {
      const r = await fetch(CATE_API, { signal: ac.signal });
      const data = await r.json().catch(() => []);
      if (Array.isArray(data)) setCategories(data);
      else setCategories([]);
    } catch {
      setLoadCateError("Không tải được danh mục.");
    }
    return () => ac.abort();
  }, []);

  const fetchDetail = useCallback(async () => {
    const ac = new AbortController();
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/${id}`, { signal: ac.signal });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const b = await r.json();

      const galleryString = Array.isArray(b?.gallery)
        ? b.gallery.join(", ")
        : "";
      const tagsString = Array.isArray(b?.tags) ? b.tags.join(", ") : "";

      let names = [];
      let ids = [];
      const cat = b?.categoryIds;
      if (Array.isArray(cat) && cat.length) {
        names = cat.map((x) => x?.name).filter(Boolean);
        ids = cat
          .map((x) => (typeof x === "string" ? x : x?._id))
          .filter(Boolean);
      }

      setForm({
        title: b?.title || "",
        slug: b?.slug || "",
        description: b?.description || "",
        content: b?.content || "",
        cover_image: b?.cover_image || "",
        galleryString,
        tagsString,
        status: b?.status || "draft",
        is_active: !!b?.is_active,
      });

      if (names.length) setSelectedCateNames(names);
      else setPreCateIds(ids);
    } catch (e) {
      console.error(e);
      openModal({
        title: "Không tải được bài viết",
        message:
          "Có lỗi khi tải chi tiết bài viết. Bấm OK để quay lại danh sách.",
        kind: "error",
      });
      // sau khi đóng modal thì quay lại list
      const backAfterClose = () => {
        closeModal();
        nav("/haiadmin/bai-viet");
      };
      // override onClose 1 lần
      setModal((m) => ({ ...m, onClose: backAfterClose }));
      return;
    } finally {
      setLoading(false);
    }
    return () => ac.abort();
  }, [id, nav]);

  useEffect(() => {
    const abortCats = fetchCategories();
    const abortDetail = fetchDetail();
    return () => {
      if (typeof abortCats === "function") abortCats();
      if (typeof abortDetail === "function") abortDetail();
    };
  }, [fetchCategories, fetchDetail]);

  // Khi có categories mà chưa có names -> map id -> name
  useEffect(() => {
    if (
      preCateIds.length &&
      categories.length &&
      selectedCateNames.length === 0
    ) {
      const idToName = new Map(categories.map((c) => [String(c._id), c.name]));
      const names = preCateIds
        .map((id) => idToName.get(String(id)))
        .filter(Boolean);
      setSelectedCateNames(names);
    }
  }, [preCateIds, categories, selectedCateNames.length]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const onTitleBlur = () => {
    if (!form.slug.trim())
      setForm((s) => ({ ...s, slug: slugify(form.title) }));
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    if (saving) return;
    const cleanHtml = sanitizeHtml(form.content || "");
    if (!form.title.trim() || !cleanHtml.trim()) {
      openModal({
        title: "Thiếu thông tin",
        message: "Vui lòng nhập đầy đủ Tiêu đề và Nội dung trước khi lưu.",
        kind: "warn",
      });
      return;
    }
    setSaving(true);
    try {
      const nameToId = new Map(categories.map((c) => [c.name, c._id]));
      const categoryIds = selectedCateNames
        .map((n) => nameToId.get(n))
        .filter(Boolean);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        description: form.description,
        content: cleanHtml,
        cover_image: form.cover_image,
        gallery: form.galleryString
          ? form.galleryString
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean)
          : [],
        tags: form.tagsString
          ? form.tagsString
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean)
          : [],
        status: form.status,
        is_active: !!form.is_active,
        categoryIds,
      };

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let msg = "Update failed";
        try {
          const j = await res.json();
          if (j?.message) msg = j.message;
        } catch {}
        throw new Error(msg);
      }

      openModal({
        title: "Đã lưu thay đổi 🎉",
        message:
          "Bài viết đã được cập nhật. Bạn có thể tiếp tục chỉnh sửa tại trang này.",
        kind: "success",
      });
    } catch (err) {
      console.error(err);
      openModal({
        title: "Cập nhật thất bại",
        message:
          "Có lỗi khi cập nhật bài viết. Vui lòng thử lại hoặc kiểm tra dữ liệu/kết nối.",
        kind: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (publish) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish }),
      });
      if (!res.ok) throw new Error("Publish failed");
      await fetchDetail();
      openModal({
        title: publish ? "Đã publish ✅" : "Đã unpublish ⏸️",
        message: publish
          ? "Bài viết đã được đưa lên trạng thái Published."
          : "Bài viết đã chuyển về trạng thái Draft/Unpublished.",
        kind: "success",
      });
    } catch (e) {
      console.error(e);
      openModal({
        title: "Lỗi publish/unpublish",
        message:
          "Không thực hiện được thao tác publish/unpublish. Thử lại sau ít phút.",
        kind: "error",
      });
    }
  };

  // support Ctrl/Cmd+S để save nhanh
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        const fakeEvt = { preventDefault: () => {} };
        submitUpdate(fakeEvt);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, categories, selectedCateNames, saving]);

  if (loading)
    return (
      <div className="bv-form-container">
        <div>Đang tải…</div>
      </div>
    );

  return (
    <div className="bv-form-container">
      <div className="form-header">
        <h1 className="header-title-h1">Sửa bài viết</h1>
        <div className="gap">
          <button
            type="button"
            className="btn-quay-lai ghost"
            onClick={() => nav(-1)}
          >
            ← Quay lại
          </button>
          <button
            type="button"
            className="btn-publish"
            onClick={() => handlePublish(true)}
          >
            Publish
          </button>
          <button
            type="button"
            className="btn-unpublish"
            onClick={() => handlePublish(false)}
          >
            Unpublish
          </button>
          <button
            type="button"
            className="btn-luu primary"
            onClick={submitUpdate}
            disabled={saving}
            aria-busy={saving ? "true" : "false"}
          >
            {saving ? "Đang lưu…" : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <form className="bv-form" onSubmit={submitUpdate}>
        <div className="grid">
          <div className="col">
            <label>Tiêu đề *</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              onBlur={onTitleBlur}
            />
            <label>Slug</label>
            <input name="slug" value={form.slug} onChange={onChange} />
            <label>Mô tả ngắn</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={3}
            />

            <label>Nội dung *</label>
            <RichEditor
              value={form.content}
              onChange={(html) => setForm((s) => ({ ...s, content: html }))}
            />
          </div>

          <div className="col">
            {/* Ảnh đại diện: URL + Upload */}
            <label>Ảnh đại diện</label>
            <div className="cover-row">
              <input
                className="cover-input"
                name="cover_image"
                value={form.cover_image}
                onChange={onChange}
                placeholder="https://... (hoặc bấm Tải ảnh)"
              />
              <button type="button" className="btn small" onClick={pickCover}>
                ⬆️ Ảnh
              </button>
              <input
                ref={coverFileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onCoverFileChange}
              />
            </div>
            {form.cover_image ? (
              <div className="cover-preview">
                <img src={form.cover_image} alt="cover" />
              </div>
            ) : null}

            {/* Album ảnh: URL list + multiple upload */}
            <label>Album Ảnh (phân cách ,)</label>
            <div className="cover-row">
              <textarea
                name="galleryString"
                value={form.galleryString}
                onChange={onChange}
                rows={3}
                placeholder="https://a.jpg, https://b.jpg (hoặc bấm Tải ảnh)"
              />
              <button type="button" className="btn small" onClick={pickGallery}>
                ⬆️ Ảnh
              </button>
              <input
                ref={galleryFilesRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={onGalleryFilesChange}
              />
            </div>

            {/* Preview nhanh album (tối đa 6 ảnh) */}
            {form.galleryString && (
              <div className="gallery-preview">
                {form.galleryString
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
                  .slice(0, 6)
                  .map((src, i) => (
                    <img key={i} src={src} alt={`g-${i}`} />
                  ))}
              </div>
            )}

            <label>Tags (phân cách ,)</label>
            <input
              name="tagsString"
              value={form.tagsString}
              onChange={onChange}
              placeholder="nhà phố, nội thất…"
            />

            <div className="row2">
              <div>
                <label>Trạng thái</label>
                <select name="status" value={form.status} onChange={onChange}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="switch">
                <label>Active</label>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={onChange}
                />
              </div>
            </div>

            <label>Danh mục</label>
            {loadCateError ? (
              <div className="warn">{loadCateError}</div>
            ) : (
              <CategoryMultiSelect
                categories={categories}
                selected={selectedCateNames}
                setSelected={setSelectedCateNames}
              />
            )}
          </div>
        </div>
      </form>

      {/* Modal thông báo */}
      <CenterModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        kind={modal.kind}
        onClose={modal.onClose || (() => closeModal())}
      />
    </div>
  );
};

export default EditBaiViet;
