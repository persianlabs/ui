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
import { WheelPickerDemoExample } from "@/components/examples/wheel-picker-demo"
import { WheelPickerDialogExample } from "@/components/examples/wheel-picker-dialog"
import { WheelPickerDrawerExample } from "@/components/examples/wheel-picker-drawer"
import { WheelPickerResponsiveDialogExample } from "@/components/examples/wheel-picker-responsive-dialog"
import { WheelPickerRtlExample } from "@/components/examples/wheel-picker-rtl"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/wheel-picker/page.tsx"

import { wheelPickerApi, wheelPickerWrapperApi } from "./api-data"

export const metadata: Metadata = {
  title: "Wheel Picker",
  description:
    "An iOS-like wheel picker with smooth inertia, infinite scrolling, and keyboard navigation.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "dialog", title: "Inside a Dialog" },
      { id: "drawer", title: "Inside a Drawer" },
      { id: "responsive-dialog", title: "Responsive Dialog" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/ui/wheel-picker"

const options: WheelPickerOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
]

export function Example() {
  return (
    <WheelPickerWrapper>
      <WheelPicker options={options} defaultValue="react" />
    </WheelPickerWrapper>
  )
}`

export const wheelPickerMarkdown = [
  "# Wheel Picker",
  "",
  "An iOS-like wheel picker with smooth inertia, infinite scrolling, and keyboard navigation.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/wheel-picker.json",
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
  "### WheelPickerWrapper",
  "",
  apiRowsToMarkdownTable(wheelPickerWrapperApi),
  "",
  "### WheelPicker",
  "",
  apiRowsToMarkdownTable(wheelPickerApi),
].join("\n")

export default function WheelPickerDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Wheel Picker
          </h1>
          <CopyMarkdownButton markdown={wheelPickerMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A touch-friendly picker with natural momentum scrolling, infinite
          options, keyboard navigation, and type-ahead search.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            {
              label: "Chánh Đại's React Wheel Picker",
              href: "https://chanhdai.com/components/react-wheel-picker",
            },
          ]}
          changed
          changes={[
            "Adds a gesture boundary that stops touch events from reaching a containing Drawer, so the picker's inertial scroll is not cancelled by swipe-to-dismiss",
            "Uses a direction-isolated LTR picker surface so numeric wheels remain naturally ordered inside RTL interfaces",
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
            preview={<WheelPickerDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("wheel-picker-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/wheel-picker.json" />
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependency</Step>
              <div className="mt-2">
                <InstallCommand packages="@ncdai/react-wheel-picker" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("wheel-picker")}
                  lang="tsx"
                  title="components/ui/wheel-picker.tsx"
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
        <ExampleSection
          id="dialog"
          title="Inside a Dialog"
          description="The wheel works normally when placed in a focus-trapped Dialog."
        >
          <WheelPickerDialogExample />
        </ExampleSection>
        <ExampleSection
          id="drawer"
          title="Inside a Drawer"
          description="The wrapper isolates the wheel's touch gesture, preventing the Drawer from cancelling inertial scrolling."
        >
          <WheelPickerDrawerExample />
        </ExampleSection>
        <ExampleSection
          id="responsive-dialog"
          title="Inside a Responsive Dialog"
          description="On mobile this composition becomes a Drawer and retains the same protected wheel gesture."
        >
          <WheelPickerResponsiveDialogExample />
        </ExampleSection>
        <ExampleSection
          id="rtl"
          title="RTL"
          description="Persian labels work in RTL layouts while the wheel's scrolling surface keeps a predictable numeric direction."
          dir="rtl"
        >
          <WheelPickerRtlExample />
        </ExampleSection>

        <h2
          id="api-reference"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          API Reference
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          For option types, data attributes, and the complete upstream guide,
          see{" "}
          <a
            href="https://react-wheel-picker.chanhdai.com/docs/getting-started"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            React Wheel Picker documentation
          </a>
          .
        </p>
        <ApiReference title="WheelPickerWrapper" rows={wheelPickerWrapperApi} />
        <ApiReference title="WheelPicker" rows={wheelPickerApi} />

        <DocsPageFooter
          href="/docs/components/wheel-picker"
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

function ExampleSection({
  id,
  title,
  description,
  children,
  dir,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
  dir?: "rtl"
}) {
  const sourceName = `wheel-picker-${id}`

  return (
    <div className="mt-8">
      <h3 id={id} className="text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-3">
        <ComponentPreview
          dir={dir}
          preview={children}
          code={<CodeBlock code={getExampleSource(sourceName)} lang="tsx" />}
        />
      </div>
    </div>
  )
}
