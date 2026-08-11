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
import { CalendarBookedExample } from "@/components/examples/calendar-booked"
import { CalendarCalendarTypeExample } from "@/components/examples/calendar-calendar-type"
import { CalendarDemoExample } from "@/components/examples/calendar-demo"
import { CalendarDropdownExample } from "@/components/examples/calendar-dropdown"
import { CalendarHolidaysExample } from "@/components/examples/calendar-holidays"
import { CalendarPresetsExample } from "@/components/examples/calendar-presets"
import { CalendarRangeExample } from "@/components/examples/calendar-range"
import { CalendarRtlExample } from "@/components/examples/calendar-rtl"
import { CalendarWeekNumbersExample } from "@/components/examples/calendar-week-numbers"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/calendar/page.tsx"

import { calendarApi } from "./api-data"

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "A date-grid calendar built on react-day-picker, switchable between the Jalali (Shamsi) and Gregorian (Miladi) calendars via a calendarType prop.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "calendar-type", title: "Calendar Type" },
      { id: "range", title: "Range Calendar" },
      { id: "dropdown", title: "Month and Year Selector" },
      { id: "presets", title: "Presets" },
      { id: "booked", title: "Booked Dates" },
      { id: "week-numbers", title: "Week Numbers" },
      { id: "holidays", title: "Holidays" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "date-picker", title: "Date Picker" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Calendar } from "@/components/ui/calendar"

export function Example() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  )
}`

export const calendarMarkdown = [
  "# Calendar",
  "",
  "A date-grid calendar built on react-day-picker, switchable between the Jalali (Shamsi) and Gregorian (Miladi) calendars via a calendarType prop.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/calendar.json",
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
  apiRowsToMarkdownTable(calendarApi),
].join("\n")

export default function CalendarDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Calendar
          </h1>
          <CopyMarkdownButton markdown={calendarMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A date-grid calendar built on{" "}
          <a
            href="https://daypicker.dev"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            react-day-picker
          </a>
          , with a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            calendarType
          </code>{" "}
          prop that switches between the Jalali (Shamsi) and Gregorian (Miladi)
          calendars.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            { label: "daypicker.dev", href: "https://daypicker.dev" },
          ]}
          changed
          changes={[
            'Adds a calendarType prop ("shamsi" | "miladi") that switches between @daypicker/persian (faIR locale, RTL, Persian numerals) and react-day-picker (enUS locale, LTR, Latin numerals), defaulting to "shamsi"',
            "Replaces pr-/pl- and rounded-l-/rounded-r- with pe-/ps- and rounded-e-/rounded-s- (logical properties) throughout",
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
            preview={<CalendarDemoExample />}
            code={
              <CodeBlock code={getExampleSource("calendar-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/calendar.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="react-day-picker @daypicker/persian date-fns" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("calendar")}
                  lang="tsx"
                  title="components/ui/calendar.tsx"
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
          id="calendar-type"
          title="Calendar Type"
          description="Set calendarType to switch between the Jalali (Shamsi, the default) and Gregorian (Miladi) calendars. Shamsi renders via @daypicker/persian with the faIR locale, RTL direction, and Persian numerals; Miladi renders via react-day-picker with the enUS locale, LTR direction, and Latin numerals."
        >
          <CalendarCalendarTypeExample />
        </ExampleSection>

        <ExampleSection
          id="range"
          title="Range Calendar"
          description={
            <>
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                mode=&quot;range&quot;
              </code>{" "}
              with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                numberOfMonths={"{2}"}
              </code>
              .
            </>
          }
        >
          <CalendarRangeExample />
        </ExampleSection>

        <ExampleSection
          id="dropdown"
          title="Month and Year Selector"
          description={
            <>
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                captionLayout=&quot;dropdown&quot;
              </code>
              .
            </>
          }
        >
          <CalendarDropdownExample />
        </ExampleSection>

        <ExampleSection
          id="presets"
          title="Presets"
          description="A calendar with quick-preset buttons, updating both the selected date and the displayed month."
        >
          <CalendarPresetsExample />
        </ExampleSection>

        <ExampleSection
          id="booked"
          title="Booked Dates"
          description={
            <>
              Combine{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                disabled
              </code>{" "}
              with a{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                booked
              </code>{" "}
              modifier to strike through unavailable dates.
            </>
          }
        >
          <CalendarBookedExample />
        </ExampleSection>

        <ExampleSection
          id="week-numbers"
          title="Week Numbers"
          description={
            <>
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                showWeekNumber
              </code>{" "}
              to display the ISO week number.
            </>
          }
        >
          <CalendarWeekNumbersExample />
        </ExampleSection>

        <ExampleSection
          id="holidays"
          title="Holidays"
          description={
            <>
              Pass{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                showHolidays
              </code>{" "}
              to highlight Iranian holidays (red text) for the visible month,
              using{" "}
              <a
                href="/docs/utilities/persian-holidays"
                className="text-foreground underline underline-offset-4"
              >
                persian-holidays
              </a>{" "}
              internally. Hover a holiday to see its title and whether it&apos;s
              an official day off or just a commemorative occasion.
            </>
          }
        >
          <CalendarHolidaysExample />
        </ExampleSection>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The Shamsi calendar (the default) is already RTL, with the faIR
            locale and Persian numerals. Override{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              locale
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              dir
            </code>{" "}
            directly if you need a different locale in an RTL layout.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<CalendarRtlExample />}
              code={
                <CodeBlock code={getExampleSource("calendar-rtl")} lang="tsx" />
              }
            />
          </div>
        </div>

        <h2
          id="date-picker"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Date Picker
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Calendar is the day-grid building block. A Date Picker page, composing
          it with Popover for a compact single-field input (presets, range
          picker, reservation form), is coming soon.
        </p>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Calendar" rows={calendarApi} />
        <p className="mt-3 leading-relaxed text-muted-foreground">
          For the complete underlying prop reference (matchers, formatters,
          labels), see the{" "}
          <a
            href="https://daypicker.dev/docs/props"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            react-day-picker documentation
          </a>
          .
        </p>

        <DocsPageFooter
          href="/docs/components/calendar"
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
  const sourceName = `calendar-${id}`

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
