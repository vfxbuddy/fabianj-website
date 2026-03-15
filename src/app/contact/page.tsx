"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute bottom-[0%] left-[10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Let's build something <span className="text-gradient-accent">amazing.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              For all inquiries regarding my work or availability, kindly use the provided form to reach out. Your interest is sincerely appreciated, and I will respond promptly!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                  <Phone size={20} />
                </div>
                <span className="text-lg">818.282.2680</span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                  <Mail size={20} />
                </div>
                <span className="text-lg font-mono">hello@fabianJ.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="glass-panel p-8 sm:p-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">First Name</label>
                  <input type="text" className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500/50 focus:bg-white/5 transition-all" placeholder="John" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Name</label>
                  <input type="text" className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500/50 focus:bg-white/5 transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                <input type="email" className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500/50 focus:bg-white/5 transition-all" placeholder="hello@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Message</label>
                <textarea rows={4} className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500/50 focus:bg-white/5 transition-all resize-none" placeholder="How can we partner together?" />
              </div>

              <button className="btn-primary w-full rounded-xl py-4 mt-2 font-bold text-white flex justify-center items-center gap-2 group transition-transform active:scale-[0.98]">
                Submit Message <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              
              <p className="text-[10px] text-center text-slate-500 mt-2 uppercase tracking-widest">
                Protected by reCAPTCHA
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
