import Reveal from "./Reveal";
import GradientText from "./GradientText";
import { cn } from "@/lib/cn";

export default function SectionHeading({ eyebrow, title, accent, lead, className, align = "left" }) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
          <span className="h-px w-10 bg-heat" />
          <span className="label">{eyebrow}</span>
        </div>
      )}
      <h2 className="mt-5 text-display">
        {title} {accent && <GradientText>{accent}</GradientText>}
      </h2>
      {lead && (
        <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
