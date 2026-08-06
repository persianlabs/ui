import type { Metadata } from "next"

import { CodeBlock } from "@/components/code-block"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { CODE_FENCE } from "@/lib/markdown"
import { getThemeVariables } from "@/lib/theme-variables"

export const metadata: Metadata = {
  title: "Theming",
  description:
    "The CSS color variables PersianLabs/ui ships with, ready to copy into your own globals.css.",
}

const neutralPairs = [
  { name: "background", fg: "foreground" },
  { name: "card", fg: "card-foreground" },
  { name: "popover", fg: "popover-foreground" },
  { name: "primary", fg: "primary-foreground" },
  { name: "secondary", fg: "secondary-foreground" },
  { name: "muted", fg: "muted-foreground" },
  { name: "accent", fg: "accent-foreground" },
]

const statusColors = ["destructive", "info", "success", "warning"]

const outlineTokens = ["border", "input", "ring"]

export default function ThemingPage() {
  const { light, dark } = getThemeVariables()

  const themingMarkdown = [
    "# Theming",
    "",
    "The CSS color variables PersianLabs/ui ships with, ready to copy into your own globals.css.",
    "",
    "## Light",
    "",
    `${CODE_FENCE}css`,
    light,
    CODE_FENCE,
    "",
    "## Dark",
    "",
    `${CODE_FENCE}css`,
    dark,
    CODE_FENCE,
  ].join("\n")

  return (
    <article className="max-w-2xl">
      <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-semibold tracking-tight self-start sm:self-auto">
          Theming
        </h1>
        <CopyMarkdownButton markdown={themingMarkdown} />
      </div>
      <p className="text-muted-foreground mt-3 leading-relaxed">
        Every color in PersianLabs/ui is a CSS variable. Copy the blocks below
        into your own{" "}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
          globals.css
        </code>{" "}
        and adjust the values — every component reads from these tokens,
        nothing is hard-coded.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Preview</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {neutralPairs.map((pair) => (
          <div
            key={pair.name}
            style={{
              backgroundColor: `var(--${pair.name})`,
              color: `var(--${pair.fg})`,
            }}
            className="border-border/60 flex h-16 items-center justify-center rounded-lg border font-mono text-xs"
          >
            {pair.name}
          </div>
        ))}
      </div>

      <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
        Status colors are meant to be used as soft tints — text in the base
        color over a faint background, the same way{" "}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
          destructive
        </code>{" "}
        buttons are styled — not as solid fills.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statusColors.map((name) => (
          <div
            key={name}
            style={{
              backgroundColor: `color-mix(in oklab, var(--${name}) 12%, transparent)`,
              color: `var(--${name})`,
            }}
            className="flex h-16 items-center justify-center rounded-lg font-mono text-xs font-medium"
          >
            {name}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {outlineTokens.map((token) => (
          <div key={token} className="flex flex-col items-center gap-1.5">
            <div
              style={{ borderColor: `var(--${token})` }}
              className="h-10 w-full rounded-lg border-2"
            />
            <span className="text-muted-foreground font-mono text-xs">
              {token}
            </span>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Light</h2>
      <div className="mt-4">
        <CodeBlock code={light} lang="css" />
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Dark</h2>
      <div className="mt-4">
        <CodeBlock code={dark} lang="css" />
      </div>
    </article>
  )
}
