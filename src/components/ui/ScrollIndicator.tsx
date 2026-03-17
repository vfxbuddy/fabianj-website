"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  variant?: "teal" | "violet";
}

export function ScrollIndicator({ variant = "teal" }: ScrollIndicatorProps) {
  const fromColor = variant === "teal" ? "from-teal-500/50" : "from-violet-500/50";
  const viaColor = variant === "teal" ? "via-teal-400" : "via-violet-400";

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted font-medium">
        Scroll
      </span>
      <div className={`w-[1px] h-12 bg-gradient-to-b ${fromColor} to-transparent relative overflow-hidden`}>
        <motion.div 
          animate={{ 
            y: ["-100%", "100%"] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent ${viaColor} to-transparent`}
        />
      </div>
    </motion.div>
  );
}
