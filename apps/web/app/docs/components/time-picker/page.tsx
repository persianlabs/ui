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
import { TimePicker12HourExample } from "@/components/examples/time-picker-12-hour"
import { TimePickerDemoExample } from "@/components/examples/time-picker-demo"
import { TimePickerPopoverExample } from "@/components/examples/time-picker-popover"
import { TimePickerRangeExample } from "@/components/examples/time-picker-range"
import { TimePickerResponsiveExample } from "@/components/examples/time-picker-responsive"
import { TimePickerRtlExample } from "@/components/examples/time-picker-rtl"
import { TimePickerSecondsExample } from "@/components/examples/time-picker-seconds"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/time-picker/page.tsx"

import {
  responsiveTimePickerApi,
  responsiveTimePickerContentApi,
  timePickerApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Time Picker",
  description:
    "An hour/minute/second wheel-based time picker, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "seconds", title: "Seconds" },
      { id: "12-hour", title: "12-Hour Format" },
      { id: "popover", title: "Popover" },
      { id: "responsive", title: "Responsive" },
      { id: "range", title: "Range" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { TimePicker } from "@/components/ui/time-picker"

export function Example() {
  return <TimePicker defaultValue={{ hour: 9, minute: 30 }} />
}`

const responsiveUsageSnippet = `import {
  ResponsiveTimePicker,
  ResponsiveTimePickerContent,
  ResponsiveTimePickerTrigger,
} from "@/components/ui/time-picker"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <ResponsiveTimePicker>
      {/* Base UI's render prop only picks up children placed on the render
          target itself, not children passed to the wrapping trigger -- put
          the icon/text inside the Button, not on the trigger. */}
      <ResponsiveTimePickerTrigger render={<Button variant="outline">09:30</Button>} />
      <ResponsiveTimePickerContent defaultValue={{ hour: 9, minute: 30 }} />
    </ResponsiveTimePicker>
  )
}`

export const timePickerMarkdown = [
  "# Time Picker",
  "",
  "An hour/minute/second wheel-based time picker, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/time-picker",
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
  "### TimePicker",
  "",
  apiRowsToMarkdownTable(timePickerApi),
  "",
  "### ResponsiveTimePicker",
  "",
  apiRowsToMarkdownTable(responsiveTimePickerApi),
  "",
  "### ResponsiveTimePickerContent",
  "",
  apiRowsToMarkdownTable(responsiveTimePickerContentApi),
].join("\n")

export default function TimePickerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Time Picker
          </h1>
          <CopyMarkdownButton markdown={timePickerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          An hour/minute/second wheel-based clock, composed on top of Wheel
          Picker, with a Popover-on-desktop and Drawer-on-mobile trigger for use
          inside a form field. To pick a date and time together, see{" "}
          <a
            href="/docs/components/date-picker#with-time"
            className="text-foreground underline underline-offset-4"
          >
            Date Picker&apos;s With Time example
          </a>
          .
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Not a shadcn/ui component — shadcn's own Time Picker guide uses a native <input type=\"time\"> in a popover; this is an original composition of this registry's own Wheel Picker, Popover, and Drawer instead, following the same Popover-on-desktop/Drawer-on-mobile pattern as Responsive Dialog and Responsive Menu",
            "Time-of-day is represented as a plain { hour, minute, second? } object rather than a Date, so it never needs a calendar date and stays free of SSR/hydration timing issues",
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
            preview={<TimePickerDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("time-picker-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/time-picker" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@ncdai/react-wheel-picker @base-ui/react" />
              </div>
              <Step>Copy the Wheel Picker, Popover, and Drawer first</Step>
              <p className="mt-2 text-sm text-muted-foreground">
                Time Picker composes{" "}
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
                , and{" "}
                <a
                  href="/docs/components/drawer"
                  className="text-foreground underline underline-offset-4"
                >
                  Drawer
                </a>
                . Install all three first, from their own pages.
              </p>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("time-picker")}
                  lang="tsx"
                  title="components/ui/time-picker.tsx"
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
          id="seconds"
          title="Seconds"
          description="Set showSeconds to add a third wheel column."
        >
          <TimePickerSecondsExample />
        </ExampleSection>
        <ExampleSection
          id="12-hour"
          title="12-Hour Format"
          description='Set hourFormat="12" to format the hour wheel 1-12 and add an AM/PM wheel.'
        >
          <TimePicker12HourExample />
        </ExampleSection>
        <ExampleSection
          id="popover"
          title="Popover"
          description='A wheel-based alternative to shadcn&apos;s native <input type="time"> popover pattern.'
        >
          <TimePickerPopoverExample />
        </ExampleSection>
        <div className="mt-8">
          <h3
            id="responsive"
            className="text-sm font-medium text-muted-foreground"
          >
            Responsive
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            ResponsiveTimePicker renders a Popover on desktop and a Drawer on
            mobile from one shared API. Resize the viewport (or use your browser
            devtools&apos; device toolbar) below md to see the trigger switch
            from opening a popover to opening a bottom drawer.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<TimePickerResponsiveExample />}
              code={<CodeBlock code={responsiveUsageSnippet} lang="tsx" />}
            />
          </div>
        </div>
        <ExampleSection
          id="range"
          title="Range"
          description="Two Time Pickers for a business-hours style range, with the from-time capped so it can't exceed the to-time."
        >
          <TimePickerRangeExample />
        </ExampleSection>
        <ExampleSection
          id="rtl"
          title="RTL"
          description="Persian labels and AM/PM abbreviations (ق.ظ / ب.ظ) work naturally in RTL layouts."
          dir="rtl"
        >
          <TimePickerRtlExample />
        </ExampleSection>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="TimePicker" rows={timePickerApi} />
        <ApiReference
          title="ResponsiveTimePicker"
          rows={responsiveTimePickerApi}
        />
        <ApiReference
          title="ResponsiveTimePickerContent"
          rows={responsiveTimePickerContentApi}
        />

        <DocsPageFooter
          href="/docs/components/time-picker"
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
  const sourceName = `time-picker-${id}`

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
