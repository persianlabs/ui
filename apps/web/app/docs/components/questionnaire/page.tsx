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
import { QuestionnaireAnimatedExample } from "@/components/examples/questionnaire-animated"
import { QuestionnaireCardExample } from "@/components/examples/questionnaire-card"
import { QuestionnaireConditionalExample } from "@/components/examples/questionnaire-conditional"
import { QuestionnaireControlledExample } from "@/components/examples/questionnaire-controlled"
import { QuestionnaireCustomProgressExample } from "@/components/examples/questionnaire-custom-progress"
import { QuestionnaireDemoExample } from "@/components/examples/questionnaire-demo"
import { QuestionnaireDialogExample } from "@/components/examples/questionnaire-dialog"
import { QuestionnaireFreeformExample } from "@/components/examples/questionnaire-freeform"
import { QuestionnaireMultipleExample } from "@/components/examples/questionnaire-multiple"
import { QuestionnaireNavigationStateExample } from "@/components/examples/questionnaire-navigation-state"
import { QuestionnaireResumeExample } from "@/components/examples/questionnaire-resume"
import { QuestionnaireRtlExample } from "@/components/examples/questionnaire-rtl"
import { QuestionnaireShortcutsExample } from "@/components/examples/questionnaire-shortcuts"
import { QuestionnaireSkipExample } from "@/components/examples/questionnaire-skip"
import { QuestionnaireValidationExample } from "@/components/examples/questionnaire-validation"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE, apiRowsToMarkdownTable } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/questionnaire/page.tsx"

import {
  questionnaireApi,
  questionnaireChoiceApi,
  questionnaireInputApi,
  questionnaireItemApi,
  questionnaireNavigationApi,
  questionnaireProgressApi,
} from "./api-data"

export const metadata: Metadata = {
  title: "Questionnaire",
  description:
    "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions, built on @shadcn/react.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "multiple-selection", title: "Multiple Selection" },
      { id: "freeform-answer", title: "Freeform Answer" },
      { id: "explicit-skip", title: "Explicit Skip" },
      { id: "shortcuts", title: "Shortcuts" },
      { id: "custom-validation", title: "Custom Validation" },
      { id: "controlled", title: "Controlled" },
      { id: "resume", title: "Resume" },
      { id: "conditional-items", title: "Conditional Items" },
      { id: "navigation-state", title: "Navigation State" },
      { id: "custom-progress", title: "Custom Progress" },
      { id: "animated-items", title: "Animated Items" },
      { id: "card", title: "Card" },
      { id: "dialog", title: "Dialog" },
      { id: "rtl", title: "RTL" },
    ],
  },
  { id: "api-reference", title: "API Reference" },
]

const usageSnippet = `import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

export function Example() {
  return (
    <Questionnaire>
      <QuestionnaireProgress />

      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What is your role?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="developer">Developer</QuestionnaireChoice>
          <QuestionnaireChoice value="designer">Designer</QuestionnaireChoice>
          <QuestionnaireChoice value="other">Other</QuestionnaireChoice>
          <QuestionnaireInput aria-label="Your role" placeholder="Your role..." />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <div className="flex items-center gap-2">
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </div>
      </QuestionnaireActions>
    </Questionnaire>
  )
}`

export const questionnaireMarkdown = [
  "# Questionnaire",
  "",
  "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions, built on @shadcn/react.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add https://ui.persian-labs.ir/r/questionnaire.json",
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
  "### Questionnaire",
  "",
  apiRowsToMarkdownTable(questionnaireApi),
  "",
  "### QuestionnaireItem",
  "",
  apiRowsToMarkdownTable(questionnaireItemApi),
  "",
  "### QuestionnaireChoice",
  "",
  apiRowsToMarkdownTable(questionnaireChoiceApi),
  "",
  "### QuestionnaireInput",
  "",
  apiRowsToMarkdownTable(questionnaireInputApi),
  "",
  "### QuestionnaireProgress",
  "",
  apiRowsToMarkdownTable(questionnaireProgressApi),
  "",
  "### Navigation (Previous / Skip / Next / Submit)",
  "",
  apiRowsToMarkdownTable(questionnaireNavigationApi),
].join("\n")

