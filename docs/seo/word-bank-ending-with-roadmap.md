# Word-Bank「ending-with」板块 — 需求与交接文档

> 最后更新：2026-06-24 ｜ 维护：WordleHint
> 用途：记录 ending-with 板块的现状、架构、扩展步骤，供下次直接接续。
> 相关蓝图：[`ending-with-e-blueprint.md`](./ending-with-e-blueprint.md) ｜ [`ending-with-e-ui-spec.md`](./ending-with-e-ui-spec.md)

---

## 1. 背景与目标

在已完成的 `/5-letter-words` starting-with A–Z 板块基础上，扩展**按尾字母**检索的词表页，吃下「5 letter words ending in X」这一高搜索量、Wordle 强相关的关键词簇。

**差异化定位（打竞品空白）：** 唯一同时具备 ①完整词表 ②内联释义 ③Wordle 答案分层 ④按倒数第二字母（第 4 字母）导航 ⑤诚实策略 的页面。竞品要么是大而空的词表（word.tips、dictionary.com），要么是单薄的 Wordle 短文（tryhardguides、mentalfloss）。

**纪律（来自既定工作流，务必遵守）：**
- 每页单独手工打磨，**严禁批量/程序化生成**。
- 每个新页面顺序：10 竞品研究 → backlinko-seo 蓝图（正文 ≥1500 词）→ frontend-design UI → 按需 SVG → 批准后写码。
- 保持 Wordle-first，不扩到 Scrabble/WWF。

---

## 2. 已完成

### 2026-06-24，commit `6549c8b`，已部署
- **Hub：** `/5-letter-words/ending-with`（A–Z 网格，`LIVE_ENDING`，其余「Coming soon」）
- **首个 spoke：** `/5-letter-words/ending-with-e`（1,739 词 / 424 常用 / 50 个曾作答案）
- 主 hub `/5-letter-words` 已加「Browse by Ending Letter」交叉卡片
- sitemap 已注册 hub + `wordListEndingLetters`

### 2026-06-24，ending-with-t（蓝图 `ending-with-t-blueprint.md` / `-ui-spec.md`，commit `559895c`）
- **第二个 spoke：** `/5-letter-words/ending-with-t`（795 词 / 253 常用 / 25 个曾作答案，topOpener=**LEAST**）
- 纯内容 + wrapper：`data/word-bank/ending-with-t.ts`、`app/[locale]/5-letter-words/ending-with-t/page.tsx`，**零新增组件 / 零新增 SVG**
- 注册：`LIVE_ENDING`、`wordListEndingLetters` 加 `t`
- `pnpm build` 已通过（统计/词表/面包屑/hub 链接均验证）
- ⚠️ 3 个常用词缺释义（CAPUT/DROIT/TIGHT）—— 本地沙箱无法访问 dictionaryapi.dev，待 CI/有网环境跑 `backfill-word-defs.mjs T` 补

### 2026-06-24，ending-with-y（蓝图 `ending-with-y-blueprint.md` / `-ui-spec.md`，commit `e0b69d8`）
- **第三个 spoke：** `/5-letter-words/ending-with-y`（**1,527 词 / 364 常用 / 40 个曾作答案**，最大的结尾桶，topOpener=**EARLY**）
- 纯内容 + wrapper，**零新增组件 / 零新增 SVG**
- 注册：`LIVE_ENDING`、`wordListEndingLetters` 加 `y`
- 独有策略角度：双字母陷阱（BELLY/PUPPY/FIZZY）+ 押韵家族（-LY/-TY/-DY/-RY/-KY/-NY）
- `pnpm build` 已通过（1,527/364/40、EARLY、ENTRY、家族词、hub 链接均验证）
- ⚠️ 7 个常用词缺释义（BONEY/EVERY/GAYLY/ICILY/MINTY/WARTY/ZESTY）—— 同上，待有网环境补

### 2026-06-24，ending-with-r（蓝图 `ending-with-r-blueprint.md` / `-ui-spec.md`）
- **第四个 spoke：** `/5-letter-words/ending-with-r`（737 词 / 212 常用 / 18 个曾作答案，topOpener=**LATER**）
- 纯内容 + wrapper，**零新增组件 / 零新增 SVG**
- 注册：`LIVE_ENDING = ["E", "T", "Y", "R"]`、`wordListEndingLetters = ['e', 't', 'y', 'r']`
- 核心洞察：`-ER` 家族占常用词约 66%（141/212）—— 策略「先假设 -ER、聚焦第 3 字母」；柱状图 ER 柱远超其余
- R 结尾开局词真正强（LATER=ALERT 异序词），诚实正面陈述
- `pnpm build` 已通过（737/212/18、LATER、MAKER、ER 簇、hub 链接均验证）
- ⚠️ 10 个常用词缺释义（含较常用的 THEIR/FEWER）—— 同上，待有网环境补

