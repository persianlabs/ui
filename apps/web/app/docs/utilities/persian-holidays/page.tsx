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
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { PersianHolidaysApproximateExample } from "@/components/examples/persian-holidays-approximate"
import { PersianHolidaysCalendarExample } from "@/components/examples/persian-holidays-calendar"
import { PersianHolidaysDemoExample } from "@/components/examples/persian-holidays-demo"
import { PersianHolidaysLookupExample } from "@/components/examples/persian-holidays-lookup"
import { PersianHolidaysRtlExample } from "@/components/examples/persian-holidays-rtl"
import { PersianHolidaysUnofficialExample } from "@/components/examples/persian-holidays-unofficial"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getLibSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  getHolidaysOptionsApi,
  holidaysApi,
  lowLevelHijriApi,
  resolvedHolidayApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/persian-holidays/page.tsx"

export const metadata: Metadata = {
  title: "Persian Holidays",
  description:
    "Official/religious/cultural Iranian holiday lookup for a date, range, or year, resolving Jalali, Gregorian, and tabular-Hijri entries.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "lookup", title: "Lookup a date" },
      { id: "unofficial", title: "Official vs. unofficial" },
      { id: "calendar", title: "Calendar grid" },
      { id: "approximate", title: "Hijri approximation" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { getHolidays, isHoliday } from "@/lib/persian-holidays"
import { today } from "@/lib/persian-date"

const holidays1404 = getHolidays(1404) // Jalali year 1404
const isTodayOff = isHoliday(today())`

export const persianHolidaysMarkdown = [
  "# Persian Holidays",
  "",
  "Official/religious/cultural Iranian holiday lookup for a date, range, or year, resolving Jalali, Gregorian, and tabular-Hijri entries. Hijri (lunar) entries are marked `approximate: true` -- Iran announces religious holidays by moon sighting, so real dates can shift by up to a day from the tabular approximation used here.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/persian-holidays",
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
  apiRowsToMarkdownTable(holidaysApi),
  "",
  "### GetHolidaysOptions",
  "",
  apiRowsToMarkdownTable(getHolidaysOptionsApi),
  "",
  "### ResolvedHoliday",
  "",
  apiRowsToMarkdownTable(resolvedHolidayApi),
  "",
  "### Low-level Hijri helpers",
  "",
  apiRowsToMarkdownTable(lowLevelHijriApi),
].join("\n")

export default function PersianHolidaysDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Persian Holidays
          </h1>
          <CopyMarkdownButton markdown={persianHolidaysMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Look up official, religious, and cultural Iranian holidays for a
          single date, a range, or a whole calendar year. Jalali and Gregorian
          entries resolve to an exact date; Hijri (lunar) entries are resolved
          with a tabular approximation and flagged{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            approximate: true
          </code>
          , since Iran announces religious holidays by moon sighting.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "BaseMax/persian-holidays-api",
              href: "https://github.com/BaseMax/persian-holidays-api",
            },
          ]}
          changed
          changes={[
            "Trimmed the dataset to recurring month/day entries (dropped year-specific fields).",
            "Converted month names to numeric, 1-indexed month indices.",
            "Added a tabular Hijri→Gregorian resolution with approximate flagging for lunar entries.",
            "Added official/includeUnofficial filtering so callers can request only official days off.",
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
            preview={<PersianHolidaysDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("persian-holidays-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/persian-holidays" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getLibSource("persian-holidays")}
                  lang="ts"
                  title="lib/persian-holidays.ts"
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
          id="lookup"
          title="Lookup a date"
          description="isHoliday and getHolidayInfo check whether a specific date is a holiday, and list every matching entry."
          preview={<PersianHolidaysLookupExample />}
          source="persian-holidays-lookup"
        />
        <ExampleSection
          id="unofficial"
          title="Official vs. unofficial"
          description="By default only official days off are returned. Pass includeUnofficial: true to also list commemorative occasions."
          preview={<PersianHolidaysUnofficialExample />}
          source="persian-holidays-unofficial"
        />
        <ExampleSection
          id="calendar"
          title="Calendar grid"
          description="getHolidaysInRange over a month's boundaries makes it easy to color holiday cells in a calendar grid."
          preview={<PersianHolidaysCalendarExample />}
          source="persian-holidays-calendar"
        />
        <ExampleSection
          id="approximate"
          title="Hijri approximation"
          description="Lunar (hijri) holidays resolve through a tabular approximation and come back with approximate: true — treat these dates as a best-effort estimate, not an announcement."
          preview={<PersianHolidaysApproximateExample />}
          source="persian-holidays-approximate"
        />
        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Holiday titles are Persian text end-to-end, so this reads naturally
            inside right-to-left layouts without any extra direction handling.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<PersianHolidaysRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("persian-holidays-rtl")}
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
        <ApiReference title="persian-holidays" rows={holidaysApi} />
        <ApiReference title="GetHolidaysOptions" rows={getHolidaysOptionsApi} />
        <ApiReference title="ResolvedHoliday" rows={resolvedHolidayApi} />
        <ApiReference title="Low-level Hijri helpers" rows={lowLevelHijriApi} />
        <DocsPageFooter
          href="/docs/utilities/persian-holidays"
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
