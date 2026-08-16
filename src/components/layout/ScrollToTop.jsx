import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset scroll on route change — routers don't do this by default. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
