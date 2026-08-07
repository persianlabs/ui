import type { Metadata } from "next"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { TextareaButtonExample } from "@/components/examples/textarea-button"
import { TextareaDemoExample } from "@/components/examples/textarea-demo"
import { TextareaDisabledExample } from "@/components/examples/textarea-disabled"
import { TextareaFieldExample } from "@/components/examples/textarea-field"
import { TextareaInvalidExample } from "@/components/examples/textarea-invalid"
import { TextareaRtlExample } from "@/components/examples/textarea-rtl"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { textareaRootApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/textarea/page.tsx"

export const metadata: Metadata = {
  title: "Textarea",
  description:
    "Displays a form textarea or a component that looks like a textarea.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "field", title: "Field" },
  { id: "disabled", title: "Disabled" },
  { id: "invalid", title: "Invalid" },
  { id: "button", title: "Button" },
  { id: "rtl", title: "RTL" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Textarea } from "@/components/ui/textarea"

export function Example() {
  return <Textarea placeholder="Type your message here." />
}`

const textareaMarkdown = [
  "# Textarea",
  "",
  "Displays a form textarea or a component that looks like a textarea.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/textarea.json",
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
  "### Textarea",
  "",
  apiRowsToMarkdownTable(textareaRootApi),
].join("\n")

export default function TextareaDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Textarea
          </h1>
          <CopyMarkdownButton markdown={textareaMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays a form textarea, or a component that looks like a
          textarea.
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
            preview={<TextareaDemoExample />}
            code={
              <CodeBlock code={getExampleSource("textarea-demo")} lang="tsx" />
            }
          />
        </div>

        <h2 id="field" className="mt-12 text-xl font-semibold tracking-tight">
          Field
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            FieldLabel
          </code>
          , and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            FieldDescription
          </code>{" "}
          to create a textarea with a label and description.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<TextareaFieldExample />}
            code={
              <CodeBlock code={getExampleSource("textarea-field")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="disabled"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Disabled
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            disabled
          </code>{" "}
          prop to disable the textarea. Add{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            data-disabled
          </code>{" "}
          to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>{" "}
          to style the disabled label too.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<TextareaDisabledExample />}
            code={
              <CodeBlock
                code={getExampleSource("textarea-disabled")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="invalid" className="mt-12 text-xl font-semibold tracking-tight">
          Invalid
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            aria-invalid
          </code>{" "}
          to mark the textarea as invalid, and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            data-invalid
          </code>{" "}
          on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>{" "}
          to style the invalid label.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<TextareaInvalidExample />}
            code={
              <CodeBlock
                code={getExampleSource("textarea-invalid")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="button" className="mt-12 text-xl font-semibold tracking-tight">
          Button
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pair with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Button
          </code>{" "}
          to create a textarea with a submit button.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<TextareaButtonExample />}
            code={
              <CodeBlock code={getExampleSource("textarea-button")} lang="tsx" />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<TextareaRtlExample />}
            code={
              <CodeBlock code={getExampleSource("textarea-rtl")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/textarea.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium">
                1. Copy the component source
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  components/ui/textarea.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock code={getComponentSource("textarea")} lang="tsx" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Textarea" rows={textareaRootApi} />

        <DocsPageFooter
          href="/docs/components/textarea"
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
