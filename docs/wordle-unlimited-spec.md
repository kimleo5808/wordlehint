# /wordle-unlimited 需求规格文档

> **页面路径：** `/wordle-unlimited`
> **页面类型：** Authority Tool Page（首屏工具 + 第二屏起长内容 SEO 着陆页）
> **目标关键词：** wordle unlimited（月搜索 1.1M）
> **创建日期：** 2026-05-26
> **预计工期：** 7-9 个工作日

---

## 一、项目背景

### 1.1 站点现状
- 站点：wordlehint.info（Wordle 提示与游戏聚合站）
- 技术栈：Next.js 16 + TypeScript + TailwindCSS + shadcn/ui + Cloudflare Workers
- 已有 25 个路由（含 4-11 letter 可玩游戏页、wordle-hint-today、wordle-solver、how-to-play-wordle、guides、blog 等）
- 博客已有 3 篇

### 1.2 新建动因
"wordle unlimited" 是与 "wordle hint today" 同级的核心词（月搜 1.1M）。当前站点未独立覆盖，流量被 wordleunlimited.org / wordly.org / 大媒体专栏吃掉。新建独立着陆页可：
- 抢占核心词流量
- 与现有 4-11 letter 游戏页面形成 cluster
- 通过 "Today's Hint 联动" 建立竞品无法复制的差异化

---

## 二、目标与定位

### 2.1 SEO 目标
- 主关键词：**wordle unlimited**（密度 1-3%）
- 次关键词：unlimited wordle, wordle unlimited unblocked, infinite wordle, endless wordle, no daily limit wordle, play wordle unlimited free, random wordle
- 长尾：wordle unlimited online, wordle unlimited no signup, wordle unlimited hard mode

### 2.2 成功指标
| 时间 | 指标 |
|------|------|
| 30 天 | Google 索引、"wordle unlimited" 进 top 100 |
| 60 天 | 进入 top 50；长尾词出现排名 |
| 90 天 | 进入 top 20；自然流量 ≥ 1,000 UV/月；FAQ rich snippets 命中 |

### 2.3 严格用户约束
1. **首屏（above the fold）必须是游戏模块** — 不放 hero 文案、不放营销 banner
2. **第二屏开始才是 SEO 内容**（约 2,900 字）
3. 桌面 1920×1080 与移动 375×812 首屏均需完整可见游戏 + 键盘
4. 内容必须 1800+ 字、原创、避开抄袭、过 AI 检测

---

## 三、竞品调研摘要

调研 10 站：wordleunlimited.org / wordly.org / wordleunlimited.com / wordle-unlimited.com / wordleplay.com / wordle.global / wordleunlimitedgame.online / wordlyplay.com / rss.org/games/wordle-unlimited / unscrambleit.net/wordle-unlimited-unblocked

### 3.1 三种首屏布局模式
- **A. Game-First（游戏即首屏）**：4/10 站，游戏视口 60-75%
- **B. Stats Bar + 游戏**：2/10 站，游戏上方插入 "∞·6·5·100% Free" 视觉条
- **C. Hero 文本 + 下方游戏**：4/10 站，文字 hero 占上半屏

> **我们选择 A+B 混合**：朱红 Stats Badge Bar + 居中游戏 + 极简控件。

### 3.2 必备内容模块（10/10）
- What is / Definition
- How to Play（颜色规则）
- FAQ
- Related Games 推荐

### 3.3 差异化机会
| 角度 | 竞品覆盖 | 我们策略 |
|------|---------|---------|
| Today's Hint 联动 | 0/10 | ⭐ 嵌入 HintTodayCard |
| 4-11 letter 全切换 | 1/10（藏深） | 首屏可见 Length Chips |
| Wordle vs NYT 结构化对比 | 6/10（散文） | 双栏对比卡 |
| Statistics / 真实数据 | 0/10 | 嵌入 14% 数据高亮 |
| Unblocked 长尾覆盖 | 3/10 | FAQ #3 + H2-4 自然嵌入 |
| VideoGame Schema | 0/10 | 完整结构化数据 |
| 编辑设计风格 | 0/10 | Editorial Newsprint 视觉系统 |

