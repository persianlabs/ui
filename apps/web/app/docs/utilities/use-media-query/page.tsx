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
import { UseMediaQueryBreakpointsExample } from "@/components/examples/use-media-query-breakpoints"
import { UseMediaQueryDemoExample } from "@/components/examples/use-media-query-demo"
import { UseMediaQueryDeviceExample } from "@/components/examples/use-media-query-device"
import { UseMediaQueryRangesExample } from "@/components/examples/use-media-query-ranges"
import { UseMediaQueryRtlExample } from "@/components/examples/use-media-query-rtl"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getHookSource } from "@/lib/component-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { breakpoints, useMediaQueryApi, mediaQueryInputApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/use-media-query/page.tsx"

export const metadata: Metadata = {
  title: "useMediaQuery",
  description: "Reactive media query hook with Tailwind-like syntax.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "breakpoints", title: "Breakpoints" },
      { id: "ranges", title: "Ranges" },
      { id: "device", title: "Device & preferences" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const breakpointShorthandSnippet = `import { useMediaQuery } from "@/hooks/use-media-query"

// Min-width (breakpoint and above) — like md:
const isDesktop = useMediaQuery("md")

// Max-width (below breakpoint) — like max-md:
const isMobile = useMediaQuery("max-md")

// Range (between two breakpoints) — like md:max-lg:
const isTablet = useMediaQuery("md:max-lg")`

const objectApiSnippet = `// Touch device detection
const isTouch = useMediaQuery({ pointer: "coarse" })

// Breakpoint + pointer combined
const isMobileTouch = useMediaQuery({ max: "md", pointer: "coarse" })

// Custom pixel values
const isNarrow = useMediaQuery({ max: 600 })`

const rawQuerySnippet = `const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")`

const conditionalSnippet = `function Layout() {
  const isDesktop = useMediaQuery("lg")

  return isDesktop ? <DesktopNav /> : <MobileNav />
}`

export const useMediaQueryMarkdown = [
  "# useMediaQuery",
  "",
  "Reactive media query hook with Tailwind-like syntax. Subscribes to a CSS media query and returns whether it matches, built on `useSyncExternalStore` for SSR safety and concurrent mode compatibility.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/use-media-query.json",
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  breakpointShorthandSnippet,
  CODE_FENCE,
  "",
  `${CODE_FENCE}tsx`,
  objectApiSnippet,
  CODE_FENCE,
  "",
  `${CODE_FENCE}tsx`,
  rawQuerySnippet,
  CODE_FENCE,
  "",
  "## Breakpoints",
  "",
  "| Name | Value |",
  "| --- | --- |",
  ...breakpoints.map((bp) => `| \`${bp.name}\` | ${bp.value} |`),
  "",
  "## API Reference",
  "",
  "### useMediaQuery(query)",
  "",
  apiRowsToMarkdownTable(useMediaQueryApi),
  "",
  "### MediaQueryInput",
  "",
  apiRowsToMarkdownTable(mediaQueryInputApi),
].join("\n")

export default function UseMediaQueryDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            useMediaQuery
          </h1>
          <CopyMarkdownButton markdown={useMediaQueryMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A hook that subscribes to a CSS media query and returns whether it
          matches, with Tailwind-style breakpoint shorthand (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &quot;md&quot;
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &quot;max-md&quot;
          </code>
          ) instead of hand-written CSS query strings. Built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            useSyncExternalStore
          </code>{" "}
          for SSR safety and concurrent mode compatibility. Powers{" "}
          <a
            href="/docs/components/responsive-dialog"
            className="text-foreground underline underline-offset-4"
          >
            Responsive Dialog
          </a>
          ,{" "}
          <a
            href="/docs/components/responsive-menu"
            className="text-foreground underline underline-offset-4"
          >
            Responsive Menu
          </a>
          , and{" "}
          <a
            href="/docs/components/responsive-alert-dialog"
            className="text-foreground underline underline-offset-4"
          >
            Responsive Alert Dialog
          </a>
          .
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "coss ui",
              href: "https://coss.com/ui/docs/hooks/use-media-query",
            },
          ]}
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
            preview={<UseMediaQueryDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("use-media-query-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/use-media-query.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getHookSource("use-media-query")}
                  lang="ts"
                  title="hooks/use-media-query.ts"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use Tailwind variant syntax to match breakpoints — TypeScript provides
          full autocomplete.
        </p>
        <div className="mt-4">
          <CodeBlock code={breakpointShorthandSnippet} lang="tsx" />
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Use the object form when you need pointer detection or custom pixel
          values.
        </p>
        <div className="mt-4">
          <CodeBlock code={objectApiSnippet} lang="tsx" />
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Pass any valid CSS media query string as an escape hatch.
        </p>
        <div className="mt-4">
          <CodeBlock code={rawQuerySnippet} lang="tsx" />
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          The primary use case — mount one component instead of another based on
          viewport.
        </p>
        <div className="mt-4">
          <CodeBlock code={conditionalSnippet} lang="tsx" />
        </div>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          The hook includes a static breakpoint map that must match your
          Tailwind config. If you override breakpoints in your Tailwind CSS{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            @theme
          </code>
          , update the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            BREAKPOINTS
          </code>{" "}
          constant in the hook to match.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-2 font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-2 font-medium text-muted-foreground">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {breakpoints.map((bp) => (
                <tr key={bp.name}>
                  <td className="px-4 py-2.5 font-mono text-foreground">
                    {bp.name}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {bp.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="mt-8">
          <h3
            id="breakpoints"
            className="text-sm font-medium text-muted-foreground"
          >
            Breakpoints
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Min-width — resize the viewport to see values update live.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<UseMediaQueryBreakpointsExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-media-query-breakpoints")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="ranges" className="text-sm font-medium text-muted-foreground">
            Ranges
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Matches only between two breakpoints.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<UseMediaQueryRangesExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-media-query-ranges")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="device" className="text-sm font-medium text-muted-foreground">
            Device & preferences
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pointer type and raw preference queries.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<UseMediaQueryDeviceExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-media-query-device")}
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
              preview={<UseMediaQueryRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("use-media-query-rtl")}
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
        <ApiReference title="useMediaQuery(query)" rows={useMediaQueryApi} />
        <ApiReference title="MediaQueryInput" rows={mediaQueryInputApi} />

        <DocsPageFooter
          href="/docs/utilities/use-media-query"
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
