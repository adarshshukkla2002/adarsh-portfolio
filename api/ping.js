/**
 * Visit notifier. Receives a beacon from the client, enriches it with the
 * geo headers Vercel injects at the edge, and pushes a Telegram message.
 *
 * Required env vars (Vercel -> Settings -> Environment Variables):
 *   TELEGRAM_BOT_TOKEN   from @BotFather
 *   TELEGRAM_CHAT_ID     your personal chat id
 * Optional:
 *   IPINFO_TOKEN         only ever prints an org that is not a known provider
 *
 * With no env vars set the handler no-ops, so local dev stays quiet.
 */

const BOT_UA = /bot|crawler|spider|crawling|preview|facebookexternalhit|slurp|headless|lighthouse/i;

/** Known traffic sources, so an untagged visit still says something useful. */
const CHANNELS = [
  [/linkedin\./, "LinkedIn"],
  [/^google\./, "Google search"],
  [/mail\.google\.|outlook\.|mail\.yahoo\./, "Email link"],
  [/naukri\./, "Naukri"],
  [/indeed\./, "Indeed"],
  [/wellfound\.|angel\.co/, "Wellfound"],
  [/instahyre\.|cutshort\./, "Instahyre / Cutshort"],
  [/github\./, "GitHub"],
  [/^t\.co$|twitter\.|^x\.com$/, "X / Twitter"],
];

/**
 * Consumer ISPs, hosting and VPN exits. The ipinfo org field names whoever
 * sells the visitor internet, which is not who they are. Printing "Bharti
 * Airtel" on every alert is noise dressed as signal, so the line is only
 * worth showing when the org is plausibly an employer.
 */
const PROVIDER_NOISE = [
  /telecom|communication|broadband|cable|wireless|cellular|mobile/i,
  /fibernet|fiber|telemedia|internet servic|network servic/i,
  /hosting|datacenter|data center|cloud|vpn|colocation/i,
  /airtel|jio|bsnl|vodafone|idea cellular|hathway|excitel|tikona|spectra/i,
  /comcast|xfinity|verizon|at&t|t-mobile|charter|spectrum|centurylink/i,
  /virgin media|talktalk|plusnet|deutsche telekom|telefonica/i,
  /telstra|optus|rogers|bell canada|orange s\.a\./i,
  /amazon|google|microsoft|digitalocean|cloudflare|linode|hetzner/i,
];

/** Short names that must match as whole words, not substrings. */
const PROVIDER_WORDS = new Set(["bt", "sky", "ee", "o2", "three", "isp", "gtpl", "den"]);

function looksLikeProvider(org) {
  if (PROVIDER_NOISE.some((re) => re.test(org))) return true;
  return org
    .toLowerCase()
    .split(/[^a-z0-9&]+/)
    .some((word) => PROVIDER_WORDS.has(word));
}

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Referrer host only — the full URL is noise in a phone notification. */
function referrerLabel(ref) {
  if (!ref) return "";
  try {
    return new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return ref.slice(0, 60);
  }
}

/**
 * Best available label for who this is, in order of confidence:
 * an explicit ?r= tag, then a recognised referrer, then honest ignorance.
 */
function identify(ref, referrer) {
  if (ref) return ref;

  const host = referrerLabel(referrer);
  if (host) {
    const match = CHANNELS.find(([re]) => re.test(host));
    return match ? `via ${match[1]}` : `via ${host}`;
  }
  return "direct \u2014 resume, email or saved link";
}

/**
 * Country only. City and region came back confidently wrong — Bhopal for a
 * visitor actually in Rewa, ~230km out — and a wrong city is worse than no
 * city, because it invites you to act on it. Country is ~98% reliable.
 */
function geoFrom(headers) {
  return headers["x-vercel-ip-country"] || "unknown";
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
    if (!data.org) return null;

    const org = data.org.replace(/^AS\d+\s*/, "").trim();
    return looksLikeProvider(org) ? null : org;
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
    timezone = "",
  } = body;

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const org = await orgFrom(ip);

  const visitLabel = returning ? `visit #${Number(visitCount) || 2}` : "first visit";
  const icon = event === "dwell" ? "\u23F1" : returning ? "\u{1F501}" : "\u{1F535}";

  const lines = [
    `${icon} <b>${esc(identify(ref, referrer))}</b> \u00B7 ${esc(visitLabel)}`,
    `\u{1F4C4} ${esc(path)}`,
  ];

  if (event === "dwell" && seconds > 0) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    lines.push(`\u23F1 read for ${m ? `${m}m ` : ""}${s}s`);
  }

  // Only ever appears when ipinfo returned something that is not a provider.
  if (org) lines.push(`\u{1F3E2} ${esc(org)}`);

  lines.push(
    `\u{1F30D} ${esc(geoFrom(req.headers))}${timezone ? ` \u00B7 ${esc(timezone)}` : ""}${device ? ` \u00B7 ${esc(device)}` : ""}`
  );

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
