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
import { EmptyBackgroundExample } from "@/components/examples/empty-background"
import { EmptyCityExample } from "@/components/examples/empty-city"
import { EmptyDemoExample } from "@/components/examples/empty-demo"
import { EmptyInputGroupExample } from "@/components/examples/empty-input-group"
import { EmptyOutlineExample } from "@/components/examples/empty-outline"
import { EmptyRtlExample } from "@/components/examples/empty-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/empty/page.tsx"

import { emptyMediaApi } from "./api-data"

export const metadata: Metadata = {
  title: "Empty",
  description:
    "Displays an empty state with a title, description, and optional actions.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "outline", title: "Outline" },
      { id: "background", title: "Background" },
      { id: "input-group", title: "Input Group" },
      { id: "rtl", title: "RTL" },
      { id: "city", title: "No city found" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Add data</Button>
      </EmptyContent>
    </Empty>
  )
}`

export const emptyMarkdown = [
  "# Empty",
  "",
  "Displays an empty state with a title, description, and optional actions.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/empty",
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
  "### EmptyMedia",
  "",
  apiRowsToMarkdownTable(emptyMediaApi),
].join("\n")

export default function EmptyDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Empty
          </h1>
          <CopyMarkdownButton markdown={emptyMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Use the Empty component to display an empty state, with a title,
          description, and optional actions.
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
            preview={<EmptyDemoExample />}
            code={
              <CodeBlock code={getExampleSource("empty-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/empty" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="class-variance-authority" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("empty")}
                  lang="tsx"
                  title="components/ui/empty.tsx"
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
            id="outline"
            className="text-sm font-medium text-muted-foreground"
          >
            Outline
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              border
            </code>{" "}
            utility class to create an outline empty state.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<EmptyOutlineExample />}
              code={
                <CodeBlock
                  code={getExampleSource("empty-outline")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="background"
            className="text-sm font-medium text-muted-foreground"
          >
            Background
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              bg-*
            </code>{" "}
            utilities to add a background to the empty state.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<EmptyBackgroundExample />}
              code={
                <CodeBlock
                  code={getExampleSource("empty-background")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="input-group"
            className="text-sm font-medium text-muted-foreground"
          >
            Input Group
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Add an{" "}
            <a
              href="/docs/components/input-group"
              className="text-foreground underline underline-offset-4"
            >
              InputGroup
            </a>{" "}
            component to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              EmptyContent
            </code>
            .
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<EmptyInputGroupExample />}
              code={
                <CodeBlock
                  code={getExampleSource("empty-input-group")}
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
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<EmptyRtlExample />}
              code={
                <CodeBlock code={getExampleSource("empty-rtl")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="city" className="text-sm font-medium text-muted-foreground">
            No city found
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            A pattern for{" "}
            <a
              href="/docs/components/city-selector"
              className="text-foreground underline underline-offset-4"
            >
              City Selector
            </a>
            &apos;s dependent city field before a province is chosen.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<EmptyCityExample />}
              code={
                <CodeBlock code={getExampleSource("empty-city")} lang="tsx" />
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
        <ApiReference title="EmptyMedia" rows={emptyMediaApi} />

        <DocsPageFooter
          href="/docs/components/empty"
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
