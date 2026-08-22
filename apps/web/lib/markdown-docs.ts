import {
  getComponentSource,
  getHookSource,
  getLibSource,
} from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getThemeVariables } from "@/lib/theme-variables"
import * as apiData from "@/lib/api-data"

/**
 * Converts the raw MDX of a docs page into plain LLM-friendly markdown —
 * the successor of the hand-written `<name>Markdown` exports and
 * `markdownBySlug` route maps. Islands expand to real code fences; UI-only
 * islands (Credits, LastEdited) are dropped.
 */

const FENCE = "```"

interface ApiRow {
  prop: string
  type: string
  default?: string
  description: string
}

function apiRowsToMarkdownTable(rows: ApiRow[]) {
  const header = "| Prop | Type | Default | Description |"
  const divider = "| --- | --- | --- | --- |"
  const body = rows.map(
    (row) =>
      `| \`${row.prop}\` | \`${row.type}\` | ${row.default ?? "—"} | ${row.description} |`
  )

  return [header, divider, ...body].join("\n")
}

function componentSourceFence(kind: string, name: string): string {
  const code =
    kind === "hook"
      ? getHookSource(name)
      : kind === "lib"
        ? getLibSource(name)
        : getComponentSource(name)

  return `${FENCE}${kind === "component" ? "tsx" : "ts"}\n${code}\n${FENCE}`
}

export function processMarkdownForLlms(raw: string): string {
  let content = raw

  // 1. Strip frontmatter.
  content = content.replace(/^---\n[\s\S]*?\n---\n*/, "")

  // 2. Drop import lines (api-data etc.) — data is inlined below instead.
  content = content.replace(/^import\s.*$/gm, "")

  // 3. Drop UI-only islands entirely.
  content = content.replace(/<LastEdited[^>]*\/>/g, "")
  content = content.replace(/<Credits\b[\s\S]*?\/>/g, "")
  content = content.replace(/<ComponentsCatalog\s*\/>/g, "")
  content = content.replace(/<ThemePreview\s*\/>/g, "")

  // 4. Theme variable blocks expand to real CSS fences.
  content = content.replace(
    /<ThemeVariablesCode\s+variant="(light|dark)"\s*\/>/g,
    (_match, variant: string) => {
      const { light, dark } = getThemeVariables()

      return `${FENCE}css\n${variant === "light" ? light : dark}\n${FENCE}`
    }
  )

  // 5. Live previews become fenced example sources.
  content = content.replace(
    /<ComponentPreview\s+name="([^"]+)"([^>]*)?\/>/g,
    (_match, name: string) => `\`\`\`tsx\n${getExampleSource(name)}\n\`\`\``
  )

  // 6. Component/hook/lib source islands become fenced file sources.
  content = content.replace(
    /<ComponentSource\s+name="([^"]+)"(?:\s+kind="([^"]+)")?(?:\s+title="[^"]*")?\s*\/>/g,
    (_match, name: string, kind?: string) =>
      componentSourceFence(kind ?? "component", name)
  )

  // 7. Standard install sections collapse to their CLI command, matching
  //    the old curated markdown output.
  content = content.replace(
    /<InstallTabs[\s\S]*?command="([^"]+)"[\s\S]*?\/>/g,
    (_match, command: string) => `${FENCE}bash\n${command}\n${FENCE}`
  )
  content = content.replace(
    /<CopyCommand\s+command="([^"]+)"\s*\/>/g,
    (_match, command: string) => `${FENCE}bash\n${command}\n${FENCE}`
  )

  // 8. API reference islands become GFM tables via the same rows the UI
  //    renders.
  content = content.replace(
    /<ApiReference\s+title="([^"]*)"\s+rows=\{(\w+)\}\s*\/>/g,
    (_match, title: string, exportName: string) => {
      const file = resolveApiDataFile(exportName, raw)
      const namespace = file.replace(/-(\w)/g, (_m, c: string) =>
        c.toUpperCase()
      )
      const rows = (
        apiData as unknown as Record<string, Record<string, unknown>>
      )[namespace]?.[exportName] as ApiRow[] | undefined

      if (!rows) {
        console.warn(`[markdown-docs] missing api-data ${file}.${exportName}`)
      }

      return `### ${title}\n\n${apiRowsToMarkdownTable(rows ?? [])}`
    }
  )

  // 9. Tidy whitespace: collapse runs of blank lines left by removals.
  content = content.replace(/\n{3,}/g, "\n\n").replace(/^\s+|\s+$/g, "")

  return content
}

/** Resolves which api-data module an ApiReference row export came from by scanning imports in the raw MDX. */
function resolveApiDataFile(exportName: string, raw: string): string {
  const importMatch = raw.match(
    new RegExp(
      `import\\s*\\{[^}]*\\b${exportName}\\b[^}]*\\}\\s*from\\s*"@/lib/api-data/([^"]+)"`
    )
  )

  return importMatch?.[1] ?? exportName
}
