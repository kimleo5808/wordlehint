# /spelling-bee-hints-today 需求文档（PRD）

> 独立渐进式提示页，与已上线的 /spelling-bee-answers 分工（hints=给渔，answers=给鱼）
> 状态：已完成（2026-07-21）——全部 todolist 落地，构建通过（1505 词 / 密度 1.86% / tsc 通过）；待 commit 部署
> 竞对调研：sbsolver/hints、sbhinter、spellingbeebuddy、beesolver、sbhints.com、NYT 官方 Forum 专栏（详见会话报告）

## 1. 目标与关键词

- **核心词**：`spelling bee hints today`、`nyt spelling bee hints`（SERP 现任第一 sbsolver 连 H1/FAQ/schema 都没有，技术面可赢）
- **次级词**：`spelling bee grid`、`spelling bee two letter list`、`spelling bee pangram hint`
- 正文 ≥1500 词，核心词族密度 1–3%

## 2. 必须遵守的格式惯例（老玩家心智模型，源自 NYT Forum）

1. 头部三件套：Words / Points / Pangrams（+ Genius 门槛）
2. **Grid**：行=实际出现的首字母（中心字母加粗）、列=实际出现的词长、空格 `-`、行/列合计 + 右下总数
3. **Two-Letter List**：按首字母分行分组，`FA × 4  FI × 7` 体例全站一致
4. 提示力度自上而下由轻到重；重层默认折叠
5. pangram 在 hints 页最多给到首字母/线索级，全词归 answers 页

## 3. 提示分层（L0→L5）

| 层 | 默认 | 内容 |
|---|---|---|
| L0 | 可见 | 蜂巢 + Words/Points/Pangrams/Genius + 一句话难度评语（规则生成：F 开头 17 词、有 10 字母长词等） |
| L1 | 可见 | 词长分布 chips |
| L2 | 可见 | 首字母×词长 Grid（惯例格式，老玩家第一诉求，不折叠） |
| L3 | 折叠 | Two-Letter List + 怎么读的说明 |
| L4 | 逐级点击 | Pangram 渐进：词长 → 首字母 → 释义线索 → 全词（末级=醒目链去 answers 页 + 本地 spoiler） |
| L5 | 每词点击 | **逐词线索（全网无人做的差异化）**：`F _ _ _ (4)` 掩码 + 词典释义线索（复用 Free Dictionary 管线），按词长分组，点击露全词 |
| L6 | 不在本页 | CTA → /spelling-bee-answers；answers 页回链本页 |

## 4. 数据

- 复用 `data/spelling-bee-daily.json` + `lib/spelling-bee-daily.ts`（grid/two-letter/难度评语均纯计算，新增 `lib/spelling-bee-hints.ts`）
- **新增** `scripts/generate-bee-definitions.mjs` → `data/spelling-bee-definitions.json`：镜像 generate-definitions.mjs，抓最近 3 天词表的 Free Dictionary 释义（增量缓存），挂入 CI 定义生成步骤之后；无释义的词回退为纯掩码线索
- 释义做线索时截断首句并**过滤掉包含目标词本身的释义**（防自引剧透）

## 5. SEO/结构

- H1 `NYT Spelling Bee Hints Today — [日期]`；每层一个 H2；正文含 How to read the grid / two-letter list / 策略 / FAQ（6+ 问，含 "how do I read the hints grid" / "what is the two-letter list"）
- Article + FAQPage + Breadcrumb JSON-LD；`Updated daily at 3 AM ET` 标注
- 互链：answers 页 Hero 与 pangram 区加「只要提示不要剧透 →」入口；hints 页 L4/L6 链回 answers；Header「Spelling Bee」菜单加 Today's Hints；sitemap priority 0.95（对齐 wordle-hint-today）
- UI 沿用 answers 页蜂蜜琥珀设计语言（同一 SpellingBeeHive/StatsTrio 组件），grid 用等宽字体表格

## 6. Todolist

- [ ] `scripts/generate-bee-definitions.mjs` + 本地跑一次今日词 + 挂入 CI
- [ ] `lib/spelling-bee-hints.ts`（grid/twoLetter/难度评语/词线索）
- [ ] 组件：`HintsGrid`、`TwoLetterList`、`PangramHints`（分级客户端）、`WordClueList`（逐词客户端）
- [ ] `data/spelling-bee/hints-content.ts`（≥1500 词，密度 1–3%）
- [ ] `app/[locale]/spelling-bee-hints-today/page.tsx`
- [ ] sitemap / 导航 / answers 互链 / OG 图 / CLAUDE.md
- [ ] tsc + build + 密度复核
