import { Locale, LOCALES } from "@/i18n/routing";
import {
  ForgeCode,
  forgeDailySnapshots,
  getForgeSnapshotByDate,
} from "@/lib/forge-data";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{
  locale: string;
  date: string;
}>;

function isIsoDate(input: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(input);
}

function toLongDate(input: string): string {
  const [year, month, day] = input.split("-").map((value) => Number(value));
  if (!year || !month || !day) {
    return input;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function CodeList({
  title,
  codes,
}: {
  title: string;
  codes: ForgeCode[];
}) {
  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3">
        {codes.map((item) => (
          <li
            key={item.code}
            className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
          >
            <p className="font-mono font-semibold text-slate-900 dark:text-slate-100">
              {item.code}
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {item.reward}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {item.lastTested} · {item.source}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const formattedDate = toLongDate(date);

  return constructMetadata({
    page: "Daily",
    title: `The Forge Codes (${formattedDate}): Daily Auto-Collected Snapshot`,
    description:
      "Daily snapshot page for the forge codes with auto-collected active and expired lists from public sources.",
    locale: locale as Locale,
    path: `/the-forge-codes/${date}`,
    canonicalUrl: `/the-forge-codes/${date}`,
  });
}

export default async function DailyForgeCodesPage({
  params,
}: {
  params: Params;
}) {
  const { date } = await params;

  if (!isIsoDate(date)) {
    notFound();
  }

  const snapshot = getForgeSnapshotByDate(date);
  if (!snapshot) {
    notFound();
  }

  const formattedDate = toLongDate(snapshot.date);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="rounded-2xl border border-orange-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 dark:border-orange-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <p className="text-xs uppercase tracking-[0.16em] text-orange-700 dark:text-orange-300">
          Daily snapshot
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
          The Forge Codes ({formattedDate})
        </h1>
        <p className="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
          Auto-collected daily snapshot for the forge codes. Data is aggregated
          from public pages and may change quickly in-game.
        </p>
      </header>

      <CodeList title="Active codes" codes={snapshot.activeCodes} />
      <CodeList title="Expired codes" codes={snapshot.expiredCodes} />

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Update log
        </h2>
        <ul className="mt-4 space-y-3">
          {snapshot.updateLog.map((item) => (
            <li
              key={`${item.time}-${item.code}`}
              className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.time}
              </p>
              <p className="mt-1 font-mono font-semibold text-slate-900 dark:text-slate-100">
                {item.code}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Source coverage
        </h2>
        <ul className="mt-4 space-y-2">
          {snapshot.sources.map((source) => (
            <li
              key={`${source.name}-${source.fetchedAt}`}
              className="rounded-lg border border-orange-100 px-3 py-2 text-sm text-slate-700 dark:border-orange-900/50 dark:text-slate-300"
            >
              {source.name}: {source.foundCodes} codes ·{" "}
              {source.ok ? "ok" : "fetch-error"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    forgeDailySnapshots.map((snapshot) => ({
      locale,
      date: snapshot.date,
    }))
  );
}