---

## 3. 架构（复用 = 不要重写）

### 数据/读层 `lib/word-bank.ts`
ending 专用助手（已加）：
- `endingWithDecorated(letter): BankWord[]`
- `groupByFourthLetter(letter): SuffixGroup[]` — 按第 4 字母分组，簇标签 `…SE/…LE/…TE`，常用词优先
- `endingLetterStats(letter): EndingLetterStats` — total/common/answered + `topPenultimateLetters`
- `answeredWordsEndingWith(letter): string[]`
- §6「by starting letter」复用已有的 `commonEndingWith(start, end, limit)`

### 组件
- `components/word-bank/EndingListPage.tsx` — fork 自 `LetterListPage`，**复用同一 `LetterContent` 接口**。与 starting 版的差异：H1/面包屑/策略文案改为「ending」；hero 把**最后一格**标绿；列表按倒数第二字母分组；§6 改为「by starting letter」。
- `tiles.tsx` 的 `TileWord`、`WordGrid.tsx` 已加**向后兼容**的 `highlightLast` prop（结尾页把最后一格标绿，不影响现有 26 个 starting 页）。
- 其余 `Tile/TilePattern/SectionHeading/StatCard/JsonLd/WordGrid` 原样复用。

### 内容
- `data/word-bank/ending-with-<x>.ts` 导出 `content: LetterContent`（openers/strategyParagraphs/faq/introExtra 等）。
- 词表/统计数据自动来自 `data/word-bank/5.json`，FAQ 里的 `{N}/{COMMON}/{ANSWERED}` 渲染时填充。

### 路由
- `app/[locale]/5-letter-words/ending-with/page.tsx`（hub）
- `app/[locale]/5-letter-words/ending-with-<x>/page.tsx`（3-行 wrapper，引 content + `EndingListPage`）

### 资源
- `public/illustrations/solve-strategy-board-end.svg`（绿格在最后一列，`currentColor` 适配深浅色）—— 所有 ending 页共用，不需每字母新建。

---

## 4. 下次继续：新增一个结尾字母的步骤清单

建议优先级顺序（按 Wordle 答案频率 + 搜索量）：~~T~~ ~~Y~~ ~~R~~（已完成）→ **A → N → D → H → K → L → O …**

每个字母按既定工作流走，**先研究+蓝图、批准后再写码**。写码阶段的机械步骤：

1. **查真实数据**：`node -e` 读 `data/word-bank/5.json` + `wordle-daily.json`，确认该尾字母的 total/common、倒数第二字母分布、曾作答案词，**据此**写 openers 与 strategy（不要凭记忆编词）。
2. **写内容** `data/word-bank/ending-with-<x>.ts`（参照 `ending-with-e.ts`）。注意 `topOpener` 必须是真实存在、以该字母结尾的强开局词；弱结尾字母要**诚实**说明（参考 starting 板块对 B/Q/X 等的处理方式）。
3. **加路由 wrapper** `app/[locale]/5-letter-words/ending-with-<x>/page.tsx`（复制 ending-with-e 改 import + metadata 关键词/标题）。
4. **注册**：
   - hub `LIVE_ENDING` 数组加该字母（`app/[locale]/5-letter-words/ending-with/page.tsx`）
   - `lib/sitemap.ts` 的 `wordListEndingLetters` 加该字母（小写）
5. **构建验证**：`pnpm build`，确认新路由生成、HTML 含正确统计与词表。
6. **提交推送**：commit 前先 `git pull --rebase origin main`（远程每天有 cron 的 puzzle JSON 提交，否则 push 会被拒）。

### 注意事项
- **释义**：E 结尾词的释义已覆盖；新字母如发现常用词缺释义，跑 `scripts/backfill-word-defs.mjs`（释义是按词不按位置，多数已有）。
- **诚实度**：openers/「best」标记要可被搜索验证；弱结尾字母不要硬吹。
- **X 结尾**：5 字母词极少以 X 结尾，可能不值得单独成页 —— 到时再评估。

---

## 5. 更长期（尚未规划，同模板/数据层已支持）

- `containing-*` spokes（「5 letter words with A and E」类长尾）—— 需要新的分组/筛选 UI，工作量比 ending 大。
- ending-with 全 26 字母补齐后，可做一个 ending hub 的「最常见尾字母」数据小节增强。
