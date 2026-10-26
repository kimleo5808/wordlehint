# 流量扩张方案（2026-10，Backlinko 方法规划）

> 状态：方案待确认（2026-10-26 修订）。规划方法：backlinko-seo skill —— Skyscraper 2.0（每个新页面必须有一个对手前 10 名都没有的独特内容）+ Cluster Map（集群结构与内链矩阵）+ GEO（数据、问答结构，便于被 AI 搜索引用）。
> 每个页面开工前仍按既定流程单独出需求文档（竞对细查 → backlinko 内容方案 → frontend-design UI 方案 → 参考 pinpointanswer.today 的“答案卡片在前、SEO 内容在后” → 带 todolist 的 MD）。

## 一、结论摘要

**规划约束（用户 2026-10-26 确定）**：不用 LLM 生成内容；不用付费 API（数据只用 NYT 公开接口、dictionaryapi.dev 等免费来源）；只做高质量页面，不批量生成同质化页面；新页面节奏控制在每天几十个以内。

据此，上一版里“回填约 2,200 个 Connections/Strands 历史日期页”“回填约 1,550 个 Wordle 旧日期页”“几百个片段词表页”“月度归档页”全部**取消**。新方案是“少量旗舰页 + 每天自然增长”：

| 优先级 | 新页面 | 页数 | 独特内容（对手没有的） |
|---|---|---|---|
| P0 | 修复线上回归（5 期 Connections 显示 “UNDEFINED”） | 0 | — |
| P0 | Connections / Strands **从上线日起**每天一个日期页 | 每天 +2 | 当天棋盘图（Strands 画出 spangram 路径）+ 每个词的释义（免费词典）|
| P1 | `/connections-stats` 原创数据页 | 1 | 1,232 期全量统计：最常出现的词、四种颜色都出现过的 446 个词、31% 紫色组是填空题……（SERP 里没有任何真实统计） |
| P1 | `/wordle-repeats` 重复答案追踪 + “用过没有”查询 | 1 | 2026 年起 Wordle 开始重复出题，但 SERP 信息互相矛盾，没有权威数据页 |
| P1 | Pips 集群：今日页、归档页、玩法指南 | 3（+ 每天 +1） | 可交互棋盘 + 由解答数据推导的分步提示（对手是截图或文字）；指南里有基于约 435 期数据的统计（SERP 里甚至有把 Pips 写成猜词游戏的错误内容）|
| P1 | `/nyt-games-reset-times` 换题时间工具 | 1 | 按访客本地时间实时显示各游戏的换题时间和倒计时（beebom 用 13 个静态页做同一件事）|
| P2 | `/spelling-bee-solver`、`/letter-boxed-solver` 工具 | 2 | 输入字母即出全部解；Letter Boxed 预载当天题并列出全部两词解 |
| P2 | Connections: Sports Edition | 1–2（+ 每天 +1） | 视 Pips 的表现再决定 |

**3 个月内新增约 10 个旗舰页 + 每天 2–3 个自然增长的日期页，合计约 250–300 页**，而上一版是 5,000+ 页。

## 二、调研对象与方法

10 个对手，分 4 组并行调研（2026-10-26，抽样 sitemap 与页面，每站几十个请求）：

| 类型 | 站点 |
|---|---|
| 多游戏答案站 | tryhardguides.com、beebom.com/puzzle、nerdschalk.com |
| 程序化/按日期归档站 | answers.today、bloxodes.com、pinpointanswer.today、stealthygaming.com |
| 归档列表 / 词工具 | fiveforks.com、word.tips |
| 媒体（需求信号） | Mashable、Tom's Guide（另轻扫 TechRadar、CNET、Forbes） |

局限：没有关键词工具（Ahrefs/Semrush）的搜索量数据。用三个代理指标：媒体是否“每天都写”（媒体只会为有流量的游戏持续写）、对手 sitemap 规模、对手更新频率。GSC 数据到位后应回头校准。

## 三、对手要点

