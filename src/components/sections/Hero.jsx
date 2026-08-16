import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import TiltCard from "@/components/ui/TiltCard";
import GlassCard from "@/components/ui/GlassCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/** Floating status chips orbiting the clearance card at different depths. */
const CHIPS = [
  { label: "KYC verified", tone: "volt", top: "8%", left: "-14%", depth: 70, delay: 0 },
  { label: "Hedging flagged", tone: "plasma", top: "42%", right: "-16%", depth: 95, delay: 1.4 },
  { label: "Payout held", tone: "ember", bottom: "10%", left: "-10%", depth: 55, delay: 2.6 },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <div className="shell grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------------- copy ---------------- */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Badge tone="volt" dot>
              {profile.available ? "Open to roles" : "Currently engaged"}
            </Badge>
          </motion.div>

          <motion.h1 variants={item} className="mt-7 text-mega">
            {profile.first}
            <br />
            <GradientText>{profile.last}</GradientText>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-xl leading-relaxed text-white/85">
            {profile.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Button to="/work">
              Take the desk <ArrowDown size={15} className="-rotate-90" />
            </Button>
            <Button to="/about" variant="ghost">
              Read the mandate
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4"
          >
            {[
              ["Based", profile.location.split(",")[0]],
              ["Sector", "Prop trading"],
              ["Reports to", "CEO · VP"],
              ["Clearance", "AML pending"],
            ].map(([k, v]) => (
              <div key={k} className="bg-void/80 p-4 backdrop-blur-sm">
                <dt className="label">{k}</dt>
                <dd className="mt-2 font-mono text-xs text-white">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------------- 3D clearance card ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -18 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <TiltCard max={14}>
            <GlassCard className="animate-float p-7">
              <div className="flex items-start justify-between">
                <div>
                  <span className="label">Case file</span>
                  <p className="mt-2 font-mono text-sm text-white">AS-2002</p>
                </div>
                <ShieldCheck size={22} className="text-volt" />
              </div>

              <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <h3 className="font-display text-2xl leading-tight">{profile.role}</h3>
              <p className="mt-2 font-mono text-label uppercase text-haze">{profile.sector}</p>

              <ul className="mt-7 space-y-3">
                {[
                  ["Identity", "KYC / Re-KYC"],
                  ["Method", "Violation adjudication"],
                  ["Money", "Payout screening"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between text-sm">
                    <span className="label">{k}</span>
                    <span className="font-mono text-xs text-white/80">{v}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between rounded-xl border border-volt/25 bg-volt/[0.07] px-4 py-3">
                <span className="font-mono text-label uppercase text-volt">Status</span>
                <span className="font-display text-sm font-semibold text-volt">Cleared</span>
              </div>
            </GlassCard>
          </TiltCard>

          {CHIPS.map((chip) => (
            <motion.div
              key={chip.label}
              className="absolute hidden lg:block"
              style={{ top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
            >
              <Badge tone={chip.tone} className="shadow-glass">
                {chip.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="label flex items-center gap-2">
          Scroll <ArrowDown size={13} />
        </span>
      </motion.div>
    </section>
  );
}
