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
import { ToggleGroupDemoExample } from "@/components/examples/toggle-group-demo"
import { ToggleGroupOutlineExample } from "@/components/examples/toggle-group-outline"
import { ToggleGroupRtlExample } from "@/components/examples/toggle-group-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/toggle-group/page.tsx"

import { toggleGroupItemApi, toggleGroupRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Toggle Group",
  description:
    "A set of two-state buttons that can be toggled on or off, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "outline", title: "Outline" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function Example() {
  return (
    <ToggleGroup>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        I
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`

const toggleGroupMarkdown = [
  "# Toggle Group",
  "",
  "A set of two-state buttons that can be toggled on or off, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/toggle-group.json",
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
  "### ToggleGroup",
  "",
  apiRowsToMarkdownTable(toggleGroupRootApi),
  "",
  "### ToggleGroupItem",
  "",
  apiRowsToMarkdownTable(toggleGroupItemApi),
].join("\n")

export default function ToggleGroupDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Toggle Group
          </h1>
          <CopyMarkdownButton markdown={toggleGroupMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A set of two-state buttons that can be toggled on or off. Built on
          Base UI&apos;s toggle group primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Segmented items merge corners on the reading-start/end (logical rounding + border-inline-start) instead of always the physical left/right",
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
            preview={<ToggleGroupDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("toggle-group-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/toggle-group.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react class-variance-authority" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("toggle-group")}
                  lang="tsx"
                  title="components/ui/toggle-group.tsx"
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

        <h2 id="outline" className="mt-12 text-xl font-semibold tracking-tight">
          Outline
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            spacing={"{0}"}
          </code>{" "}
          to merge items into one segmented control.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ToggleGroupOutlineExample />}
            code={
              <CodeBlock
                code={getExampleSource("toggle-group-outline")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ToggleGroupRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("toggle-group-rtl")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="ToggleGroup" rows={toggleGroupRootApi} />
        <ApiReference title="ToggleGroupItem" rows={toggleGroupItemApi} />

        <DocsPageFooter
          href="/docs/components/toggle-group"
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
