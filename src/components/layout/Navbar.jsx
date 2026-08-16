import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation, profile } from "@/data/profile";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-white/8 bg-void/70 backdrop-blur-glass" : "bg-transparent"
      )}
    >
      <nav className="shell flex items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-3" aria-label="Home">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-heat font-display text-sm font-extrabold text-void">
            AS
          </span>
          <span className="hidden font-mono text-label uppercase text-haze sm:block">
            Compliance <span className="text-white/30">/</span> Payouts
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-pill px-4 py-2 font-mono text-label uppercase transition-colors duration-300",
                    isActive ? "text-white" : "text-haze hover:text-white"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-pill border border-white/12 bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button href={`mailto:${profile.email}`} variant="ghost" className="hidden sm:inline-flex">
            Get in touch
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <ScrollProgress />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[68px] z-40 bg-void/95 backdrop-blur-glass md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="shell flex flex-col gap-2 pt-10">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className="block border-b border-white/8 py-5 font-display text-title text-white"
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
