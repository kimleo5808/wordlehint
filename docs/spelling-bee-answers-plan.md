# /spelling-bee-answers 需求文档（PRD）

> 新增页面：**NYT Spelling Bee 每日答案页**（后续扩展 hints 独立页）
> 状态：Phase 0–2 已完成（2026-07-21）——数据管线 + 933 期回填 + 主页面 + 归档页 + sitemap/导航/OG 全部上线待部署；Phase 3 剩 Search Console 提交与上线后观察；P1 hints 独立页未启动
> 日期：2026-07-21
> 前置调研：pinpointanswer.today 结构解析 + 4 家 Spelling Bee 竞对实测

---

## 1. 背景与目标

- **核心关键词**：`spelling bee answers today`、`nyt spelling bee answers`（次级：`spelling bee pangram today`、`spelling bee genius score`、`spelling bee answers yesterday`）
- **机会依据**：word.tips / wordfinder.yourdictionary.com 均重点运营此词且流量可观；nytbee.com 单靠此游戏支撑整站。NYT 存在公开 JSON 端点，与我们现有 Wordle/Connections/Strands 管线完全同构，边际成本极低。
- **目标**：上线 3 个月内让 `/spelling-bee-answers` 进入 answers 长尾词前 20，并与现有三游戏 hint 页互链形成「NYT 全家桶」主题权威度。

## 2. 竞对调研结论（已实测核实）

| 竞对 | 强项 | 弱点（我们的机会） |
|---|---|---|
| nytbee.com | 域名精准、2019 至今归档、统计分析最深（词长分布、字母频率、percentile） | 设计老旧、全文明文剧透、无渐进 hints、移动端差 |
| sbsolver.com | 信息架构最全（hints/answers/yesterday/archive/词页分离）、剧透粒度控制最细、grid + two-letter list 复刻官方格式 | Bootstrap 3 老 UI、术语门槛高 |
| word.tips | 域名权重高、板块齐全（段位表/FAQ/How to Play）、solver 导流顺滑 | 无归档护城河、无统计、无剧透保护、hints 意图弱 |
| wordfinder.yourdictionary.com | 权重极高、首屏三数字（词数/总分/Genius 线）模式好 | 单页薄、无归档、无 hints、意图覆盖窄 |

**四大共识格式**（必须遵守）：答案按词长分组、pangram 单独高亮成块、首屏给统计摘要、附段位分数表。
**全网空位**（差异化点）：
1. hints 与 answers 分离的独立页，大站没有一家做（与 WordleHint 品牌完全同构）；
2. 现代 UI 的分级剧透遮罩（大站全是明文剧透）；
3. `genius score today` 意图几乎无人独立覆盖（可由数据实时计算）；
4. 大站没有日期归档长尾页（我们管线现成）。

## 3. 数据管线（已验证）

- **端点**：`https://www.nytimes.com/svc/spelling-bee/v1/{YYYY-MM-DD}.json`（实测 200，免登录，历史日期可取 → 可回填归档）
  - 返回：`{ id, center_letter, outer_letters(字符串), pangrams[], answers[](不含 pangram，需合并), print_date, editor }`
- **兜底**：`nytimes.com/puzzles/spelling-bee` 页面内嵌 `window.gameData`（含 today + yesterday）
- **派生字段（写入时计算）**：每词分数（4 字母=1 分；≥5 字母=词长；pangram 额外 +7）、总词数、总分、Genius 线（总分×70% 取整）、各段位分数（Beginner 0% → Queen Bee 100%）、是否 bingo（每个首字母都有 ≥1 词）、按词长分组统计。
- **文件**：`scripts/update-spelling-bee.mjs` + `scripts/seed-spelling-bee.mjs`（回填）→ `data/spelling-bee-daily.json` → `lib/spelling-bee-daily.ts`（API 镜像 Connections：`getTodaySpellingBee()`、`getYesterday…`、`getRecent…(n)`、`get…ByDate()`、`getArchive…()`、`get…Stats()`）
- **cron**：挂入 `.github/workflows/deploy-cloudflare.yml`，与 Connections/Strands 同级（`continue-on-error: true`）。日期统一用 `getTodayDateString()`（America/New_York）。

