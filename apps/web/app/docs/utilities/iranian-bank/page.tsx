import type { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyCommand } from "@/components/copy-command"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { ApiReference } from "@/components/api-reference"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getLastEditedDate } from "@/lib/last-edited"
import { getLibSource } from "@/lib/component-source"

import { iranianBankApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/iranian-bank/page.tsx"
const usage = `import {
  formatCardNumber,
  getIranianBankByCardNumber,
  validateIranianCard,
} from "@/lib/iranian-bank"

formatCardNumber("6219861918949297") // "6219 8619 1894 9297"
getIranianBankByCardNumber("62198619")?.name // "بلوبانک"
validateIranianCard("6219861918949297") // true`

export const metadata: Metadata = {
  title: "Iranian Bank",
  description:
    "Card and Shaba normalization, validation, and Iranian bank detection.",
}

export default function IranianBankPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <h1 className="text-3xl font-semibold tracking-tight">Iranian Bank</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Normalize card and Shaba values, validate their checksums, and
          identify the issuing Iranian bank from a card prefix or IBAN bank
          code.
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
            preview={
              <div className="font-mono text-sm">
                6219-8619-1894-9297{" "}
                <span className="text-muted-foreground">→ بلوبانک ✓</span>
              </div>
            }
            code={<CodeBlock code={usage} lang="ts" />}
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/iranian-bank" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <CodeBlock
              code={getLibSource("iranian-bank")}
              lang="ts"
              title="lib/iranian-bank.ts"
            />
          </TabsContent>
        </Tabs>
        <h2 id="usage" className="mt-12 text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="mt-4">
          <CodeBlock code={usage} lang="ts" />
        </div>
        <h2 id="api" className="mt-12 text-xl font-semibold tracking-tight">
          API Reference
        </h2>
        <ApiReference title="iranian-bank" rows={iranianBankApi} />
        <DocsPageFooter
          href="/docs/utilities/iranian-bank"
          sourcePath={SOURCE_PATH}
        />
      </article>
      <aside className="hidden w-44 shrink-0 xl:block">
        <div className="sticky top-24">
          <TableOfContents
            items={[
              { id: "overview", title: "Overview" },
              { id: "installation", title: "Installation" },
              { id: "usage", title: "Usage" },
              { id: "api", title: "API Reference" },
            ]}
          />
        </div>
      </aside>
    </div>
  )
}
