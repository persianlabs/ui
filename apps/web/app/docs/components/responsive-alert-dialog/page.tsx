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
import { ResponsiveAlertDialogDemoExample } from "@/components/examples/responsive-alert-dialog-demo"
import { ResponsiveAlertDialogRtlExample } from "@/components/examples/responsive-alert-dialog-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH =
  "apps/web/app/docs/components/responsive-alert-dialog/page.tsx"

import { responsiveAlertDialogRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Responsive Alert Dialog",
  description:
    "Renders an Alert Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  ResponsiveAlertDialog,
  ResponsiveAlertDialogAction,
  ResponsiveAlertDialogCancel,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogDescription,
  ResponsiveAlertDialogFooter,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogTrigger,
} from "@/components/ui/responsive-alert-dialog"

export function Example() {
  return (
    <ResponsiveAlertDialog>
      <ResponsiveAlertDialogTrigger render={<Button variant="outline">Delete</Button>} />
      <ResponsiveAlertDialogContent>
        <ResponsiveAlertDialogHeader>
          <ResponsiveAlertDialogTitle>Are you absolutely sure?</ResponsiveAlertDialogTitle>
          <ResponsiveAlertDialogDescription>
            This action cannot be undone.
          </ResponsiveAlertDialogDescription>
        </ResponsiveAlertDialogHeader>
        <ResponsiveAlertDialogFooter>
          <ResponsiveAlertDialogCancel>Cancel</ResponsiveAlertDialogCancel>
          <ResponsiveAlertDialogAction>Continue</ResponsiveAlertDialogAction>
        </ResponsiveAlertDialogFooter>
      </ResponsiveAlertDialogContent>
    </ResponsiveAlertDialog>
  )
}`

const responsiveAlertDialogMarkdown = [
  "# Responsive Alert Dialog",
  "",
  "Renders an Alert Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
  "",
  "Like Alert Dialog, it can only be closed via `ResponsiveAlertDialogAction` or `ResponsiveAlertDialogCancel` — not by pressing Escape, clicking outside, or (on the mobile drawer) tapping the backdrop. Swiping the drawer down still works.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/responsive-alert-dialog.json",
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
  "### ResponsiveAlertDialog",
  "",
  apiRowsToMarkdownTable(responsiveAlertDialogRootApi),
].join("\n")

export default function ResponsiveAlertDialogDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Responsive Alert Dialog
          </h1>
          <CopyMarkdownButton markdown={responsiveAlertDialogMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A confirmation that adapts to the viewport — a centered{" "}
          <a
            href="/docs/components/alert-dialog"
            className="text-foreground underline underline-offset-4"
          >
            Alert Dialog
          </a>{" "}
          on desktop, a bottom{" "}
          <a
            href="/docs/components/drawer"
            className="text-foreground underline underline-offset-4"
          >
            Drawer
          </a>{" "}
          on mobile, from one shared set of components. Neither can be dismissed
          by clicking outside — an explicit action is always required.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Not a shadcn/ui component — this composition (switch between Alert Dialog and Drawer by viewport width, behind one shared API) is original to this registry, built on top of this registry's own Alert Dialog and Drawer",
            "The mobile Drawer is opened with disablePointerDismissal so an outside tap can't close it either, carrying over Alert Dialog's \"must pick an action\" behavior — swiping it down still dismisses it, same as a native action sheet",
            "ResponsiveAlertDialogMedia re-implements AlertDialogMedia's icon-badge styling directly instead of reusing it, since the original leans on CSS selectors scoped to AlertDialogContent's DOM structure that the drawer doesn't have",
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Resize the browser window to see the preview switch between an Alert
          Dialog and a Drawer.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ResponsiveAlertDialogDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("responsive-alert-dialog-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/responsive-alert-dialog.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
              <Step>
                Copy the Alert Dialog, Drawer, and use-media-query hook first
              </Step>
              <p className="mt-2 text-sm text-muted-foreground">
                Responsive Alert Dialog composes{" "}
                <a
                  href="/docs/components/alert-dialog"
                  className="text-foreground underline underline-offset-4"
                >
                  Alert Dialog
                </a>{" "}
                and{" "}
                <a
                  href="/docs/components/drawer"
                  className="text-foreground underline underline-offset-4"
                >
                  Drawer
                </a>
                . Install both first, from their own pages.
              </p>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("responsive-alert-dialog")}
                  lang="tsx"
                  title="components/ui/responsive-alert-dialog.tsx"
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
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ResponsiveAlertDialogRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("responsive-alert-dialog-rtl")}
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
        <ApiReference
          title="ResponsiveAlertDialog"
          rows={responsiveAlertDialogRootApi}
        />

        <DocsPageFooter
          href="/docs/components/responsive-alert-dialog"
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
