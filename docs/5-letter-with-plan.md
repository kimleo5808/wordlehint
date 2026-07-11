# `/5-letter-words/with-{a–z}` 「包含某字母」词表页 — 方案

> 状态：✅ 已交付（2026-07-11），构建通过（404 页）+ sync 绿灯。全 26 spoke + 1 hub 上线。
> 制定日期：2026-07-11
> 所属规划：WordleHint 词表 SEO 扩页 · 「起始 / 结尾 / **包含**」三件套之第三件
> 前置：`/5-letter-words/starting-with-*`（已交付）、`/5-letter-words/ending-with-*`（已交付，26 全）

---

## 0. 目标与定位

补齐 5 字母词表的第三种搜索意图：**词中任意位置包含某字母**（≠ 以它开头 / 结尾）。

- 规模：**26 个 spoke + 1 个 sub-hub**。
- 性质：**Utility-Content 混合页**——list-first（词表即工具）+ 支撑内容排名。
- 差异化 unique asset：**"黄字母"角度**（Wordle 里"字母在词里但不知位置" = present/黄格），竞品的 contains 页都只做"起始/结尾/包含"的机械三套，没人从黄字母逻辑 + 位置分布 + 历史答案切入。
- 落地策略：**完整复用现有 `EndingListPage` 系统**，仅换内容角度与主强调色（绿→黄）。

### URL 架构（与现有簇融合）
```
/5-letter-words                          主hub（现有，兼"按起始字母"）
├── /5-letter-words/starting-with-{a-z}   现有 26 spokes
├── /5-letter-words/ending-with           现有 结尾 sub-hub
│     └── /ending-with-{a-z}              现有 26 spokes
└── /5-letter-words/with                  ★新增 包含 sub-hub
      └── /with-{a-z}                      ★新增 26 spokes
```
slug 扁平、小写连字符、无年份；`/with-a` 精准匹配 "5 letter words with a" 高量长尾。

---

## 1. 关键词与搜索意图地图

| 层级 | URL | 主关键词 | 意图 |
|---|---|---|---|
| Sub-hub | `/5-letter-words/with` | "5 letter words containing", "…with these letters" | 导航/浏览 |
| Spoke ×26 | `/5-letter-words/with-{L}` | "5 letter words with **{L}**", "…containing **{L}**", "…that have **{L}**" | 长尾工具意图 |

**每个 spoke 的变体词**（写入正文/H2/FAQ，供 Google + LLM 抓取）：
- `5 letter words with {L}` / `containing {L}` / `that have {L}` / `with the letter {L}` / `with {L} in them`
- 位置变体（下沉为页内 H3，**不单独建页**）：`{L} in the middle`、`{L} as the 2nd/3rd/4th letter`

---

## 2. 内链矩阵（严格执行）

- **主 hub `/5-letter-words`**：hero 区新增第三入口卡「Browse by Contained Letter →」→ `/with`（与 Starting/Ending 并列）。
- **sub-hub `/with`**：面包屑 up 主 hub；A–Z 网格 down 26 spoke；lateral「See also: 按结尾字母」→ `/ending-with`；down `/wordle-solver`。
- **每个 `/with-{L}` spoke**：
  - 面包屑：`Home › 5 Letter Words › Contains › Words with {L}`
  - lateral：同族 2 个兄弟（如 with-A ↔ with-E ↔ with-S）
  - **同字母三页交叉链**：`with-{L}` ↔ `starting-with-{L}` ↔ `ending-with-{L}`（内链金矿）
  - down：`/wordle-solver`、`/wordle-hint-today`
- **锚文本轮换**：禁止 26 条都 "5 letter words with A"；用 "words containing A" / "A anywhere in the word" / "find A words" 等变体。

---

## 3. 页面内容模型（复用现有模板 + 换角度）

| 区块 | 内容（{L}=字母，{N}/{COMMON}/{ANSWERED} 渲染填充） |
|---|---|
| Hero + 统计 | H1 "5 Letter Words With {L}"；3 张 StatCard；黄 tile；**游移黄格**动画 |
| Intro | 事实句 + "yellow {L} means {L} is in the word but not in that spot" |
| ⭐Best openers | 优先"含{L}且其余高频、去重"的强开局词——**竞品无此角度** |
| ⭐Position map | "{L} 通常在第几位"水平 5 段条——直接服务黄字母"该往哪猜" |
| 完整词表 | `WordGrid`，common 优先、历史答案打点；按 **{L} 所在位置** 分组折叠 |
| 历史答案 flagged | "{ANSWERED} words with {L} 已做过 Wordle 答案" → 链 `/wordle-answers`（独家数据） |
| 策略 | 3 段：黄字母含义 / 常见位置 / 结合灰字母收缩 |
| FAQ（schema） | 6–7 条 Q&A |
| Related + Author bio | 复用现有 |

---

## 4. 字数预算（核心：够用且每页真正独特，不堆字数）

> Backlinko 原则：**词表 + 位置数据本身就是 unique asset**，不追 3,500 词长文。质量基线 = 现有 `ending-with-x.ts`（正文约 900 词，逐字母手写）。

### 单个 spoke（编辑正文，不含词表本身）

