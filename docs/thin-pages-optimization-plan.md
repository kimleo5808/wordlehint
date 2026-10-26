# 新页面加厚与首屏优化方案（2026-10-26）

> 流程：线上实测审查 → 竞对对比 → backlinko 内容方案 → 本文档 → 确认后实现。
> 约束：不用 LLM、不用付费 API；每天变化的内容只能来自确定性数据；说明文字由我撰写；不加作者署名；不批量生成同质化内容；URL 不改。
> 用户要求：**核心价值数据放在落地页最前面和首屏，SEO 内容放下方**。

## 1. 审查范围与方法

范围：今天（2026-10-26）上线的全部新页面。

方法：
- **词数**：抓线上 HTML，去掉 header、footer、nav、script、SVG 后数可见正文。
- **首屏**：截图，桌面 1366×768、手机 390×844。

## 2. 审查结果

| 页面 | 正文词数 | 首屏能看到的核心内容 | 结论 |
|---|---|---|---|
| `/pips-hint-today` | **413** | 桌面只露出棋盘上沿；手机只有标题区和标签 | **过薄 + 首屏弱** |
| `/pips-answers`（汇总） | **335** | 标题区 + 7 个只有日期的链接卡片 | **过薄 + 首屏没有数据** |
| `/pips-answers/[date]` | 505 | 手机只露出棋盘上沿 | **偏薄** |
| `/strands-answers/[date]` | **354** | 手机露出线索 + 棋盘上半 | **过薄** |
| `/connections-answers/[date]` | 695 | 桌面被 AdSense 的 “Discover more” 块挤掉；手机是 300px 空白广告位，答案在首屏以外 | 内容尚可，**首屏差** |
| `/wordle-repeats` | 1,054 | 手机首屏就是查词工具 | 合格，不动 |
| `/how-to-play-pips` | 约 1,900 | 指南页 | 合格，不动 |
| `/wordle-hint/[date]`（补齐的 3 页） | 755 | — | 沿用约 400 个已收录页的旧模板，**本次不动**（改模板会影响已收录页面，需要单独评估） |

**对照：**
- 本站老的 today 页：Connections 1,060、Strands 974、Wordle 1,282、Spelling Bee 2,031。
- 竞对 Pips today 页：Beebom 约 2,300 词，nerdschalk 约 2,300 词。两家都有 Hard、Medium、Easy 三个 H2，每个都是**文字版**放置说明（“第三行把 5/1 放在橙色和蓝色格”）。

## 3. 共性问题

1. **文字内容只在客户端生成。** Pips 的三个难度只渲染当前标签（Hard），4 步提示和 “Solution as text” 要点击后才生成。所以 Google 和 AI 爬虫看到的只是一串棋盘数字。
2. **标题区太高。**
   - 日期页标题区（面包屑 + H1 + 3 到 4 行摘要 + 元信息）在手机上约 400px；today 页约 520px。
   - 加上 AdSense 自动广告，核心内容被推到首屏以外。
   - 原日期页方案写的是“紧凑页头约 120px，让答案卡片进入首屏”，实现时没做到。
3. **AdSense “Discover more” 块。** 这是自动广告里的“相关搜索”单元，Google 把它插在标题区和答案之间。代码层面控制不了，只能在 AdSense 后台关闭这一格式或设置排除区域。**这会影响收入，需要你决定**（见第 8 节）。
4. **结构化数据和可见内容不一致。** `/pips-hint-today` 有 HowTo schema，但页面上没有对应的可见步骤。

## 4. 通用首屏规则（四类页面共用）

- **标题区预算**：桌面 ≤ 200px，手机 ≤ 260px。只放面包屑、H1、一行元信息（期号 · 日期 · 编辑），再加一排**数据芯片**（例如 `Easy 5 · Medium 7 · Hard 16 dominoes`）。
- **原来 3 到 4 行的摘要句**（GEO 用的一句话总结）移到核心模块**正下方**。核心模块本身文字很少，所以摘要仍然在正文前 200 词以内，GEO 不受影响。
- **核心模块**（棋盘、答案卡片、查词工具）在 390×844 手机屏上，必须从第一屏内开始出现。
- **页面顺序固定为**：核心数据 → 本期独有的文字和数据 → 对比和统计 → 通用说明 → FAQ → 导航。
- 所有每天变化的文字都在**服务端渲染**。防剧透用默认折叠的 `<details>`（内容在 HTML 里，用户看不到）；不要用客户端 state 隐藏。

