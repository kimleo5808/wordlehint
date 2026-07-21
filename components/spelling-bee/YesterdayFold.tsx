import type { SpellingBeePuzzle } from "@/types/spelling-bee";
import { getSpellingBeeScoring } from "@/lib/spelling-bee-daily";

/**
 * Yesterday's full word list in a native <details> fold — server-rendered,
 * indexable, zero JS. No spoiler curtain: that puzzle is closed.
 */
export default function YesterdayFold({
  puzzle,
}: {
  puzzle: SpellingBeePuzzle;
}) {
  const scoring = getSpellingBeeScoring(puzzle);
  const pangramSet = new Set(puzzle.pangrams);

  return (
    <details className="group rounded-xl border border-border bg-card">
      <summary className="cursor-pointer select-none px-5 py-4 font-heading font-semibold text-foreground marker:text-wordle-present">
        Show yesterday&apos;s {scoring.totalWords} words ({puzzle.date} ·{" "}
        {scoring.totalPoints} points · Genius {scoring.geniusScore})
      </summary>
      <div className="border-t border-border px-5 py-4">
        <p className="text-sm text-muted-foreground">
          Pangram{puzzle.pangrams.length > 1 ? "s" : ""}:{" "}
          <strong className="text-foreground">
            {puzzle.pangrams.map((p) => p.toUpperCase()).join(", ")}
          </strong>
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-sm">
          {scoring.words.map((w) => (
            <li
              key={w.word}
              className={
                pangramSet.has(w.word)
                  ? "font-bold text-foreground"
                  : "text-muted-foreground"
              }
            >
              {w.word}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
