import type { Metadata } from "next"
import Link from "next/link"

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
import { InputOTPAlphanumericExample } from "@/components/examples/input-otp-alphanumeric"
import { InputOTPControlledExample } from "@/components/examples/input-otp-controlled"
import { InputOTPDemoExample } from "@/components/examples/input-otp-demo"
import { InputOTPDisabledExample } from "@/components/examples/input-otp-disabled"
import { InputOTPFormExample } from "@/components/examples/input-otp-form"
import { InputOTPFourDigitsExample } from "@/components/examples/input-otp-four-digits"
import { InputOTPInvalidExample } from "@/components/examples/input-otp-invalid"
import { InputOTPPatternExample } from "@/components/examples/input-otp-pattern"
import { InputOTPSeparatorExample } from "@/components/examples/input-otp-separator"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

import { inputOTPRootApi, inputOTPSlotApi } from "./api-data"

const SOURCE_PATH = "apps/web/app/docs/components/input-otp/page.tsx"

export const metadata: Metadata = {
  title: "Input OTP",
  description:
    "Accessible one-time password component with copy-paste functionality.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "pattern", title: "Pattern" },
  { id: "separator", title: "Separator" },
  { id: "disabled", title: "Disabled" },
  { id: "controlled", title: "Controlled" },
  { id: "invalid", title: "Invalid" },
  { id: "four-digits", title: "Four digits" },
  { id: "alphanumeric", title: "Alphanumeric" },
  { id: "form", title: "Form" },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function Example() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`

const inputOTPMarkdown = [
  "# Input OTP",
  "",
  "Accessible one-time password component with copy-paste functionality, built on [input-otp](https://github.com/guilhermerodz/input-otp). Its slots always read left-to-right, even on RTL pages, since one-time codes are digits.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/input-otp.json",
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
  "### InputOTP",
  "",
  apiRowsToMarkdownTable(inputOTPRootApi),
  "",
  "### InputOTPSlot",
  "",
  apiRowsToMarkdownTable(inputOTPSlotApi),
].join("\n")

export default function InputOTPDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Input OTP
          </h1>
          <CopyMarkdownButton markdown={inputOTPMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Accessible one-time password component with copy-paste functionality,
          built on{" "}
          <Link
            href="https://github.com/guilhermerodz/input-otp"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            input-otp
          </Link>
          . Its slots always read left-to-right, even on RTL pages, since
          one-time codes are digits.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed
          changes={["Forced LTR direction for the input"]}
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
            preview={<InputOTPDemoExample />}
            code={
              <CodeBlock code={getExampleSource("input-otp-demo")} lang="tsx" />
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/input-otp.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="input-otp" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("input-otp")}
                  lang="tsx"
                  title="components/ui/input-otp.tsx"
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

        <h2 id="pattern" className="mt-12 text-xl font-semibold tracking-tight">
          Pattern
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            pattern
          </code>{" "}
          prop to define a custom pattern for the OTP input.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPPatternExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-pattern")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="separator"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Separator
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {"<InputOTPSeparator />"}
          </code>{" "}
          to add a separator between input groups.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPSeparatorExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-separator")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="disabled"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Disabled
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            disabled
          </code>{" "}
          prop to disable the input.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPDisabledExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-disabled")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="controlled"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Controlled
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            value
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            onChange
          </code>{" "}
          props to control the input value.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPControlledExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-controlled")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="invalid" className="mt-12 text-xl font-semibold tracking-tight">
          Invalid
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            aria-invalid
          </code>{" "}
          on the slots to show an error state.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPInvalidExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-invalid")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="four-digits"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Four digits
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A common pattern for PIN codes, using{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            pattern={"{REGEXP_ONLY_DIGITS}"}
          </code>
          .
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPFourDigitsExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-four-digits")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="alphanumeric"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Alphanumeric
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            REGEXP_ONLY_DIGITS_AND_CHARS
          </code>{" "}
          to accept both letters and numbers.
        </p>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPAlphanumericExample />}
            code={
              <CodeBlock
                code={getExampleSource("input-otp-alphanumeric")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2 id="form" className="mt-12 text-xl font-semibold tracking-tight">
          Form
        </h2>
        <div className="mt-4">
          <ComponentPreview
            dir="ltr"
            preview={<InputOTPFormExample />}
            code={
              <CodeBlock code={getExampleSource("input-otp-form")} lang="tsx" />
            }
          />
        </div>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <ApiReference title="InputOTP" rows={inputOTPRootApi} />
        <ApiReference title="InputOTPSlot" rows={inputOTPSlotApi} />

        <DocsPageFooter
          href="/docs/components/input-otp"
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
