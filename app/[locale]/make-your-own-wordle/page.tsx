import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { makerPath } from "@/lib/custom-wordle";
import ToolLanding from "@/components/puzzle-tools/ToolLanding";
import ChallengeMaker from "@/components/puzzle-tools/ChallengeMaker";
import "./challenge.css";

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
    page: "CustomWordleMaker",
    path: makerPath,
    canonicalUrl: makerPath,
    title: "Make Your Own Wordle | Create a Challenge for a Friend",
    description:
      "Pick a five-letter secret, add an optional clue and test the board. Create a link a friend can open to play your custom Wordle in six guesses.",
    keywords: ["make your own wordle", "custom Wordle maker", "create a Wordle for a friend"],
  });
}
export default function MakerPage() {
  return (
    <ToolLanding
      kind="maker"
      title="Make Your Own Wordle"
      href={makerPath}
      content="make-your-own-wordle"
      subtitle="Pick a secret word and give a friend six guesses to find it."
      parent={{ name: "Wordle Unlimited", href: "/wordle-unlimited" }}
      figure={{
        src: "/illustrations/custom-wordle-apple-replay.png",
        alt: "Three guesses against APPLE. ALLEY scores green, yellow, gray, yellow, gray. AMPLE scores green, gray, green, green, green. APPLE scores five greens.",
        caption:
          "A playable three-turn example. Exact matches claim their letters first, so only one of the two L tiles in ALLEY receives credit.",
      }}
    >
      <ChallengeMaker />
    </ToolLanding>
  );
}
