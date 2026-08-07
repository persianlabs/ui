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
import { ResponsiveDialogDemoExample } from "@/components/examples/responsive-dialog-demo"
import { ResponsiveDialogRtlExample } from "@/components/examples/responsive-dialog-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/responsive-dialog/page.tsx"

import { responsiveDialogRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Responsive Dialog",
  description:
    "Renders a Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogDescription,
  ResponsiveDialogDesktopOnly,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogPanel,
  ResponsiveDialogPopup,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog"

export function Example() {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger render={<Button variant="outline">Open</Button>} />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            A Dialog on desktop, a Drawer on mobile.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogPanel>{/* form fields */}</ResponsiveDialogPanel>
        <ResponsiveDialogFooter>
          <Button type="submit">Save changes</Button>
          {/* Skipped on mobile — the drawer is dismissed by swiping. */}
          <ResponsiveDialogDesktopOnly>
            <ResponsiveDialogClose render={<Button variant="outline">Cancel</Button>} />
          </ResponsiveDialogDesktopOnly>
        </ResponsiveDialogFooter>
      </ResponsiveDialogPopup>
    </ResponsiveDialog>
  )
}`

const responsiveDialogMarkdown = [
  "# Responsive Dialog",
  "",
  "Renders a Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/responsive-dialog.json",
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
  "### ResponsiveDialog",
  "",
  apiRowsToMarkdownTable(responsiveDialogRootApi),
].join("\n")

export default function ResponsiveDialogDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Responsive Dialog
          </h1>
          <CopyMarkdownButton markdown={responsiveDialogMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A modal that adapts to the viewport — a centered{" "}
          <a
            href="/docs/components/dialog"
            className="text-foreground underline underline-offset-4"
          >
            Dialog
          </a>{" "}
          on desktop, a bottom{" "}
          <a
            href="/docs/components/drawer"
            className="text-foreground underline underline-offset-4"
          >
            Drawer
          </a>{" "}
          on mobile, from one shared set of components so you don&apos;t
          maintain two versions of the same form.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Not a shadcn/ui component — this composition (switch between Dialog and Drawer by viewport width, behind one shared API) is original to this registry, built on top of this registry's own Dialog and Drawer",
            "ResponsiveDialogDesktopOnly hides Cancel/انصراف-style actions on mobile, where the drawer is already dismissed by swiping down, so a redundant Cancel button never has to be built twice",
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Resize the browser window to see the preview switch between a Dialog
          and a Drawer.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ResponsiveDialogDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("responsive-dialog-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/responsive-dialog.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
              <Step>
                Copy the Dialog, Drawer, and use-media-query hook first
              </Step>
              <p className="mt-2 text-sm text-muted-foreground">
                Responsive Dialog composes{" "}
                <a
                  href="/docs/components/dialog"
                  className="text-foreground underline underline-offset-4"
                >
                  Dialog
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
                  code={getComponentSource("responsive-dialog")}
                  lang="tsx"
                  title="components/ui/responsive-dialog.tsx"
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
            preview={<ResponsiveDialogRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("responsive-dialog-rtl")}
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
        <ApiReference title="ResponsiveDialog" rows={responsiveDialogRootApi} />

        <DocsPageFooter
          href="/docs/components/responsive-dialog"
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
