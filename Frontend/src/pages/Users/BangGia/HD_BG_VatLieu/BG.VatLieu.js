import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BG.VatLieu.css";
import TabsBG from "../Tabs_BG/Tabs.BG";

/** BASE động */
const API = "https://api.nguyenhai.com.vn/api";

/* ===== helpers ===== */
async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";
  const txt = await res.text();
  let data;
  if (ct.includes("application/json")) data = JSON.parse(txt);
  else {
    try {
      data = JSON.parse(txt);
    } catch {
      data = { raw: txt };
    }
  }
  return { ok: res.ok, status: res.status, data };
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const cur = i++;
      out[cur] = await fn(items[cur], cur);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return out;
}

export default function BG_VatLieu() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sections, setSections] = useState([]); // [{_id, ten, nhoms:[{..., hms:[{..., items:[] }]}]}]

  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });
  function showToast(msg, type = "success", duration = 1300) {
    setToast({ open: true, type, msg });
    setTimeout(() => setToast({ open: false, type, msg: "" }), duration);
  }

  // Modal preview
  const [modal, setModal] = useState({
    open: false,
    code: "",
    loading: false,
    error: "",
    data: null,
  });

  async function openMaterial(code) {
    const ma = String(code || "").trim();
    if (!ma) return;
    setModal({ open: true, code: ma, loading: true, error: "", data: null });
    try {
      const r = await fetchJson(`${API}/vatlieu/ma/${encodeURIComponent(ma)}`, {
        credentials: "include",
      });
      if (!r.ok) throw new Error(r.data?.thongBao || "Không tìm thấy theo mã");
      setModal({
        open: true,
        code: ma,
        loading: false,
        error: "",
        data: r.data?.duLieu || null,
      });
    } catch (e) {
      setModal((m) => ({
        ...m,
        loading: false,
        error: e.message || "Lỗi tải chi tiết",
      }));
    }
  }
  function closeModal() {
    setModal({ open: false, code: "", loading: false, error: "", data: null });
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        // 1) Phần
        const phanRes = await fetchJson(`${API}/phan`, {
          credentials: "include",
        });
        const phanList = (phanRes.data?.duLieu || []).sort(
          (a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0)
        );

        // 2) Nhóm từng phần
        const nhomAll = await Promise.all(
          phanList.map((p) =>
            fetchJson(`${API}/nhom?phan=${p._id}`, { credentials: "include" })
          )
        );
        const nhomByPhan = nhomAll.map((nr) =>
          (nr.data?.duLieu || []).sort(
            (a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0)
          )
        );

        // 3) Hạng mục từng nhóm
        const hmByNhom = await Promise.all(
          nhomByPhan.map((nhoms) =>
            Promise.all(
              nhoms.map((n) =>
                fetchJson(`${API}/hangmuc?nhom=${n._id}`, {
                  credentials: "include",
                })
              )
            )
          )
        );
        const hmsByNhom = hmByNhom.map((hmArr) =>
          hmArr.map((r) =>
            (r.data?.duLieu || []).sort(
              (a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0)
            )
          )
        );

        // 4) Vật liệu theo hạng mục (giới hạn concurrency)
        const flatHM = [];
        hmsByNhom.forEach((hmArrs) =>
          hmArrs.forEach((hms) => hms.forEach((h) => flatHM.push(h)))
        );
        const vlByHM = await mapLimit(flatHM, 8, async (h) => {
          const url = new URL(`${API}/vatlieu`);
          url.searchParams.set("hangMuc", h._id);
          url.searchParams.set("limit", "1000");
          const r = await fetchJson(url.toString(), { credentials: "include" });
          const list = r.data?.duLieu || [];
          const labels = list
            .map((v) => ({
              label: (v.ma || v.ten || "").trim(),
              isCode: Boolean(v.ma),
            }))
            .filter((x) => x.label);
          const seen = new Set();
          const uniq = [];
          for (const it of labels)
            if (!seen.has(it.label)) {
              seen.add(it.label);
              uniq.push(it);
            }
          return { hmId: h._id, items: uniq };
        });
        const mapItems = new Map(vlByHM.map((x) => [x.hmId, x.items]));

        // 5) Cấu trúc render
        const built = phanList.map((p, idxP) => {
          const nhoms = (nhomByPhan[idxP] || []).map((n, idxN) => {
            const hms = (hmsByNhom[idxP]?.[idxN] || []).map((h) => ({
              _id: h._id,
              ten: h.ten,
              thuTu: h.thuTu ?? 0,
              items: mapItems.get(h._id) || [],
            }));
            return { _id: n._id, ten: n.ten, thuTu: n.thuTu ?? 0, hms };
          });
          return { _id: p._id, ten: p.ten, thuTu: p.thuTu ?? 0, nhoms };
        });

        setSections(built);
      } catch (e) {
        console.error(e);
        setErr(e.message || "Không tải được dữ liệu");
        showToast("Lỗi tải dữ liệu", "error");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasData = useMemo(
    () => sections.some((s) => s.nhoms?.length),
    [sections]
  );

  /* ============ SLIDER Ảnh trong modal ============ */
  const [cur, setCur] = useState(0);
  const startXRef = useRef(null);

  const slides = useMemo(() => {
    if (!modal.data?.anh) return [];
    const arr = (modal.data.anh || []).map((a) => a?.duongDan).filter(Boolean);
    const seen = new Set();
    return arr.filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
  }, [modal.data]);

  useEffect(() => setCur(0), [modal.data]);

  const go = (delta) => {
    if (!slides.length) return;
    setCur((i) => (i + delta + slides.length) % slides.length);
  };
  const onKey = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };
  const onTouchStart = (e) => {
    startXRef.current = e.touches?.[0]?.clientX ?? 0;
  };
  const onTouchEnd = (e) => {
    const end = e.changedTouches?.[0]?.clientX ?? 0;
    const dx = end - (startXRef.current ?? end);
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startXRef.current = null;
  };

  return (
    <div className="bgvl">
      {/* Toast */}
      {toast.open && (
        <div className="bgvl-toast">
          <div className={`t ${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      {/* Tabs */}
      <TabsBG />

      <div className="bgvl-card">
        <div className="bgvl-card-head">DIỄN GIẢI VẬT LIỆU</div>

        {loading && (
          <div className="bgvl-loading">
            <div className="spin" /> Đang tổng hợp dữ liệu…
          </div>
        )}

        {!loading && err && <div className="bgvl-error">⚠️ {err}</div>}

        {!loading && !err && !hasData && (
          <div className="bgvl-empty">Chưa có dữ liệu vật liệu.</div>
        )}

        {!loading && !err && hasData && (
          <div className="bgvl-table-wrap">
            {sections.map((sec) => (
              <div className="bgvl-section" key={sec._id}>
                <div className="bgvl-phan-title">{sec.ten}</div>

                <table className="bgvl-table">
                  <colgroup>
                    <col style={{ width: "26%" }} />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>HẠNG MỤC</th>
                      <th>DIỄN GIẢI VẬT LIỆU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sec.nhoms || []).map((n) => (
                      <React.Fragment key={n._id}>
                        <tr className="hr">
                          <td colSpan={2} className="nhom">
                            {n.ten}
                          </td>
                        </tr>
                        {(n.hms || []).map((h) => (
                          <tr key={h._id}>
                            <td className="hm">{h.ten}</td>
                            <td className="desc">
                              {h.items.length ? (
                                <div className="codes">
                                  {h.items.map((it, i) =>
                                    it.isCode ? (
                                      <button
                                        key={`${it.label}-${i}`}
                                        className="code-chip"
                                        onClick={() => openMaterial(it.label)}
                                        title={`Xem chi tiết ${it.label}`}
                                      >
                                        {it.label}
                                      </button>
                                    ) : (
                                      <span
                                        key={`${it.label}-${i}`}
                                        className="code-text"
                                      >
                                        {it.label}
                                      </span>
                                    )
                                  )}
                                </div>
                              ) : (
                                <span className="muted">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bgvl-footer">
        <button
          className="btn ghost"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Lên đầu trang
        </button>
        <button className="btn" onClick={() => window.location.reload()}>
          Tải lại
        </button>
      </div>

      {/* ===== Modal chi tiết vật liệu ===== */}
      {modal.open && (
        <div className="bgvl-modal" onMouseDown={closeModal}>
          <div
            className="bgvl-dialog"
            onMouseDown={(e) => e.stopPropagation()}
            tabIndex={0}
            onKeyDown={onKey}
          >
            <div className="dlg-head">
              <div className="title">
                Mã vật liệu: <b>{modal.code}</b>
              </div>
              <button className="icon" onClick={closeModal} aria-label="Đóng">
                ✕
              </button>
            </div>

            {modal.loading && (
              <div className="dlg-loading">
                <div className="spin" /> Đang tải chi tiết…
              </div>
            )}

            {!modal.loading && modal.error && (
              <div className="dlg-error">⚠️ {modal.error}</div>
            )}

            {!modal.loading && !modal.error && modal.data && (
              <div className="dlg-body">
                <div className="meta-bg">
                  <div>
                    <span className="k">Tên: </span>
                    <span className="v">{modal.data.ten || "-"}</span>
                  </div>
                  <div>
                    <span className="k">Thương hiệu: </span>
                    <span className="v">{modal.data.thuongHieu || "-"}</span>
                  </div>
                  <div>
                    <span className="k">Loại: </span>
                    <span className="v">{modal.data.loai || "-"}</span>
                  </div>
                  <div>
                    <span className="k">Hạng mục: </span>
                    <span className="v">{modal.data.hangMuc?.ten || "-"}</span>
                  </div>
                </div>

                {modal.data.thongSo && (
                  <pre className="thongso">
                    {typeof modal.data.thongSo === "string"
                      ? modal.data.thongSo
                      : JSON.stringify(modal.data.thongSo, null, 2)}
                  </pre>
                )}

                {/* ===== SLIDER ảnh ===== */}
                {slides.length === 0 ? (
                  <div className="muted">Chưa có ảnh.</div>
                ) : (
                  <>
                    <div
                      className="g-slider"
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                    >
                      <button
                        className="g-sbtn prev"
                        aria-label="Ảnh trước"
                        onClick={() => go(-1)}
                      >
                        ‹
                      </button>

                      <img
                        key={cur}
                        className="modal-cover"
                        src={slides[cur]}
                        alt={modal.data?.anh?.[cur]?.moTa || modal.data.ten}
                        onError={(ev) => (ev.currentTarget.src = "/noimg.png")}
                        onClick={() => go(1)}
                      />

                      <button
                        className="g-sbtn next"
                        aria-label="Ảnh sau"
                        onClick={() => go(1)}
                      >
                        ›
                      </button>
                      <div className="g-indicator">
                        {cur + 1} / {slides.length}
                      </div>
                    </div>

                    <div className="g-thumbs">
                      {slides.map((u, i) => (
                        <button
                          key={i}
                          className={`g-thumb-btn ${
                            i === cur ? "is-active" : ""
                          }`}
                          onClick={() => setCur(i)}
                          aria-label={`Xem ảnh ${i + 1}`}
                          title={modal.data?.anh?.[i]?.moTa || ""}
                        >
                          <img
                            src={u}
                            alt={modal.data?.anh?.[i]?.moTa || `Ảnh ${i + 1}`}
                            onError={(ev) =>
                              (ev.currentTarget.src = "/noimg.png")
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
