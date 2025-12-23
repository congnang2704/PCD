import React, { useEffect, useRef } from "react";
import { loadTurnstile } from "../../utils/turnstileLoader";

const isDev = process.env.NODE_ENV !== "production";

export default function TurnstileField({
  siteKey,
  onToken,
  theme = "light",
  action = "contact_form",
  className,
}) {
  const boxRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const ts = await loadTurnstile();
        if (!alive || !ts || !boxRef.current) return;
        if (!siteKey) {
          if (isDev) console.warn("[Turnstile] Missing siteKey");
          return;
        }

        // Nếu component re-render lại thì đừng render trùng
        if (widgetIdRef.current != null) return;

        widgetIdRef.current = ts.render(boxRef.current, {
          sitekey: siteKey,
          theme,
          action,
          callback: (token) => onToken?.(token),
          "expired-callback": () => onToken?.(""),
          "error-callback": () => onToken?.(""),
        });
      } catch (e) {
        if (isDev) console.warn("[Turnstile] load/render failed", e);
        onToken?.("");
      }
    })();

    return () => {
      alive = false;
      try {
        if (window.turnstile && widgetIdRef.current != null) {
          window.turnstile.remove(widgetIdRef.current);
        }
      } catch {}
      widgetIdRef.current = null;
    };
  }, [siteKey, theme, action, onToken]);

  return <div ref={boxRef} className={className} />;
}
