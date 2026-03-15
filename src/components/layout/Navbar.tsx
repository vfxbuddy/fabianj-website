"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { PersonalLogo } from "@/components/ui/PersonalLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/xr", label: "XR" },
  { href: "/resume", label: "Résumé" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "mt-6 transition-all duration-700 pointer-events-auto",
          scrolled ? "w-[90%] max-w-3xl" : "w-[95%] max-w-4xl"
        )}
      >
        <nav className={clsx(
          "glass-pill backdrop-blur-xl bg-slate-950/50 flex items-center justify-between px-6 py-3 border transition-colors duration-500",
          pathname === "/xr" ? "border-violet-500/50" : "border-teal-500/50"
        )}>
          {/* Logo */}
          <Link
            href="/"
            className="text-base font-bold tracking-[0.15em] text-white transition-opacity hover:opacity-80 flex items-center gap-2 group"
          >
            <PersonalLogo 
              themeColor={pathname === "/xr" ? "violet" : "teal"} 
              className="w-7 h-7"
            />
            FABIAN <span className={clsx(
              "font-normal transition-colors",
              pathname === "/xr" ? "text-violet-500 group-hover:text-violet-400" : "text-teal-400 group-hover:text-teal-300"
            )}>JIMENEZ</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "group relative px-4 py-2 text-sm transition-colors duration-300 rounded-full flex items-center justify-center",
                    isActive 
                      ? "text-white font-medium" 
                      : (link.href === "/xr" ? "text-slate-400 hover:text-violet-400" : "text-slate-400 hover:text-teal-400")
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Active background pill (moves fluidly via layoutId to the selected item) */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={clsx(
                        "absolute inset-0 bg-white/10 transition-colors duration-300 rounded-full",
                        link.href === "/xr" ? "group-hover:bg-violet-500/20" : "group-hover:bg-teal-500/20"
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Scratch Animation Container */}
                  <div className={clsx(
                    link.href === "/xr" ? "nav-film-scratch-violet" : "nav-film-scratch", 
                    isActive && "animate-scratch-once"
                  )} />
                </Link>
              );
            })}
            
            <div className="w-px h-5 bg-white/10 mx-2" />
            
            <Link
              href="/contact"
              className="ml-2 rounded-full bg-white text-slate-950 px-5 py-2 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-panel p-2 flex flex-col pointer-events-auto"
          >
            <div className="flex flex-col gap-1 p-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center rounded-xl bg-white text-slate-950 px-6 py-3 text-sm font-semibold"
                >
                  Book a Call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

