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
import { QrCodeDemoExample } from "@/components/examples/qr-code-demo"
import { QrCodeDottedExample } from "@/components/examples/qr-code-dotted"
import { QrCodeGradientExample } from "@/components/examples/qr-code-gradient"
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

import {
  qrCodeApi,
  qrCodeDownloadApi,
  qrCodeFrameApi,
  qrCodeOverlayApi,
  qrCodeSkeletonApi,
} from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/qr-code/page.tsx"

export const metadata: Metadata = {
  title: "QR Code",
  description:
    "A flexible, Telegram-style QR code builder with square/dotted module shapes, solid or gradient fills, and a center logo overlay.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variant", title: "Variant" },
  { id: "gradient", title: "Gradient Color" },
  { id: "logo", title: "Center Logo" },
  { id: "skeleton", title: "Loading Skeleton" },
  { id: "download", title: "Download" },
  { id: "rtl", title: "RTL" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  QrCode,
  QrCodeDownload,
  QrCodeFrame,
} from "@/components/ui/qr-code"

export function Example() {
  return (
    <QrCode value="https://ui.persian-labs.ir">
      <QrCodeFrame />
      <QrCodeDownload fileName="qr-code.png" mimeType="image/png">
        Download
      </QrCodeDownload>
    </QrCode>
  )
}`

export const qrCodeMarkdown = [
  "# QR Code",
  "",
  "A flexible, Telegram-style QR code builder with square/dotted module shapes, solid or gradient fills, and a center logo overlay.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/qr-code.json",
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
  "### QrCode",
  "",
  apiRowsToMarkdownTable(qrCodeApi),
  "",
  "### QrCodeFrame",
  "",
  apiRowsToMarkdownTable(qrCodeFrameApi),
  "",
  "### QrCodeOverlay",
  "",
  apiRowsToMarkdownTable(qrCodeOverlayApi),
  "",
  "### QrCodeDownload",
  "",
  apiRowsToMarkdownTable(qrCodeDownloadApi),
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
          A flexible QR code generator with square/dotted module shapes, solid
          or gradient fills, and a center logo overlay slot — the same building
          blocks as Telegram&apos;s QR share sheet.
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
                <InstallCommand packages="qrcode-generator" />
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
        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>

        <h2 id="variant" className="mt-12 text-xl font-semibold tracking-tight">
          Variant
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The encoded matrix is traced into a single SVG{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<path>"}
          </code>
          , one dark module at a time. The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dotted
          </code>{" "}
          variant is built by rendering that path invisibly inside an SVG{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<mask>"}
          </code>
          , which turns it into a reusable stencil — the actual visible fill (a
          tiled dot pattern here) is painted through the mask, so it&apos;s
          clipped to exactly the QR module shape without needing per-cell
          coordinates.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<QrCodeDottedExample />}
            code={
              <CodeBlock code={getExampleSource("qr-code-dotted")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="gradient"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Gradient Color
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The same masking technique lets{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            color
          </code>{" "}
          accept a gradient config instead of a solid CSS color, rendered as an
          SVG{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<linearGradient>"}
          </code>{" "}
          /{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<radialGradient>"}
          </code>{" "}
          painted through the same mask. Keep enough contrast between the
          pattern and the frame&apos;s white background — a low-contrast
          gradient (e.g. light-on-light) makes the code unreliable or impossible
          to scan.
        </p>
        <div className="mt-3">
          <ComponentPreview
            preview={<QrCodeGradientExample />}
            code={
              <CodeBlock
                code={getExampleSource("qr-code-gradient")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="logo" className="mt-12 text-xl font-semibold tracking-tight">
          Center Logo
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            QrCodeOverlay
          </code>{" "}
          renders any content — an image, an icon, a brand mark — centered over
          the code, independent of the variant/color system above. It&apos;s{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            aria-hidden
          </code>{" "}
          by default since the QR code itself carries the meaning, not the logo.
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
          matches{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            QrCodeFrame
          </code>
          &apos;s default footprint exactly, so swapping between the two while
          the encoded value loads causes zero layout shift.
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

        <h2
          id="download"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Download
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            QrCodeDownload
          </code>{" "}
          exports the frame as an image client-side — the SVG frame is
          serialized, drawn onto an offscreen canvas, and saved as a PNG/JPEG/
          WebP through a temporary download link. It renders as a styled button
          by default — pass an icon and visible text as children (as in the
          examples above), or an{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            aria-label
          </code>{" "}
          if you render it icon-only.
        </p>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          QR data itself is direction-agnostic visual data, so the code renders
          identically regardless of the surrounding document direction — the
          labels and download button around it are what need to follow the
          page&apos;s direction.
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
        <ApiReference title="QrCodeFrame" rows={qrCodeFrameApi} />
        <ApiReference title="QrCodeOverlay" rows={qrCodeOverlayApi} />
        <ApiReference title="QrCodeDownload" rows={qrCodeDownloadApi} />
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
