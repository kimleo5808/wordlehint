# P1 需求文档：NYT Pips（数据管线 + 今日页 + 汇总页 + 日期页 + 玩法指南）

> 状态：数据管线 + 今日页 + 汇总页 + 日期页已实现，待验证与推送；玩法指南 `/how-to-play-pips` 下一步（2026-10-26）。上级方案：`docs/expansion-plan-2026-10.md`（8.3 节、第九节）。
> 流程：竞对细查 → backlinko 内容方案 → frontend-design UI 方案 → 本文档 → 确认后实现。
> 约束：不用 LLM、不用付费 API；提示由解答数据确定性推导；说明文字由我撰写；不加作者署名；日期页只从上线日起每天新增，不回填历史页。

## 1. 目标与范围

| 项目 | 内容 |
|---|---|
| 数据 | `data/pips-daily.json`：回填 2025-08-18（第 1 期）以来全部 434 天（每天 Easy / Medium / Hard 三盘），之后每天自动更新并预抓次日 |
| 新 URL | `/pips-hint-today`、`/pips-answers`、`/how-to-play-pips` 共 3 个页面；`/pips-answers/[date]` 从上线日起每天新增 1 页 |
| 不做（本期）| Pips Unlimited、求解器（P2 再议）；不为 434 个历史日期生成页面 |

## 2. 已核实的事实

**官方规则**：NYT 帮助中心 `help.nytimes.com/360011158491-New-York-Times-Games/pips`，以及游戏内文案：
- Number：“Dots in this region sum to N”
- Equal：“must all be the same number”
- Not Equal：“must all be different numbers”
- Less Than / Greater Than：“Dots must sum to less / more than this number”。注意是**整个区域的点数总和**，不是每一格分别比较；Mashable 就写错了。
- Empty：“No conditions apply.”

**其他规则**：本地午夜换题，三个难度同时更新；Pips 没有官方统计；第 1 期是 2025-08-18。

**数据接口**：`svc/pips/v1/{date}.json`，包含每个难度的骨牌、区域（类型 + 目标值）和解答，可以预抓次日。

**数据语义已验证**：骨牌 `dominoes[i]` 的两个点数，分别对应解答 `solution[i]` 的两个格子。用这个对应关系验证了全部 434 天的 12,586 条区域约束，**0 处违例**。

**全量统计（434 天 × 3 难度，本地实算）**：

| | Easy | Medium | Hard |
|---|---|---|---|
| 平均骨牌数（范围）| 4.9（3–10）| 7.4（4–13）| 13.2（6–16）|
| 平均区域数 | 6.0 | 8.3 | 14.7 |
| 至少有一个**单格求和区域**的棋盘 | 56% | 49% | **82%**（平均 4.3 个）|
| 有“全 0 / 全 6”求和区域的棋盘 | 25% | 23% | 67% |
| 区域类型构成 | 求和 39%、无约束 23%、相等 21%、大于 9%、小于 9% | 求和 35%、相等 22%、无约束 20%、大于 12%、小于 9%、不等 2% | 求和 56%、相等 17%、无约束 11%、大于 9%、小于 6%、不等 2% |

- 多格求和区域最常见的目标值是 **10（12.4%）**，其次是 6、8、4。
- 网上流传的编辑建议“11、12、17、18 很常见”，在我们的数据里这四个数合计只占 13.0%。指南里可以如实写出来，但要先按区域大小细分再下结论。
- 出题人：Rodolfo Kurchan（704 盘）、Ian Livengood（515 盘）、Heidi Erwin（83 盘）。

## 3. 竞对细查

| 对手 | 形态 | 空白 |
|---|---|---|
| Beebom（`/puzzle/nyt-pips-answers-today/` + 约 10 个配套页）| 最强：Hard 排在最前、主观难度“6/10”、交互式 HTML 棋盘、按行列描述放置位置；配套有规则、策略、归档、常见错误、Unlimited、求解器、换题时间等页 | 没有分步提示；没有数据统计 |
| bloxodes | 交互式解答棋盘（Place all / Remove all）；按日期页（noindex）| 没有提示 |
| Mashable | 每天一篇纯文字：每个区域的条件 + 放哪块骨牌 | 把小于 / 大于规则写成了“每一半” |
| Tom's Guide | 常青 URL；Easy、Medium 用解答截图；Hard 有未解截图 + 非正式文字思路 + 解答；提到难题可能有多个解 | 截图，无交互 |
| nerdschalk | 编号步骤图片，没有推理说明 | — |

