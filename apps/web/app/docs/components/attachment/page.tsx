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
import { AttachmentDemoExample } from "@/components/examples/attachment-demo"
import { AttachmentGroupExample } from "@/components/examples/attachment-group"
import { AttachmentImageExample } from "@/components/examples/attachment-image"
import { AttachmentRtlExample } from "@/components/examples/attachment-rtl"
import { AttachmentSizesExample } from "@/components/examples/attachment-sizes"
import { AttachmentStatesExample } from "@/components/examples/attachment-states"
import { AttachmentTriggerExample } from "@/components/examples/attachment-trigger"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import {
  attachmentActionApi,
  attachmentActionsApi,
  attachmentApi,
  attachmentContentApi,
  attachmentDescriptionApi,
  attachmentGroupApi,
  attachmentMediaApi,
  attachmentTitleApi,
  attachmentTriggerApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/attachment/page.tsx"

export const metadata: Metadata = {
  title: "Attachment",
  description:
    "Displays a file or image attachment with media, metadata, upload state, and actions.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "image", title: "Image" },
  { id: "states", title: "States" },
  { id: "sizes", title: "Sizes" },
  { id: "group", title: "Group" },
  { id: "trigger", title: "Trigger" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove sales-dashboard.pdf">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`

const triggerSnippet = `<Dialog>
  <Attachment>
    {/* media, content, actions */}
    <DialogTrigger
      render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />}
    />
  </Attachment>
  <DialogContent>{/* ... */}</DialogContent>
</Dialog>`

export const attachmentMarkdown = [
  "# Attachment",
  "",
  "Displays a file or image attachment with media, metadata, upload state, and actions.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/attachment",
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
  "### Attachment",
  "",
  apiRowsToMarkdownTable(attachmentApi),
].join("\n")

export default function AttachmentDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Attachment
          </h1>
          <CopyMarkdownButton markdown={attachmentMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Displays a file or image attachment, its media, name, and metadata,
          with optional actions and upload state. Use it for files and images in
          chat composers, message threads, and upload lists.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced the physical right-3 positioning of the vertical orientation's actions overlay with logical end-3 so it mirrors in RTL",
            "Swapped the scrollbar-none utility for no-scrollbar from the shared shadcn/tailwind.css utilities this repo imports",
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
            preview={<AttachmentDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("attachment-demo")}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/attachment" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Add the Button dependency the component builds on</Step>
              <div className="mt-2">
                <CopyCommand command="npx shadcn@latest add @persianlabsui/button" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("attachment")}
                  lang="tsx"
                  title="components/ui/attachment.tsx"
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

        <h2 id="image" className="mt-12 text-xl font-semibold tracking-tight">
          Image
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            variant=&quot;image&quot;
          </code>{" "}
          on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            AttachmentMedia
          </code>{" "}
          and render an{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &lt;img&gt;
          </code>{" "}
          inside it. Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            orientation=&quot;vertical&quot;
          </code>{" "}
          to stack the media above the content.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<AttachmentImageExample />}
            code={
              <CodeBlock
                code={getExampleSource("attachment-image")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="states" className="mt-12 text-xl font-semibold tracking-tight">
          States
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            state
          </code>{" "}
          to reflect the upload lifecycle.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            uploading
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            processing
          </code>{" "}
          shimmer the title, and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            error
          </code>{" "}
          switches to a destructive treatment.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<AttachmentStatesExample />}
            code={
              <CodeBlock
                code={getExampleSource("attachment-states")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="sizes" className="mt-12 text-xl font-semibold tracking-tight">
          Sizes
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            size
          </code>{" "}
          to switch between{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            default
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            sm
          </code>
          , and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            xs
          </code>
          .
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<AttachmentSizesExample />}
            code={
              <CodeBlock
                code={getExampleSource("attachment-sizes")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="group" className="mt-12 text-xl font-semibold tracking-tight">
          Group
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Wrap attachments in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            AttachmentGroup
          </code>{" "}
          to lay them out in a horizontally scrollable, snapping row with an
          edge fade.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<AttachmentGroupExample />}
            code={
              <CodeBlock
                code={getExampleSource("attachment-group")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="trigger" className="mt-12 text-xl font-semibold tracking-tight">
          Trigger
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Add an{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            AttachmentTrigger
          </code>{" "}
          to make the whole card open a link or dialog. It fills the card behind
          the actions, so the actions stay clickable.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<AttachmentTriggerExample />}
            code={
              <CodeBlock
                code={getExampleSource("attachment-trigger")}
                lang="tsx"
              />
            }
          />
        </div>
        <div className="mt-4">
          <CodeBlock code={triggerSnippet} lang="tsx" />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The card is laid out with logical properties, so it mirrors
          automatically — including the vertical orientation&apos;s actions
          overlay, which is positioned with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            end-3
          </code>
          .
        </p>
        <div className="mt-3">
          <ComponentPreview
            dir="rtl"
            preview={<AttachmentRtlExample />}
            code={
              <CodeBlock code={getExampleSource("attachment-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="Attachment" rows={attachmentApi} />
        <ApiReference title="AttachmentMedia" rows={attachmentMediaApi} />
        <ApiReference title="AttachmentContent" rows={attachmentContentApi} />
        <ApiReference title="AttachmentTitle" rows={attachmentTitleApi} />
        <ApiReference
          title="AttachmentDescription"
          rows={attachmentDescriptionApi}
        />
        <ApiReference title="AttachmentActions" rows={attachmentActionsApi} />
        <ApiReference title="AttachmentAction" rows={attachmentActionApi} />
        <ApiReference title="AttachmentTrigger" rows={attachmentTriggerApi} />
        <ApiReference title="AttachmentGroup" rows={attachmentGroupApi} />

        <DocsPageFooter
          href="/docs/components/attachment"
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
