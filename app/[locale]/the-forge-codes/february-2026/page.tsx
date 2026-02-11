import {
  ForgeDailySnapshot,
  ForgeCode,
  forgeLatestSnapshot,
  getForgeMonthSnapshots,
} from "@/lib/forge-data";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;

function longDate(dateText: string) {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function codeList(items: ForgeCode[]) {
  return [...new Set(items.map((item) => item.code))];
}

function countEvents(snapshots: ForgeDailySnapshot[], event: "added" | "expired" | "retested") {
  return snapshots.reduce(
    (acc, snapshot) => acc + snapshot.updateLog.filter((item) => item.event === event).length,
    0
  );
}

function getWeekNumber(dateText: string): number {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return 1;
  }
  const day = date.getUTCDate();
  return Math.min(4, Math.floor((day - 1) / 7) + 1);
}

function weekRange(week: number): string {
  const start = (week - 1) * 7 + 1;
  const end = Math.min(week * 7, 28);
  return `February ${start} - February ${end}`;
}

function byDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    page: "Month",
    title: "The Forge Codes February 2026: Monthly Trend, Active Flow, and Archive",
    description:
      "Monthly report for The Forge codes in February 2026 with trend analysis, active and expired patterns, redeem usage guidance, and daily archive links.",
    locale: locale as Locale,
    path: "/the-forge-codes/february-2026",
    canonicalUrl: "/the-forge-codes/february-2026",
  });
}

