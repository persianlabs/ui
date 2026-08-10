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
import { UseCopyToClipboardCallbackExample } from "@/components/examples/use-copy-to-clipboard-callback"
import { UseCopyToClipboardDemoExample } from "@/components/examples/use-copy-to-clipboard-demo"
import { UseCopyToClipboardRtlExample } from "@/components/examples/use-copy-to-clipboard-rtl"
import { UseCopyToClipboardTimeoutExample } from "@/components/examples/use-copy-to-clipboard-timeout"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getHookSource } from "@/lib/component-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  useCopyToClipboardOptionsApi,
  useCopyToClipboardReturnApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/use-copy-to-clipboard/page.tsx"

export const metadata: Metadata = {
  title: "useCopyToClipboard",
  description:
    "A React hook that wraps the Clipboard API with a built-in timeout to reset the copied state.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "custom-timeout", title: "Custom timeout" },
      { id: "callback", title: "Callback on copy" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

function CopyButton({ text }: { text: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <button onClick={() => copyToClipboard(text)}>
      {isCopied ? "Copied!" : "Copy"}
    </button>
  )
}`

export const useCopyToClipboardMarkdown = [
  "# useCopyToClipboard",
  "",
  "A React hook that wraps the Clipboard API with a built-in timeout to reset the copied state. Useful for copy buttons that show brief confirmation feedback.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/use-copy-to-clipboard.json",
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
  "### useCopyToClipboard(options)",
  "",
  apiRowsToMarkdownTable(useCopyToClipboardOptionsApi),
  "",
  "### Return value",
  "",
  apiRowsToMarkdownTable(useCopyToClipboardReturnApi),
].join("\n")

export default function UseCopyToClipboardDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            useCopyToClipboard
          </h1>
          <CopyMarkdownButton markdown={useCopyToClipboardMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Wraps the Clipboard API with a built-in timeout to reset the copied
          state — useful for copy buttons that show brief confirmation feedback.
          Powers{" "}
          <a
            href="/docs/components/copy-button"
            className="text-foreground underline underline-offset-4"
          >
            Copy Button
          </a>
          .
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "coss ui",
              href: "https://coss.com/ui/docs/hooks/use-copy-to-clipboard",
            },
          ]}
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
            preview={<UseCopyToClipboardDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("use-copy-to-clipboard-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/use-copy-to-clipboard.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-copy-to-clipboard")}
                  lang="ts"
                  title="hooks/use-copy-to-clipboard.ts"
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
            id="custom-timeout"
            className="text-sm font-medium text-muted-foreground"
          >
            Custom timeout
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              isCopied
            </code>{" "}
            state resets after 2 seconds by default. Set{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              timeout
            </code>{" "}
            to 0 to keep it true indefinitely (until the component unmounts).
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<UseCopyToClipboardTimeoutExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-copy-to-clipboard-timeout")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="callback"
            className="text-sm font-medium text-muted-foreground"
          >
            Callback on copy
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Run a side effect when a copy succeeds with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              onCopy
            </code>
            .
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<UseCopyToClipboardCallbackExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-copy-to-clipboard-callback")}
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
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<UseCopyToClipboardRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-copy-to-clipboard-rtl")}
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
          title="useCopyToClipboard(options)"
          rows={useCopyToClipboardOptionsApi}
        />
        <ApiReference title="Return value" rows={useCopyToClipboardReturnApi} />

        <DocsPageFooter
          href="/docs/utilities/use-copy-to-clipboard"
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