### 3.4 防抄袭高风险句式（必须避开）
- "guess a 5-letter word in 6 tries"
- "no daily limit / no waiting / play as many games as you want"
- "Green / yellow / grey shows..."
- "Unlike the original Wordle which limits you to one puzzle per day"
- "It's for people that love Wordle, but hate limits"

---

## 四、SEO 内容规划（Backlinko Authority Tool Page）

### 4.1 Title / Meta / H1

| 字段 | 内容 | 字符 |
|------|------|------|
| Title | `Wordle Unlimited: Play 4-11 Letter Word Puzzles Free` | 58 |
| Meta | `Wordle Unlimited lets you play endless word puzzles from 4 to 11 letters with hard mode, dark theme, and built-in daily hint integration.` | 149 |
| H1 | `Wordle Unlimited: Endless Word Puzzles from 4 to 11 Letters` | — |
| OG image | `/og/wordle-unlimited.png`（1200×630，新建） | — |

### 4.2 内容结构

| # | H2 | 字数 | 核心词出现 | 关键设计 |
|---|------|------|------|---------|
| 01 | What Makes Wordle Unlimited Different | 250 | 3 | Drop Cap 首字下沉 |
| 02 | How to Play Wordle Unlimited in Sixty Seconds | 350 | 4 | 3 个 H3 + tile mini demo |
| 03 | Choose Your Word Length: Four to Eleven Letters | 300 | 3 | 8 行印刷感数据表 |
| 04 | Strategy: How to Solve Wordle Unlimited Faster | 400 | 5 | Pull Quote + 词例 chip |
| 05 | Wordle Unlimited vs NYT Wordle: Side-by-Side | 300 | 3 | 双栏对比卡 |
| 06 | Game Modes and Customization | 220 | 3 | 2×2 网格卡片 |
| 07 | Why Endless Wordle Sharpens Your Vocabulary | 220 | 2 | 14% 数据高亮块 |
| 08 | Pair Wordle Unlimited with Today's Wordle Hint ⭐ | 200 | 2 | 嵌入 HintTodayCard |
| 09 | Frequently Asked Questions（14 题） | 600 | ~22 | Accordion |
| 10 | Keep Playing | 180 | 1 | 4 卡网格 |
| **合计** | | **~2,920** | **~52** | **密度 ~1.66%** ✅ |

### 4.3 FAQ 14 题清单

```
01. Is Wordle Unlimited free to play?
02. Is Wordle Unlimited the same as the official NYT Wordle?
03. Can I play Wordle Unlimited at school or work?（unblocked 长尾）
04. How many guesses do I get in each round?
05. What word lengths can I play?
06. Does Wordle Unlimited have hard mode?
07. Where do the answers come from?
08. Does Wordle Unlimited save my stats?
09. Can I share my Wordle Unlimited results?
10. Is it safe for kids?
11. Does it work on mobile?
12. What's the difference between Wordle Unlimited and infinite Wordle?
13. Why did my streak reset?
14. Can I use the Wordle Hint Today page with this?（⭐ 差异化）
```

### 4.4 内链战略

**链入此页（5 处）：** `/` 首页 hero / `/wordle-hint-today` 文末 / `/how-to-play-wordle` 文末 / `/5-letters` 顶部 / `/guides/*` 自然嵌入

**链出（8 处）：** `/4-letters` ~ `/11-letters`（8 个 Length Chip 内链）/ `/wordle-hint-today`（H2-8 + FAQ #14）/ `/wordle-solver`（H2-4）/ `/how-to-play-wordle`（H2-2）/ `/wordle-hint-faq`（FAQ 末尾）/ `/guides`（H2-4）

---

## 五、去 AI 味守则（写作交付清单）

### 5.1 词汇黑名单（命中即改）

**形容词：** robust / comprehensive / seamless / vibrant / dynamic / immersive / profound / transformative / cutting-edge / innovative / revolutionary / versatile / intuitive

