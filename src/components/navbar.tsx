"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["features", "showcase", "partners", "contact"];

export function Navbar() {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateActive = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48;

      if (atBottom) {
        setActive("#contact");
        return;
      }

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        const visible =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visible >= window.innerHeight * 0.35) {
          setActive("#contact");
          return;
        }
      }

      const marker = window.innerHeight * 0.35;
      let current = "";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) {
          current = `#${id}`;
        }
      }

      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const behavior = reduce ? "auto" : "smooth";

    if (href === "#top") {
      window.scrollTo({ top: 0, behavior });
      setActive("");
      return;
    }

    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;

    setActive(href);

    if (href === "#contact") {
      const top = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      window.scrollTo({ top, behavior });
      return;
    }

    const headerOffset = window.matchMedia("(min-width: 768px)").matches ? 88 : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-line/80 bg-surface/75 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[68px] md:px-6">
        <button
          type="button"
          onClick={() => go("#top")}
          className="focus-ring flex shrink-0 items-center rounded-box"
          aria-label="Nergz"
        >
          <span className="inline-flex">
            <Image
              src="/images/logo.png"
              alt="Nergz"
              width={246}
              height={191}
              priority
              className="h-10 w-auto md:h-11"
            />
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {t.nav.items.map((item) => {
            const isActive = active === item.href;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => go(item.href)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-brand" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId={reduce ? undefined : "nav-underline"}
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand"
                  />
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="focus-ring inline-flex size-10 items-center justify-center rounded-box border border-line bg-card text-ink lg:hidden"
          aria-label={open ? t.nav.close : t.nav.open}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
            className="overflow-hidden border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 md:px-6">
              {t.nav.items.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className={cn(
                    "rounded-box px-4 py-3 text-start text-base font-semibold",
                    active === item.href
                      ? "bg-brand-soft text-brand"
                      : "bg-card text-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-line pt-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
