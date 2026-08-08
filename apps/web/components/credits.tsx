"use client"

import { CheckCircle2Icon, GitBranchIcon } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/badge"
import { cn } from "@workspace/ui/lib/utils"

export interface CreditsSource {
  label: string
  href: string
}

const COLLAPSED_HEIGHT = "6.5rem"
const COLLAPSED_HEIGHT_PX = 104

export function Credits({
  sources,
  changed,
  changes,
  published = true,
}: {
  /** Where the component's source/data was copied from. */
  sources: CreditsSource[]
  /** Whether anything was changed relative to the source(s). */
  changed: boolean
  /** What was changed, when `changed` is true. */
  changes?: string[]
  /** Whether this component is published/shipped in the registry. */
  published?: boolean
}) {
  const listRef = React.useRef<HTMLUListElement>(null)
  const [expanded, setExpanded] = React.useState(false)
  const [overflowing, setOverflowing] = React.useState(false)

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      // scrollHeight reflects the list's natural content height regardless
      // of whether it's currently clamped, so this stays accurate even
      // after expanding (unlike comparing against clientHeight, which
      // would report "no longer overflowing" the moment the clamp lifts
      // and make the collapse-back button disappear).
      setOverflowing(list.scrollHeight > COLLAPSED_HEIGHT_PX)
    }

    // Read synchronously here rather than waiting for the ResizeObserver's
    // own (asynchronous) first callback — useLayoutEffect runs before the
    // browser paints, so this avoids a flash of the unclamped list followed
    // by it suddenly collapsing once the observer catches up.
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(list)

    return () => observer.disconnect()
  }, [])

  const collapsed = overflowing && !expanded

  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-foreground">Credits</span>
        <Badge variant={changed ? "default" : "muted"}>
          {changed ? "Modified" : "Unchanged"}
        </Badge>
        {published && (
          <Badge
            variant="muted"
            className="inline-flex items-center gap-1 pl-1"
          >
            <CheckCircle2Icon className="size-2.5" />
            Published
          </Badge>
        )}
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        <GitBranchIcon className="mr-1 inline size-3.5 -translate-y-px" />
        Copied from{" "}
        {sources.map((source, index) => (
          <span key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              {source.label}
            </a>
            {index < sources.length - 2 && ", "}
            {index === sources.length - 2 && " and "}
          </span>
        ))}
        .
      </p>

      {changed && changes && changes.length > 0 && (
        // -mx-4 breaks the fade out of the card's own px-4 so it reaches the
        // card's actual edges instead of stopping at the padding boundary;
        // the list gets that px-4 back directly so its text stays aligned.
        <div className="relative -mx-4">
          <ul
            ref={listRef}
            style={collapsed ? { maxHeight: COLLAPSED_HEIGHT } : undefined}
            className={cn(
              "mt-2 list-inside list-disc space-y-1 px-4 text-sm",
              collapsed && "overflow-hidden"
            )}
          >
            {changes.map((change) => (
              <li
                key={change}
                className="leading-relaxed text-muted-foreground"
              >
                {change}
              </li>
            ))}
          </ul>
          {collapsed && (
            // -bottom-3.5 + rounded-b-lg extend the same distance past the
            // list that -mx-4 does horizontally, reaching the card's actual
            // bottom edge (matching its own py-3.5/rounded-lg) instead of
            // fading out mid-padding.
            <div className="absolute inset-x-0 -bottom-3.5 flex items-end justify-center rounded-b-lg bg-gradient-to-t from-muted/95 via-muted/70 to-transparent pt-10 pb-3.5">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="relative z-10 cursor-pointer rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:-translate-y-px hover:border-foreground/20 hover:bg-muted hover:shadow-md active:translate-y-0"
              >
                Show more
              </button>
            </div>
          )}
          {expanded && (
            <div className="mt-2 flex justify-center px-4">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="cursor-pointer rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:-translate-y-px hover:border-foreground/20 hover:bg-muted hover:shadow-md active:translate-y-0"
              >
                Show less
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
