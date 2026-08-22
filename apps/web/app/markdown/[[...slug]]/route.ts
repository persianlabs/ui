import { notFound } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"

import { getFlatDocsNav } from "@/lib/docs-nav"
import { processMarkdownForLlms } from "@/lib/markdown-docs"
import { source } from "@/lib/source"

export const instant = false

export function generateStaticParams() {
  return source.generateParams().map((params) => ({
    slug: params.slug ?? [],
  }))
}

/**
 * Serves every docs page as clean LLM-friendly markdown at `<url>.md`,
 * replacing the old per-page markdown/route.ts handlers and their
 * hand-maintained slug maps. Wired up via next.config rewrites:
 * /docs.md and /docs/:path*.md -> /markdown/:path*.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const raw = await page.data.getText("raw")
  let markdown = `# ${page.data.title}\n\n${page.data.description}\n\n${processMarkdownForLlms(raw)}`

  // The components index expands its catalog island into a link list,
  // matching what the old hand-written componentsMarkdown served.
  if (slug && slug.length === 1 && slug[0] === "components") {
    const items = getFlatDocsNav().filter((item) =>
      item.href.startsWith("/docs/components/")
    )

    if (items.length > 0) {
      const lines = items.map((item) => {
        const componentSlug = item.href.split("/").at(-1)!
        const description =
          source.getPage(["components", componentSlug])?.data.description ?? ""

        return `- [${item.title}](${item.href}): ${description}`
      })

      markdown += `\n## Component catalog\n\n${lines.join("\n")}\n`
    }
  }

  return new NextResponse(markdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
