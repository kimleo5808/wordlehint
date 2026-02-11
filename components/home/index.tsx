import { forgeRecentSnapshots, forgeSiteFacts } from "@/lib/forge-data";
import {
  ArrowRight,
  CalendarClock,
  Flame,
  Gift,
  ListChecks,
  SearchCheck,
} from "lucide-react";
import Link from "next/link";

const latestSnapshot = forgeRecentSnapshots[0];
const latestActivePreview = (latestSnapshot?.activeCodes ?? []).slice(0, 8);

const keywordSignalCards = [
  {
    label: "US Monthly Search",
    value: "5.4K",
    note: "Primary commercial region in your keyword screenshots.",
  },
  {
    label: "Global Monthly Search",
    value: "12.3K",
    note: "Total head-term demand for the forge codes family.",
  },
  {
    label: "Tracked Variations",
    value: "141+",
    note: "Strong synonym cluster such as the forge roblox codes.",
  },
  {
    label: "Question Keywords",
    value: "20+",
    note: "Includes how to redeem, how to use, and where to put flows.",
  },
];

const homepageSections = [
  {
    id: "keyword-landscape",
    title: "Keyword Landscape: What The Data Says About The Forge Codes",
    paragraphs: [
      "Your keyword screenshots confirm that the forge codes is not a tiny niche phrase; it is a recurring intent cluster with clear user urgency. The headline query the forge codes has meaningful volume on its own, and the related variants the forge roblox codes, the forge codes roblox, codes for the forge, and new codes for the forge all sit close enough to be solved by one tightly structured content system. This is why the homepage should not be a short banner page anymore. The homepage should act as a ranking-ready pillar for the forge codes, summarize the latest market signals, and funnel users into the live update pages without forcing extra clicks.",
      "The strongest takeaway from your dataset is not only volume, but intent composition. Most terms around this query are informational with immediate action behavior. A user searching this term usually wants to redeem in the next minute. A user searching how to redeem codes in the forge is even closer to action. A user searching where to put codes in the forge is blocked by UI confusion and needs one exact answer. If the homepage carries 2000+ words but hides these answers, it will lose both conversion and SEO efficiency. The right model is depth plus speed: prominent quick answers, then long-form support sections below.",
      "Your screenshots also show that this keyword family has many lexical variants with similar intent. This matters because search engines often rotate which page wins for each variant, especially when one site uses only one phrase repeatedly without covering adjacent language. The homepage should intentionally include the forge codes, the forge roblox codes, the forge codes roblox, codes in the forge, new codes in the forge, and all codes in the forge in naturally placed headings and paragraphs. That pattern improves semantic coverage while keeping one canonical homepage URL as the topical anchor.",
      "Competition indicators in your screenshots imply that content freshness and internal authority both matter. Large domains can rank quickly with shorter pages, but a focused brand like theforgecodes can still compete by publishing clearer structure and better update hygiene. The homepage should state verification timestamps, link to daily pages, and explain how the update cycle works. For the forge codes topic, users reward transparent recency. If they see when the list changed and where to check day-specific snapshots, they return. Returning users create repeat engagement signals that help your main page hold rankings longer.",
    ],
  },
  {
    id: "homepage-role",
    title: "Homepage Role: Pillar Page For The Forge Codes, Not A Duplicate List",
    paragraphs: [
      "To avoid cannibalization, the homepage and the /the-forge-codes hub need different jobs. The homepage should be the strategic pillar: it explains the search landscape, teaches the redeem workflow, answers common failures, and routes users to live snapshots. The /the-forge-codes URL should remain the operational list page with complete active and expired tables, timeline rows, and deep archives. This role split helps ranking stability because search engines can map one URL to broad informational intent and another URL to transactional list intent for this ecosystem.",
      "When someone lands on the homepage from the forge codes query, the above-the-fold area should solve three questions fast: are there active codes now, when was the latest check, and where can I see today's detailed page. This is why the homepage still needs preview cards and direct buttons. But unlike your previous short version, the page then continues with long-form sections that capture secondary intents the forge codes roblox, how to use codes in the forge, where to put codes in the forge, and why codes fail. That depth is what pushes the page from a gateway into a genuine ranking asset.",
      "A practical homepage structure for this niche looks like this: hero summary, keyword signal cards, active preview grid, redemption mini-guide, troubleshooting guide, editorial sections on update logic, and a right sidebar Recent Codes archive. This mirrors user behavior shown by top competitors but improves clarity. On competitor pages, users often scan a long article and still struggle to find historical links. On your homepage, the Recent Codes list should remain visible while scrolling so visitors can jump to date pages immediately. That makes the forge codes journey faster and keeps internal linking strong.",
      "Because this homepage targets 2000+ words, it should include narrative depth without becoming generic filler. Every section must answer a specific intent cluster in the keyword map. If text does not help someone redeem faster, verify faster, or choose the correct page faster, it should be removed. This standard keeps the long-form format useful and prevents quality loss over time as you add new monthly and daily assets around the forge codes topic.",
    ],
  },
  {
    id: "redeem-use-put",
    title:
      "Core User Questions: How To Redeem Codes In The Forge, How To Use Codes In The Forge, Where To Put Codes In The Forge",
    paragraphs: [
      "The phrase how to redeem codes in the forge should appear as a dedicated section because it is a high-intent query cluster in your research. The short answer is direct: open Roblox The Forge, find the in-game codes entry panel, paste one code exactly as shown, and redeem before it expires. The long answer needs failure safeguards. Tell users to avoid extra spaces, preserve capitalization, and redeem the newest code first to validate that their account and session are healthy. If the first high-confidence code fails, the issue is usually game version mismatch or UI location confusion rather than code status.",
      "The phrase how to use codes in the forge sounds similar, but users asking it often want outcome context rather than only UI steps. This section should explain that codes can unlock spins, resources, progression boosts, or event rewards depending on current game patches. It should also explain usage timing: new codes in the forge are usually most reliable right after update windows, then degrade as players redeem and events close. By explicitly connecting new entries to practical reward timing, the homepage becomes more helpful than pages that only repeat static lists without teaching when to act.",
      "The phrase where to put codes in the forge deserves explicit visual language because this is where many first-time players fail. The homepage should tell users the exact target is the in-game redemption field, not Roblox catalog search, not group walls, and not off-site claim forms. Mention common UI labels such as gift icon or codes button and advise users to rejoin a server if the field does not appear after updates. A section that solves where to put codes in the forge will capture frustrated traffic that otherwise bounces to multiple competitor pages before finding one clear instruction.",
      "You should also connect these three question clusters back to one operational flow. First, users discover updates on the homepage. Second, they open the main list page for live status. Third, if redemption fails, they compare with today's date page and check whether a code was moved into expired. This workflow closes the loop between content and action. It is the biggest difference between a generic article and a truly useful platform that users bookmark and revisit.",
    ],
  },
  {
    id: "competitive-angle",
    title: "Competitive Angle: Why Users Should Prefer Theforgecodes",
    paragraphs: [
      "Major competitors rank for the forge codes because they have strong domain authority and broad game coverage. Their advantage is scale. Your advantage should be precision: cleaner layout, faster path to active entries, transparent daily archive, and focused topical depth. The homepage can communicate this clearly. Instead of pretending every code is always working, explain your freshness model and remind users that codes can expire quickly. Transparent uncertainty builds more trust than overconfident claims, especially in fast-moving Roblox code cycles.",
      "A second competitive advantage is archive usability. Many users check these updates repeatedly but do not remember what changed since yesterday. A sticky Recent Codes sidebar solves this immediately by giving one-click access to date pages. When a code fails, users can inspect the previous two or three days and detect movement. This is practical value that improves satisfaction and lowers bounce. It also strengthens internal linking signals because each homepage session naturally opens multiple pages in this cluster.",
      "A third advantage is structured content hierarchy. The homepage should carry broad intent and long-form explanations, while /the-forge-codes carries live tables, /the-forge-codes/yyyy-mm-dd carries daily snapshots, and /the-forge-codes/month-name-year carries monthly trend summaries. This layered architecture makes your coverage deeper than a single page that gets overwritten daily. It also gives search engines stable URL purposes, reducing indexing confusion and helping each page rank for the most relevant part of the query family.",
      "Finally, your brand voice should stay consistent: practical, direct, and timestamp-driven. Players searching the forge codes do not need hype text. They need confidence that your page is current and honest. Keep the copy factual, show last verified time, and maintain clear active versus expired separation. Over time, this consistency is how theforgecodes becomes a recognized destination, even when competing against larger general gaming publications.",
    ],
  },
  {
    id: "automation-model",
    title: "Freshness Model: How The Forge Codes Content Stays Updated Every Day",
    paragraphs: [
      "Your infrastructure already supports scheduled updates, and the homepage should explain this in user-friendly language. Mention that the data feed refreshes on a predictable cadence, snapshots are generated automatically, and each snapshot is published with a date route. This tells users why they can trust recency without checking social media constantly. For SEO, this also reinforces freshness signals by pairing textual promises with real date-based pages and sitemap updates that search engines can crawl.",
      "The homepage should explain what automation can and cannot guarantee. Automation helps discover candidate codes quickly, but individual rewards can still expire between fetch windows. This is not a weakness; it is normal behavior for game code ecosystems. Set that expectation directly: users should test top entries first, then consult the same-day page if a result fails. This guidance reduces frustration and keeps your audience aligned with how codes change in real time.",
      "Monthly summaries add another layer of value. Daily pages answer what changed today, while monthly pages explain trend behavior such as patch spikes, seasonal bursts, and keyword pattern shifts like the forge codes 2026 and the forge beta codes. The homepage should link to the latest month summary so users can understand context, not just single-day noise. Context improves trust and encourages longer sessions, which supports both user retention and SEO quality for the forge codes ecosystem.",
      "Over time, this operating model creates a durable moat: homepage for strategy, hub for live action, daily pages for immutable history, and monthly pages for interpretation. This is exactly the structure needed to compete in a query space where the forge codes demand stays high but status changes quickly. The strongest sites in this niche are not only fast at publishing; they are fast at organizing information so users can decide correctly with minimal friction.",
    ],
  },
];

