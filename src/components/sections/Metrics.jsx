import { profile } from "@/data/profile";
import { useCountUp } from "@/hooks/useCountUp";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import GradientText from "@/components/ui/GradientText";

function Metric({ value, suffix, label, delay }) {
  const { ref, value: shown } = useCountUp(value);

  return (
    <Reveal delay={delay}>
      <GlassCard className="glass-hover h-full p-7">
        <div ref={ref}>
          <span className="font-display text-5xl font-extrabold leading-none">
            <GradientText animate={false}>
              {shown}
              {suffix}
            </GradientText>
          </span>
          <p className="mt-4 text-sm leading-snug text-haze">{label}</p>
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function Metrics() {
  return (
    <section className="section pt-0">
      <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.metrics.map((m, i) => (
          <Metric key={m.label} {...m} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
