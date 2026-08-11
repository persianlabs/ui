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
import { UseDateDemoExample } from "@/components/examples/use-date-demo"
import { UseDateHolidayExample } from "@/components/examples/use-date-holiday"
import { UseDateMiladiExample } from "@/components/examples/use-date-miladi"
import { UseDateNavigatorExample } from "@/components/examples/use-date-navigator"
import { UseDatePatternExample } from "@/components/examples/use-date-pattern"
import { UseDateRtlExample } from "@/components/examples/use-date-rtl"
import { UseDateStaticExample } from "@/components/examples/use-date-static"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getHookSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { useDateApi, useDateResultApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/use-date/page.tsx"

export const metadata: Metadata = {
  title: "useDate",
  description:
    "A reactive current date/time hook with Jalali/Gregorian support, formatted output, and optional holiday flagging.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "miladi", title: "Gregorian mode" },
      { id: "pattern", title: "Custom pattern & digits" },
      { id: "static", title: "Disabling the tick" },
      { id: "holiday", title: "Holiday flagging" },
      { id: "navigator", title: "Day/week/month/year navigator" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { useDate } from "@/hooks/use-date"

function Clock() {
  const date = useDate({ checkHoliday: true })

  // null on the server and on the very first client render -- "now" can't be
  // read consistently in both places, so the hook waits until it has mounted.
  if (!date) return null

  const { formatted, isHoliday } = date

  return <span>{formatted}{isHoliday ? " (تعطیل)" : ""}</span>
}`

export const useDateMarkdown = [
  "# useDate",
  "",
  "A reactive current date/time hook with built-in Jalali/Gregorian calendar support. Ticks on an interval (every second by default) and re-renders with the latest value, an already-formatted string, individual calendar fields, and optional holiday flagging. Returns null until the hook has run in the browser, since `new Date()` reads differently on the server than on the client.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/use-date.json",
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
  "### useDate(options?)",
  "",
  apiRowsToMarkdownTable(useDateApi),
  "",
  "### UseDateResult",
  "",
  apiRowsToMarkdownTable(useDateResultApi),
].join("\n")

export default function UseDateDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            useDate
          </h1>
          <CopyMarkdownButton markdown={useDateMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A ticking clock hook built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            persian-date
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            persian-holidays
          </code>
          . Returns the current date/time, a ready-to-render formatted string,
          individual calendar fields, and — when asked — whether today is a
          holiday.
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
            preview={<UseDateDemoExample />}
            code={
              <CodeBlock code={getExampleSource("use-date-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/use-date.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-date")}
                  lang="ts"
                  title="hooks/use-date.ts"
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
          id="miladi"
          title="Gregorian mode"
          description={
            'Set calendarType: "miladi" to switch the formatted output and returned fields to the Gregorian calendar.'
          }
          preview={<UseDateMiladiExample />}
          source="use-date-miladi"
        />
        <ExampleSection
          id="pattern"
          title="Custom pattern & digits"
          description="pattern accepts any date-fns token, and digits lets you force Latin digits even in the shamsi calendar."
          preview={<UseDatePatternExample />}
          source="use-date-pattern"
        />
        <ExampleSection
          id="static"
          title="Disabling the tick"
          description="Pass interval: 0 to read the time once on mount without setting up a timer — useful for a one-shot timestamp."
          preview={<UseDateStaticExample />}
          source="use-date-static"
        />
        <ExampleSection
          id="holiday"
          title="Holiday flagging"
          description="checkHoliday: true flags the current date against the built-in Iranian holiday dataset and lists any matching entries."
          preview={<UseDateHolidayExample />}
          source="use-date-holiday"
        />
        <ExampleSection
          id="navigator"
          title="Day/week/month/year navigator"
          description="A selected-date navigator built from persian-date's addDays/addWeeks/addMonths/addYears -- a common pattern for calendar/agenda UIs that step through time by different units."
          preview={<UseDateNavigatorExample />}
          source="use-date-navigator"
        />
        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The shamsi calendar&apos;s month and weekday names are already
            Persian, so a pattern like{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              EEEE d MMMM yyyy
            </code>{" "}
            reads naturally in right-to-left content.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<UseDateRtlExample />}
              code={
                <CodeBlock code={getExampleSource("use-date-rtl")} lang="tsx" />
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
        <ApiReference title="useDate(options?)" rows={useDateApi} />
        <ApiReference title="UseDateResult" rows={useDateResultApi} />
        <DocsPageFooter
          href="/docs/utilities/use-date"
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
