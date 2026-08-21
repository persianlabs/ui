import type { Metadata } from "next"
import type * as React from "react"
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
import { HitboxDebugExample } from "@/components/examples/hitbox-debug"
import { HitboxDemoExample } from "@/components/examples/hitbox-demo"
import { HitboxPositionsExample } from "@/components/examples/hitbox-positions"
import { HitboxRadiiExample } from "@/components/examples/hitbox-radii"
import { HitboxSizesExample } from "@/components/examples/hitbox-sizes"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { hitboxApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/hitbox/page.tsx"

export const metadata: Metadata = {
  title: "Hitbox",
  description:
    "Extends the clickable area of a child element for improved accessibility.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "layout", title: "Layout" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "sizes", title: "Sizes" },
      { id: "positions", title: "Positions" },
      { id: "radii", title: "Radii" },
      { id: "debug", title: "Debug mode" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Hitbox } from "@/components/ui/hitbox"

<Hitbox>
  <Button />
</Hitbox>`

const installCommand = "npx shadcn@latest add @persianlabsui/hitbox"

export const hitboxMarkdown = [
  "# Hitbox",
  "",
  "Extends the clickable area of a child element for improved accessibility.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  installCommand,
  CODE_FENCE,
  "",
  "## Layout",
  "",
  `${CODE_FENCE}tsx`,
  usageSnippet,
  CODE_FENCE,
  "",
  "## API Reference",
  "",
  "### Hitbox",
  "",
  apiRowsToMarkdownTable(hitboxApi),
].join("\n")

export default function HitboxPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Hitbox
          </h1>
          <CopyMarkdownButton markdown={hitboxMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Wrap an interactive element to extend its clickable area without
          changing its visible size.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "Dice UI", href: "https://diceui.com/" }]}
          changed={false}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Hitbox preserves the child&apos;s semantics while adding an invisible
          touch target around it. Use its size, position, radius, and debug
          props to control the extended area.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<HitboxDemoExample />}
            code={
              <CodeBlock code={getExampleSource("hitbox-demo")} lang="tsx" />
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
            <CopyCommand command={installCommand} />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="class-variance-authority" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("hitbox")}
                  lang="tsx"
                  title="components/ui/hitbox.tsx"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="layout" className="mt-12 text-xl font-semibold tracking-tight">
          Layout
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Import Hitbox and wrap it around any interactive element.
        </p>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <ExampleSection
          id="sizes"
          title="Sizes"
          description="Control how far the hitbox extends. Use sm, default, lg, or a custom CSS value."
          preview={<HitboxSizesExample />}
          source="hitbox-sizes"
        />
        <ExampleSection
          id="positions"
          title="Positions"
          description="Limit the extended hitbox to one or more sides of the element."
          preview={<HitboxPositionsExample />}
          source="hitbox-positions"
        />
        <ExampleSection
          id="radii"
          title="Radii"
          description="Match the extended area to the child’s corner radius."
          preview={<HitboxRadiiExample />}
          source="hitbox-radii"
        />
        <ExampleSection
          id="debug"
          title="Debug mode"
          description="Enable debug to visualize the normally invisible hitbox while developing."
          preview={<HitboxDebugExample />}
          source="hitbox-debug"
        />

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Hitbox" rows={hitboxApi} />

        <DocsPageFooter
          href="/docs/utilities/hitbox"
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

function ExampleSection({
  id,
  title,
  description,
  preview,
  source,
}: {
  id: string
  title: string
  description: string
  preview: React.ReactNode
  source: string
}) {
  return (
    <div className="mt-8">
      <h3 id={id} className="text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-3">
        <ComponentPreview
          preview={preview}
          code={<CodeBlock code={getExampleSource(source)} lang="tsx" />}
        />
      </div>
    </div>
  )
}
