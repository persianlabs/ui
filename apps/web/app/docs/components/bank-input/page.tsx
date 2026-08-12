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
import { BankInputDemoExample } from "@/components/examples/bank-input-demo"
import { BankInputRtlExample } from "@/components/examples/bank-input-rtl"
import { BankInputSeparatorExample } from "@/components/examples/bank-input-separator"
import { BankInputShabaExample } from "@/components/examples/bank-input-shaba"
import { BankInputSupportedBanksExample } from "@/components/examples/bank-input-supported-banks"
import { BankInputZodExample } from "@/components/examples/bank-input-zod"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { cardNumberInputApi, shabaInputApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/bank-input/page.tsx"

export const metadata: Metadata = {
  title: "Bank Input",
  description:
    "Iranian card-number and Shaba inputs with formatting, checksum validation, and bank detection.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "shaba", title: "Shaba" },
      { id: "zod", title: "Zod Validation" },
      { id: "separator", title: "Separator" },
      { id: "supported-banks", title: "Supported Banks" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usage = `import { CardNumberInput } from "@/components/ui/bank-input"

export function Example() {
  return <CardNumberInput />
}`

export const bankInputMarkdown = [
  "# Bank Input",
  "",
  "Iranian card-number and Shaba inputs with LTR formatting, checksum validation, and bank detection.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/bank-input.json",
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
  "### CardNumberInput",
  "",
  apiRowsToMarkdownTable(cardNumberInputApi),
  "",
  "### ShabaInput",
  "",
  apiRowsToMarkdownTable(shabaInputApi),
].join("\n")

export default function BankInputDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Bank Input
          </h1>
          <CopyMarkdownButton markdown={bankInputMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Payment-ready Iranian card and Shaba fields. They normalize mixed
          paste formats, force a readable LTR tabular layout, validate
          checksums, and identify the bank while the customer types. Persian and
          Arabic-Indic numerals are normalized with{" "}
          <a
            href="/docs/utilities/normalize-persian-digits"
            className="text-foreground underline underline-offset-4"
          >
            Normalize Persian Digits
          </a>
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
            preview={<BankInputDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("bank-input-demo")}
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
          Install the inputs, their bank utility, input-group primitives, and
          the PersianLabs icon package in one step.
        </p>

        <Tabs defaultValue="cli" className="mt-4">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/bank-input.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the component dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@persianlabs/icons" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("bank-input")}
                  lang="tsx"
                  title="components/ui/bank-input.tsx"
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
          id="shaba"
          title="Shaba"
          description="The IR prefix is presented as an input-group prefix. Pasting an entire IBAN, with or without separators, removes IR and normalizes the remaining 24 digits."
          code={getExampleSource("bank-input-shaba")}
        >
          <BankInputShabaExample />
        </Example>
        <Example
          id="zod"
          title="Zod Validation"
          description="Use the exported checksum validators in Zod refinements, while the inputs surface invalid complete values immediately."
          code={getExampleSource("bank-input-zod")}
        >
          <BankInputZodExample />
        </Example>
        <Example
          id="separator"
          title="Separator"
          description="Card numbers use spaces by default (1234 1234 1234 1234). Pass separator to use any other display delimiter; the stored value always stays as 16 plain digits."
          code={getExampleSource("bank-input-separator")}
        >
          <BankInputSeparatorExample />
        </Example>
        <Example
          id="supported-banks"
          title="Supported Banks"
          description="هر ورودی یک شماره کارت معتبر نمونه دارد؛ لوگوی انتهایی نشان می‌دهد که تشخیص بانک برای همه بانک‌های پشتیبانی‌شده فعال است."
          code={getExampleSource("bank-input-supported-banks")}
        >
          <BankInputSupportedBanksExample />
        </Example>
        <Example
          id="rtl"
          title="RTL"
          description="Labels, descriptions, and bank names follow the surrounding RTL interface while the card and Shaba values remain intentionally LTR. Persian digits are normalized during input."
          dir="rtl"
          code={getExampleSource("bank-input-rtl")}
        >
          <BankInputRtlExample />
        </Example>
        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="CardNumberInput" rows={cardNumberInputApi} />
        <ApiReference title="ShabaInput" rows={shabaInputApi} />
        <DocsPageFooter
          href="/docs/components/bank-input"
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
