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
import { DocsPageFooter } from "@/components/docs-page-footer"
import { ButtonDefaultExample } from "@/components/examples/button-default"
import { ButtonDestructiveExample } from "@/components/examples/button-destructive"
import { ButtonGhostExample } from "@/components/examples/button-ghost"
import { ButtonGroupDemoExample } from "@/components/examples/button-group-demo"
import { ButtonIconExample } from "@/components/examples/button-icon"
import { ButtonLinkExample } from "@/components/examples/button-link"
import { ButtonOutlineExample } from "@/components/examples/button-outline"
import { ButtonRenderExample } from "@/components/examples/button-render"
import { ButtonRoundedExample } from "@/components/examples/button-rounded"
import { ButtonRtlExample } from "@/components/examples/button-rtl"
import { ButtonSecondaryExample } from "@/components/examples/button-secondary"
import { ButtonSizeExample } from "@/components/examples/button-size"
import { ButtonSpinnerExample } from "@/components/examples/button-spinner"
import { ButtonWithIconExample } from "@/components/examples/button-with-icon"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { buttonRootApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/button/page.tsx"

export const metadata: Metadata = {
  title: "Button",
  description: "A button built on Base UI with variant and size support.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "sizes", title: "Sizes" },
  {
    id: "variants",
    title: "Variants",
    children: [
      { id: "variant-outline", title: "Outline" },
      { id: "variant-secondary", title: "Secondary" },
      { id: "variant-ghost", title: "Ghost" },
      { id: "variant-destructive", title: "Destructive" },
      { id: "variant-link", title: "Link" },
    ],
  },
  { id: "icon", title: "Icon" },
  { id: "with-icon", title: "With icon" },
  { id: "rounded", title: "Rounded" },
  { id: "spinner", title: "Spinner" },
  { id: "as-link", title: "As link" },
  { id: "button-group", title: "Button Group" },
  { id: "rtl", title: "RTL" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}`

const buttonMarkdown = [
  "# Button",
  "",
  "A button built on Base UI with variant and size support.",
  "",
  "## Sizes",
  "",
  "Pass `size` to switch between `xs`, `sm`, `default`, and `lg`.",
  "",
  "## Variants",
  "",
  "Pass `variant` to switch between `default`, `outline`, `secondary`, `ghost`, `destructive`, and `link`.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/button.json",
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
  "### Button",
  "",
  apiRowsToMarkdownTable(buttonRootApi),
].join("\n")

export default function ButtonDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Button
          </h1>
          <CopyMarkdownButton markdown={buttonMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays a button, or a component that looks like a button. Built on
          Base UI&apos;s button primitive.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonDefaultExample />}
            code={
              <CodeBlock code={getExampleSource("button-default")} lang="tsx" />
            }
          />
        </div>

        <h2 id="sizes" className="mt-12 text-xl font-semibold tracking-tight">
          Sizes
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pass{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            size
          </code>{" "}
          to change the size of the button.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonSizeExample />}
            code={
              <CodeBlock code={getExampleSource("button-size")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="variants"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Variants
        </h2>

        <div className="mt-4">
          <h3
            id="variant-outline"
            className="text-sm font-medium text-muted-foreground"
          >
            Outline
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonOutlineExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-outline")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="variant-secondary"
            className="text-sm font-medium text-muted-foreground"
          >
            Secondary
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonSecondaryExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-secondary")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="variant-ghost"
            className="text-sm font-medium text-muted-foreground"
          >
            Ghost
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonGhostExample />}
              code={
                <CodeBlock code={getExampleSource("button-ghost")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="variant-destructive"
            className="text-sm font-medium text-muted-foreground"
          >
            Destructive
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonDestructiveExample />}
              code={
                <CodeBlock
                  code={getExampleSource("button-destructive")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="variant-link"
            className="text-sm font-medium text-muted-foreground"
          >
            Link
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<ButtonLinkExample />}
              code={
                <CodeBlock code={getExampleSource("button-link")} lang="tsx" />
              }
            />
          </div>
        </div>

        <h2 id="icon" className="mt-12 text-xl font-semibold tracking-tight">
          Icon
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonIconExample />}
            code={
              <CodeBlock code={getExampleSource("button-icon")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="with-icon"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          With icon
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Add{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            data-icon=&quot;inline-start&quot;
          </code>{" "}
          or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            data-icon=&quot;inline-end&quot;
          </code>{" "}
          to the icon for the correct spacing.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonWithIconExample />}
            code={
              <CodeBlock
                code={getExampleSource("button-with-icon")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rounded" className="mt-12 text-xl font-semibold tracking-tight">
          Rounded
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            rounded-full
          </code>{" "}
          class to make the button rounded.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonRoundedExample />}
            code={
              <CodeBlock code={getExampleSource("button-rounded")} lang="tsx" />
            }
          />
        </div>

        <h2 id="spinner" className="mt-12 text-xl font-semibold tracking-tight">
          Spinner
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Render a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<Spinner />"}
          </code>{" "}
          component inside the button to show a loading state.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonSpinnerExample />}
            code={
              <CodeBlock code={getExampleSource("button-spinner")} lang="tsx" />
            }
          />
        </div>

        <h2 id="as-link" className="mt-12 text-xl font-semibold tracking-tight">
          As link
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            buttonVariants
          </code>{" "}
          helper to make a link look like a button. Base UI&apos;s{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Button
          </code>{" "}
          always applies{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            role=&quot;button&quot;
          </code>
          , which overrides the semantic link role on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<a>"}
          </code>{" "}
          elements — use a plain{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<a>"}
          </code>{" "}
          with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            buttonVariants
          </code>{" "}
          instead.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonRenderExample />}
            code={
              <CodeBlock code={getExampleSource("button-render")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="button-group"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Button Group
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          To create a button group, use the{" "}
          <Link
            href="/docs/components/button-group"
            className="text-foreground underline underline-offset-4"
          >
            ButtonGroup
          </Link>{" "}
          component.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ButtonGroupDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("button-group-demo")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ButtonRtlExample />}
            code={
              <CodeBlock code={getExampleSource("button-rtl")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/button.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium">1. Install the dependencies</p>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react class-variance-authority" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                2. Copy the component source
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  components/ui/button.tsx
                </code>{" "}
                and paste this in.
              </p>
              <div className="mt-2">
                <CodeBlock code={getComponentSource("button")} lang="tsx" />
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

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Button" rows={buttonRootApi} />

        <DocsPageFooter
          href="/docs/components/button"
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
