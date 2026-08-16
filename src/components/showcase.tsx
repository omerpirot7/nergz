"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader } from "@/components/section";
import { useApp } from "@/context/app-context";

function MiniChart({ delay }: { delay: number }) {
  const bars = [38, 62, 48, 78, 56, 88, 70];
  return (
    <div className="mt-5 flex h-12 items-end gap-1.5">
      {bars.map((height, index) => (
        <motion.span
          key={index}
          initial={{ height: "14%" }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: delay + index * 0.04 }}
          className="w-full rounded-full bg-brand/25 last:bg-brand"
        />
      ))}
    </div>
  );
}

export function Showcase() {
  const { t } = useApp();
  const reduce = useReducedMotion();

  return (
    <Section id="showcase">
      <SectionHeader title={t.showcase.title} subtitle={t.showcase.subtitle} wave />
      <div className="grid gap-4 md:grid-cols-3">
        {t.showcase.cards.map((card, index) => (
          <motion.article
            key={card.label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : index * 0.07 }}
            className="rounded-box border border-line bg-card p-5 shadow-soft"
          >
            <p className="text-sm font-medium text-ink-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-ink">{card.value}</p>
            <p className="mt-1 text-xs text-ink-muted">{card.hint}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-soft">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${card.progress}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.1 }}
                className="h-full rounded-full bg-brand"
              />
            </div>
            <MiniChart delay={reduce ? 0 : 0.15} />
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
