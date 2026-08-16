import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Reads the heat scale literally: the fill tracks severity along the
 * same plasma → ember → volt axis the palette is built on.
 */
export default function SeverityMeter({ value = 0, label = "Severity", className }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between">
        <span className="label">{label}</span>
        <span className="font-mono text-sm text-white">{value}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-white/8">
        <motion.div
          className="h-full rounded-pill bg-heat"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}
