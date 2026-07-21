# /spelling-bee-unlimited 需求文档（PRD）

> 可无限重玩的蜂巢拼词游戏页，补齐 NYT games unlimited 矩阵第四块
> 状态：**已完成**——构建通过（1450 页），reducer 冒烟测试全绿（拒词/计分/pangram/段位/Queen Bee），文案 1530 词密度合规；待 commit 部署
> 竞对调研：spellbee.org、spellbees.us、spellsbee.com 等克隆站群（详见会话报告）

## 1. 目标与关键词

- **核心词**：`spelling bee unlimited`（SERP 全是中低权重克隆站互卷，无官方/大媒体在位——可打）
- **次级**：`free spelling bee game`、`spelling bee game no limit`、`hive word game`（同义覆盖）
- 正文 ≥1500 词、密度 1–3%；内容标配 H2（竞对共识）：How to Play / Scoring & Ranks / vs NYT / Daily vs Unlimited / FAQ

## 2. 差异化（对照竞对短板）

1. **真题题池**：竞对全部随机生成字母组合（pangram 质量差、词库口径混乱是最大客诉）；我们复用 933 期真实历史题（管线已存在），文案直打 "curated archive puzzles, not random letters"
2. **免费渐进提示**：竞对把 hint 锁激励视频、NYT 把 Buddy 锁订阅；我们免费给「缺词矩阵（Buddy 式首字母×词长 grid）→ 双字母提示」——hint 品牌基因移植
3. **矩阵协同**：与 wordle/connections/strands-unlimited 及 SB answers/hints 双页互链
4. 法律缓释（与 connections-unlimited 同口径）：客户端不暴露日期/期号、题序打乱、视觉走站内琥珀主题非 NYT 配色、不自称 NYT

## 3. 玩法功能清单（竞对共识 = 必须有）

蜂巢点击 + 物理键盘双输入、Enter/Delete、洗牌、NYT 原版计分（4L=1 / 长词按字母 / pangram+7）、段位进度条（Beginner→Genius 70%→Queen Bee）、已找到词列表、提交反馈动效（Good/Great/Amazing/Pangram + 无效原因）、无限换题、localStorage 进度保存与恢复、游戏必须整屏首屏（fold-1）。
不做（本期）：50 局并行管理、分享链接、App。

## 4. 架构（完全照搬 connections-unlimited 模式）

- **题池**：build-time `buildPuzzlePool()` —— 933 期排除最近 14 天，均匀采样 120 题，**payload 仅含 { centerLetter, outerLetters, pangrams, answers } 和匿名 id（数组序号），不含 date/NYT id**
- **计分重构**：`scoreWord`/`RANK_LADDER` 从 `lib/spelling-bee-daily.ts` 抽到纯模块 `lib/spelling-bee-scoring.ts`（daily lib re-export 保持兼容），供客户端 bundle 使用且不拖入 3MB JSON
- **组件** `components/spelling-bee-unlimited/`：`UnlimitedSpellingBeeShell`（选题/存档/换题）、`SpellingBeeGame`（游戏主体）+ `gameReducer.ts`（输入/提交/判词/计分/段位状态机）、`HiveBoard`（可点击蜂巢，复用 SpellingBeeHive 视觉）、`RankProgress`、`FoundWords`、`HintPanel`（缺词矩阵+双字母提示，按需展开）、`StatsBadgeBar`（沿用模式）
- **数据文件** `data/spelling-bee-unlimited/`：content.ts（≥1500 词）、faq.ts、comparison.ts（vs NYT 表）、related-games.ts
- **页面**：fold-1 游戏 + ScrollHint + SectionRenderer 式 SEO 流；VideoGame/FAQPage/HowTo/Breadcrumb schema；OG 图（bee 模板）
- **互链**：SB answers/hints 页 Related 加入口；Header「Spelling Bee」菜单加 Unlimited；sitemap 0.85

## 5. Todolist

- [ ] lib/spelling-bee-scoring.ts 抽取 + daily lib 兼容重构
- [ ] gameReducer + 全组件 + Shell
- [ ] 页面 + 题池构建 + schema + metadata
- [ ] content/faq/comparison/related 四个数据文件（≥1500 词、密度复核）
- [ ] 导航/sitemap/互链/OG
- [ ] tsc + build + 手玩验证（提交词/计分/段位/pangram/换题/存档恢复）
