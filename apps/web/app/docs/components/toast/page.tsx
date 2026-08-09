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
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { ToastAnchoredExample } from "@/components/examples/toast-anchored"
import { ToastAnchoredDialogExample } from "@/components/examples/toast-anchored-dialog"
import { ToastAnchoredDrawerExample } from "@/components/examples/toast-anchored-drawer"
import { ToastDemoExample } from "@/components/examples/toast-demo"
import { ToastRtlExample } from "@/components/examples/toast-rtl"
import { ToastStatusesExample } from "@/components/examples/toast-statuses"
import { ToastXExample } from "@/components/examples/toast-x"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/toast/page.tsx"

import {
  anchoredToastAddOptionsApi,
  anchoredToastProviderApi,
  toastAddOptionsApi,
  toastProviderApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Toast",
  description:
    "A temporary notification that stacks in a corner of the screen or anchors to an element, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "statuses", title: "Statuses" },
  { id: "x", title: "X style" },
  { id: "anchored", title: "Anchored toast" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { Button } from "@/components/ui/button"
import { toast, ToastProvider } from "@/components/ui/toast"

export function Example() {
  return (
    <ToastProvider>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Event created",
            description: "Sunday, December 3 at 9:00 AM",
          })
        }
      >
        Show toast
      </Button>
    </ToastProvider>
  )
}`

const anchoredUsageSnippet = `import { CopyButton } from "@/components/ui/copy-button"

