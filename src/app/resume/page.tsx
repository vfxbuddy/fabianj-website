"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Briefcase, Award, MonitorPlay, Code, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const PDF_URL = "https://img1.wsimg.com/blobby/go/e218639b-d468-469f-ad19-5f7fec74d0ba/Fabian_Jimenez_Compositor_Resume_2025-3088340.pdf";

const timelineData = [
  {
    year: "May 2024 — Present",
    role: "Freelance VFX Compositor",
    company: "Refuge Visual Effects / Layer-Creative / Antenna Creative",
    description: "TV and Film live-action compositing tasks using Nuke and After Effects, including keying, rotoscoping, tracking, paint, and integrating CG elements. Collaborated with creative directors to align visual effects with project goals.",
    icon: <MonitorPlay size={24} className="text-teal-400" />,
  },
  {
    year: "June 2018 — Sept 2023",
    role: "Compositing Supervisor",
    company: "Encore VFX",
    description: "Led and managed compositing teams, assigning tasks and providing guidance to execute visual effects shots efficiently. Collaborated with VFX Supervisors and Producers. Mentored team members to achieve the highest standards of quality.",
    icon: <Briefcase size={24} className="text-teal-400" />,
  },
  {
    year: "2015 — 2018",
    role: "Senior Compositor",
    company: "Encore VFX / Luma Pictures / FuseFX",
    description: "Key artist on features and television including Dr. Strange, Boss Level, Doom Patrol, and Alien: Covenant. Focused on deep compositing and look-development under tight deadlines.",
    icon: <Award size={24} className="text-teal-400" />,
  },
  {
    year: "2012 — 2015",
    role: "Compositor",
    company: "Method Studios / CoSA VFX / Synaptic Studios",
    description: "Compositor for major film and episodic projects including Avengers: Age of Ultron, Gotham, Person of Interest, and Divergent.",
    icon: <Code size={24} className="text-teal-400" />,
  },
  {
    year: "Key Qualifications",
    role: "Management & Tech",
    company: "Project Leadership",
    description: "Strong supervisory skills with a proven track record of delivering projects on time and within budget. Expertise with editorial and visual effects tools (Nuke, After Effects) and leveraging prototyping tools like Bezi and Blender for XR.",
    icon: <Award size={24} className="text-violet-400" />,
  },
  {
    year: "Achievements",
    role: "Awards & Hackathons",
    company: "Industry Recognition",
    description: "2022 Leo Awards Winner (Best VFX Dramatic Series). 1st Place Bezi Holiday Christmas Augment Challenge (2023). 2nd Place Bezi + RTFKT Design Challenge (2023). Participant at the 2024 MIT Reality Hackathon.",
    icon: <Briefcase size={24} className="text-violet-400" />,
  }
];

const skills = [
  "Nuke / NukeX", "After Effects", "Mocha Pro", "Team Leadership",
  "Flow Project Management", "Deep Compositing", "Keying & Integration", "Vibe Coding",
  "Bezi", "Blender", "Unreal Engine 5", "Photogrammetry", "Gaussian Splats"
];

