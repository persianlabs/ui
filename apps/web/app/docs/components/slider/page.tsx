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
import { SliderControlledExample } from "@/components/examples/slider-controlled"
import { SliderDemoExample } from "@/components/examples/slider-demo"
import { SliderDisabledExample } from "@/components/examples/slider-disabled"
import { SliderMultipleExample } from "@/components/examples/slider-multiple"
import { SliderRangeExample } from "@/components/examples/slider-range"
import { SliderRtlExample } from "@/components/examples/slider-rtl"
import { SliderVerticalExample } from "@/components/examples/slider-vertical"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/slider/page.tsx"

import { sliderRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Slider",
  description:
    "An input where the user selects a value from within a given range, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "range", title: "Range" },
      { id: "multiple-thumbs", title: "Multiple Thumbs" },
      { id: "vertical", title: "Vertical" },
      { id: "controlled", title: "Controlled" },
      { id: "disabled", title: "Disabled" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Slider } from "@/components/ui/slider"

export function Example() {
  return <Slider defaultValue={[33]} max={100} step={1} />
}`

export const sliderMarkdown = [
  "# Slider",
  "",
  "An input where the user selects a value from within a given range, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/slider.json",
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
  "### Slider",
  "",
  apiRowsToMarkdownTable(sliderRootApi),
].join("\n")

export default function SliderDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Slider
          </h1>
          <CopyMarkdownButton markdown={sliderMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          An input where the user selects a value from within a given range.
          Built on Base UI&apos;s slider primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            { label: "Base UI", href: "https://base-ui.com" },
          ]}
          changed={true}
          changes={[
            "Replaced the translucent bg-muted track fill with bg-primary/20 so the track stays visibly opaque against the page background instead of the near-invisible ~4% overlay bg-muted renders as on its own.",
            "Wrapped the slider in Base UI's own DirectionProvider, fed from the ambient computed dir, for RTL — Base UI's Slider resolves drag and keyboard direction through its own DirectionContext (default ltr), not the DOM dir attribute, so it otherwise drags and responds to arrow keys backwards under an RTL page.",
            "Normalized onValueChange's argument shape for single-thumb array-controlled sliders — Base UI's pointer-drag path reports a bare number instead of number[] in that case (a different internal code path than keyboard input, which gets it right), silently breaking consumers that assume value[0] stays defined while dragging.",
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
            preview={<SliderDemoExample />}
            code={
              <CodeBlock code={getExampleSource("slider-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/slider.json" />
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
                  code={getComponentSource("slider")}
                  lang="tsx"
                  title="components/ui/slider.tsx"
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
          <h3 id="range" className="text-sm font-medium text-muted-foreground">
            Range
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass an array with two values to render a range slider with a start
            and end thumb.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SliderRangeExample />}
              code={
                <CodeBlock code={getExampleSource("slider-range")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="multiple-thumbs"
            className="text-sm font-medium text-muted-foreground"
          >
            Multiple Thumbs
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass an array with more than two values to render additional thumbs.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SliderMultipleExample />}
              code={
                <CodeBlock
                  code={getExampleSource("slider-multiple")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="vertical"
            className="text-sm font-medium text-muted-foreground"
          >
            Vertical
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              orientation=&quot;vertical&quot;
            </code>{" "}
            and give the slider an explicit height.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SliderVerticalExample />}
              code={
                <CodeBlock
                  code={getExampleSource("slider-vertical")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="controlled"
            className="text-sm font-medium text-muted-foreground"
          >
            Controlled
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              value
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              onValueChange
            </code>{" "}
            to control the slider&apos;s value.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<SliderControlledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("slider-controlled")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="disabled"
            className="text-sm font-medium text-muted-foreground"
          >
            Disabled
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<SliderDisabledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("slider-disabled")}
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
              preview={<SliderRtlExample />}
              code={
                <CodeBlock code={getExampleSource("slider-rtl")} lang="tsx" />
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
        <ApiReference title="Slider" rows={sliderRootApi} />

        <DocsPageFooter
          href="/docs/components/slider"
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
