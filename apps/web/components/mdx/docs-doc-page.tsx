import type { Metadata } from "next"
import * as React from "react"
import { notFound } from "next/navigation"

import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { TableOfContents } from "@/components/table-of-contents"
import { ProximityToc } from "@/components/mdx/proximity-toc"
import { BounceToc } from "@/components/mdx/bounce-toc"
import { processMarkdownForLlms } from "@/lib/markdown-docs"
import { source } from "@/lib/source"
import { SITE_URL } from "@/lib/site"
import { mdxComponents } from "@/mdx-components"
import type { TocItem } from "@/components/table-of-contents"

/**
 * Shared renderer for every docs page built from content/docs/*.mdx. The
 * route files (app/docs/page.tsx for the root and app/docs/[...slug] for
 * everything else) are thin wrappers around this component — keeping /docs
 * a real static route so typedRoutes keeps accepting plain "/docs" hrefs.
 */

export async function docsGenerateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    return {}
  }

  // Unique social card per page, served by app/docs/og/[...slug]/route.tsx.
  // (File-convention opengraph-image can't live after the [...slug] segment
  // in Turbopack, and the root file would override config metadata anyway.)
  const url = `${SITE_URL}/docs${slug?.length ? `/${slug.join("/")}` : ""}`
  const image =
    slug && slug.length > 0
      ? {
          url: `${SITE_URL}/docs/og/${slug.join("/")}`,
          width: 1200,
          height: 630,
          type: "image/png" as const,
          alt: page.data.title,
        }
      : undefined

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      type: "website",
      url,
      siteName: "PersianLabs/ui",
      title: page.data.title,
      description: page.data.description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      ...(image ? { images: [image.url] } : {}),
    },
  }
}

/** Which visual shell the page uses — mirrors the old hand-written pages. */
function collapseTocWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

function getLayoutKind(slug?: string[]): "doc" | "prose" | "catalog" {
  if (!slug || slug.length === 0) return "prose"
  const first = slug[0]!

  if (slug.length === 1 && ["theming", "charts"].includes(first)) {
    return "prose"
  }
  if (slug.length === 1 && first === "components") return "catalog"

  return "doc"
}

/** Recursively flattens a toc title node (string | array | element) to plain text. */
function tocTitleText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(tocTitleText).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return tocTitleText(node.props.children)
  }

  return ""
}

function adaptToc(
  items: readonly { title: React.ReactNode; url: string; depth: number }[]
): TocItem[] {
  const out: TocItem[] = []

  for (const item of items) {
    const entry: TocItem = {
      id: item.url.replace(/^#/, ""),
      title: collapseTocWhitespace(tocTitleText(item.title)),
    }

    if (item.depth <= 2 || out.length === 0) {
      out.push(entry)
    } else {
      const parent = out.at(-1)!

      parent.children ??= []
      parent.children.push(entry)
    }
  }

  // Fumadocs injects hidden prev/next headings (« ... »); hide them.
  return out.filter((item) => !item.title.startsWith("\u00AB"))
}

export default async function DocsDocPage({ slug }: { slug?: string[] }) {
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const doc = page.data
  const MDX = doc.body
  const kind = getLayoutKind(slug)
  const markdown = await processMarkdownForLlms(await doc.getText("raw"))

  // Special pages can export their own hand-written TOC (e.g. the components
  // catalog links to invisible anchors).
  const customToc = doc._exports?.tocItems as TocItem[] | undefined
  const tocItems = customToc ?? adaptToc(doc.toc)
  // Pages can opt into rendering the TOC as the ProximitySidebar minimap.
  const tocVariant = doc._exports?.tocVariant as string | undefined
  const contentPath = `apps/web/${doc.info.path.replace(/^\.\//, "")}.mdx`

  const h1Row = (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <CopyMarkdownButton markdown={markdown} />
    </div>
  )

  if (kind === "doc") {
    return (
      <div className="flex gap-10">
        <article className="max-w-3xl min-w-0 flex-1">
          {h1Row}
          <MDX components={mdxComponents} />
          <DocsPageFooter href={page.url} sourcePath={contentPath} />
        </article>

        <aside className="hidden w-44 shrink-0 xl:block">
          <div className="sticky top-24 h-[calc(100vh-6rem)]">
            {tocVariant === "proximity" ? (
              <ProximityToc items={tocItems} />
            ) : tocVariant === "bounce" ? (
              <BounceToc items={tocItems} />
            ) : (
              <TableOfContents items={tocItems} />
            )}
          </div>
        </aside>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10">
      <article
        className={
          kind === "catalog" ? "min-w-0 flex-1" : "max-w-2xl min-w-0 flex-1"
        }
      >
        {h1Row}
        <MDX components={mdxComponents} />
      </article>

      {tocItems.length > 0 && (
        <aside className="hidden w-44 shrink-0 xl:block">
          <div className="sticky top-24 h-[calc(100vh-6rem)]">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      )}
    </div>
  )
}
