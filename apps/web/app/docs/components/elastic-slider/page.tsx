import type { Metadata } from "next"
import Link from "next/link"
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
import { ElasticSliderDemoExample } from "@/components/examples/elastic-slider-demo"
import { ElasticSliderRtlExample } from "@/components/examples/elastic-slider-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource, getHookSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/elastic-slider/page.tsx"

import { elasticSliderRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Elastic Slider",
  description:
    "Slider with elastic rubber-band drag and magnetic snap feedback.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "range-slider", title: "Range slider" },
  { id: "rtl", title: "RTL" },
  { id: "keyboard", title: "Keyboard" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { ElasticSlider } from "@/components/elastic-slider"

const [opacity, setOpacity] = useState(0.5)

<ElasticSlider
  label="Opacity"
  min={0}
  max={1}
  value={opacity}
  onValueChange={setOpacity}
/>`

const uncontrolledSnippet = `<ElasticSlider label="Opacity" min={0} max={1} defaultValue={0.5} />`

const elasticSliderMarkdown = [
  "# Elastic Slider",
  "",
  "Slider with elastic rubber-band drag and magnetic snap feedback.",
  "",
  "## Features",
  "",
  "- Track stretches with rubber-band tension when dragged past bounds.",
  "- Snaps magnetically to exact steps or continuous deciles.",
  "- Inline label and value text dynamically fade to avoid handle overlap.",
  "- Supports keyboard navigation and respects `prefers-reduced-motion`.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/elastic-slider.json",
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  usageSnippet,
  CODE_FENCE,
  "",
  "Uncontrolled:",
  "",
  `${CODE_FENCE}tsx`,
  uncontrolledSnippet,
  CODE_FENCE,
  "",
  "## API Reference",
  "",
  "### ElasticSlider",
  "",
  apiRowsToMarkdownTable(elasticSliderRootApi),
].join("\n")

export default function ElasticSliderDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Elastic Slider
          </h1>
          <CopyMarkdownButton markdown={elasticSliderMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Slider with elastic rubber-band drag and magnetic snap feedback.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "Josh Puckett — Interface Craft",
              href: "https://www.interfacecraft.dev",
            },
            {
              label: "Chánh Đại — Elastic Slider",
              href: "https://chanhdai.com/components/elastic-slider",
            },
          ]}
          changed
          changes={[
            'Value 0 now maps to the reading start (right edge in RTL) instead of always the physical left, matching a native <input type="range"> in RTL browsers',
            "Arrow key direction follows reading direction: ArrowRight decreases the value in RTL instead of always increasing it",
            "Fill, handle, hash marks, label, and value text use logical start/end positioning instead of left/right",
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
            preview={<ElasticSliderDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("elastic-slider-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/elastic-slider.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="motion" />
              </div>
              <Step>Copy the use-controllable-state hook</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-controllable-state")}
                  lang="tsx"
                  title="hooks/use-controllable-state.ts"
                />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("elastic-slider")}
                  lang="tsx"
                  title="components/ui/elastic-slider.tsx"
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
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Uncontrolled:
        </p>
        <div className="mt-4">
          <CodeBlock code={uncontrolledSnippet} lang="tsx" />
        </div>

        <h2
          id="range-slider"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Range slider
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Need two handles on one track — a min and a max, like a price filter?
          Use{" "}
          <Link
            href="/docs/components/elastic-range-slider"
            className="text-foreground underline underline-offset-4"
          >
            Elastic Range Slider
          </Link>{" "}
          instead.
        </p>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ElasticSliderRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("elastic-slider-rtl")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="keyboard"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Keyboard
        </h2>
        <ApiReference
          title="Keys"
          rows={[
            {
              prop: "ArrowRight / ArrowUp",
              type: "—",
              description:
                "Increase by one step. ArrowRight decreases instead in RTL.",
            },
            {
              prop: "ArrowLeft / ArrowDown",
              type: "—",
              description:
                "Decrease by one step. ArrowLeft increases instead in RTL.",
            },
            {
              prop: "Shift + Arrow",
              type: "—",
              description: "Increase or decrease by step × 10.",
            },
            { prop: "Home", type: "—", description: "Jump to min." },
            { prop: "End", type: "—", description: "Jump to max." },
          ]}
        />

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="ElasticSlider" rows={elasticSliderRootApi} />

        <DocsPageFooter
          href="/docs/components/elastic-slider"
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
