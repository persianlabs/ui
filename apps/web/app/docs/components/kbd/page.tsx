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
import { KbdDemoExample } from "@/components/examples/kbd-demo"
import { KbdInlineExample } from "@/components/examples/kbd-inline"
import { KbdRtlExample } from "@/components/examples/kbd-rtl"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/kbd/page.tsx"

import { kbdApi } from "./api-data"

export const metadata: Metadata = {
  title: "Kbd",
  description: "Displays a keyboard key or shortcut.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "inline", title: "Inline" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Kbd } from "@/components/ui/kbd"

export function Example() {
  return <Kbd>⌘K</Kbd>
}`

export const kbdMarkdown = [
  "# Kbd",
  "",
  "Displays a keyboard key or shortcut.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/kbd.json",
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
  "### Kbd",
  "",
  apiRowsToMarkdownTable(kbdApi),
].join("\n")

export default function KbdDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Kbd
          </h1>
          <CopyMarkdownButton markdown={kbdMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays a keyboard key or shortcut.
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
            preview={<KbdDemoExample />}
            code={
              <CodeBlock code={getExampleSource("kbd-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/kbd.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("kbd")}
                  lang="tsx"
                  title="components/ui/kbd.tsx"
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
          <h3 id="inline" className="text-sm font-medium text-muted-foreground">
            Inline
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<KbdInlineExample />}
              code={
                <CodeBlock code={getExampleSource("kbd-inline")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Keyboard shortcuts are always Latin characters, so{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Kbd
            </code>{" "}
            forces <code>dir=&quot;ltr&quot;</code> internally — the key
            itself stays left-to-right even while the surrounding Farsi
            sentence reads right-to-left. When a shortcut has more than one
            key, wrap them together in their own{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              dir=&quot;ltr&quot;
            </code>{" "}
            container — otherwise the bidi algorithm can reorder two
            separately-LTR keys relative to each other inside RTL text, so
            &quot;⌘K&quot; could visually read as &quot;K⌘&quot;.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<KbdRtlExample />}
              code={<CodeBlock code={getExampleSource("kbd-rtl")} lang="tsx" />}
            />
          </div>
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Kbd" rows={kbdApi} />

        <DocsPageFooter
          href="/docs/components/kbd"
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
