# `/best-wordle-starting-words` 数据深度页 — 第二期方案

> 状态：✅ 已交付（2026-06-05），构建通过 + 浏览器验证
> 制定日期：2026-06-05
> 所属规划：WordleHint 高质量扩页路线 · 第二期

## 已交付文件

| 文件 | 作用 |
|------|------|
| `lib/wordle-starting-words.ts` | 信息论计算：~46候选词 + Wordle反馈(含重复字母) + 熵/期望剩余/绿率 + 按位置字母频率 |
| `data/best-starting-words/content.ts` | meta/H2文案/定义块/FAQ(8,带token)/Top10注解 |
| `components/best-starting-words/RankingTable.tsx` | 可排序排名表(client)，桌面表格+移动卡片，列内嵌数据条 |
| `components/best-starting-words/LetterFrequencyGrid.tsx` | 按位置热力网格 + 总频率条形 |
| `components/best-starting-words/AvoidSection.tsx` | 避免词真实数据对比(灰tile) |
| `app/[locale]/best-wordle-starting-words/page.tsx` | 组装 + 4类schema(Article/FAQPage/ItemList/Dataset) |
| `lib/jsonld.tsx` | 新增 itemListSchema |
| `lib/sitemap.ts` | 加入路由(0.85, weekly) |
| `app/[locale]/wordle-answers/page.tsx` | 加"Best starting words"内链 |

复用：WordTiles、AnswersFAQ、RelatedTools、CSS条形图、slate hero。

**实测数据结果**（259答案）：SLATE #1 (5.49 bits, ~9剩余, 46%绿)，STALE/RAISE/ARISE/STARE/TRACE/CRANE 紧随；ADIEU #39(4.84)、AUDIO #42、FUZZY #46(2.35) 用于破除神话。

**已知项**：本项目 Tailwind filter 工具类(blur/grayscale)失效，凡需 filter 处一律用内联 style（AvoidSection 灰tile、SpoilerCurtain 模糊同理）。

验证：`pnpm build` 通过(SSG)；浏览器实测排序表(按熵/剩余/绿率切换)、字母位置热力网格、避免区灰tile、FAQ token替换均正常，无控制台错误。

---

## 原始方案（存档）

## 数据现实

- `data/wordle-words.ts` `WORD_LISTS[5]` 仅 ~600 个常见词精选，**不含经典开局词**（CRANE/SLATE/TRACE 都没有），非频率数据。
- 独家资产 = **259 个真实 NYT 答案**（`data/wordle-daily.json`）。
- 方法：自定义 ~40 个候选开局词，对每个跑**真实 Wordle 反馈**（含重复字母正确处理）针对 259 答案，算**熵(bits)** 与**期望剩余候选数**，排序。随每日新增答案自动重算。
- 另算真实答案**按位置字母频率**。

## 竞品调研缺口

| 竞品 | 数据来源 | 交互 | 更新 | 信息论 |
|------|---------|:--:|:--:|:--:|
| WordsRated | 全列表频率 | ❌ | ❌ | 部分 |
| fiveletterwords.io | 全词典熵Top50 | 静态 | ❌ | ✅ |
| Scientific American | 原理科普 | ❌ | ❌ | ✅ |
| 各博客 | 二手数字 | ❌ | ❌ | ❌ |
| **WordleHint** | **真实答案集** | **✅排序** | **✅每日** | **✅** |

核心差异化：**唯一基于真实答案集、随每日数据自动重算、可交互排序的开局词排名页。**

## 内容方案（Backlinko AUTHORITY，≥3,500字）

- 主词：best wordle starting words；次：best wordle starting word / opener / word to start wordle
- Meta title：`Best Wordle Starting Words (Ranked by Real Data)`
- Meta desc：`The best Wordle starting words ranked by information theory against real NYT answers. See entropy scores, letter frequency, and why SLATE wins. Updated daily.`
- H1：`Best Wordle Starting Words, Ranked by Real Answer Data`

H2 结构：
1. 排名工具表（首屏，可排序）
2. The Best Wordle Starting Word Right Now（直给#1+可引用统计）
3. What Makes a Good Wordle Starting Word?（定义段<50字可引用）
4. How We Ranked These Words（信息论方法+真实答案集，GEO权威核心）
5. Top 10 Starting Words, Explained
6. Wordle Answer Letter Frequency (From Real Data)（按位置频率★）
7. Words to Avoid as Openers（ADIEU神话）
8. What to Play as Your Second Word（链solver）
9. Should You Use the Same Starting Word Every Day?
10. FAQ（8题）
11. Related Tools

Schema：Article + FAQPage + ItemList + Dataset
内链：/wordle-solver、/todays-wordle-answer、/wordle-answers、/guides/strategy-tips、/how-to-play-wordle

## UI 方案（"Lab Leaderboard"，Ledger 家族）

- 沿用全站默认 Wordle 调色板 + slate hero + font-heading/mono；数字全等宽。
- 模块：① hero 高亮#1大tile+关键数字 ② 可排序排名表(~40词，列内嵌数据条，Top3绿高亮，移动端转卡片) ③ 字母频率可视化(按位置热力网格 + 总频率CSS条形) ④ Top10讲解卡片 ⑤ 避免区(灰调对比) ⑥ FAQ+Related
- 复用：WordTiles、AnswersFAQ、RelatedTools、CSS条形图、slate hero、徽章
- 动效：#1 flip-digit；数据条滚动增长(IntersectionObserver)；排序淡入
- 移动端：表→卡片，热力网格横滚，排序dropdown

## 开发任务

- [ ] 计算层 `lib/wordle-starting-words.ts`：候选词集 + Wordle反馈函数(含重复字母) + 熵/期望剩余/≥1绿 + 按位置字母频率，build时预计算
- [ ] 内容 `data/best-starting-words/content.ts`：meta/H2文案/FAQ/避免词/Top10注解
- [ ] 组件 `components/best-starting-words/*`：RankingTable(client排序)、LetterFrequencyGrid、StarterCard、AvoidSection
- [ ] 页面 `app/[locale]/best-wordle-starting-words/page.tsx` + 4类schema
- [ ] jsonld 加 itemListSchema；sitemap 加路由；内链
- [ ] 构建验证 + 浏览器实测排序/频率
