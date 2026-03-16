"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Box, Trophy } from "lucide-react";
import { useState } from "react";
import { NotionModal } from "@/components/ui/NotionModal";
import { BentoCard } from "@/components/ui/BentoCard";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "circOut" } }
};

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tools: string[];
  badge?: string;
}

const xrProjects: Project[] = [
  {
    title: "Bezi Spatial Prototyping",
    description: "Experimental spatial designs and interaction prototypes built natively for the Apple Vision Pro ecosystem using Bezi.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop",
    link: "https://www.notion.so/Bezi-Spatial-Prototyping-1a5229ad57e1c4fec868a4ea1f77fc140",
    tools: ["Bezi", "Unity", "Spatial Design"],
    badge: "Featured"
  },
  {
    title: "Gaussian Splitting Experiments",
    description: "Capturing and rendering real-world environments using 3D Gaussian Splatting for immersive spatial backgrounds.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070&auto=format&fit=crop",
    link: "https://www.notion.so/Gaussian-Splitting-Experiments-1a5229ad57e1c4fec868a4ea1f77fc140",
    tools: ["Luma AI", "Blender", "Postman"],
  },
  {
    title: "Interactive WebXR Scenes",
    description: "Bespoke WebXR environments designed for browser-based VR/AR access, focusing on accessibility and visual fidelity.",
    image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=2070&auto=format&fit=crop",
    link: "https://www.notion.so/WebXR-Interactive-Scenes-1a5229ad57e1c4fec868a4ea1f77fc140",
    tools: ["Three.js", "React Three Fiber", "GLSL"],
  },
  {
    title: "Spatial UI/UX Systems",
    description: "Developing design systems specifically for spatial interfaces, handling depth, gaze, and gesture-based interactions.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    link: "https://www.notion.so/Spatial-UI-UX-Systems-1a5229ad57e1c4fec868a4ea1f77fc140",
    tools: ["Figma", "Reality Composer", "SwiftUI"],
  }
];

export default function XRPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProject = (project: Project) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs uppercase tracking-widest mb-6">
              <Box size={14} /> Bezi • Blender • Figma
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              XR Spatial <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Design</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Welcome to my XR portfolio. I create and prototype immersive augmented and mixed reality experiences bridging the physical and digital.
            </p>
            <div className="relative h-24 mt-12">
              <ScrollIndicator variant="violet" />
            </div>
          </motion.div>

          {/* Showreel - Vimeo Embed */}
          <motion.div variants={fadeUp} className="mb-24 mx-auto w-full max-w-4xl aspect-video rounded-3xl overflow-hidden glass-panel relative border-violet-500/20">
            <iframe
              src="https://player.vimeo.com/video/952250990?title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=1&share=0&pip=0&watch_later=0&vimeo_logo=0&buttons.like=0&buttons.watchlater=0&buttons.share=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="XR Spatial Design Showreel 2024"
            />
          </motion.div>

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {xrProjects.map((project, i) => (
              <motion.div variants={fadeUp} key={i} className="h-full">
                <BentoCard
                  className="h-full hover:border-violet-500/30 transition-colors cursor-pointer"
                  title={project.title}
                  description={project.description}
                  icon={project.badge ? <Trophy size={20} className="text-violet-400" /> : <Box size={20} className="text-violet-400" />}
                  backgroundImage={project.image}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.tools.map((tool, j) => (
                        <span key={j} className="text-[10px] uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); openProject(project); }}
                        className="px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-500/30 hover:text-white transition-colors"
                      >
                        Preview
                      </button>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Notion Modal */}
      {activeProject && (
        <NotionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          url={activeProject.link}
          title={activeProject.title}
        />
      )}
    </div>
  );
}