**副词：** truly / genuinely / essentially / fundamentally / seamlessly / effortlessly / importantly / notably / crucially / arguably / ultimately

**句首：** "In today's fast-paced world..." / "It's important to note that..." / "When it comes to..." / "Imagine being able to..." / "Whether you're A or B..."

**过渡：** Furthermore / Moreover / Additionally / In addition / Last but not least

**协作残留：** "Great question!" / "Hope this helps!" / "Let me know if..." / "As an AI..."

### 5.2 结构限制

| 项 | 阈值 |
|----|------|
| 全文 em dash（—）总数 | ≤ 4 个 |
| Furthermore + Moreover + Additionally 合计 | ≤ 2 次 |
| 三段法（first/second/third）出现 | ≤ 1 次 |
| 副词黑名单命中 | ≤ 1 次 |
| "It's not just X — it's Y" 句式 | 0 次 |
| 连续 3 个段落同样长度开头/结尾 | 不允许 |

### 5.3 必要元素

| 项 | 要求 |
|----|------|
| 每个 H2 至少 1 个具体数字 | 词例、百分比、字典规模 |
| 全文第一人称出现 | ≥ 2 处（we / our / I've found） |
| 段落以 ≤ 8 词短句结尾 | ≥ 5 次 |
| FAQ 答案含具体数字/品牌名/词例 | ≥ 60% 的题 |
| 句长打散 | 短句（6-10 词）+ 长句（25-30 词）刻意混合 |

---

## 六、UI 设计方案

### 6.1 设计方向：Editorial Newsprint

报纸字谜专栏现代演绎。暖米白纸色 + 朱红强调 + Fraunces serif + 印刷感数据表。Wordle 经典色严格保留在 tile 内部。

### 6.2 调色板

```
brand.cream      #F5F1E8   主背景（暖米白）
brand.paper      #FBF8F0   卡片/tile-empty
brand.ink        #1A1814   主文字
brand.midInk     #3A3631   次级文字/边线
brand.tan        #D9D2C2   浅辅助边
brand.subtle     #6B6660   caption
brand.signal     #C2410C   朱红主强调
brand.signalDark #9A3309   朱红 hover
brand.signalLight#FED7AA   朱红浅背景

wordle.correct   #6AAA64   (保留，严禁修改)
wordle.present   #C9B458
wordle.absent    #787C7E

色盲模式 correct #1976D2   blue
色盲模式 present #E65100   orange
```

### 6.3 字体（next/font）

| 角色 | 字体 | weights |
|------|------|---------|
| Display（H1/H2/H3）| Fraunces | 500/700 |
| Body | Newsreader | 400/500/600 |
| Mono UI（stats/数据/小标签）| IBM Plex Mono | 400/500/600 |
| UI Sans（键盘 keycap）| IBM Plex Sans | 400/500 |

字体总加载量目标 ≤ 180KB woff2

### 6.4 首屏尺寸规范

**桌面 1920×1080：**
```
Nav            56px
Stats Badge    36px
Game Grid      414px (64px tile × 6 + 6px gap × 5)
Mode Pills     32px
Keyboard       200px
Length Chips   40px
New Game CTA   48px
Scroll Hint    24px
合计 ~870px + 间距 ~210px = 1080 完整可见 ✅
```

**移动 375×812：**
```
Nav            48px
Stats Badge    28px
Game Grid      361px (56px tile × 6 + 5px gap × 5)
Keyboard       145px
Length Chips   36px (横向滚动)
CTA            44px
合计 ~660px + 间距 ~100px = 760 完整可见 ✅
Mode Pills 折叠到设置图标
```

### 6.5 组件清单

