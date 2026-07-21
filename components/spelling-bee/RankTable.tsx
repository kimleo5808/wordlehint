import type { SpellingBeeRank } from "@/types/spelling-bee";

/**
 * The Beginner → Queen Bee ladder with today's exact score thresholds,
 * rendered as horizontal progress bars scaled to the max score.
 */
export default function RankTable({
  ranks,
  totalPoints,
}: {
  ranks: SpellingBeeRank[];
  totalPoints: number;
}) {
  return (
    <ol className="space-y-2">
      {[...ranks].reverse().map((rank) => {
        const highlight = rank.name === "Genius" || rank.name === "Queen Bee";
        return (
          <li
            key={rank.name}
            className="grid grid-cols-[7rem_1fr_3.5rem] items-center gap-3 text-sm"
          >
            <span
              className={`font-heading ${
                highlight ? "font-bold text-foreground" : "text-muted-foreground"
              }`}
            >
              {rank.name}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${
                  highlight ? "bg-wordle-present" : "bg-wordle-present/40"
                }`}
                style={{
                  width: `${totalPoints ? (rank.minScore / totalPoints) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="text-right font-mono font-semibold tabular-nums text-foreground">
              {rank.minScore}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
