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
import { PasswordInputDemoExample } from "@/components/examples/password-input-demo"
import { PasswordInputRtlExample } from "@/components/examples/password-input-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { passwordInputApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/password-input/page.tsx"

export const metadata: Metadata = {
  title: "Password Input",
  description:
    "A password input with a show/hide toggle that always renders LTR, regardless of the surrounding document direction.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { PasswordInput } from "@/components/ui/password-input"

export function Example() {
  return <PasswordInput autoComplete="current-password" />
}`

export const passwordInputMarkdown = [
  "# Password Input",
  "",
  "A password input with a show/hide toggle that always renders LTR, regardless of the surrounding document direction.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/password-input",
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
  "### PasswordInput",
  "",
  apiRowsToMarkdownTable(passwordInputApi),
].join("\n")

export default function PasswordInputDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Password Input
          </h1>
          <CopyMarkdownButton markdown={passwordInputMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A single-field password input built on{" "}
          <a
            href="/docs/components/input-group"
            className="text-foreground underline underline-offset-4"
          >
            Input Group
          </a>
          , with a show/hide toggle. Passwords are opaque strings, not
          RTL-meaningful text, so the field forces{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dir=&quot;ltr&quot;
          </code>{" "}
          and keeps the toggle button on the same physical side, regardless of
          the surrounding document direction.
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
            preview={<PasswordInputDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("password-input-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/password-input" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the component dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="lucide-react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("password-input")}
                  lang="tsx"
                  title="components/ui/password-input.tsx"
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

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The label and description follow the surrounding RTL layout, while the
          password field and its toggle button stay LTR and keep the eye icon on
          the same physical side.
        </p>
        <div className="mt-3">
          <ComponentPreview
            dir="rtl"
            preview={<PasswordInputRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("password-input-rtl")}
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
        <ApiReference title="PasswordInput" rows={passwordInputApi} />

        <DocsPageFooter
          href="/docs/components/password-input"
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
