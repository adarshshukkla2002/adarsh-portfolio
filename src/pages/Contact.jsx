import { Mail, Linkedin, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import PageTransition from "@/components/effects/PageTransition";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import GradientText from "@/components/ui/GradientText";

const CHANNELS = [
  { key: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, note: "Fastest route" },
  { key: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, Icon: Linkedin, note: "Profile & history" },
  { key: "Direct", value: profile.phone, href: profile.phoneHref, Icon: Phone, note: "For scheduled calls" },
  { key: "Based", value: profile.location, href: null, Icon: MapPin, note: "IST — UTC+5:30" },
];

export default function Contact() {
  return (
    <PageTransition>
      <section className="section pt-40">
        <div className="shell">
          <Reveal>
            <span className="label">Contact</span>
            <h1 className="mt-6 max-w-4xl text-display">
              Bring me the <GradientText>hard cases</GradientText>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed">
              Open to compliance, payout risk and financial crime roles across
              proprietary trading, brokerage and fintech. If you have a desk that
              needs judgment rather than a checklist, start here.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {CHANNELS.map((channel, i) => {
              const Wrapper = channel.href ? "a" : "div";
              return (
                <Reveal key={channel.key} delay={i * 0.08}>
                  <TiltCard max={8}>
                    <Wrapper
                      {...(channel.href
                        ? {
                            href: channel.href,
                            target: channel.href.startsWith("http") ? "_blank" : undefined,
                            rel: "noreferrer",
                          }
                        : {})}
                      className="group block h-full"
                    >
                      <GlassCard className="glass-hover h-full p-8">
                        <div className="flex items-start justify-between">
                          <channel.Icon size={22} className="text-volt" />
                          {channel.href && (
                            <ArrowUpRight
                              size={18}
                              className="text-haze transition-all duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                            />
                          )}
                        </div>
                        <span className="mt-8 block label">{channel.key}</span>
                        <p className="mt-3 break-words font-display text-xl text-white">
                          {channel.value}
                        </p>
                        <p className="mt-2 font-mono text-label uppercase text-haze/70">
                          {channel.note}
                        </p>
                      </GlassCard>
                    </Wrapper>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
