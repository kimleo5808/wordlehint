# WordleHint 英文新页面竞品研究与上线方案

2026 年 11 月 19 日。面向美国英语益智游戏玩家。建议新增 8 个可索引入口，首批发布 3 个：五字母无元音词表、Spelling Bee 单词历史查询、Wordle 赛后复盘。三页分别检验搜索获客、历史题库的查词价值、玩家解题后的继续使用。其余 5 页按首批表现和数据条件排序。

## 10 个竞争对手及其启示

样本覆盖争夺相同英文查询或同一项玩家任务的媒体、词典和独立工具。下表依据竞品实际页面。优先级结合本站的数据、开发依赖和页面重叠程度判断。没有本站 GSC 导出或付费关键词库，因此不估算月搜索量、排名难度或预期访问量。英文网页搜索也不能代表美国 Google 的固定名次。

| 竞争对手 | 实际页面与用户操作 | 对 WordleHint 的启示 |
|---|---|---|
| WordFinder by YourDictionary | 无元音专题列出可猜词、往期答案和日期，另解释冷僻词。[无元音词专题](https://wordfinder.yourdictionary.com/blog/5-letter-words-without-vowels-every-valid-wordle-guess-and-past-answers/) | 58 个词和历史答案已经有人列全。本站应让玩家把手上已知的字母代入，立刻缩小范围。 |
| FiveLetterWords.io | 同一词型页能输入绿格和灰字母；赛后复盘另有独立入口，可补录实际猜词。[词型筛选](https://www.fiveletterwords.io/five-letter-words-with-no-vowels) · [赛后复盘](https://www.fiveletterwords.io/analyze) | 同一玩家在局中和局后要做不同的事。给两个入口各定一个完成动作，避免两页都争夺通用 solver 查询。 |
| Tom’s Guide | 编辑在每日 Wordle 页回放自己的猜法，并说明特定一步之后还剩多少选项。[每日解题复盘](https://www.tomsguide.com/news/what-is-todays-wordle-answer) | 复盘最有价值的单位是“一步猜测改变了什么”。本站可以让读者代入自己的整局，并公开候选数的计算口径。 |
| Don’t Wordle | 陷阱训练器从只差一个字母的残局开始，可选普通或困难规则，并显示探测词如何拆分候选。[Trap Trainer](https://dontwordle.app/wordle-trap-trainer/) | 随机开一盘和练习指定局面有独立价值。等复盘页出现确切的残局练习需求，再开放专项训练。 |
| SpellBee.org | 输入中心字母和六个外圈字母，按长度和得分查看候选，突出使用全部七个字母的 pangram；页面说明词典与正式题单可能有差异。[蜂巢求解器](https://spellbee.org/solver) | 匹配到已收录蜂巢时给出该期收录词；自定义组合则明确候选词库和覆盖范围。 |
| SBeeHub | 单词查询页允许按词查找曾收录它的题目，并解释历史出现与当日认可的区别。[历史查词](https://sbeehub.com/spelling-bee-word-checker/) | 本站可多回答一个问题：在本档案中，字母条件允许它出现的题目有多少期，其中多少期实际收录。 |
| Word.Rodeo | 出题人输入秘密词，可设置提示、猜测次数，生成让朋友直接玩的链接。[自定义挑战](https://word.rodeo/) | 衡量这类页时，要看接收者是否真正开玩。只有复制链接数，无法判断它是否带来新玩家。 |
| GroupGrid | 创作者输入四个组名和十六个词，完成后生成分享链接，编辑页有玩家棋盘预览。[Connections 制作器](https://createconnections.net/) | Connections 可先做朋友间出题和盲测。公开作品库另有内容运营成本，可以留到分享需求得到验证以后。 |
| LetterBoxSolver | 输入四边各三个字母，优先显示两词链，并可查看三词链。页面注明结果取决于自有词库。[四边求解器](https://letterboxsolver.com/) | 进入新游戏时，手填棋盘本身就有用。可增加逐词路径以及逐步揭示入口，减少玩家被整组答案剧透的机会。 |
| Beebom Puzzle | Letter Boxed 今日页支持逐字母揭示，还有昨日答案；自制 Wordle 指南把读者导向制作工具。[Letter Boxed 答案](https://beebom.com/puzzle/letter-boxed-answers/) · [自制 Wordle 指南](https://beebom.com/puzzle/how-to-make-your-own-wordle/) | 今日答案、任意棋盘求解、给朋友出题是三项不同任务。进入 Letter Boxed 可先服务手上已有棋盘的人。 |

玩家也直接描述过这些需求。一位 Spelling Bee 玩家想输入一个词，看它究竟出现过多少次；另一位问某个词是否做过 pangram。Wordle 玩家讨论的残局问题则更具体：发现自己掉进困难模式陷阱后，还能否靠选词降低碰运气的成分。这些帖子能帮助定义输入和输出，不能用来推算需求规模。[出现次数讨论](https://www.reddit.com/r/NYTSpellingBee/comments/1r8dgw5/how_many_times_a_word_has_appeared/) · [Pangram 讨论](https://www.reddit.com/r/NYTSpellingBee/comments/1vlv8ur/curious_if_a_specific_word_has_ever_been_the/) · [困难模式讨论](https://www.reddit.com/r/wordle/comments/1c9cl9z/hard_mode_traps/)

## 新页面清单

下表每行对应一个可索引入口。筛选组合、历史查词结果和个人挑战链接均不计为新的搜索落地页。关键词是本次英文检索的代表性查询。

| 顺序 | 建议 URL | 主查询 | 玩家完成的任务 | 相对工作量 |
|---|---|---|---|---|
| 首批 1 | `/5-letter-words/without-vowels` | `5 letter words without vowels` | 在没有 A/E/I/O/U 的前提下，按自己棋盘的已知字母缩小词表 | 小，词表和历史答案均已具备 |
| 首批 2 | `/spelling-bee-word-history` | `spelling bee word history` | 查一个词出现过几次、何时出现、有没有当过 pangram | 小至中，需按词建立历史索引 |
| 首批 3 | `/wordle-analyzer` | `wordle analyzer` | 复盘一局已完成的游戏，查看哪一步排除了哪些候选 | 中，需可靠的逐步判色和候选分组 |
| 第二批 1 | `/spelling-bee-solver` | `spelling bee solver` | 填中心和外圈字母，按需揭示词长、分值和 pangram | 中，可复用上一批的词库和计分规则 |
| 第二批 2 | `/make-your-own-wordle` | `make your own wordle` | 给朋友出一题，预览后生成可直接开玩的挑战链接 | 中，需打通制题和接收者两端 |
| 第三批 A | `/wordle-trap-trainer` | `wordle trap trainer` | 从四格已知的局面开始，在限定步数内练下一猜 | 中，取决于复盘页的判色和候选模型 |
| 第三批 B | `/connections-maker` | `connections puzzle maker` | 创建四组词、盲测试玩，分享十六格棋盘 | 中，复用 Connections 的交互和分享经验 |
| 独立试点 | `/letter-boxed-solver` | `letter boxed solver` | 填四边字母，先要线索或查看一条经校验的完整词链 | 中至大，需完整词典和棋盘规则验证 |

Spelling Bee Solver 和 Letter Boxed Solver 已出现在十月扩张方案中，这次补充了竞品依据和首版边界。换题时间工具也已有独立规格，本轮不重复立项。核对范围包括实际路由、站点地图定义和十月方案。线上 sitemap 本次未能直接读取，页面缺口据仓库判定。[历史扩张方案](expansion-plan-2026-10.md) · [换题时间工具规格](nyt-games-reset-times-plan.md) · [站点地图定义](../lib/sitemap.ts)

## 首批三页的内容和验收

### 五字母无元音词表

**英文标题建议**　5-Letter Words Without Vowels for Wordle

**手机首屏**　先列常见候选与历史答案，显示 Y 的开关，以及已知位置、排除字母两个输入。完整词表继续向下展开。词表旁标出使用的词库版本，让读者能理解为何别处的列表总数不同。

**可直接制作的内容**　用本站五字母词库筛掉 A/E/I/O/U 后，剩 58 个可猜词，其中 13 个在本站采用的常见答案参考表里。截至本地 2026-11-03 历史快照，共有 8 个不同词实际当过答案。连 Y 一起排除，仍有 6 个可猜词，常见参考表和历史记录均为 0。三种口径要分别显示。两个竞品已经有清单，因此本站的重点是能用自己棋盘复算的例子。[本站五字母词库](../data/word-bank/5.json) · [Wordle 历史数据](../data/wordle-daily.json) · [竞品筛选页](https://www.fiveletterwords.io/five-letter-words-with-no-vowels)

**正文顺序**　可筛词表 → 一步步缩小范围的示例 → 历史答案及最近日期 → 关于 Y 和冷僻词的说明。示例限定在 13 个常见参考词中：确认第三位是 Y，剩 7 个；再排除 R，剩下 GLYPH、SHYLY、SLYLY。较早的历史记录可以展示日期，仅在本站确有对应详情页时提供日期链接。

**入口与验收**　来源建议为五字母词表首页、四字母无元音页。若玩家有更多颜色反馈，再进入现有 Wordle Solver。手机用户可以完成上述示例，并能一键恢复完整列表。首要行为指标是自然搜索落地后的有效筛选率。

### Spelling Bee 单词历史查询

**英文标题建议**　Spelling Bee Word History: Has This Word Appeared?

**手机首屏**　一个查词框和可点击示例。结果先给“实际收录 X 次 / 字母条件允许 Y 期”、最近收录日期和 pangram 次数。向下展示日期、中心字母和对应历史题。统计覆盖的起止日放在数字旁。

**可直接制作的内容**　本地 2024-01-01 至 2026-11-03 的 1,038 期 Spelling Bee，合计有 9,184 个不同答案。ONION 在 66 期满足字母条件，这 66 期都实际收录了它。ADIT 在 19 期满足字母条件，收录为 0。两种结果并列，比单纯返回“找到/找不到”更有解释力。“字母条件允许”只检查长度、字母集合和必含中心字母；“收录”查当期保存的正式答案。覆盖期以外不作判断。[本站蜂巢档案](../data/spelling-bee-daily.json) · [玩家对查词记录的需求](https://www.reddit.com/r/NYTSpellingBee/comments/1r8dgw5/how_many_times_a_word_has_appeared/)

**正文顺序**　查词及结果 → 最近和最早出现日期 → 历次收录明细 → 遇到“符合字母条件但未被收录”时如何读结果。历史查询默认统计已结束的题目，保留当期解题体验。新页承接单词查询，现有 Bee 答案页继续承接按日期找题。

**入口与验收**　来源建议为 Bee 历史答案和练习页。验证一个已收录词、一个有字母机会但从未收录的词、一个字母条件从未成立的词。三者应给出不同的结果说明。记录查询完成率以及从查询进入某期历史题的比例。

### Wordle 赛后复盘

**英文标题建议**　Wordle Analyzer: Review Your Guesses Step by Step

**手机首屏**　允许选择已结束的历史题，或手动输入已知答案，然后逐行填入自己的猜词。提供一键载入的历史示例。Wordle 分享用的彩色方块不含猜词字母；若支持粘贴方块，界面应明确提示补录单词。首版采用手动输入即可。[竞品复盘输入方式](https://www.fiveletterwords.io/analyze)

**逐步输出**　每一猜列出猜前候选数、实际颜色反馈、猜后候选数，旁边给几个被排除的例词。最后指出缩小范围最多的一步。高阶比较可在后续展示“同一猜前局面下，各种反馈平均会剩多少词”，避免把一次幸运的反馈等同于策略优秀。候选池需展示版本和规模。对历史题若使用历年记录作为候选，只可使用该日期前可知的信息，并说明局限；更简单的首版可统一使用注明版本的固定参考表做模拟。

**入口与验收**　从历史日期页或已揭晓答案的位置进入，和局中找词的现有 Solver 分开。用答案 SIREN、猜词 SHEEP 验证反馈是绿、灰、灰、绿、灰；SWEET 与这行矛盾，必须被排除。还需验证答案落在参考表之外时仍能完成判色，并解释候选计数的限制。首要指标为开始输入后完成整局复盘的比例。

## 后续五页的上线条件

| 页面 | 最小可用版本 | 适合启动的时机 |
|---|---|---|
| Spelling Bee Solver | 七个字母中明确指定中心字母；与已结束历史蜂巢完全匹配时可选具体日期，否则按历史词库筛候选，支持重复用字。先显示长度和数量，答案手动揭开。 | Bee 历史索引准确后即可复用。相同字母组合若命中多期，应分别读取各期答案。 |
| Make Your Own Wordle | 一个秘密词、可选提示、出题人预览、挑战链接。接收者点开即玩，完成后可回敬一题。 | 作为分享实验的第一项。记录创建、接收者开局、接收者完赛三个阶段。现有 `/share` 服务于分享网站，保持不同用途。 |
| Wordle Trap Trainer | 先给出 `_IGHT`、`_ATCH` 等有足够可选词的残局。玩家先猜，再看普通模式下一个探测词能排掉多少候选；困难模式执行相应规则。 | 复盘后记录“再练类似局面”的点击。先验证少量局面有人重复练，再增加词型。 |
| Connections Maker | 四个组名、每组四词、重复词提醒、乱序预览和好友挑战链接。搜索引擎只收录制作器入口。 | Wordle 挑战已有接收者开局证据，再把分享方式扩到 Connections。核心指标是每个已分享谜题带来的独立玩家开局。 |
| Letter Boxed Solver | 手动输入四边字母，先显示首词长度或连接字母，再揭示完整两词链和字母走线；两词无解时按词库与搜索范围说明结果。 | 先核实可持续使用的完整英文词库，以历史样题校验跨边、首尾承接、十二字母覆盖等规则。当天棋盘预填需要单独确认稳定数据来源。 |

## 上线后如何决定继续扩页

第一批三页分开记录发布日期和索引状态。以首次获得索引后的 28 天作为首次观察窗口，这个周期用来做决策，不代表收录或排名承诺。

- **看搜索入口。** 在 Search Console 按美国、网页、查询分组，观察 `without vowels`、`spelling bee word history`、`wordle analyzer` 及近义词的展现、点击和对应 URL。若大多是原有通用词从旧页转移，新站级搜索增量仍待证明。
- **看玩家是否完成任务。** 词表看有效筛选，查词看查询完成和历史题点击，复盘看开始到完成的比例。数据量小时同时报实际人数和比率，避免少数访问造成错误排序。
- **用完成行为决定下一批。** 若 Bee 玩家连续查多个词，优先接 Bee Solver；若复盘玩家主动点“再练类似局面”，优先做残局训练。分享页依据接收者开局和完赛决定是否扩大到 Connections。Letter Boxed 有独立词库依赖，不与这一批日期发布绑定。