const faqItems = [
  {
    question: "Are these the forge codes guaranteed to work for every player?",
    answer:
      "No code page can guarantee permanent validity. We publish the forge codes based on the latest collected signals, then move entries to expired when repeated checks fail.",
  },
  {
    question: "How often should I check for new codes in the forge?",
    answer:
      "Check at least once per day and after major game updates. The homepage and Recent Codes sidebar are designed for this quick repeat workflow.",
  },
  {
    question: "What is the difference between the homepage and /the-forge-codes?",
    answer:
      "The homepage is the long-form pillar and guidance layer. The /the-forge-codes page is the live operational list with deeper status tables and update logs.",
  },
  {
    question: "Where do I find old the forge codes that stopped working?",
    answer:
      "Use the history and date pages from the Recent Codes list. Keeping expired records prevents repeated failed attempts.",
  },
  {
    question: "Do the forge roblox codes and the forge codes roblox mean different things?",
    answer:
      "In practice they represent the same intent cluster. We cover both language variants to match how users search in the real world.",
  },
  {
    question: "Can I rely only on one source for the forge codes?",
    answer:
      "It is safer to use an aggregated source with timestamped updates. That is why this site keeps a daily snapshot system and visible recency indicators.",
  },
];

type RecentListProps = {
  currentDate?: string;
};

