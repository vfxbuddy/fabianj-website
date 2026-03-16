"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function LoadingScreen() {
  const [statusIndex, setStatusIndex] = useState(0);
  const statusMessages = [
    "INITIALIZING SPATIAL CORE...",
    "MAPPING TRACKING GRID...",
    "STACKING COMPOSITE LAYERS...",
    "CALIBRATING VIEWPORT...",
    "READY."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev < statusMessages.length - 1 ? prev + 1 : prev));
    }, 400); // Faster status cycling
    return () => clearInterval(timer);
  }, [statusMessages.length]);

  // Animation variants (Aligned with PersonalLogo but with cinematic timing)
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 0.15,
      transition: {
        delay: i * 0.03, // Faster grid delay
        duration: 0.4,
      },
    }),
  };

  const layerVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: 10 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 0.4 - i * 0.1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3, // Faster layer delay
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.8, // Faster path delay
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const hudVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: {
        delay: 1.5, // Faster hud delay
        duration: 0.5,
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {/* Cinematic Backdrop Glow */}
        <div className="absolute inset-0 bg-teal-500/5 blur-[100px] rounded-full animate-pulse pointer-events-none" />
        
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-teal-400 stroke-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.2)]"
          initial="hidden"
          animate="visible"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 1. BACKGROUND TRACKING GRID (Exact 4x4 from Logo) */}
          {[...Array(4)].map((_, i) => (
            [...Array(4)].map((_, j) => (
              <motion.circle
                key={`grid-${i}-${j}`}
                cx={6 + i * 4}
                cy={6 + j * 4}
                r="0.5"
                variants={gridVariants}
                custom={i + j}
                className="fill-teal-400"
              />
            ))
          ))}

          {/* 2. OVERLAPPING COMPOSITE LAYERS (Exact from Logo) */}
          <motion.rect
            x="8" y="8" width="12" height="12" rx="1"
            strokeWidth="1"
            variants={layerVariants}
            custom={1}
          />
          <motion.rect
            x="4" y="4" width="12" height="12" rx="1"
            strokeWidth="1.2"
            variants={layerVariants}
            custom={0}
          />

          {/* 3. 'FJ' MONOGRAM (Exact from Logo) */}
          <motion.path
            d="M6 6V18"
            strokeWidth="2"
            variants={pathVariants}
          />
          <motion.path
            d="M6 6H14"
            strokeWidth="2"
            variants={pathVariants}
          />
          <motion.path
            d="M6 12H12"
            strokeWidth="2"
            variants={pathVariants}
          />
          <motion.path
            d="M18 6V16C18 17.1 17.1 18 16 18H12"
            strokeWidth="2"
            variants={pathVariants}
          />

          {/* 4. HUD DETAILS / CROSSHAIRS (Exact from Logo) */}
          <motion.path
            d="M12 2V4M12 20V22M2 12H4M20 12H22"
            strokeWidth="0.5"
            variants={hudVariants}
          />
          
          <motion.circle
            cx="12"
            cy="3"
            r="0.8"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              transition: { delay: 1.8, duration: 1, repeat: Infinity }
            }}
            className="fill-teal-400"
          />
        </motion.svg>
      </div>

      {/* Loading Status Text */}
      <div className="mt-12 text-center">
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] tracking-[0.4em] font-mono text-teal-400/60 uppercase"
            >
              {statusMessages[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-64 h-[2px] bg-white/5 overflow-hidden mx-auto rounded-full">
          <motion.div 
            className="h-full bg-teal-400/40"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