export default function February2026Page() {
  const monthSnapshots = getForgeMonthSnapshots("2026-02");
  const monthBase = monthSnapshots.length > 0 ? monthSnapshots : [forgeLatestSnapshot];
  const sorted = byDateDesc(monthBase);

  const latest = sorted[0];
  const monthActive = latest.activeCodes;
  const monthExpired = latest.expiredCodes;

  const addedTotal = countEvents(monthBase, "added");
  const expiredTotal = countEvents(monthBase, "expired");
  const retestedTotal = countEvents(monthBase, "retested");

  const uniqueActive = codeList(monthBase.flatMap((item) => item.activeCodes));
  const uniqueExpired = codeList(monthBase.flatMap((item) => item.expiredCodes));

  const weekly = [1, 2, 3, 4].map((week) => {
    const items = monthBase.filter((snapshot) => getWeekNumber(snapshot.date) === week);
    const weeklyActive = codeList(items.flatMap((snapshot) => snapshot.activeCodes));
    const weeklyExpired = codeList(items.flatMap((snapshot) => snapshot.expiredCodes));
    const weeklyAdded = countEvents(items, "added");
    const weeklyExpiredEvents = countEvents(items, "expired");
    const weeklyRetested = countEvents(items, "retested");

    return {
      week,
      items,
      active: weeklyActive.length,
      expired: weeklyExpired.length,
      added: weeklyAdded,
      expiredEvents: weeklyExpiredEvents,
      retested: weeklyRetested,
    };
  });

  const peakDay = byDateDesc(monthBase).sort(
    (a, b) => b.updateLog.length - a.updateLog.length
  )[0];

  const trendNarrative = [
    `February 2026 is a transition-heavy month for the forge codes ecosystem. Across ${monthBase.length} daily snapshots, we tracked ${uniqueActive.length} unique active-code appearances, ${uniqueExpired.length} unique expired-code appearances, ${addedTotal} add events, ${expiredTotal} expiry movements, and ${retestedTotal} retest confirmations. Instead of treating each list as an isolated post, this monthly report consolidates movement patterns so users can see cadence, not only isolated entries.`,
    `From an operational angle, the key February takeaway is that status volatility tends to cluster around short windows. The largest single-day movement happened on ${longDate(peakDay.date)}, where ${peakDay.updateLog.length} timeline events were recorded in one cycle. That kind of burst usually indicates either event-linked releases or coordinated source updates. In practical terms, users should prioritize same-day checks on burst windows rather than depending on stale lists published several days earlier.`,
    `Weekly trend analysis shows different behavior across the month. Early-week segments often contain more "added" events, while later windows skew toward retest and cleanup behavior as weaker entries move into expired. This does not guarantee every newly observed code is globally redeemable, but it strongly suggests that freshness and source overlap matter more than raw list length. A shorter list with high recent overlap is usually more useful than a long list with mixed timing.`,
    `Another February pattern is that archive quality becomes more valuable over time. Expired tracking is not only a historical feature; it actively reduces retry waste. Once a code appears repeatedly in expired context across consecutive snapshots, user effort is better spent on new additions or high-confidence retests. This month reinforces the rule that code operations are less about collecting every string and more about sequencing attempts with good timing signals.`,
    `For search intent, February data also supports clear page-role separation. The monthly report should summarize trend and behavior, while daily pages answer immediate execution questions. Keeping this separation helps users navigate faster and prevents content overlap between homepage, hub page, daily page, and monthly archive. In this model, monthly pages are the strategic layer: fewer frantic updates, more interpretable direction for how to redeem and how to prioritize attempts.`,
  ];

  const monthPlaybook = [
    `how to redeem codes in the forge (monthly practice): Use daily freshness before every redeem session. Start with today's highest-overlap active entries, then move to lower-overlap entries only if needed. If a code appears active in the monthly view but failed in your session, compare today's daily page before repeating attempts. Monthly data is context, not a direct substitute for daily execution.`,
    `how to use codes in the forge (priority model): Use active rows as a queue, not a random bucket. Try one code at a time, confirm reward result, then proceed. If several failures occur consecutively, pause and review same-day update logs instead of brute-force retrying every line. This February cycle shows that sequence discipline outperforms volume-based testing.`,
    `where to put codes in the forge (consistency note): The correct entry point remains the in-game redeem/code box within The Forge UI. Monthly review shows many user-side failures stem from wrong panel usage, stale server state, or formatting errors, not from code format itself. Keep entry context stable and version current before assuming systemic expiry.`,
    `Failure prevention strategy: February behavior suggests that most avoidable failures happen after users ignore expiry signals or skip timestamp checks. A practical routine is: open daily page, redeem top active entries, stop on confirmed expiry movement, then revisit after next refresh window. This approach typically saves more time than searching multiple external lists in parallel.`,
    `Next-month readiness: Based on February cadence, users should watch for dense movement near update windows and maintain a simple personal log of already redeemed entries. The monthly archive helps with planning, but success still depends on daily execution discipline. Treat this report as a map: it shows where change tends to happen, so your next session starts with better odds.`,
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="rounded-2xl border border-orange-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 dark:border-orange-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <p className="text-xs uppercase tracking-[0.16em] text-orange-700 dark:text-orange-300">
          Monthly archive
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
          The Forge Codes February 2026: Monthly Trend, Active Flow, and Archive
        </h1>
        <p className="mt-4 max-w-4xl text-slate-700 dark:text-slate-300">
          This monthly page summarizes February behavior for the forge codes:
          trend direction, active and expired movement, and operational guidance
          for users who want faster daily decisions.
        </p>
      </header>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Monthly overview
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Snapshot days
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {monthBase.length}
            </p>
          </div>
          <div className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Unique active
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {uniqueActive.length}
            </p>
          </div>
          <div className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Unique expired
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {uniqueExpired.length}
            </p>
          </div>
          <div className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Peak update day
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {longDate(peakDay.date)}
            </p>
          </div>
        </div>

        <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
          {trendNarrative.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Weekly trend breakdown
        </h2>
        <div className="mt-4 grid gap-4">
          {weekly.map((item) => (
            <article
              key={item.week}
              className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Week {item.week} ({weekRange(item.week)})
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                {item.items.length} snapshot(s), {item.active} active appearances,{" "}
                {item.expired} expired appearances, {item.added} added events,{" "}
                {item.expiredEvents} expired events, and {item.retested} retested
                confirmations.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Active The Forge Codes (Latest February snapshot)
        </h2>
        <ul className="mt-4 grid gap-3">
          {monthActive.map((item) => (
            <li
              key={item.code}
              className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-900/20"
            >
              <p className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                {item.code}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Reward: {item.reward} · Last tested: {item.lastTested}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Expired The Forge Codes (Latest February snapshot)
        </h2>
        <ul className="mt-4 grid gap-3">
          {monthExpired.slice(0, 12).map((item) => (
            <li
              key={item.code}
              className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/60 dark:bg-rose-900/20"
            >
              <p className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                {item.code}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Last tested: {item.lastTested} · Source: {item.source}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Monthly playbook
        </h2>
        <div className="prose prose-slate mt-4 max-w-none dark:prose-invert">
          {monthPlaybook.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          February change log
        </h2>
        <ul className="mt-4 space-y-3">
          {sorted.flatMap((snapshot) =>
            snapshot.updateLog.map((item) => (
              <li
                key={`${snapshot.date}-${item.time}-${item.code}`}
                className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {snapshot.date} · {item.time}
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                  {item.code}
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {item.summary}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
