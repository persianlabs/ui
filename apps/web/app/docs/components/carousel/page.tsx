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
import { CarouselApiExample } from "@/components/examples/carousel-api"
import { CarouselDemoExample } from "@/components/examples/carousel-demo"
import { CarouselOrientationExample } from "@/components/examples/carousel-orientation"
import { CarouselPluginExample } from "@/components/examples/carousel-plugin"
import { CarouselRtlExample } from "@/components/examples/carousel-rtl"
import { CarouselSizeExample } from "@/components/examples/carousel-size"
import { CarouselSpacingExample } from "@/components/examples/carousel-spacing"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  carouselApi,
  carouselButtonApi,
  carouselContentApi,
  carouselItemApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/carousel/page.tsx"

export const metadata: Metadata = {
  title: "Carousel",
  description: "A carousel with motion and swipe built using Embla.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "sizes", title: "Sizes" },
  { id: "spacing", title: "Spacing" },
  { id: "orientation", title: "Orientation" },
  { id: "api", title: "API & Events" },
  { id: "plugins", title: "Plugins" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`

const optionsSnippet = `<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>`

const apiSnippet = `import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>{/* items */}</CarouselContent>
    </Carousel>
  )
}`

const rtlSnippet = `// Inherits dir from the document automatically.
<Carousel>
  <CarouselContent>{/* items */}</CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// Or pin a direction explicitly:
<Carousel opts={{ direction: "rtl" }}>
  <CarouselContent>{/* items */}</CarouselContent>
  <CarouselPrevious className="rtl:-scale-x-100" />
  <CarouselNext className="rtl:-scale-x-100" />
</Carousel>`

export const carouselMarkdown = [
  "# Carousel",
  "",
  "A carousel with motion and swipe built using Embla.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/carousel",
  "npm install embla-carousel-react",
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
  "### Carousel",
  "",
  apiRowsToMarkdownTable(carouselApi),
].join("\n")

export default function CarouselDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Carousel
          </h1>
          <CopyMarkdownButton markdown={carouselMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A carousel with motion and swipe built using the{" "}
          <a
            href="https://www.embla-carousel.com/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Embla Carousel
          </a>{" "}
          library.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced the multi-icon-library IconPlaceholder abstraction with plain lucide-react chevron icons",
            "Replaced cn-rtl-flip with rtl:-scale-x-100 on the horizontal navigation icons, and the physical -left-12/-right-12 button offsets with logical -start-12/-end-12 so horizontal navigation mirrors in RTL; vertical centering stays physical so the buttons hold their position in RTL",
            "The carousel now inherits the ambient writing direction automatically instead of defaulting to LTR; opts.direction still overrides it",
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
            preview={<CarouselDemoExample />}
            code={
              <CodeBlock code={getExampleSource("carousel-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/carousel" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the following dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="embla-carousel-react" />
              </div>
              <Step>Add the Button dependency the component builds on</Step>
              <div className="mt-2">
                <CopyCommand command="npx shadcn@latest add @persianlabsui/button" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("carousel")}
                  lang="tsx"
                  title="components/ui/carousel.tsx"
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

        <h2 id="sizes" className="mt-12 text-xl font-semibold tracking-tight">
          Sizes
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          To set the size of the items, use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            basis
          </code>{" "}
          utility class on the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &lt;CarouselItem /&gt;
          </code>
          .
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<CarouselSizeExample />}
            code={
              <CodeBlock code={getExampleSource("carousel-size")} lang="tsx" />
            }
          />
        </div>

        <h2 id="spacing" className="mt-12 text-xl font-semibold tracking-tight">
          Spacing
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Set the spacing between items with a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            pl-[VALUE]
          </code>{" "}
          utility on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &lt;CarouselItem /&gt;
          </code>{" "}
          and a negative{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            -ml-[VALUE]
          </code>{" "}
          on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &lt;CarouselContent /&gt;
          </code>
          .
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<CarouselSpacingExample />}
            code={
              <CodeBlock
                code={getExampleSource("carousel-spacing")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="orientation"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Orientation
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            orientation
          </code>{" "}
          prop to set the orientation of the carousel.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<CarouselOrientationExample />}
            code={
              <CodeBlock
                code={getExampleSource("carousel-orientation")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="options" className="mt-12 text-xl font-semibold tracking-tight">
          Options
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pass Embla options through the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            opts
          </code>{" "}
          prop — see{" "}
          <a
            href="https://www.embla-carousel.com/api/options/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Embla&apos;s option list
          </a>
          .
        </p>
        <div className="mt-4">
          <CodeBlock code={optionsSnippet} lang="tsx" />
        </div>

        <h2 id="api" className="mt-12 text-xl font-semibold tracking-tight">
          API &amp; Events
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use a state and the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            setApi
          </code>{" "}
          prop to get an instance of the carousel API, then listen to Embla
          events like{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            select
          </code>{" "}
          on it.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<CarouselApiExample />}
            code={
              <CodeBlock code={getExampleSource("carousel-api")} lang="tsx" />
            }
          />
        </div>
        <div className="mt-4">
          <CodeBlock code={apiSnippet} lang="tsx" />
        </div>

        <h2 id="plugins" className="mt-12 text-xl font-semibold tracking-tight">
          Plugins
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            plugins
          </code>{" "}
          prop to add Embla plugins such as Autoplay.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<CarouselPluginExample />}
            code={
              <CodeBlock
                code={getExampleSource("carousel-plugin")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The carousel inherits the surrounding writing direction automatically,
          so it scrolls the right way under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dir=&quot;rtl&quot;
          </code>{" "}
          with no extra props — and the navigation buttons mirror via logical{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            start/end
          </code>{" "}
          offsets plus{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            rtl:-scale-x-100
          </code>{" "}
          on their chevrons. To pin a direction explicitly regardless of the
          document, pass it through{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            opts
          </code>
          .
        </p>
        <div className="mt-3">
          <ComponentPreview
            dir="rtl"
            preview={<CarouselRtlExample />}
            code={
              <CodeBlock code={getExampleSource("carousel-rtl")} lang="tsx" />
            }
          />
        </div>
        <div className="mt-4">
          <CodeBlock code={rtlSnippet} lang="tsx" />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Carousel" rows={carouselApi} />
        <ApiReference title="CarouselContent" rows={carouselContentApi} />
        <ApiReference title="CarouselItem" rows={carouselItemApi} />
        <ApiReference
          title="CarouselPrevious / CarouselNext"
          rows={carouselButtonApi}
        />

        <DocsPageFooter
          href="/docs/components/carousel"
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
