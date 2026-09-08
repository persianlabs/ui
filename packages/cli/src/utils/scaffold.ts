import { existsSync, readdirSync } from "node:fs"
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { exec } from "node:child_process"
import { promisify } from "node:util"

import {
  getPackageManagerVersion,
  resolvePackageManager,
  type PackageManager,
} from "./package-manager.js"

const execAsync = promisify(exec)

// Create-from-zero scaffolding, modeled on the shadcn CLI: the published
// package does NOT bundle templates — it sparse-clones templates/<dir> from
// GitHub at init time. For development, PERSIANLABSUI_TEMPLATE_DIR points at
// the repo's templates/ dir so local edits are picked up without a clone.

export const TEMPLATE_SOURCES: Record<string, string> = {
  next: "next-app",
  vite: "vite-app",
  // Monorepo variants (Get Code "Create a monorepo" switch). The legacy
  // next-turborepo name stays accepted for old links/commands.
  "next-monorepo": "next-monorepo",
  "next-turborepo": "next-monorepo",
  "vite-monorepo": "vite-monorepo",
}

// shadcn-style default project names per template.
export const DEFAULT_PROJECT_NAMES: Record<string, string> = {
  next: "next-project",
  vite: "vite-project",
  "next-monorepo": "turbo-project",
  "next-turborepo": "turbo-project",
  "vite-monorepo": "turbo-project",
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
  "pnpm-workspace.yaml",
])

export function isMonorepoTemplate(template: string) {
  return template.endsWith("-monorepo") || template === "next-turborepo"
}

// Where shadcn/-file operations run inside the scaffolded project: the
// monorepo bases keep the app in apps/web, flat bases at the root.
export function templateAppDir(template: string) {
  return isMonorepoTemplate(template) ? "apps/web" : "."
}

// The repo the templates are sparse-cloned from. The GitHub URL override
// mirrors SHADCN_GITHUB_URL (forks/private mirrors), the template-dir
// override mirrors SHADCN_TEMPLATE_DIR (repo development).
const GITHUB_REPO_URL =
  process.env.PERSIANLABSUI_GITHUB_URL ??
  "https://github.com/persianlabs/ui.git"

