/**
 * Visitor identity + attribution.
 *
 * Nothing here identifies a stranger. It reads the tag *you* attached when
 * you shared the link (`?r=acme-capital`) and remembers it, so a return
 * visit weeks later still resolves to the same person.
 */

const KEY_REF = "pf:ref";
const KEY_VISITS = "pf:visits";
const KEY_SESSION = "pf:session";

/** localStorage throws in private mode on some browsers. Never let it break the page. */
function safeGet(store, key) {
  try { return store.getItem(key); } catch { return null; }
}
function safeSet(store, key, value) {
  try { store.setItem(key, value); } catch { /* ignore */ }
}

/** Coarse device label. Enough for context, not a fingerprint. */
function deviceLabel() {
  const ua = navigator.userAgent;
  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /OPR\//.test(ua) ? "Opera" :
    /Chrome\//.test(ua) ? "Chrome" :
    /Safari\//.test(ua) ? "Safari" :
    /Firefox\//.test(ua) ? "Firefox" : "Browser";
  const os =
    /Android/.test(ua) ? "Android" :
    /iPhone|iPad|iPod/.test(ua) ? "iOS" :
    /Windows/.test(ua) ? "Windows" :
    /Mac OS X/.test(ua) ? "macOS" :
    /Linux/.test(ua) ? "Linux" : "";
  return [browser, os].filter(Boolean).join(" \u00B7 ");
}

/**
 * Resolves who this is and whether the session is new.
 * Call once per page load.
 */
export function resolveVisitor() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const incoming = params.get("r") || params.get("utm_source");

  // A fresh tag always wins — the newest link you shared is the live attribution.
  if (incoming) safeSet(localStorage, KEY_REF, incoming.slice(0, 60));
  const ref = safeGet(localStorage, KEY_REF);

  const isNewSession = !safeGet(sessionStorage, KEY_SESSION);
  let visits = Number(safeGet(localStorage, KEY_VISITS) || 0);

  if (isNewSession) {
    visits += 1;
    safeSet(localStorage, KEY_VISITS, String(visits));
    safeSet(sessionStorage, KEY_SESSION, "1");
  }

  return {
    ref,
    visitCount: visits,
    returning: visits > 1,
    isNewSession,
    device: deviceLabel(),
    screen: `${window.screen.width}\u00D7${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    referrer: document.referrer || "",
  };
}

/** Fire-and-forget beacon. Uses sendBeacon when the page is going away. */
export function ping(payload, { beacon = false } = {}) {
  const url = "/api/ping";
  const body = JSON.stringify(payload);

  try {
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never surface as a user-visible error.
  }
}
