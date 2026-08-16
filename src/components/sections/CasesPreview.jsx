import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cases, verdictMeta } from "@/data/cases";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import GlassCard from "@/components/ui/GlassCard";
import SeverityMeter from "@/components/ui/SeverityMeter";
import Button from "@/components/ui/Button";

export function CaseCard({ item, delay = 0 }) {
  const meta = verdictMeta[item.ruling];

  return (
    <Reveal delay={delay}>
      <TiltCard max={7}>
        <Link to={`/work/${item.slug}`} className="block h-full">
          <GlassCard className="glass-hover h-full p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-label uppercase text-haze">{item.ref}</span>
              <span
                className="rounded-pill border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: meta.hex, borderColor: `${meta.hex}55` }}
              >
                {meta.label}
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl leading-tight">{item.title}</h3>
            <p className="mt-2 font-mono text-label uppercase text-haze/70">{item.category}</p>
            <p className="mt-5 text-sm leading-relaxed">{item.summary}</p>

            <SeverityMeter value={item.severity} className="mt-7" />

            <span className="mt-7 inline-flex items-center gap-2 font-mono text-label uppercase text-volt">
              Open case <ArrowUpRight size={14} />
            </span>
          </GlassCard>
        </Link>
      </TiltCard>
    </Reveal>
  );
}

export default function CasesPreview() {
  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Selected casework"
            title="Four rulings,"
            accent="four reasons"
            lead="Each file records the situation, the signals, the ruling and the precedent it set."
          />
          <Reveal delay={0.15}>
            <Button to="/work" variant="ghost">
              All casework
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {cases.slice(0, 4).map((item, i) => (
            <CaseCard key={item.slug} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
