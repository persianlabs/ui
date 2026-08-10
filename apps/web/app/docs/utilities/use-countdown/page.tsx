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
import { UseCountdownDemoExample } from "@/components/examples/use-countdown-demo"
import { UseCountdownOverdueExample } from "@/components/examples/use-countdown-overdue"
import { UseCountdownPartsExample } from "@/components/examples/use-countdown-parts"
import { UseCountdownResetExample } from "@/components/examples/use-countdown-reset"
import { UseCountdownRtlExample } from "@/components/examples/use-countdown-rtl"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getHookSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { countdownResultApi, useCountdownApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/use-countdown/page.tsx"

export const metadata: Metadata = {
  title: "useCountdown",
  description:
    "A timer-aligned React countdown hook for ISO-8601 target dates, with formatted output and overdue state.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "parts", title: "Time units" },
      { id: "reset", title: "Reset or pause" },
      { id: "overdue", title: "Overdue targets" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { useCountdown } from "@/hooks/use-countdown"

function SaleCountdown({ endsAt }: { endsAt: string }) {
  const countdown = useCountdown(endsAt)

  if (!countdown) return null

  return (
    <p>
      {countdown.isOverdue
        ? "This offer has ended"
        : "Offer ends in " + countdown.formatted}
    </p>
  )
}`

const targetSnippet = `const endsAt = "2026-12-31T23:59:59.000Z"
const countdown = useCountdown(isTimerActive ? endsAt : null)`

export const useCountdownMarkdown = [
  "# useCountdown",
  "",
  "A timer-aligned countdown hook for ISO-8601 target dates. It exposes individual time units, a display-ready HH:MM:SS string, and signed state for overdue targets.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/use-countdown.json",
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
  "### useCountdown(targetIso)",
  "",
  apiRowsToMarkdownTable(useCountdownApi),
  "",
  "### CountdownResult",
  "",
  apiRowsToMarkdownTable(countdownResultApi),
].join("\n")

export default function UseCountdownDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            useCountdown
          </h1>
          <CopyMarkdownButton markdown={useCountdownMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A countdown hook for deadlines, launches, reservations, and temporary
          offers. It updates on the next clock-second boundary, returns a
          display-ready value, and continues tracking elapsed time after a
          deadline passes.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "initial implementation supplied by a project contributor",
              href: "https://github.com/persianlabs/ui",
            },
          ]}
          changed
          changes={[
            "Replaced a drifting interval with second-boundary-aligned timeouts.",
            "Added invalid-date handling so null and malformed targets safely return null.",
            "Changed rounded remaining time to ceiling semantics so a future target does not show zero early.",
            "Added documented result types and examples for formatted, segmented, paused, overdue, and RTL countdowns.",
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
            preview={<UseCountdownDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("use-countdown-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/use-countdown.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-countdown")}
                  lang="ts"
                  title="hooks/use-countdown.ts"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pass an ISO-8601 target date. The returned value is initially{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            null
          </code>{" "}
          until the hook runs in the browser, which keeps server rendering
          stable.
        </p>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Use a UTC ISO string from your API or database. Passing{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            null
          </code>{" "}
          or an invalid date disables the timer.
        </p>
        <div className="mt-4">
          <CodeBlock code={targetSnippet} lang="tsx" />
        </div>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>
        <ExampleSection
          id="parts"
          title="Time units"
          description="Use the individual units when each part needs its own visual treatment. Hours can exceed 24."
          preview={<UseCountdownPartsExample />}
          source="use-countdown-parts"
        />
        <ExampleSection
          id="reset"
          title="Reset or pause"
          description="Changing the target starts a fresh countdown; passing null clears it without leaving a timer running."
          preview={<UseCountdownResetExample />}
          source="use-countdown-reset"
        />
        <ExampleSection
          id="overdue"
          title="Overdue targets"
          description="After the target passes, formatted remains absolute while totalSeconds is negative and isOverdue becomes true."
          preview={<UseCountdownOverdueExample />}
          source="use-countdown-overdue"
        />
        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Keep the time output LTR so separators and digits remain easy to
            scan inside Persian content.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<UseCountdownRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-countdown-rtl")}
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
        <ApiReference title="useCountdown(targetIso)" rows={useCountdownApi} />
        <ApiReference title="CountdownResult" rows={countdownResultApi} />
        <DocsPageFooter
          href="/docs/utilities/use-countdown"
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
