import { cn } from "@/lib/cn";

const TONES = {
  neutral: "border-white/12 text-haze",
  plasma: "border-plasma/40 text-plasma",
  ember: "border-ember/40 text-ember",
  volt: "border-volt/40 text-volt",
  ion: "border-ion/40 text-ion",
};

export default function Badge({ tone = "neutral", dot = false, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border bg-white/[0.03]",
        "px-3 py-1.5 font-mono text-label uppercase backdrop-blur-sm",
        TONES[tone] ?? TONES.neutral,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-ring" />}
      {children}
    </span>
  );
}