| 站点 | 覆盖 | 页面形态 | 规模 | 发布时间（相对美东午夜） | 可借鉴 / 短板 |
|---|---|---|---|---|---|
| tryhardguides | 40+ 种每日谜题（含 Pips、Mini、Midi、Quordle、LinkedIn 等）+ 海量填字线索 | 每游戏每天一个新 URL；归档页含“明日答案” | ~100 万 URL；单周新增 1.1 万（9.6k 是填字线索页，737 个由当日 Wordle 答案衍生的 5 字母片段页） | Wordle 答案提前 9 小时 | 用“答案 → 片段词表”做长尾；内容薄（300–700 词）、广告重 |
| beebom/puzzle | 14 个游戏（含 Pips、Letter Boxed、Mini、Sports Connections） | 只有 16 个常青“today”页 + 约 120 个常青指南 | 很小但域名强 | 提前 1–2 小时 | 交互强（逐格揭示的 Mini 网格、逐字母揭示）；指南集群；无归档 URL |
| nerdschalk | 20+ 个游戏 | 每天一个新 URL | 约 4 万篇（谜题占近期约 31%） | 提前约 18 小时定时发布，00:11 ET 校对 | Wordle 提示分 5 级 + “用 SLATE/CRANE 后还剩几个词”；Letter Boxed 给出备选两词解；“Also today”跨游戏导航；技术较乱 |
| answers.today | 16 个游戏全历史 | `/{game}/{month}-{d}-{yyyy}` 按日期页 | 4.7 万 URL（Wordle 1,956、Connections 1,233、Strands 967…） | — | 证明“全历史按日期页”是成立的打法；但无 JSON-LD、无 canonical、模板文案、深层页要点上千次“上一篇” |
| bloxodes | 14 个谜题（NYT 7 个 + LinkedIn 5 个…） | 常青 hub + 按日期页（但按日期页都是 noindex） | 谜题版块约 6 周 | NYT 换题后约 10 分钟 | 交互棋盘；LinkedIn 数据直接取自 LinkedIn 登录后私有 API（ToS 风险） |
| pinpointanswer.today | 仅 LinkedIn Pinpoint | 首页=今日 + 每期一个可索引页（452 页）+ 归档长页 + “下一期预告”页 | 455 URL | 重置后 1–13 分钟（全自动） | 标题带“期号 + 5 个线索词”；答案卡片在前；内容疑似 AI 生成 |
| stealthygaming | LinkedIn（已停更 11 个月） | 截图式答案 | — | — | 人工截图流程撑不住，不构成威胁 |
| fiveforks | Wordle 答案列表 | 单页紧凑列表（约 2,000 条只有 290KB）+ 过滤器 + 重复标记 | 小 | 列表只到“昨天” | 紧凑列表 + 重复追踪；无按日期页 |
| word.tips | 词工具 + 每日游戏（每游戏一个常青页） | 包含/开头/结尾片段词表 | sitemap 约 2.15 万，实际可索引更多 | — | 片段词表是流量引擎；unscramble 页被它自己 robots 屏蔽（不值得做） |
| 媒体 ×5 | 见下表 | 多为一天一篇 | — | 全部提前 2–11 小时 | 标题都含 Hint(s) + Answer + 星期几+日期 + #期号；Strands 标题开始带 “Spangram”；Connections 新增“答案释义”第二篇 |

## 四、需求信号：媒体每日覆盖矩阵

| 游戏 | Mashable | Tom's Guide | TechRadar | CNET | Forbes | 每日覆盖数 |
|---|---|---|---|---|---|---|
| Wordle / Connections / Strands | ✅ | ✅ | ✅ | ✅ | ✅ | 5（已有） |
| **Pips** | ✅ | ✅ | – | – | 时有 | **2 + 1** |
| **Connections: Sports Edition** | ✅ | – | – | ✅ | 2025 年后停 | 2 |
| Quordle | – | 2023 年停 | ✅ | – | ✅ | 2 |
| Mini Crossword | 2026-08 停 | – | – | ✅ | 2026-06 后未见 | 1（下降中） |
| Spelling Bee、Letter Boxed、LinkedIn、Tiles、Vertex、Sudoku… | – | – | – | – | – | 0 |

另：Connections: Soccer Edition（2026-06 起）、Strands: Sports Edition（约 2026-10-21 上线）尚无媒体每日覆盖，是早期空位，需求未经验证。

