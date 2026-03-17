"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointer2, Smartphone, Plane, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

interface GaussianModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const SPLAT_VIEWS = [
  {
    id: "interior",
    label: "Interior Capture",
    shortLabel: "Interior",
    icon: <Smartphone size={14} />,
    description: "Using an iPhone as the capture device and the Luma AI app, we created a 3D scan of the venue's interior. This digital model served as a map during editing, allowing us to plan camera moves and transitions in a virtual 3D space. By seeing the venue from every angle, we could 'mold the edit' and make sure every shot felt connected to the real-world scale of the space before starting the final edit.",
    url: "https://lumalabs.ai/embed/81562072-b7da-4401-8f7c-702d4f18339f?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false",
  },
  {
    id: "exterior",
    label: "Exterior Aerial",
    shortLabel: "Exterior",
    icon: <Plane size={14} />,
    description: "For the exterior, we used a drone to capture the venue from above and then uploaded the footage to Luma AI to create the 3D scene. This allowed us to pre-visualize complex aerial shots and see how they would fit into the real environment. This spatial map was a key part of our workflow, helping us plan shots more accurately before starting the final edit.",
    url: "https://lumalabs.ai/embed/851b9a88-1e6a-4e42-ba93-29dfbc1f570e?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false",
  },
];

export function GaussianModal({ isOpen, onClose, title }: GaussianModalProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const [activeTab, setActiveTab] = useState(SPLAT_VIEWS[0].id);

  const activeView = SPLAT_VIEWS.find(v => v.id === activeTab) || SPLAT_VIEWS[0];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={isLight ? "fixed inset-0 z-[100] bg-black/30 backdrop-blur-xl" : "fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl"}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[101] rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(139,92,246,0.1)]"
            style={{
              background: isLight ? "#E0D9CE" : "rgba(2, 0, 14, 0.5)",
              backdropFilter: "blur(4px)",
              border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-8 py-6 border-b shrink-0"
              style={{
                background: isLight ? "#D4CDC0" : "rgba(2, 0, 14, 0.4)",
                backdropFilter: "blur(12px)",
                borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex flex-col gap-1">
                <h3
                  className="font-bold text-xl tracking-tight leading-none"
                  style={{ color: isLight ? "#000000" : "#ffffff" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[10px] uppercase font-bold tracking-[0.2em]"
                  style={{ color: isLight ? "#8b5cf6" : "rgba(167,139,250,0.7)" }}
                >
                  Interactive 3D Gaussian Splats
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="hidden md:flex items-center p-1 rounded-full bg-black/20 border border-white/5 mx-auto">
                {SPLAT_VIEWS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                      activeTab === tab.id 
                        ? "bg-accent-violet text-white shadow-lg" 
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full transition-all"
                  style={{
                    background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
                    border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.05)",
                    color: isLight ? "#525252" : "#94a3b8",
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex items-center justify-center p-4 border-b border-white/5">
              <div className="flex items-center p-1 rounded-full bg-black/20 border border-white/5">
                {SPLAT_VIEWS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "px-4 py-2 rounded-full text-xs font-bold transition-all",
                      activeTab === tab.id 
                        ? "bg-accent-violet text-white shadow-lg" 
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {tab.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Viewport Area */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ background: isLight ? "#E0D9CE" : "#000000" }}
            >
              <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                {/* Active Capture View */}
                <div
                  className="relative group w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.05)",
                    background: isLight ? "#D4CDC0" : "rgba(15,12,27,0.4)",
                  }}
                >
                  <div
                    className="absolute top-6 left-6 z-10 px-4 py-2 rounded-xl backdrop-blur-md pointer-events-none"
                    style={{
                      background: isLight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                      border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span className="text-[10px] text-violet-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       {activeView.icon}
                       {activeView.label}
                    </span>
                  </div>

                  {/* Render only the active iframe for performance */}
                  <iframe
                    key={activeView.id}
                    src={activeView.url}
                    className="w-full h-full border-none"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                  />

                  {/* Interaction Hint */}
                  <div
                    className="absolute top-6 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: isLight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                      border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <MousePointer2 size={12} className="text-violet-500 animate-pulse" />
                    <span
                      className="text-[10px] font-medium uppercase tracking-widest whitespace-nowrap"
                      style={{ color: isLight ? "#000000" : "#ffffff" }}
                    >
                      Explore in 3D
                    </span>
                  </div>
                </div>

                {/* Technical Case Study Text */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-2 text-violet-500 mb-2">
                       <Info size={18} />
                       <h4 className="text-xs uppercase font-bold tracking-widest">Production Process</h4>
                    </div>
                    <p 
                      className="text-lg leading-relaxed font-medium"
                      style={{ color: isLight ? "var(--color-foreground)" : "#ffffff" }}
                    >
                      {activeView.description}
                    </p>
                  </div>
                  
                  <div className="md:col-span-4 space-y-6">
                    <div 
                      className="p-6 rounded-2xl border"
                      style={{ 
                        background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
                        borderColor: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
                      }}
                    >
                      <h5 className="text-[10px] uppercase font-bold tracking-widest text-violet-500 mb-4">Production Specs</h5>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center text-xs">
                          <span style={{ color: isLight ? "#737373" : "#94a3b8" }}>Device</span>
                          <span style={{ color: isLight ? "#000000" : "#ffffff" }} className="font-bold">{activeTab === 'interior' ? 'iPhone' : 'Aerial Drone'}</span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                          <span style={{ color: isLight ? "#737373" : "#94a3b8" }}>Process</span>
                          <span style={{ color: isLight ? "#000000" : "#ffffff" }} className="font-bold">Luma AI</span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                          <span style={{ color: isLight ? "#737373" : "#94a3b8" }}>Output</span>
                          <span style={{ color: isLight ? "#000000" : "#ffffff" }} className="font-bold">Gaussian Splat</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aesthetic Background Detail */}
              <div className="py-24 text-center opacity-20">
                <p className="text-[10px] uppercase tracking-[0.3em] font-light" style={{ color: isLight ? "#000000" : "#ffffff" }}>
                  Optimized Spatial Rendering Engine
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
