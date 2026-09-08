import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { copyFile, mkdir, rm } from "node:fs/promises"
import path from "node:path"

import {
  detectProjectPackageManager,
  quoteShellToken,
  resolvePackageManager,
  type PackageManager,
} from "./package-manager.js"

// Thin CLI strategy: file-writing, dependency installs, and registry item
// resolution are delegated to the stock shadcn CLI. We only generate the
// registry payloads (from our /init endpoint) and pass them through as
// local files, which `shadcn add` accepts.
//
// Local payload files are staged into <cwd>/.persianlabsui/ and passed as
// relative paths: a bare Windows absolute path (C:\...) is rejected with
// "unknown scheme", and file:// URLs are not fetchable by shadcn.
export async function runShadcnAdd(
  itemPaths: string[],
  options: {
    cwd: string
    overwrite?: boolean
    silent?: boolean
    packageManager?: PackageManager | null
  }
) {
  const cwd = path.resolve(options.cwd)
  const stageDir = path.join(cwd, ".persianlabsui")
  const staged: string[] = []
  let didStage = false

  for (const item of itemPaths) {
    if (existsSync(item) && path.isAbsolute(item)) {
      await mkdir(stageDir, { recursive: true })
      const target = path.join(stageDir, path.basename(item))
      await copyFile(item, target)
      staged.push(`./.persianlabsui/${path.basename(item)}`)
      didStage = true
    } else {
      staged.push(item)
    }
  }

  // An existing project owns its manager (packageManager field/lockfile);
  // fresh scaffolds pass it explicitly so shadcn installs with the same
  // manager the user created the project with.
  const pm =
    options.packageManager ??
    detectProjectPackageManager(cwd) ??
    resolvePackageManager()
  const command = buildDlxCommand(pm, [
    "shadcn@latest",
    "add",
    ...staged,
    "--yes",
    ...(options.overwrite ? ["--overwrite"] : []),
    "-c",
    cwd,
  ])

  try {
    await new Promise<void>((resolve, reject) => {
      // Single command string with shell:true and NO args array — spawning
      // with shell:true plus an args array trips Node's DEP0190 warning, so
      // everything is quoted into the string up front. NODE_NO_WARNINGS
      // silences the same warning inside the shadcn child (it spawns the
      // package manager with shell:true internally).
      const child = spawn(command, {
        cwd,
        stdio: options.silent ? "ignore" : "inherit",
        shell: true,
        env: { ...process.env, NODE_NO_WARNINGS: "1" },
      })

      child.on("error", reject)
      child.on("close", (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`shadcn add exited with code ${code}`))
        }
      })
    })
  } finally {
    if (didStage) {
      await rm(stageDir, { recursive: true, force: true })
    }
  }
}

// Installs project dependencies with the given manager (used after init
// steps that add new deps, e.g. fontsource packages on Vite).
export async function installProjectDependencies(options: {
  cwd: string
  packageManager: PackageManager
  silent?: boolean
}) {
  const cwd = path.resolve(options.cwd)
  const pm = resolvePackageManager(options.packageManager)
  const command = [pm, "install"].map(quoteShellToken).join(" ")
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, {
      cwd,
      stdio: options.silent ? "ignore" : "inherit",
      shell: true,
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    })
    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${pm} install exited with code ${code}`))
      }
    })
  })
}

// The dlx runner follows the manager: pnpm dlx / npx / bunx, so a project
// created with pnpm installs with pnpm, bun with bun, etc.
function buildDlxCommand(pm: PackageManager, args: string[]): string {
  const runner =
    pm === "pnpm" ? ["pnpm", "dlx"] : pm === "bun" ? ["bunx"] : ["npx"]
  return [...runner, ...args].map(quoteShellToken).join(" ")
}
