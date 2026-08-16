"use client";

import { Facebook, Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";
import { contactHref, socials } from "@/content/dictionary";
import { useApp } from "@/context/app-context";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const icons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  x: XIcon,
} as const;

export function Footer() {
  const { t } = useApp();

  return (
    <footer id="contact" className="scroll-mt-24 bg-footer-bg text-footer-ink">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center md:px-6 md:py-20">
        <div className="rounded-box bg-white/95 p-3 shadow-soft">
          <Image
            src="/images/logo.png"
            alt="Nergz"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">{t.footer.headline}</h2>
        <p className="mt-3 max-w-xl text-sm text-footer-ink/75 md:text-base">
          {t.footer.sentence}
        </p>
        <a
          href={contactHref}
          target="_blank"
          rel="noreferrer"
          className="focus-ring mt-7 inline-flex rounded-box bg-white px-6 py-3 text-sm font-bold text-[var(--footer-bg)] shadow-soft transition hover:-translate-y-0.5"
        >
          {t.footer.cta}
        </a>
        <div className="mt-8 flex items-center gap-3">
          {socials.map((social) => {
            const Icon = icons[social.id];
            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={t.social[social.labelKey]}
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
