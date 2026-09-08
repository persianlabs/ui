import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"

export type PackageManager = "pnpm" | "npm" | "bun"

// True when the value is one of the supported managers.
export function isPackageManager(value: string): value is PackageManager {
  return value === "pnpm" || value === "npm" || value === "bun"
}

// The package manager the user invoked us with, parsed from
// npm_config_user_agent ("pnpm/10.4.1 npm/? node/v22...", "npm/11 ...",
// "bun/1.4.0"). Null when undetectable (direct node call).
export function detectInvokingPackageManager(): PackageManager | null {
  const agent = process.env.npm_config_user_agent ?? ""
  const name = agent.split(" ")[0]?.split("/")[0]?.toLowerCase()
  if (name === "pnpm" || name === "npm" || name === "bun") {
    return name
  }
  if ((process.versions as Record<string, string | undefined>).bun) {
    return "bun"
  }
  return null
}

function runManagerVersion(pm: string): string | null {
  try {
    // Never spawn with shell:true + an args array (Node DEP0190) — go
    // through cmd/sh so .cmd shims resolve without a shell spawn. Run in
    // the temp dir: managers like pnpm refuse --version inside a project
    // pinned to another manager via the packageManager field.
    const runner =
      process.platform === "win32"
        ? { command: "cmd", args: ["/d", "/s", "/c", `${pm} --version`] }
        : { command: "sh", args: ["-c", `${pm} --version`] }
    const result = spawnSync(runner.command, runner.args, {
      encoding: "utf8",
      shell: false,
      timeout: 15000,
      cwd: os.tmpdir(),
    })
    if (result.status !== 0 || result.error) return null
    const version = String(result.stdout ?? "")
      .trim()
      .split("\n")[0]
      ?.trim()
    return version && /^\d/.test(version) ? version : null
  } catch {
    return null
  }
}

export function isPackageManagerAvailable(pm: PackageManager): boolean {
  return runManagerVersion(pm) !== null
}

export function getPackageManagerVersion(pm: PackageManager): string | null {
  return runManagerVersion(pm)
}

// pnpm→pnpm, bun→bun. Invoked via npx/npm ("npm" agent) we still prefer
// pnpm when it is on the machine and only fall back to npm — npx is just
// the runner, pnpm the faster/better install for the project. The other
// chains fall back when the preferred binary is missing.
export function resolvePackageManager(
  preferred?: PackageManager | null
): PackageManager {
  const want = preferred ?? detectInvokingPackageManager()
  switch (want) {
    case "pnpm":
      return isPackageManagerAvailable("pnpm") ? "pnpm" : "npm"
    case "bun":
      return isPackageManagerAvailable("bun") ? "bun" : "npm"
    case "npm":
      if (isPackageManagerAvailable("pnpm")) return "pnpm"
      return isPackageManagerAvailable("npm") ? "npm" : "pnpm"
    default:
      if (isPackageManagerAvailable("pnpm")) return "pnpm"
      if (isPackageManagerAvailable("npm")) return "npm"
      if (isPackageManagerAvailable("bun")) return "bun"
      return "pnpm"
  }
}

// Detect the package manager OWNING an existing project: the packageManager
// field first, then lockfiles. Used by add/apply so they follow the project
// instead of the invoking manager. Null when nothing points anywhere.
export function detectProjectPackageManager(
  dir: string
): PackageManager | null {
  try {
    const pkgFile = path.join(path.resolve(dir), "package.json")
    if (existsSync(pkgFile)) {
      const pkg = JSON.parse(readFileSync(pkgFile, "utf8")) as {
        packageManager?: string
      }
      const field = pkg.packageManager?.split("@")[0]?.toLowerCase()
      if (field === "pnpm" || field === "npm" || field === "bun") {
        return field
      }
    }
  } catch {
    // Fall through to lockfile sniffing.
  }
  const root = path.resolve(dir)
  if (
    existsSync(path.join(root, "bun.lock")) ||
    existsSync(path.join(root, "bun.lockb"))
  ) {
    return "bun"
  }
  if (existsSync(path.join(root, "pnpm-lock.yaml"))) return "pnpm"
  if (existsSync(path.join(root, "package-lock.json"))) return "npm"
  return null
}

// Quote one shell token for both cmd.exe and POSIX sh.
export function quoteShellToken(token: string): string {
  if (/^[A-Za-z0-9_@./:+=,%~-]+$/.test(token)) return token
  return `"${token.replace(/"/g, '\\"')}"`
}
