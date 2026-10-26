export interface Fact {
  value: string;
  label: string;
}

/** Ledger-style number cards for the "in numbers" section. */
export default function FactCards({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {facts.map((f) => (
        <div
          key={f.label}
          className="rounded-xl border border-dashed border-border bg-card px-4 py-3"
        >
          <dt className="sr-only">{f.label}</dt>
          <dd className="font-mono text-2xl font-bold tabular-nums text-foreground">
            {f.value}
          </dd>
          <dd className="mt-1 text-xs leading-snug text-muted-foreground">
            {f.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
