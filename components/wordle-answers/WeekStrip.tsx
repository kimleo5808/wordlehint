import Link from "next/link";
import type { AnswerEntry } from "@/lib/wordle-answers";
import { WordTiles } from "./WordTiles";
import SpoilerReveal from "./SpoilerReveal";

function dayLabel(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * The most recent week at a glance. Today's card (if present) is rendered
 * spoiler-safe; past days show their answer outright.
 */
export default function WeekStrip({
  today,
  recent,
}: {
  today?: AnswerEntry;
  recent: AnswerEntry[];
}) {
  return (
    <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {today && (
        <div className="flex min-w-[220px] snap-start flex-col gap-2 rounded-xl border border-cta/30 bg-cta/5 p-4 sm:min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cta">
              Today · #{today.id}
            </span>
          </div>
          <SpoilerReveal word={today.answer} date={today.date} />
          <span className="font-mono text-[11px] text-muted-foreground">
            {dayLabel(today.date)}
          </span>
        </div>
      )}

      {recent.map((entry) => (
        <Link
          key={entry.date}
          href={`/wordle-hint/${entry.date}`}
          className="flex min-w-[220px] snap-start flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-cta/40 hover:bg-muted/40 sm:min-w-0"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            #{entry.id}
          </span>
          <WordTiles word={entry.answer} size="md" />
          <span className="font-mono text-[11px] text-muted-foreground">
            {dayLabel(entry.date)}
          </span>
        </Link>
      ))}
    </div>
  );
}
