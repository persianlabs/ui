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
import { CardDemoExample } from "@/components/examples/card-demo"
import { CardImageExample } from "@/components/examples/card-image"
import { CardProductExample } from "@/components/examples/card-product"
import { CardRtlExample } from "@/components/examples/card-rtl"
import { CardSmallExample } from "@/components/examples/card-small"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/card/page.tsx"

import {
  cardContentApi,
  cardFooterApi,
  cardHeaderApi,
  cardRootApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Card",
  description: "Displays a card with header, content, and footer.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "size", title: "Size" },
  { id: "image", title: "Image" },
  { id: "rtl", title: "RTL" },
  { id: "product", title: "Product card" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`

const cardMarkdown = [
  "# Card",
  "",
  "Displays a card with header, content, and footer.",
  "",
  "## Size",
  "",
  'Use `size="sm"` for a compact card with smaller spacing.',
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/card.json",
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
  "### Card",
  "",
  apiRowsToMarkdownTable(cardRootApi),
  "",
  "### CardHeader",
  "",
  apiRowsToMarkdownTable(cardHeaderApi),
  "",
  "### CardContent",
  "",
  apiRowsToMarkdownTable(cardContentApi),
  "",
  "### CardFooter",
  "",
  apiRowsToMarkdownTable(cardFooterApi),
].join("\n")

export default function CardDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Card
          </h1>
          <CopyMarkdownButton markdown={cardMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays content in a structured container with an optional
          header, content, and footer.
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
            preview={<CardDemoExample />}
            code={
              <CodeBlock code={getExampleSource("card-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/card.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("card")}
                  lang="tsx"
                  title="components/ui/card.tsx"
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

        <h2 id="size" className="mt-12 text-xl font-semibold tracking-tight">
          Size
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            size=&quot;sm&quot;
          </code>{" "}
          for a compact card with smaller spacing.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<CardSmallExample />}
            code={
              <CodeBlock code={getExampleSource("card-small")} lang="tsx" />
            }
          />
        </div>

        <h2 id="image" className="mt-12 text-xl font-semibold tracking-tight">
          Image
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Add an image before the card header to create a card with an
          image.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<CardImageExample />}
            code={
              <CodeBlock code={getExampleSource("card-image")} lang="tsx" />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<CardRtlExample />}
            code={<CodeBlock code={getExampleSource("card-rtl")} lang="tsx" />}
          />
        </div>

        <h2
          id="product"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Product card
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A Persian e-commerce pattern: Toman pricing with a discount badge
          and a right-to-left price line.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<CardProductExample />}
            code={
              <CodeBlock code={getExampleSource("card-product")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Card" rows={cardRootApi} />
        <ApiReference title="CardHeader" rows={cardHeaderApi} />
        <ApiReference title="CardContent" rows={cardContentApi} />
        <ApiReference title="CardFooter" rows={cardFooterApi} />

        <DocsPageFooter
          href="/docs/components/card"
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
