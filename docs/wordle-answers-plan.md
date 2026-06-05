# `/wordle-answers` 过往答案归档页 — 第一期方案

> 状态：✅ 已交付（2026-06-05），构建通过 + 浏览器验证
> 制定日期：2026-06-05
> 所属规划：WordleHint 高质量扩页路线 · 第一期（最高 ROI）

## ⚠️ 开发期发现的现实修正

- **数据实际只有 259 条**（2025-09-17 ~ 至今），非 1800+。站点迁移只回填了近期数据。
  → 文案诚实写"the latest 259 answers, updated daily"，**未谎称 since 2021**。
  → 259 行无需虚拟化，直接客户端渲染搜索/排序，性能充足。
- **未装 recharts/react-virtual** → 统计图用纯 CSS div 条形图实现，零新增依赖。
- 采用**全站默认美学**（slate hero + Wordle 绿 tile + 全局 font-heading/mono），未另造 Fraunces 主题，保证与现有页面一致。
- 后续数据每日自增，未来量大时再考虑虚拟化。

## 已交付文件

| 文件 | 作用 |
|------|------|
| `lib/wordle-answers.ts` | 数据聚合 + 统计预计算（首字母/结尾/元音/重复/可引用事实） |
| `data/wordle-answers/content.ts` | meta/H2文案/FAQ/HowTo/Related/定义块 |
| `components/wordle-answers/*` | WordTiles, SpoilerReveal(client), AnswerExplorer(client搜索/排序), WeekStrip, StatsViz, AnswersFAQ, RelatedTools |
| `app/[locale]/wordle-answers/page.tsx` | 组装 + 5类JSON-LD(SoftwareApplication/Dataset/FAQPage/HowTo/Breadcrumb) |
| `lib/jsonld.tsx` | 新增 softwareApplicationSchema + datasetSchema |
| `lib/sitemap.ts` | 加入 /wordle-answers (priority 0.9, daily) |
| `i18n/messages/en.json` | 导航加 "Past Answers" |

验证：`pnpm build` 通过（SSG 预渲染）；浏览器实测防剧透翻转、搜索（ALLOY→词义）、统计图、FAQ token 替换均正常。

---

## 第一期补充：今日/昨日独立答案页（已交付 2026-06-05）

抢比 "wordle hint" 更大的 "wordle answer today" / "yesterdays wordle answer" 词。

| 文件 | 作用 |
|------|------|
| `app/[locale]/todays-wordle-answer/page.tsx` | 今日答案页（spoiler-free meta，数据缺失有降级 UI） |
| `app/[locale]/yesterdays-wordle-answer/page.tsx` | 昨日答案页（meta 直接含答案，提升 CTR） |
| `components/wordle-answers/SingleAnswerView.tsx` | 两页共享视图（hero+答案块+难度+词义+FAQ+related+evergreen） |
| `components/wordle-answers/SpoilerCurtain.tsx` | 今日页防剧透幕：内容在 DOM 中（SEO 可读）但默认高斯模糊+遮罩按钮，点击解除、cookie 记忆 |
| `data/wordle-answers/single.ts` | 两页文案/FAQ 构建器（today 不剧透措辞、yesterday 可命名答案） |
| `lib/wordle-answers.ts` | 新增 `getYesterdayEntry` |
| `lib/sitemap.ts` | 加入两页（today 0.9 / yesterday 0.7，daily） |

复用现有组件：`AnswerDefinition`、`DifficultyRatingCard`。

**关键 bug 修复**：本项目 Tailwind 的 `blur-md` 工具类失效（解析为 `filter:none`），且 React `style` 从对象切 `undefined` 不清除已设 inline filter。最终用显式 `style={{ filter: open ? "none" : "blur(10px)" }}` 解决。

验证：`pnpm build` 通过；浏览器实测今日页默认模糊→点击 reveal 清晰→cookie 跨页记忆；昨日页直接展示 ALLOY；难度/词义/跨链/recent 均正常。

---

## 0. 背景与定位

第一期目标页面，原因：站点已有 `data/wordle-daily.json` 全量真实答案数据 + `wordle-definitions.json` 词义 + `/wordle-hint/[date]` 单日详情页，做归档页**数据现成、天然高质量、抢大词**，无薄内容风险。

路线总览（三期）：

```
第一期  过往答案归档 + today/yesterday 答案页   ← 当前
第二期  少量深度内容页（best starting words / word finder / 精选枢纽）+ 博客扩充
第三期  Connections / Strands 每日提示页（需新数据管道，最后做）
```

> 方向已与用户确认：**不做程序化批量薄页，只做少而精的高质量页面。**

---

## 1. 竞品调研（4 家归档页）

