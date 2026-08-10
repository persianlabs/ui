import type { Metadata } from "next"
import type { ReactNode } from "react"
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
import { UseTimeAgoDemoExample } from "@/components/examples/use-time-ago-demo"
import { UseTimeAgoEnExample } from "@/components/examples/use-time-ago-en"
import { UseTimeAgoIntervalExample } from "@/components/examples/use-time-ago-interval"
import { UseTimeAgoMaxExample } from "@/components/examples/use-time-ago-max"
import { UseTimeAgoMessagesExample } from "@/components/examples/use-time-ago-messages"
import { UseTimeAgoRtlExample } from "@/components/examples/use-time-ago-rtl"
import { UseTimeAgoSecondExample } from "@/components/examples/use-time-ago-second"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getHookSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  builtInTablesApi,
  formatTimeAgoApi,
  timeAgoMessagesApi,
  useTimeAgoApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/use-time-ago/page.tsx"

export const metadata: Metadata = {
  title: "useTimeAgo",
  description:
    'A reactive relative-time formatter ("۲ روز پیش" / "2 days ago") with built-in Persian and English message tables.',
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "en", title: "English locale" },
      { id: "interval", title: "Custom update interval" },
      { id: "max", title: "Falling back to a full date" },
      { id: "second", title: "Showing seconds" },
      { id: "messages", title: "Custom messages" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { useTimeAgo } from "@/hooks/use-time-ago"

function LastSeen({ at }: { at: string }) {
  const ago = useTimeAgo(at)

  return <span>{ago}</span> // "۲ ساعت پیش"
}`

export const useTimeAgoMarkdown = [
  "# useTimeAgo",
  "",
  'A reactive relative-time formatter ("۲ روز پیش" / "2 days ago") that re-renders on an interval so the string stays current. Ships with Persian and English message tables and a pure `formatTimeAgo` function for non-reactive use. Returns null until the hook has run in the browser, since it reads `Date.now()` internally.',
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/use-time-ago.json",
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
  "### useTimeAgo(time, options?)",
  "",
  apiRowsToMarkdownTable(useTimeAgoApi),
  "",
  "### formatTimeAgo",
  "",
  apiRowsToMarkdownTable(formatTimeAgoApi),
  "",
  "### TimeAgoMessages",
  "",
  apiRowsToMarkdownTable(timeAgoMessagesApi),
  "",
  "### Built-in message tables",
  "",
  apiRowsToMarkdownTable(builtInTablesApi),
].join("\n")

export default function UseTimeAgoDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            useTimeAgo
          </h1>
          <CopyMarkdownButton markdown={useTimeAgoMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Formats the distance between a timestamp and now — &ldquo;همین
          الان&rdquo;, &ldquo;۵ دقیقه پیش&rdquo;, &ldquo;دیروز&rdquo; — and
          keeps that string current by
          re-rendering on an interval. Works with Persian or English
          messages, and can fall back to an absolute date past a threshold.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<UseTimeAgoDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("use-time-ago-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/use-time-ago.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-time-ago")}
                  lang="ts"
                  title="hooks/use-time-ago.ts"
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
        <ExampleSection
          id="en"
          title="English locale"
          description={
            'Pass locale: "en" to switch to the built-in English message table.'
          }
          preview={<UseTimeAgoEnExample />}
          source="use-time-ago-en"
        />
        <ExampleSection
          id="interval"
          title="Custom update interval"
          description={
            'updateInterval controls how often the string re-renders — shorten it for a live-feeling "seconds ago" counter.'
          }
          preview={<UseTimeAgoIntervalExample />}
          source="use-time-ago-interval"
        />
        <ExampleSection
          id="max"
          title="Falling back to a full date"
          description="max caps how far back the relative format goes; beyond it, fullDateFormatter renders an absolute date instead."
          preview={<UseTimeAgoMaxExample />}
          source="use-time-ago-max"
        />
        <ExampleSection
          id="second"
          title="Showing seconds"
          description={
            'By default, anything under a minute collapses to "just now". showSecond keeps the seconds unit instead.'
          }
          preview={<UseTimeAgoSecondExample />}
          source="use-time-ago-second"
        />
        <ExampleSection
          id="messages"
          title="Custom messages"
          description="Supply your own TimeAgoMessages table to fully control the wording for every unit."
          preview={<UseTimeAgoMessagesExample />}
          source="use-time-ago-messages"
        />
        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The default Persian message table already reads correctly
            right-to-left; there&apos;s no bidi-specific fix needed here beyond
            using it inside Persian content, as shown below.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<UseTimeAgoRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-time-ago-rtl")}
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
        <ApiReference title="useTimeAgo(time, options?)" rows={useTimeAgoApi} />
        <ApiReference title="formatTimeAgo" rows={formatTimeAgoApi} />
        <ApiReference title="TimeAgoMessages" rows={timeAgoMessagesApi} />
        <ApiReference title="Built-in message tables" rows={builtInTablesApi} />
        <DocsPageFooter
          href="/docs/utilities/use-time-ago"
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

function ExampleSection({
  id,
  title,
  description,
  preview,
  source,
}: {
  id: string
  title: string
  description: string
  preview: ReactNode
  source: string
}) {
  return (
    <div className="mt-8">
      <h3 id={id} className="text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-3">
        <ComponentPreview
          preview={preview}
          code={<CodeBlock code={getExampleSource(source)} lang="tsx" />}
        />
      </div>
    </div>
  )
}

