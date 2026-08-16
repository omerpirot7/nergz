import type { Metadata } from "next";
import { Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { AppProvider } from "@/context/app-context";
import { dictionary } from "@/content/dictionary";
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
  var root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "en" ? "ltr" : "rtl";
  root.dataset.theme = theme;
  if (theme === "dark") root.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ckb" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className={`${display.variable} ${arabic.variable} font-body antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
