import type { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { ScrollAreaDemoExample } from "@/components/examples/scroll-area-demo"
import { ScrollAreaHorizontalExample } from "@/components/examples/scroll-area-horizontal"
import { ScrollAreaRtlExample } from "@/components/examples/scroll-area-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/scroll-area/page.tsx"

import { scrollAreaApi } from "./api-data"

export const metadata: Metadata = {
  title: "Scroll Area",
  description: "Cross-browser custom scrollbars, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "horizontal", title: "Horizontal" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { ScrollArea } from "@/components/ui/scroll-area"

export function Example() {
  return (
    <ScrollArea className="h-56 w-48 rounded-lg border">
      {/* long content */}
    </ScrollArea>
  )
}`

export const scrollAreaMarkdown = [
  "# Scroll Area",
  "",
  "Cross-browser custom scrollbars, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/scroll-area.json",
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  usageSnippet,
  CODE_FENCE,
  "",
  "## API Reference",
  "",
  "### ScrollArea",
  "",
  apiRowsToMarkdownTable(scrollAreaApi),
].join("\n")

export default function ScrollAreaDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Scroll Area
          </h1>
          <CopyMarkdownButton markdown={scrollAreaMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Augments native scroll functionality for custom, cross-browser
          styling. Built on Base UI&apos;s scroll area primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={false}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<ScrollAreaDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("scroll-area-demo")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="installation"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Installation
        </h2>

        <Tabs defaultValue="cli" className="mt-4">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/scroll-area.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react shadcn" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("scroll-area")}
                  lang="tsx"
                  title="components/ui/scroll-area.tsx"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="mt-8">
          <h3
            id="horizontal"
            className="text-sm font-medium text-muted-foreground"
          >
            Horizontal
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              scrollbarOrientation=&quot;horizontal&quot;
            </code>{" "}
            for a horizontally scrolling row.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ScrollAreaHorizontalExample />}
              code={
                <CodeBlock
                  code={getExampleSource("scroll-area-horizontal")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The vertical scrollbar uses a logical{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              border-s
            </code>{" "}
            rather than a physical side, so it correctly sits on the visual left
            when the viewport is RTL.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<ScrollAreaRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("scroll-area-rtl")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="ScrollArea" rows={scrollAreaApi} />

        <DocsPageFooter
          href="/docs/components/scroll-area"
          sourcePath={SOURCE_PATH}
        />
      </article>

      <aside className="hidden w-44 shrink-0 xl:block">
        <div className="sticky top-24">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  )
}
