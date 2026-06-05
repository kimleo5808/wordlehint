import { WordTiles } from "@/components/wordle-answers/WordTiles";
import type { OpenerStat } from "@/lib/wordle-starting-words";

const REASONS: Record<string, string> = {
  ADIEU: "Four vowels but only one consonant tile — and a rare D. Popular, but it leaves too many consonants untested.",
  AUDIO: "Crams in four vowels yet tests just one consonant, so it rarely narrows the field as much as a balanced opener.",
  FUZZY: "Built on Z and a repeated Z-rare frame — among the lowest-information openers possible.",
  MUMMY: "Spends three tiles on M. Even a perfect result reveals only three distinct letters.",
  VIVID: "Repeats V and I, so it tests just three unique letters and two of them are uncommon.",
};

export default function AvoidSection({
  words,
  best,
}: {
  words: OpenerStat[];
  best: OpenerStat;
}) {
  return (
    <div className="space-y-3">
      {words.map((w) => (
        <div
          key={w.word}
          className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="flex shrink-0 items-center gap-3">
            {/* Tailwind's grayscale filter utility is disabled in this project,
                so desaturate inline to signal a weak opener. */}
            <span style={{ filter: "grayscale(1)", opacity: 0.7 }}>
              <WordTiles word={w.word} size="sm" />
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {w.word}
            </span>
          </div>
          <p className="flex-1 text-sm text-muted-foreground">
            {REASONS[w.word] ?? "A weak opener against real answers."}
          </p>
          <div className="flex shrink-0 gap-4 font-mono text-xs">
            <div className="text-right">
              <div className="text-muted-foreground">Rank</div>
              <div className="font-semibold text-foreground">#{w.rank}</div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground">Entropy</div>
              <div className="font-semibold text-foreground">
                {w.entropy.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground">vs {best.word}</div>
              <div className="font-semibold text-destructive">
                −{(best.entropy - w.entropy).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
