"use client"

import { motion } from "motion/react"
import * as React from "react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

interface TocItem {
  id: string
  title: string
  children?: TocItem[]
}

interface FlatItem {
  id: string
  title: string
  depth: number
}

function flatten(items: TocItem[]): FlatItem[] {
  const result: FlatItem[] = []
  for (const item of items) {
    result.push({ id: item.id, title: item.title, depth: 0 })
    for (const child of item.children ?? []) {
      result.push({ id: child.id, title: child.title, depth: 1 })
    }
  }
  return result
}

// Physical x position of the connector line at each depth, and how much
// vertical travel the curve between two depths gets to use.
const X_BY_DEPTH = [4, 16]
const CURVE_RUN = 12

export function TableOfContents({ items }: { items: TocItem[] }) {
  const flatItems = React.useMemo(() => flatten(items), [items])
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [canAnimate, setCanAnimate] = React.useState(false)
  const listRef = React.useRef<HTMLUListElement>(null)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [linePath, setLinePath] = React.useState<string | null>(null)
  const [track, setTrack] = React.useState<{
    top: number
    bottom: number
  } | null>(null)

  React.useLayoutEffect(() => {
    const headings = flatItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    let frameId: number | null = null

    function updateActiveItem() {
      frameId = null
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0
      const offset = headerHeight + 24
      let current = headings[0]!

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) {
          current = heading
        } else {
          break
        }
      }

      // The final heading can be too close to the document bottom to ever
      // cross the header offset. Once the page reaches its scroll limit,
      // make that final topic active instead of leaving the previous row
      // highlighted.
      const atDocumentEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      if (atDocumentEnd) current = headings.at(-1)!

      setActiveId(current.id)
    }

    function scheduleUpdate() {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateActiveItem)
    }

    updateActiveItem()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [flatItems])

  React.useEffect(() => {
    // Let browser scroll restoration finish before enabling motion. A reload
    // at a deep section should place the indicator and helper list directly
    // on the active item, not animate there from the first entry.
    const timeoutId = window.setTimeout(() => setCanAnimate(true), 100)
    return () => window.clearTimeout(timeoutId)
  }, [])

  // One continuous connector for the whole list: a straight run per row,
  // with a smooth curve inserted only where depth actually changes between
  // consecutive rows (either direction — deeper or back out).
  //
  // Re-measures via ResizeObserver (not just once on mount) because Next.js
  // can render this component off-screen during a route prefetch, where the
  // very first layout pass reports zeroed-out geometry; a real resize event
  // once it's actually visible corrects it.
  React.useEffect(() => {
    const list = listRef.current
    if (!list) return

    function measure() {
      if (!list) return

      const rows = flatItems.map((item) => {
        const row = list.querySelector<HTMLElement>(
          `[data-toc-id="${item.id}"]`
        )
        return row
          ? { top: row.offsetTop, height: row.offsetHeight, depth: item.depth }
          : null
      })

      if (rows.some((row) => row === null) || rows.length === 0) return
      const measured = rows as { top: number; height: number; depth: number }[]

      let d = ""
      let prevDepth = measured[0]!.depth

      measured.forEach((row, index) => {
        const x = X_BY_DEPTH[row.depth]!

        if (index === 0) {
          d += `M ${x} ${row.top} `
        } else if (row.depth !== prevDepth) {
          const prevX = X_BY_DEPTH[prevDepth]!
          const curveEnd = row.top + CURVE_RUN
          const midY = row.top + CURVE_RUN / 2
          d += `C ${prevX} ${midY} ${x} ${midY} ${x} ${curveEnd} `
        }

        d += `L ${x} ${row.top + row.height} `
        prevDepth = row.depth
      })

      setLinePath(d.trim())
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(list)

    return () => observer.disconnect()
  }, [flatItems])

  // The active window is just the vertical span of the current row — a
  // clip-path reveals that slice of the (identical) colored line on top of
  // the muted one underneath.
  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !activeId) return

    const row = list.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`)
    if (!row) return

    setTrack({ top: row.offsetTop, bottom: row.offsetTop + row.offsetHeight })

    const viewport = scrollAreaRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    )
    if (!viewport) return

    const rowTop = row.offsetTop
    const targetScrollTop = Math.max(
      0,
      Math.min(
        rowTop - viewport.clientHeight / 2 + row.offsetHeight / 2,
        viewport.scrollHeight - viewport.clientHeight
      )
    )

    if (Math.abs(viewport.scrollTop - targetScrollTop) > 1) {
      viewport.scrollTo({
        top: targetScrollTop,
        behavior: canAnimate ? "smooth" : "auto",
      })
    }
  }, [activeId])

  function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    // Measured live (not hardcoded) so it stays correct across the header's
    // mobile and desktop heights, plus a little breathing room below it.
    const headerHeight =
      document.querySelector("header")?.getBoundingClientRect().height ?? 0
    const offset = headerHeight + 24
    const top = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top, behavior: "smooth" })
  }

  function isActiveOrParentOfActive(item: TocItem) {
    if (item.id === activeId) return true
    return item.children?.some((child) => child.id === activeId) ?? false
  }

  return (
    <div
      ref={scrollAreaRef}
      className="h-full [&_[data-slot=scroll-area-thumb]]:opacity-0 [&_[data-slot=scroll-area-thumb]]:transition-opacity hover:[&_[data-slot=scroll-area-thumb]]:opacity-100"
    >
      <ScrollArea className="h-full">
        <nav className="pb-6 text-sm">
          <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            On this page
          </p>
          <ul ref={listRef} className="relative flex flex-col gap-0.5">
            <svg
              className="pointer-events-none absolute top-0 left-0 h-full w-6 overflow-visible"
              aria-hidden="true"
            >
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={1}
                />
              )}
            </svg>

            {track && linePath && (
              <motion.div
                className="pointer-events-none absolute top-0 left-0 h-full w-6 overflow-hidden"
                initial={false}
                animate={{
                  clipPath: `polygon(0 ${track.top}px, 100% ${track.top}px, 100% ${track.bottom}px, 0 ${track.bottom}px)`,
                }}
                transition={
                  canAnimate
                    ? { type: "spring", bounce: 0.15, duration: 0.35 }
                    : { duration: 0 }
                }
              >
                <svg
                  className="absolute top-0 left-0 h-full w-6 overflow-visible"
                  aria-hidden="true"
                >
                  <path
                    d={linePath}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}

            {items.map((item) => (
              <React.Fragment key={item.id}>
                <li data-toc-id={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => onLinkClick(event, item.id)}
                    className={cn(
                      "relative block py-1 pl-4 transition-colors",
                      isActiveOrParentOfActive(item)
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
                {item.children?.map((child, childIndex) => (
                  <li
                    key={child.id}
                    data-toc-id={child.id}
                    className={cn(
                      childIndex === 0 && "mt-1",
                      childIndex === item.children!.length - 1 && "mb-1"
                    )}
                  >
                    <a
                      href={`#${child.id}`}
                      onClick={(event) => onLinkClick(event, child.id)}
                      className={cn(
                        "relative block py-1 pl-7 text-[13px] transition-colors",
                        activeId === child.id
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  )
}
