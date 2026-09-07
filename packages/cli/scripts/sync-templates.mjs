// Syncs the template bases from the repo's _example/ dir into
// packages/cli/templates/ — the copies that ship inside the published npm
// package (see resolveTemplateDir in src/utils/scaffold.ts). Excludes
// anything that must never travel with a scaffold (deps, build output,
// lockfiles).
//
//   bun run sync-templates        (from packages/cli)

import { cpSync, existsSync, readdirSync, rmSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const repoRoot = path.dirname(path.dirname(packageRoot))

const TEMPLATES = [
  "nextjs-base",
  "turbonextjs-base",
  "turbovite-base",
  "vite-base",
]

const EXCLUDED = new Set([
  "node_modules",
  ".next",
  ".turbo",
  ".git",
  ".DS_Store",
  "tsconfig.tsbuildinfo",
  "bun.lock",
  "bun.lockb",
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
])

const destRoot = path.join(packageRoot, "templates")
rmSync(destRoot, { recursive: true, force: true })

for (const name of TEMPLATES) {
  const src = path.join(repoRoot, "_example", name)
  if (!existsSync(src)) {
    throw new Error(`Template base not found: ${src}`)
  }
  cpSync(src, path.join(destRoot, name), {
    recursive: true,
    filter: (srcPath) => {
      if (srcPath === src) return true
      return !EXCLUDED.has(path.basename(srcPath))
    },
  })
  console.log(`${name}: ${countFiles(path.join(destRoot, name))} files`)
}

function countFiles(dir) {
  let total = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    total += entry.isDirectory() ? countFiles(p) : 1
  }
  return total
}

void statSync
