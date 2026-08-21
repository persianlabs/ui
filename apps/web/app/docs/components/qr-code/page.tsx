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
import { DocsPageFooter } from "@/components/docs-page-footer"
import { QrCodeColorsExample } from "@/components/examples/qr-code-colors"
import { QrCodeDemoExample } from "@/components/examples/qr-code-demo"
import { QrCodeLogoExample } from "@/components/examples/qr-code-logo"
import { QrCodeRtlExample } from "@/components/examples/qr-code-rtl"
import { QrCodeSkeletonExample } from "@/components/examples/qr-code-skeleton"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { qrCodeApi, qrCodeSkeletonApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/qr-code/page.tsx"

export const metadata: Metadata = {
  title: "QR Code",
  description:
    "QR code generator with rounded finder patterns and dot-style data modules.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "custom-colors", title: "Custom Colors" },
  { id: "logo", title: "Center Logo" },
  { id: "skeleton", title: "Loading Skeleton" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import { QrCode } from "@/components/ui/qr-code"

export function Example() {
  return (
    <div className="dark:border-input w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border [&_svg]:h-auto [&_svg]:w-full">
      <QrCode value="https://ui.persian-labs.ir" size={140} />
    </div>
  )
}`

const logoSnippet = `<QrCode
  value="https://ui.persian-labs.ir"
  size={140}
  errorCorrectionLevel="H"
  logo={<AppLogo className="size-8 text-foreground" />}
/>`

const skeletonSnippet = `import { QrCode, QrCodeSkeleton } from "@/components/ui/qr-code"

{loaded ? (
  <QrCode value="https://ui.persian-labs.ir" />
) : (
  <QrCodeSkeleton />
)}`

export const qrCodeMarkdown = [
  "# QR Code",
  "",
  "QR code generator with rounded finder patterns and dot-style data modules.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/qr-code.json",
  `npm install qrcode`,
  CODE_FENCE,
  "",
  "## Usage",
  "",
  `${CODE_FENCE}tsx`,
  usageSnippet,
  CODE_FENCE,
  "",
  "## Examples",
  "",
  "### Center Logo",
  "",
  `${CODE_FENCE}tsx`,
  logoSnippet,
  CODE_FENCE,
  "",
  "### Loading Skeleton",
  "",
  `${CODE_FENCE}tsx`,
  skeletonSnippet,
  CODE_FENCE,
  "",
  "## API Reference",
  "",
  "### QrCode",
  "",
  apiRowsToMarkdownTable(qrCodeApi),
  "",
  "### QrCodeSkeleton",
  "",
  apiRowsToMarkdownTable(qrCodeSkeletonApi),
].join("\n")

export default function QrCodeDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            QR Code
          </h1>
          <CopyMarkdownButton markdown={qrCodeMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A QR code generator with rounded finder patterns and dot-style data
          modules, plus an optional center logo slot.
        </p>
        <LastUpdated date={lastEdited} />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<QrCodeDemoExample />}
            code={
              <CodeBlock code={getExampleSource("qr-code-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/qr-code.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the component dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="qrcode" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("qr-code")}
                  lang="tsx"
                  title="components/ui/qr-code.tsx"
                />
              </div>
            </Steps>
          </TabsContent>
        </Tabs>

        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The SVG renders at{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            size
          </code>{" "}
          pixels by default, but scales to its container when CSS sizes it — the
          wrapper below gives it a card frame and full-width scaling.
        </p>
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2
          id="custom-colors"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Custom Colors
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Override{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            fgColor
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            bgColor
          </code>{" "}
          to fit branded tickets, packaging, or event cards. Keep enough
          contrast between the two for the code to stay scannable.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<QrCodeColorsExample />}
            code={
              <CodeBlock code={getExampleSource("qr-code-colors")} lang="tsx" />
            }
          />
        </div>

        <h2 id="logo" className="mt-12 text-xl font-semibold tracking-tight">
          Center Logo
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pass any element as{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            logo
          </code>{" "}
          to render it centered over the code on an opaque chip matching{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            bgColor
          </code>
          . The logo covers data modules, so raise the error correction level —{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            errorCorrectionLevel=&quot;H&quot;
          </code>{" "}
          recovers from up to 30% obscured area.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<QrCodeLogoExample />}
            code={
              <CodeBlock code={getExampleSource("qr-code-logo")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="skeleton"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Loading Skeleton
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            QrCodeSkeleton
          </code>{" "}
          mirrors{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            QrCode
          </code>
          &apos;s{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            size
          </code>{" "}
          prop, so swapping between the two while the encoded value loads causes
          zero layout shift. The example simulates a 3-second load — press the
          reload button to replay it.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<QrCodeSkeletonExample />}
            code={
              <CodeBlock
                code={getExampleSource("qr-code-skeleton")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          QR data itself is direction-agnostic visual data, so the code renders
          identically regardless of the surrounding document direction — any
          captions around it are what follow the page&apos;s direction.
        </p>
        <div className="mt-3">
          <ComponentPreview
            dir="rtl"
            preview={<QrCodeRtlExample />}
            code={
              <CodeBlock code={getExampleSource("qr-code-rtl")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="QrCode" rows={qrCodeApi} />
        <ApiReference title="QrCodeSkeleton" rows={qrCodeSkeletonApi} />

        <DocsPageFooter
          href="/docs/components/qr-code"
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
