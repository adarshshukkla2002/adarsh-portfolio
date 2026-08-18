# Visit tracking

Answers two questions: **who opened the portfolio**, and **where from**.

Identity is never detected. It is either inferred from the referrer
automatically, or attached by you when you share a link. No tagging is
required for the system to be useful.

---

## 1. One-time setup (~3 minutes)

### Create the Telegram bot

1. Open Telegram, message **@BotFather**, send `/newbot`
2. Pick any name and username -> it replies with a **bot token**
3. Message **@userinfobot** -> it replies with your numeric **chat ID**
4. Send your new bot any message (`hi`) — a bot cannot message you first

### Add the env vars in Vercel

Project -> **Settings -> Environment Variables** (Production):

| Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | token from BotFather |
| `TELEGRAM_CHAT_ID` | your numeric chat ID |
| `IPINFO_TOKEN` | *optional* — adds ISP / company name |

**Redeploy after saving.** Env vars never apply to existing deployments.
Without these vars the endpoint returns `204` and does nothing, so local dev
and preview builds stay silent.

---

## 2. Attribution, without tagging anything

Most visits identify themselves. The referrer is read automatically and mapped
to a channel — LinkedIn, Google, Naukri, Indeed, Wellfound, GitHub, email
clients. You do nothing.

Referrer is blank in exactly three cases, because the browser sends nothing:

- a link inside a **resume PDF**
- a link in an **email signature**
- a link shared over **WhatsApp / Telegram**

Those are the only places worth tagging, and they are set-once links you paste
one time and never touch again:

```
https://adarsh-portfolio-woad.vercel.app/?r=resume
https://adarsh-portfolio-woad.vercel.app/?r=email
https://adarsh-portfolio-woad.vercel.app/?r=whatsapp
```

Per-person tags (`?r=acme-capital`) remain supported and are the only way to
resolve a specific individual — use them when a role genuinely matters, ignore
them otherwise. `utm_source` works as an alias.

A tag is stored in `localStorage`, so a **return visit still attributes to the
same person** with no query string on the second visit. That returning signal
is the most useful thing here: a first visit is browsing, a second is interest.

---

## 3. Muting your own visits

Your own traffic is the fastest way to make these alerts worthless. Load this
once in every browser you use — phone included:

```
https://adarsh-portfolio-woad.vercel.app/?mute=1
```

Tracking then stops firing on that device permanently. To reverse it:

```
https://adarsh-portfolio-woad.vercel.app/?unmute=1
```

The flag lives in `localStorage`, so it is per-device and per-browser, and
clearing site data resets it.

---

## 4. What arrives on your phone

Untagged, referrer recognised:

```
🔵 via LinkedIn · first visit
📍 Mumbai, MH, IN
📄 /
🖥 Chrome · Android · 393×852
```

Tagged, and they actually read something:

```
⏱ resume · visit #2
📍 Pune, MH, IN · Acme Capital Pvt Ltd
📄 /work/mrz-checksum
⏱ read for 3m 41s
```

Two alerts maximum per visit — one on arrival, one per case study read for
20 s or longer. Route-by-route pings were deliberately left out; five
notifications per visitor is how you end up muting the bot.

---

## 5. Reliability, honestly

| Signal | Trustworthy? |
|---|---|
| `?r=` tag | Yes — you control it |
| Channel from referrer | ~40–60%. Blank from mobile apps, PDFs, WhatsApp |
| First vs. return visit | Yes, unless they clear storage or switch device |
| Country | ~98% |
| City | Coin flip on Indian mobile networks — Jio/Airtel IPs resolve to a carrier hub, so Indore can read as Mumbai |
| ISP / company | Corporate networks only. A recruiter on their phone: nothing |
| Person's name | Never. Not obtainable by any means |

Link-preview crawlers (LinkedIn, WhatsApp) fetch the HTML but never run JS, so
they don't fire alerts. A user-agent filter catches the rest.

---

## 6. Files

| Path | Role |
|---|---|
| `api/ping.js` | Serverless function — geo headers, channel detection, Telegram |
| `src/lib/visitor.js` | Tag capture, visit counting, beacon |
| `src/hooks/useVisitTracking.js` | Fires arrival + dwell events |
| `vercel.json` | SPA rewrite, excludes `/api/*` |

Baseline traffic stats come from `@vercel/analytics`, mounted in
`RootLayout.jsx` — enable Web Analytics in the Vercel dashboard to populate it.

---

## 7. Privacy

The function reads visitor IPs to derive location. It does not store them —
the IP is used in-request and discarded. Under GDPR and India's DPDP Act an IP
is still personal data, so add a line to the footer before sending links to EU
firms, e.g. *"This site records anonymous visit statistics."*
