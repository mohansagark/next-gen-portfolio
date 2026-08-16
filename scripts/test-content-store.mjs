/**
 * Orphan script retained as a thin CLI wrapper. Prefer:
 *   npm test  (contentStore coverage in portfolioData.test.mjs)
 */
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync(
  process.execPath,
  ["--test", "src/libs/__tests__/portfolioData.test.mjs"],
  { cwd: root, stdio: "inherit" }
);
process.exit(result.status ?? 1);
