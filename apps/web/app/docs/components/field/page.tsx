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
import { FieldDemoExample } from "@/components/examples/field-demo"
import { FieldErrorExample } from "@/components/examples/field-error"
import { FieldHorizontalExample } from "@/components/examples/field-horizontal"
import { FieldRtlExample } from "@/components/examples/field-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/field/page.tsx"

import { fieldApi, fieldErrorApi } from "./api-data"

export const metadata: Metadata = {
  title: "Field",
  description:
    "Groups a label, control, and description into an accessible form field, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "horizontal", title: "Horizontal" },
  { id: "error", title: "Error" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export function Example() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}`

export const fieldMarkdown = [
  "# Field",
  "",
  "Groups a label, control, and description into an accessible form field, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/field.json",
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
  "### Field",
  "",
  apiRowsToMarkdownTable(fieldApi),
  "",
  "### FieldError",
  "",
  apiRowsToMarkdownTable(fieldErrorApi),
].join("\n")

export default function FieldDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Field
          </h1>
          <CopyMarkdownButton markdown={fieldMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Groups a label, control, and description into an accessible form
          field. Built on Base UI&apos;s field primitive.
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
            preview={<FieldDemoExample />}
            code={
              <CodeBlock code={getExampleSource("field-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/field.json" />
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
                  code={getComponentSource("field")}
                  lang="tsx"
                  title="components/ui/field.tsx"
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
          id="horizontal"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Horizontal
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            orientation=&quot;horizontal&quot;
          </code>{" "}
          to place the label and control side by side, e.g. for a
          settings-style toggle row.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<FieldHorizontalExample />}
            code={
              <CodeBlock
                code={getExampleSource("field-horizontal")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="error" className="mt-12 text-xl font-semibold tracking-tight">
          Error
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<FieldErrorExample />}
            code={
              <CodeBlock code={getExampleSource("field-error")} lang="tsx" />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<FieldRtlExample />}
            code={
              <CodeBlock code={getExampleSource("field-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Field" rows={fieldApi} />
        <ApiReference title="FieldError" rows={fieldErrorApi} />

        <DocsPageFooter
          href="/docs/components/field"
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
