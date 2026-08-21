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
import { DocsPageFooter } from "@/components/docs-page-footer"
import { UseControllableStateDemoExample } from "@/components/examples/use-controllable-state-demo"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getHookSource } from "@/lib/component-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH =
  "apps/web/app/docs/utilities/use-controllable-state/page.tsx"

import { useControllableStateApi } from "./api-data"

export const metadata: Metadata = {
  title: "useControllableState",
  description:
    "A hook for a value that can be either controlled or uncontrolled, with a single consistent API either way.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { useControllableState } from "@/hooks/use-controllable-state"

function Counter({ value, defaultValue = 0, onValueChange }) {
  const [count, setCount] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "Counter",
  })

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}`

export const useControllableStateMarkdown = [
  "# useControllableState",
  "",
  "A hook for a value that can be either controlled or uncontrolled, with a single consistent API either way.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/use-controllable-state",
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
  apiRowsToMarkdownTable(useControllableStateApi),
].join("\n")

export default function UseControllableStateDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            useControllableState
          </h1>
          <CopyMarkdownButton markdown={useControllableStateMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Powers every component in this registry that supports both a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            value
          </code>
          /
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            onValueChange
          </code>{" "}
          (controlled) and a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            defaultValue
          </code>{" "}
          (uncontrolled) mode — including{" "}
          <a
            href="/docs/components/price-input"
            className="text-foreground underline underline-offset-4"
          >
            Price Input
          </a>
          ,{" "}
          <a
            href="/docs/components/elastic-slider"
            className="text-foreground underline underline-offset-4"
          >
            Elastic Slider
          </a>
          , and{" "}
          <a
            href="/docs/components/elastic-range-slider"
            className="text-foreground underline underline-offset-4"
          >
            Elastic Range Slider
          </a>
          .
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The first counter manages its own state internally (uncontrolled). The
          second is driven entirely by the parent (controlled) — the same{" "}
          <code>Counter</code> implementation handles both.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<UseControllableStateDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("use-controllable-state-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/use-controllable-state" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-controllable-state")}
                  lang="ts"
                  title="hooks/use-controllable-state.ts"
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
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference
          title="useControllableState(options)"
          rows={useControllableStateApi}
        />

        <DocsPageFooter
          href="/docs/utilities/use-controllable-state"
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
