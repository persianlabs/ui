import path from "node:path"

import { existsSync } from "node:fs"
import { resolveConfig } from "./init.js"
import {
  buildInitUrl,
  fetchRegistryBase,
  installFontsOffline,
} from "../registry/fetch-base.js"
import { writeComponentsJson } from "../utils/components-json.js"
import { logger } from "../utils/logger.js"
import { runShadcnAdd } from "../utils/shadcn.js"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import os from "node:os"

// Apply presets target packages/ui when the project is a shadcn-style
// monorepo (components.json lives next to the ui package), apps/web
// otherwise.
export function resolveApplyDirs(cwd: string) {
  const ui = path.join(cwd, "packages", "ui")
  const isMonorepo = existsSync(path.join(ui, "components.json"))
  return {
    isMonorepo,
    uiDir: ui,
    appDir: cwd,
  }
}

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
  const { isMonorepo, uiDir } = resolveApplyDirs(cwd)
  // `shadcn add` and components.json run in packages/ui for monorepos.
  const targetDir = isMonorepo ? uiDir : cwd

  logger.break()
  logger.log(`  Fetching ${options.only ?? "full"} preset payload...`)
  const registryBase = await fetchRegistryBase(initUrl)

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "persianlabsui-"))
  const tempFile = path.join(tempDir, "registry-base.json")
  await writeFile(tempFile, JSON.stringify(registryBase, null, 2))

  try {
    await runShadcnAdd([tempFile], {
      cwd: targetDir,
      overwrite: true,
      silent: options.silent,
    })
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }

  if (options.only !== "theme") {
    logger.log("  Downloading fonts for offline use...")
    await installFontsOffline(config, cwd, {
      publicDir: "public",
      ...(isMonorepo
        ? {
            cssRel: path.join("packages", "ui", "src", "styles", "globals.css"),
            fontsRel: path.join("packages", "ui", "src", "assets", "fonts"),
            pkgJsonRel: path.join("packages", "ui", "package.json"),
            assetPrefix: "../assets/fonts/",
          }
        : {}),
    })
  }

  await writeComponentsJson(targetDir)

  logger.break()
  logger.success("Preset applied.")
  logger.break()
}
