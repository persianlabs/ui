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
import { DocsPageFooter } from "@/components/docs-page-footer"
import { PersianReshapeDemoExample } from "@/components/examples/persian-reshape-demo"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { getLibSource } from "@/lib/component-source"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/utilities/persian-reshape/page.tsx"

import { persianReshapeApi } from "./api-data"

export const metadata: Metadata = {
  title: "Persian Reshape",
  description:
    "Pre-shapes Persian/Arabic text for Satori/next-og images, which don't shape connected scripts on their own.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "why", title: "Why this exists" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { ImageResponse } from "next/og"
import { reshapePersian } from "@/lib/persian-reshape"

export default function OpengraphImage() {
  return new ImageResponse(
    <div dir="rtl" style={{ display: "flex", fontSize: 48, color: "#fff" }}>
      {reshapePersian("راهنمای خرید")}
    </div>
  )
}`

export const persianReshapeMarkdown = [
  "# Persian Reshape",
  "",
  "Pre-shapes Persian/Arabic text into joined Unicode presentation-form codepoints so it renders correctly in Satori/next-og images, which don't shape connected scripts on their own.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/persian-reshape",
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
  apiRowsToMarkdownTable(persianReshapeApi),
].join("\n")

export default function PersianReshapeDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Persian Reshape
          </h1>
          <CopyMarkdownButton markdown={persianReshapeMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Renderers that don&apos;t perform text shaping themselves — most
          notably Satori, which powers every OG image in this repo via
          Next&apos;s <code>ImageResponse</code> — draw Persian/Arabic letters
          as isolated glyphs instead of joining them into connected script. This
          utility pre-shapes the text into the correct joined codepoints before
          you hand it to <code>ImageResponse</code>, so no runtime shaping is
          required.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Type Persian text above; the left panel simulates how Satori renders
          it untouched (ligatures/joining disabled via CSS — no image is
          actually generated), the right panel shows the same text through{" "}
          <code>reshapePersian</code>.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<PersianReshapeDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("persian-reshape-demo")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="why" className="mt-12 text-xl font-semibold tracking-tight">
          Why this exists
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Satori draws each character as its isolated glyph and never joins
          Arabic/Persian letters, and it doesn&apos;t apply the Unicode Bidi
          Algorithm either — so raw Persian text handed to{" "}
          <code>ImageResponse</code> comes out both disconnected and backwards.{" "}
          <code>reshapePersian</code> fixes both: it selects the correct
          isolated/initial/medial/final presentation-form codepoint for each
          letter based on its neighbors, then reorders the shaped runs so the
          result draws correctly without any further processing. Mixed Persian +
          Latin/digit content (like a hyphenated slug) is preserved correctly —
          only the Persian run is reshaped and reversed, everything else keeps
          its own order.
        </p>

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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/persian-reshape" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getLibSource("persian-reshape")}
                  lang="ts"
                  title="lib/persian-reshape.ts"
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
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="persian-reshape" rows={persianReshapeApi} />

        <DocsPageFooter
          href="/docs/utilities/persian-reshape"
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
