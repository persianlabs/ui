import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { copyFile, mkdir, rm } from "node:fs/promises"
import path from "node:path"

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
  options: { cwd: string; overwrite?: boolean; silent?: boolean }
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

  const args = [
    "shadcn@latest",
    "add",
    ...staged,
    "--yes",
    ...(options.overwrite ? ["--overwrite"] : []),
    "-c",
    cwd,
  ]

  try {
    await new Promise<void>((resolve, reject) => {
      const { command, commandArgs, shell } = resolveNpxCommand(args)
      const child = spawn(command, commandArgs, {
        cwd,
        stdio: options.silent ? "ignore" : "inherit",
        shell,
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

// npx is a .cmd shim on Windows, and spawning a .cmd requires shell:true —
// which trips Node's DEP0190 warning when args are passed unescaped. When
// running under Node, spawn npm's npx-cli.js directly instead (no shell, no
// warning); fall back to the old behavior when the shim can't be located
// (e.g. exotic Node installs).
function resolveNpxCommand(args: string[]): {
  command: string
  commandArgs: string[]
  shell: boolean
} {
  if (process.platform === "win32") {
    const npxCli = path.join(
      path.dirname(process.execPath),
      "node_modules",
      "npm",
      "bin",
      "npx-cli.js"
    )
    if (existsSync(npxCli)) {
      return {
        command: process.execPath,
        commandArgs: [npxCli, ...args],
        shell: false,
      }
    }
  }
  return {
    command: "npx",
    commandArgs: args,
    shell: process.platform === "win32",
  }
}
