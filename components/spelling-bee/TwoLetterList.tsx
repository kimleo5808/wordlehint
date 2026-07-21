import type { TwoLetterGroup } from "@/lib/spelling-bee-hints";

/**
 * The two-letter list, grouped one row per starting letter — the NYT forum
 * layout. Rendered inside a spoiler fold by the page.
 */
export default function TwoLetterList({
  groups,
}: {
  groups: TwoLetterGroup[];
}) {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-card p-5 font-mono text-sm">
      {groups.map((g) => (
        <p key={g.letter} className="flex flex-wrap gap-x-5 gap-y-1">
          {g.pairs.map((p) => (
            <span key={p.prefix} className="text-foreground">
              {p.prefix}{" "}
              <span className="text-muted-foreground">× {p.count}</span>
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
