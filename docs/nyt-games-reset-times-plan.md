# P1 需求文档：`/nyt-games-reset-times` 换题时间工具

> 状态：待确认（2026-10-26）。上级方案：`docs/expansion-plan-2026-10.md`（8.4 节、第九节）。
> 流程：竞对细查 → backlinko 内容方案 → frontend-design UI 方案 → 本文档 → 确认后实现。
> 约束：不用 LLM、不用付费 API；说明文字由我撰写；不加作者署名，显示“最后核实日期”；一次只新增 1 个 URL。

## 1. 目标与范围

| 项目 | 内容 |
|---|---|
| 新 URL | `/nyt-games-reset-times`（只有这 1 个页面）|
| 页面性质 | 工具（实时换题看板）+ 参考资料（规则表、出处、夏令时说明）|
| 覆盖游戏 | Wordle、Connections、Strands、Pips、Spelling Bee、Letter Boxed、Crossword、Midi、Mini、Sudoku、Tiles、Connections: Sports Edition、Connections: Soccer Edition（Vertex 已停更，只在 FAQ 里说明）|
| 不做 | 像 beebom 那样为每个游戏单独建页面；每个游戏在本页用锚点（`#wordle`、`#spelling-bee`…）承接单游戏查询 |

## 2. 竞对细查

| 对手 | 形态 | 问题 / 空白 |
|---|---|---|
| beebom 汇总页（`/puzzle/nyt-games-reset-time-guide/`，2026-10-09 发布）| 12 个游戏的汇总表 + 每个游戏一个 H3 + 静态时区换算表（ET/CT/MT/PT/UK/IST）+ FAQ；约 2,650 词、21 张图；有 Article、FAQPage、Breadcrumb 三种 schema | **没有倒计时、不识别访客时区、没有任何 JS**；时区表**按固定的夏令时偏移计算**：印度时间在 11 月到次年 3 月是错的，英美换令时日期不同的那几周（**包括现在这一周**）英国时间也是错的；Sudoku 的跨时区日期错误；Mini 照搬帮助中心的说法，和存档数据矛盾；漏了 Soccer Edition、Bonus Puzzles、Vertex 停更 |
| beebom 单游戏页（9 个）| 每页约 950 词，H2 结构相同：何时重置、是否影响连胜、一天能玩几次、类似游戏 | 9 个页面内容高度同质 |
| Dot Esports、The Scotsman、Narcity 等 | 单个游戏、内容很薄 | — |

**结论**：我们用一个页面超过对手的 10 个页面。差异化有四点：
- 按访客时区实时计算，正确处理夏令时；
- 每个游戏都有倒计时和“你那里是否已经换题”的状态；
- 每条规则都附 NYT 官方出处和核实日期；
- Crossword 家族给出 7 天发布日历。

## 3. 规则数据（已核实，2026-10-26）

所有“美东时间”都按 `America/New_York` 换算，自动跟随夏令时；NYT 帮助中心全年写作 “EST”，实际是跟着纽约当地时间走。

| 游戏 | 规则 | 出处 | 可信度 |
|---|---|---|---|
| Wordle / Connections / Strands / Pips | 玩家**本地午夜** | NYT 帮助中心各游戏页 | 高 |
| Connections: Soccer Edition | 本地午夜（2026-06-11 上线，07-20 起转为常驻）| The Athletic 公告 | 高 |
| Connections: Sports Edition | 本地午夜 | 媒体报道上线时的说明；NYT 本身未写时间 | 中高 |
| Spelling Bee | 每天**美东 03:00** | 帮助中心 + 存档实测 | 高 |
| Letter Boxed | 每天美东 03:00 | 帮助中心 | 高 |
| Tiles | 每天美东 00:00 | 帮助中心 | 中高 |
| Crossword / Midi / Sudoku | 周一到周五晚**美东 22:00** 发布次日题；周六、周日晚**美东 18:00** 发布次日题 | 帮助中心 + 存档实测 | 高 |
| Mini | 帮助中心写的是“周一到周六的题前一晚 22:00、周日的题周六 18:00”，但存档数据显示周一的 Mini 在周日晚 19:11 就已上线，**很可能和 Crossword 一样** | 帮助中心 vs 存档 | **中**（上线前需要在某个周日美东 18:05 实测）|
| Bonus Puzzles | 每周三本地午夜 | 帮助中心 | 高 |
| Vertex | 2024-08-29 后停更 | 帮助中心 | 高 |

数据存为 `data/nyt-reset-rules.ts`：每个游戏一条记录，字段包括规则类型（本地午夜 / 美东固定时刻 / 美东按星期变化）、时刻、出处 URL、最后核实日期。

## 4. 内容方案（backlinko）

