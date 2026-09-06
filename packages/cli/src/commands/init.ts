import { existsSync } from "node:fs"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { decodePreset, isPresetCode, type PresetConfig } from "../preset/preset.js"
import { buildInitUrl, fetchRegistryBase, installFontsOffline } from "../registry/fetch-base.js"
import { logger } from "../utils/logger.js"
import { runShadcnAdd } from "../utils/shadcn.js"
import { writeComponentsJson } from "../utils/components-json.js"

export type Template = "next" | "vite" | "next-turborepo"

// init: configure the project with a preset (or defaults), install the
// registry:base payload via the stock shadcn CLI, and copy fonts offline.
//
// Full project scaffolding (--name creating a brand new next/vite/turborepo
// app) lands once the template structures are finalized — see
// TODO(templates). Today this command configures an EXISTING project.
export async function runInit(options: {
  preset?: string
  template?: Template
  cwd: string
  force?: boolean
  silent?: boolean
}) {
  const cwd = path.resolve(options.cwd)

  if (!existsSync(path.resolve(cwd, "package.json"))) {
    throw new Error(
      `No package.json found in ${cwd}. Run this command inside an existing Next.js or Vite project. ` +
        `Full project scaffolding is coming soon.`
    )
  }

  const config = resolveConfig(options.preset)
  const initUrl = buildInitUrl(config, { template: options.template })

  logger.break()
  logger.log("  Fetching registry base from the Persian Labs registry...")
  const registryBase = await fetchRegistryBase(initUrl)

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "persianlabsui-"))
  const tempFile = path.join(tempDir, "registry-base.json")
  await writeFile(tempFile, JSON.stringify(registryBase, null, 2))

  try {
    logger.log("  Installing via shadcn CLI...")
    await runShadcnAdd([tempFile], {
      cwd,
      overwrite: true,
      silent: options.silent,
    })
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }

  logger.log("  Downloading fonts for offline use...")
  await installFontsOffline(config, cwd, { publicDir: "public" })

  await writeComponentsJson(cwd, options.force)

  logger.break()
  logger.success("Project configured.")
  logger.log(`  Preset: ${JSON.stringify(config)}`)
  logger.break()
}

// Resolve a PresetConfig from a preset code, falling back to defaults.
// Defaults: Vazirmatn for Persian, Inter for English.
export function resolveConfig(presetCode?: string): PresetConfig {
  if (!presetCode) {
    return {
      style: "nova",
      baseColor: "neutral",
      theme: "neutral",
      font: "inter",
      fontHeading: "inherit",
      faFont: "vazirmatn",
      faFontHeading: "vazirmatn",
      radius: "default",
    }
  }

  if (isPresetCode(presetCode)) {
    const decoded = decodePreset(presetCode)
    if (decoded) return decoded
  }

  throw new Error(`Invalid preset code: ${presetCode}`)
}

export async function writeTempRegistryBase(
  registryBase: unknown
): Promise<string> {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "persianlabsui-"))
  const tempFile = path.join(tempDir, "registry-base.json")
  await writeFile(tempFile, JSON.stringify(registryBase, null, 2))
  return tempFile
}
