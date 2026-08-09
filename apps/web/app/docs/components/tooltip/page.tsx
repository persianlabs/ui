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
import { TooltipDemoExample } from "@/components/examples/tooltip-demo"
import { TooltipRtlExample } from "@/components/examples/tooltip-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/tooltip/page.tsx"

import {
  tooltipContentApi,
  tooltipProviderApi,
  tooltipRootApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Tooltip",
  description:
    "Displays contextual information when hovering or focusing an element, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "rtl", title: "RTL" }],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover</Button>} />
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`

export const tooltipMarkdown = [
  "# Tooltip",
  "",
  "Displays contextual information when hovering or focusing an element, built on Base UI.",
  "",
  "Wrap your app (or the part of it that needs tooltips) in a single `TooltipProvider` — it groups nearby tooltips so the next one opens instantly instead of waiting out the hover delay again.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/tooltip.json",
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
  "### TooltipProvider",
  "",
  apiRowsToMarkdownTable(tooltipProviderApi),
  "",
  "### Tooltip",
  "",
  apiRowsToMarkdownTable(tooltipRootApi),
  "",
  "### TooltipContent",
  "",
  apiRowsToMarkdownTable(tooltipContentApi),
].join("\n")

export default function TooltipDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Tooltip
          </h1>
          <CopyMarkdownButton markdown={tooltipMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays contextual information when hovering or focusing an element.
          Built on Base UI&apos;s tooltip primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            'TooltipTrigger measures the ambient direction where it renders and passes it explicitly to the portaled TooltipContent, so side="inline-start"/"inline-end" resolve correctly instead of always falling back to document direction',
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<TooltipDemoExample />}
            code={
              <CodeBlock code={getExampleSource("tooltip-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/tooltip.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("tooltip")}
                  lang="tsx"
                  title="components/ui/tooltip.tsx"
                />
              </div>
              <Step>Wrap your app in TooltipProvider</Step>
              <div className="mt-2">
                <CodeBlock
                  code={`import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`}
                  lang="tsx"
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
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The tooltip measures the direction it actually renders in and
            passes it to the portaled popup, so it opens on the correct side
            even though the popup itself lives outside the RTL container in
            the DOM.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<TooltipRtlExample />}
              code={
                <CodeBlock code={getExampleSource("tooltip-rtl")} lang="tsx" />
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
        <ApiReference title="TooltipProvider" rows={tooltipProviderApi} />
        <ApiReference title="Tooltip" rows={tooltipRootApi} />
        <ApiReference title="TooltipContent" rows={tooltipContentApi} />

        <DocsPageFooter
          href="/docs/components/tooltip"
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
