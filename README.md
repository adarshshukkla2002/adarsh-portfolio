# Adarsh Shukla — Portfolio

Compliance & Payouts Manager, proprietary trading.

Vite + React 18 + Tailwind CSS + React Router + Framer Motion.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle → dist/
npm run preview    # serve the built bundle locally
```

Node 18+ required.

---

## Structure

Organised with Next.js App Router conventions so a port to Next is
mostly moving files, not rewriting them.

```
src/
├── main.jsx                  entry
├── App.jsx                   preloader gate + router provider
├── router/routes.jsx         route table
│
├── data/                     ← all copy lives here, not in components
│   ├── profile.js            name, contact, intro, metrics, nav
│   ├── experience.js         roles + education
│   ├── skills.js             skill groups
│   └── cases.js              case studies (drives desk + case pages)
│
├── hooks/
│   ├── useReducedMotion.js   OS motion preference
│   ├── useScrollProgress.js  document scroll %
│   ├── useMouseTilt.js       3D tilt + specular position
│   └── useCountUp.js         count-to-value on scroll into view
│
├── lib/cn.js                 clsx + tailwind-merge
│
├── components/
│   ├── ui/                   PRIMITIVES — compose everything from these
│   │   ├── GlassCard         base frosted surface
│   │   ├── GradientText      heat-scale gradient type
│   │   ├── Button            primary / ghost / quiet
│   │   ├── Badge             status pill, 5 tones
│   │   ├── Reveal            scroll-triggered entrance
│   │   ├── TiltCard          3D pointer tilt + glare
│   │   ├── SectionHeading    eyebrow + title + lead
│   │   ├── SeverityMeter     animated heat-scale bar
│   │   └── Marquee           seamless ticker
│   │
│   ├── layout/               persistent chrome
│   │   ├── RootLayout        background + cursor + nav + footer
│   │   ├── Navbar            glass morph, layoutId pill, mobile drawer
│   │   ├── Footer
│   │   └── ScrollToTop
│   │
│   ├── effects/
│   │   ├── AuroraCanvas      animated mesh-gradient background
│   │   ├── Cursor            trailing ring (pointer:fine only)
│   │   ├── ScrollProgress    gradient reading line
│   │   └── PageTransition    per-route enter/exit
│   │
│   ├── feedback/Preloader    staged verification loader
│   │
│   └── sections/             page-level compositions
│       ├── Hero              3D clearance card + floating chips
│       ├── Metrics           count-up stats
│       ├── MarqueeStrip
│       ├── AdjudicationDesk  ← signature interactive section
│       ├── CasesPreview      also exports CaseCard
│       ├── ExperienceTimeline
│       ├── SkillsGrid
│       └── ContactCTA
│
├── pages/
│   ├── Home  About  Work  Contact  NotFound
│   └── CaseStudy.jsx         dynamic — /work/:slug
│
└── styles/globals.css        base layer + .glass, .shell, .label, 3D helpers
```

`@/` is aliased to `src/` (see `vite.config.js` and `jsconfig.json`).

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About — mandate, timeline, credentials |
| `/work` | All casework |
| `/work/:slug` | Individual case study |
| `/contact` | Contact |
| `*` | 404 |

---

## Design system

Tokens live in `tailwind.config.js`. The palette is a **risk-severity heat
scale**, not decoration — it runs the direction a compliance desk reads
severity:

| Token | Hex | Meaning |
|---|---|---|
| `plasma` | `#FF2E88` | Breach — highest severity |
| `ember` | `#FF7A29` | Caution / hold |
| `volt` | `#C6F53C` | Cleared |
| `ion` | `#24E0FF` | Informational |
| `void` | `#06080F` | Base surface |
| `haze` | `#8E9AC0` | Muted body text |

`bg-heat` is the plasma → ember → volt gradient used for every accent.

Type: **Bricolage Grotesque** (display) / **Plus Jakarta Sans** (body) /
**JetBrains Mono** (data and labels).

---

## Editing content

You should not need to touch JSX to change what the site says.

- **Contact details, intro, metrics** → `src/data/profile.js`
- **Jobs and education** → `src/data/experience.js`
- **Skills** → `src/data/skills.js`
- **Case studies** → `src/data/cases.js`

Adding a case to `cases.js` automatically adds it to the adjudication desk,
the `/work` grid, and its own page at `/work/<slug>`. No other file changes.

---

## Before publishing

1. **Case studies are illustrative composites.** Rewrite them so the rulings
   are ones you'd actually make.
2. **`profile.metrics` are placeholders.** Replace with real figures or delete
   the `<Metrics />` section from `pages/Home.jsx`.
3. **Your phone number is public.** Remove the `Direct` entry from
   `pages/Contact.jsx` and `components/layout/Footer.jsx` if you'd rather not
   publish it.

---

## Deploying

Static SPA — any host works.

**Vercel / Netlify:** build `npm run build`, output `dist`. Add a rewrite so
client-side routes resolve on refresh:

```
/*  /index.html  200
```

Vercel: add `vercel.json` with
`{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

Without this, `/work/paired-accounts` will 404 on a hard refresh.

---

## Accessibility

Keyboard focus rings on all interactive elements, `aria-label`s on icon-only
controls, and `prefers-reduced-motion` honoured — the aurora stops animating,
tilt is disabled, the custom cursor is suppressed, and transitions collapse.
