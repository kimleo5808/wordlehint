import { cn } from "@/lib/utils";
import type { AnswerStats } from "@/lib/wordle-answers";

/** A single horizontal CSS bar — no charting library required. */
function Bar({
  label,
  count,
  share,
  max,
  accent = "bg-wordle-correct",
}: {
  label: string;
  count: number;
  share: number;
  max: number;
  accent?: string;
}) {
  const width = max > 0 ? Math.max((count / max) * 100, 2) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 shrink-0 font-mono text-xs font-semibold text-foreground">
        {label}
      </span>
      <div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
        <div
          className={cn("h-full rounded", accent)}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-16 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
        {count} · {Math.round(share * 100)}%
      </span>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

export default function StatsViz({ stats }: { stats: AnswerStats }) {
  const topFirst = stats.firstLetters.slice(0, 10);
  const maxFirst = topFirst[0]?.count ?? 0;

  const topLast = stats.lastLetters.slice(0, 10);
  const maxLast = topLast[0]?.count ?? 0;

  const maxEnding = stats.topEndings[0]?.count ?? 0;
  const maxVowel = Math.max(...stats.vowelDistribution.map((v) => v.count), 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Most common starting letters">
        {topFirst.map((l) => (
          <Bar
            key={l.letter}
            label={l.letter}
            count={l.count}
            share={l.share}
            max={maxFirst}
          />
        ))}
      </Panel>

      <Panel title="Most common final letters">
        {topLast.map((l) => (
          <Bar
            key={l.letter}
            label={l.letter}
            count={l.count}
            share={l.share}
            max={maxLast}
            accent="bg-wordle-present"
          />
        ))}
      </Panel>

      <Panel title="Most common two-letter endings">
        {stats.topEndings.map((e) => (
          <Bar
            key={e.ending}
            label={`-${e.ending}`}
            count={e.count}
            share={e.share}
            max={maxEnding}
            accent="bg-wordle-present"
          />
        ))}
      </Panel>

      <Panel title="How many vowels answers contain">
        {stats.vowelDistribution.map((v) => (
          <Bar
            key={v.vowels}
            label={`${v.vowels}`}
            count={v.count}
            share={v.share}
            max={maxVowel}
          />
        ))}
        <p className="pt-2 font-mono text-[11px] text-muted-foreground">
          {Math.round(stats.repeatedLetterShare * 100)}% of answers include at
          least one repeated letter.
        </p>
      </Panel>
    </div>
  );
}
