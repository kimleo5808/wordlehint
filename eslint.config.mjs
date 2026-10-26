import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Next 16 removed `next lint`; this flat config replaces the old
// `.eslintrc.json` (`extends: next/core-web-vitals`) one-to-one.
export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // React Compiler rules shipped with eslint-plugin-react-hooks v6+.
      // The compiler isn't enabled here, so memoization hints are moot, and
      // the mount-then-read-cookie/localStorage pattern is intentional
      // (hydration-safe), so keep it visible as a warning only.
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    ".open-next/**",
    ".wrangler/**",
    "node_modules/**",
    "next-env.d.ts",
    "cloudflare-env.d.ts",
  ]),
]);
