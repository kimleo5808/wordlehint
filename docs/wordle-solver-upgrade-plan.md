# `/wordle-solver` AUTHORITY 升级 — 第二期方案

> 状态：✅ 已交付（2026-06-05），构建通过 + 浏览器验证
> 制定日期：2026-06-05
> 所属规划：WordleHint 高质量扩页路线 · 第二期（另一半）

## 已交付

| 文件 | 改动 |
|------|------|
| `lib/wordle-answer-lookup.ts` | 新建：word→{date,partOfSpeech,definition} 真实答案查询表 |
| `components/wordle/WordleSolver.tsx` | 升级结果展示：徽章/日期/词义/排序(likely-first,A-Z)/复制/空状态起手词；**字典合并真实答案**(关键修复) |
| `data/wordle-solver/content.ts` | 新建：定义块/三色/对比表/8 FAQ/H2文案 |
| `app/[locale]/wordle-solver/page.tsx` | 重写：H1加word finder、新增5个H2外壳+FAQ+Related、SoftwareApplication/HowTo/FAQPage schema、内链、传数据给solver、改用家族配色 |

**关键修复**：原 solver 词库 `WORD_LISTS[5]`(518词)只含 41/259 真实答案 → solver 连 84% 真实答案都搜不到。已在组件内合并 `WORD_LISTS[length] ∪ 真实答案`，既修了求解完整性，又让"past answer"徽章真正触发。

实测：输入 T 绿(pos0)→79结果，前12个全是真实答案(TABBY/TEDDY/TEETH/THEFT…)带日期+词义置顶，普通词在后；空状态显示 SLATE/STALE/RAISE 起手词引导；复制按钮、A-Z/Likely排序、HMR硬刷新后均正常，无控制台错误。`pnpm build` 通过。

---

## 原始方案（存档）

## 现状（升级前）

- `app/[locale]/wordle-solver/page.tsx`（~208行，~949字）：H1 "Wordle Solver"，工具 + "How to Use"3步 + 策略4段 + 字母游戏内链。
- 工具组件 `components/wordle/WordleSolver.tsx`（392行，client）：绿/黄/灰位置网格 + QWERTY键盘排除 + 4-11字母 + 实时 useMemo 过滤 + 最多100结果带"Show all"。词库 `data/wordle-words.ts`。
- Schema：Breadcrumb + WebApplication。无 FAQ、无结果增强、无 Related。

## 升级目标（不重写输入交互）

独家数据升级（复用资产）：
1. 结果中"真实当过 Wordle 答案"的词 → `Past answer` 徽章 + 用过日期 + 词义副行（用 wordle-daily.json + wordle-definitions.json）。
2. 无约束空状态 → 起手词引导卡（Top3 tile，链 /best-wordle-starting-words）。
3. 排序切换（likely-first / A–Z）+ 每词复制按钮。

竞品缺口：thewordfinder/word.tips/yourdictionary 有"likely加粗/NYT-only"但无真实答案日期+词义。

## 内容方案（Backlinko AUTHORITY，≥3,500字）

- 主词 wordle solver；次 wordle word finder / helper / 5 letter word finder
- Meta title：`Wordle Solver — Word Finder With Real Answers`
- H1：`Wordle Solver & Word Finder`

H2：① 工具(增强) ② How to Use(保留) ③ What Is a Wordle Solver?(定义块) ④ Green/Yellow/Gray含义(重复字母说明) ⑤ How the Solver Finds Real Answers(独家) ⑥ Strategy(保留扩写) ⑦ Solver vs Hints vs Answers(对比表) ⑧ First Guess(链starting-words) ⑨ FAQ(8) ⑩ Related Tools

Schema：WebApplication + HowTo + FAQPage
内链：/best-wordle-starting-words、/wordle-answers、/wordle-hint-today、/todays-wordle-answer、/N-letters

## UI 方案（"Workbench"，Ledger 家族）

- 结果词条行：真实答案左绿边框 + `Past answer`细徽章 + used日期 + 词义副行(muted)；普通词仅词+复制；排序segmented(likely-first/A–Z)；复制⧉。保留100+ShowAll。
- 空状态：起手词引导卡(Top3 tile + 链)。
- 外壳：定义引用块、三色说明卡、对比表、FAQ折叠、Related——全复用家族组件。
- 动效：结果staggered fade-in；复制✓反馈。移动端卡片堆叠。
- 复用：WordTiles、AnswersFAQ、RelatedTools、定义块、对比表、slate hero；数据 getDefinition、答案归档、starting-words Top3。

## 开发任务

- [ ] 辅助 `lib/wordle-answer-lookup.ts`：word → {wasAnswer, date, definition}（基于 wordle-daily + definitions）
- [ ] 升级 `WordleSolver.tsx`：结果增强(徽章/日期/词义/排序/复制) + 空状态引导卡（需把真实答案map + Top3起手词作为props传入，保持组件可测）
- [ ] 内容 `data/wordle-solver/content.ts`：定义块/三色/对比/FAQ/H2文案
- [ ] 升级 `page.tsx`：新增H2外壳 + HowTo/FAQPage schema + 内链 + 传数据给solver
- [ ] 构建验证 + 浏览器实测结果徽章/排序/空状态/复制
