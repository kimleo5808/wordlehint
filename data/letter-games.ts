export type LetterGameData = {
  wordLength: number;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  strategies: { title: string; content: string }[];
  benefits: string[];
};

export const LETTER_GAMES: LetterGameData[] = [
  {
    wordLength: 4,
    slug: "4-letters",
    title: "4 Letter Wordle Hint & Game — Quick Word Puzzle Practice",
    description: "Practice 4-letter Wordle with built-in hints. Fast rounds, unlimited free games, and targeted clues to sharpen your guessing skills for the daily NYT Wordle.",
    keywords: ["4 letter wordle", "4 letter wordle hint", "4 letter word game", "wordle 4 letters", "easy wordle game", "4 letter word hints", "short wordle practice", "quick word puzzle"],
    intro: "4-letter Wordle is the fastest way to sharpen your word-guessing instincts. Each round takes under a minute, making it ideal for quick practice sessions. Nail the fundamentals here — letter elimination, positional clues, and pattern spotting — then apply those skills to the daily NYT Wordle.",
    strategies: [
      { title: "Open with OARS or TILE", content: "Both words test the highest-frequency letters in 4-letter English words. OARS covers O, A, R, S; TILE covers T, I, L, E. Together in two guesses, they test 8 of the top 10 letters." },
      { title: "Pin Down the Vowel First", content: "Most 4-letter words have exactly 1-2 vowels. Once you know which vowel is present, the consonant options narrow fast. Try AIDE to test A, I, and E in one go." },
      { title: "Check for Repeated Letters Early", content: "About 15% of common 4-letter words double a letter — DEED, NOON, SASS. When 3 unique letters are confirmed but the word doesn't click, a repeat is likely the missing piece." },
    ],
    benefits: [
      "Quick rounds build muscle memory for letter elimination techniques",
      "Low-pressure environment to test new opening word strategies",
      "Pattern recognition transfers directly to solving daily Wordle hints faster",
      "Unlimited free games — no login, no download, play instantly",
    ],
  },
  {
    wordLength: 5,
    slug: "5-letters",
    title: "5 Letter Wordle Hint & Game — Classic Format, Unlimited Play",
    description: "Play the classic 5-letter Wordle with progressive hints. The same format as the daily NYT puzzle — practice unlimited rounds to improve your hint-solving skills.",
    keywords: ["5 letter wordle", "5 letter wordle hint", "wordle 5 letters", "classic wordle game", "five letter wordle hint", "wordle practice", "5 letter word hints", "wordle game free"],
    intro: "This is the format that started it all — the same 5-letter, 6-guess structure as the official NYT Wordle. Use our unlimited free games to practice your approach, experiment with new opening words, and prepare for each day's puzzle. When you're ready for a nudge on the real thing, check our daily Wordle hints page.",
    strategies: [
      { title: "Lead with SALET or REAST", content: "Data analysis of the full answer pool shows SALET and REAST eliminate the most possibilities on average. They cover S, A, L, E, T, R — six of the seven most frequent letters in 5-letter English." },
      { title: "Play Two Complementary Openers", content: "SALET followed by CORGI tests 10 unique letters across 2 guesses. By guess 3, you'll have enough data to narrow the answer to 1-3 candidates in most games." },
      { title: "Positional Frequency Matters", content: "S is the most common letter in position 1. E dominates position 5. A and O cluster in positions 2-3. Using positional frequency data gives you an edge beyond just knowing common letters." },
    ],
    benefits: [
      "Identical format to the daily NYT Wordle — practice without limits",
      "Develop opening strategies you can take directly into the daily puzzle",
      "Pair with our daily Wordle hints to master the 5-letter format",
      "Free and unlimited — no account, no ads interrupting gameplay",
    ],
  },
  {
    wordLength: 6,
    slug: "6-letters",
    title: "6 Letter Wordle Hint & Game — Next-Level Word Puzzle",
    description: "Step up to 6-letter Wordle with hint support. Larger word pool, prefix and suffix patterns, and unlimited free practice to build advanced word game skills.",
    keywords: ["6 letter wordle", "6 letter wordle hint", "wordle 6 letters", "6 letter word game", "six letter wordle", "6 letter word hints", "advanced wordle", "6 letter word puzzle"],
    intro: "6-letter Wordle introduces a dramatic increase in difficulty. The answer pool jumps to roughly 23,000 words — ten times larger than the classic 5-letter format. Prefixes like UN- and RE-, suffixes like -ING and -TION, and doubled letters become central to your strategy. This is where vocabulary depth starts to matter.",
    strategies: [
      { title: "Open with SENIOR or TRAVEL", content: "SENIOR covers S, E, N, I, O, R — testing 4 top consonants and 3 vowels. TRAVEL maps T, R, A, V, E, L. Both probe natural 6-letter word shapes and common letter clusters." },
      { title: "Detect Prefixes on Guess 2", content: "If guess 1 places U or R in position 1-2, test for UN- or RE- prefixes. Confirming a prefix on guess 2 turns a 6-letter puzzle into a 3-4 letter root to solve." },
      { title: "Anticipate the Double-Letter Trap", content: "Nearly 30% of 6-letter answers contain a doubled letter — RABBIT, BUTTER, MIDDLE. When 4-5 unique letters are placed but the word remains elusive, double the most likely consonant." },
    ],
    benefits: [
      "Trains prefix and suffix recognition critical for all word puzzles",
      "23,000-word pool ensures every game feels fresh",
      "Builds the vocabulary awareness needed for harder daily word challenges",
      "Free and unlimited — jump in anytime, no setup required",
    ],
  },
  {
    wordLength: 7,
    slug: "7-letters",
    title: "7 Letter Wordle Hint & Game — Advanced Word Challenge",
    description: "Challenge yourself with 7-letter Wordle and built-in hints. Master -ING endings, compound roots, and advanced word structures. Unlimited free games online.",
    keywords: ["7 letter wordle", "7 letter wordle hint", "wordle 7 letters", "7 letter word game", "seven letter wordle", "7 letter word hints", "advanced word puzzle", "hard wordle"],
    intro: "7-letter Wordle is where word structure becomes your primary solving tool. Over 34,000 possible answers feature complex constructions — -ING suffixes alone account for thousands of words. Success requires thinking in chunks: root + suffix, prefix + root, or compound halves. This format builds the decomposition skills that make every word puzzle easier.",
    strategies: [
      { title: "Open with SALTIER or STORING", content: "SALTIER covers S, A, L, T, I, E, R — seven high-frequency letters across natural positions. STORING probes the common S_T___ING skeleton that hundreds of 7-letter words share." },
      { title: "Confirm -ING by Guess 2", content: "Over 2,000 seven-letter words end in -ING. If your first guess reveals I, N, or G in the final positions, use guess 2 to confirm the suffix. Once -ING is locked, you're solving a 4-letter root." },
      { title: "Split Compound Words Mentally", content: "AIRPORT = AIR+PORT, BEDROOM = BED+ROOM, POPCORN = POP+CORN. If positions 1-3 or 1-4 spell a familiar word, the answer is likely a compound. Focus on completing the second half." },
    ],
    benefits: [
      "Develops morphological analysis — breaking words into meaningful parts",
      "34,000+ word pool for endless variety and learning",
      "Suffix mastery transfers to crosswords, Scrabble, and daily word puzzles",
      "Free, unlimited, and instantly playable — no downloads needed",
    ],
  },
  {
    wordLength: 8,
    slug: "8-letters",
    title: "8 Letter Wordle Hint & Game — Expert Word Puzzle",
    description: "Take on 8-letter Wordle with hint assistance. 80,000+ word pool, compound structures, and expert-level vocabulary. Free unlimited games for serious word players.",
    keywords: ["8 letter wordle", "8 letter wordle hint", "wordle 8 letters", "8 letter word game", "eight letter wordle", "8 letter word hints", "expert wordle", "hard word puzzle"],
    intro: "8-letter Wordle enters expert territory with over 80,000 possible answers. Compound words (OVERCOME, HOMEWORK), multi-affix structures (UN+COVER+ED), and academic vocabulary dominate the answer pool. You still get only 6 guesses — meaning every attempt must count. Strategic decomposition isn't optional here; it's essential.",
    strategies: [
      { title: "Open with CENTRALS or THEORIST", content: "CENTRALS tests C, E, N, T, R, A, L, S — eight high-value letters spanning vowels and top consonants. THEORIST probes T, H, E, O, R, I, S, T — useful for detecting -TION/-MENT endings early." },
      { title: "Scan for Compound Structure First", content: "Before analyzing individual letters, ask: could this be two words? OVER+LOOK, HOME+WORK, FIRE+SIDE. Spotting a compound on guess 2 cuts the puzzle in half instantly." },
      { title: "Lock the Ending by Guess 3", content: "At 8 letters, endings like -TION, -MENT, -ABLE, -NESS, and -TING each account for hundreds of words. Confirming the last 3-4 characters by guess 3 converts the puzzle into a manageable 4-5 letter solve." },
    ],
    benefits: [
      "Expert-level challenge with the largest word pool of common lengths",
      "Compound word awareness improves performance across all word games",
      "Builds academic and professional vocabulary through gameplay",
      "Free and unlimited — practice whenever inspiration strikes",
    ],
  },
  {
    wordLength: 9,
    slug: "9-letters",
    title: "9 Letter Wordle Hint & Game — Master-Level Word Puzzle",
    description: "Master 9-letter Wordle with progressive hint support. 3-4 syllable words, compound structures, and advanced vocabulary. Free unlimited games for dedicated players.",
    keywords: ["9 letter wordle", "9 letter wordle hint", "wordle 9 letters", "9 letter word game", "nine letter wordle", "9 letter word hints", "master word puzzle", "long word game"],
    intro: "9-letter Wordle is designed for dedicated word game players. Every answer is a 3-4 syllable word from academic, literary, or professional vocabulary — CHALLENGE, ESSENTIAL, WONDERFUL. Compound words (BUTTERFLY, SOMETHING) and complex affix chains (UN+CERTAIN+LY) require deep structural thinking. Solving consistently at this length is a genuine achievement.",
    strategies: [
      { title: "Open with CENTROIDS or PLAUSIBLE", content: "CENTROIDS covers 9 unique letters including C, E, N, T, R, O, I, D, S. PLAUSIBLE tests P, L, A, U, S, I, B, L, E — heavy on vowels with natural 9-letter word rhythm." },
      { title: "Sound Out Syllable Chunks", content: "9-letter words almost always have 3-4 syllables. Pronounce candidates mentally: CHAL-LENGE, ES-SEN-TIAL, BUT-TER-FLY. Syllable-based thinking activates vocabulary that letter-by-letter analysis misses." },
      { title: "Detect Compound Halves", content: "If positions 1-4 spell a complete word (SOME-, EVER-, RAIN-), the answer is likely a compound. SOMETHING, EVERYBODY, RAINWATER — focus on completing the second half." },
    ],
    benefits: [
      "Master-level challenge that builds genuine vocabulary depth",
      "Syllable-based thinking transfers to reading, writing, and test prep",
      "Compound word skills improve performance in crosswords and word searches",
      "Free and unlimited — challenge yourself on your own schedule",
    ],
  },
  {
    wordLength: 10,
    slug: "10-letters",
    title: "10 Letter Wordle Hint & Game — Ultimate Vocabulary Challenge",
    description: "Push your limits with 10-letter Wordle and hints. Academic vocabulary, Latin/Greek roots, and 4+ syllable words. Free unlimited expert-level word games.",
    keywords: ["10 letter wordle", "10 letter wordle hint", "wordle 10 letters", "10 letter word game", "ten letter wordle", "10 letter word hints", "ultimate wordle", "vocabulary challenge"],
    intro: "10-letter Wordle pushes vocabulary to its academic limits. Answers typically carry 4+ syllables and draw from professional, scientific, and literary English — BASKETBALL, CHECKPOINT, CONFERENCE. Classical roots (TELE-, MICRO-, -GRAPH) and formal suffixes (-TION, -MENT, -ABLE) dominate the answer pool. Latin and Greek knowledge becomes a tangible advantage.",
    strategies: [
      { title: "Open with REPUBLICAN or BIRTHSTONE", content: "REPUBLICAN tests 10 unique high-frequency letters across a natural multi-syllable shape. BIRTHSTONE similarly covers B, I, R, T, H, S, T, O, N, E — probing both common consonant clusters and key vowels." },
      { title: "Recognize Classical Roots", content: "TELE- (far), MICRO- (small), -GRAPH (write), -PHONE (sound), -OLOGY (study) — these roots appear in hundreds of 10-letter words. Spotting one on guess 2 reduces the puzzle to finding the other half." },
      { title: "Match Emerging Letters to a Domain", content: "10-letter words cluster in fields: science (HYPOTHESIS), education (LITERATURE), business (MANAGEMENT). When 3-4 letters point toward a domain, mentally scan that category for candidates." },
    ],
    benefits: [
      "The ultimate vocabulary challenge for word game enthusiasts",
      "Classical root skills transfer to standardized tests and academic reading",
      "Domain-based thinking improves problem-solving beyond word games",
      "Free and unlimited — no barriers to expert-level practice",
    ],
  },
  {
    wordLength: 11,
    slug: "11-letters",
    title: "11 Letter Wordle Hint & Game — Maximum Difficulty Word Puzzle",
    description: "The hardest Wordle format: 11 letters, 6 guesses. Words like INFORMATION and DEVELOPMENT. Built-in hints, three-part decomposition strategy, and free unlimited games.",
    keywords: ["11 letter wordle", "11 letter wordle hint", "wordle 11 letters", "11 letter word game", "eleven letter wordle", "11 letter word hints", "hardest wordle", "extreme word game"],
    intro: "11-letter Wordle is the absolute ceiling of word puzzle difficulty. Every answer — INFORMATION, DEVELOPMENT, INDEPENDENT, COMFORTABLE — is a 4-5 syllable word requiring three-part decomposition: prefix + root + suffix. With 11 letter positions and only 6 guesses, random guessing is mathematically hopeless. You must think structurally to solve.",
    strategies: [
      { title: "Open with COUNTRYSIDE or BIRTHPLACES", content: "COUNTRYSIDE tests 11 unique letters: C, O, U, N, T, R, Y, S, I, D, E. BIRTHPLACES also covers 11 uniques with strong consonant clusters. Both probe natural multi-syllable word shapes." },
      { title: "Decompose into Three Parts", content: "IN+FORMAT+ION, DE+VELOP+MENT, COM+FORT+ABLE — nearly every 11-letter word splits into 3 morphemes. Identify any one part (especially the suffix) and the other two become far easier to solve." },
      { title: "Think in Vocabulary Domains", content: "Science (TEMPERATURE), business (PERFORMANCE), education (EXPLANATION). When 3-4 letters suggest a domain, mentally scan that field. Domain-matching activates the right vocabulary clusters faster than letter-by-letter deduction." },
    ],
    benefits: [
      "The hardest word puzzle format available — a true test of vocabulary mastery",
      "Three-part decomposition skills transfer to every word game and language test",
      "Domain-based thinking builds real-world vocabulary depth",
      "Free and unlimited — take on the ultimate challenge whenever you're ready",
    ],
  },
];

export function getLetterGameBySlug(slug: string): LetterGameData | undefined {
  return LETTER_GAMES.find((g) => g.slug === slug);
}

export const LETTER_GAME_SLUGS = LETTER_GAMES.map((g) => g.slug);
