"use client";

import { usePathname } from "next/navigation";
import { Mail, Phone, Linkedin } from "lucide-react";
import { PersonalLogo } from "@/components/ui/PersonalLogo";

export function Footer() {
  const pathname = usePathname();
  const isXR = pathname === "/xr";

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left flex items-start gap-4">
            <PersonalLogo 
              themeColor={isXR ? "violet" : "teal"} 
              className="w-8 h-8 opacity-80"
            />
            <div>
              <p className="text-lg font-bold tracking-[0.1em] text-slate-900">
                Fabian <span className={isXR ? "text-violet-500" : "text-teal-400"}>Jimenez</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Compositing Supervisor & XR Spatial Designer
              </p>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
            <a
              href="mailto:hello@fabianJ.com"
              className={`group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors ${isXR ? 'hover:text-violet-500' : 'hover:text-teal-500'}`}
            >
              <Mail size={16} className={`text-slate-400 transition-colors ${isXR ? 'group-hover:text-violet-400' : 'group-hover:text-teal-400'}`} />
              hello@fabianJ.com
            </a>
            <a
              href="tel:8182822680"
              className={`group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors ${isXR ? 'hover:text-violet-500' : 'hover:text-teal-500'}`}
            >
              <Phone size={16} className={`text-slate-400 transition-colors ${isXR ? 'group-hover:text-violet-400' : 'group-hover:text-teal-400'}`} />
              818.282.2680
            </a>
            <a
              href="https://www.linkedin.com/in/fabian-jimenez-vfx/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors ${isXR ? 'hover:text-violet-500' : 'hover:text-teal-500'}`}
            >
              <Linkedin size={16} className={`text-slate-400 transition-colors ${isXR ? 'group-hover:text-violet-400' : 'group-hover:text-teal-400'}`} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Fabian Jimenez — All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
