import { spawn } from "node:child_process"

// Thin CLI strategy: file-writing, dependency installs, and registry item
// resolution are delegated to the stock shadcn CLI. We only generate the
// registry payloads (from our /init endpoint) and pass them through as
// local files, which `shadcn add` accepts.

export async function runShadcnAdd(
  itemPaths: string[],
  options: { cwd: string; overwrite?: boolean; silent?: boolean }
) {
  const args = [
    "shadcn@latest",
    "add",
    ...itemPaths,
    "--yes",
    ...(options.overwrite ? ["--overwrite"] : []),
    "-c",
    options.cwd,
  ]

  return new Promise<void>((resolve, reject) => {
    const child = spawn("npx", args, {
      cwd: options.cwd,
      stdio: options.silent ? "ignore" : "inherit",
      shell: process.platform === "win32",
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
}
