"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { NotionRenderer as Renderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";

import { getNotionPage } from "@/app/actions/notion";

interface NotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function NotionModal({ isOpen, onClose, url, title }: NotionModalProps) {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const fetchPage = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRecordMap(null);

    const result = await getNotionPage(url);
    if (result.error) {
      setError(result.error);
    } else {
      setRecordMap(result.recordMap);
    }
    setLoading(false);
  }, [url]);

  // Fetch Notion page data when modal opens
  useEffect(() => {
    if (isOpen && url) {
      fetchPage();
    }
  }, [isOpen, url, fetchPage]);

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
            transition={{ duration: 0.3 }}
            className={isLight ? "fixed inset-0 z-[100] bg-black/30 backdrop-blur-md" : "fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[101] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            style={{
              background: isLight ? "#E0D9CE" : "rgba(2, 0, 14, 0.97)",
              border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{
                background: isLight ? "#D4CDC0" : "rgba(2, 0, 14, 0.92)",
                borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)",
              }}
            >
              <h3
                className="font-semibold text-lg truncate"
                style={{ color: isLight ? "#000000" : "#ffffff" }}
              >
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-colors"
                  style={{ color: isLight ? "#525252" : "#94a3b8" }}
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: isLight ? "#525252" : "#94a3b8" }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <style jsx global>{`
              .notion-container .notion {
                background-color: transparent !important;
              }
              .notion-container .notion-page {
                background-color: transparent !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .notion-container .notion-full-page {
                background-color: transparent !important;
              }
              .notion-container .notion-header {
                display: none !important;
              }
            `}</style>
            <div
              className="flex-1 overflow-y-auto notion-container"
              style={{
                background: isLight
                  ? "#E0D9CE"
                  : "radial-gradient(circle at top, #110022 0%, #000000 100%)",
              }}
            >
              {loading && (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8 min-h-[300px]">
                  <p className="text-slate-400 text-lg">{error}</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 underline font-medium"
                  >
                    View on Notion →
                  </a>
                </div>
              )}

              {recordMap && !loading && !error && (
                <Renderer
                  recordMap={recordMap}
                  fullPage={true}
                  darkMode={!isLight}
                  disableHeader={true}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
