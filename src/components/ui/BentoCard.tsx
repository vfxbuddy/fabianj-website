"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import clsx from "clsx";
import React, { MouseEvent } from "react";
import Image from "next/image";

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  delay?: number;
  backgroundImage?: string;
}

export function BentoCard({ title, description, className, children, icon, delay = 0, backgroundImage }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as any }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      className={clsx(
        "glass-panel group p-8 sm:p-10 flex flex-col items-start text-left cursor-default transition-transform duration-500 relative",
        className
      )}
    >
      {/* Background Image with B&W → Color Hover */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 rounded-[24px] overflow-hidden">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover img-bw-hover opacity-30 group-hover:opacity-50 transition-opacity duration-600"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      )}

      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[23px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(45, 212, 191, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="card-beam transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {icon && (
          <div className="mb-6 h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/10 transition-all duration-500 shadow-[0_4px_20px_transparent] group-hover:shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
            {icon}
          </div>
        )}

        <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
          {title}
        </h3>
        
        <p className="text-slate-400 text-base leading-relaxed flex-grow">
          {description}
        </p>

        {children && (
          <div className="mt-8 w-full border-t border-white/10 pt-6">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}
