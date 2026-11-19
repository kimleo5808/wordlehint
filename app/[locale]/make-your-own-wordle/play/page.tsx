import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { challengePath } from "@/lib/custom-wordle";
import ChallengePlayer from "@/components/puzzle-tools/ChallengePlayer";
import "../challenge.css";

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
    page: "CustomWordlePlayer",
    path: challengePath,
    canonicalUrl: challengePath,
    noIndex: true,
    title: "A Wordle Challenge for You",
    description:
      "A friend picked a five-letter secret for you. Open the challenge to play in six guesses.",
  });
}
export default function PlayerPage() {
  return (
    <div className="cw-player">
      <div className="cw-play-wrap">
        <h1>A Wordle challenge for you</h1>
        <ChallengePlayer />
      </div>
    </div>
  );
}
