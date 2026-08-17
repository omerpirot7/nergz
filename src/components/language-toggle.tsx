"use client";

import { useApp } from "@/context/app-context";
import { locales, type Locale } from "@/content/dictionary";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  ckb: "کوردی",
  en: "EN",
  ar: "عربي",
};

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useApp();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-line bg-card px-1 text-xs font-semibold text-ink-muted",
        className,
      )}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "focus-ring rounded-full px-2.5 py-1 transition duration-300 hover:text-ink",
            locale === code && "bg-brand text-white dark:text-[#0d1511]",
          )}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
