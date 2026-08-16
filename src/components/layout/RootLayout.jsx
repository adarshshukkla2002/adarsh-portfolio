import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import AuroraCanvas from "@/components/effects/AuroraCanvas";
import Cursor from "@/components/effects/Cursor";

/** Persistent chrome. Only the <Outlet /> swaps between routes. */
export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <AuroraCanvas />
      <Cursor />
      <ScrollToTop />
      <Navbar />

      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
