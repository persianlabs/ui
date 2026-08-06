import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const REPO_ROOT = path.join(process.cwd(), "..", "..")

/**
 * Last-edited timestamp for a file, repo-root-relative (e.g.
 * "apps/web/app/docs/components/tabs/page.tsx"). Prefers the file's last
 * git commit date; falls back to filesystem mtime for uncommitted files.
 */
export function getLastEditedDate(relativePath: string): string | null {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relativePath],
      { cwd: REPO_ROOT, encoding: "utf8" }
    ).trim()

    if (output) {
      return output
    }
  } catch {
    // git not available or path not tracked — fall through to mtime
  }

  try {
    // turbopackIgnore: this is a dev-time-only fallback for files without
    // git history yet — it must stay dynamic and must not pull the whole
    // repo into the build's file trace.
    const stat = fs.statSync(path.join(/* turbopackIgnore: true */ REPO_ROOT, relativePath))
    return stat.mtime.toISOString()
  } catch {
    return null
  }
}