## 五、数据可行性（实测）

| 游戏 | 数据源 | 带答案 | 能否预抓次日 | 历史 |
|---|---|---|---|---|
| Pips | `nytimes.com/svc/pips/v1/{date}.json` | ✅ solution（分 easy/medium/hard） | ✅ | 2025-08-18 起（~435 期） |
| Mini / Midi | `svc/crosswords/v6/puzzle/{mini,midi}/{date}.json` | ✅ answer + clues | — | Mini 2014-08 起（~4,400 期） |
| Sports / Soccer Connections | `api-prd-nyt.theathletic.com/graphql`（`getPuzzleByIdOrDate`，无需登录） | ✅ | ❌（只能午夜后抓，现有 00:05 ET 部署可接住） | ≥ 2024-09（~760 期） |
| Letter Boxed | `/puzzles/letter-boxed` 页内 `window.gameData`（今日解、昨日解、字母边、完整词典） | ✅ | ❌ | 无，只能逐日积累 |
| Wordle 历史 | 现有 `svc/wordle/v2` | ✅ | ✅ | 2021-06-19（#0）起 |
| Connections 3×3、Colorful Strands | 未找到接口 | — | — | 每周一期，优先级低 |
| LinkedIn 全系 | 需登录；对手用的是 LinkedIn 私有 Voyager API | — | — | 违反 LinkedIn 用户协议（禁止抓取） |

## 六、规划原则（Backlinko 方法 × 本站约束）

1. **独特内容优先于篇幅**：每个新页面必须有一样对手前 10 名都没有的东西（原创数据、交互工具、确定性推导出的解题步骤、独有图示）。没有的就不做。
2. **独特内容只能来自三处，全部免费、确定性、不依赖 LLM**：
   - 我们自己的数据（4 个游戏的完整历史 JSON + 每日管线）；
   - 由数据推导出的结果（解题步骤、统计、重复检测、棋盘图示）；
   - 免费的公开词典 / 词库（dictionaryapi.dev 已在用）。
3. **不批量造页**：日期页只从上线日起每天自然新增，历史数据放进已有的汇总页、统计页、工具页里发挥价值。
4. **E-E-A-T**：数据页写明数据来源（NYT 公开接口）、统计口径、更新时间（“已于 00:05 ET 与 NYT 数据核对”）。作者署名需要你提供真实信息（见第十二节）。
5. **GEO**：统计页“一个段落一个结论”，关键数字加粗、可被引用；问答式 FAQ；`Dataset` / `FAQPage` schema。
6. **URL**：已收录的站点不改现有 URL，新页面沿用现有的扁平结构（例如 `/wordle-solver` 而不是 `/tools/...`）。skill 推荐 `/hub/...` 和 `/tools/...`，这里有意偏离：一致性比新规范更重要，也避免和现有页面混用两套风格。日期页带日期是这个领域的查询形态（`/wordle-hint/2026-10-26` 已在用），属于“URL 不带日期”规则的合理例外。

## 七、集群结构

首页 `/` 是主枢纽（Main Hub）。每个游戏是一个两层集群：已有的 `*-answers` 汇总页充当游戏枢纽，下面挂今日页、日期页、工具和指南。每个游戏的页面都不到 10 个，按 skill 的规则不需要再加子枢纽页。

```
/                                        [Main Hub — 已有]
├── Wordle
│   ├── /wordle-hint-today、/wordle-hint/[date]、/wordle-answers …   [已有]
│   ├── /wordle-repeats                  [新 · 原创数据 + 工具]  P1
│   └── /wordle-solver                   [已有 · 工具]
├── Connections
│   ├── /connections-answers             [已有 · 游戏枢纽，加“全部资源”模块]
│   ├── /connections-answers/[date]      [新 · 从上线日起每天 1 页]  P0
│   ├── /connections-stats               [新 · 原创数据]  P1
│   └── /connections-hint-today、/connections-unlimited   [已有]
├── Strands
│   ├── /strands-answers                 [已有 · 游戏枢纽]
│   ├── /strands-answers/[date]          [新 · 从上线日起每天 1 页]  P0
│   └── /strands-hint-today、/strands-unlimited           [已有]
├── Spelling Bee
│   ├── 现有 4 个页面                     [已有]
│   └── /spelling-bee-solver             [新 · 工具]  P2
├── Pips                                  [新游戏]  P1
│   ├── /pips-answers                    [游戏枢纽 + 归档]
│   ├── /pips-hint-today                 [今日页 · 交互棋盘 + 分步提示]
│   ├── /pips-answers/[date]             [从上线日起每天 1 页]
│   └── /how-to-play-pips                [指南 · 含原创统计]
├── /nyt-games-reset-times               [新 · 工具，所有游戏共用]  P1
└── /letter-boxed-solver                 [新 · 工具]  P2
```

