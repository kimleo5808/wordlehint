import { rateDifficulty, type DifficultyLevel } from "@/lib/wordle-difficulty";
import { BarChart3 } from "lucide-react";

const LEVEL_CONFIG: Record<
  DifficultyLevel,
  { color: string; bg: string; bars: number }
> = {
  Easy: { color: "text-green-600 dark:text-green-400", bg: "bg-green-500", bars: 1 },
  Medium: { color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500", bars: 2 },
  Hard: { color: "text-red-600 dark:text-red-400", bg: "bg-red-500", bars: 3 },
};

export default function DifficultyRatingCard({ word }: { word: string }) {
  const rating = rateDifficulty(word);
  const config = LEVEL_CONFIG[rating.level];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="font-heading text-base font-bold">
            Difficulty Rating
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((bar) => (
              <div
                key={bar}
                className={`h-4 w-2 rounded-sm ${
                  bar <= config.bars
                    ? config.bg
                    : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
          <span className={`text-sm font-bold ${config.color}`}>
            {rating.level}
          </span>
          <span className="text-xs text-muted-foreground">
            ({rating.score}/10)
          </span>
        </div>
      </div>

      <ul className="mt-3 space-y-1">
        {rating.reasons.map((reason, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/40" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
