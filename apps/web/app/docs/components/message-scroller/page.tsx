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
import { MessageScrollerDemoExample } from "@/components/examples/message-scroller-demo"
import { MessageScrollerRtlExample } from "@/components/examples/message-scroller-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/message-scroller/page.tsx"

import {
  messageScrollerButtonApi,
  messageScrollerItemApi,
  messageScrollerProviderApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Message Scroller",
  description:
    "An auto-scrolling viewport for chat messages, with scroll-to-start/end buttons, built on @shadcn/react.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "rtl", title: "RTL" }],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

export function Example() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-56">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {messages.map((message) => (
              <MessageScrollerItem key={message.id}>
                {message.text}
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}`

export const messageScrollerMarkdown = [
  "# Message Scroller",
  "",
  "An auto-scrolling viewport for chat messages, with scroll-to-start/end buttons, built on @shadcn/react.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/message-scroller.json",
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
  "### MessageScrollerProvider",
  "",
  apiRowsToMarkdownTable(messageScrollerProviderApi),
  "",
  "### MessageScrollerItem",
  "",
  apiRowsToMarkdownTable(messageScrollerItemApi),
  "",
  "### MessageScrollerButton",
  "",
  apiRowsToMarkdownTable(messageScrollerButtonApi),
].join("\n")

export default function MessageScrollerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Message Scroller
          </h1>
          <CopyMarkdownButton markdown={messageScrollerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          An auto-scrolling viewport for chat messages, with a scroll-to-latest
          button. Built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            @shadcn/react
          </code>
          .
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Dropped upstream's scroll-fade-b/scrollbar-thin/scrollbar-gutter-stable custom Tailwind utilities (not available in this repo) in favor of plain overflow-y-auto",
            "Replaced the multi-icon-library IconPlaceholder abstraction with a plain lucide-react ArrowDownIcon",
            "Replaced physical inset positioning with logical start-1/2",
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Scroll up inside the viewport below, then use the button to jump back
          to the latest message.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<MessageScrollerDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("message-scroller-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/message-scroller.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@shadcn/react lucide-react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("message-scroller")}
                  lang="tsx"
                  title="components/ui/message-scroller.tsx"
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
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<MessageScrollerRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("message-scroller-rtl")}
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
        <ApiReference
          title="MessageScrollerProvider"
          rows={messageScrollerProviderApi}
        />
        <ApiReference
          title="MessageScrollerItem"
          rows={messageScrollerItemApi}
        />
        <ApiReference
          title="MessageScrollerButton"
          rows={messageScrollerButtonApi}
        />

        <DocsPageFooter
          href="/docs/components/message-scroller"
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
