import Link from "next/link"
import type { Route } from "next"
import * as React from "react"

import { CopyCommand } from "@/components/copy-command"
import { CodeBlockCommand } from "@/components/code-block-command"
import { InstallCommand } from "@/components/install-command"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { BaseUiReference } from "@/components/base-ui-reference"
import { CodeBlock } from "@/components/code-block"
import { Credits } from "@/components/credits"
import { ComponentPreview as LegacyComponentPreview } from "@/components/component-preview"
import { Step, Steps } from "@/components/steps"
import { ComponentPreviewDoc } from "@/components/mdx/component-preview-doc"
import { ComponentSourceDoc } from "@/components/mdx/component-source-doc"
import { DocLastEdited } from "@/components/mdx/doc-last-edited"
import { ComponentsCatalog } from "@/components/mdx/components-catalog"
import { DocExampleSection } from "@/components/mdx/example-section"
import { InstallTabs } from "@/components/mdx/install-tabs"
import { PreCode, PreFigure } from "@/components/mdx/pre-code"
import { ThemePreview, ThemeVariablesCode } from "@/components/mdx/theme-doc"

/**
 * Element mappings shared by every MDX docs page. Class names mirror the
 * markup the old hand-written page.tsx files emitted, so pages built from
 * content/docs/*.mdx render identically.
 */

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }
  return ""
}

function headingId(children: React.ReactNode, id?: string) {
  return id ?? getNodeText(children).trim().toLowerCase().replace(/\s+/g, "-")
}

/** Standalone copy-command blocks in markdown flow need breathing room on
 * both sides - the old hand-written pages wrapped each one in an mt-6 div. */
function DocCopyCommand(props: React.ComponentProps<typeof CopyCommand>) {
  return (
    <div className="my-6">
      <CopyCommand {...props} />
    </div>
  )
}

const h2Classes = "mt-12 text-xl font-semibold tracking-tight"
const h3Classes = "mt-8 text-sm font-medium text-muted-foreground"

export const mdxComponents = {
  h1: ({ children, id, ...props }: React.ComponentProps<"h1">) => (
    <h1
      id={headingId(children, id)}
      className="mt-10 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }: React.ComponentProps<"h2">) => (
    <h2 id={headingId(children, id)} className={h2Classes} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: React.ComponentProps<"h3">) => (
    <h3 id={headingId(children, id)} className={h3Classes} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }: React.ComponentProps<"h4">) => (
    <h4 id={headingId(children, id)} className="mt-6 font-medium" {...props}>
      {children}
    </h4>
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-3 leading-relaxed text-muted-foreground" {...props} />
  ),
  a: ({ href = "", children, ...props }: React.ComponentProps<"a">) => {
    const className =
      props.className ??
      "text-foreground underline underline-offset-4 hover:decoration-foreground/60"
    if (href.startsWith("/")) {
      return (
        <Link href={href as Route} className={className} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
  strong: ({ children, ...props }: React.ComponentProps<"strong">) => (
    <strong className="font-medium text-foreground" {...props}>
      {children}
    </strong>
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mt-3 list-inside list-disc space-y-1 text-sm leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-3 list-inside list-decimal space-y-1 text-sm leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-4 border-s-2 border-border ps-4 text-sm leading-relaxed text-muted-foreground italic"
      {...props}
    />
  ),
  hr: () => <hr className="mt-8 border-border/60" />,
  // Inline code only — fenced blocks arrive here already highlighted inside
  // a <pre>, which the entry below wraps in the CodeBlock shell.
  code: (props: React.ComponentProps<"code">) => {
    const lang = (props as Record<string, unknown>)["data-language"]
    const className = props.className

    if (
      (lang && typeof lang === "string") ||
      className?.includes("language-")
    ) {
      return <code {...props} />
    }
    return (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
        {...props}
      />
    )
  },
  figure: PreFigure,
  pre: PreCode,
  table: ({ children, ...props }: React.ComponentProps<"table">) => (
    <div className="mt-4 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="border-b border-border bg-muted/40" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="px-4 py-2 font-medium whitespace-nowrap text-muted-foreground"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td
      className="px-4 py-2.5 align-top leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  tbody: (props: React.ComponentProps<"tbody">) => (
    <tbody
      className="[&_tr+tr]:border-t [&_tr+tr]:border-border/60"
      {...props}
    />
  ),
  img: ({ alt = "", className, ...props }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={className ?? "mt-4 rounded-xl border border-border"}
      {...props}
    />
  ),

  // ---- Islands used across doc pages -------------------------------------

  Link,
  CopyCommand: DocCopyCommand,
  CodeBlockCommand,
  InstallCommand,
  InstallTabs,
  CodeBlock,
  Steps,
  Step,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ApiReference,
  BaseUiReference,
  Credits,
  LastEdited: DocLastEdited,
  ComponentPreview: ComponentPreviewDoc,
  /** Old two-prop form (preview={<X/>} code={<CodeBlock/>}) for inline demos. */
  LegacyPreview: LegacyComponentPreview,
  ExampleSection: DocExampleSection,
  ComponentSource: ComponentSourceDoc,
  ComponentsCatalog,
  ThemePreview,
  ThemeVariablesCode,
}
