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
import { ButtonGroupDemoExample } from "@/components/examples/button-group-demo"
import { ButtonGroupDropdownExample } from "@/components/examples/button-group-dropdown"
import { ButtonGroupInputExample } from "@/components/examples/button-group-input"
import { ButtonGroupInputGroupExample } from "@/components/examples/button-group-input-group"
import { ButtonGroupNestedExample } from "@/components/examples/button-group-nested"
import { ButtonGroupOrientationExample } from "@/components/examples/button-group-orientation"
import { ButtonGroupPopoverExample } from "@/components/examples/button-group-popover"
import { ButtonGroupRtlExample } from "@/components/examples/button-group-rtl"
import { ButtonGroupSelectExample } from "@/components/examples/button-group-select"
import { ButtonGroupSeparatorExample } from "@/components/examples/button-group-separator"
import { ButtonGroupSizeExample } from "@/components/examples/button-group-size"
import { ButtonGroupSplitExample } from "@/components/examples/button-group-split"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  buttonGroupRootApi,
  buttonGroupSeparatorApi,
  buttonGroupTextApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/button-group/page.tsx"

export const metadata: Metadata = {
  title: "Button Group",
  description:
    "A container that groups related buttons together with consistent styling.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "orientation", title: "Orientation" },
      { id: "size", title: "Size" },
      { id: "nested", title: "Nested" },
      { id: "separator", title: "Separator" },
      { id: "split", title: "Split" },
      { id: "input", title: "Input" },
      { id: "input-group", title: "Input Group" },
      { id: "dropdown-menu", title: "Dropdown Menu" },
      { id: "select", title: "Select" },
      { id: "popover", title: "Popover" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

export function Example() {
  return (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}`

export const buttonGroupMarkdown = [
  "# Button Group",
  "",
  "A container that groups related buttons together with consistent styling.",
  "",
  "## Orientation",
  "",
  "Set `orientation` to `vertical` to stack the group.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/button-group",
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
  "### ButtonGroup",
  "",
  apiRowsToMarkdownTable(buttonGroupRootApi),
  "",
  "### ButtonGroupSeparator",
  "",
  apiRowsToMarkdownTable(buttonGroupSeparatorApi),
  "",
  "### ButtonGroupText",
  "",
  apiRowsToMarkdownTable(buttonGroupTextApi),
].join("\n")

export default function ButtonGroupDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Button Group
          </h1>
          <CopyMarkdownButton markdown={buttonGroupMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A container that groups related buttons together with consistent
          styling. Use it when you want to group buttons that perform an action
          — for buttons that toggle a state, reach for a toggle group instead.
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
            preview={<ButtonGroupDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("button-group-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/button-group" />
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
                  code={getComponentSource("button-group")}
                  lang="tsx"
                  title="components/ui/button-group.tsx"
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
            id="orientation"
            className="text-sm font-medium text-muted-foreground"
          >
            Orientation
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Set the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              orientation
            </code>{" "}
            prop to change the button group layout.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupOrientationExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-orientation")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="size" className="text-sm font-medium text-muted-foreground">
            Size
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Control the size of buttons using the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              size
            </code>{" "}
            prop on individual buttons.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupSizeExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-size")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="nested" className="text-sm font-medium text-muted-foreground">
            Nested
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Nest{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              {"<ButtonGroup>"}
            </code>{" "}
            components to create button groups with spacing.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupNestedExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-nested")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="separator"
            className="text-sm font-medium text-muted-foreground"
          >
            Separator
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              ButtonGroupSeparator
            </code>{" "}
            component visually divides buttons within a group. Buttons with the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              outline
            </code>{" "}
            variant don&apos;t need one since they already have a border.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupSeparatorExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-separator")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="split" className="text-sm font-medium text-muted-foreground">
            Split
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Create a split button group by adding two buttons separated by a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              ButtonGroupSeparator
            </code>
            .
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupSplitExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-split")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="input" className="text-sm font-medium text-muted-foreground">
            Input
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Wrap an{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Input
            </code>{" "}
            component with buttons.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupInputExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-input")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="input-group"
            className="text-sm font-medium text-muted-foreground"
          >
            Input Group
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Wrap an{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              InputGroup
            </code>{" "}
            component to create complex input layouts.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupInputGroupExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-input-group")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="dropdown-menu"
            className="text-sm font-medium text-muted-foreground"
          >
            Dropdown Menu
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Create a split button group with a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              DropdownMenu
            </code>{" "}
            component.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupDropdownExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-dropdown")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="select" className="text-sm font-medium text-muted-foreground">
            Select
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pair with a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Select
            </code>{" "}
            component.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupSelectExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-select")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="popover"
            className="text-sm font-medium text-muted-foreground"
          >
            Popover
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use with a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              Popover
            </code>{" "}
            component.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGroupPopoverExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-popover")}
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
              preview={<ButtonGroupRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-group-rtl")}
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
        <ApiReference title="ButtonGroup" rows={buttonGroupRootApi} />
        <ApiReference
          title="ButtonGroupSeparator"
          rows={buttonGroupSeparatorApi}
        />
        <ApiReference title="ButtonGroupText" rows={buttonGroupTextApi} />

        <DocsPageFooter
          href="/docs/components/button-group"
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
