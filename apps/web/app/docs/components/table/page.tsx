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
import { TableActionsExample } from "@/components/examples/table-actions"
import { TableCardExample } from "@/components/examples/table-card"
import { TableDemoExample } from "@/components/examples/table-demo"
import { TableRtlExample } from "@/components/examples/table-rtl"
import { TableTeamExample } from "@/components/examples/table-team"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/table/page.tsx"

import { tableApi } from "./api-data"

export const metadata: Metadata = {
  title: "Table",
  description:
    "A responsive table component, with an optional card-row variant.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "card", title: "Card Variant" },
      { id: "actions", title: "Actions" },
      { id: "selection", title: "Selection" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Example() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell className="text-end">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`

export const tableMarkdown = [
  "# Table",
  "",
  "A responsive table component, with an optional card-row variant.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/table",
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
  "### Table",
  "",
  apiRowsToMarkdownTable(tableApi),
].join("\n")

export default function TableDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Table
          </h1>
          <CopyMarkdownButton markdown={tableMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A responsive table component with a caption, header, body, and footer,
          plus an optional{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            card
          </code>{" "}
          row variant.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            { label: "cossui", href: "https://coss.com" },
          ]}
          changed={true}
          changes={[
            "Replaced text-left with text-start, and pr-0 with pe-0 on the checkbox column, for RTL",
            'Added an optional card variant (Table variant="card") that separates each row into its own bordered, elevated surface — inspired by cossui\'s Table',
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
            preview={<TableDemoExample />}
            code={
              <CodeBlock code={getExampleSource("table-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/table" />
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
                  code={getComponentSource("table")}
                  lang="tsx"
                  title="components/ui/table.tsx"
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
          <h3 id="card" className="text-sm font-medium text-muted-foreground">
            Card Variant
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              variant=&quot;card&quot;
            </code>{" "}
            for a card-style table: separated borders, rounded corners, and row
            surfaces that read as individual cards. The default variant is a
            simpler grid with shared borders.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<TableCardExample />}
              code={
                <CodeBlock code={getExampleSource("table-card")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="actions"
            className="text-sm font-medium text-muted-foreground"
          >
            Actions
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            A table showing per-row actions using a{" "}
            <a
              href="/docs/components/dropdown-menu"
              className="text-foreground underline underline-offset-4"
            >
              Dropdown Menu
            </a>
            .
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<TableActionsExample />}
              code={
                <CodeBlock
                  code={getExampleSource("table-actions")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="selection"
            className="text-sm font-medium text-muted-foreground"
          >
            Selection
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Combine the card variant with{" "}
            <a
              href="/docs/components/checkbox"
              className="text-foreground underline underline-offset-4"
            >
              Checkbox
            </a>{" "}
            row selection,{" "}
            <a
              href="/docs/components/avatar"
              className="text-foreground underline underline-offset-4"
            >
              Avatar
            </a>
            , a status{" "}
            <a
              href="/docs/components/badge"
              className="text-foreground underline underline-offset-4"
            >
              Badge
            </a>
            , and a Dropdown Menu for row actions — a common shape for team or
            user management tables.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<TableTeamExample />}
              code={
                <CodeBlock code={getExampleSource("table-team")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Header and cell alignment use logical{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              text-start
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              text-end
            </code>{" "}
            utilities, so numeric columns stay aligned to the trailing edge in
            both directions.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<TableRtlExample />}
              code={
                <CodeBlock code={getExampleSource("table-rtl")} lang="tsx" />
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
        <ApiReference title="Table" rows={tableApi} />

        <DocsPageFooter
          href="/docs/components/table"
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