| 竞品 | 组织方式 | 每条数据 | 独特功能 | 关键缺口 |
|------|---------|---------|---------|---------|
| YourDictionary (`/wordle/answers/`) | 按月分区，表格 | 日期/#/答案 | 今日答案 Reveal 防剧透 | ❌ 无词义、无统计、无 FAQ |
| StuckOnWordle (`/all-wordle-answers.html`) | 可搜索可筛选表格 | #/答案/日期/Last Used | 实时筛选、`#####`屏蔽今日、有 FAQ | ❌ 无词义、无统计 |
| WordsRated (`/solvers/past-wordle-answers/`) | 按日期+顶部字母索引 | #/日期/答案 | 口述"-ER/-LY/-CH 结尾更常见" | ❌ 号称有 stats 实际无图表、无词义 |
| WordleSolver.pro | （403 未取到） | — | — | — |

**共同缺口 = WordleHint 的差异化 edge：**

| 维度 | 竞品 | WordleHint |
|------|:--:|:--:|
| 每条答案带词义 | ❌ 全缺 | ✅ 独家（`wordle-definitions.json`） |
| 真实数据统计图表 | ❌ 全缺 | ✅ 独家（全量数据可算） |
| 强防剧透 | 普遍简陋 | ✅ tile 翻转 |
| 内链单日详情页 | ❌ 几乎没有 | ✅ 独家（`/wordle-hint/[date]` 权重回流） |

**核心差异化主张：** "唯一一个每条答案带词义、带真实数据洞察、能一键跳转当日完整提示的 Wordle 答案库。"

---

## 2. 内容方案（Backlinko AUTHORITY Tool Page）

- **目标关键词（主）：** past wordle answers
- **次要：** all wordle answers · wordle answers list · wordle answer archive · every wordle answer
- **搜索意图：** 信息型 + 工具型（查某词是否出现过 / 浏览全部历史 / 不剧透翻看）
- **变体：** AUTHORITY（搜索量 >1k，需 ≥3,500 字深度内容 + 工具）

### Above-the-fold

- **Meta title**（≤60）：`Past Wordle Answers: Every Answer + Definitions`
- **Meta description**（≤155）：`Browse every past Wordle answer with definitions, dates, and puzzle numbers. Search any word, see letter stats, no spoilers. Updated daily.`
- **H1**：`Past Wordle Answers — Every Answer With Definitions`
- **副标题**：`Search and browse all [N] Wordle answers since June 2021. Each entry includes the word's meaning, date, puzzle number, and a link to that day's full hints — with today's answer hidden until you choose to reveal it.`
- **工具区**：搜索框 + 排序切换（日期/编号/字母）+ 答案表格，今日默认遮罩
- **主 CTA**：`Search answers` / `Reveal today's answer`
- **作者署名条**：WordleHint Editorial · `Last updated: [auto date]`

### H2 结构与字数预算（总 ≥3,500 字）

1. **工具区（首屏）** — 搜索 + 排序 + 表格
2. `Today's & This Week's Wordle Answers`（~200字）— 最新一周卡片，今日遮罩，内链 `/wordle-hint-today`
3. `Why a Wordle Answer Archive Is Useful`（~300字）— hook 统计："Across [N] puzzles, only [X]% of answers have ever repeated."
4. `What Counts as an Official Wordle Answer?`（~300字）— **定义段 <50字，可被 LLM 引用**：来自 NYT 官方 feed、编号计算、与 NYT 同步
5. `Wordle Answer Statistics & Patterns`（~500字）★ 独家王牌 — 首字母/结尾/元音/重复字母真实数据可视化，每条配可引用统计事实
6. `How to Use This Archive in 4 Steps`（~400字）— 配 HowTo schema
7. `Browse the Complete Wordle Answer List`（~400字 + 全量数据）— 按月分区，每条：日期·#·答案·词义摘要·"View hints"→`/wordle-hint/[date]`
8. `Wordle Answers vs Wordle Hints — Which Do You Want?`（~300字）— 对比表，分流到 `/wordle-hint-today`
9. `Frequently Asked Questions`（6–8题）
10. `Related Tools`（卡片网格）

### FAQ（GEO 直答式 Q→A）