| 优先级 | 组件 | 用途 |
|------|------|------|
| P0 | `<UnlimitedGameShell>` | 包裹 WordleGame，加印刷感外壳 |
| P0 | `<StatsBadgeBar>` | 朱红横条品牌锚点 |
| P0 | `<ModePills>` | 4 个 mode 切换 |
| P0 | `<LengthChips>` | 8 个长度切换（含内链） |
| P0 | `<HintTodayCard>` ⭐ | 嵌入式 hint 卡片（护城河） |
| P1 | `<SectionHeader>` | 模块标题（编号 + small caps H2） |
| P1 | `<EditorialDataTable>` | 印刷感 8 行数据表 |
| P1 | `<ComparisonCards>` | 双栏对比卡 |
| P1 | `<PullQuote>` | 编辑引用块 |
| P1 | `<StatHighlight>` | 14% 数据高亮 |
| P1 | `<FAQAccordion>` | FAQ 折叠（`<details>` 原生） |
| P2 | `<ScrollHint>` | 首屏底部滚动提示 |
| P2 | `<DropCap>` | 首字母下沉（仅 H2-1） |

---

## 七、技术规格

### 7.1 性能预算

| 指标 | 目标 |
|------|------|
| LCP | ≤ 1.8s 移动 / ≤ 1.2s 桌面 |
| CLS | ≤ 0.05 |
| INP | ≤ 100ms |
| 首屏 JS（gzipped） | ≤ 90KB |
| 字体总量（woff2） | ≤ 180KB |
| 首屏 LCP element | Game Grid 容器 |

### 7.2 Schema.org 结构化数据

- **VideoGame**（核心，0/10 竞品有）
- **FAQPage**（覆盖 14 题）
- **BreadcrumbList**（Home → Wordle Unlimited）
- **WebPage / WebSite**（复用站点级）

### 7.3 可访问性

- 全键盘可达（Tab 顺序：Nav → Game → Mode → Keyboard → Length → CTA → SEO 内容）
- 色盲模式（双重编码：颜色 + 形状 `■▲·`）
- 屏幕阅读器 aria-label 完整
- prefers-reduced-motion 支持
- focus state：朱红 2px outline + 2px offset

### 7.4 文件结构（新增/修改）

```
app/[locale]/wordle-unlimited/
├── page.tsx                          [新建]
└── layout.tsx                        [新建，含 metadata]

components/wordle-unlimited/          [新建目录]
├── UnlimitedGameShell.tsx
├── StatsBadgeBar.tsx
├── ModePills.tsx
├── LengthChips.tsx
├── HintTodayCard.tsx
├── SectionHeader.tsx
├── EditorialDataTable.tsx
├── ComparisonCards.tsx
├── PullQuote.tsx
├── StatHighlight.tsx
├── FAQAccordion.tsx
├── ScrollHint.tsx
└── DropCap.tsx

content/wordle-unlimited/
└── en.mdx                            [新建，~2,900 字正文]

data/wordle-unlimited/
├── faq.ts                            [新建，14 题数据]
├── modes.ts                          [新建，4 个模式定义]
└── length-table.ts                   [新建，8 行数据表]

public/og/
└── wordle-unlimited.png              [新建，1200×630]

lib/
└── jsonld.tsx                        [修改，加 VideoGame schema]

tailwind.config.ts                    [修改，加 brand.* 色板]
app/sitemap.ts                        [修改，加 /wordle-unlimited]
i18n/messages/en.json                 [修改，Header/Footer 链接]
app/[locale]/page.tsx                 [修改，首页 hero 加内链]
app/[locale]/wordle-hint-today/...   [修改，文末加内链]
app/[locale]/5-letters/...           [修改，顶部加内链]
app/[locale]/how-to-play-wordle/...  [修改，文末加内链]
```

---

## 八、详细 TodoList

### Phase 1 — 内容与设计准备（2-3 天）

