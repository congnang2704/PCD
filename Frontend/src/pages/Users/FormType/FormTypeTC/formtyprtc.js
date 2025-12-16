import React, { useEffect, useMemo, useState } from "react";
import "./formtyprtc.css";

const API_BASE = "https://api.nguyenhai.com.vn";
const PHONE_RE = /^(0|\+84)(\d{9})$/;

// parse “1.7 - 1.9 Tỷ”, “Dưới 50 Triệu”, “2.4 Tỷ”, “120 Triệu”… -> VND (ước lượng)
function parseBudgetToVND(input) {
  if (!input) return 1000000;
  const s = String(input).toLowerCase().trim();

  // range: "x - y tỷ/triệu"
  const rangeMatch = s.match(
    /([\d.,]+)\s*-\s*([\d.,]+)\s*(tỷ|ty|trieu|triệu)/i
  );
  if (rangeMatch) {
    const a = parseFloat(rangeMatch[1].replace(/[.,]/g, ""));
    const b = parseFloat(rangeMatch[2].replace(/[.,]/g, ""));
    const unit = rangeMatch[3];
    const mid = (a + b) / 2;
    if (/tỷ|ty/i.test(unit)) return Math.round(mid * 1e9);
    return Math.round(mid * 1e6);
  }

  // “trên x tỷ/triệu”, “dưới x tỷ/triệu”
  const boundMatch = s.match(
    /(trên|duoi|dưới)\s*([\d.,]+)\s*(tỷ|ty|trieu|triệu)/i
  );
  if (boundMatch) {
    const val = parseFloat(boundMatch[2].replace(/[.,]/g, ""));
    const unit = boundMatch[3];
    const base = /tỷ|ty/i.test(unit) ? val * 1e9 : val * 1e6;
    return Math.round(base);
  }

  // single “x tỷ/triệu”
  const singleMatch = s.match(/([\d.,]+)\s*(tỷ|ty|trieu|triệu)/i);
  if (singleMatch) {
    const val = parseFloat(singleMatch[1].replace(/[.,]/g, ""));
    const unit = singleMatch[2];
    return Math.round(/tỷ|ty/i.test(unit) ? val * 1e9 : val * 1e6);
  }

  // numeric string fallback
  const num = Number(s.replace(/[^\d]/g, ""));
  if (!Number.isNaN(num) && num > 0) return num;

  return 1000000; // fallback
}

