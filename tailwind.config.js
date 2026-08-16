/** @type {import('tailwindcss').Config} */

/**
 * DESIGN TOKENS
 * -----------------------------------------------------------
 * Palette is a risk-severity heat scale, not a decorative one.
 * plasma → ember → volt runs the same direction a compliance
 * desk reads severity: breach, caution, cleared. `ion` is the
 * cool counterweight used for anything neutral or informational.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#06080F",
          soft: "#0B0F1E",
          raised: "#121830",
          line: "#1E2743",
        },
        plasma: "#FF2E88", // breach / highest severity
        ember: "#FF7A29", // caution
        volt: "#C6F53C", // cleared
        ion: "#24E0FF", // informational
        haze: "#8E9AC0", // muted body text
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        mega: ["clamp(3rem, 12vw, 10rem)", { lineHeight: "0.85", letterSpacing: "-0.045em" }],
        display: ["clamp(2.25rem, 6vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        title: ["clamp(1.5rem, 3.2vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.2em" }],
      },
      borderRadius: {
        glass: "1.5rem",
        pill: "999px",
      },
      // Tailwind's default opacity scale steps in 5s and its duration scale
      // skips 400/600. Both are used throughout the UI layer, so they're
      // declared here rather than silently compiling to nothing.
      opacity: {
        6: "0.06",
        8: "0.08",
        12: "0.12",
        14: "0.14",
        18: "0.18",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
      backdropBlur: { glass: "20px" },
      boxShadow: {
        glass: "0 8px 40px -12px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.08)",
        lift: "0 30px 80px -30px rgba(255,46,136,0.45)",
        volt: "0 0 0 1px rgba(198,245,60,0.35), 0 0 32px -6px rgba(198,245,60,0.4)",
      },
      backgroundImage: {
        heat: "linear-gradient(100deg, #FF2E88 0%, #FF7A29 48%, #C6F53C 100%)",
        "heat-soft":
          "linear-gradient(100deg, rgba(255,46,136,0.16), rgba(255,122,41,0.12) 48%, rgba(198,245,60,0.14))",
        "glass-sheen":
          "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 40%, transparent 70%)",
        grid: `linear-gradient(rgba(142,154,192,0.07) 1px, transparent 1px),
               linear-gradient(90deg, rgba(142,154,192,0.07) 1px, transparent 1px)`,
      },
      backgroundSize: { grid: "64px 64px" },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(1.5deg)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-8%,0) scale(1.12)" },
          "66%": { transform: "translate3d(-7%,5%,0) scale(0.94)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(198,245,60,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(198,245,60,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(198,245,60,0)" },
        },
        "scan-down": {
          "0%": { transform: "translateY(-110%)" },
          "100%": { transform: "translateY(110%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
        marquee: "marquee 38s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "scan-down": "scan-down 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