#### 1.1 内容撰写
- [ ] 1.1.1 编写 H2-1 What Makes Wordle Unlimited Different（250 字，Drop Cap 首字段）
- [ ] 1.1.2 编写 H2-2 How to Play Wordle Unlimited in Sixty Seconds（350 字，3 个 H3）
- [ ] 1.1.3 编写 H2-3 Choose Your Word Length（300 字 + 8 行数据表）
- [ ] 1.1.4 编写 H2-4 Strategy（400 字 + Pull Quote）
- [ ] 1.1.5 编写 H2-5 Wordle vs NYT（300 字 + 8 维度对比表）
- [ ] 1.1.6 编写 H2-6 Game Modes（220 字 + 4 模式卡片）
- [ ] 1.1.7 编写 H2-7 Vocabulary Benefits（220 字 + 14% 数据块）
- [ ] 1.1.8 编写 H2-8 Pair with Today's Hint（200 字，⭐ 差异化）
- [ ] 1.1.9 编写 FAQ 14 题问答（600 字）
- [ ] 1.1.10 编写 H2-10 Related Games 卡片文案（180 字）
- [ ] 1.1.11 编写 Intro 段（120 字，紧跟 H1）

#### 1.2 内容自检（防抄袭 + 去 AI 味）
- [ ] 1.2.1 跑词汇黑名单 Ctrl+F 检查（形容词/副词/句首套话）
- [ ] 1.2.2 em dash 总数 ≤ 4 个验证
- [ ] 1.2.3 Furthermore/Moreover/Additionally 合计 ≤ 2 次验证
- [ ] 1.2.4 每个 H2 至少 1 个具体数字验证
- [ ] 1.2.5 第一人称出现 ≥ 2 处验证
- [ ] 1.2.6 段落短句结尾 ≥ 5 次验证
- [ ] 1.2.7 对照防抄袭 5 句话清单逐条改写
- [ ] 1.2.8 Copyscape 跑全文（相似度 <5%）
- [ ] 1.2.9 GPTZero / Originality.ai 跑 AI 检测（命中率 <40%）
- [ ] 1.2.10 朗读测试（找母语者或 TTS 朗读评估自然度）

#### 1.3 关键词与 SEO 元素
- [ ] 1.3.1 全文 "wordle unlimited" 出现次数核对（目标 ~52 次，密度 1.66%）
- [ ] 1.3.2 长尾词 "unblocked / infinite / endless / no signup" 覆盖核对
- [ ] 1.3.3 确定 Title（58 字符）
- [ ] 1.3.4 确定 Meta Description（149 字符）
- [ ] 1.3.5 确定 H1 文案

#### 1.4 设计资源
- [ ] 1.4.1 出 Figma 首屏设计稿（桌面 1920×1080）
- [ ] 1.4.2 出 Figma 首屏设计稿（移动 375×812）
- [ ] 1.4.3 出 H2-3 数据表设计稿
- [ ] 1.4.4 出 H2-5 对比卡设计稿
- [ ] 1.4.5 出 H2-8 HintTodayCard 设计稿
- [ ] 1.4.6 出 FAQ Accordion 设计稿
- [ ] 1.4.7 设计并导出 OG 图（1200×630，`/public/og/wordle-unlimited.png`）
- [ ] 1.4.8 确认色板（brand.* 9 色 + wordle.* 3 色 + 色盲 2 色）
- [ ] 1.4.9 确认字体加载策略（Fraunces + Newsreader + IBM Plex Mono/Sans）

---

### Phase 2 — 基础设施改造（1 天）

#### 2.1 Tailwind 配置
- [ ] 2.1.1 修改 `tailwind.config.ts` 新增 `brand.*` 色板（9 色）
- [ ] 2.1.2 修改 `tailwind.config.ts` 新增 `wordle.*` 色板（3 色，如未保留）
- [ ] 2.1.3 修改 `tailwind.config.ts` 新增色盲模式色板
- [ ] 2.1.4 验证现有页面色彩未被破坏

#### 2.2 字体加载
- [ ] 2.2.1 在 `app/[locale]/layout.tsx` 或专属 layout 加载 Fraunces（next/font/google）
- [ ] 2.2.2 加载 Newsreader（next/font/google）
- [ ] 2.2.3 加载 IBM Plex Mono（next/font/google）
- [ ] 2.2.4 加载 IBM Plex Sans（next/font/google）
- [ ] 2.2.5 配置字体 CSS 变量 `--font-display / --font-body / --font-mono / --font-ui-sans`
- [ ] 2.2.6 在 `tailwind.config.ts` fontFamily 中映射变量
- [ ] 2.2.7 验证字体加载总量 ≤ 180KB

