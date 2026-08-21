import type { Metadata } from "next"
import Link from "next/link"

import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { TableOfContents } from "@/components/table-of-contents"
import { CODE_FENCE } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "PersianLabs/ui is a copy-paste, RTL-first component library distributed as a shadcn registry.",
}

export const introMarkdown = [
  "# Introduction",
  "",
  "PersianLabs/ui is a copy-paste component library built RTL-first for Persian interfaces, on top of shadcn/ui (https://ui.shadcn.com) and Base UI (https://base-ui.com). There's no package to install and no runtime to depend on — every component is distributed as source through a shadcn registry (https://ui.shadcn.com/docs/registry), and lands directly in your codebase when you run the CLI.",
  "",
  "## There's no separate installation",
  "",
  "This library is built entirely on top of shadcn/ui (https://ui.shadcn.com), so it doesn't ship its own setup flow. If your project already has shadcn configured, skip straight to adding components. If it doesn't, initialize it once with the standard shadcn CLI — nothing about that step is specific to this registry.",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest init",
  CODE_FENCE,
  "",
  "From there, add any component by its registry URL. The CLI fetches it from the @persianlabsui registry, copies the source straight into your project, and wires up its dependencies automatically.",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/tabs",
  CODE_FENCE,
  "",
  "## Why copy-paste",
  "",
  "Components are yours once they land — no version to chase, no black-box dependency to patch around. Every component is plain React and Tailwind, built on Base UI primitives, and ready to be read, extended, or rewritten to fit your product.",
].join("\n")

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "why-copy-paste", title: "Why copy-paste" },
]

export default function DocsIntroductionPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10">
      <article className="max-w-2xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Introduction
          </h1>
          <CopyMarkdownButton markdown={introMarkdown} />
        </div>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          PersianLabs/ui is a copy-paste component library built RTL-first for
          Persian interfaces, on top of{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            shadcn/ui
          </Link>{" "}
          and{" "}
          <Link
            href="https://base-ui.com"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Base UI
          </Link>
          . There&apos;s no package to install and no runtime to depend on —
          every component is distributed as source through a{" "}
          <Link
            href="https://ui.shadcn.com/docs/registry"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            shadcn registry
          </Link>
          , and lands directly in your codebase when you run the CLI.
        </p>

        <h2
          id="installation"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          There&apos;s no separate installation
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          This library is built entirely on top of{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            shadcn/ui
          </Link>
          , so it doesn&apos;t ship its own setup flow. If your project already
          has shadcn configured, skip straight to adding components. If it
          doesn&apos;t, initialize it once with the standard shadcn CLI —
          nothing about that step is specific to this registry.
        </p>

        <div className="mt-6">
          <CopyCommand command="npx shadcn@latest init" />
        </div>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          From there, add any component by its registry URL. The CLI fetches it
          from the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            @persianlabsui
          </code>{" "}
          registry, copies the source straight into your project, and wires up
          its dependencies automatically.
        </p>

        <div className="mt-6">
          <CopyCommand command="npx shadcn@latest add @persianlabsui/tabs" />
        </div>

        <h2
          id="why-copy-paste"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Why copy-paste
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Components are yours once they land — no version to chase, no
          black-box dependency to patch around. Every component is plain React
          and Tailwind, built on Base UI primitives, and ready to be read,
          extended, or rewritten to fit your product.
        </p>

        <div className="mt-10 flex items-center gap-4 border-t border-border/60 pt-6">
          <Link
            href="/docs/components"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Browse components →
          </Link>
        </div>
      </article>

      <aside className="hidden w-44 shrink-0 xl:block">
        <div className="sticky top-24 h-[calc(100vh-6rem)]">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  )
}
