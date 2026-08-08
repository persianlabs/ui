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
import { RadioGroupDemoExample } from "@/components/examples/radio-group-demo"
import { RadioGroupDisabledExample } from "@/components/examples/radio-group-disabled"
import { RadioGroupRtlExample } from "@/components/examples/radio-group-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/radio-group/page.tsx"

import { radioGroupItemApi, radioGroupRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Radio Group",
  description: "A set of mutually exclusive radio buttons, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "disabled", title: "Disabled" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function Example() {
  return (
    <RadioGroup defaultValue="comfortable">
      <RadioGroupItem value="default" />
      <RadioGroupItem value="comfortable" />
      <RadioGroupItem value="compact" />
    </RadioGroup>
  )
}`

export const radioGroupMarkdown = [
  "# Radio Group",
  "",
  "A set of mutually exclusive radio buttons, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/radio-group.json",
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
  "### RadioGroup",
  "",
  apiRowsToMarkdownTable(radioGroupRootApi),
  "",
  "### RadioGroupItem",
  "",
  apiRowsToMarkdownTable(radioGroupItemApi),
].join("\n")

export default function RadioGroupDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Radio Group
          </h1>
          <CopyMarkdownButton markdown={radioGroupMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A set of mutually exclusive radio buttons. Built on Base UI&apos;s
          radio primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={false}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<RadioGroupDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("radio-group-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/radio-group.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("radio-group")}
                  lang="tsx"
                  title="components/ui/radio-group.tsx"
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
          id="disabled"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Disabled
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<RadioGroupDisabledExample />}
            code={
              <CodeBlock
                code={getExampleSource("radio-group-disabled")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<RadioGroupRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("radio-group-rtl")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="RadioGroup" rows={radioGroupRootApi} />
        <ApiReference title="RadioGroupItem" rows={radioGroupItemApi} />

        <DocsPageFooter
          href="/docs/components/radio-group"
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
