import path from "node:path"

import { resolveConfig } from "./init.js"
import { buildInitUrl, fetchRegistryBase, installFontsOffline } from "../registry/fetch-base.js"
import { writeComponentsJson } from "../utils/components-json.js"
import { logger } from "../utils/logger.js"
import { runShadcnAdd } from "../utils/shadcn.js"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import os from "node:os"

// apply: apply a preset to an EXISTING configured project, without
// scaffolding. Supports --only theme|font to re-theme without reinstalling
// UI components.
export async function runApply(options: {
  preset?: string
  only?: "theme" | "font"
  cwd: string
  silent?: boolean
}) {
  const cwd = path.resolve(options.cwd)
  const config = resolveConfig(options.preset)
  const initUrl = buildInitUrl(config, { only: options.only })

  logger.break()
  logger.log(`  Fetching ${options.only ?? "full"} preset payload...`)
  const registryBase = await fetchRegistryBase(initUrl)

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "persianlabsui-"))
  const tempFile = path.join(tempDir, "registry-base.json")
  await writeFile(tempFile, JSON.stringify(registryBase, null, 2))

  try {
    await runShadcnAdd([tempFile], {
      cwd,
      overwrite: true,
      silent: options.silent,
    })
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }

  if (options.only !== "theme") {
    logger.log("  Downloading fonts for offline use...")
    await installFontsOffline(config, cwd, { publicDir: "public" })
  }

  await writeComponentsJson(cwd)

  logger.break()
  logger.success("Preset applied.")
  logger.break()
}
