"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  Gauge,
  PackageSearch,
  ShoppingBag,
  Wallet,
  Warehouse,
} from "lucide-react";
import { DevicePreviews } from "@/components/device-previews";
import { Section, SectionHeader } from "@/components/section";
import { useApp } from "@/context/app-context";

const icons = [ShoppingBag, Warehouse, ClipboardList, Wallet, Gauge, PackageSearch];

export function Features() {
  const { t } = useApp();
  const reduce = useReducedMotion();

  return (
    <Section id="features" className="pt-16 md:pt-24">
      <SectionHeader
        eyebrow={t.features.eyebrow}
        title={t.features.title}
        subtitle={t.features.subtitle}
        className="mb-10 md:mb-14"
      />
      <DevicePreviews className="mb-10 md:mb-14" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {t.features.items.map((item, index) => {
          const Icon = icons[index] ?? ShoppingBag;
          return (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: reduce ? 0 : index * 0.05 },
              }}
              whileHover={
                reduce ? undefined : { y: -4, transition: { duration: 0.3, delay: 0 } }
              }
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-box border border-line bg-card p-5 shadow-soft transition duration-300 hover:border-brand hover:shadow-lift"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-box bg-brand-soft text-brand">
                <Icon className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
