# P1 需求文档：Wordle 历史数据回填 + `/wordle-repeats`

> 状态：待确认（2026-10-26）。上级方案：`docs/expansion-plan-2026-10.md`（8.2 节、第九节）。
> 流程：竞对细查 → backlinko 内容方案 → frontend-design UI 方案 → 本文档 → 确认后实现。
> 约束：不用 LLM、不用付费 API；说明文字由我撰写；不加作者署名；**回填数据不等于生成页面**：不为 1,551 个旧日期新增页面。

## 1. 目标与范围

| 项目 | 内容 |
|---|---|
| 数据 | 把 Wordle 历史回填到 #0（2021-06-19 → 2025-09-16，共 1,551 期）。已实测：NYT 接口全部可取，期号连续、无缺口 |
| 新 URL | `/wordle-repeats`（1 个页面）|
| 不做 | 为旧日期生成 `/wordle-hint/[date]` 页面；改动 `/wordle-answers` 的内容规模（它的紧凑化改造另行评估）|

## 2. 已核实的事实（我们自己的完整数据，截至 2026-10-25）

- NYT 官方宣布：Wordle Review No. 1,689（2026-02-01 发布）开头写道 *“Starting today, we will begin adding previously run words back into play.”*。编辑 Tracy Bennett 在评论里说会倾向于选最近没出现过的词。
- 第一次重复：**2026-02-02 的 CIGAR**（#1689），原词是 #0（2021-06-19）。
- 截至目前**共重复 28 次**，占这之后所有题目的 **10.5%**，平均每月约 3 次；没有哪个词出现过 3 次。最近一次是 2026-10-19 的 STINK（#1948）。
- 两次出现之间**最短隔了 524 天**，中位数 1,699 天，最长 1,934 天。
- 按原词首次出现的年份：**2021 年 24 次**，2022 年 2 次，2023 年 1 次，2024 年 1 次。2021 年一共只有 196 个答案，其中 12% 已经被重新用过。
- 2026 年之前从未出现过重复。

## 3. 竞对细查

| 对手 | 内容 | 空白 |
|---|---|---|
| fiveforks.com/wordle/tips（Repeat Stats）| 最详细：每次重复的日期、序号、距上次天数、累计重复率、原期号、按间隔分档；主列表用 @ 标记 | 只是一张表格，没有查词工具和图形化展示；不在重复当天标记 |
| fiveletterwords.io（records & extremes）| 数据最多：按首次到最近一次的间隔排序，提供 CSV/JSON 下载、可嵌入的 SVG、引用说明 | 没有按原词年份、按星期的统计 |
| TechRadar、Beebom | “原日期/期号 → 重复日期/期号”表格 | 同上 |
| GGRecon、wordsohard | 仍然写着“永远不会重复”，或者预测错误 | 信息过时 |

**空白（我们要做的）**：
- 按原词年份的分布（24/28 来自 2021，目前无人展示）；
- 时间线可视化；
- 能查出某个词每一次出现的日期，并附释义和当天提示页链接的查询工具；
- 能当天就标记“今天是重复词”（我们有当天数据），而 fiveforks 要等到早上 6 点后、并且刻意不在当天标记。

## 4. 回填对现有页面的影响（关键，逐项决定）

目前所有 Wordle 数据都通过 `lib/wordle-daily.ts` 的 `getAllPuzzles()` 等函数读取。如果直接回填，下面这些已收录页面会**同时**发生变化：

| 用到数据的地方 | 直接回填的后果 | 处理方式 |
|---|---|---|
| `/wordle-hint/[date]`（`generateStaticParams`，且 `dynamicParams` 是默认的 true）| **会新增 1,551 个旧日期页**，违背“不批量造页”的原则 | 新增 `wordle` 起始日（`data/date-pages.json`，设为现有最早日期 2025-09-17）；日期页只生成起始日之后的日期；设置 `dynamicParams = false` |
| `/wordle-answers`（列表 + 统计）| 页面从约 1MB 涨到约 5MB，SEO 正文会被挤出 Google 2MB 的抓取上限 | 本次**不变**：继续只列起始日之后的答案。是否改成完整紧凑列表另行评估 |
| `/wordle-hint` 月份归档、首页计数 | 月份从 14 个变成 65 个；首页计数变化 | 本次不变（限定在起始日之后）|
| sitemap | 只取最近 365 天 | 不变 |
| `/wordle-solver` 的“出现过的答案”标记 | 标记更完整（更准确），但传给客户端的数据会变大 | **单独一步**：评估数据体积后再切换到全量历史 |
| 5 字母词表约 80 个页面的“past answer”标记和计数 | 约 80 个已收录页面同时改变 | **单独一步**，单独部署，观察 GSC |
| `/best-wordle-starting-words` 的统计 | 排名可能变化 | 单独一步，同上 |

**结论**：
- 读取层拆成两类 API。现有函数保持“只读起始日之后”的语义，现有页面零变化；新增 `getFullWordleHistory()`，只给 `/wordle-repeats` 和后续明确决定切换的功能使用。
- 回填本身对现有页面**零影响**。
- 后三项（solver、词表、起始词统计）要不要改用全量数据，各自作为单独的变更，分开上线。

## 5. 内容方案（backlinko）

