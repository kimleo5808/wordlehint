# P1 需求文档：`/connections-stats` 原创数据页

> 状态：待确认（2026-10-26）。上级方案：`docs/expansion-plan-2026-10.md`（8.1 节、第九节）。
> 流程：竞对细查 → backlinko 内容方案 → frontend-design UI 方案 → 本文档 → 确认后实现。
> 约束：不用 LLM、不用付费 API；全部数字由数据计算、每天自动更新；说明文字由我撰写；不加作者署名。

## 0. 先要你确认的一件事

调研发现 **connectionshint.app 上有一个同名页面 `/connections-stats`**。这个代码库在改名 WordleHint 之前就叫 ConnectionsHint，域名就是 connectionshint.app；Strands 汇总页里也链接了 strandshint.app。

**如果 connectionshint.app 是你的站**，在 wordlehint.info 上再做一个同主题页面，就是自己的两个站争抢同一批关键词。可选的做法：
- A. 照常在 wordlehint.info 做（两站并存，接受内耗）；
- B. 只把 connectionshint.app 那一页做好，wordlehint.info 不做；
- C. wordlehint.info 做，connectionshint.app 那一页 301 跳转过来，或者加 canonical 指向这里。

如果它不是你的站，就按下面的方案做，它只是一个普通对手。

## 1. 目标与范围

- 新 URL：`/connections-stats`（1 个页面）。
- 数据范围：存档中**今天之前**的全部谜题（不含今天，避免剧透；也不含预抓的明天）。每天随部署自动更新。

## 2. 竞对细查（修正：上一版说“SERP 里没有真实统计”是错的）

| 对手 | 内容 | 空白 / 问题 |
|---|---|---|
| nytgamesolver.com/connections-study | 分析最深：1,191 期（截至 2026-09-21，一次性快照）；把类别分为 12 种类型并按颜色统计；发现紫色组里文字游戏类的占比逐年上升（2023 年 59% → 2026 年 82%）；按颜色列出 Top 15 高频词；星期检验（结果不显著）| 不更新；没有查询功能 |
| wordsrated.com | 用约 6 万条 Reddit 帖子统计玩家成绩：失败率 9.1%、各组被解出的顺序、最难的几期 | 数据停在 2026 年 1 月；词频已经过时（BALL 写的是 25 次）|
| connectionshint.app/connections-stats | 实时更新：总数、按月难度分（根据类别名猜测）、最难 10 期、Top 20 高频词 | “55% 的词出现过不止一次”这个说法口径错误（实际是 1 − 不同词数 / 总格数）|
| GitHub / Hugging Face 数据集 | 原始数据 | 不是给普通读者看的页面 |

**我们不做的**：主观难度分（没有玩家成绩数据，只能猜）、玩家成绩统计（没有数据来源）。

## 3. 独有内容（全部已用我们的数据实算）

截至 2026-10-25，共 1,232 期、19,712 个词格、8,874 个不同的词：

1. **查词工具**（没有对手做）：输入任意词，列出它每一次出现的日期、颜色、类别，并链接到有日期页的那一期。
2. **四种颜色都出现过的词**：完整列表，共 446 个。
3. **最常当紫色的词**：FISH、DOG、BAR（各 9 次）、BELL（8 次）……
4. **紫色组填空题（___）的占比逐年下降**：2023 年 38%、2024 年 34%、2025 年 29%、2026 年 24%。这和 nytgamesolver 的“文字游戏类上升”不矛盾，两者口径不同，页面上会写清楚。
5. **各种类别类型主要落在哪个颜色**：填空题 95% 是紫色；加减一个字母 85%；谐音 68%。
6. **重复使用的类别名**：共 377 个类别名用过 2 次以上，HOMOPHONES、ANAGRAMS 各 10 次，FISH 8 次，PALINDROMES 6 次。
7. **完全相同的四词组合重复出现**：例如 GAS / LIQUID / PLASMA / SOLID 出现过 3 次，另有约 10 组出现过 2 次。
8. **总被分在一起的词对**：DIRECT + GUIDE 9 次、DIRECT + LEAD 9 次……
9. **特别版**：图片卡片 / 符号卡片的几期（6 期）。
10. **“去哪里看你自己的 Connections 统计”**：NYT 在 2024-09-03 推出了 Stats & Streaks，用一小节承接“connections stats”这类查询的个人统计意图。

