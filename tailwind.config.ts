import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        "brand-dark": "var(--brand-dark)",
        "brand-soft": "var(--brand-soft)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        surface: "var(--surface)",
        card: "var(--card)",
        line: "var(--line)",
        "footer-bg": "var(--footer-bg)",
        "footer-ink": "var(--footer-ink)",
        glow: "var(--glow)",
      },
      borderRadius: {
        box: "1.25rem",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "var(--font-arabic)",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-arabic)",
          "var(--font-display)",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        soft: "0 10px 30px -18px rgb(20 36 28 / 0.28)",
        lift: "0 16px 36px -20px rgb(20 36 28 / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