## 八、独特内容简报（Skyscraper 2.0）

### 8.1 `/connections-stats` — 原创数据页（推荐的首个旗舰页）

- **SERP 空白**：搜“connections statistics / most common words”，结果全是泛泛的攻略和垃圾页，**没有一份真实统计**（2026-10-26 实测）。
- **我们已有数据**（1,232 期，本地实算）：共出现 8,874 个不同的词；989 个词出现过 5 次以上；最常见的是 BALL（30 次）、RING（26）、FLY / BAR（各 22）、CHECK（21）；**446 个词在黄、绿、蓝、紫四种颜色里都出现过**（“最会骗人的词”）；**31%（379/1,232）的紫色组是填空题（___）**。
- **第一版范围**：最常出现的词 Top 50（可搜索）；“百变词”（跨颜色出现的词）；各颜色的类别类型分布；编辑 / 年份趋势；“这个词以前出现过吗”查询框。每天随管线自动更新。
- **为什么适合本站**：零 LLM、零 API 成本；数字天然适合被 AI 搜索引用；r/NYTConnections 这类社区愿意自发分享，带来品牌信号。
- **衡量指标**：30 天收录、开始有展示；60 天有“most common connections words”一类查询的排名；90 天有自然外链或社区提及。

### 8.2 `/wordle-repeats` — 重复答案追踪 + “用过没有”查询

- **SERP 空白**：关于“Wordle 会不会重复出题”，搜索结果互相矛盾（有的说 2026 年 2 月起开始重复，有的说永远不会），都是低质量聚合站；fiveforks 只有一张表格，没有专门的落地页。
- **前提**：需要先把 Wordle 历史数据回填到 #0（**只回填数据，不生成 1,550 个旧日期页**）。上线前用我们自己的完整数据核实“首次重复”的日期和次数，不直接采用第三方的说法。
- **内容**：重复答案总数和完整列表（日期、期号、距上次出现的天数）；输入任意 5 字母词查询“出现过几次、最近一次是哪天”；“自重复政策开始以来，新词和重复词的占比”。
- 顺带价值：回填后的完整数据也让 `/wordle-solver` 能准确标记“出现过的答案”，`/wordle-answers` 能做成完整的紧凑列表。这一项要单独评估，因为那是已排名的页面，第一步先保证它的 SEO 正文不被挤出 2MB。

### 8.3 Pips 集群 — 交互式分步解法

- **SERP 空白**：对手的解答是截图（nerdschalk 的棋盘图）或可点按的棋盘（bloxodes）；攻略类结果里甚至把 Pips 写成猜词游戏。
- **我们的独特之处**：用 NYT 数据里的 `solution` 和区域约束，**确定性地推导出提示顺序**：先提示“最受约束的区域”，再给出一块被迫只能放在某处的骨牌，最后给完整解。每一步都可以单独揭开。Easy / Medium / Hard 三个难度分开。
- **指南的原创数据**：基于约 435 期的统计，例如各难度的平均骨牌数、各类约束（=、≠、<、>、求和）的出现频率。

### 8.4 `/nyt-games-reset-times` — 换题时间工具

- 对手 beebom 为每个游戏单独做了一个静态页（约 13 个）。我们做一个页面：根据访客所在时区实时显示每个游戏的下次换题时间和倒计时。规则是 Wordle / Connections / Strands / Pips 按本地午夜换题，Spelling Bee 是美东 03:00，Mini 是美东 22:00。
- 我们对换题规则掌握得准（第 2 步做的就是这件事），也能为“提前发布次日页面”提供解释和入口。

