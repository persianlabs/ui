import type { Metadata } from "next"

import { CodeBlock } from "@/components/code-block"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { Credits } from "@/components/credits"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { LastUpdated } from "@/components/last-updated"
import { TableOfContents } from "@/components/table-of-contents"
import { getLastEditedDate } from "@/lib/last-edited"

const SOURCE_PATH = "apps/web/app/docs/components/typography/page.tsx"

export const metadata: Metadata = {
  title: "Typography",
  description: "Styles for headings, paragraphs, lists, etc.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "h1", title: "h1" },
  { id: "h2", title: "h2" },
  { id: "h3", title: "h3" },
  { id: "p", title: "p" },
  { id: "blockquote", title: "blockquote" },
  { id: "list", title: "list" },
  { id: "inline-code", title: "Inline code" },
  { id: "lead-large-small-muted", title: "lead / large / small / muted" },
  { id: "table", title: "table" },
  { id: "rtl", title: "RTL" },
]

export const typographyMarkdown = [
  "# Typography",
  "",
  "Styles for headings, paragraphs, lists, etc.",
  "",
  "No typography styles ship by default — these are plain utility classes you can",
  "copy directly into your markup. Every example below uses logical alignment/spacing",
  "(`text-start`, `ms-*`, `border-s-*`) so it reads correctly in both LTR and RTL.",
].join("\n")

export default function TypographyDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Typography
          </h1>
          <CopyMarkdownButton markdown={typographyMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Styles for headings, paragraphs, lists, etc. No typography styles ship
          by default — this page shows how to style your text with utility
          classes.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced physical text-left/ml-6/border-l-2/pl-6/text-left th alignment with logical text-start/ms-6/border-s-2/ps-6 throughout",
          ]}
        />

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4 rounded-lg border border-border p-6">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            کتابخانه رابط کاربری فارسی
          </h1>
          <p className="mt-6 text-xl leading-7 text-muted-foreground">
            کامپوننت‌هایی که برای زبان فارسی و راست‌به‌چپ ساخته شده‌اند، آماده
            برای کپی در پروژه شما.
          </p>
          <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            نصب و راه‌اندازی
          </h2>
          <p className="mt-6 leading-7">
            برای شروع،{" "}
            <a
              href="#"
              className="font-medium text-primary underline underline-offset-4"
            >
              مستندات نصب
            </a>{" "}
            را مطالعه کنید.
          </p>
          <blockquote className="mt-6 border-s-2 border-border ps-6 text-muted-foreground italic">
            &quot;راست‌به‌چپ به‌عنوان پیش‌فرض، نه یک افترتات.&quot;
          </blockquote>
        </div>

        <h2 id="h1" className="mt-12 text-xl font-semibold tracking-tight">
          h1
        </h2>
        <div className="mt-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
  Taxing Laughter: The Joke Tax Chronicles
</h1>`}
            lang="tsx"
          />
        </div>

        <h2 id="h2" className="mt-12 text-xl font-semibold tracking-tight">
          h2
        </h2>
        <div className="mt-4">
          <h2 className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            The King&apos;s Plan
          </h2>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
  The King's Plan
</h2>`}
            lang="tsx"
          />
        </div>

        <h2 id="h3" className="mt-12 text-xl font-semibold tracking-tight">
          h3
        </h2>
        <div className="mt-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            The Joke Tax
          </h3>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
  The Joke Tax
</h3>`}
            lang="tsx"
          />
        </div>

        <h2 id="p" className="mt-12 text-xl font-semibold tracking-tight">
          p
        </h2>
        <div className="mt-4">
          <p className="text-start leading-7">
            The king&apos;s subjects were not amused. They grumbled and
            complained, but the king was firm.
          </p>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<p className="text-start leading-7 [&:not(:first-child)]:mt-6">
  The king's subjects were not amused.
</p>`}
            lang="tsx"
          />
        </div>

        <h2
          id="blockquote"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          blockquote
        </h2>
        <div className="mt-4">
          <blockquote className="border-s-2 border-border ps-6 text-muted-foreground italic">
            &quot;After all,&quot; he said, &quot;everyone enjoys a good joke,
            so it&apos;s only fair that they should pay for the privilege.&quot;
          </blockquote>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<blockquote className="mt-6 border-s-2 ps-6 italic">
  "After all," he said, "everyone enjoys a good joke..."
</blockquote>`}
            lang="tsx"
          />
        </div>

        <h2 id="list" className="mt-12 text-xl font-semibold tracking-tight">
          list
        </h2>
        <div className="mt-4">
          <ul className="ms-6 list-disc text-start [&>li]:mt-2">
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>3rd level of one-liners: 20 gold coins</li>
          </ul>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<ul className="my-6 ms-6 list-disc text-start [&>li]:mt-2">
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of one-liners: 20 gold coins</li>
</ul>`}
            lang="tsx"
          />
        </div>

        <h2
          id="inline-code"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Inline code
        </h2>
        <div className="mt-4">
          <p className="text-start leading-7">
            On your keyboard, press{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              ⌘K
            </code>{" "}
            to open the command menu.
          </p>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
  @radix-ui/react-alert-dialog
</code>`}
            lang="tsx"
          />
        </div>

        <h2
          id="lead-large-small-muted"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          lead / large / small / muted
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          <p className="text-start text-xl text-muted-foreground">
            A modal dialog that interrupts the user with important content.
          </p>
          <div className="text-start text-lg font-semibold">
            Are you absolutely sure?
          </div>
          <label className="text-start text-sm leading-none font-medium">
            Email address
          </label>
          <p className="text-start text-sm text-muted-foreground">
            Enter your email address.
          </p>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<p className="text-start text-xl text-muted-foreground">Lead</p>
<div className="text-start text-lg font-semibold">Large</div>
<small className="text-start text-sm leading-none font-medium">Small</small>
<p className="text-start text-sm text-muted-foreground">Muted</p>`}
            lang="tsx"
          />
        </div>

        <h2 id="table" className="mt-12 text-xl font-semibold tracking-tight">
          table
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="m-0 border-t border-border p-0 even:bg-muted">
                <th className="border border-border px-4 py-2 text-start font-bold">
                  King&apos;s Treasury
                </th>
                <th className="border border-border px-4 py-2 text-start font-bold">
                  People&apos;s happiness
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t border-border p-0 even:bg-muted">
                <td className="border border-border px-4 py-2 text-start">
                  Empty
                </td>
                <td className="border border-border px-4 py-2 text-start">
                  Overflowing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<table className="w-full text-start">
  <thead>
    <tr>
      <th className="border px-4 py-2 text-start font-bold">King's Treasury</th>
    </tr>
  </thead>
</table>`}
            lang="tsx"
          />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Because every example above uses logical alignment (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            text-start
          </code>
          ) and logical spacing (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            ms-*
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            border-s-*
          </code>
          ), the same classes render correctly with no changes when{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dir=&quot;rtl&quot;
          </code>{" "}
          — see the Farsi example under Overview above.
        </p>

        <DocsPageFooter
          href="/docs/components/typography"
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
