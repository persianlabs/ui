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
import { ElasticSliderPriceRangeExample } from "@/components/examples/elastic-slider-price-range"
import { ElasticSliderRangePercentExample } from "@/components/examples/elastic-slider-range-percent"
import { ElasticSliderRangeTomanExample } from "@/components/examples/elastic-slider-range-toman"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource, getHookSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/elastic-range-slider/page.tsx"

import { elasticRangeSliderRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Elastic Range Slider",
  description:
    "A single-track, dual-thumb range slider in the same visual language as Elastic Slider.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "toman", title: "Toman price range" },
  { id: "percent", title: "Percent range" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { ElasticRangeSlider } from "@/components/elastic-range-slider"

const [range, setRange] = useState<[number, number]>([200, 700])

<ElasticRangeSlider
  label="Price"
  min={0}
  max={1000}
  step={10}
  value={range}
  onValueChange={setRange}
  formatValue={(v) => \`$\${v}\`}
/>`

export const elasticRangeSliderMarkdown = [
  "# Elastic Range Slider",
  "",
  "A single-track, dual-thumb range slider in the same visual language as Elastic Slider.",
  "",
  "Each thumb clamps against the other, so the minimum can never be dragged past the maximum or vice versa.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/elastic-range-slider.json",
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
  "### ElasticRangeSlider",
  "",
  apiRowsToMarkdownTable(elasticRangeSliderRootApi),
].join("\n")

export default function ElasticRangeSliderDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Elastic Range Slider
          </h1>
          <CopyMarkdownButton markdown={elasticRangeSliderMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A single-track, dual-thumb range slider — a min and a max handle
          sharing one track, for things like price filters. Built in the same
          visual language as{" "}
          <Link
            href="/docs/components/elastic-slider"
            className="text-foreground underline underline-offset-4"
          >
            Elastic Slider
          </Link>
          .
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
            "New component, not part of the original Elastic Slider — extracted from a single-value slider into its own dual-thumb primitive, with the same spring-animated drag, rubber-band overshoot, and step-snap on release",
            "Positioning stays physically left-to-right in both LTR and RTL — the left handle always controls the left edge and the right handle always controls the right edge, so drag direction never flips under RTL",
            "Each thumb clamps a step short of the other's current value, so min and max can never meet, cross, or collapse to a single point",
            "Same hover/active decile hash marks as Elastic Slider, positioned physically so they line up with the track regardless of direction",
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
            preview={<ElasticSliderPriceRangeExample />}
            code={
              <CodeBlock
                code={getExampleSource("elastic-slider-price-range")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/elastic-range-slider.json" />
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
                  code={getComponentSource("elastic-range-slider")}
                  lang="tsx"
                  title="components/ui/elastic-range-slider.tsx"
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

        <h2 id="toman" className="mt-12 text-xl font-semibold tracking-tight">
          Toman price range
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A Persian-market pattern: Toman pricing with Persian digits, and the
          selected range spelled out below the track as{" "}
          <span dir="rtl">از … تومان</span> / <span dir="rtl">تا … تومان</span>.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ElasticSliderRangeTomanExample />}
            code={
              <CodeBlock
                code={getExampleSource("elastic-slider-range-toman")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="percent" className="mt-12 text-xl font-semibold tracking-tight">
          Percent range
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<ElasticSliderRangePercentExample />}
            code={
              <CodeBlock
                code={getExampleSource("elastic-slider-range-percent")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference
          title="ElasticRangeSlider"
          rows={elasticRangeSliderRootApi}
        />

        <DocsPageFooter
          href="/docs/components/elastic-range-slider"
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
