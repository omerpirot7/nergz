"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useApp } from "@/context/app-context";

export function Stats() {
  const { t } = useApp();
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {t.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : index * 0.06 }}
            className="border-line px-4 py-8 text-center md:px-6 [&:nth-child(odd)]:border-e md:[&:nth-child(odd)]:border-e md:[&:not(:last-child)]:border-e max-md:[&:nth-child(-n+2)]:border-b"
          >
            <p className="text-3xl font-extrabold text-brand md:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