## 4. 路由规划

| 路由 | 意图 | 阶段 |
|---|---|---|
| `/spelling-bee-answers` | answers today 主着陆页（本文档主体） | P0 |
| `/spelling-bee-answers/[date]` | 日期归档长尾页 | P0 |
| `/spelling-bee-hints-today` | 渐进式 hints 独立页（差异化主打） | P1 |
| yesterday 区块并入主页锚点（暂不独立成页，观察搜索表现后再拆） | answers yesterday | P0（锚点）|

## 5. 内容方案（Backlinko 方法论）

### 5.1 Meta 与关键词控制

- **Meta title**（≤60 字符）：`NYT Spelling Bee Answers Today - Pangram & All Words`
- **Meta description**（≤155 字符）：`Today's NYT Spelling Bee answers, updated daily at 3 AM ET: every word, the pangram, total points, and the Genius score cutoff. Spoiler-safe reveal.`
- **H1**：`Today's NYT Spelling Bee Answers — [Month Day, Year]`（日期动态）
- **正文字数**：≥1500 词（不含答案词表本身），目标 1600–1800
- **核心词密度**：`spelling bee answers` 词族出现 1–3%（1600 词 ≈ 16–48 次，写作目标 ~25 次，自然分布于 H 标签与段落首句；同义变体 `today's spelling bee`、`NYT Spelling Bee solution` 穿插防堆砌）

### 5.2 页面 H 标签大纲（含字数预算）

结构原则（参考 pinpointanswer.today）：**核心答案区置顶，SEO 内容全部下沉**。

```
H1 Today's NYT Spelling Bee Answers — July 21, 2026        [首屏，含 <time>]
  （首屏组件区：字母蜂巢 + 三数字统计 + 剧透揭示，见 UI 方案）
H2 Today's Spelling Bee Pangram (July 21)                  [~120 词 + pangram 卡片，默认遮罩]
H2 All Spelling Bee Answers for Today                       [~100 词引导 + 按词长分组答案卡]
  H3 9-Letter Words / 8-Letter … 4-Letter Words             [各组卡片，动态生成]
H2 Today's Genius Score & Rank Table                        [~180 词]
  H3 How Many Points Do You Need for Genius Today?          [直接给数字，GEO 引用块]
  H3 Full Rank Table (Beginner → Queen Bee)                 [动态分数表格]
H2 Yesterday's Spelling Bee Answers                         [~80 词 + 折叠词表，锚点 #yesterday]
H2 How Spelling Bee Scoring Works                           [~250 词]
  H3 Word Length & Point Values                             [小表格]
  H3 What Is a Pangram?                                     [一句话定义块（GEO 可引用）]
  H3 What Counts as Bingo?
H2 How to Get Better at Spelling Bee                        [~300 词]
  H3 Start With Common Prefixes and Suffixes
  H3 Hunt the Pangram First
  H3 Letters You'll Never See                               [S 结尾梗、无 S 规则]
    H4 Why There's No Letter "S" in Spelling Bee            [长尾 FAQ 意图]
    H4 Words the Dictionary Allows but NYT Rejects
H2 Frequently Asked Questions                               [6–8 问，~400 词，平铺卡片非手风琴]
H2 More NYT Puzzle Answers & Hints                          [Related 卡片：Wordle/Connections/Strands hint 页 + unlimited 页]
```

### 5.3 FAQ（覆盖六大原型，每答 2–4 句 + 内链）

1. What time do new Spelling Bee answers come out?（3:00 AM ET，与我们 cron 对齐说明"updated daily"）
2. How many points do you need for Genius?（动态数字 + 70% 规则）
3. What is today's pangram?（引导至锚点，防直接剧透）
4. Is this site affiliated with the NYT?（免责声明，学 pinpoint fan-made 声明）
5. Can I see past Spelling Bee answers?（→ 归档页内链）
6. Why doesn't Spelling Bee accept my word?（词典口径）
7. What does Queen Bee mean?（满分概念）
8. Does Spelling Bee ever use the letter S?（长尾精选摘要）

### 5.4 结构化数据（复用 `lib/jsonld.tsx`）