（编辑全是 Wyna Liu，所以不做编辑维度的统计。）

## 4. 内容方案（backlinko）

- **目标关键词**：`connections stats`、`connections statistics`、`most common connections words`、`nyt connections purple categories`、`connections words that repeat`；意图：信息。
- **Title**（≤60 字符）：`NYT Connections Stats: Every Puzzle Analyzed (Live)`
- **Description**（≤155 字符）：`Live statistics from all 1,232 NYT Connections puzzles: the most-used words, words seen in every color, repeated categories, and how purple has changed.`（数字自动更新）
- **H1**：`NYT Connections Statistics (Updated Daily)`
- **H2**：
  1. Connections by the Numbers（关键数字卡片）
  2. Look Up Any Word（查询工具）
  3. The Most-Used Connections Words（Top 30，带颜色指纹条，复用日期页组件）
  4. Words That Have Been Every Color（446 个）
  5. What Makes a Purple Group（类别类型 × 颜色；最常当紫色的词）
  6. Purple Is Changing: Fill-in-the-Blank by Year（按年趋势图）
  7. Repeats: Categories, Groups and Word Pairs NYT Reuses
  8. Special Editions（图片 / 符号版）
  9. Where to Find Your Own Connections Stats
  10. Methodology & Data（数据来源、更新时间、口径说明）
  11. FAQ
- **正文**：约 1,500 词，由我撰写。所有数字都写成模板变量，构建时代入。
- **Schema**：`Dataset`（temporalCoverage = 2023-06-12/..）+ `Article`（dateModified 每天）+ `FAQPage` + `BreadcrumbList`。
- **GEO**：每个结论单独一段、数字加粗；Methodology 写明口径（例如“出现次数按词格计，同一期内只计一次”）。
- **内链**：
  - 本页 → `/connections-answers`、`/connections-hint-today`、各日期页（查询结果和列表中）；
  - `/connections-answers`、日期页的“词语历史”区块、首页 → 本页。

## 5. UI 方案（frontend-design）

**设计方向：“数据年鉴”**。延续日期页的“谜题档案”风格：等宽数字、虚线分隔、Connections 四色。**最让人记住的一点**是查询框：输入一个词，就弹出它的完整出场记录和颜色指纹，像查一个球员的生涯数据。

1. **页头**：H1 + 一句话摘要 + 4 张关键数字卡片 + 查询框。
2. **图表**：全部用服务端渲染的 SVG（柱状图、按年折线图），不引入图表库；每张图下方附一个文字版小表格，供无障碍和搜索引擎读取。
3. **长列表**（446 个词等）：默认显示前 30 个，“显示全部”展开；完整列表仍在 HTML 中。
4. **移动端**：图表横向可滚动，卡片两列排布。

**查询数据**：8,874 个词的出场记录约 300KB，不内联进页面。构建时生成一个静态 JSON（只含已发布、且早于今天的数据），用户第一次输入时再加载。防泄露检查要**增加对这个 JSON 内容的扫描**。

## 6. 技术方案

- `lib/connections-stats.ts`：所有统计（`cache()`，只读存档，即今天之前的数据）。
- 构建前脚本生成 `public/data/connections-word-index.json`（gitignore），并纳入 `check-future-leak.mjs` 的内容扫描。
- 组件：`StatCharts`（SVG）、`WordLookup`（客户端）、复用 `FactCards` 和颜色指纹条。
- 页面 `app/[locale]/connections-stats/page.tsx`；加入 sitemap。

## 7. 对已收录页面的影响

- 新增 1 个 URL。
- `/connections-answers` 和日期页只是增加指向本页的链接，不改其他内容。

## 8. Todolist

- [ ] 你确认第 0 节 connectionshint.app 的处理方式
- [ ] `lib/connections-stats.ts`（10 项统计）+ 单元核对（关键数字与本文第 3 节一致）
- [ ] 查词索引 JSON 生成脚本 + 防泄露检查扩展
- [ ] 页面、SVG 图表、查询工具、正文与 FAQ（我撰写）、schema
- [ ] 内链、sitemap
- [ ] 验证：tsc / lint / build / 防泄露检查；手机截图；HTML 体积（目标 < 200KB）
