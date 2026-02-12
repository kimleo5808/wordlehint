import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://connectionshint.app";

export const siteConfig: SiteConfig = {
  name: "ConnectionsHint",
  tagLine: "Daily hints and answers for NYT Connections puzzle",
  description:
    "Get today's NYT Connections hints, answers, and archive. Progressive clues for all four groups with daily puzzle tracking.",
  url: BASE_URL,
  authors: [
    {
      name: "ConnectionsHint",
      url: "https://connectionshint.app",
    },
  ],
  creator: "@connectionshint",
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
