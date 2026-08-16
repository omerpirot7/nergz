"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/context/app-context";

const SHOW_AFTER_PX = 320;

export function BackToTop() {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > SHOW_AFTER_PX);
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label={t.backToTop.label}
          className="group focus-ring fixed bottom-6 end-6 z-40 flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0f172a] py-1.5 pe-4 ps-1.5 shadow-lift sm:bottom-8 sm:end-8"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,var(--brand)_55%,#ffffff)] bg-brand text-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-[#0d1511]">
            <ChevronUp size={20} strokeWidth={2.75} aria-hidden />
          </span>

          <span className="flex flex-col items-start pe-0.5 leading-none">
            <span className="font-display text-[0.7rem] font-semibold tabular-nums text-white/55">
              {progress}%
            </span>
            <span className="mt-1 font-display text-sm font-semibold tracking-tight text-white">
              {t.backToTop.action}
            </span>
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
