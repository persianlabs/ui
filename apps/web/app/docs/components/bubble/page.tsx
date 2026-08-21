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
import { BubbleAlignmentExample } from "@/components/examples/bubble-alignment"
import { BubbleCollapsibleExample } from "@/components/examples/bubble-collapsible"
import { BubbleDemoExample } from "@/components/examples/bubble-demo"
import { BubbleGroupExample } from "@/components/examples/bubble-group"
import { BubbleLinkButtonExample } from "@/components/examples/bubble-link-button"
import { BubblePopoverExample } from "@/components/examples/bubble-popover"
import { BubbleReactionsExample } from "@/components/examples/bubble-reactions"
import { BubbleRtlExample } from "@/components/examples/bubble-rtl"
import { BubbleTooltipExample } from "@/components/examples/bubble-tooltip"
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
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "variants", title: "Variants" },
      { id: "alignment", title: "Alignment" },
      { id: "group", title: "Bubble Group" },
      { id: "links-and-buttons", title: "Links and Buttons" },
      { id: "reactions", title: "Reactions" },
      { id: "collapsible", title: "Show More / Collapsible" },
      { id: "tooltip", title: "Tooltip" },
      { id: "popover", title: "Popover" },
      { id: "rtl", title: "RTL" },
    ],
  },
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
  "npx shadcn@latest add @persianlabsui/bubble",
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
            "Replaced bg-muted with bg-popover on BubbleReactions — this repo's --muted token is a 4% translucent overlay, which left the reaction pill nearly invisible",
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/bubble" />
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
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="mt-8">
          <h3
            id="variants"
            className="text-sm font-medium text-muted-foreground"
          >
            Variants
          </h3>
          <div className="mt-3">
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
        </div>

        <div className="mt-8">
          <h3
            id="alignment"
            className="text-sm font-medium text-muted-foreground"
          >
            Alignment
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              align
            </code>{" "}
            on <code>Bubble</code> to align the bubble to the start or end of
            the conversation.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BubbleAlignmentExample />}
              code={
                <CodeBlock
                  code={getExampleSource("bubble-alignment")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="group" className="text-sm font-medium text-muted-foreground">
            Bubble Group
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              BubbleGroup
            </code>{" "}
            to group consecutive bubbles from the same sender. Set{" "}
            <code>align</code> on each <code>Bubble</code>, not on the group.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BubbleGroupExample />}
              code={
                <CodeBlock code={getExampleSource("bubble-group")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="links-and-buttons"
            className="text-sm font-medium text-muted-foreground"
          >
            Links and Buttons
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Turn a bubble into a link or button with the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              render
            </code>{" "}
            prop on <code>BubbleContent</code>.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BubbleLinkButtonExample />}
              code={
                <CodeBlock
                  code={getExampleSource("bubble-link-button")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="reactions"
            className="text-sm font-medium text-muted-foreground"
          >
            Reactions
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              BubbleReactions
            </code>{" "}
            for reactions or quick action buttons. Use <code>side</code> and{" "}
            <code>align</code> to position the row.
          </p>
          <div className="mt-3">
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
        </div>

        <div className="mt-8">
          <h3
            id="collapsible"
            className="text-sm font-medium text-muted-foreground"
          >
            Show More / Collapsible
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Long bubble content can be composed with{" "}
            <a
              href="/docs/components/collapsible"
              className="text-foreground underline underline-offset-4"
            >
              Collapsible
            </a>{" "}
            for a show more / show less interaction.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BubbleCollapsibleExample />}
              code={
                <CodeBlock
                  code={getExampleSource("bubble-collapsible")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="tooltip"
            className="text-sm font-medium text-muted-foreground"
          >
            Tooltip
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Wrap a reaction in{" "}
            <a
              href="/docs/components/tooltip"
              className="text-foreground underline underline-offset-4"
            >
              Tooltip
            </a>{" "}
            to reveal metadata on hover, such as a read receipt.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BubbleTooltipExample />}
              code={
                <CodeBlock
                  code={getExampleSource("bubble-tooltip")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="popover"
            className="text-sm font-medium text-muted-foreground"
          >
            Popover
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pair a bubble with a{" "}
            <a
              href="/docs/components/popover"
              className="text-foreground underline underline-offset-4"
            >
              Popover
            </a>{" "}
            to surface more information on demand, such as a full error message.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BubblePopoverExample />}
              code={
                <CodeBlock
                  code={getExampleSource("bubble-popover")}
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              align=&quot;end&quot;
            </code>{" "}
            correctly sits on the visual left under RTL, and reactions mirror
            along with it, so a chat thread reads naturally either way.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<BubbleRtlExample />}
              code={
                <CodeBlock code={getExampleSource("bubble-rtl")} lang="tsx" />
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
