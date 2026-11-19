import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { getAllPuzzles, getTodayDateString } from "@/lib/wordle-daily";
import bank from "@/data/word-bank/5.json";
import ToolLanding from "@/components/puzzle-tools/ToolLanding";
import WordleAnalyzer from "@/components/puzzle-tools/WordleAnalyzer";
import "./analyzer.css";

const href = "/wordle-analyzer";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    locale,
    page: "WordleAnalyzer",
    path: href,
    canonicalUrl: href,
    title: "Wordle Analyzer | Review Your Guesses Turn by Turn",
    description:
      "Replay a finished Wordle with your answer or an archived puzzle. See the tile colors, remaining candidates and words each guess ruled out, including repeated letters.",
    keywords: ["wordle analyzer", "review my Wordle guesses", "Wordle remaining candidates"],
  });
}

export default function WordleAnalyzerPage() {
  const today = getTodayDateString();
  const archive = getAllPuzzles()
    .filter((p) => p.date < today)
    .map(({ date, answer }) => ({ date, answer: answer.toUpperCase() }));
  return (
    <ToolLanding
      kind="analyzer"
      content="wordle-analyzer"
      href={href}
      title="Wordle Analyzer"
      subtitle="Replay a finished board and see which words each guess ruled out."
      parent={{ name: "Wordle answers", href: "/wordle-answers" }}
      figure={{
        src: "/illustrations/wordle-analyzer-double-e.png",
        alt: "Against SIREN, SHEEP has only its fourth letter E green. Against SWEET both E tiles turn green. Against SEVER the first E turns yellow and the second stays green.",
        caption:
          "The guess stays SHEEP in all three rows. Changing the answer changes how many copies of E can receive credit.",
      }}
    >
      <WordleAnalyzer pool={bank.common} version={bank.lastBuilt.slice(0, 10)} archive={archive} />
    </ToolLanding>
  );
}
