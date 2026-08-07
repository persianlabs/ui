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
import { BreadcrumbBasicExample } from "@/components/examples/breadcrumb-basic"
import { BreadcrumbCityExample } from "@/components/examples/breadcrumb-city"
import { BreadcrumbDropdownExample } from "@/components/examples/breadcrumb-dropdown"
import { BreadcrumbEllipsisExample } from "@/components/examples/breadcrumb-ellipsis"
import { BreadcrumbLinkExample } from "@/components/examples/breadcrumb-link"
import { BreadcrumbRtlExample } from "@/components/examples/breadcrumb-rtl"
import { BreadcrumbSeparatorExample } from "@/components/examples/breadcrumb-separator"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/breadcrumb/page.tsx"

import { breadcrumbLinkApi, breadcrumbSeparatorApi } from "./api-data"

export const metadata: Metadata = {
  title: "Breadcrumb",
  description:
    "Displays the path to the current resource using a hierarchy of links.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "example-separator", title: "Custom separator" },
      { id: "example-dropdown", title: "Dropdown" },
      { id: "example-ellipsis", title: "Collapsed" },
      { id: "example-link", title: "Link component" },
    ],
  },
  { id: "rtl", title: "RTL" },
  { id: "city", title: "Province & city" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

const breadcrumbMarkdown = [
  "# Breadcrumb",
  "",
  "Displays the path to the current resource using a hierarchy of links.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/breadcrumb.json",
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
  "### BreadcrumbLink",
  "",
  apiRowsToMarkdownTable(breadcrumbLinkApi),
  "",
  "### BreadcrumbSeparator",
  "",
  apiRowsToMarkdownTable(breadcrumbSeparatorApi),
].join("\n")

export default function BreadcrumbDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Breadcrumb
          </h1>
          <CopyMarkdownButton markdown={breadcrumbMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays the path to the current resource using a hierarchy of
          links.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "The default separator icon and its RTL mirroring now flip automatically based on the ambient text direction",
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
            preview={<BreadcrumbBasicExample />}
            code={
              <CodeBlock
                code={getExampleSource("breadcrumb-basic")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/breadcrumb.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react lucide-react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("breadcrumb")}
                  lang="tsx"
                  title="components/ui/breadcrumb.tsx"
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
            id="example-separator"
            className="text-sm font-medium text-muted-foreground"
          >
            Custom separator
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              children
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              BreadcrumbSeparator
            </code>{" "}
            to use a custom separator.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BreadcrumbSeparatorExample />}
              code={
                <CodeBlock
                  code={getExampleSource("breadcrumb-separator")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-dropdown"
            className="text-sm font-medium text-muted-foreground"
          >
            Dropdown
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Compose{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              BreadcrumbItem
            </code>{" "}
            with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              DropdownMenu
            </code>{" "}
            to create a dropdown in the breadcrumb.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BreadcrumbDropdownExample />}
              code={
                <CodeBlock
                  code={getExampleSource("breadcrumb-dropdown")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-ellipsis"
            className="text-sm font-medium text-muted-foreground"
          >
            Collapsed
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              BreadcrumbEllipsis
            </code>{" "}
            to show a collapsed state when the breadcrumb is too long.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BreadcrumbEllipsisExample />}
              code={
                <CodeBlock
                  code={getExampleSource("breadcrumb-ellipsis")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="example-link"
            className="text-sm font-medium text-muted-foreground"
          >
            Link component
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              render
            </code>{" "}
            prop on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              BreadcrumbLink
            </code>{" "}
            to use a custom link component from your routing library.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<BreadcrumbLinkExample />}
              code={
                <CodeBlock
                  code={getExampleSource("breadcrumb-link")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<BreadcrumbRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("breadcrumb-rtl")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="city" className="mt-12 text-xl font-semibold tracking-tight">
          Province &amp; city
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A Persian navigation pattern pairing well with{" "}
          <a
            href="/docs/components/city-selector"
            className="text-foreground underline underline-offset-4"
          >
            City Selector
          </a>
          : country, province, and city as breadcrumb levels.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<BreadcrumbCityExample />}
            code={
              <CodeBlock
                code={getExampleSource("breadcrumb-city")}
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
        <ApiReference title="BreadcrumbLink" rows={breadcrumbLinkApi} />
        <ApiReference
          title="BreadcrumbSeparator"
          rows={breadcrumbSeparatorApi}
        />

        <DocsPageFooter
          href="/docs/components/breadcrumb"
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
