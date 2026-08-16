import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * 3D tilt surface with a pointer-tracked specular highlight.
 * Children can opt into depth with `translate-z` style values.
 */
export default function TiltCard({ children, className, max = 10, glare = true }) {
  const reduced = useReducedMotion();
  const { ref, tilt, glow, active, handlers } = useMouseTilt({ max });

  const transform = reduced
    ? undefined
    : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${active ? 1.02 : 1})`;

  return (
    <div className="scene">
      <div
        ref={ref}
        {...(reduced ? {} : handlers)}
        style={{ transform, transition: active ? "transform 120ms ease-out" : "transform 600ms cubic-bezier(0.16,1,0.3,1)" }}
        className={cn("preserve-3d relative", className)}
      >
        {children}
        {glare && !reduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.14), transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