1. What was the first-ever Wordle answer? → CIGAR, June 19 2021 (Wordle #0)
2. Has any Wordle answer been used twice? → 用真实重复数据（独家）
3. Where do these answers come from? Are they accurate? → NYT 官方 feed，每日自动同步
4. How do I see an answer without spoiling today's puzzle? → 防剧透模式，链 `/wordle-hint-today`
5. What's the difference between a Wordle hint and a Wordle answer? → 链 `/wordle-hint-today`
6. Can I check if a specific word has been a Wordle answer? → 搜索框用法
7. What's the most common starting letter in Wordle answers? → 引用统计区真实数字
8. How often is this archive updated? → 每日自动

### Schema JSON-LD

- **WebApplication / SoftwareApplication**（archive tool，price 0）
- **FAQPage**（8 题）
- **HowTo**（第 6 节 4 步）
- **Dataset**（标注结构化答案数据集，利于 AI 引用）

### 内链方案

| 锚文本 | 目标 | 位置 |
|--------|------|------|
| today's Wordle hints | `/wordle-hint-today` | 第2、8节、FAQ |
| View hints for this day | `/wordle-hint/[date]` | 表格每行（核心权重回流） |
| Wordle Solver | `/wordle-solver` | 工具区上方 + Related |
| best starting words | `/guides/strategy-tips` | 统计区 |
| Wordle Unlimited | `/wordle-unlimited` | Related |
| Wordle hint archive | `/wordle-hint` | 面包屑/相关 |

### GEO 检查清单

- [x] ≥3 条带来源的独家统计
- [x] 可引用的一句话定义块（第4节）
- [x] FAQ 直答式
- [x] 作者署名 + 更新日期
- [x] SoftwareApplication + FAQPage + HowTo + Dataset schema

---

## 3. UI 设计方案（frontend-design）

### 美学方向："The Wordle Ledger（档案账簿）"

数据优先、像档案馆标本目录。记忆点 = **答案词以 Wordle 绿色 tile 形式排布**，整页像被装订的字词账簿。沿用全局 Wordle 调色板（不抢 `/wordle-unlimited` 的 newsprint 主题），加一层"网格纸"质感作为本页签名。气质：精确、可信、可查证——支撑"全网最权威答案库"定位。

### 字体（复用站内已加载资产，零新增成本）

| 用途 | 选择 |
|------|------|
| Display / H1·H2 | Fraunces（衬线，出版物权威感） |
| 数据/表格/编号/答案 | IBM Plex Mono（等宽对齐数字，账簿核心） |
| 正文/FAQ | 全站 body 字体 |

### 色彩

- 底：全局 `background`（浅 #f5f7fa / 深 #0f172a）
- 网格纸纹理：极淡 1px 横竖线（`border` 色 4–6% 透明）
- 答案 tile：`wordle-correct`（绿）
- 统计图表：`chart-1~5` 变量
- 今日遮罩/强调：`cta` 色
- 重复答案标记：`wordle-present`（黄）小角标

### 模块设计

1. **首屏工具区**：搜索框（即时过滤，匹配词+编号，空结果显示"This word has never been a Wordle answer"）+ shadcn ToggleGroup 排序切换 + 答案表格。工具不藏折叠下。
2. **防剧透交互**（招牌）：今日/未来答案默认渲染 5 个空白 tile，点击/Enter 逐个翻转（复用现成 `flip-digit` 动画）露字母，状态存 cookie（站内有 `js-cookie`）。比竞品 `#####` 高级，强化方块母题。
3. **本周答案卡片**：7 张 mini tile 卡（周一→日），今日遮罩，移动端横向 scroll-snap。
4. **独家统计区** ★：信息图区块——首字母条形(A-Z) / 结尾条形(-ER -LY -CH) / 元音数量甜甜圈 / 重复字母环图，用 shadcn chart(recharts) + chart 色，每图配加粗可引用统计事实（兼服务 GEO）。
5. **按月分区完整归档**：**性能关键** — 虚拟化（`@tanstack/react-virtual`）或默认展开最近 3 月 + 更早月份 Accordion 懒渲染。每行 #·日期·答案·词义摘要·"View hints →"。sticky 月份小标题吸顶定位。
6. **FAQ**：shadcn Accordion，复用 `/wordle-unlimited` 的 `FAQAccordion` 风格。
7. **Related Tools**：复用 `RelatedGameGrid` 风格，4 卡（Solver/Today's Hint/Unlimited/Letter games）。

### 动效（克制）

- 首屏 staggered `fade-in-up`（站内已有）
- 防剧透 tile 翻转 `flip-digit`（招牌动作）
- 统计条形滚动入视时从 0 增长（IntersectionObserver 触发一次）
- 搜索过滤用 CSS，避免长列表重排卡顿

### 移动端

- 表格转卡片堆叠（非横向滚动）
- 排序切换收为 dropdown，统计图纵向单列
- sticky 月份标题 + 回搜索浮动按钮

### 性能要点（承载 1800+ 行）

1. 列表虚拟化 / 按月懒渲染（最重要）
2. 全量答案 build 时 SSG，搜索/排序纯客户端无 API
3. 统计数据 build 时预计算，不在客户端跑 1800 行聚合
4. 词义摘要截断，完整词义留在单日详情页

---

## 4. 开发任务清单（待执行）

- [ ] 数据层：聚合 `wordle-daily.json` + `wordle-definitions.json`，build 时预计算统计指标
- [ ] 路由：新增 `/wordle-answers`（+ 评估 `/todays-wordle-answer`、`/yesterdays-wordle-answer` 独立页）
- [ ] 组件：工具区（搜索+排序+表格）、防剧透 tile、本周卡片、统计图、月度归档（虚拟化）、FAQ、Related
- [ ] SEO：metadata、四类 schema（SoftwareApplication/FAQPage/HowTo/Dataset）、内链
- [ ] sitemap：加入 `/wordle-answers`
- [ ] 性能验证：1800+ 行虚拟化、Lighthouse
