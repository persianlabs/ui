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
import { SeparatorDemoExample } from "@/components/examples/separator-demo"
import { SeparatorListExample } from "@/components/examples/separator-list"
import { SeparatorMenuExample } from "@/components/examples/separator-menu"
import { SeparatorReceiptExample } from "@/components/examples/separator-receipt"
import { SeparatorRtlExample } from "@/components/examples/separator-rtl"
import { SeparatorVerticalExample } from "@/components/examples/separator-vertical"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/separator/page.tsx"

import { separatorRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Separator",
  description: "Visually or semantically separates content, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "vertical", title: "Vertical" },
  { id: "menu", title: "Menu" },
  { id: "list", title: "List" },
  { id: "rtl", title: "RTL" },
  { id: "receipt", title: "Receipt breakdown" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Separator } from "@/components/ui/separator"

export function Example() {
  return <Separator />
}`

export const separatorMarkdown = [
  "# Separator",
  "",
  "Visually or semantically separates content, built on Base UI.",
  "",
  "## Vertical",
  "",
  'Use `orientation="vertical"` for a vertical separator.',
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/separator.json",
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
  "### Separator",
  "",
  apiRowsToMarkdownTable(separatorRootApi),
].join("\n")

export default function SeparatorDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Separator
          </h1>
          <CopyMarkdownButton markdown={separatorMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Visually or semantically separates content. Built on Base
          UI&apos;s separator primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Improved RTL support — the default separator icon and menu layout mirror correctly with logical properties",
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
            preview={<SeparatorDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("separator-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/separator.json" />
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
                  code={getComponentSource("separator")}
                  lang="tsx"
                  title="components/ui/separator.tsx"
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
          id="vertical"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Vertical
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            orientation=&quot;vertical&quot;
          </code>{" "}
          for a vertical separator.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<SeparatorVerticalExample />}
            code={
              <CodeBlock
                code={getExampleSource("separator-vertical")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="menu" className="mt-12 text-xl font-semibold tracking-tight">
          Menu
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Vertical separators between menu items with descriptions.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<SeparatorMenuExample />}
            code={
              <CodeBlock
                code={getExampleSource("separator-menu")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="list" className="mt-12 text-xl font-semibold tracking-tight">
          List
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Horizontal separators between list items.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<SeparatorListExample />}
            code={
              <CodeBlock
                code={getExampleSource("separator-list")}
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
            preview={<SeparatorRtlExample />}
            code={
              <CodeBlock code={getExampleSource("separator-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="receipt"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Receipt breakdown
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A Persian-market pattern: horizontal separators dividing a price
          breakdown, with right-to-left digits and Toman currency.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<SeparatorReceiptExample />}
            code={
              <CodeBlock
                code={getExampleSource("separator-receipt")}
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
        <ApiReference title="Separator" rows={separatorRootApi} />

        <DocsPageFooter
          href="/docs/components/separator"
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
