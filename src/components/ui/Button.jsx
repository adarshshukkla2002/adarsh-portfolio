import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden " +
  "rounded-pill px-7 py-3.5 font-mono text-label uppercase transition-all duration-400";

const VARIANTS = {
  primary: "bg-heat text-void font-semibold hover:shadow-lift hover:-translate-y-0.5",
  ghost:
    "border border-white/15 bg-white/[0.03] text-white backdrop-blur-glass " +
    "hover:border-white/30 hover:bg-white/[0.07] hover:-translate-y-0.5",
  quiet: "text-haze hover:text-white",
};

export default function Button({
  variant = "primary",
  to,
  href,
  className,
  children,
  ...rest
}) {
  const classes = cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, className);

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span
          className="absolute inset-0 -translate-x-full bg-white/25 transition-transform
                     duration-600 group-hover:translate-x-0"
        />
      )}
    </>
  );

  if (to) return <Link to={to} className={classes} {...rest}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