| 区块 | 目标字数 | 独特性 |
|---|---|---|
| Hero subhead | 30–45 | 半独特（真实统计） |
| Intro | 90–130 | **逐字母重写** |
| Openers intro + 5× why | ≈ 215 | 2–3 个 why 独特 |
| Position map 说明 | 30–50 | 独特（位置分布） |
| 完整词表说明 | 40–60 | 模板可 |
| 历史答案文案 | 60–90 | 半独特 |
| 策略 3 段 | 240–300 | **逐字母重写** |
| FAQ 6–7 条 | 350–450 | **≥3 条独特**，余模板 |
| 零散标签 | ~50 | 模板 |
| **正文合计** | **≈ 900–1,300 词** | ＋ 数百个 on-page 词条（100% 独特） |

### 独特 vs 模板红线（26 页最大风险）
- **≥50% 正文逐字母真写**（intro / 策略 / 3+ FAQ / openers why），锚定该字母真实数据：元音/辅音、最常见位置、著名词、历史答案数、词量。
- 纯 token 替换（`{L}`/`{N}`）**仅限**标签、说明句、模板类 FAQ。

### Sub-hub `/with`
- **250–400 词**即可（导航页，允许薄版先占位）。

---

## 5. Meta / Schema / GEO

- **Spoke Title**：`5 Letter Words With {L} — Wordle List & Hints`（≤60）
- **Spoke Description**：`All {N} five-letter words containing {L}, sorted for Wordle — {COMMON} common answers first, positions mapped, past answers flagged, best openers to test a yellow {L}. Updated daily.`（渲染压 ≤155）
- **Sub-hub Title**：`5 Letter Words by Contained Letter — Wordle Lists`
- **Schema**（复用 `lib/jsonld.tsx`）：`BreadcrumbList` + `FAQPage` + `ItemList`（openers）；sub-hub 加 `CollectionPage`
- **GEO 信号**：每段一观点、Q&A 结构、加粗统计数字、明确定义句、内部历史答案数据 = 可引用性 ↑

---

## 6. UI 设计方案（"游移黄格 / The Roaming Yellow Tile"）

**记忆点**：一个黄色字母格在 5 格里左右游移的动画母题，一眼区分于绿色的 starting/ending。不新造美学，仅把主强调色绿→黄。

| 维度 | 处理 |
|---|---|
| 字体 | 不变 |
| 配色 | 主强调 `wordle-correct`(绿) → `wordle-present`(黄)，hover amber `#E65100`；绿留作次要点缀 |
| 组件 | 复用 `Tile`/`TileWord`/`TilePattern`/`WordGrid`/`StatCard`/`SectionHeading` |
| 骨架 | 完全沿用 `EndingListPage` 分区与间距 |

**差异化机制**：
- Hero pattern cue：5 格中 1 个黄格，CSS keyframes 每 ~1.5s 平移到下一格（`prefers-reduced-motion` 时静止 + "?" 角标）。
- 词表高亮：`WordGrid` 把词中 `{L}` 所有出现位置渲染为黄格。
- 历史答案卡本就是黄框系（`border-wordle-present/40`），天然契合、几乎零改。

**Sub-hub**：沿用 `ending-with` hub 骨架；A–Z 网格用黄边框黄字（与 ending 的绿网格并列即区分）；全 26 字母 live（无 J/Q/V 灰显问题）；tools 区互链 Starting/Ending 两 hub 成三件套。

**响应式/暗色/a11y**：完全继承现有 CSS 变量与断点；黄态明暗均已验证；游移动画 `aria-hidden`，黄格加 `aria-label`。

---

## 7. 待建 / 待扩清单（实现阶段）

**复用不动**：页面骨架、StatCard、SectionHeading、WordGrid、历史答案卡、FAQ、Related、Bio、schema helper。

**需新建 / 扩展**：
1. `lib/word-bank.ts`：基于已有 `containing()` 扩展 `containingDecorated(letter)`、`groupByPosition(letter)`、`positionStats(letter)`
2. `TileWord` / `WordGrid`：新增 `highlightLetter` prop（高亮任意位置的目标字母为黄）
3. 新组件 `components/word-bank/PositionMap.tsx`（"{L} 位置分布"水平 5 段条）
4. 新组件 `components/word-bank/ContainsListPage.tsx`（或给 `EndingListPage` 加 mode）
5. 26 个 `data/word-bank/with-{a-z}.ts` 文案文件（对齐字数预算 + ≥50% 独特红线）
6. 新策略插图 `public/illustrations/solve-strategy-board-present.svg`（黄格跳位）
7. hero 游移黄格 CSS keyframes
8. `lib/sitemap.ts`：加 `wordListContainsLetters` 数组（26）+ `/with` hub
9. `check-word-bank-sync.mjs`：把 contains 一路纳入四处同步校验

---

## 8. 发布顺序

1. sub-hub `/5-letter-words/with`（可 300 词薄版先占位）
2. **首批 6 高量字母全量手写打样**：`with-a / with-e / with-s / with-r / with-o / with-t`（验证转化）
3. 其余 20 字母（每个仍过 "≥50% 独特" 关，宁慢不灌水）
4. 主 hub 加第三入口卡 + 同字母三页交叉链扫尾
5. 构建通过 + 浏览器验证 + `check-word-bank-sync.mjs` 绿灯
