import type { LengthHubContent } from "./n-letter-types";

/**
 * Hub copy for /6-letter-words.
 *
 * Angle: word-shape anatomy (root + suffix "seams") and mid-length Scrabble /
 * Words With Friends scoring. Deliberately does NOT cover bingo strategy
 * (7-letter hub) or short-word tactics / teaching (4-letter hub).
 *
 * All statistics computed from data/word-bank/6.json (ENABLE + frequency
 * common tier): 15,232 total words, 1,270 common. Suffix counts, first-letter
 * distribution, and Scrabble face values verified by script.
 */
export const content: LengthHubContent = {
  length: 6,
  title: "6 Letter Words — Full List of 15,232 Six-Letter Words",
  description:
    "Browse 15,232 six-letter words, from 1,270 everyday picks to deep Scrabble ammo. Sorted by letter, with suffix patterns and point values.",
  heroBadge: "15,232 words · 1,270 common",
  heroIntro:
    "Six letters is where English starts assembling words instead of just coining them. Most 6 letter words are a shorter root wearing a suffix — WALK becomes WALKED, PLAY becomes PLAYER, BAKE becomes BAKING — and once you learn to spot that seam, this list of 15,232 words stops feeling like a wall and starts feeling like a kit of parts.",
  sections: [
    {
      heading: "Six-Letter Words Are Built, Not Memorized",
      body: [
        "Here is the single most useful fact about 6 letter words: roughly half of them are visibly assembled from smaller pieces. In our full bank of 15,232 words, 7,755 — about 51% — end in ED, ER, ING, LY, S, or ES. That is not a trivia point; it is the whole strategy. When you need a six-letter word, you usually should not be racking your brain for an exotic one. You should be taking a four- or five-letter word you already know and asking what it can wear.",
        "Think of every 6 letter word as having a potential seam: the joint where a root meets a suffix. WALKED is WALK + ED. SINGER is SING + ER. MOSTLY is MOST + LY. The seam is invisible when you read normally, but the moment you train yourself to look for it, unscrambling jumbled letters, filling crossword grids, and finding plays on a Scrabble rack all get dramatically easier. See an -ING in your letters? You are really solving a three-letter problem. See -ED plus a consonant cluster? You are probably looking at a regular past tense.",
        "This is also what makes six the most forgiving length for word-game players moving up from short words. Four-letter vocabulary is mostly primitive roots you either know or don't. Six-letter vocabulary is combinatorial: a modest stock of roots plus five or six suffix patterns generates thousands of legitimate words. The sections below break down the biggest suffix families with real counts from this word list, so you know exactly which seams pay off most often.",
      ],
      subs: [
        {
          heading: "The -ED and -ER Families: The Two Biggest Seams",
          body: [
            "The past-tense -ED family is the largest suffix group among six-letter words: 1,506 entries, including everyday staples like WALKED, PLAYED, LOOKED, and TALKED. The recipe is mechanical — take a four-letter verb, add ED — which is why this family is the first place to look when you are unscrambling letters that include both an E and a D. The -ER family is nearly as large at 1,277 words, and it does double duty: agent nouns built from verbs (PLAYER, SINGER, WALKER, HELPER) and comparatives built from adjectives. Between them, these two seams alone account for over 2,700 words on this list.",
            "One caution: not every word ending in ER has a seam. LETTER, MASTER, SILVER, and GARDEN-adjacent words like DANGER are single units — there is no LETT or DANG root doing the work. Treat the suffix as a hypothesis to test, not a guarantee. If removing the ending leaves a real four-letter word, you have found a genuine seam; if it leaves gibberish, the word is a root in its own right and you simply have to know it.",
          ],
        },
        {
          heading: "-ING, -LY, and -IER: Smaller Families, Bigger Leverage",
          body: [
            "The -ING family has 381 members among 6 letter words, and it is disproportionately full of common vocabulary: ASKING, BAKING, CODING, MAKING, TAKING, TRYING, and VOTING are all in our everyday tier. The math is friendly here too — ING consumes three of your six letters, so spotting it turns the puzzle into finding a three-letter root. Notice the silent-E rule at work: BAKE, MAKE, and TAKE drop their E before ING, which is why the roots inside BAKING and MAKING are one letter shorter than you might expect.",
            "The -LY adverbs number 314, with a remarkably useful common core: BARELY, HARDLY, MOSTLY, NEARLY, RARELY, and SIMPLY. If your letters include both an L and a Y, testing the -LY seam first is almost always worth two seconds. Finally, the -IER comparatives are a small family of 103 — EASIER is the standout everyday example — and they illustrate the Y-to-I spelling change (EASY → EASIER) that trips up spellers and delights crossword setters. Small families, but knowing they exist means you never stare blankly at a rack containing I, E, and R.",
          ],
        },
      ],
    },
    {
      heading: "1,270 Common Words in a Sea of 15,232",
      body: [
        "Our word bank contains 15,232 valid six-letter words, but only 1,270 of them — about one in twelve — qualify for the common tier, meaning they appear in a large modern frequency list of everyday English. That ratio tells you something important about how this length behaves: the dictionary is enormous, but the working vocabulary is compact. FROZEN, OXYGEN, LISTEN, GARDEN, and SPREAD are words everyone recognizes; ZIZZLE, MUZJIK, and GANDER's obscure cousins live in the long tail that only dictionary software and tournament players ever touch.",
        "Why does the gap matter? Because different games reward different tiers. If you are filling a crossword or playing a casual word game with friends, the 1,270 common six-letter words are your realistic universe — an answer like TINSEL might appear in a December-themed grid, but a constructor reaching for BEZAZZ would get letters of complaint. If you are playing competitive Scrabble or an anagram game with a strict dictionary, the full 15,232 are all fair game, and the obscure tail is precisely where the surprising plays hide.",
        "On every letter page in this cluster we surface the common-tier words first, so the vocabulary you will actually use is never buried under the vocabulary that merely exists. The obscure words are still listed — validity is validity — but the ordering respects how people actually search: you usually want SILVER before SLIVER's rarer anagram mates, and PLAYER before the agent nouns nobody has spoken aloud since 1911.",
      ],
    },
    {
      heading: "High-Scoring 6 Letter Words for Scrabble and Words With Friends",
      body: [
        "Six letters is the workhorse length of a Scrabble game. Seven-letter plays get the glory, but most turns you are laying down something shorter — and a well-chosen six-letter word through a premium square routinely outscores a mediocre longer play. The scores below are raw Scrabble tile face values, before any double- or triple-square multipliers; Words With Friends values run slightly different (its J and Z tiles are worth more), but the same words top both lists.",
      ],
      subs: [
        {
          heading: "The Heavy Artillery: Z, J, Q, and X Words",
          body: [
            "The maximum face value among six-letter words is 35 points, shared by three spellings of the same jazzy noise: PIZAZZ, PAZAZZ, and BEZAZZ. Close behind sit JAZZED at 32, FRIZZY and HUZZAH at 30, SCUZZY at 29, and the legendary MUZJIK — a Russian peasant, and one of the most famous rack-emptiers in Scrabble lore — at 28. QUARTZ scores 24 with the rare distinction of using both a Q and a Z, ZEPHYR lands 23, JOCKEY 22, and JINXED 21. None of these need a dictionary argument: every one is a legitimate entry in this word list.",
            "The practical takeaway is that six-letter premium words cluster around double letters and consonant pairs that feel wrong until you have seen them: ZZ, JA-, HU-. If your rack holds a Z and any vowel pair, it is worth thirty seconds checking whether a six-letter frame exists before you dump the Z for scraps. These are exactly the situations where browsing a single letter page — say, every six-letter word starting with J or Z — turns a vague hope into a concrete shortlist.",
          ],
        },
        {
          heading: "Everyday Words That Quietly Score",
          body: [
            "You do not need MUZJIK to win. The common tier hides genuinely strong scorers that nobody will challenge: PUZZLE is 26 points of ordinary English, CHEQUE and ENZYME are 20 each, WIZARD, JACKET, and HAZARD are 19, and FREEZE, FROZEN, and HOCKEY all hit 18. Even BRONZE and OXYGEN reach 17 — respectable totals for words a ten-year-old knows. These are the plays that decide real games, because they combine solid face value with zero risk and easy board placement.",
            "There is a deeper pattern here worth internalizing: high-scoring common six-letter words are almost never suffix builds. PUZZLE, WIZARD, and ENZYME are roots through and through. The suffix families from the first section — WALKED, ASKING, PLAYER — are cheap letters assembled cheaply, averaging around 9 or 10 points. So your mental filing system should have two drawers: the seam words for coverage and board control, and the root words with heavy tiles for the scoring turns. Knowing which drawer a rack belongs to is half of mid-game Scrabble judgment.",
          ],
        },
      ],
    },
    {
      heading: "Crosswords, Word Ladders, and Anagram Sets",
      body: [
        "Six is a beloved length among crossword constructors — long enough to be interesting, short enough to cross cleanly — so a working stock of six-letter words pays off directly in grid-solving speed. The suffix-seam habit helps here too: if a down answer's clue is past tense and you have the final D, penciling an E in the fifth square is right far more often than not, and it instantly constrains three crossing words.",
        "Word ladders and anagram puzzles are where this length really shows off its structure. The famous -TTER family is a ready-made ladder: LETTER, BETTER, BATTER, BUTTER, and BITTER differ by a single letter each, and all five are valid entries here. For anagrams, LISTEN, SILENT, ENLIST, and TINSEL are four real words sharing one set of six letters — a set worth memorizing outright, because anagram games love it. GARDEN, DANGER, and GANDER form another classic trio, and SILVER hides SLIVER inside a single swap. When you hit a scrambled six-letter puzzle, run the seams first (-ED, -ER, -ING), then test these known anagram families before brute-forcing.",
        "If you want a place to drill this instinct rather than just read about it, our six-letter unlimited practice game lets you play Wordle-style rounds at this exact length as many times as you like. The extra letter over the standard game changes the feel completely — more positions to pin down, but far more suffix structure to exploit — and the seam-spotting habit from this page translates directly into faster solves.",
      ],
    },
    {
      heading: "Browse 6 Letter Words by Starting Letter",
      body: [
        "The full list is organized into per-letter pages, and the distribution is lopsided in ways worth knowing before you dive in. S is the giant: 1,801 six-letter words begin with S, nearly 12% of the entire bank, thanks to its huge stock of roots plus clusters like SC-, SH-, SP-, and ST-. C follows with 1,294, then B with 1,068 and P with 1,038. At the other end, the rare initials — J, Q, X, Z — offer short, punchy pages where almost every entry is either a scoring opportunity or a curiosity.",
        "Each letter page lists every valid word with the common tier surfaced on top, so you can skim the vocabulary people actually use before scrolling into the deep dictionary. Use the big pages (S, C, B, P) when you are hunting broadly — pattern-matching a crossword entry or exploring what a rack might become — and the small pages when you already know your power tile and want its complete six-letter arsenal on one screen. Either way, the per-letter split keeps a 15,232-word list navigable instead of overwhelming.",
      ],
    },
    {
      heading: "Where This Word List Comes From",
      body: [
        "Every count on this page is computed from our actual word bank, not estimated. The base list is ENABLE — the public-domain Enhanced North American Benchmark Lexicon that underpins many word games' dictionaries — filtered to exactly six letters, which yields the 15,232 total. The common tier is derived by cross-referencing that list against a large frequency ranking of modern English, marking the 1,270 words that real people use in ordinary writing. Suffix-family sizes, first-letter distribution, and Scrabble point values are all calculated directly from this data.",
        "Two honest caveats. First, no single lexicon matches every game: official tournament Scrabble dictionaries (and Words With Friends' own list) each add and drop words at the margins, so a handful of entries here may be scored differently — or rejected — in a specific app. Second, the common tier is a frequency judgment, not a quality one; a word like GANDER can be perfectly familiar to you and still fall outside the top frequency band. Treat the tiers as a navigation aid, and treat ENABLE membership as the baseline definition of \"valid\" throughout this cluster of six-letter word pages.",
      ],
    },
  ],
  faq: [
    {
      question: "How many 6 letter words are there?",
      answer:
        "Our word bank contains 15,232 valid six-letter words, drawn from the public-domain ENABLE lexicon. Of those, 1,270 qualify as common — roughly one in twelve — meaning they appear in a modern frequency list of everyday English. Game-specific dictionaries (tournament Scrabble, Words With Friends) differ slightly at the margins.",
    },
    {
      question: "What is the highest-scoring 6 letter word in Scrabble?",
      answer:
        "By raw tile face value, PIZAZZ, PAZAZZ, and BEZAZZ top the list at 35 points each, followed by JAZZED at 32 and FRIZZY and HUZZAH at 30. Among everyday words, PUZZLE leads at 26 points, with CHEQUE and ENZYME at 20. Board multipliers can push any of these far higher.",
    },
    {
      question: "What are the most common 6 letter words?",
      answer:
        "The common tier includes high-frequency words like PEOPLE-adjacent everyday vocabulary: LISTEN, GARDEN, FROZEN, OXYGEN, SILVER, PLAYER, MAKING, and SIMPLY. In total, 1,270 of the 15,232 six-letter words in our bank rank as common, and every letter page surfaces that tier first so you see usable words before obscure ones.",
    },
    {
      question: "Why do so many 6 letter words end in -ED, -ER, or -ING?",
      answer:
        "Because six letters is exactly the length where four-letter roots meet two-letter suffixes and three-letter roots meet -ING. Our bank has 1,506 words ending in -ED, 1,277 in -ER, and 381 in -ING; counting -LY, -S, and -ES too, about 51% of all six-letter words end in one of these suffixes. Spotting that seam is the fastest way to unscramble or recall a word.",
    },
    {
      question: "Which letter do most 6 letter words start with?",
      answer:
        "S, by a wide margin: 1,801 six-letter words begin with S, nearly 12% of the full list, helped by clusters like SC-, SH-, SP-, and ST-. C is second with 1,294, then B (1,068) and P (1,038). The rarest starting letters — J, Q, X, and Z — have compact pages dense with high-scoring words.",
    },
    {
      question: "Can I practice guessing 6 letter words somewhere?",
      answer:
        "Yes — our 6-letter unlimited game lets you play Wordle-style rounds at this length with no daily limit. The sixth letter adds more positions to solve but also more suffix structure to exploit: endings like -ED, -ER, and -ING appear constantly, so the pattern knowledge from this page converts directly into faster solves.",
    },
  ],
  definition:
    "There are 15,232 valid six-letter words in English by the ENABLE lexicon, of which 1,270 are common everyday words. About 51% end in the suffixes -ED, -ER, -ING, -LY, -S, or -ES, and the highest Scrabble face value is 35 points (PIZAZZ).",
};
