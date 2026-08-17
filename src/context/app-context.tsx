"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultLocale,
  dictionary,
  locales,
  type Dictionary,
  type Locale,
} from "@/content/dictionary";

export type Theme = "light" | "dark";

type AppContextValue = {
  locale: Locale;
  theme: Theme;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const THEME_KEY = "nergz-theme";
const LOCALE_KEY = "nergz-locale";
const LOCALE_COOKIE = "nergz-locale";

function applyDocument(locale: Locale, theme: Theme) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = dictionary[locale].dir;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
}

function persistLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function AppProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_KEY);
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const nextLocale: Locale = locales.includes(storedLocale as Locale)
      ? (storedLocale as Locale)
      : initialLocale;
    const nextTheme: Theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setLocaleState(nextLocale);
    setTheme(nextTheme);
    persistLocale(nextLocale);
    applyDocument(nextLocale, nextTheme);
  }, [initialLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      persistLocale(next);
      applyDocument(next, theme);
    },
    [theme],
  );

  const toggleLocale = useCallback(() => {
    const i = locales.indexOf(locale);
    setLocale(locales[(i + 1) % locales.length]);
  }, [locale, setLocale]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem(THEME_KEY, next);
    applyDocument(locale, next);
  }, [locale, theme]);

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      theme,
      dir: dictionary[locale].dir,
      t: dictionary[locale],
      setLocale,
      toggleLocale,
      toggleTheme,
    }),
    [locale, theme, setLocale, toggleLocale, toggleTheme],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}
