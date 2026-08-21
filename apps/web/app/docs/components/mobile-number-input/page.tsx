import type { Metadata } from "next"
import type * as React from "react"
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
import { MobileNumberInputDemoExample } from "@/components/examples/mobile-number-input-demo"
import { MobileNumberInputRtlExample } from "@/components/examples/mobile-number-input-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { mobileNumberInputApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/mobile-number-input/page.tsx"

export const metadata: Metadata = {
  title: "Mobile Number Input",
  description:
    "An Iranian mobile number input that normalizes mixed paste formats and Persian digits, with a redundant validity indicator.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "rtl", title: "RTL" }],
  },
  { id: "api-reference", title: "API Reference" },
]

const usage = `import { MobileNumberInput } from "@/components/ui/mobile-number-input"

export function Example() {
  return <MobileNumberInput />
}`

export const mobileNumberInputMarkdown = [
  "# Mobile Number Input",
  "",
  "An Iranian mobile number input that normalizes mixed paste formats and Persian digits, with a redundant validity indicator.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/mobile-number-input",
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  usage,
  CODE_FENCE,
  "",
  "## API Reference",
  "",
  apiRowsToMarkdownTable(mobileNumberInputApi),
].join("\n")

export default function MobileNumberInputDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Mobile Number Input
          </h1>
          <CopyMarkdownButton markdown={mobileNumberInputMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A plain Iranian mobile number field — no carrier logo, no carrier
          detection. It normalizes +989121234567, 989121234567, 09121234567,
          9121234567, and Persian/Arabic-Indic digits to the standard
          09xxxxxxxxx form as you type or paste, using{" "}
          <a
            href="/docs/utilities/normalize-persian-digits"
            className="text-foreground underline underline-offset-4"
          >
            Normalize Persian Digits
          </a>
          , and shows a shape-based (not color-only) checkmark or alert icon
          once the value looks complete.
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
            preview={<MobileNumberInputDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("mobile-number-input-demo")}
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
          Install the input, its normalization/validation utility, and the
          input-group primitives in one step.
        </p>

        <Tabs defaultValue="cli" className="mt-4">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <CopyCommand command="npx shadcn@latest add @persianlabsui/mobile-number-input" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the component dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="lucide-react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("mobile-number-input")}
                  lang="tsx"
                  title="components/ui/mobile-number-input.tsx"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>
        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="mt-4">
          <CodeBlock code={usage} lang="tsx" />
        </div>
        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>
        <Example
          id="rtl"
          title="RTL"
          description="Labels and helper text follow the surrounding RTL interface while the phone value remains intentionally LTR. Persian digits and +98/98/0098 prefixes are normalized as you type or paste."
          dir="rtl"
          code={getExampleSource("mobile-number-input-rtl")}
        >
          <MobileNumberInputRtlExample />
        </Example>
        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="MobileNumberInput" rows={mobileNumberInputApi} />
        <DocsPageFooter
          href="/docs/components/mobile-number-input"
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

function Example({
  id,
  title,
  description,
  children,
  dir,
  code,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
  dir?: "ltr" | "rtl"
  code: string
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
          preview={children}
          dir={dir}
          code={<CodeBlock code={code} lang="tsx" />}
        />
      </div>
    </div>
  )
}
