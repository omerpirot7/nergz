import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { AppProvider } from "@/context/app-context";
import { defaultLocale, dictionary, locales, type Locale } from "@/content/dictionary";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: dictionary.ckb.meta.title,
  description: dictionary.ckb.meta.description,
  icons: { icon: "/images/logo.png" },
};

const bootScript = `
try {
  var locale = localStorage.getItem("nergz-locale") || "ckb";
  var theme = localStorage.getItem("nergz-theme");
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.cookie = "nergz-locale=" + locale + ";path=/;max-age=31536000;SameSite=Lax";
  var root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "en" ? "ltr" : "rtl";
  root.dataset.theme = theme;
  if (theme === "dark") root.classList.add("dark");
} catch (e) {}
`;

function resolveLocale(value: string | undefined): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = resolveLocale(cookieStore.get("nergz-locale")?.value);
  const initialDir = dictionary[initialLocale].dir;

  return (
    <html lang={initialLocale} dir={initialDir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className={`${display.variable} ${arabic.variable} font-body antialiased`}>
        <AppProvider initialLocale={initialLocale}>{children}</AppProvider>
      </body>
    </html>
  );
}
