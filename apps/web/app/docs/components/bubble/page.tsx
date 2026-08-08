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
import { BubbleDemoExample } from "@/components/examples/bubble-demo"
import { BubbleReactionsExample } from "@/components/examples/bubble-reactions"
import { BubbleRtlExample } from "@/components/examples/bubble-rtl"
import { BubbleVariantsExample } from "@/components/examples/bubble-variants"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/bubble/page.tsx"

import { bubbleApi, bubbleReactionsApi } from "./api-data"

export const metadata: Metadata = {
  title: "Bubble",
  description:
    "A chat message bubble with variants, reactions, and start/end alignment.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "reactions", title: "Reactions" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

export function Example() {
  return (
    <BubbleGroup>
      <Bubble align="start" variant="muted">
        <BubbleContent>Hey, do you have a minute?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Sure, what's up?</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}`

export const bubbleMarkdown = [
  "# Bubble",
  "",
  "A chat message bubble with variants, reactions, and start/end alignment.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/bubble.json",
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
  "### Bubble",
  "",
  apiRowsToMarkdownTable(bubbleApi),
  "",
  "### BubbleReactions",
  "",
  apiRowsToMarkdownTable(bubbleReactionsApi),
].join("\n")

export default function BubbleDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Bubble
          </h1>
          <CopyMarkdownButton markdown={bubbleMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A chat message bubble with variants, reactions, and start/end
          alignment. Pair it with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Message
          </code>{" "}
          for a full chat row.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced physical left-3/right-3 with logical start-3/end-3 on BubbleReactions align variants",
            "Replaced [button]:text-left with [button]:text-start on BubbleContent",
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
            preview={<BubbleDemoExample />}
            code={
              <CodeBlock code={getExampleSource("bubble-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/bubble.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react class-variance-authority" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("bubble")}
                  lang="tsx"
                  title="components/ui/bubble.tsx"
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
          id="variants"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Variants
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<BubbleVariantsExample />}
            code={
              <CodeBlock
                code={getExampleSource("bubble-variants")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="reactions"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Reactions
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<BubbleReactionsExample />}
            code={
              <CodeBlock
                code={getExampleSource("bubble-reactions")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            align=&quot;end&quot;
          </code>{" "}
          correctly sits on the visual left under RTL, so a chat thread
          reads naturally either way.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<BubbleRtlExample />}
            code={
              <CodeBlock code={getExampleSource("bubble-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Bubble" rows={bubbleApi} />
        <ApiReference title="BubbleReactions" rows={bubbleReactionsApi} />

        <DocsPageFooter
          href="/docs/components/bubble"
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
