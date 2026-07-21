import { cn } from "@/lib/utils";
import { Fraunces, Newsreader, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Editorial Newsprint font stack — shared look with /wordle-unlimited,
 * loaded only on /connections-unlimited.
 */

const fraunces = Fraunces({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

export default function ConnectionsUnlimitedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        fraunces.variable,
        newsreader.variable,
        plexMono.variable,
        plexSans.variable,
        "min-h-screen w-full bg-brand-cream font-newsreader text-brand-ink",
        "dark:bg-brand-dark-bg dark:text-brand-dark-ink"
      )}
    >
      {children}
    </div>
  );
}
