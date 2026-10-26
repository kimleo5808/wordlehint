# P0 需求文档：Connections / Strands 日期页 + 提前发布次日页

> 状态：第一批（日期页）已实现并本地验证，待推送；第二批（提前发布）待第一批观察 1–2 周后开始（2026-10-26）。上级方案：`docs/expansion-plan-2026-10.md`（第九节 P0）。
> 流程：竞对细查 → backlinko 内容方案 → frontend-design UI 方案 → pinpointanswer.today 结构（答案卡片在前、SEO 内容在后）→ 本文档 → 确认后实现。
> 约束：不用 LLM、不用付费 API；每天自动更新的内容只能是确定性数据；说明性文字由我撰写；不加作者署名，显示发布和更新日期；新页面每天几十个以内。

## 1. 目标与范围

| 项目 | 内容 |
|---|---|
| 新路由 | `/connections-answers/[date]`、`/strands-answers/[date]` |
| 起始范围 | 上线时开放**最近 7 天**（2 × 7 = 14 页），之后每天自然 +2。**不回填更早的历史**，历史仍由现有汇总页承载 |
| 提前发布 | Wordle / Connections / Strands 的**日期页**，在前一天美东 12:00 上线次日的那一期；今日页仍在美东午夜切换；Spelling Bee 不变（全球统一在美东 03:00 换题）|
| 不做 | 回填历史日期页、月度页、改动现有 URL |

为什么开放最近 7 天而不是只从上线那天开始：“昨天/前天的 connections 答案”这类查询立刻就有页面承接，上一期/下一期导航也不会是空的。14 页远低于“每天几十个”的上限。

## 2. 竞对细查（日期页）

| 对手 | 日期页形态 | 我们要超过的点 |
|---|---|---|
| answers.today | `/connections/october-24-2026`：H1 + 一段 “About the puzzle” + FAQ，约 1,000 词（多为模板），**无 JSON-LD、无 canonical**；分组模糊遮挡、点击揭示 | 完整 schema；每页有确定性的独有数据（词语历史）；分步揭示 |
| pinpointanswer.today | 每期一个可索引页，标题带“期号 + 线索词”；答案卡片在最上方；有相邻 3 期的链接 | 借鉴“期号进标题”“卡片在前”；它的正文是 AI 套话，我们不做 |
| Insider Gaming / Beebom（媒体） | 一天一篇文章，提示 → 类别 → 答案 | 交互式揭示 + 数据，而不是长篇文章 |
| bloxodes | 有日期页，但全部 `noindex` | 不构成竞争 |

**结论**：对手的日期页要么薄（answers.today），要么是一次性的文章（媒体）。我们的差异化是三样确定性的独有内容：分步揭示 + 词语历史（Connections）/ 路径揭示（Strands）+ 完整 schema。

## 3. 内容方案（backlinko）

### 3.1 Connections 日期页

- **目标关键词**：`connections answer october 26`、`connections #1233`、`connections hints october 26 2026`；意图：查找某一期的提示或答案。
- **Title**（≤60 字符）：`Connections #1233 Hints & Answers — Oct 26, 2026`
- **Description**（≤155 字符）：`Spoiler-safe hints for NYT Connections #1233 (Oct 26, 2026), then every category and answer, plus how often each word has appeared before.`
- **H1**：`NYT Connections #1233 — Monday, October 26, 2026`
- **H2 结构**：
  1. Hints & Answers by Color（答案卡片，最上方）
  2. Word History: Have These Words Appeared Before?（独有）
  3. Connections #1233 in Numbers（独有）
  4. FAQ: Connections #1233
  5. More Connections Puzzles（上一期 / 下一期 / 最近 7 天 / 汇总页 / 统计页 / Unlimited）
- **独有内容（每天自动、确定性）**：
  - **词语历史**：16 个词各自在我们 1,232 期存档里出现过几次、分别在哪种颜色、最近一次是哪一期。“换过颜色的词”会被标出来（实测最近 60 期平均每期 7.9 个）。
  - **本期数字**：多少个词是第一次出现、最常客的词、紫色组是否是填空题类型、这是本编辑的第几期。
  - 词义：**不做**。词典的第一个义项往往不是本题用到的那个（例如 LEAD 是“铅”还是“牵引绳”），自动选错反而误导。
