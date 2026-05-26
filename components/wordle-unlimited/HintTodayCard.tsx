"use client";

import { Link as I18nLink } from "@/i18n/routing";
import { useState } from "react";

export type HintTodayData = {
  date: string; // formatted display date, e.g. "MAY 26, 2026"
  puzzleNumber?: string | number; // optional Wordle #
  hints: [string, string, string]; // exactly three progressive hints
};

/**
 * HintTodayCard ⭐ — the differentiation asset.
 *
 * Editorial newspaper-clipping look: signal-red header bar with the date,
 * dashed border around the body, mono labels for each hint row.
 * The third hint stays masked until the user clicks Reveal — keeps the
 * page safe to skim without spoiling today's official Wordle.
 */
export default function HintTodayCard({ data }: { data: HintTodayData }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-8 border border-dashed border-brand-ink/70 bg-brand-paper shadow-sm dark:border-brand-dark-ink/50 dark:bg-brand-dark-paper">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-brand-signal px-4 py-2 text-brand-cream sm:px-5">
        <div className="font-plex-mono text-[11px] uppercase tracking-[0.18em] sm:text-[12px]">
          Today's Wordle Hint
        </div>
        <div className="font-plex-mono text-[10px] uppercase tracking-[0.14em] opacity-90 sm:text-[11px]">
          {data.puzzleNumber ? `№ ${data.puzzleNumber}  ·  ` : ""}
          {data.date}
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3 px-4 py-5 sm:px-6 sm:py-6">
        {data.hints.map((hint, idx) => {
          const isThird = idx === 2;
          const display = isThird && !revealed ? "Click to reveal" : hint;
          return (
            <div
              key={idx}
              className="flex items-baseline gap-4 border-b border-brand-tan/40 pb-2 last:border-b-0 last:pb-0"
            >
              <span className="shrink-0 font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                Hint {String(idx + 1).padStart(2, "0")}
              </span>
              {isThird && !revealed ? (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="font-newsreader text-[15px] italic text-brand-signalDark underline decoration-dotted underline-offset-4 hover:text-brand-signal sm:text-[16px]"
                >
                  {display}
                </button>
              ) : (
                <span className="font-newsreader text-[15px] text-brand-ink dark:text-brand-dark-ink sm:text-[16px]">
                  {display}
                </span>
              )}
            </div>
          );
        })}

        {/* Footer link */}
        <div className="flex justify-end pt-3">
          <I18nLink
            href="/wordle-hint-today"
            prefetch={false}
            className="group inline-flex items-center gap-1 font-plex-mono text-[11px] uppercase tracking-[0.16em] text-brand-signalDark hover:text-brand-signal"
          >
            See the full answer
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </I18nLink>
        </div>
      </div>
    </div>
  );
}
