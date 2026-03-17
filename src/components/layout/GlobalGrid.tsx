"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

export function GlobalGrid() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === "light";
  
  // Track mouse for the ambient cursor glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Set initial position to center
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // The subtle global cursor glow that changes color based on the route
  const backgroundGradient = useTransform(
    [springX, springY],
    ([x, y]) => {
      if (!mounted) return "none";

      // Lite mode: subtle dark cursor glow
      if (isLight) {
        return `radial-gradient(800px circle at ${x}px ${y}px, rgba(0, 0, 0, 0.05), transparent 40%)`;
      }

      let glowColor = "rgba(45, 212, 191, 0.08)"; // Default teal hint
      
      if (pathname === "/xr") {
        glowColor = "rgba(168, 85, 247, 0.08)"; // Purple hint
      } else if (pathname === "/resume") {
        glowColor = "rgba(45, 212, 191, 0.12)"; // Slightly stronger teal
      } else if (pathname === "/") {
        glowColor = "rgba(255, 255, 255, 0.05)"; // White hint
      }
      
      return `radial-gradient(800px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`;
    }
  );

  // Specifically skip the homepage grid as the Hero component has its own complex video background and grid overlays
  // (We still return the wrapper div below so the global cursor glow works on the homepage)
  const isHome = pathname === "/";

  // Default grid color
  let gridColor = isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"; 

  // Dynamic route-based tinting (only for Dark mode to maintain minimalism in Lite)
  if (!isLight) {
    if (pathname === "/xr") {
      gridColor = "rgba(168, 85, 247, 0.1)"; // Brighter purple for XR
    } else if (pathname === "/resume") {
      gridColor = "rgba(45, 212, 191, 0.06)"; // Ultra-subtle teal
    }
  }

  return (
    <>
      {/* 1. Global Interactive Cursor Glow */}
      <motion.div 
        className="fixed inset-0 z-[1] pointer-events-none transition-colors duration-[1500ms]"
        style={{ background: backgroundGradient }}
      />

      {/* 2. Global Static Background Grid (Skipped on Home) */}
      {!isHome && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none transition-colors duration-[1500ms] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      )}
    </>
  );
}
