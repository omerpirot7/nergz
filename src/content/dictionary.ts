export const locales = ["ckb", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ckb";

export const partners = [
  { id: "shifa", name: "Shifa", src: "/images/partners/shifa.png" },
  { id: "malsat", name: "Malsat", src: "/images/partners/malsat.png" },
  { id: "geyandin", name: "Geyandin", src: "/images/partners/geyandn.png" },
  { id: "dewajin", name: "Dewajin", src: "/images/partners/dewajin.png" },
  { id: "westga", name: "Westga", src: "/images/partners/westga.png" },
  { id: "garage", name: "Garage", src: "/images/partners/garag.png" },
] as const;

export const socials = [
  { id: "whatsapp", href: "https://wa.me/9647505541515", labelKey: "whatsapp" },
  { id: "instagram", href: "https://www.instagram.com/kitn.krd/?hl=en", labelKey: "instagram" },
  { id: "facebook", href: "https://www.facebook.com/kitngroup", labelKey: "facebook" },
  { id: "x", href: "https://x.com/kitnnet", labelKey: "x" },
] as const;

export const contactHref = "https://wa.me/9647505541515";

type FeatureItem = { title: string; description: string };
type StatItem = { value: string; label: string };
type ShowcaseCard = { label: string; value: string; progress: number; hint: string };
type NavItem = { href: string; label: string };

export type Dictionary = {
  dir: "rtl" | "ltr";
  meta: { title: string; description: string };
  nav: {
    open: string;
    close: string;
    items: NavItem[];
  };
  hero: {
    headline: string;
    sentence: string;
    cta: string;
    mediaAlt: string;
  };
  stats: StatItem[];
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  showcase: {
    title: string;
    subtitle: string;
    cards: ShowcaseCard[];
  };
  partners: { title: string };
  footer: {
    headline: string;
    sentence: string;
    cta: string;
  };
  social: {
    whatsapp: string;
    instagram: string;
    facebook: string;
    x: string;
  };
  backToTop: { label: string; eyebrow: string; action: string };
  theme: { toLight: string; toDark: string };
  lang: { switchTo: string; short: string };
};

export const dictionary: Record<Locale, Dictionary> = {
  ckb: {
    dir: "rtl",
    meta: {
      title: "نێرگز — سیستمی بەڕێوەبردنی فرۆشگا",
      description:
        "نێرگز فەزایەکی ئارامە بۆ فرۆشتن، کۆگا، کڕین و ژمێریاری. کوردی و ئینگلیزی، لە یەک داشبۆرد.",
    },
    nav: {
      open: "کردنەوەی لیست",
      close: "داخستنی لیست",
      items: [
        { href: "#features", label: "تایبەتمەندی" },
        { href: "#showcase", label: "پێشبینین" },
        { href: "#partners", label: "هاوبەشەکان" },
        { href: "#contact", label: "پەیوەندی" },
      ],
    },
    hero: {
      headline: "یەک سیستم بۆ تەواوی فرۆشگاکەت",
      sentence:
        "فرۆشتن، کۆگا، کڕین و ژمێریاری لە فەزایەکی ئارامدا، بە کوردی و ئینگلیزی.",
      cta: "پەیوەندی لە واتسئەپ",
      mediaAlt: "ئایکۆنی خاچی پزیشکی",
    },
    stats: [
      { value: "+٨٥٠", label: "فرۆشگا و کۆگا" },
      { value: "١٢", label: "مۆدیولی ڕۆژانە" },
      { value: "١١چ", label: "تێکڕای کاتی فرۆشتن" },
      { value: "٢٤/٧", label: "پشتگیری ناوخۆیی" },
    ],
    features: {
      eyebrow: "بۆچی نێرگز",
      title: "هەموو ڕۆژێک، لە یەک ڕووناکی",
      subtitle: "ئامرازەکانێک کە تیمەکەت خێرا دەکەن، بەبێ شێواندنی سەرپێچ.",
      items: [
        {
          title: "فرۆشتنی چرکەیی",
          description: "پسوڵە تەواو بکە، پارە وەربگرە، و کۆگا نوێ بکەوە — لە یەک جووڵەدا.",
        },
        {
          title: "کۆگای وریا",
          description: "کاڵا، بڕ، و بەرواری بەسەرچوون لە یەک لیستدا دەبینیت، پێش ئەوەی کێشە دروست ببێت.",
        },
        {
          title: "کڕینی ڕوون",
          description: "پسوڵەی دابینکەر تۆمار بکە و خەرجی لەگەڵ قازانجدا ببەستەوە.",
        },
        {
          title: "حیسابی کڕیار",
          description: "قەرز، پارەدان، و مێژووی کڕین بۆ هەر کڕیارێک لە شوێنێکی ئارام.",
        },
        {
          title: "سندوقی ڕۆژانە",
          description: "پارەی ناو سندوق، گواستنەوە، و کۆتایی ڕۆژ بەبێ کاغەزی ونبوو.",
        },
        {
          title: "ڕاپۆرتی خێرا",
          description: "فرۆشتن، خەرجی، و قازانج وەک وێنەیەکی سادە — نەک خشتەیەکی قورس.",
        },
      ],
    },
    showcase: {
      title: "وێنەیەک لە ڕۆژی کار",
      subtitle: "ژمارەکان بۆ تیمەکەت دەخوێندرێنەوە، نەک تەنها کۆدەکرێنەوە.",
      cards: [
        { label: "تەواوبوونی فرۆشتن", value: "٩٦٪", progress: 96, hint: "ئەم هەفتەیە" },
        { label: "تەندروستی کۆگا", value: "٨٨٪", progress: 88, hint: "کاڵای ئامادە" },
        { label: "داخستنی سندوق", value: "٩٢٪", progress: 92, hint: "لە کاتی خۆیدا" },
      ],
    },
    partners: { title: "براندە ناوخۆییەکان لەگەڵ نێرگز" },
    footer: {
      headline: "ئامادەیت نێرگز بخەیتە کار؟",
      sentence: "پەیوەندیمان پێوە بکە — دامەزراندن و ڕاهێنانی تیمەکەت ڕێک دەخەین.",
      cta: "دەستپێکردن لە واتسئەپ",
    },
    social: {
      whatsapp: "واتسئەپ",
      instagram: "ئینستاگرام",
      facebook: "فەیسبووک",
      x: "ئێکس",
    },
    backToTop: { label: "گەڕانەوە بۆ سەرەوە", eyebrow: "سەرەوە", action: "سەرەوە" },
    theme: { toLight: "گۆڕین بۆ دۆخی ڕووناک", toDark: "گۆڕین بۆ دۆخی تاریک" },
    lang: { switchTo: "English", short: "EN" },
  },
  en: {
    dir: "ltr",
    meta: {
      title: "Nergz — calm shop operations",
      description:
        "Nergz keeps sales, stock, purchasing, and cash in one bilingual workspace built for local shops.",
    },
    nav: {
      open: "Open menu",
      close: "Close menu",
      items: [
        { href: "#features", label: "Features" },
        { href: "#showcase", label: "Preview" },
        { href: "#partners", label: "Partners" },
        { href: "#contact", label: "Contact" },
      ],
    },
    hero: {
      headline: "One system for the whole shop",
      sentence:
        "Sales, stock, purchasing, and cash — in a calm workspace that speaks Kurdish and English.",
      cta: "Message us on WhatsApp",
      mediaAlt: "Animated medical cross",
    },
    stats: [
      { value: "850+", label: "shops & stores" },
      { value: "12", label: "daily modules" },
      { value: "11s", label: "average checkout" },
      { value: "24/7", label: "local support" },
    ],
    features: {
      eyebrow: "Why Nergz",
      title: "Every shift, in one clear view",
      subtitle: "Tools that speed the floor up without turning the day into noise.",
      items: [
        {
          title: "Second-glance checkout",
          description: "Close a ticket, take payment, and refresh stock in a single motion.",
        },
        {
          title: "Watchful inventory",
          description: "See quantity and expiry together, before a shelf becomes a problem.",
        },
        {
          title: "Clear purchasing",
          description: "Log supplier bills and keep spend tied to the profit you can explain.",
        },
        {
          title: "Customer ledgers",
          description: "Credit, repayments, and purchase history for every regular — in one quiet list.",
        },
        {
          title: "Daily cash drawers",
          description: "Track till cash, transfers, and end-of-day close without missing paper.",
        },
        {
          title: "Readable reports",
          description: "Sales, costs, and margin as a simple picture — not a heavy spreadsheet.",
        },
      ],
    },
    showcase: {
      title: "A snapshot of the working day",
      subtitle: "Numbers your team can read, not just collect.",
      cards: [
        { label: "Checkout completion", value: "96%", progress: 96, hint: "this week" },
        { label: "Stock health", value: "88%", progress: 88, hint: "ready items" },
        { label: "Drawer close rate", value: "92%", progress: 92, hint: "on time" },
      ],
    },
    partners: { title: "Local brands growing with Nergz" },
    footer: {
      headline: "Ready to put Nergz to work?",
      sentence: "Send a message — we will set up the system and walk your team through it.",
      cta: "Start on WhatsApp",
    },
    social: {
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      x: "X",
    },
    backToTop: { label: "Back to top", eyebrow: "Top", action: "Top" },
    theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
    lang: { switchTo: "کوردی", short: "ک" },
  },
};
