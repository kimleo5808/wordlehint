import { cn } from "@/lib/utils";
import { fraunces, newsreader, plexMono, plexSans } from "@/app/fonts/newsprint";

/** Editorial Newsprint font stack (see app/fonts/newsprint.ts). */

export default function WordleUnlimitedLayout({
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
        // Editorial newsprint base — light mode by default.
        // Game shell + SEO content live inside this scope.
        "min-h-screen w-full bg-brand-cream font-newsreader text-brand-ink",
        "dark:bg-brand-dark-bg dark:text-brand-dark-ink"
      )}
    >
      {children}
    </div>
  );
}
