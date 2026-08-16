import { cn } from "@/lib/cn";

/** Seamless horizontal ticker. Duplicates children to loop without a seam. */
export default function Marquee({ items, className }) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-8 font-display text-2xl font-semibold text-white/25 sm:text-4xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-heat" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