export function Example() {
  return <CopyButton text="https://persian-labs.ir" />
}`

export const toastMarkdown = [
  "# Toast",
  "",
  "A temporary notification that stacks in a corner of the screen or anchors to an element, built on Base UI.",
  "",
  "`ToastProvider` renders a stacked, swipeable notification list in a corner of the screen — call `toast.add()` anywhere inside it. `AnchoredToastProvider` instead positions each toast against a specific element (a button, a form field) using `anchoredToast.add({ positionerProps: { anchor } })`.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/toast.json",
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
  "### ToastProvider",
  "",
  apiRowsToMarkdownTable(toastProviderApi),
  "",
  "### AnchoredToastProvider",
  "",
  apiRowsToMarkdownTable(anchoredToastProviderApi),
  "",
  "### toast.add(options)",
  "",
  apiRowsToMarkdownTable(toastAddOptionsApi),
  "",
  "### anchoredToast.add(options)",
  "",
  apiRowsToMarkdownTable(anchoredToastAddOptionsApi),
].join("\n")

export default function ToastDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Toast
          </h1>
          <CopyMarkdownButton markdown={toastMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A temporary notification that stacks in a corner of the screen, or
          anchors to a specific element on the page. Built on Base UI&apos;s
          toast primitive, with swipe-to-dismiss and success/error/warning/
          info/loading statuses.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            { label: "coss ui", href: "https://coss.com/ui/docs/components/toast" },
          ]}
          changed
          changes={[
            "Adds a logical position=\"start\"/\"end\" (on both ToastProvider's corner and the physical left/right CSS it drives) on top of coss ui's literal left/right/center, resolved from the ambient direction measured where the provider's children actually render — matching the pattern already used by Dialog/Drawer/Tooltip for portaled content",
            "ToastProvider and AnchoredToastProvider explicitly set dir on the portaled Viewport/Positioner from that same measurement, so swipe-to-dismiss direction and logical spacing resolve correctly even when the provider sits in an otherwise-LTR page",
            "Merges shadcn's per-slot exported pieces (ToastTitle/ToastDescription/ToastAction/ToastClose, and an explicit close button) with coss ui's position-aware viewport, stacking math, and AnchoredToastProvider",
            'Adds an "x" variant (compact rounded-full pill with an avatar/icon slot, in the style of X\'s native in-app notifications) on top of both sources\' plain card style, selected per-toast via `data: { variant: "x" }`',
            "Aligns the leading icon/avatar to the title line (items-start) instead of centering it against the combined title+description block",
            'Adds a per-toast `data: { dir }` override so a toast\'s content direction can be forced regardless of the provider\'s ambient/measured direction — the provider\'s corner position still follows the ambient direction, only the toast\'s own text/logical spacing is overridden',
            "Dropped coss ui's custom swipe-replay keyframes (bounce-on-update, shake-on-error) — this repo's registry has no mechanism yet for shipping component-scoped @keyframes, unlike coss ui's registry-item cssVars/css fields",
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
            preview={<ToastDemoExample />}
            code={
              <CodeBlock code={getExampleSource("toast-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/toast.json" />
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
                  code={getComponentSource("toast")}
                  lang="tsx"
                  title="components/ui/toast.tsx"
                />
              </div>
              <Step>Wrap your app in ToastProvider</Step>
              <div className="mt-2">
                <CodeBlock
                  code={`import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AnchoredToastProvider>{children}</AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  )
}`}
                  lang="tsx"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Call{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            toast.add()
          </code>{" "}
          from anywhere inside a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            ToastProvider
          </code>{" "}
          — no hook needed, since the manager is a plain module-level
          instance.
        </p>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="statuses"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Statuses
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pass{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">type</code>{" "}
          to pick the leading icon and its color:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            success
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            error
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            warning
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">info</code>
          , or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            loading
          </code>
          . Update a loading toast in place with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            toast.update(id, options)
          </code>
          .
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ToastStatusesExample />}
            code={
              <CodeBlock
                code={getExampleSource("toast-statuses")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="x" className="mt-12 text-xl font-semibold tracking-tight">
          X style
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            data: {"{"} variant: &quot;x&quot; {"}"}
          </code>{" "}
          for a compact, rounded-full pill in the style of X&apos;s native
          in-app notifications, with an avatar or icon slot.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ToastXExample />}
            code={<CodeBlock code={getExampleSource("toast-x")} lang="tsx" />}
          />
        </div>

        <h2
          id="anchored"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Anchored toast
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Wrap in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            AnchoredToastProvider
          </code>{" "}
          and call{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            anchoredToast.add({"{"} positionerProps: {"{"} anchor {"}"} {"}"}
            )
          </code>{" "}
          to position a toast against a specific element — a tooltip-like
          confirmation next to the button that triggered it — instead of
          stacking it in a screen corner. The smallest way to see it in
          action is{" "}
          <Link
            href="/docs/components/copy-button"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Copy Button
          </Link>
          , a small building block that anchors its own copy confirmation
          this way — the Dialog and Drawer examples below use it too.
        </p>
        <div className="mt-4">
          <CodeBlock code={anchoredUsageSnippet} lang="tsx" />
        </div>

        <h3 className="mt-8 text-base font-semibold tracking-tight">
          Standalone
        </h3>
        <div className="mt-4">
          <ComponentPreview
            preview={<ToastAnchoredExample />}
            code={
              <CodeBlock code={getExampleSource("toast-anchored")} lang="tsx" />
            }
          />
        </div>

        <h3 className="mt-8 text-base font-semibold tracking-tight">
          From a Dialog
        </h3>
        <div className="mt-4">
          <ComponentPreview
            preview={<ToastAnchoredDialogExample />}
            code={
              <CodeBlock
                code={getExampleSource("toast-anchored-dialog")}
                lang="tsx"
              />
            }
          />
        </div>

        <h3 className="mt-8 text-base font-semibold tracking-tight">
          From a Drawer
        </h3>
        <div className="mt-4">
          <ComponentPreview
            preview={<ToastAnchoredDrawerExample />}
            code={
              <CodeBlock
                code={getExampleSource("toast-anchored-drawer")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          By default every position — including the centered ones — mirrors
          automatically:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            start
          </code>{" "}
          lands on the right in RTL and the left in LTR (and vice versa for{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">end</code>
          ), matching the ambient{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">dir</code>{" "}
          the provider measures from its parent. To force a toast&apos;s
          content direction regardless of the ambient page direction — e.g.
          Persian content on an otherwise-LTR page — pass{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            data: {"{"} dir: &quot;rtl&quot; {"}"}
          </code>{" "}
          per call, as this example does rather than relying on the page
          direction toggle.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<ToastRtlExample />}
            code={<CodeBlock code={getExampleSource("toast-rtl")} lang="tsx" />}
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="ToastProvider" rows={toastProviderApi} />
        <ApiReference
          title="AnchoredToastProvider"
          rows={anchoredToastProviderApi}
        />
        <ApiReference title="toast.add(options)" rows={toastAddOptionsApi} />
        <ApiReference
          title="anchoredToast.add(options)"
          rows={anchoredToastAddOptionsApi}
        />

        <DocsPageFooter href="/docs/components/toast" sourcePath={SOURCE_PATH} />
      </article>

      <aside className="hidden w-44 shrink-0 xl:block">
        <div className="sticky top-24">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  )
}
