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
import { PersianDateZodDemoExample } from "@/components/examples/persian-date-zod-demo"
import { PersianDateZodRangeExample } from "@/components/examples/persian-date-zod-range"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getLibSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { zPersianDateApi, zPersianDateRangeApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/persian-date-zod/page.tsx"

export const metadata: Metadata = {
  title: "Persian Date (Zod)",
  description:
    "zod schemas for persian-date: coerce and validate a date, or a from/to reservation-style range.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "bounds", title: "Bounds" },
      { id: "range", title: "Range validation" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { z } from "zod"
import { zPersianDate, zPersianDateRange } from "@/lib/persian-date-zod"

const Booking = z.object({
  checkIn: zPersianDate({ min: "2026-01-01" }),
  checkOut: zPersianDate(),
})

Booking.parse({ checkIn: "1405/10/01", checkOut: new Date() })
// -> { checkIn: Date, checkOut: Date } -- both coerced to native Date

const Stay = zPersianDateRange({ minDays: 1, maxDays: 14, disablePast: true })
Stay.parse({ checkIn: "2026-08-10", checkOut: "2026-08-12" })`

export const zPersianDateMarkdown = [
  "# Persian Date (Zod)",
  "",
  "zod schemas built on persian-date. `zPersianDate` accepts an ISO-8601 string, a shamsi `yyyy/MM/dd` string, an epoch number, or a native `Date`, and outputs a plain `Date` -- so the rest of your app never has to think about which format a date arrived in. `zPersianDateRange` validates a `{ from, to }` reservation-style range with the same rules as persian-date's `validateRange`.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/persian-date-zod",
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
  "### zPersianDate",
  "",
  apiRowsToMarkdownTable(zPersianDateApi),
  "",
  "### zPersianDateRange",
  "",
  apiRowsToMarkdownTable(zPersianDateRangeApi),
].join("\n")

export default function PersianDateZodDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Persian Date (Zod)
          </h1>
          <CopyMarkdownButton markdown={zPersianDateMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            zPersianDate
          </code>{" "}
          coerces an ISO-8601 string, a shamsi <code>yyyy/MM/dd</code> string,
          an epoch number, or a native <code>Date</code> into a validated{" "}
          <code>Date</code>, with inclusive <code>min</code>/<code>max</code>{" "}
          bounds.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            zPersianDateRange
          </code>{" "}
          wraps a <code>from</code>/<code>to</code> pair with{" "}
          <a
            href="/docs/utilities/persian-date"
            className="text-foreground underline underline-offset-4"
          >
            persian-date&apos;s
          </a>{" "}
          <code>validateRange</code> rules -- ordering, minimum/maximum stay
          length, past dates, and blocked dates.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Type an ISO date (<code>2026-08-10</code>) or a shamsi date (
          <code>1405/05/19</code>) below -- both parse to the same schema.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<PersianDateZodDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("persian-date-zod-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/persian-date-zod" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>
                Install <code>zod</code>, <code>date-fns</code>, and{" "}
                <code>date-fns-jalali</code> if you don&apos;t already have
                them, plus the persian-date lib.
              </Step>
              <div className="mt-2">
                <CodeBlock
                  code={getLibSource("persian-date-zod")}
                  lang="ts"
                  title="lib/persian-date-zod.ts"
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
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Both schemas are plain zod schemas, so they drop into any zod-based
          form resolver (react-hook-form, VeeValidate, Felte, ...) the same way
          any other zod field would.
        </p>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>
        <div className="mt-8">
          <h3 id="bounds" className="text-sm font-medium text-muted-foreground">
            Bounds
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The demo above is bounded to 2026 (
            <code>{`min: "2026-01-01"`}</code>,{" "}
            <code>{`max: "2026-12-31"`}</code>) -- try a date outside that range
            to see the bound violation message.
          </p>
        </div>
        <div className="mt-8">
          <h3 id="range" className="text-sm font-medium text-muted-foreground">
            Range validation
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            <code>zPersianDateRange</code> validates a check-in/check-out pair
            in one schema -- the same reservation-form use case
            persian-date&apos;s <code>validateRange</code> targets, just
            expressed as a zod schema you can plug into a form resolver.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<PersianDateZodRangeExample />}
              code={
                <CodeBlock
                  code={getExampleSource("persian-date-zod-range")}
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
        <ApiReference title="zPersianDate(options?)" rows={zPersianDateApi} />
        <ApiReference
          title="zPersianDateRange(options?)"
          rows={zPersianDateRangeApi}
        />

        <DocsPageFooter
          href="/docs/utilities/persian-date-zod"
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
