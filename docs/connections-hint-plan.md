# `/connections-hint-today` 每日页 — 第三期方案

> 状态：✅ 已交付（2026-06-05），构建通过 + 浏览器验证
> 制定日期：2026-06-05
> 所属规划：WordleHint 高质量扩页路线 · 第三期（横向扩品类 NYT Connections）

## 已交付

| 文件 | 作用 |
|------|------|
| `types/connections.ts` | 类型定义 |
| `scripts/seed-connections.mjs` | 从 Eyefyre 镜像回填全历史（索引=难度level，绕过-1脏数据） |
| `scripts/update-connections.mjs` | NYT V2 每日更新（镜像 update-wordle） |
| `data/connections-daily.json` | 已 seed **1085 期**（2023-06-12→今日），含编号/编辑/四组 |
| `lib/connections-daily.ts` | 读取API + LEVEL_META四色 + firstLetterHint |
| `data/connections/content.ts` | meta/定义块/四色/策略/对比/8FAQ/HowTo |
| `components/connections/{colors,StagedHints,AnswerGrid,ColorLegend}.tsx` | 四色映射、三段揭示(client+cookie)、4×4答案网格、四色说明 |
| `app/[locale]/connections-hint-today/page.tsx` | 组装 + Article/HowTo/FAQPage/Breadcrumb schema + 降级UI |
| `lib/sitemap.ts` / `i18n/messages/en.json` | 路由(0.9,daily) + 导航"Connections" |
| `package.json` / deploy workflow | seed/update:connections scripts + CI每日更新+提交 |

**数据要点**：展示编号按日期算(#1090✅匹配竞品)；NYT的`id`是内部ID不用；Eyefyre在2025-09-20(V1下线)后level变-1，故统一用**数组索引=难度**(已验证831个好条目均按0-3排序)；本地沙箱node fetch失败用curl下载转换，CI正常。

**实测**：黄组三段揭示 B·F·O·W→"ASSOCIATED WITH HANSEL AND GRETEL"→词块；四色卡(黄绿蓝紫)身份清晰；今日答案网格 SpoilerCurtain 四色模糊+揭示；编号/编辑/导航/内容外壳正常，无控制台错误。`pnpm build` 通过(300静态页)。

---

## 原始方案（存档）

## 数据源（已验证可用）

- **NYT V2 接口**：`https://www.nytimes.com/svc/connections/v2/YYYY-MM-DD.json` → `{print_date, id(内部), editor, categories:[{title, cards:[{content, position}]}]}`。每日更新。
- **Eyefyre 镜像**（完整历史回填，2023-06-12起）：`https://raw.githubusercontent.com/Eyefyre/NYT-Connections-Answers/main/connections.json` → `[{id, date, answers:[{level(0-3), group, members[4]}]}]`。
- **展示编号**：按日期算 = days_since(2023-06-12)+1（2026-06-05=#1090，匹配竞品）。NYT 的 `id` 是内部 ID，不用。
- **难度色**：level 0黄(易)/1绿/2蓝/3紫(难)。NYT V2 categories 数组顺序=难度顺序；Eyefyre 有显式 level。
- **Tier1 线索**：NYT 只给类别名，"线索"用每词首字母自动生成（first-letter hint，不剧透主题）。

## 内容方案（Backlinko AUTHORITY，≥3,000字）

- 主词 connections hint today；次 nyt connections hints/answer today/connections today
- Meta title：`Connections Hint Today — Clues & Answer`
- H1：`Connections Hint Today — [Weekday, Month D]`(动态)
- 副标题含 `#1090 · Editor Wyna Liu`

三段式揭示：Tier1每词首字母→Tier2类别名→Tier3该组4词；顶部"Reveal all"总开关。

H2：①工具(首屏) ②How to Use(HowTo) ③Today's Answer(总揭示) ④What Is Connections(定义块) ⑤四色说明 ⑥How to Solve策略 ⑦Connections vs Wordle(对比表+跨品类内链) ⑧FAQ(8) ⑨More Daily Puzzle Help

差异化：竞品缺编号+编辑，我们都有 + 强防剧透 + 跨品类内链回 Wordle。

Schema：Article + HowTo + FAQPage + Breadcrumb
内链：/wordle-hint-today、/wordle-answers、/wordle-solver、/best-wordle-starting-words

## UI 方案（Ledger家族 + 四色身份）

- 四色：yellow-400/green-500/blue-500/purple-500（+暗色适配），每组卡用对应色强标识 + 难度标签。
- 三段式揭示卡(client)：每级默认███隐藏，逐级揭示按钮，cookie按日期记忆；顶部Reveal all。
- 今日答案总揭示：SpoilerCurtain(内联模糊)包 4×4 彩色答案网格。
- 四色说明卡 + 内容外壳(复用 AnswersFAQ/RelatedTools/定义块/对比表/slate hero)。
- 动效:opacity过渡(filter失效用内联style)；答案网格staggered fade。移动端纵向堆叠。

## 开发任务

- [ ] 类型 `types/connections.ts`
- [ ] 脚本 `scripts/seed-connections.mjs`(从Eyefyre回填) + `scripts/update-connections.mjs`(NYT每日)
- [ ] 数据 `data/connections-daily.json`(seed)
- [ ] lib `lib/connections-daily.ts`(getToday/getByDate/编号/首字母线索)
- [ ] 内容 `data/connections/content.ts`(meta/H2/FAQ/四色/对比)
- [ ] 组件 `components/connections/*`(StagedHintCard client, AnswerGrid, ColorLegend)
- [ ] 页面 `app/[locale]/connections-hint-today/page.tsx` + schema + 内链(降级UI)
- [ ] sitemap + 导航 + deploy workflow 加 update:connections + package.json scripts
- [ ] 构建验证 + 浏览器实测三段式/防剧透
