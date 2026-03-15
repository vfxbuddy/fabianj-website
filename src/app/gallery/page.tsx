"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import galleryData from "@/data/gallery.json";
import { useEffect, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } }
};

interface PosterCardProps {
  title: string;
  year?: string;
  poster: string | null;
}

function PosterCard({ title, year, poster }: PosterCardProps) {
  if (!poster) return null;

  return (
    <div
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
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
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
    </div>
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

  // CSS keyframe name based on direction
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <>
      {/* Inject keyframes once */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
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
          {/* Render items twice for seamless loop */}
          {[...validItems, ...validItems].map((item, i) => (
            <PosterCard key={`${item.title}-${i}`} {...item} />
          ))}
        </div>

        {/* Cinematic Atmospheric Overlays */}
        {/* Left Subtle Blur/Grayscale Overlay */}
        <div 
          className="absolute inset-y-0 left-0 w-[30%] z-[20] pointer-events-none backdrop-grayscale backdrop-blur-[2px]"
          style={{ 
            maskImage: 'linear-gradient(to right, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 100%)'
          }}
        />
        
        {/* Right Subtle Blur/Grayscale Overlay */}
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

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-48 min-h-screen relative overflow-hidden">
      {/* Background Ambience / Glows */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      <div className="w-full relative z-10">
        <motion.div initial="hidden" animate="visible">
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
                <span className="text-gradient-accent">Gallery</span>
              </h1>
              <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                Infinite ribbons of official credits and visual contribution across major productions.
              </p>
            </motion.div>

            {/* Video Player - Vimeo Embed */}
            <motion.div variants={fadeUp} className="mb-32 mx-auto w-full max-w-5xl aspect-video rounded-3xl overflow-hidden glass-panel relative border border-white/5 shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/952510254?title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=1&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Fabian Jimenez - Compositing Showreel 2024"
              />
            </motion.div>
          </div>

          {/* Films Carousel */}
          <div className="mb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Feature Films</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-teal-500/30 to-transparent" />
              </motion.div>
            </div>
            <Marquee items={galleryData.films} direction="left" speed={75} />
          </div>

          {/* TV Carousel */}
          <div className="mb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Television</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent" />
              </motion.div>
            </div>
            <Marquee items={galleryData.tv} direction="right" speed={100} />
          </div>

          {/* Recent Freelance Work - The Clawcade */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white tracking-tight">Recent Freelance Work</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-teal-500/30 to-transparent" />
            </motion.div>

            <motion.div 
              variants={fadeUp} 
              className="group relative mx-auto w-full max-w-4xl rounded-3xl overflow-hidden glass-panel border border-white/5 shadow-2xl"
            >
              <div className="aspect-video relative">
                <iframe
                  src={`https://player.vimeo.com/video/${galleryData.freelance[0].vimeoId}?title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=1&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={galleryData.freelance[0].title}
                />
              </div>
              
              <div className="p-8 md:p-12 bg-slate-950/80 backdrop-blur-md border-t border-white/5 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{galleryData.freelance[0].title}</h3>
                      <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs">{galleryData.freelance[0].type}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {galleryData.freelance[0].services?.map((service) => (
                        <span 
                          key={service} 
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300 uppercase tracking-tighter"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-slate-200 text-lg font-light leading-relaxed mb-4 italic">
                      "A recap of the grand opening of The Clawcade"
                    </p>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                      Comprehensive content production including video coverage, high-altitude aerials, and 3D Gaussian captures to document the high-energy venue launch.
                    </p>
                  </div>
                </div>
                
                {/* Subtle bottom glow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent blur-md" />
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
