import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";

export default function ExperienceTimeline() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Record of service"
          title="Where the work"
          accent="was done"
        />

        <div className="relative mt-14">
          {/* spine */}
          <motion.div
            className="absolute left-0 top-0 hidden w-px bg-heat md:block"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-6 md:pl-10">
            {experience.map((role, i) => (
              <Reveal key={role.id} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[46px] top-8 hidden h-3 w-3 rounded-full bg-heat ring-4 ring-void md:block" />
                  <GlassCard className="glass-hover p-7 sm:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-title">{role.title}</h3>
                        <p className="mt-2 font-mono text-label uppercase text-haze">
                          {role.org} <span className="text-white/25">/</span> {role.orgType}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span className="font-mono text-xs text-white/70">
                          {role.from} — {role.to}
                        </span>
                        {role.current && (
                          <Badge tone="volt" dot>
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="mt-5 max-w-2xl leading-relaxed text-white/70">{role.summary}</p>

                    <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2">
                      {role.duties.map((duty) => (
                        <li key={duty.head} className="group bg-void/80 p-5 transition-colors hover:bg-void/40">
                          <h4 className="font-display text-base font-semibold text-white">
                            {duty.head}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed">{duty.body}</p>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
