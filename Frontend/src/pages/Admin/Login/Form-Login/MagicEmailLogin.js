import React, { useState, useRef, useEffect } from "react";

export default function MagicEmailLogin({ API_BASE, onClose, onSuccess }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const codeRef = useRef(null);
  useEffect(()=>{ if(step==="code") codeRef.current?.focus(); },[step]);

  const sendCode = async () => {
    if (!email) return;
    setLoading(true); setMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/magic/start`, {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Không gửi được mã");
      setMsg("✅ Mã đã được gửi vào email của bạn.");
      setStep("code");
    } catch(e){ setMsg(e.message); }
    finally{ setLoading(false); }
  };

  const verify = async () => {
    if (!code || code.length < 6) return;
    setLoading(true); setMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/magic/verify`, {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Xác thực thất bại");
      onSuccess?.(data); // { token, user }
    } catch(e){ setMsg(e.message); }
    finally{ setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e=>e.stopPropagation()}>
        <h3>Đăng nhập bằng Email</h3>
        {step==="email" && (
          <>
            <input className="modal-input" type="email"
              placeholder="Nhập email của bạn"
              value={email} onChange={e=>setEmail(e.target.value)} />
            <button className="modal-btn" onClick={sendCode} disabled={loading}>
              {loading ? "Đang gửi mã…" : "Gửi mã đăng nhập"}
            </button>
          </>
        )}

        {step==="code" && (
          <>
            <div className="hint">Nhập mã 6 số đã gửi tới <b>{email}</b></div>
            <input ref={codeRef} className="modal-input" type="text" inputMode="numeric"
              placeholder="••••••" maxLength={6}
              value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))}
              onKeyDown={e=>e.key==="Enter" && verify()} />
            <button className="modal-btn" onClick={verify} disabled={loading}>
              {loading ? "Đang xác thực…" : "Xác nhận"}
            </button>
            <button className="modal-link" onClick={()=>setStep("email")}>Gửi lại mã</button>
          </>
        )}
        {msg && <div className="modal-msg">{msg}</div>}
        <button className="modal-close" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
