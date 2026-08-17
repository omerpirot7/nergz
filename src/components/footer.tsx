"use client";

import { Facebook, Instagram } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { socials } from "@/content/dictionary";
import { useApp } from "@/context/app-context";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const icons = {
  whatsapp: WhatsAppIcon,
  instagram: Instagram,
  facebook: Facebook,
  x: XIcon,
} as const;

const socialStyles = {
  whatsapp: "border-[#25D366]/40 bg-[#25D366] text-white hover:bg-[#20bd5a]",
  instagram:
    "border-transparent bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:brightness-110",
  facebook: "border-[#1877F2]/40 bg-[#1877F2] text-white hover:bg-[#166fe0]",
  x: "border-white/20 bg-white text-black hover:bg-white/90",
} as const;

export function Footer() {
  const { t, dir } = useApp();
  const reduce = useReducedMotion();

  return (
    <footer id="contact" className="scroll-mt-24 mt-16 bg-footer-bg text-footer-ink md:mt-24">
      <div
        dir="ltr"
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-8 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 md:py-10 lg:px-12"
      >
        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          {socials.map((social) => {
            const Icon = icons[social.id];
            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={t.social[social.labelKey]}
                className={`focus-ring inline-flex size-11 items-center justify-center rounded-full border transition md:size-12 ${socialStyles[social.id]}`}
              >
                <Icon className="size-4 md:size-5" />
              </a>
            );
          })}
        </div>

        <div dir={dir} className="min-w-0 flex-1 text-center">
          <h2 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">{t.footer.headline}</h2>
          <p className="mt-1 text-xs text-footer-ink/75 md:text-sm">{t.footer.sentence}</p>
        </div>

        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          className="focus-ring flex shrink-0 items-center rounded-box"
          aria-label="Nergz"
        >
          <span className="inline-flex">
            <Image
              src="/images/logo.png"
              alt="Nergz"
              width={246}
              height={191}
              className="h-10 w-auto md:h-11"
            />
          </span>
        </button>
      </div>
    </footer>
  );
}