- `WebPage` + `dateModified`（每日刷新）+ `mainEntity: Question`（"What are today's Spelling Bee answers?" → acceptedAnswer 含 pangram 与总词数——**答案对爬虫可见、对用户遮罩**，pinpoint 模式）
- `FAQPage`（与 5.3 完全一致）
- `ItemList`（最近 20 期归档 URL，喂爬虫）
- 面包屑 `BreadcrumbList`（pinpoint 没做，我们补上）

### 5.5 内链方案

| 位置 | 链接 | 锚文本 |
|---|---|---|
| 首屏下方 | `/wordle-hint-today` | today's Wordle hints |
| Rank 表下 | `/spelling-bee-answers/[yesterday]` | yesterday's full answer list |
| 策略区 | `/best-wordle-starting-words` | best Wordle starting words |
| FAQ #5 | 归档页 | Spelling Bee answer archive |
| Related 区 | `/connections-hint-today`、`/strands-hint-today`、`/wordle-unlimited` | 对应描述性锚文本 |
| 全站 | Header「NYT Games」下拉 + 三个 hint 页的 Related 模块回链本页 | NYT Spelling Bee answers |

### 5.6 GEO 检查清单

- [x] ≥3 个可引用统计（今日总分/词数/Genius 线，均为独有实时数据）
- [x] 一句话定义块（What Is a Pangram）
- [x] FAQ 直接 Q→A 格式
- [x] 页底作者/更新说明（"Updated daily at 3 AM ET by WordleHint" + dateModified）
- [x] WebPage + FAQPage + ItemList + Breadcrumb schema

## 6. UI 设计方案（frontend-design）

### 6.1 美学方向：**「蜂蜜琥珀」暖色卡片系统**

站内首个以 `wordle-present` 黄为主色的页面——Spelling Bee 官方就是黄色，品牌天然契合，且与 Wordle 页（绿）、Connections 页（四色）形成游戏色区分。方向：**明快、蜂巢几何、克制的琥珀渐变**，不做紫渐变、不做 AI 味通用卡。

- **主色**：amber/honey 系（`#F7DA21` NYT 蜂黄 → `amber-400/500`），文字对比用深炭色；深色模式下蜂黄降饱和为 `amber-300` 点缀
- **背景纹理**：SEO 内容区用极淡的六边形网格纹理（CSS 重复渐变实现，学 pinpoint 的 `bg-grid-pattern` 但改六边形），营造蜂巢氛围
- **字体**：沿用站点现有字体体系（保持全站一致，不引入新字体）；数字统计用 tabular-nums 加粗大号
- **圆角/阴影**：卡片 `rounded-xl`，蜂黄描边 hover 时加深 + `scale-[1.02]`

### 6.2 页面结构（核心置顶、SEO 下沉）

```
① Hero（首屏）
   H1 + <time> 日期 + "Updated daily at 3 AM ET" 徽章
   左：CSS 蜂巢（7 个六边形，中心字母金黄高亮，外圈 6 字母）—— clip-path 实现，无图片
   右：三数字统计卡横排 [今日词数] [总分] [Genius 分数线]（Genius 卡用皇冠图标突出）
   CTA：「Reveal Today's Answers ↓」滚动锚点按钮（脉冲动画）+「Play on NYT」外链(nofollow)
② Pangram 卡（默认遮罩）
   金色渐变边框大卡，内容模糊 + 「Tap to reveal pangram」按钮；揭示后逐字母翻转入场
③ 答案词表区（卡片式，核心需求）
   按词长分组：每组一个 H3 + 词卡网格（grid 2/3/4 列响应式）
   词卡 = 圆角小卡：单词 + 右上角分值角标；pangram 词卡用金色底特殊样式
   组级遮罩：每组默认磨砂模糊，组标题旁「Show 9-letter words (3)」逐组揭示；顶部提供「Reveal all」
   （剧透粒度学 sbsolver，交互现代化——这是对四大站明文剧透的差异化）
④ Rank 段位表：横向进度条样式（Beginner→Queen Bee 9 档，当日分数刻度），今日 Genius 数字高亮
⑤ Yesterday 折叠区（默认收起，锚点 #yesterday）
⑥ SEO 内容区（bg 六边形淡纹理）：计分规则/策略/FAQ——FAQ 平铺双列卡片（利收录，配 FAQPage schema）
⑦ Related NYT Games 卡片行 → Footer
```

