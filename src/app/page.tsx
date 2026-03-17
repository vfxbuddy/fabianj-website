import { Hero } from "@/components/hero/Hero";
import { BentoCard } from "@/components/ui/BentoCard";
import { StudioMarquee } from "@/components/ui/StudioMarquee";
import { Layers, MonitorPlay, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <StudioMarquee />
      {/* Featured Supervisor Work */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Featured <span className="text-gradient-accent">Supervision</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                Leading talented compositing teams to pull off the impossible on tight episodic deadlines.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard
              icon={<MonitorPlay size={24} />}
              title="Supergirl"
              description="Led a highly skilled team for CW's Supergirl Seasons 5 & 6, blending live-action footage with complex CG under strict episodic television schedules."
              delay={0.1}
              backgroundImage="/images/shows/supergirl.jpg"
            />
            
            <BentoCard
              icon={<Layers size={24} />}
              title="Batwoman"
              description="Contributed as Compositing Supervisor for Seasons 2 & 3. Collaborating tirelessly to deliver cutting-edge visual effects complementing the show's dark narrative."
              delay={0.2}
              backgroundImage="/images/shows/batwoman.jpg"
            />
            
            <BentoCard
              icon={<Zap size={24} />}
              title="Black Lightning"
              description="Enhanced the action-packed sequences of Season 2 through exceptional visual effects, navigating the fast-paced production environment."
              delay={0.3}
              backgroundImage="/images/shows/black-lightning.jpg"
            />
          </div>
          
          <FadeIn delay={0.4} direction="up">
            <div className="mt-16 text-center">
              <Link 
                href="/gallery"
                className="inline-flex items-center gap-2 text-accent-teal hover:opacity-70 font-semibold tracking-wide transition-colors group"
              >
                View Full Gallery
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="relative py-24 border-t border-white/10 bg-slate-950/50 overflow-hidden">
        {/* Ambient Glows for footer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="ambient-glow glow-teal top-[-50%] left-[20%] w-[600px] h-[600px] animate-breathe" style={{ animationDelay: '1s' }} />
        </div>

        <FadeIn direction="up" className="relative z-10">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">
              <TextReveal text="Ready to elevate your project?" />
            </h2>
            <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
              Partner with me for your compositing needs. Together, we'll craft seamless VFX with inspiring creative leadership.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full btn-primary px-10 py-5 text-lg font-bold text-background transition-transform hover:scale-105 shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_35px_rgba(45,212,191,0.5)]"
            >
              Let's work together
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
