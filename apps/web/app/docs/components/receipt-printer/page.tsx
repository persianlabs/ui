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
import { ReceiptPrinterDemoExample } from "@/components/examples/receipt-printer-demo"
import { ReceiptPrinterRtlExample } from "@/components/examples/receipt-printer-rtl"
import { ReceiptPrinterSubscriptionExample } from "@/components/examples/receipt-printer-subscription"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"
import { receiptPrinterApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/receipt-printer/page.tsx"
const usageSnippet = `import { ReceiptPrinter } from "@/components/ui/receipt-printer"

export function Example() {
  return (
    <ReceiptPrinter.Root stage="complete">
      <ReceiptPrinter.Machine>
        <ReceiptPrinter.Header>
          <ReceiptPrinter.Status>Payment approved</ReceiptPrinter.Status>
        </ReceiptPrinter.Header>
        <ReceiptPrinter.Screen>READY · 12:48</ReceiptPrinter.Screen>
      </ReceiptPrinter.Machine>
      <ReceiptPrinter.Output>
        <ReceiptPrinter.Paper>Your receipt content</ReceiptPrinter.Paper>
      </ReceiptPrinter.Output>
    </ReceiptPrinter.Root>
  )
}`

export const metadata: Metadata = {
  title: "Receipt Printer",
  description:
    "A tactile checkout experience that turns payment processing into a printed receipt.",
}
const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "subscription", title: "Subscription" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]
const markdown = [
  "# Receipt Printer",
  "",
  "A tactile checkout experience that turns payment processing into a printed receipt.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/receipt-printer",
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
  apiRowsToMarkdownTable(receiptPrinterApi),
].join("\n")

export default function ReceiptPrinterDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Receipt Printer
          </h1>
          <CopyMarkdownButton markdown={markdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A tactile checkout experience that turns payment processing into a
          printed receipt, complete with order details.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "Dqnamo Receipt Printer experiment",
              href: "https://www.dqnamo.com/experiments/receipt-printer",
            },
          ]}
          changed={true}
          changes={[
            "Rebuilt as an original compound component for the PersianLabs registry.",
            "Added status stages, product imagery, subscription receipts, and RTL Persian content.",
          ]}
        />
        <Section id="overview" title="Overview">
          <ComponentPreview
            preview={<ReceiptPrinterDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("receipt-printer-demo")}
                lang="tsx"
              />
            }
          />
        </Section>
        <Section id="installation" title="Installation">
          <Tabs defaultValue="cli">
            <TabsList>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli" className="mt-4">
              <CopyCommand command="npx shadcn@latest add @persianlabsui/receipt-printer" />
            </TabsContent>
            <TabsContent value="manual" className="mt-4">
              <Steps>
                <Step>Install the dependency</Step>
                <div className="mt-2">
                  <InstallCommand packages="lucide-react" />
                </div>
                <Step>Copy the component source</Step>
                <div className="mt-2">
                  <CodeBlock
                    code={getComponentSource("receipt-printer")}
                    lang="tsx"
                    title="components/ui/receipt-printer.tsx"
                  />
                </div>
              </Steps>
            </TabsContent>
          </Tabs>
        </Section>
        <Section id="usage" title="Usage">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </Section>
        <Section id="examples" title="Examples">
          <h3
            id="subscription"
            className="text-sm font-medium text-muted-foreground"
          >
            Subscription renewal
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ReceiptPrinterSubscriptionExample />}
              code={
                <CodeBlock
                  code={getExampleSource("receipt-printer-subscription")}
                  lang="tsx"
                />
              }
            />
          </div>
          <h3
            id="rtl"
            className="mt-8 text-sm font-medium text-muted-foreground"
          >
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The printer uses logical layout and accepts{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              dir=&quot;rtl&quot;
            </code>
            , keeping Persian labels and item rows natural while amounts remain
            easy to scan.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<ReceiptPrinterRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("receipt-printer-rtl")}
                  lang="tsx"
                />
              }
            />
          </div>
        </Section>
        <Section id="api-reference" title="API Reference">
          <ApiReference title="ReceiptPrinter.Root" rows={receiptPrinterApi} />
        </Section>
        <DocsPageFooter
          href="/docs/components/receipt-printer"
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

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