export default function QuestionnaireDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Questionnaire
          </h1>
          <CopyMarkdownButton markdown={questionnaireMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A multi-step questionnaire with single-choice, multiple-choice,
          freeform, and skippable questions. Built on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            @shadcn/react
          </code>
          , which handles focus management, keyboard navigation, and validation
          — this repo only supplies the styling.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Swapped Previous/Next chevron placement and rtl:-scale-x-100 mirroring to match this repo's Pagination convention (ChevronLeftIcon for Previous, ChevronRightIcon for Next, both flipped under rtl:)",
            "Replaced the upstream's icon-abstraction check/radio indicator with a plain lucide-react CheckIcon and a small filled dot, driven by this repo's group-data-* attribute styling convention",
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A single-choice question with a freeform &quot;other&quot; answer,
          followed by an optional multiple-choice question.
        </p>
        <div className="mt-4">
          <ComponentPreview
            preview={<QuestionnaireDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("questionnaire-demo")}
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
            <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/questionnaire.json" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Steps>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages="@shadcn/react" />
              </div>
              <Step>Copy the component source</Step>
              <div className="mt-2">
                <CodeBlock
                  code={getComponentSource("questionnaire")}
                  lang="tsx"
                  title="components/ui/questionnaire.tsx"
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
          <h3
            id="multiple-selection"
            className="text-sm font-medium text-muted-foreground"
          >
            Multiple Selection
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              multiple
            </code>{" "}
            on <code>QuestionnaireItem</code> to render checkboxes and allow
            more than one answer.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireMultipleExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-multiple")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="freeform-answer"
            className="text-sm font-medium text-muted-foreground"
          >
            Freeform Answer
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Compose <code>QuestionnaireInput</code> alongside fixed{" "}
            <code>QuestionnaireChoice</code> items for an &quot;other, please
            specify&quot; pattern.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireFreeformExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-freeform")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="explicit-skip"
            className="text-sm font-medium text-muted-foreground"
          >
            Explicit Skip
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              QuestionnaireSkip
            </code>{" "}
            only renders for items that aren&apos;t <code>required</code>,
            letting the user move on without answering.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireSkipExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-skip")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="shortcuts"
            className="text-sm font-medium text-muted-foreground"
          >
            Shortcuts
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              shortcuts=&quot;letters&quot;
            </code>{" "}
            (or <code>&quot;numbers&quot;</code>) on <code>Questionnaire</code>{" "}
            to assign a keyboard shortcut to each choice.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireShortcutsExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-shortcuts")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="custom-validation"
            className="text-sm font-medium text-muted-foreground"
          >
            Custom Validation
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Drive <code>QuestionnaireItem</code>&apos;s <code>invalid</code>{" "}
            prop from an external schema — here, a{" "}
            <a
              href="https://zod.dev"
              className="text-foreground underline underline-offset-4"
            >
              zod
            </a>{" "}
            schema validates the phone number on submit.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireValidationExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-validation")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="controlled"
            className="text-sm font-medium text-muted-foreground"
          >
            Controlled
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pass <code>item</code> and <code>onItemChange</code> to drive the
            active question from outside, such as an external step indicator.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireControlledExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-controlled")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="resume" className="text-sm font-medium text-muted-foreground">
            Resume
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use <code>defaultItem</code> together with{" "}
            <code>defaultChecked</code> on each choice to restore a previously
            saved session.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireResumeExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-resume")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="conditional-items"
            className="text-sm font-medium text-muted-foreground"
          >
            Conditional Items
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Toggle <code>disabled</code> on a later{" "}
            <code>QuestionnaireItem</code> based on an earlier answer to skip it
            from navigation entirely.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireConditionalExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-conditional")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="navigation-state"
            className="text-sm font-medium text-muted-foreground"
          >
            Navigation State
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Every navigation part accepts a render function that receives{" "}
            <code>state</code> (<code>status</code>, <code>disabled</code>,{" "}
            <code>visible</code>, <code>shortcut</code>) for fully custom
            styling.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireNavigationStateExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-navigation-state")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="custom-progress"
            className="text-sm font-medium text-muted-foreground"
          >
            Custom Progress
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            <code>QuestionnaireProgress</code> also accepts a render function
            with <code>current</code>/<code>total</code> state, used here to
            build a segmented dot indicator instead of a bar.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireCustomProgressExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-custom-progress")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3
            id="animated-items"
            className="text-sm font-medium text-muted-foreground"
          >
            Animated Items
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The active item&apos;s <code>data-active</code> attribute toggles on
            each step change, which can retrigger an <code>animate-in</code>{" "}
            entrance — animating only <code>opacity</code>/
            <code>transform</code>, and respecting{" "}
            <code>prefers-reduced-motion</code> globally.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireAnimatedExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-animated")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="card" className="text-sm font-medium text-muted-foreground">
            Card
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Compose <code>Questionnaire</code> inside{" "}
            <a
              href="/docs/components/card"
              className="text-foreground underline underline-offset-4"
            >
              Card
            </a>{" "}
            slots for a self-contained survey widget.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireCardExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-card")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="dialog" className="text-sm font-medium text-muted-foreground">
            Dialog
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Inside a{" "}
            <a
              href="/docs/components/dialog"
              className="text-foreground underline underline-offset-4"
            >
              Dialog
            </a>
            , the host owns Cancel/Close — the questionnaire&apos;s own Submit
            closes the dialog through the host&apos;s controlled{" "}
            <code>open</code> state.
          </p>
          <div className="mt-3">
            <ComponentPreview
              preview={<QuestionnaireDialogExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-dialog")}
                  lang="tsx"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 id="rtl" className="text-sm font-medium text-muted-foreground">
            RTL
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Navigation chevrons mirror, the progress bar fills from the reading
            start, and the choice indicator sits correctly regardless of
            direction.
          </p>
          <div className="mt-3">
            <ComponentPreview
              dir="rtl"
              preview={<QuestionnaireRtlExample />}
              code={
                <CodeBlock
                  code={getExampleSource("questionnaire-rtl")}
                  lang="tsx"
                />
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
        <ApiReference title="Questionnaire" rows={questionnaireApi} />
        <ApiReference title="QuestionnaireItem" rows={questionnaireItemApi} />
        <ApiReference
          title="QuestionnaireChoice"
          rows={questionnaireChoiceApi}
        />
        <ApiReference title="QuestionnaireInput" rows={questionnaireInputApi} />
        <ApiReference
          title="QuestionnaireProgress"
          rows={questionnaireProgressApi}
        />
        <ApiReference
          title="Navigation (Previous / Skip / Next / Submit)"
          rows={questionnaireNavigationApi}
        />

        <DocsPageFooter
          href="/docs/components/questionnaire"
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
