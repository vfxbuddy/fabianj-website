"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import galleryData from "@/data/gallery.json";
import { useEffect, useState } from "react";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Clapperboard } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface PosterCardProps {
  title: string;
  year?: string;
  poster: string | null;
}

function PosterCard({ title, year, poster }: PosterCardProps) {
  if (!poster) return null;

  return (
    <article
      className="group relative w-[200px] sm:w-[300px] aspect-[2/3] rounded-xl overflow-hidden glass-panel border border-white/5 hover:border-teal-400/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] flex-shrink-0 hover:z-[50]"
    >
      <Image
        src={poster}
        alt={title}
        fill
        sizes="(max-w-768px) 200px, 300px"
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
        <h3 className="text-white font-bold text-base sm:text-xl leading-tight drop-shadow-lg">
          {title}
        </h3>
        {year && (
          <p className="text-teal-400 text-[10px] sm:text-xs font-semibold tracking-widest mt-1 drop-shadow-md">
            {year}
          </p>
        )}
      </div>

      {/* Subtle border shine on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors pointer-events-none rounded-xl" />
    </article>
  );
}

interface MarqueeProps {
  items: PosterCardProps[];
  direction?: "left" | "right";
  speed?: number;
}

function Marquee({ items, direction = "left", speed = 40 }: MarqueeProps) {
  const [validItems, setValidItems] = useState<PosterCardProps[]>([]);

  useEffect(() => {
    setValidItems(items || []);
  }, [items]);

  if (validItems.length === 0) return null;

  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <>
      <div
        className="group/marquee relative w-full py-12"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div
          className="flex gap-8 sm:gap-16 w-max px-8 sm:px-16"
          style={{
            animation: `${animName} ${speed}s linear infinite`,
            animationPlayState: 'running',
          }}
        >
          {[...validItems, ...validItems].map((item, i) => (
            <PosterCard key={`${item.title}-${i}`} {...item} />
          ))}
        </div>

        <div
          className="absolute inset-y-0 left-0 w-[30%] z-[20] pointer-events-none backdrop-grayscale backdrop-blur-[2px]"
          style={{
            maskImage: 'linear-gradient(to right, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 100%)'
          }}
        />

        <div
          className="absolute inset-y-0 right-0 w-[30%] z-[20] pointer-events-none backdrop-grayscale backdrop-blur-[2px]"
          style={{
            maskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)'
          }}
        />
      </div>
    </>
  );
}

export function GallerySection() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: isMobile ? "blur(0px)" : "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="gallery" className="pt-32 pb-48 relative overflow-hidden">
      {/* Background Ambience / Glows */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-teal-500/[0.03] dark:bg-teal-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/[0.03] dark:bg-violet-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      <div className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20">
            <motion.div variants={fadeUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-teal/30 bg-accent-teal/10 text-accent-teal text-xs uppercase tracking-widest">
                <Clapperboard size={14} /> Film • Television
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              <span className="text-foreground">Production </span>
              <span className="text-teal-400 dark:bg-gradient-to-r dark:from-teal-400 dark:to-cyan-400 dark:bg-clip-text dark:text-transparent">Gallery</span>
            </h2>
            <p className="text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
              VFX Credits for Screens Big, Small, and Everything In Between
            </p>

            <div className="relative h-24 mt-12">
              <ScrollIndicator />
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Video Player - Vimeo Embed */}
            <motion.div variants={fadeUp} className="mb-32 mx-auto w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black relative">
              <iframe
                src="https://player.vimeo.com/video/952510254?title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=0&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0&color=000000"
                className="absolute -inset-px w-[calc(100%+2px)] h-[calc(100%+2px)] border-none"
                style={{ border: 0, background: '#000' }}
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                allowFullScreen
                title="Fabian Jimenez - Compositing Showreel 2024"
              />
            </motion.div>

            {/* Films Carousel */}
            <div className="mb-20 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">Feature Films</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-accent-teal/30 to-transparent" />
                </motion.div>
              </div>
              <Marquee items={galleryData.films} direction="left" speed={75} />
            </div>

            {/* TV Carousel */}
            <div className="mb-32 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">Television</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
                </motion.div>
              </div>
              <Marquee items={galleryData.tv} direction="right" speed={100} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
