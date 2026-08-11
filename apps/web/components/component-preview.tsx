"use client"

import { cn } from "@workspace/ui/lib/utils"
import { TextAlignEnd, TextAlignStart } from "lucide"
import { MorphIcon } from "morphicons/react"
import * as React from "react"

const COLLAPSED_CODE_HEIGHT = "5.5rem"

export function ComponentPreview({
  preview,
  code,
  className,
  dir: forcedDir,
}: {
  preview: React.ReactNode
  code: React.ReactNode
  className?: string
  /** Locks the preview direction and hides the direction toggle. Use for examples that force their own direction. */
  dir?: "ltr" | "rtl"
}) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">(forcedDir ?? "ltr")
  const resolvedDir = forcedDir ?? dir
  const [expanded, setExpanded] = React.useState(false)
  const [isNear, setIsNear] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border",
        className
      )}
    >
      {!forcedDir && (
        <button
          type="button"
          onClick={() =>
            setDir((current) => (current === "ltr" ? "rtl" : "ltr"))
          }
          aria-label="Toggle preview direction"
          className="absolute end-3 top-3 z-10 inline-flex h-7 w-18 shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-background text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <MorphIcon
            icon={resolvedDir === "ltr" ? TextAlignStart : TextAlignEnd}
            spring="snappy"
            className="size-3.5"
          />
          {resolvedDir.toUpperCase()}
        </button>
      )}

      <div
        key={resolvedDir}
        dir={resolvedDir}
        className="flex min-h-56 items-center justify-center bg-background p-8"
      >
        {isNear ? (
          preview
        ) : (
          <div className="size-full animate-pulse rounded-lg bg-muted" />
        )}
      </div>

      <div className="relative border-t border-border">
        <div
          style={{
            maxHeight: !expanded ? COLLAPSED_CODE_HEIGHT : undefined,
            minHeight: !isNear ? COLLAPSED_CODE_HEIGHT : undefined,
          }}
          className={cn(
            "[&_[data-slot=code-block]]:m-0 [&_[data-slot=code-block]]:rounded-none [&_[data-slot=code-block]]:border-0",
            !expanded && "overflow-hidden"
          )}
        >
          {isNear && code}
        </div>
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-card to-transparent pt-10 pb-3">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="relative z-10 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              View Code
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
