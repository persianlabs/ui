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
import { TomanIconBadgeExample } from "@/components/examples/toman-icon-badge"
import { TomanIconDemoExample } from "@/components/examples/toman-icon-demo"
import { TomanIconInlineExample } from "@/components/examples/toman-icon-inline"
import { TomanIconRtlExample } from "@/components/examples/toman-icon-rtl"
import { TomanIconSizesExample } from "@/components/examples/toman-icon-sizes"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/toman-icon/page.tsx"

import { tomanIconApi } from "./api-data"

export const metadata: Metadata = {
  title: "Toman Icon",
  description: "The Toman currency symbol, as a standalone icon component.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "sizes", title: "Sizes" },
  { id: "inline", title: "Inline with an Amount" },
  { id: "badge", title: "In a Badge" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { TomanIcon } from "@/components/ui/toman-icon"

export function Example() {
  return <TomanIcon className="size-4" />
}`

export const tomanIconMarkdown = [
  "# Toman Icon",
  "",
  "The Toman currency symbol, as a standalone icon component.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/toman-icon.json",
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
  "### TomanIcon",
  "",
  apiRowsToMarkdownTable(tomanIconApi),
].join("\n")

export default function TomanIconDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Toman Icon
          </h1>
          <CopyMarkdownButton markdown={tomanIconMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          The Toman currency symbol (تومان), as a standalone icon component
          you can size and color like any lucide icon.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "Digikala", href: "https://www.digikala.com" }]}
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
            preview={<TomanIconDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("toman-icon-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/toman-icon.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("toman-icon")}
                  lang="tsx"
                  title="components/ui/toman-icon.tsx"
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

        <h2 id="sizes" className="mt-12 text-xl font-semibold tracking-tight">
          Sizes
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<TomanIconSizesExample />}
            code={
              <CodeBlock
                code={getExampleSource("toman-icon-sizes")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="inline" className="mt-12 text-xl font-semibold tracking-tight">
          Inline with an Amount
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<TomanIconInlineExample />}
            code={
              <CodeBlock
                code={getExampleSource("toman-icon-inline")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="badge" className="mt-12 text-xl font-semibold tracking-tight">
          In a Badge
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<TomanIconBadgeExample />}
            code={
              <CodeBlock
                code={getExampleSource("toman-icon-badge")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The icon has no directional geometry, so it just needs to sit on
          the correct side of the amount — before it in RTL, after it in
          LTR. The amount itself stays{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dir=&quot;ltr&quot;
          </code>{" "}
          since digits always read left-to-right.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<TomanIconRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("toman-icon-rtl")}
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
        <ApiReference title="TomanIcon" rows={tomanIconApi} />

        <DocsPageFooter
          href="/docs/components/toman-icon"
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
