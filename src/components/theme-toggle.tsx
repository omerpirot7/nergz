"use client";

import { Moon, Sun } from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, t } = useApp();
  const label = theme === "dark" ? t.theme.toLight : t.theme.toDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className={cn(
        "group focus-ring inline-flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft hover:text-brand hover:shadow-soft",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
