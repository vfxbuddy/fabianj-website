"use client";

import { motion, Variants } from "framer-motion";
import clsx from "clsx";

interface PersonalLogoProps {
  className?: string;
  themeColor?: "teal" | "violet" | "white";
}

export function PersonalLogo({ className, themeColor = "white" }: PersonalLogoProps) {
  const colorMap = {
    teal: "stroke-teal-400 fill-teal-400",
    violet: "stroke-violet-500 fill-violet-500",
    white: "stroke-white fill-white",
  };

  const selectedColor = colorMap[themeColor];

  // Animation variants
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 0.2,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  const layerVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 0.4 - i * 0.1,
      transition: {
        delay: i * 0.2 + 0.5,
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
        delay: 1,
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("transition-colors duration-500", className)}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 1. BACKGROUND TRACKING GRID (The foundation) */}
      {[...Array(4)].map((_, i) => (
        [...Array(4)].map((_, j) => (
          <motion.circle
            key={`grid-${i}-${j}`}
            cx={6 + i * 4}
            cy={6 + j * 4}
            r="0.5"
            variants={gridVariants}
            custom={i + j}
            className={selectedColor}
          />
        ))
      ))}

      {/* 2. OVERLAPPING COMPOSITE LAYERS (Grid-aligned) */}
      <motion.rect
        x="8" y="8" width="12" height="12" rx="1"
        strokeWidth="1"
        variants={layerVariants}
        custom={1}
        className={selectedColor}
      />
      <motion.rect
        x="4" y="4" width="12" height="12" rx="1"
        strokeWidth="1.2"
        variants={layerVariants}
        custom={0}
        className={selectedColor}
      />

      {/* 3. 'FJ' MONOGRAM (The final render) */}
      {/* The 'F' */}
      <motion.path
        d="M6 6V18"
        strokeWidth="2"
        variants={pathVariants}
        className={selectedColor}
      />
      <motion.path
        d="M6 6H14"
        strokeWidth="2"
        variants={pathVariants}
        className={selectedColor}
      />
      <motion.path
        d="M6 12H12"
        strokeWidth="2"
        variants={pathVariants}
        className={selectedColor}
      />

      {/* The 'J' */}
      <motion.path
        d="M18 6V16C18 17.1 17.1 18 16 18H12"
        strokeWidth="2"
        variants={pathVariants}
        className={selectedColor}
      />

      {/* 4. CROSSHAIR / FOCUS DATA (HUD Details) */}
      <motion.path
        d="M12 2V4M12 20V22M2 12H4M20 12H22"
        strokeWidth="0.5"
        className={clsx("opacity-30", selectedColor)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      />
    </motion.svg>
  );
}