## 5. 各页方案

### 5.1 `/pips-hint-today`（413 → 目标 1,500+）

- **关键词 / 意图**：`pips hints today`、`nyt pips answer today`、`pips hard answer today`。用户要当天的提示或答案，最好分难度。
- **Title**：`NYT Pips Hints & Answers Today: Oct 26 (#435)`（加站名后缀共 58 字符）
- **Description**：`Hints for today's NYT Pips #435, Easy to Hard: the square to start on, the first domino, half the board, then the full solution in text.`（136 字符）
- **H1**：`NYT Pips Hints Today — {Weekday, Month D, YYYY}`（不变）

**页面顺序：**

1. **紧凑标题区**：H1 + 一行元信息 + 数据芯片（三个难度的骨牌数、Hard 出题人、本期看点，例如“Hard: every square is its own region”）。
2. **首屏核心**：交互棋盘 + 4 步提示阶梯（现有，默认 Hard）。
3. **H2 `Today's Pips at a Glance`**（新增，三张卡片）：
   - 每个难度的骨牌数、棋盘尺寸、区域构成（求和、相等、不等、小于、大于、空白）、单格区域数、双数骨牌数、出题人。
   - 一句**和历史同难度的比较**（数据来自 `lib/pips-stats.ts`），例如 “16 dominoes — more than X% of Hard boards since Aug 18, 2025”。
4. **H2 `How Hard Is Today's Pips?`**（新增）：每个难度给 3 到 4 个确定性信号，都附上历史百分位：
   - 骨牌数；
   - 单格区域数（越少，越难找起点）；
   - 小于 / 大于区域数；
   - 跨区骨牌比例。
   - 不做主观的 “6/10” 打分。
5. **H2 `Today's Hard Pips Hints and Answer`**，然后 Medium、Easy（新增，顺序和竞对一致，Hard 在前）：
   - 第 1 到 3 步的提示文字，每步一个默认折叠的 `<details>`；
   - 完整解答的文字版：每块骨牌放在哪一行、哪一列，默认折叠；
   - 全部服务端渲染，所以三个难度都在 HTML 里。
6. **H2 `How These Pips Hints Work`**（新增，约 150 词）：把 HowTo 的 5 步做成可见内容，修正第 3 节第 4 条的 schema 不一致。
7. **H2 `How the Pips Rules Work`**（现有）。
8. **H2 `Yesterday's Pips`**：从一个链接扩成三个难度的骨牌数、出题人和本期看点，再加日期页链接。
9. **FAQ**：在现有 5 条之外，加 2 条带当天数据的问答：
   - “How many dominoes are in today's Pips?”
   - “Where should I start on today's Hard Pips?”（答案就是第 1 步，这是规则推出的必然事实，不算剧透完整解）。

**和日期页的区分**（避免同一天两页内容重复）：today 页给**分步提示**和“今天有多难”，完整解只给放置位置的列表，而且默认折叠。逐区域的“为什么”只放在日期页。

### 5.2 `/pips-answers/[date]`（505 → 目标 1,000–1,200）

- **Title**：`NYT Pips #434 Answers & Hints — Oct 25, 2026`（57 字符）
- **Description**：`NYT Pips #434 answers for Oct 25, 2026: all three boards solved, every region explained in text, plus hint mode and how this board compares.`（140 字符）

**页面顺序：**

1. **紧凑标题区**：H1 + 元信息 + 数据芯片。
2. **首屏核心**：三个难度的解答棋盘（现有，默认打开答案）。
3. **H2 `Hard / Medium / Easy Answer, Region by Region`**（新增，默认展开，因为这是答案页）：
   - 每个区域一行，例如 `Pink · sum 10 · 2 squares → 4 + 6`、`Lavender · all equal · 3 squares → 2, 2, 2`。
   - 颜色名和 SVG 用的是同一套调色板，用户可以对照棋盘看。
   - 再加骨牌放置列表。
   - 全部 SSR。
4. **H2 `Pips #434 in Numbers`**（现有）+ 新增两项：
   - **本期看点**：确定性规则判断，例如：
     - “Hard: every square is its own region — one of only 5 such boards since launch”（已核实，#434 Hard 就是这种棋盘）；
     - “largest Hard board since …”；
     - “no doubles”。
   - **和历史同难度比较**：百分位。