export default function FormTypeTC({ slug = "tu-van-khach-hang" }) {
  const [form, setForm] = useState(null);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // fetch form config
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/forms/${slug}`);
        const data = await res.json();
        if (mounted) setForm(data);
      } catch (err) {
        console.error("Lỗi tải form:", err);
      } finally {
        mounted && setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [slug]);

  // reset ngân sách con khi đổi loại ngân sách
  useEffect(() => {
    const t = values["budget_type"];
    if (!t) return;
    if (t === "thi-cong" || t === "cai-tao") {
      if (values["budget_design"]) {
        setValues((v) => {
          const nv = { ...v };
          delete nv["budget_design"];
          return nv;
        });
      }
    } else {
      if (values["budget_construction"]) {
        setValues((v) => {
          const nv = { ...v };
          delete nv["budget_construction"];
          return nv;
        });
      }
    }
  }, [values.budget_type]); // eslint-disable-line

  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;
    setMessage("");

    // pre-validate phone/email nếu có
    const phone = values.phone || values.sdt || "";
    const email = values.email || "";
    if (phone && !PHONE_RE.test(phone)) {
      setMessage("SĐT không hợp lệ (bắt đầu 0/+84 và 10 số).");
      return;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Email không hợp lệ.");
      return;
    }

    // Tính budget_value theo nhóm đã chọn
    const budgetType = values.budget_type || "";
    const budgetValueRaw =
      values.budget_construction || values.budget_design || values.budget || "";
    const budgetValueVND = parseBudgetToVND(budgetValueRaw);

    // Map sang payload backend mong đợi
    const payload = {
      name: values.full_name || values.name || "",
      phone: phone,
      email: email,
      projectInfo: values.project_info || "",
      location: values.location || "",
      note: values.note || values.message || "",
      budget: {
        type: budgetType, // 'thi-cong' | 'cai-tao' | 'tk-xay-dung' | 'tk-noi-that' | ...
        value: budgetValueRaw, // giữ nguyên text user chọn
      },
      answers: { ...values }, // raw để đối chiếu (tuỳ backend)
      source: "web",
      meta: {
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        page: typeof window !== "undefined" ? window.location.href : "unknown",
      },
    };

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/forms/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success) {
        // ✅ BẮN GOOGLE ADS CONVERSION
        if (window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-17496261728/Cf4vCIHqlo0bEOCI75ZB",
            value: budgetValueVND,
            currency: "VND",
          });
        }

        // (optional) GTM dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit_success",
          form_name: `DynamicForm_${slug}`,
          budget_type: budgetType,
          budget_value: budgetValueRaw,
        });

        setMessage(json.message || "Gửi thành công!");
        setValues({});
        setTimeout(() => {
          document
            .querySelector(".ftc-message")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);

        // (optional) redirect
        // window.location.href = "/thank-you";
      } else {
        throw new Error(json?.error || "Gửi thất bại");
      }
    } catch (err) {
      setMessage("Có lỗi xảy ra: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = useMemo(() => {
    if (!form?.fields) return [];
    return [...form.fields].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [form]);

  const isVisible = (f) => {
    if (!Array.isArray(f.visibleIf) || f.visibleIf.length === 0) return true;
    return f.visibleIf.every((cond) => {
      const v = values[cond.whenField];
      if (cond.operator === "eq") return v === cond.value;
      if (cond.operator === "in")
        return Array.isArray(cond.value) && cond.value.includes(v);
      return true;
    });
  };

  const widthClass = (w) => {
    if (w === "1/2") return "ftc-col-1-2";
    if (w === "1/3") return "ftc-col-1-3";
    return "ftc-col-full";
  };

  if (loading) return <div className="ftc-loading">Đang tải form...</div>;
  if (!form)
    return <div className="ftc-error">Không tìm thấy cấu hình form.</div>;

  return (
    <section className="ftc-wrap" aria-live="polite">
      <h2 className="ftc-title">
        Đăng ký tư vấn ngay để nhận giải pháp thiết kế tối ưu cho ngôi nhà của
        bạn!
      </h2>
      {form.description && (
        <p className="ftc-desc">
          Điền thông tin vào form dưới đây, chúng tôi sẽ liên hệ lại để tư vấn
          chi tiết và hoàn toàn miễn phí, giúp bạn hiện thực hóa ngôi nhà mơ
          ước.
        </p>
      )}

      <form className="ftc-form" onSubmit={handleSubmit} noValidate>
        <div className="ftc-grid">
          {fields.map((f) => {
            if (!isVisible(f)) return null;

            const common = {
              id: f.key,
              name: f.key,
              value: values[f.key] || "",
              onChange: (e) => handleChange(f.key, e.target.value),
              placeholder: f.placeholder || "",
              required: !!f.required,
              "aria-required": !!f.required,
              autoComplete: "on",
              className: "ftc-input",
            };

            return (
              <div key={f.key} className={`ftc-field ${widthClass(f.width)}`}>
                <label
                  htmlFor={f.key}
                  className="ftc-label"
                  id={`${f.key}-label`}
                >
                  {f.label}{" "}
                  {f.required ? <span className="ftc-required">*</span> : null}
                </label>

                {f.type === "textarea" ? (
                  <textarea {...common} rows={4} />
                ) : f.type === "select" ? (
                  <select
                    {...common}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                  >
                    <option value="">-- Chọn --</option>
                    {f.options?.map((o, i) => (
                      <option key={i} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.type === "radio" ? (
                  <div
                    className="ftc-radio-group"
                    role="radiogroup"
                    aria-labelledby={`${f.key}-label`}
                  >
                    {f.options?.map((o, i) => (
                      <label key={i} className="ftc-radio">
                        <input
                          type="radio"
                          name={f.key}
                          value={o.value}
                          checked={values[f.key] === o.value}
                          onChange={(e) => handleChange(f.key, e.target.value)}
                          required={!!f.required}
                        />
                        <span className="ftc-radio-label">{o.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={f.type === "phone" ? "tel" : f.type || "text"}
                    inputMode={f.type === "phone" ? "tel" : undefined}
                    {...common}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button type="submit" className="ftc-submit" disabled={submitting}>
          {submitting ? "Đang gửi..." : form.submitText || "Gửi"}
        </button>
      </form>

      {message && <div className="ftc-message">{message}</div>}
    </section>
  );
}
