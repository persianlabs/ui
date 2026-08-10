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
import { DirectionDemoExample } from "@/components/examples/direction-demo"
import { DirectionHookExample } from "@/components/examples/direction-hook"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/direction/page.tsx"

import { directionProviderApi } from "./api-data"

export const metadata: Metadata = {
  title: "Direction",
  description:
    "A provider for setting the reading direction (LTR or RTL) of your app, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "use-direction", title: "useDirection" }],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { DirectionProvider } from "@/components/ui/direction"

export function Example() {
  return (
    <DirectionProvider direction="rtl">
      {/* Base UI components inside here read RTL */}
    </DirectionProvider>
  )
}`

export const directionMarkdown = [
  "# Direction",
  "",
  "A provider for setting the reading direction (LTR or RTL) of your app, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/direction.json",
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
  "### DirectionProvider",
  "",
  apiRowsToMarkdownTable(directionProviderApi),
].join("\n")

export default function DirectionDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Direction
          </h1>
          <CopyMarkdownButton markdown={directionMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          This repo is RTL-first by default, but{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            DirectionProvider
          </code>{" "}
          is useful when you need to force a specific direction on a subtree
          regardless of the page&apos;s own <code>dir</code> — for example, an
          embedded LTR code block inside an otherwise RTL page.
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
            preview={<DirectionDemoExample />}
            code={
              <CodeBlock code={getExampleSource("direction-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/direction.json" />
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
                  code={getComponentSource("direction")}
                  lang="tsx"
                  title="components/ui/direction.tsx"
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
            id="use-direction"
            className="text-sm font-medium text-muted-foreground"
          >
            useDirection
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Read the direction set by the nearest{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              DirectionProvider
            </code>{" "}
            with the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              useDirection
            </code>{" "}
            hook.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<DirectionHookExample />}
              code={
                <CodeBlock
                  code={getExampleSource("direction-hook")}
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
        <ApiReference title="DirectionProvider" rows={directionProviderApi} />

        <DocsPageFooter
          href="/docs/components/direction"
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
