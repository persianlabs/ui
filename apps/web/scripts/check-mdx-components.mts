/**
 * Scans every docs .mdx file for capitalized JSX components that are
 * neither in the shared mdx-components map nor imported by the file —
 * these throw "Expected component X to be defined" at render time.
 *
 * Run with bun from apps/web: bun scripts/check-mdx-components.mts
 */
import fs from "node:fs"
import path from "node:path"

const CONTENT = path.join(process.cwd(), "content", "docs")
const MAP_FILE = path.join(process.cwd(), "mdx-components.tsx")

// Allowed names from the shared map (colon entries AND shorthand commas).
const mapSrc = fs.readFileSync(MAP_FILE, "utf8")
const allowed = new Set<string>()

for (const m of mapSrc.matchAll(/^ {2}(\w+)(?::|,)/gm)) {
  allowed.add(m[1]!)
}

// Intrinsic-ish elements that legitimately appear as raw JSX.
for (const name of ["svg", "path", "div", "span", "p", "a"]) {
  allowed.add(name)
}

/** CommonMark-style fence stripping: toggles on ``` / ~~~ fence lines. */
function stripFences(src: string): string {
  const out: string[] = []
  let inFence = false

  for (const line of src.split(/\r?\n/)) {
    if (/^\s{0,3}(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (!inFence) out.push(line)
  }

  return out.join("\n")
}

/** Removes inline code spans so their contents never count as JSX. */
function stripInlineCode(src: string): string {
  return src.replace(/`[^`\n]*`/g, "")
}

let bad = 0

function* walk(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) yield* walk(full)
    else if (entry.name.endsWith(".mdx")) yield full
  }
}

for (const file of walk(CONTENT)) {
  const src = fs.readFileSync(file, "utf8")
  const body = stripInlineCode(stripFences(src))

  // Frontmatter is not JSX context.
  const contentOnly = body.replace(/^---\n[\s\S]*?\n---\n*/, "")

  const imported = new Set<string>()

  for (const m of contentOnly.matchAll(/import\s*\{([^}]+)\}\s*from/g)) {
    for (const n of m[1]!.split(",")) {
      imported.add(n.trim().split(/\s+as\s+/).pop()!.trim())
    }
  }

  const used = new Map<string, number>()

  for (const m of contentOnly.matchAll(/<([A-Z]\w*)[\s/>]/g)) {
    used.set(m[1]!, (used.get(m[1]!) ?? 0) + 1)
  }

  for (const [name, count] of used) {
    if (!allowed.has(name) && !imported.has(name)) {
      console.log(
        `${path.relative(CONTENT, file)}: <${name}> ×${count} is not defined`
      )
      bad += count
    }
  }
}

console.log(bad === 0 ? "all components resolve ✓" : `${bad} unresolved reference(s)`)
