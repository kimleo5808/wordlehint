import { ForgeDailySnapshotArchive } from "@/components/forge/ForgeSections";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  ForgeCode,
  ForgeDailySnapshot,
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

const redeemVariants = [
  "To redeem codes in the forge, open The Forge, enter the code panel, paste one active code, and confirm the reward popup.",
  "The fastest redeem flow is: launch game, open rewards/code menu, paste active entry, and verify success message.",
  "Use the redeem menu inside The Forge, not external pages, then paste the code exactly as shown in today's list.",
  "To redeem codes in the forge with fewer failures, always verify date freshness and use the latest active batch first.",
  "Redeem codes in the forge by using the in-game redeem box, keeping exact capitalization, then tapping confirm once.",
  "For consistent redemption, copy from today's active table, avoid manual typing errors, and redeem in descending confidence order.",
  "If you want to redeem codes in the forge quickly, start with today's top active code, paste exactly, and check inventory feedback.",
];

const useVariants = [
  "The best way to use codes in the forge is to start with newly active entries and stop retrying once a code is marked expired.",
  "Use codes in the forge in order: high-confidence active first, low-confidence active second, archived entries last.",
  "If one code fails, continue to the next active candidate and review expired notes after the full pass.",
  "To reduce wasted time, use only today's active section first and treat older pages as secondary references.",
  "Practical usage means redeeming each code once per account and skipping repeated attempts on already failed entries.",
  "To use codes in the forge efficiently, check today's update log before testing older daily snapshots.",
  "Use codes in the forge by prioritizing entries seen across multiple sources on the same day.",
];

const whereVariants = [
  "Put codes in the forge inside the in-game code/reward input box in The Forge interface.",
  "If you ask where to put codes in the forge, use the code field inside The Forge, not Roblox catalog pages.",
  "The correct place is the game's built-in redeem panel, usually under rewards, gift, or code menu.",
  "Do not paste codes into chat, profile fields, or external forms; only the in-game code box is valid.",
  "Enter codes in the in-game input area after your character fully loads to avoid UI sync issues.",
  "On mobile and desktop, the code location is in the same in-game menu family, though icon position may differ.",
  "Use the dedicated code textbox in The Forge UI and submit directly from that panel.",
];

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

function dayKey(dateText: string): number {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return 0;
  }
  return Math.floor(date.getTime() / 86400000);
}

function pickVariant(variants: string[], dateText: string, offset: number): string {
  const index = (dayKey(dateText) + offset) % variants.length;
  return variants[index];
}

function getPreviousSnapshot(date: string): ForgeDailySnapshot | null {
  const index = forgeDailySnapshots.findIndex((item) => item.date === date);
  if (index <= 0) {
    return null;
  }
  return forgeDailySnapshots[index - 1];
}

