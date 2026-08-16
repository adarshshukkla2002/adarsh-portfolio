import { cn } from "@/lib/cn";

/** Heat-scale gradient type. Animates the sweep unless told not to. */
export default function GradientText({ children, className, animate = true }) {
  return (
    <span className={cn("text-heat", animate && "animate-shimmer", className)}>
      {children}
    </span>
  );
}
