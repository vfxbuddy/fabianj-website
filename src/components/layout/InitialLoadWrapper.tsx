"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function InitialLoadWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    
    // Timer for the loading screen (matching the logo animation duration)
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: "blur(20px)",
              scale: 1.05,
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[1000]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          y: isLoading ? 20 : 0
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={isLoading ? "pointer-events-none" : ""}
      >
        {children}
      </motion.div>
    </>
  );
}
