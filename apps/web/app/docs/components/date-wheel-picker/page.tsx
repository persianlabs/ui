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
import { DateWheelPickerCalendarTypeExample } from "@/components/examples/date-wheel-picker-calendar-type"
import { DateWheelPickerDemoExample } from "@/components/examples/date-wheel-picker-demo"
import { DateWheelPickerLoopExample } from "@/components/examples/date-wheel-picker-loop"
import { DateWheelPickerRangeExample } from "@/components/examples/date-wheel-picker-range"
import { DateWheelPickerResponsiveExample } from "@/components/examples/date-wheel-picker-responsive"
import { DateWheelPickerResponsiveDialogExample } from "@/components/examples/date-wheel-picker-responsive-dialog"
import { DateWheelPickerResponsiveMenuExample } from "@/components/examples/date-wheel-picker-responsive-menu"
import { DateWheelPickerRtlExample } from "@/components/examples/date-wheel-picker-rtl"
import { DateWheelPickerStepExample } from "@/components/examples/date-wheel-picker-step"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/date-wheel-picker/page.tsx"

import {
  dateWheelPickerApi,
  responsiveDateWheelPickerApi,
  responsiveDateWheelPickerContentApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Date Wheel Picker",
  description:
    "An iOS-style year/month/day wheel-based date picker, switchable between the Shamsi and Gregorian calendars, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
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
      { id: "step", title: "Step" },
      { id: "loop", title: "Loop" },
      { id: "calendar-type", title: "Calendar Type" },
      { id: "responsive", title: "Responsive" },
      { id: "responsive-dialog", title: "In a Responsive Dialog" },
      { id: "responsive-menu", title: "In a Responsive Menu" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { DateWheelPicker } from "@/components/ui/date-wheel-picker"

export function Example() {
  return <DateWheelPicker defaultValue={new Date(2024, 2, 20)} />
}`

const responsiveUsageSnippet = `import {
  ResponsiveDateWheelPicker,
  ResponsiveDateWheelPickerContent,
  ResponsiveDateWheelPickerTrigger,
} from "@/components/ui/date-wheel-picker"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <ResponsiveDateWheelPicker>
      {/* Base UI's render prop only picks up children placed on the render
          target itself, not children passed to the wrapping trigger -- put
          the icon/text inside the Button, not on the trigger. */}
      <ResponsiveDateWheelPickerTrigger render={<Button variant="outline">1403/01/01</Button>} />
      <ResponsiveDateWheelPickerContent defaultValue={new Date(2024, 2, 20)} />
    </ResponsiveDateWheelPicker>
  )
}`

export const dateWheelPickerMarkdown = [
  "# Date Wheel Picker",
  "",
  "An iOS-style year/month/day wheel-based date picker, switchable between the Shamsi and Gregorian calendars, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/date-wheel-picker.json",
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
  "### DateWheelPicker",
  "",
  apiRowsToMarkdownTable(dateWheelPickerApi),
  "",
  "### ResponsiveDateWheelPicker",
  "",
  apiRowsToMarkdownTable(responsiveDateWheelPickerApi),
  "",
  "### ResponsiveDateWheelPickerContent",
  "",
  apiRowsToMarkdownTable(responsiveDateWheelPickerContentApi),
].join("\n")

export default function DateWheelPickerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Date Wheel Picker
          </h1>
          <CopyMarkdownButton markdown={dateWheelPickerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A year/month/day wheel-based date picker, composed on top of Wheel
          Picker and persian-date, with a Popover-on-desktop and
          Drawer-on-mobile trigger for use inside a form field. Wheels
          don&apos;t loop by default — scrolling past December stays on December
          instead of wrapping back to January — but this is configurable via{" "}
          <code>loop</code>.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Not a shadcn/ui component — this is an original composition of this registry's own Wheel Picker, Popover, and Drawer, mirroring Time Picker's Popover-on-desktop/Drawer-on-mobile pattern for a calendar date instead of a time-of-day",
            "Year/month/day options and month lengths (including Esfand's leap-year 29/30 day swing) come from this registry's persian-date utilities (toParts/fromParts/daysInMonth) rather than any hand-rolled calendar math",
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
            preview={<DateWheelPickerDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("date-wheel-picker-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/date-wheel-picker.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@ncdai/react-wheel-picker @base-ui/react" />
              </div>
              <Step>
                Copy the Wheel Picker, Popover, Drawer, and Persian Date first
              </Step>
              <p className="mt-2 text-sm text-muted-foreground">
                Date Wheel Picker composes{" "}
                <a
                  href="/docs/components/wheel-picker"
                  className="text-foreground underline underline-offset-4"
                >
                  Wheel Picker
                </a>
                ,{" "}
                <a
                  href="/docs/components/popover"
                  className="text-foreground underline underline-offset-4"
                >
                  Popover
                </a>
                ,{" "}
                <a
                  href="/docs/components/drawer"
                  className="text-foreground underline underline-offset-4"
                >
                  Drawer
                </a>
                , and{" "}
                <a
                  href="/docs/utilities/persian-date"
                  className="text-foreground underline underline-offset-4"
                >
                  Persian Date
                </a>
                . Install all four first, from their own pages.
              </p>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("date-wheel-picker")}
                  lang="tsx"
                  title="components/ui/date-wheel-picker.tsx"
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
          description="Two Date Wheel Pickers for a membership period, with the start date capped so it can't land after the expiry date."
        >
          <DateWheelPickerRangeExample />
        </ExampleSection>
        <ExampleSection
          id="step"
          title="Step"
          description="Set yearStep to a value greater than 1 for a coarse, decade-jump year wheel — useful for a rough birth-decade picker."
        >
          <DateWheelPickerStepExample />
        </ExampleSection>
        <ExampleSection
          id="loop"
          title="Loop"
          description="Wheels don't loop by default. Set loop to enable it if wrapping (e.g. scrolling past December back to January) fits your use case."
        >
          <DateWheelPickerLoopExample />
        </ExampleSection>
        <ExampleSection
          id="calendar-type"
          title="Calendar Type"
          description='Set calendarType to "shamsi" or "miladi" to switch the year/month/day wheels between calendars, with month names and day counts (including Esfand&apos;s leap-year swing) updating live.'
        >
          <DateWheelPickerCalendarTypeExample />
        </ExampleSection>
        <div className="mt-8">
          <h3
            id="responsive"
            className="text-sm font-medium text-muted-foreground"
          >
            Responsive
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            ResponsiveDateWheelPicker renders a Popover on desktop and a Drawer
            on mobile from one shared API. Resize the viewport (or use your
            browser devtools&apos; device toolbar) below md to see the trigger
            switch from opening a popover to opening a bottom drawer.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<DateWheelPickerResponsiveExample />}
              code={<CodeBlock code={responsiveUsageSnippet} lang="tsx" />}
            />
          </div>
        </div>
        <ExampleSection
          id="responsive-dialog"
          title="In a Responsive Dialog"
          description="Date Wheel Picker embedded inside a Responsive Dialog panel for a date-of-birth flow — a Dialog on desktop, a bottom Drawer on mobile."
        >
          <DateWheelPickerResponsiveDialogExample />
        </ExampleSection>
        <ExampleSection
          id="responsive-menu"
          title="In a Responsive Menu"
          description="Date Wheel Picker embedded inside a Responsive Menu's content for a quick date filter — a Dropdown Menu on desktop, a bottom Drawer menu on mobile."
        >
          <DateWheelPickerResponsiveMenuExample />
        </ExampleSection>
        <ExampleSection
          id="rtl"
          title="RTL"
          description="Persian month names and digits work naturally in RTL layouts."
          dir="rtl"
        >
          <DateWheelPickerRtlExample />
        </ExampleSection>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="DateWheelPicker" rows={dateWheelPickerApi} />
        <ApiReference
          title="ResponsiveDateWheelPicker"
          rows={responsiveDateWheelPickerApi}
        />
        <ApiReference
          title="ResponsiveDateWheelPickerContent"
          rows={responsiveDateWheelPickerContentApi}
        />

        <DocsPageFooter
          href="/docs/components/date-wheel-picker"
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
  description: string
  children: React.ReactNode
  dir?: "rtl"
}) {
  const sourceName = `date-wheel-picker-${id}`

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
