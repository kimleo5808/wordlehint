export type GuideSection = {
  id: string;
  icon: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
    items?: string[];
  }[];
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  icon: string;
  readTime: string;
  level: string;
  levelLabel: string;
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "beginner-guide",
    title: "Wordle Beginner's Guide",
    metaTitle:
      "Wordle Beginner's Guide - Learn to Play Wordle Step by Step",
    description:
      "Complete beginner's guide to Wordle. Learn the rules, understand color feedback, and start solving puzzles with essential tips and strategies.",
    keywords: [
      "wordle beginner guide",
      "how to play wordle",
      "wordle rules",
      "wordle for beginners",
      "wordle tutorial",
    ],
    icon: "🔰",
    readTime: "8 min read",
    level: "beginner",
    levelLabel: "Beginner Friendly",
    sections: [
      {
        id: "what-is-wordle",
        icon: "🎮",
        title: "What Is Wordle?",
        content:
          "Wordle is a word guessing game where you have 6 attempts to guess a hidden word. After each guess, the game gives you color-coded feedback to help you narrow down the answer.",
        subsections: [
          {
            title: "Key Features",
            content:
              "Wordle has become one of the world's most popular word games thanks to these features:",
            items: [
              "Simple Rules — Guess the word in 6 tries using color-coded feedback",
              "Color Feedback — Green (correct letter, correct position), Yellow (correct letter, wrong position), Gray (letter not in word)",
              "Multiple Word Lengths — Play with 4 to 11 letter words for different difficulty levels",
              "Unlimited Games — Play as many games as you want, anytime, for free",
            ],
          },
        ],
      },
      {
        id: "basic-rules",
        icon: "📏",
        title: "Basic Rules",
        content: "Here are the fundamental rules of Wordle:",
        subsections: [
          {
            title: "1. Guess a Valid Word",
            content:
              "Type a valid English word of the correct length and press Enter. Invalid words (misspellings, abbreviations, proper nouns) are not accepted.",
          },
          {
            title: "2. Read the Color Feedback",
            content:
              "After each guess, every letter tile changes color. Green means the letter is correct and in the right position. Yellow means the letter is in the word but in a different position. Gray means the letter is not in the word at all.",
          },
          {
            title: "3. Refine Your Guesses",
            content:
              "Use the feedback to eliminate impossible letters and reposition confirmed ones. Each guess should narrow down the possibilities based on what you've learned.",
          },
          {
            title: "4. Solve in 6 Tries",
            content:
              "You have a maximum of 6 guesses to find the hidden word. Most experienced players solve in 3-4 guesses. If you can't guess the word in 6 tries, the answer is revealed.",
          },
          {
            title: "5. Start a New Game",
            content:
              "After solving (or failing), you can immediately start a new game with a fresh word. There's no daily limit — play as many games as you want.",
          },
        ],
      },
      {
        id: "understanding-colors",
        icon: "🎨",
        title: "Understanding the Color System",
        content:
          "The color feedback system is the heart of Wordle. Understanding exactly what each color means is essential for improving your game:",
        subsections: [
          {
            title: "Green — Correct Position",
            content:
              "A green tile means this letter is in the word AND in the correct position. Keep this letter in the same spot for all future guesses. For example, if the R in position 3 turns green, every subsequent guess should have R in position 3.",
          },
          {
            title: "Yellow — Wrong Position",
            content:
              "A yellow tile means this letter IS in the word but NOT in this position. You need to move it to a different spot. For example, if E in position 5 turns yellow, E is in the word but not at the end — try it in positions 1-4 in your next guess.",
          },
          {
            title: "Gray — Not in Word",
            content:
              "A gray tile means this letter is not in the word at all. Don't use this letter again in future guesses. The on-screen keyboard also grays out eliminated letters to help you track what's been ruled out.",
          },
          {
            title: "Double Letter Nuance",
            content:
              "If a word has double letters, the color feedback applies per occurrence. For example, guessing SPEED when the answer has only one E: the first E might turn yellow (it's in the word) while the second E turns gray (there's only one E, and it's not in that position).",
          },
        ],
      },
      {
        id: "first-guess",
        icon: "🎯",
        title: "Choosing Your First Guess",
        content: "Your first guess sets the tone for the entire game. Here's how to choose wisely:",
        subsections: [
          {
            title: "Use Common Letters",
            content:
              "Choose a word that contains the most frequently used letters in English: E, A, R, O, T, L, I, S, N. Words like CRANE, SLATE, or TRACE are excellent first guesses because they test 5 high-frequency letters at once.",
          },
          {
            title: "Avoid Repeating Letters",
            content:
              "Your first guess should use 5 different letters (no doubles). Words like SPEED or TEETH waste a slot by testing a letter twice. You want maximum information from your first guess.",
          },
          {
            title: "Test Multiple Vowels",
            content:
              "Every English word has at least one vowel. Words like ADIEU or AUDIO test 4 vowels in one guess, immediately telling you which vowels are in play. This 'vowel-first' strategy is popular among beginners.",
          },
          {
            title: "Be Consistent",
            content:
              "Most experts recommend using the same starting word every time. This builds familiarity with the common follow-up patterns and helps you develop a systematic approach. CRANE is widely considered the single best starting word.",
          },
        ],
      },
      {
        id: "beginner-strategies",
        icon: "💡",
        title: "Essential Beginner Strategies",
        content:
          "These core strategies will help you go from random guessing to strategic solving:",
        subsections: [
          {
            title: "Track Eliminated Letters",
            content:
              "Pay attention to gray letters and don't reuse them. The on-screen keyboard shows which letters have been eliminated. Using a gray letter wastes one of your precious letter slots.",
          },
          {
            title: "Reposition Yellow Letters",
            content:
              "When a letter turns yellow, try it in a completely different position in your next guess. If A was yellow in position 1, try it in position 2, 3, 4, or 5 next time.",
          },
          {
            title: "Use the Process of Elimination",
            content:
              "After 2-3 guesses, you'll know several letters that are and aren't in the word. Mentally list the remaining possibilities and choose a guess that distinguishes between them.",
          },
          {
            title: "Don't Panic on Guess 5",
            content:
              "If you reach guess 5 without solving, take a moment to review all your feedback carefully. List every letter you know is in the word, every position that's confirmed, and think systematically. Rushing leads to mistakes.",
          },
          {
            title: "Practice Regularly",
            content:
              "The more you play, the better your pattern recognition becomes. Play multiple games daily across different word lengths to build vocabulary and improve your solving speed.",
          },
        ],
      },
      {
        id: "common-beginner-mistakes",
        icon: "❌",
        title: "Common Beginner Mistakes to Avoid",
        content: "Watch out for these typical beginner errors:",
        subsections: [
          {
            title: "Reusing Gray Letters",
            content:
              "The most common mistake. Once a letter turns gray, it's not in the word. Using it again wastes one of your 5 letter slots and gives you zero new information.",
          },
          {
            title: "Ignoring Yellow Positions",
            content:
              "A yellow letter must be moved to a different position. Putting it back in the same spot is a wasted guess — it'll just turn yellow again. Always move yellow letters to new positions.",
          },
          {
            title: "Using Obscure Words",
            content:
              "Wordle answers are common English words. Don't guess exotic or technical terms. If you wouldn't use the word in everyday conversation, it's probably not the answer.",
          },
          {
            title: "Not Using All Information",
            content:
              "By guess 3-4, you often have enough information to solve. Review ALL your previous feedback — green positions, yellow letters, gray eliminations — before making your next guess. Don't just focus on the most recent result.",
          },
        ],
      },
    ],
  },
  {
    slug: "strategy-tips",
    title: "Wordle Strategy Tips & Best Starting Words",
    metaTitle: "Wordle Strategy Tips - Best Starting Words & Expert Techniques",
    description:
      "Master Wordle with proven strategies and expert tips. Learn the best starting words, two-word openers, letter frequency analysis, and advanced solving techniques.",
    keywords: [
      "wordle strategy",
      "best wordle starting word",
      "wordle tips",
      "wordle solving techniques",
      "wordle best first word",
    ],
    icon: "🎯",
    readTime: "10 min read",
    level: "intermediate",
    levelLabel: "Expert Level",
    sections: [
      {
        id: "best-starting-words",
        icon: "🔍",
        title: "The Best Starting Words",
        content:
          "Your opening word is the most analyzed aspect of Wordle strategy. Data analysis of all possible answers reveals these top performers:",
        subsections: [
          {
            title: "Top 5 Starting Words (Ranked)",
            content:
              "Based on letter frequency analysis across the entire Wordle word pool:",
            items: [
              "CRANE — Tests C, R, A, N, E (the #1 recommended starting word by most analysts)",
              "SLATE — Tests S, L, A, T, E (covers 5 of the 8 most common letters)",
              "TRACE — Tests T, R, A, C, E (strong overlap with the most frequent letters)",
              "RAISE — Tests R, A, I, S, E (includes 3 vowels for maximum vowel coverage)",
              "ARISE — Same letters as RAISE in different positions (tests different positional frequencies)",
            ],
          },
          {
            title: "Vowel-Heavy Openers",
            content:
              "If you prefer to identify vowels first, these words test 3-4 vowels in one guess:",
            items: [
              "ADIEU — Tests A, D, I, E, U (4 vowels in one guess)",
              "AUDIO — Tests A, U, D, I, O (4 vowels plus the common consonant D)",
              "OUIJA — Tests O, U, I, J, A (4 vowels but J is very rare)",
            ],
          },
          {
            title: "Why CRANE Is #1",
            content:
              "CRANE tests the five most impactful letters based on positional frequency in the Wordle answer list. C is common in position 1, R in positions 2-3, A in positions 2-3, N in positions 3-4, and E in position 5. No other single word covers as much ground.",
          },
        ],
      },
      {
        id: "two-word-openers",
        icon: "✌️",
        title: "Two-Word Opening Strategy",
        content:
          "Using a fixed pair of opening words tests 10 unique letters in just 2 guesses — nearly half the alphabet's high-frequency letters:",
        subsections: [
          {
            title: "Best Two-Word Pairs",
            content:
              "These pairs are optimized for zero letter overlap and maximum frequency coverage:",
            items: [
              "CRANE + DOUBT — Tests C, R, A, N, E, D, O, U, B, T (10 unique letters including 4 vowels)",
              "SLATE + CRUMB — Tests S, L, A, T, E, C, R, U, M, B (10 unique letters, strong consonant coverage)",
              "TRACE + BLIND — Tests T, R, A, C, E, B, L, I, N, D (10 unique letters with 3 vowels)",
              "RAISE + CLOTH — Tests R, A, I, S, E, C, L, O, T, H (10 unique letters with 4 vowels)",
            ],
          },
          {
            title: "When to Use Two-Word Openers",
            content:
              "Two-word openers sacrifice immediate solving potential (you won't solve in 1-2 guesses) for information gathering. By guess 3, you'll typically know 4-6 letters in the word, making the solve straightforward. This strategy optimizes for consistent 3-4 guess solves.",
          },
          {
            title: "When NOT to Use Two-Word Openers",
            content:
              "If your first guess gives you 3+ green or yellow letters, abandon the two-word plan and go for the solve immediately. The two-word strategy is about information — if you already have plenty, switch to solving mode.",
          },
        ],
      },
      {
        id: "letter-frequency",
        icon: "📊",
        title: "Letter Frequency Strategy",
        content:
          "Understanding which letters appear most often in Wordle answers gives you a measurable statistical edge:",
        subsections: [
          {
            title: "Most Common Letters (5-Letter Words)",
            content:
              "Ranked by frequency of appearance in the Wordle answer pool:",
            items: [
              "E — Appears in ~46% of answer words. The single most common letter",
              "A — Appears in ~39% of answers. Most common in positions 2 and 3",
              "R — Appears in ~36% of answers. The top consonant overall",
              "O — Appears in ~29% of answers. Usually in positions 2 or 3",
              "T — Appears in ~29% of answers. Strongest in position 1",
              "L, I, S, N — Each appears in 25-35% of answers. The next tier of high-frequency letters",
              "C, U — Each appears in 18-22% of answers. Common but not dominant",
            ],
          },
          {
            title: "Least Common Letters",
            content:
              "These letters rarely appear in Wordle answers. Avoid testing them early:",
            items: [
              "Q, Z, X, J — Each appears in fewer than 2% of answers",
              "V, K, W — Uncommon (5-8% frequency), test only when other letters are eliminated",
            ],
          },
          {
            title: "Position-Specific Frequency",
            content:
              "Letters have different frequencies by position. S is the most common letter in position 1. E is the most common in position 5. A dominates position 3. Knowing positional frequencies helps you place letters more accurately when you know they're in the word but not where.",
          },
        ],
      },
      {
        id: "mid-game-strategy",
        icon: "🧩",
        title: "Mid-Game Strategy (Guesses 3-4)",
        content:
          "The mid-game is where most puzzles are won or lost. Here's how to play it optimally:",
        subsections: [
          {
            title: "Information vs. Solving",
            content:
              "The key decision on every mid-game guess: should you test new letters (information) or try to guess the answer (solving)? As a rule of thumb, if you have fewer than 3 confirmed letters, prioritize information. If you have 3+, go for the solve.",
          },
          {
            title: "The Distinguishing Guess",
            content:
              "When you have 4 letters confirmed but multiple possible answers (e.g., _IGHT could be FIGHT, LIGHT, MIGHT, NIGHT, RIGHT, SIGHT, TIGHT), play a 'distinguishing' word that tests the differing first letters. A word like FLING tests F, L, I, N, G — potentially ruling out 3-4 options at once.",
          },
          {
            title: "Pattern Recognition",
            content:
              "Common word patterns to watch for:",
            items: [
              "_IGHT words — FIGHT, LIGHT, MIGHT, NIGHT, RIGHT, SIGHT, TIGHT",
              "_OUND words — BOUND, FOUND, HOUND, MOUND, ROUND, SOUND, WOUND",
              "_ATCH words — BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, WATCH",
              "_ASTE words — HASTE, PASTE, TASTE, WASTE",
              "SH___ words — SHAKE, SHAME, SHAPE, SHARE, SHARP, SHAVE, SHINE, SHIRT, SHORE, SHORT",
            ],
          },
        ],
      },
      {
        id: "hard-mode-strategy",
        icon: "🔥",
        title: "Hard Mode Strategy",
        content:
          "In Hard Mode, any revealed hints must be used in subsequent guesses. This changes the strategy significantly:",
        subsections: [
          {
            title: "How Hard Mode Works",
            content:
              "Green letters must stay in their confirmed position in all future guesses. Yellow letters must be included somewhere in your next guess. Gray letters must still be avoided. This prevents 'throwaway' guesses that test random letters.",
          },
          {
            title: "Hard Mode Challenges",
            content:
              "The biggest challenge is the '_IGHT problem' — when you know the pattern is _IGHT and must guess words one at a time (FIGHT, then LIGHT, then MIGHT...) because each guess must include all known letters. In normal mode, you could play a word like FLING to test multiple first letters at once.",
          },
          {
            title: "Hard Mode Tips",
            content:
              "Strategies specific to Hard Mode success:",
            items: [
              "Start with words that avoid common 'trap patterns' like _IGHT, _OUND, _ATCH",
              "Prioritize unique letter positions — words where few other words share the same pattern",
              "Build a mental database of word families so you know when you're entering a trap",
              "Accept that some puzzles will take 5-6 guesses in Hard Mode — it's mathematically harder",
            ],
          },
        ],
      },
      {
        id: "advanced-tips",
        icon: "🚀",
        title: "Advanced Pro Tips",
        content: "Take your game to the next level with these expert techniques:",
        subsections: [
          {
            title: "The Entropy Method",
            content:
              "Each guess should maximize the expected information gain. In practice, this means choosing words that split the remaining possibilities into the most even groups. If 100 words remain, the ideal guess eliminates ~50 of them regardless of the answer.",
          },
          {
            title: "Positional Intuition",
            content:
              "Train yourself to feel when a letter 'belongs' in a certain position. S loves position 1, E loves position 5, A gravitates to position 3. This intuition, built through practice, helps you place yellow letters more accurately.",
          },
          {
            title: "Word Frequency Awareness",
            content:
              "Wordle answers tend to be common, everyday words. If you're choosing between an obscure word and a common one, the common word is more likely to be the answer. Words like HOUSE, TRAIN, PLANT are far more likely than FJORD, QUALM, or THYME.",
          },
          {
            title: "Track Your Statistics",
            content:
              "Monitor your guess distribution over time. If you're consistently using 5-6 guesses, your opening strategy needs work. If you average 3-4, you're in the expert range. Aim for a rolling average below 4.0.",
          },
        ],
      },
    ],
  },
  {
    slug: "common-mistakes",
    title: "Common Wordle Mistakes to Avoid",
    metaTitle: "Common Wordle Mistakes to Avoid - Fix Your Strategy",
    description:
      "Avoid the most common Wordle mistakes with this comprehensive guide. Learn from typical errors in letter management, guessing strategy, and pattern recognition.",
    keywords: [
      "wordle mistakes",
      "wordle errors",
      "wordle tips",
      "wordle common problems",
      "wordle strategy mistakes",
    ],
    icon: "⚠️",
    readTime: "9 min read",
    level: "intermediate",
    levelLabel: "All Levels",
    sections: [
      {
        id: "letter-management-mistakes",
        icon: "🔤",
        title: "Letter Management Mistakes",
        content:
          "These letter-handling errors are the most common reason players fail to solve:",
        subsections: [
          {
            title: "Reusing Gray Letters",
            content:
              "The #1 mistake in Wordle. Once a letter turns gray, it's definitively not in the answer. Reusing it in a future guess wastes one of your 5 letter slots and provides zero new information. Always check the on-screen keyboard for grayed-out letters before guessing.",
          },
          {
            title: "Putting Yellow Letters Back in the Same Position",
            content:
              "A yellow E in position 4 means E is in the word but NOT in position 4. Guessing another word with E in position 4 will just turn yellow again — wasting a guess. Always move yellow letters to a new position.",
          },
          {
            title: "Forgetting About Double Letters",
            content:
              "About 10-15% of Wordle answers contain a repeated letter: HAPPY, TEETH, CHESS, CREEK, BOOKS. If you have 4 confirmed letters but can't find the word, consider that one letter might appear twice.",
          },
          {
            title: "Ignoring the On-Screen Keyboard",
            content:
              "The on-screen keyboard color-codes every letter you've used. Green letters (confirmed), yellow letters (in word), and gray letters (eliminated) are all tracked. Players who ignore this visual aid make far more errors.",
          },
        ],
      },
      {
        id: "guessing-strategy-errors",
        icon: "🧠",
        title: "Guessing Strategy Errors",
        content:
          "These strategic mistakes cost you guesses and lower your solve rate:",
        subsections: [
          {
            title: "Using Random Words",
            content:
              "Guessing words without thinking about letter frequency or feedback is a common trap. Every guess should be deliberate — either testing new high-frequency letters or attempting to solve based on known information. Random guessing is like searching for a needle in a haystack blindfolded.",
          },
          {
            title: "Testing Rare Letters Too Early",
            content:
              "Letters like Q, X, Z, J, and V appear in fewer than 5% of Wordle answers. Testing them in your first 2-3 guesses wastes valuable information-gathering turns. Save rare letters for guess 4-5 when common letters have been eliminated.",
          },
          {
            title: "Confirming Known Letters Instead of Testing New Ones",
            content:
              "If you already know R is in the word (yellow on guess 1), your next guess should test 4 NEW letters plus R — not retest letters from guess 1. Each guess should introduce as many untested letters as possible.",
          },
          {
            title: "Giving Up on a Systematic Approach",
            content:
              "Some players get flustered after 3-4 guesses and start guessing randomly. This is the worst thing you can do. By guess 3-4, you have the MOST information. Slow down, review all feedback, and think logically about what's left.",
          },
        ],
      },
      {
        id: "pattern-recognition-failures",
        icon: "🔍",
        title: "Pattern Recognition Failures",
        content:
          "These mistakes prevent you from seeing patterns that lead to the answer:",
        subsections: [
          {
            title: "Not Recognizing Common Word Endings",
            content:
              "Endings like -IGHT, -OUND, -ATCH, -TION, -ANCE appear in many 5-letter words. When you have 3-4 letters confirmed in the latter positions, check if they form a common ending pattern. Recognizing these patterns dramatically narrows your options.",
          },
          {
            title: "Overlooking Common Letter Combinations",
            content:
              "Combinations like TH, SH, CH, CK, ST, TR, PL, BL appear frequently in English words. When you have scattered confirmed letters, check if they could form one of these common pairs. This helps you mentally reconstruct the word's structure.",
          },
          {
            title: "Tunnel Vision on One Word",
            content:
              "Getting fixated on a specific word you think is the answer and ignoring alternative possibilities. If your guess turns out wrong, don't keep trying variations of the same word — step back and reconsider the letter pattern from scratch.",
          },
        ],
      },
      {
        id: "word-length-mistakes",
        icon: "📏",
        title: "Word Length-Specific Mistakes",
        content:
          "Different word lengths require different strategies. Here are common mistakes for each:",
        subsections: [
          {
            title: "4-Letter Words: Underestimating Double Letters",
            content:
              "4-letter words have a higher percentage of double letters than longer words. BOOK, DEED, BALL, BUZZ, FULL — if you're stuck after 3 guesses with only 3 unique letters found, doubles are the likely answer.",
          },
          {
            title: "5-Letter Words: The '_IGHT Trap'",
            content:
              "When the pattern _IGHT emerges, there are 7+ possible answers (FIGHT, LIGHT, MIGHT, etc.). In normal mode, play a word that tests multiple first letters (like FLING) rather than guessing one at a time.",
          },
          {
            title: "6+ Letter Words: Ignoring Prefixes and Suffixes",
            content:
              "In 6+ letter Wordle, prefixes (UN-, RE-, IN-) and suffixes (-ING, -TION, -MENT) are key structural elements. Failing to recognize these word parts makes longer puzzles feel impossible. Think about word construction, not just individual letters.",
          },
          {
            title: "8+ Letter Words: Not Thinking Compound",
            content:
              "Many 8+ letter words are compounds: OVER+TIME, HOME+WORK, BASE+BALL. If you spot a familiar word in the first 4-5 positions, you're likely solving a compound. Focus on the second half.",
          },
        ],
      },
      {
        id: "prevention-strategies",
        icon: "💪",
        title: "Mistake Prevention Checklist",
        content:
          "Run through this mental checklist before every guess to avoid common errors:",
        subsections: [
          {
            title: "Before Every Guess",
            content: "Ask yourself these questions before pressing Enter:",
            items: [
              "Am I reusing any gray (eliminated) letters? → Remove them",
              "Are all green letters in their confirmed positions? → Double-check",
              "Have I moved all yellow letters to NEW positions? → Verify",
              "Am I testing at least 2-3 new letters? → Maximize information",
              "Is this a real, common English word? → Avoid obscure terms",
            ],
          },
          {
            title: "After 3 Failed Guesses",
            content: "If you haven't solved by guess 3, pause and review:",
            items: [
              "List ALL confirmed letters (green + yellow) on paper or mentally",
              "List ALL eliminated letters (gray) — there should be 10-15 by now",
              "Check: could the answer have a double letter?",
              "Check: does the pattern match a common word ending?",
              "Think: what common English word fits ALL the constraints?",
            ],
          },
          {
            title: "Building Better Habits",
            content:
              "The best way to avoid mistakes is to build systematic habits. Use the same starting word every time. Follow a consistent decision framework. Review your solved puzzles to identify recurring errors. Over time, these habits become automatic.",
          },
        ],
      },
    ],
  },
  {
    slug: "word-patterns",
    title: "Wordle Word Patterns & Letter Frequency Guide",
    metaTitle: "Wordle Word Patterns - Letter Frequency, Common Endings & Doubles",
    description:
      "Complete guide to Wordle word patterns, letter frequency charts, common word endings, double letter words, and vowel/consonant distribution for every word length.",
    keywords: [
      "wordle word patterns",
      "wordle letter frequency",
      "common wordle words",
      "wordle double letters",
      "wordle word endings",
    ],
    icon: "📂",
    readTime: "12 min read",
    level: "intermediate",
    levelLabel: "Comprehensive Reference",
    sections: [
      {
        id: "letter-frequency-overview",
        icon: "📊",
        title: "Letter Frequency in Wordle",
        content:
          "Understanding letter frequency is the foundation of Wordle strategy. Here's how often each letter appears in 5-letter English words:",
        subsections: [
          {
            title: "Tier 1: Most Common (30%+ frequency)",
            content: "These letters appear in roughly one-third or more of all 5-letter words:",
            items: [
              "E — ~46% of words. The undisputed king. Appears most often in position 5",
              "A — ~39% of words. Dominant in positions 2 and 3",
              "R — ~36% of words. The top consonant. Strong in positions 3 and 4",
              "O — ~29% of words. Usually in positions 2 or 3",
              "T — ~29% of words. Most common in position 1",
            ],
          },
          {
            title: "Tier 2: Common (20-29% frequency)",
            content: "High-value letters that should be tested in your first 2 guesses:",
            items: [
              "L — ~28% of words. Versatile across positions",
              "I — ~27% of words. Common vowel, usually in positions 2-3",
              "S — ~27% of words. Strong in position 1 and 5",
              "N — ~25% of words. Frequently in positions 3-5",
              "C — ~22% of words. Most common in position 1",
              "U — ~18% of words. Usually in position 2 or 3",
            ],
          },
          {
            title: "Tier 3: Moderate (10-17% frequency)",
            content: "Worth testing by guess 3-4:",
            items: [
              "D — ~17% of words",
              "P — ~16% of words",
              "M — ~14% of words",
              "H — ~14% of words",
              "G — ~12% of words",
              "B — ~11% of words",
              "Y — ~10% of words (most common in position 5)",
            ],
          },
          {
            title: "Tier 4: Rare (<10% frequency)",
            content: "Only test these after eliminating higher-frequency letters:",
            items: [
              "F, W, K, V — 5-8% each",
              "X, Z, J, Q — under 2% each. Almost never worth testing early",
            ],
          },
        ],
      },
      {
        id: "common-word-endings",
        icon: "🔚",
        title: "Common Word Endings",
        content:
          "Recognizing common word endings is one of the fastest ways to narrow down Wordle answers. When you identify the ending, you only need to solve the beginning:",
        subsections: [
          {
            title: "5-Letter Word Endings",
            content: "The most frequent endings in 5-letter Wordle answers:",
            items: [
              "_IGHT — FIGHT, LIGHT, MIGHT, NIGHT, RIGHT, SIGHT, TIGHT, BIGHT, WIGHT",
              "_OUND — BOUND, FOUND, HOUND, MOUND, POUND, ROUND, SOUND, WOUND",
              "_ATCH — BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, WATCH",
              "_TION — Very common in 5-letter words ending in the -TION sound",
              "_ANCE/_ENCE — DANCE, LANCE, FENCE, HENCE, PENCE, SINCE",
              "_ASTE — HASTE, PASTE, TASTE, WASTE, BASTE",
              "_RADE — GRADE, TRADE, BLADE (same pattern family)",
            ],
          },
          {
            title: "6-Letter Word Endings",
            content: "Common patterns in 6-letter words:",
            items: [
              "_ING — The most dominant 6-letter ending: MAKING, TAKING, LIVING, GIVING",
              "_TION — ACTION, NATION, MOTION, POTION, LOTION, RATION",
              "_MENT — Common but less frequent: CEMENT, MOMENT",
              "_ABLE — ENABLE, STABLE, USABLE",
              "_NESS — FITNESS, SADNESS, MADNESS, ILLNESS",
            ],
          },
          {
            title: "Using Endings Strategically",
            content:
              "When you have 2-3 letters confirmed in the latter positions, immediately check if they could form a common ending. If _I_HT appears, you're almost certainly looking at _IGHT. This insight converts a 5-letter puzzle into a 1-letter puzzle.",
          },
        ],
      },
      {
        id: "double-letters",
        icon: "🔁",
        title: "Double Letter Patterns",
        content:
          "About 10-15% of Wordle answers contain a repeated letter. Knowing when to suspect doubles is a crucial skill:",
        subsections: [
          {
            title: "Most Common Double Letters",
            content: "These letters are most likely to appear twice in a word:",
            items: [
              "LL — BELLY, BULLY, DWELL, FILLY, FULLY, HELLO, JELLY, JOLLY",
              "SS — BLISS, CLASS, CROSS, DRESS, FLOSS, GLASS, GRASS, GROSS, PRESS",
              "EE — AGREE, BLEED, BREED, CREEK, GREED, QUEEN, SHEER, SPEED, STEEL, SWEEP",
              "OO — BLOOM, BROOD, DROOL, FLOOD, FLOOR, GOOSE, PROOF, SPOON, STOOL, TROOP",
              "TT — ATTIC, LATTE, KITTY, OTTER, PUTTY, WITTY, MOTTO",
              "PP — APPLY, HAPPY, HIPPO, PUPPY, UPPER",
            ],
          },
          {
            title: "When to Suspect Doubles",
            content: "Consider double letters when:",
            items: [
              "You've found 4 unique letters but can't form a word — the 5th might be a repeat",
              "You have a green letter that commonly doubles (L, S, E, O, T)",
              "The word pattern suggests it — _EE_ or _OO_ patterns are strong signals",
              "You're on guess 4-5 and common words don't fit — doubles are often the missed solution",
            ],
          },
        ],
      },
      {
        id: "vowel-patterns",
        icon: "🅰️",
        title: "Vowel Distribution Patterns",
        content:
          "Every English word has at least one vowel. Understanding vowel patterns helps you solve faster:",
        subsections: [
          {
            title: "Vowel Count Distribution",
            content: "In 5-letter Wordle answers:",
            items: [
              "1 vowel — ~10% of words (LYMPH, GLYPH, CRYPT, TRYST)",
              "2 vowels — ~60% of words (most common: CRANE, HOUSE, PLANT)",
              "3 vowels — ~25% of words (AUDIO, NAIVE, OCEAN, ANIME)",
              "4+ vowels — ~5% of words (QUEUE, ADIEU — very rare)",
            ],
          },
          {
            title: "Vowel Position Patterns",
            content: "Where vowels typically appear in 5-letter words:",
            items: [
              "Position 2 — The most common vowel position (think: C_ANE, H_USE, BL_ND)",
              "Position 3 — Second most common (think: CR_NE, FL_ME, ST_NE)",
              "Position 5 — Often E (the most common final letter in English)",
              "Position 1 — Uncommon for vowels except A and O",
              "Position 4 — Least common vowel position",
            ],
          },
        ],
      },
      {
        id: "word-length-patterns",
        icon: "📏",
        title: "Patterns by Word Length",
        content:
          "Each word length has its own unique patterns and strategies:",
        subsections: [
          {
            title: "4-Letter Patterns",
            content: "4-letter words are compact with limited structural variety:",
            items: [
              "CVC+C or C+CVC structure dominates (PLAN, BEST, TURN, SLIM)",
              "Double letters are very common: BOOK, BALL, FEET, BUZZ, FULL",
              "-ATE ending is the most frequent: FATE, GATE, HATE, LATE, MATE",
              "Fewer prefix/suffix patterns than longer words",
            ],
          },
          {
            title: "5-Letter Patterns",
            content: "The classic format with the richest strategic depth:",
            items: [
              "CCVCC and CVCVC are the most common structures",
              "_IGHT, _OUND, _ATCH are the dominant word families",
              "Position 1 consonant + position 2-3 vowel is the typical start",
              "E in position 5 is the single most common letter-position combination",
            ],
          },
          {
            title: "6+ Letter Patterns",
            content: "Longer words are dominated by morphological structures:",
            items: [
              "6 letters: -ING and -TION endings dominate. Prefixes (UN-, RE-) become common",
              "7 letters: -ING accounts for 2,000+ words. Root + suffix thinking is essential",
              "8 letters: Compound words (OVER+COME, BASE+BALL) are a major category",
              "9-11 letters: Multi-morpheme structures (prefix + root + suffix) dominate entirely",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "advanced-techniques",
    title: "Advanced Wordle Techniques",
    metaTitle:
      "Advanced Wordle Techniques - Expert Strategies for Consistent 3-Guess Solves",
    description:
      "Master advanced Wordle techniques with expert-level strategies, information theory approaches, and pro tips for consistently solving in 3-4 guesses across all word lengths.",
    keywords: [
      "advanced wordle techniques",
      "expert wordle strategies",
      "wordle 3 guess solve",
      "wordle information theory",
      "wordle pro tips",
    ],
    icon: "🎓",
    readTime: "11 min read",
    level: "advanced",
    levelLabel: "Expert / Master",
    sections: [
      {
        id: "information-theory",
        icon: "🔬",
        title: "Information Theory Approach",
        content:
          "Expert Wordle players think about each guess in terms of information gain — how much uncertainty does this guess eliminate?",
        subsections: [
          {
            title: "Entropy and Wordle",
            content:
              "Every guess splits the remaining possible answers into groups based on the color feedback it produces. The ideal guess creates the most even split — dividing possibilities roughly in half. If 200 words remain, a perfect guess would produce feedback that narrows it to ~100 regardless of the actual answer.",
          },
          {
            title: "Expected Information Gain",
            content:
              "For each possible guess, calculate: how many distinct color patterns could result? The more distinct patterns, the more information the guess provides. CRANE produces ~150 distinct patterns across all possible answers, which is why it's the top-rated opening word.",
          },
          {
            title: "Practical Application",
            content:
              "You don't need to calculate entropy mentally. Instead, ask: 'Does this guess distinguish between the words I'm considering?' If you're choosing between MIGHT and LIGHT, a guess containing M but not L (or vice versa) will resolve the ambiguity. That's information theory in practice.",
          },
        ],
      },
      {
        id: "elimination-mastery",
        icon: "⚡",
        title: "Systematic Elimination",
        content:
          "Advanced players track remaining possibilities with precision, narrowing the answer space systematically:",
        subsections: [
          {
            title: "The Remaining Word Count",
            content:
              "After each guess, estimate how many valid words remain. If your first guess produced 2 greens and 1 yellow, you've typically narrowed to 10-30 words. Two good guesses should narrow to 1-5 words. Track this mentally to calibrate your confidence.",
          },
          {
            title: "Constraint Tracking",
            content:
              "Maintain a mental model of constraints:",
            items: [
              "Green constraints: Letter X MUST be in position Y",
              "Yellow constraints: Letter X IS in the word but NOT in positions Y, Z",
              "Gray constraints: Letter X is NOT in the word",
              "Combined constraints narrow the space dramatically — 3 green letters typically leave fewer than 10 valid words",
            ],
          },
          {
            title: "The Forced Guess",
            content:
              "Sometimes your constraints leave only 1 possible word. When this happens, you know the answer with certainty. Train yourself to recognize when you're 'forced' — it happens more often than you think, especially after 3-4 guesses with good coverage.",
          },
        ],
      },
      {
        id: "word-family-mastery",
        icon: "📚",
        title: "Word Family Mastery",
        content:
          "Expert players build a mental database of word families — groups of words sharing patterns:",
        subsections: [
          {
            title: "High-Risk Families",
            content:
              "These word families have 5+ members sharing the same ending, making them statistically dangerous to enter:",
            items: [
              "_IGHT family (7 words): FIGHT, LIGHT, MIGHT, NIGHT, RIGHT, SIGHT, TIGHT",
              "_OUND family (8 words): BOUND, FOUND, HOUND, MOUND, POUND, ROUND, SOUND, WOUND",
              "_ATCH family (7 words): BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, WATCH",
              "_RILL/_RILL family: DRILL, FRILL, GRILL, TRILL",
              "SH_RE family: SHARE, SHIRE, SHORE, SHURE",
            ],
          },
          {
            title: "Distinguishing Guesses for Families",
            content:
              "Pre-planned distinguishing words for common families:",
            items: [
              "For _IGHT: Play FLUNG — tests F (FIGHT), L (LIGHT), N (NIGHT) in one guess",
              "For _OUND: Play FARMS — tests F (FOUND), M (MOUND), S (SOUND)",
              "For _ATCH: Play CHAMP — tests C (CATCH), H (HATCH), M (MATCH), P (PATCH)",
            ],
          },
          {
            title: "Building Your Family Database",
            content:
              "Every time you encounter a word family (multiple possible answers sharing a pattern), note the family and a good distinguishing word. Over time, you'll build an instinctive database that lets you handle these situations instantly.",
          },
        ],
      },
      {
        id: "longer-word-techniques",
        icon: "🔤",
        title: "Techniques for Longer Words (6-11 Letters)",
        content:
          "Longer Wordle formats require fundamentally different techniques than the classic 5-letter game:",
        subsections: [
          {
            title: "Morphological Decomposition",
            content:
              "For 6+ letter words, think in word parts rather than individual letters. Most longer English words are built from a root + one or more affixes. Identifying any one part lets you predict the rest:",
            items: [
              "6 letters: UN+LOCK, RE+FORM, NATION (root+TION)",
              "7 letters: WALK+ING, PAY+MENT, UN+HAPPY",
              "8 letters: OVER+COME, BASE+BALL, PLAN+NING",
              "9 letters: BUTTER+FLY, EVERY+BODY, EDUCA+TION",
              "10-11 letters: BACK+GROUND, IN+DEPEND+ENT, DE+VELOP+MENT",
            ],
          },
          {
            title: "Suffix-First Strategy",
            content:
              "For 7+ letter words, confirming the suffix is the single highest-value deduction. If you can verify -ING, -TION, -MENT, or -ABLE in the last 3-5 positions, you've converted the puzzle from N letters to N-3 or N-4 letters. Use your first 2 guesses to test common suffix letters.",
          },
          {
            title: "Compound Word Detection",
            content:
              "For 8+ letter words, check if the first 4-5 letters form a recognizable word (OVER, HOME, UNDER, BACK, SOME). If they do, you're almost certainly solving a compound. Focus all remaining guesses on the second half.",
          },
          {
            title: "Domain Thinking",
            content:
              "Long words cluster in vocabulary domains. If confirmed letters suggest science (MICRO, GRAPH), think MICROSCOPE, PHOTOGRAPH. If they suggest business (MANAGE, PERFORM), think MANAGEMENT, PERFORMANCE. Matching to a domain activates the right vocabulary faster.",
          },
        ],
      },
      {
        id: "speed-solving",
        icon: "⏱️",
        title: "Speed Solving Techniques",
        content:
          "For experienced players looking to solve puzzles faster and more consistently:",
        subsections: [
          {
            title: "The 5-Second Rule",
            content:
              "After reading your feedback, give yourself 5 seconds of unconstrained thinking before analyzing systematically. Your subconscious pattern recognition is powerful — the answer often pops into your head during this initial flash, especially after guess 3-4.",
          },
          {
            title: "Pre-Planned Decision Trees",
            content:
              "Build decision trees for your opening word. If CRANE produces all gray, your next word should be _____. If it produces green R, your next word should be _____. Having pre-planned responses eliminates thinking time and ensures optimal play.",
          },
          {
            title: "Keyboard Scanning",
            content:
              "After each guess, quickly scan the on-screen keyboard to see which high-frequency letters remain untested. This 2-second scan often reveals the ideal next guess without deep analysis.",
          },
          {
            title: "The Gut Check",
            content:
              "When you think you know the answer, briefly gut-check it against all your constraints before pressing Enter. Does it use only confirmed and untested letters? Are green letters in the right spots? Are yellow letters in new positions? This 3-second verification prevents costly mistakes.",
          },
        ],
      },
      {
        id: "meta-strategies",
        icon: "🧠",
        title: "Meta-Strategies for Improvement",
        content:
          "High-level approaches that improve your overall Wordle ability over time:",
        subsections: [
          {
            title: "Daily Practice Routine",
            content:
              "Play at least 3 games daily — one at your comfort level, one at a harder word length, and one attempting a 3-guess or fewer solve. Consistency beats intensity. Track your average guesses per solve over time and aim for steady improvement.",
          },
          {
            title: "Post-Solve Analysis",
            content:
              "After each game, ask: Could I have solved this in fewer guesses? Which guess was weakest? Was there a better word I could have played? This reflection takes 30 seconds but accelerates improvement more than playing 5 extra games.",
          },
          {
            title: "Cross-Training with Word Lengths",
            content:
              "Playing different word lengths builds different skills. 4-letter Wordle sharpens speed. 5-letter builds core strategy. 7+ builds morphological awareness. Together, they create a well-rounded word game skillset that makes every format easier.",
          },
          {
            title: "Vocabulary Expansion",
            content:
              "Read widely. The biggest constraint on Wordle performance isn't strategy — it's vocabulary. Players who read books, articles, and diverse content naturally know more words and recognize patterns faster. This compounds over time.",
          },
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
