import type { LengthHubContent } from "./n-letter-types";

/**
 * Hub copy for /7-letter-words.
 *
 * Angle: the Scrabble bingo playbook (emptying a seven-tile rack for the
 * 50-point bonus — probability, stem theory, rack management) plus the
 * 15×15 crossword grid's structural dependence on seven-letter entries.
 * Deliberately zero overlap with the 4-letter hub (short-word tactics,
 * teaching) and the 6-letter hub (suffix structure).
 *
 * All word facts verified against data/word-bank/7.json (ENABLE list,
 * 23,109 words / 1,232 common tier) with standard Scrabble tile values.
 */
export const content: LengthHubContent = {
  length: 7,
  title: "7 Letter Words: Full List, Scrabble Bingos & Top Scores",
  description:
    "Browse 23,109 seven-letter words, from Scrabble bingo stems like RETINAS to 43-point ZYZZYVA. Lists, rack-management tips, and crossword-ready picks.",
  heroBadge: "23,109 words · 1,232 in everyday use",
  heroIntro:
    "Seven letters is the length of a full Scrabble rack — which makes 7 letter words the single most valuable word length in the game. Empty your rack in one move and you score a bingo: the word's face value, every board multiplier, and a flat 50-point bonus on top. This hub collects all 23,109 seven-letter words in our bank, flags the 1,232 you would actually say out loud, and organizes the whole set into browsable per-letter lists.",
  sections: [
    {
      heading: "Why one word can swing an entire Scrabble game",
      body: [
        "Most Scrabble turns are worth somewhere between 12 and 25 points. A bingo — the play where you use all seven tiles on your rack at once — starts at 50 bonus points before the word itself scores anything. Lay down a modest seven-letter word like RETAINS across a double-word square and you are looking at 64 points in a single turn, more than many players score in three. That is why tournament players do not treat 7 letter words as trivia; they treat them as the engine of the game. Strong club players average two to three bingos per game, and at that level a bingo-less game is usually a lost game.",
        "The bonus exists because emptying a rack is genuinely hard. You are not just finding a valid word — you are finding a valid word that uses exactly the seven tiles you happen to hold, and a spot on the board where it fits. That double constraint is what separates casual play from competitive play, and it is also what makes this length such a satisfying study project: unlike most word-game skills, bingo-hunting improves in direct, measurable jumps as you memorize specific high-probability combinations.",
        "The good news is that the search space is smaller than it looks. You do not need to know all 23,109 seven-letter words to bingo regularly. Because Scrabble's tile bag is dominated by one-point letters — E, A, I, O, N, R, T, L, S, and U make up the bulk of the hundred tiles — the racks you actually draw cluster around a small set of letter combinations. Learn the words hiding inside those combinations and you will start seeing bingos that used to be invisible.",
      ],
    },
    {
      heading: "The bingo stems: SATINE, RETINA, and the racks worth keeping",
      body: [
        "Competitive players organize seven-letter study around six-letter \"stems\" — combinations of common tiles that pair with a huge range of seventh letters to form a bingo. Instead of memorizing words one at a time, you memorize a stem plus the list of letters it accepts. It is the closest thing word games have to an opening repertoire in chess.",
      ],
      subs: [
        {
          heading: "The AEINRST rack: nine anagrams from seven tiles",
          body: [
            "The most famous stem of all is SATINE — the letters S, A, T, I, N, E. SATINE is not itself a playable word; it is a tile combination, and it is celebrated because it is built entirely from the most frequent one-point tiles in the bag and combines with more seventh letters than any other six-letter stem. Draw SATINE plus an R and you hold the legendary AEINRST rack, which our word bank confirms yields nine valid anagrams: ANESTRI, ANTSIER, NASTIER, RATINES, RETAINS, RETINAS, RETSINA, STAINER, and STEARIN. Nine different words from one rack means nine different ways to fit a bingo around whatever the board gives you.",
            "The second classic stem is RETINA (A, E, I, N, R, T). Add an S and you are back to the nine-word rack above; add other common tiles and new families open up. RETINA plus a G produces GRANITE, INGRATE, TANGIER, and TEARING; plus a K gives KERATIN; plus an M gives MINARET and RAIMENT. Other racks are nearly as generous — AEGINRS (think SEARING) anagrams eight ways in our list, including ERASING, GAINERS, and REGAINS, while ADEIRST covers ASTRIDE, DISRATE, STAIDER, TARDIES, and TIRADES. A player who has internalized just the SATINE and RETINA families walks into most games carrying dozens of ready-made 7 letter words.",
          ],
        },
        {
          heading: "Rack management: playing for the rack you want",
          body: [
            "Stem knowledge changes how you play the turns before the bingo, not just the bingo itself. The core habit is called rack balance: when you cannot bingo this turn, prefer plays that keep your leftover tiles close to a known stem. Holding AEINST after a short play is a strong position, because a huge share of your possible next draws completes a seven-letter word. Holding UUVWG is a dead rack no draw can rescue — which is why experienced players will happily take a low-scoring turn, or even exchange tiles outright, to dump clunky letters and steer back toward SATINE territory.",
            "A few practical rules follow directly from the math. Keep your rack near a fifty-fifty mix of vowels and consonants. Treat the S and the blank as bingo fuel — an S both completes the richest stems and hooks onto existing board words, so spending one on a 20-point play is usually a mistake. And do not hoard the heavy scorers: a Q sitting on your rack for five turns blocks five chances at a 50-point bonus. Seven-letter thinking, in other words, is less about vocabulary size and more about repeatedly buying tickets in a lottery you have rigged in your favor.",
          ],
        },
      ],
    },
    {
      heading: "The highest-scoring 7 letter words in Scrabble",
      body: [
        "Stems win games, but heavy tiles win highlights. When a J, Q, X, or Z lands in a seven-letter word, face values get spectacular before any board multiplier is even counted.",
      ],
      subs: [
        {
          heading: "The heavy hitters, scored tile by tile",
          body: [
            "The face-value king of our entire seven-letter list is ZYZZYVA — a genuine word for a South American weevil — worth 43 points from its tiles alone (three Z's at 10 apiece, two Y's at 4, a V at 4, and an A). Behind it come JAZZILY and QUIZZED at 35, JAZZMAN and JAZZMEN at 34, WHIZZED at 32, and MUZJIKS — Russian peasants, and a famous tournament opening play — at 29. Everyday-looking words hold their own too: JUKEBOX scores 27, SQUEEZE and QUICKLY each score 25, and the card-game term BEZIQUE reaches 27. Note that ZYZZYVA and JAZZILY each need a blank standing in for a Z, since the bag contains only one.",
            "Face value is only the floor. Every one of these played as a bingo adds the 50-point bonus, and multipliers stack on top: QUIZZED as a bingo with the Q or a Z on a double-letter square and the word crossing a triple-word square clears 150 points in one turn. Plays like that are rare, but knowing which seven-letter words carry the freight is what lets you recognize the chance when the board offers it.",
          ],
        },
      ],
    },
    {
      heading: "Seven letters and the 15×15 grid: the crossword connection",
      body: [
        "Scrabble is not the only game built around this length. The standard American crossword is a 15×15 grid, and its geometry quietly depends on seven-letter entries. With a 15-square row split by black squares, sevens are among the most natural segment lengths a constructor can produce — split a row 7-1-7 and you get two of them at once. Open up a modern themeless puzzle and you will find its long stacks resting on banks of interlocking sevens; they are long enough to be interesting, short enough to cross cleanly.",
            "That structural role shapes which seven-letter words you meet as a solver. Constructors lean on entries with friendly alternating vowels and consonants — SENATOR, TREASON, EPITOME, ORATORS — because every letter must also work in a crossing word. It is the same pressure that makes SATINE-style letters valuable on a Scrabble rack, arriving from a different direction: letters that combine well are letters that interlock well. If you solve crosswords and play tile games, studying seven-letter words is one investment that pays out in both.",
        "For clue-answer hunting, the per-letter lists below double as a solving aid: when you have TREASON's first letter from a crossing and six blank squares, jumping to the T list narrows the field immediately.",
      ],
    },
    {
      heading: "23,109 words — and the 1,232 you actually know",
      body: [
        "Our seven-letter bank holds 23,109 words, drawn from the public-domain ENABLE list — the ancestor of the word lists behind most modern word games and checker tools. That is the full competitive universe: if a seven-letter word is playable in a typical Scrabble-style checker, it is almost certainly in here, from ABALONE to ZYZZYVA.",
        "Raw size, though, is not the useful number. Cross-referencing the bank against English frequency data, we flag 1,232 seven-letter words as the common tier — the ABILITY, ACCOUNT, WRITING layer that shows up in ordinary reading and conversation. That is barely five percent of the list, which tells you something honest about this length: the overwhelming majority of legal sevens are dictionary deep cuts, tournament ammunition rather than everyday vocabulary. On every list page we surface the common tier first, so casual browsers, crossword solvers, and ESL learners hit recognizable words immediately while the full competitive inventory waits underneath.",
        "The fastest way to make any of it stick is to use it under pressure. Our seven-letter Wordle-style practice game deals you unlimited seven-letter puzzles, and it draws on this same word bank — a few rounds a day is the most painless drilling method we know for turning list knowledge into recall speed.",
      ],
    },
    {
      heading: "Browse 7 letter words by starting letter",
      body: [
        "The full collection is organized into 26 per-letter pages, each listing every seven-letter word that starts with that letter, common tier first. S is the giant of the set — no surprise, given plurals and the -S verb forms — with T, C, P, and B close behind, while the Q, X, and Z pages are short, strange, and worth a visit purely for the scenery.",
        "How you browse depends on what you came for. Bingo students should start from the stem families above and then wander the R, S, and T pages, where SATINE-adjacent words live thickest. Crossword solvers will get the most mileage from jumping straight to a known first letter. And if you are here from a word-length puzzle with nothing but a starting letter and stubborn blanks, pick the letter below and scan — at this length, the answer is nearly always hiding in the common tier at the top of the page.",
      ],
    },
  ],
  faq: [
    {
      question: "How many 7 letter words are there?",
      answer:
        "Our word bank contains 23,109 seven-letter words, based on the public-domain ENABLE list used by most word-game checkers. Of those, 1,232 qualify for our common tier — the words that appear regularly in everyday English rather than only in tournament dictionaries.",
    },
    {
      question: "What is a bingo in Scrabble?",
      answer:
        "A bingo is a play that uses all seven tiles on your rack in a single turn. It earns a 50-point bonus on top of the word's normal score and any board multipliers. Since a full rack holds seven tiles, seven-letter words are the classic bingo — which is why serious players study this length above all others.",
    },
    {
      question: "What is the SATINE stem and why do players memorize it?",
      answer:
        "SATINE is the tile combination S-A-T-I-N-E — not a word itself, but the most productive six-letter stem in Scrabble because it is built from the game's most frequent one-point tiles. Add an R and the resulting rack anagrams into nine valid words, including RETINAS, NASTIER, and RETAINS. Memorizing stems plus their seventh letters is far more efficient than memorizing words one by one.",
    },
    {
      question: "What is the highest-scoring 7 letter word in Scrabble?",
      answer:
        "By tile face value, ZYZZYVA (a tropical weevil) tops our list at 43 points, followed by JAZZILY and QUIZZED at 35 — though ZYZZYVA and JAZZILY each require a blank, since the bag holds only one Z. Among words needing no blank, QUIZZED and WHIZZED (32) lead. Played as a bingo, any of these adds a further 50-point bonus before multipliers.",
    },
    {
      question: "Why do crosswords use so many seven-letter words?",
      answer:
        "The standard American crossword grid is 15×15, and black-square patterns naturally split its rows into segments where seven is one of the most common lengths — a 7-1-7 split fills an entire row. Constructors favor sevens with alternating vowels and consonants, like SENATOR or EPITOME, because every letter must also work in a crossing entry.",
    },
    {
      question: "Where can I practice guessing 7 letter words?",
      answer:
        "Try our free seven-letter unlimited game, a Wordle-style mode with no daily limit that draws from this same word bank. It is the quickest way to turn passive list-reading into active recall — a few puzzles a day will noticeably sharpen both your Scrabble rack vision and your crossword solving.",
    },
  ],
  definition:
    "A 7 letter word contains exactly seven letters — the size of a full Scrabble rack. Playing all seven tiles at once is a \"bingo,\" worth a 50-point bonus. There are 23,109 seven-letter words in standard word-game dictionaries, of which about 1,232 are in everyday use.",
};
