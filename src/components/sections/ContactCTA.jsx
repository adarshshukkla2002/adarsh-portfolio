import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <GlassCard className="overflow-hidden p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-heat-soft" />
            <span className="label">Next case</span>
            <h2 className="mx-auto mt-6 max-w-3xl text-display">
              If the decision is <GradientText>difficult</GradientText>, it's mine
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">
              Open to compliance and payout risk roles in proprietary trading,
              brokerage and fintech.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={`mailto:${profile.email}`}>
                Email me <ArrowUpRight size={15} />
              </Button>
              <Button href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost">
                LinkedIn
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
