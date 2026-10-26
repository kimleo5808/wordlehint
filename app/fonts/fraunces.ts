import localFont from "next/font/local";

/**
 * Fraunces, self-hosted (SIL Open Font License). Loaded through
 * next/font/google it broke the build: for some regions Google now serves
 * its CSS with fonts.gstatic.com/l/font?kit=…&skey=…&v=… URLs, which
 * Turbopack's font loader can't parse ("next/font/google queries have
 * exactly one entry"). This is Google's latin subset (v38), a variable
 * font that covers both weights the Unlimited pages use.
 */
export const fraunces = localFont({
  src: [{ path: "./fraunces-latin.woff2", weight: "500 700", style: "normal" }],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
