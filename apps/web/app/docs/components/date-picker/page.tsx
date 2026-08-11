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
import { DatePickerCalendarTypeExample } from "@/components/examples/date-picker-calendar-type"
import { DatePickerDemoExample } from "@/components/examples/date-picker-demo"
import { DatePickerDobExample } from "@/components/examples/date-picker-dob"
import { DatePickerInputExample } from "@/components/examples/date-picker-input"
import { DatePickerRangeExample } from "@/components/examples/date-picker-range"
import { DatePickerReservationExample } from "@/components/examples/date-picker-reservation"
import { DatePickerResponsiveExample } from "@/components/examples/date-picker-responsive"
import { DatePickerRtlExample } from "@/components/examples/date-picker-rtl"
import { DatePickerWithTimeExample } from "@/components/examples/date-picker-with-time"
import { DatePickerZodExample } from "@/components/examples/date-picker-zod"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/date-picker/page.tsx"

import { datePickerApi } from "./api-data"

export const metadata: Metadata = {
  title: "Date Picker",
  description:
    "A date picker composed from Popover and Calendar — there's no standalone DatePicker component, same as upstream shadcn/ui.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "range", title: "Range" },
      { id: "with-time", title: "With Time" },
      { id: "responsive", title: "Fully Responsive" },
      { id: "input", title: "Typed Input" },
      { id: "date-of-birth", title: "Date of Birth" },
      { id: "calendar-type", title: "Calendar Type" },
      { id: "reservation", title: "Reservation" },
      { id: "zod-form", title: "Zod-Validated Form" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "@/lib/persian-date"

export function Example() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-56 justify-start font-normal">
            <CalendarIcon className="size-4" />
            {date ? formatDate(date, "yyyy/MM/dd") : "انتخاب تاریخ"}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value)
            setOpen(false)
          }}
          className="p-2"
        />
      </PopoverContent>
    </Popover>
  )
}`

export const datePickerMarkdown = [
  "# Date Picker",
  "",
  "A date picker composed from Popover and Calendar — there's no standalone DatePicker component, same as upstream shadcn/ui.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/calendar.json https://ui.persian-labs.ir/r/popover.json",
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
  apiRowsToMarkdownTable(datePickerApi),
].join("\n")

export default function DatePickerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Date Picker
          </h1>
          <CopyMarkdownButton markdown={datePickerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          There&apos;s no standalone{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            DatePicker
          </code>{" "}
          component — this page shows how to compose a date picker from{" "}
          <a
            href="/docs/components/popover"
            className="text-foreground underline underline-offset-4"
          >
            Popover
          </a>{" "}
          and{" "}
          <a
            href="/docs/components/calendar"
            className="text-foreground underline underline-offset-4"
          >
            Calendar
          </a>
          , the same pattern upstream shadcn/ui uses.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "shadcn/ui",
              href: "https://ui.shadcn.com/docs/components/date-picker",
            },
          ]}
          changed
          changes={[
            "Replaced shadcn's chrono-node natural-language input example with parseDate/formatDate + toLatinDigits from this repo's persian-date utility (no chrono-node dependency here)",
            "Uses this repo's own Calendar (Jalali/Gregorian switchable via calendarType) and Popover components instead of shadcn's react-day-picker Calendar",
            "Added Calendar Type toggle, hospital/hotel Reservation, and Field + zod-validated Form examples not present upstream",
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
            preview={<DatePickerDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("date-picker-demo")}
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
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Date Picker is composed entirely from{" "}
          <a
            href="/docs/components/calendar"
            className="text-foreground underline underline-offset-4"
          >
            Calendar
          </a>{" "}
          and{" "}
          <a
            href="/docs/components/popover"
            className="text-foreground underline underline-offset-4"
          >
            Popover
          </a>
          . Install both, then copy one of the examples below into your project.
        </p>

        <Tabs defaultValue="cli" className="mt-4">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/calendar.json https://ui.persian-labs.ir/r/popover.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="react-day-picker @daypicker/persian date-fns @base-ui/react" />
              </div>
              <Step>Copy the Calendar component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("calendar")}
                  lang="tsx"
                  title="components/ui/calendar.tsx"
                />
              </div>
              <Step>Copy the Popover component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("popover")}
                  lang="tsx"
                  title="components/ui/popover.tsx"
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
          id="range"
          title="Range"
          description={
            <>
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                mode=&quot;range&quot;
              </code>{" "}
              with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                numberOfMonths={"{2}"}
              </code>{" "}
              to pick a from/to pair.
            </>
          }
        >
          <DatePickerRangeExample />
        </ExampleSection>

        <ExampleSection
          id="with-time"
          title="With Time"
          description={
            <>
              Adds a{" "}
              <a
                href="/docs/components/time-picker"
                className="text-foreground underline underline-offset-4"
              >
                Time Picker
              </a>{" "}
              input below the Calendar. That input opens its own popover on
              desktop and a drawer on smaller screens, so the wheel is never
              cramped beneath the calendar.
            </>
          }
        >
          <DatePickerWithTimeExample />
        </ExampleSection>

        <ExampleSection
          id="responsive"
          title="Fully Responsive"
          description={
            <>
              One trigger opens the familiar Calendar-and-time Popover on
              desktop, then switches to a single Drawer containing both controls
              on smaller screens.
            </>
          }
        >
          <DatePickerResponsiveExample />
        </ExampleSection>

        <ExampleSection
          id="input"
          title="Typed Input"
          description={
            <>
              A plain text field the user can type a{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                yyyy/MM/dd
              </code>{" "}
              date into (Persian or Latin digits), parsed live with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                parseDate
              </code>{" "}
              and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                toLatinDigits
              </code>
              , kept in sync with a Calendar opened as a secondary picking
              method. Digits aren&apos;t converted while typing (so the cursor
              stays predictable) -- they&apos;re normalized to a consistent
              digit style on blur or Enter, once the value is done changing.
            </>
          }
        >
          <DatePickerInputExample />
        </ExampleSection>

        <ExampleSection
          id="date-of-birth"
          title="Date of Birth"
          description={
            <>
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                captionLayout=&quot;dropdown&quot;
              </code>{" "}
              for fast year navigation and close the popover on select.
            </>
          }
        >
          <DatePickerDobExample />
        </ExampleSection>

        <ExampleSection
          id="calendar-type"
          title="Calendar Type"
          description={
            <>
              Thread{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                calendarType
              </code>{" "}
              down to Calendar and format the trigger&apos;s label with the
              matching calendar.
            </>
          }
        >
          <DatePickerCalendarTypeExample />
        </ExampleSection>

        <ExampleSection
          id="reservation"
          title="Reservation"
          description={
            <>
              A hotel/hospital-style booking form: a range Calendar wired to{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                validateRange
              </code>{" "}
              (minDays, maxDays, disablePast) for stay-length validation, and to{" "}
              <a
                href="/docs/utilities/persian-holidays"
                className="text-foreground underline underline-offset-4"
              >
                persian-holidays
              </a>
              &apos;s{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                getHolidaysInRange
              </code>{" "}
              to redden holiday cells.
            </>
          }
        >
          <DatePickerReservationExample />
        </ExampleSection>

        <ExampleSection
          id="zod-form"
          title="Zod-Validated Form"
          description={
            <>
              A form built with this repo&apos;s{" "}
              <a
                href="/docs/components/field"
                className="text-foreground underline underline-offset-4"
              >
                Field
              </a>{" "}
              components, where a single date is validated with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                zPersianDate
              </code>{" "}
              and a{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                {"{ from, to }"}
              </code>{" "}
              range with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                zPersianDateRange
              </code>{" "}
              on submit, both driven by Popover+Calendar selection instead of
              free-text typing.
            </>
          }
        >
          <DatePickerZodExample />
        </ExampleSection>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The Shamsi calendar (the default) is already RTL. A date-of-birth
            style field with real Farsi labels and a fully spelled-out trigger
            date.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<DatePickerRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("date-picker-rtl")}
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
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Date Picker has no props of its own — it&apos;s a composition of
          Calendar and Popover. The props below are the ones you&apos;ll
          actually reach for; see{" "}
          <a
            href="/docs/components/calendar"
            className="text-foreground underline underline-offset-4"
          >
            Calendar
          </a>{" "}
          and{" "}
          <a
            href="/docs/components/popover"
            className="text-foreground underline underline-offset-4"
          >
            Popover
          </a>{" "}
          for the complete reference.
        </p>
        <ApiReference title="Composition" rows={datePickerApi} />

        <DocsPageFooter
          href="/docs/components/date-picker"
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
  children,
  dir,
}: {
  id: string
  title: string
  description: React.ReactNode
  children: React.ReactNode
  dir?: "rtl"
}) {
  const sourceName = `date-picker-${id === "date-of-birth" ? "dob" : id === "zod-form" ? "zod" : id}`

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
          dir={dir}
          preview={children}
          code={<CodeBlock code={getExampleSource(sourceName)} lang="tsx" />}
        />
      </div>
    </div>
  )
}
