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
import { DialogDemoExample } from "@/components/examples/dialog-demo"
import { DialogNoFooterExample } from "@/components/examples/dialog-no-footer"
import { DialogRtlExample } from "@/components/examples/dialog-rtl"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/dialog/page.tsx"

import { dialogPopupApi, dialogRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Dialog",
  description:
    "A modal window layered over the page for focused tasks or confirmations, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "no-footer", title: "No footer" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>{/* form fields */}</DialogPanel>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}`

const dialogMarkdown = [
  "# Dialog",
  "",
  "A modal window layered over the page for focused tasks or confirmations, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/dialog.json",
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
  "### Dialog",
  "",
  apiRowsToMarkdownTable(dialogRootApi),
  "",
  "### DialogPopup",
  "",
  apiRowsToMarkdownTable(dialogPopupApi),
].join("\n")

export default function DialogDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Dialog
          </h1>
          <CopyMarkdownButton markdown={dialogMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A modal window layered over the page for focused tasks or
          confirmations. Built on Base UI&apos;s dialog primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "DialogTrigger measures the ambient direction where it renders and passes it to the portaled DialogViewport, so Persian content and logical spacing render correctly even when the dialog is opened from an RTL-only section of an otherwise-LTR page",
            "Centers via a CSS grid viewport (grid-rows-[1fr_auto_3fr] with justify-items-center) instead of the usual top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 trick, which sidesteps that trick's RTL bug entirely rather than needing a rtl: correction",
            "Adds a DialogPanel that scrolls independently inside a fixed-height popup, so a tall form doesn't push the header/footer off-screen",
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
            preview={<DialogDemoExample />}
            code={
              <CodeBlock code={getExampleSource("dialog-demo")} lang="tsx" />
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
            DialogFooter
          </code>{" "}
          is just another child — skip it for purely informational dialogs that
          don&apos;t need a confirm/cancel pair.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<DialogNoFooterExample />}
            code={
              <CodeBlock
                code={getExampleSource("dialog-no-footer")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/dialog.json" />
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
                  code={getComponentSource("dialog")}
                  lang="tsx"
                  title="components/ui/dialog.tsx"
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
            preview={<DialogRtlExample />}
            code={
              <CodeBlock code={getExampleSource("dialog-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Dialog" rows={dialogRootApi} />
        <ApiReference title="DialogPopup" rows={dialogPopupApi} />

        <DocsPageFooter
          href="/docs/components/dialog"
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
