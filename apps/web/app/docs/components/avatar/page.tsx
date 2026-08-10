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
import { AvatarBadgeExample } from "@/components/examples/avatar-badge"
import { AvatarDemoExample } from "@/components/examples/avatar-demo"
import { AvatarGroupExample } from "@/components/examples/avatar-group"
import { AvatarRtlExample } from "@/components/examples/avatar-rtl"
import { AvatarSizeExample } from "@/components/examples/avatar-size"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/avatar/page.tsx"

import { avatarFallbackApi, avatarImageApi, avatarRootApi } from "./api-data"

export const metadata: Metadata = {
  title: "Avatar",
  description:
    "An image element with a fallback, for representing a user or entity, built on Base UI.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "size", title: "Size" },
      { id: "badge", title: "Badge" },
      { id: "group", title: "Group" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`

export const avatarMarkdown = [
  "# Avatar",
  "",
  "An image element with a fallback, for representing a user or entity, built on Base UI.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/avatar.json",
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
  "### Avatar",
  "",
  apiRowsToMarkdownTable(avatarRootApi),
  "",
  "### AvatarImage",
  "",
  apiRowsToMarkdownTable(avatarImageApi),
  "",
  "### AvatarFallback",
  "",
  apiRowsToMarkdownTable(avatarFallbackApi),
].join("\n")

export default function AvatarDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Avatar
          </h1>
          <CopyMarkdownButton markdown={avatarMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          An image element with a fallback, for representing a user or entity.
          Built on Base UI&apos;s avatar primitive.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced physical right-0 with logical end-0 on AvatarBadge for RTL",
            "Added rtl:space-x-reverse to AvatarGroup so overlap direction flips correctly under RTL",
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
            preview={<AvatarDemoExample />}
            code={
              <CodeBlock code={getExampleSource("avatar-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/avatar.json" />
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
                  code={getComponentSource("avatar")}
                  lang="tsx"
                  title="components/ui/avatar.tsx"
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
          <h3 id="size" className="text-sm font-medium text-muted-foreground">
            Size
          </h3>
          <div className="mt-3">
            <ComponentPreview
              preview={<AvatarSizeExample />}
              code={
                <CodeBlock code={getExampleSource("avatar-size")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="badge" className="text-sm font-medium text-muted-foreground">
            Badge
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              AvatarBadge
            </code>{" "}
            to overlay a status indicator, such as an online dot.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<AvatarBadgeExample />}
              code={
                <CodeBlock code={getExampleSource("avatar-badge")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="group" className="text-sm font-medium text-muted-foreground">
            Group
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              AvatarGroup
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              AvatarGroupCount
            </code>{" "}
            to stack multiple avatars with an overflow count.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<AvatarGroupExample />}
              code={
                <CodeBlock code={getExampleSource("avatar-group")} lang="tsx" />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The badge position and group overlap direction both flip correctly
            under RTL.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<AvatarRtlExample />}
              code={
                <CodeBlock code={getExampleSource("avatar-rtl")} lang="tsx" />
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
        <ApiReference title="Avatar" rows={avatarRootApi} />
        <ApiReference title="AvatarImage" rows={avatarImageApi} />
        <ApiReference title="AvatarFallback" rows={avatarFallbackApi} />

        <DocsPageFooter
          href="/docs/components/avatar"
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
