import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Prerendered pages are served from Workers static assets (a read-only
 * cache; files land under the worker-only cdn-cgi/_next_cache path).
 *
 * The site is fully rebuilt on every deploy and never revalidates at runtime
 * (the revalidation queue is OpenNext's no-op default), so it never needs to
 * write to the cache. The R2 cache it replaces cost one Cloudflare API call
 * per page on every deploy (~1,700), which collided with the sister sites'
 * deploys on the account-wide 1,200-requests-per-5-minutes limit (HTTP 429).
 * Static assets go up in a few batched, resumable requests instead.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
