import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { getBeeWordIndex } from "@/lib/bee-word-history-index";
import { exampleHive, solveBeeHive } from "@/lib/spelling-bee-solver";
import ToolLanding from "@/components/puzzle-tools/ToolLanding";
import BeeSolver from "@/components/puzzle-tools/BeeSolver";
import "./solver.css";

const href = "/spelling-bee-solver";
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
    page: "SpellingBeeSolver",
    path: href,
    canonicalUrl: href,
    title: "Spelling Bee Solver | Seven-Letter Hive and Pangram Hints",
    description:
      "Enter your seven hive letters to see word counts, points and pangrams. Choose a length for two-letter hints or reveal answers from a matching archived puzzle.",
    keywords: [
      "spelling bee solver",
      "spelling bee pangram finder",
      "spelling bee hints by length",
    ],
  });
}
export default function BeeSolverPage() {
  const index = getBeeWordIndex();
  return (
    <ToolLanding
      kind="bee"
      breadcrumbLabel="Hive solver"
      content="spelling-bee-solver"
      title="Spelling Bee Solver"
      subtitle="Enter your hive to count words, check pangrams and uncover one hint at a time."
      href={href}
      parent={{ name: "Spelling Bee archive", href: "/spelling-bee-answers" }}
      figure={{
        src: "/illustrations/bee-solver-score-by-length.png",
        alt: "January 1, 2024 hive. By length from four to eight letters, word counts are 20, 19, 7, 3 and 1. Points are 20, 95, 42, 28 and 8.",
        caption:
          "Word counts and points for the January 1, 2024 hive, with A in the center. The seven-letter subtotal includes one pangram bonus.",
      }}
    >
      <BeeSolver initial={solveBeeHive(index, exampleHive)} through={index.hives[0]?.date} />
    </ToolLanding>
  );
}
