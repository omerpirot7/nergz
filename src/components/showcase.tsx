"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck, PackageCheck, WalletCards } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { useApp } from "@/context/app-context";

const icons = [CircleCheck, PackageCheck, WalletCards];

export function Showcase() {
  const { t } = useApp();
  const reduce = useReducedMotion();

  return (
    <Section id="showcase">
      <SectionHeader title={t.showcase.title} subtitle={t.showcase.subtitle} wave />
      <div className="grid gap-4 md:grid-cols-3">
        {t.showcase.cards.map((card, index) => {
          const Icon = icons[index] ?? CircleCheck;
          return (
            <motion.article
              key={card.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: reduce ? 0 : index * 0.07 },
              }}
              whileHover={
                reduce ? undefined : { y: -4, transition: { duration: 0.3, delay: 0 } }
              }
              viewport={{ once: true, amount: 0.35 }}
              className="group rounded-box border border-line bg-card p-5 shadow-soft transition duration-300 hover:border-brand hover:bg-brand-soft/40 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-ink-muted transition-colors duration-300 group-hover:text-brand">
                  {card.label}
                </p>
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-box bg-brand-soft text-brand transition duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-ink transition-colors duration-300 group-hover:text-brand">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-ink-muted">{card.hint}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-soft">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${card.progress}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.1 }}
                  className="h-full rounded-full bg-brand transition-[filter] duration-300 group-hover:brightness-110"
                />
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
