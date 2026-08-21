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
import { ContextMenuDemoExample } from "@/components/examples/context-menu-demo"
import { ContextMenuRtlExample } from "@/components/examples/context-menu-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/context-menu/page.tsx"

import {
  contextMenuContentApi,
  contextMenuItemApi,
  contextMenuRootApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Context Menu",
  description:
    "A menu of actions triggered by a right click, built on Base UI.",
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
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`

export const contextMenuMarkdown = [
  "# Context Menu",
  "",
  "A menu of actions triggered by a right click, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/context-menu",
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
  "### ContextMenu",
  "",
  apiRowsToMarkdownTable(contextMenuRootApi),
  "",
  "### ContextMenuContent",
  "",
  apiRowsToMarkdownTable(contextMenuContentApi),
  "",
  "### ContextMenuItem",
  "",
  apiRowsToMarkdownTable(contextMenuItemApi),
].join("\n")

export default function ContextMenuDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Context Menu
          </h1>
          <CopyMarkdownButton markdown={contextMenuMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A menu of actions triggered by a right click, with support for
          checkboxes, radio groups, and nested submenus. Built on Base UI&apos;s
          context menu primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            'ContextMenuTrigger measures the ambient direction where it renders and passes it explicitly to the portaled content, so the logical side="inline-end" default (and submenus) open toward the correct edge in RTL instead of shadcn\'s hardcoded side="right"',
            "All spacing (item padding, checkmark position, shortcut alignment) uses logical ps-/pe-/end-/ms- utilities instead of physical pl-/pr-/right-/ml-, and the submenu chevron flips with rtl:-scale-x-100",
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
            preview={<ContextMenuDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("context-menu-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/context-menu" />
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
                  code={getComponentSource("context-menu")}
                  lang="tsx"
                  title="components/ui/context-menu.tsx"
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
            Checkboxes, a radio group, and a submenu, all opening toward the
            correct reading-end edge automatically.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<ContextMenuRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("context-menu-rtl")}
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
        <ApiReference title="ContextMenu" rows={contextMenuRootApi} />
        <ApiReference title="ContextMenuContent" rows={contextMenuContentApi} />
        <ApiReference title="ContextMenuItem" rows={contextMenuItemApi} />

        <DocsPageFooter
          href="/docs/components/context-menu"
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
