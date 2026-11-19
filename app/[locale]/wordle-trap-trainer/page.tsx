import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { trainerPath } from "@/lib/wordle-traps";
import ToolLanding from "@/components/puzzle-tools/ToolLanding";
import TrapTrainer from "@/components/puzzle-tools/TrapTrainer";
import "./trainer.css";

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
    page: "WordleTrapTrainer",
    path: trainerPath,
    canonicalUrl: trainerPath,
    title: "Wordle Trap Trainer | Practice Four-Green Endgames",
    description:
      "Start with four green tiles and three guesses. Play a hidden target in regular or hard mode, then compare how each move divides the remaining answers.",
    keywords: ["wordle trap trainer", "Wordle endgame practice", "hard mode Wordle traps"],
  });
}
export default function TrainerPage() {
  return (
    <ToolLanding
      kind="word"
      breadcrumbLabel="Trap trainer"
      title="Wordle Trap Trainer"
      content="wordle-trap-trainer"
      href={trainerPath}
      subtitle="Four green tiles. Three guesses left. Can you find the missing letter?"
      parent={{ name: "Wordle Analyzer", href: "/wordle-analyzer" }}
      figure={{
        src: "/illustrations/wordle-trap-split.png",
        alt: "For nine words ending in IGHT, LIGHT divides the pool into groups of eight and one. FERNS gives one group of four and five groups of one.",
        caption:
          "One block represents one reference answer. Each outlined group shares a complete five-tile feedback pattern for the guess at left.",
      }}
    >
      <TrapTrainer />
    </ToolLanding>
  );
}