5. **FAQ**（现有）+ “What is the answer to Pips #434 Hard?”，用一句话指向逐区域答案。
6. 前后导航（现有）。

### 5.3 `/strands-answers/[date]`（354 → 目标 800–900）

- **Title**：`Strands #966 Answers & Spangram — Oct 25, 2026`（59 字符）

**页面顺序：**

1. **紧凑标题区**。
2. **首屏核心**：主题线索 + 棋盘 + 词芯片（现有）。
3. **H2 `Hints for Each Theme Word`**（新增）：每个词三级提示，每级默认折叠，数据来自 `lib/strands-solver.ts` 的路径：
   - 字母数 + 首字母；
   - 起点在第几行第几列；
   - 路径走向。
   - spangram 单独一组，写明从哪条边到哪条边。
4. **H2 `Strands #966 Puzzle Notes`**（现有）：扩成**逐词表格**，列出每个词的字母数、以前出现过几次、最近一次是哪一期（有日期页就加链接）。再加 spangram 路径格数。
5. FAQ（现有）+ “What's a hint for today's spangram?”。

**为什么只到 800–900 词**：Strands 每期可确定推导的内容就这么多。再加通用的“怎么玩 Strands”会让每个日期页都一样，正好违反“不做同质化页面”。有两项我**不做**：
- **释义**：自动选的词义常常不是本题用的意思；
- **非主题词列表**：本地词库和 NYT 接受的词表不一致，会列出错误的词。

### 5.4 `/connections-answers/[date]`（695 → 约 800，主要修首屏）

1. 紧凑标题区。摘要句移到答案卡片下方。手机首屏要能直接看到 16 词棋盘和第一张答案卡片。
2. 新增 H2 `Category Notes`，约 120 词，确定性内容：
   - 紫色组是不是填空题（名字里有 `___`）；
   - 每组有几个词以前在**同一颜色**出现过；
   - 每组“出现次数最多的词”。

### 5.5 `/pips-answers` 汇总页（335 → 目标 1,500）

- **Title**：`NYT Pips Answers Archive: Every Past Puzzle`（56 字符）
- **Description**：`Every NYT Pips solution since Aug 18, 2025: the last 7 days at a glance, record boards, constructor stats, and a date picker for all 434 puzzles.`（145 字符）

**页面顺序：**

1. **紧凑标题区**。
2. **首屏核心**：H2 `Last 7 Days of Pips`。把现在只有日期的链接卡片换成**数据表**：日期、期号、三个难度的骨牌数、Hard 出题人、本期看点，每行链接到日期页。
3. **H2 `Browse Every Past Pips Solution`**：归档浏览器（现有）。
4. **H2 `Record Boards`**（新增，独有资产）：每项都附日期，有日期页的加链接：
   - 每个难度骨牌最多和最少的棋盘；
   - 5 盘“每格都是独立区域”的棋盘；
   - 双数骨牌最多的棋盘；
   - 区域最多的棋盘。
5. **H2 `Pips by Month`**（新增）：每月期数和三个难度的平均骨牌数，看难度有没有随时间变化。
6. **H2 `Who Makes Pips`**：每位出题人的盘数和难度分布（短表）。详细介绍链到指南，不重复。
7. **H2 `Pips by the Numbers`**（现有）。
8. **H2 `How to Use This Archive`**（约 100 词）。
9. FAQ（扩到 6 到 7 条）。

## 6. Schema 与内链

**Schema：**
- 现有的 Article / FAQPage / BreadcrumbList 保持。
- `/pips-hint-today` 的 HowTo 改成和新增的可见步骤一致。
- 汇总页可以加 `ItemList`，列出最近 7 期的日期页。

**内链：**
- today 页 → 本期日期页、昨日日期页、指南、汇总页；
- 日期页 → 前后期、汇总页的 Record Boards 锚点；
- 汇总页的数据表 → 每个日期页。

**GEO：**
- 每个 H2 的第一句直接给答案或数字；
- 统计数字都写明口径，例如 “434 days × 3 difficulties, Aug 18, 2025 – Oct 25, 2026”。

## 7. SEO 风险评估

- 涉及的页面今天才上线，大概率还没被收录。**URL 全部不变**。title 和 description 在首次收录前修改，没有排名损失。
- `DatePageHeader` 只被 Connections、Strands、Pips 三类日期页使用，都是新页面。改紧凑标题区不影响任何老页面。
- 新增的每日文字全部来自当天数据，每页都不同，不是模板套话。
- 泄题检查（`check-future-leak.mjs`）照常把关。新增内容只读 `released()` 之后的数据。

