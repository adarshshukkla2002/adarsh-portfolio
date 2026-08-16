import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { cases, RULING_OPTIONS, verdictMeta } from "@/data/cases";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import SeverityMeter from "@/components/ui/SeverityMeter";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const ACCENT_RING = {
  plasma: "border-plasma/50 bg-plasma/10 text-plasma",
  ember: "border-ember/50 bg-ember/10 text-ember",
  volt: "border-volt/50 bg-volt/10 text-volt",
};

/**
 * The visitor rules on the case before seeing the ruling on file.
 * Getting it wrong is the point — it makes the reasoning land.
 */
export default function AdjudicationDesk() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ agreed: 0, answered: 0 });

  const current = cases[index];
  const meta = verdictMeta[current.ruling];
  const settled = picked !== null;

  const choose = (id) => {
    if (settled) return;
    setPicked(id);
    setScore((s) => ({
      agreed: s.agreed + (id === current.ruling ? 1 : 0),
      answered: s.answered + 1,
    }));
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => (i + 1) % cases.length);
  };

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="The adjudication desk"
          title="Rule on it"
          accent="yourself"
          lead="Read the case, make the call, then see what I ruled and why. Most people get at least one of these wrong — which is the useful part."
        />

        <GlassCard className="mt-14">
          {/* header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="label">Reviewer</span>
              <Badge tone="ion">You</Badge>
            </div>
            <div className="flex items-center gap-2">
              {cases.map((c, i) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setPicked(null);
                  }}
                  aria-label={`Case ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-pill transition-all duration-500",
                    i === index ? "w-10 bg-heat" : "w-5 bg-white/15 hover:bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>

          {/* body */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-label uppercase text-volt">{current.ref}</span>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                  <span className="label">{current.category}</span>
                </div>

                <h3 className="mt-4 text-title">{current.title}</h3>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
                  {current.situation}
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                  <div>
                    <span className="label">Signals on file</span>
                    <ul className="mt-4 space-y-2.5">
                      {current.signals.map((s) => (
                        <li key={s} className="flex gap-3 text-sm leading-relaxed">
                          <span className="mt-2 h-1 w-4 shrink-0 rounded-pill bg-heat" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SeverityMeter value={current.severity} label="Assessed severity" />
                </div>

                {/* choices */}
                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {RULING_OPTIONS.map((opt) => {
                    const isTruth = settled && opt.id === current.ruling;
                    const isYours = picked === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => choose(opt.id)}
                        disabled={settled}
                        className={cn(
                          "relative rounded-2xl border px-5 py-5 text-left font-mono text-label uppercase transition-all duration-400",
                          !settled &&
                            "border-white/12 bg-white/[0.03] text-haze hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.07] hover:text-white",
                          settled && !isTruth && !isYours && "border-white/8 text-white/25",
                          isTruth && ACCENT_RING[meta.accent],
                          isYours && !isTruth && "border-white/40 text-white"
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          {opt.label}
                          {isTruth && <Check size={15} />}
                          {isYours && !isTruth && <X size={15} className="text-white/50" />}
                        </span>
                        {isTruth && <span className="mt-2 block text-[10px] opacity-70">My ruling</span>}
                        {isYours && !isTruth && (
                          <span className="mt-2 block text-[10px] text-white/40">Your call</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* reasoning */}
                <AnimatePresence>
                  {settled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="rounded-pill border px-4 py-1.5 font-display text-sm font-semibold uppercase"
                            style={{ color: meta.hex, borderColor: `${meta.hex}66` }}
                          >
                            {meta.label}
                          </span>
                          <span className="label">Reasoning on file</span>
                        </div>
                        <p className="mt-5 max-w-3xl leading-relaxed">{current.reasoning}</p>
                        <Link
                          to={`/work/${current.slug}`}
                          className="mt-6 inline-flex items-center gap-2 font-mono text-label uppercase text-volt transition-all hover:gap-3"
                        >
                          Full case study <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 px-6 py-5 sm:px-8">
            <span className="label">
              {score.answered === 0 ? (
                "No rulings entered"
              ) : (
                <>
                  Agreement <span className="text-volt">{score.agreed}</span> of {score.answered}
                </>
              )}
            </span>
            <Button onClick={next} variant="ghost">
              {settled ? "Next case" : "Skip case"} <ArrowRight size={14} />
            </Button>
          </div>
        </GlassCard>

        <p className="mt-5 label">
          Illustrative composites — no client, trader or account details are represented.
        </p>
      </div>
    </section>
  );
}
