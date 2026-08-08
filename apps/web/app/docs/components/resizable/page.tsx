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
import { ResizableDemoExample } from "@/components/examples/resizable-demo"
import { ResizableRtlExample } from "@/components/examples/resizable-rtl"
import { ResizableVerticalExample } from "@/components/examples/resizable-vertical"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/resizable/page.tsx"

import {
  resizableHandleApi,
  resizablePanelApi,
  resizablePanelGroupApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Resizable",
  description:
    "Accessible resizable panel groups and layouts, built on react-resizable-panels.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "vertical", title: "Vertical" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function Example() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-40">
      <ResizablePanel defaultSize={50}>Sidebar</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>Content</ResizablePanel>
    </ResizablePanelGroup>
  )
}`

export const resizableMarkdown = [
  "# Resizable",
  "",
  "Accessible resizable panel groups and layouts, built on react-resizable-panels.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/resizable.json",
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
  "### ResizablePanelGroup",
  "",
  apiRowsToMarkdownTable(resizablePanelGroupApi),
  "",
  "### ResizablePanel",
  "",
  apiRowsToMarkdownTable(resizablePanelApi),
  "",
  "### ResizableHandle",
  "",
  apiRowsToMarkdownTable(resizableHandleApi),
].join("\n")

export default function ResizableDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Resizable
          </h1>
          <CopyMarkdownButton markdown={resizableMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Accessible resizable panel groups and layouts, built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            react-resizable-panels
          </code>
          .
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
            preview={<ResizableDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("resizable-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/resizable.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="react-resizable-panels" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("resizable")}
                  lang="tsx"
                  title="components/ui/resizable.tsx"
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
          id="vertical"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Vertical
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<ResizableVerticalExample />}
            code={
              <CodeBlock
                code={getExampleSource("resizable-vertical")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The drag handle&apos;s centering is direction-agnostic, and the
          panel order visually flips along with the surrounding layout
          under RTL.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ResizableRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("resizable-rtl")}
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
        <ApiReference title="ResizablePanelGroup" rows={resizablePanelGroupApi} />
        <ApiReference title="ResizablePanel" rows={resizablePanelApi} />
        <ApiReference title="ResizableHandle" rows={resizableHandleApi} />

        <DocsPageFooter
          href="/docs/components/resizable"
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
