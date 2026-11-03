import localFont from "next/font/local";

/**
 * "Editorial Newsprint" font stack shared by the Unlimited games
 * (/wordle-unlimited, /connections-unlimited, /strands-unlimited).
 * Self-hosted (all SIL Open Font License) for the same reason as
 * ./site.ts: Google's /l/font?kit=… URLs break Turbopack's next/font/google.
 *
 *  - Fraunces      → display (H1, H2, drop cap, pull quote)
 *  - Newsreader    → body paragraphs
 *  - IBM Plex Mono → stats badges, data tables, captions
 *  - IBM Plex Sans → keyboard caps, UI labels
 *
 * Google's latin subsets: Fraunces v38, Newsreader v26 and IBM Plex Sans
 * v23 are variable fonts; IBM Plex Mono v20 has one static file per weight.
 */

export const fraunces = localFont({
  src: [{ path: "./fraunces-latin.woff2", weight: "500 700", style: "normal" }],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const newsreader = localFont({
  src: [{ path: "./newsreader-latin.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const plexMono = localFont({
  src: [
    { path: "./ibm-plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./ibm-plex-mono-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./ibm-plex-mono-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const plexSans = localFont({
  src: [{ path: "./ibm-plex-sans-latin.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-plex-sans",
  display: "swap",
});
