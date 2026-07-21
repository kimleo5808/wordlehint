# 4/6/7 字母词表集群需求文档（PRD）

> 横向扩展 /5-letter-words 模式到 /4-letter-words、/6-letter-words、/7-letter-words
> 状态：**P0 已完成（2026-07-22）**——82 页构建通过（3 hub + 78 starting spoke + without-vowels），重复度检测通过（同模板最差 0.527/0.75，跨模板 0.161/0.30）；待 commit 部署后 GSC 观察两周再启动 P1（ending）
> 日期：2026-07-22（调研 2026-07-21）

## 1. 调研核心结论

**SERP 意图（决定文案角度，不能照抄 5 字母的 Wordle 叙事）**
- 三组 SERP 前排全是 Scrabble/词典工具站，无 Wordle 专门站；NYT Wordle 恒为 5 字母，4/6/7 无每日题可蹭
- 4 字母：Scrabble 短词战术 + 儿童识字教学意图混合
- 6/7 字母：几乎纯 Scrabble/WWF 得分意图（7 字母绑定 bingo 场景）
- **我们的差异化**：①「怎么猜中这些词」的解题视角（全 SERP 无人写）；②词表 → 4/6/7-letter unlimited 可玩页的闭环（竞对没有游戏资产）；③common 词置顶（竞对纯字母序，生僻词淹没好词）

**数据口径（基础设施盘点 + 竞对验证）**
- 4/6/7 无 NYT 官方词表/答案池 → **全量层用 ENABLE**（公有领域，业界事实标准：4 字母 3,998 / 6 字母 15,282 / 7 字母 23,139 词）
- **common 层重定义**：ENABLE ∩ 高频词表（google-10000-english 或等价词频表）；`wasAnswer`（往期 Wordle 答案标记）对 4/6/7 降级隐藏
- 顺带修复：`data/letter-games.ts` 现有文案的词量数字（如 7 字母 "over 34,000"）与实际不符，统一改为 ENABLE 实数
- 现有 `data/wordle-words.ts` 精选表继续做 unlimited 答案池，并兼作词表页 "featured" 层

## 2. 需要用户确认的两个决策

### 决策 A：路由架构（推荐方案 ②）
- ① 照抄 5 字母静态薄壳：~243 个 page.tsx + 234 个手写 content 文件——SEO 每页可手调，但建设和维护成本巨大
- ② **动态 spoke 路由（推荐）**：每长度一个字面目录 + 动态段：
  `app/[locale]/4-letter-words/page.tsx`（hub）+ `app/[locale]/4-letter-words/[spoke]/page.tsx`（`generateStaticParams` 枚举 starting-with-a…z 等）——URL 与竞对/现有 5 字母完全同构，文件从 243 个降到 6 个；5 字母集群保持原状不动
- 两方案的 URL 和产出页面完全一样，区别只在维护成本与逐页文案自由度

### 决策 B：spoke 页文案深度（推荐方案 ②）
- ① 严守每页 1500 词手写文案 → 234 页不现实
- ② **分层配置（推荐）**：3 个 hub 页各 ≥1500 词手写（按各自意图角度：4=短词战术+教学、6/7=Scrabble 得分+词形结构+解题视角）；spoke 页 = 每长度 × 每方向一套 ~600 词高质量模板段落（占位符填每页动态统计：词量/common 数/最高分词）+ 词表本体 + 动态 FAQ——词表内容本身就是页面主体，竞对 spoke 页文案量也在此水平

## 2.5 已确认决策与防重复设计（2026-07-22 确认）

- **决策 A = 动态 spoke 路由**；**决策 B = hub ≥1500 词手写 + spoke 模板化**，模板化配套五层防重复：
  1. **9 套独立模板**（3 长度 × 3 方向零复用；P0 先做 3 套 starting）
  2. **模板内动态占比 ≥40%**：词量/common 数/最高分词及分值/词长分布/第二字母组合/例句均取该页真实数据，成段生成
  3. **每字母手写 hook**：每页开头 2–3 句该字母独有观察（26 × 方向 × 长度）
  4. **上线前重复度检测脚本**：剔除词表区后正文两两相似度，超标回炉
  5. **分批上线**：P0 82 页先行，GSC 观察两周（警惕「已抓取未编入索引」堆积）再放 P1/P2

## 3. 页面范围（分期）

| 期 | 内容 | 页数 |
|---|---|---|
| P0 | 3 个长度 hub + starting-with ×26×3 + `/4-letter-words/without-vowels` 长尾单页（已核实 ~70 词有独立 SERP） | 82 |
| P1 | ending-with ×26×3（ENABLE 口径下无 thin 风险，含 J/Q/V） | 78 |
| P2 | containing ×26×3（hub 上突出 Q/Z/X/J 高分字母页） | 78 |
| 不做 | 4/6/7 的双条件组合页（独立搜索量弱，纯索引负担） | — |

## 4. 页面结构（沿用站内模式 + 竞对共识）

- Hero：长度徽章 + 词量统计三数字（全量/common/最高分词）+ 「Play N-letter Wordle →」CTA（unlimited 闭环）
- 词表区：**common 置顶分组 + 按第二字母分节（复用 groupBySecondLetter）+ 生僻词折叠**（6/7 字母 spoke 数千词，绝不平铺，保 CWV）
- 每词可选标 Scrabble 分值（竞对标配，纯计算）
- SEO 区（模板 + 动态）：战术段（按长度角度）→ 最高分词专段 → 词形结构段（6/7：-ING/-TION 后缀拆解，复用 letter-games 内容资产）→ FAQ（含 PAA 高频问句 "how many N letter words are there" 用 ENABLE 实数回答）
- 内链：hub ↔ 26 spoke ↔ 全长度横链（4/5/6/7）↔ 对应 unlimited 页；5 字母集群互链进来

## 5. 改造清单（据基础设施盘点）

- **数据**：`build-word-bank.mjs` 参数化（length 查表：SOURCE_URL/正则/输出路径；无答案池长度走 common=词频交集分支）→ 产出 `data/word-bank/{4,6,7}.json`
- **lib**：`word-bank.ts` 参数化（`loadBank(len)`、`[4]→[len-1]`、`ORDINALS` 扩到 7、`positionStats` 循环上界；`wasAnswer` 对非 5 长度恒 false 并隐藏相关 UI）
- **组件**：`LetterListPage`/`EndingListPage`/`PositionMap`/`tiles` 参数化（词长、路径前缀 prop 化，替换 "5-letter" 硬编码，`grid-cols-5` 动态化）；5 字母页面回归验证不受影响
- **路由**：按决策 A 新建
- **同步**：`check-word-bank-sync.mjs` 与 `lib/sitemap.ts` 按 length 循环化；thin 告警改为按 common 层判定
- **OG**：每长度 hub 一张

## 6. Todolist（P0）

- [ ] 决策 A/B 确认
- [ ] 词库构建：ENABLE 下载 + 词频交集 → 4/6/7.json；数字口径同步修正 letter-games 文案
- [ ] lib/word-bank.ts 参数化 + 5 字母回归
- [ ] 组件参数化 + 5 字母页面回归（tsc + build + 抽查渲染）
- [ ] 3 hub 页（各 ≥1500 词手写，密度 1–3%，角度按意图分化）
- [ ] 动态 spoke 路由 + 模板文案 + 动态 FAQ/统计
- [ ] without-vowels 长尾页
- [ ] sitemap/sync 脚本/导航（Footer "More Games" 区已有 4–11 letters 链接，hub 挂入）/OG
- [ ] 构建验证 + 密度复核 + CWV 抽查（7 字母 starting-S 大页）
