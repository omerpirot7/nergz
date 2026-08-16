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
        "focus-ring inline-flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-brand/40",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
