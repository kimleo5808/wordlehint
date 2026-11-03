import { cn } from "@/lib/utils";
import { fraunces, newsreader, plexMono, plexSans } from "@/app/fonts/newsprint";

/** Editorial Newsprint font stack, shared with /wordle-unlimited (see app/fonts/newsprint.ts). */

export default function StrandsUnlimitedLayout({
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
