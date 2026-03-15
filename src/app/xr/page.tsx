"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/BentoCard";
import { Box, Trophy, ArrowUpRight, Play } from "lucide-react";
import { NotionModal } from "@/components/ui/NotionModal";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const xrProjects = [
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function XRPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<typeof xrProjects[0] | null>(null);

  const openProject = (project: typeof xrProjects[0]) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <section className="min-h-[80vh] flex flex-col items-center justify-center relative pb-20">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center">
            <motion.div variants={fadeUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs uppercase tracking-widest">
                <Box size={14} /> Bezi • Blender • Figma
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              XR Spatial <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Design</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
              Welcome to my XR portfolio. I create and prototype immersive augmented and mixed reality experiences bridging the physical and digital.
            </motion.p>
          </motion.div>

          <ScrollIndicator variant="violet" />
        </section>

        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
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
