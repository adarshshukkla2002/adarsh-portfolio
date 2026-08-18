import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { resolveVisitor, ping } from "@/lib/visitor";

/** Only report a case-study read once it means something. */
const DWELL_MIN_SECONDS = 20;

/**
 * Two signals, deliberately not more:
 *   1. one arrival alert per session  — who showed up, from where
 *   2. a dwell alert per case study   — what they actually read
 *
 * Route-by-route pings were tempting but would turn a single visit into
 * five notifications, which is how you end up muting the bot.
 */
export default function useVisitTracking() {
  const location = useLocation();
  const visitor = useRef(null);
  const announced = useRef(false);

  if (!visitor.current) visitor.current = resolveVisitor();

  // Arrival — fires once, on the landing route.
  useEffect(() => {
    const v = visitor.current;
    if (!v || !v.isNewSession || announced.current) return;
    announced.current = true;

    ping({
      event: "view",
      path: location.pathname,
      ref: v.ref,
      referrer: v.referrer,
      visitCount: v.visitCount,
      returning: v.returning,
      device: v.device,
      screen: v.screen,
      timezone: v.timezone,
    });
    // Intentionally not re-running on route change — arrival is a one-shot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dwell — case studies only.
  useEffect(() => {
    const v = visitor.current;
    const isCaseStudy = /^\/work\/[^/]+$/.test(location.pathname);
    if (!v || !isCaseStudy) return;

    const started = Date.now();
    let sent = false;

    const report = () => {
      if (sent) return;
      const seconds = Math.round((Date.now() - started) / 1000);
      if (seconds < DWELL_MIN_SECONDS) return;
      sent = true;
      ping(
        {
          event: "dwell",
          path: location.pathname,
          ref: v.ref,
          referrer: v.referrer,
          visitCount: v.visitCount,
          returning: v.returning,
          seconds,
        },
        { beacon: true }
      );
    };

    window.addEventListener("pagehide", report);
    return () => {
      window.removeEventListener("pagehide", report);
      report(); // navigated away within the SPA
    };
  }, [location.pathname]);
}