## 8. 已确认的决定（2026-10-26）

1. **AdSense “Discover more”（相关搜索）块：不关。** 首屏只靠压缩标题区来改善。
2. **Strands 日期页目标 800–900 词：接受**，不硬凑 1,000。

## 9. Todolist

**通用**
- [x] `DatePageHeader` 改成紧凑版：H1 + 一行元信息 + 数据芯片；摘要句移到核心模块之后（三类日期页同步）。
- [x] today 页、汇总页的标题区同样压缩。
- [x] 手机 390×844、桌面 1366×768 截图：五类页面的核心模块都在第一屏内（本地无 AdSense；线上广告块仍会占一些高度）。

**Pips 数据层**
- [x] `lib/pips-palette.ts`：区域颜色和颜色名，`PipsBoardSvg` 与文字答案共用。
- [x] `lib/pips-hints.ts`：`cellValues`、`describePlacement`（数字按从上到下、从左到右的顺序）；第 2 步提示写明骨牌哪一端放在起点格。
- [x] `lib/pips-insights.ts`：
  - 逐区域答案（`getRegionAnswers`、`singleSquareGrid`）；
  - 看点（`getPipsHighlights`）；
  - 和更早棋盘的比较（`comparePipsBoard`，只统计该期之前的棋盘，已发布的页面不会再变）；
  - 纪录棋盘、按月、按星期几、求和目标、出题人统计；
  - 构建时的全量校验（`getPipsIntegrity`）。
- [x] 在全部 1,302 盘上校验：每个区域的答案都满足规则，每块骨牌的文字位置都和格子数字一致（0 个问题）。

**`/pips-hint-today`**
- [x] 紧凑标题区 + 数据芯片（骨牌数 + 最多 2 个看点）。
- [x] At a Glance、How Hard 两节。
- [x] Hard / Medium / Easy 三个文字提示节（服务端渲染 + `<details>`，完整解只给骨牌位置）。
- [x] How These Hints Work（和 HowTo schema 同一份步骤）。
- [x] 扩展 Yesterday 和 FAQ（+2 条带当天数据）。
- [x] 改 title / description。

**`/pips-answers/[date]`**
- [x] 三个难度的逐区域答案（全单格的数字盘按行显示）、本期看点、比较表、FAQ（+“Hard 的答案是什么”）、title / description。

**`/pips-answers`**
- [x] 最近 14 天数据表（首屏；有日期页的链到日期页，更早的用 `#d=日期` 在归档浏览器里打开）。
- [x] Record Boards、Pips by Month、按星期几、区域类型构成、最常见求和目标、出题人、How to Use、答案来源与校验。
- [x] FAQ 扩到 8 条；加 `ItemList` schema；改 title / description。

**`/strands-answers/[date]`**
- [x] 逐词提示（长度和首字母 → 起止格 → 单词，服务端渲染 + `<details>`）。
- [x] 逐词历史表（含上次出现时的主题）、和更早题目的比较、棋盘文字版。
- [x] spangram 方向改为“side to side / top to bottom / corner to corner”：原来的 “left to right” 指的是连接哪两条边，但和起止格放在一起会被误读成字母走向。
- [x] FAQ（+ spangram 提示）、改 title。

**`/connections-answers/[date]`**
- [x] Category Notes（同色复现的词、新词数、最常客的词、同名类别是否出现过）。

**验证**
- [x] `tsc`、lint（0 错误）、构建通过；泄题检查通过（本地数据没有预取的题，真正把关在 CI）。
- [x] 词数复测（以 10-25 为“今天”构建）：

| 页面 | 改前 | 改后 | 目标 |
|---|---|---|---|
| `/pips-hint-today` | 413 | 1,668 | ≥ 1,500 ✅ |
| `/pips-answers` | 335 | 1,469 | ≥ 1,500（差 31 词，没有硬凑） |
| `/pips-answers/[date]` | 505 | 1,317–1,387 | ≥ 1,000 ✅ |
| `/strands-answers/[date]` | 354 | 750–867 | 800–900（4 个主题词的期数偏少） |
| `/connections-answers/[date]` | 695 | 874–910 | ≥ 800 ✅ |

- [x] 首屏截图。
- [ ] 推送后线上复测。
