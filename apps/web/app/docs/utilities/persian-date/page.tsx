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
import { PersianDateArithmeticExample } from "@/components/examples/persian-date-arithmetic"
import { PersianDateBoundariesExample } from "@/components/examples/persian-date-boundaries"
import { PersianDateComparisonsExample } from "@/components/examples/persian-date-comparisons"
import { PersianDateConversionExample } from "@/components/examples/persian-date-conversion"
import { PersianDateDemoExample } from "@/components/examples/persian-date-demo"
import { PersianDateLeapYearExample } from "@/components/examples/persian-date-leap-year"
import { PersianDateParsingExample } from "@/components/examples/persian-date-parsing"
import { PersianDateRangeExample } from "@/components/examples/persian-date-range"
import { PersianDateReservationExample } from "@/components/examples/persian-date-reservation"
import { PersianDateRtlExample } from "@/components/examples/persian-date-rtl"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getLibSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  arithmeticApi,
  comparisonsRangesApi,
  conversionApi,
  dateOptionsApi,
  digitsApi,
  formattingParsingApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/persian-date/page.tsx"

export const metadata: Metadata = {
  title: "Persian Date",
  description:
    "Jalali/Gregorian date utilities built on date-fns and date-fns-jalali: formatting, parsing, conversion, ranges, and digit conversion, switchable with a calendarType prop.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "parsing", title: "Parsing" },
      { id: "conversion", title: "Conversion" },
      { id: "arithmetic", title: "Arithmetic" },
      { id: "boundaries", title: "Start / end of range" },
      { id: "leap-year", title: "Leap year" },
      { id: "comparisons", title: "Comparisons" },
      { id: "range", title: "Date range" },
      { id: "reservation", title: "Range validation" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { formatDate, addDays, today } from "@/lib/persian-date"

const checkIn = today()
const checkOut = addDays(checkIn, 3)

formatDate(checkIn, "yyyy/MM/dd") // "1404/06/01" (Jalali by default)
formatDate(checkOut, "d MMMM", { calendarType: "miladi" }) // Gregorian`

export const persianDateMarkdown = [
  "# Persian Date",
  "",
  'Jalali/Gregorian date utilities built on date-fns and date-fns-jalali: formatting, parsing, conversion, arithmetic, ranges, comparisons, and digit conversion. Every function that depends on a calendar accepts an optional `calendarType` (`"shamsi"` by default, or `"miladi"`).',
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/persian-date.json",
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
  "### Formatting & Parsing",
  "",
  apiRowsToMarkdownTable(formattingParsingApi),
  "",
  "### Conversion",
  "",
  apiRowsToMarkdownTable(conversionApi),
  "",
  "### Arithmetic",
  "",
  apiRowsToMarkdownTable(arithmeticApi),
  "",
  "### Comparisons & Ranges",
  "",
  apiRowsToMarkdownTable(comparisonsRangesApi),
  "",
  "### Digits",
  "",
  apiRowsToMarkdownTable(digitsApi),
  "",
  "### DateOptions",
  "",
  apiRowsToMarkdownTable(dateOptionsApi),
].join("\n")

export default function PersianDateDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Persian Date
          </h1>
          <CopyMarkdownButton markdown={persianDateMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A single set of date utilities that works across the Jalali (Solar
          Hijri) and Gregorian calendars: format and parse dates, convert
          between calendars, do calendar-aware arithmetic, and validate
          reservation-style ranges — all built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            date-fns
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            date-fns-jalali
          </code>
          .
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
            preview={<PersianDateDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("persian-date-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/persian-date.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getLibSource("persian-date")}
                  lang="ts"
                  title="lib/persian-date.ts"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every function that reads or manipulates calendar fields (months,
          years, week boundaries) accepts an optional{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            calendarType
          </code>{" "}
          — the Jalali calendar is the default, since this library is
          Iran-first.
        </p>
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
          id="parsing"
          title="Parsing"
          description="parseDate normalizes Persian/Arabic-Indic digits before parsing, and returns null instead of an invalid Date on failure."
          preview={<PersianDateParsingExample />}
          source="persian-date-parsing"
        />
        <ExampleSection
          id="conversion"
          title="Shamsi ↔ Miladi conversion"
          description="toParts/fromParts (and their toShamsi/toMiladi/fromShamsi/fromMiladi shorthands) round-trip a Date through calendar fields without losing precision."
          preview={<PersianDateConversionExample />}
          source="persian-date-conversion"
        />
        <ExampleSection
          id="arithmetic"
          title="Calendar-aware arithmetic"
          description="addMonths and addYears respect the active calendar's month lengths — adding a month to the end of Esfand behaves differently than adding one to the Gregorian February."
          preview={<PersianDateArithmeticExample />}
          source="persian-date-arithmetic"
        />
        <ExampleSection
          id="boundaries"
          title="Start / end of week, month, year"
          description="startOfWeek/endOfWeek default to a Saturday-start week for shamsi (Sunday for miladi); startOfMonth/endOfMonth and startOfYear/endOfYear follow the same calendar-aware pattern."
          preview={<PersianDateBoundariesExample />}
          source="persian-date-boundaries"
        />
        <ExampleSection
          id="leap-year"
          title="Leap year & days in month"
          description="isLeapYear and daysInMonth resolve Esfand's 29 vs. 30 days for the Jalali calendar."
          preview={<PersianDateLeapYearExample />}
          source="persian-date-leap-year"
        />
        <ExampleSection
          id="comparisons"
          title="Comparisons"
          description="isToday, isPast, and isFuture classify a date relative to the current moment."
          preview={<PersianDateComparisonsExample />}
          source="persian-date-comparisons"
        />
        <ExampleSection
          id="range"
          title="Date range"
          description="eachDayOfRange lists every day in an inclusive range; isWithinRange checks whether a given date falls inside it."
          preview={<PersianDateRangeExample />}
          source="persian-date-range"
        />
        <ExampleSection
          id="reservation"
          title="Range validation (reservation form)"
          description="validateRange is built for hospital/hotel-style booking forms: it checks ordering, minimum/maximum stay length, past dates, and specific blocked dates, returning a machine-readable reason you can map to a message."
          preview={<PersianDateReservationExample />}
          source="persian-date-reservation"
        />
        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            formatDate already outputs Persian digits and Persian month/weekday
            names by default in the shamsi calendar, so the formatted string
            reads naturally inside right-to-left content with no extra direction
            handling.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<PersianDateRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("persian-date-rtl")}
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
        <ApiReference
          title="Formatting & Parsing"
          rows={formattingParsingApi}
        />
        <ApiReference title="Conversion" rows={conversionApi} />
        <ApiReference title="Arithmetic" rows={arithmeticApi} />
        <ApiReference
          title="Comparisons & Ranges"
          rows={comparisonsRangesApi}
        />
        <ApiReference title="Digits" rows={digitsApi} />
        <ApiReference title="DateOptions" rows={dateOptionsApi} />
        <DocsPageFooter
          href="/docs/utilities/persian-date"
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
