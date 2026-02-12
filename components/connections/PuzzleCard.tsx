import type { ConnectionsPuzzle } from "@/types/connections";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DOT_COLORS = [
  "bg-yellow-400",
  "bg-emerald-500",
  "bg-blue-400",
  "bg-purple-500",
];

interface PuzzleCardProps {
  puzzle: ConnectionsPuzzle;
}

export function PuzzleCard({ puzzle }: PuzzleCardProps) {
  const formattedDate = dayjs(puzzle.date).format("MMMM D, YYYY");
  const groups = [...puzzle.answers].sort((a, b) => a.level - b.level);

  return (
    <Link
      href={`/connections-hint/${puzzle.date}`}
      className="group block rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:hover:border-blue-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Puzzle #{puzzle.id}
          </p>
          <p className="mt-0.5 text-sm font-bold text-foreground">
            {formattedDate}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
      </div>

      <div className="mt-3 space-y-1.5">
        {groups.map((group) => (
          <div key={group.level} className="flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${DOT_COLORS[group.level] || DOT_COLORS[0]}`}
            />
            <span className="truncate text-xs text-muted-foreground">
              {group.group}
            </span>
          </div>
        ))}
      </div>
    </Link>
  );
}

export function PuzzleCardCompact({ puzzle }: PuzzleCardProps) {
  const formattedDate = dayjs(puzzle.date).format("MMM D");

  return (
    <Link
      href={`/connections-hint/${puzzle.date}`}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/20"
    >
      <div className="flex gap-0.5">
        {DOT_COLORS.map((color) => (
          <span key={color} className={`h-1.5 w-1.5 rounded-full ${color}`} />
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          #{puzzle.id} — {formattedDate}
        </p>
      </div>
      <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" />
    </Link>
  );
}
