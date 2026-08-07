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
import { NativeSelectDemoExample } from "@/components/examples/native-select-demo"
import { NativeSelectRtlExample } from "@/components/examples/native-select-rtl"
import { NativeSelectSizeExample } from "@/components/examples/native-select-size"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/native-select/page.tsx"

import { nativeSelectRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Native Select",
  description: "A styled native <select> element for choosing a single value.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "size", title: "Size" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function Example() {
  return (
    <NativeSelect defaultValue="next">
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
      <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
    </NativeSelect>
  )
}`

const nativeSelectMarkdown = [
  "# Native Select",
  "",
  "A styled native <select> element for choosing a single value.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/native-select.json",
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
  "### NativeSelect",
  "",
  apiRowsToMarkdownTable(nativeSelectRootApi),
].join("\n")

export default function NativeSelectDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Native Select
          </h1>
          <CopyMarkdownButton markdown={nativeSelectMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A styled native{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<select>"}
          </code>{" "}
          element for choosing a single value — useful when you want native
          mobile picker behavior instead of{" "}
          <a
            href="/docs/components/select"
            className="text-foreground underline underline-offset-4"
          >
            Select
          </a>
          &apos;s custom popup.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "The dropdown chevron and padding use logical start/end properties, so it sits on the correct side in RTL without an override",
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
            preview={<NativeSelectDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("native-select-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/native-select.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("native-select")}
                  lang="tsx"
                  title="components/ui/native-select.tsx"
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
        <div className="mt-4">
          <ComponentPreview
            preview={<NativeSelectSizeExample />}
            code={
              <CodeBlock
                code={getExampleSource("native-select-size")}
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
            preview={<NativeSelectRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("native-select-rtl")}
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
        <ApiReference title="NativeSelect" rows={nativeSelectRootApi} />

        <DocsPageFooter
          href="/docs/components/native-select"
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
