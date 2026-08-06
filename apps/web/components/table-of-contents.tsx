"use client"

import { motion } from "motion/react"
import * as React from "react"

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
  const [activeId, setActiveId] = React.useState<string | null>(
    flatItems[0]?.id ?? null
  )
  const listRef = React.useRef<HTMLUListElement>(null)
  const [linePath, setLinePath] = React.useState<string | null>(null)
  const [track, setTrack] = React.useState<{ top: number; bottom: number } | null>(
    null
  )

  React.useEffect(() => {
    const headings = flatItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveId(topMost.target.id)
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [flatItems])

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
    <nav className="text-sm">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
        On this page
      </p>
      <ul ref={listRef} className="relative flex flex-col gap-0.5">
        <svg
          className="pointer-events-none absolute top-0 left-0 h-full w-6 overflow-visible"
          aria-hidden="true"
        >
          {linePath && (
            <path d={linePath} fill="none" stroke="var(--border)" strokeWidth={1} />
          )}
        </svg>

        {track && linePath && (
          <motion.div
            className="pointer-events-none absolute top-0 left-0 h-full w-6 overflow-hidden"
            initial={false}
            animate={{
              clipPath: `polygon(0 ${track.top}px, 100% ${track.top}px, 100% ${track.bottom}px, 0 ${track.bottom}px)`,
            }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
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
                    ? "text-foreground font-medium"
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
                      ? "text-foreground font-medium"
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
  )
}
