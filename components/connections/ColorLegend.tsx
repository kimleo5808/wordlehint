import { CONN_COLORS, type ConnColor } from "./colors";

const LEGEND: { color: ConnColor; label: string; desc: string }[] = [
  { color: "yellow", label: "Yellow — Easiest", desc: "The most straightforward group, usually a clear shared theme." },
  { color: "green", label: "Green — Easy", desc: "A simple connection, but watch for a decoy word or two." },
  { color: "blue", label: "Blue — Hard", desc: "Often trivia or a more specific category that needs knowledge." },
  { color: "purple", label: "Purple — Trickiest", desc: "Usually wordplay — hidden prefixes, suffixes, or puns." },
];

export default function ColorLegend() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {LEGEND.map((item) => {
        const c = CONN_COLORS[item.color];
        return (
          <div
            key={item.color}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <span
              className="mt-0.5 inline-block h-6 w-6 shrink-0 rounded"
              style={{ backgroundColor: c.bg }}
            />
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground">
                {item.label}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
