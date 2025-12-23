let promise;

export function loadTurnstile() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (promise) return promise;

  promise = new Promise((resolve, reject) => {
    const id = "cf-turnstile-script";
    const existed = document.getElementById(id);

    if (existed) {
      existed.addEventListener("load", () => resolve(window.turnstile));
      existed.addEventListener("error", reject);
      return;
    }

    const s = document.createElement("script");
    s.id = id;
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(window.turnstile);
    s.onerror = reject;
    document.head.appendChild(s);
  });

  return promise;
}
