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
import { DropdownMenuCheckboxesExample } from "@/components/examples/dropdown-menu-checkboxes"
import { DropdownMenuDemoExample } from "@/components/examples/dropdown-menu-demo"
import { DropdownMenuRtlExample } from "@/components/examples/dropdown-menu-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/dropdown-menu/page.tsx"

import {
  dropdownMenuCheckboxItemApi,
  dropdownMenuContentApi,
  dropdownMenuItemApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description: "Displays a menu of actions or options, triggered by a button.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "checkboxes", title: "Checkboxes" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`

export const dropdownMenuMarkdown = [
  "# Dropdown Menu",
  "",
  "Displays a menu of actions or options, triggered by a button.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/dropdown-menu.json",
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
  "### DropdownMenuContent",
  "",
  apiRowsToMarkdownTable(dropdownMenuContentApi),
  "",
  "### DropdownMenuItem",
  "",
  apiRowsToMarkdownTable(dropdownMenuItemApi),
  "",
  "### DropdownMenuCheckboxItem",
  "",
  apiRowsToMarkdownTable(dropdownMenuCheckboxItemApi),
].join("\n")

export default function DropdownMenuDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Dropdown Menu
          </h1>
          <CopyMarkdownButton markdown={dropdownMenuMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays a menu of actions or options, triggered by a button.
          Built on Base UI&apos;s menu primitive.
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
            preview={<DropdownMenuDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("dropdown-menu-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/dropdown-menu.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react lucide-react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("dropdown-menu")}
                  lang="tsx"
                  title="components/ui/dropdown-menu.tsx"
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
            id="checkboxes"
            className="text-sm font-medium text-muted-foreground"
          >
            Checkboxes
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<DropdownMenuCheckboxesExample />}
              code={
                <CodeBlock
                  code={getExampleSource("dropdown-menu-checkboxes")}
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
              preview={<DropdownMenuRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("dropdown-menu-rtl")}
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
        <ApiReference title="DropdownMenuContent" rows={dropdownMenuContentApi} />
        <ApiReference title="DropdownMenuItem" rows={dropdownMenuItemApi} />
        <ApiReference
          title="DropdownMenuCheckboxItem"
          rows={dropdownMenuCheckboxItemApi}
        />

        <DocsPageFooter
          href="/docs/components/dropdown-menu"
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
