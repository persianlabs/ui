import type { Metadata } from "next"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { InputGroupBlockEndExample } from "@/components/examples/input-group-block-end"
import { InputGroupBlockStartExample } from "@/components/examples/input-group-block-start"
import { InputGroupButtonExample } from "@/components/examples/input-group-button"
import { InputGroupCustomExample } from "@/components/examples/input-group-custom"
import { InputGroupDemoExample } from "@/components/examples/input-group-demo"
import { InputGroupDropdownExample } from "@/components/examples/input-group-dropdown"
import { InputGroupIconExample } from "@/components/examples/input-group-icon"
import { InputGroupInlineEndExample } from "@/components/examples/input-group-inline-end"
import { InputGroupInlineStartExample } from "@/components/examples/input-group-inline-start"
import { InputGroupKbdExample } from "@/components/examples/input-group-kbd"
import { InputGroupRtlExample } from "@/components/examples/input-group-rtl"
import { InputGroupSpinnerExample } from "@/components/examples/input-group-spinner"
import { InputGroupTextExample } from "@/components/examples/input-group-text"
import { InputGroupTextareaExample } from "@/components/examples/input-group-textarea"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  inputGroupAddonApi,
  inputGroupButtonApi,
  inputGroupInputApi,
  inputGroupRootApi,
  inputGroupTextareaApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/input-group/page.tsx"

export const metadata: Metadata = {
  title: "Input Group",
  description: "Add addons, buttons, and helper content to inputs.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "composition", title: "Composition" },
  {
    id: "align",
    title: "Align",
    children: [
      { id: "align-inline-start", title: "Inline start" },
      { id: "align-inline-end", title: "Inline end" },
      { id: "align-block-start", title: "Block start" },
      { id: "align-block-end", title: "Block end" },
    ],
  },
  { id: "icon", title: "Icon" },
  { id: "text", title: "Text" },
  { id: "button", title: "Button" },
  { id: "kbd", title: "Kbd" },
  { id: "dropdown", title: "Dropdown" },
  { id: "spinner", title: "Spinner" },
  { id: "textarea", title: "Textarea" },
  { id: "custom-input", title: "Custom Input" },
  { id: "rtl", title: "RTL" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function Example() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}`

const compositionSnippet = `InputGroup
├── InputGroupInput or InputGroupTextarea
├── InputGroupAddon
├── InputGroupButton
└── InputGroupText`

const inputGroupMarkdown = [
  "# Input Group",
  "",
  "Add addons, buttons, and helper content to inputs.",
  "",
  "## Composition",
  "",
  `${CODE_FENCE}text`,
  compositionSnippet,
  CODE_FENCE,
  "",
  "## Align",
  "",
  "Use the `align` prop on `InputGroupAddon` to position the addon: `inline-start`, `inline-end`, `block-start`, or `block-end`.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/input-group.json",
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
  "### InputGroup",
  "",
  apiRowsToMarkdownTable(inputGroupRootApi),
  "",
  "### InputGroupAddon",
  "",
  apiRowsToMarkdownTable(inputGroupAddonApi),
  "",
  "### InputGroupButton",
  "",
  apiRowsToMarkdownTable(inputGroupButtonApi),
  "",
  "### InputGroupInput",
  "",
  apiRowsToMarkdownTable(inputGroupInputApi),
  "",
  "### InputGroupTextarea",
  "",
  apiRowsToMarkdownTable(inputGroupTextareaApi),
].join("\n")

export default function InputGroupDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Input Group
          </h1>
          <CopyMarkdownButton markdown={inputGroupMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Add addons, buttons, or helper content alongside an input or
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
            preview={<InputGroupDemoExample />}
            code={
              <CodeBlock code={getExampleSource("input-group-demo")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="composition"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Composition
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the following composition to build an{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            InputGroup
          </code>
          :
        </p>
        <div className="mt-4">
          <CodeBlock code={compositionSnippet} lang="text" />
        </div>

        <h2 id="align" className="mt-12 text-xl font-semibold tracking-tight">
          Align
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          For proper focus management,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            InputGroupAddon
          </code>{" "}
          should always be placed after{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            InputGroupInput
          </code>{" "}
          or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            InputGroupTextarea
          </code>{" "}
          in the DOM. Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            align
          </code>{" "}
          prop on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            InputGroupAddon
          </code>{" "}
          to position the addon relative to the input.
        </p>

        <div className="mt-4">
          <h3
            id="align-inline-start"
            className="text-sm font-medium text-muted-foreground"
          >
            Inline start
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<InputGroupInlineStartExample />}
              code={
                <CodeBlock
                  code={getExampleSource("input-group-inline-start")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="align-inline-end"
            className="text-sm font-medium text-muted-foreground"
          >
            Inline end
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<InputGroupInlineEndExample />}
              code={
                <CodeBlock
                  code={getExampleSource("input-group-inline-end")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="align-block-start"
            className="text-sm font-medium text-muted-foreground"
          >
            Block start
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<InputGroupBlockStartExample />}
              code={
                <CodeBlock
                  code={getExampleSource("input-group-block-start")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="align-block-end"
            className="text-sm font-medium text-muted-foreground"
          >
            Block end
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<InputGroupBlockEndExample />}
              code={
                <CodeBlock
                  code={getExampleSource("input-group-block-end")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <h2 id="icon" className="mt-12 text-xl font-semibold tracking-tight">
          Icon
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupIconExample />}
            code={
              <CodeBlock code={getExampleSource("input-group-icon")} lang="tsx" />
            }
          />
        </div>

        <h2 id="text" className="mt-12 text-xl font-semibold tracking-tight">
          Text
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupTextExample />}
            code={
              <CodeBlock code={getExampleSource("input-group-text")} lang="tsx" />
            }
          />
        </div>

        <h2 id="button" className="mt-12 text-xl font-semibold tracking-tight">
          Button
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupButtonExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-group-button")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="kbd" className="mt-12 text-xl font-semibold tracking-tight">
          Kbd
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupKbdExample />}
            code={
              <CodeBlock code={getExampleSource("input-group-kbd")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="dropdown"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Dropdown
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupDropdownExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-group-dropdown")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="spinner" className="mt-12 text-xl font-semibold tracking-tight">
          Spinner
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupSpinnerExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-group-spinner")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="textarea"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Textarea
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupTextareaExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-group-textarea")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="custom-input"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Custom Input
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Add the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            data-slot=&quot;input-group-control&quot;
          </code>{" "}
          attribute to any custom input for automatic focus-state styling.
          Here&apos;s a custom auto-resizing textarea from a third-party
          library.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<InputGroupCustomExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-group-custom")}
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
            preview={<InputGroupRtlExample />}
            code={
              <CodeBlock code={getExampleSource("input-group-rtl")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/input-group.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium">
                1. Install the dependencies
              </p>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react class-variance-authority" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                2. Copy the component source
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  components/ui/input-group.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("input-group")}
                  lang="tsx"
                />
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
        <ApiReference title="InputGroup" rows={inputGroupRootApi} />
        <ApiReference title="InputGroupAddon" rows={inputGroupAddonApi} />
        <ApiReference title="InputGroupButton" rows={inputGroupButtonApi} />
        <ApiReference title="InputGroupInput" rows={inputGroupInputApi} />
        <ApiReference
          title="InputGroupTextarea"
          rows={inputGroupTextareaApi}
        />

        <DocsPageFooter
          href="/docs/components/input-group"
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