---

### Phase 3 — 组件开发（3-4 天）

#### 3.1 P0 关键组件（首屏必需）
- [ ] 3.1.1 开发 `<StatsBadgeBar>`（朱红横条，桌面/移动差异）
- [ ] 3.1.2 开发 `<UnlimitedGameShell>` 外壳（包裹现有 WordleGame.tsx）
- [ ] 3.1.3 开发 `<ModePills>`（4 个 pill：Standard/Hard/Dark/A11y）
- [ ] 3.1.4 开发 `<LengthChips>`（8 个长度切换，含路由跳转到 /N-letters）
- [ ] 3.1.5 开发 `<HintTodayCard>` ⭐（复用 wordle-hint-today 数据源）
- [ ] 3.1.6 开发主 CTA `New Round →` 按钮
- [ ] 3.1.7 开发 `<ScrollHint>`（首屏底部 ⌄ Scroll for the full guide）

#### 3.2 P1 内容组件（第二屏起）
- [ ] 3.2.1 开发 `<SectionHeader>`（编号 `─── 01 ───` + small caps H2）
- [ ] 3.2.2 开发 `<DropCap>`（仅 H2-1 首字下沉）
- [ ] 3.2.3 开发 `<EditorialDataTable>`（H2-3 8 行印刷感表格，含 ASCII 难度条）
- [ ] 3.2.4 开发 `<PullQuote>`（H2-4 引用块，朱红左边线）
- [ ] 3.2.5 开发 `<ComparisonCards>`（H2-5 双栏对比，移动转堆叠）
- [ ] 3.2.6 开发 `<ModeGrid>`（H2-6 2×2 模式卡）
- [ ] 3.2.7 开发 `<StatHighlight>`（H2-7 14% 数据高亮）
- [ ] 3.2.8 开发 `<FAQAccordion>`（基于 `<details>` 原生，14 题）
- [ ] 3.2.9 开发 `<RelatedGameCard>`（H2-10 4 卡网格）

#### 3.3 交互与动画
- [ ] 3.3.1 实现 Mode 切换过渡（200ms cross-fade）
- [ ] 3.3.2 实现 Length 切换路由跳转 + 确认对话框（如有未完成局）
- [ ] 3.3.3 实现完成一局后 toast 横条（"Solved in X · Next →"）
- [ ] 3.3.4 实现 nav 滚动后 sticky + backdrop-blur
- [ ] 3.3.5 实现 ScrollHint 箭头浮动动画
- [ ] 3.3.6 实现 FAQ accordion 展开/收起动画
- [ ] 3.3.7 实现 prefers-reduced-motion 支持

---

### Phase 4 — 页面拼装（1 天）

#### 4.1 路由与元数据
- [ ] 4.1.1 创建 `app/[locale]/wordle-unlimited/page.tsx`
- [ ] 4.1.2 创建 `app/[locale]/wordle-unlimited/layout.tsx`（generateMetadata）
- [ ] 4.1.3 注入 Title + Meta Description
- [ ] 4.1.4 配置 OG image + Twitter Card

#### 4.2 内容数据文件
- [ ] 4.2.1 创建 `data/wordle-unlimited/faq.ts`（14 题问答）
- [ ] 4.2.2 创建 `data/wordle-unlimited/modes.ts`（4 个模式定义）
- [ ] 4.2.3 创建 `data/wordle-unlimited/length-table.ts`（8 行数据表）
- [ ] 4.2.4 创建 `content/wordle-unlimited/en.mdx`（正文 ~2,900 字）