function formatDelta(current: number, previous: number): string {
  const delta = current - previous;
  if (delta > 0) return `+${delta}`;
  return `${delta}`;
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
      "Daily snapshot page for the forge codes with auto-collected active and expired lists, redeem guidance, and source coverage.",
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

  const previousSnapshot = getPreviousSnapshot(snapshot.date);
  const formattedDate = toLongDate(snapshot.date);

  const activeCount = snapshot.activeCodes.length;
  const expiredCount = snapshot.expiredCodes.length;
  const addedToday = snapshot.updateLog.filter((item) => item.event === "added").length;
  const movedExpiredToday = snapshot.updateLog.filter((item) => item.event === "expired").length;
  const retestedToday = snapshot.updateLog.filter((item) => item.event === "retested").length;

  const previousActive = previousSnapshot?.activeCodes.length ?? activeCount;
  const previousExpired = previousSnapshot?.expiredCodes.length ?? expiredCount;

  const sourceOkCount = snapshot.sources.filter((item) => item.ok).length;
  const sourceTotalCount = snapshot.sources.length;
  const sourceList = snapshot.sources.map((item) => item.name).join(", ");

  const redeemSentence = pickVariant(redeemVariants, snapshot.date, 0);
  const useSentence = pickVariant(useVariants, snapshot.date, 3);
  const whereSentence = pickVariant(whereVariants, snapshot.date, 5);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-6">
          <header className="rounded-2xl border border-orange-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 dark:border-orange-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
            <p className="text-xs uppercase tracking-[0.16em] text-orange-700 dark:text-orange-300">
              Daily snapshot
            </p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
              The Forge Codes ({formattedDate})
            </h1>
            <p className="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
              Last updated {snapshot.lastVerified}. Today we track {activeCount} active
              codes, {expiredCount} expired entries, {addedToday} newly added rows,
              and {movedExpiredToday} moves to expired status. This daily page is
              designed for quick redemption decisions and immediate troubleshooting.
            </p>
          </header>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Today's Changes in the forge codes
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Compared with {previousSnapshot ? toLongDate(previousSnapshot.date) : "the previous available snapshot"},
              active count changed by {formatDelta(activeCount, previousActive)} and
              expired count changed by {formatDelta(expiredCount, previousExpired)}.
              The log currently records {retestedToday} retested entries, which helps
              separate truly new drops from routine status confirmations.
            </p>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              For users who check daily, this section should be your first stop
              before copying anything. It gives a fast view of whether the market
              moved, whether today's cycle is mostly stable, and whether you should
              prioritize testing newly added rows or stick to established entries.
              If your goal is speed, test top active codes first, then use update
              log context before retrying any failed redemption.
            </p>
          </section>

          <CodeList title="Active codes" codes={snapshot.activeCodes} />
          <CodeList title="Expired codes" codes={snapshot.expiredCodes} />

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              how to redeem codes in the forge
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">{redeemSentence}</p>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              On days with multiple additions, redeem in priority order: first
              entries that appear across multiple sources, then lower-consensus
              codes. Keep exact capitalization and punctuation, including symbols
              like exclamation marks if present. After each attempt, check whether
              the reward count changed in your inventory or spin balance before
              proceeding to the next entry.
            </p>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              how to use codes in the forge
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">{useSentence}</p>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Using codes efficiently means avoiding duplicate retries and relying
              on state transitions from this page. If a code failed and appears in
              expired or recent-expired events, stop retesting and move on. If a code
              appears as newly added today, prioritize it early before event windows
              shift again. This approach saves time and reduces confusion when status
              changes occur between sessions.
            </p>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              where to put codes in the forge
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">{whereSentence}</p>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              If the input box is missing, check whether your game client fully
              loaded or whether UI layout differs on your device. In most builds,
              desktop and mobile both expose the same redeem function, even if icon
              placement changes. Always enter codes directly in-game and avoid third-party
              forms, because off-panel entries will never trigger valid rewards.
            </p>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Daily failure checklist
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              If today's redemption fails, run this quick checklist before assuming
              every code is dead: confirm case sensitivity, confirm no extra spaces,
              rejoin server after update windows, and compare with the update log.
              Most failed attempts come from formatting issues or recently expired
              entries, not from a broken redeem system.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300">
              <li>1. Retest only one high-confidence code after rejoin.</li>
              <li>2. Compare with today's expired movement before repeating attempts.</li>
              <li>3. Stop after one failure per code and continue to next active row.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Source coverage and confidence for {formattedDate}
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Today's aggregation used {sourceTotalCount} tracked sources ({sourceList}),
              with {sourceOkCount} successful fetches. This feed is auto-collected to
              maximize freshness and daily continuity, but fast-moving code ecosystems
              can change between refresh windows. Treat this page as a decision aid:
              test top rows first, verify in-game, then move through the remaining list.
            </p>
            <ul className="mt-4 space-y-2">
              {snapshot.sources.map((source) => (
                <li
                  key={`${source.name}-${source.fetchedAt}`}
                  className="rounded-lg border border-orange-100 px-3 py-2 text-sm text-slate-700 dark:border-orange-900/50 dark:text-slate-300"
                >
                  {source.name}: {source.foundCodes} codes · {source.ok ? "ok" : "fetch-error"}
                </li>
              ))}
            </ul>
          </section>

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
        </div>

        <div className="lg:sticky lg:top-20">
          <ForgeDailySnapshotArchive currentDate={snapshot.date} />
        </div>
      </div>
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
