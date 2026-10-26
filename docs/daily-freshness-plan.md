# Daily freshness — 今日页准时切换（第 2 步）

> 状态：代码完成，待配置 token（2026-10-26）

## 背景

- 今日页是 SSG，只在部署时更新。原 cron `30 3 * * *` 实际是美东前一天 23:30，真正拿到新题的是 `30 8 * * *`，而 GitHub `schedule` 常被延迟到 10–16 点 UTC。实测 2026-10-26 07:50 UTC 线上仍显示 #1954（前一天）。
- NYT 四个端点都能取到未来日期的题（实测 Wordle +10 天、其余 +1 天）。
- Spelling Bee 的 NYT 换题时间是美东 03:00，不是午夜。

## 方案

保持 SSG 不变（不改渲染方式），只解决“数据何时就位”和“何时部署”：

1. **读取层过滤**：四个 `lib/*-daily.ts` 的所有对外函数只返回 `date <= 今天` 的数据（Spelling Bee 用 03:00 ET 换日）。所有数据访问都经过这四个文件的 `loadData()`，客户端组件只 `import type`，所以在这一层过滤即可全覆盖。
2. **预抓 D+1**：四个 update 脚本改为“刷新今天 + 预抓明天”，共用 `scripts/lib/daily-updater.mjs`。今天抓取失败且本地没有 → 失败退出（Wordle 仍是硬依赖）；明天抓不到 → 只警告。今天的条目每次都会重新比对，NYT 若改题会被覆盖。
3. **准时部署**：独立的小 Worker `workers/deploy-trigger/`（Cloudflare Cron Trigger），在 04:05/05:05/07:05/08:05 UTC 触发，只有落在美东 00 点或 03 点的那次会调用 GitHub `workflow_dispatch`（自动适配夏令时）。
4. **工作流**：`workflow_dispatch` 也提交数据；构建与部署拆开，中间跑防泄露检查；去掉无效的 03:30 UTC cron，保留 08:30 UTC 作兜底。
5. **防泄露检查**：`scripts/check-future-leak.mjs` 在构建后扫描渲染产物和客户端 chunk，发现“尚未发布日期”即失败、不部署。
6. **兜底页**：今日数据缺失时标题不再出现 `Puzzle #?`。

## 对已收录页面的影响

- URL、页面结构、渲染方式都不变；只是新内容在美东午夜（Spelling Bee 03:00）后几分钟就上线。
- 唯一风险是提前泄露明天的答案，由第 1 项（逻辑上不可见）和第 5 项（构建产物兜底）双重保证。
- 仓库是公开的，`data/*.json` 里会提前一天出现明天的题。NYT 接口本身公开，不影响 SEO，只是知悉。

## 需要用户操作（一次性）

1. GitHub 生成 fine-grained token：仅授权本仓库，权限 `Actions: Read and write`。
2. 存为仓库 secret `DEPLOY_TRIGGER_TOKEN`，然后手动运行一次 “Deploy trigger worker” 工作流。

## Todolist

- [x] 四个读取层加“已发布”过滤；Spelling Bee 03:00 ET 换日，相关页面改用它
- [x] `scripts/lib/daily-updater.mjs` + 四个 update 脚本改造（刷新今天 + 预抓明天）；Wordle 释义脚本只处理已发布答案
- [x] `scripts/check-future-leak.mjs`
- [x] `workers/deploy-trigger/`（Worker + wrangler 配置）+ 部署它的工作流
- [x] `deploy-cloudflare.yml`：dispatch 提交数据（仅 main）、拆分 build/check/deploy、调整 cron
- [x] 今日页兜底标题
- [x] 验证（2026-10-26）：tsc / lint 通过；有无 D+1 数据两次构建 16381 个渲染文件逐个对比完全一致；时钟拨到 01:30 ET 的构建中 Wordle/Connections/Strands 已切换、Spelling Bee 未切换，检查无误报；`--now` 模拟泄露两种情况均被拦截
- [x] 更新 CLAUDE.md
- [ ] 用户：创建 `DEPLOY_TRIGGER_TOKEN` 并运行 “Deploy trigger worker” 工作流；次日 00:05 ET 后确认线上已切换
