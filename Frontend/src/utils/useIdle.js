import { useEffect, useState } from "react";

export function useIdle(delay = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let id;
    const cb = () => setReady(true);

    if ("requestIdleCallback" in window) {
      id = window.requestIdleCallback(cb, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    id = window.setTimeout(cb, delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  return ready;
}
