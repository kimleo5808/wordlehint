import { CONN_COLORS, type ConnColor } from "./colors";

export interface AnswerRow {
  color: ConnColor;
  name: string;
  words: string[];
}

/** The fully solved grid — four colour rows of four words. */
export default function AnswerGrid({ rows }: { rows: AnswerRow[] }) {
  return (
    <div className="space-y-2">
      {rows.map((row, r) => {
        const c = CONN_COLORS[row.color];
        return (
          <div
            key={r}
            className="rounded-xl p-3"
            style={{ backgroundColor: c.bg, color: c.text }}
          >
            <div className="text-center font-mono text-[11px] font-bold uppercase tracking-wider opacity-90">
              {row.name}
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {row.words.map((w, i) => (
                <div
                  key={w}
                  style={{ animationDelay: `${(r * 4 + i) * 50}ms` }}
                  className="animate-fade-in-up rounded bg-black/10 px-2 py-1.5 text-center font-mono text-xs font-bold"
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
