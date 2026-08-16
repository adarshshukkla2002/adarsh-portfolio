import { skillGroups } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import GlassCard from "@/components/ui/GlassCard";

const DOT = {
  ion: "bg-ion",
  plasma: "bg-plasma",
  ember: "bg-ember",
  volt: "bg-volt",
};

export default function SkillsGrid() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading eyebrow="Instruments" title="Tools of" accent="the desk" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08}>
              <TiltCard max={8}>
                <GlassCard className="glass-hover h-full p-7">
                  <span className={`block h-1.5 w-8 rounded-pill ${DOT[group.accent]}`} />
                  <h3 className="mt-6 font-display text-lg leading-tight">{group.title}</h3>
                  <ul className="mt-6 space-y-0">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-white/6 py-3 text-sm transition-all duration-300 last:border-0 hover:pl-2 hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
