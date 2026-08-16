import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Trailing ring cursor. Disabled on touch devices and when the
 * visitor has asked for reduced motion.
 */
export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      const el = e.target;
      setHot(Boolean(el.closest?.("a, button, [data-cursor]")));
    };

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${current.current.x - 18}px, ${current.current.y - 18}px, 0) scale(${hot ? 1.5 : 1})`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled, hot]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={ringRef}
        className="absolute h-9 w-9 rounded-full border transition-[border-color,background-color] duration-300"
        style={{
          borderColor: hot ? "rgba(198,245,60,0.9)" : "rgba(255,255,255,0.35)",
          backgroundColor: hot ? "rgba(198,245,60,0.10)" : "transparent",
        }}
      />
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}
