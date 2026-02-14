import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized:
      process.env.NEXT_PUBLIC_OPTIMIZED_IMAGES &&
      process.env.NEXT_PUBLIC_OPTIMIZED_IMAGES === "false",
    remotePatterns: [
      ...(process.env.R2_PUBLIC_URL
        ? [
            {
              hostname: process.env.R2_PUBLIC_URL.replace("https://", ""),
            },
          ]
        : []),
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // --- Legacy short URLs → current routes ---
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/how-to-play", destination: "/how-to-play-wordle", permanent: true },
      { source: "/faq", destination: "/wordle-hint-faq", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      { source: "/today", destination: "/wordle-hint-today", permanent: true },
      { source: "/hints", destination: "/wordle-hint-today", permanent: true },
      { source: "/answers", destination: "/wordle-hint-today", permanent: true },
      { source: "/strategy", destination: "/how-to-play-wordle", permanent: true },
      { source: "/tips", destination: "/guides", permanent: true },
      { source: "/archive", destination: "/wordle-hint", permanent: true },

      // --- Old Strands routes → Wordle equivalents ---
      { source: "/nyt-strands-hint", destination: "/wordle-hint-today", permanent: true },
      { source: "/strands-hint", destination: "/wordle-hint-today", permanent: true },
      { source: "/strands-hint-today", destination: "/wordle-hint-today", permanent: true },
      { source: "/strands-hint-archive", destination: "/wordle-hint", permanent: true },
      { source: "/strands-hint-faq", destination: "/wordle-hint-faq", permanent: true },
      { source: "/how-to-play-strands", destination: "/how-to-play-wordle", permanent: true },
      { source: "/strands-hint/:date", destination: "/wordle-hint/:date", permanent: true },
      { source: "/archive/:date", destination: "/wordle-hint/:date", permanent: true },

      // --- Locale-prefixed variants (English) ---
      { source: "/en/today", destination: "/en/wordle-hint-today", permanent: true },
      { source: "/en/hints", destination: "/en/wordle-hint-today", permanent: true },
      { source: "/en/answers", destination: "/en/wordle-hint-today", permanent: true },
      { source: "/en/faq", destination: "/en/wordle-hint-faq", permanent: true },
      { source: "/en/strategy", destination: "/en/how-to-play-wordle", permanent: true },
      { source: "/en/tips", destination: "/en/guides", permanent: true },
      { source: "/en/archive", destination: "/en/wordle-hint", permanent: true },
      { source: "/en/archive/:date", destination: "/en/wordle-hint/:date", permanent: true },

      // --- Spanish locale → English (language dropped) ---
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/hints", destination: "/wordle-hint-today", permanent: true },
      { source: "/es/answers", destination: "/wordle-hint-today", permanent: true },
      { source: "/es/archive", destination: "/wordle-hint", permanent: true },
      { source: "/es/archive/:date", destination: "/wordle-hint/:date", permanent: true },
      { source: "/es/faq", destination: "/wordle-hint-faq", permanent: true },
      { source: "/es/about", destination: "/about", permanent: true },
      { source: "/es/contact", destination: "/contact", permanent: true },
      { source: "/es/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/es/terms", destination: "/terms-of-service", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
