import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/ui/GradientText";

const STAGES = [
  { label: "Establishing session", value: "SECURE" },
  { label: "Loading case index", value: "04 FILES" },
  { label: "Verifying credentials", value: "PASSED" },
  { label: "Clearance", value: "GRANTED" },
];

/**
 * Entry sequence. Counts to 100 while stage lines resolve, then the
 * panel splits and slides away to reveal the page underneath.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(-1);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const total = 1900;
    let frame;

    const tick = (now) => {
      const t = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setCount(Math.round(eased * 100));
      setStage(Math.min(Math.floor(eased * 4.4), STAGES.length - 1));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setLeaving(true), 260);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-void px-6 py-10 sm:px-12"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* moving scan line */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="h-full w-full animate-scan-down bg-gradient-to-b from-transparent via-plasma/10 to-transparent" />
          </div>

          <div className="relative flex items-center justify-between">
            <span className="label">Adarsh Shukla</span>
            <span className="label">Compliance &amp; Payouts</span>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <ul className="space-y-3">
              {STAGES.map((s, i) => (
                <motion.li
                  key={s.label}
                  className="flex items-center justify-between border-b border-white/8 pb-3"
                  initial={{ opacity: 0.15 }}
                  animate={{ opacity: i <= stage ? 1 : 0.15 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-haze">
                    {s.label}
                  </span>
                  <span
                    className={
                      i <= stage
                        ? "font-mono text-xs uppercase tracking-[0.18em] text-volt"
                        : "font-mono text-xs uppercase tracking-[0.18em] text-white/20"
                    }
                  >
                    {i <= stage ? s.value : "····"}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 h-px w-full bg-white/10">
              <div
                className="h-full bg-heat transition-[width] duration-100"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          <div className="relative flex items-end justify-between">
            <span className="label">Loading</span>
            <span className="font-display text-mega leading-none">
              <GradientText animate={false}>{String(count).padStart(3, "0")}</GradientText>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
