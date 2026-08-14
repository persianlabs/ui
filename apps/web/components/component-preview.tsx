"use client"

import { cn } from "@workspace/ui/lib/utils"
import { Expand, TextAlignEnd, TextAlignStart, X } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

const COLLAPSED_CODE_HEIGHT = "5.5rem"

type PreviewKind = "component" | "block"

export function ComponentPreview({
  preview,
  code,
  className,
  dir: forcedDir,
  kind = "component",
}: {
  preview: React.ReactNode
  code: React.ReactNode
  className?: string
  /** Locks the preview direction and hides the direction toggle. Use for examples that force their own direction. */
  dir?: "ltr" | "rtl"
  /** Blocks use the same controls but can opt into an edge-to-edge canvas. */
  kind?: PreviewKind
}) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">(forcedDir ?? "ltr")
  const resolvedDir = forcedDir ?? dir
  const [expanded, setExpanded] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [codeOpen, setCodeOpen] = React.useState(false)
  const [isNear, setIsNear] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const codeDialogRef = React.useRef<HTMLDivElement>(null)
  const { resolvedTheme, setTheme } = useTheme()

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

  React.useLayoutEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("preview")
    if (preview !== getPreviewIdentifier(containerRef.current).example) return

    setFullscreen(true)
  }, [])

  React.useLayoutEffect(() => {
    if (fullscreen) document.documentElement.classList.remove("preview-loading")
  }, [fullscreen])

  React.useLayoutEffect(() => {
    if (!fullscreen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [fullscreen])

  React.useEffect(() => {
    if (!fullscreen) return

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === "Escape") {
        event.preventDefault()
        if (codeOpen) {
          setCodeOpen(false)
        } else {
          closeFullscreen()
        }
      }

      if (event.key.toLowerCase() === "t") {
        event.preventDefault()
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }

      if (event.key.toLowerCase() === "r" && !forcedDir) {
        event.preventDefault()
        setDir((current) => (current === "ltr" ? "rtl" : "ltr"))
      }

      if (event.key.toLowerCase() === "c") {
        event.preventDefault()
        setCodeOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [codeOpen, forcedDir, fullscreen, resolvedTheme, setTheme])

  React.useEffect(() => {
    if (codeOpen) codeDialogRef.current?.focus()
  }, [codeOpen])

  function toggleDirection() {
    if (forcedDir) return
    setDir((current) => (current === "ltr" ? "rtl" : "ltr"))
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  function openFullscreen() {
    const preview = getPreviewIdentifier(containerRef.current)
    const category = getPreviewCategory()
    window.location.assign(
      `/preview/${category}/${preview.component}/${preview.example}`
    )
  }

  function closeFullscreen() {
    if (window.parent !== window) {
      window.parent.location.assign(window.location.pathname)
      return
    }

    setCodeOpen(false)
    setFullscreen(false)
  }

  const previewCanvasClassName = cn(
    "flex bg-background",
    fullscreen
      ? kind === "component"
        ? "min-h-0 flex-1 [align-items:safe_center] justify-center overflow-auto p-6 pb-28 sm:p-12 sm:pb-28"
        : "min-h-0 flex-1 items-stretch justify-stretch overflow-auto p-0"
      : kind === "component"
        ? "min-h-56 items-center justify-center p-8"
        : "min-h-56 items-stretch justify-stretch p-0"
  )

  return (
    <div
      ref={containerRef}
      data-component-preview
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border",
        fullscreen &&
          "fixed inset-0 z-50 min-h-svh rounded-none border-0 bg-background",
        className
      )}
    >
      {!fullscreen && !forcedDir && (
        <button
          type="button"
          onClick={toggleDirection}
          aria-label="Toggle preview direction"
          className="absolute end-12 top-3 z-10 inline-flex h-7 w-18 shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-background text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
        >
          {resolvedDir === "ltr" ? (
            <TextAlignStart className="size-3.5" />
          ) : (
            <TextAlignEnd className="size-3.5" />
          )}
          {resolvedDir.toUpperCase()}
        </button>
      )}

      {!fullscreen && (
        <button
          type="button"
          onClick={openFullscreen}
          aria-label="Open fullscreen preview"
          className="absolute end-3 top-3 z-10 inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
        >
          <Expand className="size-3.5" />
        </button>
      )}

      <div
        key={resolvedDir}
        dir={resolvedDir}
        className={previewCanvasClassName}
      >
        {isNear ? (
          preview
        ) : (
          <div className="size-full animate-pulse rounded-lg bg-muted" />
        )}
      </div>

      <div
        className={cn(
          "relative border-t border-border",
          fullscreen && "hidden"
        )}
      >
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

      {fullscreen && (
        <>
          <div className="fixed inset-x-0 bottom-5 z-10 flex justify-center px-4">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-popover/95 p-1 text-xs text-muted-foreground shadow-lg backdrop-blur-sm">
              <PreviewControl
                onClick={closeFullscreen}
                shortcut="Esc"
                label="Back"
              />
              {!forcedDir && (
                <PreviewControl
                  onClick={toggleDirection}
                  shortcut="R"
                  label="Direction"
                />
              )}
              <PreviewControl
                onClick={toggleTheme}
                shortcut="T"
                label="Theme"
              />
              <PreviewControl
                onClick={() => setCodeOpen(true)}
                shortcut="C"
                label="Code"
              />
            </div>
          </div>

          {codeOpen && (
            <div className="fixed inset-0 z-10 grid place-items-center bg-black/45 p-4 backdrop-blur-sm">
              <div
                ref={codeDialogRef}
                role="dialog"
                aria-modal="true"
                aria-label="Code"
                tabIndex={-1}
                className="max-h-[calc(100svh-2rem)] w-full max-w-4xl overflow-auto rounded-2xl border border-border bg-popover p-3 shadow-2xl outline-none [&_[data-slot=code-block]]:border-0 [&_[data-slot=code-block]>div:first-child]:opacity-100"
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-sm font-medium">Code</span>
                  <button
                    type="button"
                    onClick={() => setCodeOpen(false)}
                    aria-label="Close code"
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                {code}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function PreviewControl({
  onClick,
  shortcut,
  label,
}: {
  onClick: () => void
  shortcut: string
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
    >
      <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-foreground">
        {shortcut}
      </kbd>
      {label}
    </button>
  )
}

function getPreviewIdentifier(node: HTMLDivElement | null) {
  const component = window.location.pathname.split("/").at(-1) || "component"
  const headings = Array.from(
    document.querySelectorAll("article h2, article h3")
  )
  const precedingHeading = headings
    .filter(
      (heading) =>
        node &&
        Boolean(
          heading.compareDocumentPosition(node) &
          Node.DOCUMENT_POSITION_FOLLOWING
        )
    )
    .at(-1)
  const example =
    precedingHeading?.id || slugify(precedingHeading?.textContent) || "example"

  return { component, example }
}

function getPreviewCategory() {
  const pathname = window.location.pathname

  if (pathname.startsWith("/docs/utilities/")) return "u"

  return "c"
}

function slugify(value: string | null | undefined) {
  return value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
