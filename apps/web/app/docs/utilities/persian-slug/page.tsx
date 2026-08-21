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
import { PersianSlugDemoExample } from "@/components/examples/persian-slug-demo"
import { PersianSlugRtlExample } from "@/components/examples/persian-slug-rtl"
import { PersianSlugTransliterateExample } from "@/components/examples/persian-slug-transliterate"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { getLibSource } from "@/lib/component-source"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { persianSlugApi, persianSlugOptionsApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/persian-slug/page.tsx"

export const metadata: Metadata = {
  title: "Persian Slug",
  description:
    "Converts Persian/mixed Persian+English text into a URL-safe slug, keeping Persian script by default or transliterating to Latin/ASCII.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "transliterate", title: "Transliterate" }],
  },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { toPersianSlug, toLatinSlug } from "@/lib/persian-slug"

toPersianSlug("راهنمای خرید گوشی موبایل")
// "راهنمای-خرید-گوشی-موبایل"

toPersianSlug("بهترین لپ‌تاپ های Gaming 2024")
// "بهترین-لپتاپ-های-gaming-2024"

toLatinSlug("سلام دنیا")
// "slam-dnya"`

export const persianSlugMarkdown = [
  "# Persian Slug",
  "",
  "Converts Persian/mixed Persian+English text into a URL-safe slug, keeping Persian script by default or transliterating to Latin/ASCII.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/persian-slug",
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
  apiRowsToMarkdownTable(persianSlugApi),
  "",
  "### PersianSlugOptions",
  "",
  apiRowsToMarkdownTable(persianSlugOptionsApi),
].join("\n")

export default function PersianSlugDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Persian Slug
          </h1>
          <CopyMarkdownButton markdown={persianSlugMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Converts Farsi/Persian (or mixed Persian+English) text into a URL-safe
          slug, e.g. for blog post or product URLs. By default, Persian
          characters are kept as-is rather than transliterated to Latin —
          percent-encoded Persian slugs are common and SEO-accepted on Iranian
          sites, and a forced transliteration produces awkward Latin
          approximations. Pass{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"{ transliterate: true }"}
          </code>{" "}
          for a fully Latin/ASCII slug instead.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Type a Persian title above; the generated slug updates below as you
          type.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<PersianSlugDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("persian-slug-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/persian-slug" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Copy the source into your project</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getLibSource("persian-slug")}
                  lang="ts"
                  title="lib/persian-slug.ts"
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
            id="transliterate"
            className="text-sm font-medium text-muted-foreground"
          >
            Transliterate
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass <code>{"{ transliterate: true }"}</code> (or use{" "}
            <code>toLatinSlug</code>) to romanize Persian letters into a fully
            Latin/ASCII slug instead of keeping the Persian script.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<PersianSlugTransliterateExample />}
              code={
                <CodeBlock
                  code={getExampleSource("persian-slug-transliterate")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Generated slugs read naturally alongside right-to-left Persian
          content, since the default mode keeps the Persian script rather than
          replacing it with Latin approximations.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<PersianSlugRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("persian-slug-rtl")}
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
        <ApiReference title="persian-slug" rows={persianSlugApi} />
        <ApiReference title="PersianSlugOptions" rows={persianSlugOptionsApi} />

        <DocsPageFooter
          href="/docs/utilities/persian-slug"
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
