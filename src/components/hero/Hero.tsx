"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Play, Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showReel, setShowReel] = useState(false);
  const [currentShow, setCurrentShow] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: isMobile ? "blur(0px)" : "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  // Shows & films roller deck
  const shows = [
    "Wizard of Oz - Sphere",
    "Flight Risk",
    "Shadow Force",
    "Avengers: Age of Ultron",
    "Dr. Strange",
    "Fear",
    "End of the Road",
    "Boss Level",
    "Jay and Silent Bob Reboot",
    "Alien: Covenant",
    "I Saw the Light",
    "Divergent",
    "Saving Mr. Banks",
    "Beautiful Creatures",
    "The Conjuring",
    "Gangster Squad",
    "Nurse 3D",
    "Men In Black 3",
    "Bad Monkey",
    "SEAL Team",
    "Walker: Independence",
    "Batwoman",
    "Supergirl",
    "The Winchesters",
    "His Dark Materials",
    "Black Lightning",
    "Doom Patrol",
    "Mythic Quest",
    "Legends of Tomorrow",
    "Flash",
    "Riverdale",
    "My Crazy Ex-Girlfriend",
    "The Get Down",
    "Person of Interest",
    "Fringe",
    "Revolution",
    "Almost Human",
    "Allegiance",
    "CSI: Cyber",
    "You",
    "Gotham",
  ];

  // Cycle through shows
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShow((prev) => (prev + 1) % shows.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [shows.length]);

  // Smooth out the mouse values
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 3D Tilt calculations
  const tiltX = useTransform(springY, [0, 1000], [5, -5]);
  const tiltY = useTransform(springX, [0, 1600], [-5, 5]);

  // Background glow that follows mouse
  const backgroundGradient = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(45, 212, 191, 0.12), transparent 40%)`
  );

  // Lock body scroll when showReel is open
  useEffect(() => {
    if (showReel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showReel]);

  const closeReel = useCallback(() => setShowReel(false), []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeReel]);

  return (
    <>
      <section className="relative min-h-screen pt-32 pb-24 lg:pt-48 flex items-center justify-center overflow-hidden">
        {/* Background Autoplay Video — Muted, Looping, Cinematic */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/952510254?background=1&autoplay=1&loop=1&muted=1&quality=720p&dnt=1#t=5s"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full"
            allow="autoplay"
            title="Background Showreel"
            style={{ border: 0 }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
        </div>

        {/* Dynamic Background Glow following mouse softly */}
        <motion.div 
          className="absolute inset-0 z-[1] opacity-50 pointer-events-none"
          style={{
            background: backgroundGradient
          }}
        />
        
        {/* High-fidelity ambient glows */}
        <div className="absolute inset-x-0 top-0 h-full w-full overflow-hidden pointer-events-none z-[1]">
          <div className="ambient-glow glow-teal top-[-10%] left-[-10%] w-[800px] h-[800px] animate-breathe" />
          <div className="ambient-glow glow-violet bottom-[-20%] right-[-10%] w-[900px] h-[900px] animate-breathe" style={{ animationDelay: '2s' }} />
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 perspective-1000"
        >
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            {/* Roller Deck Badge — Cycling Shows & Films */}
            <motion.div variants={itemVariants} className="mb-8 flex justify-center w-full">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs tracking-widest font-medium text-slate-300 backdrop-blur-md overflow-hidden">
                <Sparkles size={14} className="text-teal-400 flex-shrink-0" />
                <div className="relative h-4 overflow-hidden w-[180px] sm:w-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentShow}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center uppercase text-teal-300 whitespace-nowrap"
                    >
                      {shows[currentShow]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-[5.5rem] leading-[1.05] text-center w-full"
            >
              Transforming VFX with
              <br />
              <motion.span 
                className="text-gradient-accent inline-block mt-2"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Creative Leadership
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mb-12 max-w-2xl text-lg text-slate-400 sm:text-xl leading-relaxed text-center px-4 font-light tracking-wide"
            >
              Compositing Supervisor | Senior &amp; Lead VFX Compositor | XR Community Builder
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-20"
            >
              <button
                onClick={() => setShowReel(true)}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full btn-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-600 shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-shadow group-hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                  <Play size={12} className="ml-0.5" />
                </div>
                Watch Showreel
              </button>
              <Link
                href="/resume"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-700 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-slate-500 overflow-hidden"
              >
                {/* Background Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-teal-500/20 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  layoutId="buttonGlow"
                />
                
                {/* Shine Sweep Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
                </div>

                <span className="relative z-10 flex items-center gap-2">
                  Industry Experience
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <ScrollIndicator />
      </section>

      {/* Showreel Modal Overlay */}
      <AnimatePresence>
        {showReel && (
          <>
            {/* Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl"
              onClick={closeReel}
            />

            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-8 md:inset-16 lg:inset-20 z-[101] flex items-center justify-center"
            >
              <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-teal-500/10">
                <iframe
                  src="https://player.vimeo.com/video/952510254?autoplay=1&title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=1&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Fabian Jimenez - Compositing Showreel 2024"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={closeReel}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors z-10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
