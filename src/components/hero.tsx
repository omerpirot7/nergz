"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { contactHref } from "@/content/dictionary";
import { useApp } from "@/context/app-context";

export function Hero() {
  const { t } = useApp();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="hero-atmosphere relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 md:px-6 md:pb-20 md:pt-32 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center lg:text-start"
        >
          <span className="mx-auto inline-flex rounded-box bg-white/95 px-3 py-2 shadow-soft lg:mx-0">
            <Image
              src="/images/logo.png"
              alt="Nergz"
              width={160}
              height={54}
              priority
              className="h-14 w-auto"
            />
          </span>
          <h1 className="title-wave mt-6 text-4xl font-extrabold leading-[1.35] md:text-5xl lg:text-[3.15rem]">
            {t.hero.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted md:text-lg lg:mx-0">
            {t.hero.sentence}
          </p>
          <a
            href={contactHref}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-7 inline-flex rounded-box bg-brand px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:opacity-90 dark:text-[#0d1511]"
          >
            {t.hero.cta}
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="flex aspect-square w-full max-w-[22rem] items-center justify-center overflow-hidden rounded-box border border-line/70 bg-white shadow-lift md:max-w-[26rem]">
            <Image
              src="/images/medical-cross.gif"
              alt={t.hero.mediaAlt}
              width={640}
              height={640}
              unoptimized
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