## 九、页面清单与规格（SEO 字段为英文）

> 字段：目标关键词 · 意图 · Meta title（≤60 字符）· Meta description（≤155 字符）· H1 · H2 结构 · Schema · GEO 要点。上线前在单页需求文档里细化。

**P0 — `/connections-answers/[date]`**（`/strands-answers/[date]` 同构）
- 关键词：`connections answer [month day]`、`connections #[n]`；意图：查某一期的答案（导航 / 信息）。
- Title：`Connections #1233 Hints & Answers — Oct 26, 2026`
- Description：`Spoiler-safe hints for NYT Connections #1233 (Oct 26, 2026): clues for each color group, then the categories, answers and what every word means.`
- H1：`NYT Connections #1233 — Monday, October 26, 2026`
- H2：Today's Grid · Hints by Color · Categories · Answers · What the Words Mean · Previous & Next Puzzles
- Schema：`Article` + `BreadcrumbList` + `FAQPage`
- GEO：开头一句话概述（期号、日期、编辑、难度最大的组）；每组一个 Q&A 块。

**P1 — `/connections-stats`**
- 关键词：`connections statistics`、`most common connections words`、`nyt connections purple categories`；意图：信息。
- Title：`NYT Connections Stats: 1,232 Puzzles Analyzed`
- Description：`The words NYT Connections reuses most, the 446 words that have appeared in all four colors, and how often purple is a fill-in-the-blank, updated daily.`
- H1：`NYT Connections Statistics (Updated Daily)`
- H2：Key Numbers · Most-Used Words · Words That Changed Color · What Purple Groups Look Like · Categories by Year · Methodology & Data Source · FAQ
- Schema：`Dataset` + `Article` + `FAQPage` + `BreadcrumbList`
- GEO：每个结论一段、数字加粗；Methodology 写明数据来源和统计口径。

**P1 — `/wordle-repeats`**
- 关键词：`wordle repeats`、`has wordle repeated answers`、`wordle repeated words list`；意图：信息 + 工具。
- Title：`Wordle Repeats: Every Repeated Answer (Live List)`
- Description：`Does Wordle repeat answers? See every repeated Wordle answer since the policy change, when each word was first used, and check any word instantly.`
- H1：`Wordle Repeats: Every Answer NYT Has Reused`
- H2：Does Wordle Repeat Answers? · Check a Word · Every Repeated Answer · Repeat Stats · How We Track This · FAQ
- Schema：`Dataset` + `WebApplication` + `FAQPage` + `BreadcrumbList`

**P1 — Pips 三页**
- `/pips-hint-today` — 关键词 `pips hints today`、`nyt pips answer`；Title `NYT Pips Hints & Answers Today — Easy, Medium, Hard`；H2：Today's Boards · Step-by-Step Hints · Full Solutions · Yesterday's Pips；Schema `Article` + `FAQPage`。
- `/pips-answers` — 关键词 `pips answers`、`pips archive`；游戏枢纽 + 历史解答列表（列表形式，不拆成日期页）。
- `/how-to-play-pips` — 关键词 `how to play pips`、`pips strategy`；H2：Rules in 60 Seconds · Region Types Explained · Strategy (backed by 435 puzzles) · Common Mistakes · FAQ；Schema `HowTo` + `FAQPage`。

**P1 — `/nyt-games-reset-times`**
- 关键词：`when does wordle reset`、`when does connections reset`、`nyt games reset time`；意图：信息（工具型）。
- Title：`When Do NYT Games Reset? Live Times for Your Time Zone`
- H2：Reset Times at a Glance · Wordle · Connections · Strands · Spelling Bee · Pips · The Mini · Why Some Games Use Eastern Time · FAQ
- Schema：`WebApplication` + `FAQPage`

**P2 — `/spelling-bee-solver`、`/letter-boxed-solver`**：Utility 型工具页（工具在最上面，下方是简短说明）。Schema 用 `WebApplication`。具体规格在单页需求文档里定。

