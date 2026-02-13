import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://wordlehint.info";

export const siteConfig: SiteConfig = {
  name: "WordleHint",
  tagLine: "Daily Wordle hints, answers, and word game strategies",
  description:
    "Get daily Wordle hints, clues, and answers. Play unlimited Wordle games from 4 to 11 letters with strategy tips, best starting words, and solving guides.",
  url: BASE_URL,
  authors: [
    {
      name: "WordleHint",
      url: "https://wordlehint.info",
    },
  ],
  creator: "@wordlehint",
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  defaultNextTheme: "system",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