**空白（我们要做的）**：
- 真正的分步提示阶梯：起点 → 起点那块骨牌 → 下一块 → 全解；
- 每一步都给出依据；
- 基于全量数据的统计与策略；
- 一字不差地使用 NYT 官方的规则措辞。

## 4. 分步提示的推导（确定性，不用 LLM）

每个难度的提示阶梯：

1. **起点**：选一个**单格求和区域**，例如“第 2 行第 3 列的格子必须是 4 点”。这是规则直接推出的事实，不依赖解答。Hard 有 82% 的棋盘至少有一个这样的区域。没有的话，退而选“全 0 / 全 6”的求和区域，再不行就选格数最多的“相等”区域。
2. **第一块骨牌**：覆盖起点格子的那块骨牌放在哪里（来自官方解答）。
3. **再揭示一半骨牌**：先揭示落在“限制最强的区域”里的骨牌。顺序规则是固定的：单格求和 > 极值求和 > 相等 > 小于 / 大于 > 其余。
4. **完整解答**：整盘画出来。

**说明**：难题有时不止一个解。我们展示的是 NYT 的官方解，第 2 到 4 步明确写“official solution”。第 1 步本身就是规则推出的必然事实，和有几个解无关。

**v2（可选，之后再做）**：写一个小型约束求解器，在构建时运行。用它推导真正的“被迫一步”顺序，并统计每盘有几个合法解。“这一盘是否唯一解”是对手都没有的数据。

## 5. 内容方案（backlinko）

### 5.1 `/pips-hint-today`
- **关键词**：`pips hints today`、`nyt pips answer today`、`pips hard solution`、`pips hints [date]`、`pips #[n]`。
- **Title**：`NYT Pips Hints & Answers Today — Easy, Medium, Hard`
- **H1**：`NYT Pips Hints Today — {Weekday, Month D, YYYY}`
- **H2**：Today's Boards（三个难度切换，**默认显示 Hard**，因为对手的数据显示求助主要集中在 Hard）· Step-by-Step Hints · Full Solutions · How the Rules Work（短）· Yesterday's Pips · FAQ
- **Schema**：`Article` + `HowTo`（提示步骤）+ `FAQPage` + `BreadcrumbList`。

### 5.2 `/pips-answers`（游戏枢纽 + 归档）
- **关键词**：`pips answers`、`nyt pips archive`。
- **H2**：
  - Latest Pips Puzzles：最近日期页的链接；
  - Browse Every Past Pips：一个**归档浏览器**。选择日期后，在客户端载入那一天的三盘解答。历史数据放在一个静态 JSON 里，不为每天单独建页；
  - Pips by the Numbers：精选统计；
  - FAQ。

### 5.3 `/pips-answers/[date]`（从上线日起）
- 和 Connections、Strands 日期页同一套结构：默认直接显示答案，可切换提示模式；本期数字（骨牌数、区域构成、单格区域数、出题人）；FAQ；前后导航。
- **Title**：`NYT Pips #{n} Answers — Easy, Medium, Hard ({Mon D, YYYY})`

### 5.4 `/how-to-play-pips`（指南）
- **关键词**：`how to play pips`、`pips rules`、`pips strategy`、`pips symbols meaning`。
- **H2**：
  - Pips Rules in 60 Seconds（NYT 原文措辞）
  - Every Region Type Explained（每种约束配一张我们自绘的 SVG 示意图）
  - Easy vs Medium vs Hard（真实数据：骨牌数、区域数）
  - 7 Strategies Backed by 434 Days of Puzzles（例如“先找单格求和区域：82% 的 Hard 盘至少有一个”“区域总和为 0 或 6×格数时整片都确定”“小于 / 大于比较的是整个区域的总和”）
  - Common Mistakes（包括 Mashable 那个错误）
  - Who Makes Pips（出题人）
  - FAQ
- **正文**：约 1,800–2,000 词，由我撰写。
- **Schema**：`HowTo` + `FAQPage` + `BreadcrumbList` + `Article`。

**GEO**（四页通用）：每一节的第一句直接回答问题；统计数字附口径（“434 天 × 3 难度，截至某日”）。
**内链**：四页互链；首页、跨游戏条（“Also on”）、换题时间页 → Pips。

