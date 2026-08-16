import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Ambient background. Four soft-bodied blobs drifting on lissajous
 * paths, composited additively and heavily blurred — a mesh gradient
 * without the WebGL dependency. Pointer nudges the field slightly.
 */

const BLOBS = [
  { color: "255,46,136", r: 0.55, ax: 0.22, ay: 0.16, sx: 0.00013, sy: 0.00019, ox: 0.3, oy: 0.35 },
  { color: "255,122,41", r: 0.48, ax: 0.26, ay: 0.2, sx: 0.00017, sy: 0.00011, ox: 0.7, oy: 0.3 },
  { color: "198,245,60", r: 0.4, ax: 0.2, ay: 0.24, sx: 0.00009, sy: 0.00021, ox: 0.55, oy: 0.72 },
  { color: "36,224,255", r: 0.5, ax: 0.24, ay: 0.18, sx: 0.00015, sy: 0.00008, ox: 0.25, oy: 0.68 },
];

export default function AuroraCanvas({ intensity = 0.5 }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e) => {
      pointerRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const paint = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const { x: px, y: py } = pointerRef.current;
      const base = Math.min(width, height);

      BLOBS.forEach((blob) => {
        const cx =
          (blob.ox + Math.sin(time * blob.sx) * blob.ax + (px - 0.5) * 0.06) * width;
        const cy =
          (blob.oy + Math.cos(time * blob.sy) * blob.ay + (py - 0.5) * 0.06) * height;
        const radius = base * blob.r;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${blob.color},${0.3 * intensity})`);
        gradient.addColorStop(0.45, `rgba(${blob.color},${0.11 * intensity})`);
        gradient.addColorStop(1, `rgba(${blob.color},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      if (!reduced) frameRef.current = requestAnimationFrame(paint);
    };

    resize();
    paint(0);

    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced, intensity]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full opacity-80 blur-[70px]" />
      <div className="absolute inset-0 bg-grid bg-grid opacity-[0.55]" />
      <div className="noise absolute inset-0 opacity-[0.16] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/45 via-transparent to-void" />
    </div>
  );
}
