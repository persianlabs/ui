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
import { DatePickerCloseOnSelectExample } from "@/components/examples/date-picker-close-on-select"
import { DatePickerConfirmationExample } from "@/components/examples/date-picker-confirmation"
import { DatePickerConstrainedExample } from "@/components/examples/date-picker-constrained"
import { DatePickerControlledExample } from "@/components/examples/date-picker-controlled"
import { DatePickerCustomTriggerExample } from "@/components/examples/date-picker-custom-trigger"
import { DatePickerDemoExample } from "@/components/examples/date-picker-demo"
import { DatePickerDobExample } from "@/components/examples/date-picker-dob"
import { DatePickerInputExample } from "@/components/examples/date-picker-input"
import { DatePickerMiladiExample } from "@/components/examples/date-picker-miladi"
import { DatePickerPresetsResponsiveExample } from "@/components/examples/date-picker-presets-responsive"
import { DatePickerRangeExample } from "@/components/examples/date-picker-range"
import { DatePickerReservationExample } from "@/components/examples/date-picker-reservation"
import { DatePickerResponsiveExample } from "@/components/examples/date-picker-responsive"
import { DatePickerRtlExample } from "@/components/examples/date-picker-rtl"
import { DatePickerWithTimeExample } from "@/components/examples/date-picker-with-time"
import { DatePickerTimeAdvancedExample } from "@/components/examples/date-picker-time-advanced"
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

import { datePickerApi, dateTimePickerApi } from "./api-data"

export const metadata: Metadata = {
  title: "Date Picker",
  description:
    "An opinionated, responsive Shamsi/Gregorian date and date-time picker with SSR-safe defaults and accessible confirmation flows.",
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
      { id: "close-on-select", title: "Close on Select" },
      { id: "controlled", title: "Controlled" },
      { id: "constrained", title: "Constrained Dates" },
      { id: "confirmation", title: "Confirmation Modes" },
      { id: "custom-trigger", title: "Custom Trigger" },
      { id: "presets-responsive", title: "Responsive Presets" },
      { id: "with-time", title: "With Time" },
      { id: "responsive", title: "Fully Responsive" },
      { id: "time-advanced", title: "Advanced Time" },
      { id: "input", title: "Typed Input" },
      { id: "date-of-birth", title: "Date of Birth" },
      { id: "calendar-type", title: "Calendar Type" },
      { id: "miladi", title: "Miladi + LTR" },
      { id: "reservation", title: "Reservation" },
      { id: "zod-form", title: "Zod-Validated Form" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { DatePicker } from "@/components/ui/date-picker"

export function Example() {
  return <DatePicker defaultValue="today" />
}`

export const datePickerMarkdown = [
  "# Date Picker",
  "",
  "An opinionated, responsive Shamsi/Gregorian date and date-time picker.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/date-picker.json",
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
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            DatePicker
          </code>{" "}
          for the common path and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            DateTimePicker
          </code>{" "}
          when date and time belong to one field. Both choose a Popover on
          desktop and a Drawer on mobile, while Calendar and TimePicker remain
          available as lower-level primitives.
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
            "Added first-class DatePicker and DateTimePicker APIs with responsive presentation, SSR-safe today defaults, and draft/confirm behavior",
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
          Install the complete picker family with one registry command. Its
          Calendar, TimePicker, Popover, and Drawer dependencies are installed
          automatically.
        </p>

        <Tabs defaultValue="cli" className="mt-4">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/date-picker.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="react-day-picker @daypicker/persian date-fns @base-ui/react" />
              </div>
              <Step>Copy the Date Picker component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("date-picker")}
                  lang="tsx"
                  title="components/ui/date-picker.tsx"
                />
              </div>
              <Step>Install the component dependencies listed above</Step>
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
              Keep a controlled{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                DateRange
              </code>{" "}
              and pass{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                onSelect={"{setRange}"}
              </code>{" "}
              directly. The same single-calendar interaction appears in a
              Popover on desktop and a Drawer on mobile.
            </>
          }
        >
          <DatePickerRangeExample />
        </ExampleSection>

        <ExampleSection
          id="close-on-select"
          title="Close on Select"
          description="Control the Popover state and close it after a valid date is selected."
        >
          <DatePickerCloseOnSelectExample />
        </ExampleSection>

        <ExampleSection
          id="controlled"
          title="Controlled Value"
          description="Own the selected date in application state when other fields, validation, or server mutations need to react to every committed change."
        >
          <DatePickerControlledExample />
        </ExampleSection>

        <ExampleSection
          id="constrained"
          title="Constrained Dates"
          description="Forward Calendar props to limit selection to a rolling seven-day booking window. The same pattern supports disabled weekdays, minimum dates, and maximum dates."
        >
          <DatePickerConstrainedExample />
        </ExampleSection>

        <ExampleSection
          id="confirmation"
          title="Confirmation Modes"
          description="Compare immediate commits with an explicit confirmation flow. Explicit mode is useful when changing the value has expensive side effects."
        >
          <DatePickerConfirmationExample />
        </ExampleSection>

        <ExampleSection
          id="custom-trigger"
          title="Custom Trigger"
          description="Use renderTrigger to replace the default field while retaining disclosure state, formatting, keyboard behavior, and responsive presentation."
        >
          <DatePickerCustomTriggerExample />
        </ExampleSection>

        <ExampleSection
          id="presets-responsive"
          title="Responsive Presets"
          description="Combine controlled state, a responsive Popover/Drawer, and Calendar footer content to provide common dates without giving up free calendar selection."
        >
          <DatePickerPresetsResponsiveExample />
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
          id="time-advanced"
          title="Advanced Time Options"
          description="Combine a verbose date label with a 12-hour time wheel, Latin digits, seconds, and visible hour/minute/second headings."
        >
          <DatePickerTimeAdvancedExample />
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
          id="miladi"
          title="Miladi + LTR"
          description="Use the Gregorian calendar with English labels, LTR direction, and a long-form trigger format while retaining the same responsive behavior."
        >
          <DatePickerMiladiExample />
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
          The product-level APIs cover common date and date-time fields. Use{" "}
          <a
            href="/docs/components/calendar"
            className="text-foreground underline underline-offset-4"
          >
            Calendar
          </a>{" "}
          for lower-level day-grid customization.
        </p>
        <ApiReference title="DatePicker" rows={datePickerApi} />
        <ApiReference title="DateTimePicker" rows={dateTimePickerApi} />

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
