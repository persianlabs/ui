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
import { NavigationMenuDemoExample } from "@/components/examples/navigation-menu-demo"
import { NavigationMenuRtlExample } from "@/components/examples/navigation-menu-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  navigationMenuApi,
  navigationMenuContentApi,
  navigationMenuLinkApi,
  navigationMenuTriggerApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/navigation-menu/page.tsx"

export const metadata: Metadata = {
  title: "Navigation Menu",
  description: "A collection of links for navigating websites.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "link-component", title: "Link Component" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

const linkSnippet = `import Link from "next/link"

<NavigationMenuItem>
  <NavigationMenuLink
    render={<Link href="/docs" />}
    className={navigationMenuTriggerStyle()}
  >
    Documentation
  </NavigationMenuLink>
</NavigationMenuItem>`

export const navigationMenuMarkdown = [
  "# Navigation Menu",
  "",
  "A collection of links for navigating websites.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/navigation-menu",
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
  apiRowsToMarkdownTable(navigationMenuApi),
].join("\n")

export default function NavigationMenuDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Navigation Menu
          </h1>
          <CopyMarkdownButton markdown={navigationMenuMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A collection of links for navigating websites, with dropdown panels
          that share a single animated viewport.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced the multi-icon-library IconPlaceholder abstraction with a plain lucide-react ChevronDownIcon",
            "Converted the trigger chevron's ml-1 spacing to logical ms-1 so the gap sits between label and icon in both directions",
            "Added rtl: variants mirroring the panel's enter/exit slide translations and the indicator arrow, so animation direction follows the writing direction without any dir plumbing",
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
            dir="ltr"
            preview={<NavigationMenuDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("navigation-menu-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/navigation-menu" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the following dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@base-ui/react lucide-react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("navigation-menu")}
                  lang="tsx"
                  title="components/ui/navigation-menu.tsx"
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
          id="link-component"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Link Component
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            render
          </code>{" "}
          prop to compose a custom link component such as Next.js{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Link
          </code>{" "}
          while keeping the menu behavior.
        </p>
        <div className="mt-4">
          <CodeBlock code={linkSnippet} lang="tsx" />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Content panels render in a portal at{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            document.body
          </code>
          , so on a site that isn&apos;t RTL by default they need the direction
          passed explicitly — set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dir=&quot;rtl&quot;
          </code>{" "}
          on the menu root and on each{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            NavigationMenuContent
          </code>
          . Panel alignment mirrors automatically from the rendered direction
          (start in LTR opens rightward, end in RTL opens leftward); an explicit{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            align
          </code>{" "}
          prop overrides it. The panel&apos;s enter/exit slides mirror through
          Tailwind{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            rtl:
          </code>{" "}
          variants in the component itself.
        </p>
        <div className="mt-3">
          <ComponentPreview
            dir="rtl"
            preview={<NavigationMenuRtlExample />}
            code={
              <CodeBlock
                code={getExampleSource("navigation-menu-rtl")}
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
        <ApiReference title="NavigationMenu" rows={navigationMenuApi} />
        <ApiReference
          title="NavigationMenuTrigger"
          rows={navigationMenuTriggerApi}
        />
        <ApiReference
          title="NavigationMenuContent"
          rows={navigationMenuContentApi}
        />
        <ApiReference title="NavigationMenuLink" rows={navigationMenuLinkApi} />
        <p className="mt-6 leading-relaxed text-muted-foreground">
          See the{" "}
          <a
            href="https://base-ui.com/react/components/navigation-menu#api-reference"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Base UI Navigation Menu docs
          </a>{" "}
          for the full prop and part reference.
        </p>

        <DocsPageFooter
          href="/docs/components/navigation-menu"
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
