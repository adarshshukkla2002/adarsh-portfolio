import { profile } from "@/data/profile";
import { education } from "@/data/experience";
import PageTransition from "@/components/effects/PageTransition";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import SkillsGrid from "@/components/sections/SkillsGrid";
import ContactCTA from "@/components/sections/ContactCTA";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import GradientText from "@/components/ui/GradientText";
import { motion } from "framer-motion";

export default function About() {
  return (
    <PageTransition>
      {/* intro */}
      <section className="section pt-40">
        <div className="shell">
          <Reveal>
            <span className="label">The mandate</span>
            <h1 className="mt-6 max-w-4xl text-display">
              Every payout is a decision about <GradientText>who the firm trusts</GradientText>
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              {profile.about.map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-lg leading-relaxed text-white/75">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal direction="left" delay={0.15}>
              <GlassCard className="p-7">
                <span className="label">On file</span>
                <dl className="mt-6 space-y-5">
                  {[
                    ["Name", profile.name],
                    ["Role", profile.role],
                    ["Sector", profile.sector],
                    ["Location", profile.location],
                    ["Escalation", "CEO · Co-CEO · VP"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-white/8 pb-4 last:border-0 last:pb-0">
                      <dt className="label">{k}</dt>
                      <dd className="mt-2 font-mono text-sm text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <ExperienceTimeline />

      {/* credentials */}
      <section className="section pt-0">
        <div className="shell">
          <SectionHeading eyebrow="Credentials" title="Qualifications" accent="on record" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {education.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <GlassCard className="glass-hover h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="label">{item.period}</span>
                    <span className="font-mono text-label uppercase text-volt">{item.status}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm">{item.org}</p>
                  <div className="mt-7 h-1 w-full overflow-hidden rounded-pill bg-white/8">
                    <motion.div
                      className="h-full rounded-pill bg-heat"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    />
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SkillsGrid />
      <ContactCTA />
    </PageTransition>
  );
}
