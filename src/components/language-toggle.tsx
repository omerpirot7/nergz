"use client";

import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, toggleLocale, t } = useApp();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.lang.switchTo}
      className={cn(
        "focus-ring inline-flex h-9 items-center rounded-full border border-line bg-card px-1 text-xs font-semibold text-ink-muted",
        className,
      )}
    >
      <span
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "ckb" && "bg-brand text-white dark:text-[#0d1511]",
        )}
      >
        کوردی
      </span>
      <span
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en" && "bg-brand text-white dark:text-[#0d1511]",
        )}
      >
        EN
      </span>
    </button>
  );
}