## 6. UI 方案（frontend-design）

**设计方向：“桌面骨牌”**。棋盘用 SVG 自绘：骨牌有圆角、点数用圆点，不用数字。区域用浅色色块 + 角标约束符号（`=`、`≠`、`<8`、`>3`、`10`）。配色用站点自己的调色板，**不仿照 NYT 的视觉**（避免商业外观问题）。

**最让人记住的一点**：提示阶梯的每一步都会在棋盘上**高亮对应的格子**，并在旁边用一句话说明依据。比如第一步：高亮那个单格区域，写“This one-cell region says 4, so this square is a 4”。

- **今日页**：
  - 难度切换做成分段控件；
  - 棋盘 + 右侧提示阶梯（移动端改为棋盘在上、阶梯在下）；
  - “显示完整解答”按钮把所有骨牌依次放到棋盘上（渐入，遵守 `prefers-reduced-motion`）。
- **日期页**：默认显示完整解答，可切换到提示模式。沿用已有的 `DatePageHeader`、`AlsoOnStrip`、`FactCards`、`DatePageNav`。
- **指南页**：每种区域类型配一张小 SVG 示意图（构建时用 sharp 生成 PNG，作为正文配图；风格与站内已有配图一致）。
- **每期 OG 图**：难度标签 + 未解棋盘的轮廓（只有区域，没有骨牌），不剧透。在现有的 `generate-date-page-images.mjs` 里扩展。

## 7. 技术方案

- `scripts/update-pips.mjs`：用 `scripts/lib/daily-updater.mjs`（今天 + 明天）；`validate` 检查三个难度都在、骨牌数和解答数一致。
- `scripts/backfill-pips.mjs`：回填 434 天。文件约 1–1.5MB，可以接受。
- `lib/pips-daily.ts`：`released()` 过滤（本地午夜换题的游戏，和 Wordle 一样用美东日期作为站点的“今天”）；`lib/pips-hints.ts`：第 4 节的提示阶梯；`lib/pips-stats.ts`。
- 组件：`PipsBoard`（SVG）、`PipsHintLadder`（客户端）、`DifficultyTabs`。
- 路由：三个页面 + `[date]`（起始日写进 `data/date-pages.json`）；sitemap。
- CI：`deploy-cloudflare.yml` 增加 `update:pips` 步骤（`continue-on-error: true`）；`check-future-leak.mjs` 增加 `pips-daily.json`。
- 归档浏览器用的静态 JSON（`public/data/pips-archive.json`，只含今天之前的数据）构建时生成，纳入防泄露检查的内容扫描。
- 导航：在 header 和 footer 增加 Pips 入口；`AlsoOnStrip` 增加 Pips。

## 8. 对已收录页面的影响

- 新增 3 个 URL + 每天 1 个日期页。
- 现有页面只增加导航入口和“Also on”链接。

## 9. 上线顺序

1. 数据管线 + 回填，不上线页面。
2. `/pips-hint-today` + `/pips-answers` + 日期页（从上线日起），一次部署。
3. `/how-to-play-pips`。
4. 观察 2 周后再考虑 v2 求解器和 Unlimited。

## 10. Todolist

- [x] `update-pips.mjs`、`backfill-pips.mjs`（434 期，#1 → #434 无缺口）、`lib/pips-daily.ts`；CI 步骤；防泄露检查加入 Pips（并扫描归档 JSON 内容）；数据文件每期一行（约 940KB）
- [x] `lib/pips-hints.ts`（提示阶梯 + 单元核对：全部 1,302 盘 0 错误；Hard 82% 以单格区域起步）
- [x] `PipsBoardSvg` + `PipsHintLadder` + 难度切换（默认 Hard；第 4 步附“Solution as text”）
- [x] 今日页、汇总页（含按月加载的归档浏览器）、日期页；metadata 与 schema
- [x] 每期 OG 图（Hard 棋盘区域轮廓，无骨牌）+ 今日页 / 汇总页 OG 图；指南配图随指南页做
- [ ] 指南正文约 1,800–2,000 词（我撰写），统计数字由数据代入
- [x] 导航（新增 Pips 菜单 + 页脚）、跨游戏条、sitemap、CLAUDE.md
- [ ] 验证：tsc / lint / build / 防泄露检查；手机截图；三个难度各抽查 10 盘的提示正确性
