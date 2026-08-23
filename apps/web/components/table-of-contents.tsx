"use client"

import { motion } from "motion/react"
import * as React from "react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

export interface TocItem {
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

const MAX_ACTIVE_ITEMS = 3

function sameIds(a: string[], b: string[]) {
  return a.length === b.length && a.every((id, index) => id === b[index])
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const flatItems = React.useMemo(() => flatten(items), [items])
  const [activeIds, setActiveIds] = React.useState<string[]>([])
  const [canAnimate, setCanAnimate] = React.useState(false)
  const [navigationComplete, setNavigationComplete] = React.useState(0)
  const listRef = React.useRef<HTMLUListElement>(null)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const isNavigatingRef = React.useRef(false)
  const navigationCleanupRef = React.useRef<(() => void) | null>(null)
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
    let prevIds: string[] = []

    function updateActiveItems() {
      frameId = null
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0
      const offset = headerHeight + 24
      const viewportBottom = window.innerHeight

      // Each heading "owns" the section from its own position down to the
      // next heading's -- that covers the whole page with no gaps, so any
      // scroll position always falls inside at least one section.
      const positions = headings.map((h) => h.getBoundingClientRect().top)
      const sections = headings.map((heading, index) => ({
        id: heading.id,
        start: positions[index]!,
        end: index < headings.length - 1 ? positions[index + 1]! : Infinity,
      }))

      let visible = sections.filter(
        (section) => section.start < viewportBottom && section.end > offset
      )

      if (visible.length === 0) {
        // Between two headings whose sections don't overlap the viewport at
        // all (a very short section entirely above the offset) -- fall back
        // to whichever heading was most recently scrolled past.
        let current = sections[0]!
        for (const section of sections) {
          if (section.start <= offset) current = section
          else break
        }
        visible = [current]
      }

      // The final heading's section can be too close to the document bottom
      // to ever get much overlap. Once the page reaches its scroll limit,
      // make that final topic active on its own instead of highlighting
      // whatever also happens to overlap.
      const atDocumentEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      if (atDocumentEnd) visible = [sections.at(-1)!]

      const nextIds = visible.slice(0, MAX_ACTIVE_ITEMS).map((s) => s.id)
      if (sameIds(prevIds, nextIds)) return
      prevIds = nextIds
      setActiveIds(nextIds)
    }

    function scheduleUpdate() {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateActiveItems)
    }

    updateActiveItems()
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

  // The active window spans from the top of the first active row to the
  // bottom of the last — a single continuous clip-path reveals that slice of
  // the (identical) colored line on top of the muted one underneath, even
  // when multiple rows are active at once.
  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || activeIds.length === 0) return

    const rows = activeIds
      .map((id) => list.querySelector<HTMLElement>(`[data-toc-id="${id}"]`))
      .filter((row): row is HTMLElement => row !== null)
    if (rows.length === 0) return

    const top = Math.min(...rows.map((row) => row.offsetTop))
    const bottom = Math.max(
      ...rows.map((row) => row.offsetTop + row.offsetHeight)
    )
    setTrack({ top, bottom })

    const viewport = scrollAreaRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    )
    if (!viewport || isNavigatingRef.current) return

    const centerRow = rows[0]!
    const rowTop = centerRow.offsetTop
    const targetScrollTop = Math.max(
      0,
      Math.min(
        rowTop - viewport.clientHeight / 2 + centerRow.offsetHeight / 2,
        viewport.scrollHeight - viewport.clientHeight
      )
    )

    if (Math.abs(viewport.scrollTop - targetScrollTop) > 1) {
      viewport.scrollTo({
        top: targetScrollTop,
        behavior: canAnimate ? "smooth" : "auto",
      })
    }
  }, [activeIds, canAnimate, navigationComplete])

  React.useEffect(() => {
    return () => navigationCleanupRef.current?.()
  }, [])

  function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const targetElement = target

    // Measured live (not hardcoded) so it stays correct across the header's
    // mobile and desktop heights, plus a little breathing room below it.
    const headerHeight =
      document.querySelector("header")?.getBoundingClientRect().height ?? 0
    const offset = headerHeight + 24
    function getDestination() {
      return targetElement.getBoundingClientRect().top + window.scrollY - offset
    }

    navigationCleanupRef.current?.()
    isNavigatingRef.current = true

    function finishNavigation() {
      isNavigatingRef.current = false
      navigationCleanupRef.current = null
      setNavigationComplete((version) => version + 1)
    }

    window.scrollTo(0, getDestination())
    const settleFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, getDestination())
    })
    const settleTimeout = window.setTimeout(() => {
      window.scrollTo(0, getDestination())
      finishNavigation()
    }, 150)

    navigationCleanupRef.current = () => {
      window.cancelAnimationFrame(settleFrame)
      window.clearTimeout(settleTimeout)
    }
  }

  function isActiveOrParentOfActive(item: TocItem) {
    if (activeIds.includes(item.id)) return true
    return item.children?.some((child) => activeIds.includes(child.id)) ?? false
  }

  return (
    <div ref={scrollAreaRef} className="h-full">
      <ScrollArea className="h-full [&_[data-slot=scroll-area-scrollbar]]:hidden">
        <nav className="px-4 pb-6 text-sm">
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
                        ? "text-foreground"
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
                        activeIds.includes(child.id)
                          ? "text-foreground"
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