- **固定的说明文字**：只写短段落（由我撰写，用数据填空），不放跨页重复的长篇攻略。长篇内容由今日页和统计页承担。
  - 这和既定流程里“正文 1500 字以上”的要求有意不同：那条要求适用于落地页。每天新增的日期页如果都塞 1500 字共用的文字，就会成为同质化页面，违背“少而精”。这里请你确认。
- **Schema**：`Article`（datePublished = 发布时间，dateModified = 最后核对时间）+ `BreadcrumbList` + `FAQPage`。
- **GEO**：H1 下面一句话摘要（期号、日期、编辑、换色词数量）；FAQ 用本期的具体数据回答。
- **内链**：上一期 / 下一期；所属汇总页 `/connections-answers`；今日页；`/connections-stats`（上线后）；`/connections-unlimited`。

### 3.2 Strands 日期页

- **Title**：`Strands #967 Hints, Spangram & Answers — Oct 26, 2026`（媒体标题已经开始带 “Spangram”）
- **H1**：`NYT Strands #967 — Monday, October 26, 2026`
- **H2**：Theme & Spangram Hints · Answers on the Board（路径逐词揭示）· Puzzle Notes（独有：词长、spangram 走向、主题词是否出现过）· FAQ · More Strands Puzzles
- **独有内容**：用 `lib/strands-solver.ts` 推导出每个主题词在棋盘上的路径，可以逐词揭示并画出路径；spangram 单独高亮。Strands 主题词约有 26% 以前出现过，作为补充信息展示。
- Schema、内链与 Connections 相同。

## 4. UI 方案（frontend-design）

**设计方向：“谜题档案（Puzzle Ledger）”**。日期页是一份“存档记录”，不是今日页那种引导式体验。视觉沿用全站的组件和字体（Outfit 标题 + JetBrains Mono 数据），**不新增字体**。数据区借用站点已有的“报纸编辑风”元素：虚线分隔、等宽数字、米色纸面，营造账本或档案的质感。

**最让人记住的一点：词语的“颜色指纹”**。每个词旁边有一条 4 段的细条，按历史出现次数显示它在黄、绿、蓝、紫各出现过几次。一眼就能看出“这个词以前是紫色的陷阱”。

页面结构（移动端优先，从上到下）：

1. **紧凑页头**（约 120px，深色带，和今日页呼应但更矮，让答案卡片进入首屏）：
   - 面包屑；H1；
   - 一行元信息：`Published Oct 25, 2026 · Checked against NYT data Oct 26, 00:05 ET · Editor: Wyna Liu`；
   - 右侧是 ← #1232 / #1234 → 上一期 / 下一期按钮。
2. **跨游戏条**：`Also on Oct 26: Wordle #1955 · Strands #967 · Spelling Bee`，可横向滚动。
3. **答案卡片（首屏核心）**：
   - Connections：先显示 16 个词的原始棋盘（不算剧透），下面是黄、绿、蓝、紫四张卡片，每张都可以分三步揭示：首字母 → 类别 → 答案。
   - 右上角有“提示优先 / 直接看答案”切换，用 cookie 记住选择（站内已有这个模式）。日期页默认“直接看答案”，因为事后来查的人多数是要答案。在美东午夜之前访问提前发布的次日页时，默认改为“提示优先”。
   - Strands：主题线索放在顶部，下面是 6×8 棋盘（复用 `BoardGrid`）和主题词芯片（显示为 `□□□□□ 5`）。点哪个芯片，就在棋盘上用 SVG 画出这个词的路径（约 600ms）；spangram 用黄色，放在最后揭示；“全部显示”会依次画出所有路径。
4. **词语历史**（Connections）：
   - 桌面端用表格：词 · 本期颜色 · 以前出现次数 · 颜色指纹 · 最近一次（有日期页就加链接）· “换过颜色”徽章。
   - 移动端改为卡片。
   - **“本期颜色”一列在揭示答案前保持模糊**，其余列不算剧透，因为 16 个词本来就印在棋盘上。
5. **本期数字**：3–4 个数据卡片（第一次出现的词数、换色词数、最常客的词等）。
6. **FAQ**：折叠显示，文字仍在 HTML 中，方便搜索引擎读取。
7. **更多谜题**：上一期 / 下一期大按钮 + 最近 7 天的日期条 + 汇总页 / 统计页 / Unlimited 入口。
8. **页脚数据说明**：`Puzzle data: NYT Games. Word history computed from 1,232 puzzles in our archive.`