- **目标关键词**：`wordle repeats`、`has wordle repeated answers`、`wordle repeated words list`、`did wordle repeat a word`、`past wordle answers used again`；意图：信息 + 工具。
- **Title**（≤60 字符）：`Wordle Repeats: Every Reused Answer Since 2026 (Live)`
- **Description**（≤155 字符）：`Wordle has reused 28 past answers since Feb 2, 2026. See every repeat, when each word first ran, how long NYT waits, and check any word instantly.`（数字在构建时自动更新）
- **H1**：`Wordle Repeats: Every Answer NYT Has Used Twice`
- **H2**：
  1. Does Wordle Repeat Answers?（直接回答 + NYT 原话引用和出处链接）
  2. Check Any Word（查询工具）
  3. Every Repeated Wordle Answer（完整表格：重复日期 / 期号 / 词 / 原日期 / 原期号 / 间隔天数）
  4. Wordle Repeats in Numbers（统计卡片：总数、占比、最短/中位间隔、按原年份分布）
  5. Where Repeats Come From（按原年份的图表：2021 年占 24 次）
  6. What This Means for Your Guesses（策略：老答案又回到候选范围了，但 NYT 倾向选很久没出现的词）
  7. How We Track This（方法：数据来自 NYT 接口，每天自动更新）
  8. FAQ
- **今日答案的防剧透处理**：表格和统计默认只包含到昨天为止的重复。如果今天的答案是重复词，页面顶部显示一个折叠的“Is today's Wordle a repeat?”，点开才揭晓。
  - 同一个信息也可以作为 `/wordle-hint-today` 的一级新提示（“今天的词以前出现过 / 没出现过”）。这个改动要单独评估，因为它会改动核心页面。
- **正文**：约 1,200–1,500 词，由我撰写。
- **Schema**：`Dataset` + `WebApplication`（查询工具）+ `FAQPage` + `BreadcrumbList` + `Article`（dateModified 每天更新）。
- **GEO**：每个结论一段，数字加粗；引用 NYT 原话并给出链接。
- **内链**：本页 → `/wordle-answers`、`/wordle-solver`、各重复日对应的 `/wordle-hint/[date]`（仅对已有页面的日期加链接）；`/wordle-answers`、`/wordle-hint-today`、首页 → 本页。

## 6. UI 方案（frontend-design）

**设计方向：“似曾相识（Déjà vu）”**。**最让人记住的一点**是一张弧线时间轴：横轴从 2021 到 2026，每次重复画一条弧，把原词出现的日期和重复的日期连起来。28 条弧几乎都从 2021 年那一头发出来，一眼就能看懂“NYT 在重新使用最早的那批答案”。

1. **页头**：H1 + 一句话答案（“Yes — since February 2, 2026, Wordle has reused 28 earlier answers.”）+ 查询框（输入 5 个字母，即时显示出现过几次、每次的日期和期号、释义）。
2. **弧线时间轴**：服务端渲染的 SVG。桌面端横向；移动端改成纵向列表，每条一行，左边是原日期，右边是重复日期。
3. **统计卡片**：沿用日期页的 `FactCards`。
4. **完整表格**：可按日期或间隔排序。
5. **“今天是否重复”折叠块**：沿用 `SpoilerCurtain`。
6. **正文、FAQ**。

**查询工具的数据**：全量 1,955 个答案，每条只有日期和期号，约 40KB，内联在页面里即可，不需要另外请求。
**动效**：弧线依次描出，遵守 `prefers-reduced-motion`。

## 7. 技术方案

- `scripts/backfill-wordle.mjs`：复用 `update-wordle.mjs` 的转换逻辑，回填 2021-06-19 → 2025-09-16；期号用 `days_since_launch`（不能用 `id`，#0 的 `id` 是 1）。可以重复运行。
- `data/wordle-daily.json` 从 404 期增加到约 1,955 期（体积从约 46KB 增加到约 200KB）。
- `lib/wordle-daily.ts`：现有函数增加“起始日之后”的过滤；新增 `getFullWordleHistory()`（同样只返回已发布的数据）。
- `lib/wordle-repeats.ts`：重复检测与统计（缓存）。
- `generate-definitions.mjs`：会顺带给 1,551 个旧答案抓释义。dictionaryapi.dev 免费，但要控制请求速度，分批运行。
- 页面 `app/[locale]/wordle-repeats/page.tsx`；组件 `RepeatArcTimeline`（SVG）、`WordUsageChecker`（客户端）。
- sitemap 加 1 个 URL；`check-future-leak.mjs` 已覆盖 Wordle 数据，不用改。

## 8. 上线顺序

1. 第一次部署：回填数据 + 读取层拆分。部署前做 A/B 构建对比（回填前后各构建一次，逐页比较渲染产物）：所有现有页面的输出必须完全一致。
2. 第二次部署：`/wordle-repeats` 上线。
3. 之后各自单独评估：solver 改用全量数据 → 5 字母词表的“past answer”标记 → 起始词统计 → `/wordle-answers` 紧凑化 → 今日页“是否重复”提示。

## 9. Todolist

- [ ] `backfill-wordle.mjs` + 运行（1,551 期）+ 编号连续性校验
- [ ] `data/date-pages.json` 增加 `wordle` 起始日；`/wordle-hint/[date]` 只生成起始日之后的日期，并设 `dynamicParams = false`
- [ ] 读取层拆分（现有函数只读起始日之后；新增 `getFullWordleHistory()`）
- [ ] A/B 构建对比：回填前后，现有页面的输出必须一致
- [ ] `lib/wordle-repeats.ts` + 页面 + 弧线时间轴 + 查询工具 + 防剧透折叠块
- [ ] 正文与 FAQ（我撰写），schema，sitemap，内链
- [ ] 验证：tsc / lint / build / 防泄露检查；手机截图
- [ ] 后续单独评估的项目（见第 8 节第 3 步）
