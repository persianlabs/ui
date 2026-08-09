import type { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { CommandBasicExample } from "@/components/examples/command-basic"
import { CommandGroupsExample } from "@/components/examples/command-groups"
import { CommandPanelExample } from "@/components/examples/command-panel"
import { CommandRtlExample } from "@/components/examples/command-rtl"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { InstallCommand } from "@/components/install-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/command/page.tsx"

import {
  commandDialogApi,
  commandDialogPopupApi,
  commandDialogTriggerApi,
  commandFooterApi,
  commandGroupApi,
  commandInputApi,
  commandItemApi,
  commandPanelApi,
  commandRootApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Command",
  description:
    "A command palette component built with Dialog and Autocomplete for searching and executing commands.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "example-panel", title: "Standalone panel" },
      { id: "example-groups", title: "Groups" },
      { id: "example-rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

const items = [
  { value: "linear", label: "Linear" },
  { value: "figma", label: "Figma" },
  { value: "slack", label: "Slack" },
]

export function Example() {
  return (
    <CommandDialog>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Open Command Palette
      </CommandDialogTrigger>

      <CommandDialogPopup>
        <Command items={items}>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            {(item) => (
              <CommandItem key={item.value} value={item.value}>
                {item.label}
              </CommandItem>
            )}
          </CommandList>
          <CommandFooter>Use arrow keys to navigate, Enter to select</CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}`

export const commandMarkdown = [
  "# Command",
  "",
  "A command palette component built with Dialog and Autocomplete for searching and executing commands.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/command.json",
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
  "### Command",
  "",
  apiRowsToMarkdownTable(commandRootApi),
  "",
  "### CommandDialog",
  "",
  apiRowsToMarkdownTable(commandDialogApi),
  "",
  "### CommandDialogTrigger",
  "",
  apiRowsToMarkdownTable(commandDialogTriggerApi),
  "",
  "### CommandDialogPopup",
  "",
  apiRowsToMarkdownTable(commandDialogPopupApi),
  "",
  "### CommandInput",
  "",
  apiRowsToMarkdownTable(commandInputApi),
  "",
  "### CommandItem",
  "",
  apiRowsToMarkdownTable(commandItemApi),
  "",
  "### CommandGroup",
  "",
  apiRowsToMarkdownTable(commandGroupApi),
  "",
  "### CommandPanel",
  "",
  apiRowsToMarkdownTable(commandPanelApi),
  "",
  "### CommandFooter",
  "",
  apiRowsToMarkdownTable(commandFooterApi),
].join("\n")

export default function CommandDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Command
          </h1>
          <CopyMarkdownButton markdown={commandMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A searchable command palette. Built on Base UI&apos;s Autocomplete
          primitive for filtering and keyboard navigation, and its Dialog
          primitive when used as a{" "}
          <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          overlay. Can also render standalone with{" "}
          <code className="text-foreground">CommandPanel</code>, without a
          dialog.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Added RTL support",
            "Added a standalone CommandPanel for non-dialog usage",
            "Added CommandFooter for keyboard-hint helpers, hidden on small screens",
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
            preview={<CommandBasicExample />}
            code={
              <CodeBlock code={getExampleSource("command-basic")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/command.json" />
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
                  code={getComponentSource("command")}
                  lang="tsx"
                  title="components/ui/command.tsx"
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
            id="example-panel"
            className="text-sm font-medium text-muted-foreground"
          >
            Standalone panel
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Render commands without a dialog by wrapping{" "}
            <code className="text-foreground">Command</code> in{" "}
            <code className="text-foreground">CommandPanel</code>.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<CommandPanelExample />}
              code={
                <CodeBlock
                  code={getExampleSource("command-panel")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-groups"
            className="text-sm font-medium text-muted-foreground"
          >
            Groups
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<CommandGroupsExample />}
              code={
                <CodeBlock
                  code={getExampleSource("command-groups")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-rtl"
            className="text-sm font-medium text-muted-foreground"
          >
            RTL
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No configuration needed &mdash; nest the command inside a{" "}
            <code className="text-foreground">dir=&quot;rtl&quot;</code>{" "}
            container and everything, including keyboard navigation, mirrors
            automatically.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<CommandRtlExample />}
              code={
                <CodeBlock code={getExampleSource("command-rtl")} lang="tsx" />
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
        <ApiReference title="Command" rows={commandRootApi} />
        <ApiReference title="CommandDialog" rows={commandDialogApi} />
        <ApiReference
          title="CommandDialogTrigger"
          rows={commandDialogTriggerApi}
        />
        <ApiReference
          title="CommandDialogPopup"
          rows={commandDialogPopupApi}
        />
        <ApiReference title="CommandInput" rows={commandInputApi} />
        <ApiReference title="CommandItem" rows={commandItemApi} />
        <ApiReference title="CommandGroup" rows={commandGroupApi} />
        <ApiReference title="CommandPanel" rows={commandPanelApi} />
        <ApiReference title="CommandFooter" rows={commandFooterApi} />

        <DocsPageFooter
          href="/docs/components/command"
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
