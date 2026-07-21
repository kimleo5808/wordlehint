import { Crown, ListOrdered, Sigma } from "lucide-react";

/**
 * The three numbers everyone searches for: today's word count, total points,
 * and the Genius cutoff. Deliberately unblurred — they help without spoiling.
 */
export default function StatsTrio({
  totalWords,
  totalPoints,
  geniusScore,
}: {
  totalWords: number;
  totalPoints: number;
  geniusScore: number;
}) {
  const stats = [
    { label: "Words today", value: totalWords, Icon: ListOrdered, gold: false },
    { label: "Total points", value: totalPoints, Icon: Sigma, gold: false },
    { label: "Genius score", value: geniusScore, Icon: Crown, gold: true },
  ];

  return (
    <dl className="grid grid-cols-3 gap-3">
      {stats.map(({ label, value, Icon, gold }) => (
        <div
          key={label}
          className={`rounded-xl border p-4 text-center ${
            gold
              ? "border-wordle-present/60 bg-wordle-present/10"
              : "border-border bg-card"
          }`}
        >
          <Icon
            className={`mx-auto h-5 w-5 ${
              gold ? "text-wordle-present" : "text-muted-foreground"
            }`}
            aria-hidden
          />
          <dd className="mt-2 font-heading text-3xl font-bold tabular-nums text-foreground">
            {value}
          </dd>
          <dt className="mt-1 text-xs font-medium text-muted-foreground">
            {label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
