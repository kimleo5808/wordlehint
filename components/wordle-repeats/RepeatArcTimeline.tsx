import type { WordleRepeat } from "@/lib/wordle-repeats";

const W = 1000;
const H = 300;
const BASE = 250; // baseline y
const PAD = 24;
const START = "2021-06-19"; // Wordle #0

const day = (d: string) => Date.parse(`${d}T12:00:00Z`);

function shortDate(d: string): string {
  return new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Every repeat as an arc from the word's previous run to its return. Most
 * arcs start in 2021, which is the story of the chart. Server-rendered SVG;
 * each arc carries a <title> for hover and screen readers.
 */
export default function RepeatArcTimeline({
  repeats,
  end,
}: {
  repeats: WordleRepeat[];
  end: string;
}) {
  const t0 = day(START);
  const t1 = day(end);
  const x = (d: string) => PAD + ((day(d) - t0) / (t1 - t0)) * (W - PAD * 2);
  const maxGap = Math.max(1, ...repeats.map((r) => r.gapDays));
  const years: string[] = [];
  for (let y = 2022; y <= Number(end.slice(0, 4)); y++) years.push(`${y}-01-01`);

  return (
    <figure>
      <style>{`
        @keyframes arc-draw { to { stroke-dashoffset: 0; } }
        .repeat-arc { stroke-dasharray: 1; stroke-dashoffset: 1; animation: arc-draw 900ms ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .repeat-arc { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`${repeats.length} Wordle repeats, each drawn from the word's previous run to its return`}
      >
        {/* baseline + year ticks */}
        <line x1={PAD} y1={BASE} x2={W - PAD} y2={BASE} className="stroke-border" strokeWidth={2} />
        {[START, ...years].map((d) => (
          <g key={d}>
            <line x1={x(d)} y1={BASE} x2={x(d)} y2={BASE + 8} className="stroke-border" strokeWidth={2} />
            <text
              x={x(d)}
              y={BASE + 34}
              textAnchor={d === START ? "start" : "middle"}
              className="fill-muted-foreground"
              style={{ font: "600 22px var(--font-mono-code), ui-monospace, monospace" }}
            >
              {d === START ? "#0 · 2021" : d.slice(0, 4)}
            </text>
          </g>
        ))}

        {/* arcs, oldest repeat first so the newest draws on top */}
        {[...repeats].reverse().map((r, i) => {
          const x1 = x(r.previous.date);
          const x2 = x(r.date);
          const rise = 40 + (r.gapDays / maxGap) * (BASE - 70);
          return (
            <g key={`${r.word}-${r.date}`}>
              <title>
                {`${r.word}: #${r.previous.id} (${shortDate(r.previous.date)}) → #${r.id} (${shortDate(r.date)}), ${r.gapDays.toLocaleString("en-US")} days apart`}
              </title>
              <path
                d={`M ${x1} ${BASE} C ${x1} ${BASE - rise}, ${x2} ${BASE - rise}, ${x2} ${BASE}`}
                pathLength={1}
                className="repeat-arc"
                style={{ animationDelay: `${i * 40}ms` }}
                fill="none"
                stroke="hsl(var(--wordle-correct))"
                strokeOpacity={0.55}
                strokeWidth={2.5}
              />
              <circle cx={x1} cy={BASE} r={4} className="fill-muted-foreground" />
              <circle cx={x2} cy={BASE} r={5} fill="hsl(var(--wordle-correct))" />
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground" aria-hidden />
          previous run
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-wordle-correct" aria-hidden />
          repeat
        </span>
        <span>taller arc = longer wait</span>
      </figcaption>
    </figure>
  );
}
