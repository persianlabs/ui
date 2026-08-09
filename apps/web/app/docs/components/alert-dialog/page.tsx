import type { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { AlertDialogDemoExample } from "@/components/examples/alert-dialog-demo"
import { AlertDialogNoFooterExample } from "@/components/examples/alert-dialog-no-footer"
import { AlertDialogRtlExample } from "@/components/examples/alert-dialog-rtl"
import { ApiReference } from "@/components/api-reference"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/alert-dialog/page.tsx"

import { alertDialogContentApi, alertDialogRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Alert Dialog",
  description:
    "A modal dialog that interrupts the user with important content and expects a response, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "no-footer", title: "No footer" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "rtl", title: "RTL" }],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline">Delete</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`

export const alertDialogMarkdown = [
  "# Alert Dialog",
  "",
  "A modal dialog that interrupts the user with important content and expects a response, built on Base UI.",
  "",
  "Unlike Dialog, it can only be closed via `AlertDialogAction` or `AlertDialogCancel` — not by pressing Escape or clicking outside.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/alert-dialog.json",
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
  "### AlertDialog",
  "",
  apiRowsToMarkdownTable(alertDialogRootApi),
  "",
  "### AlertDialogContent",
  "",
  apiRowsToMarkdownTable(alertDialogContentApi),
].join("\n")

export default function AlertDialogDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Alert Dialog
          </h1>
          <CopyMarkdownButton markdown={alertDialogMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A modal dialog that interrupts the user with important content and
          expects a response. Built on Base UI&apos;s alert dialog primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "AlertDialogTrigger measures the ambient direction where it renders and passes it to the portaled popup",
            "Fixes the classic RTL centering bug: the popup is anchored with start-1/2 (a logical position) but shifted back to center with -translate-x-1/2, a physical, LTR-only offset — in RTL this doubles the error instead of centering, so rtl:translate-x-1/2 flips the sign back. Only fires correctly now that dir is set explicitly on the popup instead of relying on document.documentElement",
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
            preview={<AlertDialogDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("alert-dialog-demo")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="no-footer"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          No footer
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            AlertDialogFooter
          </code>{" "}
          is optional — for a single-action alert,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            AlertDialogCancel
          </code>{" "}
          can sit directly in the content without the muted footer bar. It still
          has to be an actual action, though: Alert Dialog can&apos;t be
          dismissed by pressing Escape or clicking outside.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<AlertDialogNoFooterExample />}
            code={
              <CodeBlock
                code={getExampleSource("alert-dialog-no-footer")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/alert-dialog.json" />
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
                  code={getComponentSource("alert-dialog")}
                  lang="tsx"
                  title="components/ui/alert-dialog.tsx"
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
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<AlertDialogRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("alert-dialog-rtl")}
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
        <ApiReference title="AlertDialog" rows={alertDialogRootApi} />
        <ApiReference title="AlertDialogContent" rows={alertDialogContentApi} />

        <DocsPageFooter
          href="/docs/components/alert-dialog"
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
