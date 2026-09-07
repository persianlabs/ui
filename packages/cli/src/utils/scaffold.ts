import { existsSync, readdirSync } from "node:fs"
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"

// Create-from-zero scaffolding: copies a full project base (the same
// "default template" projects kept in the repo's _example/ dir) into the
// user's target directory, then init applies the preset on top.
//
// The bases are repo assets for now — when the CLI is published they ship
// inside the package (templates/<name>/) and resolveTemplateDir falls back
// to that location first.

export const TEMPLATE_SOURCES: Record<string, string> = {
  next: "nextjs-base",
  "next-turborepo": "turbonextjs-base",
  // vite: "vite-base", — base not finalized yet; init rejects the template.
}

// Directories/files that must never travel with a scaffold.
const COPY_IGNORE = new Set([
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
  "pnpm-workspace.yaml",
])

// Where shadcn/-file operations run inside the scaffolded project: the
// monorepo base keeps the app in apps/web, flat bases at the root.
export function templateAppDir(template: string) {
  return template === "next-turborepo" ? "apps/web" : "."
}

// Walk up from `from` looking for the repo's _example/ dir (repo-local
// development), then for the packaged templates dir (published CLI).
export function resolveTemplateDir(cwd: string, template: string) {
  const sourceName = TEMPLATE_SOURCES[template]
  if (!sourceName) {
    throw new Error(
      `Unknown template "${template}". Available: ${Object.keys(TEMPLATE_SOURCES).join(", ")}.`
    )
  }

  let dir = path.resolve(cwd)
  while (true) {
    const candidate = path.join(dir, "_example", sourceName)
    if (existsSync(candidate)) {
      return candidate
    }
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }

  throw new Error(
    `Template base "${sourceName}" not found (looked for _example/ while walking up from ${cwd}). Run persianlabsui from inside the persian-labs/ui repo for now.`
  )
}

async function copyTree(from: string, to: string) {
  await mkdir(path.dirname(to), { recursive: true })
  await cp(from, to, {
    recursive: true,
    filter: (src) => {
      const base = path.basename(src)
      return !COPY_IGNORE.has(base)
    },
  })
}

export function isDirEmpty(dir: string) {
  if (!existsSync(dir)) return true
  try {
    return readdirSync(dir).length === 0
  } catch {
    return false
  }
}

// Scaffolds `template` into `target` (must be empty or nonexistent).
// Returns the absolute path of the app directory inside it.
export async function scaffoldTemplate(options: {
  template: string
  target: string
  projectName: string
  overwrite?: boolean
}) {
  const target = path.resolve(options.target)
  const appDirRel = templateAppDir(options.template)

  if (!isDirEmpty(target)) {
    if (!options.overwrite) {
      throw new Error(
        `Directory ${target} is not empty. Choose another project name or remove it first.`
      )
    }
    await rm(target, { recursive: true, force: true })
  }

  const source = resolveTemplateDir(process.cwd(), options.template)
  await copyTree(source, target)

  // Rename the copied root package to the chosen project name.
  const appDir = path.join(target, appDirRel)
  const pkgFile = path.join(target, "package.json")
  try {
    const pkg = JSON.parse(await readFile(pkgFile, "utf8"))
    pkg.name = options.projectName
    await writeFile(pkgFile, JSON.stringify(pkg, null, 2) + "\n")
  } catch {
    // Base without a root package.json — leave as-is.
  }

  return { target, appDir, appDirRel }
}
