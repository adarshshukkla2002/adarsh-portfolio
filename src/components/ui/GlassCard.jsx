import { cn } from "@/lib/cn";

/**
 * Base frosted surface. Every panel in the site composes from this
 * so blur, border and sheen stay identical everywhere.
 */
export default function GlassCard({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cn("glass overflow-hidden", className)} {...rest}>
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
