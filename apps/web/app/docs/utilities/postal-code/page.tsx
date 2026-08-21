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
import { DocsPageFooter } from "@/components/docs-page-footer"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getLibSource } from "@/lib/component-source"
import { getLastEditedDate } from "@/lib/last-edited"

import { postalCodeApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/postal-code/page.tsx"
const usage = `import { isValidPostalCode } from "@/lib/postal-code"

isValidPostalCode("1985813151") // true
isValidPostalCode("0000000000") // false`

export const metadata: Metadata = {
  title: "Postal Code",
  description:
    "Validates the structural format of Iranian postal codes (کد پستی).",
}

export default function PostalCodePage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <h1 className="text-3xl font-semibold tracking-tight">Postal Code</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Validate the structural format of an Iranian postal code (کد پستی): 10
          digits, not starting with zero, and not a single digit repeated 10
          times — after normalizing Persian/Arabic-Indic digits.
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
                1985813151{" "}
                <span className="text-muted-foreground">→ معتبر ✓</span>
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
            <CopyCommand command="npx shadcn@latest add @persianlabsui/postal-code" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <CodeBlock
              code={getLibSource("postal-code")}
              lang="ts"
              title="lib/postal-code.ts"
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
        <ApiReference title="postal-code" rows={postalCodeApi} />
        <DocsPageFooter
          href="/docs/utilities/postal-code"
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
