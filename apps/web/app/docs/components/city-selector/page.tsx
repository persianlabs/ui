import type { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { CitySelectorBasicExample } from "@/components/examples/city-selector-basic"
import { CitySelectorControlledExample } from "@/components/examples/city-selector-controlled"
import { CitySelectorControlledFaExample } from "@/components/examples/city-selector-controlled-fa"
import { CitySelectorCustomExample } from "@/components/examples/city-selector-custom"
import { CitySelectorFormExample } from "@/components/examples/city-selector-form"
import { CitySelectorLocaleExample } from "@/components/examples/city-selector-locale"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { InstallCommand } from "@/components/install-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource, getLibSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/city-selector/page.tsx"

import {
  citySelectorApi,
  citySelectorCityApi,
  citySelectorProvinceApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "City Selector",
  description:
    "A province and city picker for Iran, built on Combobox and bundled with a full dataset of all 31 provinces and 1,119 cities.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "example-controlled", title: "Controlled (English)" },
      { id: "example-controlled-fa", title: "Controlled (Persian)" },
      { id: "example-locale", title: "Locale" },
      { id: "example-custom", title: "Custom layout" },
      { id: "example-form", title: "Form" },
    ],
  },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { CitySelector } from "@/components/ui/city-selector"

export function Example() {
  return <CitySelector />
}`

const composedUsageSnippet = `import { Label } from "@/components/ui/label"
import {
  CitySelector,
  CitySelectorCity,
  CitySelectorProvince,
} from "@/components/ui/city-selector"

export function Example() {
  return (
    <CitySelector locale="en" className="flex-col gap-4 sm:flex-col">
      <div className="flex flex-col gap-1.5">
        <Label>Province</Label>
        <CitySelectorProvince placeholder="Choose a province…" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>City</Label>
        <CitySelectorCity placeholder="Choose a city…" />
      </div>
    </CitySelector>
  )
}`

const citySelectorMarkdown = [
  "# City Selector",
  "",
  "A province and city picker for Iran, built on Combobox and bundled with a full dataset of all 31 provinces and 1,119 cities.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/city-selector.json",
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  usageSnippet,
  CODE_FENCE,
  "",
  "Or compose the parts yourself for full control:",
  "",
  `${CODE_FENCE}tsx`,
  composedUsageSnippet,
  CODE_FENCE,
  "",
  "## API Reference",
  "",
  "### CitySelector",
  "",
  apiRowsToMarkdownTable(citySelectorApi),
  "",
  "### CitySelectorProvince",
  "",
  apiRowsToMarkdownTable(citySelectorProvinceApi),
  "",
  "### CitySelectorCity",
  "",
  apiRowsToMarkdownTable(citySelectorCityApi),
].join("\n")

export default function CitySelectorDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  const provincesSource = getLibSource("persian-provinces")
  const provincesLines = provincesSource.split("\n")
  const provincesHead = provincesLines.slice(0, 100).join("\n")

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            City Selector
          </h1>
          <CopyMarkdownButton markdown={citySelectorMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A ready-made province and city picker for Iran. Built on{" "}
          <a
            href="/docs/components/combobox"
            className="text-foreground underline underline-offset-4"
          >
            Combobox
          </a>
          , and bundled with all 31 provinces and 1,119 cities — the city field
          stays disabled until a province is chosen, and both are searchable.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            {
              label: "mahdi-eth/Iran-Cities-Data",
              href: "https://github.com/mahdi-eth/Iran-Cities-Data/blob/main/JSON/cities.json",
            },
          ]}
          changed
          changes={[
            "Combined shadcn's Combobox with Persian/English city data from Iran-Cities-Data",
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
            preview={<CitySelectorBasicExample />}
            code={
              <CodeBlock
                code={getExampleSource("city-selector-basic")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="examples"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="mt-4">
          <h3
            id="example-controlled"
            className="text-sm font-medium text-muted-foreground"
          >
            Controlled (English)
          </h3>
          <div className="mt-3">
            <ComponentPreview
              dir="ltr"
              preview={<CitySelectorControlledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("city-selector-controlled")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-controlled-fa"
            className="text-sm font-medium text-muted-foreground"
          >
            Controlled (Persian)
          </h3>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<CitySelectorControlledFaExample />}
              code={
                <CodeBlock
                  code={getExampleSource("city-selector-controlled-fa")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-locale"
            className="text-sm font-medium text-muted-foreground"
          >
            Locale
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            By default, labels follow the document&apos;s text direction —
            Persian in RTL, English in LTR. Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              locale
            </code>{" "}
            to force one regardless of direction — it flips the text direction
            of the picker too.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<CitySelectorLocaleExample />}
              code={
                <CodeBlock
                  code={getExampleSource("city-selector-locale")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-custom"
            className="text-sm font-medium text-muted-foreground"
          >
            Custom layout
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Compose{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              CitySelectorProvince
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              CitySelectorCity
            </code>{" "}
            yourself as children of{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              CitySelector
            </code>{" "}
            for full control over layout, labels, and placeholders.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="ltr"
              preview={<CitySelectorCustomExample />}
              code={
                <CodeBlock
                  code={getExampleSource("city-selector-custom")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-form"
            className="text-sm font-medium text-muted-foreground"
          >
            Form
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            CitySelector is a plain controlled component — its{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              value
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              onValueChange
            </code>{" "}
            pair binds directly into any state or validator, no adapter needed.
            Here it&apos;s validated with Zod alongside a plain text field.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="ltr"
              preview={<CitySelectorFormExample />}
              code={
                <CodeBlock
                  code={getExampleSource("city-selector-form")}
                  lang="tsx"
                />
              }
            />
          </div>
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/city-selector.json" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This also installs{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                components/ui/combobox.tsx
              </code>{" "}
              and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                lib/persian-provinces.ts
              </code>
              , the bundled provinces and cities dataset.
            </p>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium">1. Install the dependencies</p>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                2. Add the provinces & cities data
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  lib/persian-provinces.ts
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock
                  code={provincesHead}
                  copyText={provincesSource}
                  lang="tsx"
                />
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Showing the first 100 of {provincesLines.length} lines —
                  truncated for performance. Use the copy button above to get
                  the full file.
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">3. Copy the Combobox source</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  components/ui/combobox.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock code={getComponentSource("combobox")} lang="tsx" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                4. Copy the City Selector source
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  components/ui/city-selector.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("city-selector")}
                  lang="tsx"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Or compose the parts yourself for full control over layout, labels,
          and placeholders:
        </p>
        <div className="mt-4">
          <CodeBlock code={composedUsageSnippet} lang="tsx" />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="CitySelector" rows={citySelectorApi} />
        <ApiReference
          title="CitySelectorProvince"
          rows={citySelectorProvinceApi}
        />
        <ApiReference title="CitySelectorCity" rows={citySelectorCityApi} />

        <DocsPageFooter
          href="/docs/components/city-selector"
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
