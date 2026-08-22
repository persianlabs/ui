import { CodeBlock } from "@/components/code-block"
import { getThemeVariables } from "@/lib/theme-variables"

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

/**
 * The color swatch grids on the Theming page — neutral pairs, status-color
 * tints, and outline tokens, all rendered from live CSS variables so the
 * preview always matches globals.css.
 */
export function ThemePreview() {
  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {neutralPairs.map((pair) => (
          <div
            key={pair.name}
            style={{
              backgroundColor: `var(--${pair.name})`,
              color: `var(--${pair.fg})`,
            }}
            className="flex h-16 items-center justify-center rounded-lg border border-border/60 font-mono text-xs"
          >
            {pair.name}
          </div>
        ))}
      </div>

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
            <span className="font-mono text-xs text-muted-foreground">
              {token}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

/**
 * The Light/Dark copy blocks on the Theming page: the full CSS variable set,
 * highlighted like any other code block but generated from globals.css at
 * render time instead of copied into the markdown.
 */
export function ThemeVariablesCode({ variant }: { variant: "light" | "dark" }) {
  const { light, dark } = getThemeVariables()

  return (
    <div className="mt-4">
      <CodeBlock code={variant === "light" ? light : dark} lang="css" />
    </div>
  )
}