**动效**：
- 首屏卡片依次淡入（间隔 60ms）；
- 颜色指纹条滚动到视口时展开；
- Strands 路径用 SVG 描线动画；
- 全部遵守 `prefers-reduced-motion`。

**无障碍**：揭示按钮使用 `aria-expanded`；颜色指纹附带文字（例如 `Yellow 3 · Purple 5`），不只靠颜色区分；棋盘路径有文字版。

**性能**：静态生成；HTML 目标 < 150KB；只有揭示交互是客户端组件。

**和今日页的区别**（避免两页内容重复）：今日页以提示为主，附带操作说明和长篇攻略；日期页以存档为主，内容是答案、词语历史、本期数字和前后导航。两页内容差异足够大，不需要互相 canonical。

## 5. 提前发布机制

1. **发布规则**：在读取层给“日期页”单独一套可见性规则：美东 12:00 之后，次日（D+1）的那一期对日期页可见；今日页、汇总页、统计、Unlimited 仍然使用现有的 `released()`（`date <= 美东今天`）。
2. **哪些地方会出现 D+1**：只有 D+1 自己的日期页、D 那一页的“下一期”链接，以及 sitemap。
3. **防泄露检查**：同步改成“D+1 只允许出现在以上三个地方”，出现在其他任何文件里就报错。
4. **定时部署**：触发 Worker 增加一次美东 12:05 的部署（UTC 16:05 / 17:05 两个 cron，同样按美东小时过滤）。每天的部署次数从 2 次变为 3 次。
5. **今日页引导条**：访客的本地日期如果已经是明天（澳洲、欧洲时段），在今日页顶部显示 `It's already Oct 27 where you are → Wordle #1956 hints`，链接到 D+1 的日期页。这个判断在客户端进行，不影响静态 HTML。
6. **Spelling Bee 不参与**：它全球统一在美东 03:00 换题，不存在本地日期提前的问题。

## 6. 对已收录页面的影响

- 不改任何现有 URL。
- 两个汇总页只**增加**“最近 7 期”的链接，不删内容。
- 新增 14 页 + 每天 2 页。提前发布对现有页面的影响：Wordle 的 `/wordle-hint/[date]` 会提前 12 小时出现次日那一页（新 URL，属于自然增长）。
- 两件事**分两次上线**：先上线日期页，观察 1–2 周；再上线提前发布。

## 7. Todolist

**第一批：日期页**
- [x] 读取层：词语历史（每个词的出现次数和颜色分布，算一次后缓存）、本期数字；Strands 路径数据（复用 solver）
- [x] 路由 `/connections-answers/[date]`、`/strands-answers/[date]`：`generateStaticParams` 只生成“最近 7 天 + 上线后的日期”（固定起始日常量），`dynamicParams = false`
- [x] 组件：紧凑页头、跨游戏条、答案卡片（复用 StagedHints / AnswerGrid / SpoilerCurtain）、提示/答案切换、词语历史表（含颜色指纹）、Strands 路径揭示（SVG）、本期数字、前后导航
- [x] Metadata（title / description / canonical）+ JSON-LD（Article、BreadcrumbList、FAQPage）
- [x] 汇总页加“最近 7 期”链接；今日页加“本期存档页”链接
- [x] sitemap 加入日期页
- [x] 验证：tsc / lint / build；`check-future-leak`（数据含 D+1 时通过）；HTML 131KB / 112KB；三种 schema 齐全；日期页之间正文相似度 0.19–0.26；390px 移动端和桌面端截图检查
- [x] 配图：每期 OG 图（构建时生成，gitignore）+ 颜色指纹说明图（`public/images/connections-answers/color-fingerprint.png`）
- [ ] 上线后：GSC 观察 1–2 周

**第二批：提前发布**
- [ ] 读取层的日期页可见性规则（美东 12:00 后开放 D+1）
- [ ] Wordle / Connections / Strands 日期页、sitemap、“下一期”链接接入该规则
- [ ] `check-future-leak.mjs` 增加允许清单（只允许 D+1 出现在三个位置）
- [ ] 触发 Worker 增加美东 12:05 的定时
- [ ] 今日页客户端引导条
- [ ] 验证：用时钟平移构建模拟美东 13:00，确认 D+1 只出现在允许的位置

## 8. 需要你确认

1. **日期页不加 1500 字以上的通用文字**（理由见 3.1），只放数据和短说明。
2. **上线时开放最近 7 天**（14 页），而不是严格从上线当天开始。
3. **日期页默认“直接看答案”**（今日页仍然是提示优先）。
