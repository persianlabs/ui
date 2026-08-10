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
import { MarkerBorderExample } from "@/components/examples/marker-border"
import { MarkerDemoExample } from "@/components/examples/marker-demo"
import { MarkerRtlExample } from "@/components/examples/marker-rtl"
import { MarkerSeparatorExample } from "@/components/examples/marker-separator"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/marker/page.tsx"

import { markerApi } from "./api-data"

export const metadata: Metadata = {
  title: "Marker",
  description:
    "A small label for annotating content, such as a section divider or inline note.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "separator", title: "Separator" },
      { id: "border", title: "Border" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function Example() {
  return (
    <Marker>
      <MarkerIcon>
        <Icon />
      </MarkerIcon>
      <MarkerContent>Requires a Pro plan</MarkerContent>
    </Marker>
  )
}`

export const markerMarkdown = [
  "# Marker",
  "",
  "A small label for annotating content, such as a section divider or inline note.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/marker.json",
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
  "### Marker",
  "",
  apiRowsToMarkdownTable(markerApi),
].join("\n")

export default function MarkerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Marker
          </h1>
          <CopyMarkdownButton markdown={markerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A small label for annotating content, such as a section divider, an
          inline note, or an &quot;OR&quot; separator between actions.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced text-left with text-start",
            "Replaced physical before:mr-1/after:ml-1 with logical before:me-1/after:ms-1 on the separator variant",
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
            preview={<MarkerDemoExample />}
            code={
              <CodeBlock code={getExampleSource("marker-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/marker.json" />
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
                  code={getComponentSource("marker")}
                  lang="tsx"
                  title="components/ui/marker.tsx"
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
            id="separator"
            className="text-sm font-medium text-muted-foreground"
          >
            Separator
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              separator
            </code>{" "}
            variant draws a rule on each side of the content, e.g. between two
            alternate actions.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<MarkerSeparatorExample />}
              code={
                <CodeBlock
                  code={getExampleSource("marker-separator")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="border" className="text-sm font-medium text-muted-foreground">
            Border
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<MarkerBorderExample />}
              code={
                <CodeBlock
                  code={getExampleSource("marker-border")}
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
            The separator&apos;s rules on either side of &quot;یا&quot; mirror
            correctly under RTL.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<MarkerRtlExample />}
              code={
                <CodeBlock code={getExampleSource("marker-rtl")} lang="tsx" />
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
        <ApiReference title="Marker" rows={markerApi} />

        <DocsPageFooter
          href="/docs/components/marker"
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