function FadeInCentered({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom sleek easing
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}



export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.4, 0.4, 0.1]);

  return (
    <div ref={containerRef} className="pt-32 pb-32 min-h-screen relative overflow-hidden">



      {/* Background Ambience / Glows */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 w-full"
        >
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2 text-xs tracking-widest font-medium text-teal-400 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            SINCE 2008
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            16+ Years of <br />
            <span className="text-gradient-accent">Visual Excellence</span>
          </h1>

          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            From blockbuster feature films to cutting-edge spatial computing. A journey of combining technical precision with creative vision.
          </p>

          <Link
            href={PDF_URL}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 bg-white hover:bg-teal-400 transition-colors px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
          >
            <Download size={18} />
            Download Original PDF
          </Link>

          {/* Original Scroll Placement */}
          <div className="relative h-24 mt-12 mb-12">
            <ScrollIndicator />
          </div>
        </motion.div>

        {/* Current Highlight — Refuge VFX */}
        <div className="w-full max-w-4xl mx-auto mb-16 z-20">
          <FadeInCentered delay={0.2}>
            <div className="relative group p-[1px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 via-teal-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-0" />

              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-left overflow-hidden">

                {/* Background Logo Backdrop */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
                  <Image
                    src="/refuge_vfx_logo.png"
                    alt=""
                    width={800}
                    height={200}
                    className="absolute -top-4 -right-12 w-[80%] max-w-none opacity-[0.20] mix-blend-screen"
                  />
                  {/* Dark overlays for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/80" />
                </div>

                {/* Visual Accent */}
                <div className="hidden md:flex flex-col items-center gap-4 mt-2 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Sparkles className="text-slate-950 w-8 h-8" />
                  </div>
                  <div className="w-px h-32 bg-gradient-to-b from-emerald-400/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold tracking-wider text-emerald-400 mb-4 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    CURRENT HIGHLIGHT
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    Compositing Supervisor <br className="hidden md:block" /> at Refuge VFX
                  </h2>
                  <p className="text-emerald-400 font-medium mb-6">Refuge VFX • Nov 2025 — Present</p>

                  <p className="text-slate-300 leading-relaxed max-w-2xl mb-6">
                    Thrilled to have joined the team at <strong>Refuge VFX</strong> as a Compositing Supervisor. Being part of such an incredibly talented group of artists has been an amazing experience.
                  </p>
                  <p className="text-slate-300 leading-relaxed max-w-2xl">
                    It&apos;s a privilege to contribute to a studio renowned for incredible quality work, pushing the boundaries and rising to be one of the best in the industry.
                  </p>
                </div>
              </div>
            </div>
          </FadeInCentered>
        </div>

        {/* Recent Highlight Section */}
        <div className="w-full max-w-4xl mx-auto mb-32 z-20">
          <FadeInCentered delay={0.2}>
            <div className="relative group p-[1px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/40 via-violet-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-0" />

              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-left overflow-hidden">

                {/* Background YouTube Video */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
                  <iframe
                    src="https://www.youtube.com/embed/1ZTEajxD6EU?autoplay=1&mute=1&loop=1&playlist=1ZTEajxD6EU&controls=0&showinfo=0&rel=0&start=12"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full opacity-80 mix-blend-screen"
                    allow="autoplay; encrypted-media"
                    title="Wizard of Oz Sphere Project"
                    style={{ border: 0 }}
                  />
                  {/* Dark overlays for text readability */}
                  <div className="absolute inset-0 bg-slate-950/75" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
                </div>

                {/* Visual Accent */}
                <div className="hidden md:flex flex-col items-center gap-4 mt-2 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-violet-500 flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.3)]">
                    <Sparkles className="text-slate-950 w-8 h-8" />
                  </div>
                  <div className="w-px h-32 bg-gradient-to-b from-teal-400/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-semibold tracking-wider text-teal-400 mb-4 backdrop-blur-md">
                    RECENT HIGHLIGHT
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    The Wizard of Oz <br className="hidden md:block" /> at the Sphere
                  </h2>
                  <p className="text-teal-400 font-medium mb-6">Digital Domain • March — Sept 2025</p>

                  <p className="text-slate-300 leading-relaxed max-w-2xl mb-6">
                    Contributed as a Senior Compositor for the <em>Wizard of Oz</em> immersive experience at the Sphere in Las Vegas during my time at <strong>Digital Domain</strong>. This massive project required adapting to a custom <strong>16K compositing pipeline</strong> built specifically for the world's highest-resolution LED screen.
                  </p>
                  <p className="text-slate-300 leading-relaxed max-w-2xl">
                    With live-action plates requiring heavy, photoreal CG integration, we collaborated directly with Google to integrate their <strong>early-stage AI video models</strong> into our traditional VFX workflow. By leveraging advanced out-painting and in-painting techniques, we were able to seamlessly extend set environments and composite at an unprecedented immersive scale.
                  </p>
                </div>
              </div>
            </div>
          </FadeInCentered>
        </div>

        {/* Timeline Section */}
        <div className="w-full relative">
          {/* Vertical Track */}
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-24 md:space-y-32">
            {timelineData.map((item, index) => {
              return (
                <div key={index} className="relative flex flex-col items-center w-full">
                  <FadeInCentered delay={0.1}>
                    <div className="relative w-full group flex flex-col items-center">

                      {/* Center Node on the line */}
                      <div className="absolute left-[28px] md:left-1/2 -ml-[28px] md:-ml-8 -top-7 md:-top-8 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-950 border border-teal-500/20 z-30 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-teal-400/60">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.icon}
                        </motion.div>
                      </div>

                      {/* Centered Content Card */}
                      <div className="w-full pl-[70px] md:pl-0 md:max-w-2xl mx-auto z-20">
                        <div className="glass-panel p-6 sm:p-8 md:p-10 transition-all duration-500 group-hover:-translate-y-2 w-full relative overflow-hidden border border-white/5 group-hover:border-white/15 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] bg-slate-900/40 backdrop-blur-xl">

                          {/* Dynamic top-edge beam */}
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                          {/* Card Background Glow tied to hover */}
                          <div className="absolute -inset-24 bg-teal-500/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

                          <div className="relative z-10 text-center md:text-left">
                            <div className="inline-block text-teal-400 font-mono text-xs sm:text-sm tracking-widest mb-4 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                              {item.year}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">{item.role}</h3>
                            <h4 className="text-slate-300 font-medium mb-6 flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base">
                              <Briefcase size={16} className="text-slate-500" /> {item.company}
                            </h4>
                            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </FadeInCentered>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="w-full mt-40">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Core <span className="text-gradient-accent">Competencies</span></h2>
              <p className="text-slate-400">The tools and methodologies I use to bring ideas to life.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-slate-300 font-medium tracking-wide hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/30 transition-all cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
