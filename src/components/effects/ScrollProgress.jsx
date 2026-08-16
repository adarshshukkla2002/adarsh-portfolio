import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Heat-gradient reading line pinned under the navbar. */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="absolute inset-x-0 bottom-0 h-px bg-white/5" aria-hidden>
      <div
        className="h-full bg-heat transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
