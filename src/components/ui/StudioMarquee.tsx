"use client";

import { motion } from "framer-motion";

const studios = [
  "Digital Domain",
  "Refuge Visual Effects",
  "Encore VFX",
  "Luma Pictures",
  "FuseFX",
  "Method Studios",
  "CoSA VFX",
  "Technicolor",
  "Prime Focus",
  "Pixel Magic",
  "Antenna Creative",
  "Lex & Otis Animation",
  "Version Zero",
  "Layer",
  "Synaptic Studios",
];

export function StudioMarquee() {
  // Duplicate the list for seamless infinite scroll
  const allStudios = [...studios, ...studios];

  return (
    <section className="relative py-16 overflow-hidden border-t border-b border-white/5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

      <p className="text-center text-[10px] font-semibold tracking-[0.3em] text-slate-600 uppercase mb-10">
        Studios & Companies
      </p>

      <motion.div
        className="flex items-center whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 90,
            ease: "linear",
          },
        }}
      >
        {allStudios.map((studio, i) => (
          <span
            key={i}
            className="text-slate-500 text-lg sm:text-xl font-medium tracking-wide hover:text-white transition-colors duration-300 cursor-default select-none flex-shrink-0 pr-24 sm:pr-32"
          >
            {studio}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
