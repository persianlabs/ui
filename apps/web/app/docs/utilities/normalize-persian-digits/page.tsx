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
import { NormalizePersianDigitsDemoExample } from "@/components/examples/normalize-persian-digits-demo"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { getLibSource } from "@/lib/component-source"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH =
  "apps/web/app/docs/utilities/normalize-persian-digits/page.tsx"

import { normalizePersianDigitsApi } from "./api-data"

export const metadata: Metadata = {
  title: "Normalize Persian Digits",
  description:
    "Converts Persian (۰-۹) and Arabic-Indic (٠-٩) numerals to plain 0-9 digits.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { normalizePersianDigits } from "@/lib/normalize-persian-digits"

normalizePersianDigits("۱۲۳۴۵") // "12345"
normalizePersianDigits("قیمت ٤٥٠") // "قیمت 450"`

export const normalizePersianDigitsMarkdown = [
  "# Normalize Persian Digits",
  "",
  "Converts Persian (۰-۹) and Arabic-Indic (٠-٩) numerals to plain 0-9 digits.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/normalize-persian-digits",
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
  apiRowsToMarkdownTable(normalizePersianDigitsApi),
].join("\n")

export default function NormalizePersianDigitsDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Normalize Persian Digits
          </h1>
          <CopyMarkdownButton markdown={normalizePersianDigitsMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Persian keyboards commonly type ۰-۹ (or Arabic-Indic ٠-٩) instead of
          0-9. This utility converts either set back to plain digits, so numeric
          inputs and parsers keep working regardless of which keyboard the user
          is on.{" "}
          <a
            href="/docs/components/price-input"
            className="text-foreground underline underline-offset-4"
          >
            Price Input
          </a>{" "}
          uses it internally.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Type Persian or Arabic-Indic digits above; the normalized result
          updates below as you type.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<NormalizePersianDigitsDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("normalize-persian-digits-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/normalize-persian-digits" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getLibSource("normalize-persian-digits")}
                  lang="ts"
                  title="lib/normalize-persian-digits.ts"
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
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference
          title="normalize-persian-digits"
          rows={normalizePersianDigitsApi}
        />

        <DocsPageFooter
          href="/docs/utilities/normalize-persian-digits"
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
