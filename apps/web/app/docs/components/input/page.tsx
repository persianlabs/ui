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
import { InputBadgeExample } from "@/components/examples/input-badge"
import { InputBasicExample } from "@/components/examples/input-basic"
import { InputButtonGroupExample } from "@/components/examples/input-button-group"
import { InputDemoExample } from "@/components/examples/input-demo"
import { InputDisabledExample } from "@/components/examples/input-disabled"
import { InputFieldExample } from "@/components/examples/input-field"
import { InputFieldGroupExample } from "@/components/examples/input-fieldgroup"
import { InputFileExample } from "@/components/examples/input-file"
import { InputFormExample } from "@/components/examples/input-form"
import { InputGridExample } from "@/components/examples/input-grid"
import { InputInlineExample } from "@/components/examples/input-inline"
import { InputInputGroupExample } from "@/components/examples/input-input-group"
import { InputInvalidExample } from "@/components/examples/input-invalid"
import { InputRequiredExample } from "@/components/examples/input-required"
import { InputRtlExample } from "@/components/examples/input-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { fieldLabelApi, fieldRootApi, inputRootApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/input/page.tsx"

export const metadata: Metadata = {
  title: "Input",
  description: "A styled text input built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "basic", title: "Basic" },
  { id: "field", title: "Field" },
  { id: "field-group", title: "Field Group" },
  { id: "disabled", title: "Disabled" },
  { id: "invalid", title: "Invalid" },
  { id: "file", title: "File" },
  { id: "inline", title: "Inline" },
  { id: "grid", title: "Grid" },
  { id: "required", title: "Required" },
  { id: "badge", title: "Badge" },
  { id: "input-group", title: "Input Group" },
  { id: "button-group", title: "Button Group" },
  { id: "form", title: "Form" },
  { id: "rtl", title: "RTL" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Input } from "@/components/ui/input"

export function Example() {
  return <Input placeholder="Enter your name" />
}`

const inputMarkdown = [
  "# Input",
  "",
  "A styled text input built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/input.json",
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
  "### Input",
  "",
  apiRowsToMarkdownTable(inputRootApi),
  "",
  "### Field",
  "",
  apiRowsToMarkdownTable(fieldRootApi),
  "",
  "### FieldLabel",
  "",
  apiRowsToMarkdownTable(fieldLabelApi),
].join("\n")

export default function InputDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Input
          </h1>
          <CopyMarkdownButton markdown={inputMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A text input for forms and user data entry, built on Base UI. Pair it
          with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>{" "}
          for a labeled, accessible form control.
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
            preview={<InputDemoExample />}
            code={
              <CodeBlock code={getExampleSource("input-demo")} lang="tsx" />
            }
          />
        </div>

        <h2 id="basic" className="mt-12 text-xl font-semibold tracking-tight">
          Basic
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputBasicExample />}
            code={
              <CodeBlock code={getExampleSource("input-basic")} lang="tsx" />
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
          to create an input with a label and description.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputFieldExample />}
            code={
              <CodeBlock code={getExampleSource("input-field")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="field-group"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Field Group
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            FieldGroup
          </code>{" "}
          to show multiple{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>{" "}
          blocks and build forms.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputFieldGroupExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-fieldgroup")}
                lang="tsx"
              />
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
          prop to disable the input. Add{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            data-disabled
          </code>{" "}
          to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>{" "}
          to style the disabled label and description too.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputDisabledExample />}
            code={
              <CodeBlock code={getExampleSource("input-disabled")} lang="tsx" />
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
          to mark the input as invalid, and{" "}
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
            preview={<InputInvalidExample />}
            code={
              <CodeBlock code={getExampleSource("input-invalid")} lang="tsx" />
            }
          />
        </div>

        <h2 id="file" className="mt-12 text-xl font-semibold tracking-tight">
          File
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            type=&quot;file&quot;
          </code>{" "}
          to create a file input.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputFileExample />}
            code={
              <CodeBlock code={getExampleSource("input-file")} lang="tsx" />
            }
          />
        </div>

        <h2 id="inline" className="mt-12 text-xl font-semibold tracking-tight">
          Inline
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Field
          </code>{" "}
          with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            orientation=&quot;horizontal&quot;
          </code>{" "}
          to create an inline input, paired with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Button
          </code>{" "}
          for a search field.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputInlineExample />}
            code={
              <CodeBlock code={getExampleSource("input-inline")} lang="tsx" />
            }
          />
        </div>

        <h2 id="grid" className="mt-12 text-xl font-semibold tracking-tight">
          Grid
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use a grid layout to place multiple inputs side by side.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGridExample />}
            code={
              <CodeBlock code={getExampleSource("input-grid")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="required"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Required
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            required
          </code>{" "}
          attribute to indicate required inputs.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputRequiredExample />}
            code={
              <CodeBlock code={getExampleSource("input-required")} lang="tsx" />
            }
          />
        </div>

        <h2 id="badge" className="mt-12 text-xl font-semibold tracking-tight">
          Badge
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Badge
          </code>{" "}
          in the label to highlight a recommended field.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputBadgeExample />}
            code={
              <CodeBlock code={getExampleSource("input-badge")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="input-group"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Input Group
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          To add icons, text, or buttons inside an input, use{" "}
          <a
            href="/docs/components/input-group"
            className="text-foreground underline underline-offset-4"
          >
            InputGroup
          </a>
          .
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputInputGroupExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-input-group")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="button-group"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Button Group
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          To add buttons to an input, use{" "}
          <a
            href="/docs/components/button-group"
            className="text-foreground underline underline-offset-4"
          >
            ButtonGroup
          </a>
          .
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputButtonGroupExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-button-group")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="form" className="mt-12 text-xl font-semibold tracking-tight">
          Form
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A full form example with multiple inputs, a select, and a button.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputFormExample />}
            code={
              <CodeBlock code={getExampleSource("input-form")} lang="tsx" />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<InputRtlExample />}
            code={<CodeBlock code={getExampleSource("input-rtl")} lang="tsx" />}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/input.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium">1. Install the dependencies</p>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                2. Copy the component source
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  components/ui/input.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock code={getComponentSource("input")} lang="tsx" />
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
        <ApiReference title="Input" rows={inputRootApi} />
        <ApiReference title="Field" rows={fieldRootApi} />
        <ApiReference title="FieldLabel" rows={fieldLabelApi} />

        <DocsPageFooter
          href="/docs/components/input"
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