function formatRecentDate(dateText: string) {
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

function RecentCodesList({ currentDate }: RecentListProps) {
  return (
    <aside className="rounded-xl border border-orange-200/70 bg-white p-4 shadow-sm dark:border-orange-900/40 dark:bg-slate-950">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/the-forge-codes"
          className="rounded-md bg-slate-900 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white hover:bg-slate-800"
        >
          Live Hub
        </Link>
        <Link
          href="/the-forge-codes-history"
          className="rounded-md bg-slate-900 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white hover:bg-slate-800"
        >
          History
        </Link>
      </div>

      <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-slate-100">
        Recent Codes
      </h2>

      <div className="mt-3 overflow-hidden rounded-lg border border-orange-100 dark:border-orange-900/50">
        {forgeRecentSnapshots.slice(0, 20).map((item) => (
          <Link
            key={item.date}
            href={`/the-forge-codes/${item.date}`}
            className={`block border-b border-orange-100 px-3 py-3 text-sm transition last:border-b-0 dark:border-orange-900/50 ${
              currentDate === item.date
                ? "bg-orange-100/70 font-semibold text-slate-900 dark:bg-orange-900/30 dark:text-slate-100"
                : "text-slate-700 hover:bg-orange-50 dark:text-slate-300 dark:hover:bg-orange-900/10"
            }`}
          >
            <p>The Forge Codes ({formatRecentDate(item.date)})</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {item.activeCodes.length} active | {item.expiredCodes.length} expired
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Latest snapshot date: {forgeSiteFacts.latestSnapshotDate}
      </p>
    </aside>
  );
}

export default function HomeComponent() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="flex flex-col gap-8">
          <section className="rounded-3xl border border-orange-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 shadow-sm dark:border-orange-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-orange-700 dark:border-orange-800 dark:bg-slate-900/80 dark:text-orange-300">
              <Flame className="h-3.5 w-3.5" />
              theforgecodes.app
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              The Forge Codes Homepage: Daily-Updated Strategy, Trends, and
              Redemption Guidance
            </h1>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              This homepage is designed to rank for <strong>the forge codes</strong>{" "}
              and help users act fast. It combines keyword insights, redemption
              guidance, troubleshooting logic, and direct links to live and
              historical pages so visitors can find <strong>the forge codes</strong>{" "}
              they need without guessing where to start.
            </p>
            <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700 dark:text-slate-300">
              If you only need the latest list, open the live hub first. If you
              want the full strategy behind <strong>the forge codes</strong>,
              keep reading this page. It was intentionally expanded to a
              long-form pillar so it can capture both quick-intent users and
              deep-research users from Google.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/the-forge-codes"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
              >
                Open Live The Forge Codes Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/the-forge-codes-history"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-orange-100 dark:border-orange-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Browse Code History
                <ListChecks className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keywordSignalCards.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/40 dark:bg-slate-950"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.note}
                </p>
              </article>
            ))}
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              <Gift className="h-5 w-5 text-orange-500" />
              Quick Active Preview
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Preview only. For full status, sources, and detailed updates,
              continue to the live <strong>the forge codes</strong> hub.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {latestActivePreview.map((item) => (
                <div
                  key={item.code}
                  className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
                >
                  <p className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {item.code}
                  </p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {item.reward}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/the-forge-codes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200"
              >
                See full active and expired the forge codes tables
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              <CalendarClock className="h-5 w-5 text-orange-500" />
              Operational Snapshot
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Active Codes
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {forgeSiteFacts.activeCount}
                </p>
              </article>
              <article className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Expired Tracked
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {forgeSiteFacts.expiredCount}
                </p>
              </article>
              <article className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Latest Snapshot
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {forgeSiteFacts.latestSnapshotDate}
                </p>
              </article>
              <article className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Avg Search
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {forgeSiteFacts.monthlySearchEstimate}
                </p>
              </article>
            </div>
          </section>

          {homepageSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>
              <div className="prose prose-slate mt-5 max-w-none dark:prose-invert">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              <SearchCheck className="h-5 w-5 text-orange-500" />
              Homepage FAQ For The Forge Codes
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              These quick answers summarize the most frequent decisions users
              make before redeeming <strong>the forge codes</strong>.
            </p>
            <div className="mt-5 grid gap-3">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.question}
                  </h3>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-20">
          <RecentCodesList />
        </div>
      </div>
    </div>
  );
}
