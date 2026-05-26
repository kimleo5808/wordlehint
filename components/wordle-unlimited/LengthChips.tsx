"use client";

import { cn } from "@/lib/utils";

const LENGTHS = [4, 5, 6, 7, 8, 9, 10, 11];

/**
 * LengthChips — 8 word-length chips above the keyboard.
 *
 * Each chip both updates the in-page game (via onChange) and serves as an
 * internal SEO link target (the corresponding /N-letters page is exposed via
 * the wrapping anchor's title attribute and a long-press menu on mobile).
 *
 * Active chip:   ink background + cream text + signal underline.
 * Inactive chip: transparent + ink text + tan border.
 *
 * Mobile: horizontal scroll, edge-faded to hint there is more off-screen.
 */
export default function LengthChips({
  active,
  onChange,
}: {
  active: number;
  onChange: (length: number) => void;
}) {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1 sm:gap-2">
        {LENGTHS.map((len) => {
          const isActive = len === active;
          return (
            <button
              key={len}
              type="button"
              onClick={() => onChange(len)}
              title={`Open /${len}-letters dedicated practice page`}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 font-plex-mono text-[12px] font-medium uppercase tracking-wider transition-all",
                isActive
                  ? "border-brand-ink bg-brand-ink text-brand-cream underline decoration-brand-signal decoration-2 underline-offset-4 dark:border-brand-dark-ink dark:bg-brand-dark-ink dark:text-brand-dark-bg"
                  : "border-brand-tan/60 bg-transparent text-brand-ink/80 hover:border-brand-ink hover:text-brand-ink dark:text-brand-dark-ink/80 dark:hover:text-brand-dark-ink"
              )}
            >
              {len}L
            </button>
          );
        })}
      </div>
    </div>
  );
}
