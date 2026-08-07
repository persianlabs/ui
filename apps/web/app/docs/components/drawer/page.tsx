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
import { DrawerDemoExample } from "@/components/examples/drawer-demo"
import { DrawerRtlExample } from "@/components/examples/drawer-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/drawer/page.tsx"

import { drawerPopupApi, drawerRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Drawer",
  description:
    "A swipeable panel that slides in from an edge of the screen, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function Example() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open</Button>} />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>{/* content */}</DrawerPanel>
        <DrawerFooter>
          <Button type="submit">Save changes</Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}`

const drawerMarkdown = [
  "# Drawer",
  "",
  "A swipeable panel that slides in from an edge of the screen, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/drawer.json",
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
  "### Drawer",
  "",
  apiRowsToMarkdownTable(drawerRootApi),
  "",
  "### DrawerPopup",
  "",
  apiRowsToMarkdownTable(drawerPopupApi),
].join("\n")

export default function DrawerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Drawer
          </h1>
          <CopyMarkdownButton markdown={drawerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A swipeable panel that slides in from an edge of the screen — dismiss
          it by swiping, dragging the handle, or tapping outside. Built on Base
          UI&apos;s drawer primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            'Adds a logical position="start"/"end" on top of the physical top/right/bottom/left, resolved from the ambient direction measured at the trigger, and used to derive swipeDirection automatically',
            "DrawerMenuTrigger's chevron flips with rtl:-scale-x-100, and menu item padding/checkbox thumb travel use logical pe-/ps- and a rtl:-translate-x flip instead of physical left/right values",
            "Guards against a spurious open-then-instant-dismiss: in re-render-heavy apps, the interaction that opens the drawer can produce a follow-up click Base UI reads as an outside-press in the same tick. Any outside-press within 200ms of opening is treated as that ghost press and cancelled",
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
            preview={<DrawerDemoExample />}
            code={
              <CodeBlock code={getExampleSource("drawer-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/drawer.json" />
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
                  code={getComponentSource("drawer")}
                  lang="tsx"
                  title="components/ui/drawer.tsx"
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
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            position=&quot;start&quot;
          </code>{" "}
          opens from the reading-start edge — the right in RTL, the left in LTR
          — instead of a hardcoded side.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="rtl"
            preview={<DrawerRtlExample />}
            code={
              <CodeBlock code={getExampleSource("drawer-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Drawer" rows={drawerRootApi} />
        <ApiReference title="DrawerPopup" rows={drawerPopupApi} />

        <DocsPageFooter
          href="/docs/components/drawer"
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
