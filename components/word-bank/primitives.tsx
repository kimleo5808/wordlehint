import { cn } from "@/lib/utils";

/** Section heading with a green Wordle-tile rule on the left. */
export function SectionHeading({
  id,
  title,
  count,
  as: As = "h2",
  className,
}: {
  id?: string;
  title: string;
  count?: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <As
      id={id}
      className={cn(
        "scroll-mt-24 flex items-center gap-3 font-heading font-bold text-foreground",
        As === "h2" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
        className
      )}
    >
      <span
        aria-hidden
        className="inline-block h-6 w-1.5 shrink-0 rounded-full bg-wordle-correct"
      />
      <span>{title}</span>
      {count != null && (
        <span className="rounded-full border border-border bg-muted px-2 py-0.5 font-body text-xs font-medium text-muted-foreground">
          {count}
        </span>
      )}
    </As>
  );
}

/** A single quick-stat box: big number + label. */
export function StatCard({
  value,
  label,
  accent = true,
  tone = "correct",
}: {
  value: string;
  label: string;
  accent?: boolean;
  /** Accent colour of the value — green (default) or yellow for contains pages. */
  tone?: "correct" | "present";
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 text-center">
      <div
        className={cn(
          "font-heading text-2xl font-bold sm:text-3xl",
          !accent
            ? "text-foreground"
            : tone === "present"
              ? "text-wordle-present"
              : "text-wordle-correct"
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
