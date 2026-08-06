import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { TabsControlledExample } from "@/components/examples/tabs-controlled"
import { TabsDefaultExample } from "@/components/examples/tabs-default"
import { TabsDisabledExample } from "@/components/examples/tabs-disabled"
import { TabsIconsExample } from "@/components/examples/tabs-icons"
import { TabsScrollableExample } from "@/components/examples/tabs-scrollable"
import { TabsVariantsExample } from "@/components/examples/tabs-variants"
import { TabsVerticalExample } from "@/components/examples/tabs-vertical"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/tabs/page.tsx"

import {
  tabsContentApi,
  tabsListApi,
  tabsRootApi,
  tabsTriggerApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Tabs",
  description:
    "An accessible, animated tabs component with a spring-driven sliding indicator, built on Base UI and Motion.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "variants", title: "Variants" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "example-icons", title: "With icons" },
      { id: "example-disabled", title: "Disabled tab" },
      { id: "example-controlled", title: "Controlled" },
      { id: "example-vertical", title: "Vertical" },
      { id: "example-scrollable", title: "Scrollable" },
    ],
  },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="activity">Activity content</TabsContent>
    </Tabs>
  )
}`

const tabsMarkdown = [
  "# Tabs",
  "",
  "An accessible, animated tabs component with a spring-driven sliding indicator, built on Base UI and Motion.",
  "",
  "## Variants",
  "",
  "Pass `variant` to `Tabs` to switch the tab list's visual style: `default`, `rounded`, `line`, or `ghost`.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/tabs",
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
  "### Tabs",
  "",
  apiRowsToMarkdownTable(tabsRootApi),
  "",
  "### TabsList",
  "",
  apiRowsToMarkdownTable(tabsListApi),
  "",
  "### TabsTrigger",
  "",
  apiRowsToMarkdownTable(tabsTriggerApi),
  "",
  "### TabsContent",
  "",
  apiRowsToMarkdownTable(tabsContentApi),
].join("\n")

export default function TabsDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="min-w-0 max-w-3xl flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Tabs</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              A set of layered panels, one visible at a time, with an
              active-tab indicator that slides to match the current selection
              using a spring animation. Built on Base UI&apos;s tabs
              primitive, so focus management, keyboard navigation, and ARIA
              wiring come for free.
            </p>
            <LastUpdated date={lastEdited} />
          </div>
          <CopyMarkdownButton markdown={tabsMarkdown} />
        </div>

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<TabsDefaultExample />}
            code={
              <CodeBlock code={getExampleSource("tabs-default")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="variants"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Variants
        </h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Pass{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            variant
          </code>{" "}
          to{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            Tabs
          </code>{" "}
          to switch the tab list&apos;s visual style.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<TabsVariantsExample />}
            code={
              <CodeBlock code={getExampleSource("tabs-variants")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="mt-4">
          <h3
            id="example-icons"
            className="text-muted-foreground text-sm font-medium"
          >
            With icons
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<TabsIconsExample />}
              code={
                <CodeBlock code={getExampleSource("tabs-icons")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-disabled"
            className="text-muted-foreground text-sm font-medium"
          >
            Disabled tab
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<TabsDisabledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("tabs-disabled")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-controlled"
            className="text-muted-foreground text-sm font-medium"
          >
            Controlled
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<TabsControlledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("tabs-controlled")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-vertical"
            className="text-muted-foreground text-sm font-medium"
          >
            Vertical
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<TabsVerticalExample />}
              code={
                <CodeBlock
                  code={getExampleSource("tabs-vertical")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-scrollable"
            className="text-muted-foreground text-sm font-medium"
          >
            Scrollable
          </h3>
          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            When the tab list overflows, edges fade to hint at more content
            and sharpen once you&apos;ve scrolled all the way — direction
            aware, so it mirrors correctly in RTL.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<TabsScrollableExample />}
              code={
                <CodeBlock
                  code={getExampleSource("tabs-scrollable")}
                  lang="tsx"
                />
              }
            />
          </div>
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/tabs" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium">
                1. Install the dependencies
              </p>
              <div className="mt-2">
                <CopyCommand command="npm install @base-ui/react motion" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                2. Copy the component source
              </p>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                Create{" "}
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
                  components/ui/tabs.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock code={getComponentSource("tabs")} lang="tsx" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Tabs" rows={tabsRootApi} />
        <ApiReference title="TabsList" rows={tabsListApi} />
        <ApiReference title="TabsTrigger" rows={tabsTriggerApi} />
        <ApiReference title="TabsContent" rows={tabsContentApi} />

        <DocsPageFooter href="/docs/components/tabs" sourcePath={SOURCE_PATH} />
      </article>

      <aside className="hidden w-44 shrink-0 xl:block">
        <div className="sticky top-24">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  )
}