#### 4.3 Schema.org 注入
- [ ] 4.3.1 修改 `lib/jsonld.tsx` 加 VideoGame schema
- [ ] 4.3.2 注入 FAQPage schema（14 题完整）
- [ ] 4.3.3 注入 BreadcrumbList schema
- [ ] 4.3.4 Google Rich Results Test 验证所有 schema

#### 4.4 站内集成
- [ ] 4.4.1 更新 `app/sitemap.ts` 加入 `/wordle-unlimited`（priority 0.85）
- [ ] 4.4.2 更新 `i18n/messages/en.json` 加入 Header 链接（如需要）
- [ ] 4.4.3 更新 `i18n/messages/en.json` 加入 Footer 链接
- [ ] 4.4.4 修改首页 `components/home/index.tsx` 加入 hero 内链 "Play Wordle Unlimited"
- [ ] 4.4.5 修改 `app/[locale]/wordle-hint-today/page.tsx` 文末加入内链
- [ ] 4.4.6 修改 `app/[locale]/5-letters/page.tsx` 顶部加入内链
- [ ] 4.4.7 修改 `app/[locale]/how-to-play-wordle/page.tsx` 文末加入内链

---

### Phase 5 — 测试与上线（1 天）

#### 5.1 视觉与布局
- [ ] 5.1.1 桌面 1920×1080 首屏完整可见性测试（Chrome DevTools）
- [ ] 5.1.2 移动 375×812 首屏完整可见性测试（iPhone SE）
- [ ] 5.1.3 平板 768×1024 适配测试
- [ ] 5.1.4 暗色模式视觉测试
- [ ] 5.1.5 色盲模式视觉测试（蓝/橙色板 + 形状区分）

#### 5.2 交互测试
- [ ] 5.2.1 游戏面板完整玩通 1 局（5-letter Standard）
- [ ] 5.2.2 Hard Mode 规则验证（强制重用确认字母）
- [ ] 5.2.3 Length Chips 跳转到 8 个 N-letter 页面
- [ ] 5.2.4 ModePills 切换流畅度
- [ ] 5.2.5 完成局后 toast 横条 + Next Round 流程
- [ ] 5.2.6 HintTodayCard 数据正确（同步 /wordle-hint-today）
- [ ] 5.2.7 FAQ Accordion 展开/收起 14 题全部
- [ ] 5.2.8 ScrollHint 引导有效（用户能注意到下方内容）

#### 5.3 性能验证
- [ ] 5.3.1 Lighthouse 跑分（目标 Performance ≥ 90）
- [ ] 5.3.2 LCP ≤ 1.8s 移动 / ≤ 1.2s 桌面验证
- [ ] 5.3.3 CLS ≤ 0.05 验证
- [ ] 5.3.4 INP ≤ 100ms 验证
- [ ] 5.3.5 首屏 JS gzipped ≤ 90KB 验证
- [ ] 5.3.6 字体加载总量 ≤ 180KB 验证
- [ ] 5.3.7 Web Vitals 真机测试（4G 模拟）

#### 5.4 SEO 验证
- [ ] 5.4.1 字数 ≥ 2,700 字复核
- [ ] 5.4.2 "wordle unlimited" 出现次数 ~52 次 / 密度 1.66% 复核
- [ ] 5.4.3 Google Rich Results Test 通过
- [ ] 5.4.4 Schema 结构化数据 4 类完整
- [ ] 5.4.5 内链 5 入 + 8 出验证
- [ ] 5.4.6 OG image 预览测试（Facebook Debugger / Twitter Card Validator）
- [ ] 5.4.7 sitemap.xml 包含 `/wordle-unlimited`
- [ ] 5.4.8 robots.txt 未屏蔽

#### 5.5 内容质量验证
- [ ] 5.5.1 Copyscape 全文相似度 <5%
- [ ] 5.5.2 GPTZero AI 检测命中率 <40%
- [ ] 5.5.3 词汇黑名单全文扫描 0 命中
- [ ] 5.5.4 朗读测试通过（自然度评分 ≥ 7/10）

