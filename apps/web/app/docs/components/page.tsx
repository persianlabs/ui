import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/badge"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import {
  BreadcrumbPreview,
  ButtonGroupPreview,
  ButtonPreview,
  CardPreview,
  CitySelectorPreview,
  ComboboxPreview,
  EmptyPreview,
  InputGroupPreview,
  InputOTPPreview,
  InputPreview,
  SelectPreview,
  SeparatorPreview,
  TabsPreview,
  TextareaPreview,
} from "@/lib/component-previews"

export const metadata: Metadata = {
  title: "Components",
  description: "Browse the PersianLabs/ui component registry.",
}

function ThumbnailFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-t-xl bg-muted p-6">
      {children}
    </div>
  )
}

const components = [
  {
    title: "Button",
    href: "/docs/components/button" as const,
    description: "A button built on Base UI with variant and size support.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <ButtonPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Button Group",
    href: "/docs/components/button-group" as const,
    description:
      "A container that groups related buttons together with consistent styling.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <ButtonGroupPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Input",
    href: "/docs/components/input" as const,
    description: "A styled text input built on Base UI.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <InputPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Input OTP",
    href: "/docs/components/input-otp" as const,
    description:
      "Accessible one-time password component with copy-paste functionality.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <InputOTPPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Input Group",
    href: "/docs/components/input-group" as const,
    description: "Add addons, buttons, and helper content to inputs.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <InputGroupPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Textarea",
    href: "/docs/components/textarea" as const,
    description:
      "Displays a form textarea, or a component that looks like a textarea.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <TextareaPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs" as const,
    description:
      "Layered panels with a sliding active-tab indicator, built on Base UI.",
    badge: "New",
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
    badge: "New",
    createdAt: "2026-08-06",
    thumbnail: (
      <ThumbnailFrame>
        <ComboboxPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Select",
    href: "/docs/components/select" as const,
    description: "A listbox for choosing a single value, built on Base UI.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <SelectPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "City Selector",
    href: "/docs/components/city-selector" as const,
    description:
      "A province & city picker for Iran, built on Combobox and bundled with all 31 provinces and 1,119 cities.",
    badge: "Special",
    createdAt: "2026-08-06",
    thumbnail: (
      <ThumbnailFrame>
        <CitySelectorPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Separator",
    href: "/docs/components/separator" as const,
    description:
      "Visually or semantically separates content, built on Base UI.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <SeparatorPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Card",
    href: "/docs/components/card" as const,
    description: "Displays a card with header, content, and footer.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <CardPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Breadcrumb",
    href: "/docs/components/breadcrumb" as const,
    description:
      "Displays the path to the current resource using a hierarchy of links.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <BreadcrumbPreview />
      </ThumbnailFrame>
    ),
  },
  {
    title: "Empty",
    href: "/docs/components/empty" as const,
    description:
      "Displays an empty state with a title, description, and optional actions.",
    badge: "New",
    createdAt: "2026-08-07",
    thumbnail: (
      <ThumbnailFrame>
        <EmptyPreview />
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
        <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
          Components
        </h1>
        <CopyMarkdownButton markdown={componentsMarkdown} />
      </div>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        Every component below ships as source through the{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          @persianlabsui
        </code>{" "}
        registry. More are on the way.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:bg-card/70"
          >
            {component.thumbnail}
            <div className="p-5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium">{component.title}</h2>
                {component.badge && <Badge>{component.badge}</Badge>}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {component.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
