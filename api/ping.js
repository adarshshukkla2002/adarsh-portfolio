/**
 * Visit notifier. Receives a beacon from the client, enriches it with the
 * geo headers Vercel injects at the edge, and pushes a Telegram message.
 *
 * Required env vars (Vercel → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN   from @BotFather
 *   TELEGRAM_CHAT_ID     your personal chat id
 * Optional:
 *   IPINFO_TOKEN         adds ISP / company name to the alert
 *
 * With no env vars set the handler no-ops, so local dev stays quiet.
 */

const BOT_UA = /bot|crawler|spider|crawling|preview|facebookexternalhit|slurp|headless|lighthouse/i;

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Referrer host only — the full URL is noise in a phone notification. */
function referrerLabel(ref) {
  if (!ref) return "direct / untracked";
  try {
    return new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return ref.slice(0, 60);
  }
}

/** Vercel populates these at the edge on every request. */
function geoFrom(headers) {
  const city = headers["x-vercel-ip-city"];
  const region = headers["x-vercel-ip-country-region"];
  const country = headers["x-vercel-ip-country"];
  const parts = [city && decodeURIComponent(city), region, country].filter(Boolean);
  return parts.length ? parts.join(", ") : "unknown location";
}

/** Only runs when IPINFO_TOKEN is set. Failure is never fatal. */
async function orgFrom(ip) {
  if (!process.env.IPINFO_TOKEN || !ip) return null;
  try {
    const res = await fetch(
      `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`,
      { signal: AbortSignal.timeout(2500) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.org ? data.org.replace(/^AS\d+\s*/, "") : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(204).end();

  const ua = req.headers["user-agent"] || "";
  if (BOT_UA.test(ua)) return res.status(204).end();

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  if (!body || typeof body !== "object") return res.status(400).json({ error: "bad payload" });

  const {
    ref = null,
    path = "/",
    referrer = "",
    visitCount = 1,
    returning = false,
    event = "view",
    seconds = 0,
    device = "",
    screen = "",
    timezone = "",
  } = body;

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const org = await orgFrom(ip);

  const who = ref ? `<b>${esc(ref)}</b>` : "<b>untagged visitor</b>";
  const visitLabel = returning ? `visit #${Number(visitCount) || 2}` : "first visit";
  const icon = event === "dwell" ? "\u23F1" : returning ? "\u{1F501}" : "\u{1F535}";

  const lines = [
    `${icon} ${who} \u00B7 ${esc(visitLabel)}`,
    `\u{1F4CD} ${esc(geoFrom(req.headers))}${org ? ` \u00B7 ${esc(org)}` : ""}`,
    `\u{1F4C4} ${esc(path)}`,
    `\u2197\uFE0F ${esc(referrerLabel(referrer))}`,
  ];

  if (event === "dwell" && seconds > 0) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    lines.push(`\u23F1 read for ${m ? `${m}m ` : ""}${s}s`);
  }
  if (device || screen) {
    lines.push(`\u{1F5A5} ${esc([device, screen, timezone].filter(Boolean).join(" \u00B7 "))}`);
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Never fail the beacon because Telegram was slow.
  }

  return res.status(204).end();
}
