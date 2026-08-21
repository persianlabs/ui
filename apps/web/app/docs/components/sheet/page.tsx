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
import { SheetDemoExample } from "@/components/examples/sheet-demo"
import { SheetRtlExample } from "@/components/examples/sheet-rtl"
import { SheetSideExample } from "@/components/examples/sheet-side"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/sheet/page.tsx"

import { sheetContentApi, sheetRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Sheet",
  description:
    "A panel that slides in from an edge of the screen to complement the main content, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "side", title: "Side" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`

export const sheetMarkdown = [
  "# Sheet",
  "",
  "A panel that slides in from an edge of the screen to complement the main content, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/sheet",
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
  "### Sheet",
  "",
  apiRowsToMarkdownTable(sheetRootApi),
  "",
  "### SheetContent",
  "",
  apiRowsToMarkdownTable(sheetContentApi),
].join("\n")

export default function SheetDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Sheet
          </h1>
          <CopyMarkdownButton markdown={sheetMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A panel that slides in from an edge of the screen to complement the
          main content, like a filter drawer or a settings panel. Built on Base
          UI&apos;s dialog primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            'Adds logical side="start"/"end" values on top of the physical top/right/bottom/left, resolved from the ambient direction measured at the trigger — so a sheet can open from the reading-start edge in both LTR and RTL without branching on direction yourself',
            "Close button uses end-3 instead of right-3 so it sits in the correct corner regardless of direction",
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
            preview={<SheetDemoExample />}
            code={
              <CodeBlock code={getExampleSource("sheet-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/sheet" />
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
                  code={getComponentSource("sheet")}
                  lang="tsx"
                  title="components/ui/sheet.tsx"
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
          <h3 id="side" className="text-sm font-medium text-muted-foreground">
            Side
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">side</code>{" "}
            to control which edge the sheet slides in from.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SheetSideExample />}
              code={
                <CodeBlock code={getExampleSource("sheet-side")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              side=&quot;start&quot;
            </code>{" "}
            instead of a hardcoded left/right — it opens from the right in RTL
            and the left in LTR automatically.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<SheetRtlExample />}
              code={
                <CodeBlock code={getExampleSource("sheet-rtl")} lang="tsx" />
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
        <ApiReference title="Sheet" rows={sheetRootApi} />
        <ApiReference title="SheetContent" rows={sheetContentApi} />

        <DocsPageFooter
          href="/docs/components/sheet"
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
