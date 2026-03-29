"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { PersonalLogo } from "@/components/ui/PersonalLogo";

const navLinks = [
  { href: "#home",    label: "Home",    sectionId: "hero-section" },
  { href: "#gallery", label: "Gallery", sectionId: "gallery" },
  { href: "#xr",      label: "XR",      sectionId: "xr" },
  { href: "#resume",  label: "Résumé",  sectionId: "resume" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero-section");
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy — find which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      const sectionIds = navLinks.map((l) => l.sectionId);

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set correct active on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll to section on nav click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const isXrActive = activeSection === "xr";

  const navBorderColor = mounted && theme === "light"
    ? "rgba(0, 0, 0, 0.3)"
    : isXrActive
      ? "rgba(139, 92, 246, 0.6)"
      : "rgba(20, 184, 166, 0.6)";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 pointer-events-auto w-[95%] max-w-4xl relative"
      >
        <nav
          className="glass-pill backdrop-blur-xl flex items-center justify-between px-6 py-3"
          style={{ "--nav-border-color": navBorderColor } as React.CSSProperties}
        >
          {/* Logo */}
          <a
            href="#hero-section"
            onClick={(e) => handleNavClick(e, "hero-section")}
            className="text-base font-bold tracking-[0.15em] text-foreground transition-opacity hover:opacity-80 flex items-center gap-2 group"
          >
            <PersonalLogo
              themeColor={isXrActive ? "violet" : "teal"}
              className="w-7 h-7"
            />
            FABIAN <span className={clsx(
              "font-normal transition-colors",
              isXrActive
                ? "text-accent-violet group-hover:opacity-70"
                : "text-accent-teal group-hover:opacity-70"
            )}>JIMENEZ</span>
          </a>

          {/* Desktop Links & Tools */}
          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.sectionId)}
                      className={clsx(
                        "group relative px-4 py-2 text-sm transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer",
                        isActive
                          ? (link.sectionId === "xr" ? "text-accent-violet font-medium" : "text-accent-teal font-medium")
                          : (link.sectionId === "xr" ? "text-muted hover:text-accent-violet" : "text-muted hover:text-accent-teal")
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>

                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className={clsx(
                            "absolute inset-0 transition-colors duration-300 rounded-full",
                            link.sectionId === "xr"
                              ? "bg-accent-violet/10 dark:bg-accent-violet/10 group-hover:bg-accent-violet/20"
                              : "bg-accent-teal/10 dark:bg-accent-teal/10 group-hover:bg-accent-teal/20"
                          )}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className={clsx(
                        link.sectionId === "xr" ? "nav-film-scratch-violet" : "nav-film-scratch",
                        isActive && "animate-scratch-once"
                      )} />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="w-px h-5 bg-border mx-2" />

            {/* Theme Toggle Desktop */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="w-[18px] h-[18px]" />
              ) : theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="ml-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Right Tools */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="w-[18px] h-[18px]" />
              ) : theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 rounded-full p-2 text-muted transition-colors hover:bg-white/10"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, rotateX: -90, transformOrigin: "top", scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20 } }}
              exit={{ opacity: 0, rotateX: -90, scale: 0.9, transition: { duration: 0.3, ease: "easeInOut", delay: 0.2 } }}
              className="absolute top-full left-0 right-0 mx-auto mt-3 w-full p-4 flex flex-col pointer-events-auto border-[1px] border-[var(--nav-border-color)] bg-slate-950/50 backdrop-blur-xl backdrop-saturate-[180%] rounded-[2rem] shadow-[20px_40px_80px_-15px_rgba(0,0,0,0.8)]"
              style={{
                perspective: "1000px",
                "--nav-border-color": navBorderColor,
                "--nav-active-bg": mounted && theme === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : isXrActive
                    ? "rgba(139, 92, 246, 0.2)"
                    : "rgba(20, 184, 166, 0.2)"
              } as React.CSSProperties}
            >
              <div className="flex flex-col gap-1 p-2">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: isOpen ? (i * 0.05 + 0.1) : ((navLinks.length - i) * 0.05) }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.sectionId)}
                        className={clsx(
                          "block rounded-xl px-4 py-3 text-sm font-medium transition-colors text-right cursor-pointer",
                          isActive
                            ? "bg-[var(--nav-active-bg)] text-foreground shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                            : "text-muted hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, x: 10 }}
                  transition={{ delay: isOpen ? 0.35 : 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "contact")}
                    className={clsx(
                      "block w-full text-right rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer",
                      activeSection === "contact"
                        ? "bg-white/20 text-white shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    Let's Talk
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
