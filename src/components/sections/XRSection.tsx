"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Box, Trophy, MonitorPlay, Video } from "lucide-react";
import { useState } from "react";
import { NotionModal } from "@/components/ui/NotionModal";
import { GaussianModal } from "@/components/ui/GaussianModal";
import { BentoCard } from "@/components/ui/BentoCard";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import galleryData from "@/data/gallery.json";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tools: string[];
  badge?: string;
  vimeoId?: string;
}

const xrProjects: Project[] = [
  {
    title: "Animus 3D Creator Challenge",
    description: "Interactive proof-of-concept experienced in VR/MR. Built upon RTFKT + Animus Project lore to create a battle arena game. Focused on crafting the introduction, aesthetic, and XR-UX.",
    badge: "2nd Place Winner",
    tools: ["Bezi", "RTFKT"],
    link: "https://efficacious-lotus-05e.notion.site/Animus-3D-Creator-Challenge-2033acc4d4ce41a29edadad0edb50363",
    image: "/images/xr/animus.jpg",
  },
  {
    title: "Holiday Augments Challenge",
    description: "Interactive prototype allowing users to place and hang Christmas ornaments in mixed reality.",
    badge: "1st Place Winner",
    tools: ["XR Prototype"],
    link: "https://efficacious-lotus-05e.notion.site/Christmas-Ornaments-in-Mixed-Reality-d4141914ad0d4fb38f50737cedbdd0ad",
    image: "/images/xr/holiday-augments.jpg",
  },
  {
    title: "Break Into Reality AR",
    description: "AR prototype using Bezi, aimed at event discovery within local community parks. Highlights upcoming events in an immersive mobile experience.",
    tools: ["Bezi", "Mobile AR"],
    link: "https://efficacious-lotus-05e.notion.site/Break-Into-Reality-Design-Challenge-b2f580efed71410487f1f35f501b7a78",
    image: "/images/xr/break-into-reality.jpg",
  },
  {
    title: "MIT Reality Hackathon 2024",
    description: "P.E.C.K. is a web-based AR app connecting students across classrooms globally. Created in 3 days. Focus on ideation, prompt engineering, XR design.",
    tools: ["WebAR", "Hackathon"],
    link: "https://devpost.com/software/p-e-c-k",
    image: "/images/xr/mit-reality-hack.jpg",
  },
  {
    title: "PaperAirplane XR",
    description: "Mixed-reality app designed to guide users through folding paper airplanes with immersive visuals and step-by-step instructions.",
    tools: ["Mixed Reality"],
    link: "https://efficacious-lotus-05e.notion.site/PaperAirplane-XR-9d09fe515485463ea4a80df7011d99fd",
    image: "/images/xr/paper-airplane.jpg",
  }
];

