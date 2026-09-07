import { existsSync } from "node:fs"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import * as p from "@clack/prompts"

import { decodePreset, isPresetCode, type PresetConfig } from "../preset/preset.js"
import { buildInitUrl, fetchRegistryBase, installFontsOffline } from "../registry/fetch-base.js"
import { logger } from "../utils/logger.js"
import { isDirEmpty, scaffoldTemplate, TEMPLATE_SOURCES } from "../utils/scaffold.js"
import { runShadcnAdd } from "../utils/shadcn.js"
import { writeComponentsJson } from "../utils/components-json.js"

export type Template = keyof typeof TEMPLATE_SOURCES

// init: CREATE a new project from zero, shadcn-CLI style. Scaffolds the
// template base (the repo's _example projects), then applies the preset on
// top: registry:base payload via the stock shadcn CLI, offline fonts, and
// components.json wiring. Existing projects are handled by `apply`.
//
// Everything is promptable but never required: --template/--name/--preset
// skip their prompts so scripts can run fully non-interactive.
export async function runInit(options: {
  preset?: string
  template?: string
  name?: string
  cwd: string
  force?: boolean
  silent?: boolean
}) {
  const baseCwd = path.resolve(options.cwd)
  const config = resolveConfig(options.preset)
  const silent = options.silent ?? false

  const template = await resolveTemplate(options.template, silent)
  const projectName = await resolveProjectName(options.name, baseCwd, silent)
  const target = path.resolve(baseCwd, projectName)

  if (!silent) {
    p.intro(`persianlabsui — creating ${projectName}`)
  }

  // Scaffold
  let appDir: string
  try {
    if (!silent) {
      p.log.step(`Scaffolding ${template} template into ${target}`)
    }
    const scaffolded = await scaffoldTemplate({
      template,
      target,
      projectName,
      overwrite: options.force,
    })
    appDir = scaffolded.appDir
  } catch (error) {
    // Non-interactive contexts get a plain error; interactive ones confirm.
    if (silent || !(await confirmOverwrite(target))) {
      throw error
    }
    const scaffolded = await scaffoldTemplate({
      template,
      target,
      projectName,
      overwrite: true,
    })
    appDir = scaffolded.appDir
  }

  // Apply the preset: registry:base payload via the stock shadcn CLI.
  const initUrl = buildInitUrl(config, { template })
  if (!silent) {
    p.log.step("Fetching registry base from the Persian Labs registry...")
  } else {
    logger.log("  Fetching registry base from the Persian Labs registry...")
  }
  const registryBase = await fetchRegistryBase(initUrl)

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "persianlabsui-"))
  const tempFile = path.join(tempDir, "registry-base.json")
  await writeFile(tempFile, JSON.stringify(registryBase, null, 2))

  try {
    if (!silent) {
      p.log.step("Installing via shadcn CLI...")
    } else {
      logger.log("  Installing via shadcn CLI...")
    }
    await runShadcnAdd([tempFile], {
      cwd: appDir,
      overwrite: true,
      silent: options.silent,
    })
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }

  if (!silent) {
    p.log.step("Downloading fonts for offline use...")
  } else {
    logger.log("  Downloading fonts for offline use...")
  }
  await installFontsOffline(config, appDir, { publicDir: "public" })

  await writeComponentsJson(appDir, options.force)

  const cdPath = path.relative(process.cwd(), target) || "."
  const doneLines = [
    `Project: ${projectName}`,
    `Preset:  ${JSON.stringify(config)}`,
    "",
    `Next steps:`,
    `  cd ${cdPath}`,
    `  bun install   # or npm install / pnpm install`,
    `  bun dev       # or npm run dev`,
  ]
  if (silent) {
    logger.break()
    logger.success("Project created.")
    for (const line of doneLines) logger.log(`  ${line}`)
    logger.break()
  } else {
    p.outro(doneLines.join("\n"))
  }
}

// Interactive template select, skipped when the flag is present. Vite is
// listed but disabled until its base exists.
async function resolveTemplate(templateFlag: string | undefined, silent: boolean) {
  if (templateFlag) {
    if (!TEMPLATE_SOURCES[templateFlag]) {
      throw new Error(
        `Unknown template "${templateFlag}". Available: ${Object.keys(TEMPLATE_SOURCES).join(", ")}.`
      )
    }
    return templateFlag
  }
  if (silent) {
    throw new Error("--template is required in non-interactive mode (next | next-turborepo).")
  }
  const selected = await p.select({
    message: "Which template?",
    initialValue: "next",
    options: [
      { value: "next", label: "Next.js", hint: "App Router with RSC" },
      {
        value: "next-turborepo",
        label: "Next.js + Turborepo",
        hint: "Monorepo starter",
      },
    ],
  })
  if (p.isCancel(selected)) {
    p.cancel("Cancelled.")
    process.exit(0)
  }
  return selected as string
}

// shadcn-style project-name prompt. Defaults to a friendly name; "." means
// "right here" and requires an empty directory.
async function resolveProjectName(
  nameFlag: string | undefined,
  baseCwd: string,
  silent: boolean
) {
  if (nameFlag) {
    return validateName(nameFlag)
  }
  if (silent) {
    throw new Error("--name is required in non-interactive mode.")
  }
  const answer = await p.text({
    message: "Project name (directory to create)",
    placeholder: "my-persian-app",
    defaultValue: "my-persian-app",
    validate: (value) => {
      const v = value?.trim() || "my-persian-app"
      if (v !== "." && !/^[^\\/]+$/.test(v)) {
        return "Use a single directory name (no path separators)."
      }
      if (v !== "." && existsSync(path.resolve(baseCwd, v)) && !isDirEmpty(path.resolve(baseCwd, v))) {
        return "That directory already exists and is not empty."
      }
      return undefined
    },
  })
  if (p.isCancel(answer)) {
    p.cancel("Cancelled.")
    process.exit(0)
  }
  return validateName((answer as string)?.trim() || "my-persian-app")
}

function validateName(name: string) {
  if (name === ".") {
    return "."
  }
  if (!/^[^\\/]+$/.test(name)) {
    throw new Error(`Invalid project name "${name}" — use a single directory name.`)
  }
  return name
}

async function confirmOverwrite(target: string) {
  if (isDirEmpty(target)) {
    return true
  }
  const proceed = await p.confirm({
    message: `${target} is not empty. Overwrite its contents?`,
    initialValue: false,
  })
  if (p.isCancel(proceed) || !proceed) {
    p.cancel("Cancelled — directory left untouched.")
    process.exit(0)
  }
  return true
}

// Resolve a PresetConfig from a preset code, falling back to defaults.
// Defaults: Vazirmatn for Persian, Geist for English.
export function resolveConfig(presetCode?: string): PresetConfig {
  if (!presetCode) {
    return {
      style: "nova",
      baseColor: "neutral",
      theme: "neutral",
      font: "geist",
      fontHeading: "inherit",
      faFont: "vazirmatn",
      faFontHeading: "vazirmatn",
      radius: "default",
      menuAccent: "subtle",
      menuColor: "default",
      fontSource: "local",
      fontHeadingSource: "local",
      faFontSource: "local",
      faFontHeadingSource: "local",
      fontMono: "geist-mono",
      fontMonoSource: "local",
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