### 6.3 关键组件清单

`components/spelling-bee/`：`SpellingBeeHive`（蜂巢字母图）、`StatsTrio`（三数字卡）、`PangramCard`（遮罩揭示卡）、`AnswerGroup`（词长分组 + 组级遮罩）、`WordCard`（词卡+分值角标）、`RankTable`（段位进度条）、`YesterdayFold`、`RevealButton`（埋点 + 脉冲）。
遮罩状态用组件本地 state 即可（无需 zustand）；answers 文本 SSR 渲染在 DOM 中仅以 CSS 模糊遮罩（禁 JS 用户可读，优于 pinpoint 的纯 JS 揭示，也保证爬虫可见）。

### 6.4 工程细节（学 pinpoint 优点、避其缺点）

- 广告位（如启用 AdSense）固定 `min-height` 防 CLS，且**不插在 Hero 与答案区之间**
- 深色模式全兼容（站点现有 next-themes 体系）
- 移动端：蜂巢缩小置于 H1 下方，统计卡 3 列不换行，词卡 2 列
- 不做：手风琴 FAQ、纯 JS 才能读的答案、标题里塞满线索的冗长 H3

## 7. Todolist

### Phase 0 — 数据层
- [ ] `scripts/update-spelling-bee.mjs`：抓 v1 端点，合并 pangrams 进词表并标记，计算派生字段（分数/Genius/bingo/分组），幂等追加到 `data/spelling-bee-daily.json`
- [ ] `scripts/seed-spelling-bee.mjs`：从 2024-01-01 起回填历史（限速 + 404 容错，参考 `backfill-strands.mjs`）
- [ ] `types/spelling-bee.ts` 类型定义
- [ ] `lib/spelling-bee-daily.ts` 读取层（镜像 connections-daily API + `getRankTable()` 计算函数）
- [ ] `package.json` 加 `seed:spelling-bee` / `update:spelling-bee`；挂入 `deploy-cloudflare.yml`（continue-on-error）
- [ ] 单测/冒烟：跑一次 update 验证 JSON 结构与分数计算（对照 2026-07-20 实测：36+2 词 / 136 分 / Genius 95）

### Phase 1 — 主页面 `/spelling-bee-answers`
- [ ] 路由 `app/[locale]/spelling-bee-answers/page.tsx`（SSG + 每日 revalidate 策略与 hint 页一致）
- [ ] `components/spelling-bee/` 全组件（见 6.3）
- [ ] `data/spelling-bee/content.ts` 页面文案（按 5.2 大纲写满 ≥1500 词，写完后跑密度检查 1–3%）
- [ ] JSON-LD：WebPage+Question / FAQPage / ItemList / Breadcrumb（`lib/jsonld.tsx` 扩展）
- [ ] metadata（5.1）+ OG 图（`scripts/generate-og-images.mjs` 加蜂黄模板）
- [ ] 内链落位（5.5）：Header 导航、三个 hint 页 Related 模块回链、footer

### Phase 2 — 归档长尾
- [ ] `app/[locale]/spelling-bee-answers/[date]/page.tsx`（generateStaticParams 全量历史，模板复用主页面组件，H1 含日期）
- [ ] `lib/sitemap.ts` 注册主页面 + 归档 URL
- [ ] 主页面「Recent answers」8 卡归档网格 + footer 近 10 期链接（pinpoint 三层内链矩阵）

### Phase 3 — 验证与上线
- [ ] `pnpm build` 通过；本地 preview 核对遮罩交互 / 深色模式 / 移动端
- [ ] 密度与字数复核（脚本统计核心词族出现率）
- [ ] Search Console 提交 sitemap；上线一周后检查收录与 CWV
- [ ] 观察数据后决策：P1 的 `/spelling-bee-hints-today` 独立 hints 页（差异化主打，另立文档）

### 明确不做（本期）
- Spelling Bee Unlimited 玩法页（第二梯队另立项）
- solver 工具页、单词释义页（后续视流量决定）
