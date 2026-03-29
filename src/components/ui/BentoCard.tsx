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
  vimeoId?: string;
}

export function BentoCard({ title, description, className, children, icon, delay = 0, backgroundImage, vimeoId }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
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
      {/* Background Media with B&W → Color Hover */}
      {(backgroundImage || vimeoId) && (
        <div className="absolute inset-0 z-0 rounded-[24px] overflow-hidden">
          {vimeoId ? (
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen"
                allow="autoplay; fullscreen"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          ) : backgroundImage && (
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover img-bw-hover opacity-40 group-hover:opacity-70 transition-opacity duration-600"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        </div>
      )}

      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[23px] opacity-0 transition duration-300 dark:group-hover:opacity-100 group-hover:opacity-40"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--accent-rgb), 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="card-beam transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {icon && (
          <div className="mb-6 h-12 w-12 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center text-accent-teal group-hover:scale-110 group-hover:bg-accent-teal/5 transition-all duration-500">
            {icon}
          </div>
        )}

        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h3>
        
        <p className="text-muted text-base leading-relaxed flex-grow">
          {description}
        </p>

        {children && (
          <div className="mt-8 w-full border-t border-border pt-6">
            {children}
          </div>
        )}
      </div>
    </motion.article>
  );
}
