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
import { ResponsiveMenuDemoExample } from "@/components/examples/responsive-menu-demo"
import { ResponsiveMenuRtlExample } from "@/components/examples/responsive-menu-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/responsive-menu/page.tsx"

import { responsiveMenuContentApi, responsiveMenuRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Responsive Menu",
  description:
    "Renders a Dropdown Menu on desktop and a bottom Drawer menu on mobile from one shared set of components.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  ResponsiveMenu,
  ResponsiveMenuContent,
  ResponsiveMenuItem,
  ResponsiveMenuSeparator,
  ResponsiveMenuTrigger,
} from "@/components/ui/responsive-menu"

export function Example() {
  return (
    <ResponsiveMenu>
      <ResponsiveMenuTrigger render={<Button variant="outline">Open menu</Button>} />
      <ResponsiveMenuContent groupLabel="My Account">
        <ResponsiveMenuItem onClick={() => {}}>Profile</ResponsiveMenuItem>
        <ResponsiveMenuItem onClick={() => {}}>Billing</ResponsiveMenuItem>
        <ResponsiveMenuSeparator />
        <ResponsiveMenuItem variant="destructive" onClick={() => {}}>
          Log out
        </ResponsiveMenuItem>
      </ResponsiveMenuContent>
    </ResponsiveMenu>
  )
}`

export const responsiveMenuMarkdown = [
  "# Responsive Menu",
  "",
  "Renders a Dropdown Menu on desktop and a bottom Drawer menu on mobile from one shared set of components.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/responsive-menu.json",
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
  "### ResponsiveMenu",
  "",
  apiRowsToMarkdownTable(responsiveMenuRootApi),
  "",
  "### ResponsiveMenuContent",
  "",
  apiRowsToMarkdownTable(responsiveMenuContentApi),
].join("\n")

export default function ResponsiveMenuDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Responsive Menu
          </h1>
          <CopyMarkdownButton markdown={responsiveMenuMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A menu that adapts to the viewport — a Dropdown Menu on desktop, a
          bottom{" "}
          <a
            href="/docs/components/drawer"
            className="text-foreground underline underline-offset-4"
          >
            Drawer
          </a>{" "}
          menu on mobile — since a hover-triggered dropdown doesn&apos;t
          translate to touch.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={[
            "Not a shadcn/ui component — this composition (switch between Dropdown Menu and a Drawer menu by viewport width, behind one shared API) is original to this registry, built on top of this registry's own Dropdown Menu and Drawer",
            'Added variant="destructive" support to Dropdown Menu\'s item so it matches Context Menu and Menubar, and so a destructive action looks the same on both the desktop and mobile surface here',
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Resize the browser window to see the preview switch between a dropdown
          and a drawer menu.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<ResponsiveMenuDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("responsive-menu-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/responsive-menu.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react" />
              </div>
              <Step>Copy the Dropdown Menu and Drawer components first</Step>
              <p className="mt-2 text-sm text-muted-foreground">
                Responsive Menu composes the registry&apos;s own Dropdown Menu
                and Drawer. Install both first.
              </p>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("responsive-menu")}
                  lang="tsx"
                  title="components/ui/responsive-menu.tsx"
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
            preview={<ResponsiveMenuRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("responsive-menu-rtl")}
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
        <ApiReference title="ResponsiveMenu" rows={responsiveMenuRootApi} />
        <ApiReference
          title="ResponsiveMenuContent"
          rows={responsiveMenuContentApi}
        />

        <DocsPageFooter
          href="/docs/components/responsive-menu"
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
