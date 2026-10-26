/**
 * wordlehint-deploy-trigger — Cloudflare Cron Trigger worker.
 *
 * The site is statically built, so "today" only changes on a rebuild.
 * GitHub's own `schedule` trigger is often hours late, so this worker fires
 * the deploy workflow through `workflow_dispatch` (which starts immediately)
 * right after each NYT rollover:
 *   - midnight ET → Wordle, Connections, Strands
 *   - 3 AM ET     → Spelling Bee
 *
 * The crons in wrangler.jsonc cover both UTC offsets (EDT and EST); each run
 * only dispatches when it lands in one of the target ET hours, so DST needs
 * no manual changes.
 *
 * Secret: GITHUB_TOKEN — fine-grained PAT for this repo with
 * "Actions: Read and write".
 */

const REPO = "kimleo5808/wordlehint";
const WORKFLOW = "deploy-cloudflare.yml";
const TARGET_ET_HOURS = new Set([0, 3]);

function easternHour(date) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      hourCycle: "h23",
    }).format(date)
  );
}

async function dispatchDeploy(token) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "wordlehint-deploy-trigger",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );
  // 204 = queued. Anything else (401 bad token, 404 wrong repo/workflow…)
  // fails the cron run so it shows up in the Workers dashboard.
  if (res.status !== 204) {
    throw new Error(`workflow_dispatch failed: ${res.status} ${await res.text()}`);
  }
}

const worker = {
  async scheduled(controller, env) {
    const hour = easternHour(new Date(controller.scheduledTime));
    if (!TARGET_ET_HOURS.has(hour)) {
      console.log(`Skip: ${hour}:xx ET is not a rollover hour`);
      return;
    }
    if (!env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN secret is not set");
    await dispatchDeploy(env.GITHUB_TOKEN);
    console.log(`Dispatched ${WORKFLOW} at ${hour}:xx ET`);
  },
};

export default worker;
