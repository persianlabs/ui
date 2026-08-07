import type { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { ComboboxBasicExample } from "@/components/examples/combobox-basic"
import { ComboboxClearExample } from "@/components/examples/combobox-clear"
import { ComboboxDisabledExample } from "@/components/examples/combobox-disabled"
import { ComboboxGroupsExample } from "@/components/examples/combobox-groups"
import { ComboboxMultipleExample } from "@/components/examples/combobox-multiple"
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

const SOURCE_PATH = "apps/web/app/docs/components/combobox/page.tsx"

import {
  comboboxContentApi,
  comboboxInputApi,
  comboboxItemApi,
  comboboxRootApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Combobox",
  description: "A searchable, accessible combobox built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "example-multiple", title: "Multiple selection" },
      { id: "example-groups", title: "Groups" },
      { id: "example-clear", title: "Clear button" },
      { id: "example-disabled", title: "Disabled" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function Example() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInputGroup>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxIcon />
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`

const comboboxMarkdown = [
  "# Combobox",
  "",
  "A searchable, accessible combobox built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/combobox.json",
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
  "### Combobox",
  "",
  apiRowsToMarkdownTable(comboboxRootApi),
  "",
  "### ComboboxInput",
  "",
  apiRowsToMarkdownTable(comboboxInputApi),
  "",
  "### ComboboxItem",
  "",
  apiRowsToMarkdownTable(comboboxItemApi),
  "",
  "### ComboboxContent",
  "",
  apiRowsToMarkdownTable(comboboxContentApi),
].join("\n")

export default function ComboboxDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Combobox
          </h1>
          <CopyMarkdownButton markdown={comboboxMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          An input that filters a list of options as you type. Built on Base
          UI&apos;s combobox primitive, so filtering, keyboard navigation, and
          ARIA wiring come for free. Looking for a ready-made province & city
          picker? See{" "}
          <a
            href="/docs/components/city-selector"
            className="text-foreground underline underline-offset-4"
          >
            City Selector
          </a>
          .
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={["Improved RTL support"]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<ComboboxBasicExample />}
            code={
              <CodeBlock code={getExampleSource("combobox-basic")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/combobox.json" />
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
                  code={getComponentSource("combobox")}
                  lang="tsx"
                  title="components/ui/combobox.tsx"
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
            id="example-multiple"
            className="text-sm font-medium text-muted-foreground"
          >
            Multiple selection
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ComboboxMultipleExample />}
              code={
                <CodeBlock
                  code={getExampleSource("combobox-multiple")}
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
              preview={<ComboboxGroupsExample />}
              code={
                <CodeBlock
                  code={getExampleSource("combobox-groups")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-clear"
            className="text-sm font-medium text-muted-foreground"
          >
            Clear button
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ComboboxClearExample />}
              code={
                <CodeBlock
                  code={getExampleSource("combobox-clear")}
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
          <div className="mt-3">
            <ComponentPreview
              preview={<ComboboxDisabledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("combobox-disabled")}
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
        <ApiReference title="Combobox" rows={comboboxRootApi} />
        <ApiReference title="ComboboxInput" rows={comboboxInputApi} />
        <ApiReference title="ComboboxItem" rows={comboboxItemApi} />
        <ApiReference title="ComboboxContent" rows={comboboxContentApi} />

        <DocsPageFooter
          href="/docs/components/combobox"
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
