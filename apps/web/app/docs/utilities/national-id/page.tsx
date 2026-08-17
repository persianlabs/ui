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

import { nationalIdApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/utilities/national-id/page.tsx"
const usage = `import { isValidNationalId } from "@/lib/national-id"

isValidNationalId("0499370899") // true
isValidNationalId("0499370898") // false — bad checksum
isValidNationalId("499370899") // true — zero-padded to "0499370899"
isValidNationalId("0999370899") // false — unknown issuance prefix
isValidNationalId("0999370899", { checkPrefix: false }) // checksum only`

export const metadata: Metadata = {
  title: "National ID",
  description:
    "Validates Iranian national ID (کد ملی) numbers using the standard checksum and known issuance-office prefixes.",
}

export default function NationalIdPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <h1 className="text-3xl font-semibold tracking-tight">National ID</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Validate Iranian national ID (کد ملی) numbers: normalizes
          Persian/Arabic-Indic digits, zero-pads shorter input, rejects all-zero
          and repeated-digit values, verifies the standard weighted-sum
          checksum, and by default cross-checks the 3-digit issuance-office
          prefix against known codes.
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
                0499370899{" "}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/national-id.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <CodeBlock
              code={getLibSource("national-id")}
              lang="ts"
              title="lib/national-id.ts"
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
        <ApiReference title="national-id" rows={nationalIdApi} />
        <DocsPageFooter
          href="/docs/utilities/national-id"
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
