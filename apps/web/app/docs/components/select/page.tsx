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
import { SelectAlignItemExample } from "@/components/examples/select-align-item"
import { SelectDemoExample } from "@/components/examples/select-demo"
import { SelectDisabledExample } from "@/components/examples/select-disabled"
import { SelectGroupsExample } from "@/components/examples/select-groups"
import { SelectInvalidExample } from "@/components/examples/select-invalid"
import { SelectMixedDirectionExample } from "@/components/examples/select-mixed-direction"
import { SelectRtlExample } from "@/components/examples/select-rtl"
import { SelectScrollableExample } from "@/components/examples/select-scrollable"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/select/page.tsx"

import {
  selectContentApi,
  selectItemApi,
  selectRootApi,
  selectTriggerApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Select",
  description: "A listbox for choosing a single value, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "example-groups", title: "Groups" },
      { id: "example-scrollable", title: "Scrollable" },
      { id: "example-disabled", title: "Disabled" },
      { id: "example-invalid", title: "Invalid" },
      { id: "example-align-item", title: "Align item with trigger" },
      { id: "rtl", title: "RTL" },
      { id: "mixed-direction", title: "Mixed direction" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectGroupLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fruits = ["Apple", "Banana", "Blueberry"]

export function Example() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Fruits</SelectGroupLabel>
          {fruits.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`

export const selectMarkdown = [
  "# Select",
  "",
  "A listbox for choosing a single value, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/select",
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  usageSnippet,
  CODE_FENCE,
  "",
  "## RTL",
  "",
  "SelectContent renders through a portal, so it can't inherit `dir` from a nearby wrapper the way normal children can — it only sees `document.documentElement`. Select measures the ambient direction where SelectTrigger actually renders and pushes it down, so the portaled popup follows the trigger's local direction, not just the page's.",
  "",
  "## API Reference",
  "",
  "### Select",
  "",
  apiRowsToMarkdownTable(selectRootApi),
  "",
  "### SelectTrigger",
  "",
  apiRowsToMarkdownTable(selectTriggerApi),
  "",
  "### SelectContent",
  "",
  apiRowsToMarkdownTable(selectContentApi),
  "",
  "### SelectItem",
  "",
  apiRowsToMarkdownTable(selectItemApi),
].join("\n")

export default function SelectDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Select
          </h1>
          <CopyMarkdownButton markdown={selectMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A listbox for choosing a single value from a set of options, triggered
          by a button. Built on Base UI&apos;s select primitive. Looking for a
          searchable list instead? See{" "}
          <a
            href="/docs/components/combobox"
            className="text-foreground underline underline-offset-4"
          >
            Combobox
          </a>
          .
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Improved RTL support — the portaled popup now follows the trigger's local direction instead of only the document's",
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
            preview={<SelectDemoExample />}
            code={
              <CodeBlock code={getExampleSource("select-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/select" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("select")}
                  lang="tsx"
                  title="components/ui/select.tsx"
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

        <div className="mt-4">
          <h3
            id="example-groups"
            className="text-sm font-medium text-muted-foreground"
          >
            Groups
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectGroup
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectGroupLabel
            </code>
            , and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectSeparator
            </code>{" "}
            to organize items.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SelectGroupsExample />}
              code={
                <CodeBlock
                  code={getExampleSource("select-groups")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-scrollable"
            className="text-sm font-medium text-muted-foreground"
          >
            Scrollable
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            A select with many items that scrolls.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SelectScrollableExample />}
              code={
                <CodeBlock
                  code={getExampleSource("select-scrollable")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-disabled"
            className="text-sm font-medium text-muted-foreground"
          >
            Disabled
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              disabled
            </code>{" "}
            prop on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Select
            </code>{" "}
            to disable the whole control, or on an individual{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectItem
            </code>{" "}
            to disable just that option.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SelectDisabledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("select-disabled")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-invalid"
            className="text-sm font-medium text-muted-foreground"
          >
            Invalid
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Add{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              data-invalid
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Field
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              aria-invalid
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectTrigger
            </code>{" "}
            to show an error state.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SelectInvalidExample />}
              code={
                <CodeBlock
                  code={getExampleSource("select-invalid")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-align-item"
            className="text-sm font-medium text-muted-foreground"
          >
            Align item with trigger
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              alignItemWithTrigger
            </code>{" "}
            on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectContent
            </code>{" "}
            to control whether the selected item aligns with the trigger
            (default) or the popup aligns to the trigger&apos;s edge instead.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SelectAlignItemExample />}
              code={
                <CodeBlock
                  code={getExampleSource("select-align-item")}
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
              preview={<SelectRtlExample />}
              code={
                <CodeBlock code={getExampleSource("select-rtl")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="mixed-direction"
            className="text-sm font-medium text-muted-foreground"
          >
            Mixed direction
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Base UI&apos;s{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              SelectContent
            </code>{" "}
            renders through a portal, so it doesn&apos;t inherit{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              dir
            </code>{" "}
            from a nearby wrapper — only from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              document.documentElement
            </code>
            . This{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Select
            </code>{" "}
            measures the ambient direction where its trigger actually renders
            and pushes it down, so each popup below follows its own local{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              dir
            </code>{" "}
            island correctly — even though both selects share the same page.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SelectMixedDirectionExample />}
              code={
                <CodeBlock
                  code={getExampleSource("select-mixed-direction")}
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
        <ApiReference title="Select" rows={selectRootApi} />
        <ApiReference title="SelectTrigger" rows={selectTriggerApi} />
        <ApiReference title="SelectContent" rows={selectContentApi} />
        <ApiReference title="SelectItem" rows={selectItemApi} />

        <DocsPageFooter
          href="/docs/components/select"
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
