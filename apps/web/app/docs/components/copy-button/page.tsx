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
import { CopyButtonDemoExample } from "@/components/examples/copy-button-demo"
import { CopyButtonRtlExample } from "@/components/examples/copy-button-rtl"
import { CopyButtonWithTextExample } from "@/components/examples/copy-button-with-text"
import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource, getHookSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/copy-button/page.tsx"

import { copyButtonApi } from "./api-data"

export const metadata: Metadata = {
  title: "Copy Button",
  description:
    "An icon button that copies text to the clipboard, morphs its icon to reflect the result, and anchors a confirmation toast to itself.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "with-text", title: "With Text" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { CopyButton } from "@/components/ui/copy-button"

export function Example() {
  return <CopyButton text="https://persian-labs.ir" label="Copy link" />
}`

export const copyButtonMarkdown = [
  "# Copy Button",
  "",
  "An icon button that copies text to the clipboard, morphs its icon to reflect the result, and anchors a confirmation toast to itself. Self-contained — it brings its own toast manager and provider, so it works with zero setup.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/copy-button.json",
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
  "### CopyButton",
  "",
  apiRowsToMarkdownTable(copyButtonApi),
].join("\n")

export default function CopyButtonDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Copy Button
          </h1>
          <CopyMarkdownButton markdown={copyButtonMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          An icon button that copies text to the clipboard, morphs its icon
          from a copy glyph to a checkmark (or an error state), and anchors a
          confirmation toast to itself — built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            Tooltip
          </code>{" "}
          and the anchored{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            Toast
          </code>
          . It brings its own toast manager and provider internally, so it
          drops in anywhere with zero setup.
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
            preview={<CopyButtonDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("copy-button-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/copy-button.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="lucide-react motion" />
              </div>
              <Step>Copy the hook source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-copy-to-clipboard")}
                  lang="tsx"
                  title="hooks/use-copy-to-clipboard.ts"
                />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("copy-button")}
                  lang="tsx"
                  title="components/ui/copy-button.tsx"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          No provider to wrap — the copy confirmation is a toast anchored to
          the button itself (not a corner-stacked one), and CopyButton
          manages that internally by default.
        </p>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="with-text"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          With Text
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          It&apos;s a regular{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            Button
          </code>{" "}
          under the hood, so any variant, size, or children work — pass a
          label as{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            children
          </code>{" "}
          alongside the icon.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<CopyButtonWithTextExample />}
            code={
              <CodeBlock
                code={getExampleSource("copy-button-with-text")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The default{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            label
          </code>{" "}
          is already Persian (&quot;کپی&quot;), and the anchored confirmation
          toast mirrors correctly since it goes through the same
          direction-aware{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            AnchoredToastProvider
          </code>{" "}
          as Toast.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<CopyButtonRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("copy-button-rtl")}
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
        <ApiReference title="CopyButton" rows={copyButtonApi} />

        <DocsPageFooter
          href="/docs/components/copy-button"
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
