"use client"

import { useCallback, useRef, useState } from "react"

const MIN = 0
const MAX = 1000
const STEP = 10

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export function ElasticSliderPriceRangeExample() {
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingThumb = useRef<"min" | "max" | null>(null)
  const [range, setRange] = useState<[number, number]>([200, 700])
  const [min, max] = range

  const positionToValue = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return MIN

    const rect = track.getBoundingClientRect()
    let percent = clamp((clientX - rect.left) / rect.width, 0, 1)
    if (getComputedStyle(track).direction === "rtl") percent = 1 - percent

    const raw = MIN + percent * (MAX - MIN)
    return clamp(Math.round(raw / STEP) * STEP, MIN, MAX)
  }, [])

  const dragTo = useCallback(
    (clientX: number) => {
      if (!draggingThumb.current) return

      const value = positionToValue(clientX)
      setRange(([currentMin, currentMax]) =>
        draggingThumb.current === "min"
          ? [clamp(value, MIN, currentMax), currentMax]
          : [currentMin, clamp(value, currentMin, MAX)]
      )
    },
    [positionToValue]
  )

  const handleThumbPointerDown = useCallback(
    (thumb: "min" | "max") => (e: React.PointerEvent) => {
      e.stopPropagation()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      draggingThumb.current = thumb
    },
    []
  )

  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const value = positionToValue(e.clientX)
      const thumb =
        Math.abs(value - min) <= Math.abs(value - max) ? "min" : "max"

      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      draggingThumb.current = thumb
      dragTo(e.clientX)
    },
    [positionToValue, min, max, dragTo]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => dragTo(e.clientX),
    [dragTo]
  )

  const handlePointerUp = useCallback(() => {
    draggingThumb.current = null
  }, [])

  const minPercent = ((min - MIN) / (MAX - MIN)) * 100
  const maxPercent = ((max - MIN) / (MAX - MIN)) * 100

  return (
    <div className="w-64">
      <div className="mb-2 flex items-center justify-between text-sm font-medium">
        <span>${min}</span>
        <span>${max}</span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-9 touch-none rounded-lg bg-muted select-none"
      >
        <div
          className="absolute inset-y-0 rounded-lg bg-muted-foreground/25"
          style={{
            insetInlineStart: `${minPercent}%`,
            insetInlineEnd: `${100 - maxPercent}%`,
          }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Min price"
          aria-valuemin={MIN}
          aria-valuemax={max}
          aria-valuenow={min}
          onPointerDown={handleThumbPointerDown("min")}
          className="absolute top-1/2 h-5 w-1.5 -translate-y-1/2 cursor-pointer rounded-full bg-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{ insetInlineStart: `max(4px, calc(${minPercent}% - 3px))` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Max price"
          aria-valuemin={min}
          aria-valuemax={MAX}
          aria-valuenow={max}
          onPointerDown={handleThumbPointerDown("max")}
          className="absolute top-1/2 h-5 w-1.5 -translate-y-1/2 cursor-pointer rounded-full bg-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{
            insetInlineStart: `min(calc(100% - 10px), calc(${maxPercent}% - 3px))`,
          }}
        />
      </div>
    </div>
  )
}
