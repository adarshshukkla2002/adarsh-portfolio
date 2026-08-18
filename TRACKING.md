# Visit tracking

Answers two questions: **who opened the portfolio**, and **where from**.

Identity is never detected — it is attached when you share the link. You tag a
link per recipient, and every hit on that tag resolves to a person you already
know.

---

## 1. One-time setup (~3 minutes)

### Create the Telegram bot

1. Open Telegram, message **@BotFather**, send `/newbot`
2. Pick any name and username → it replies with a **bot token**
3. Message **@userinfobot** → it replies with your numeric **chat ID**
4. Send your new bot any message (`hi`) — a bot cannot message you first

### Add the env vars in Vercel

Project → **Settings → Environment Variables** (apply to Production):

| Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | token from BotFather |
| `TELEGRAM_CHAT_ID` | your numeric chat ID |
| `IPINFO_TOKEN` | *optional* — adds ISP / company name |

Redeploy after saving. Without these vars the endpoint returns `204` and does
nothing, so local dev and preview builds stay silent.

---

## 2. Sharing links

Never share the bare domain again. Tag every link:

```
https://adarsh-portfolio-woad.vercel.app/?r=acme-capital
https://adarsh-portfolio-woad.vercel.app/?r=fundedx-priya
https://adarsh-portfolio-woad.vercel.app/?r=linkedin-bio
https://adarsh-portfolio-woad.vercel.app/?r=resume-v3
```

Keep the mapping somewhere — a spreadsheet column next to where you logged the
application. `utm_source` works as an alias if you prefer standard UTM tagging.

The tag is stored in `localStorage`, so a **return visit still attributes to the
same person** even with no query string on the second visit. That returning
signal is the most useful thing here: a first visit is browsing, a second visit
is interest.

---

## 3. What arrives on your phone

```
🔵 acme-capital · first visit
📍 Mumbai, MH, IN · Reliance Jio
📄 /work/paired-accounts
↗️ linkedin.com
🖥 Chrome · Android · 393×852
```

Then, if they actually read a case study:

```
⏱ acme-capital · visit #2
📍 Mumbai, MH, IN
📄 /work/mrz-checksum
⏱ read for 3m 41s
```

Two alerts maximum per visit — one on arrival, one per case study read for
20 s or longer. Route-by-route pings were deliberately left out; five
notifications per visitor is how you end up muting the bot.

---

## 4. Reliability, honestly

| Signal | Trustworthy? |
|---|---|
| `?r=` tag | Yes — you control it |
| First vs. return visit | Yes, unless they clear storage or switch device |
| Country | ~98% |
| City | Coin flip on Indian mobile networks — Jio/Airtel IPs resolve to a carrier hub, so Indore can read as Mumbai |
| Referrer | ~40–60%. LinkedIn's mobile app, WhatsApp and PDF links send nothing |
| ISP / company | Corporate networks only. A recruiter on their phone: nothing |
| Person's name | Never. Not obtainable by any means |

Link-preview crawlers (LinkedIn, WhatsApp) fetch the HTML but never run JS, so
they don't fire alerts. A user-agent filter catches the rest.

---

## 5. Files

| Path | Role |
|---|---|
| `api/ping.js` | Serverless function — reads Vercel geo headers, sends Telegram |
| `src/lib/visitor.js` | Tag capture, visit counting, beacon |
| `src/hooks/useVisitTracking.js` | Fires arrival + dwell events |
| `vercel.json` | SPA rewrite, excludes `/api/*` |

Baseline traffic stats (views, referrers, countries) come from
`@vercel/analytics`, mounted in `RootLayout.jsx` — enable Web Analytics in the
Vercel dashboard to populate it.

---

## 6. Privacy

The function reads visitor IPs to derive location. It does not store them —
the IP is used in-request and discarded. Under GDPR and India's DPDP Act an IP
is still personal data, so add a line to the footer before sending links to EU
firms, e.g. *"This site records anonymous visit statistics."*
