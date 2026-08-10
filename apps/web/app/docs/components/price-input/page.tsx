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
import { DocsPageFooter } from "@/components/docs-page-footer"
import { PriceInputDemoExample } from "@/components/examples/price-input-demo"
import { PriceInputGroupAbbreviationExample } from "@/components/examples/price-input-group-abbreviation"
import { PriceInputGroupIconExample } from "@/components/examples/price-input-group-icon"
import { PriceInputGroupTextExample } from "@/components/examples/price-input-group-text"
import { PriceInputNegativeExample } from "@/components/examples/price-input-negative"
import { PriceInputRtlExample } from "@/components/examples/price-input-rtl"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/price-input/page.tsx"

import { priceInputApi } from "./api-data"

export const metadata: Metadata = {
  title: "Price Input",
  description:
    "A text input that live-formats digits as a grouped price as you type, with support for Persian/Arabic-Indic numerals.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "negative", title: "Negative Amounts" },
      { id: "group-text", title: "With a Currency Suffix" },
      { id: "group-abbreviation", title: "With an Abbreviation" },
      { id: "group-icon", title: "With the Toman Icon" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { PriceInput } from "@/components/ui/price-input"

export function Example() {
  const [value, setValue] = React.useState<number | null>(125000)

  return <PriceInput value={value} onValueChange={setValue} />
}`

export const priceInputMarkdown = [
  "# Price Input",
  "",
  "A text input that live-formats digits as a grouped price as you type, with support for Persian/Arabic-Indic numerals.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/price-input.json",
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
  "### PriceInput",
  "",
  apiRowsToMarkdownTable(priceInputApi),
].join("\n")

export default function PriceInputDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Price Input
          </h1>
          <CopyMarkdownButton markdown={priceInputMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A text input that live-formats digits with thousands separators as you
          type — e.g. typing <code>125000</code> shows <code>125,000</code> on
          every keystroke, not just on blur. Reports back a plain{" "}
          <code>number | null</code>, so it&apos;s trivial to send to a server.
          It also normalizes Persian (۰-۹) and Arabic-Indic (٠-٩) numerals to
          plain digits as you type or paste, since Persian keyboards commonly
          type those instead of 0-9 — see{" "}
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
            preview={<PriceInputDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("price-input-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/price-input.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("price-input")}
                  lang="tsx"
                  title="components/ui/price-input.tsx"
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

        <div className="mt-8">
          <h3
            id="negative"
            className="text-sm font-medium text-muted-foreground"
          >
            Negative Amounts
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Negative values are allowed by default. Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              min={"{0}"}
            </code>{" "}
            to disallow them — the value is clamped to the given{" "}
            <code>min</code>/<code>max</code> range on blur.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<PriceInputNegativeExample />}
              code={
                <CodeBlock
                  code={getExampleSource("price-input-negative")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="group-text"
            className="text-sm font-medium text-muted-foreground"
          >
            With a Currency Suffix
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Compose{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              PriceInput
            </code>{" "}
            with{" "}
            <a
              href="/docs/components/input-group"
              className="text-foreground underline underline-offset-4"
            >
              Input Group
            </a>{" "}
            for a currency suffix like &quot;تومان&quot;. Pass the group&apos;s
            control styles through <code>className</code>, and set{" "}
            <code>data-slot=&quot;input-group-control&quot;</code> so it sits
            flush with the addon and its border/focus states bubble up to the
            group.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<PriceInputGroupTextExample />}
              code={
                <CodeBlock
                  code={getExampleSource("price-input-group-text")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="group-abbreviation"
            className="text-sm font-medium text-muted-foreground"
          >
            With an Abbreviation
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            A short abbreviation like &quot;T&quot; reads well in dense UI —
            tables, cards, compact forms — where the full word would crowd the
            layout.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<PriceInputGroupAbbreviationExample />}
              code={
                <CodeBlock
                  code={getExampleSource("price-input-group-abbreviation")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="group-icon"
            className="text-sm font-medium text-muted-foreground"
          >
            With the Toman Icon
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use the{" "}
            <a
              href="/docs/components/toman-icon"
              className="text-foreground underline underline-offset-4"
            >
              Toman Icon
            </a>{" "}
            instead of text for a more compact, symbol-first affordance.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<PriceInputGroupIconExample />}
              code={
                <CodeBlock
                  code={getExampleSource("price-input-group-icon")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The formatted amount itself stays{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              dir=&quot;ltr&quot;
            </code>{" "}
            — digits always read left-to-right — while the label, suffix, and
            description flow naturally with the RTL layout around it. Try typing
            Persian digits (۰-۹) below; they&apos;re normalized automatically.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<PriceInputRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("price-input-rtl")}
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
        <ApiReference title="PriceInput" rows={priceInputApi} />

        <DocsPageFooter
          href="/docs/components/price-input"
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