- **目标关键词**：`when does wordle reset`、`what time does wordle reset`、`nyt games reset time`、`when does spelling bee reset`、`when does connections reset`、`wordle reset time uk`，以及各游戏的同类问法。意图：信息型，用户要的是一个具体时间。
- **Title**（≤60 字符）：`When Do NYT Games Reset? Live Times for Your Time Zone`
- **Description**（≤155 字符）：`Live reset times for Wordle, Connections, Strands, Spelling Bee, Pips, the Mini and more — converted to your time zone, with countdowns and NYT sources.`
- **H1**：`When Do NYT Games Reset? Live Times in Your Time Zone`
- **H2 / 锚点**：
  1. Reset Times at a Glance（实时看板，最上方）
  2. Wordle (#wordle) · Connections (#connections) · Strands (#strands) · Pips (#pips)：本地午夜类，每个 80–120 字，写清连胜规则、跨时区旅行时的情况
  3. Spelling Bee & Letter Boxed (#spelling-bee, #letter-boxed)：美东 03:00 类
  4. The Crossword, Midi, Mini & Sudoku (#crossword, #mini)：附 7 天发布日历
  5. Tiles (#tiles) · Connections: Sports & Soccer Editions (#sports-connections)
  6. Why Some Games Follow Eastern Time
  7. Daylight Saving Time: When the Times Shift（本周就是现成的例子：英国已换冬令时，美国 11 月 1 日才换）
  8. When Do WordleHint's Hints Update?（如实说明本站提示页的切换时间）
  9. FAQ（换时区、改系统时间、VPN 是否影响；连胜；Vertex 怎么了）
- **正文**：约 1,500 词，由我撰写；每个游戏小节都写本游戏特有的事实，不复用模板句。
- **Schema**：`WebApplication`（看板工具）+ `FAQPage` + `BreadcrumbList` + `Article`（dateModified = 最后核实日期）。
- **GEO**：每个游戏小节第一句直接回答，例如 “Wordle resets at midnight in your own time zone.”；每条规则后面附 “Source: NYT Help Center · verified Oct 26, 2026”。
- **内链**：
  - 本页 → 各游戏今日页；
  - 各今日页的倒计时旁 → 本页（“when the next puzzle drops”）；
  - 首页底部的工具区 → 本页。

## 5. UI 方案（frontend-design）

**设计方向：“机场出发大屏”**。每个游戏是一行：游戏名 · 你的本地换题时间 · 倒计时 · 状态标签（`New puzzle out` 绿色 / `Next in 3h 12m`）。等宽数字配深色底，状态用 Wordle 的绿 / 黄 / 灰三色。**最让人记住的一点**：页面打开就显示“你所在的时区”，所有时间都已换算好，不用再自己算。

1. **页头**：H1 + 一句话回答（“Most NYT games reset at midnight your time; Spelling Bee and Letter Boxed at 3 AM ET; the crossword family the evening before.”）+ 时区选择器（自动识别，可手动改成常用时区）。
2. **出发大屏**：桌面端是表格，移动端是卡片。按“下一个换题的游戏”排序。倒计时每秒刷新。
3. **规则表**（服务端静态渲染，搜索引擎可读）：游戏 · 规则 · 出处链接 · 核实日期。
4. **Crossword 家族 7 天日历**：横轴是本地日期，标出每一天的题在本地几点上线。
5. **各游戏小节、夏令时说明、FAQ**。

**水合策略**：服务端按美东时间渲染（HTML 里有完整规则，适合搜索引擎），客户端挂载后切换成访客时区。看板在挂载前显示骨架，避免服务端和客户端时间不一致导致的水合报错。

**动效**：只有倒计时数字的轻微翻牌效果，遵守 `prefers-reduced-motion`。

**无障碍**：倒计时使用 `aria-live="off"`，避免屏幕阅读器每秒播报；状态同时用文字表达，不只靠颜色。

## 6. 技术方案

- `lib/reset-times.ts`：纯函数 `nextReset(rule, now, timeZone)` 和 `isNewPuzzleOut(...)`。美东换算用 `Intl.DateTimeFormat` 或已有依赖 dayjs 的 timezone 插件，不新增依赖。
- `components/reset-times/ResetBoard.tsx`（客户端）、`ReleaseCalendar.tsx`。
- 验证脚本 `scripts/check-reset-times.mjs`：用固定时刻断言夏令时切换日（2026-11-01、2027-03-14）、英美换令时错位周、周日 18:00 的 Crossword 规则。
- **顺带修正**：站内 `components/wordle/DailyCountdown.tsx` 现在按美东午夜倒计时，但 Wordle 实际是本地午夜换题，非美东用户看到的倒计时是错的。改为调用 `lib/reset-times.ts` 的本地规则。

## 7. 对已收录页面的影响

- 新增 1 个 URL。
- 今日页只是在倒计时旁加一个链接；`DailyCountdown` 修正后，显示的倒计时会变成访客本地时间，属于更正。

## 8. Todolist

- [ ] 上线前在某个周日美东 18:05 前后实测 Mini 的发布时间（请求 `svc/crosswords/v6/puzzle/mini.json`），确定 Mini 的最终规则
- [ ] `data/nyt-reset-rules.ts`（含出处 URL、核实日期）
- [ ] `lib/reset-times.ts` + `scripts/check-reset-times.mjs`（夏令时和周末规则断言）
- [ ] `ResetBoard`、`ReleaseCalendar` 组件；页面、metadata、四种 schema
- [ ] 正文约 1,500 词（我撰写）
- [ ] 各今日页加链接；修正 `DailyCountdown`
- [ ] sitemap；验证：tsc / lint / build；手机截图；用多个时区检查渲染
