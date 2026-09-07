import path from "node:path"

import { isUrl } from "../utils/is-url.js"
import { registryItemUrl } from "../registry/constants.js"
import { runShadcnAdd } from "../utils/shadcn.js"
import { logger } from "../utils/logger.js"

// add: install components from our registry. Bare names resolve against
// our registry; URLs and @namespaced names pass through to the shadcn CLI
// untouched.
export async function runAdd(
  items: string[],
  options: { cwd: string; overwrite?: boolean; silent?: boolean }
) {
  if (items.length === 0) {
    throw new Error("Nothing to add. Pass one or more component names.")
  }

  const resolved = items.map((item) =>
    isUrl(item) || item.startsWith("@") ? item : registryItemUrl(item)
  )

  logger.break()
  logger.log("  Installing via shadcn CLI:")
  for (const item of resolved) {
    logger.log(`    ${item}`)
  }

  await runShadcnAdd(resolved, {
    cwd: path.resolve(options.cwd),
    overwrite: options.overwrite,
    silent: options.silent,
  })

  logger.break()
  logger.success("Done.")
  logger.break()
}