// Sparse-clone templates/<dir> from GitHub (blobless, depth 1) and move it
// into place — the same strategy the shadcn CLI uses, so the npm package
// stays small and templates are always current with the default branch.
// With PERSIANLABSUI_TEMPLATE_DIR set (repo development), resolve from the
// local checkout instead and skip the cleanup in scaffoldTemplate.
export async function resolveTemplate(
  cwd: string,
  template: string
): Promise<string> {
  const sourceName = TEMPLATE_SOURCES[template]
  if (!sourceName) {
    throw new Error(
      `Unknown template "${template}". Available: ${Object.keys(TEMPLATE_SOURCES).join(", ")}.`
    )
  }

  const localDir = process.env.PERSIANLABSUI_TEMPLATE_DIR
  if (localDir) {
    const local = path.resolve(localDir, sourceName)
    if (!existsSync(local)) {
      throw new Error(
        `Template "${sourceName}" not found in PERSIANLABSUI_TEMPLATE_DIR (${localDir}).`
      )
    }
    return local
  }

  const tmp = path.join(os.tmpdir(), `persianlabsui-template-${Date.now()}`)
  await execAsync(
    `git clone --depth 1 --filter=blob:none --sparse "${GITHUB_REPO_URL}" "${tmp}"`
  )
  await execAsync(`git -C "${tmp}" sparse-checkout set templates/${sourceName}`)
  const extracted = path.join(tmp, "templates", sourceName)
  if (!existsSync(extracted)) {
    await rm(tmp, { recursive: true, force: true })
    throw new Error(
      `Template "${sourceName}" not found in ${GITHUB_REPO_URL} (templates/${sourceName}).`
    )
  }
  const target = path.join(tmp, "template")
  await rename(extracted, target)
  return target
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
// Returns the absolute path of the app directory inside it. The copied
// project is normalized to the package manager the user created it with
// (pnpm→pnpm, npm→npm, bun→bun): the root packageManager field
// is rewritten so installs never get forced onto bun, and workspace fields
// are adjusted per manager.
export async function scaffoldTemplate(options: {
  template: string
  target: string
  projectName: string
  overwrite?: boolean
  packageManager?: PackageManager | null
}) {
  const target = path.resolve(options.target)
  const appDirRel = templateAppDir(options.template)
  const pm = resolvePackageManager(options.packageManager)

  if (!isDirEmpty(target)) {
    if (!options.overwrite) {
      throw new Error(
        `Directory ${target} is not empty. Choose another project name or remove it first.`
      )
    }
    await rm(target, { recursive: true, force: true })
  }

  const source = await resolveTemplate(process.cwd(), options.template)
  await copyTree(source, target)
  // The sparse clone is scratch — remove the whole temp dir after copying.
  // With PERSIANLABSUI_TEMPLATE_DIR the source is the repo checkout itself,
  // so nothing is removed.
  if (!process.env.PERSIANLABSUI_TEMPLATE_DIR) {
    await rm(path.dirname(source), { recursive: true, force: true })
  }

  // Normalize the copied root package: project name plus per-manager
  // fields. Flat bases drop the workspaces field (pnpm rejects it);
  // monorepo bases keep it for npm/bun but drop it for pnpm, which
  // only reads pnpm-workspace.yaml. Build approvals live in
  // pnpm-workspace.yaml (allowBuilds) — pnpm >= 11 no longer reads the
  // "pnpm" field from package.json and warns loudly when present, so it is
  // stripped from every package.json in the scaffold.
  const pkgFile = path.join(target, "package.json")
  try {
    const pkg = JSON.parse(await readFile(pkgFile, "utf8"))
    pkg.name = options.projectName
    if (pm === "pnpm" || !isMonorepoTemplate(options.template)) {
      delete pkg.workspaces
    }
    delete pkg.pnpm
    if (pm === "npm") {
      // npm doesn't understand the workspace: protocol — link file: dirs.
      rewriteWorkspaceProtocol(target, target, pkg)
    }
    const pmVersion = getPackageManagerVersion(pm)
    if (pmVersion) {
      pkg.packageManager = `${pm}@${pmVersion}`
    } else {
      delete pkg.packageManager
    }
    await writeFile(pkgFile, JSON.stringify(pkg, null, 2) + "\n")
  } catch {
    // Base without a root package.json — leave as-is.
  }

  await normalizeNestedPackages(target, pm)

  // pnpm >= 11 reads build approvals from the allowBuilds map in
  // pnpm-workspace.yaml (onlyBuiltDependencies is ignored there) — without
  // it installs fail with ERR_PNPM_IGNORED_BUILDS. Monorepo bases also
  // declare their packages here (pnpm ignores the workspaces field).
  const workspaceFile = path.join(target, "pnpm-workspace.yaml")
  if (!existsSync(workspaceFile)) {
    const packages = isMonorepoTemplate(options.template)
      ? "packages:\n  - apps/*\n  - packages/*\n"
      : ""
    await writeFile(
      workspaceFile,
      `# pnpm build-script approvals for scaffolded persianlabsui projects\n${packages}allowBuilds:\n  sharp: true\n  unrs-resolver: true\n  esbuild: true\n`
    )
  }

  // Monorepo bases keep the shadcn components + stylesheet in packages/ui
  // (the shadcn monorepo layout): components.json and `shadcn add` target
  // that package, not apps/web. Flat bases have no ui package — appDir and
  // uiDir coincide.
  const uiDirRel = isMonorepoTemplate(options.template)
    ? "packages/ui"
    : appDirRel
  return {
    target,
    appDir: path.join(target, appDirRel),
    appDirRel,
    uiDir: path.join(target, uiDirRel),
    uiDirRel,
  }
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

// Strip the legacy "pnpm" field from every nested package.json and, for
// npm (which lacks the workspace: protocol), rewrite workspace:* deps to
// file: links so `npm install` resolves the monorepo.
async function normalizeNestedPackages(
  target: string,
  pm: PackageManager
): Promise<void> {
  const files = await collectPackageJsonFiles(target)
  for (const file of files) {
    if (path.resolve(file) === path.resolve(target, "package.json")) continue
    let pkg: Record<string, unknown>
    try {
      pkg = JSON.parse(await readFile(file, "utf8"))
    } catch {
      continue
    }
    let changed = false
    if ("pnpm" in pkg) {
      delete pkg.pnpm
      if (pm === "npm") {
        // npm doesn't understand the workspace: protocol — link file: dirs.
        rewriteWorkspaceProtocol(target, target, pkg)
      }
      changed = true
    }
    if (pm === "npm") {
      changed =
        rewriteWorkspaceProtocol(path.dirname(file), target, pkg) || changed
    }
    if (changed) {
      await writeFile(file, JSON.stringify(pkg, null, 2) + "\n")
    }
  }
}

async function collectPackageJsonFiles(dir: string): Promise<string[]> {
  const out: string[] = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await collectPackageJsonFiles(full)))
    } else if (entry.isFile() && entry.name === "package.json") {
      out.push(full)
    }
  }
  return out
}

// Maps workspace package names to their directory inside the scaffold.
const WORKSPACE_DIRS: Record<string, string> = {
  "@workspace/eslint-config": "packages/eslint-config",
  "@workspace/typescript-config": "packages/typescript-config",
  "@workspace/ui": "packages/ui",
}

function rewriteWorkspaceProtocol(
  fromDir: string,
  target: string,
  pkg: Record<string, unknown>
): boolean {
  let changed = false
  for (const section of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    const deps = pkg[section] as Record<string, string> | undefined
    if (!deps || typeof deps !== "object") continue
    for (const [name, spec] of Object.entries(deps)) {
      if (typeof spec === "string" && spec.startsWith("workspace:")) {
        const dir = WORKSPACE_DIRS[name]
        if (!dir) continue
        const rel = path
          .relative(fromDir, path.join(target, dir))
          .split(path.sep)
          .join("/")
        deps[name] = `file:${rel || "."}`
        changed = true
      }
    }
  }
  return changed
}
