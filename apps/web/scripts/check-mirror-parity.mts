/**
 * Verifies every component, lib and hook in packages/ui/src exists as an
 * identical twin under apps/web/registry/base once imports are stripped and
 * alias specifiers canonicalized — the mirrored copies must differ ONLY in
 * how they import internal modules (@workspace/ui/* vs @/*).
 *
 * Run with bun from apps/web: bun scripts/check-mirror-parity.mts
 */
import fs from "node:fs"
import path from "node:path"

const SRC_ROOT = path.join(process.cwd(), "..", "..", "packages", "ui", "src")
const MIRROR_ROOT = path.join(process.cwd(), "registry", "base")

// Pair keys exempted from parity (with justification):
const PARITY_EXCEPTIONS: ReadonlySet<string> = new Set([])

/** Source dir ↔ registry dir groups, keyed by source-relative name. */
const GROUPS = [
  {
    key: "components",
    src: path.join(SRC_ROOT, "components"),
    mirror: path.join(MIRROR_ROOT, "ui"),
    ext: ".tsx",
  },
  {
    key: "lib",
    src: path.join(SRC_ROOT, "lib"),
    mirror: path.join(MIRROR_ROOT, "lib"),
    ext: ".ts",
  },
  {
    key: "hooks",
    src: path.join(SRC_ROOT, "hooks"),
    mirror: path.join(MIRROR_ROOT, "hooks"),
    ext: ".ts",
  },
]

// Alias forms map onto one canonical placeholder before comparing.
const ALIASES: ReadonlyArray<readonly [string, string]> = [
  ["@workspace/ui/components/", "«ui»/"],
  ["@/components/ui/", "«ui»/"],
  ["@workspace/ui/lib/", "«lib»/"],
  ["@/lib/", "«lib»/"],
  ["@workspace/ui/hooks/", "«hook»/"],
  ["@/hooks/", "«hook»/"],
]

/** Lists the comparable files of one group, keyed by filename. */
function listFiles(dir: string): Set<string> {
  return new Set(
    fs
      .readdirSync(dir)
      .filter((name) => name.endsWith(".ts") || name.endsWith(".tsx"))
      // Unit tests are package-internal and intentionally unmirrored.
      .filter((name) => !name.endsWith(".test.ts"))
  )
}

/** Drops a leading "use client" directive line, if present. */
function dropUseClient(lines: string[]): string[] {
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i]!.trim()

    if (trimmed === "") continue
    if (trimmed === '"use client"' || trimmed === "'use client'") {
      return lines.filter((_, index) => index !== i)
    }

    break
  }

  return lines
}

/** Removes import statements, including multi-line ones. */
function stripImports(lines: string[]): string[] {
  const kept: string[] = []
  let skipping = false

  for (const line of lines) {
    const trimmedEnd = line.trimEnd()
    const head = trimmedEnd.trimStart()

    if (!skipping && /^import[\s("']/.test(head)) {
      // Bare side-effect modules (`import "x"`) end on the same line…
      if (/^import\s+"[^"]*"$/.test(head)) continue
      // …as do single-line named imports (`… from "x"`).
      if (/from "[^"]+"$/.test(trimmedEnd)) continue

      skipping = true
      continue
    }

    if (skipping) {
      if (/from "[^"]+"$/.test(trimmedEnd)) skipping = false
      continue
    }

    kept.push(line)
  }

  return kept
}

/** Canonicalizes internal alias specifiers to their placeholders. */
function canonicalizeAliases(src: string): string {
  for (const [from, to] of ALIASES) {
    src = src.replaceAll(from, to)
  }

  return src
}

/** Trailing whitespace, blank-run collapsing, outer blank trimming. */
function tidyWhitespace(lines: string[]): string[] {
  const tidied = lines.map((line) => line.replace(/[ \t]+$/, ""))
  const collapsed: string[] = []

  for (const line of tidied) {
    if (line === "" && collapsed[collapsed.length - 1] === "") continue
    collapsed.push(line)
  }

  while (collapsed[0] === "") collapsed.shift()
  while (collapsed[collapsed.length - 1] === "") collapsed.pop()

  return collapsed
}

/** Full normalization pipeline applied identically to both twins. */
function normalize(src: string): string[] {
  const lines = stripImports(dropUseClient(src.split(/\r?\n/)))
  return tidyWhitespace(canonicalizeAliases(lines.join("\n")).split("\n"))
}

let matched = 0
let failed = 0
const failures: string[] = []

for (const group of GROUPS) {
  const srcFiles = listFiles(group.src)
  const mirrorFiles = listFiles(group.mirror)

  for (const name of new Set([...srcFiles, ...mirrorFiles])) {
    const key = `${group.key}/${name}`
    const srcPath = path.join(group.src, name)
    const mirrorPath = path.join(group.mirror, name)

    if (PARITY_EXCEPTIONS.has(key)) continue

    if (!srcFiles.has(name) || !mirrorFiles.has(name)) {
      failed++
      failures.push(
        `${key}: missing twin (${
          srcFiles.has(name) ? "registry copy absent" : "internal source absent"
        })`
      )
      continue
    }

    const left = normalize(fs.readFileSync(srcPath, "utf8"))
    const right = normalize(fs.readFileSync(mirrorPath, "utf8"))

    if (left.length === right.length && left.every((l, i) => l === right[i])) {
      matched++
      continue
    }

    failed++
    const diffAt = left.findIndex((l, i) => l !== right[i])
    const lineNo =
      diffAt === -1 ? Math.min(left.length, right.length) : diffAt + 1
    const report = [`${key}: differs at normalized line ${lineNo}`]

    for (const [label, lines] of [
      ["src", left],
      ["mirror", right],
    ] as const) {
      const from = Math.max(0, lineNo - 4)
      const to = Math.min(lines.length, lineNo + 3)

      report.push(`  ${label} lines ${from + 1}-${to}:`)
      for (let i = from; i < to; i++) {
        report.push(`    ${String(i + 1).padStart(4)} | ${lines[i] ?? ""}`)
      }
    }

    failures.push(report.join("\n"))
  }
}

if (failures.length > 0) {
  console.log(failures.join("\n\n"))
  process.exitCode = 1
}

const total = matched + failed
console.log(
  process.exitCode === 1
    ? `${matched}/${total} pairs in parity (${failed} broken)`
    : `${matched}/${total} pairs in parity`
)
