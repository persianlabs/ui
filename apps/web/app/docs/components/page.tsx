import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/badge"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import {
  CitySelectorPreview,
  ComboboxPreview,
  TabsPreview,
} from "@/lib/component-previews"

export const metadata: Metadata = {
  title: "Components",
  description: "Browse the PersianLabs/ui component registry.",
}

function ThumbnailFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex h-44 w-full items-center justify-center overflow-hidden rounded-t-xl p-6">
      {children}
    </div>
  )
}

const components = [
  {
    title: "Tabs",
    href: "/docs/components/tabs" as const,
    description:
      "Layered panels with a sliding active-tab indicator, built on Base UI.",
    badge: undefined,
    createdAt: "2026-08-01",
    thumbnail: (
      <ThumbnailFrame>
        <TabsPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Combobox",
    href: "/docs/components/combobox" as const,
    description: "A searchable, accessible combobox built on Base UI.",
    badge: undefined,
    createdAt: "2026-08-06",
    thumbnail: (
      <ThumbnailFrame>
        <ComboboxPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "City Selector",
    href: "/docs/components/city-selector" as const,
    description:
      "A province & city picker for Iran, built on Combobox and bundled with all 31 provinces and 1,119 cities.",
    badge: "New",
    createdAt: "2026-08-06",
    thumbnail: (
      <ThumbnailFrame>
        <CitySelectorPreview />
      </ThumbnailFrame>
    ),
  },
].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

const componentsMarkdown = [
  "# Components",
  "",
  "Every component ships as source through the @persianlabsui registry. More are on the way.",
  "",
  ...components.map((c) => `- ${c.title}: ${c.description}`),
].join("\n")

export default function DocsComponentsPage() {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-semibold tracking-tight self-start sm:self-auto">
          Components
        </h1>
        <CopyMarkdownButton markdown={componentsMarkdown} />
      </div>
      <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
        Every component below ships as source through the{" "}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
          @persianlabsui
        </code>{" "}
        registry. More are on the way.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="border-border bg-card/40 hover:bg-card/70 overflow-hidden rounded-xl border transition-colors"
          >
            {component.thumbnail}
            <div className="p-5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium">{component.title}</h2>
                {component.badge && <Badge>{component.badge}</Badge>}
              </div>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {component.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
