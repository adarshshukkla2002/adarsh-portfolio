import { Link } from "react-router-dom";
import { Mail, Linkedin, Phone, ArrowUpRight } from "lucide-react";
import { profile, navigation } from "@/data/profile";
import GradientText from "@/components/ui/GradientText";

const CHANNELS = [
  { key: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { key: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, Icon: Linkedin },
  { key: "Direct", value: profile.phone, href: profile.phoneHref, Icon: Phone },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-display">
              Bring me the <GradientText>hard cases</GradientText>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              Open to compliance and payout risk roles in proprietary trading,
              brokerage and fintech.
            </p>
          </div>

          <div>
            <span className="label">Channels</span>
            <ul className="mt-5 space-y-1">
              {CHANNELS.map(({ key, value, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 border-b border-white/8 py-4 transition-all duration-400 hover:pl-2"
                  >
                    <Icon size={16} className="shrink-0 text-haze transition-colors group-hover:text-volt" />
                    <span className="min-w-0 flex-1 truncate font-mono text-sm text-white">{value}</span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 -translate-x-1 text-volt opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="label">
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <ul className="flex flex-wrap gap-6">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="label transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="label">{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}