**Schema 示例（统计页用的 `Dataset`）**

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "NYT Connections puzzle statistics",
  "description": "Word and category statistics computed from every NYT Connections puzzle since June 12, 2023.",
  "url": "https://wordlehint.info/connections-stats",
  "creator": { "@type": "Organization", "name": "WordleHint" },
  "temporalCoverage": "2023-06-12/..",
  "isAccessibleForFree": true,
  "dateModified": "2026-10-26"
}
```

## 十、内链矩阵

| 从 | 到 | 锚文本示例 | 位置 |
|---|---|---|---|
| `/` | 各游戏的 `*-answers` 枢纽、`/connections-stats`、`/wordle-repeats`、`/nyt-games-reset-times` | “Connections answers archive”“Connections stats” | 首页游戏卡片区 |
| `*-answers` 枢纽 | 今日页、最近 14 天的日期页、统计页、Unlimited、指南 | “today's Connections hints”“most-used Connections words” | 新增的“全部资源”模块 |
| 日期页 | 上一期 / 下一期、所属枢纽、今日页、统计页 | “previous puzzle”“Connections stats” | 页尾导航 + 正文中 |
| `/connections-stats` | 枢纽、今日页、提到某个词时链接到它最近一次出现的日期页 | “#1201, when BALL was purple” | 正文表格 |
| `/wordle-repeats` | `/wordle-answers`、`/wordle-solver`、`/wordle-hint/[date]` | “every Wordle answer”“Wordle solver” | 正文 + 查询结果 |
| 所有今日页 | `/nyt-games-reset-times` + 跨游戏“今天还有”导航条 | “when the next puzzle drops” | 页首倒计时旁 |

锚文本要有变化，不能都用同一个关键词。

## 十一、上线节奏

延续既定原则：现有 URL 不改；每类改动单独部署、间隔 1–2 周；动排名页前先记 GSC 基线；每天新增页面控制在几十个以内（本方案每天只有 2–3 个日期页，一次性页面每次 1–3 个）。

| 周 | 内容 |
|---|---|
| 第 0 周 | 修复 UNDEFINED 回归（已在本地准备好）|
| 第 1–2 周 | Connections + Strands 日期页上线（从上线日起，每天 +2）；观察收录 |
| 第 3–4 周 | `/connections-stats` |
| 第 5–6 周 | Wordle 历史数据回填（只回填数据）+ `/wordle-repeats` |
| 第 7–9 周 | Pips 三页 + 每日管线 |
| 第 10 周 | `/nyt-games-reset-times` |
| 第 11–12 周 | 看 GSC 复盘；决定 P2（两个求解器、Sports Edition）和是否把 `/strands-answers` 按年拆分（它的 FAQ 预计 2027 年 5–7 月越过 2MB 线）|

## 十二、需要你决定的事

1. **“不用 LLM”的边界**：数据计算出来的文字（例如“BALL 出现了 30 次”）属于确定性生成，没有疑问。但指南、统计页方法说明这类**说明性文字**，以前的页面都是开发时由我起草的，这算不算你说的“LLM 生成内容”？
   - A. 我起草，你逐页审核修改后再上线；
   - B. 由你来写，我只做数据和页面；
   - C. 这类页面只放数据和极简说明。
2. **是否提前发布次日页面**（仍然有效）：日期页在前一天美东中午左右上线，今日页仍在美东午夜切换。
3. **作者署名（E-E-A-T）**：数据页要不要用真实署名和简介？需要你提供信息。
4. **社区推广**：统计页上线后，是否愿意在 Reddit（r/wordle、r/NYTConnections）上以分享数据的方式发帖？这是 skill 推荐的品牌信号来源，但完全可选。
5. **GSC 数据**：用来校准优先级。

## 十三、Todolist

- [ ] 推送 UNDEFINED 回归修复
- [ ] 你对第十二节给出决定
- [ ] P0 Connections / Strands 日期页（单页需求文档 → 实现 → 观察 2 周）
- [ ] P1 `/connections-stats`（需求文档：SERP 细查 + 指标清单）
- [ ] P1 Wordle 历史数据回填 → 核实重复数据 → `/wordle-repeats`
- [ ] P1 Pips 管线 + 三页
- [ ] P1 `/nyt-games-reset-times`
- [ ] 第 12 周复盘：GSC 数据、P2 取舍、`/strands-answers` 拆分
