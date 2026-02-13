import { getDefinition } from "@/lib/wordle-definitions";
import type { DailyPuzzle } from "@/types/wordle-daily";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function YesterdayRecap({
  puzzle,
}: {
  puzzle: DailyPuzzle | null;
}) {
  if (!puzzle) return null;

  const def = getDefinition(puzzle.answer);
  const formattedDate = new Date(
    puzzle.date + "T12:00:00Z"
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-foreground">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-base font-bold">
          Yesterday&apos;s Wordle — {formattedDate}
        </h3>
      </div>
      <div className="mt-3 text-sm text-muted-foreground">
        <p>
          The answer to Wordle #{puzzle.id} was{" "}
          <span className="font-bold text-foreground">{puzzle.answer}</span>
          {def && (
            <>
              {" "}
              — {def.partOfSpeech}: {def.definition.toLowerCase()}
            </>
          )}
        </p>
        <Link
          href={`/wordle-hint/${puzzle.date}`}
          className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
        >
          View full hints for #{puzzle.id} →
        </Link>
      </div>
    </div>
  );
}
