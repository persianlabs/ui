#!/usr/bin/env node
import { Command } from "commander"

import { runInit } from "./commands/init.js"
import { runApply } from "./commands/apply.js"
import { runAdd } from "./commands/add.js"
import { runPreset } from "./commands/preset.js"
import { logger } from "./utils/logger.js"
import { isPackageManager } from "./utils/package-manager.js"

process.on("SIGINT", () => process.exit(0))

const program = new Command()
  .name("persianlabsui")
  .description(
    "Add RTL-first, Persian-typography components built on Base UI to your project."
  )
  .version("0.1.2")

program
  .command("init")
  .description("create a new project from zero and apply a preset")
  .option("-p, --preset [name]", "use a preset configuration")
  .option(
    "-t, --template <template>",
    "the template to use. (next, vite, next-monorepo, vite-monorepo)"
  )
  .option(
    "-n, --name <name>",
    "project name — the directory to create. skips the prompt"
  )
  .option(
    "--package-manager <manager>",
    "the package manager to use: pnpm, npm, bun. overrides auto-detection"
  )
  .option(
    "-c, --cwd <cwd>",
    "base directory to create the project in. defaults to the current directory.",
    process.cwd()
  )
  .option(
    "-f, --force",
    "overwrite the target directory if it is not empty.",
    false
  )
  .option("-s, --silent", "mute output. requires --template and --name.", false)
  .action(async (opts) => {
    try {
      await runInit({
        preset: opts.preset === true ? undefined : opts.preset,
        template: opts.template,
        name: opts.name,
        cwd: opts.cwd,
        force: opts.force,
        silent: opts.silent,
        packageManager: parsePackageManagerFlag(opts.packageManager),
      })
    } catch (error) {
      handleError(error)
    }
  })

program
  .command("apply")
  .description("apply a preset to an existing project")
  .argument("[preset]", "the preset to apply")
  .option("--preset <preset>", "preset configuration to apply")
  .option("--only [parts]", "apply only parts of a preset: theme, font")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-s, --silent", "mute output.", false)
  .action(async (presetArg, opts) => {
    try {
      await runApply({
        preset: presetArg ?? opts.preset,
        only: opts.only === true ? undefined : opts.only,
        cwd: opts.cwd,
        silent: opts.silent,
      })
    } catch (error) {
      handleError(error)
    }
  })

program
  .command("add")
  .description("add components from the Persian Labs registry")
  .argument("<items...>", "component names, URLs or @namespaced items")
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-s, --silent", "mute output.", false)
  .action(async (items, opts) => {
    try {
      await runAdd(items, {
        cwd: opts.cwd,
        overwrite: opts.overwrite,
        silent: opts.silent,
      })
    } catch (error) {
      handleError(error)
    }
  })

program
  .command("preset")
  .description("manage presets")
  .argument("<action>", "decode | url | open")
  .argument("[code]", "the preset code")
  .option("--json", "output as JSON.", false)
  .action(async (action, code, opts) => {
    try {
      await runPreset(action, code, { json: opts.json })
    } catch (error) {
      handleError(error)
    }
  })

function handleError(error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message)
  } else {
    logger.error(String(error))
  }
  process.exit(1)
}

function parsePackageManagerFlag(value: string | undefined) {
  if (value === undefined) return undefined
  if (isPackageManager(value)) return value
  throw new Error(`Invalid package manager "${value}". Use pnpm, npm or bun.`)
}

program.parse()