export function XRSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gaussianModalOpen, setGaussianModalOpen] = useState(false);

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

  const openProject = (project: Project) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  return (
    <section id="xr" className="py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-violet-500/[0.03] dark:bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-foreground/5 text-foreground dark:border-accent-violet/30 dark:bg-accent-violet/10 dark:text-accent-violet text-xs uppercase tracking-widest mb-6 transition-colors">
              <Box size={14} className="opacity-60 dark:opacity-100" /> Bezi • Blender • Figma
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              <span className="text-foreground">XR Spatial </span>
              <span className="text-gradient-violet">Design</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Welcome to my XR portfolio. I create and prototype immersive augmented and mixed reality experiences bridging the physical and digital.
            </p>
            <div className="relative h-24 mt-12">
              <ScrollIndicator variant="violet" />
            </div>
          </motion.div>

          {/* Showreel */}
          <motion.div variants={fadeUp} className="mb-24 mx-auto w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black relative">
            <iframe
              src="https://player.vimeo.com/video/952250990?title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=0&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0&color=000000"
              className="absolute -inset-px w-[calc(100%+2px)] h-[calc(100%+2px)] border-none"
              style={{ border: 0, background: '#000' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="XR Spatial Design Showreel 2024"
            />
          </motion.div>

          {/* Projects Grid */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {xrProjects.map((project, i) => (
              <li key={i} className="h-full">
                <motion.div variants={fadeUp} className="h-full">
                  <BentoCard
                    className="h-full hover:border-accent-violet/30 transition-colors cursor-pointer"
                    title={project.title}
                    description={project.description}
                    icon={project.badge ? <Trophy size={20} className="text-foreground dark:text-accent-violet" /> : <Box size={20} className="text-foreground dark:text-accent-violet" />}
                    backgroundImage={project.image}
                    vimeoId={project.vimeoId}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.tools.map((tool, j) => (
                          <span key={j} className="text-[10px] uppercase tracking-wider text-foreground dark:text-accent-violet bg-foreground/5 border border-border px-2 py-1 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); openProject(project); }}
                          className="px-3 py-1.5 rounded-full bg-foreground/5 text-xs font-medium hover:bg-foreground/10 transition-colors border border-foreground/20 dark:border-accent-violet"
                          style={{ color: 'var(--color-foreground)' }}
                        >
                          Preview
                        </button>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full hover:bg-foreground/10 text-foreground transition-colors"
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              </li>
            ))}
          </ul>

          {/* Technical Case Studies */}
          <div className="mt-32">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <h3 className="text-3xl font-bold text-foreground tracking-tight whitespace-nowrap">Technical Case Studies</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-foreground/10 dark:from-accent-violet/30 to-transparent" />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glass-panel overflow-hidden border border-white/5 relative group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                {/* Video Side */}
                <div className="aspect-video lg:aspect-auto relative bg-black overflow-hidden group-hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] transition-shadow duration-700">
                  <iframe
                    src={`https://player.vimeo.com/video/${galleryData.freelance[0].vimeoId}?title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=0&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0&background=000000`}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={galleryData.freelance[0].title}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent-violet/5 to-transparent mix-blend-overlay" />
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="inline-flex items-center justify-center p-2.5 rounded-full border border-border bg-foreground/5 text-foreground dark:border-accent-violet/30 dark:bg-accent-violet/10 dark:text-accent-violet mb-6 w-fit h-fit transition-colors">
                    <Video size={16} className="opacity-60 dark:opacity-100" />
                  </div>

                  <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                    {galleryData.freelance[0].title}: 3D Gaussian Splatting for Spatial Production
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest mb-2" style={{ color: 'var(--color-foreground)' }}>The Challenge</h4>
                      <p className="text-muted text-base leading-relaxed">
                        Capturing the kinetic energy and vast scale of a high-octane physical venue in a way that feels immersive rather than static.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest mb-2" style={{ color: 'var(--color-foreground)' }}>The Solution</h4>
                      <p className="text-foreground/90 text-base leading-relaxed">
                        {galleryData.freelance[0].description}
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-2">
                      {galleryData.freelance[0].services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 rounded-lg bg-foreground/5 dark:bg-accent-violet/5 border border-border dark:border-accent-violet/20 text-[10px] font-bold text-foreground dark:text-accent-violet uppercase tracking-tighter transition-colors"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setGaussianModalOpen(true)}
                        className="group relative inline-flex items-center justify-center px-10 py-4 rounded-[24px] bg-transparent font-bold text-sm tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden border-2 border-foreground dark:border-accent-violet text-foreground dark:text-accent-violet"
                      >
                        <div className="absolute inset-0 bg-foreground/5 dark:bg-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        Preview Gaussian Captures
                      </button>
                    </div>
                  </div>

                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-violet/5 rounded-full blur-[100px] pointer-events-none" />
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {activeProject && (
        <NotionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          url={activeProject.link}
          title={activeProject.title}
        />
      )}
      <GaussianModal
        isOpen={gaussianModalOpen}
        onClose={() => setGaussianModalOpen(false)}
        title="Clawcade Venue: Gaussian Splat"
      />
    </section>
  );
}