#### 5.6 可访问性
- [ ] 5.6.1 axe DevTools 0 critical issues
- [ ] 5.6.2 全键盘 Tab 导航顺序正确
- [ ] 5.6.3 VoiceOver / NVDA 屏幕阅读器测试
- [ ] 5.6.4 prefers-reduced-motion 动画退化验证
- [ ] 5.6.5 focus state 全部清晰可见

#### 5.7 上线前最终检查
- [ ] 5.7.1 跑 `npm run build` 无错误
- [ ] 5.7.2 跑 `npm run dev` 本地完整冒烟测试
- [ ] 5.7.3 Cloudflare Workers 预览环境部署
- [ ] 5.7.4 生产环境部署
- [ ] 5.7.5 Google Search Console 提交 URL
- [ ] 5.7.6 在 GA4 设置 `/wordle-unlimited` 转化事件

---

## 九、验收标准

### 9.1 必须满足（P0）
- [ ] 桌面 1920×1080 与移动 375×812 首屏 100% 显示游戏 + 键盘 + 必要控件
- [ ] 首屏不出现任何 SEO 文案、hero 文本、营销 banner
- [ ] 正文 ≥ 2,700 字，"wordle unlimited" 密度 1-3%
- [ ] Copyscape 相似度 <5%
- [ ] Lighthouse Performance ≥ 90
- [ ] LCP ≤ 1.8s（移动）
- [ ] VideoGame + FAQPage Schema 通过 Google 验证
- [ ] 全键盘可达，axe 0 critical issues

### 9.2 强烈推荐（P1）
- [ ] AI 检测（GPTZero）命中率 <40%
- [ ] CLS ≤ 0.05
- [ ] 首屏 JS gzipped ≤ 90KB
- [ ] HintTodayCard 与 /wordle-hint-today 数据同步无延迟
- [ ] 8 个 Length Chip 正确跳转到 /N-letters 页面

### 9.3 可选（P2）
- [ ] 暗色模式完整支持
- [ ] 色盲模式形状区分
- [ ] 完成局 toast 横条 + 自动下一局
- [ ] OG 图设计精良

---

## 十、风险与控制

| 风险 | 概率 | 影响 | 控制措施 |
|------|------|------|---------|
| 内容抄袭命中竞品 | 中 | 高 | 严格对照 5 条高风险句式 + Copyscape 验证 |
| AI 检测命中率高 | 中 | 中 | 应用 10 条 humanizer 自检清单 + 朗读测试 |
| 关键词堆砌触发降权 | 低 | 高 | 密度严格控制在 1.66%，避免 >3% |
| 首屏游戏超出 fold | 中 | 高 | 设计阶段实测 2 个断点，预留 86px 余量 |
| 新色板/字体破坏现有页面 | 低 | 中 | 仅扩展 `brand.*` 命名空间，不修改默认色 |
| VideoGame schema 不被采纳 | 中 | 低 | WebPage schema 兜底，富结果非强制 |
| HintTodayCard 数据源耦合 | 低 | 中 | 组件接受 props，不直接 fetch |
| Length 切换跨页路由复杂 | 中 | 中 | 用 next/link，复用现有 /N-letters 路由 |

---

## 十一、后续扩展（不在本期范围）

- 多语言版本（zh-CN / ja / es 等）— 等英文版稳定后再规划
- Multiplayer / Friend Battle 模式（wordlyplay.com 思路）
- Wordle Bot 评分系统
- 历史 puzzle 回放 / Test Your Word（参考 stuckonwordle.com）
- 账户系统 + 跨设备 stats sync
- 二字母组合词表程序化页面（基于本期 length-table 数据扩展）

---

## 十二、参考资料

- 竞品调研报告（Agent 输出，2026-05-26）
- Backlinko Skyscraper 2.0 方法论
- Wikipedia: Signs of AI writing（humanizer-zh 来源）
- Google Search Central — Structured Data for Games
- Editorial Newsprint 视觉灵感：NYT Games / Domestika 编辑设计

---

**文档版本：** v1.0
**最后更新：** 2026-05-26
**Owner：** WordleHint 团队
