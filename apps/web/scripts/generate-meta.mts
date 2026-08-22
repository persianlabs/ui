/**
 * Generates content/docs/**\/meta.json from lib/docs-nav.ts so the fumadocs
 * page-tree order mirrors the hand-maintained sidebar order.
 *
 * Run with bun from apps/web: bun scripts/generate-meta.mts
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CONTENT_DOCS = path.join(ROOT, "content", "docs")

interface NavItem {
  title: string
  href: string
  badge?: string
  disabled?: boolean
}

// Import the real module — bun runs TS natively.
const { docsNav }: { docsNav: { title: string; items: NavItem[] }[] } =
  await import(path.join(ROOT, "lib", "docs-nav.ts"))

function writeMeta(relDir: string, pages: string[], title?: string) {
  const dir = path.join(CONTENT_DOCS, relDir)
  fs.mkdirSync(dir, { recursive: true })

  const meta: Record<string, unknown> = title ? { title, pages } : { pages }
  fs.writeFileSync(
    path.join(dir, "meta.json"),
    `${JSON.stringify(meta, null, 2)}\n`
  )
  console.log(`${relDir || "."}/meta.json: ${pages.length} pages`)
}

function slugsFromGroup(groupTitle: string, section: string): string[] {
  const group = docsNav.find((group) => group.title === groupTitle)
  if (!group) return []

  return group.items
    .filter((item) => !item.disabled && item.href.includes(`/${section}/`))
    .map((item) => item.href.split("/").at(-1)!)
    .filter((slug) => fs.existsSync(path.join(CONTENT_DOCS, section, `${slug}.mdx`)))
}

// Root: Introduction, then the two sections, plus standalone pages.
const rootPages = [
  "index",
  "components",
  "charts",
  "theming",
  "utilities",
].filter((page) =>
  page.endsWith(".mdx") || fs.existsSync(path.join(CONTENT_DOCS, `${page}.mdx`)) ||
  fs.existsSync(path.join(CONTENT_DOCS, page))
)

writeMeta("", rootPages, "Docs")
writeMeta("components", slugsFromGroup("Components", "components"), "Components")
writeMeta("utilities", slugsFromGroup("Utilities", "utilities"), "Utilities")
