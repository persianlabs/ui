"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

const FADE_SIZE = 28

function buildMask(canStart: boolean, canEnd: boolean, direction: string) {
  if (!canStart && !canEnd) return "none"

  const stops = [
    canStart ? "transparent 0" : "black 0",
    canStart ? `black ${FADE_SIZE}px` : null,
    canEnd ? `black calc(100% - ${FADE_SIZE}px)` : null,
    canEnd ? "transparent 100%" : "black 100%",
  ].filter((stop): stop is string => stop !== null)

  return `linear-gradient(${direction}, ${stops.join(", ")})`
}

export function ScrollFade({
  axis = "x",
  className,
  children,
}: {
  axis?: "x" | "y"
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [mask, setMask] = React.useState("none")

  const update = React.useCallback(() => {
    const el = ref.current
    if (!el) return

    let canStart: boolean
    let canEnd: boolean
    let direction: string

    if (axis === "x") {
      const isRtl = getComputedStyle(el).direction === "rtl"
      const maxScroll = el.scrollWidth - el.clientWidth
      const position = Math.abs(el.scrollLeft)
      canStart = position > 1
      canEnd = position < maxScroll - 1
      direction = isRtl ? "to left" : "to right"
    } else {
      const maxScroll = el.scrollHeight - el.clientHeight
      canStart = el.scrollTop > 1
      canEnd = el.scrollTop < maxScroll - 1
      direction = "to bottom"
    }

    setMask(buildMask(canStart, canEnd, direction))
  }, [axis])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    update()

    el.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)

    return () => {
      el.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [update])

  return (
    <div
      ref={ref}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      className={cn(
        axis === "x" ? "overflow-x-auto" : "overflow-y-auto",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {children}
    </div>
  )
}
