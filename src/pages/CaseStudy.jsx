import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cases, getCaseBySlug, verdictMeta } from "@/data/cases";
import PageTransition from "@/components/effects/PageTransition";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import SeverityMeter from "@/components/ui/SeverityMeter";
import GradientText from "@/components/ui/GradientText";

/** Ordered narrative blocks — the shape a real case file follows. */
const BLOCKS = [
  { key: "situation", label: "Situation" },
  { key: "reasoning", label: "Reasoning" },
  { key: "precedent", label: "Precedent set" },
];

export default function CaseStudy() {
  const { slug } = useParams();
  const item = getCaseBySlug(slug);

  if (!item) return <Navigate to="/work" replace />;

  const meta = verdictMeta[item.ruling];
  const index = cases.findIndex((c) => c.slug === slug);
  const next = cases[(index + 1) % cases.length];

  return (
    <PageTransition>
      <article>
        {/* header */}
        <section className="section pt-40 pb-0">
          <div className="shell">
            <Reveal>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 font-mono text-label uppercase text-haze transition-all hover:gap-3 hover:text-white"
              >
                <ArrowLeft size={14} /> All casework
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="font-mono text-label uppercase text-volt">{item.ref}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span className="label">{item.category}</span>
              </div>

              <h1 className="mt-5 max-w-4xl text-display">{item.title}</h1>
              <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white/80">{item.summary}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* verdict panel */}
        <section className="section pb-0">
          <div className="shell">
            <Reveal>
              <GlassCard className="grid gap-8 p-8 sm:grid-cols-3 sm:p-10">
                <div>
                  <span className="label">Ruling</span>
                  <p
                    className="mt-4 font-display text-4xl font-extrabold uppercase leading-none"
                    style={{ color: meta.hex }}
                  >
                    {meta.label}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <SeverityMeter value={item.severity} label="Assessed severity" />
                  <p className="mt-6 text-sm leading-relaxed">
                    Severity reflects exposure to the firm, not the trader's intent.
                    A high score means the structure could repeat and scale, not that
                    the person was necessarily acting in bad faith.
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* body */}
        <section className="section">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_320px]">
            <div className="space-y-14">
              {BLOCKS.map((block, i) => (
                <Reveal key={block.key} delay={i * 0.06}>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="h-px w-10 bg-heat" />
                      <span className="label">{block.label}</span>
                    </div>
                    <p className="mt-6 text-lg leading-relaxed text-white/75">{item[block.key]}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="left" delay={0.12}>
              <GlassCard className="sticky top-28 p-7">
                <span className="label">Signals on file</span>
                <ul className="mt-6 space-y-4">
                  {item.signals.map((signal) => (
                    <li key={signal} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 h-1 w-4 shrink-0 rounded-pill bg-heat" />
                      {signal}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* next case */}
        <section className="section pt-0">
          <div className="shell">
            <Link to={`/work/${next.slug}`} className="group block">
              <GlassCard className="glass-hover flex flex-wrap items-center justify-between gap-6 p-8 sm:p-10">
                <div>
                  <span className="label">Next case</span>
                  <h3 className="mt-4 font-display text-title">
                    <GradientText animate={false}>{next.title}</GradientText>
                  </h3>
                  <p className="mt-2 font-mono text-label uppercase text-haze">{next.category}</p>
                </div>
                <ArrowRight
                  size={26}
                  className="text-volt transition-transform duration-500 group-hover:translate-x-2"
                />
              </GlassCard>
            </Link>
          </div>
        </section>

        <ContactCTA />
      </article>
    </PageTransition>
  );
}
